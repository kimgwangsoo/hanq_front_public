// electron/handler/webdriver/webdriverController.js
const { ipcMain } = require('electron');
const path = require('path');
const ipcManager = require('../../ipcManager');
// const LongtermController = require('../login/longtermLoginController');
class WebdriverController {
  // constructor() {
  //   this.registerHandlers();
    
  //   // LongtermController 인스턴스 생성
  //   // this.longtermController = new LongtermController();
  // }

  // IPC 핸들러들을 등록합니다
  registerHandlers() {
    ipcMain.on('webdriverStart', this.handleStartWebdriver.bind(this));
    ipcMain.on('webdriverStop', this.handleStopWebdriver.bind(this));
    
    // ipcMain.on('checkWebdriverBeforeLogin', this.checkWebdriverBeforeLogin.bind(this));
  }

  // 웹드라이버 시작 요청을 처리합니다
  async handleStartWebdriver(event, ...args) {
    console.log('IPC: webdriverStart 이벤트 수신됨, 웹드라이버 실행');
    
    try {
      // 이미 실행 중인 웹드라이버 확인
      // const isWebdriverRunning = await this.checkWebdriverRunning();
      
      // if (isWebdriverRunning) {
      //   console.log('이미 웹드라이버가 실행 중입니다. 기존 웹드라이버를 사용합니다.');
        
      //   // 이미 실행 중인 경우 성공 메시지 전송
      //   ipcManager.safeEventSend('webdriver-status', { 
      //     success: true, 
      //     message: '이미 웹드라이버가 실행 중입니다.',
      //     alreadyRunning: true
      //   });
        
      //   return;
      // }
      
      // 환경별 스크립트 경로 설정
      const isDevelopment = process.env.NODE_ENV !== 'production';
      let scriptPath;
      
      if (isDevelopment) {
        // 개발 환경
        scriptPath = path.join(process.cwd(), 'src/electron/handler/webdriver/webdriverService.js');
      } else {
        // 빌드 환경 - resources/electron 폴더 사용
        scriptPath = path.join(process.resourcesPath, 'src/electron/handler/webdriver/webdriverService.js');
      }
      
      if (!require('fs').existsSync(scriptPath)) {
        throw new Error(`스크립트 파일을 찾을 수 없습니다: ${scriptPath}`);
      }
      
      // 프로세스 인수 준비
      const processArgs = [];
      
      // 프로세스 옵션 설정
      const processOptions = {
        env: { 
          ...process.env, 
          NODE_ENV: 'production'
        }
      };
      
      // 프로세스 실행
      const processId = await ipcManager.executeProcess(
        scriptPath, 
        processArgs, 
        processOptions, 
        event, 
        300000
      );
      
      console.log(`웹드라이버 프로세스 시작됨 (Process ID: ${processId})`);
      
    } catch (error) {
      console.error('웹드라이버 시작 중 오류 발생:', error);
      
      // 포트 사용 중 오류인 경우 (이미 웹드라이버가 실행 중일 가능성)
      if (error.message && (
          error.message.includes('port already in use') || 
          error.message.includes('address already in use') ||
          error.message.includes('EADDRINUSE')
      )) {
        console.log('포트가 이미 사용 중입니다. 기존 웹드라이버를 사용합니다.');
        
        // 포트가 이미 사용 중인 경우 성공 메시지 전송
        ipcManager.safeEventSend('webdriver-status', { 
          success: true, 
          message: '이미 웹드라이버가 실행 중입니다.',
          alreadyRunning: true
        });
        
        return;
      }
      
      // 기타 오류
      ipcManager.safeEventSend('webdriver-status', { 
        success: false, 
        error: error.message 
      });
    }
  }
  
