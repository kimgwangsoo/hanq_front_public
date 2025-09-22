//const dayjs = require('dayjs');
import dayjs from "dayjs";

// 공통 함수: 대여 기간에 따른 금액 계산
export const calculateRentPrice = (product, rentStart, rentEnd, saleCalc, isPersonalCharge = false) => {
  // 대여 시작일과 종료일 설정
  const startDate = dayjs(rentStart);
  const endDate = dayjs(rentEnd);
  console.log(rentStart, rentEnd, "rentStart,rentEnd");
  console.log(product,"product")

  let totalRentPrice = 0;
  
  // 시작 월과 종료 월이 같은 경우
  if (startDate.month() === endDate.month() && startDate.year() === endDate.year()) {
    const daysInMonth = startDate.daysInMonth();
    const dailyPrice = parseInt(product.rentPrice) / daysInMonth;
    const diffDays = endDate.diff(startDate, 'day') + 1;
    totalRentPrice = dailyPrice * diffDays;
  } else {
    // 시작 월의 남은 일수 계산
    const startMonthDays = startDate.daysInMonth();
    const remainingDaysInStartMonth = startMonthDays - startDate.date() + 1;
    const startMonthDailyPrice = parseInt(product.rentPrice) / startMonthDays;
    totalRentPrice += startMonthDailyPrice * remainingDaysInStartMonth;
    
    // 중간 월들은 월 단위로 계산
    let currentDate = startDate.add(1, 'month').startOf('month');
    while (currentDate.month() !== endDate.month() || currentDate.year() !== endDate.year()) {
      totalRentPrice += parseInt(product.rentPrice);
      currentDate = currentDate.add(1, 'month');
    }
    
    // 종료 월의 일수 계산
    const endMonthDays = endDate.daysInMonth();
    const daysInEndMonth = endDate.date();
    const endMonthDailyPrice = parseInt(product.rentPrice) / endMonthDays;
    totalRentPrice += endMonthDailyPrice * daysInEndMonth;
  }
  console.log(totalRentPrice,"totalRentPrice")
  // 본인부담금 또는 총액 반환
  return Math.floor(isPersonalCharge ? totalRentPrice * saleCalc : totalRentPrice);
};

// 공통 함수: 도장 이미지 추가
export const addStampImage = (signBox, companyId, getStampUrl, right = '10px') => {
  if (signBox.length > 0) {
    const imgElement = document.createElement('img');
    imgElement.src = getStampUrl(companyId);
    imgElement.style.position = 'absolute';
    imgElement.style.width = '60px';
    imgElement.style.height = '60px';
    imgElement.style.right = right;
    imgElement.style.top = '10px';
    imgElement.style.transform = 'translateY(-50%)';
    imgElement.style.zIndex = '999';
    
    if (signBox[0] && signBox[0].parentNode) {
      signBox[0].parentNode.appendChild(imgElement);
    }
  }
};

// 공통 함수: 요소에 데이터 적용
export const applyDataToElements = (dataItems) => {
  dataItems.forEach(item => {
    for (let i = 0; i < item.elements.length; i++) {
      if (item.type === 'input') {
        item.elements[i].value = item.value;
      } else if (item.type === 'textarea') {
        item.elements[i].value = item.value;
      } else {
        item.elements[i].innerHTML = item.value;
      }
    }
  });
};

// 공통 함수: 테이블에서 기존 행 제거
export const clearTableRows = (tbody) => {
  if (!tbody || tbody.length === 0) return;
  
  // 기존 행 모두 제거
  const existingRows = tbody[0].querySelectorAll('.item_tr');
  existingRows.forEach(row => {
    tbody[0].removeChild(row);
  });
  
  // 기존 더미 행 모두 제거
  const existingDummyRows = tbody[0].querySelectorAll('.dummy');
  existingDummyRows.forEach(row => {
    tbody[0].removeChild(row);
  });
};

// 공통 함수: 더미 행 추가
export const addDummyRows = (tbody, targetRowCount, columnCount, insertBeforeElement = null) => {
  if (!tbody || tbody.length === 0) return;
  
  const currentRows = tbody[0].querySelectorAll('tr').length;
  const rowsToAdd = Math.max(0, targetRowCount - currentRows);
  
  for (let i = 0; i < rowsToAdd; i++) {
    const dummyTr = document.createElement('tr');
    dummyTr.className = 'dummy';
    dummyTr.style.height = '30px';
    
    for (let j = 0; j < columnCount; j++) {
      const dummyTd = document.createElement('td');
      dummyTd.className = 'center-middle';
      
      const dummyDiv = document.createElement('div');
      dummyTd.appendChild(dummyDiv);
      dummyTr.appendChild(dummyTd);
    }
    
    if (insertBeforeElement && insertBeforeElement[0] && insertBeforeElement[0].previousSibling) {
      insertBeforeElement[0].previousSibling.after(dummyTr);
    } else {
      tbody[0].appendChild(dummyTr);
    }
  }
};

// 공통 문서 설정 함수
export const setupDocument = (pageDiv, orderData, storeGetters, clientSignData, docType, getStampUrlFunc, tableConfig, dateOption, validTermDates) => {
  if (!pageDiv || !orderData) return;
  console.log(validTermDates,"validTermDates")
  const saleCalc = parseInt(orderData.sale) / 100;
  console.log(docType,"docType")
  switch(docType) {
    case 'doc1':
    case '/print/Doc1.ejs':
      doc1Set(pageDiv, orderData, storeGetters, clientSignData, getStampUrlFunc, saleCalc, tableConfig, dateOption, validTermDates);
      break;
    case 'doc2':
    case '/print/Doc2.ejs':
      doc2Set(pageDiv, orderData, storeGetters, clientSignData, getStampUrlFunc, saleCalc, tableConfig, dateOption, validTermDates);
      break;
    case 'doc3':
    case '/print/Doc3.ejs':
      doc3Set(pageDiv, orderData, storeGetters, clientSignData, tableConfig, dateOption);
      break;
    case 'doc4':
    case '/print/Doc4.ejs':
      doc4Set(pageDiv, orderData, storeGetters, clientSignData, getStampUrlFunc, saleCalc, tableConfig, dateOption, validTermDates);
      break;
    case 'doc5':
    case '/print/Doc5.ejs':
      doc5Set(pageDiv, orderData, storeGetters, clientSignData, getStampUrlFunc, saleCalc, tableConfig, dateOption, validTermDates);
      break;
    case 'zeroDoc1':
    case '/print/ZeroDoc1.ejs':
      zeroDoc1Set(pageDiv, orderData, storeGetters, clientSignData, getStampUrlFunc);
      break;
    case 'zeroDoc2':
    case '/print/ZeroDoc2.ejs':
      zeroDoc2Set(pageDiv, orderData, storeGetters, validTermDates);
      break;

    case 'addSalary':
    case '/print/AddSalary.ejs':
      addSalarySet(pageDiv, orderData, storeGetters, clientSignData, getStampUrlFunc);
      break;

    case 'receipt':
    case '/print/Receipt.ejs':
      receiptSet(pageDiv, orderData, storeGetters, clientSignData, getStampUrlFunc);
      break;
  }
};

