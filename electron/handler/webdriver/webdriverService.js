// electron/handler/webdriver/webdriverService.js
// const { Builder } = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');
// const { ServiceBuilder } = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

/**
 * WebdriverService - 싱글톤 패턴으로 구현된 웹드라이버 서비스
 * 애플리케이션 전체에서 하나의 웹드라이버 인스턴스를 공유하여 사용
 */
class WebdriverService {
  constructor() {
    if (WebdriverService.instance) {
      return WebdriverService.instance;
    }

    // 싱글톤 인스턴스 설정
    WebdriverService.instance = this;

    // 멤버 변수 초기화
    this.driver = null;
    this.PORT = 9225;
    this.isInitializing = false;
    this.initPromise = null;

    // 프로세스 종료 이벤트 리스너 등록
    process.on('SIGINT', this.cleanup.bind(this));
    process.on('SIGTERM', this.cleanup.bind(this));
    process.on('exit', this.cleanup.bind(this));

    return this;
  }

  /**
   * 웹드라이버 인스턴스 가져오기
   * @returns {WebDriver} 웹드라이버 인스턴스
   */
  getDriver() {
    return this.driver;
  }

  /**
   * 웹드라이버가 초기화되었는지 확인
   * @returns {boolean} 초기화 여부
   */
  isInitialized() {
    return this.driver !== null;
  }

  /**
   * 웹드라이버가 초기화 중인지 확인
   * @returns {boolean} 초기화 중 여부
   */
  isInitializingDriver() {
    return this.isInitializing;
  }

  /**
   * 웹드라이버 초기화 Promise 반환
   * @returns {Promise} 초기화 Promise
   */
  getInitPromise() {
    return this.initPromise;
  }

  /**
   * 웹드라이버 정리 (종료)
   */
  async cleanup() {
    console.log('WebdriverService: 웹드라이버 정리 시작');
    try {
      if (this.driver) {
        await this.driver.quit();
        this.driver = null;
        console.log('WebdriverService: 웹드라이버 정리 완료');
      }
    } catch (e) {
      console.error('WebdriverService: 웹드라이버 종료 중 오류 발생:', e);
    }
  }

  /**
   * ChromeDriver 경로 찾기
   * @returns {string|null} ChromeDriver 경로
   */
  findChromeDriver() {
    // 운영체제 확인
    const isWin = process.platform === 'win32';
    const isMac = process.platform === 'darwin';
    const isLinux = process.platform === 'linux';
    
    // 운영체제별 파일명
    const driverFileName = isWin ? 'chromedriver.exe' : 'chromedriver';
    
    // 가능한 경로들
    const paths = [
      // 프로젝트 내 node_modules
      path.join(process.cwd(), 'node_modules', 'chromedriver', 'lib', 'chromedriver', driverFileName),
      // 상위 디렉토리 node_modules
      path.join(process.cwd(), '..', 'node_modules', 'chromedriver', 'lib', 'chromedriver', driverFileName),
      // 글로벌 설치 경로
      isWin ? 'C:\\Program Files\\chromedriver\\' + driverFileName : '/usr/local/bin/' + driverFileName,
      // 현재 디렉토리
      path.join(process.cwd(), driverFileName),
      // 실행 파일 디렉토리
      path.join(__dirname, driverFileName),
      // 시스템 PATH에 있는 경우
      driverFileName
    ];
    
    for (const driverPath of paths) {
      try {
        if (fs.existsSync(driverPath)) {
          console.log('WebdriverService: ChromeDriver 경로 발견:', driverPath);
          return driverPath;
        }
      } catch (e) {
        console.error(`WebdriverService: 경로 확인 중 오류: ${driverPath}`, e);
      }
    }
    
    console.warn('WebdriverService: ChromeDriver를 찾을 수 없습니다. 시스템 PATH에서 찾습니다.');
    return null;
  }

  /**
   * 크롬 버전 확인
   * @returns {Promise<string>} 크롬 버전
   */
  async checkChromeVersion() {
    return new Promise((resolve) => {
      // Windows에서 크롬 버전 확인
      const command = 'reg query "HKLM\\Software\\Google\\Chrome\\BLBeacon" /v version';
      
      exec(command, (error, stdout) => {
        if (error) {
          console.log('WebdriverService: 크롬 버전 확인 실패');
          resolve('unknown');
          return;
        }
        
        const match = stdout.match(/version\s+REG_SZ\s+([\d.]+)/);
        if (match && match[1]) {
          console.log(`WebdriverService: 크롬 버전 확인: ${match[1]}`);
          resolve(match[1]);
        } else {
          console.log('WebdriverService: 크롬 버전 확인 실패 (형식 불일치)');
          resolve('unknown');
        }
      });
    });
  }

