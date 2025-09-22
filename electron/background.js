// electron/background.js
// 'use strict'
console.log(process.type, "process.type2")
const { app, protocol, BrowserWindow, ipcMain, Menu, dialog } = require('electron')
const { autoUpdater } = require('electron-updater');
const installExtension = require('electron-devtools-installer')
const { VUEJS3_DEVTOOLS } = require('electron-devtools-installer')
const LongtermController = require('./handler/login/longtermLoginController')
const LookupController = require('./handler/lookup/lookupController')
const BuyContractController = require('./handler/buyContract/buyContractController')
const RentContractController = require('./handler/rentContract/rentContractController')
const RentContractAddController = require('./handler/rentContractAdd/rentContractAddController')
// 컨트롤러 및 유틸리티 임포트
const ipcManager = require('./ipcManager')
const WebdriverManager = require('./webdriverManager')
const path = require('path')
const fs = require('fs')
const isDevelopment = process.env.NODE_ENV !== 'production'

const isPackaged = app.isPackaged;            // 이게 가장 정확함

// 메인 윈도우 객체에 대한 전역 참조를 유지
let win
let logtermController
let lookupController
let buyContractController
let rentContractController
let rentContractAddController
// Scheme 등록
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

// ---- Auto Update 공통 설정 ----
function setupAutoUpdater() {
  // 로그 연결
  try {
    const log = require('electron-log');
    autoUpdater.logger = log;
    autoUpdater.logger.transports.file.level = 'info';
  } catch (_) {}

  autoUpdater.autoDownload = true;            // 자동 다운로드
  autoUpdater.autoInstallOnAppQuit = false;   // 우리가 타이밍 제어
  autoUpdater.allowPrerelease = false;        // 베타 채널 쓰면 true

  // 이벤트 바인딩
  autoUpdater.on('checking-for-update', () => {
    win?.webContents.send('update-status', { type: 'checking' });
  });

  autoUpdater.on('update-available', (info) => {
    win?.webContents.send('update-status', { type: 'available', version: info.version, releaseNotes: info.releaseNotes });
    // 선택 팝업이 필요하면 여기서 보여주되, autoDownload=true면 굳이 안 물어봐도 됨
  });

  autoUpdater.on('update-not-available', (info) => {
    win?.webContents.send('update-status', { type: 'not-available', version: info?.version });
  });

  autoUpdater.on('error', (err) => {
    win?.webContents.send('update-status', { type: 'error', message: err.message });
    // 인터넷 끊김 같은 건 굳이 팝업 안 띄워도 됨
    if (!String(err.message || '').includes('ERR_INTERNET_DISCONNECTED')) {
      dialog.showErrorBox('업데이트 오류', `${err.message}`);
    }
  });

  autoUpdater.on('download-progress', (p) => {
    const payload = {
      percent: Math.round(p.percent),
      bytesPerSecond: p.bytesPerSecond,
      transferred: p.transferred,
      total: p.total
    };
    win?.webContents.send('update-progress', payload);
  });

  autoUpdater.on('update-downloaded', (info) => {
    win?.webContents.send('update-status', { type: 'downloaded', version: info.version, releaseNotes: info.releaseNotes });

    dialog.showMessageBox(win, {
      type: 'info',
      title: '업데이트 준비됨',
      message: `버전 ${info.version} 설치 준비 완료`,
      buttons: ['지금 재시작', '나중에'],
      defaultId: 0,
      cancelId: 1
    }).then(r => {
      if (r.response === 0) {
        app.isQuitting = true;
        // 네가 필요하면 여기서 정리 작업 호출
        autoUpdater.quitAndInstall(false, true);
      }
    });
  });
}