// 대여 기간을 validTermDates 기준으로 분할하는 함수
const splitRentPeriods = (rentStart, rentEnd, validTermDates, durabilityEndDate) => {
  
  console.log(durabilityEndDate,"durabilityEndDate")
  if (!validTermDates || validTermDates.length === 0) {
    // rentBcodeInfo가 있고 endDate가 rentStart와 rentEnd 사이에 있는 경우 처리
    if (durabilityEndDate && durabilityEndDate && 
        new Date(durabilityEndDate) >= new Date(rentStart) && 
        new Date(durabilityEndDate) <= new Date(rentEnd)) {
      
      // endDate 다음 날짜 계산
      const nextDay = new Date(durabilityEndDate);
      nextDay.setDate(nextDay.getDate() + 1);
      const nextDayStr = nextDay.toISOString().slice(0, 10);
      
      return [
        { rentStart, rentEnd: durabilityEndDate },
        { rentStart: nextDayStr, rentEnd }
      ];
    }
    return [{ rentStart, rentEnd }];
  }
  
  const periods = [];
  let currentStart = rentStart;
  let remainingEnd = rentEnd;
  
  // validTermDates를 날짜 순으로 정렬
  const sortedTermDates = [...validTermDates].sort((a, b) => 
    new Date(a.rentStart) - new Date(b.rentStart)
  );
  
  // rentBcodeInfo 처리를 위한 변수
  let bcodeEndDateProcessed = false;
  
  for (const termDate of sortedTermDates) {
    // 현재 시작일이 이 기간의 종료일 이후라면 다음 기간으로
    if (new Date(currentStart) > new Date(termDate.rentEnd)) {
      continue;
    }
    
    // 남은 종료일이 이 기간의 시작일 이전이라면 종료
    if (new Date(remainingEnd) < new Date(termDate.rentStart)) {
      break;
    }
    
    // rentBcodeInfo 처리: 현재 구간에 endDate가 포함되는지 확인
    if (durabilityEndDate && durabilityEndDate && !bcodeEndDateProcessed &&
        new Date(durabilityEndDate) >= new Date(currentStart) && 
        new Date(durabilityEndDate) < new Date(termDate.rentStart)) {
      
      // endDate까지의 기간 추가
      periods.push({
        rentStart: currentStart,
        rentEnd: durabilityEndDate
      });
      
      // endDate 다음 날짜부터 시작
      const nextDay = new Date(durabilityEndDate);
      nextDay.setDate(nextDay.getDate() + 1);
      currentStart = nextDay.toISOString().slice(0, 10);
      bcodeEndDateProcessed = true;
      
      // 다음 날짜가 termDate 시작일 이후라면 이 termDate는 건너뛰기
      if (new Date(currentStart) > new Date(termDate.rentStart)) {
        continue;
      }
    }
    
    // 현재 시작일이 이 기간의 시작일 이전이라면 
    // 현재시작일~termDate 시작일 하루전 기간 추가
    if (new Date(currentStart) < new Date(termDate.rentStart)) {
      const dayBeforeTermStart = new Date(termDate.rentStart);
      dayBeforeTermStart.setDate(dayBeforeTermStart.getDate() - 1);
      const beforePeriodEnd = dayBeforeTermStart.toISOString().slice(0, 10);
      
      // rentBcodeInfo 처리: 이 구간에 endDate가 포함되는지 확인
      if (durabilityEndDate && durabilityEndDate && !bcodeEndDateProcessed &&
          new Date(durabilityEndDate) >= new Date(currentStart) && 
          new Date(durabilityEndDate) <= new Date(beforePeriodEnd)) {
        
        // endDate까지의 기간 추가
        periods.push({
          rentStart: currentStart,
          rentEnd: durabilityEndDate
        });
        
        // endDate 다음 날짜부터 시작
        const nextDay = new Date(durabilityEndDate);
        nextDay.setDate(nextDay.getDate() + 1);
        currentStart = nextDay.toISOString().slice(0, 10);
        bcodeEndDateProcessed = true;
        
        // 다음 날짜가 beforePeriodEnd 이전이면 나머지 기간 추가
        if (new Date(currentStart) <= new Date(beforePeriodEnd)) {
          periods.push({
            rentStart: currentStart,
            rentEnd: beforePeriodEnd
          });
        }
      } else {
        // 일반적인 경우 기간 추가
        periods.push({
          rentStart: currentStart,
          rentEnd: beforePeriodEnd
        });
      }
      
      currentStart = termDate.rentStart;
    }
    
    // 이 기간 내에서의 종료일 계산
    const periodEnd = new Date(remainingEnd) < new Date(termDate.rentEnd) 
      ? remainingEnd 
      : termDate.rentEnd;
    
    // rentBcodeInfo 처리: 이 구간에 endDate가 포함되는지 확인
    if (durabilityEndDate && durabilityEndDate && !bcodeEndDateProcessed &&
        new Date(durabilityEndDate) >= new Date(currentStart) && 
        new Date(durabilityEndDate) <= new Date(periodEnd)) {
      
      // endDate까지의 기간 추가
      periods.push({
        rentStart: currentStart,
        rentEnd: durabilityEndDate
      });
      
      // endDate 다음 날짜부터 시작
      const nextDay = new Date(durabilityEndDate);
      nextDay.setDate(nextDay.getDate() + 1);
      currentStart = nextDay.toISOString().slice(0, 10);
      bcodeEndDateProcessed = true;
      
      // 다음 날짜가 periodEnd 이전이면 나머지 기간 추가
      if (new Date(currentStart) <= new Date(periodEnd)) {
        periods.push({
          rentStart: currentStart,
          rentEnd: periodEnd
        });
      }
    } else {
      // 일반적인 경우 기간 추가
      periods.push({
        rentStart: currentStart,
        rentEnd: periodEnd
      });
    }
    
    // 다음 기간의 시작일 설정
    currentStart = new Date(termDate.rentEnd);
    currentStart.setDate(currentStart.getDate() + 1);
    currentStart = currentStart.toISOString().slice(0, 10);
    
    // 모든 기간을 처리했으면 종료
    if (new Date(currentStart) > new Date(remainingEnd)) {
      break;
    }
  }
  
  // 마지막 termDate 종료일 이후에도 기간이 남아있으면 추가
  if (new Date(currentStart) <= new Date(remainingEnd)) {
    // rentBcodeInfo 처리: 이 구간에 endDate가 포함되는지 확인
    if (durabilityEndDate && durabilityEndDate && !bcodeEndDateProcessed &&
        new Date(durabilityEndDate) >= new Date(currentStart) && 
        new Date(durabilityEndDate) <= new Date(remainingEnd)) {
      
      // endDate까지의 기간 추가
      periods.push({
        rentStart: currentStart,
        rentEnd: durabilityEndDate
      });
      
      // endDate 다음 날짜부터 시작
      const nextDay = new Date(durabilityEndDate);
      nextDay.setDate(nextDay.getDate() + 1);
      currentStart = nextDay.toISOString().slice(0, 10);
      
      // 다음 날짜가 remainingEnd 이전이면 나머지 기간 추가
      if (new Date(currentStart) <= new Date(remainingEnd)) {
        periods.push({
          rentStart: currentStart,
          rentEnd: remainingEnd
        });
      }
    } else {
      // 일반적인 경우 기간 추가
      periods.push({
        rentStart: currentStart,
        rentEnd: remainingEnd
      });
    }
  }
  console.log(periods,"periods")
  return periods;
};

// 원단위 절사
export const truncatePrice = (price, type) => {
  if (!price || isNaN(price)) return 0;
  
  const value = parseInt(price.toString().replace(/,/g, ''));
  
  // 본인부담금이면 내림(절사) 처리
  if (type === '본인부담금') {
    return Math.floor(value / 10) * 10;
  } 
  // 공단부담금이면 올림 처리
  else if (type === '공단부담금') {
    return Math.ceil(value / 10) * 10;
  }
  // 타입이 지정되지 않으면 원래 값 반환
  return value;
}

// 대여 총액 원단위 절사 함수
export const truncateRentPrice = (personalCharge, periodTotalRentPrice, periodPersonalCharge, isTruncate) => {
  if (isTruncate) {
    const truncatePersonalCharge = truncatePrice(personalCharge, '본인부담금');
    const truncatePeriodRentPrice = truncatePrice(periodTotalRentPrice - periodPersonalCharge, '공단부담금');
    return (parseInt(truncatePersonalCharge) + parseInt(truncatePeriodRentPrice));
  } else {
    return (parseInt(personalCharge) + parseInt(periodTotalRentPrice - periodPersonalCharge));
  }
};

