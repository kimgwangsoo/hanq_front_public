const { Builder, By, until, Key } = require('selenium-webdriver');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const electron = require('electron');
const app = electron.app || require('@electron/remote').app;
const { waitForLoading, menuMove, getAuthToken } = require('../common/commonService');
const os = require('os');
class ClaimService {
  constructor(driver) {
    this.driver = driver;
    // this.tokenPath = path.join(app.getPath('userData'), 'auth_token.json');
    this.tokenPath = path.join(os.homedir(), 'Documents', 'hanq_token', 'auth_token.json');
  }

  async getClaimList(params) {
    try {
      console.log('클레임 목록 조회 시작');
      // 객체 구조 분해로 필요한 파라미터 추출
      const { date1, date2, pcode, bcode, cnt, yearMonth, companyId } = params;
      console.log("클레임 조회 파라미터:", date1, date2, pcode, bcode, cnt, yearMonth, companyId);
      
      const response = await axios.get('http://localhost:3000/service/claim/get-claim-list', {
        params: {
          date1,
          date2,
          pcode,
          bcode,
          cnt,
          yearMonth,
          companyId
        },
        headers: {
            'Authorization': `Bearer ${getAuthToken(this.tokenPath)}`
        }
      });
      console.log("response.data.items", response.data.items);
      return response.data.items;
    } catch (error) {
      console.error('클레임 목록 조회 중 오류 발생:', error);
      return null;
    }
  }