// 메인 윈도우 생성 함수
async function createWindow() {
  console.log('0. 기존 Chrome 프로세스 정리 실행');
  // Chrome 프로세스 정리 실행
  await cleanupChromeProcesses();

  console.log('1. 윈도우 생성');
  const { screen } = require('electron')
  const primaryDisplay = screen.getPrimaryDisplay()
  const { width, height } = primaryDisplay.workAreaSize

  // preload 경로 수정 (빌드/개발 환경 고려)
  const preloadPath = isDevelopment 
    ? path.resolve(__dirname, '../electron/preload.js') 
    : path.resolve(__dirname, './preload.js');

  // 브라우저 윈도우 생성
  win = new BrowserWindow({
    width: width,
    height: height,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false,
      preload: preloadPath
    }
  })

  // 개발자 도구 열기
  // win.webContents.openDevTools();

  // 윈도우를 최대화하여 전체화면으로 표시
  win.maximize()

  // 메뉴바 완전히 제거
  win.setMenu(null)

  const devUrl = process.env.ELECTRON_START_URL || process.env.WEBPACK_DEV_SERVER_URL
  // if (devUrl) {
    // 개발 모드 - 외부 dev 서버 사용
     await win.loadURL("http://13.125.188.151:8080/")
    // await win.loadURL("http://localhost:8080/")
  // } else {
  //   // 프로덕션 모드 - 빌드된 파일 로드
  //   const indexPath = path.resolve(__dirname, '../dist/index.html')
  //   await win.loadFile(indexPath)
  // }

  // =====================================================
  // 자동 업데이트 설정 (GitHub)
  // =====================================================
  if (isPackaged) {
    // 이벤트를 먼저 붙이고 나서 체크 호출
    setupAutoUpdater();
    autoUpdater.checkForUpdatesAndNotify();     // 한 번만
    // 주기적으로 재확인하고 싶으면:
    // setInterval(() => autoUpdater.checkForUpdates(), 6 * 60 * 60 * 1000);
  }

  // 페이지 로드 완료 후 ipcManager에 윈도우 등록
  win.webContents.once('did-finish-load', () => {
    ipcManager.setMainWindow(win);
    console.log('메인 윈도우 로드 완료');
  });

  // 윈도우 이벤트 처리
  win.on('closed', () => {
    win = null
  })
  
  win.on('close', (event) => {
    if (win.isClosingConfirmed) return;
    event.preventDefault();
    
    confirmQuit(win).then(confirmed => {
      if (confirmed) {
        win.close();
      }
    }).catch(err => {
      console.error('프로그램 종료 확인 중 오류 발생1:', err);
    });
  })
}

// Chrome 드라이버 프로세스 정리 함수
const cleanupChromeProcesses = async () => {
  try {
    console.log('기존 Chrome 프로세스 정리 중...');
    
    if (process.platform === 'win32') {
      // Windows - Chrome 및 ChromeDriver 프로세스 강제 종료
      const { exec } = require('child_process');
      const util = require('util');
      const execAsync = util.promisify(exec);
      
      try {
        // ChromeDriver 프로세스 종료 (Chrome 브라우저 제외)
        await execAsync('taskkill /F /IM chromedriver.exe 2>nul || echo "No chromedriver.exe processes found"');
        console.log('ChromeDriver 프로세스 정리 완료');
        
        // 포트 9225를 사용하는 프로세스 종료
        try {
          const { stdout } = await execAsync('netstat -ano | findstr :9225');
          if (stdout) {
            const lines = stdout.split('\n');
            for (const line of lines) {
              const parts = line.trim().split(/\s+/);
              if (parts.length > 4) {
                const pid = parts[parts.length - 1];
                if (pid && pid !== '0') {
                  try {
                    await execAsync(`taskkill /F /PID ${pid} 2>nul`);
                    console.log(`포트 9225 사용 프로세스 (PID: ${pid}) 종료`);
                  } catch (e) {
                    // 이미 종료된 프로세스일 수 있음
                  }
                }
              }
            }
          }
        } catch (e) {
          // 포트를 사용하는 프로세스가 없을 경우
          console.log('포트 9225를 사용하는 프로세스 없음');
        }
        
      } catch (error) {
        console.log('프로세스 정리 중 일부 오류 발생 (정상적일 수 있음):', error.message);
      }
    } else if (process.platform === 'darwin') {
      // macOS
      const { exec } = require('child_process');
      const util = require('util');
      const execAsync = util.promisify(exec);
      
      try {
        await execAsync('pkill -f "Chrome.*--remote-debugging-port=9225" || true');
        await execAsync('pkill -f chromedriver || true');
        console.log('macOS Chrome 프로세스 정리 완료');
      } catch (error) {
        console.log('macOS 프로세스 정리 중 오류:', error.message);
      }
    } else {
      // Linux
      const { exec } = require('child_process');
      const util = require('util');
      const execAsync = util.promisify(exec);
      
      try {
        await execAsync('pkill -f "chrome.*--remote-debugging-port=9225" || true');
        await execAsync('pkill -f chromedriver || true');
        console.log('Linux Chrome 프로세스 정리 완료');
      } catch (error) {
        console.log('Linux 프로세스 정리 중 오류:', error.message);
      }
    }
    
    // 프로세스 정리 후 잠시 대기
    await new Promise(resolve => setTimeout(resolve, 2000));
    
  } catch (error) {
    console.error('Chrome 프로세스 정리 중 오류:', error);
    // 오류가 발생해도 계속 진행
  }
};

