const { Builder, By, until, Key } = require('selenium-webdriver');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const electron = require('electron');
const app = electron.app || require('@electron/remote').app;
const { waitForLoading, menuMove, getAuthToken, handleAlerts } = require('../common/commonService');
const os = require('os');
class BuyContractService {
  constructor(driver) {
    this.driver = driver;
    // this.tokenPath = path.join(app.getPath('userData'), 'auth_token.json');
    this.tokenPath = path.join(os.homedir(), 'Documents', 'hanq_token', 'auth_token.json');

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

  async buyContract(driver,event,args) {
    this.driver = driver;
    console.log(args, "args");
    await menuMove('npia201',this.driver);
    try {
      console.log('계약 구매 프로세스 시작');
      const argsData = JSON.parse(args);
      // args에서 필요한 데이터 추출
      const { 
        orderId,
        name, 
        number, 
        resident, 
        ranker, 
        rcgt, 
        guardName, 
        clientRelationInfoId, 
        phone1,
        optionPhone
      } = argsData;

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
      // 버튼 클릭 - 조회 버튼
      await this.driver.executeScript("nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.form._div_bizFrameMain.form.btn_ctrTgtInq_onclick()");
      
      // 이름 입력
      await this.driver.executeScript(`nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia210p01.form._div_bizFrameMain.form.edt_fnm.value='${name.replace(" ", "")}'`);
      await new Promise(resolve => setTimeout(resolve, 100)); // 0.1초 대기
      
      // 번호 입력
      await this.driver.executeScript(`nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia210p01.form._div_bizFrameMain.form.edt_ltcMgmtNo.value='${number.replace("L", "").replace(" ", "")}'`);
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 생년월일 입력
      await this.driver.executeScript(`nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia210p01.form._div_bizFrameMain.form.cal_cBday.value='${resident.replace(" ", "")}'`);
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 등급 입력
      await this.driver.executeScript(`nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia210p01.form._div_bizFrameMain.form.cmb_cRcgtGradeCd.value='${ranker.replace(" ", "")}'`);
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 인정일자 입력
      await this.driver.executeScript(`nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia210p01.form._div_bizFrameMain.form.cal_cRcgtEdaFrDt.value='${rcgt.replace(" ", "")}'`);
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 행 설정 및 검색 실행
      await this.driver.executeScript("nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia210p01.form._div_bizFrameMain.form.ds_ctrHistList.rowcount=1");
      await new Promise(resolve => setTimeout(resolve, 500));
      await this.driver.executeScript("nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia210p01.form._div_bizFrameMain.form.fn_selectWelToolTgtSearchCfm()");
      await new Promise(resolve => setTimeout(resolve, 500));
      await waitForLoading(this.driver); // await 추가
      // 알림창 처리
      let sresult = '';
      await new Promise(resolve => setTimeout(resolve, 1000));
      try {
        // WebDriverWait 대신 Promise 기반 대기 로직 구현 필요
        // 알림창 감지 로직
        sresult = await this.driver.switchTo().alert();
      } catch (error) {
        console.log(error);
      }
      console.log(sresult, "sresult");
      if (sresult !== '') {
        try {
          const alertText = await sresult.getText();
          
          if (!alertText.includes('시설급여')) {
            await sresult.accept();
            await this.driver.executeScript(
              "nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia210p01.form._div_bizFrameMain.form.div_cfmRst_btn_close_onclick();"
            );
            return 0;
          } else if (alertText.includes("접속대기시간")) {
            await sresult.accept();
          } else if (alertText.includes('시설급여')) {
            await sresult.accept();
            await this.driver.executeScript(
              "nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia210p01.form._div_bizFrameMain.form.div_cfmRst_btn_apply_onclick()"
            );
            await waitForLoading(this.driver);
          }
        } catch (error) {
          console.log('알림창 텍스트 처리 중 오류 발생:', error);
          await sresult.accept();
        }
      }else{
          console.log("알림창 없음 스크립트 실행");
          await waitForLoading(this.driver);
          await new Promise(resolve => setTimeout(resolve, 1000));
          await this.driver.executeScript(
              "nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia210p01.form._div_bizFrameMain.form.div_cfmRst_btn_apply_onclick()"
          );
          await waitForLoading(this.driver);

      }
      // 제품 등록 프로세스 시작
      try {
        await menuMove('nprk101m01',this.driver);
        await waitForLoading(this.driver);
        // 제품 정보 배열 가정 (실제 데이터는 매개변수로 받아야 함)
        // JSON 문자열에서 selectedProducts 배열 추출
        const selectedProducts = argsData.selectedProducts;
        console.log(selectedProducts, "selectedProducts");
        // 각 제품의 pname, pitem, pcode를 배열에 담기
        const pnameArray = selectedProducts.map(product => product.pname); // 제품명 배열
        const pitemArray = selectedProducts.map(product => product.pitem.replace(/ /g, "")); // 제품 아이템(카테고리) 배열
        const pcodeArray = selectedProducts.map(product => product.pcode); // 제품 코드 배열
        const bcodeArray = selectedProducts.map(product => product.barcode); // 제품 코드 배열
        console.log(pnameArray, pitemArray, pcodeArray, "pnameArray, pitemArray, pcodeArray");
        let pcodeArraychk = '';
        let csearchtxt = '';
        for (let x = 0; x < pnameArray.length; x++) {
          console.log(pcodeArraychk,pcodeArray[x]);

          // console.log(nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.form._div_bizFrameMain.form.edt_wimCd.value='${pcodeArray[x]}')
          if (pcodeArraychk !== pcodeArray[x]) {
            console.log('fn_Clear 입력 시작');
            await new Promise(resolve => setTimeout(resolve, 500));

            await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.form._div_bizFrameMain.form.fn_Clear()");
            await this.driver.executeScript(`nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.form._div_bizFrameMain.form.edt_wimCd.value='${pcodeArray[x]}'`);
            console.log('edt_wimCd.value 입력 완료');
            const nRow = await this.driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.form._div_bizFrameMain.form.ds_cond.addRow()");
            console.log('nRow 입력 완료');
            await this.driver.executeScript(`nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.form._div_bizFrameMain.form.ds_cond.setColumn(${nRow}, 'LTC_ADMIN_SYM', nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.form._div_bizFrameMain.form.bfn_getUserInfo().adminSym )`);
            await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.form._div_bizFrameMain.form.ds_cond.setColumn(" + nRow + ", 'PRDCT_NM', nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.form._div_bizFrameMain.form.edt_prdctNm.value)");
            await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.form._div_bizFrameMain.form.ds_cond.setColumn(" + nRow + ", 'WIM_CD', nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.form._div_bizFrameMain.form.edt_wimCd.value)");
            await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.form._div_bizFrameMain.form.ds_cond.setColumn(" + nRow + ", 'WIM_ITM_CD', nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.form._div_bizFrameMain.form.cmb_wimItmCd.value)");
            
            await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.form._div_bizFrameMain.form.fn_preSelect()");
            await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.form._div_bizFrameMain.form.fn_Select()");
            console.log('fn_preSelect, fn_Select 입력 완료');
            // 로딩 대기
            await waitForLoading(this.driver);
            
            // 검색 결과 텍스트 가져오기
            csearchtxt = await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.form._div_bizFrameMain.form.sta_totalCnt:text"]/span/span/b' }).getText();
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('csearchtxt 입력 완료');
          }
          if (csearchtxt !== '0') {
            console.log(x,pnameArray.length - 1)
            if (x === (pnameArray.length - 1)) {
              await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.form.div_functionButton.form.btn_close"]' }).click();
              await menuMove('npia201',this.driver);
            }
          } else if (pcodeArraychk !== pitemArray[x]) {
            await this.driver.executeScript('nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.form._div_bizFrameMain.form.fn_insert()');
            await new Promise(resolve => setTimeout(resolve, 200));
            
            await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.nprk101p01.form._div_bizFrameMain.form.fn_close()");
            await new Promise(resolve => setTimeout(resolve, 200));
            
            await this.driver.executeScript('nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.form._div_bizFrameMain.form.fn_insert()');
            await new Promise(resolve => setTimeout(resolve, 200));
            
            await this.driver.executeScript(`nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.nprk101p01.form._div_bizFrameMain.form.edt_wimCd.value='${pcodeArray[x]}'`);
            await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.nprk101p01.form._div_bizFrameMain.form.btn_search_onclick()");
            
            // 로딩 대기
            await waitForLoading(this.driver);
            
            await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.nprk101p01.form._div_bizFrameMain.form.grd_wimPrdctList.body.gridrow_0.cell_0_1.cellcheckbox"]' }).click();
            await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.nprk101p01.form._div_bizFrameMain.form.btn_save"]' }).click();
            
            // 알림창 처리
            try {
              await handleAlerts(this.driver);
              await new Promise(resolve => setTimeout(resolve, 1500));
            } catch (error) {
              console.log(error);
            }
            
            // 로딩 대기
            await waitForLoading(this.driver);
            
            if (x === (pnameArray.length - 1)) {
              await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpi0105030000.form.div_functionButton.form.btn_close"]' }).click();
              await menuMove('npia201',this.driver);
            }
          }
          
          pcodeArraychk = pcodeArray[x];
        }
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

        // 계약서 작성 버튼 클릭
        try {
          console.log("계약서 작성 버튼 클릭 시작");
          await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.form._div_bizFrameMain.form.btn_slCtrIn:icontext"]' }).click();
          await new Promise(resolve => setTimeout(resolve, 500)); // 0.5초 대기
          console.log("계약서 작성 버튼 클릭 완료");
        } catch (error) {
          console.log('계약서 작성 버튼 클릭 중 오류:', error);
          event.sender.send('buyContractResponse', { success: false, message: '계약서 작성 버튼 클릭 중 오류 발생' });
        }

        await waitForLoading(this.driver);
        let failArray = [];
        let failCnt = 0;
        let successCnt = 0;
        let failObj = {
          txt:'',
          bcode:'',
          pname:'',
        }
        let undoPitem='';
        for(let i = 0; i < pnameArray.length; i++) {
          console.log(pnameArray[i], "pnameArray[i]");
          console.log(bcodeArray[i], "bcodeArray[i]");
          let failErr = 0;
          if(bcodeArray[i] == ''){
            failObj.txt = "바코드 미입력";
            failObj.bcode = bcodeArray[i];
            failObj.pname = pnameArray[i];
            failCnt = failCnt + 1;
            failArray.push(failObj);
            if(i == (pnameArray.length - 1)){
              failErr = 1;
            }else{
              failErr = 2;
            }
          }

          if(failErr == 1){
            continue;
          }

          if(failErr !=2){
            if(undoPitem != pitemArray[i]){
              try {
                console.log("품목 선택 시작:", pitemArray[i]);
                
                // 품목 데이터셋 가져오기
                const itemDataset = await this.driver.executeScript("return nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.form._div_bizFrameMain.form.cmb_wimDtlItmCd._innerdataset._rawRecords");
                
                let itemFound = false;
                for (let d = 0; d < itemDataset.length; d++) {
                  console.log("확인 중인 품목:", itemDataset[d][1]);
                  
                  if ('(판매품목)' + pitemArray[i] === itemDataset[d][1]) {
                    const productCodeMap = {
                      '이동변기': '01',
                      '목욕의자': '02',
                      '성인용보행기(보행차)': '03',
                      '성인용보행기(보행보조차)': '04',
                      '안전손잡이': '05',
                      '미끄럼방지용품': '06',
                      '간이변기': '07',
                      '지팡이': '08',
                      '욕창예방방석': '09',
                      '자세변환용구': '10',
                      '수동휠체어': '11',
                      '전동침대': '12',
                      '수동침대': '13',
                      '욕창예방매트리스': '14',
                      '이동욕조': '15',
                      '목욕리프트': '16',
                      '성인용보행기': '17',
                      '배회감지기': '18',
                      '경사로(실외용)': '19',
                      '요실금팬티': '20',
                      '경사로(실내용)': '21',
                      '구강세척기(마우스피스형)': '22',
                      '기저귀센서': '23',
                      '배회감지기(태그형)': '24',
                    };
                    
                    // 품목 선택
                    await this.driver.executeScript(`return nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.form._div_bizFrameMain.form.cmb_wimDtlItmCd.value='${productCodeMap[pitemArray[i]]}'`);
                    
                    // 품목 리스트 조회
                    await this.driver.executeScript("return nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.form._div_bizFrameMain.form.fn_selectWelToolList()");
                    
                    // 로딩 대기
                    await waitForLoading(this.driver);
                    itemFound = true;
                    break;
                  }
                }
                
                if (!itemFound) {
                  console.log("품목명 찾을 수 없음:", pnameArray[i]);
                  failObj.txt = "구매불가품목";
                  failObj.bcode = bcodeArray[i];
                  failCnt = failCnt + 1;
                  failArray.push(failObj);
                  
                  if (i !== (pnameArray.length - 1)) {
                    failErr = 1;
                  } else {
                    failErr = 2;
                  }
                }
              } catch (error) {
                console.error('품목 선택 중 오류 발생:', error);
                failObj.txt = "품목 선택 오류";
                failObj.bcode = bcodeArray[i];
                failCnt = failCnt + 1;
                failArray.push(failObj);
              }
            }
          }
          if(failErr == 1){
            continue;
          }
          if(failErr !=2){
            console.log('::::::::::::::::::::::::바코드입력시작');
            // 품목 리스트 가져오기
            const productList = await this.driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.form._div_bizFrameMain.form.ds_welTool._viewRecords");
            for(let p = 0; p < productList.length; p++) {
              if(productList[p][1] === pcodeArray[i]) {
                console.log(productList[p][1]);
                const pmoney = await this.driver.executeScript(`return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.form._div_bizFrameMain.form.ds_welTool._viewRecords[${p}][14]`);
                const pmoneys = pmoney.replace('\n', '');
                
                const ptime1 = new Date(pmoneys).getTime();
                const ptime2 = new Date(argsData.orderDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')).getTime();
                console.log(bcodeArray[i], "bcodeArray[i]");
                await this.driver.executeScript(`nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.form._div_bizFrameMain.form.ds_welTool.setColumn(${p},'BCD_NO','${bcodeArray[i]}')`);
                await new Promise(resolve => setTimeout(resolve, 100));
                console.log(argsData.orderDate.replace(/-/g, ''),"argsData.orderDate.replace(/-/g, '')");
                await this.driver.executeScript(`nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.form._div_bizFrameMain.form.ds_welTool.setColumn(${p},'SALE_DT','${argsData.orderDate.replace(/-/g, '')}')`);
                console.log("ptime1",ptime1,"ptime2", ptime2);
                if(ptime1 > ptime2) {
                  const fv_sLtcAdminSym = await this.driver.executeScript(
                    "return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.form._div_bizFrameMain.form.fv_sLtcAdminSym");
                  await this.driver.executeScript(
                    "return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.form._div_bizFrameMain.form.ds_fWelTool.clearData()");
                  const nRow = await this.driver.executeScript(
                    "return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.form._div_bizFrameMain.form.ds_fWelTool.addRow()");
                  await this.driver.executeScript(
                    `return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.form._div_bizFrameMain.form.ds_fWelTool.copyRow(${nRow},nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.form._div_bizFrameMain.form.ds_welTool,${p})`);
                  
                  await this.driver.executeScript(`return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.form._div_bizFrameMain.form.gfn_showPopupByID(nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.form._div_bizFrameMain.form,'npia206p02','npia206p02',{prm_pWelTool:nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.form._div_bizFrameMain.form.ds_fWelTool, prm_sLtcAdminSym:${fv_sLtcAdminSym}},1,616,280)`);
                  await waitForLoading(this.driver);
                  
                  const pcnt = await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.npia206p02.form._div_bizFrameMain.form.sta_totalCnt:text"]/span/span/b' }).getText();
                  
                  for(let w = 0; w < parseInt(pcnt); w++) {
                    const ptxt = await this.driver.findElement({ xpath: `//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.npia206p02.form._div_bizFrameMain.form.grd_welToolSl.body.gridrow_${w}.cell_${w}_7:text"]` }).getText();
                    const ptxts = ptxt.replace('\n', '').split('~');
                    console.log(ptxts);
                    
                    const ptxttime1 = new Date(ptxts[0]).getTime();
                    const ptxttime3 = new Date(argsData.orderDate.replace(/-/g, '')).getTime();
                    
                    if(ptxts[1] !== '9999-12-31' && ptxttime1 < ptxttime3) {
                      await this.driver.findElement({ xpath: `//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.npia206p02.form._div_bizFrameMain.form.grd_welToolSl.body.gridrow_${w}.cell_${w}_7:text"]` }).click();
                      
                      await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.npia206p02.form._div_bizFrameMain.form.ds_pWelTool.clearData()");
                      const nRow2 = await this.driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.npia206p02.form._div_bizFrameMain.form.ds_pWelTool.addRow()");
                      
                      await this.driver.executeScript(`nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.npia206p02.form._div_bizFrameMain.form.ds_pWelTool.copyRow(${nRow2} ,nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.npia206p02.form._div_bizFrameMain.form.ds_welTool,${w})`);
                      
                      await this.driver.executeScript("ds = new Dataset; ds.assign(nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.npia206p02.form._div_bizFrameMain.form.ds_pWelTool)");
                      
                      const dsfweltool = await this.driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.npia206p02.form._div_bizFrameMain.form.ds_pWelTool._viewRecords");
                      
                      await this.driver.executeScript(`return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.form._div_bizFrameMain.form.ds_welTool._viewRecords[${p}][13]='${dsfweltool[0][11]}'`);
                      
                      await this.driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.npia206p02.form._div_bizFrameMain.form.gfn_closePopup(ds)");
                      
                      await new Promise(resolve => setTimeout(resolve, 100));
                    }
                  }
                }
                
                await this.driver.executeScript(`nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.form._div_bizFrameMain.form.fn_validSalePsblYn(${p})`);
                
                try {
                  await new Promise(resolve => setTimeout(resolve, 100));
                  const alert = await this.driver.wait(until.alertIsPresent(), 2000);
                  const result = await this.driver.switchTo().alert();
                  const ftxt = await result.getText();
                  
                  failObj.txt = ftxt;
                  failObj.bcode = bcodeArray[i];
                  failCnt = failCnt + 1;
                  failArray.push(failObj);
                  
                  if(i !== (pnameArray.length - 1)) {
                    failErr = 1;
                  } else {
                    failErr = 2;
                  }
                  
                  await result.accept();
                } catch(error) {
                  console.log(error);
                }
                break;
              }
              
              if(p === productList.length - 1 && productList[p][1] !== pcodeArray[i]) {
                console.log(productList[p][1]);
                failObj.txt = "미등록품목";
                failObj.bcode = bcodeArray[i];
                failCnt = failCnt + 1;
                failArray.push(failObj);
                
                if(i !== (pnameArray.length - 1)) {
                  failErr = 1;
                } else {
                  failErr = 2;
                }
              }
            }
          }

          if(failErr == 1){
            continue;
          }
          if(failErr !=2){
            await waitForLoading(this.driver);
            
            let cresult = '';
            try {
              cresult = await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.npia207p03.form._div_bizFrameMain.form.div_cfmRst.form.sta_rstMsg"]/div' }).getText();
            } catch (error) {
              console.log(error);
            }

            if (cresult.includes('복지용구한도')) {
              failObj.txt = cresult.replace(',', '').replace('선택한 복지용구를 이용하시려면 적용 버튼을 눌러주세요.', '');
              failObj.bcode = bcodeArray[i];
              failCnt = failCnt + 1;
              failArray.push(failObj);
              await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.npia207p03.form._div_bizFrameMain.form.div_cfmRst.form.btn_close:icontext"]' }).click();
            } else if (cresult.includes('이용가능')) {
              await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.npia207p03.form._div_bizFrameMain.form.div_cfmRst.form.btn_apply:icontext"]' }).click();
              try {
                await new Promise(resolve => setTimeout(resolve, 100));
                const alert = await this.driver.wait(until.alertIsPresent(), 1000);
                const result = await this.driver.switchTo().alert();
                const ftxt = await result.getText();
                
                failObj.txt = ftxt;
                failObj.bcode = bcodeArray[i];
                failCnt = failCnt + 1;
                failArray.push(failObj);
                
                await result.accept();
              } catch (error) {
                console.log(error);
              }
              await waitForLoading(this.driver);
              successCnt = successCnt + 1;
            } else if (cresult.includes('판매된 바코드')) {
              console.log("판매된 바코드");
              failObj.txt = cresult;
              failObj.bcode = bcodeArray[i];
              failCnt = failCnt + 1;
              failArray.push(failObj);
              await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.npia207p03.form._div_bizFrameMain.form.div_cfmRst.form.btn_close:icontext"]' }).click();
            } else if (cresult !== '') {
              failObj.txt = cresult;
              failObj.bcode = bcodeArray[i];
              failCnt = failCnt + 1;
              failArray.push(failObj);
              await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.npia207p03.form._div_bizFrameMain.form.div_cfmRst.form.btn_close:icontext"]' }).click();
            }
            undoPitem = pitemArray[i];
          }
        }
        // 판매 계약 최종 결과 처리
        if(successCnt > 0){
          try {
            await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.form._div_bizFrameMain.form.btn_close"]' }).click();
            // 공단전송 버튼 클릭
            try {
              await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.form._div_bizFrameMain.form.btn_pblcpTrs_onclick()");
              await new Promise(resolve => setTimeout(resolve, 1)); // 0.5초 대기
              
              // 첫 번째 알림창 처리
              const alert1 = await this.driver.wait(until.alertIsPresent(), 10000);
              const result1 = await this.driver.switchTo().alert();
              await result1.accept();
              
              await new Promise(resolve => setTimeout(resolve, 1)); // 0.5초 대기
              
              // 두 번째 알림창 처리
              const alert2 = await this.driver.wait(until.alertIsPresent(), 10000);
              const result2 = await this.driver.switchTo().alert();
              const alertText = await result2.getText();
              
              if (alertText.includes("계약되었습니다")) {
                // 계약 성공 처리
                console.log(':::::::::::계약 성공 처리');
                
                // 계약 상태 업데이트
                let contractState = 'ok';
                if (failCnt > 0) {
                  console.log(':::::::::::failcnt 1이상');
                  contractState = 'vok'; // 부분 계약 성공
                }
                
                // 계약 상태 및 계약 날짜 업데이트
                try {
                  await this.updateContractState(orderId, contractState);
                  console.log(`계약 상태가 ${contractState}로 업데이트되었습니다.`);
                  event.sender.send('buyContractResponse', { success: true, message: '공단 전송 성공' });

                } catch (error) {
                  console.error('계약 상태 업데이트 중 오류 발생:', error);
                }
                
                // 스크롤 위치 조정
                await this.driver.executeScript("function getElementByXpath(path) {return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;} getElementByXpath('/html/body/div[2]/div[1]/div/div[3]/div/div[3]/div/div[2]/div/div[1]/div[1]/div/div[1]/div/div[1]/div/div[3]/div').style.top = '0px';");
                
                await result2.accept();
              } else {
                console.log("계약 실패:", alertText);
                await result2.accept();
                event.sender.send('buyContractResponse', { success: false, message: '공단 전송 실패', data: failArray });
                return { success: false, message: '공단 전송 실패', data: failArray };
              }
            } catch (error) {
              console.error('공단 전송 중 오류 발생:', error);
              event.sender.send('buyContractResponse', { success: false, message: '공단 전송 중 오류 발생', data: failArray });
              return { success: false, message: '공단 전송 중 오류 발생', error: error.toString() };
            }
          } catch (error) {
            console.log(error);
          }
        }else if(failCnt > 0){
          await this.driver.findElement({ xpath: '//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia206p01.form._div_bizFrameMain.form.btn_close"]' }).click();
          console.log(failCnt, "failCnt");
          console.log(failArray, "failArray");
          event.sender.send('buyContractResponse', { success: false, message: '판매 계약 실패', data: failArray });
        }
        
      } catch (error) {
        console.error('제품 등록 프로세스 중 오류 발생:', error);
        event.sender.send('buyContractResponse', { success: false, message: '제품 등록 프로세스 중 오류 발생' });
      }
      
      console.log("계약 구매 프로세스 완료");
      return { success: true, message: '계약 구매 프로세스 완료', data: null };
    } catch (error) {
      console.error('계약 구매 중 오류 발생:', error);
      event.sender.send('buyContractResponse', { success: false, message: '계약 구매 중 오류 발생' });
      return { success: false, message: '계약 구매 중 오류 발생', error: error.toString() };
    }
  }

  async buyCancle(driver, event, args) {
    this.driver = driver;
    console.log('계약 취소 프로세스 시작');
    
    try {
      const argsData = JSON.parse(args);
      const { 
        orderId,
        name, 
        number, 
        selectedProducts,
        cancelReason 
      } = argsData;
      
      // 제품 정보 배열 생성
      const pnameArray = [];
      const bcodeArray = [];
      const pcodeArray = [];
      const cancelReasonArray = [];
      
      // 선택된 제품 정보 추출
      selectedProducts.forEach(product => {
        pnameArray.push(product.pname);
        bcodeArray.push(product.barcode); // barcode 필드 사용
        pcodeArray.push(product.pcode);
        cancelReasonArray.push(cancelReason || '반품');
      });

      console.log(pnameArray, bcodeArray, pcodeArray, cancelReasonArray, "pnameArray, bcodeArray, pcodeArray, cancelReasonArray");
      
      // 메뉴 이동
      await menuMove('npia202', this.driver);
      await this.driver.sleep(1000);
      
      // 이름 입력
      await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.edt_prsFnm:input"]')).click();
      await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.edt_prsFnm:input"]')).sendKeys(name);
      
      // 번호 입력
      await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.edt_ltcMgmtNo:input"]')).click();
      await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.edt_ltcMgmtNo:input"]')).sendKeys(number);
      
      // 조회 버튼 클릭
      await this.driver.findElement(By.xpath("//*[@id='mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.btn_selectPln']")).click();
      await waitForLoading(this.driver);
      
      // 셀 클릭
      await this.driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.grd_ltcoInfoList_oncellclick('',{col:6})");
      await waitForLoading(this.driver);
      await this.driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.grd_ltcoInfoList_oncellclick('',{col:6})");
      await waitForLoading(this.driver);
      
      // 취소 처리
      let cancelSuccess = false;
      
      // 제품 목록 가져오기
      const productList = await this.driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.ds_weltoolCtrSaleList._viewRecords");
      
      if (productList && productList.length > 0) {
        // 비동기 처리를 위한 순차적 실행 함수
        const processProducts = async () => {
          for (let x = 0; x < pcodeArray.length; x++) {
            console.log(`처리 중인 제품: ${x+1}/${pcodeArray.length}, 코드: ${pcodeArray[x]}, 바코드: ${bcodeArray[x]}`);
            
            for (let p = 0; p < productList.length; p++) {
              // 제품 코드와 바코드 일치 확인
              if (productList[p][4] === pcodeArray[x] && productList[p][0] === bcodeArray[x]) {
                console.log(`제품 코드 매칭: ${productList[p][4]}, 인덱스: ${p}`);
                
                try {
                  // 취소 가능 여부 확인 - 각 비동기 작업 완료 대기
                  const returnCheck = await this.driver.executeScript(`return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.ds_weltoolCtrSaleList.getColumn(${p}, 'HWANSU_YN')`);
                  await this.driver.sleep(300);
                  
                  const payCheck = await this.driver.executeScript(`return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.ds_weltoolCtrSaleList.getColumn(${p}, 'PAY_YN')`);
                  await this.driver.sleep(300);
                  
                  const demandCheck = await this.driver.executeScript(`return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.ds_weltoolCtrSaleList.getColumn(${p}, 'DMD_YN')`);
                  await this.driver.sleep(300);
                  
                  console.log(`제품 상태 확인: 반품=${returnCheck}, 결제=${payCheck}, 청구=${demandCheck}`);
                  
                  if (returnCheck === "N" && payCheck === "N" && demandCheck === "N") {
                    // 취소 설정 - 비동기 작업 완료 대기
                    await this.driver.executeScript(`nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.ds_weltoolCtrSaleList.setColumn(${p}, 'CNCL_YN', '1')`);
                    await this.driver.sleep(500);
                    
                    // 취소 사유 설정
                    let cancelCode = 1; // 기본값: 반품
                    if (cancelReasonArray[x] === "착오계약") {
                      cancelCode = 2;
                    } else if (cancelReasonArray[x] === "자격변동") {
                      cancelCode = 3;
                    }
                    
                    await this.driver.executeScript(`nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.ds_weltoolCtrSaleList.setColumn(${p}, 'UPD_TYPE', ${cancelCode})`);
                    await this.driver.sleep(500);
                    
                    console.log(`제품 취소 처리 완료: ${pcodeArray[x]}, 취소 코드: ${cancelCode}`);
                    cancelSuccess = true;
                    break; // 매칭된 제품을 찾았으므로 내부 루프 종료
                  } else {
                    console.log(`취소 불가능한 제품: ${pcodeArray[x]}, 상태: 반품=${returnCheck}, 결제=${payCheck}, 청구=${demandCheck}`);
                  }
                } catch (err) {
                  console.error(`제품 처리 중 오류 발생: ${pcodeArray[x]}`, err);
                  await this.driver.sleep(500); // 오류 발생 시 잠시 대기
                }
              }
            }
            
            // 각 제품 처리 후 안정적인 대기 시간 확보
            await this.driver.sleep(1000);
          }
        };
        
        // 모든 제품 순차적으로 처리
        await processProducts();
        
        // 마지막 제품 처리 후 저장 버튼 클릭
        if (cancelSuccess) {
          await this.driver.sleep(500);
          await this.driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form._div_bizFrameMain.form.btn_updDescTrs_onclick()");
          await this.driver.sleep(500);
          
          // 알림창 처리
          await this.driver.wait(until.alertIsPresent(), 10000);
          const alert = await this.driver.switchTo().alert();
          const alertText = await alert.getText();
          
          if (alertText.includes("없습니다")) {
            await alert.accept();
            await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form.div_functionButton.form.btn_close"]')).click();
            event.sender.send('buyCancelResponse', { success: false, message: alertText });
          } else {
            await alert.accept();
            await this.driver.sleep(500);
            
            // 두 번째 알림창 처리
            await this.driver.wait(until.alertIsPresent(), 10000);
            const alert2 = await this.driver.switchTo().alert();
            const alert2Text = await alert2.getText();
            await alert2.accept();
            
            await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form.div_functionButton.form.btn_close"]')).click();
            event.sender.send('buyCancelResponse', { success: true, message: alert2Text });
            console.log("계약 취소 성공");
            await this.updateContractState(orderId, 'cok');
          }
        } else {
          await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form.div_functionButton.form.btn_close"]')).click();
          event.sender.send('buyCancelResponse', { success: false, message: '취소 가능한 계약이 없습니다.' });
        }
      } else {
        await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010200.form.div_functionButton.form.btn_close"]')).click();
        event.sender.send('buyCancelResponse', { success: false, message: '판매취소계약이 없습니다' });
      }
      
      return { success: true, message: '계약 취소 프로세스 완료' };
    } catch (error) {
      console.error('계약 취소 중 오류 발생:', error);
      event.sender.send('buyCancelResponse', { success: false, message: '계약 취소 중 오류 발생', error: error.toString() });
      return { success: false, message: '계약 취소 중 오류 발생', error: error.toString() };
    }
  }
}
module.exports = BuyContractService;