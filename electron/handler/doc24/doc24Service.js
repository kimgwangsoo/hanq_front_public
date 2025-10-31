const { By, Key } = require('selenium-webdriver');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const electron = require('electron');
const app = electron.app || require('@electron/remote').app;
const os = require('os');
const { waitForLoading } = require('../common/commonService');
const LongtermLoginService = require('../login/longtermLoginService');
class Doc24Service extends LongtermLoginService {
  constructor(driver) {
    super(driver);
    this.driver = driver;
  }

  async createDoc24EndFile(userId,companyId, nameDetail, orderId) {
    console.log('문서 발송 완료 파일 생성');
    await axios.post('http://3.37.206.255:3000/common/doc24/end', {
      userId: userId,
      companyId: companyId,
      nameDetail: nameDetail,
      orderId: orderId
    });
  }

  async htmlConvertPDF(htmlContent) {
    const { BrowserWindow } = electron;
    let win;
    try {
      // 저장 경로 준비 (사용자 Documents 폴더 사용 - 배포 환경에서도 쓰기 가능)
      const outDir = path.join(os.homedir(), 'Documents', 'hanq_doc24');
      const outPath = path.join(outDir, 'doc24.pdf');
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      // 비표시 윈도우 생성 후 HTML 로드
      win = new BrowserWindow({
        width: 794,   // A4 세로 기준 px 근사치 (96DPI 가정)
        height: 1123,
        show: false,
        webPreferences: {
          sandbox: false,
          contextIsolation: true
        }
      });

      const dataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent || '');
      await win.loadURL(dataUrl);

      // 렌더 안정화 대기 (간단 대기)
      await new Promise(res => setTimeout(res, 300));

      // PDF 생성
      const pdfBuffer = await win.webContents.printToPDF({
        printBackground: true,
        pageSize: 'A4',
        landscape: false,
        margins: { marginType: 0 }
      });

      fs.writeFileSync(outPath, pdfBuffer);
      return { filePath: outPath, buffer: pdfBuffer };
    } catch (error) {
      throw new Error(`HTML->PDF 변환 실패: ${error.message || error}`);
    } finally {
      if (win && !win.isDestroyed()) {
        win.close();
      }
    }
  }

  async doc24(driver, event, args) {
    try {
      console.log('doc24 프로세스 시작');
      console.log("args", args);
      const argsData = JSON.parse(args);
      const { userId, companyId, nameDetail, orderId, docManagerName, docId, docPw, clientName, currentPageContent} = argsData;
      this.driver = driver;
      console.log("currentPageContent", currentPageContent);
      const pdf = await this.htmlConvertPDF(currentPageContent);
      console.log("pdf", pdf);

      // 현재 driver Url 저장
      const currentUrl = await this.driver.getCurrentUrl();
      console.log("currentUrl", currentUrl);

      // 창 크기 설정 및 로그인 페이지 접속
      await this.driver.manage().window().setRect({ width: 1900, height: 1080 });
      await this.driver.get("https://docu.gdoc.go.kr/cmm/main/logout.do");
      await this.driver.sleep(1000);
      
      // 로그인 처리
      await this.driver.findElement(By.xpath('//*[@id="mberLoginForm"]/div[1]/div[1]')).click();
      
      // 로그인 정보 입력
      await this.driver.findElement(By.id('id')).clear();
      await this.driver.findElement(By.id('password')).clear();
      await this.driver.findElement(By.id('id')).sendKeys(docId);
      await this.driver.findElement(By.id('password')).sendKeys(docPw);
      await this.driver.findElement(By.className('loginBtn')).click();
      await this.driver.sleep(500);
      
      // 로그인 알림창 처리
      try {
        const logintxt = await this.driver.findElement(By.xpath('/html/body/div[4]/div[2]/div/div/div/div/div/div/div/div[3]/div')).getText();
        console.log(logintxt);
        
        if (logintxt !== '') {
          if (logintxt.includes('다른 기기')) {
            await this.driver.findElement(By.xpath('//*[@id="jconfirm-buttons-bottom"]/button[2]')).click();
            await this.driver.sleep(500);
            await waitForLoading(this.driver);
          } else if (logintxt.includes('대표')) {
            await this.driver.findElement(By.xpath('//*[@id="jconfirm-buttons-bottom"]/button[2]')).click();
            await this.driver.sleep(500);
            await waitForLoading(this.driver);
          } else {
            event.sender.send('doc24StartResponse', { success: false, message: logintxt });
            return;
          }
        }
      } catch (error) {
        console.log('로그인 알림창 없음:', error);
      }
      
      // 문서 작성 페이지로 이동
      await this.driver.get("https://docu.gdoc.go.kr/doc/wte/docWriteForm.do");
      
      // 이름 처리
      let modifiedName = clientName.split('');
      modifiedName[1] = 'o';
      modifiedName = modifiedName.join('');
      console.log(modifiedName);
      
      // 체크박스 처리
      const chkbox = await this.driver.findElement(By.css('#docForm > div')).getAttribute('style');
      const lchk = chkbox.split(';');
      if (lchk[0].split(':')[0] === '') {
        console.log('chkboxoff');
        await this.driver.executeScript("document.getElementById('wteChk1').click()");
        await this.driver.executeScript("document.getElementById('wteChk2').click()");
        await this.driver.executeScript("document.getElementById('wteChk3').click()");
        await this.driver.executeScript("document.getElementById('wteChk4').click()");
        await this.driver.findElement(By.css('#jconfirm-buttons-bottom > button')).sendKeys(Key.ENTER);
      } else {
        console.log('chkboxon');
      }
      await this.driver.sleep(1000);
      
      // 화면 스크롤 조정
      await this.driver.executeScript("function getElementByXpath(path) {return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;} getElementByXpath('/html/body/div[2]/div').style.top = '0px';");
      await this.driver.executeScript("function getElementByXpath(path) {return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;} getElementByXpath('/html/body/div[2]/div').style.top = '-300px';");
      await this.driver.executeScript("function getElementByXpath(path) {return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;} getElementByXpath('/html/body/div[2]/div').style.top = '-800px';");
      
      // 수신처 검색
      await this.driver.findElement(By.xpath('//*[@id="ldapSearch"]')).click();
      await this.driver.sleep(1000);
      await this.driver.findElement(By.css('#searchOrgNm')).sendKeys(nameDetail);
      await this.driver.findElement(By.css('#Form > button')).click();
      await waitForLoading(this.driver);
      
      // 검색 결과 처리
      const docdata = await this.driver.findElement(By.css('#ldaps > tbody'));
      const rows = await docdata.findElements(By.tagName('tr'));
      console.log('검색된 행 수:', rows.length);
      
      let foundMatch = false;
      for (let x = 0; x < rows.length; x++) {
        const row = rows[x];
        const cells = await row.findElements(By.tagName('td'));
        
        if (cells.length > 0) {
          const cellText = await cells[0].getText();
          if (cellText.includes('검색된 내용이 없습니다')) {
            console.log('검색 결과 없음');
            event.sender.send('doc24StartResponse', { success: false, message: '검색된 기관이 없습니다.' });
            return;
          }
          
          if (cells.length > 2) {
            const orgName = await cells[2].getText();
            console.log('기관명:', orgName);
            
            if (nameDetail === orgName) {
              console.log('기관명 일치');
              await cells[0].click();
              await waitForLoading(this.driver);
              await this.driver.sleep(500);
              foundMatch = true;
              break;
            }
          }
        }
        
        if (x === rows.length - 1 && !foundMatch) {
          console.log('일치하는 기관 없음');
          event.sender.send('doc24StartResponse', { success: false, message: '일치하는 기관이 없습니다.' });
          return;
        }
      }
      
      // 문서 제목 입력
      await this.driver.findElement(By.css('#docTitle')).clear();
      await this.driver.findElement(By.css('#docTitle')).sendKeys('장기요양기관 입소 ·이용신청서 (' + modifiedName + ')');
      
      // 화면 스크롤 조정
      await this.driver.executeScript("function getElementByXpath(path) {return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;} getElementByXpath('/html/body/div[2]/div').style.top = '-1300px';");
      
      // 결재자 입력
      await this.driver.findElement(By.css('#apprNm')).clear();
      await this.driver.findElement(By.css('#apprNm')).sendKeys(docManagerName);
      
      // 파일 첨부 (htmlConvertPDF에서 생성한 PDF 파일 경로 사용)
      const filePath = pdf.filePath;
      await this.driver.findElement(By.id('files_1_c100')).sendKeys(filePath);
      await this.driver.sleep(1500);
      
      // 화면 스크롤 조정
      await this.driver.executeScript("function getElementByXpath(path) {return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;} getElementByXpath('/html/body/div[2]/div').style.top = '-1500px';");
      await this.driver.sleep(1000);
      
      // 문서 발송
      await this.driver.findElement(By.xpath('//*[@id="sendDoc"]')).click();
      await this.driver.sleep(500);
      await waitForLoading(this.driver);
      await this.driver.sleep(500);
      
      await this.driver.findElement(By.css('#jconfirm-buttons-bottom > button.btn.btnSkyBlue')).click();
      await this.driver.sleep(3000);
      // 확인 버튼 클릭
      await this.driver.findElement(By.css('#jconfirm-buttons-bottom > button.btn.btnBlue')).click();
      await this.driver.sleep(1000);
      await this.driver.findElement(By.css('#jconfirm-buttons-bottom > button.btn.btnSkyBlue')).click();
      await this.driver.sleep(3000);
      
      // 문서 발송 완료 파일 생성
      await this.createDoc24EndFile(userId,companyId, nameDetail, orderId);


      // 로그아웃
      await this.driver.get('https://docu.gdoc.go.kr/cmm/main/logout.do');
      await this.driver.sleep(500);

      // 로그인 페이지로 이동
      await this.driver.get(currentUrl);
      await this.driver.sleep(500);

      // 로그인 완료 대기
      await this.WaitForLoginComplete(this.driver, companyId);

      // 공지사항, 안내사항 창 끄기
      await this.CloseLogtermNotice(this.driver);

      // 메뉴 검색하여 목표 페이지로 이동
      await this.ClickContractRegister(this.driver);

      // 성공 응답 전송
      event.sender.send('doc24StartResponse', { success: true, message: '문서 발송이 완료되었습니다.' });
      
    } catch (error) {
      console.error('doc24 프로세스 중 오류 발생:', error);
      event.sender.send('doc24StartResponse', { success: false, message: 'doc24 프로세스 중 오류 발생' });
    }
  }
}
module.exports = Doc24Service;