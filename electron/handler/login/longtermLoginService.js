// electron/handler/login/longtermLoginService.js
const { Builder, By, until, Key } = require('selenium-webdriver');
const axios = require('axios');
const { getAuthToken } = require('../common/commonService');
const path = require('path');
const os = require('os');
const { app } = require('electron');
class LongtermLoginService {
  constructor(webdriverManager) {
    this.webdriverManager = webdriverManager;
    // this.driver = null;
    this.tokenPath = path.join(os.homedir(), 'Documents', 'hanq_token', 'auth_token.json');
  }

  async createSession(cookies_dict, companyId) {
      const token = getAuthToken(this.tokenPath);
      console.log('세션 생성 시작 - 토큰 및 쿠키 확인:', {
        token: token ? token : '없음',
        JSESSIONID: cookies_dict.JSESSIONID || '없음',
        ccsession: cookies_dict.ccsession || '없음',
        companyId
      });
      
      // 필수 쿠키 확인
      if (!cookies_dict.JSESSIONID || !cookies_dict.ccsession) {
        console.error('필수 쿠키가 없습니다:', cookies_dict);
        return { success: false, error: '필수 쿠키 누락' };
      }
      
      const response = await axios.post('http://3.37.206.255:3000/company/session', {
        jsessionid: cookies_dict.JSESSIONID,
        ccsession: cookies_dict.ccsession,
        companyId: companyId
      }, {
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : {}
      });
      console.log(response, "response");
      return response.data;
  }

  // 프로세스 종료 시 정리
  async cleanup() {
    try {
      console.log('LongtermLoginService 정리 완료');
    } catch (error) {
      console.error('LongtermLoginService 정리 중 오류:', error);
    }
    // process.exit(0) 제거 - 서비스가 전체 프로세스를 종료하면 안됨
  }

  // 전체 로그인 프로세스 실행 (간소화)
  async MainLoginProcess(driver, cnum, cname, certPassword, certType, companyId) {
    try {    
      console.log("1. 로그인 시작")
      // 1단계: 기관번호 입력 및 법인인증서 로그인
      await this.CNumLogin(driver, cnum);
      await driver.sleep(3000);
      console.log("2. 인증서 선택 시작")
      // 2단계: 인증서 선택
      await this.SelectCertificate(driver, cname, certType);
      
      console.log("3. 비밀번호 입력 시작")
      // 3단계: 비밀번호 입력
      await this.InputPw(driver, certPassword);
      
      console.log("4. 확인 버튼 클릭 시작")
      // 4단계: 확인 버튼 클릭
      await this.ClickConfirmButton(driver);
      
      // 확인 버튼 클릭 후 잠시 대기 (새 탭이 열릴 시간을 주기 위함)
      console.log("인증서 확인 후 잠시 대기...");
      await driver.sleep(3000);

      // 5단계: 로그인 완료 대기 및 지연 메시지 처리
      console.log("5. 로그인 완료 대기 시작");
      await this.WaitForLoginComplete(driver, companyId);

      // 6단계: 공지사항, 안내사항 창 끄기
      console.log("6. 공지사항/안내사항 창 닫기 시작");
      await this.CloseLogtermNotice(driver);

      // 7단계: 메뉴 검색하여 목표 페이지로 이동
      console.log("7. 메뉴 검색 및 페이지 이동 시작");
      await this.ClickContractRegister(driver);
      
      // 성공 메시지와 함께 결과 객체 반환
      return {
        message: "로그인 및 페이지 이동이 완료되었습니다.",
        fullyAutomated: true,
        passwordEntered: true
      };
    } catch (error) {
      console.error('LongtermLogin 로그인 프로세스 오류:', error.message);
      return {
        message: error.message || '로그인 프로세스 중 오류가 발생했습니다.',
        fullyAutomated: false,
        passwordEntered: false,
        error: true
      };
    }
  }

