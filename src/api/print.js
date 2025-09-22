import axios from 'axios';
import { getStampUrl } from '@/utils/stampUrl';
import { getClientSign } from '@/api/client';
import { setupDocument } from '@/components/DocPrints.js';

/**
 * 인쇄 관련 API 함수들
 */

/**
 * 인쇄 템플릿 가져오기
 * @param {string} templateName - 템플릿 이름 (Doc1, Doc2, Doc3, Doc4, Doc5)
 * @returns {Promise<string>} - HTML 템플릿 문자열
 */
export const getPrintTemplate = async (templateName) => {
  try {
    const response = await axios.get(`${templateName}`);
    return response.data;
  } catch (error) {
    console.error(`템플릿 로드 중 오류 발생: ${templateName}`, error);
    throw new Error('인쇄 템플릿을 불러오는 중 오류가 발생했습니다.');
  }
};

/**
 * 여러 인쇄 템플릿 한번에 가져오기
 * @param {Array<string>} templateNames - 템플릿 이름 배열 (예: ['Doc1', 'Doc2'])
 * @returns {Promise<Object>} - 템플릿 이름을 키로, HTML 문자열을 값으로 가지는 객체
 */
export const getBulkPrintTemplates = async (templateNames, orderData, storeGetters, tableConfig, dateOption, validTermDates) => {
  try {
    // 모든 템플릿을 가져오기
    const promises = templateNames.map(name => 
      getPrintTemplate(name.url)
    );
    
    const htmlResults = await Promise.all(promises);
    let wrappedHtmls = [];

    // 클라이언트 서명 데이터 미리 가져오기
    const clientSignDataPromises = orderData.map(item => 
      fetchClientSignData(item)
    );
    const clientSignDataResults = await Promise.all(clientSignDataPromises);
    
    orderData.forEach((item, index) => {
        // 각 HTML을 A4 사이즈로 래핑하여 하나로 합치기
        htmlResults.map((html, htmlIndex) => {
            // html이 텍스트 데이터이므로 DOM 요소로 변환하여 처리
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            
            // 해당 주문에 대한 서명 데이터 전달
            const clientSignData = clientSignDataResults[index];
            
            // 공통 setupDocument 함수 호출
            setupDocument(tempDiv, item, storeGetters, clientSignData, templateNames[htmlIndex].url, getStampUrl, tableConfig, dateOption, validTermDates);
            
            html = tempDiv.innerHTML;
            wrappedHtmls.push(`<div id="printContent-${index+1}" style="width: 210mm; page-break-after: always;">${html}</div>`);
        });
    });
    // 모든 HTML을 하나로 합치기
    const combinedHtml = wrappedHtmls.join('');
    return combinedHtml;
  } catch (error) {
    console.error('여러 템플릿 로드 중 오류 발생', error);
    throw new Error('인쇄 템플릿을 불러오는 중 오류가 발생했습니다.');
  }
};

/**
 * PDF 변환 요청
 * @param {string} html - PDF로 변환할 HTML 문자열
 * @param {Object} options - PDF 변환 옵션
 * @returns {Promise<Blob>} - PDF 파일 Blob
 */
export const convertToPdf = async (html, options = {}) => {
  try {
    const response = await axios.post('/api/print/convert-pdf', {
      html,
      options
    }, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error('PDF 변환 중 오류 발생', error);
    throw new Error('PDF 변환 중 오류가 발생했습니다.');
  }
};

/**
 * 클라이언트 서명 데이터 가져오기
 * @param {Object} orderData - 주문 데이터
 * @returns {Promise<Object>} - 서명 데이터 객체
 */
const fetchClientSignData = async (orderData) => {
  try {
    if (!orderData?.client?.id) return null;
    
    const response = await getClientSign(orderData.client.id);
    if (response.success) {
      return {
        sign: response.sign,
        fileName: response.fileName
      };
    }
    return null;
  } catch (error) {
    console.error('서명 데이터 가져오기 오류:', error);
    return null;
  }
};

/**
 * 공통 요소 설정 함수
 * @param {HTMLElement} pageDiv - 페이지 요소
 * @param {Object} orderData - 주문 데이터
 * @param {Object} storeGetters - 스토어 getter 객체
 * @param {Object} elementMap - 요소 매핑 객체
 */
const setCommonElements = (pageDiv, orderData, storeGetters, elementMap) => {
  if (!pageDiv || !orderData) return;
  
  // 각 요소에 데이터 적용
  Object.entries(elementMap).forEach(([key, value]) => {
    const elements = pageDiv.getElementsByClassName(key);
    if (elements.length > 0) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].innerHTML = value || '';
      }
    }
  });
};