// 프로그램 종료 확인 함수 (기존과 동일)
async function confirmQuit(browserWindow) {
  if (app.isQuitting || (browserWindow && browserWindow.isClosingConfirmed)) {
    return true;
  }
  
  try {
    const result = await dialog.showMessageBox(browserWindow, {
      type: 'question',
      buttons: ['예', '아니오'],
      defaultId: 1,
      title: '프로그램 종료',
      message: '프로그램을 종료하시겠습니까?',
      cancelId: 1
    });
    
    if (result.response === 0) {
      app.isQuitting = true;
      if (browserWindow) {
        browserWindow.isClosingConfirmed = true;
      }
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error('대화상자 표시 중 오류 발생:', err);
    return false;
  }
}

// 컨트롤러 초기화
async function initializeControllers() {
  try {
    const webdriverManagerInstance = new WebdriverManager();
    // await webdriverManagerInstance.initialize();
    console.log("webdriverManagerInstance.driver", webdriverManagerInstance.driver)


    logtermController = new LongtermController(webdriverManagerInstance);
    logtermController.registerHandlers();

    lookupController = new LookupController(webdriverManagerInstance);
    lookupController.registerHandlers();

    buyContractController = new BuyContractController(webdriverManagerInstance);
    buyContractController.registerHandlers();

    rentContractController = new RentContractController(webdriverManagerInstance);
    rentContractController.registerHandlers();
    
    rentContractAddController = new RentContractAddController(webdriverManagerInstance);
    rentContractAddController.registerHandlers();
    
    console.log('컨트롤러 초기화 완료');
  } catch (error) {
    console.error('컨트롤러 초기화 중 오류:', error);
  }
}

// 컨트롤러 정리
function cleanupControllers() {
  try {
    if (logtermController) {
      logtermController.cleanup();
      logtermController = null;
    }
    ipcManager.killAllProcesses();
  } catch (error) {
    console.error('컨트롤러 정리 중 오류:', error);
  }
}

// 윈도우 컨트롤 이벤트 처리 (기존과 동일)
ipcMain.on('minimize-window', () => {
  console.log('IPC: minimize-window 이벤트 수신됨');
  if (win) {
    win.minimize();
    console.log('윈도우 최소화 완료');
  }
});

ipcMain.on('maximize-window', () => {
  console.log('IPC: maximize-window 이벤트 수신됨');
  if (win) {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
});

ipcMain.on('close-window', () => {
  console.log('IPC: close-window 이벤트 수신됨');
  if (win) {
    confirmQuit(win).then(confirmed => {
      if (confirmed) {
        win.close();
      }
    }).catch(err => {
      console.error('프로그램 종료 확인 중 오류 발생:', err);
    });
  }
});

// 앱 이벤트 처리 (기존과 동일)
app.on('before-quit', (event) => {
  if (app.isQuitting) {
    cleanupControllers();
    // webdriverManagerInstance.closeDebugChrome();
    return;
  }
  
  if (!win) return;
  
  event.preventDefault();
  confirmQuit(win).then(confirmed => {
    if (confirmed) {
      app.quit();
    }
  }).catch(err => {
    console.error('프로그램 종료 확인 중 오류 발생:', err);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    console.log('윈도우 생성');
    createWindow()
  }
})

app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   try {
  //     await installExtension(VUEJS3_DEVTOOLS)
  //   } catch (e) {
  //     console.error('Vue Devtools failed to install:', e.toString())
  //   }
  // }
  
  Menu.setApplicationMenu(null)
  
  // 메인 윈도우 생성
  await createWindow()
  await initializeControllers()
})

// 개발 모드 에러 처리
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// 기본 IPC 통신 처리
ipcMain.on('message', (event, arg) => {
  console.log('Received message:', arg)
  event.reply('reply', 'Message received!')
})

// 웹드라이버 상태 확인 핸들러
ipcMain.on('webdriver-check', async (event) => {
  console.log('IPC: webdriver-check 이벤트 수신됨');
  try {
    console.log('IPC: webdriver-check 이벤트 시작');
    // WebdriverManager 인스턴스 가져오기
    const webdriverManagerInstance = new WebdriverManager();
    
    // 웹드라이버 상태 확인
    const status = {
      isInitialized: webdriverManagerInstance.isInitialized(),
      needsRestart: false
    };
    
    // 웹드라이버가 초기화되었으면 연결 상태 확인
    if (status.isInitialized) {
      try {
        // 간단한 명령으로 웹드라이버 연결 상태 확인
        await webdriverManagerInstance.driver.getCurrentUrl();
        status.connected = true;
      } catch (err) {
        console.log('웹드라이버 연결 끊김, 재시작 필요:', err.message);
        status.connected = false;
        status.needsRestart = true;
        
        // 웹드라이버 재시작
        try {
          await webdriverManagerInstance.cleanup();
          await webdriverManagerInstance.initialize(true);
          status.restarted = true;
        } catch (restartError) {
          console.error('웹드라이버 재시작 실패:', restartError);
          status.restarted = false;
          status.restartError = restartError.message;
        }
      }
    }
    
    // 상태 정보 전송
    event.sender.send('webdriver-status', status);
  } catch (error) {
    console.error('웹드라이버 상태 확인 중 오류:', error);
    event.sender.send('webdriver-status', { error: error.message });
  }
})

// 토큰 저장 함수
const saveAuthToken = (token) => {
  try {
    const tokenPath = path.join(app.getPath('userData'), 'auth_token.json');
    const authData = { token, timestamp: Date.now() };
    fs.writeFileSync(tokenPath, JSON.stringify(authData));
    console.log('인증 토큰이 저장되었습니다.',tokenPath);
  } catch (error) {
    console.error('인증 토큰 저장 중 오류:', error);
  }
};

// 인증 토큰 저장 IPC 핸들러
ipcMain.on('save-auth-token', (event, token) => {
  if (token === null) {
    // 토큰이 null이면 파일 삭제 (로그아웃)
    const tokenPath = path.join(app.getPath('userData'), 'auth_token.json');
    if (fs.existsSync(tokenPath)) {
      try {
        fs.unlinkSync(tokenPath);
        console.log('인증 토큰이 삭제되었습니다.');
      } catch (error) {
        console.error('토큰 파일 삭제 오류:', error);
      }
    }
  } else {
    // 토큰 저장
    saveAuthToken(token);
  }
})