  // 0. Chrome 브라우저 열기 및 로그인 실행
  async LongtermLogin(driver, url, cnum, cname, certPassword, certType, companyId) {
    try {
      console.log('롱텀로그인시작');
      console.log(driver, "driver");
      
      // this.driver = driver;
      await driver.get(url);
      
      const title = await driver.getTitle();
      
      // 로그인 프로세스 실행
      const result = await this.MainLoginProcess(driver, cnum, cname, certPassword, certType, companyId);
      
      // 결과 처리 및 메시지 전송
      if (process.send) {
        if (result && result.error) {
          process.send({
            success: false,
            message: result.message || '로그인 프로세스 중 오류가 발생했습니다.',
            title: title
          });
        } else {
          process.send({
            success: true,
            message: result.message || '로그인이 완료되었습니다.',
            title: title,
            fullyAutomated: result.fullyAutomated || false,
            manualInput: result.manualInput || false,
            passwordEntered: result.passwordEntered || false
          });
        }
      }
      
    } catch (error) {
      console.error('❌ 전체 프로세스 오류:', error);
      
      if (process.send) {
        process.send({
          success: false,
          error: error.message || '알 수 없는 오류가 발생했습니다.'
        });
      }
      process.exit(1);
    }
  }

  // 1. 기관번호 입력 및 법인인증서 로그인 버튼 클릭
  async CNumLogin(driver, cnum) {
    try {
      // 페이지 로딩 대기
      await driver.wait(until.elementLocated(By.css('body')), 20000);
      
      // 기관번호 입력 필드가 상호작용 가능할 때까지 대기
      const institutionField = await driver.wait(
        until.elementLocated(By.css('#userNo')), 
        10000
      );
      
      // 필드가 상호작용 가능할 때까지 대기
      await driver.wait(until.elementIsVisible(institutionField), 5000);
      await driver.wait(until.elementIsEnabled(institutionField), 5000);
      
      await institutionField.clear();
      await institutionField.sendKeys(cnum);
      
      // 법인인증서 로그인 버튼 클릭
      const loginButton = await driver.wait(
        until.elementLocated(By.css('#btn_login_A2')), 
        10000
      );
      
      // 버튼이 클릭 가능할 때까지 대기
      await driver.wait(until.elementIsVisible(loginButton), 5000);
      await driver.wait(until.elementIsEnabled(loginButton), 5000);
      
      await loginButton.click();
      
      // 인증서 선택 창이 나타날 때까지 대기
      await driver.wait(
        until.elementLocated(By.css('#xwup_cert_table')),
        15000
      );
      
    } catch (error) {
      console.error('LongtermLogin 1단계 오류:', error.message);
      throw error;
    }
  }

