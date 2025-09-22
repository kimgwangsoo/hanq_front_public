const { menuMove, waitForLoading } = require('../common/commonService');



class LookupService {
  constructor(driver) {
    this.driver = driver;
  }

  async lookup(driver, name, number, ranker, resident, rcgt, date) {
    this.driver = driver;
    console.log(name, number, ranker, resident, rcgt, date);
    // // 버튼 클릭 - 조회 버튼
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
    await this.driver.executeScript(`nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia210p01.form._div_bizFrameMain.form.cmb_cRcgtGradeCd.value='${ranker}'`);
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 인정일자 입력
    await this.driver.executeScript(`nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia210p01.form._div_bizFrameMain.form.cal_cRcgtEdaFrDt.value='${rcgt}'`);
    await new Promise(resolve => setTimeout(resolve, 100));
    
    await this.driver.executeScript(`nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia210p01.form._div_bizFrameMain.form.cal_cCtrStdDt.value='${date}'`);
    await new Promise(resolve => setTimeout(resolve, 100));

    // 행 설정 및 검색 실행
    await this.driver.executeScript("nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia210p01.form._div_bizFrameMain.form.ds_ctrHistList.rowcount=1");
    await this.driver.executeScript("nexacro.getApplication().all[0].VFrameSet.HFrameSet.VFrameSetSub.framesetWork.winNPA04010100.npia210p01.form._div_bizFrameMain.form.fn_selectWelToolTgtSearchCfm()");
    // await waitForLoading(this.driver); // await 추가
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
  }
}

// // 스크립트 실행부
// if (require.main === module) {
//   const args = process.argv.slice(2);
//   const cname = args[0];
//   const cnumber = args[1];
//   const h_ranker = args[2];
//   const h_regident = args[3];
//   const h_rcgt = args[4];
//   const cdate = args[5];
  
//   const lookupService = new LookupService();
//   lookupService.lookup(cname, cnumber, h_ranker, h_regident, h_rcgt, cdate);
// }

module.exports = LookupService;
