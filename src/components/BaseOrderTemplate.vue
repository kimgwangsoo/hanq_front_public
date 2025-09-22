<template>
  <MainContainer>
    <!-- Header Title -->
    <slot name="title-area">
      <TitleArea>
        <TitleIcon>
          <slot name="title-icon"></slot>
        </TitleIcon>
        <TitleText>
          <slot name="title-text">기본 제목</slot>
        </TitleText>
      </TitleArea>
    </slot>

    <!-- Search bar -->
    <slot name="search-area">
      <SearchArea>
        <SearchInput :value="searchQuery" @input="$emit('update:searchQuery', $event.target.value)"
          :placeholder="searchPlaceholder" @keyup.enter="$emit('search')" />
        <SearchButton @click="$emit('search')">
          <Magnify />
        </SearchButton>
        <SearchButton v-if="detailSearchButton" @click="$emit('show-search-popup')">
          <TextSearchVariant />
        </SearchButton>
        <SearchButton v-if="refreshButton" @click="$emit('refresh')">
          <Refresh />
        </SearchButton>
      </SearchArea>
    </slot>

    <!-- Filter Area -->
    <slot name="filter-area">
      <FilterArea v-if="hasFilters">
        <slot name="filters">
          <template v-for="(value, key) in activeFilters" :key="key">
            <FilterTag v-if="value">
              {{ getFilterLabel(key) }}: {{ getFilterValue(key, value) }}
              <span class="filter-remove" @click="$emit('remove-filter', key)">&times;</span>
            </FilterTag>
          </template>
          <FilterClearButton v-if="Object.keys(activeFilters).length > 0" @click="$emit('clear-filters')">
            모든 필터 지우기
          </FilterClearButton>
        </slot>
      </FilterArea>
    </slot>

    <!-- Header Buttons -->
    <slot name="header-area">
      <HeaderArea>
        <HeaderButtonArea>
          <slot name="header-buttons"></slot>
        </HeaderButtonArea>
        <HeaderInfoArea :class="headerInfoClass + ' mobileNone'">
          <slot name="header-info"></slot>
        </HeaderInfoArea>
      </HeaderArea>
    </slot>

    <!-- Content Area (Tab buttons, Table, etc) -->
    <slot name="content-area">
      <!-- Tab Buttons -->
      <TabButtonArea>
        <slot name="tab-buttons"></slot>
      </TabButtonArea>

      <!-- Pagination -->
      <PaginationArea v-if="showPage">
        <slot name="pagination-area">
        <PageLeftArea>
          <slot name="pagination-left"></slot>
        </PageLeftArea>
        <PageCenterArea>
          <slot name="pagination-center">
            <PageButton class="double-left" @click="$emit('page-change', currentPage - 10)"
              :disabled="currentPage - 10 < 1">
              <i class="material-icons">keyboard_double_arrow_left</i>
            </PageButton>
            <PageButton @click="$emit('page-change', currentPage - 1)" :disabled="currentPage === 1">
              <i class="material-icons">chevron_left</i>
            </PageButton>
            <PageButton v-for="page in visiblePages" :key="page" @click="$emit('page-change', page)"
              :class="{ 'current-page': page === currentPage }">
              {{ page }}
            </PageButton>
            <PageButton @click="$emit('page-change', currentPage + 1)" :disabled="currentPage === totalPages">
              <i class="material-icons">chevron_right</i>
            </PageButton>
            <PageButton class="double-right" @click="$emit('page-change', currentPage + 10)"
              :disabled="currentPage + 10 > totalPages">
              <i class="material-icons">keyboard_double_arrow_right</i>
            </PageButton>
          </slot>
        </PageCenterArea>
        <PageRightArea>
          <slot name="pagination-right"></slot>
        </PageRightArea>
        </slot>
      </PaginationArea>

      <!-- Table -->
      <TableArea>
        <slot name="table"></slot>
      </TableArea>
    </slot>

    <!-- Actions -->
    <slot name="actions">
      <ActionArea>
        <slot name="action-buttons"></slot>
      </ActionArea>
    </slot>

    <!-- 상세 검색 Modals -->
    <slot name="modals"></slot>
  </MainContainer>
