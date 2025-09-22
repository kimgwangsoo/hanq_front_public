const { By } = require('selenium-webdriver');
const fs = require('fs');

async function waitForLoading(driver) {
    console.log('로딩 대기 시작');
    return new Promise(async (resolve) => {
      try {
        // 먼저 열려있는 경고창이 있는지 확인하고 처리
        try {
          const alert = await driver.switchTo().alert();
          console.log('경고창 발견:', await alert.getText());
          await alert.accept();
          console.log('경고창 닫힘');
        } catch (alertError) {
          // 경고창이 없으면 무시
        }
        
        while (true) {
          try {
            const loadingElement = await driver.findElement(By.css('#mainframe\\.waitwindow\\:image'));
            const loadingStyle = await loadingElement.getAttribute('style');
            console.log(loadingStyle, "loadingStyle");
            const styleValues = loadingStyle.split(';');
            if (styleValues[0].split(':')[1].trim() === '-49px') {
              console.log('로딩 대기 완료');
              break;
            } else {
              console.log('로딩 대기 중');
              // 명시적으로 대기
              await new Promise(r => setTimeout(r, 500));
            }
          } catch (elementError) {
            // 요소를 찾을 수 없는 경우 경고창 확인
            try {
              const alert = await driver.switchTo().alert();
              console.log('로딩 중 경고창 발견:', await alert.getText());
              await alert.accept();
              console.log('경고창 닫힘');
            } catch (alertError) {
              // 경고창이 없으면 원래 오류 처리
              console.error('로딩 요소를 찾을 수 없음:', elementError);
              break;
            }
          }
        }
        resolve(); // 로딩 완료 후 Promise 해결
      } catch (error) {
        console.error('로딩 대기 중 오류 발생:', error);
        resolve(); // 오류 발생 시에도 진행
      }
    });
}

function menuMove(menuCode, driver) {
    console.log('메뉴 이동 시작');
    return new Promise(async (resolve) => {
      try {
        // 전체 메뉴 버튼 클릭
        driver.findElement(By.css('#mainframe\\.VFrameSet\\.HFrameSet\\.frameLeft\\.form\\.btn_allMenu')).click();
        console.log('전체 메뉴 버튼 클릭 완료');
      } catch (error) {
        console.log(error);
      }
      console.log('메뉴 검색창에 코드 입력 시작');
      
      // 메뉴 검색창에 코드 입력
      driver.executeScript(`return nexacro.getApplication().mainframe.VFrameSet.HFrameSet.frameLeft.form.div_searchMenu.form.edt_searchMenuText.value='${menuCode}'`);
      await new Promise(r => setTimeout(r, 500));

      // 검색 버튼 클릭 (두 번 실행)
      driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.frameLeft.form.div_searchMenu_btn_searchMenu_onclick()");
      await new Promise(r => setTimeout(r, 200));
      driver.executeScript("nexacro.getApplication().mainframe.VFrameSet.HFrameSet.frameLeft.form.div_searchMenu_btn_searchMenu_onclick()");
      console.log('검색 버튼 클릭 완료');
      // 스크롤 위치 조정
      try {
        driver.executeScript("function getElementByXpath(path) {return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;} getElementByXpath('/html/body/div[2]/div[1]/div/div[3]/div/div[3]/div/div[2]/div/div[1]/div[1]/div/div[1]/div/div[1]/div/div[3]/div').style.top = '0px';");
      } catch (error) {
        console.log(error);
      }
      console.log('스크롤 위치 조정 완료');
      resolve();
    });
}

// 토큰 가져오기
function getAuthToken(tokenPath) {
    try {
      if (fs.existsSync(tokenPath)) {
        const data = fs.readFileSync(tokenPath, 'utf8');
        const authData = JSON.parse(data);
        return authData.token;
      }
    } catch (error) {
      console.error('토큰 읽기 오류:', error);
    }
    return null;
}

function handleAlerts(driver) {
  return new Promise(async (resolve) => {
  try {
    const alert = await driver.switchTo().alert();
    console.log('경고창 발견:', await alert.getText());
    await alert.accept();
    console.log('경고창 닫힘');
  } catch (alertError) {
      console.log('경고창 없음');
    }
    console.log('경고창 처리 완료');
    resolve();
  });
}

module.exports = {
    waitForLoading,
    menuMove,
    getAuthToken,
    handleAlerts
}