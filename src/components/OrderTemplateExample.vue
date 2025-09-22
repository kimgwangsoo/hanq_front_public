<template>
  <BaseOrderTemplate
    :search-query="searchQuery"
    @update:searchQuery="searchQuery = $event"
    @search="handleSearch"
    @show-search-popup="showSearchPopup"
    :current-page="currentPage"
    :total-pages="totalPages"
    :page-size="pageSize"
    :start-date="startDate"
    :end-date="endDate"
    :filters="filters"
    :items="items"
    :active-status="activeStatus"
    @page-change="handlePageChange"
    @status-change="handleStatusChange"
    @date-range-change="handleDateRangeChange"
    @filter-change="handleFilterChange"
    @select-all="handleSelectAll"
    @item-click="handleItemClick"
    @item-action="handleItemAction"
  >
    <!-- 제목 영역 -->
    <template #title-icon>
      <CartIcon />
    </template>
    <template #title-text>주문 및 발주</template>
    
    <!-- 검색 아이콘 -->
    <template #search-icon>
      <MagnifyIcon />
    </template>
    <template #search-variant-icon>
      <TextSearchVariantIcon />
    </template>
    
    <!-- 필터 태그 -->
    <template #filters>
      <FilterTag 
        v-for="(value, key) in activeFilters" 
        :key="key"
      >
        {{ getFilterName(key) }}: {{ getFilterValue(key, value) }}
        <FilterRemoveButton @click="removeFilter(key)">✕</FilterRemoveButton>
      </FilterTag>
    </template>
    
    <!-- 헤더 버튼 영역 -->
    <template #header-buttons>
      <AddButton @click="showAddModal = true">주문 추가</AddButton>
      <DatePickerWrap>
        <VueDatepicker v-model="startDate" placeholder="시작일" />
        <span>~</span>
        <VueDatepicker v-model="endDate" placeholder="종료일" />
        <DateSearchButton @click="handleDateSearch">날짜조회</DateSearchButton>
      </DatePickerWrap>
      <DateButtonWrap>
        <DateRangeButton @click="setDateRange('today')">당일</DateRangeButton>
        <DateRangeButton @click="setDateRange('yesterday')">전일</DateRangeButton>
        <DateRangeButton @click="setDateRange('thisWeek')">당주</DateRangeButton>
        <DateRangeButton @click="setDateRange('lastWeek')">전주</DateRangeButton>
        <DateRangeButton @click="setDateRange('thisMonth')">당월</DateRangeButton>
        <DateRangeButton @click="setDateRange('lastMonth')">전월</DateRangeButton>
        <DateRangeButton @click="setDateRange('all')">전체</DateRangeButton>
      </DateButtonWrap>
      <ExcelButton @click="exportToExcel">
        <MicrosoftExcelIcon /> 엑셀 다운로드
      </ExcelButton>
    </template>
    
    <!-- 탭 버튼 영역 -->
    <!-- <template #tab-buttons>
      <StatusButton 
        @click="handleStatusChange(0)" 
        :class="{ active: activeStatus === 0 }"
      >
        <StatusName class="all">전체</StatusName>
        <StatusCount>{{ statusCounts.all || 0 }}</StatusCount>
      </StatusButton>
      <StatusButton 
        @click="handleStatusChange(1)" 
        :class="{ active: activeStatus === 1 }"
      >
        <StatusName class="unconfirm">미확인</StatusName>
        <StatusCount>{{ statusCounts.unconfirm || 0 }}</StatusCount>
      </StatusButton>
      <StatusButton 
        @click="handleStatusChange(2)" 
        :class="{ active: activeStatus === 2 }"
      >
        <StatusName class="confirm">확인</StatusName>
        <StatusCount>{{ statusCounts.confirm || 0 }}</StatusCount>
      </StatusButton>
      <StatusButton 
        @click="handleStatusChange(3)" 
        :class="{ active: activeStatus === 3 }"
      >
        <StatusName class="release">출고</StatusName>
        <StatusCount>{{ statusCounts.release || 0 }}</StatusCount>
      </StatusButton>
    </template> -->
    
    <!-- 페이지네이션 영역 -->
    <template #pagination-left>
      <PrintButton @click="printSelected">선택 주문서 출력</PrintButton>
      <select v-model="pageSize" @change="handlePageSizeChange" class="page-size-select">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <span class="page-size-text">개씩 보기</span>
    </template>
    
    <template #double-left-icon>
      <ChevronDoubleLeftIcon />
    </template>
    <template #left-icon>
      <ChevronLeftIcon />
    </template>
    <template #right-icon>
      <ChevronRightIcon />
    </template>
    <template #double-right-icon>
      <ChevronDoubleRightIcon />
    </template>
    
    <!-- 테이블 영역 -->
    <template #table>
      <Table class="order-table">
        <TableHead>
          <tr>
            <th><input type="checkbox" v-model="selectAll" @change="handleSelectAll"></th>
            <th>주문번호</th>
            <th>주문일시</th>
            <th>고객명</th>
            <th>주문상품</th>
            <th>결제금액</th>
            <th>상태</th>
            <th>비고</th>
            <th>액션</th>
          </tr>
        </TableHead>
        <TableBody>
          <tr v-for="item in items" :key="item.id" @click="handleItemClick(item)">
            <td @click.stop><input type="checkbox" v-model="item.selected"></td>
            <td>{{ item.orderNumber }}</td>
            <td>{{ formatDateTime(item.orderDate) }}</td>
            <td>{{ item.customerName }}</td>
            <td>{{ item.productName }}</td>
            <td>{{ formatPrice(item.totalAmount) }}</td>
            <td>{{ getStatusText(item.status) }}</td>
            <td>{{ item.note }}</td>
            <td>
              <ActionButton @click.stop="handleEdit(item)" class="edit">수정</ActionButton>
              <ActionButton @click.stop="handleDelete(item)" class="delete">삭제</ActionButton>
            </td>
          </tr>
        </TableBody>
      </Table>
    </template>
    
    <!-- 모달 영역 -->
    <template #modals>
      <ModalBackdrop v-if="showAddModal" @click.self="showAddModal = false">
        <ModalContainer>
          <ModalHeader>
            주문 추가
            <button class="close-button" @click="showAddModal = false">✕</button>
          </ModalHeader>
          <ModalBody>
            <form class="order-form">
              <!-- 폼 내용 -->
            </form>
          </ModalBody>
          <ModalFooter>
            <ModalButton @click="submitAddForm" class="primary">등록</ModalButton>
            <ModalButton @click="showAddModal = false" class="cancel">취소</ModalButton>
          </ModalFooter>
        </ModalContainer>
      </ModalBackdrop>
      
      <ModalBackdrop v-if="showEditModal" @click.self="showEditModal = false">
        <ModalContainer>
          <ModalHeader>
            주문 수정
            <button class="close-button" @click="showEditModal = false">✕</button>
          </ModalHeader>
          <ModalBody>
            <form class="order-form">
              <!-- 폼 내용 -->
            </form>
          </ModalBody>
          <ModalFooter>
            <ModalButton @click="submitEditForm" class="primary">수정</ModalButton>
            <ModalButton @click="showEditModal = false" class="cancel">취소</ModalButton>
          </ModalFooter>
        </ModalContainer>
      </ModalBackdrop>
    </template>
  </BaseOrderTemplate>
