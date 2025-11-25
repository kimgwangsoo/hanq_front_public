const { Builder, By, until, Key } = require('selenium-webdriver');
const path = require('path');
const electron = require('electron');
const app = electron.app || require('@electron/remote').app;
const { waitForLoading, menuMove, handleAlerts, getAuthToken } = require('../common/commonService');
const LookupService = require('../lookup/lookupService');
const axios = require('axios');
const os = require('os');
class RentContractService extends LookupService{
  constructor(driver) {
    super(driver);
    this.driver = driver;
    // this.tokenPath = path.join(app.getPath('userData'), 'auth_token.json');
    this.tokenPath = path.join(os.homedir(), 'Documents', 'hanq_token', 'auth_token.json');

  }

  async copyOrder(rentId, rentalStartDate, rentalEndDate, companyId) {
    try {
      // 저장된 토큰 가져오기
      const token = getAuthToken(this.tokenPath);
      
      // API 호출하여 주문 복사 요청
      const response = await axios.post('http://3.37.206.255:3000/order/copy', {
        rentId: rentId,
        rentalStartDate: rentalStartDate,
        rentalEndDate: rentalEndDate,
        companyId: companyId
      }, {
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : {}
      });
      
      if (response.data.success) {
        console.log('주문 복사 성공:', response.data);
        return { 
          success: true, 
          message: '주문이 성공적으로 복사되었습니다.',
          data: response.data.order
        };
      } else {
        console.log('주문 복사 실패:', response.data);
        return { 
          success: false, 
          message: '주문 복사 중 오류가 발생했습니다.' 
        };
      }
    } catch (error) {
      console.error('주문 복사 실패:', error);
      return { 
        success: false, 
        message: '주문 복사 중 오류가 발생했습니다.',
        error: error.message
      };
    }
  }

  async insertRentStopContract(insertRentStopContractData) {
      const response = await axios.post('http://3.37.206.255:3000/rent/create/stop-contract',
        insertRentStopContractData,
      );
      if (response.data.success) {
        console.log('대여 계약 중지 처리 성공:', response.data);
        return { success: true, message: '대여 계약 중지 처리 성공' };
      } else {
        console.log('대여 계약 중지 처리 실패:', response.data);
        return { success: false, message: '대여 계약 중지 처리 중 오류가 발생했습니다.' };
      }
  }

  async updateContractState(orderId,contractState) {
    try {
      // 저장된 토큰 가져오기
      const token = getAuthToken(this.tokenPath);
      
      const response = await axios.patch('http://3.37.206.255:3000/order/update-contract-state', {
        orderId: orderId,
        contractState: contractState
      }, {
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : {}
      });
      if (response.data.success) {
        console.log('계약 상태 업데이트 성공:', response.data);
        return { success: true, message: '계약 상태가 업데이트되었습니다.' };
      } else {
        console.log('계약 상태 업데이트 실패:', response.data);
        return { success: false, message: '계약 상태 업데이트 중 오류가 발생했습니다.' };
      }
    } catch (error) {
      console.error('계약 상태 업데이트 실패:', error);
      return { success: false, message: '계약 상태 업데이트 중 오류가 발생했습니다.' };
    }
  }

  async updateRentEndDate(rentId,endDate,stopCheck) {
    try {
      const token = getAuthToken(this.tokenPath);
      const response = await axios.patch(`http://3.37.206.255:3000/rent/end-date/${rentId}`, {
        endDate: endDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
        stopCheck: stopCheck
      },
        {
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : {}
      });
      console.log(response, "response");
    } catch (error) {
      console.log(error, "error");
    }
  }

