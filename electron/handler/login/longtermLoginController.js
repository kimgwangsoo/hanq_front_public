// electron/handler/login/longtermLoginController.js
const { ipcMain } = require('electron');
const path = require('path');
const ipcManager = require('../../ipcManager');
const BaseController = require('../base/BaceContoller');
const LongtermLoginService = require('./longtermLoginService');
class LongtermController extends BaseController {
  constructor(webdriverManager) {
    super(webdriverManager); // BaseController 초기화
    this.longtermLoginService = new LongtermLoginService(webdriverManager);
  }

  // IPC 핸들러들을 등록합니다
  registerHandlers() {
    // 롱텀 로그인 IPC 이벤트 처리
    ipcMain.on('longtermLogin', this.handleLongtermLogin.bind(this));
  }

  // 롱텀 로그인 요청을 처리합니다
  async handleLongtermLogin(event, ...args) {
    console.log('IPC: longtermLogin 이벤트 수신됨, 자동화 실행');
    
    try {
      // 인수 추출
      const [browserType, companyId, cnum, cname, certPassword, certType] = args;
      
      // 입력값 검증
      if (!cnum || !cname || !certPassword) {
        throw new Error('필수 정보가 누락되었습니다. (기관번호, 기관명, 인증서 비밀번호)');
      }
      console.log("롱텀로그인 컨트롤러에서 로그인 요청 시작 driver", this.driver); 
      // this.LongtermLogin(id, cnum, cname, certPassword);
      // await this.driver.get('http://localhost:8080');
     
      // BaseController의 executeWithDriver 사용
      await this.executeWithDriver(async (driver) => {
        const url = 'https://www.longtermcare.or.kr/npbs/auth/login/loginForm.web?menuId=npe0000002160&rtnUrl=&zoomSize=';
        
        return await this.longtermLoginService.LongtermLogin(
          driver, url, cnum, cname, certPassword, certType, companyId
        );
      });

      // // BaseController의 sendResponse 사용
      // this.sendResponse('automation-complete', {
      //   success: true,
      //   result: result
      // });
      
      // // 환경별 스크립트 경로 설정
      // const isDevelopment = process.env.NODE_ENV !== 'production';
      // let scriptPath;
      
      // if (isDevelopment) {
      //   // 개발 환경
      //   scriptPath = path.join(process.cwd(), '/electron/handler/login/longtermLoginService.js');
      // } else {
      //   // 빌드 환경 - resources/electron 폴더 사용
      //   scriptPath = path.join(process.resourcesPath, '/electron/handler/login/longtermLoginService.js');
      // }
      
      // if (!require('fs').existsSync(scriptPath)) {
      //   throw new Error(`스크립트 파일을 찾을 수 없습니다: ${scriptPath}`);
      // }
      
      // // 프로세스 인수 준비
      // const processArgs = [
      //   String(id || ''), 
      //   String(cname || ''), 
      //   String(cnum || ''), 
      //   String(certPassword || ''),
      //   this.driver
      // ];
      
      // // 프로세스 옵션 설정
      // const processOptions = {
      //   env: { 
      //     ...process.env, 
      //     NODE_ENV: 'production',
      //     BROWSER_TYPE: browserType
      //   }
      // };
      
      // // 프로세스 실행
      // const processId = await ipcManager.executeProcess(
      //   scriptPath, 
      //   processArgs, 
      //   processOptions, 
      //   event, 
      //   300000
      // );
      
      // console.log(`롱텀 로그인 프로세스 시작됨 (Process ID: ${processId})`);
      
    } catch (error) {
      console.error('롱텀 로그인 처리 중 오류 발생:', error);
      
      // ipcManager를 통한 안전한 전송
      const ipcManager = require('../../ipcManager');
      ipcManager.safeEventSend('automation-complete', { 
        success: false, 
        error: error.message 
      });
    }
  }

  // 컨트롤러를 정리
  cleanup() {
    // IPC 핸들러 제거
    ipcMain.removeAllListeners('longtermLogin');
    console.log('LongtermController 정리 완료');
  }
}

module.exports = LongtermController;