// 장기요양급여제공기록지
export const doc1Set = (pageDiv, orderData, storeGetters, clientSignData, getStampUrlFunc, saleCalc, tableConfig, dateOption, validTermDates) => {
  // 해당 페이지에서만 요소 찾기
  const companyName = pageDiv.getElementsByClassName('companyName');
  const cnum = pageDiv.getElementsByClassName('cnum');
  const name = pageDiv.getElementsByClassName('name');
  const number = pageDiv.getElementsByClassName('number');
  const resident = pageDiv.getElementsByClassName('resident');
  const target = pageDiv.getElementsByClassName('target');
  const ranker = pageDiv.getElementsByClassName('ranker');
  const sale = pageDiv.getElementsByClassName('sale');
  const ceoName = pageDiv.getElementsByClassName('ceoName');
  const guardName = pageDiv.getElementsByClassName('guardName');
  const pdfday = pageDiv.getElementsByClassName('pdfday');
  const clientRelationInfo = pageDiv.getElementsByClassName('clientRelationInfo');
  const fileType = pageDiv.getElementsByClassName('file_type');
  // const dateOption = pageDiv.getElementsByClassName('dateOption');
  if (name.length > 0) {
    // 현재 페이지의 요소에만 데이터 적용
    applyDataToElements([
      { elements: companyName, value: storeGetters.companyName },
      { elements: cnum, value: storeGetters.cnum },
      { elements: ceoName, value: orderData.company.ceoName },
      { elements: name, value: orderData.client.name },
      { elements: number, value: orderData.client.number },
      { elements: resident, value: orderData.client.resident },
      { elements: target, value: orderData.target },
      { elements: ranker, value: orderData.ranker },
      { elements: sale, value: orderData.sale },
      { elements: guardName, value: orderData.clientRelationInfo.guardTarget === '본인' ? orderData.client.name : orderData.guardName },
      { elements: clientRelationInfo, value: orderData.clientRelationInfo.guardTarget },
      { elements: pdfday, value: dateOption === 'orderDate' ? orderData.orderDate : dateOption === 'today' ? new Date().toISOString().slice(0, 10) : dateOption === 'custom' ? tableConfig.printDate : '' },
      { elements: fileType, value: orderData.mergeCheck ? "구입/대여" : (orderData.orderProducts && orderData.orderProducts.length > 0 && (orderData.orderProducts[0].target === '대여' || (orderData.orderProducts[0].target == "구입 또는 대여" && orderData.orderProducts[0].rent)) ? "대여" : "구입") }
    ]);

    // 급여제공기록지 사업소 담당자 적용
    if (tableConfig.option1_1 == 0) {
      ceoName[0].textContent = orderData.company.ceoName;
    } else {
      ceoName[0].textContent = orderData.manager;
    }
    
    const tbody = pageDiv.querySelectorAll('.doc1_table tbody');
    if (tbody.length === 0) return;
    
    // 테이블 행 초기화
    clearTableRows(tbody);
    console.log(orderData,"orderData.orderProducts")
    // 주문 제품 데이터로 테이블 행 생성
    if (orderData.orderProducts && orderData.orderProducts.length > 0) {
      // 주문 제품 수만큼 행 생성
      
      orderData.orderProducts.forEach((product) => {
        // 대여 상품인 경우 기간 분할 처리
        if ((product.product.target === '대여' && validTermDates && validTermDates.length > 0) || (product.product.target == "구입 또는 대여" && product.rent)) {
          const rentPeriods = splitRentPeriods(
            product.rent?.rentStart, 
            product.rent?.rentEnd, 
            validTermDates,
            product.rent?.durabilityEndDate
          );

          
          
          // 각 분할된 기간에 대해 행 생성
          rentPeriods.forEach((period) => {
            // 내구연한 종료일이 있고, 대여 시작일이 내구연한 종료일보다 큰 경우 렌트 가격 반값 적용 (최초 한번만)
            if (product.rent?.durabilityEndDate && period.rentStart > product.rent.durabilityEndDate && !product.halfPriceApplied) {
              let halfPrice = Math.floor(parseInt(product.product.rentPrice) / 2);
              // 반값 적용 후 십원단위가 50원일 경우 100원으로 처리
              if (halfPrice % 100 === 50) {
                halfPrice = halfPrice + 50;
              }
              product.product.rentPrice = halfPrice;
              product.halfPriceApplied = true; // 반값 적용 표시
              console.log('내구연한 종료일 이후 대여로 렌트 가격 반값 적용:', product.product.rentPrice);
            }
            //대여 본인부담금
            const personalCharge = calculateRentPrice(product.product, period.rentStart, period.rentEnd, saleCalc, true);
            //대여 공단부담금
            const periodPersonalCharge = calculateRentPrice(product.product, period.rentStart, period.rentEnd, saleCalc, true);
            //대여 총액
            const periodTotalRentPrice = calculateRentPrice(product.product, period.rentStart, period.rentEnd, saleCalc, false);
            
            const tr = document.createElement('tr');
            tr.className = 'item_tr';
            
            // 8개의 셀 생성
            for (let i = 0; i < 8; i++) {
              const td = document.createElement('td');
              td.className = 'center-middle';
              
              const div = document.createElement('div');
              
              // 각 셀에 데이터 채우기
              switch(i) {
                case 0: // 품목명
                  div.textContent = product.pitem || '';
                  break;
                case 1: // 제품명
                  div.textContent = product.pname || '';
                  break;
                case 2: // 복지용구 표준코드
                  div.textContent = product.product.pcode || '';
                  break;
                case 3: { // 급여비용
                  div.textContent = product.product.rentPrice ? 
                    (product.halfPriceApplied ? 
                      parseInt(product.product.rentPrice).toLocaleString() + " (½)" : 
                      parseInt(product.product.rentPrice).toLocaleString()) : 
                    '';
                  break;
                }
                case 4: { // 판매일/대여기간
                  div.innerHTML = `${period.rentStart}~<br/>${period.rentEnd}`;
                  break;
                }
                case 5: { // 총액
                  console.log(personalCharge,"personalCharge")
                  div.textContent = parseInt(truncateRentPrice(personalCharge, periodTotalRentPrice, periodPersonalCharge, tableConfig.isTruncate)).toLocaleString();
                  // div.textContent = totalRentPrice.toLocaleString();
                  div.className = 'pdfstr_custum_dan';
                  break;
                }
                case 6: { // 본인부담금
                  if (tableConfig.isTruncate) {
                    div.textContent = truncatePrice(personalCharge, '본인부담금').toLocaleString();
                  } else {
                    div.textContent = personalCharge.toLocaleString();
                  }
                  // div.textContent = personalCharge.toLocaleString();
                  div.className = 'pdfstr_custum_buy';
                  div.dataset.cnt = 1;
                  break;
                }
                case 7: { // 공단부담액
                  if (tableConfig.isTruncate) {
                    div.textContent = truncatePrice(periodTotalRentPrice - periodPersonalCharge, '공단부담금').toLocaleString();
                  } else {
                    div.textContent = Math.floor(periodTotalRentPrice - periodPersonalCharge).toLocaleString();
                  }
                  // div.textContent = Math.floor(periodTotalRentPrice - periodPersonalCharge).toLocaleString();
                  div.className = 'pdfstr_custum_gong';
                  div.dataset.cnt = 1;
                  break;
                }
              }
              
              td.appendChild(div);
              tr.appendChild(td);
            }
            
            tbody[0].appendChild(tr);
          });
        } else {
          // 구입 상품이거나 validTermDates가 없는 경우 기존 로직 사용
          const tr = document.createElement('tr');
          tr.className = 'item_tr';
          
          // 8개의 셀 생성
          for (let i = 0; i < 8; i++) {
            const td = document.createElement('td');
            td.className = 'center-middle';
            
            const div = document.createElement('div');
            
            // 각 셀에 데이터 채우기
            switch(i) {
              case 0: // 품목명
                div.textContent = product.pitem || '';
                break;
              case 1: // 제품명
                div.textContent = product.pname || '';
                break;
              case 2: // 복지용구 표준코드
                div.textContent = product.product.pcode || '';
                break;
              case 3:  // 급여비용
                div.textContent = product.product.buyPrice ? parseInt(product.product.buyPrice).toLocaleString() : '';
                break;
              case 4:  // 판매일
                div.textContent = orderData.orderDate ? orderData.orderDate : '';
                break;
              case 5:  // 총액
                div.textContent = product.product.buyPrice ? parseInt(parseInt(product.product.buyPrice) * parseInt(product.cnt)).toLocaleString() : '';
                div.className = 'pdfstr_custum_dan';
                break;
              case 6: { // 본인부담금
                
                if (tableConfig.isTruncate) {
                  const price = parseInt(product.product.buyPrice) * parseInt(product.cnt) * (saleCalc);
                  div.textContent = product.product.buyPrice ? truncatePrice(price, '본인부담금').toLocaleString() : '';
                } else {
                  div.textContent = product.product.buyPrice ? Math.floor(parseInt(product.product.buyPrice) * parseInt(product.cnt) * (saleCalc)).toLocaleString() : '';
                }
              
                div.className = 'pdfstr_custum_buy';
                div.dataset.cnt = 1;
                break;
              }
              case 7: { // 공단부담액
                if (tableConfig.isTruncate) {
                  const price = parseInt(product.product.buyPrice) * parseInt(product.cnt) * (1 - saleCalc);
                  div.textContent = product.product.buyPrice ? truncatePrice(price, '공단부담금').toLocaleString() : '';
                } else {
                  div.textContent = product.product.buyPrice ? Math.floor(parseInt(product.product.buyPrice) * parseInt(product.cnt) * (1 - saleCalc)).toLocaleString() : '';
                }
                div.className = 'pdfstr_custum_gong';
                div.dataset.cnt = 1;
                break;
              }
            }
            
            td.appendChild(div);
            tr.appendChild(td);
          }
          
          tbody[0].appendChild(tr);
        }
      });
      
      // 더미 행 추가 (15개가 되도록)
      addDummyRows(tbody, 15, 8);
    }
    
    const signBox = pageDiv.getElementsByClassName('signBox');
    // 도장 이미지 추가
    addStampImage(signBox, storeGetters.companyId, getStampUrlFunc);
    
    // 서명 이미지 추가 (클라이언트 측에서 처리)
    if (clientSignData && clientSignData.sign) {
      const clientSignBox = pageDiv.getElementsByClassName('clientSignBox');
      if (clientSignBox.length > 0) {
        const img = document.createElement('img');
        img.src = clientSignData.sign;
        img.style.position = 'absolute';
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.right = '10px';
        img.style.top = '10px';
        img.style.transform = 'translateY(-50%)';
        img.style.zIndex = '999';
        
        clientSignBox[0].appendChild(img);
      }
    }
  }
};

