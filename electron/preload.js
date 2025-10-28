// electron/preload.js
const { contextBridge, ipcRenderer } = require('electron')
console.log(process.type, "process.type3")
// 일렉트론 API를 window 객체에 노출
contextBridge.exposeInMainWorld('electron', {
  // 메인 프로세스로 메시지 전송
  send: (channel, ...data) => {
    // 웹드라이버 채널
    const webdriverChannel = [
      'webdriver-check',
    ];
    // 윈도우 제어 채널
    const windowChannel = [
      'minimize-window', 
      'maximize-window', 
      'close-window'
    ];
    // 공단로그인 채널
    const longtermLoginChannel = [
      'longtermLogin',
    ];

    // 수급자조회 채널
    const lookupChannel = [
      'lookup',
    ];

    // 메시지 채널
    const messageChannel = [
      'message',
    ];

    // 계약 구매 채널
    const contractChannel = [
      'buyContract',
      'buyCancle',
    ];
    // 계약 대여 채널
    const rentContractChannel = [
      'rentContract',
      'rentContractAdd',
      'rentContractCancel',
      'rentContractStop',
      'rentContractStopCancel',
      'rentContractStopRestart'
    ];
    // 인증 관련 채널
    const authChannel = [
      'save-auth-token',
    ];

    // 파일 다운로드 채널
    const downloadChannel = [
      'download-file',
    ];

    // 클레임 채널
    const claimChannel = [
      'claimStart',
    ];
    
    // 허용된 채널 목록
    const validChannels = [
      ...windowChannel,
      ...webdriverChannel,
      ...longtermLoginChannel,
      ...lookupChannel,
      ...messageChannel,
      ...contractChannel,
      ...rentContractChannel,
      ...authChannel,
      ...downloadChannel,
      ...claimChannel
    ];
    
    if (validChannels.includes(channel)) {
      console.log(`preload.js에서 전송: ${channel}`, data);
      ipcRenderer.send(channel, ...data);
    } else {
      console.warn(`허용되지 않은 채널: ${channel}`);
    }
  },
  
  // 메인 프로세스로부터 메시지 수신
  receive: (channel, func) => {

    // 공단 판매 계약 채널
    const contractChannel = [
      'buyContractResponse',
      'buyCancelResponse',
    ];

    // 계약 대여 채널
    const rentContractChannel = [
      'rentContractResponse',
      'rentContractAddResponse',
      'rentContractCancelResponse',
      'rentContractStopResponse',
      'rentContractStopCancelResponse',
      'rentContractStopRestartResponse',
    ];
    // 클레임 채널
    const claimChannel = [
      'claimStartResponse',
    ];
    // 허용된 채널 목록
    const validChannels = [
      'automation-complete',
      'webdriver-status',
      'webdriver-restart',
      'reply',
      ...contractChannel,
      ...rentContractChannel,
      ...claimChannel
    ];
    
    if (validChannels.includes(channel)) {
      // 이벤트 리스너 등록 및 콜백 함수 실행
      const subscription = (event, ...data) => func(...data);
      ipcRenderer.on(channel, subscription);
      
      // 구독 취소 함수 반환
      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    } else {
      console.warn(`허용되지 않은 수신 채널: ${channel}`);
      return () => {}; // 빈 함수 반환
    }
  },
  
  // 일회성 메시지 수신 (once)
  receiveOnce: (channel, func) => {
    const validChannels = [
      'automation-complete',
      'webdriver-status',
      'webdriver-restart',
      'reply',
      'buyContract-complete',
      'buyCancle-complete',
      'rentContract-complete'
    ];
    
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...data) => func(...data));
    } else {
      console.warn(`허용되지 않은 일회성 수신 채널: ${channel}`);
    }
  },
  
  // 모든 리스너 제거
  removeAllListeners: (channel) => {
    const validChannels = [
      'automation-complete',
      'webdriver-status',
      'webdriver-restart',
      'reply',
      'buyContract-complete',
      'buyCancle-complete',
      'rentContract-complete'
    ];
    
    if (validChannels.includes(channel)) {
      ipcRenderer.removeAllListeners(channel);
    } else {
      console.warn(`허용되지 않은 채널: ${channel}`);
    }
  }
});

// 디버깅을 위해 window 객체에 직접 속성 추가 (contextIsolation이 false일 때만 작동)
if (process.contextIsolated === false) {
  window.electronAPI = window.electron;
}