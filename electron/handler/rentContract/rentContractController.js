const { ipcMain } = require('electron');

const RentContractService = require('./rentContractService');
const BaseController = require('../base/BaceContoller');
class RentContractController extends BaseController {
  constructor(webdriverManager) {
    super(webdriverManager);
    this.rentContractService = new RentContractService(webdriverManager);
  }

  registerHandlers() {
    ipcMain.on('rentContract', this.handleRentContract.bind(this));
    ipcMain.on('rentContractCancel', this.handleRentContractCancel.bind(this));
  }

  async handleRentContract(event, ...args) {
    console.log('IPC: rentContract 이벤트 수신됨, 자동화 실행');
    try {
      // this.buyContractService.driver = this.driver;
      // this.buyContractService.buyContract(event,args);
      await this.executeWithDriver(async (driver) => {
        return await this.rentContractService.rentContract(driver, event, args);
      });
      console.log("계약 대여 프로세스 완료");
    } catch (error) {
      console.error('rentContract 처리 중 오류 발생:', error);
      event.sender.send('rentContractResponse', { success: false, message: '계약 대여 프로세스 중 오류 발생' });
    }
  }

  async handleRentContractCancel(event, ...args) {
    console.log('IPC: rentContractCancel 이벤트 수신됨, 자동화 실행');
    try {
      await this.executeWithDriver(async (driver) => {
        return await this.rentContractService.rentContractCancel(driver, event, args);
      });
      console.log("계약 대여 취소 프로세스 완료");
    } catch (error) {
      console.error('rentContractCancel 처리 중 오류 발생:', error);
      event.sender.send('rentContractCancelResponse', { success: false, message: '계약 대여 취소 프로세스 중 오류 발생' });
    }
  }
}
module.exports = RentContractController;