// 복지용구 공급 계약서
export const doc2Set = (pageDiv, orderData, storeGetters, clientSignData, getStampUrlFunc, saleCalc, tableConfig, dateOption, validTermDates) => {
  // 해당 페이지에서만 요소 찾기
  const companyName = pageDiv.getElementsByClassName('companyName');
  const cnum = pageDiv.getElementsByClassName('cnum');
  const name = pageDiv.getElementsByClassName('name');
  const number = pageDiv.getElementsByClassName('number');
  const resident = pageDiv.getElementsByClassName('resident');
  const target = pageDiv.getElementsByClassName('target');
  const ranker = pageDiv.getElementsByClassName('ranker');
  const ceoName = pageDiv.getElementsByClassName('ceoName');
  const guardName = pageDiv.getElementsByClassName('guardName');
  const pdfday = pageDiv.getElementsByClassName('pdfday');
  const address = pageDiv.getElementsByClassName('address');
  const phone1 = pageDiv.getElementsByClassName('phone1');
  const phone2 = pageDiv.getElementsByClassName('phone2');
  // const dateOption = pageDiv.getElementsByClassName('dateOption');
  if (name.length > 0) {
    // 현재 페이지의 요소에만 데이터 적용
    applyDataToElements([
      { elements: companyName, value: storeGetters.companyName },
      { elements: cnum, value: storeGetters.cnum },
      { elements: ceoName, value: orderData.company.ceoName },
      { elements: name, value: orderData.client.name },
      { elements: number, value: orderData.client.number },
      { elements: resident, value: orderData.client.resident },
      { elements: target, value: orderData.target },
      { elements: ranker, value: orderData.ranker },
      { elements: guardName, value: orderData.clientRelationInfo.guardTarget === '본인' ? orderData.client.name : orderData.guardName },
      { elements: pdfday, value: dateOption === 'orderDate' ? orderData.orderDate : dateOption === 'today' ? new Date().toISOString().slice(0, 10) : dateOption === 'custom' ? tableConfig.printDate : '' },
      { elements: address, value: orderData.address + " " + orderData.addressDetail },
      { elements: phone1, value: orderData.phone1 || '' },
      { elements: phone2, value: orderData.phone2 || '' }
    ]);
    

    console.log(orderData.orderProducts,"tableConfig")
    

    const tbody = pageDiv.querySelectorAll('.doc2_table_buy tbody');
    const tbodyRent = pageDiv.querySelectorAll('.doc2_table_rent tbody');
    if (tbody.length === 0) return;
    
    // 테이블 행 초기화
    clearTableRows(tbody);
    clearTableRows(tbodyRent);
    
    if (orderData.orderProducts && orderData.orderProducts.length > 0) {
      const doc2_table_buy_tr_header = pageDiv.querySelectorAll('.doc2_table_buy_tr_header');
      const doc2_table_buy_tr_total = pageDiv.querySelectorAll('.doc2_table_buy_tr_total');
      const doc2_table_rent_tr_header = pageDiv.querySelectorAll('.doc2_table_rent_tr_header');
      const doc2_table_rent_tr_total = pageDiv.querySelectorAll('.doc2_table_rent_tr_total');
      let buyDanTotal = 0;
      let buyMyTotal = 0;
      let rentDanTotal = 0;
      let rentMyTotal = 0;
      
      // 주문 제품 수만큼 행 생성
      orderData.orderProducts.forEach((product) => {
        // 대여 상품인 경우 기간 분할 처리
        if ((product.product.target === '대여' && validTermDates && validTermDates.length > 0) || (product.product.target == "구입 또는 대여" && product.rent)) {
          const rentPeriods = splitRentPeriods(
            product.rent?.rentStart, 
            product.rent?.rentEnd, 
            validTermDates,
            product.rent?.durabilityEndDate
          );
          
          // 각 분할된 기간에 대해 행 생성
          rentPeriods.forEach((period) => {
            // 내구연한 종료일이 있고, 대여 시작일이 내구연한 종료일보다 큰 경우 렌트 가격 반값 적용 (최초 한번만)
            if (product.rent?.durabilityEndDate && period.rentStart > product.rent.durabilityEndDate && !product.halfPriceApplied) {
              let halfPrice = Math.floor(parseInt(product.product.rentPrice) / 2);
              // 반값 적용 후 십원단위가 50원일 경우 100원으로 처리
              if (halfPrice % 100 === 50) {
                halfPrice = halfPrice + 50;
              }
              product.product.rentPrice = halfPrice;
              product.halfPriceApplied = true; // 반값 적용 표시
              console.log('내구연한 종료일 이후 대여로 렌트 가격 반값 적용:', product.product.rentPrice);
            }
            //대여 본인부담금
            const personalCharge = calculateRentPrice(product.product, period.rentStart, period.rentEnd, saleCalc, true);
            //대여 공단부담금
            const periodPersonalCharge = calculateRentPrice(product.product, period.rentStart, period.rentEnd, saleCalc, true);
            //대여 총액
            const periodTotalRentPrice = calculateRentPrice(product.product, period.rentStart, period.rentEnd, saleCalc, false);
            
            const tr = document.createElement('tr');
            tr.className = 'item_tr';
            
            // 9개의 셀 생성
            for (let i = 0; i < 9; i++) {
              const td = document.createElement('td');
              td.className = 'center-middle';
              
              const div = document.createElement('div');
              
              // 각 셀에 데이터 채우기
              switch(i) {
                case 0: // 품목명
                  div.textContent = product.pitem || '';
                  break;
                case 1: // 제품명
                  div.textContent = product.pname || '';
                  break;
                case 2: // 복지용구 표준코드
                  div.textContent = product.product.pcode || '';
                  break;
                case 3: // 바코드
                  for (let j = 0; j < product.orderProductBcodes.length; j++) {
                    if (j > 0) {
                      const br = document.createElement('br');
                      div.appendChild(br);
                    }
                    const isLastItem = j === product.orderProductBcodes.length - 1;
                    const barcodeText = isLastItem ? product.orderProductBcodes[j].bcode : product.orderProductBcodes[j].bcode + ",";
                    div.appendChild(document.createTextNode(barcodeText || ''));
                  }
                  break;
                case 4: // 대여시작일
                  div.innerHTML = `${period.rentStart}`;
                  break;
                case 5: // ~
                  div.textContent = '~';
                  break;
                case 6: // 대여종료일
                  div.textContent = `${period.rentEnd}`;
                  break;
                case 7:{ // 단가
                  const totalRentPrice = truncateRentPrice(personalCharge, periodTotalRentPrice, periodPersonalCharge, tableConfig.isTruncate);
                  div.textContent = totalRentPrice.toLocaleString();
                  rentDanTotal += parseInt(totalRentPrice);
                  div.className = 'pdfstr_custum_buy';
                  div.dataset.cnt = 1;
                  break;
                }
                case 8:{ // 본인부담금
                  if (tableConfig.isTruncate) {
                    div.textContent = truncatePrice(personalCharge, '본인부담금').toLocaleString();
                    rentMyTotal += parseInt(truncatePrice(personalCharge, '본인부담금'));
                  } else {
                    div.textContent = personalCharge.toLocaleString();
                    rentMyTotal += parseInt(personalCharge);
                  }
                  break;
                }
              }
              
              td.appendChild(div);
              tr.appendChild(td);
            }
            
            // 테이블에 행 추가
            if (doc2_table_rent_tr_header[0]) {
              doc2_table_rent_tr_header[0].after(tr);
            }
          });
        } else {
          const tr = document.createElement('tr');
          tr.className = 'item_tr';
          
          // 9개의 셀 생성
          for (let i = 0; i < 9; i++) {
            const td = document.createElement('td');
            td.className = 'center-middle';
            
            const div = document.createElement('div');
            
            // 각 셀에 데이터 채우기
            switch(i) {
              case 0: // 품목명
                div.textContent = product.pitem || '';
                break;
              case 1: // 제품명
                div.textContent = product.pname || '';
                break;
              case 2: // 복지용구 표준코드
                div.textContent = product.product.pcode || '';
                break;
              case 3: // 바코드
                for (let j = 0; j < product.orderProductBcodes.length; j++) {
                  if (j > 0) {
                    const br = document.createElement('br');
                    div.appendChild(br);
                  }
                  const isLastItem = j === product.orderProductBcodes.length - 1;
                  const barcodeText = isLastItem ? product.orderProductBcodes[j].bcode : product.orderProductBcodes[j].bcode + ",";
                  div.appendChild(document.createTextNode(barcodeText || ''));
                }
                break;
              case 4: // 구입 일때는 단가, 대여 일때는 대여시작일
                div.textContent = product.product.buyPrice ? parseInt(product.product.buyPrice).toLocaleString() : '';
                break;
              case 5: // 구입 일때는 수량, 대여 일때는 ~
                  div.textContent = product.cnt || '0';
                
                break;
              case 6: // 구입 일때는 적용금액, 대여 일때는 대여종료일
                  div.textContent = product.product.buyPrice ? parseInt(parseInt(product.product.buyPrice) * parseInt(product.cnt)).toLocaleString() : '';
                  buyDanTotal += parseInt(product.product.buyPrice) * parseInt(product.cnt);
                
                div.className = 'pdfstr_custum_dan';
                break;
                case 7: // 구입일때는 본인부담금 대여일때는 단가
                  if (tableConfig.isTruncate) {
                    const price = parseInt(product.product.buyPrice) * parseInt(product.cnt) * (saleCalc);
                    div.textContent = product.product.buyPrice ? truncatePrice(price, '본인부담금').toLocaleString() : '';
                    buyMyTotal += parseInt(truncatePrice(price, '본인부담금'));
                  } else {
                    div.textContent = product.product.buyPrice ? Math.floor(parseInt(product.product.buyPrice) * parseInt(product.cnt) * (saleCalc)).toLocaleString() : '';
                    buyMyTotal += parseInt(product.product.buyPrice) * parseInt(product.cnt) * (saleCalc);
                  }
                  
                div.className = 'pdfstr_custum_buy';
                div.dataset.cnt = 1;
                break;
              case 8: // 구입일때는 판매계약일 대여일때는 본인부담금

                  div.textContent = orderData.orderDate ? orderData.orderDate : '0000-00-00';
                
                break;
            }
            
            td.appendChild(div);
            tr.appendChild(td);
          }
          
          // 테이블에 행 추가
          if (product.product.target === '대여' || (product.product.target == "구입 또는 대여" && product.rent)) {
            if (doc2_table_rent_tr_header[0]) {
              doc2_table_rent_tr_header[0].after(tr);
            }
          } else {
            if (doc2_table_buy_tr_header[0]) {
              doc2_table_buy_tr_header[0].after(tr);
            }
          }
        }
      });
      
      // 합계 업데이트
      if (doc2_table_buy_tr_total[0]) {
        doc2_table_buy_tr_total[0].querySelector('.BuydanTotal').textContent = buyDanTotal.toLocaleString();
        doc2_table_buy_tr_total[0].querySelector('.BuyMyTotal').textContent = buyMyTotal.toLocaleString();
      }
      
      if (doc2_table_rent_tr_total[0]) {
        doc2_table_rent_tr_total[0].querySelector('.RentdanTotal').textContent = rentDanTotal.toLocaleString();
        doc2_table_rent_tr_total[0].querySelector('.RentMyTotal').textContent = rentMyTotal.toLocaleString();
      }
      
      // 더미 행 추가 (5개가 되도록)
      if (doc2_table_buy_tr_total[0] && doc2_table_buy_tr_total[0].previousSibling) {
        addDummyRows(tbody, 5, 9, doc2_table_buy_tr_total);
      }
      if (doc2_table_rent_tr_total[0] && doc2_table_rent_tr_total[0].previousSibling) {
        addDummyRows(tbodyRent, 5, 9, doc2_table_rent_tr_total);
      }
    }

    // 공급계약서 기타 협약사항 적용
    if (tableConfig.option2_1) {
      console.log(tableConfig.option2_1,"tableConfig.option2_1")
      const buyrentTxt = pageDiv.querySelectorAll('.buyrent_txtarea');
      const buyrentChkbox = pageDiv.querySelectorAll('.buyrent_txt_chkbox');
      const buyrentTxtArea = pageDiv.querySelectorAll('.buyrent_txt_area');
      if (buyrentChkbox && buyrentTxtArea) {
        buyrentChkbox.forEach(item => {
          item.checked = true;
        });
        buyrentTxtArea.forEach(item => {
          item.style.display = 'table-row';
        });
      }
      
      buyrentTxt.forEach(item => {
        console.log('완료')
        item.textContent = tableConfig.option2_1;
      });
      
      // 텍스트 영역의 높이를 내용에 맞게 자동 조정
      buyrentTxt.forEach(item => {
        // DOM이 완전히 렌더링된 후에 높이를 조정하기 위해 setTimeout 사용
        
        // item.style.height = 'auto';
        item.style.height = tableConfig.option2_1_height/3 + 'px';
        console.log(item.style.height, "item.style.height");
        console.log(item.scrollHeight, "item.scrollHeight");
        console.log("텍스트 영역 높이 조정 완료");
    
      });
      
      
    }
    
    const signBox = pageDiv.getElementsByClassName('signBox');
    // 도장 이미지 추가
    addStampImage(signBox, storeGetters.companyId, getStampUrlFunc, '100px');
    
    // 서명 이미지 추가
    if (clientSignData && clientSignData.sign) {
      const clientSignBox = pageDiv.getElementsByClassName('clientSignBox');
      if (clientSignBox.length > 0) {
        const img = document.createElement('img');
        img.src = clientSignData.sign;
        img.style.position = 'absolute';
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.right = '10px';
        img.style.top = '10px';
        img.style.transform = 'translateY(-50%)';
        img.style.zIndex = '999';
        
        clientSignBox[0].appendChild(img);
      }
    }
  }
};

