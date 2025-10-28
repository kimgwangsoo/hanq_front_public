const { ipcMain } = require('electron');
const ClaimService = require('./claimService');
const BaseController = require('../base/BaceContoller');
class ClaimController extends BaseController {
  constructor(webdriverManager) {
    super(webdriverManager);
    this.claimService = new ClaimService(webdriverManager);
  }

  registerHandlers() {
    ipcMain.on('claimStart', this.handleClaimStart.bind(this));
  }

  async handleClaimStart(event, ...args) {
    console.log('IPC: claim 이벤트 수신됨, 자동화 실행');
    try {
      await this.executeWithDriver(async (driver) => {
        return await this.claimService.claim(driver, event, args);
      });
      console.log("청구 프로세스 완료");
    } catch (error) {
      console.error('claim 처리 중 오류 발생:', error);
      event.sender.send('claimResponse', { success: false, message: '클레임 프로세스 중 오류 발생' });
    }
  }
}
module.exports = ClaimController;