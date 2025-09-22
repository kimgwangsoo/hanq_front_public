<template>
  <div class="excel-page-container">
    <div class="tab-container">
      <div 
        v-for="(tab, index) in tabs" 
        :key="index" 
        :class="['tab', { active: activeTab === index }]"
        @click="tabClick(index)"
      >
        {{ tab }}
      </div>
    </div>
    <!-- 날짜 검색 폼 추가 -->
    <div class="date-search-container">
      <div class="date-inputs">
        <div class="date-field">
          <label for="startDate">시작일:</label>
          <input 
            type="date" 
            id="startDate" 
            v-model="startDate" 
            class="date-input"
          />
        </div>
        <div class="date-separator">~</div>
        <div class="date-field">
          <label for="endDate">종료일:</label>
          <input 
            type="date" 
            id="endDate" 
            v-model="endDate" 
            class="date-input"
          />
        </div>
        <button class="search-button" @click="searchByDateRange">검색</button>

      </div>
      <button class="excel-button" @click="exportToExcel">엑셀변환</button>
    </div>
    
    <div class="table-container">
      <!-- 주문서내역 테이블 -->
      <table v-if="activeTab === 0" class="excel-table">
        <thead>
          <tr>
            <th v-for="(header, index) in orderHeaders" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in orderData" :key="rowIndex">
            <td v-for="(header, colIndex) in orderHeaders" :key="colIndex">
              {{ getOrderValue(row, header) || '' }}
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- 제품관리대장 테이블 -->
      <table v-if="activeTab === 1" class="excel-table">
        <thead>
          <tr>
            <th v-for="(header, index) in productHeaders" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, rowIndex) in productData.value" :key="rowIndex">
            <template v-for="(header, colIndex) in productHeaders" :key="colIndex">
              <!-- 주문 관련 정보는 첫 번째 행에만 표시하고 rowspan 적용 -->
              <td v-if="shouldShowCell(item, header)" 
                  :rowspan="getCellRowspan(item, header)">
                {{ getProductValue(item.order, item.product, header) || '' }}
              </td>
            </template>
          </tr>
        </tbody>
      </table>
      
      <!-- A/S관리대장 테이블 -->
      <table v-if="activeTab === 2" class="excel-table">
        <thead>
          <tr>
            <th v-for="(header, index) in asHeaders" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in asData" :key="rowIndex">
            <td v-for="(header, colIndex) in asHeaders" :key="colIndex">
              {{ getAsValue(row, header) || '' }}
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- 제품설치대장 테이블 -->
      <table v-if="activeTab === 3" class="excel-table">
        <thead>
          <tr>
            <th v-for="(header, index) in installHeaders" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in installData" :key="rowIndex">
            <td v-for="(header, colIndex) in installHeaders" :key="colIndex">
              {{ row[header] || '' }}
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- 본인부담금수납대장 테이블 -->
      <table v-if="activeTab === 4" class="excel-table">
        <thead>
          <tr>
            <th v-for="(header, index) in paymentHeaders" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in paymentData" :key="rowIndex">
            <td v-for="(header, colIndex) in paymentHeaders" :key="colIndex">
              {{ row[header] || '' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import * as XLSX from 'xlsx';
import { getOrderExcel, getAsExcel } from '@/api/orderExcel';

export default {
  name: 'ModalExcelPage',
  setup() {
    const activeTab = ref(0);
    const tabs = ['주문서내역', '제품관리대장', 'A/S관리대장', '제품설치대장', '본인부담금수납대장'];
    
    // 날짜 검색을 위한 변수
    // 현재 월의 1일과 말일로 초기화
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    const startDate = ref(formatDate(firstDay));
    const endDate = ref(formatDate(lastDay));
    
    // 주문서내역 헤더와 데이터
    const orderHeaders = [
      '일자', '수급자성함', '인정번호', '생년월일', '대상', '품목명', '품목수량', 
      '배송주소', '보호자성함', '구분', '연락처', '거래처', '담당자', '메모', 
      '배송방법', '배송상태', '공단계약'
    ];
    
    // DTO 필드와 헤더 매핑
    const orderHeaderMapping = {
      '일자': 'orderDate',
      '수급자성함': 'client.name',
      '인정번호': 'client.number',
      '생년월일': 'client.resident',
      '대상': 'target',
      '품목명': (row) => `${row.orderProducts[0].product.pname} ${row.orderProducts.length > 1 ? `외 ${row.orderProducts.length - 1}개` : ''}`,
      '품목수량': (row) => row.orderProducts.length,
      '배송주소': (row) => `${row.address || ''} ${row.addressDetail || ''}`,
      '보호자성함': 'guardName',
      '구분': (row) => row.orderProducts[0].product.target,
      '연락처': (row) => row.phone1 || row.phone2 || '',
      '거래처': 'centerName',
      '담당자': 'manager',
      '메모': (row) => row.comment,
      '배송방법': 'deliveryType',
      '배송상태': 'deliveryState',
      '공단계약': 'contractState'
    };
    const orderData = ref([]);
    
    // 제품관리대장 헤더와 데이터
    const productHeaders = [
      '일자', '수급자성함', '인정번호', '인정등급', '대상', '본인부담률', 
      '제품코드', '바코드', '제품명', '단가', '계약일', '계약구분', 
      '주문구분', '담당자', '배송방법', '센터명'
    ];
    const productData = reactive([]);
    
    // 제품관리대장 DTO 필드와 헤더 매핑
    const productHeaderMapping = {
      '일자': 'orderDate',
      '수급자성함': 'client.name',
      '인정번호': 'client.number',
      '인정등급': 'ranker',
      '대상': 'target',
      '본인부담률': 'sale',
      '제품코드': (row, product) => product?.product?.pcode || '',
      '바코드': (row, product) => product?.orderProductBcodes[0].bcode || '',
      '제품명': (row, product) => product?.product?.pname || '',
      '단가': (row, product) => product?.price || '',
      '계약일': 'orderDate',
      '계약구분': (row, product) => product?.product?.target || '',
      '주문구분': 'sale',
      '담당자': 'manager',
      '배송방법': 'deliveryType',
      '센터명': 'centerName'
    };
    
    // 주문 관련 필드 (rowspan 적용할 필드)
    const orderRelatedFields = [
      '일자', '수급자성함', '인정번호', '인정등급', '대상', 
      '계약일', '주문구분', '담당자', '배송방법', '센터명'
    ];
    
    // A/S관리대장 헤더와 데이터
    const asHeaders = ['A/S접수일자','품목명','제품명','제품바코드', '수리보수사항', '처리일자', '처리내용'];
    const asData = ref([]);
    
    // 제품설치대장 헤더와 데이터
    const installHeaders = ['설치일자', '제품명', '설치장소', '담당자', '비고'];
    const installData = reactive([]);
    
    // 본인부담금수납대장 헤더와 데이터
    const paymentHeaders = [
      '일자', '수급자성함', '인정번호', '생년월일', '대상', '본인부담률', 
      '본인부담금', '공단부담금', '단가', '담당자', '센터명', '품목', 
      '제품명', '입금액', '입금방식', '입금일자', '과세구분'
    ];
    const paymentData = reactive([]);
    
    // 날짜 범위로 검색하는 함수
    const searchByDateRange = () => {
      if (!startDate.value || !endDate.value) {
        alert('시작일과 종료일을 모두 입력해주세요.');
        return;
      }
      
      // 여기에 API 호출 로직 추가
      // 예: 현재 탭에 따라 다른 API 호출
      switch (activeTab.value) {
        case 0:
          // 주문서내역 데이터 가져오기
          fetchOrderData();
          break;
        case 1:
          // 제품관리대장 데이터 가져오기
          fetchProductData();
          break;
        case 2:
          // A/S관리대장 데이터 가져오기
          fetchAsData();
          break;
        case 3:
          // 제품설치대장 데이터 가져오기
          fetchInstallData();
          break;
        case 4:
          // 본인부담금수납대장 데이터 가져오기
          fetchPaymentData();
          break;
      }
    };

    const tabClick = (index) => {
      activeTab.value = index;
      searchByDateRange();
    };
    
    // 각 탭별 데이터 가져오는 함수들
    const fetchOrderData = async () => {
      try {
        // API 호출 예시
        console.log(`주문서내역 데이터 요청: ${startDate.value} ~ ${endDate.value}`);
        // 실제 API 호출 코드 추가
        const response = await getOrderExcel({
          sdate: startDate.value,
          edate: endDate.value,
          limit: 1000000,
          page: 1,
        });
        console.log('API 응답:', response);
        if (response.data && response.data.items) {
          orderData.value = response.data.items;
          console.log('orderData 설정됨:', orderData.value);
        } else {
          console.error('응답 데이터 형식이 예상과 다릅니다:', response.data);
        }
      } catch (error) {
        console.error('주문 데이터 가져오기 오류:', error);
      }
    };
    
    const fetchProductData = async () => {
      try {
        console.log(`제품관리대장 데이터 요청: ${startDate.value} ~ ${endDate.value}`);
        // 주문 데이터를 가져와서 제품 데이터로 변환
        const response = await getOrderExcel({
          sdate: startDate.value,
          edate: endDate.value,
          limit: 1000000,
          page: 1,
        });
        
        if (response.data && response.data.items) {
          // 주문 데이터에서 제품 데이터 추출 및 가공
          const orders = response.data.items;
          const expandedProducts = [];
          
          // 각 주문의 orderProducts를 개별 행으로 확장하고 그룹화 정보 추가
          orders.forEach(order => {
            if (order.orderProducts && order.orderProducts.length > 0) {
              // 각 주문별로 제품 그룹화
              const orderGroup = {
                orderId: order.id,
                products: order.orderProducts.length,
                currentIndex: 0
              };
              
              order.orderProducts.forEach((product, index) => {
                expandedProducts.push({
                  order,
                  product,
                  group: orderGroup,
                  isFirstInGroup: index === 0,
                  index
                });
              });
            }
          });
          
          productData.value = expandedProducts;
          console.log('제품 데이터 설정됨:', productData.value);
        } else {
          console.error('응답 데이터 형식이 예상과 다릅니다:', response.data);
        }
      } catch (error) {
        console.error('제품 데이터 가져오기 오류:', error);
      }
    };

    const asHeaderMapping = {
      'A/S접수일자': 'receiptAt',
      '수리보수사항': 'receiptTxt',
      '처리일자': 'receiptEndDate',
      '처리내용': 'receiptEndTxt',
      '바코드': 'orderProductBcode.bcode',
      '품목명': 'product.pitem',
      '제품명': 'product.pname',
      '제품코드': 'product.pcode'
    };
    
    const getAsValue = (row, header) => {
      if (!row) return '';
      const mapping = asHeaderMapping[header];
      if (!mapping) return '';
      
      // 함수인 경우 직접 실행
      if (typeof mapping === 'function') {
        return mapping(row);
      }
      
      // 점(.)이 포함된 경우 (중첩 객체 접근)
      if (mapping.includes('.')) {
        const parts = mapping.split('.');
        let value = row;
        for (const part of parts) {
          if (!value) return '';
          value = value[part];
        }
        return value;
      }
      
      // 배열 접근 패턴인 경우
      if (mapping.includes('[')) {
        const regex = /(\w+)\[(\d+)\]\.(\w+)/;
        const match = mapping.match(regex);
        if (match) {
          const [, arrayName, index, prop] = match;
          const array = row[arrayName];
          const idx = parseInt(index);
          if (array && array.length > idx) {
            return array[idx][prop];
          }
        }
        return '';
      }
      
      // 단순 속성 접근
      return row[mapping] || '';
    };

    const fetchAsData = async () => {
      console.log(`A/S관리대장 데이터 요청: ${startDate.value} ~ ${endDate.value}`);
      // 실제 API 호출 코드 추가
      const response = await getAsExcel({
        sdate: startDate.value,
        edate: endDate.value,
      });
      console.log('API 응답:', response);
      if (response.data && response.data.items) {
        asData.value = response.data.items;
      } else {
        console.error('응답 데이터 형식이 예상과 다릅니다:', response.data);
      }
    };
    
    const fetchInstallData = () => {
      console.log(`제품설치대장 데이터 요청: ${startDate.value} ~ ${endDate.value}`);
      // 실제 API 호출 코드 추가
    };
    
    const fetchPaymentData = () => {
      console.log(`본인부담금수납대장 데이터 요청: ${startDate.value} ~ ${endDate.value}`);
      // 실제 API 호출 코드 추가
    };
    
    // 엑셀 내보내기 함수
    const exportToExcel = () => {
      let data = [];
      
      switch (activeTab.value) {
        case 0:
          data = orderData.value;
          break;
        case 1:
          data = productData;
          break;
        case 2:
          data = asData;
          break;
        case 3:
          data = installData;
          break;
        case 4:
          data = paymentData;
          break;
      }
      
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, tabs[activeTab.value]);
      
      // 엑셀 파일 다운로드
      XLSX.writeFile(workbook, `${tabs[activeTab.value]}.xlsx`);
    };

    onMounted(() => {
      fetchOrderData();
    });
    
    // 헤더에 맞는 값을 가져오는 함수
    const getOrderValue = (row, header) => {
      if (!row) return '';
      
      const mapping = orderHeaderMapping[header];
      if (!mapping) return '';
      
      // 함수인 경우 함수 실행
      if (typeof mapping === 'function') {
        return mapping(row);
      }
      
      // 중첩 속성 접근 (예: client.name)
      if (mapping.includes('.')) {
        const parts = mapping.split('.');
        let value = row;
        for (const part of parts) {
          if (!value) return '';
          value = value[part];
        }
        return value;
      }
      
      // 배열 접근 (예: orderProducts[0].name)
      if (mapping.includes('[')) {
        const regex = /(\w+)\[(\d+)\]\.(\w+)/;
        const match = mapping.match(regex);
        if (match) {
          const [, arrayName, index, prop] = match;
          const array = row[arrayName];
          if (array && array.length > parseInt(index)) {
            return array[parseInt(index)][prop];
          }
        }
        return '';
      }
      
      // 일반 속성
      let value = row[mapping];
      
      // 특정 필드에 대한 값 변환
      if (header === '배송방법') {
        switch (value) {
          case 0: return '내방';
          case 1: return '택배';
          case 2: return '물류 (기관배송)';
          case 3: return '소독';
          case 4: return '공급업체';
          default: return value;
        }
      }
      
      if (header === '배송상태') {
        switch (value) {
          case '0': return '배송대기';
          case '1': return '배송완료';
          case '2': return '회수';
          case '3': return '회수완료';
          default: return value;
        }
      }
      
      if (header === '공단계약') {
        switch (value) {
          case 'n': return '미계약';
          case 'ok': return '계약완료';
          case 'cok': return '취소계약완료';
          case 'vok': return '부분계약완료';
          default: return value;
        }
      }
      
      return value;
    };
    
    // 제품관리대장 헤더에 맞는 값을 가져오는 함수
    const getProductValue = (order, product, header) => {
      if (!order) return '';
      
      const mapping = productHeaderMapping[header];
      if (!mapping) return '';
      
      // 함수인 경우 함수 실행
      if (typeof mapping === 'function') {
        return mapping(order, product);
      }
      
      // 중첩 속성 접근 (예: client.name)
      if (mapping.includes('.')) {
        const parts = mapping.split('.');
        let value = order;
        for (const part of parts) {
          if (!value) return '';
          value = value[part];
        }
        return value;
      }
      
      // 일반 속성
      return order[mapping];
    };
    
    // 셀을 표시할지 여부 결정 (rowspan 처리)
    const shouldShowCell = (item, header) => {
      // 제품 관련 필드는 항상 표시
      if (!orderRelatedFields.includes(header)) {
        return true;
      }
      
      // 주문 관련 필드는 주문별 첫 번째 제품에만 표시
      return item.isFirstInGroup;
    };
    
    // 셀의 rowspan 값 계산
    const getCellRowspan = (item, header) => {
      // 주문 관련 필드는 주문의 제품 수만큼 rowspan 적용
      if (orderRelatedFields.includes(header) && item.isFirstInGroup) {
        return item.group.products;
      }
      
      // 그 외에는 rowspan 없음
      return 1;
    };
    
    return {
      activeTab,
      tabs,
      startDate,
      endDate,
      searchByDateRange,
      orderHeaders,
      orderData,
      productHeaders,
      productData,
      asHeaders,
      asData,
      installHeaders,
      installData,
      paymentHeaders,
      paymentData,
      exportToExcel,
      getOrderValue,
      getProductValue,
      shouldShowCell,
      getCellRowspan,
      getAsValue,
      tabClick
    };
  }
};
</script>

<style scoped>
.excel-page-container {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
}

/* 날짜 검색 폼 스타일 */
.date-search-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.date-inputs {
  display: flex;
  align-items: center;
  flex: 1;
}

.date-field {
  display: flex;
  align-items: center;
}

.date-field label {
  margin-right: 10px;
  font-weight: bold;
}

.date-input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 150px;
}

.date-separator {
  margin: 0 15px;
  font-weight: bold;
}

.search-button {
  padding: 8px 20px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 15px;
}

.search-button:hover {
  background-color: #0b7dda;
}

.tab-container {
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-bottom: none;
  border-radius: 5px 5px 0 0;
  margin-right: 5px;
  background-color: #f5f5f5;
}

.tab.active {
  background-color: #fff;
  border-bottom: 1px solid #fff;
  margin-bottom: -1px;
  font-weight: bold;
}

.table-container {
  flex: 1;
  overflow-x: auto;
  margin-bottom: 20px;
}

.excel-table {
  width: 100%;
  border-collapse: collapse;
}

.excel-table th, .excel-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  vertical-align: middle;
}

.excel-table th {
  background-color: #f2f2f2;
  position: sticky;
  top: 0;
}

.button-container {
  position:fixed;
  bottom: 80px;
  right: 50%;
  /* display: flex;
  justify-content: flex-end; */
}

.excel-button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.excel-button:hover {
  background-color: #45a049;
}
</style>