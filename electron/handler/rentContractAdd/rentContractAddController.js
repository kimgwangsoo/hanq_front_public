const { ipcMain } = require('electron');

const RentContractAddService = require('./rentContractAddService');
const BaseController = require('../base/BaceContoller');
class RentContractAddController extends BaseController{
  constructor(webdriverManager) {
    super(webdriverManager);
    this.rentContractAddService = new RentContractAddService(webdriverManager);
  }

  registerHandlers() {
    ipcMain.on('rentContractAdd', this.handleRentContractAdd.bind(this));
  }

  async handleRentContractAdd(event, ...args) {
    console.log('IPC: rentContractAdd 이벤트 수신됨, 자동화 실행');
    try {
      // this.rentContractAddService.driver = this.driver;
      // this.rentContractAddService.rentContractAdd(event,args);
      await this.executeWithDriver(async (driver) => {
        return await this.rentContractAddService.rentContractAdd(driver, event, args);
      });
      console.log("계약 대여 연장 프로세스 완료");
    } catch (error) {
      console.error('rentContractAdd 처리 중 오류 발생:', error);
      event.sender.send('rentContractAddResponse', { success: false, message: '계약 대여 연장 프로세스 중 오류 발생' });
    }
  }
}
module.exports = RentContractAddController;