// 개인정보 수집 및 활용 동의서
export const doc3Set = (pageDiv, orderData, storeGetters, clientSignData, tableConfig, dateOption) => {
  // 해당 페이지에서만 요소 찾기
  const companyName = pageDiv.getElementsByClassName('companyName');
  const ceoName = pageDiv.getElementsByClassName('ceoName');
  const phone = pageDiv.getElementsByClassName('phone');
  const fax = pageDiv.getElementsByClassName('fax');
  const address = pageDiv.getElementsByClassName('address');
  const name = pageDiv.getElementsByClassName('name');
  const number = pageDiv.getElementsByClassName('number');
  const resident = pageDiv.getElementsByClassName('resident');
  const guardName = pageDiv.getElementsByClassName('guardName');
  const clientRelationInfo = pageDiv.getElementsByClassName('clientRelationInfo');
  const pdfday = pageDiv.getElementsByClassName('pdfday');
  const bcnt = pageDiv.getElementsByClassName('bcnt');
  const rcnt = pageDiv.getElementsByClassName('rcnt');
  // const dateOption = pageDiv.getElementsByClassName('dateOption');
  // 해당 페이지에 맞는 주문 데이터 가져오기
  if (!orderData) return; // 해당 인덱스의 주문 데이터가 없으면 처리 안함
  
  let buyCnt = 0;
  let rentCnt = 0;
  orderData.orderProducts.forEach((product) => {
    if (product.product.target === '대여' || (product.product.target == "구입 또는 대여" && product.rent)) {
      rentCnt++;
    } else {
      buyCnt++;
    }
  });
  
  if (name.length > 0) {
    applyDataToElements([
      { elements: companyName, value: storeGetters.companyName },
      { elements: ceoName, value: orderData.company.ceoName },
      { elements: phone, value: orderData.company.phone },
      { elements: fax, value: orderData.company.fax },
      { elements: address, value: orderData.company.address + " " + orderData.company.addressDetail },
      { elements: name, value: orderData.client.name },
      { elements: number, value: orderData.client.number },
      { elements: resident, value: orderData.client.resident },
      { elements: guardName, value: orderData.clientRelationInfo.guardTarget === '본인' ? orderData.client.name : orderData.guardName },
      { elements: clientRelationInfo, value: orderData.clientRelationInfo.guardTarget },
      { elements: pdfday, value: dateOption === 'orderDate' ? orderData.orderDate : dateOption === 'today' ? new Date().toISOString().slice(0, 10) : dateOption === 'custom' ? tableConfig.printDate : '' },
      { elements: bcnt, value: buyCnt },
      { elements: rcnt, value: rentCnt }
    ]);
    
    // 서명 이미지 추가
    if (clientSignData && clientSignData.sign) {
      const clientSignBox = pageDiv.getElementsByClassName('clientSignBox');
      if (clientSignBox.length > 0) {
        const img = document.createElement('img');
        img.src = clientSignData.sign;
        img.style.position = 'absolute';
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.right = '10px';
        img.style.top = '10px';
        img.style.transform = 'translateY(-50%)';
        img.style.zIndex = '999';
        
        clientSignBox[0].appendChild(img);
      }
    }
  }
};

