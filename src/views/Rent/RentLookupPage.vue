<template>
  <!-- 대여정보 상세창 -->
  <ModalPage v-model:show="showModalRentDetail" 
  :height="modal_height" :width="'90%'" 
  :parent="'rentLookup'"
  @close="fetchRentItems"
  >
    <ModalRentDetail :show="showModalRentDetail" 
    @update:show="showModalRentDetail = $event"
    @close="showModalRentDetail = false"
    @goOrderModifyPage="() => { showModalRentDetail = false; showModifyModal = true; }"
    :rentItem="selectedRentItem" />
  </ModalPage>

 <!-- 주문서 수정 -->
 <ModalPage
    v-model:show="showModifyModal"
    :height="modal_height"
    :parent="'order'"
    @close="closeModal"
  >
    <OrderModifyPage
      :orderId="selectedRentItem.order.id"
      @close="closeModal"
      @show-rent-detail="() => { showModifyModal = false; showModalRentDetail = true; }"
    />
  </ModalPage>

  
  <!-- 문자발송 -->
  <ModalPage v-model:show="showModalSms" 
  :height="modal_height" :width="'90%'" 
  :parent="'rentLookup'">
    <ModalSms :show="showModalSms" 
    @update:show="showModalSms = $event"
    @close="showModalSms = false" />
  </ModalPage>

  <!-- Modals -->
   <!-- 내구연한관리 -->
  <ModalPage v-model:show="showModalDurability" 
  :height="modal_height" :width="modal_width" 
  :parent="'rentLookup'">
    <ModalDurability :show="showModalDurability" 
    @update:show="showModalDurability = $event"
    @close="showModalDurability = false" />
  </ModalPage>

  <BaseOrderTemplate 
    :search-query="searchQuery" 
    :current-page="currentPage" 
    :total-pages="totalPages"
    :items="rentItems" 
    :filters="activeFilters" 
    search-placeholder="고객명, 연락처, 주소 검색"
    @search="fetchRentItems"
    @update:searchQuery="searchQuery = $event" 
    @show-search-popup="showSwalDetailSearch"
    @remove-filter="removeFilter" 
    @clear-filters="clearFilters"
    @page-change="handlePageChange"
    ref="baseTemplate"
    >
    
    <!-- Title Area -->
    <template #title-icon>
      <span class="material-icons">accessible</span>
    </template>
    <template #title-text>
      대여 관리
    </template>

    <!-- Header Buttons -->
    <template #header-buttons>
      <DateInput type="date" v-model="rentStart" />
      <FlexDiv>~</FlexDiv>
      <DateInput type="date" v-model="rentEnd" />
      <BlueBtn @click="fetchRentItems()">날짜조회</BlueBtn>
      <BlueBtn class="mobileNone" @click="showModalSms = true">문자발송</BlueBtn>
      <BlueBtn class="mobileNone" @click="showSendHistory">발송내역</BlueBtn>
      <BlueBtn class="mobileNone" @click="showDisinfectionManagement">소독관리</BlueBtn>
      <BlueBtn class="mobileNone" @click="showModalDurability = true">내구연한관리</BlueBtn>
      <GreenBtn class="mobileNone">
        <MicrosoftExcel />&nbsp;엑셀변환
      </GreenBtn>
    </template>
    <!-- Header Info -->
    <template #header-info>
      <FlexDiv>
          <FlexDiv>
            <TriangleOutline style="color: green"/>
            <span> : 취소계약완료</span>
          </FlexDiv>
          <FlexDiv>
            <Check style="color: green"/>
            <span> : 공단계약완료</span>
          </FlexDiv>
          <FlexDiv>
            <Close style="color: red"/>
            <span> : 공단미계약</span>
          </FlexDiv>
      </FlexDiv>
    </template>

    <!-- Content Area (Tab buttons, Table, etc) -->
    <!-- Tab Buttons -->
    <template #tab-buttons>
      <DashboardContainer>
        <DashboardItem>
          <DashboardTitle>전체 대여 중</DashboardTitle>
          <DashboardValue>
            <!-- <div v-if="pitemCounts && pitemCounts.length > 0"> -->
              <span v-for="(item, index) in pitemCounts" :key="index">
                {{ item.pitem }}: {{ item.count }}개
                <!-- <br v-if="index < pitemCounts.length - 1"> -->
              </span>
            <!-- </div> -->
            <!-- <div v-else>
              데이터가 없습니다
            </div> -->
          </DashboardValue>
        </DashboardItem>
        <!-- <DashboardItem>
          <DashboardTitle>대여중(내구연한만료)</DashboardTitle>
          <DashboardValue>
            <span>전동침대 : {{ todayStartItems || 1 }}개</span>
            <span>휠체어 : {{ todayStartItems || 1 }}개</span>
          </DashboardValue>
        </DashboardItem> -->
        <!-- <DashboardItem>
          <DashboardTitle>소독완료 재고</DashboardTitle>
          <DashboardValue>
            <span>전동침대 : {{ todayStartItems || 1 }}개</span>
            <span>휠체어 : {{ todayStartItems || 1 }}개</span>
          </DashboardValue>
        </DashboardItem>
        <DashboardItem>
          <DashboardTitle>미소독 재고</DashboardTitle>
          <DashboardValue>
            <span>전동침대 : {{ todayEndItems || 0 }}개</span>
            <span>휠체어 : {{ todayEndItems || 0 }}개</span>
          </DashboardValue>
        </DashboardItem> -->
      </DashboardContainer>
    </template>
    <!-- Pagination -->

    <!-- Table -->
    <template #table>
      <TableContainer>
        <DataTable>
          <thead>
            <tr>
              <th>등록일자</th>
              <th>수급자<br class="deskNone">성함</th>
              <th>인정번호</th>
              <th class="mobileNone">대상</th>
              <th class="mobileNone">본인부담율</th>
              <th>품목명</th>
              <th>대여<br class="deskNone">시작일</th>
              <th>대여<br class="deskNone">종료일</th>
              <th class="mobileNone">내구연한만료일</th>
              <th class="mobileNone">배송/설치주소</th>
              <th class="mobileNone">보호자성함</th>
              <th class="mobileNone">센터명</th>
              <th class="mobileNone">담당자</th>
              <th class="mobileNone">CMS</th>
              <th class="mobileNone">대대여</th>
              <th class="mobileNone">욕구사정</th>
              <th>대여<br class="deskNone">상태</th>
              <th class="mobileNone">배송상태</th>
              <th>공단<br class="deskNone">계약</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in rentItems" :key="index" @click="openModalRentDetail(item)">
              <td>{{ item.cancled ? item.cancled.substring(0, 10) : '' }}</td>
              <td>{{ item.order.client.name }}</td>
              <td>{{ item.order.client.number }}</td>
              <td class="mobileNone">{{ item.order.target }}</td>
              <td class="mobileNone">{{ item.order.sale }}</td>
              <td>
                <div v-for="(product, pIndex) in item.order.orderProducts" :key="pIndex">
                  {{ product.product.pname }}
                </div>
              </td>
              <td>{{ item.rentStart }}</td>
              <td>{{ item.rentEnd }}</td>
              <td class="mobileNone">
                <div v-if="item.durabilityInfo && item.durabilityInfo.length > 0">
                  <div v-for="(durability, index) in item.durabilityInfo" :key="index">
                    {{ durability?.endDate }}
                  </div>
                </div>
              </td>
              <td class="mobileNone">{{ item.order.address }} {{ item.order.addressDetail }}</td>
              <td class="mobileNone">{{ item.order.guardName || '본인' }}</td>
              <td class="mobileNone">{{ item.order.centerName }}</td>
              <td class="mobileNone">{{ item.order.manager }}</td>
              <td></td>
              <!--td :class="'mobileNone '+ getCmsStClass(item.cmsState)">{{ getCmsSt(item.cmsState) }}</td-->
              <td class="mobileNone">{{ item.order.reRent }}</td>
              <td class="mobileNone">{{ item.order.needAssessment }}</td>
              <td :class="getRowClass(item.rentStatus)">{{ item.rentStatus }}</td>
              <td class="mobileNone" :class="getRowClass(getDeliveryStatus(item.order.deliveryState))">{{ getDeliveryStatus(item.order.deliveryState) }}</td>
              <td>
                <TriangleOutline v-if="item.order.contractState == 'cok'" style="color: green"/>
                <Check v-else-if="item.order.contractState == 'ok'" style="color: green"/>
                <Close v-else style="color: red"/>
              </td>
            </tr>
          </tbody>
        </DataTable>
      </TableContainer>
    </template>
  </BaseOrderTemplate>