  // 2. 인증서 목록에서 기관명과 일치하는 인증서 선택
  async SelectCertificate(driver, cname, certType) {
    try {
      // 인증서 테이블이 완전히 로드될 때까지 대기 (최대 30초)
      const certTable = await driver.wait(
        until.elementLocated(By.css('#xwup_cert_table')), 
        30000
      );
      
      // 테이블이 보이고 상호작용 가능할 때까지 대기
      await driver.wait(until.elementIsVisible(certTable), 10000);
      
      // 테이블 내용이 로드될 때까지 추가 대기 (최대 20초)
      let certRows = [];
      let retries = 0;
      const maxRetries = 5;
      
      while (retries < maxRetries) {
        try {
          await driver.sleep(2000);
          
          await driver.wait(
            async () => {
              certRows = await driver.findElements(By.css('#xwup_cert_table tbody tr'));
              return certRows.length > 0;
            },
            20000,
            '인증서 테이블 내용이 로드되지 않았습니다.'
          );
          
          if (certRows.length > 0) {
            break;
          }
          
          retries++;
        } catch (e) {
          retries++;
          
          if (retries >= maxRetries) {
            throw new Error(`인증서 테이블 로드 실패: ${e.message}`);
          }
        }
      }
      
      if (certRows.length === 0) {
        throw new Error('인증서 목록이 비어 있습니다.');
      }
      
      let foundCert = false;
      
      // 인증서 목록 순회 전에 잠시 대기하여 모든 데이터가 완전히 로드되도록 함
      await driver.sleep(2000);
      
      for (let i = 0; i < certRows.length; i++) {
        try {
          const row = certRows[i];
          const userCells = await row.findElements(By.css('td:nth-child(2) .xwup-tableview-cell'));
          const userTypeCells = await row.findElements(By.css('td:nth-child(1) > div:nth-child(2)'));
          if (userCells.length > 0) {
            const userName = await userCells[0].getText();
            const userType = await userTypeCells[0].getText();
            console.log(userName, userType, "userName, userType");
            if (userName && userName.includes(cname) && userType.includes(certType)) {
              // 행이 클릭 가능할 때까지 대기
              await driver.wait(until.elementIsVisible(row), 5000);
              await driver.wait(until.elementIsEnabled(row), 5000);
              
              await row.click();
              foundCert = true;
              
              // 비밀번호 입력 필드가 나타날 때까지 대기
              await driver.wait(
                until.elementLocated(By.css('#xwup_certselect_tek_input1')),
                15000
              );
              
              break;
            }
          }
        } catch (e) {
          console.log(`인증서 ${i+1} 처리 중 오류:`, e.message);
        }
      }
      
      if (!foundCert) {
        throw new Error(`기관명 "${cname}"과 일치하는 인증서를 찾을 수 없습니다.`);
      }
      
    } catch (error) {
      console.error('LongtermLogin 2단계 오류:', error.message);
      throw error;
    }
  }

  // 3. 비밀번호 직접 입력 시도 
  async InputPw(driver, certPassword) {
    try {
      // 비밀번호 필드가 나타날 때까지 대기
      const passwordField = await driver.wait(
        until.elementLocated(By.css('#xwup_certselect_tek_input1')), 
        15000
      );
      
      // 필드가 보이고 상호작용 가능할 때까지 대기
      await driver.wait(until.elementIsVisible(passwordField), 5000);
      
      // JavaScript로 직접 값 설정
      await driver.executeScript(`
        var passwordField = document.getElementById('xwup_certselect_tek_input1');
        if (passwordField) {
          // 읽기 전용 속성 제거
          passwordField.removeAttribute('readonly');
          passwordField.readOnly = false;
          
          // 값 직접 설정
          passwordField.value = '${certPassword}';
          
          // 이벤트 발생시켜 TransKey에 알림
          var inputEvent = new Event('input', { bubbles: true });
          var changeEvent = new Event('change', { bubbles: true });
          var keydownEvent = new KeyboardEvent('keydown', { bubbles: true });
          var keyupEvent = new KeyboardEvent('keyup', { bubbles: true });
          
          passwordField.dispatchEvent(keydownEvent);
          passwordField.dispatchEvent(inputEvent);
          passwordField.dispatchEvent(changeEvent);
          passwordField.dispatchEvent(keyupEvent);
          
          return passwordField.value;
        }
        return null;
      `);
      
      // 확인 버튼이 활성화될 때까지 대기
      await driver.wait(
        until.elementLocated(By.css('#xwup_OkButton')),
        10000
      );
      
      // 입력 확인
      const currentValue = await passwordField.getAttribute('value');
      
      if (currentValue && currentValue.length > 0) {
        return true;
      }
      
      return false;
      
    } catch (error) {
      console.error('LongtermLogin 3단계 오류:', error.message);
      return false;
    }
  }