/**
 * 도장 및 서명 이미지 추가 함수
 * @param {HTMLElement} pageDiv - 페이지 요소
 * @param {Object} storeGetters - 스토어 getter 객체
 * @param {Object} clientSignData - 클라이언트 서명 데이터
 * @param {Object} options - 옵션 (위치, 크기 등)
 */
const addSignAndStamp = (pageDiv, storeGetters, clientSignData, options = {}) => {
  // 기본 옵션 설정
  const defaultOptions = {
    stampPosition: { right: '10px', top: '10px' },
    stampSize: { width: '60px', height: '60px' },
    signPosition: { right: '10px', top: '10px' },
    signSize: { width: '100px', height: '100px' }
  };
  
  const opts = { ...defaultOptions, ...options };
  
  // 회사 도장 추가
  const signBox = pageDiv.getElementsByClassName('signBox');
  if (signBox.length > 0 && storeGetters.companyId) {
    const imgElement = document.createElement('img');
    imgElement.src = getStampUrl(storeGetters.companyId);
    imgElement.style.position = 'absolute';
    imgElement.style.width = opts.stampSize.width;
    imgElement.style.height = opts.stampSize.height;
    imgElement.style.right = opts.stampPosition.right;
    imgElement.style.top = opts.stampPosition.top;
    imgElement.style.transform = 'translateY(-50%)';
    imgElement.style.zIndex = '999';
    
    if (signBox[0] && signBox[0].parentNode) {
      signBox[0].parentNode.appendChild(imgElement);
    }
  }
  
  // 클라이언트 서명 추가
  const clientSignBox = pageDiv.getElementsByClassName('clientSignBox');
  if (clientSignBox.length > 0 && clientSignData?.sign) {
    const imgElement = document.createElement('img');
    imgElement.src = clientSignData.sign;
    imgElement.style.position = 'absolute';
    imgElement.style.width = opts.signSize.width;
    imgElement.style.height = opts.signSize.height;
    imgElement.style.right = opts.signPosition.right;
    imgElement.style.top = opts.signPosition.top;
    imgElement.style.transform = 'translateY(-50%)';
    imgElement.style.zIndex = '999';
    
    if (clientSignBox[0] && clientSignBox[0].parentNode) {
      clientSignBox[0].parentNode.appendChild(imgElement);
    }
  }
};

/**
 * 테이블 행 생성 및 더미 행 추가 함수
 * @param {HTMLElement} tbody - 테이블 tbody 요소
 * @param {Array} products - 제품 데이터 배열
 * @param {Function} createRowFunc - 행 생성 함수
 * @param {number} totalRows - 총 행 수
 * @param {number} cellCount - 셀 개수
 * @param {Object} options - 추가 옵션
 */
const createTableRows = (tbody, products, createRowFunc, totalRows, cellCount, options = {}) => {
  if (!tbody) return;
  
  // 기존 행 제거
  const existingRows = tbody.querySelectorAll('.item_tr, .dummy');
  existingRows.forEach(row => tbody.removeChild(row));
  
  // 제품 행 생성
  if (products && products.length > 0) {
    products.forEach(product => {
      const tr = createRowFunc(product);
      
      // 특별한 삽입 위치가 있는 경우
      if (options.insertAfter && options.insertAfter.element) {
        options.insertAfter.element.after(tr);
      } else {
        tbody.appendChild(tr);
      }
    });
  }
  
  // 더미 행 추가
  const currentRows = tbody.querySelectorAll('.item_tr').length;
  const rowsToAdd = Math.max(0, totalRows - currentRows);
  
  for (let i = 0; i < rowsToAdd; i++) {
    const dummyTr = document.createElement('tr');
    dummyTr.className = 'dummy';
    dummyTr.style.height = '30px';
    
    // 셀 생성
    for (let j = 0; j < cellCount; j++) {
      const dummyTd = document.createElement('td');
      dummyTd.className = 'center-middle';
      const dummyDiv = document.createElement('div');
      dummyTd.appendChild(dummyDiv);
      dummyTr.appendChild(dummyTd);
    }
    
    // 특별한 삽입 위치가 있는 경우
    if (options.insertBefore && options.insertBefore.element) {
      options.insertBefore.element.before(dummyTr);
    } else {
      tbody.appendChild(dummyTr);
    }
  }
};

