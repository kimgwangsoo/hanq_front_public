class BaseController {
  constructor(webdriverManager) {
    this.webdriverManager = webdriverManager;
  }

  /**
   * 안전한 드라이버 작업 실행 (모든 컨트롤러에서 공통 사용)
   */
  async executeWithDriver(operation) {
    let retryCount = 0;
    const maxRetries = 2;

    while (retryCount <= maxRetries) {
      try {
        // WebdriverManager에서 안전한 드라이버 획득
        const driver = await this.webdriverManager.getSafeDriver();
        return await operation(driver);
      } catch (error) {
        console.error(`드라이버 작업 실행 중 오류 (시도 ${retryCount + 1}/${maxRetries + 1}):`, error);
        
        if (error.name === 'NoSuchSessionError' || error.message.includes('session')) {
          console.log('세션 오류 감지, 재시도');
          await this.webdriverManager.cleanup();
          
          if (retryCount < maxRetries) {
            retryCount++;
            continue;
          }
        }
        
        throw error;
      }
    }
  }

  /**
   * 안전한 응답 전송 (선택사항)
   */
  // sendResponse(eventName, data) {
  //   const ipcManager = require('../ipcManager');
  //   ipcManager.safeEventSend(eventName, data);
  // }
}

module.exports = BaseController;