</template>

<script>
import * as PublicCss from '@/assets/styles/public.js';
import * as BaseOrderTemplateCss from '../assets/styles/BaseOrderTemplateCss.js';
import Magnify from 'vue-material-design-icons/Magnify.vue';
import TextSearchVariant from 'vue-material-design-icons/TextSearchVariant.vue';
import Refresh from 'vue-material-design-icons/Refresh.vue';
import Swal from 'sweetalert2';

export default {
  name: 'BaseOrderTemplate',
  components: {
    ...BaseOrderTemplateCss,
    ...PublicCss,
    Magnify,
    TextSearchVariant,
    Refresh
  },
  props: {
    // 검색 관련 Props
    searchQuery: {
      type: String,
      default: ''
    },
    // 페이지네이션 관련 Props
    showPage: {
      type: Boolean,
      default: true
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    },
    // 날짜 관련 Props
    startDate: {
      type: Date,
      default: () => new Date()
    },
    endDate: {
      type: Date,
      default: () => new Date()
    },
    // 필터 관련 Props
    filters: {
      type: Object,
      default: () => ({})
    },
    // 테이블 데이터 관련 Props
    items: {
      type: Array,
      default: () => []
    },
    // 페이지 크기
    pageSize: {
      type: [Number, String],
      default: 10
    },
    // 상태 탭
    activeStatus: {
      type: [Number, String],
      default: 0
    },
    // 검색 입력창 플레이스홀더
    searchPlaceholder: {
      type: String,
      default: '검색어를 입력하세요'
    },
    // 상세 검색 버튼 표시 여부
    detailSearchButton: {
      type: Boolean,
      default: true
    },
    // 새로고침 버튼 표시 여부
    refreshButton: {
      type: Boolean,
      default: false
    },
    // 헤더 정보 영역 클래스
    headerInfoClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    visiblePages() {
      let start = Math.floor((this.currentPage - 1) / 10) * 10 + 1;
      let end = Math.min(start + 9, this.totalPages);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
    hasFilters() {
      return Object.keys(this.filters).length > 0;
    },
    activeFilters() {
      return this.filters;
    }
  },
  methods: {
    // SweetAlert2 모달 표시 메소드
    showSwalModal(options) {
      const defaultOptions = {
        showCancelButton: true,
        confirmButtonText: options.confirmButtonText || '확인',
        confirmButtonColor: options.confirmButtonColor || '#3085d6',
        cancelButtonText: options.cancelButtonText || '닫기',
        showDenyButton: options.showDenyButton || false,
        denyButtonText: options.denyButtonText || '추가 기능',
        denyButtonColor: options.denyButtonColor || '#3085d6',
      };
      
      // 추가 버튼 설정이 있는 경우
      if (options.showExtraButton) {
        return Swal.fire({
          ...defaultOptions,
          ...options,
          confirmButtonText: defaultOptions.confirmButtonText,
          cancelButtonText: defaultOptions.cancelButtonText,
          denyButtonText: defaultOptions.denyButtonText,
        });
      }

      return Swal.fire({
        ...defaultOptions,
        ...options,
        confirmButtonText: defaultOptions.confirmButtonText,
        cancelButtonText: defaultOptions.cancelButtonText
      });
    },
    showLoading() {
      Swal.showLoading();
      Swal.update({
        background: '#fff',
        opacity: 0.1
      });
    },
    hideLoading() {
      Swal.close();
    },
    getFilterLabel(key) {
      // 필터 키에 대한 한국어 레이블 매핑
      const labelMap = {
        address: '주소',
        bcode: '바코드',
        centerName: '센터명',
        contractState: '계약상태',
        deliveryMethod: '배송방법',
        deliveryState: "배송상태",
        manager: '담당자',
        memo: "메모",
        pname: "품목명",
        phone1: '연락처1',
      };

      // 매핑된 레이블이 있으면 사용, 없으면 첫 글자를 대문자로 변환
      return labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
    },
    
    getFilterValue(key, value) {
      // 필터 값에 대한 매핑을 props로 받아서 처리
      if (this.$parent && this.$parent.getFilterValue) {
        return this.$parent.getFilterValue(key, value);
      }
      // 매핑이 없으면 원래 값 반환
      return value;
    }
  },
  emits: [
    'update:searchQuery',
    'search',
    'show-search-popup',
    'page-change',
    'status-change',
    'date-range-change',
    'filter-change',
    'select-all',
    'item-click',
    'item-action',
    'swal-confirm',
    'remove-filter',
    'clear-filters'
  ]
}
</script>

<style>
/* SweetAlert2 전역 스타일 */
.swal-search-form {
  padding: 10px;
  @media (max-width: 768px) {
    padding: 0;
  }
}

.swal-form-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.swal-form-group label {
  width: 100px;
  text-align: right;
  margin-right: 20px;
  font-weight: bold;
  font-size: 16px;
}

.swal-form-group .swal2-input {
  flex: 1;
  margin: 0;
  height: 40px;
  font-size: 16px;
}

/* 수급자일괄등록 모달 스타일 */
.swal-description {
  font-size: 16px;
  margin-bottom: 10px;
  color: #e74c3c;
}

.swal-button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.swal-excel-btn {
  background-color: #fff;
  color: #1a2136;
  border: 1px solid #1a2136;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #1a2136;
    color: #fff;
  }
}