  /**
   * 웹드라이버 시작
   * @param {Function} callback 완료 콜백 함수
   * @returns {Promise<boolean>} 성공 여부
   */
  async startWebdriver(callback) {
    // 이미 초기화 중이면 기존 Promise 반환
    if (this.isInitializing && this.initPromise) {
      console.log('WebdriverService: 웹드라이버가 이미 초기화 중입니다. 기존 Promise 반환');
      return this.initPromise;
    }
    
    // 이미 초기화되었으면 true 반환
    if (this.driver) {
      console.log('WebdriverService: 웹드라이버가 이미 초기화되었습니다.');
      if (callback && typeof callback === 'function') {
        callback({ success: true, message: '웹드라이버가 이미 초기화되었습니다.' });
      }
      return Promise.resolve(true);
    }
    
    // 초기화 상태 설정
    this.isInitializing = true;
    
    // 초기화 Promise 생성
    this.initPromise = new Promise(async (resolve, reject) => {
      try {
        console.log('WebdriverService: 웹드라이버 초기화 시작');
        
        // 크롬 버전 확인
        const chromeVersion = await this.checkChromeVersion();
        
        // 크롬 옵션 설정
        const options = new chrome.Options();
        options.addArguments('--start-maximized');
        options.addArguments('--disable-web-security');
        options.addArguments('--disable-features=VizDisplayCompositor');
        options.addArguments('--window-size=1600,1200');
        options.addArguments(`--remote-debugging-port=${this.PORT}`);
        
        // 최소한의 필수 옵션만 사용 (오류 해결을 위해)
        options.addArguments('--no-sandbox'); // 샌드박스 비활성화
        options.addArguments('--disable-dev-shm-usage'); // 공유 메모리 제한 비활성화
        options.addArguments('--remote-allow-origins=*'); // cors 허용 
        
        // 디버깅 모드 활성화
        options.addArguments('--enable-logging');
        options.addArguments('--v=1');
        
        // 실험적 옵션
        options.addArguments('--disable-gpu-sandbox');
        options.addArguments('--disable-software-rasterizer');
        
        // 브라우저 환경 설정
        options.addArguments('--disable-extensions'); // 확장 프로그램 비활성화
        options.addArguments('--disable-popup-blocking'); // 팝업 차단 비활성화
        
        // 크롬드라이버 경로 찾기
        const driverPath = this.findChromeDriver();
        const builder = new Builder().forBrowser('chrome').setChromeOptions(options);
        
        // 크롬드라이버 서비스 설정
        if (driverPath) {
          try {
            const service = new ServiceBuilder(driverPath);
            builder.setChromeService(service);
          } catch (e) {
            console.error('WebdriverService: 크롬드라이버 서비스 설정 중 오류:', e);
          }
        }
        
        try {
          // 웹드라이버 생성
          this.driver = await builder.build();
          
          // 드라이버 생성 후 타임아웃 설정
          await this.driver.manage().setTimeouts({
            script: 30000,
            pageLoad: 30000,
            implicit: 10000
          });
          
          // 안정화를 위한 짧은 대기
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          console.log('WebdriverService: 웹드라이버 초기화 완료');
          
          // // 롱텀 로그인 페이지로 이동
          const loginUrl = 'https://www.longtermcare.or.kr/npbs/auth/login/loginForm.web?menuId=npe0000002160&rtnUrl=&zoomSize=';
          console.log(`WebdriverService: 롱텀 로그인 페이지로 이동: ${loginUrl}`);
          await this.driver.get(loginUrl);
          
          // 웹드라이버 세션 유지
          this.keepAlive();
          
          // 콜백 호출
          if (callback && typeof callback === 'function') {
            callback({ 
              success: true, 
              message: `웹드라이버가 포트 ${this.PORT}에서 성공적으로 시작되었습니다.`,
              port: this.PORT
            });
          }
          
          // Promise 해결
          resolve(true);
        } catch (buildError) {
          console.error('WebdriverService: 웹드라이버 빌드 실패:', buildError.message);
          
          // 크롬 브라우저가 이미 실행 중인 경우를 위한 처리
          if (buildError.message.includes('chrome not reachable') || 
              buildError.message.includes('unable to connect')) {
            
            // Windows에서 크롬 프로세스 종료 시도
            try {
              exec('taskkill /F /IM chrome.exe', { stdio: 'ignore' });
              console.log('WebdriverService: 크롬 프로세스 종료 시도');
            } catch (e) {
              console.error('WebdriverService: 크롬 프로세스 종료 실패:', e);
            }
          }
          
          // 콜백 호출
          if (callback && typeof callback === 'function') {
            callback({ 
              success: false, 
              error: buildError.message || '웹드라이버 빌드 중 오류가 발생했습니다.'
            });
          }
          
          // Promise 거부
          reject(buildError);
        }
      } catch (error) {
        console.error('WebdriverService: 웹드라이버 시작 중 오류 발생:', error);
        
        // 콜백 호출
        if (callback && typeof callback === 'function') {
          callback({ 
            success: false, 
            error: error.message || '웹드라이버 시작 중 알 수 없는 오류가 발생했습니다.'
          });
        }
        
        // Promise 거부
        reject(error);
      } finally {
        // 초기화 상태 해제
        this.isInitializing = false;
      }
    });
    
    return this.initPromise;
  }

