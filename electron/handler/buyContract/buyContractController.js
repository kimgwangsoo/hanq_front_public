const { ipcMain } = require('electron');
// import path from 'path';
// import ipcManager from '../../ipcManager';
const BuyContractService = require('./buyContractService');
const BaseController = require('../base/BaceContoller');
class BuyContractController extends BaseController {
  constructor(webdriverManager) {
    super(webdriverManager);
    this.buyContractService = new BuyContractService(webdriverManager);
  }

  registerHandlers() {
    ipcMain.on('buyContract', this.handleBuyContract.bind(this));
    ipcMain.on('buyCancle', this.handleBuyCancle.bind(this));
  }

  async handleBuyContract(event, ...args) {
    console.log('IPC: buyContract 이벤트 수신됨, 자동화 실행');
    try {
      // this.buyContractService.driver = this.driver;
      // this.buyContractService.buyContract(event,args);
      await this.executeWithDriver(async (driver) => {
        return await this.buyContractService.buyContract(driver, event, args);
      });
      console.log("계약 구매 프로세스 완료");
    } catch (error) {
      console.error('buyContract 처리 중 오류 발생:', error);
      event.sender.send('buyContractResponse', { success: false, message: '계약 구매 프로세스 중 오류 발생' });
    }
  }

  async handleBuyCancle(event, ...args) {
    console.log('IPC: buyCancle 이벤트 수신됨, 자동화 실행');
    try {
      await this.executeWithDriver(async (driver) => {
        return await this.buyContractService.buyCancle(driver, event, args);
      });
      console.log("계약 취소 프로세스 완료");
    } catch (error) {
      console.error('buyCancle 처리 중 오류 발생:', error);
    }
  }
}
module.exports = BuyContractController;