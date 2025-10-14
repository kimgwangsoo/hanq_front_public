const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

let progressWin = null;

function createProgressWindow() {
  progressWin = new BrowserWindow({
    width: 360, height: 120,
    resizable: false, frame: false, alwaysOnTop: true,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  });

  const html = `
  <!doctype html><html><head><meta charset="utf-8">
  <style>
    body{margin:16px;font-family:system-ui,Segoe UI,Roboto,Apple SD Gothic Neo,sans-serif}
    .title{font-size:14px;margin-bottom:8px}
    progress{width:100%;height:20px}
    .meta{font-size:12px;margin-top:6px;opacity:.8}
  </style></head><body>
    <div class="title">업데이트 다운로드 중… <span id="per">0%</span></div>
    <progress id="bar" max="100" value="0"></progress>
    <div class="meta"><span id="spd">0 KB/s</span> · <span id="rem">남은 용량 계산중</span></div>
    <script>
      const { ipcRenderer } = require('electron');
      const per = document.getElementById('per');
      const bar = document.getElementById('bar');
      const spd = document.getElementById('spd');
      const rem = document.getElementById('rem');

      function fmtBytes(n){
        if(!n && n!==0) return '';
        const u=['B','KB','MB','GB']; let i=0; while(n>=1024 && i<u.length-1){n/=1024;i++}
        return n.toFixed(1)+' '+u[i];
      }
      ipcRenderer.on('progress', (_, p) => {
        per.textContent = p.percent.toFixed(1) + '%';
        bar.value = p.percent;
        spd.textContent = (p.bytesPerSecond? fmtBytes(p.bytesPerSecond)+'/s' : '');
        if (p.total && p.transferred) {
          rem.textContent = fmtBytes(p.total - p.transferred) + ' 남음';
        }
      });
      ipcRenderer.on('done', () => {
        per.textContent = '100%';
        bar.value = 100;
        setTimeout(()=>window.close(), 600);
      });
    </script>
  </body></html>`;
  progressWin.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(html));

  progressWin.on('closed', () => { progressWin = null; });

  return progressWin;
}

function initAutoUpdater({onNoUpdate} = {}) {
  autoUpdater.autoDownload = false;

  autoUpdater.on('update-available', info => {
    progressWin = createProgressWindow();
    autoUpdater.downloadUpdate();
  });

  autoUpdater.on('update-downloaded', (info) => {
    if (progressWin && !progressWin.isDestroyed()) {
      const complete = {
        percent: 100,
        bytesPerSecond: 0,
        transferred: 0,
        total: 0
      }
      progressWin.webContents.send('progress', {percent: 100, bytesPerSecond: 0, transferred: 0, total: 0});
      progressWin.setProgressBar(100);
    }
    autoUpdater.quitAndInstall(false, true);
  });

  autoUpdater.on('download-progress', (progressObj) => {
    if (progressWin && !progressWin.isDestroyed()) {
    progressWin.webContents.send('progress', progressObj);
    progressWin.setProgressBar(Math.max(0, Math.min(1, progressObj.percent / 100)));
  }
  });

  autoUpdater.on('update-not-available', () => {
    if(onNoUpdate) onNoUpdate();
  });

  autoUpdater.on('error', err => {
    dialog.showErrorBox('업데이트 오류', err == null ? "unknown" : (err.stack || err).toString());
    app.quit();
  });
}

/*
 * 1시간에 한번씩 업데이트 검사, git은 한 아이피에서 시간당 60회 제약이 있음. 
 * 한 사업장에서 여러 프로그램을 사용하는경우 업데이트가 필요할 때만 
 * autoUpdater.checkForUpdates() 를 호출하는 방식으로 변경 필요
 * 1시간으로 설정시 한 사업장에서 동시 60개의 프로그램 실행까지 업데이트 기능 작동
*/
function scheduleAutoUpdate(intervalMs = 3600000) { //한시간 이하로 줄이는 것은 문제가 심각해질 수 있음
  // 개발 환경이거나 패키징되지 않은 경우 업데이트 체크를 건너뛰고 onNoUpdate 콜백 실행
  if (!app.isPackaged) {
    console.log('개발 환경에서는 업데이트 체크를 건너뜁니다.');
    if (autoUpdater.listeners('update-not-available').length > 0) {
      autoUpdater.emit('update-not-available');
    }
    return;
  }

  autoUpdater.checkForUpdates(); //최초 업데이트 체크

  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, intervalMs);
}

module.exports = { initAutoUpdater, scheduleAutoUpdate, autoUpdater };