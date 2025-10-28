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
    ipcMain.on('rentContractStop', this.handleRentContractStop.bind(this));
    ipcMain.on('rentContractStopCancel', this.handleRentContractStopCancel.bind(this));
    ipcMain.on('rentContractStopRestart', this.handleRentContractStopRestart.bind(this));
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

  async handleRentContractStop(event, ...args) {
    console.log('IPC: rentContractStop 이벤트 수신됨, 자동화 실행');
    try {
      await this.executeWithDriver(async (driver) => {
        return await this.rentContractService.rentContractStop(driver, event, args);
      });
      console.log("계약 대여 중지 프로세스 완료");
    } catch (error) {
      console.error('rentContractStop 처리 중 오류 발생:', error);
      event.sender.send('rentContractStopResponse', { success: false, message: '계약 대여 중지 프로세스 중 오류 발생' });
    }
  }

  async handleRentContractStopCancel(event, ...args) {
    console.log('IPC: rentContractstopCancel 이벤트 수신됨, 자동화 실행');
    try {
      await this.executeWithDriver(async (driver) => {
        return await this.rentContractService.rentContract(driver, event, args);
      });
      console.log("계약 대여 중지 취소 프로세스 완료");
    } catch (error) {
      console.error('rentContractstopCancel 처리 중 오류 발생:', error);
      event.sender.send('rentContractstopCancelResponse', { success: false, message: '계약 대여 중지 취소 프로세스 중 오류 발생' });
    }
  }

  async handleRentContractStopRestart(event, ...args) {
    console.log('IPC: rentContractStopRestart 이벤트 수신됨, 자동화 실행');
    try {
      await this.executeWithDriver(async (driver) => {
        return await this.rentContractService.rentContract(driver, event, args);
      });
      console.log("계약 대여 중지 재시작 프로세스 완료");
    } catch (error) {
      console.error('rentContractStopRestart 처리 중 오류 발생:', error);
      event.sender.send('rentContractStopRestartResponse', { success: false, message: '계약 대여 중지 재시작 프로세스 중 오류 발생' });
    }
  }
}
module.exports = RentContractController;