  async rentContract(driver,event,args) {
    this.driver = driver;
    await menuMove('nprk303',this.driver);
    await waitForLoading(this.driver);
    

    const argsData = JSON.parse(args);
    console.log(argsData, "argsData");
    const {
        orderData,
        rentAddContractData,
        rentId,
        eventType,
        cleanData,
        companyId
    } = argsData;
    let { 
        id,
        ranker, 
        guardName, 
        clientRelationInfoId, 
        phone1,
        optionPhone,
        orderProducts
    } = orderData;

    let {
        name,
        number,
        resident,
        rcgt,
    } = orderData.client;
    resident = resident.replace(/[^0-9]/g, "");
    rcgt = rcgt.split("~")[0].replace(/[^0-9]/g, "");
    ranker = ranker.replace("등급","");
    number = number.replace("L", "").replace(" ", "");
    let {
      sterilizeType,
      sterilizeDate,
      sterilizeCompanyName,
      sterilizeCompanyNumber,
      sterilizeNumber,
      sterilizeProductName,
      sterilizeProductAmount,
      sterilizeProductType,
    } = cleanData;
    
    // 배열이 아닌 데이터를 배열로 변환
    // sterilizeType = Array.isArray(sterilizeType) ? sterilizeType : [sterilizeType];
    sterilizeDate = Array.isArray(sterilizeDate) ? sterilizeDate : [sterilizeDate];
    sterilizeCompanyName = Array.isArray(sterilizeCompanyName) ? sterilizeCompanyName : [sterilizeCompanyName];
    sterilizeCompanyNumber = Array.isArray(sterilizeCompanyNumber) ? sterilizeCompanyNumber : [sterilizeCompanyNumber];
    sterilizeNumber = Array.isArray(sterilizeNumber) ? sterilizeNumber : [sterilizeNumber];
    sterilizeProductName = Array.isArray(sterilizeProductName) ? sterilizeProductName : [sterilizeProductName];
    sterilizeProductAmount = Array.isArray(sterilizeProductAmount) ? sterilizeProductAmount : [sterilizeProductAmount];
    sterilizeProductType = Array.isArray(sterilizeProductType) ? sterilizeProductType : [sterilizeProductType];
    // 전화번호 형식 처리
    let phone = orderData.phone1 || '';
    phone = phone.replace(' ', '').replace('-', '');
    
    if (phone === '') {
      phone = '01000000000';
    }
    
    if (phone.length > 11 || phone.length < 10) {
      phone = '01000000000';
    }
    
    let formattedPhone = '';
    
    if (phone.length === 10) {
      for (let i = 0; i < 10; i++) {
        if (i === 2) {
          formattedPhone += phone[2] + "-";
        } else if (i === 5) {
          formattedPhone += phone[5] + "-";
        } else {
          formattedPhone += phone[i];
        }
      }
    } else if (phone.length === 11) {
      for (let i = 0; i < 11; i++) {
        if (i === 2) {
          formattedPhone += phone[2] + "-";
        } else if (i === 6) {
          formattedPhone += phone[6] + "-";
        } else {
          formattedPhone += phone[i];
        }
      }
    }
    
    const phoneSegments = formattedPhone.split('-');
    
    // 창 닫기 시도
    try {
      await this.driver.executeScript("return nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form.cfn_close()");
    } catch (error) {
      console.log(error);
    }
    
    try {
      await this.driver.executeScript("return nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form.cfn_close()");
    } catch (error) {
      console.log(error);
    }

    const selectedProducts = rentAddContractData.products;
    console.log(selectedProducts, "selectedProducts");
    // 각 제품의 pname, pitem, pcode를 배열에 담기
    const pnameArray = selectedProducts.map(product => product.pname); // 제품명 배열
    const pitemArray = selectedProducts.map(product => product.pitem.replace(/ /g, "")); // 제품 아이템(카테고리) 배열
    const pcodeArray = selectedProducts.map(product => product.pcode); // 제품 코드 배열
    const bcodeArray = selectedProducts.map(product => product.bcode); // 제품 코드 배열
    const startDateArray = selectedProducts.map(product => product.startDate); // 제품 시작일 배열
    const endDateArray = selectedProducts.map(product => product.endDate); // 제품 종료일 배열
    const orderProductId = orderProducts.map(product => product.id); // 제품 아이디 배열
    const orderProductBcodeId = orderProducts.map(product => product.orderProductBcodes[0].id); // 제품 코드 아이디 배열
    console.log(pnameArray, pitemArray, pcodeArray,bcodeArray,startDateArray,endDateArray, "pnameArray, pitemArray, pcodeArray,bcodeArray");

    // 대여 중지가 아니고 동일한 의료기기가 아닌 경우 처리
    // if (stop_chk_result === 0 && medichk !== "same") {
    if (sterilizeType!="동일인"){
      for (let j = 0; j < pcodeArray.length; j++) {
        try {
          // 메뉴 이동 및 제품 코드 입력
          await menuMove('nprk303',this.driver);
          await waitForLoading(this.driver);
          
          // 제품 코드 입력
          await this.driver.executeScript(
            "document.getElementById('mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.edt_wimCd:input').value='" + pcodeArray[j] + "'"
          );
          
          // 바코드 입력
          await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.edt_bcdNo:input"]'}).clear();
          await this.driver.findElement({ xpath:'//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.edt_bcdNo:input"]'}).sendKeys(bcodeArray[j].replace(' ', ''));
          
          // 검색 버튼 클릭
          await this.driver.executeScript(
            "return nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.btn_search_onclick()"
          );

          
          // 로딩 이미지 대기
          // await waitForLoading(this.driver);
          
          // 알림창 처리
          try {
            // 알림창 대기
            const alert = await this.driver.wait(until.alertIsPresent(), 5000);
            const result = await this.driver.switchTo().alert();
            const alertText = await result.getText();
            
            if (alertText.includes("없습니다")) {
              console.log("알림창 메시지:", alertText);
              await result.accept();
              
              // 창 닫기
              await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form.div_functionButton.form.btn_close"]' }).click();
              
              // 메뉴 이동
              await menuMove('nprk301', this.driver);
              
              // 바코드 스캔 버튼 클릭
              await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form._div_bizFrameMain.form.btn_wimCdScan"]' }).click();
              
              // 바코드 입력
              await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form._div_bizFrameMain.form.edt_bcdNo:input"]' }).sendKeys(bcodeArray[j]);
              
              // 제품 코드 입력
              await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form._div_bizFrameMain.form.edt_wimCd:input"]' }).clear();
              await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form._div_bizFrameMain.form.edt_wimCd:input"]' }).sendKeys(pcodeArray[j]);
              
              // 엔터 키 입력
              await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form._div_bizFrameMain.form.edt_bcdNo:input"]' }).sendKeys(Key.ENTER);
              
              // 날짜 입력 필드 클릭 및 설정
              const dateField = await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form._div_bizFrameMain.form.cal_aplyDt.calendaredit:input"]' });
              await dateField.click();
              await dateField.clear();
              
              // 현재 날짜 설정 (YYYYMMDD 형식)
              // const today = new Date();
              // const formattedDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
              await dateField.sendKeys(startDateArray[j]);

              // console.log(formattedDate, "formattedDate");
              // return;
              // 확인 버튼 클릭
              await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form._div_bizFrameMain.form.btn_confirm"]' }).click();
              await new Promise(resolve => setTimeout(resolve, 1000));
              
              try {
                // 알림창 확인
                const innerAlert = await this.driver.wait(until.alertIsPresent(), 3000);
                const innerResult = await this.driver.switchTo().alert();
                const innerAlertText = await innerResult.getText();
                
                if (innerAlertText.includes("사용중인") || innerAlertText.includes("않습니다") || innerAlertText.includes("불가합니다")) {
                  console.log("알림창 메시지:", innerAlertText);
                  await innerResult.accept();
                  await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form.div_functionButton.form.btn_close"]' }).click();
                  
                  // 계약 상태 업데이트 필요 시 여기에 추가
                  await menuMove('npia201', this.driver);
                  return;
                }
                
                if (innerAlertText.includes("타사업소에서 대여제품으로 사용하였던 제품")) {
                  await innerResult.accept();
                  await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form._div_bizFrameMain.form.btn_save"]' }).click();
                  
                  // 첫 번째 알림창 처리
                  const saveAlert1 = await this.driver.wait(until.alertIsPresent(), 2000);
                  await saveAlert1.accept();
                  
                  // 두 번째 알림창 처리
                  const saveAlert2 = await this.driver.wait(until.alertIsPresent(), 2000);
                  await saveAlert2.accept();
                  
                  await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form.div_functionButton.form.btn_close"]' }).click();
                  
                  // 메뉴 이동 및 검색 다시 시도
                  await menuMove('nprk303m01', this.driver);
                  await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.edt_wimCd:input"]' }).clear();
                  await this.driver.executeScript(
                    "document.getElementById('mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.edt_wimCd:input').value='" + pcodeArray[j] + "'"
                  );
                  await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.edt_bcdNo:input"]' }).sendKeys(bcodeArray[j]);
                  await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.btn_search"]' }).click();
                }
              } catch (innerError) {
                console.log("내부 알림창 처리 중 오류:", innerError);
                
                // 알림창이 없는 경우 저장 진행
                await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form._div_bizFrameMain.form.btn_save"]' }).click();
                
                // 첫 번째 알림창 처리
                const saveAlert1 = await this.driver.wait(until.alertIsPresent(), 2000);
                await saveAlert1.accept();
                
                // 두 번째 알림창 처리
                const saveAlert2 = await this.driver.wait(until.alertIsPresent(), 2000);
                await saveAlert2.accept();
                
                await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form.div_functionButton.form.btn_close"]' }).click();
                
                // 메뉴 이동 및 검색 다시 시도
                await menuMove('nprk303m01', this.driver);
                await this.driver.executeScript(
                  "document.getElementById('mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.edt_wimCd:input').value='" + pcodeArray[j] + "'"
                );
                await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.edt_bcdNo:input"]' }).sendKeys(bcodeArray[j]);
                await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.btn_search"]' }).click();
              }
            } else if (alertText.includes("바코드자리수")) {
              console.log("바코드 자리수 오류:", alertText);
              await result.accept();
              await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form.div_functionButton.form.btn_close"]' }).click();
              
              // 계약 상태 업데이트 필요 시 여기에 추가
              await menuMove('npia201', this.driver);
              return;
            }
          } catch (error) {
            console.log("알림창 처리 중 오류 또는 알림창 없음:", error);
          }
          // 검색 결과 처리
        } catch (error) {
          console.log("대여 계약 처리 중 오류 발생:", error);
        }

        // 검색 결과 처리
        try {
          // 로딩 대기
          await waitForLoading(this.driver);
          
          // 검색 결과 총 개수 확인
          const rcnt = await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.sta_totalCnt:text"]/span/span')).getText();
          
          let resulttxt1 = '';
          let resulttxt2 = '';
          let resulttxt3 = '';
          
          if (parseInt(rcnt) !== 0) {
            for (let k = 0; k < parseInt(rcnt); k++) {
              const rtxt1 = pcodeArray[j] + '-' + bcodeArray[j];
              const rtxt2 = await this.driver.findElement(By.xpath(`//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.grd_wimLndngPrdctStusList.body.gridrow_${k}.cell_${k}_1"]`)).getText();
              
              if (rtxt1.replace(' ', '') === rtxt2.replace(' ', '')) {
                resulttxt1 = await this.driver.findElement(By.xpath(`//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.grd_wimLndngPrdctStusList.body.gridrow_${k}.cell_${k}_9:text"]`)).getText();
                resulttxt2 = await this.driver.findElement(By.xpath(`//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.grd_wimLndngPrdctStusList.body.gridrow_${k}.cell_${k}_10:text"]`)).getText();
                resulttxt3 = await this.driver.findElement(By.xpath(`//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.grd_wimLndngPrdctStusList.body.gridrow_${k}.cell_${k}_5:text"]`)).getText();
                break;
              } else if (k === parseInt(rcnt) - 1) {
                // 마지막 항목까지 검색했는데 일치하는 항목이 없는 경우
                event.sender.send('rent-contract-message', { type: 'message', message: '대여제품 등록중입니다.' });
                
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form.div_functionButton.form.btn_close"]')).click();
                await menuMove('nprk301', this.driver);
                
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form._div_bizFrameMain.form.btn_wimCdScan"]')).click();
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form._div_bizFrameMain.form.edt_bcdNo:input"]')).sendKeys(bcodeArray[j]);
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form._div_bizFrameMain.form.edt_wimCd:input"]')).clear();
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form._div_bizFrameMain.form.edt_wimCd:input"]')).sendKeys(pcodeArray[j]);
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form._div_bizFrameMain.form.edt_bcdNo:input"]')).sendKeys(Key.ENTER);
                
                // 날짜 입력 처리
                const startDate = orderData.startDate || new Date().toISOString().slice(0, 10).replace(/-/g, '');
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form._div_bizFrameMain.form.cal_aplyDt.calendaredit:input"]')).click();
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form._div_bizFrameMain.form.cal_aplyDt.calendaredit:input"]')).clear();
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form._div_bizFrameMain.form.cal_aplyDt.calendaredit:input"]')).sendKeys(startDate);
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form._div_bizFrameMain.form.btn_confirm"]')).click();
                
                // 알림창 처리
                try {
                  const alert = await this.driver.wait(until.alertIsPresent(), 3000);
                  const alertText = await alert.getText();
                  await alert.accept();
                } catch (error) {
                  console.log("알림창 없음:", error);
                  
                  // 저장 진행
                  await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form._div_bizFrameMain.form.btn_save"]')).click();
                  
                  // 첫 번째 알림창 처리
                  const saveAlert1 = await this.driver.wait(until.alertIsPresent(), 2000);
                  await saveAlert1.accept();
                  
                  // 두 번째 알림창 처리
                  const saveAlert2 = await this.driver.wait(until.alertIsPresent(), 2000);
                  await saveAlert2.accept();
                  
                  await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020100.form.div_functionButton.form.btn_close"]')).click();
                  
                  // 메뉴 이동 및 검색 다시 시도
                  await menuMove('nprk303m01', this.driver);
                  await this.driver.executeScript(
                    "document.getElementById('mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.edt_wimCd:input').value='" + pcodeArray[j] + "'"
                  );
                  await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.edt_bcdNo:input"]')).sendKeys(bcodeArray[j]);
                  await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.btn_search"]')).click();
                }
                
                // 로딩 대기
                await waitForLoading(this.driver);
                
                // 검색 결과 재확인
                const rcntAfterSave = await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.sta_totalCnt:text"]/span/span')).getText();
                
                if (parseInt(rcntAfterSave) !== 0) {
                  for (let k = 0; k < parseInt(rcntAfterSave); k++) {
                    const rtxt1 = pcodeArray[j] + '-' + bcodeArray[j];
                    const rtxt2 = await this.driver.findElement(By.xpath(`//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.grd_wimLndngPrdctStusList.body.gridrow_${k}.cell_${k}_1"]`)).getText();
                    
                    if (rtxt1 === rtxt2) {
                      resulttxt1 = await this.driver.findElement(By.xpath(`//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.grd_wimLndngPrdctStusList.body.gridrow_${k}.cell_${k}_9:text"]`)).getText();
                      resulttxt2 = await this.driver.findElement(By.xpath(`//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.grd_wimLndngPrdctStusList.body.gridrow_${k}.cell_${k}_10:text"]`)).getText();
                      resulttxt3 = await this.driver.findElement(By.xpath(`//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form._div_bizFrameMain.form.grd_wimLndngPrdctStusList.body.gridrow_${k}.cell_${k}_5:text"]`)).getText();
                      break;
                    }
                  }
                }
              }
            }
            
            // 검색 결과에 따른 처리
            if ((resulttxt2 === "소독" && resulttxt1 === "보관") || (resulttxt2 === "신규")) {
              // 소독된 바코드 처리
              event.sender.send('rent-contract-message', { type: 'message', message: '소독된 바코드입니다. 대여계약 진행중입니다.' });
              await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form.div_functionButton.form.btn_close"]')).click();
            } else if (resulttxt2 === "반납" && resulttxt1 === "보관") {
              // 소독필증 작성 필요
              event.sender.send('rent-contract-message', { type: 'message', message: '소독필증 작성중입니다.' });
              
              // 소독필증 작성 로직 구현
              await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form.div_functionButton.form.btn_close"]')).click();
              
              // 기존 창 닫기 시도
              try {
                await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form.cfn_close()");
              } catch (error) {
                console.log("창 닫기 오류:", error);
              }
              
              // 소독필증 작성 메뉴로 이동
              await menuMove('nprk207m03', this.driver);
              
              // 대기 설정
              await this.driver.manage().setTimeouts({ implicit: 3000 });
              
              // 소독 유형 선택
              if (sterilizeType === "자체") {
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.rdo_exposeTypeCd.radioitem0:icontext"]')).click();
              } else {
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.rdo_exposeTypeCd.radioitem1:icontext"]')).click();
                await this.driver.sleep(500);
                
                // 작업자 정보 입력
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.edt_wrkerNm:input"]')).click();
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.edt_wrkerNm:input"]')).sendKeys(sterilizeCompanyName[j]);
                
                // 등록번호 입력
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.met_regNo:input"]')).click();
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.met_regNo:input"]')).sendKeys(sterilizeCompanyNumber[j]);
                
                // 소독필증 번호 입력
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.div_rexdcert.form.edt_rexdcertNo:input"]')).click();
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.div_rexdcert.form.edt_rexdcertNo:input"]')).sendKeys(sterilizeNumber[j]);
              }
              
              // 소독일자 입력
              await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.cal_exposeDt.calendaredit"]')).click();
              await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.cal_exposeDt.calendaredit"]/input')).clear();
              await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.cal_exposeDt.calendaredit"]/input')).sendKeys(sterilizeDate[j]);
              
              // 소독 방법 선택
              let meditxtcnt = 1;
              if (sterilizeProductType[j] === "약물소독") {
                meditxtcnt = 1;
              } else if (sterilizeProductType[j] === "증기소독") {
                meditxtcnt = 2;
              } else if (sterilizeProductType[j] === "일광소독") {
                meditxtcnt = 3;
              } else if (sterilizeProductType[j] === "끓는물소독") {
                meditxtcnt = 4;
              } else if (sterilizeProductType[j] === "기타") {
                meditxtcnt = 5;
              }
              
              try {
                await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.grid_wimExposeDesc.body.gridrow_0.cell_0_1"]')).click();
                for (let x = 0; x < meditxtcnt; x++) {
                  await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.grid_wimExposeDesc.body.gridrow_0.cell_0_1"]')).sendKeys(Key.ARROW_DOWN);
                }
              } catch (error) {
                console.log(error);
              }
              
              // 약제명과 규격 입력
              await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.grid_wimExposeDesc.body.gridrow_0.cell_0_3"]')).click();
              await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.grid_wimExposeDesc.body.gridrow_0.cell_0_3.celledit:input"]')).sendKeys(sterilizeProductName[j]);
              await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.grid_wimExposeDesc.body.gridrow_0.cell_0_5"]')).click();
              await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.grid_wimExposeDesc.body.gridrow_0.cell_0_5.celledit:input"]')).sendKeys(sterilizeProductAmount[j]);
              
              // 바코드 검색
              await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.edt_bcdNo.value='111111111111'");
              await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.btn_search"]')).click();
              await waitForLoading(this.driver);
              
              // 실제 바코드 정보 입력
              await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.edt_wimCd.value='" + pcodeArray[j] + "'");
              await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.edt_bcdNo.value='" + bcodeArray[j].replace(' ', '') + "'");
              await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.btn_search"]')).click();
              await waitForLoading(this.driver);
              
              // 검색 결과 선택 및 저장
              await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form._div_bizFrameMain.form.grid_wimList.body.gridrow_0.cell_0_0.cellcheckbox:icontext"]')).click();
              await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form.div_functionButton.form.btn_save"]')).click();
              
              // 알림창 처리
              const alert1 = await this.driver.wait(until.alertIsPresent(), 5000);
              await alert1.accept();
              
              try {
                const alert2 = await this.driver.wait(until.alertIsPresent(), 5000);
                await alert2.accept();
              } catch (error) {
                console.log("두 번째 알림창 없음:", error);
              }
              
              // 창 닫기
              await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04030100.form.div_functionButton.form.btn_close"]')).click();
              // 소독필증 작성 완료 메시지
              event.sender.send('rent-contract-message', { type: 'message', message: '소독필증 작성이 완료되었습니다. 대여계약 진행중입니다.' });
            } else if (resulttxt1 === "대여") {
              // 이미 대여 중인 바코드
              const errorMessage = "현재 대여 등록된 바코드입니다.";
              event.sender.send('rent-contract-message', { type: 'error', message: errorMessage + '|' + bcodeArray[j] });
              await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04020200.form.div_functionButton.form.btn_close"]')).click();
              
              // 메뉴 이동
              await menuMove('npia201', this.driver);
              return;
            }
          } else {
            // 검색 결과가 없는 경우
            const errorMessage = "대여제품조회실패";
            event.sender.send('rent-contract-message', { type: 'error', message: errorMessage });
            return;
          }
          
          // 마지막 제품 처리 후 메시지 전송
          if (j === pcodeArray.length - 1) {
            event.sender.send('rent-contract-message', { type: 'message', message: '대여계약 진행중입니다.' });
          }
        } catch (error) {
          console.error("검색 결과 처리 중 오류:", error);
          event.sender.send('rent-contract-message', { type: 'error', message: '검색 결과 처리 중 오류가 발생했습니다.' });
        }


        // }
      }
    }
    await menuMove('npia201', this.driver);
    console.log(name,number,ranker,resident,rcgt,startDateArray[0]);
    await this.lookup(this.driver,name,number,ranker,resident,rcgt,startDateArray[0]);
    try {
      // 제품 등록 프로세스 구현
      try {
        
        // 복지용구 대상자 이력 목록 가져오기
        const nxudatearr = await this.driver.executeScript(
          "return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub._active_frame.winNPA04010100.form._div_bizFrameMain.form.ds_welToolTgtHistList._rawRecords"
        );
        
        // 날짜 정보 추출
        const truedatesp = [nxudatearr[nxudatearr.length - 1][8], nxudatearr[nxudatearr.length - 1][2]];
        
        // 현재 시간 정보
        const nowtime = new Date();
        const nowtimey = nowtime.getFullYear();
        const nowtimem = nowtime.getMonth() + 1;
        const nowtimed = nowtime.getDate();
        const nowtimeymd = `${nowtimey}-${nowtimem < 10 ? '0' + nowtimem : nowtimem}-${nowtimed < 10 ? '0' + nowtimed : nowtimed}`;
        
        console.log("복지용구 대상자 이력 정보:", truedatesp);
        console.log("현재 날짜:", nowtimeymd);
        console.log("rentAddContractData",rentAddContractData)
        // 날짜 배열 처리 로직
        for (let e = 0; e < rentAddContractData.nextDateArray.length; e += 2) {
          if (new Date(rentAddContractData.nextDateArray[e].replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')) <= new Date(endDateArray[0].replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'))) {
            rentAddContractData.nextDateArray[e + 1] = endDateArray[0];
            break;
          }
        }
        
        for (let e = 0; e < rentAddContractData.nextDateArray.length; e++) {
          if (e % 2 !== 0) {
            if (new Date(rentAddContractData.nextDateArray[e].replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')) < new Date(startDateArray[0].replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'))) {
              rentAddContractData.nextDateArray.splice(e - 1, 2);
              break;
            }
          }
        }
        
        const inextdatearray = rentAddContractData.nextDateArray.indexOf(endDateArray[0]);  // 전체 적용구간 배열에서 계약종료일 앞에 배열 삭제 확인
        if (inextdatearray > 1) {
          rentAddContractData.nextDateArray.splice(0, inextdatearray - 1);
        }
      } catch (error) {
        console.log("제품 등록 프로세스 중 오류 발생:", error);
      }
      