</template>

<script>
import BaseOrderTemplate from './BaseOrderTemplate.vue';
import VueDatepicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';

// Import icons
import CartIcon from 'vue-material-design-icons/Cart.vue';
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
import TextSearchVariantIcon from 'vue-material-design-icons/TextSearchVariant.vue';
import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue';
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue';
import ChevronDoubleLeftIcon from 'vue-material-design-icons/ChevronDoubleLeft.vue';
import ChevronDoubleRightIcon from 'vue-material-design-icons/ChevronDoubleRight.vue';
import MicrosoftExcelIcon from 'vue-material-design-icons/MicrosoftExcel.vue';

// Import styled components
import * as BaseOrderTemplateCss from '../assets/styles/BaseOrderTemplateCss.js';

export default {
  name: 'OrderTemplateExample',
  components: {
    BaseOrderTemplate,
    VueDatepicker,
    // Icons
    CartIcon,
    MagnifyIcon,
    TextSearchVariantIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    MicrosoftExcelIcon,
    // Styled components
    ...BaseOrderTemplateCss
  },
  data() {
    return {
      // 검색 관련 데이터
      searchQuery: '',
      
      // 페이지네이션 관련 데이터
      currentPage: 1,
      totalPages: 1,
      pageSize: 10,
      
      // 날짜 관련 데이터
      startDate: new Date(),
      endDate: new Date(),
      
      // 필터 관련 데이터
      filters: {
        status: '',
        category: '',
        paymentMethod: ''
      },
      
      // 상태 관련 데이터
      activeStatus: 0,
      statusCounts: {
        all: 0,
        unconfirm: 0,
        confirm: 0,
        release: 0
      },
      
      // 테이블 데이터
      items: [],
      
      // 모달 관련 데이터
      showAddModal: false,
      showEditModal: false,
      currentItem: null,
      
      // 선택 관련 데이터
      selectAll: false,
      
      // 필터 관련 데이터
      filterNames: {
        status: '상태',
        category: '카테고리',
        paymentMethod: '결제방법'
      },
      filterValues: {
        status: {
          1: '미확인',
          2: '확인',
          3: '출고'
        },
        paymentMethod: {
          'card': '카드',
          'bank': '계좌이체',
          'cash': '현금'
        }
      }
    };
  },
  computed: {
    activeFilters() {
      const result = {};
      for (const key in this.filters) {
        if (this.filters[key]) {
          result[key] = this.filters[key];
        }
      }
      return result;
    }
  },
  methods: {
    // 검색 관련 메소드
    handleSearch() {
      this.currentPage = 1;
      this.fetchData();
    },
    
    showSearchPopup() {
      // 상세 검색 팝업 표시
      alert('상세 검색 기능 구현 예정');
    },
    
    // 페이지네이션 관련 메소드
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchData();
    },
    
    handlePageSizeChange() {
      this.currentPage = 1;
      this.fetchData();
    },
    
    // 상태 변경 메소드
    handleStatusChange(status) {
      this.activeStatus = status;
      this.filters.status = status === 0 ? '' : status;
      this.fetchData();
    },
    
    // 날짜 관련 메소드
    handleDateSearch() {
      this.fetchData();
    },
    
    setDateRange(range) {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const date = today.getDate();
      const day = today.getDay(); // 0: 일요일, 1: 월요일, ... 6: 토요일
      
      // 주간 날짜 계산을 위한 변수들
      let monday, lastMonday;
      
      switch (range) {
        case 'today':
          this.startDate = new Date(year, month, date);
          this.endDate = new Date(year, month, date);
          break;
        case 'yesterday':
          this.startDate = new Date(year, month, date - 1);
          this.endDate = new Date(year, month, date - 1);
          break;
        case 'thisWeek':
          // 이번 주 월요일부터 일요일까지
          monday = new Date(year, month, date - day + (day === 0 ? -6 : 1));
          this.startDate = monday;
          this.endDate = new Date(year, month, monday.getDate() + 6);
          break;
        case 'lastWeek':
          // 저번 주 월요일부터 일요일까지
          lastMonday = new Date(year, month, date - day + (day === 0 ? -6 : 1) - 7);
          this.startDate = lastMonday;
          this.endDate = new Date(year, month, lastMonday.getDate() + 6);
          break;
        case 'thisMonth':
          this.startDate = new Date(year, month, 1);
          this.endDate = new Date(year, month + 1, 0);
          break;
        case 'lastMonth':
          this.startDate = new Date(year, month - 1, 1);
          this.endDate = new Date(year, month, 0);
          break;
        case 'all':
          this.startDate = new Date(1999, 0, 1);
          this.endDate = new Date(2099, 0, 1);  
          break;
      }
      
      this.fetchData();
    },
    
    // 필터 관련 메소드
    handleFilterChange(filter) {
      this.filters = { ...this.filters, ...filter };
      this.fetchData();
    },
    
    removeFilter(key) {
      this.filters[key] = '';
      
      if (key === 'status') {
        this.activeStatus = 0;
      }
      
      this.fetchData();
    },
    
    getFilterName(key) {
      return this.filterNames[key] || key;
    },
    
    getFilterValue(key, value) {
      return (this.filterValues[key] && this.filterValues[key][value]) || value;
    },
    
    // 데이터 조회 메소드
    async fetchData() {
      try {
        // API 호출 대신 임시 데이터 생성
        this.items = Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          orderNumber: `ORD-${String(i + 1).padStart(5, '0')}`,
          orderDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          customerName: `고객 ${i + 1}`,
          productName: `상품 ${i + 1}`,
          totalAmount: Math.floor(Math.random() * 10000) * 100,
          status: Math.floor(Math.random() * 3) + 1,
          note: Math.random() > 0.7 ? `비고 ${i + 1}` : '',
          selected: false
        }));
        
        // 페이지네이션 정보 설정
        this.totalPages = 5;
        
        // 상태별 카운트 설정
        this.statusCounts = {
          all: 50,
          unconfirm: 15,
          confirm: 20,
          release: 15
        };
      } catch (error) {
        console.error('데이터 조회 중 오류 발생:', error);
      }
    },
    
    // 선택 관련 메소드
    handleSelectAll() {
      this.items.forEach(item => {
        item.selected = this.selectAll;
      });
    },
    
    // 아이템 관련 메소드
    handleItemClick(item) {
      this.currentItem = item;
      this.showEditModal = true;
    },
    
    handleEdit(item) {
      this.currentItem = item;
      this.showEditModal = true;
    },
    
    handleDelete(item) {
      if (confirm(`주문 '${item.orderNumber}'을 삭제하시겠습니까?`)) {
        // 삭제 로직 구현
        this.fetchData();
      }
    },
    
    handleItemAction(action, item) {
      switch (action) {
        case 'edit':
          this.handleEdit(item);
          break;
        case 'delete':
          this.handleDelete(item);
          break;
      }
    },
    
    // 기타 메소드
    printSelected() {
      const selectedItems = this.items.filter(item => item.selected);
      if (selectedItems.length === 0) {
        alert('출력할 주문을 선택해주세요.');
        return;
      }
      
      alert(`${selectedItems.length}개의 주문서를 출력합니다.`);
    },
    
    exportToExcel() {
      alert('엑셀 다운로드 기능 구현 예정');
    },
    
    submitAddForm() {
      // 주문 추가 폼 제출 로직
      this.showAddModal = false;
      this.fetchData();
    },
    
    submitEditForm() {
      // 주문 수정 폼 제출 로직
      this.showEditModal = false;
      this.fetchData();
    },
    
    // 유틸리티 메소드
    formatDateTime(date) {
      if (!date) return '';
      
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    
    formatPrice(price) {
      return new Intl.NumberFormat('ko-KR').format(price) + '원';
    },
    
    getStatusText(status) {
      const statusTexts = {
        1: '미확인',
        2: '확인',
        3: '출고'
      };
      return statusTexts[status] || '알 수 없음';
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style scoped>
/* 필요한 추가 스타일 */
.page-size-select {
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 5px;
}

.page-size-text {
  font-size: 0.875rem;
}

/* 모달 관련 */
.close-button {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #6c757d;
}

.order-form {
  padding: 10px;
}
</style> 