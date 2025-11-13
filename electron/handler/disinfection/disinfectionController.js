const { ipcMain } = require('electron');
const DisinfectionService = require('./disinfectionService');
const BaseController = require('../base/BaceContoller');
class DisinfectionController extends BaseController {
  constructor(webdriverManager) {
    super(webdriverManager);
    this.disinfectionService = new DisinfectionService(webdriverManager);
  }

  registerHandlers() {
    ipcMain.on('disinfectionStart', this.handleDisinfectionStart.bind(this));
  }

  async handleDisinfectionStart(event, ...args) {
    console.log('IPC: disinfection 이벤트 수신됨, 자동화 실행');
    try {
      await this.executeWithDriver(async (driver) => {
        return await this.disinfectionService.disinfection(driver, event, args);
      });
      console.log("disinfection 프로세스 완료");
    } catch (error) {
      console.error('disinfection 처리 중 오류 발생:', error);
      event.sender.send('disinfectionStartResponse', { success: false, message: 'disinfection 프로세스 중 오류 발생' });
    }
  }
}
module.exports = DisinfectionController;