// 제품설치대장
export const doc4Set = (pageDiv, orderData, storeGetters, clientSignData, getStampUrlFunc, saleCalc, tableConfig, dateOption, validTermDates) => {
  // 해당 페이지에서만 요소 찾기
  const name = pageDiv.getElementsByClassName('name');
  const number = pageDiv.getElementsByClassName('number');
  const target = pageDiv.getElementsByClassName('target');
  const ceoName = pageDiv.getElementsByClassName('ceoName');
  const installDate = pageDiv.getElementsByClassName('installDate');
  const address = pageDiv.getElementsByClassName('address');
  const phone1 = pageDiv.getElementsByClassName('phone1');
  const pdfday = pageDiv.getElementsByClassName('pdfday');
  const guardName = pageDiv.getElementsByClassName('guardName');
  const relation = pageDiv.getElementsByClassName('relation');
  // const dateOption = pageDiv.getElementsByClassName('dateOption');
  if (!orderData) return; // 해당 인덱스의 주문 데이터가 없으면 처리 안함
  
  if (name.length > 0) {
    applyDataToElements([
      { elements: name, value: orderData.client.name },
      { elements: number, value: orderData.client.number },
      { elements: target, value: orderData.target + ' ' + orderData.sale + ' ' + orderData.ranker },
      { elements: ceoName, value: orderData.company.ceoName },
      { elements: installDate, value: dateOption === 'orderDate' ? orderData.orderDate : dateOption === 'today' ? new Date().toISOString().slice(0, 10) : dateOption === 'custom' ? tableConfig.printDate : '' },
      { elements: pdfday, value: dateOption === 'orderDate' ? orderData.orderDate : dateOption === 'today' ? new Date().toISOString().slice(0, 10) : dateOption === 'custom' ? tableConfig.printDate : '' },
      { elements: address, value: orderData.company.address + " " + orderData.company.addressDetail },
      { elements: phone1, value: orderData.phone1 },
      { elements: guardName, value: orderData.clientRelationInfo.guardTarget === '본인' ? orderData.client.name : orderData.guardName },
      { elements: relation, value: orderData.clientRelationInfo.guardTarget }
    ]);
    
    const tbody = pageDiv.querySelectorAll('.doc4_table tbody');
    if (tbody.length === 0) return;
    
    // 테이블 행 초기화
    clearTableRows(tbody);
    
    const targetTxt = pageDiv.getElementsByClassName('targetTxt');
    // 주문 제품 데이터로 테이블 행 생성
    orderData.orderProducts.forEach((product) => {
      if (product.product.target === '대여' || (product.product.target == "구입 또는 대여" && product.rent)) {
        targetTxt[0].innerHTML = '대여기간';
      } else {
        targetTxt[0].innerHTML = '판매일자';
        targetTxt[0].colSpan = 1;
      }
      
      // 대여 상품인 경우 기간 분할 처리
      if ((product.product.target === '대여' && validTermDates && validTermDates.length > 0) || (product.product.target == "구입 또는 대여" && product.rent)) {
        const rentPeriods = splitRentPeriods(
          product.rent?.rentStart, 
          product.rent?.rentEnd, 
          validTermDates,
          product.rent?.durabilityEndDate
        );
        
        // 각 분할된 기간에 대해 행 생성
        rentPeriods.forEach((period) => {
          // 내구연한 종료일이 있고, 대여 시작일이 내구연한 종료일보다 큰 경우 렌트 가격 반값 적용 (최초 한번만)
          if (product.rent?.durabilityEndDate && period.rentStart > product.rent.durabilityEndDate && !product.halfPriceApplied) {
            let halfPrice = Math.floor(parseInt(product.product.rentPrice) / 2);
            // 반값 적용 후 십원단위가 50원일 경우 100원으로 처리
            if (halfPrice % 100 === 50) {
              halfPrice = halfPrice + 50;
            }
            product.product.rentPrice = halfPrice;
            product.halfPriceApplied = true; // 반값 적용 표시
            console.log('내구연한 종료일 이후 대여로 렌트 가격 반값 적용:', product.product.rentPrice);
          }
          //대여 본인부담금
          const personalCharge = calculateRentPrice(product.product, period.rentStart, period.rentEnd, saleCalc, true);
          //대여 공단부담금
          const periodPersonalCharge = calculateRentPrice(product.product, period.rentStart, period.rentEnd, saleCalc, true);
          //대여 총액
          const periodTotalRentPrice = calculateRentPrice(product.product, period.rentStart, period.rentEnd, saleCalc, false);
          
          const tr = document.createElement('tr');
          tr.className = 'item_tr';
          
          // 9개의 셀 생성
          for (let i = 0; i < 9; i++) {
            const td = document.createElement('td');
            td.className = 'center-middle';
            const div = document.createElement('div');
            let totalRentPrice;
            
            switch(i) {
              case 0: // 급여방식
                div.textContent = '대여';
                break;
              case 1: // 품목
                div.textContent = product.pitem || '';
                break;
              case 2: // 제품명
                div.textContent = product.pname || '';
                break;
              case 3: // 제품코드
                div.textContent = product.product.pcode || '';
                break;
              case 4: // 대여시작일 ~ 대여종료일
                div.innerHTML = period.rentStart + '~<br>' + period.rentEnd;
                break;
              case 5: // 공급가액
                totalRentPrice = truncateRentPrice(personalCharge, periodTotalRentPrice, periodPersonalCharge, tableConfig.isTruncate);
                div.textContent = totalRentPrice.toLocaleString();
                div.className = 'pdfstr_custum_dan';
                break;
              case 6: // 본인부담금
                if (tableConfig.isTruncate) {
                  div.textContent = truncatePrice(personalCharge, '본인부담금').toLocaleString();
                } else {
                  div.textContent = personalCharge.toLocaleString();
                }
                div.className = 'pdfstr_custum_buy';
                break;
              case 7: // 비고
                div.textContent = '';
                break;
            }
            td.appendChild(div);
            tr.appendChild(td);
          }
          tbody[0].appendChild(tr);
        });
      } else {
        const tr = document.createElement('tr');
        tr.className = 'item_tr';
        
        if (product.product.target === '대여' || (product.product.target == "구입 또는 대여" && product.rent)) {
          // 대여인 경우 9개 셀 생성
          for (let i = 0; i < 9; i++) {
            const td = document.createElement('td');
            td.className = 'center-middle';
            const div = document.createElement('div');
            let totalRentPrice;
            let personalCharge;
            switch(i) {
              case 0: // 급여방식
                div.textContent = '대여';
                break;
              case 1: // 품목
                div.textContent = product.pitem || '';
                break;
              case 2: // 제품명
                div.textContent = product.pname || '';
                break;
              case 3: // 제품코드
                div.textContent = product.product.pcode || '';
                break;
              case 4: // 대여시작일
                div.textContent = orderData.rent.rentStart;
                break;
              case 5: // 대여종료일
                div.textContent = orderData.rent.rentEnd;
                break;
              case 6: // 공급가액
                totalRentPrice = calculateRentPrice(product.product, orderData.rent.rentStart, orderData.rent.rentEnd, saleCalc, false);
                div.textContent = totalRentPrice.toLocaleString();
                div.className = 'pdfstr_custum_dan';
                break;
              case 7: // 본인부담금
                personalCharge = calculateRentPrice(product.product, orderData.rent.rentStart, orderData.rent.rentEnd, saleCalc, true);
                div.textContent = personalCharge.toLocaleString();
                div.className = 'pdfstr_custum_buy';
                break;
              case 8: // 비고
                div.textContent = '';
                break;
            }
            td.appendChild(div);
            tr.appendChild(td);
          }
        } else {
          // 구입인 경우 7개 셀 생성
          for (let i = 0; i < 8; i++) {
            const td = document.createElement('td');
            td.className = 'center-middle';
            const div = document.createElement('div');
            switch(i) {
              case 0: // 급여방식
                div.textContent = '구입';
                break;
              case 1: // 품목
                div.textContent = product.pitem || '';
                break;
              case 2: // 제품명
                div.textContent = product.pname || '';
                break;
              case 3: // 제품코드
                div.textContent = product.product.pcode || '';
                break;
              case 4: // 판매일자 (대여시작일과 종료일을 합친 셀)
                // td.colSpan = 2; // 두 열을 합침
                div.textContent = orderData.orderDate ? orderData.orderDate : '';
                break;
              case 6: // 공급가액
                div.textContent = product.product.buyPrice ? parseInt(parseInt(product.product.buyPrice) * parseInt(product.cnt)).toLocaleString() : '';
                div.className = 'pdfstr_custum_dan';
                break;
              case 7: // 본인부담금
                if (tableConfig.isTruncate) {
                  const price = parseInt(product.product.buyPrice) * parseInt(product.cnt) * (saleCalc);
                  div.textContent = product.product.buyPrice ? truncatePrice(price, '본인부담금').toLocaleString() : '';
                } else {
                  div.textContent = product.product.buyPrice ? (parseInt(product.product.buyPrice) * parseInt(product.cnt) * (saleCalc)).toLocaleString() : '';
                }
                div.className = 'pdfstr_custum_buy';
                break;
            }
            td.appendChild(div);
            tr.appendChild(td);
            
            // 판매일자 셀을 합쳤으므로 다음 인덱스 건너뛰기
            if (i === 4) i++;
          }
          
          // 비고 셀 추가
          const td = document.createElement('td');
          td.className = 'center-middle';
          const div = document.createElement('div');
          div.textContent = '';
          td.appendChild(div);
          tr.appendChild(td);
        }
        
        tbody[0].appendChild(tr);
      }
    });
    
    // 더미 행 추가 (15개가 되도록)
    // 대여인 경우 9개 셀, 판매인 경우 8개 셀 추가
    const cellCount = orderData.orderProducts[0]?.product?.target === '대여' ? 9 : 8;
    addDummyRows(tbody, 15, cellCount);
    
    const signBox = pageDiv.getElementsByClassName('signBox');
    // 도장 이미지 추가
    addStampImage(signBox, storeGetters.companyId, getStampUrlFunc);
    
    // 서명 이미지 추가
    if (clientSignData && clientSignData.sign) {
      const clientSignBox = pageDiv.getElementsByClassName('clientSignBox');
      if (clientSignBox.length > 0) {
        const img = document.createElement('img');
        img.src = clientSignData.sign;
        img.style.position = 'absolute';
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.right = '10px';
        img.style.top = '10px';
        img.style.transform = 'translateY(-50%)';
        img.style.zIndex = '999';
        
        clientSignBox[0].appendChild(img);
      }
    }
  }
};