/**
 * 문서 데이터 설정 함수 (통합)
 * @param {HTMLElement} pageDiv - 페이지 요소
 * @param {Object} orderData - 주문 데이터
 * @param {Object} storeGetters - 스토어 getter 객체
 * @param {Object} clientSignData - 클라이언트 서명 데이터
 * @param {string} docType - 문서 타입 (doc1, doc2, doc3, doc4, doc5)
 */
const setDocData = (pageDiv, orderData, storeGetters, clientSignData, docType) => {
  if (!pageDiv || !orderData) return;
  
  const saleCalc = parseInt(orderData.sale) / 100;
  
  // 공통 요소 매핑 (모든 문서에서 사용되는 요소)
  const commonElementMap = {
    'companyName': storeGetters.companyName,
    'cnum': storeGetters.cnum,
    'name': orderData.client?.name,
    'number': orderData.client?.number,
    'resident': orderData.client?.resident,
    'ceoName': orderData.company?.ceoName,
    'pdfday': orderData.orderDate ? new Date(orderData.orderDate).toLocaleDateString('ko-KR') : '',
    'phone': orderData.company?.phone,
    'fax': orderData.company?.fax,
    'address': orderData.company?.address ? `${orderData.company.address} ${orderData.company.addressDetail || ''}` : '',
    'bnum': orderData.company?.bnum
  };
  
  // 문서 타입별 추가 요소 매핑
  const additionalElementMaps = {
    'doc1': {
      'target': orderData.target,
      'ranker': orderData.ranker,
      'sale': orderData.sale,
      'guardName': orderData.clientRelationInfo?.guardTarget === '본인' ? orderData.client?.name : orderData.guardName,
      'clientRelationInfo': orderData.clientRelationInfo?.guardTarget
    },
    'doc2': {
      'target': orderData.target,
      'ranker': orderData.ranker,
      'guardName': orderData.clientRelationInfo?.guardTarget === '본인' ? orderData.client?.name : orderData.guardName
    },
    'doc3': {
      'guardName': orderData.guardName,
      'clientRelationInfo': orderData.clientRelationInfo?.guardTarget
    },
    'doc4': {
      'target': `${orderData.target} ${orderData.sale} ${orderData.ranker}`
    },
    'doc5': {}
  };
  
  // 현재 문서 타입에 맞는 요소 매핑 적용
  const elementMap = { ...commonElementMap, ...(additionalElementMaps[docType] || {}) };
  setCommonElements(pageDiv, orderData, storeGetters, elementMap);
  
  // 문서 타입별 특수 처리
  switch (docType) {
    case 'doc1': {
      const tbody = pageDiv.querySelectorAll('.doc1_table tbody')[0];
      if (tbody) {
        createTableRows(
          tbody,
          orderData.orderProducts,
          (product) => {
            const tr = document.createElement('tr');
            tr.className = 'item_tr';
            
            // 8개의 셀 생성
            const cellData = [
              { content: product.pitem || '' }, // 품목명
              { content: product.pname || '' }, // 제품명
              { content: product.product?.pcode || '' }, // 복지용구 표준코드
              { content: product.product?.buyPrice ? parseInt(product.product.buyPrice).toLocaleString() : '' }, // 급여비용
              { content: orderData.orderDate ? new Date(orderData.orderDate).toLocaleDateString('ko-KR') : '' }, // 판매일
              { content: product.product?.buyPrice ? parseInt(product.product.buyPrice).toLocaleString() : '', className: 'pdfstr_custum_dan' }, // 총액
              { content: product.product?.buyPrice ? Math.floor(product.product.buyPrice * (saleCalc)).toLocaleString() : '', className: 'pdfstr_custum_buy', dataset: { cnt: 1 } }, // 본인부담금
              { content: product.product?.buyPrice ? Math.floor(product.product.buyPrice * (1 - saleCalc)).toLocaleString() : '', className: 'pdfstr_custum_gong', dataset: { cnt: 1 } } // 공단부담액
            ];
            
            cellData.forEach(cell => {
              const td = document.createElement('td');
              td.className = 'center-middle';
              const div = document.createElement('div');
              div.textContent = cell.content;
              
              if (cell.className) div.className = cell.className;
              if (cell.dataset) {
                Object.entries(cell.dataset).forEach(([key, value]) => {
                  div.dataset[key] = value;
                });
              }
              
              td.appendChild(div);
              tr.appendChild(td);
            });
            
            return tr;
          },
          15, // 총 행 수
          8   // 셀 개수
        );
      }
      break;
    }
    case 'doc2': {
      const tbody = pageDiv.querySelectorAll('.doc2_table_buy tbody')[0];
      if (tbody) {
        const headerRow = pageDiv.querySelectorAll('.doc2_table_buy_tr_header')[0];
        const totalRow = pageDiv.querySelectorAll('.doc2_table_buy_tr_total')[0];
        
        createTableRows(
          tbody,
          orderData.orderProducts,
          (product) => {
            const tr = document.createElement('tr');
            tr.className = 'item_tr';
            
            // 9개의 셀 생성
            const cellData = [
              { content: product.pitem || '' }, // 품목명
              { content: product.pname || '' }, // 제품명
              { content: product.product?.pcode || '' }, // 복지용구 표준코드
              { createBarcode: true, barcodes: product.orderProductBcodes }, // 바코드
              { content: product.product?.buyPrice ? parseInt(product.product.buyPrice).toLocaleString() : '' }, // 단가
              { content: product.quantity || '0' }, // 수량
              { content: product.product?.buyPrice ? parseInt(product.product.buyPrice).toLocaleString() : '', className: 'pdfstr_custum_dan' }, // 적용금액
              { content: product.product?.buyPrice ? Math.floor(product.product.buyPrice * (saleCalc)).toLocaleString() : '', className: 'pdfstr_custum_buy', dataset: { cnt: 1 } }, // 본인부담금
              { content: orderData.orderDate ? new Date(orderData.orderDate).toLocaleDateString('ko-KR') : '0000-00-00' } // 판매계약일
            ];
            
            cellData.forEach(cell => {
              const td = document.createElement('td');
              td.className = 'center-middle';
              const div = document.createElement('div');
              
              if (cell.createBarcode && cell.barcodes && cell.barcodes.length > 0) {
                // 바코드 처리
                for (let j = 0; j < cell.barcodes.length; j++) {
                  if (j > 0) {
                    const br = document.createElement('br');
                    div.appendChild(br);
                  }
                  div.appendChild(document.createTextNode(cell.barcodes[j].bcode || ''));
                }
              } else {
                div.textContent = cell.content;
              }
              
              if (cell.className) div.className = cell.className;
              if (cell.dataset) {
                Object.entries(cell.dataset).forEach(([key, value]) => {
                  div.dataset[key] = value;
                });
              }
              
              td.appendChild(div);
              tr.appendChild(td);
            });
            
            return tr;
          },
          5, // 총 행 수
          9, // 셀 개수
          {
            insertAfter: { element: headerRow },
            insertBefore: { element: totalRow }
          }
        );
      }
      break;
    }
    case 'doc4': {
      const tbody = pageDiv.querySelectorAll('.doc4_table tbody')[0];
      if (tbody) {
        createTableRows(
          tbody,
          orderData.orderProducts,
          (product) => {
            const tr = document.createElement('tr');
            tr.className = 'item_tr';
            
            // 9개의 셀 생성
            const cellData = [
              { content: product.target === '구입' ? '구입' : '대여' }, // 급여방식
              { content: product.pitem || '' }, // 품목
              { content: product.pname || '' }, // 제품명
              { content: product.product?.pcode || '' }, // 제품코드
              { content: '' }, // 대여시작일
              { content: '' }, // 대여종료일
              { content: product.product?.buyPrice ? parseInt(product.product.buyPrice).toLocaleString() : '' }, // 공급가액
              { content: product.product?.buyPrice ? Math.floor(product.product.buyPrice * (saleCalc)).toLocaleString() : '' }, // 본인부담금
              { content: '' } // 비고
            ];
            
            cellData.forEach(cell => {
              const td = document.createElement('td');
              td.className = 'center-middle';
              const div = document.createElement('div');
              div.textContent = cell.content;
              
              td.appendChild(div);
              tr.appendChild(td);
            });
            
            return tr;
          },
          15, // 총 행 수
          9   // 셀 개수
        );
      }
      break;
    }
  }
  
  // 도장 및 서명 추가
  const signOptions = docType === 'doc2' ? 
    { stampPosition: { right: '100px', top: '10px' } } : 
    {};
  
  addSignAndStamp(pageDiv, storeGetters, clientSignData, signOptions);
};

export { setDocData };