      console.log(rentAddContractData.nextDateArray, "rentAddContractData.nextDateArray");

      
      
      
      // 화면 요소 위치 조정
      try {
        await this.driver.executeScript(`
          function getElementByXpath(path) {
            return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          } 
          getElementByXpath('/html/body/div[2]/div[1]/div/div[3]/div/div[3]/div/div[2]/div/div[1]/div[1]/div/div[1]/div/div[1]/div/div[3]/div').style.top = '-200px';
        `);
      } catch (error) {
        console.log('화면 요소 위치 조정 중 오류:', error);
        event.sender.send('buyContractResponse', { success: false, message: '화면 요소 위치 조정 중 오류 발생' });
      }
      // 대리인 관계 설정
      try {
        console.log("대리인 관계 설정 시작");
        // 대리인 관계 콤보박스 클릭
        await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.form._div_bizFrameMain.form.cmb_prsRel.comboedit:input"]' }).click();
        await new Promise(resolve => setTimeout(resolve, 200));
        await this.driver.findElement({xpath: `//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.form._div_bizFrameMain.form.cmb_prsRel.combolist.item_${clientRelationInfoId-1}:text"]`}).click();
        console.log("대리인 관계 설정 완료");
        // 대리인 관계 입력 확인
        await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.form._div_bizFrameMain.form.cmb_prsRel.comboedit:input"]' }).sendKeys(Key.ENTER);
        console.log("대리인 관계 설정 완료");
      } catch (error) {
        console.log('대리인 관계 설정 중 오류:', error);
        event.sender.send('buyContractResponse', { success: false, message: '대리인 관계 설정 중 오류 발생' });
      }
      console.log(clientRelationInfoId, "clientRelationInfoId");
      // 본인이 아닌 경우 대리인 이름 입력
      if (clientRelationInfoId !== 9) {
        try {
          await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.form._div_bizFrameMain.form.edt_ctrFnm:input"]' }).sendKeys(guardName);
        } catch (error) {
          console.log('대리인 이름 입력 중 오류:', error);
          event.sender.send('buyContractResponse', { success: false, message: '대리인 이름 입력 중 오류 발생' });
        }
      }
      