/* 적용구간 만료예정자 모달 스타일 */
.section-selection {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.section-select {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-right: 5px;
}

.swal-btn {
  padding: 6px 12px;
  border: 1px solid #1a2136;
  background-color: #1a2136;
  color: #fff;
  border-radius: 4px;
  font-size: 16px;
  margin-right: 5px;

  &.green {
    background-color: #306e48;
    border: 1px solid #306e48;
    color: #fff;
  }

  &:hover {
    background-color: #fff;
    color: #1a2136;
    border: 1px solid #1a2136;
  }
}

.select-label {
  margin-right: 15px;
  font-size: 16px;
}

.search-section {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.search-label {
  font-size: 16px;
  margin-right: 10px;
}

.section-input {
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.section-table {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
}

.expiring-table-container {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
}

.expiring-table {
  width: 100%;

  th,
  td {
    padding: 6px;
  }

  th {
    position: sticky;
    top: 0;
    background-color: #f2f2f2;
    box-shadow: inset 10px 0 0 1000px #f2f2f2;
  }

  tr {
    border: 1px solid #ddd;

    &:hover {
      background-color: #f2f2f2;
      cursor: pointer;
    }

    &.noneHover {
      &:hover {
        background-color: transparent;
        cursor: default;
      }
    }
  }
}

/* 엑셀 내보내기 모달 스타일 */
.excel-button-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  width: 100%;
}

.excel-export-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px 20px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.excel-export-btn:hover {
  background-color: #f8f8f8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 수급자 상담내역 모달 스타일 */
.consultation-header {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 15px;
}

.consultation-info {
  font-size: 16px;
  font-weight: bold;
}

.search-tab {
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 15px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 5px;

  &.active {
    background-color: #1a2136;
    color: white;
    border-color: #1a2136;
  }
}

.search-button {
  background-color: #1a2136;
  color: #fff;
  border: 1px solid #1a2136;
  border-radius: 4px;
  padding: 6px 15px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #1a2136;
  }
}

/* 소독 관리 스타일 */
.disinfection-tabs {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  width: 100%;
  border-radius: 5px;

  button {
    padding: 10px;
    width: 25%;
    border: 1px solid #ddd;
    background-color: #fff;
    cursor: pointer;
    font-weight: bold;
    font-size: 18px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

    &.active {
      border: 1px solid #1a2136;
      background-color: #1a2136;
      color: white;
    }
  }
}

.tab-pane {
  display: none;

  &.active {
    display: block;
  }
}

/* 공지사항 모달 스타일 */

.notice-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  white-space: pre-wrap;
  word-break: break-all;
  line-height: 2;
}

.notice-date {
  margin-top: -10px;
  margin-bottom: 15px;
}
</style>