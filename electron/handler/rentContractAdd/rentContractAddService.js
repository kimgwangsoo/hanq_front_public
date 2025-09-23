const { Builder, By, until, Key } = require('selenium-webdriver');
const path = require('path');
const electron = require('electron');
const app = electron.app || require('@electron/remote').app;
const { waitForLoading, menuMove, handleAlerts, getAuthToken } = require('../common/commonService');
const LookupService = require('../lookup/lookupService');
const axios = require('axios');
const os = require('os');
class RentContractAddService extends LookupService{
  constructor(driver) {
    super(driver);
    this.driver = driver;
    // this.tokenPath = path.join(app.getPath('userData'), 'auth_token.json');
    this.tokenPath = path.join(os.homedir(), 'Documents', 'hanq_token', 'auth_token.json');

  }

  async updateRentContract(items,rentStartOrigin) {
    try {
      const token = getAuthToken(this.tokenPath);
      const response = await axios.patch(`http://3.37.206.255:3000/rent/${items.rentId}`, {
        rentStart: rentStartOrigin,
        rentEnd: items.contractEndDate
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

  async createAddContract(items) {
    try {
      const token = getAuthToken(this.tokenPath);
      const response = await axios.post('http://3.37.206.255:3000/rent/create/add-contract', {
        items: items
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

  async rentContractAdd(driver,event,args) {
    this.driver = driver;
    // await menuMove('nprk303',this.driver);

    try {
        console.log('계약 대여 연장 프로세스 시작');
        console.log(args, "args");
        const argsData = JSON.parse(args);
        // args에서 필요한 데이터 추출
        const {
            orderData,
            rentAddContractData,
            rentId,
            rentStartOrigin
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

        // JSON 문자열에서 selectedProducts 배열 추출
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
        console.log(pnameArray, pitemArray, pcodeArray, "pnameArray, pitemArray, pcodeArray");

        // 전화번호 형식 처리
        let formattedPhone = '';
        
        if (phone1) {
          // 전화번호에서 공백, 하이픈, 점 제거
          let cleanPhone = phone1.replace(/[\s\-\.]/g, '');
          
          // 전화번호 유효성 검사 및 기본값 설정
          if (!cleanPhone || cleanPhone.length === 0) {
            cleanPhone = '01000000000';
          }
          
          if (cleanPhone.length > 11 || cleanPhone.length < 10) {
            cleanPhone = '01000000000';
          }
          
          // 전화번호 형식 지정 (10자리 또는 11자리)
          if (cleanPhone.length === 10) {
            formattedPhone = `${cleanPhone.substring(0, 3)}-${cleanPhone.substring(3, 6)}-${cleanPhone.substring(6)}`;
          } else if (cleanPhone.length === 11) {
            formattedPhone = `${cleanPhone.substring(0, 3)}-${cleanPhone.substring(3, 7)}-${cleanPhone.substring(7)}`;
          }
          
          console.log('포맷된 전화번호:', formattedPhone);
        } else {
          formattedPhone = '010-0000-0000';
        }
        
        // 전화번호를 하이픈으로 분리
        const phoneSegments = formattedPhone.split('-');
        console.log(name,number,resident,ranker,rcgt,startDateArray[0], "name,number,resident,ranker,rcgt");

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
            
            // 날짜 배열 처리 로직
            for (let e = 0; e < rentAddContractData.nextDateArray.length; e += 2) {
              if (new Date(rentAddContractData.nextDateArray[e].replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')) <= new Date(endDateArray[0].replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'))) {
                rentAddContractData.nextDateArray[e + 1] = endDateArray[j];
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
          console.log("대여 계약 연장 처리 시작");
          
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
            await this.driver.executeScript(`
              function getElementByXpath(path) {
                return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
              } 
              getElementByXpath('/html/body/div[2]/div[1]/div/div[3]/div/div[3]/div/div[2]/div/div[1]/div[1]/div/div[1]/div/div[1]/div/div[3]/div').style.top = '0px';
            `);
            event.sender.send('rentContractAddResponse', { success: false, message: '다음 적용 구간 없음' });
            return { success: false, message: '다음 적용 구간 없음' };
          }
          
          const itemsArray = [];
          // 각 제품에 대한 처리
          for (const product of products) {
            console.log(`제품 처리 시작: ${product.pname}`);
            
            // 대여 계약 연장 버튼 클릭
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
              event.sender.send('rentContractAddResponse', { success: false, message: '대여 불가 품목' });
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
            let nextDateArrayObjectFilter = nextDateArrayObject.filter(dateObject => dateObject.startDate <= product.endDate && dateObject.endDate >= product.endDate);
            console.log(nextDateArrayObjectFilter, "nextDateArrayObjectFilter");
            //nextDateArrayObjectFilter의 객체안에 날짜를 확인해서 오름차순으로 객체 배열을 정렬
            nextDateArrayObjectFilter.sort((a, b) => a.endDate - b.endDate);
            console.log(nextDateArrayObjectFilter, "nextDateArrayObjectFilter");

            if (nextDateArrayObjectFilter.length > 0) {
                // 첫 번째 객체의 시작일 하루 전 계산
                const firstStartDate = nextDateArrayObjectFilter[0].startDate;
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
                    await handleAlerts(this.driver);
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
                    event.sender.send('rentContractAddResponse', { success: false, message: resultText });
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
            // await sleep(1000);
            await new Promise(resolve => setTimeout(resolve, 500));
            await handleAlerts(this.driver);
            await new Promise(resolve => setTimeout(resolve, 500));
            // 성공 메시지 확인
            console.log(itemsArray, "itemsArray");
            for (const item of itemsArray) {
              const response = await this.createAddContract(item);
              await this.updateRentContract(item,rentStartOrigin);
              console.log(response, "response");
            }
            const result2 = await this.driver.switchTo().alert();
            const alertText = await result2.getText();
            console.log(alertText, "alertText");
            if (alertText.includes("계약되었습니다")) {
              // await this.createAddContract(this.tokenPath, products);
              console.log("계약이 정상적으로 완료되었습니다.");
              await handleAlerts(this.driver);
              event.sender.send('rentContractAddResponse', { 
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
              event.sender.send('rentContractAddResponse', { success: false, message: alertText });
              return false;
            }

          } catch (error) {
            console.log('계약 전송 중 오류:', error);
            event.sender.send('rentContractAddResponse', { success: false, message: '계약 전송 중 오류 발생' });
          }
          
          console.log("대여 계약 연장 처리 완료");
        } catch (error) {
          console.log('대여 계약 연장 처리 중 오류:', error);
          event.sender.send('rentContractAddResponse', { success: false, message: '대여 계약 연장 처리 중 오류 발생' });
        }
        } catch (error) {
          console.log('계약 대여 연장 프로세스 중 오류:', error);
          event.sender.send('rentContractAddResponse', { success: false, message: '계약 대여 연장 프로세스 중 오류 발생' });
        }
        console.log("계약 대여 연장 프로세스 완료");
        
        // event.sender.send('rentContractAddResponse', { success: true, message: '계약 대여 연장 프로세스 완료', data: null });
        return { success: true, message: '계약 대여 연장 프로세스 완료', data: null };
    } catch (error) {
      console.log('계약 대여 연장 프로세스 중 오류 발생:', error);
      event.sender.send('rentContractAddResponse', { success: false, message: '계약 대여 연장 프로세스 중 오류 발생' });
      return { success: false, message: '계약 대여 연장 프로세스 중 오류 발생', error: error.toString() };
    }
  }

}
module.exports = RentContractAddService;