      // 잠시 대기
      await new Promise(resolve => setTimeout(resolve, 500));

      // 전화번호 입력
      try {
        console.log("전화번호 입력 시작");
        // 전화번호 첫 번째 부분 입력
        await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.form._div_bizFrameMain.form.edt_telNo1:input"]' }).click();
        await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.form._div_bizFrameMain.form.edt_telNo1:input"]' }).sendKeys(phoneSegments[0]);
        
        // 전화번호 두 번째 부분 입력
        await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.form._div_bizFrameMain.form.edt_telNo2:input"]' }).sendKeys(phoneSegments[1]);
        
        // 전화번호 세 번째 부분 입력
        await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.form._div_bizFrameMain.form.edt_telNo3:input"]' }).sendKeys(phoneSegments[2]);
        
        console.log("전화번호 입력 완료");

        if (optionPhone === 1) {
          // 전화번호 없음 체크박스 클릭
          console.log("전화번호 없음 체크박스 클릭 시작");
          try {
            await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.form._div_bizFrameMain.form.chk_noTelno:icontext"]/img' }).click();
            console.log("전화번호 없음 체크박스 클릭 완료");
          } catch (error) {
            console.log('전화번호 없음 체크박스 클릭 중 오류:', error);
          }
          await new Promise(resolve => setTimeout(resolve, 300)); // 0.3초 대기
        }
      } catch (error) {
        console.log('전화번호 입력 중 오류:', error);
        event.sender.send('buyContractResponse', { success: false, message: '전화번호 입력 중 오류 발생' });
      }

