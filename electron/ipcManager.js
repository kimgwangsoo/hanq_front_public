// electron/ipcManager.js
const { fork } = require('child_process');
class IPCManager {
  constructor() {
    this.activeProcesses = new Map();
  }

  // 메인 윈도우 설정
  setMainWindow(window) {
    this.mainWindow = window;
  }

  // 안전한 이벤트 전송
  safeEventSend(channel, data) {
    try {
      if (this.mainWindow && !this.mainWindow.isDestroyed()) {
        this.mainWindow.webContents.send(channel, data);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('이벤트 전송 오류:', error);
      return false;
    }
  }

  /**
   * 자동화 프로세스를 실행하고 관리
   * @param {string} scriptPath - 실행할 스크립트 경로
   * @param {Array} processArgs - 프로세스 인수
   * @param {Object} options - 프로세스 옵션
   * @param {Object} event - IPC 이벤트 객체
   * @param {number} timeout - 타임아웃 시간 (밀리초, 기본값: 5분)
   * @returns {Promise} 프로세스 실행 결과
   */
  async executeProcess(scriptPath, processArgs = [], options = {}, event, timeout = 300000) {
    const processId = Date.now() + Math.random();
    
    try {
      // 기본 옵션 설정
      const defaultOptions = {
        env: { 
          ...process.env, 
          NODE_ENV: 'production'
        },
        silent: false,
        detached: false
      };
      
      const finalOptions = { ...defaultOptions, ...options };
      
      // 자식 프로세스 생성
      const automationProcess = fork(scriptPath, processArgs, finalOptions);
      
      console.log(`자동화 프로세스 시작됨 (PID: ${automationProcess.pid}, ID: ${processId})`);
      
      // 프로세스 등록
      this.activeProcesses.set(processId, automationProcess);
      
      // 타임아웃 설정
      let processTimeout = setTimeout(() => {
        console.log(`자동화 프로세스 타임아웃 (${timeout/1000}초), 종료합니다. (ID: ${processId})`);
        this.killProcess(processId);
      }, timeout);
      
      // 타임아웃 해제 함수
      const clearProcessTimeout = () => {
        if (processTimeout) {
          clearTimeout(processTimeout);
          processTimeout = null;
        }
      };
      
      // 프로세스 이벤트 핸들러 등록
      this.setupProcessHandlers(automationProcess, event, processId, clearProcessTimeout);
      
      return processId;
      
    } catch (error) {
      console.error('자동화 프로세스 시작 중 오류 발생:', error);
      
      // 오류를 렌더러 프로세스에 전송
      if (event.sender && !event.sender.isDestroyed()) {
        event.sender.send('automation-complete', { 
          success: false, 
          error: error.message 
        });
      }
      
      throw error;
    }
  }

  // 프로세스 이벤트 핸들러를 설정
  setupProcessHandlers(automationProcess, event, processId, clearProcessTimeout) {
    // 자식 프로세스로부터 메시지 수신
    automationProcess.on('message', (result) => {
      console.log(`자동화 프로세스로부터 메시지 수신 (ID: ${processId}):`, result);
      clearProcessTimeout();
      
      // 안전한 이벤트 전송
      this.safeEventSend('automation-complete', result);
      this.cleanupProcess(processId);
    });
    
    // 자식 프로세스 오류 처리
    automationProcess.on('error', (error) => {
      console.error(`자동화 프로세스 오류 (ID: ${processId}):`, error);
      clearProcessTimeout();
      
      this.safeEventSend('automation-complete', { 
        success: false, 
        error: error.message 
      });
      this.cleanupProcess(processId);
    });
    
    // 자식 프로세스 종료 처리
    automationProcess.on('exit', (code, signal) => {
      console.log(`자동화 프로세스 종료됨 (ID: ${processId}, 코드: ${code}, 시그널: ${signal})`);
      clearProcessTimeout();
      
      if (code !== 0 && code !== null) {
        this.safeEventSend('automation-complete', { 
          success: false, 
          error: `프로세스가 비정상 종료되었습니다 (코드: ${code}, 시그널: ${signal})` 
        });
      }
      this.cleanupProcess(processId);
    });
  }

  // 특정 프로세스를 강제 종료
  killProcess(processId) {
    const process = this.activeProcesses.get(processId);
    if (process && !process.killed) {
      try {
        process.kill('SIGTERM');
        console.log(`프로세스 강제 종료됨 (ID: ${processId})`);
      } catch (error) {
        console.error(`프로세스 종료 중 오류 (ID: ${processId}):`, error);
      }
    }
  }

  // 프로세스를 정리
  cleanupProcess(processId) {
    if (this.activeProcesses.has(processId)) {
      this.activeProcesses.delete(processId);
      console.log(`프로세스 정리 완료 (ID: ${processId})`);
    }
  }

  // 모든 활성 프로세스를 종료
  killAllProcesses() {
    console.log(`모든 활성 프로세스 종료 중... (총 ${this.activeProcesses.size}개)`);
    
    for (const [processId, process] of this.activeProcesses) {
      this.killProcess(processId);
    }
    
    this.activeProcesses.clear();
  }

  // 활성 프로세스 목록을 반환
  getActiveProcesses() {
    return Array.from(this.activeProcesses.keys());
  }
}

// 싱글톤 인스턴스 생성
const ipcManager = new IPCManager();

module.exports = ipcManager;