  // 웹드라이버가 이미 실행 중인지 확인
  async checkWebdriverRunning() {
    try {
      const http = require('http');
      const PORT = 9225; // 웹드라이버 포트
      
      return new Promise((resolve) => {
        // 포트 연결 시도
        const req = http.get(`http://localhost:${PORT}/json/version`, (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => {
            try {
              const result = JSON.parse(data);
              // 응답이 있으면 웹드라이버가 실행 중
              resolve(true);
            } catch (e) {
              // JSON 파싱 오류
              resolve(false);
            }
          });
        });
        
        req.on('error', () => {
          // 연결 오류 - 웹드라이버가 실행 중이 아님
          resolve(false);
        });
        
        req.setTimeout(1000, () => {
          // 타임아웃 - 웹드라이버가 실행 중이 아님
          req.abort();
          resolve(false);
        });
      });
    } catch (error) {
      console.error('웹드라이버 실행 상태 확인 중 오류:', error);
      return false;
    }
  }

  // 웹드라이버 종료 요청을 처리합니다
  async handleStopWebdriver(event) {
    console.log('IPC: webdriverStop 이벤트 수신됨, 웹드라이버 종료');
    
    try {
      // 활성 프로세스 목록 가져오기
      const activeProcesses = ipcManager.getActiveProcesses();
      
      // 모든 활성 프로세스 종료
      ipcManager.killAllProcesses();
      
      ipcManager.safeEventSend('webdriver-status', { 
        success: true, 
        message: '웹드라이버가 종료되었습니다.',
        terminatedProcesses: activeProcesses.length
      });
      
    } catch (error) {
      console.error('웹드라이버 종료 중 오류 발생:', error);
      
      ipcManager.safeEventSend('webdriver-status', { 
        success: false, 
        error: error.message 
      });
    }
  }

  // 웹드라이버 상태 확인 및 필요시 시작 후 롱텀 로그인 진행
  async checkWebdriverBeforeLogin(event, ...args) {
    console.log('IPC: checkWebdriverBeforeLogin 이벤트 수신됨');
    
    try {
      // 웹드라이버가 실행 중인지 확인
      const isWebdriverRunning = await this.checkWebdriverRunning();
      
      if (!isWebdriverRunning) {
        console.log('웹드라이버가 실행 중이 아닙니다. 웹드라이버 시작 후 로그인을 진행합니다.');
        
        // 웹드라이버 시작 이벤트 핸들러 등록 (시작 완료 후 롱텀 로그인 실행)
        const startCompleteHandler = (startResult) => {
          // 이벤트 핸들러 제거 (한 번만 실행)
          ipcMain.removeListener('webdriver-started', startCompleteHandler);
          
          if (startResult.success) {
            console.log('웹드라이버 시작 완료. 롱텀 로그인 진행');
            
            // 롱텀 로그인 실행
            this.longtermController.handleLongtermLogin(event, ...args);
          }
        };
        
        // 웹드라이버 시작 완료 이벤트 리스너 등록
        ipcMain.once('webdriver-started', startCompleteHandler);
        
        // 웹드라이버 시작 요청 처리
        await this.startWebdriverWithCallback(event, () => {
          // 웹드라이버 시작 완료 이벤트 발생
          ipcMain.emit('webdriver-started', { success: true });
        });
      } else {
        console.log('웹드라이버가 이미 실행 중입니다. 바로 로그인을 진행합니다.');
        
        // 웹드라이버가 이미 실행 중이면 바로 롱텀 로그인 실행
        this.longtermController.handleLongtermLogin(event, ...args);
      }
    } catch (error) {
      console.error('웹드라이버 상태 확인 중 오류 발생:', error);
      
      // 오류 메시지 전송
      ipcManager.safeEventSend('automation-complete', { 
        success: false, 
        error: error.message 
      });
    }
  }
  
  // 콜백 함수를 사용하여 웹드라이버 시작
  async startWebdriverWithCallback(event, callback) {
    try {
      // 환경별 스크립트 경로 설정
      const isDevelopment = process.env.NODE_ENV !== 'production';
      let scriptPath;
      
      if (isDevelopment) {
        // 개발 환경
        scriptPath = path.join(process.cwd(), 'src/electron/handler/webdriver/webdriverService.js');
      } else {
        // 빌드 환경 - resources/electron 폴더 사용
        scriptPath = path.join(process.resourcesPath, 'src/electron/handler/webdriver/webdriverService.js');
      }
      
      if (!require('fs').existsSync(scriptPath)) {
        throw new Error(`스크립트 파일을 찾을 수 없습니다: ${scriptPath}`);
      }
      
      // 프로세스 인수 준비
      const processArgs = [];
      
      // 프로세스 옵션 설정
      const processOptions = {
        env: { 
          ...process.env, 
          NODE_ENV: 'production'
        }
      };
      
      // 웹드라이버 시작 완료 이벤트 핸들러
      const completionHandler = (result) => {
        if (result.success) {
          setTimeout(() => {
            if (typeof callback === 'function') {
              callback();
            }
          }, 3000);
        }
      };
      
      // 웹드라이버 시작 완료 이벤트 리스너 등록
      ipcMain.once('automation-complete', completionHandler);
      
      // 프로세스 실행
      const processId = await ipcManager.executeProcess(
        scriptPath, 
        processArgs, 
        processOptions, 
        event, 
        300000
      );
      
      console.log(`웹드라이버 프로세스 시작됨 (Process ID: ${processId})`);
      
    } catch (error) {
      console.error('웹드라이버 시작 중 오류 발생:', error);
      
      // 포트 사용 중 오류인 경우 (이미 웹드라이버가 실행 중일 가능성)
      if (error.message && (
          error.message.includes('port already in use') || 
          error.message.includes('address already in use') ||
          error.message.includes('EADDRINUSE')
      )) {
        console.log('포트가 이미 사용 중입니다. 기존 웹드라이버를 사용합니다.');
        
        // 콜백 실행
        if (typeof callback === 'function') {
          callback();
        }
        
        return;
      }
      
      throw error;
    }
  }
  
  // 대기 함수
  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // 컨트롤러를 정리
  cleanup() {
    // IPC 핸들러 제거
    ipcMain.removeAllListeners('webdriverStart');
    ipcMain.removeAllListeners('webdriverStop');
    ipcMain.removeAllListeners('checkWebdriverBeforeLogin');
    
    // LongtermController 정리
    if (this.longtermController) {
      this.longtermController.cleanup();
      this.longtermController = null;
    }
    
    console.log('WebdriverController 정리 완료');
  }
}

module.exports = WebdriverController;
