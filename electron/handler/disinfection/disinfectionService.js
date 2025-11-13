const { By, Key, until } = require('selenium-webdriver');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const electron = require('electron');
const app = electron.app || require('@electron/remote').app;
const os = require('os');
const { waitForLoading, menuMove, getAuthToken } = require('../common/commonService');
class DisinfectionService {
    constructor(driver) {
        this.driver = driver;
        this.tokenPath = path.join(os.homedir(), 'Documents', 'hanq_token', 'auth_token.json');
    }

    async createCleanHistory(cleanHistoryData) {
        try {
            const response = await axios.post('http://localhost:3000/service/disinfection', cleanHistoryData);
            
            if (response.data.success) {
                return { success: true, message: response.data.message, data: response.data.data };
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            console.error('CleanHistory 생성 중 오류 발생:', error);
            return { success: false, message: error.message || 'CleanHistory 생성 실패' };
        }
    }

    async disinfection(driver, event, args) {
        try {
            this.driver = driver;
            console.log('disinfection 프로세스 시작');
            console.log("args", args);
            
            // args 파싱 (JSON 문자열인 경우)
            let cleanData;
            let orderId = null;
            let companyId = null;
            
            if (typeof args[0] === 'string') {
                const parsed = JSON.parse(args[0]);
                cleanData = parsed.cleanData;
                orderId = parsed.orderId || null;
                companyId = parsed.companyId || null;
            } else if (args[0] && args[0].cleanData) {
                cleanData = args[0].cleanData;
                orderId = args[0].orderId || null;
                companyId = args[0].companyId || null;
            } else {
                cleanData = args[0];
                orderId = args[0]?.orderId || null;
                companyId = args[0]?.companyId || null;
            }
            
            console.log('파싱된 cleanData:', cleanData);
            console.log('orderId:', orderId, 'companyId:', companyId);
            
            // 배열 데이터 정규화 (배열이 아니면 배열로 변환)
            const sterilizeTypeArray = Array.isArray(cleanData.sterilizeType) ? cleanData.sterilizeType : [cleanData.sterilizeType];
            const sterilizeDateArray = Array.isArray(cleanData.sterilizeDate) ? cleanData.sterilizeDate : [cleanData.sterilizeDate];
            const sterilizeCompanyNameArray = Array.isArray(cleanData.sterilizeCompanyName) ? cleanData.sterilizeCompanyName : [cleanData.sterilizeCompanyName];
            const sterilizeCompanyIdArray = Array.isArray(cleanData.sterilizeCompanyId) ? cleanData.sterilizeCompanyId : [cleanData.sterilizeCompanyId];
            const sterilizeCompanyNumberArray = Array.isArray(cleanData.sterilizeCompanyNumber) ? cleanData.sterilizeCompanyNumber : [cleanData.sterilizeCompanyNumber];
            const sterilizeNumberArray = Array.isArray(cleanData.sterilizeNumber) ? cleanData.sterilizeNumber : [cleanData.sterilizeNumber];
            const sterilizeProductTypeArray = Array.isArray(cleanData.sterilizeProductType) ? cleanData.sterilizeProductType : [cleanData.sterilizeProductType];
            const sterilizeProductNameArray = Array.isArray(cleanData.sterilizeProductName) ? cleanData.sterilizeProductName : [cleanData.sterilizeProductName];
            const sterilizeProductAmountArray = Array.isArray(cleanData.sterilizeProductAmount) ? cleanData.sterilizeProductAmount : [cleanData.sterilizeProductAmount];
            const productsArray = Array.isArray(cleanData.products) ? cleanData.products : [cleanData.products];
            
            // 반복 횟수 결정 (가장 긴 배열의 길이)
            const maxLength = Math.max(
                sterilizeTypeArray.length,
                sterilizeDateArray.length,
                sterilizeCompanyNameArray.length,
                sterilizeCompanyIdArray.length,
                sterilizeCompanyNumberArray.length,
                sterilizeNumberArray.length,
                sterilizeProductTypeArray.length,
                sterilizeProductNameArray.length,
                sterilizeProductAmountArray.length,
                productsArray.length
            );
            
            console.log(`총 ${maxLength}개의 소독필증 작성 시작`);
            
            // 각 인덱스별로 반복 처리
            for (let j = 0; j < maxLength; j++) {
                console.log(`\n=== 소독필증 ${j + 1}/${maxLength} 작성 시작 ===`);
                
                // 현재 인덱스의 데이터 추출
                const sterilizeType = sterilizeTypeArray[j] || sterilizeTypeArray[0];
                const sterilizeDate = sterilizeDateArray[j] || sterilizeDateArray[0];
                const sterilizeCompanyName = String(sterilizeCompanyNameArray[j] || sterilizeCompanyNameArray[0]);
                const sterilizeCompanyNumber = sterilizeCompanyNumberArray[j] || sterilizeCompanyNumberArray[0];
                const sterilizeNumber = sterilizeNumberArray[j] || sterilizeNumberArray[0];
                const sterilizeCompanyId = sterilizeCompanyIdArray[j] || sterilizeCompanyIdArray[0];
                // 중첩 배열 처리 (배열 안의 배열인 경우)
                let sterilizeProductType = sterilizeProductTypeArray[j] || sterilizeProductTypeArray[0];
                if (Array.isArray(sterilizeProductType)) {
                    sterilizeProductType = sterilizeProductType[0];
                }
                
                let sterilizeProductName = sterilizeProductNameArray[j] || sterilizeProductNameArray[0];
                if (Array.isArray(sterilizeProductName)) {
                    sterilizeProductName = sterilizeProductName[0];
                }
                
                let sterilizeProductAmount = sterilizeProductAmountArray[j] || sterilizeProductAmountArray[0];
                if (Array.isArray(sterilizeProductAmount)) {
                    sterilizeProductAmount = sterilizeProductAmount[0];
                }
                
                // products는 각 인덱스별로 처리 (배열이면 해당 인덱스, 아니면 전체)
                const products = Array.isArray(productsArray[j]) ? productsArray[j] : (productsArray[j] ? [productsArray[j]] : productsArray);
                
                console.log(`인덱스 ${j} 데이터:`, {
                    sterilizeType,
                    sterilizeDate,
                    sterilizeCompanyName,
                    sterilizeCompanyNumber,
                    sterilizeNumber,
                    sterilizeProductType,
                    sterilizeProductName,
                    sterilizeProductAmount,
                    productsCount: products.length
                });
                
                // 소독필증 작성 메뉴로 이동
                await menuMove('nprk207m03', this.driver);
                await waitForLoading(this.driver);
                
                // 대기 설정
                await this.driver.manage().setTimeouts({ implicit: 3000 });
                
                // 기존 창 닫기 시도
                try {
                    await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form.cfn_close()");
                    await this.driver.sleep(500);
                } catch (error) {
                    console.log("창 닫기 오류 (무시):", error);
                }
                
                // 소독필증 작성 메뉴로 다시 이동 (창이 닫혔을 수 있음)
                try {
                    await menuMove('nprk207m03', this.driver);
                    await waitForLoading(this.driver);
                } catch (error) {
                    console.log("메뉴 이동 오류 (이미 해당 페이지일 수 있음):", error);
                }
                
                // 소독 유형 선택
                if (sterilizeType === "자체") {
                    await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.rdo_exposeTypeCd.radioitem0:icontext"]')).click();
                } else {
                    await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.rdo_exposeTypeCd.radioitem1:icontext"]')).click();
                    await this.driver.sleep(500);
                    
                    // 작업자 정보 입력
                    await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.edt_wrkerNm:input"]')).click();
                    await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.edt_wrkerNm:input"]')).sendKeys(sterilizeCompanyName);
                    
                    // 등록번호 입력
                    await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.met_regNo:input"]')).click();
                    await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.met_regNo:input"]')).sendKeys(sterilizeCompanyNumber);
                    
                    // 소독필증 번호 입력
                    await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.div_rexdcert.form.edt_rexdcertNo:input"]')).click();
                    await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.div_rexdcert.form.edt_rexdcertNo:input"]')).sendKeys(sterilizeNumber);
                }
                
                // 소독일자 입력
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.cal_exposeDt.calendaredit"]')).click();
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.cal_exposeDt.calendaredit"]/input')).clear();
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.cal_exposeDt.calendaredit"]/input')).sendKeys(sterilizeDate);
                
                // 소독 방법 선택
                let meditxtcnt = 1;
                if (sterilizeProductType === "약물소독") {
                    meditxtcnt = 1;
                } else if (sterilizeProductType === "증기소독") {
                    meditxtcnt = 2;
                } else if (sterilizeProductType === "일광소독") {
                    meditxtcnt = 3;
                } else if (sterilizeProductType === "끓는물소독") {
                    meditxtcnt = 4;
                } else if (sterilizeProductType === "기타") {
                    meditxtcnt = 5;
                }
                
                try {
                    await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.grid_wimExposeDesc.body.gridrow_0.cell_0_1"]')).click();
                    for (let x = 0; x < meditxtcnt; x++) {
                        await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.grid_wimExposeDesc.body.gridrow_0.cell_0_1"]')).sendKeys(Key.ARROW_DOWN);
                    }
                } catch (error) {
                    console.log('소독 방법 선택 오류:', error);
                }
                
                // 약제명과 규격 입력
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.grid_wimExposeDesc.body.gridrow_0.cell_0_3"]')).click();
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.grid_wimExposeDesc.body.gridrow_0.cell_0_3.celledit:input"]')).sendKeys(sterilizeProductName);
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.grid_wimExposeDesc.body.gridrow_0.cell_0_5"]')).click();
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.grid_wimExposeDesc.body.gridrow_0.cell_0_5.celledit:input"]')).sendKeys(sterilizeProductAmount);
                
                // products 배열을 순회하며 각 제품 처리
                for (let i = 0; i < products.length; i++) {
                    const product = products[i];
                    const pcode = product.pcode;
                    const bcode = product.bcode.replace(/\s/g, ''); // 공백 제거
                    
                    console.log(`  제품 ${i + 1}/${products.length} 처리 중:`, { pcode, bcode });
                    
                    // 바코드 검색 (초기 검색)
                    await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.edt_bcdNo.value='111111111111'");
                    await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.btn_search"]')).click();
                    await waitForLoading(this.driver);
                    
                    // 실제 바코드 정보 입력
                    await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.edt_wimCd.value='" + pcode + "'");
                    await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.edt_bcdNo.value='" + bcode + "'");
                    await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.btn_search"]')).click();
            await waitForLoading(this.driver);
                    
                    // 검색 결과 선택 및 저장
                    // await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.grid_wimList.body.gridrow_0.cell_0_0.cellcheckbox:icontext"]')).click();
                    // await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form.div_functionButton.form.btn_save"]')).click();
                    
                    // // 알림창 처리
                    // try {
                    //     const alert1 = await this.driver.wait(until.alertIsPresent(), 5000);
                    //     await alert1.accept();
                        
                    //     try {
                    //         const alert2 = await this.driver.wait(until.alertIsPresent(), 5000);
                    //         await alert2.accept();
                    //     } catch (error) {
                    //         console.log("두 번째 알림창 없음:", error);
                    //     }
                    // } catch (error) {
                    //     console.log("알림창 처리 오류:", error);
                    // }
                    
                    // CleanHistory 엔티티 형식에 맞게 데이터 생성
                    const cleanHistoryData = {
                        companyId: companyId,
                        cleanCompanyId: parseInt(sterilizeCompanyId) || null, // 숫자로 변환
                        orderId: orderId,
                        stockId: product.stockId || null,
                        cnum: sterilizeNumber || null,
                        mediType: sterilizeProductType || null,
                        mediName: sterilizeProductName || null,
                        mediSize: sterilizeProductAmount || null,
                        cleanDate: sterilizeDate || null,
                        pcode: pcode || null,
                        bcode: parseInt(bcode) || null, // 숫자로 변환
                        cleanManager: sterilizeCompanyName || null,
                        hs: 0, // 시간 필드 (기본값)
                        he: 0,
                        ms: 0,
                        me: 0
                    };
                    
                    console.log('CleanHistory 데이터:', cleanHistoryData);
                    
                    // CleanHistory 생성
                    try {
                        const result = await this.createCleanHistory(cleanHistoryData);
                        if (result.success) {
                            console.log(`CleanHistory 생성 성공: ${product.pname || pcode}`);
                        } else {
                            console.error(`CleanHistory 생성 실패: ${result.message}`);
                        }
                    } catch (error) {
                        console.error('CleanHistory 생성 중 오류:', error);
                    }
                    
                    // 메시지 전송
                    if (event && event.sender) {
                        event.sender.send('disinfectionStartResponse', { 
                            success: true, 
                            message: `소독필증 ${j + 1}/${maxLength} - 제품 ${i + 1}/${products.length} 작성 완료: ${product.pname || pcode}` 
                        });
                    }
                }
                
                // 창 닫기
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form.div_functionButton.form.btn_close"]')).click();
                
                console.log(`소독필증 ${j + 1}/${maxLength} 작성 완료\n`);
            }
            
            console.log('disinfection 프로세스 완료');
            if (event && event.sender) {
                event.sender.send('disinfectionStartResponse', { 
                    success: true, 
                    message: '소독필증 작성이 완료되었습니다.' 
                });
            }
        } catch (error) {
            console.error('disinfection 처리 중 오류 발생:', error);
            if (event && event.sender) {
                event.sender.send('disinfectionStartResponse', { 
                    success: false, 
                    message: `소독필증 작성 중 오류 발생: ${error.message}` 
                });
            }
        }
    }
}
module.exports = DisinfectionService;