// 장기요양급여비용 명세서
export const doc5Set = (pageDiv, orderData, storeGetters, clientSignData, getStampUrlFunc, saleCalc, tableConfig, dateOption, validTermDates) => {
  // 해당 페이지에서만 요소 찾기
  const companyName = pageDiv.getElementsByClassName('companyName');
  const cnum = pageDiv.getElementsByClassName('cnum');
  const name = pageDiv.getElementsByClassName('name');
  const number = pageDiv.getElementsByClassName('number');
  const ceoName = pageDiv.getElementsByClassName('ceoName');
  const bnum = pageDiv.getElementsByClassName('bnum');
  const pdfday = pageDiv.getElementsByClassName('pdfday');
  const address = pageDiv.getElementsByClassName('address');
  const myTotal = pageDiv.getElementsByClassName('myTotal');
  const danTotal = pageDiv.getElementsByClassName('danTotal');
  const gongTotal = pageDiv.getElementsByClassName('gongTotal');
  const sdate = pageDiv.getElementsByClassName('sdate');
  // const dateOption = pageDiv.getElementsByClassName('dateOption');
  if (!orderData) return; // 해당 인덱스의 주문 데이터가 없으면 처리 안함
  let buyMyTotal = 0;
  let buyDanTotal = 0;
  let buyGongTotal = 0;
  orderData.orderProducts.forEach((product) => {
    if (product.product.target === '대여'|| (product.product.target == "구입 또는 대여" && product.rent)) {
      const rentPeriods = splitRentPeriods(
        product.rent?.rentStart, 
        product.rent?.rentEnd, 
        validTermDates,
        product.rent?.durabilityEndDate
      );
      rentPeriods.forEach((period) => {
        // 내구연한 종료일이 있고, 대여 시작일이 내구연한 종료일보다 큰 경우 렌트 가격 반값 적용 (최초 한번만)
        if (product.rent?.durabilityEndDate && period.rentStart > product.rent.durabilityEndDate && !product.halfPriceApplied) {
          let halfPrice = Math.floor(parseInt(product.product.rentPrice) / 2);
          // 반값 적용 후 십원단위가 50원일 경우 100원으로 처리
          if (halfPrice % 100 === 50) {
            halfPrice = halfPrice + 50;
          }
          product.product.rentPrice = halfPrice;
          product.halfPriceApplied = true; // 반값 적용 표시
          console.log('내구연한 종료일 이후 대여로 렌트 가격 반값 적용:', product.product.rentPrice);
        }
        //대여 본인부담금
        const personalCharge = calculateRentPrice(product.product, period.rentStart, period.rentEnd, saleCalc, true);
        //대여 공단부담금
        const periodPersonalCharge = calculateRentPrice(product.product, period.rentStart, period.rentEnd, saleCalc, true);
        //대여 총액
        const periodTotalRentPrice = calculateRentPrice(product.product, period.rentStart, period.rentEnd, saleCalc, false);
        buyDanTotal += parseInt(truncateRentPrice(personalCharge, periodTotalRentPrice, periodPersonalCharge, tableConfig.isTruncate));
        if (tableConfig.isTruncate) {
          buyMyTotal += parseInt(truncatePrice(personalCharge, '본인부담금'));
        }else{
          buyMyTotal += parseInt(personalCharge);
        }
        if (tableConfig.isTruncate) {
          buyGongTotal += parseInt(truncatePrice(periodTotalRentPrice, '공단부담금'));
        }else{
          buyGongTotal += parseInt(periodTotalRentPrice);
        }
      });

    } else {
      if (tableConfig.isTruncate) {
        const price = parseInt(product.product.buyPrice) * parseInt(product.cnt) * (saleCalc);
        buyMyTotal += parseInt(truncatePrice(price, '본인부담금'));
      } else {
        buyMyTotal += parseInt(product.product.buyPrice) * parseInt(product.cnt) * (saleCalc);
      }
      if (tableConfig.isTruncate) {
        const price = parseInt(product.product.buyPrice) * parseInt(product.cnt) * (1 - saleCalc);
        buyGongTotal += parseInt(truncatePrice(price, '공단부담금'));
      } else {
        buyGongTotal += parseInt(product.product.buyPrice) * parseInt(product.cnt) * (1 - saleCalc);
      }
      buyDanTotal += parseInt(product.product.buyPrice) * parseInt(product.cnt);
    }
  });
  if (name.length > 0) {
    applyDataToElements([
      { elements: companyName, value: storeGetters.companyName },
      { elements: cnum, value: storeGetters.cnum },
      { elements: name, value: orderData.client.name },
      { elements: number, value: orderData.client.number },
      { elements: ceoName, value: orderData.company.ceoName },
      { elements: bnum, value: orderData.company.bnum },
      { elements: pdfday, value: dateOption === 'orderDate' ? orderData.orderDate : dateOption === 'today' ? new Date().toISOString().slice(0, 10) : dateOption === 'custom' ? tableConfig.printDate : '' },
      { elements: address, value: orderData.company.address + " " + orderData.company.addressDetail },
      { elements: myTotal, value: buyMyTotal.toLocaleString() },
      { elements: danTotal, value: buyDanTotal.toLocaleString() },
      { elements: gongTotal, value: buyGongTotal.toLocaleString() },
      { elements: sdate, value: orderData.orderDate }
    ]);
    
    const signBox = pageDiv.getElementsByClassName('signBox');
    // 도장 이미지 추가
    addStampImage(signBox, storeGetters.companyId, getStampUrlFunc);
    
    // 서명 이미지 추가
    if (clientSignData && clientSignData.sign) {
      const clientSignBox = pageDiv.getElementsByClassName('clientSignBox');
      if (clientSignBox.length > 0) {
        const img = document.createElement('img');
        img.src = clientSignData.sign;
        img.style.position = 'absolute';
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.right = '10px';
        img.style.top = '10px';
        img.style.transform = 'translateY(-50%)';
        img.style.zIndex = '999';
        
        clientSignBox[0].appendChild(img);
      }
    }
  }
};

// 기초수급자 입소 이용 신청서
export const zeroDoc1Set = (pageDiv, orderData, storeGetters, clientSignData, getStampUrlFunc) => {
  // 해당 페이지에서만 요소 찾기
  const companyName = pageDiv.getElementsByClassName('companyName');
  const companyAddress = pageDiv.getElementsByClassName('companyAddress');
  const companyPhone = pageDiv.getElementsByClassName('companyPhone');
  const companyFax = pageDiv.getElementsByClassName('companyFax');
  const companyMemberEmail = pageDiv.getElementsByClassName('companyMemberEmail');
  const cnum = pageDiv.getElementsByClassName('cnum');
  const name = pageDiv.getElementsByClassName('name');
  const number = pageDiv.getElementsByClassName('number');
  const resident = pageDiv.getElementsByClassName('resident');
  const resident2 = pageDiv.getElementsByClassName('resident2');
  const address = pageDiv.getElementsByClassName('address');
  const phone1 = pageDiv.getElementsByClassName('phone1');
  const ranker = pageDiv.getElementsByClassName('ranker');
  const target = pageDiv.getElementsByClassName('target');
  if (!orderData) return; // 해당 인덱스의 주문 데이터가 없으면 처리 안함

  if (name.length > 0) {
    applyDataToElements([
      { elements: companyName, value: storeGetters.companyName },
      { elements: cnum, value: storeGetters.cnum },
      { elements: companyAddress, value: orderData.company.address + " " + orderData.company.addressDetail },
      { elements: companyPhone, value: orderData.company.phone },
      { elements: companyFax, value: orderData.company.fax },
      { elements: companyMemberEmail, value: orderData.company.memberEmail },
      { elements: name, value: orderData.client.name },
      { elements: number, value: orderData.client.number },
      { elements: resident, value: orderData.client.resident },
      { elements: resident2, value: orderData.client.resident, type: 'input' },
      { elements: address, value: orderData.company.address + " " + orderData.company.addressDetail },
      { elements: phone1, value: orderData.phone1 },
      { elements: ranker, value: orderData.ranker },
      { elements: target, value: orderData.target },
      // 의료급여 또는 기초 체크박스 설정
      { elements: pageDiv.getElementsByClassName('chk1'), value: orderData.target === '기초' ? '✔' : ''},
      { elements: pageDiv.getElementsByClassName('chk2'), value: orderData.target === '의료급여' ? '✔' : ''}
    ]);

    const tbody = pageDiv.querySelectorAll('.doc1_table tbody');
    if (tbody.length === 0) return;

    // 테이블 행 초기화
    clearTableRows(tbody);

    const signBox = pageDiv.getElementsByClassName('signBox');
    // 도장 이미지 추가
    addStampImage(signBox, storeGetters.companyId, getStampUrlFunc);
    
    // 서명 이미지 추가
    if (clientSignData && clientSignData.sign) {
      const clientSignBox = pageDiv.getElementsByClassName('clientSignBox');
      if (clientSignBox.length > 0) {
        const img = document.createElement('img');
        img.src = clientSignData.sign;
        img.style.position = 'absolute';
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.right = '10px';
        img.style.top = '10px';
        img.style.transform = 'translateY(-50%)';
        img.style.zIndex = '999';
        
        clientSignBox[0].appendChild(img);
      }
    }
  }
};