  /**
   * 웹드라이버 세션 유지
   */
  async keepAlive() {
    try {
      // 현재 페이지 URL 확인
      const currentUrl = await this.driver.getCurrentUrl();
      console.log(`WebdriverService: 웹드라이버 세션이 유지되고 있습니다. 현재 URL: ${currentUrl}`);
      
      // 웹드라이버 상태 확인
      const status = await this.checkWebdriverStatus();
      console.log(`WebdriverService: 웹드라이버 상태: ${status.active ? '활성' : '비활성'}, 포트: ${this.PORT}`);
      
      // 주기적으로 세션 유지 확인 (3분마다)
      setInterval(async () => {
        try {
          if (this.driver) {
            // 현재 URL 가져오기로 세션 활성 상태 확인
            const url = await this.driver.getCurrentUrl();
            
            // 웹드라이버 상태 확인
            const status = await this.checkWebdriverStatus();
            
            // 페이지가 변경되었는지 확인
            if (url !== currentUrl) {
              console.log(`WebdriverService: 페이지가 변경됨: ${url}`);
            }
          }
        } catch (e) {
          console.error('WebdriverService: 웹드라이버 세션 유지 중 오류 발생:', e);
        }
      }, 180000); // 3분
    } catch (error) {
      console.error('WebdriverService: 웹드라이버 세션 유지 중 오류 발생:', error);
    }
  }

  /**
   * 웹드라이버 상태 확인
   * @returns {Promise<Object>} 웹드라이버 상태 객체
   */
  async checkWebdriverStatus() {
    try {
      const http = require('http');
      
      return new Promise((resolve) => {
        // 포트 연결 시도
        const req = http.get(`http://localhost:${this.PORT}/json/version`, (res) => {
          let data = '';
          res.on('data', (chunk) => { data += chunk; });
          res.on('end', () => {
            try {
              const result = JSON.parse(data);
              // 응답이 있으면 웹드라이버가 실행 중
              resolve({
                active: true,
                version: result.Browser || '알 수 없음',
                port: this.PORT
              });
            } catch (e) {
              // JSON 파싱 오류
              resolve({ active: false, error: e.message });
            }
          });
        });
        
        req.on('error', (e) => {
          // 연결 오류 - 웹드라이버가 실행 중이 아님
          resolve({ active: false, error: e.message });
        });
        
        req.setTimeout(1000, () => {
          // 타임아웃 - 웹드라이버가 실행 중이 아님
          req.abort();
          resolve({ active: false, error: '타임아웃' });
        });
      });
    } catch (error) {
      console.error('WebdriverService: 웹드라이버 상태 확인 중 오류:', error);
      return { active: false, error: error.message };
    }
  }

  /**
   * 웹드라이버가 실행 중인지 확인
   * @returns {Promise<boolean>} 실행 중 여부
   */
  async isWebdriverRunning() {
    const status = await this.checkWebdriverStatus();
    return status.active;
  }
}

// 싱글톤 인스턴스 생성
const webdriverService = new WebdriverService();

// 모듈 내보내기
module.exports = webdriverService;