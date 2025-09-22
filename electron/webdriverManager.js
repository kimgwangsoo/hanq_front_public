// electron/webdriverManager.js
// const { ServiceBuilder } = require('selenium-webdriver/chrome');

const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { ServiceBuilder } = require('selenium-webdriver/chrome');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const { execSync } = require('child_process');
const axios = require('axios');
const os = require('os');
const https = require('https');
const unzipper = require('unzipper');

// const chromedriver = require('chromedriver');
/**
 * WebdriverManager - 웹드라이버 관리 클래스
 * 크롬 웹드라이버를 초기화하고 관리하는 기능 제공
 */
class WebdriverManager {
  constructor() {
    if (WebdriverManager.instance) {
      return WebdriverManager.instance;
    }

    // 싱글톤 인스턴스 설정
    WebdriverManager.instance = this;

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
   * 크롬창 포트 상태 확인
   * @returns {Promise<Object>} 크롬창 포트 상태 객체
   */
  async checkWebdriverPortStatus() {
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
              // 응답이 있으면 크롬창 포트가 실행 중
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
          // 연결 오류 - 크롬창 포트가 실행 중이 아님
          resolve({ active: false, error: e.message });
        });
        
        req.setTimeout(1000, () => {
          // 타임아웃 - 크롬창 포트가 실행 중이 아님
          req.abort();
          resolve({ active: false, error: '타임아웃' });
        });
      });
    } catch (error) {
      console.error('WebdriverService: 크롬창 포트 상태 확인 중 오류:', error);
      return { active: false, error: error.message };
    }
  }

  launchChromeDebug(debugPort = 9225, profileDir = 'chrome-profile-debug') {
    // OS에 맞게 크롬 실행 파일 경로 지정
    // Windows
    const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
    // macOS: const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    // Linux: const chromePath = "/usr/bin/google-chrome";

    const userDataDir = path.resolve(__dirname, profileDir);

    const args = [
      `--remote-debugging-port=${debugPort}`,
      `--user-data-dir=${userDataDir}`, // 프로필 격리 (중요)
      '--no-first-run',
      '--no-default-browser-check'
    ];

    const chromeProcess = spawn(chromePath, args, {
      detached: true,   // 부모 프로세스와 분리
      stdio: 'ignore'   // 콘솔 로그 무시
    });

    chromeProcess.unref(); // 부모가 종료돼도 크롬은 계속 실행됨

    console.log(`✅ Chrome launched in debug mode (port=${debugPort}, profile=${userDataDir})`);
    return chromeProcess;
  }

  // 1. 크롬 버전 감지 함수 (Windows/macOS/Linux 호환)
  getChromeVersion() {
    try {
      let chromeVersion;
      
      switch (process.platform) {
        case 'win32':
          // Windows 레지스트리에서 Chrome 버전 확인
          try {
            // 기본 레지스트리 경로
            
            // 대체 레지스트리 경로 시도
            const cmd = 'reg query "HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Google Chrome" /v version';
            const stdout = execSync(cmd).toString();
            const match = stdout.match(/version\s+REG_SZ\s+([\d.]+)/i);
            if (match) chromeVersion = match[1];
            console.log(match, "chromeVersion")
            
            // 로그 파일에 버전 기록
            fs.writeFileSync("error_log.log", chromeVersion || "Chrome 버전을 찾을 수 없음");
          } catch (e) {
            console.error('Windows 레지스트리에서 Chrome 버전을 읽는 데 실패했습니다:', e);
            fs.writeFileSync("error_log.log", `Chrome 버전을 읽는 데 실패했습니다. 오류 메시지: ${e}`);
          }
          break;
          
        case 'darwin':
          cmd = '/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --version';
          chromeVersion = execSync(cmd).toString().trim().replace('Google Chrome ', '');
          break;
          
        case 'linux':
          cmd = 'google-chrome --version || chromium-browser --version || chromium --version';
          chromeVersion = execSync(cmd).toString().trim().split(' ')[2];
          break;
      }
      
      return chromeVersion;
    } catch (err) {
      console.error('Chrome 버전 감지 실패:', err);
      return null;
    }
  }

  // 2. 자동 매핑 API 호출 및 ChromeDriver 다운로드
  async downloadChromeDriver(chromeVersion) {
    if (!chromeVersion) {
      throw new Error('Chrome version is required');
    }

    // 메이저 버전 추출 (예: 117.0.5938.132 -> 117)
    const majorVersion = chromeVersion.split('.')[0];

    // 자동 매핑 API 주소
    const apiUrl = 'https://googlechromelabs.github.io/chrome-for-testing/known-good-versions-with-downloads.json';

    console.log('Fetching ChromeDriver version info from API...');
    const response = await axios.get(apiUrl);
    const data = response.data;

    // ChromeDriver 정보 찾기
    const matched = data.versions.find(v => v.version.startsWith(majorVersion + '.'));

    if (!matched) {
      throw new Error(`No ChromeDriver version found for Chrome major version: ${majorVersion}`);
    }

    // OS 별 키 이름 매핑
    let platformKey;
    switch (process.platform) {
      case 'win32': platformKey = 'win64'; break;
      case 'darwin': platformKey = 'mac-x64'; break; // Apple Silicon은 'mac-arm64' 따로 있음
      case 'linux': platformKey = 'linux64'; break;
      default: throw new Error('Unsupported platform: ' + process.platform);
    }

    // 다운로드 URL 찾기
    const downloadInfo = matched.downloads.chromedriver.find(d => d.platform === platformKey);

    if (!downloadInfo) {
      throw new Error(`No ChromeDriver download info for platform: ${platformKey}`);
    }

    const url = downloadInfo.url;
    console.log(`Downloading ChromeDriver from ${url}`);

    // 다운로드 경로 및 압축 해제 경로 설정
    const tempDir = path.join(os.tmpdir(), 'chromedriver_download');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const zipPath = path.join(tempDir, 'chromedriver.zip');

    // 다운로드 함수
    await new Promise((resolve, reject) => {
      const file = fs.createWriteStream(zipPath);
      https.get(url, response => {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }).on('error', err => {
        fs.unlink(zipPath, () => {});
        reject(err);
      });
    });

    // 압축 해제
    await fs.createReadStream(zipPath)
      .pipe(unzipper.Extract({ path: tempDir }))
      .promise();

    // 드라이버 실행파일 경로 반환
    let driverPath;
    if (process.platform === 'win32') {
      driverPath = path.join(tempDir, 'chromedriver.exe');
    } else {
      driverPath = path.join(tempDir, 'chromedriver');
      // 권한 부여
      fs.chmodSync(driverPath, 0o755);
    }
    const username = os.userInfo().username;
    console.log('ChromeDriver ready at:', driverPath);
    return `C:\\Users\\${username}\\AppData\\Local\\Temp\\chromedriver_download\\chromedriver-win64\\chromedriver.exe`;
    // return driverPath;
  }


  /**
   * 웹드라이버 상태 확인 및 재시작
   * @returns {Promise<boolean>} 웹드라이버 재시작 여부
   */
  async restartIfNeeded() {
    try {
      // 현재 드라이버가 있는지 확인
      if (!this.driver) {
        console.log('WebDriver: 드라이버가 없음, 재시작 필요 없음');
        return false;
      }

      // 드라이버 연결 상태 확인
      try {
        // 간단한 명령으로 드라이버 상태 확인
        await this.driver.getCurrentUrl();
        console.log('WebDriver: 드라이버가 정상 작동 중');
        return false;
      } catch (err) {
        console.log('WebDriver: 드라이버 연결 끊김, 재시작 필요', err.message);
        // 기존 드라이버 정리
        await this.cleanup();
        return true;
      }
    } catch (error) {
      console.error('WebDriver 상태 확인 중 오류:', error);
      return true; // 오류 발생 시 재시작 필요
    }
  }

  /**
   * 웹드라이버 초기화
   * @param {boolean} forceRestart 강제 재시작 여부
   * @returns {Promise<WebDriver>} 초기화된 웹드라이버 인스턴스
   */
  async initialize(forceRestart = false) {
    // 강제 재시작이 요청된 경우 기존 드라이버 정리
    if (forceRestart && this.driver) {
      console.log('WebDriver: 강제 재시작 요청됨');
      await this.cleanup();
    } else {
      // 필요시 재시작 확인
      const needRestart = await this.restartIfNeeded();
      if (needRestart) {
        console.log('WebDriver: 상태 확인 결과 재시작 필요');
      }
    }

    // 이미 초기화 중이면 진행 중인 Promise 반환
    if (this.isInitializing) {
      console.log('WebDriver: 이미 초기화 중, 기존 Promise 반환');
      return this.initPromise;
    }

    // 이미 초기화되었고 정상 작동 중이면 기존 드라이버 반환
    if (this.driver) {
      try {
        await this.driver.getCurrentUrl(); // 드라이버 상태 확인
        console.log('WebDriver: 이미 초기화됨, 기존 드라이버 반환');
        return this.driver;
      } catch (err) {
        console.log('WebDriver: 기존 드라이버 오류, 재초기화 필요', err.message);
        await this.cleanup();
      }
    }

    // 초기화 상태 설정
    this.isInitializing = true;
    
    this.initPromise = (async () => {
      try {
        console.log('WebDriver: 초기화 시작…');
        const chromeVersion = this.getChromeVersion();
        console.log('Detected Chrome version:', chromeVersion);

        const driverPath = await this.downloadChromeDriver(chromeVersion);
        // Chrome 실행 경로 및 디버깅 포트 설정
        const chromeService = new ServiceBuilder(driverPath)
          .addArguments(`--remote-debugging-port=${this.PORT}`);

        console.log(`WebDriver: ServiceBuilder 구성 완료 (포트: ${this.PORT})`);
      
        //신규 크롬 기동
        console.log('WebDriver: 실행 중 크롬 없음 → 새 창 기동');
        const launchOpts = new chrome.Options()
          .addArguments('--no-sandbox', '--disable-dev-shm-usage')
          .addArguments('--disable-extensions', '--disable-popup-blocking')
          .addArguments('--disable-web-security', '--disable-features=VizDisplayCompositor')
          .addArguments('--disable-gpu-sandbox', '--disable-software-rasterizer')
          .addArguments('--window-size=1600,1200')
          .addArguments('--enable-logging', '--v=1')
          .addArguments(`--remote-debugging-port=${this.PORT}`);

        let builder = new Builder()
          .forBrowser('chrome')
          .setChromeOptions(launchOpts);
        builder.setChromeService(chromeService);
        this.driver = await builder.build();
        await this.driver.manage().setTimeouts({
          pageLoad: 30000,
          script: 30000,
          implicit: 5000,
        });
  
        console.log('WebDriver: 신규 크롬 기동 및 드라이버 연결 완료');
        return this.driver;
      } catch (err) {
        // 필요 시 여기서 크롬 프로세스 정리 로직 추가
        console.error('WebDriver: 초기화 실패:', err.message || err);
        this.driver = null;
        throw err;
      } finally {
        this.isInitializing = false;
      }
    })();

    return this.initPromise;
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
   * 웹드라이버 정리 및 종료
   */
  async cleanup() {
    if (this.driver) {
      try {
        console.log('웹드라이버 종료 중...');
        await this.driver.quit();
        console.log('웹드라이버 종료 완료');
      } catch (error) {
        console.error('웹드라이버 종료 중 오류:', error);
        // 드라이버 종료에 실패한 경우 디버그 크롬 강제 종료 시도
        try {
          await this.closeDebugChrome(this.PORT);
        } catch (closeError) {
          console.error('디버그 크롬 강제 종료 중 오류:', closeError);
        }
      } finally {
        this.driver = null;
      }
    }
  }

/**
 * 디버그 포트를 사용하는 Chrome 프로세스만 종료
 * @param {number} port - 종료할 디버그 포트 (기본값: 9225)
 * @returns {Promise<void>}
 */
async closeDebugChrome(port = 9225) {
  try {
    console.log(`디버그 포트 ${port}를 사용하는 Chrome 프로세스만 종료 시도 중...`);
    
    const { exec } = require('child_process');
    const util = require('util');
    const execAsync = util.promisify(exec);
    
    if (process.platform === 'win32') {
      // Windows: 더 정확한 프로세스 식별
      try {
        // 1. 포트를 사용하는 프로세스 PID 찾기
        const { stdout: netstatOutput } = await execAsync(`netstat -ano | findstr :${port}`);
        
        if (netstatOutput) {
          const lines = netstatOutput.split('\n');
          const pids = new Set();
          
          for (const line of lines) {
            const parts = line.trim().split(/\s+/);
            if (parts.length > 4) {
              const pid = parts[parts.length - 1];
              if (pid && pid !== '0') {
                pids.add(pid);
              }
            }
          }
          
          // 2. 각 PID가 chrome.exe이고 디버그 포트 인수를 가지는지 확인
          for (const pid of pids) {
            try {
              const { stdout: processInfo } = await execAsync(`wmic process where "ProcessId=${pid}" get CommandLine,ProcessId /format:csv`);
              
              if (processInfo.includes('chrome.exe') && 
                  processInfo.includes(`--remote-debugging-port=${port}`)) {
                console.log(`디버그 포트 ${port}를 사용하는 Chrome 프로세스 발견 (PID: ${pid})`);
                
                // 해당 PID만 종료
                await execAsync(`taskkill /F /PID ${pid}`);
                console.log(`Chrome 프로세스 (PID: ${pid}) 종료 완료`);
              }
            } catch (e) {
              // 프로세스가 이미 종료되었을 수 있음
              console.log(`PID ${pid} 처리 중 오류 (무시 가능):`, e.message);
            }
          }
        } else {
          console.log(`포트 ${port}를 사용하는 프로세스가 없습니다.`);
        }
      } catch (error) {
        console.log('Windows 정밀 종료 실패, 대안 방법 시도:', error.message);
        
        // 대안: PowerShell을 사용한 더 정확한 프로세스 종료
        try {
          const psCommand = `Get-WmiObject Win32_Process | Where-Object { $_.CommandLine -like "*chrome.exe*" -and $_.CommandLine -like "*--remote-debugging-port=${port}*" } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force }`;
          await execAsync(`powershell -Command "${psCommand}"`);
          console.log('PowerShell을 통한 디버그 Chrome 종료 완료');
        } catch (psError) {
          console.log('PowerShell 종료도 실패:', psError.message);
        }
      }
      
    } else if (process.platform === 'darwin') {
      // macOS: 정확한 프로세스 매칭
      try {
        const command = `pkill -f "Google Chrome.*--remote-debugging-port=${port}"`;
        await execAsync(command);
        console.log(`macOS: 디버그 포트 ${port}의 Chrome 프로세스 종료 완료`);
      } catch (error) {
        if (error.code === 1) {
          console.log('해당하는 Chrome 프로세스가 없습니다.');
        } else {
          throw error;
        }
      }
      
    } else {
      // Linux: 정확한 프로세스 매칭
      try {
        const command = `pkill -f "chrome.*--remote-debugging-port=${port}"`;
        await execAsync(command);
        console.log(`Linux: 디버그 포트 ${port}의 Chrome 프로세스 종료 완료`);
      } catch (error) {
        if (error.code === 1) {
          console.log('해당하는 Chrome 프로세스가 없습니다.');
        } else {
          throw error;
        }
      }
    }
    
  } catch (error) {
    console.error('디버그 Chrome 종료 중 예외 발생:', error);
    // 치명적이지 않은 오류이므로 throw하지 않음
  }
}

  /**
   * 안전한 드라이버 획득
   * @param {boolean} forceNew 강제로 새 인스턴스 생성 여부
   * @returns {Promise<WebDriver>} 웹드라이버 인스턴스
   */
  async getSafeDriver(forceNew = false) {
    if (forceNew || !this.driver) {
      console.log('WebDriver: 새 드라이버 인스턴스 요청됨');
      return await this.initialize(forceNew);
    }
    
    // 기존 드라이버 세션 유효성 확인
    try {
      await this.driver.getTitle(); // 간단한 명령으로 세션 확인
      console.log('WebDriver: 기존 유효한 드라이버 반환');
      return this.driver;
    } catch (error) {
      console.log('WebDriver: 기존 드라이버 무효, 새로 초기화');
      return await this.initialize(true);
    }
  }
}

module.exports = WebdriverManager;
// // 싱글톤 인스턴스 생성 및 내보내기
// const webdriverManager = new WebdriverManager();
// module.exports = webdriverManager;