  // 4. 확인 버튼 클릭
  async ClickConfirmButton(driver) {
    try {
      // 확인 버튼 찾기 및 클릭
      const confirmButton = await driver.wait(
        until.elementLocated(By.css('#xwup_OkButton')), 
        10000
      );
      
      // 버튼이 클릭 가능할 때까지 대기
      await driver.wait(until.elementIsVisible(confirmButton), 5000);
      await driver.wait(until.elementIsEnabled(confirmButton), 5000);
      
      await confirmButton.click();
      return true;
    } catch (error) {
      console.error('LongtermLogin 4단계 오류:', error.message);
      return false;
    }
  }

  // 5. 로그인 완료 대기 (요소를 반드시 찾을 때까지 무한정 기다림)
  async WaitForLoginComplete(driver, companyId) {
    try {
      console.log('로그인 완료 대기 중...');
      
      let attempt = 0;
      let userInfoFound = false;
      
      while (!userInfoFound) {
        attempt++;
        console.log(`사용자 정보 확인 시도 ${attempt}회...`);
        
        // 새 탭/창 확인 및 전환 (특정 URL이 포함된 탭으로만 이동)
        try {
          // 현재 핸들 저장
          const currentHandle = await driver.getWindowHandle();
          const handles = await driver.getAllWindowHandles();
          
          console.log(`현재 열린 탭/창 수: ${handles.length}`);
          
          if (handles.length > 1) {
            console.log('새 탭/창이 감지됨. 특정 URL 탭 찾기 시도...');
            
            let foundTargetTab = false;
            const targetUrl = 'https://www.longtermcare.or.kr/npbs/xui/manage.html';
            
            // 현재 탭의 URL 저장
            const currentUrl = await driver.getCurrentUrl();
            console.log(`현재 탭 URL: ${currentUrl}`);
            
            // 이미 타겟 URL이 포함된 경우
            if (currentUrl.includes(targetUrl)) {
              console.log('이미 목표 URL이 포함된 탭에 있습니다.');
              foundTargetTab = true;
            } else {
              // 다른 탭들을 확인
              for (const handle of handles) {
                if (handle !== currentHandle) { // 현재 탭이 아닌 경우만 확인
                  try {
                    await driver.switchTo().window(handle);
                    const tabUrl = await driver.getCurrentUrl();
                    console.log(`탭 URL 확인: ${tabUrl}`);
                    
                    if (tabUrl.includes(targetUrl)) {
                      console.log(`목표 URL(${targetUrl})이 포함된 탭 발견! 이 탭으로 전환 성공`);
                      foundTargetTab = true;
                      break;
                    }
                  } catch (tabError) {
                    console.log('탭 확인 중 오류:', tabError.message);
                  }
                }
              }
              
              if (!foundTargetTab) {
                // 목표 URL을 찾지 못했으면 원래 탭으로 돌아감
                console.log(`목표 URL(${targetUrl})이 포함된 탭을 찾지 못함. 원래 탭으로 돌아감`);
                await driver.switchTo().window(currentHandle);
              }
            }
          }
          
          // 이 시도에서는 더 이상 탭 전환을 시도하지 않음
          attempt = 0; // 카운터 초기화
        } catch (windowError) {
          console.log('탭/창 전환 오류:', windowError.message);
        }

        // 불필요한 탭 닫기
        try {
          console.log('불필요한 탭 닫기 시작...');
          
          // 모든 탭 핸들을 먼저 가져옴
          const allHandles = await driver.getAllWindowHandles();
          console.log(`총 ${allHandles.length}개의 탭이 있습니다.`);
          
          // 유지할 탭과 닫을 탭을 구분
          const tabsToKeep = [];
          const tabsToClose = [];
          
          // 각 탭 확인
          for (const handle of allHandles) {
            try {
              await driver.switchTo().window(handle);
              const currentUrl = await driver.getCurrentUrl();
              console.log(`탭 URL 확인: ${currentUrl}`);
              
              if (currentUrl.includes("manage.html") || currentUrl.includes("settings")) {
                tabsToKeep.push(handle);
                console.log('유지할 탭 발견:', currentUrl);
              } else {
                tabsToClose.push(handle);
                console.log('닫을 탭 발견:', currentUrl);
              }
            } catch (error) {
              console.log('탭 URL 확인 중 오류:', error.message);
            }
          }
          
          // 불필요한 탭 닫기
          for (const handle of tabsToClose) {
            try {
              await driver.switchTo().window(handle);
              console.log('불필요한 탭 닫기');
              await driver.close();
            } catch (error) {
              console.log('탭 닫기 실패:', error.message);
            }
          }
          
          // 남은 탭이 있으면 첫 번째 탭으로 전환
          const remainingHandles = await driver.getAllWindowHandles();
          if (remainingHandles.length > 0) {
            await driver.switchTo().window(remainingHandles[0]);
            console.log('첫 번째 탭으로 전환 완료');
          } else {
            console.log('남은 탭이 없습니다.');
          }
        } catch (tabCloseError) {
          console.log('탭 닫기 중 오류 발생:', tabCloseError.message);
        }

        // 팝업 닫기 및 메뉴 이동 시도
        try {
          console.log('팝업 닫기 시도...');
          
          // 팝업 오버레이 요소 찾기
          const popupdivs = await driver.findElements(By.className('nexamodaloverlay'));
          console.log(`${popupdivs.length}개의 팝업 발견`);
          
          // 팝업 닫기 (역순으로)
          for (let x = 1; x <= popupdivs.length; x++) {
            const closeButton = await popupdivs[popupdivs.length - x].findElement(By.className('closebutton'));
            console.log(`팝업 ${x} 닫기`);
            await closeButton.click();
          }
          
          // 잠시 대기
          await driver.sleep(100);
          
        } catch (error) {
          console.log('팝업 닫기 또는 메뉴 이동 중 오류:', error.message);
        }



        // 사용자 정보 요소 직접 찾기 (iframe 없이)
        try {
          console.log('기본 프레임에서 사용자 정보 요소 찾기 시도...');
          
          // 요소가 표시되는지 확인
          let isDisplayed = false;

          // 정확한 ID로 직접 요소 찾기, 숨겨져있으면 다시 시도
          let userInfoElement = null;
          while (!isDisplayed) {
            userInfoElement = await driver.wait(
              until.elementLocated(By.id('mainframe.VFrameSet.frameTop.form.sta_userInfo:text')),
              10000,
              '사용자 정보 요소(ID) 찾는 중...'
            );
            try {
              isDisplayed = await userInfoElement.isDisplayed();
              console.log(`요소 표시 상태: ${isDisplayed ? '표시됨' : '숨겨짐'}`);
              if (isDisplayed) {
                break;
              }
            } catch (e) {
              console.log('요소 표시 상태 확인 실패:', e.message);
            }
          }

          // getText() 메서드로 텍스트 가져오기
          const userInfoText = await userInfoElement.getText();
          
          console.log('사용자 정보 텍스트:', userInfoText);

          // 지연 메시지 확인
          if (userInfoText.includes('지연되고') || userInfoText.includes('F5(새로고침)')) {
            console.log('접속 지연 감지 - 새로고침 실행');
            await driver.navigate().refresh();
            await driver.sleep(3000);
          } else {
            // 지연 메시지가 아니면 로그인 성공
            console.log('로그인 완료 확인!');
            // 쿠키 정보 가져오기
            const all_cookies = await driver.manage().getCookies();
            const cookies_dict = {};
            for (const cookie of all_cookies) {
              cookies_dict[cookie.name] = cookie.value;
            }
            console.log("쿠키", cookies_dict);
            const sessionResult = await this.createSession(cookies_dict, companyId);
            if (sessionResult.success) {
              console.log('세션 생성 성공');
              userInfoFound = true;
              return true;
            } else {
              console.error('세션 생성 실패:', sessionResult.error);
              // 세션 생성 실패해도 로그인은 성공한 것으로 처리
              userInfoFound = true;
              return true;
            }
          }
        } catch (elementError) {
          console.log('사용자 정보 요소를 찾지 못함:', elementError.message);
        }
        
        // 이번 시도에서 요소를 찾지 못했으면 잠시 대기 후 다시 시도
        if (!userInfoFound) {
          console.log(`사용자 정보를 찾지 못함. 3초 대기 후 재시도...`);
          await driver.sleep(3000);
        }
      }
      
      // 여기까지 오면 요소를 찾은 것
      return true;
    } catch (error) {
      console.error('로그인 완료 대기 오류:', error.message);
      return false;
    }
  }