      // 계약서 복사 체크박스 클릭
      try {
        console.log("계약서 복사 체크박스 클릭 시작");
        await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.form._div_bizFrameMain.form.chk_copy:icontext"]' }).click();
        console.log("계약서 복사 체크박스 클릭 완료");
      } catch (error) {
        console.log('계약서 복사 체크박스 클릭 중 오류:', error);
        event.sender.send('buyContractResponse', { success: false, message: '계약서 복사 체크박스 클릭 중 오류 발생' });
      }

      // 화면 요소 위치 조정 (전화번호 입력 후)
      try {
        console.log("화면 요소 위치 추가 조정 시작");
        await this.driver.executeScript(`
          function getElementByXpath(path) {
            return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          } 
          getElementByXpath('/html/body/div[2]/div[1]/div/div[3]/div/div[3]/div/div[2]/div/div[1]/div[1]/div/div[1]/div/div[1]/div/div[3]/div').style.top = '-700px';
        `);
        console.log("화면 요소 위치 추가 조정 완료");
      
      } catch (error) {
        console.log('화면 요소 추가 위치 조정 중 오류:', error);
        event.sender.send('buyContractResponse', { success: false, message: '화면 요소 추가 위치 조정 중 오류 발생' });
      }

      // 대여 계약 연장 처리
      try {
        console.log("대여 계약처리 시작");
        
        // rentAddContractData에서 필요한 데이터 추출
        const { products, nextDateArray } = rentAddContractData;
        
        // 화면 요소 위치 조정
        await this.driver.executeScript(`
          function getElementByXpath(path) {
            return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          } 
          getElementByXpath('/html/body/div[2]/div[1]/div/div[3]/div/div[3]/div/div[2]/div/div[1]/div[1]/div/div[1]/div/div[1]/div/div[3]/div').style.top = '-800px';
        `);
        
        // 다음 적용 구간이 없는 경우 처리
        if (!nextDateArray || nextDateArray.length < 1) {
          console.log("다음 적용 구간 없음");
          nextDateArray = [];
          // await this.driver.executeScript(`
          //   function getElementByXpath(path) {
          //     return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          //   } 
          //   getElementByXpath('/html/body/div[2]/div[1]/div/div[3]/div/div[3]/div/div[2]/div/div[1]/div[1]/div/div[1]/div/div[1]/div/div[3]/div').style.top = '0px';
          // `);
          // event.sender.send('rentContractResponse', { success: false, message: '다음 적용 구간 없음' });
          // return { success: false, message: '다음 적용 구간 없음' };
        }
        
        const itemsArray = [];
        // 각 제품에 대한 처리
        for (const product of products) {
          console.log(`제품 처리 시작: ${product.pname}`);
          
          // 대여 계약 버튼 클릭
          await this.driver.executeScript(`
            nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.form._div_bizFrameMain.form.btn_lndngCtrIn_onclick()
          `);
          await waitForLoading(this.driver);
          
          // 대여 품목 선택
          await this.driver.findElement(By.css('#mainframe\\.VFrameSet\\.HFrameSet\\.VFrameSetSub\\.framesetWork\\.winNPA04010100\\.npia207p01\\.form\\._div_bizFrameMain\\.form\\.cmb_wimDtlItmCd\\.comboedit')).click();
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // 품목 목록 가져오기
          let cpnamelist;
          try {
            cpnamelist = await this.driver.findElement(By.xpath('/html/body/div[2]/div[2]/div[4]/div/div[1]/div'));
          } catch (error) {
            cpnamelist = await this.driver.findElement(By.xpath('/html/body/div[2]/div[4]/div[4]/div/div[1]/div'));
            console.log('품목 목록 가져오기 오류:', error);
          }
          
          // 품목명 처리
          const cpnamesize = await cpnamelist.findElements(By.className('nexacontentsbox'));
          let productFound = false;
          
          // 품목명 매칭
          let productItem = product.pitem;
          if (productItem === "경사로(실외)") productItem = "경사로(실외용)";
          if (productItem === "욕창예방 매트리스") productItem = "욕창예방매트리스";
          
          for (let i = 0; i < cpnamesize.length; i++) {
            const itemText = await cpnamesize[i].getText();
            if (itemText === "(대여품목)" + productItem) {
              await cpnamesize[i].click();
              productFound = true;
              break;
            }
          }
          
          // 품목을 찾지 못한 경우
          if (!productFound) {
            console.log("대여 불가 품목");
            await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia207p01.titlebar.closebutton"]')).click();
            event.sender.send('rentContractResponse', { success: false, message: '대여 불가 품목' });
            return { success: false, message: '대여 불가 품목' };
          }
          
          // 조회 버튼 클릭
          await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia207p01.form._div_bizFrameMain.form.btn_select"]')).click();
          await waitForLoading(this.driver);
          
          // 제품 목록에서 해당 제품 찾기
          const rplist = await this.driver.executeScript(
            "return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia207p01.form._div_bizFrameMain.form.ds_welLndTool._viewRecords"
          );
          
          let rpnum = -1;
          for (let p = 0; p < rplist.length; p++) {
            if (rplist[p][0] === product.pcode && rplist[p][1] === product.bcode) {
              rpnum = p;
              break;
            }
          }

          // 제품을 찾지 못한 경우
          if (rpnum === -1) {
              console.log("제품을 찾을 수 없음");
              await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia207p01.form._div_bizFrameMain.form.btn_close"]')).click();
              return { success: false, message: '제품을 찾을 수 없음' };
          }

          //nextDateArray를 2개씩 객체로 묶기
          const nextDateArrayObject = nextDateArray.map((date, index) => {
            if (index % 2 === 0) {
              return {
                  startDate: date.replace(/-/g,''),
                  endDate: nextDateArray[index + 1].replace(/-/g,'')
              }
            }else{
              return null;
            }
          }).filter(dateObject => dateObject !== null);
          console.log(nextDateArrayObject, "nextDateArrayObject");
          //product.endDate가 포함되는 객체만 분리
          let nextDateArrayObjectFilter = nextDateArrayObject.filter(dateObject => dateObject.startDate <= product.endDate);
          console.log(nextDateArrayObjectFilter, "nextDateArrayObjectFilter");
          //nextDateArrayObjectFilter의 객체안에 날짜를 확인해서 오름차순으로 객체 배열을 정렬
          nextDateArrayObjectFilter.sort((a, b) => a.endDate - b.endDate);
          console.log(nextDateArrayObjectFilter, "nextDateArrayObjectFilter");

          if (nextDateArrayObjectFilter.length > 0) {
              // 첫 번째 객체의 시작일 하루 전 계산
              const firstStartDate = nextDateArrayObjectFilter[0].startDate.replace(/ /g,'');
              const firstStartDateObj = new Date(
              firstStartDate.substring(0, 4) + '-' + 
              firstStartDate.substring(4, 6) + '-' + 
              firstStartDate.substring(6, 8)
              );
              firstStartDateObj.setDate(firstStartDateObj.getDate() - 1);
              
              // 하루 전 날짜를 YYYYMMDD 형식으로 변환
              const dayBeforeFirstStart = 
              firstStartDateObj.getFullYear() +
              ('0' + (firstStartDateObj.getMonth() + 1)).slice(-2) +
              ('0' + firstStartDateObj.getDate()).slice(-2);
              
              if(firstStartDate !== product.startDate && product.startDate <= dayBeforeFirstStart){
                  // 새 객체 생성하여 배열 첫 번째에 추가 (시작일이 종료일보다 작은 경우만)
                  nextDateArrayObjectFilter.unshift({
                  startDate: product.startDate,
                  endDate: dayBeforeFirstStart
                  });
              }

              // 첫번째 객체의 startDate를 product.startDate로 설정
              nextDateArrayObjectFilter[0].startDate = product.startDate;
              
              // 마지막 객체의 endDate를 product.endDate로 교체
              const lastIndex = nextDateArrayObjectFilter.length - 1;
              nextDateArrayObjectFilter[lastIndex].endDate = product.endDate;
              
              // 모든 객체에 대해 startDate가 endDate보다 큰지 확인하고 제거
              nextDateArrayObjectFilter = nextDateArrayObjectFilter.filter(obj => 
                  obj.startDate <= obj.endDate
              );
              
              console.log(nextDateArrayObjectFilter, "수정된 nextDateArrayObjectFilter");
          }else{
              nextDateArrayObjectFilter = [{
                  startDate: product.startDate,
                  endDate: product.endDate
              }]
          }
          console.log(nextDateArrayObjectFilter, "nextDateArrayObjectFilter");
          for (const dateObject of nextDateArrayObjectFilter) {
              console.log(dateObject, "dateObject");
              // 시작일과 종료일 설정
              await this.driver.executeScript(
              `nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia207p01.form._div_bizFrameMain.form.ds_welLndTool.setColumn(${rpnum},'LND_FR_DT','${dateObject.startDate}')`
              );
              await this.driver.executeScript(
              `nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia207p01.form._div_bizFrameMain.form.ds_welLndTool.setColumn(${rpnum},'LND_TO_DT','${dateObject.endDate}')`
              );
              await this.driver.executeScript(
              `nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia207p01.form._div_bizFrameMain.form.fn_validlndPsblYn(${rpnum})`
              );
              // 알림 처리
              try {
                const alertText = await handleAlerts(this.driver);
                console.log(alertText, "alertText");
                if (alertText.includes("연장대여하시겠습니까")) {
                  try {
                      await this.driver.wait(until.alertIsPresent(), 5000);
                      const secondAlert = await this.driver.switchTo().alert();
                      await secondAlert.accept();
                      
                      await this.driver.manage().setTimeouts({ implicit: 3000 });
                      
                      await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia207p01.npia207p04.form._div_bizFrameMain.form.btn_apply"]')).click();
                      
                      await this.driver.executeScript(
                          `nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia207p01.form._div_bizFrameMain.form.fn_validlndPsblYn(${rpnum})`
                      );
                  } catch (error) {
                      console.log('연장대여 알림 처리 중 오류:', error);
                  }
                }
              } catch (error) {
                  console.log('알림 처리 중 오류:', error);
              }
              
              // 결과 확인
              try {
                  const resultText = await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia207p01.npia207p03.form._div_bizFrameMain.form.div_cfmRst.form.sta_rstMsg:text"]')).getText();
                  if (resultText.includes("이용가능합니다")) {
                  await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia207p01.npia207p03.form._div_bizFrameMain.form.div_cfmRst.form.btn_apply"]')).click();
                  await waitForLoading(this.driver);
                  } else {
                  console.log("이용 불가:", resultText);
                  await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia207p01.npia207p03.form._div_bizFrameMain.form.div_cfmRst.form.btn_close"]')).click();
                  event.sender.send('rentContractResponse', { success: false, message: resultText });
                  return { success: false, message: resultText };
                  }
              } catch (error) {
                  console.log('결과 확인 중 오류:', error);
                  await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia207p01.form._div_bizFrameMain.form.btn_close"]')).click();
                  return { success: false, message: error.toString() };
              }
              
          }

          await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia207p01.form._div_bizFrameMain.form.btn_close"]')).click();
          const items = products.map((p, index) => ({
              rentId: rentId,
              orderId: id,
              orderProductId: orderProductId[index],
              orderProductBcodeId: orderProductBcodeId[index],
              contractAt: new Date().toISOString().split('T')[0],
              constractStartDate: p.startDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
              contractEndDate: p.endDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
              type: '1'
            }));
          itemsArray.push(...items);
        }
        
        // 계약 전송 버튼 클릭
        await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.form._div_bizFrameMain.form.btn_pblcpTrs_onclick()");
        
        // 알림 처리
        try {
          await handleAlerts(this.driver);
          await new Promise(resolve => setTimeout(resolve, 2000));
          await handleAlerts(this.driver);
          await new Promise(resolve => setTimeout(resolve, 2000));
          // 성공 메시지 확인

          const result2 = await this.driver.switchTo().alert();
          const alertText = await result2.getText();

          

          if (alertText.includes("계약되었습니다")) {
            await this.updateContractState(orderData.id,'ok');
            let stopCheck = 0;
            if(eventType === "rentContractStopCancel"){
              stopCheck = 2;
            }else if(eventType === "rentContractStopRestart"){
              stopCheck = 3;
              await this.copyOrder(
                rentId, 
                products[0].startDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'), 
                products[0].endDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
                companyId
              );
            }
            await this.updateRentEndDate(rentId,products[0].endDate,stopCheck);
            console.log("계약이 정상적으로 완료되었습니다.");
            await handleAlerts(this.driver);
            event.sender.send('rentContractResponse', { 
              success: true, 
              message: '계약이 정상적으로 완료되었습니다.',
              data: {
                bcode: products.map(p => p.bcode),
                endDate: products[0].endDate
              }
            });
            return true;
          } else {
            console.log("계약 실패:", alertText);
            event.sender.send('rentContractResponse', { success: false, message: alertText });
            return false;
          }
        } catch (error) {
          console.log('계약 전송 중 오류:', error);
          event.sender.send('rentContractResponse', { success: false, message: '계약 전송 중 오류 발생' });
        }
        
        console.log("대여 계약 처리 완료");
      } catch (error) {
        console.log('대여 계약 처리 중 오류:', error);
        event.sender.send('rentContractResponse', { success: false, message: '대여 계약 처리 중 중 오류 발생' });
      }
    } catch (error) {
      console.log('대여 계약 처리 중 오류 발생:', error);
      event.sender.send('rentContractResponse', { success: false, message: '대여 계약 처리 중 오류 발생' });
    }
  }

  async rentContractCancel(driver,event,args) {
    this.driver = driver;
    await menuMove('npia202',this.driver);
    await waitForLoading(this.driver);
    const argsData = JSON.parse(args);
    try {
      const { rentCancelContractData, orderData, rentId } = argsData;
      console.log(argsData, "argsData");
      const { name, number } = orderData.client;
      const products = rentCancelContractData.products;
      const cproductname2 = products.map(p => p.pitem);
      const cbcode = products.map(p => p.bcode);
      const edate = products.map(p => p.endDate);
      
      
      try {
        await this.driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form.cfn_close()");
      } catch (error) {
        console.log(error);
      }
      
      // 메뉴 이동
      await menuMove('npia202', this.driver);
      // await sleep(100);
      // this.driver.manage().timeouts().implicitlyWait(3000);
      
      console.log("고객 정보:", name, number);
      
      // 고객 정보 입력
      await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.edt_prsFnm:input"]')).sendKeys(name);
      await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.edt_ltcMgmtNo:input"]')).sendKeys(number);
      await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.btn_selectPln"]')).click();
      
      await waitForLoading(this.driver);
      
      await this.driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.grd_ltcoInfoList_oncellclick('',{col:6})");
      await waitForLoading(this.driver);
      await this.driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.grd_ltcoInfoList_oncellclick('',{col:6})");
      await waitForLoading(this.driver);
      
      let canclec = 0;
      
      for (let j = 0; j < cproductname2.length; j++) {
        let productName = cproductname2[j];
        if (productName === "경사로(실외)") {
          productName = "경사로(실외용)";
        }
        
        let rplist = await this.driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.ds_weltoolCtrLndList._viewRecords");
        // console.log(rplist);
        
        if (rplist && rplist.length > 0) {
          let p = 0;
          while (p < rplist.length) {
            console.log('0:' + p);
            console.log(rplist[p][0], cbcode[j].replace(" ", ""));
            console.log(rplist[p][37], productName);
            if (rplist[p][0] === cbcode[j].replace(" ", "") && rplist[p][37] === productName) {
              console.log(rplist[p][24].replace(" ", ""));
              console.log(rplist[p][1].replace(" ", ""));
              console.log(edate[0]);
              
              const urents1 = new Date(rplist[p][24].replace(" ", "").replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")).getTime();
              const urente1 = new Date(rplist[p][1].replace(" ", "").replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")).getTime();
              const uedate = new Date(edate[0].replace(" ", "").replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")).getTime();
              
              if (urents1 < uedate && urente1 <= uedate) {
                p++;
                console.log('1:' + p);
                console.log('1:' + rplist.length);
              } else if (urents1 <= uedate && urente1 > uedate) {
                console.log('2:' + p);
                await this.driver.executeScript(`nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.ds_weltoolCtrLndList.setColumn(${p},'AF_POF_TO_DT',${edate[0]})`);
                
                try {
                  const alert = await this.driver.wait(until.alertIsPresent(), 3000);
                  const alertText = await alert.getText();
                  if (alertText.includes('지급내역')) {
                    event.sender.send('rentContractCancelResponse', { success: false, message: alertText });
                    await alert.accept();
                    return;
                  }
                } catch (error) {
                  console.log(error);
                }
                
                // if (canclex[0] === "반품") {
                  canclec = 1;
                // } else if (canclex[0] === "착오계약") {
                //   canclec = 2;
                // } else if (canclex[0] === "자격변동") {
                //   canclec = 4;
                // } else {
                //   canclec = 3;
                // }
                
                await this.driver.executeScript(`nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.ds_weltoolCtrLndList.setColumn(${p}, 'UPD_TYPE',${canclec})`);
                
                // if (canclec === 3) {
                //   // await sleep(1000);
                //   await this.driver.executeScript(`nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.ds_weltoolCtrLndList.setColumn(${p}, 'CTR_CHG_RSN', '${canclex[0]}')`);
                // }
                
                try {
                  const alertText = await handleAlerts(this.driver);
                  await new Promise(resolve => setTimeout(resolve, 1500));
                  if (alertText.includes('지급내역')) {
                    event.sender.send('rentContractCancelResponse', { success: false, message: alertText });
                    return;
                  }
                } catch (error) {
                  console.log(error);
                  // event.sender.send('rentContractCancelResponse', { success: false, message: p+"취소계약 진행중..1" });
                  
                }
                
                console.log("완료버튼")
                // event.sender.send('rentContractCancelResponse', { success: false, message: "ㅁㅁㅁ" });

                try {
                  await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.btn_updDescTrs_onclick()");
                } catch (error) {
                  // event.sender.send('rentContractCancelResponse', { success: false, message: p+"취소계약 진행중.. 2" });
                  console.log(error);
                }
                try {
                  const alertText = await handleAlerts(this.driver);
                  await new Promise(resolve => setTimeout(resolve, 1500));
                  if (alertText.includes('변경된내역이 없습니다')) {
                    event.sender.send('rentContractCancelResponse', { success: false, message: alertText });
                  }
                } catch (error) {
                  // event.sender.send('rentContractCancelResponse', { success: false, message: p+"취소계약 진행중.. 3" });
                  console.log(error);
                }
                try {
                  await handleAlerts(this.driver);
                  await new Promise(resolve => setTimeout(resolve, 1500));
                } catch (error) {
                  // event.sender.send('rentContractCancelResponse', { success: false, message: p+"취소계약 진행중.. 4" });
                  console.log(error);
                }
                
                await this.driver.sleep(500);

                p++;
              } else if (urents1 > uedate) {
                await this.driver.executeScript(`return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.fn_validateChkAfPofToDt(${p}, 'delete')`);
                
                try {
                  const alertText = await handleAlerts(this.driver);
                  await new Promise(resolve => setTimeout(resolve, 1500));
                  if (alertText.includes('지급내역')) {
                    await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form.cfn_close()");
                  }
                } catch (error) {
                  await this.driver.executeScript(`nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.ds_weltoolCtrLndList.setColumn(${p}, 'CNCL_YN', '1')`);
                }
                
                await this.driver.executeScript(`nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.ds_weltoolCtrLndList.setColumn(${p}, 'UPD_TYPE',1)`);
                await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.btn_updDescTrs_onclick()");
                
                await handleAlerts(this.driver);
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                try {
                  await handleAlerts(this.driver);
                  await new Promise(resolve => setTimeout(resolve, 1500));
                } catch (error) {
                  console.log(error);
                }
                rplist = await this.driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.ds_weltoolCtrLndList._viewRecords");
                // await sleep(1000);
              } else {
                p++;
              }
            } else {
              p++;
            }
          }
          
          if (j === cproductname2.length - 1) {
            
            // event.sender.send('rentContractCancelResponse', { success: false, message: "5" });
            
            console.log(edate[0], "최종완료edate[0]");
            await this.updateRentEndDate(rentId,edate[0],0);
            await this.updateContractState(orderData.id,'cok');
            console.log(edate[0], "최종완료edate[1]");
          
            event.sender.send('rentContractCancelResponse', { 
              success: true, 
              message: '계약이 정상적으로 완료되었습니다.',
              data: {
                bcode: cbcode,
                endDate: edate[0]
              }
            });
          }
        } else {
          event.sender.send('rentContractCancelResponse', { success: false, message: '대여계약취소건이 없습니다' });
          return;
        }
      }
    } catch (error) {
      console.log('대여 계약 취소 처리 중 오류:', error);
      event.sender.send('rentContractCancelResponse', { success: false, message: '대여 계약 취소 처리 중 오류 발생' });
    }
  }

  async rentContractStop(driver,event,args) {
    this.driver = driver;

    await menuMove('npia202',this.driver);
    await waitForLoading(this.driver);
    const argsData = JSON.parse(args);
    try {
      const { rentStopContractData, orderData, rentId, stopUndoDate,stopEndDate,stopReason,companyId } = argsData;
      const insertRentStopContractData = {
        orderData: orderData,
        rentId: rentId,
        stopUndoDate: stopUndoDate,
        stopEndDate: stopEndDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'),
        stopReason: stopReason,
        companyId: companyId
      }
      
      console.log(argsData, "argsData");
      const { name, number } = orderData.client;
      const products = rentStopContractData.products;
      const cproductname2 = products.map(p => p.pitem);
      const cbcode = products.map(p => p.bcode);
      const edate = stopEndDate;
      
      try {
        await this.driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form.cfn_close()");
      } catch (error) {
        console.log(error);
      }
      
      // 메뉴 이동
      await menuMove('npia202', this.driver);
      // await sleep(100);
      // this.driver.manage().timeouts().implicitlyWait(3000);
      
      console.log("고객 정보:", name, number);
      
      // 고객 정보 입력
      await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.edt_prsFnm:input"]')).sendKeys(name);
      await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.edt_ltcMgmtNo:input"]')).sendKeys(number);
      await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.btn_selectPln"]')).click();
      
      await waitForLoading(this.driver);
      
      await this.driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.grd_ltcoInfoList_oncellclick('',{col:6})");
      await waitForLoading(this.driver);
      await this.driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.grd_ltcoInfoList_oncellclick('',{col:6})");
      await waitForLoading(this.driver);
      
      let canclec = 0;
      
      for (let j = 0; j < cproductname2.length; j++) {
        let productName = cproductname2[j];
        if (productName === "경사로(실외)") {
          productName = "경사로(실외용)";
        }
        
        let rplist = await this.driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.ds_weltoolCtrLndList._viewRecords");
        // console.log(rplist);
        
        if (rplist && rplist.length > 0) {
          let p = 0;
          while (p < rplist.length) {
            console.log('0:' + p);
            console.log(rplist[p][0], cbcode[j].replace(" ", ""));
            console.log(rplist[p][37], productName);
            if (rplist[p][0] === cbcode[j].replace(" ", "") && rplist[p][37] === productName) {
              console.log(rplist[p][24].replace(" ", ""));
              console.log(rplist[p][1].replace(" ", ""));
              console.log(edate[0]);
              
              const urents1 = new Date(rplist[p][24].replace(" ", "").replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")).getTime();
              const urente1 = new Date(rplist[p][1].replace(" ", "").replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")).getTime();
              const uedate = new Date(edate[0].replace(" ", "").replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")).getTime();
              
              if (urents1 < uedate && urente1 <= uedate) {
                p++;
                console.log('1:' + p);
                console.log('1:' + rplist.length);
              } else if (urents1 <= uedate && urente1 > uedate) {
                console.log('2:' + p);
                await this.driver.executeScript(`nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.ds_weltoolCtrLndList.setColumn(${p},'AF_POF_TO_DT',${edate})`);
                
                try {
                  const alert = await this.driver.wait(until.alertIsPresent(), 3000);
                  const alertText = await alert.getText();
                  if (alertText.includes('지급내역')) {
                    event.sender.send('rentContractCancelResponse', { success: false, message: alertText });
                    await alert.accept();
                    return;
                  }
                } catch (error) {
                  console.log(error);
                }
                
                // if (canclex[0] === "반품") {
                  canclec = 1;
                // } else if (canclex[0] === "착오계약") {
                //   canclec = 2;
                // } else if (canclex[0] === "자격변동") {
                //   canclec = 4;
                // } else {
                //   canclec = 3;
                // }
                
                await this.driver.executeScript(`nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.ds_weltoolCtrLndList.setColumn(${p}, 'UPD_TYPE',${canclec})`);
                
                // if (canclec === 3) {
                //   // await sleep(1000);
                //   await this.driver.executeScript(`nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.ds_weltoolCtrLndList.setColumn(${p}, 'CTR_CHG_RSN', '${canclex[0]}')`);
                // }
                
                try {
                  const alert = await this.driver.wait(until.alertIsPresent(), 3000);
                  const alertText = await alert.getText();
                  if (alertText.includes('지급내역')) {
                    event.sender.send('rentContractCancelResponse', { success: false, message: alertText });
                    await alert.accept();
                    return;
                  }
                } catch (error) {
                  console.log(error);
                }
                
                await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.btn_updDescTrs_onclick()");
                
                const alert = await this.driver.wait(until.alertIsPresent(), 5000);
                const alertText = await alert.getText();
                if (alertText.includes('변경된내역이 없습니다')) {
                  event.sender.send('rentContractCancelResponse', { success: false, message: alertText });
                }
                
                await alert.accept();
                
                try {
                  const secondAlert = await this.driver.wait(until.alertIsPresent(), 5000);
                  await secondAlert.accept();
                } catch (error) {
                  console.log(error);
                }
                
                // await sleep(500);
                p++;
              } else if (urents1 > uedate) {
                await this.driver.executeScript(`return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.fn_validateChkAfPofToDt(${p}, 'delete')`);
                
                try {
                  const alert = await this.driver.wait(until.alertIsPresent(), 3000);
                  const alertText = await alert.getText();
                  if (alertText.includes('지급내역')) {
                    await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form.cfn_close()");
                  }
                  await alert.accept();
                } catch (error) {
                  await this.driver.executeScript(`nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.ds_weltoolCtrLndList.setColumn(${p}, 'CNCL_YN', '1')`);
                }
                
                await this.driver.executeScript(`nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.ds_weltoolCtrLndList.setColumn(${p}, 'UPD_TYPE',1)`);
                await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.btn_updDescTrs_onclick()");
                
                const alert = await this.driver.wait(until.alertIsPresent(), 3000);
                await alert.accept();
                
                try {
                  const secondAlert = await this.driver.wait(until.alertIsPresent(), 3000);
                  await secondAlert.accept();
                } catch (error) {
                  console.log(error);
                }
                rplist = await this.driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.ds_weltoolCtrLndList._viewRecords");
                // await sleep(1000);
              } else {
                p++;
              }
            } else {
              p++;
            }
          }
          
          if (j === cproductname2.length - 1) {
            await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form.cfn_close()");

            await this.updateRentEndDate(rentId,edate,1);
            await this.insertRentStopContract(insertRentStopContractData);
            // await this.updateContractState(orderData.id,'cok');
            console.log(edate, "edate");
          
            event.sender.send('rentContractStopResponse', { 
              success: true, 
              message: '계약이 정상적으로 완료되었습니다.',
              data: {
                bcode: cbcode,
                endDate: edate[0]
              }
            });
          }
        } else {
          event.sender.send('rentContractStopResponse', { success: false, message: '대여계약취소건이 없습니다' });
          return;
        }
      }
    } catch (error) {
      console.log('대여 계약 취소 처리 중 오류:', error);
      event.sender.send('rentContractStopResponse', { success: false, message: '대여 계약 취소 처리 중 오류 발생' });
    }
  }
}
module.exports = RentContractService;