  // claimData 형식
  // {
  //   num: string,
  //   company: string,
  //   name: string,
  //   number: string,
  //   date1: string,
  //   date2: string,
  //   pcode: string,
  //   bcode: string,
  //   type: string,
  //   ptype: string,
  //   pdan: string,
  //   dan: string,
  //   cnt: string,
  //   date: string,
  //   sale: string,
  //   target: string
  // }
  async insertClaim(claimData) {
    try {
      console.log('클레임 등록 시작');
      const response = await axios.post('http://localhost:3000/service/claim/insert-claim', claimData, {
        headers: {
          'Authorization': `Bearer ${getAuthToken(this.tokenPath)}`
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('클레임 등록 중 오류 발생:', error);
      throw error;
    }
  }

  async deleteClaim(id) {
    try {
      console.log('클레임 삭제 시작');
      const response = await axios.delete(`http://localhost:3000/service/claim/delete-claim/${id}`, {
        headers: {
          'Authorization': `Bearer ${getAuthToken(this.tokenPath)}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('클레임 삭제 중 오류 발생:', error);
      return null;
    }
  }

  async claim(driver, event, args) {
    try {
      console.log('클레임 프로세스 시작');
      console.log("args", args);
      const argsData = JSON.parse(args);
      const { companyId } = argsData;
      this.driver = driver;
      
      // // 창 크기 설정
      // await this.driver.manage().window().setRect({ width: 1900, height: 1080 });
      // await new Promise(resolve => setTimeout(resolve, 1000));
      
      // // 메뉴 이동 및 로딩 대기
      // await menuMove('npc0109000590', this.driver);
      // await waitForLoading(this.driver);
      
      try {
        // 청구 목록 카운트 확인
        const cnt1 = await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpc0109000590.npca005m01.form._div_bizFrameMain.form.div_main.form.grd_dmdObjtrSumList.body.gridrow_0.cell_0_3:text"]')).getText();
        const cnt2 = await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpc0109000590.npca005m01.form._div_bizFrameMain.form.div_main.form.grd_dmdObjtrSumList.body.gridrow_1.cell_1_3:text"]')).getText();
        console.log("cnt1", cnt1);
        console.log("cnt2", cnt2);
        
        // 총 카운트 계산
        const totalcnt = parseInt(cnt1.replace(',', '')) + parseInt(cnt2.replace(',', ''));
        
        // 현재 날짜 정보
        const nowtime = new Date();
        const nowtimey = nowtime.getFullYear();
        let nowtimem = nowtime.getMonth() + 1;
        let nowtimed = nowtime.getDate();
        
        // 날짜 포맷팅
        if (nowtimed < 10) nowtimed = '0' + nowtimed;
        if (nowtimem < 10) nowtimem = '0' + nowtimem;
        const nowtimeymd = `${nowtimey}-${nowtimem}-${nowtimed}`;
        
        // 청구 처리 변수 초기화
        let a = 0;
        let txt = '';
        let btotalmoney = 0;
        let ztotalmoney = 0;
        
        // 현재 년월 정보
        const today = new Date();
        const tyear = today.getFullYear();
        const tmonth = today.getMonth() + 1;
        
        // 청구 목록 처리
        for (let z = 0; z <= totalcnt; z++) {
          console.log('a' + a);
          
          // 목록 항목 선택
          await new Promise(resolve => setTimeout(resolve, 300));
          await this.driver.executeScript(`return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpc0109000590.npca005m01.form._div_bizFrameMain.form.div_main.form.grd_dmdObjtrList.currentrow=${a}`);
          await this.driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpc0109000590.npca005m01.form._div_bizFrameMain.form.div_main.form.fn_selectDmdDtstDesc()");
          
          await new Promise(resolve => setTimeout(resolve, 200));
          
          // 알림창 처리
          try {
            await this.driver.wait(until.alertIsPresent(), 1000);
            const alert = await this.driver.switchTo().alert();
            if (alert.getText().includes('조회 결과가 없습니다')) {
              event.sender.send('claimResponse', { success: true, message: '청구완료' });
              await alert.accept();
              return;
            }
          } catch (error) {
            console.log('알림창 없음:', error);
          }
          
          await waitForLoading(this.driver);
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // 청구 정보 가져오기
          const name = await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpc0109000590.npca005m01.form._div_bizFrameMain.form.div_main.form.edt_prsNm:input"]')).getAttribute('value');
          const number = await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpc0109000590.npca005m01.form._div_bizFrameMain.form.div_main.form.edt_ltcMgmtNo:input"]')).getAttribute('value');
          const money = await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpc0109000590.npca005m01.form._div_bizFrameMain.form.div_main.form.stc_dtstLtcpTotAmt:text"]')).getText();
          const money2 = await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpc0109000590.npca005m01.form._div_bizFrameMain.form.div_main.form.stc_dtstNba:text"]')).getText();
          const target = await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpc0109000590.npca005m01.form._div_bizFrameMain.form.div_main.form.stc_sbrdnReduTypeCdNm:text"]')).getText();
          
          // 청구 제품 정보 가져오기
          // 청구 제품 정보 가져오기
          const claim_product = await this.driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpc0109000590.npca005m01.form._div_bizFrameMain.form.div_main.form.ds_mechList._rawRecords");
          
          // 청구 데이터 DB 처리
          if (claim_product && claim_product.length > 0) {
            
            // 새 청구 데이터 삽입
            for (let x = 0; x < claim_product.length; x++) {
              // 기존 데이터 조회 및 삭제
              const existingClaims = await this.getClaimList({
                date1: claim_product[x][30],
                date2: claim_product[x][22],
                pcode: claim_product[x][2],
                bcode: claim_product[x][0],
                cnt: claim_product[x][19]['hi'],
                yearMonth: `${nowtimey}-${nowtimem}`,
                companyId: companyId
              });
              console.log("existingClaims", existingClaims);
              // 기존 데이터 삭제
              if (existingClaims && existingClaims.length > 0) {
                for (const claim of existingClaims) {
                  await this.deleteClaim(claim.id);
                }
              }
              console.log("claim_product", {
                name: name,
                number: number,
                date1: claim_product[x][30],
                date2: claim_product[x][22],
                pcode: claim_product[x][2],
                bcode: claim_product[x][0],
                type: claim_product[x][6],
                ptype: claim_product[x][17],
                pdan: claim_product[x][3]['hi'],
                dan: claim_product[x][29]['hi'],
                cnt: claim_product[x][19]['hi'],
                date: nowtimeymd,
                sale: claim_product[x][16]['hi'],
                target: target,
                companyId: companyId
              });
              await this.insertClaim({
                name: name,
                number: number,
                date1: claim_product[x][30],
                date2: claim_product[x][22],
                pcode: claim_product[x][2],
                bcode: claim_product[x][0],
                type: claim_product[x][6],
                ptype: claim_product[x][17],
                pdan: claim_product[x][3]['hi'],
                dan: claim_product[x][29]['hi'],
                cnt: claim_product[x][19]['hi'],
                date: nowtimeymd,
                sale: claim_product[x][16]['hi'],
                target: target,
                companyId: companyId
              });
            }
          }
          // 대상자 유형에 따른 금액 합산
          if (target === '국민기초' || target === '의료급여') {
            ztotalmoney += parseInt(money2.replace('원', '').replace(',', ''));
          } else {
            btotalmoney += parseInt(money2.replace('원', '').replace(',', ''));
          }
          
          // 청구 등록 완료 버튼 클릭
          try {
            await this.driver.findElement(By.xpath('//*[@id="mainframe.VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winnpc0109000590.npca005m01.form._div_bizFrameMain.form.div_main.form.btn_dtstRegCplt"]')).click();
            await this.driver.wait(until.alertIsPresent(), 15000);
            const result = await this.driver.switchTo().alert();
            const resultText = await result.getText();
            if (resultText.includes('완료되었습니다')) {
              txt = '';
            } else {
              a++;
              txt = resultText;
            }
            
            await result.accept();
            await waitForLoading(this.driver);
          } catch (error) {
            console.error('청구 등록 완료 중 오류:', error);
          }
        }
        
        // 청구 프로세스 완료
        event.sender.send('claimResponse', { success: true, message: '청구완료' });
        
      } catch (error) {
        console.error('청구 데이터 처리 중 오류:', error);
        event.sender.send('claimResponse', { success: false, message: '청구창오류' });
      }
      
    } catch (error) {
      console.error('클레임 프로세스 중 오류 발생:', error);
      event.sender.send('claimResponse', { success: false, message: '클레임 프로세스 중 오류 발생' });
    }
  }
}

module.exports = ClaimService;