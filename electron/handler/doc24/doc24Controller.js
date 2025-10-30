const { ipcMain } = require('electron');
const Doc24Service = require('./doc24Service');
const BaseController = require('../base/BaceContoller');
class Doc24Controller extends BaseController {
  constructor(webdriverManager) {
    super(webdriverManager);
    this.doc24Service = new Doc24Service(webdriverManager);
  }

  registerHandlers() {
    ipcMain.on('doc24Start', this.handleDoc24Start.bind(this));
  }

  async handleDoc24Start(event, ...args) {
    console.log('IPC: doc24 이벤트 수신됨, 자동화 실행');
    try {
      await this.executeWithDriver(async (driver) => {
        return await this.doc24Service.doc24(driver, event, args);
      });
      console.log("doc24 프로세스 완료");
    } catch (error) {
      console.error('doc24 처리 중 오류 발생:', error);
      event.sender.send('doc24StartResponse', { success: false, message: 'doc24 프로세스 중 오류 발생' });
    }
  }
}
module.exports = Doc24Controller;