
const { ipcMain } = require('electron');
const path = require('path');
const ipcManager = require('../../ipcManager');
const BaseController = require('../base/BaceContoller');
const LookupService = require('./lookupService');
class LookupController extends BaseController {
  constructor(webdriverManager) {
    super(webdriverManager);
    this.lookupService = new LookupService(webdriverManager);
  }

  registerHandlers() {
    console.log('LookupController: 핸들러 등록');
    ipcMain.on('lookup', this.handleLookup.bind(this));
  }

  async handleLookup(event, ...args) {
    console.log('IPC: lookup 이벤트 수신됨, 자동화 실행');
    try {
        // 인수 추출
        const [cname, cnumber, h_ranker, h_regident, h_rcgt, cdate] = args;
        console.log(cname, cnumber, h_ranker, h_regident, h_rcgt, cdate);
        // this.lookupService.driver = this.driver;
        // this.lookupService.lookup(cname, cnumber, h_ranker, h_regident, h_rcgt, cdate);
        await this.executeWithDriver(async (driver) => {
          return await this.lookupService.lookup(driver, cname, cnumber, h_ranker, h_regident, h_rcgt, cdate);
        });
        // // 환경별 스크립트 경로 설정
        // const isDevelopment = process.env.NODE_ENV !== 'production';
        // let scriptPath;
        
        // if (isDevelopment) {
        //   // 개발 환경
        //   scriptPath = path.join(process.cwd(), '/electron/handler/lookup/lookupService.js');
        // } else {
        //   // 빌드 환경 - resources/electron 폴더 사용
        //   scriptPath = path.join(process.resourcesPath, '/electron/handler/lookup/lookupService.js');
        // }
        
        // if (!require('fs').existsSync(scriptPath)) {
        //   throw new Error(`스크립트 파일을 찾을 수 없습니다: ${scriptPath}`);
        // }
        
        // // 프로세스 인수 준비
        // const processArgs = [
        //   String(id || ''), 
        //   String(cname || ''), 
        //   String(cnumber || ''), 
        //   String(h_ranker || ''), 
        //   String(h_regident || ''), 
        //   String(h_rcgt || ''), 
        //   String(cdate || '')
        // ];
        
        // // 프로세스 옵션 설정
        // const processOptions = {
        //   env: { 
        //     ...process.env, 
        //     NODE_ENV: 'production',
        //     BROWSER_TYPE: browserType
        //   }
        // };
        
        // // 프로세스 실행
        // const processId = await ipcManager.executeProcess(
        //   scriptPath, 
        //   processArgs, 
        //   processOptions, 
        //   event, 
        //   300000
        // );
        
        // console.log(`조회 프로세스 시작됨 (Process ID: ${processId})`);
        
      } catch (error) {
        console.error('조회 처리 중 오류 발생:', error);
        
        // ipcManager를 통한 안전한 전송
        const ipcManager = require('../../ipcManager');
        ipcManager.safeEventSend('automation-complete', { 
          success: false, 
          error: error.message 
        });
      }
  }
}

module.exports = LookupController;