</template>

<script>
import { ref, reactive, computed, onMounted, getCurrentInstance } from 'vue'
import BaseOrderTemplate from '@/components/BaseOrderTemplate.vue'
import * as RentLookupCss from '@/assets/styles/rentLookUp/RentLookupCss.js'
import * as PublicCss from '@/assets/styles/public.js'
import MicrosoftExcel from 'vue-material-design-icons/MicrosoftExcel.vue'
import TriangleOutline from 'vue-material-design-icons/TriangleOutline.vue'
import Check from 'vue-material-design-icons/Check.vue'
import Close from 'vue-material-design-icons/Close.vue'
import Swal from 'sweetalert2'
import ModalPage from '@/components/modal/ModalPage.vue'
import OrderModifyPage from '@/components/OrderModifyPage.vue'
import ModalDurability from '@/components/modal/durability/ModalDurability.vue'
import ModalRentDetail from '@/components/modal/rentDetail/ModalRentDetail.vue'
import ModalSms from '@/components/modal/sms/ModalSms.vue'
import { getRentList } from '@/api/rent'
import { sendkakao_get_url } from '@/api/common'
import { useStore } from 'vuex'
export default {
  name: 'RentLookupPage',
  components: {
    BaseOrderTemplate,
    ...RentLookupCss,
    ...PublicCss,
    MicrosoftExcel, 
    TriangleOutline,
    Check,
    Close,
    ModalPage,
    OrderModifyPage,
    ModalDurability,
    ModalRentDetail,
    ModalSms,
  },
  setup() {
    const instance = getCurrentInstance();
    const root = instance?.appContext.config.globalProperties;  
    const store = useStore();
    const user = store.state.user;
    // 검색 및 페이지네이션 관련 상태
    const searchQuery = ref('') // 검색어
    const currentPage = ref(1) // 현재 페이지
    const pageSize = ref(10) // 페이지당 표시할 항목 수
    const totalPages = ref(1) // 전체 페이지 수
    const baseTemplate = ref(null) // 기본 템플릿 참조
    
    // 모달 관련 상태
    const modal_height = ref('78%') // 모달 높이
    const modal_width = ref('80%') // 모달 너비
    const showModalDurability = ref(false) // 내구성 모달 표시 여부
    const showModalSms = ref(false) // SMS 모달 표시 여부
    const showModalRentDetail = ref(false) // 대여 상세 모달 표시 여부
    const showModifyModal = ref(false) // 주문서 수정 모달 표시 여부
    
    // 대여 기간 필터
    const rentStart = ref('') // 대여 시작일
    const rentEnd = ref('') // 대여 종료일
    
    // 데이터 상태
    const rentItems = ref([]); // 대여 항목 목록
    const pitemCounts = ref([]); // 품목 카운트
    const selectedRentItem = ref(null); // 선택된 대여 항목
    
    // 상세 검색 필터 상태
    const detailSearch = reactive({
      rentStatus: '',     // 대여상태
      cmsState: '',       // CMS상태
      contractState: '',  // 계약상태
      deliveryState: '',  // 배송상태
      productName: '',    // 품목명
      centerName: '',     // 센터명
      manager: '',        // 담당자
      phone: '',          // 연락처
      bcode: '',          // 바코드
    })

    // 활성화된 필터 계산 속성
    // 빈 값이 아닌 필터만 추출하여 객체로 반환
    const activeFilters = computed(() => {
      const result = {};
        Object.entries(detailSearch).forEach(([key, value]) => {
        if (value && value.trim() !== '') {
          result[key] = value;
        }
      });
      return result;
    })

    /**
     * 대여 목록을 서버에서 가져오는 함수
     * @param {number} page - 요청할 페이지 번호 (기본값: 현재 페이지)
     */
    const fetchRentItems = async (page = currentPage.value) => {
      try {
        root.$swalLoading();
        // API 요청 파라미터 구성
        const params = {
          page: page,
          limit: pageSize.value,
          search: searchQuery.value,
          rentStart: rentStart.value,
          rentEnd: rentEnd.value,
          ...activeFilters.value // 활성화된 필터 추가
        };
        // 대여 목록 API 호출
        const response = await getRentList(params);
        // 응답 데이터로 상태 업데이트
        rentItems.value = response.items
        totalPages.value = response.totalPages
        currentPage.value = response.page
        pageSize.value = response.limit
        pitemCounts.value = response.pitemCounts
        Swal.close();
      } catch (error) {
        console.error('대여 목록 조회 오류:', error);
      }
    }
    
    /**
     * 페이지 변경 처리 함수
     * @param {number} page - 이동할 페이지 번호
     */
    const handlePageChange = (page) => {
      console.log('페이지 변경:', page);
      fetchRentItems(page);
    }

    /**
     * 배송 상태 코드를 텍스트로 변환하는 함수
     * @param {string} code - 배송 상태 코드
     * @returns {string} 배송 상태 텍스트
     */
    const getDeliveryStatus = (code) => {
      const statuses = {
        '0': '배송대기',
        '1': '배송완료',
        '2': '회수중',
        '3': '회수완료'
      };
      return statuses[code] || '';
    };
    
    /**
     * 상태에 따른 행 스타일 클래스를 반환하는 함수
     * @param {string} item - 상태 텍스트
     * @returns {string} CSS 클래스명
     */
    const getRowClass = (item) => {
      if (item == '대여중' || item == '배송대기' || item == '배송완료') return 'green';
      if (item == '회수' || item == '회수완료' || item == '회수중') return 'red';
      if (item == '중지') return 'orange';
      return '';
    };

    /**
     * CMS 상태 코드를 텍스트로 변환하는 함수
     * @param {string} item - CMS 상태 코드
     * @returns {string} CMS 상태 텍스트
     */
    const getCmsSt = (item) => {
      if (item == '1') return '등록';
      if (item == '2') return '중지';
      return '';
    }

    /**
     * CMS 상태에 따른 스타일 클래스를 반환하는 함수
     * @param {string} item - CMS 상태 코드
     * @returns {string} CSS 클래스명
     */
    const getCmsStClass = (item) => {
      if (item == '1') return 'green';
      if (item == '2') return 'orange';
      return '';
    }

    /**
     * 대여 상세 모달을 여는 함수
     * @param {Object} item - 선택된 대여 항목 데이터
     */
    const openModalRentDetail = (item) => {
      selectedRentItem.value = JSON.parse(JSON.stringify(item)); // 깊은 복사로 원본 데이터 보존
      console.log(selectedRentItem.value,"selectedRentItem");
      showModalRentDetail.value = true;
    }

    /**
     * 특정 필터를 제거하는 함수
     * @param {string} key - 제거할 필터의 키
     */
    const removeFilter = (key) => {
      detailSearch[key] = '';
      fetchRentItems();
    }

    /**
     * 모든 필터를 초기화하는 함수
     */
    const clearFilters = () => {
      Object.keys(detailSearch).forEach(key => {
        detailSearch[key] = '';
      });
      fetchRentItems();
    }

    /**
     * 상세 검색 모달을 표시하는 함수
     * SweetAlert2를 사용하여 상세 검색 폼을 표시
     */
    const showSwalDetailSearch = () => {
      baseTemplate.value.showSwalModal({
        title: '상세 검색',
        width: window.innerWidth < 768 ? "100%" : "30%",
        confirmButtonText: '검색',
        html: `
          <div class="swal-search-form">
            <div class="swal-form-group">
              <label>대여상태</label>
              <select id="swal-rentStatus" class="swal2-input">
                <option value="">전체</option>
                <option value="y">대여중</option>
                <option value="n">회수</option>
                <option value="s">중지</option>
              </select>
            </div>
            <div class="swal-form-group">
              <label>CMS상태</label>
              <select id="swal-cmsState" class="swal2-input">
                <option value="">전체</option>
                <option value="등록">등록</option>
                <option value="미등록">미등록</option>
                <option value="중지">중지</option>
              </select>
            </div>
            <div class="swal-form-group">
              <label>계약상태</label>
              <select id="swal-contractState" class="swal2-input">
                <option value="">전체</option>
                <option value="ok">계약완료</option>
                <option value="cok">취소계약완료</option>
                <option value="n">미계약</option>
              </select>
            </div>
            <div class="swal-form-group">
              <label>배송상태</label>
              <select id="swal-deliveryState" class="swal2-input">
                <option value="">전체</option>
                <option value="배송완료>배송완료</option>
                <option value="배송대기">배송대기</option>
                <option value="회수중">회수중</option>
                <option value="회수완료">회수완료</option>
              </select>
            </div>
            <div class="swal-form-group">
              <label>품목명</label>
              <input id="swal-productName" class="swal2-input" placeholder="품목명">
            </div>
            <div class="swal-form-group">
              <label>센터명</label>
              <input id="swal-centerName" class="swal2-input" placeholder="센터명">
            </div>
            <div class="swal-form-group">
              <label>담당자</label>
              <input id="swal-manager" class="swal2-input" placeholder="담당자">
            </div>
            <div class="swal-form-group">
              <label>연락처</label>
              <input id="swal-phone" class="swal2-input" placeholder="연락처">
            </div>
            <div class="swal-form-group">
              <label>바코드</label>
              <input id="swal-bcode" class="swal2-input" placeholder="바코드">
            </div>
          </div>
        `,
        preConfirm: () => {
          // 폼 데이터 수집
          return {
            rentStatus: document.getElementById('swal-rentStatus').value,
            cmsState: document.getElementById('swal-cmsState').value,
            contractState: document.getElementById('swal-contractState').value,
            deliveryState: document.getElementById('swal-deliveryState').value,
            productName: document.getElementById('swal-productName').value,
            centerName: document.getElementById('swal-centerName').value,
            manager: document.getElementById('swal-manager').value,
            phone: document.getElementById('swal-phone').value,
            bcode: document.getElementById('swal-bcode').value
          };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          // 검색 조건을 detailSearch에 복사
          Object.assign(detailSearch, result.value);
          // 검색 실행
          fetchRentItems();
        }
      });
    }

    /**
     * 문자/카카오톡 발송내역 모달을 표시하는 함수
     */
    const showSendHistory = () => {
      baseTemplate.value.showSwalModal({
        title: '발송내역',
        width: "30%",
        showConfirmButton: false,
        html: ` 
          <div class="excel-export-modal">
            <div class="excel-button-container">
              <!--button class="excel-export-btn" id="export-client-list">문자 발송내역</button-->
              <button class="excel-export-btn" id="export-client-history">카카오톡 발송내역</button>
            </div>
          </div>
        `,
        didOpen: () => {
          // 모달이 열릴 때 실행할 코드
          document.getElementById('export-client-history').addEventListener('click', async () => {
            const response = await sendkakao_get_url("1681102066", "wjdwhdrkr2");

            window.open(response.data.result, '_blank', 'width=1380,height=800');
            
            console.log(user)
          });
        }
      });
    }

    /**
     * 소독관리 모달을 표시하는 함수
     * 소독일지, 수탁소독실시대장, 차량소독일지, 소독제관리 탭을 포함
     */
    const showDisinfectionManagement = () => {
      // 차량 소독일지 테이블 행 생성
      let vLTable = '';
      let vLTableLength = 0;
        for (let i = 0; i < 2; i++) {
          vLTable += `
            <tr>
              <td>${i + 1}</td>
              <td><input value="20250630" /></td>
              <td><input value="1234" /></td>
              <td><input value="이담당" /></td>
              <td><input value="약물소독" /></td>
              <td><input value="닥터큐007" /></td>
              <td><input value="500ml" /></td>
              <td><input value="이담당" /></td>
              <td><input value="01012345678" /></td>
              <td>
                <button>삭제</button>
              </td>
            </tr>
          `;
          vLTableLength++;
        }

      // 소독제관리 테이블 행 생성
      let dManageTable = '';
      let dManageTableLength = 0;
      for (let i = 0; i < 2; i++) {
        dManageTable += `
          <tr>
            <td>${i + 1}</td>
            <td><input value="닥터큐007" /></td>
            <td><input value="알코올 기반" /></td>
            <td><input value="ABC Company" /></td>
            <td><input value="에탄올 70%" /></td>
            <td><input value="2023-05-01" /></td>
            <td><input value="2022-04-15" /></td>
            <td><input value="50 리터" /></td>
            <td><input value="창고 A-1" /></td>
            <td>
              <button>삭제</button>
            </td> 
          </tr>
        `;
        dManageTableLength++;
      }

      baseTemplate.value.showSwalModal({
        title: '소독관리',
        width: "80%",
        confirmButtonText: '엑셀변환',
        showDenyButton: false,
        denyButtonText: '저장',
        denyButtonColor: '#306E48',

        html: `
          <div>
            <!-- 탭 버튼 영역 -->
            <div class="disinfection-tabs">
              <button id="tab-disinfection-log" class="active">소독일지</button>
              <button id="tab-consignment-log">수탁소독실시대장</button>
              <button id="tab-vehicle-log">차량소독일지</button>
              <button id="tab-disinfectant-management">소독제관리</button>
            </div>
            
            <!-- 탭 컨텐츠 영역 -->
            <div class="tab-content">
              <!-- 소독일지 탭 -->
              <div id="content-disinfection-log" class="tab-pane active">
                <!-- 바코드 검색 영역 -->
                <div class="search-section">
                  <input type="text" id="barcode-search" 
                  class="section-input" placeholder="바코드 검색" 
                  >
                  <button id="search-btn" class="search-button">검색</button>
                </div>
                <div class="section-table">
                  <table class="swalListTable">
                    <thead>
                      <tr>
                        <th rowspan="2">일련번호</th>
                        <th rowspan="2">품목명(제품명)</th>
                        <th rowspan="2">제품코드/바코드	</th>
                        <th rolspan="2">소독일자</th>
                        <th colspan="4">소독내용(자체소독)</th>
                        <th colspan="3">위탁내용</th>
                      </tr>
                      <tr>
                        <th>소독의 종류</th>
                        <th>사용 약품명</th>
                        <th>사용량</th>
                        <th>소독작업원성명</th>
                        <th>소독업체명</th>
                        <th>사업자등록번호</th>
                        <th>소독필증교부번호</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>2025-06-30</td>
                        <td>김철수</td>
                        <td>MIKI-PB</td>
                        <td>L1234567890</td>
                        <td>2025-07-30</td>
                        <td>2025-10-30</td>
                        <td>완료</td>
                        <td>이담당</td>
                        <td>정기소독 완료</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>2025-06-25</td>
                        <td>박영희</td>
                        <td>MIKI-LX</td>
                        <td>L1234567891</td>
                        <td>2025-07-25</td>
                        <td>2025-10-25</td>
                        <td>완료</td>
                        <td>박매니저</td>
                        <td>정기소독 완료</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <!-- 수탁소독실시대장 탭 -->
              <div id="content-consignment-log" class="tab-pane">

                <div class="search-section">
                  <input type="text" id="barcode-search" 
                  class="section-input" placeholder="바코드 검색" 
                  >
                  <button id="search-btn" class="search-button">검색</button>
                </div>

                <div class="section-table">
                  <table class="swalListTable">
                    <thead>
                      <tr>
                        <th rowspan="2">일련번호</th>
                        <th rowspan="2">소독일자</th>
                        <th colspan="2">소독대상</th>
                        <th colspan="3">소독실시내용</th>
                        <th rowspan="2">위탁요청업체명</th>
                        <th rowspan="2">장기요양기관기호</th>
                        <th rowspan="2">소독필증교부번호</th>
                      </tr>

                      <tr>
                        <th>품목명(제품명)</th>
                        <th>제품코드/바코드</th>
                        <th>소독의 종류</th>
                        <th>사용 약품명</th>
                        <th>사용량</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>2025-06-30</td>
                        <td>수동휠체어</td>
                        <td>M18030111514-240400000276</td>
                        <td>약물소독</td>
                        <td>닥터큐</td>
                        <td>500ml</td>
                        <td>위탁업체3</td>
                        <td>1234567890</td>
                        <td>제2025-0000 제1호</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <!-- 차량소독일지 탭 -->
              <div id="content-vehicle-log" class="tab-pane">
                <div class="section-table">
                  <table class="swalListTable">
                    <thead>
                      <tr>
                        <th rowspan="2">일련번호</th>
                        <th rowspan="2">소독일자</th>
                        <th rowspan="2">차량번호</th>
                        <th rowspan="2">차량소속</th>
                        <th colspan="3">소독실시내용</th>
                        <th colspan="2">소독작업자</th>
                        <th rowspan="2">비고</th>
                      </tr>
                      <tr>
                        <th>소독의 종류</th>
                        <th>사용 약품명</th>
                        <th>사용량</th>
                        <th>성명</th>
                        <th>전화번호</th>
                      </tr>
                    </thead>
                    <tbody id="vehicle-log-tbody">
                      ${vLTable}
                      <tr>
                        <td>
                          ${vLTableLength + 1}
                        </td>
                        <td>
                          <input />
                        </td>
                        <td>
                          <input />
                        </td>
                        <td>
                          <input />
                        </td>
                        <td>
                          <input />
                        </td>
                        <td>
                          <input />
                        </td>
                        <td>
                          <input />
                        </td>
                        <td>
                          <input />
                        </td>
                        <td>
                          <input />
                        </td>
                        <td>
                          <button>삭제</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <!-- 소독제관리 탭 -->
              <div id="content-disinfectant-management" class="tab-pane">
                <div class="section-table">
                  <table class="swalListTable">
                    <thead>
                      <tr>
                        <th>일련번호</th>
                        <th>소독제 명칭</th>
                        <th>종류</th>
                        <th>제조사</th>
                        <th>성분 및 농도</th>
                        <th>유효기간</th>
                        <th>구매일</th>
                        <th>재고량(단위)</th>
                        <th>보관 장소</th>
                        <th>비고</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                      ${dManageTable}
                      <tr>
                        <td>${dManageTableLength + 1}</td>
                        <td>
                          <input />  
                        </td>
                        <td>
                          <input />  
                        </td>
                        <td>
                          <input />
                        </td>
                        <td>
                          <input />
                        </td>
                        <td>
                          <input />
                        </td>
                        <td>
                          <input />
                        </td>
                        <td>
                          <input />
                        </td>
                        <td>
                          <input />
                        </td>
                        <td>
                          <button>삭제</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        `,
        didOpen: () => {
          // 탭 전환 기능 구현
          const tabButtons = document.querySelectorAll('.disinfection-tabs button');
          const tabPanes = document.querySelectorAll('.tab-pane');
          
          // 저장 버튼 초기 상태 설정 (숨김)
          const denyButton = Swal.getPopup().querySelector('.swal2-deny'); 
          if (denyButton) {
            denyButton.style.display = 'none';
          }
          
          tabButtons.forEach(button => {
            button.addEventListener('click', () => {
              // 모든 탭 버튼에서 active 클래스 제거
              tabButtons.forEach(btn => btn.classList.remove('active'));
              // 모든 탭 패널에서 active 클래스 제거
              tabPanes.forEach(pane => pane.classList.remove('active'));
              
              // 클릭된 버튼에 active 클래스 추가
              button.classList.add('active');
              
              // 해당 탭 패널 활성화
              const tabId = button.id.replace('tab-', 'content-');
              document.getElementById(tabId).classList.add('active');
              
              // 차량소독일지 또는 소독제관리 탭인 경우에만 저장 버튼 표시
              if (denyButton) {
                if (button.id === 'tab-vehicle-log' || button.id === 'tab-disinfectant-management') {
                  denyButton.style.display = 'inline-block';
                } else {
                  denyButton.style.display = 'none';
                }
              }
            });
          });
          
        },
      });
    }

    // 컴포넌트 마운트 시 대여 목록 조회
    onMounted(() => {
      fetchRentItems()
    })

    // 템플릿에서 사용할 속성 및 메서드 반환
    return {
      searchQuery,
      currentPage,
      pageSize,
      totalPages,
      baseTemplate,
      detailSearch,
      activeFilters,
      modal_height,
      modal_width,
      rentItems,
      getCmsSt,
      getRowClass,
      getCmsStClass,
      getDeliveryStatus,
      removeFilter,
      clearFilters,
      showSwalDetailSearch,
      showSendHistory,
      showDisinfectionManagement,
      showModalDurability,
      showModalSms,
      showModalRentDetail,
      fetchRentItems,
      selectedRentItem,
      openModalRentDetail,
      pitemCounts,
      handlePageChange,
      rentStart,
      rentEnd,
      showModifyModal
    };
  }
}
</script>