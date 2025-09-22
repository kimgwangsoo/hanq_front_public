<template>
  <!-- Modals -->
  <BaseOrderTemplate :search-query="searchQuery" :current-page="currentPage" :total-pages="totalPages"
    :items="clientItems" :filters="activeFilters" search-placeholder="검색어를 입력하세요"
    @update:search-query="searchQuery = $event" @page-change="handlePageChange"
    @show-search-popup="showSwalDetailSearch" @remove-filter="removeFilter" @clear-filters="clearFilters"
    ref="baseTemplate">

    <!-- Title Title -->
    <template #title-icon>
      <span class="material-icons">emoji_people</span>
    </template>
    <template #title-text>
      기초수급자 관리
    </template>

    <!-- Header Buttons -->
    <template #header-buttons>
      <DateInput type="date" />
      <FlexDiv>~</FlexDiv>
      <DateInput type="date" />
      <BlueBtn>날짜조회</BlueBtn>
      <BlueBtn>선택 일괄 계약서 출력</BlueBtn>
      <BlueBtn>선택 일괄 팩스 전송</BlueBtn>
    </template>

    <!-- Header Info -->
    <template #header-info>
      <FlexDiv>
        <FlexDiv class="marginRight10">
          <TriangleOutline class="greenFont" />
          <span> : &nbsp; 취소계약완료</span>
        </FlexDiv>
        <FlexDiv class="marginRight10">
          <Check class="greenFont" />
          <span> : &nbsp; 공단계약완료</span>
        </FlexDiv>
        <FlexDiv class="marginRight10">
          <Close class="redFont" />
          <span> : &nbsp; 공단미계약</span>
        </FlexDiv>
      </FlexDiv>
    </template>

    <template #table>
      <TableContainer>
        <DataTable>
          <thead>
            <tr>
              <th>일자</th>
              <th>수급자성함</th>
              <th>인정번호</th>
              <th>생년월일</th>
              <th>대상</th>
              <th>등급</th>
              <th>본인부담율</th>
              <th>품목명</th>
              <th>수량</th>
              <th>보호자성함</th>
              <th>관계</th>
              <th>연락처</th>
              <th>센터명</th>
              <th>담당자</th>
              <th>메모</th>
              <th>접수기관(시/군/구)</th>
              <th>승인</th>
              <th>공단계약</th>
            </tr>
          </thead>

          <tbody>
            <tr :class="getRowClass(item)">
              <td>2025-07-15 12:26:21</td>
              <td>이점악</td>
              <td>L0010710614</td>
              <td>1933-05-31</td>
              <td>의료급여</td>
              <td>4등급</td>
              <td>6.0%</td>
              <td>NSBS-4WAY88</td>
              <td>1</td>
              <td>본인</td>
              <td>010132456789</td>
              <td>센터명</td>
              <td>담당자</td>
              <td></td>
              <td>...</td>
              <td></td>
              <td>
                
              </td>
            </tr>
          </tbody>

        </DataTable>
      </TableContainer> 
    </template>
  </BaseOrderTemplate>

</template>

<script>
import { ref, computed, reactive } from 'vue';
import BaseOrderTemplate from '@/components/BaseOrderTemplate.vue'
import * as PublicCss from '@/assets/styles/public.js'
import TriangleOutline from 'vue-material-design-icons/TriangleOutline.vue'
import Check from 'vue-material-design-icons/Check.vue'
import Close from 'vue-material-design-icons/Close.vue'

export default {
  name: 'ZeroClientPage',
  components: {
    BaseOrderTemplate,
    ...PublicCss,
    TriangleOutline,
    Check,
    Close,
  },
  setup() {
    const baseTemplate = ref(null);
    const searchQuery = ref('');
    const currentPage = ref(1);
    const totalPages = ref(1);
    const clientItems = ref([]);

    const detailSearch = reactive({
      // 품목명
      productNm: '',
      // 센터명
      centerNm: '',
      // 담당자
      manager: '',
      // 연락처1
      phone1: '',
    })

    const getRowClass = (item) => {
      switch (item) {
        case '일반':
          return 'green';
        case '감경':
          return 'yellow';
        case '의료급여':
          return 'blue';
        case '기초':
          return 'red';
        default:
          return '';
      }
    }

    // 활성화된 필터 계산 (detailSearch에서 값이 있는 항목만)
    const activeFilters = computed(() => {
      const result = {};
      Object.entries(detailSearch).forEach(([key, value]) => {
        if (value && value.trim() !== '') {
          result[key] = value;
        }
      });
      return result;
    })

    // 특정 필터 제거
    const removeFilter = (key) => {
      detailSearch[key] = '';
    }

    // 모든 필터 초기화
    const clearFilters = () => {
      Object.keys(detailSearch).forEach(key => {
        detailSearch[key] = '';
      });
    }

    // 페이지 변경 처리
    const handlePageChange = (page) => {
      currentPage.value = page;
      // 여기에 페이지 변경 시 데이터를 가져오는 로직을 추가할 수 있습니다.
    }

    const showSwalDetailSearch = () => {
      baseTemplate.value.showSwalModal({
        title: '상세검색',
        width: "25%",
        confirmButtonText: '검색',
        html: `
          <div class="swal-search-form">
            <div class="swal-form-group">
              <label>품목명</label>
              <input id="swal-productNm" class="swal2-input" placeholder="품목명">
            </div>
            <div class="swal-form-group">
              <label>센터명</label>
              <input id="swal-centerNm" class="swal2-input" placeholder="센터명">
            </div>
            <div class="swal-form-group">
              <label>담당자</label>
              <input id="swal-manager" class="swal2-input" placeholder="담당자">
            </div>
            <div class="swal-form-group">
              <label>연락처</label>
              <input id="swal-phone1" class="swal2-input" placeholder="연락처">
            </div>
          </div>
        `,
        preConfirm: () => {
          return {
            productNm: document.getElementById('swal-productNm').value,
            centerNm: document.getElementById('swal-centerNm').value,
            manager: document.getElementById('swal-manager').value,
            phone: document.getElementById('swal-phone1').value,
          };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('검색 조건:', result.value);
          // 검색 조건을 detailSearch에 복사
          Object.assign(detailSearch, result.value);
        }
      });
    }

    return {
      baseTemplate,
      searchQuery,
      currentPage,
      totalPages,
      clientItems,
      activeFilters,
      removeFilter,
      clearFilters,
      showSwalDetailSearch,
      handlePageChange,
      getRowClass,
    };
  },
};
</script>