  // 6. 공지사항, 안내사항 창 끄기 (프레임 전환 추가)
  async CloseLogtermNotice(driver) {
    // 모든 nexamodaloverlay 요소 찾기
    const popupdiv = await driver.findElements(By.className('nexamodaloverlay'));
    console.log(`발견된 팝업: ${popupdiv.length}개`);
    
    // 역순으로 닫기 버튼 클릭 (가장 위에 있는 팝업부터 닫기)
    for (let x = 1; x <= popupdiv.length; x++) {
      try {
        const closeButton = await popupdiv[popupdiv.length - x].findElement(By.className('closebutton'));
        await closeButton.click();
        console.log(`${x}번째 팝업 닫기 성공`);
      } catch (e) {
        console.log(`${x}번째 팝업 닫기 실패:`, e.message);
      }
    }
    
    await driver.sleep(100); // 0.1초 대기
    console.log(`팝업/모달 처리 완료 (총 ${popupdiv.length}개 처리)`);
  }

  // 7. 메뉴 검색하여 목표 페이지로 이동 
  async ClickContractRegister(driver) {
    try {
      const menuBtn = await driver.wait(
        until.elementLocated(By.id('mainframe.VFrameSet.HFrameSet.frameLeft.form.btn_allMenu')),
        1000
      );

      await menuBtn.click();

      const menuSearchInput = await driver.wait(
        until.elementLocated(By.id('mainframe.VFrameSet.HFrameSet.frameLeft.form.div_searchMenu.form.edt_searchMenuText:input')),
        1000
      );

      await menuSearchInput.click();

      await menuSearchInput.clear();

      await driver.sleep(1000);
      
      // 천천히 타이핑하여 입력 확인 가능하게 함
      const searchText = 'npia201m01';
      await driver.executeScript("return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.frameLeft.form.div_searchMenu.form.edt_searchMenuText.value='" + searchText + "'");
      
      // 입력 완료 후 포커스 유지를 위해 다시 한번 클릭
      await menuSearchInput.click();
      
      // 입력 후 잠시 대기
      await driver.sleep(1000);
      
      const menuSearchBtn = await driver.wait(
        until.elementLocated(By.id('mainframe.VFrameSet.HFrameSet.frameLeft.form.div_searchMenu.form.btn_searchMenu')),
        10000
      );
      await menuSearchBtn.click();

    } catch (error) {
      console.error('메뉴 검색 오류:', error);
    }
  }
}

// 스크립트 실행부
// if (require.main === module) {
//   const args = process.argv.slice(2);
  
//   const url = 'https://www.longtermcare.or.kr/npbs/auth/login/loginForm.web?menuId=npe0000002160&rtnUrl=&zoomSize=';
  
//   const id = args[0] || 0;
//   const cname = args[1] || '';
//   const cnum = args[2] || '';
//   const certPassword = args[3] || '';
//   const driver = args[4] || null;
  
//   if (!cnum || !cname || !certPassword) {
//     console.error('필수 정보가 누락되었습니다.');
//     process.exit(1);
//   }
  
//   const loginService = new LongtermLoginService();
//   driver.get(url);
//   loginService.LongtermLogin(url, cnum, cname, certPassword, driver);
// }

module.exports = LongtermLoginService;