// 기초수급자 재가 서비스 이용내역서
export const zeroDoc2Set = (pageDiv, orderData, storeGetters, validTermDates) => {
  // 해당 페이지에서만 요소 찾기
  const companyName = pageDiv.getElementsByClassName('companyName');
  const cnum = pageDiv.getElementsByClassName('cnum');
  const name = pageDiv.getElementsByClassName('name');
  const number = pageDiv.getElementsByClassName('number');
  const resident = pageDiv.getElementsByClassName('resident');
  const ranker = pageDiv.getElementsByClassName('ranker');
  const target = pageDiv.getElementsByClassName('target');
  const zeroDoc2_tr_header = pageDiv.getElementsByClassName('zeroDoc2_tr_header');
  const zerodoc_txt_area = pageDiv.getElementsByClassName('zerodoc_txt_area');
  if (!orderData) return; // 해당 인덱스의 주문 데이터가 없으면 처리 안함

  if (name.length > 0) {
    applyDataToElements([
      { elements: companyName, value: storeGetters.companyName },
      { elements: cnum, value: storeGetters.cnum },
      { elements: name, value: orderData.client.name },
      { elements: number, value: orderData.client.number },
      { elements: resident, value: orderData.client.resident, type: 'input' },
      { elements: ranker, value: orderData.ranker },
      { elements: target, value: orderData.target },
    ]);

    const tbody = pageDiv.querySelectorAll('.zeroDoc2_table tbody');
    if (tbody.length === 0) return;

    // 테이블 행 초기화
    clearTableRows(tbody);
    console.log(orderData.orderProducts,"orderData.orderProducts")
    // 주문 제품 데이터가 있는 경우에만 처리
    if (orderData.orderProducts && orderData.orderProducts.length > 0) {
      let totalAmount = 0;
      
      // 주문 제품 수만큼 행 생성
      orderData.orderProducts.forEach((product) => {
        console.log(product,"product")
        
        // 대여 상품인 경우 기간 분할 처리
        if (product.product?.target === '대여' && validTermDates && validTermDates.length > 0) {
          const rentPeriods = splitRentPeriods(
            orderData.rent.rentStart, 
            orderData.rent.rentEnd, 
            validTermDates,
            orderData.rent.durabilityEndDate
          );
          
          // 각 분할된 기간에 대해 행 생성
          rentPeriods.forEach((period) => {
            const tr = document.createElement('tr');
            tr.className = 'item_tr';
            
            // 품목명 셀
            const tdItem = document.createElement('td');
            tdItem.className = 'tg-0lax';
            tdItem.textContent = product.pitem || '';
            tr.appendChild(tdItem);
            
            // 제품코드 셀
            const tdCode = document.createElement('td');
            tdCode.className = 'tg-0lax w240';
            tdCode.textContent = product.product?.pcode || '';
            tr.appendChild(tdCode);
            
            // 구입 셀
            const tdBuy = document.createElement('td');
            tdBuy.className = 'tg-0lax';
            tr.appendChild(tdBuy);
            
            // 대여 셀
            const tdRent = document.createElement('td');
            tdRent.className = 'tg-0lax';
            tdRent.textContent = '√';
            tr.appendChild(tdRent);
            
            // 대여기간 셀
            const tdDate = document.createElement('td');
            tdDate.className = 'tg-0lax';
            tdDate.innerHTML = `${period.rentStart || ''} <br/>~ ${period.rentEnd || ''}`;
            tr.appendChild(tdDate);
            
            // 금액 셀
            const tdPrice = document.createElement('td');
            tdPrice.className = 'tg-0lax';
            const price = product.product?.rentPrice;
            if (price) {
              tdPrice.textContent = parseInt(price).toLocaleString() + '원';
            }
            tr.appendChild(tdPrice);
            
            // 장기요양기관명 셀
            const tdCompany = document.createElement('td');
            tdCompany.className = 'tg-0lax';
            tdCompany.textContent = storeGetters.companyName || '';
            tr.appendChild(tdCompany);
            
            // 장기요양기관기호 셀
            const tdCnum = document.createElement('td');
            tdCnum.className = 'tg-0lax';
            tdCnum.textContent = storeGetters.cnum || '';
            tr.appendChild(tdCnum);
            
            // 테이블에 행 추가
            zeroDoc2_tr_header[0].after(tr);
          });
        } else {
          const tr = document.createElement('tr');
          tr.className = 'item_tr';
          
          // 품목명 셀
          const tdItem = document.createElement('td');
          tdItem.className = 'tg-0lax';
          tdItem.textContent = product.pitem || '';
          tr.appendChild(tdItem);
          
          // 제품코드 셀
          const tdCode = document.createElement('td');
          tdCode.className = 'tg-0lax w240';
          tdCode.textContent = product.product?.pcode || '';
          tr.appendChild(tdCode);
          
          // 구입 셀
          const tdBuy = document.createElement('td');
          tdBuy.className = 'tg-0lax';
          if (product.product?.target === '구입') {
            tdBuy.textContent = product.cnt;
          }
          tr.appendChild(tdBuy);
          
          // 대여 셀
          const tdRent = document.createElement('td');
          tdRent.className = 'tg-0lax';
          if (product.product?.target === '대여') {
            tdRent.textContent = '√';
          }
          tr.appendChild(tdRent);
          
          // 구입일자(대여기간) 셀
          const tdDate = document.createElement('td');
          tdDate.className = 'tg-0lax';
          if (product.product?.target === '대여' && orderData.rent) {
            tdDate.innerHTML = `${orderData.rent.rentStart || ''} <br/>~ ${orderData.rent.rentEnd || ''}`;
          } else {
            tdDate.textContent = orderData.orderDate || '';
          }
          tr.appendChild(tdDate);
          
          // 금액 셀
          const tdPrice = document.createElement('td');
          tdPrice.className = 'tg-0lax';
          const price = product.product?.target === '대여' ? product.product?.rentPrice : product.product?.buyPrice;
          if (price) {
            tdPrice.textContent = (parseInt(price)*parseInt(product.cnt)).toLocaleString() + '원';
            totalAmount += parseInt(price)*parseInt(product.cnt);
          }
          tr.appendChild(tdPrice);
          
          // 장기요양기관명 셀
          const tdCompany = document.createElement('td');
          tdCompany.className = 'tg-0lax';
          tdCompany.textContent = storeGetters.companyName || '';
          tr.appendChild(tdCompany);
          
          // 장기요양기관기호 셀
          const tdCnum = document.createElement('td');
          tdCnum.className = 'tg-0lax';
          tdCnum.textContent = storeGetters.cnum || '';
          tr.appendChild(tdCnum);
          
          // 테이블에 행 추가
          zeroDoc2_tr_header[0].after(tr);
        }
      });


      // 현재 item_tr 개수를 파악하고 최종 20개가 되도록 더미 행 추가
      const currentRows = tbody[0].querySelectorAll('tr').length;
      const rowsToAdd = Math.max(0, 20 - currentRows);
      for (let i = 0; i < rowsToAdd; i++) {
        const dummyTr = document.createElement('tr');
        dummyTr.className = 'dummy';
        dummyTr.style.height = '30px';
        for (let j = 0; j < 8; j++) {
          const dummyTd = document.createElement('td');
          dummyTd.className = 'center-middle';
          dummyTr.appendChild(dummyTd);
        }
        // tbody[0].appendChild(dummyTr);
        if (zerodoc_txt_area && zerodoc_txt_area.length > 0) {
          zerodoc_txt_area[0].before(dummyTr);
        } else {
          zeroDoc2_tr_header[0].after(dummyTr);
        }
      }
      
      // 합계 금액 표시
      const pdfdantotal2 = pageDiv.getElementsByClassName('pdfdantotal2');
      if (pdfdantotal2.length > 0) {
        pdfdantotal2[0].textContent = totalAmount.toLocaleString();
      }
    }

    // 수정된 부분: tbody는 이미 문서에 존재하므로 after 메서드를 사용하지 않음
    // zeroDoc2_tr_header[0].after(tbody[0]);
  }
};

// 추가급여신청서
export const addSalarySet = (pageDiv, orderData, storeGetters, clientSignData, getStampUrlFunc) => {
  // 해당 페이지에서만 요소 찾기
  const companyName = pageDiv.getElementsByClassName('companyName');
  const cnum = pageDiv.getElementsByClassName('cnum');
  const name = pageDiv.getElementsByClassName('name');
  const number = pageDiv.getElementsByClassName('number');
  const resident = pageDiv.getElementsByClassName('resident');
  const ranker = pageDiv.getElementsByClassName('ranker');
  const target = pageDiv.getElementsByClassName('target');
  const address = pageDiv.getElementsByClassName('address');
  const phone1 = pageDiv.getElementsByClassName('phone1');
  const guardName = pageDiv.getElementsByClassName('guardName');
  const guardTarget = pageDiv.getElementsByClassName('guardTarget');
  const guardResident = pageDiv.getElementsByClassName('guardResident');
  if (!orderData) return; // 해당 인덱스의 주문 데이터가 없으면 처리 안함
  console.log("guardResident",orderData.client.guardResident)
  if (name.length > 0) {
    applyDataToElements([
      { elements: companyName, value: storeGetters.companyName },
      { elements: cnum, value: storeGetters.cnum },
      { elements: name, value: orderData.client.name },
      { elements: number, value: orderData.client.number },
      { elements: resident, value: orderData.client.resident},
      { elements: ranker, value: orderData.ranker },
      { elements: target, value: orderData.target },
      { elements: address, value: orderData.company.address + " " + orderData.company.addressDetail },
      { elements: phone1, value: orderData.phone1 },
      { elements: guardName, value: orderData.guardName },
      { elements: guardTarget, value: orderData.guardTarget },
      { elements: guardResident, value: orderData.clientRelationInfo.guardTarget === '본인' ? orderData.client.resident : orderData.client.guardResident}
    ]);
  }

  const signBox = pageDiv.getElementsByClassName('signBox');
    // 도장 이미지 추가
    addStampImage(signBox, storeGetters.companyId, getStampUrlFunc);
    
    // 서명 이미지 추가
    if (clientSignData && clientSignData.sign) {
      const clientSignBox = pageDiv.getElementsByClassName('clientSignBox');
      if (clientSignBox.length > 0) {
        const img = document.createElement('img');
        img.src = clientSignData.sign;
        img.style.position = 'absolute';
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.right = '10px';
        img.style.top = '10px';
        img.style.transform = 'translateY(-50%)';
        img.style.zIndex = '999';
        
        clientSignBox[0].appendChild(img);
      }
    }
};


// 거래명세서
export const receiptSet = (pageDiv, orderData, storeGetters) => {
  // 해당 페이지에서만 요소 찾기
  const companyName = pageDiv.getElementsByClassName('companyName');
  const cnum = pageDiv.getElementsByClassName('cnum');
  const name = pageDiv.getElementsByClassName('name');
  const number = pageDiv.getElementsByClassName('number');
  const resident = pageDiv.getElementsByClassName('resident');
  const target = pageDiv.getElementsByClassName('target');
  const ranker = pageDiv.getElementsByClassName('ranker');
  const address = pageDiv.getElementsByClassName('address');
  const phone1 = pageDiv.getElementsByClassName('phone1');
  const guardName = pageDiv.getElementsByClassName('guardName');
  const guardTarget = pageDiv.getElementsByClassName('guardTarget');
  const guardResident = pageDiv.getElementsByClassName('guardResident');
  if (!orderData) return; // 해당 인덱스의 주문 데이터가 없으면 처리 안함
  if (name.length > 0) {
    applyDataToElements([
      { elements: companyName, value: storeGetters.companyName },
      { elements: cnum, value: storeGetters.cnum },
      { elements: name, value: orderData.client.name },
      { elements: number, value: orderData.client.number },
      { elements: resident, value: orderData.client.resident },
      { elements: ranker, value: orderData.ranker },
      { elements: target, value: orderData.target },
      { elements: address, value: orderData.company.address + " " + orderData.company.addressDetail },
      { elements: phone1, value: orderData.phone1 },
      { elements: guardName, value: orderData.guardName },
      { elements: guardTarget, value: orderData.guardTarget },
      { elements: guardResident, value: orderData.clientRelationInfo.guardTarget === '본인' ? orderData.client.resident : orderData.client.guardResident }
    ]);
  }
};
export default {
  calculateRentPrice,
  addStampImage,
  applyDataToElements,
  clearTableRows,
  addDummyRows,
  setupDocument,
  doc1Set,
  doc2Set,
  doc3Set,
  doc4Set,
  doc5Set,
  zeroDoc1Set
};