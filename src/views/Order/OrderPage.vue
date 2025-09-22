<template>
  <!-- Modals -->
  <!-- 주문서 등록 -->
  <ModalPage v-model:show="showModal" :height="modal_height">
    <OrderUpPage @fetch-orders="fetchOrders" @close-modal="closeModal" />
  </ModalPage>

  <!-- 주문서 수정 -->
  <ModalPage
    v-model:show="showModifyModal"
    :height="modal_height"
    :parent="'order'"
    @close="closeModal"
  >
    <OrderModifyPage
      :orderId="selectedOrder.id"
      @close="closeModal"
      @update="fetchOrders"
      @show-rent-detail="() => { showModifyModal = false; showModal_obj.rent_detail = true; }"
    />
  </ModalPage>

 <!-- 대여정보 상세창 -->
 <ModalPage v-model:show="showModal_obj.rent_detail" 
  :height="modal_height" :width="'90%'" 
  :parent="'order'"
  @close="fetchOrders"
  >
    <ModalRentDetail :show="showModal_obj.rent_detail" 
    @update:show="showModal_obj.rent_detail = $event"
    @close="showModal_obj.rent_detail = false"
    :rentItem="{id:selectedOrder.rentId}"
    @goOrderModifyPage="() => { showModal_obj.rent_detail = false; showModifyModal = true; }"
     />
  </ModalPage>

  <!-- 엑셀 변환 -->
  <ModalPage
    v-model:show="showModal_excel"
    :width="madal_width.excel"
    :height="madal_height.excel"
  >
    <ExcelPage />
  </ModalPage>

  <!-- 계약서 출력 -->
  <ModalPage
    v-model:show="showModal_obj.doc_print"
    :width="madal_width.doc_print"
    :height="madal_height.doc_print"
  >
    <DocPrints :pageUrls="pageUrls" :orderId="orderId" :person="person" />
  </ModalPage>

  <BaseOrderTemplate
    :search-query="searchQuery"
    :current-page="currentPage"
    :total-pages="totalPages"
    :detail-search-button="true"
    :items="orders"
    :filters="filteredSearchParams"
    :get-filter-value="getFilterValue"
    search-placeholder="검색어를 입력하세요"
    header-info-class="minWidth400 fontSize12"
    @update:search-query="searchQuery = $event"
    @search="fetchOrders"
    @show-search-popup="showSearchPopup"
    @remove-filter="removeFilter"
    @clear-filters="clearFilter"
    @page-change="goToPage"
    ref="baseTemplate"
  >
    <!-- Title Title -->
    <template #title-icon>
      <span class="material-icons">shopping_cart</span>
    </template>
    <template #title-text> 주문 및 발주 </template>

    <!-- Header Buttons -->
    <template #header-buttons>
      <BlueBtn @click="showModal = true">주문서입력</BlueBtn>
      <LineBreak class="deskNone" />
      <DateInput type="date" v-model="startDate" />
      <FlexDiv>~</FlexDiv>
      <DateInput type="date" v-model="endDate" />
      <BlueBtn @click="fetchOrders">날짜조회</BlueBtn>
      <BlueBtn class="mobileNone" :class="{ 'active-btn': activeDateRange === 'today' }" @click="setDateRange('today')">당일</BlueBtn>
      <BlueBtn class="mobileNone" :class="{ 'active-btn': activeDateRange === 'yesterday' }" @click="setDateRange('yesterday')">전일</BlueBtn>
      <BlueBtn class="mobileNone" :class="{ 'active-btn': activeDateRange === 'thisMonth' }" @click="setDateRange('thisMonth')">당월</BlueBtn>
      <BlueBtn class="mobileNone" :class="{ 'active-btn': activeDateRange === 'lastMonth' }" @click="setDateRange('lastMonth')">전월</BlueBtn>
      <BlueBtn class="mobileNone" :class="{ 'active-btn': activeDateRange === 'all' }" @click="setDateRange('all')">전체</BlueBtn>
      <GreenBtn style="margin-left: 10px;" class="mobileNone" @click="orderlistExcel">
        <MicrosoftExcel />&nbsp;엑셀변환
      </GreenBtn>
      <BlueBtn class="mobileNone" @click="showSmsHistory">문자발송내역</BlueBtn>
      <BlueBtn class="mobileNone" @click="showFaxHistory">팩스발송내역</BlueBtn>
      <BlueBtn class="mobileNone" @click="showOrderExcelBatch">주문서엑셀등록</BlueBtn>
    </template>

    <!-- Header Info -->
    <template #header-info>
      <FlexDiv>
        <FlexDiv>
          <Star style="color: orange" />
          <span> : 부분계약완료</span>
        </FlexDiv>
        <FlexDiv>
          <TriangleOutline style="color: green" />
          <span> : 취소계약완료</span>
        </FlexDiv>
        <FlexDiv>
          <Check style="color: green" />
          <span> : 공단계약완료</span>
        </FlexDiv>
        <FlexDiv>
          <Close style="color: red" />
          <span> : 공단미계약</span>
        </FlexDiv>
      </FlexDiv>
    </template>

    <!-- Tab Buttons -->
    <template #tab-buttons>
      <OrderTableButtonArea>
        <OrderTableButton
          @click="fetchStatus(0)"
          :class="{ active: activeStatus === 0 }"
          ><OrderStTitle class="all">전체</OrderStTitle>
          <OrderStCnt>{{ totalOrders }}</OrderStCnt>
        </OrderTableButton>
        <OrderTableButton
          @click="fetchStatus(1)"
          :class="{ active: activeStatus === 1 }"
          ><OrderStTitle class="unconfirm">미확정</OrderStTitle
          ><OrderStCnt>{{
            unconfirmCount
          }}</OrderStCnt></OrderTableButton
        >
        <OrderTableButton
          @click="fetchStatus(2)"
          :class="{ active: activeStatus === 2 }"
          ><OrderStTitle class="confirm">확정</OrderStTitle
          ><OrderStCnt>{{ confirmCount }}</OrderStCnt></OrderTableButton
        >
        <OrderTableButton
          @click="fetchStatus(3)"
          :class="{ active: activeStatus === 3 }"
          ><OrderStTitle class="release">출고</OrderStTitle
          ><OrderStCnt>{{ releaseCount }}</OrderStCnt></OrderTableButton
        >
        <!-- <OrderTableButton @click="fetchStatus('출고')">A/S</OrderTableButton>
        <OrderTableButton @click="fetchStatus('출고')">요청</OrderTableButton> -->
      </OrderTableButtonArea>
    </template>

    <!-- Pagination -->

    <template #pagination-left>
      <OrderPagePrintBtn class="mobileNone" @click="updateSelectedOrders">
        선택일괄수정
      </OrderPagePrintBtn>
      <OrderPagePrintBtn class="mobileNone" @click="printSelectedOrders">
        선택일괄출력
      </OrderPagePrintBtn>
      <OrderPageSelect class="mobileNone" v-model="contentsSize" @change="fetchOrders">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option> </OrderPageSelect
      ><div class="mobileNone" style="color: #fff; width:70px">개씩 보기</div>
    </template>

    <!-- Table -->
    <template #table>
      <TableContainer>
        <DataTable>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  v-model="selectAll"
                  @change="toggleAll"
                />
              </th>
              <th class="orderdate">일자</th>
              <th>수급자<br class="deskNone">성함</th>
              <th>인정번호</th>
              <th class="mobileNone">생년월일</th>
              <th class="mobileNone">대상</th>
              <th class="name2">품목명</th>
              <th>품목<br class="deskNone">수량</th>
              <th class="address mobileNone">배송주소</th>
              <th class="mobileNone">보호자성함</th>
              <th class="mobileNone">구분</th>
              <th class="mobileNone">연락처</th>
              <th class="mobileNone">거래처</th>
              <th class="mobileNone">담당자</th>
              <th class="mobileNone">메모</th>
              <th class="mobileNone">배송방법</th>
              <th class="mobileNone">배송상태</th>
              <th>공단<br class="deskNone">계약</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="orders.length === 0">
              <td colspan="19" style="text-align: center; padding: 20px">
                등록된 주문서가 없습니다.
              </td>
            </tr>
            <tr
              v-for="(order, index) in orders"
              :key="index"
              @click="openModifyModal(order)"
              :class="getRowClass(order)"
            >
              <td @click.stop>
                <input
                  type="checkbox"
                  v-model="order.selected"
                  @change="toggleOrderSelection(order.id, order.selected)"
                />
              </td>
              <td>{{ formatDate(order.orderDate) }}</td>
              <td>{{ order.client.name }}</td>
              <td>{{ order.client.number }}</td>
              <td class="mobileNone">{{ order.client.resident }}</td>
              <td class="mobileNone">{{ order.target }}</td>
              <td>
                {{ order.orderProducts[0].product.pname }}
                {{
                  order.orderProducts.length > 1
                    ? `외 ${order.orderProducts.length - 1}개`
                    : ""
                }}
              </td>
              <td>{{ order.orderProducts.length }}</td>
              <td class="mobileNone">{{ order.address }}</td>
              <td class="mobileNone">{{ order.guardName }}</td>
              <td class="mobileNone">{{ order.rentId ? "대여" : "판매" }}</td>
              <td class="mobileNone">{{ order.phone1 }}</td>
              <td class="mobileNone">{{ order.centerName }}</td>
              <td class="mobileNone">{{ order.manager }}</td>
              <td class="mobileNone">{{ truncateComment(order.comment) }}</td>
              <td class="mobileNone">{{ getDeliveryMethod(order.deliveryType) }}</td>
              <td class="mobileNone">{{ getDeliveryStatus(order.deliveryState) }}</td>
              <td class="chk_td">
                <span v-if="order.contractState === 'ok'" style="color: green"
                  ><Check :size="30"
                /></span>
                <span v-else-if="order.contractState === 'n'" style="color: red"
                  ><Close :size="30"
                /></span>
                <span
                  v-else-if="order.contractState === 'cok'"
                  style="color: green"
                  ><TriangleOutline :size="30"
                /></span>
                <span
                  v-else-if="order.contractState === 'vok'"
                  style="color: orange"
                  ><Star :size="30"
                /></span>
                <span v-else>{{ order.contractState }}</span>
              </td>
              <td @click.stop>
                <span
                  @click="copyOrder(order)"
                  class="copy-btn"
                  style="cursor: pointer; color: #1a2136; font-weight: bold"
                  >복사</span
                >
              </td>
            </tr>
          </tbody>
        </DataTable>
      </TableContainer>
      <OrderDeleteBtn @click="confirmDeleteOrders">
        주문서 삭제
      </OrderDeleteBtn>
    </template>
  </BaseOrderTemplate>
</template>

<script>
import { ref, reactive, h, createApp } from "vue";
import * as PublicCss from "@/assets/styles/public.js";
import * as OrderCss from "../../assets/styles/OrderCss.js";
import BaseOrderTemplate from "@/components/BaseOrderTemplate.vue";

// Material Design 아이콘 컴포넌트 모듈 임포트 시작
import MicrosoftExcel from "vue-material-design-icons/MicrosoftExcel.vue";
import Star from "vue-material-design-icons/Star.vue";
import Check from "vue-material-design-icons/Check.vue";
import TriangleOutline from "vue-material-design-icons/TriangleOutline.vue";
import Close from "vue-material-design-icons/Close.vue";
// Material Design 아이콘 컴포넌트 모듈 임포트 끝
import ModalPage from "@/components/modal/ModalPage.vue";
import OrderUpPage from "../../components/OrderUpPage.vue";
import OrderModifyPage from "../../components/OrderModifyPage.vue";
import SearchPopup from "../../components/OrderSearchPopup.vue";
import axios from "axios";
import Swal from "sweetalert2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getOrders, deleteOrder, batchUpdateOrder } from "@/api/order";
import DocPrints from "@/components/DocPrints.vue";
import ExcelPage from "@/components/modal/excelPage/ModalexcelPage.vue";
import { getUserList } from "@/api/user.js";
import { sendkakao_get_url } from "@/api/common.js";
import ModalRentDetail from "@/components/modal/rentDetail/ModalRentDetail.vue";
export default {
  components: {
    ...PublicCss,
    ...OrderCss,
    BaseOrderTemplate,
    MicrosoftExcel,
    Star,
    Check,
    TriangleOutline,
    Close,
    ModalPage,
    OrderUpPage,
    OrderModifyPage,
    DocPrints,
    ExcelPage,
    ModalRentDetail,
  },
  setup() {
    const selected = ref("10"); // 기본값 설정
    const showModal = ref(false);
    const searchPopupInstance = ref(null);
    const activeStatus = ref(0);
    const showModal_obj = reactive({
      doc_print: ref(false),
      rent_detail: ref(false),
    });
    const madal_width = {
      doc_print: "85%",
      excel: "85%",
      rent_detail: "90%",
    };
    const madal_height = {
      doc_print: "85%",
      excel: "80%",
      rent_detail: "90%",
    };
    const showModal_excel = ref(false);
    const pageUrls = [
      {
        "일반/감경": [
          { url: "/print/Doc1.ejs", name: "급여제공기록지" },
          { url: "/print/Doc2.ejs", name: "복지용구 공급 계약서" },
          { url: "/print/Doc3.ejs", name: "개인정보 수집 및 활용동의서" },
          { url: "/print/Doc4.ejs", name: "제품설치대장" },
          { url: "/print/Doc5.ejs", name: "장기요양급여비용 명세서" },
        ],
        "기초/의료급여": [
          { url: "/print/ZeroDoc1.ejs", name: "입소이용 의뢰서" },
          { url: "/print/ZeroDoc2.ejs", name: "재가서비스 이용내역서" },
        ],
        추가급여: [{ url: "/print/AddSalary.ejs", name: "추가급여신청서" }],
      },
    ];
    const person = ref(1);
    return {
      searchPopupInstance,
      selected,
      showModal,
      activeStatus,
      showModal_obj,
      showModal_excel,
      madal_width,
      madal_height,
      pageUrls,
      person,
    };
  },
  data() {
    const today = new Date();
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );
    const dummyOrders = [];
    return {
      startDate: this.repace_date_hipen(today),
      endDate: this.repace_date_hipen(lastDayOfMonth),
      searchQuery: "",
      itemsPerPage: 10,
      modal_height: "78%",
      orders: dummyOrders,
      currentPage: 1,
      totalPages: 1,
      totalOrders: 0,
      unconfirmCount: 0,
      confirmCount: 0,
      releaseCount: 0,
      showModifyModal: false,
      selectedOrder: null,
      contentsSize: 10,
      searchParams: {
        deliveryState: "",
        deliveryType: "",
        pname: "",
        centerName: "",
        manager: "",
        phone1: "",
        bcode: "",
        contractState: "",
      },
      selectedOrderIds: [],
      filterTitles: {
        deliveryState: "배송상태",
        deliveryType: "배송방법",
        pname: "품목명",
        centerName: "센터명",
        manager: "담당자",
        phone1: "연락처",
        bcode: "바코드",
        contractState: "계약상태",
      },
      filterValues: {
        deliveryState: {
          1: "배송완료",
          2: "배송대기",
          3: "회수중",
          4: "회수완료",
        },
        deliveryType: {
          1: "내방",
          2: "택배",
          3: "물류",
          4: "소독업체",
          5: "공급업체",
        },
        contractState: {
          ok: "계약완료",
          vok: "부분계약완료",
          cok: "취소계약완료",
          n: "미계약",
        },
      },
      userList: [],
      activeDateRange: "today",
    };
  },
  computed: {
    visiblePages() {
      let start = Math.floor((this.currentPage - 1) / 10) * 10 + 1;
      let end = Math.min(start + 9, this.totalPages);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
    filteredSearchParams() {
      const filteredParams = {};
      for (const key in this.searchParams) {

        if (this.searchParams[key] && this.searchParams[key] != 0) {
          filteredParams[key] = this.searchParams[key];
        }
      }
      return filteredParams;
    },
  },
  methods: {
    getRowClass(order) {
      switch (order.target) {
        case "일반":
          return "green";
        case "감경":
          return "yellow";
        case "의료급여":
          return "blue";
        case "기초":
          return "red";
        default:
          return "";
      }
    },

    async getUserListData() {
      const response = await getUserList({ page: 1, perPage: 1000 });
      if (response.success) {
        this.userList = response.items;
      }
    },
    deving() {
      Swal.fire({
        title: "개발중",
        text: "기능 개발중입니다.",
        icon: "info",
        confirmButtonText: "확인",
      });
    },
    fetchStatus(status) {
      this.activeStatus = status; // 활성화된 상태 업데이트
      this.currentPage = 1;
      this.fetchOrders();
    },
    toggleOrderSelection(orderId, isSelected) {
      const index = this.selectedOrderIds.indexOf(orderId);
      if (isSelected && index === -1) {
        this.selectedOrderIds.push(orderId);
        console.log(this.selectedOrderIds);
      } else if (!isSelected && index !== -1) {
        this.selectedOrderIds.splice(index, 1);
      }
    },
    confirmDeleteOrders() {
      if (this.selectedOrderIds.length === 0) {
        Swal.fire({
          title: "알림",
          text: "삭제할 주문서를 선택해주세요.",
          icon: "warning",
          confirmButtonText: "확인",
        });
        return;
      }

      Swal.fire({
        title: "정말 삭제하시겠습니까?",
        html: '<div style="font-size: 16px; font-weight: bold; text-align: center;">선택한 주문서를 삭제하시겠습니까?</div>',
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteSelectedOrders();
        }
      });
    },
    async deleteSelectedOrders() {
      try {
        let successCount = 0;
        for (const orderId of this.selectedOrderIds) {
          console.log(orderId);
          const response = await deleteOrder(orderId);
          if (response.success) {
            successCount++;
          }
        }

        if (successCount > 0) {
          Swal.fire({
            title: "성공",
            text: `주문서 ${successCount}개가 성공적으로 삭제되었습니다.`,
            icon: "success",
            confirmButtonText: "확인",
          });
        }

        this.selectedOrderIds = []; // 삭제 후 선택된 주문서 ID 초기화
        this.fetchOrders(); // 주문서 목록을 다시 불러옵니다.
      } catch (error) {
        Swal.fire({
          title: "오류",
          text: "주문서 삭제 중 오류가 발생했습니다.",
          icon: "error",
          confirmButtonText: "확인",
        });
        console.error("주문서 삭제 오류:", error);
      }
    },
    setDateRange(range) {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const date = today.getDate();
      let startDateObj, endDateObj;

      switch (range) {
        case "today":
          startDateObj = new Date(year, month, date);
          endDateObj = new Date(year, month, date);
          this.activeDateRange = "today";
          break;
        case "yesterday":
          startDateObj = new Date(year, month, date - 1);
          endDateObj = new Date(year, month, date - 1);
          this.activeDateRange = "yesterday";
          break;
        case "thisMonth":
          startDateObj = new Date(year, month, 1);
          endDateObj = new Date(year, month + 1, 0);
          this.activeDateRange = "thisMonth";
          break;
        case "lastMonth":
          startDateObj = new Date(year, month - 1, 1);
          endDateObj = new Date(year, month, 0);
          this.activeDateRange = "lastMonth";
          break;
        case "all":
          startDateObj = new Date(1999, 0, 1);
          endDateObj = new Date(2099, 0, 1);
          this.activeDateRange = "all";
          break;
      }

      this.startDate = this.repace_date_hipen(startDateObj);
      this.endDate = this.repace_date_hipen(endDateObj);
      this.currentPage = 1;
      this.searchQuery = "";
      this.fetchOrders();
      
    },
    repace_date_hipen(date) {
      if (!date) return "";

      // Date 객체인지 확인
      const dateObj = date instanceof Date ? date : new Date(date);

      // 유효한 날짜인지 확인
      if (isNaN(dateObj.getTime())) {
        console.error("유효하지 않은 날짜:", date);
        return "";
      }

      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    },
    toggleAll() {
      this.orders.forEach((order) => {
        order.selected = this.selectAll;
        this.toggleOrderSelection(order.id, this.selectAll);
      });
    },
    truncateComment(comment) {
      if (!comment) {
        return "";
      } else if (comment.length > 8) {
        return comment.slice(0, 8) + "...";
      }
      return comment;
    },
    async fetchOrders() {
      try {
        this.$swalLoading();
        // 날짜 형식 확인
        const startDateStr = this.repace_date_hipen(this.startDate);
        const endDateStr = this.repace_date_hipen(this.endDate);
        const response = await getOrders({
          page: this.currentPage,
          sdate: startDateStr,
          edate: endDateStr,
          limit: this.contentsSize,
          search: this.searchQuery,
          orderStatus: this.activeStatus,
          ...this.searchParams,
        });

        console.log("response", response);

        // 응답 데이터에 selected 속성 초기화 추가
        this.orders = response.items.map((order) => ({
          ...order,
          selected: this.selectedOrderIds.includes(order.id),
        }));
        
        this.currentPage = response.page;
        this.totalPages = response.totalPages;
        this.totalOrders = response.total;
        this.unconfirmCount = response.unconfirmCount;
        this.confirmCount = response.confirmCount;
        this.releaseCount = response.releaseCount;
      } catch (error) {
        console.error("주문 데이터를 가져오는 중 오류가 발생했습니다:", error);
      } finally {
        this.$swalClose();
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    removeFilter(key) {
      this.searchParams[key] = "";
      this.fetchOrders();
    },

    clearFilter() {
      this.searchParams = {};
      this.fetchOrders();
    },
    getFilterTitle(key) {
      return this.filterTitles[key] || key;
    },

    getFilterValue(key, value) {
      if (this.filterValues[key] && this.filterValues[key][value]) {
        return this.filterValues[key][value];
      }
      return value;
    },
    getDeliveryMethod(code) {
      const methods = {
        0: "내방",
        1: "택배",
        2: "물류 (기관배송)",
        3: "소독",
        4: "공급업체",
      };
      return methods[code] || "";
    },
    getDeliveryStatus(code) {
      const statuses = {
        0: "배송대기",
        1: "배송완료",
        2: "회수중",
        3: "회수완료",
      };
      return statuses[code] || "";
    },
    closeModal() {
      this.showModal = false; // 모달 창 닫기
      this.fetchOrders();
    },
    goToPage(page) {
      if (page > 0 && page <= this.totalPages && page !== this.currentPage) {
        this.currentPage = page;
        this.fetchOrders();
      }
    },
    openModifyModal(order) {
      this.selectedOrder = JSON.parse(JSON.stringify(order));
      this.showModifyModal = true;
    },
    showSearchPopup() {
      Swal.fire({
        title: "상세 검색",
        width: window.innerWidth < 768 ? "100%" : "30%",
        html: '<div id="search-popup"></div>',
        showCancelButton: true,
        confirmButtonText: "검색",
        cancelButtonText: "취소",
        didOpen: () => {
          const app = createApp({
            setup() {
              const componentRef = ref(null);
              return { componentRef };
            },
            render: () =>
              h(SearchPopup, {
                ref: "componentRef",
                searchParams: this.searchParams,
              }),
          });
          const instance = app.mount("#search-popup");
          this.searchPopupInstance = instance.componentRef;
        },
        preConfirm: () => {
          if (
            this.searchPopupInstance &&
            typeof this.searchPopupInstance.getFormValues === "function"
          ) {
            return this.searchPopupInstance.getFormValues();
          } else {
            console.error("getFormValues method not found");
            return {};
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          this.searchParams = result.value;
          this.fetchOrders();
        }
      });
    },
    excelExport() {
      try {
        // 데이터 준비
        const jsonData = this.orders.map((order) => {
          return {
            일자: this.formatDate(order.orderdate),
            고객명: order.order_name,
            고객번호: order.number,
            생년월일: order.resident,
            품목명: this.formatName2(order.b_name3 + "," + order.name2),
            전체수량: order.total_quantity,
            배송주소: order.address,
            보호자성함: order.guardname,
            구분: order.target,
            연락처: order.phone1,
            거래처: order.centername,
            담당자: order.manager,
            메모: order.comment,
            배송방법: this.getDeliveryMethod(order.deliverymanager),
            배송상태: this.getDeliveryStatus(order.status),
          };
        });

        // 엑셀 생성
        const worksheet = XLSX.utils.json_to_sheet(jsonData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "주문내역");

        // 파일명 설정
        const fileName = `주문내역_${new Date()
          .toISOString()
          .slice(0, 10)}.xlsx`;

        // 엑셀 파일 다운로드
        XLSX.writeFile(workbook, fileName);

        Swal.fire({
          title: "엑셀 변환 완료",
          text: "엑셀 파일이 다운로드 되었습니다.",
          icon: "success",
          confirmButtonText: "확인",
        });
      } catch (error) {
        console.error("엑셀 변환 중 오류 발생:", error);
        Swal.fire({
          title: "오류",
          text: "엑셀 변환 중 오류가 발생했습니다.",
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    },

    // 문자열을 ArrayBuffer로 변환하는 함수 (엑셀 파일 생성용)
    s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xff;
      }
      return buf;
    },

    // 엑셀 내보내기 고급 함수
    exportExcelAdvanced(etype) {
      try {
        let filename = "제품관리대장.xlsx";
        if (etype === "m") {
          filename = "본인부담금수납대장.xlsx";
        } else if (etype === "i") {
          filename = "제품설치대장.xlsx";
        } else if (etype === "g") {
          filename = "주문서목록.xlsx";
        }

        // 엑셀 핸들러 객체
        const excelHandler = {
          getExcelFileName: (name) => name,
          getSheetName: () => "Sheet",
          getExcelData: () => document.getElementById("excelbody"),
          getWorksheet: function () {
            return XLSX.utils.table_to_sheet(this.getExcelData());
          },
        };

        // 워크북 생성
        const wb = XLSX.utils.book_new();
        const newWorksheet = excelHandler.getWorksheet();
        XLSX.utils.book_append_sheet(
          wb,
          newWorksheet,
          excelHandler.getSheetName()
        );

        // G 열 숫자 형식 지정
        const sheet = wb.Sheets[wb.SheetNames[0]];
        Object.keys(sheet).forEach(function (s) {
          if (s.includes("G")) {
            delete sheet[s].w;
            sheet[s].z = "0";
          }
        });

        // 엑셀 파일 생성
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

        // 엑셀 다운로드 로그 기록
        axios({
          url: "/exceldownlog",
          method: "post",
          data: {
            filename: filename,
          },
        });

        // 엑셀 파일 다운로드
        saveAs(
          new Blob([this.s2ab(wbout)], { type: "application/octet-stream" }),
          filename
        );

        Swal.fire({
          title: "엑셀 변환 완료",
          text: "엑셀 파일이 다운로드 되었습니다.",
          icon: "success",
          confirmButtonText: "확인",
        });
      } catch (error) {
        console.error("엑셀 변환 중 오류 발생:", error);
        Swal.fire({
          title: "오류",
          text: "엑셀 변환 중 오류가 발생했습니다.",
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    },

    // 두 날짜 사이의 일수를 계산하는 함수
    daysBetweenDates(startDate, endDate) {
      const diff = new Date(endDate).getTime() - new Date(startDate).getTime();
      return Math.floor(diff / (1000 * 60 * 60 * 24));
    },

    // 데이터를 효율적으로 로드하는 함수
    loadDataEfficiently(data, elementId = "excelbody") {
      // 먼저 excelbody 요소가 존재하는지 확인하고 없으면 생성
      let excelbodyElement = document.getElementById(elementId);
      if (!excelbodyElement) {
        excelbodyElement = document.createElement("table");
        excelbodyElement.id = elementId;
        excelbodyElement.style.display = "none";
        document.body.appendChild(excelbodyElement);
      }

      // 데이터를 행으로 분할하고 빈 행은 필터링
      const rows = data.split("</tr>").filter((order) => order.trim() !== "");
      // 한 번에 처리할 행의 수 설정
      const chunkSize = 50;

      // Swal 창이 닫혔는지 확인하는 변수
      let isSwalClosed = false;

      // 청크 단위로 데이터 처리하는 함수
      const processChunk = (startIndex) => {
        // Swal이 닫혔으면 처리 중단
        if (isSwalClosed) {
          return;
        }

        // 현재 청크의 끝 인덱스 계산 (전체 행 수를 초과하지 않도록)
        const endIndex = Math.min(startIndex + chunkSize, rows.length);
        // 현재 처리할 청크 추출
        const chunk = rows.slice(startIndex, endIndex);

        // HTML 문자열 생성
        let str = "";
        chunk.forEach((row) => {
          if (row.includes("<thead") || row.includes("<tbody")) {
            str += row + "</tr>";
          } else if (row.trim().startsWith("<tr")) {
            // 이미 <tr> 태그가 있는 경우 그대로 사용
            str += row + "</tr>";
          } else {
            // <tr> 태그가 없는 경우에만 추가
            str += `<tr>${row}</tr>`;
          }
        });

        // 생성된 HTML을 테이블에 추가
        excelbodyElement.innerHTML += str;

        // 진행 상황 표시
        const progress = Math.floor((endIndex / rows.length) * 100);

        // Swal이 닫혔는지 확인
        if (document.querySelector(".swal2-container") === null) {
          isSwalClosed = true;
          return;
        }

        Swal.showValidationMessage(
          `<span style="font-size: 16px; font-weight: bold; color: #333;">데이터 로딩 중... ${progress}% 완료</span>`
        );

        // 아직 처리할 행이 남아있으면 다음 청크 처리를 예약
        if (endIndex < rows.length && !isSwalClosed) {
          setTimeout(() => processChunk(endIndex), 10);
        } else if (endIndex >= rows.length) {
          // 모든 데이터 로딩이 완료되면 메시지 숨김
          Swal.resetValidationMessage();
          window.isProcessing = false;
        }
      };

      // Swal 닫힘 이벤트 감지
      const handleClick = function (e) {
        if (
          e.target.classList.contains("swal2-close") ||
          e.target.classList.contains("swal2-cancel") ||
          e.target.classList.contains("swal2-backdrop-show")
        ) {
          isSwalClosed = true;
          document.removeEventListener("click", handleClick);
        }
      };

      document.addEventListener("click", handleClick);

      // 첫 번째 청크부터 처리 시작
      processChunk(0);
    },

    // 주문 목록을 엑셀로 변환하는 고급 함수
    async orderlistExcel() {
      this.showModal_excel = true;
    },

    // 설치 정보를 엑셀로 변환하는 함수
    async installExcel() {
      if (window.isProcessing) return;
      window.isProcessing = true;

      Swal.fire({
        title: "엑셀 변환 중",
        text: "설치 정보를 처리하고 있습니다...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        // 날짜 유효성 검사
        if (this.daysBetweenDates(this.startDate, this.endDate) > 60) {
          Swal.fire({
            title: "조회 기간 제한",
            text: "최대 60일까지만 조회가 가능합니다.",
            icon: "error",
            confirmButtonText: "확인",
          });
          window.isProcessing = false;
          return;
        }

        // excelbody 요소 초기화
        const excelBodyElement = document.getElementById("excelbody");
        if (excelBodyElement) {
          excelBodyElement.remove();
        }
        const excelbodyElement = document.createElement("table");
        excelbodyElement.id = "excelbody";
        excelbodyElement.style.display = "none";
        document.body.appendChild(excelbodyElement);

        // API 호출을 위한 파라미터 설정
        const params = {
          page: this.currentPage,
          sdate: this.repace_date_hipen(this.startDate),
          edate: this.repace_date_hipen(this.endDate),
          contentsSize: this.contentsSize,
          search: this.searchQuery,
          exceltype: "install",
          ...this.searchParams,
        };

        // API 호출
        const response = await axios.get(
          "http://localhost:3000/api/orders/installexcel",
          { params }
        );

        // 테이블 HTML 생성
        let tableHtml = "<thead><tr>";
        tableHtml +=
          "<th>설치일자</th><th>수급자성명</th><th>장기요양인정번호</th><th>성별</th>";
        tableHtml +=
          "<th>제품코드</th><th>품목명</th><th>제품명</th><th>설치자</th>";
        tableHtml +=
          "<th>배송구분</th><th>설치장소</th><th>확인자</th><th>관계</th><th>방법</th><th>제품설명</th>";
        tableHtml += "</tr></thead><tbody>";

        // 데이터 행 생성
        if (response.data.orders && response.data.orders.length > 0) {
          response.data.orders.forEach((order) => {
            // 배송 방법 표시
            let deliveryText = "";
            if (order.delivery_method === "none") {
              deliveryText = "물류(기관배송)";
            } else if (order.delivery_method === "basic") {
              deliveryText = "택배배송";
            } else if (order.delivery_method === "not") {
              deliveryText = "내방";
            } else if (order.delivery_method === "clean") {
              deliveryText = "소독업체직배송";
            } else if (order.delivery_method === "supply") {
              deliveryText = "공급업체직배송";
            }

            // 정보 전달 방법 결정
            let infoType = "방문";
            if (order.delivery_method === "basic") {
              infoType = "방문";
            } else if (order.delivery_method === "not") {
              infoType = "내방";
            } else if (order.delivery_method === "supply") {
              infoType = "유선";
            }

            // 설치 일자 형식
            let installDate = "";
            if (!order.rentproduct) {
              installDate = this.formatDate(order.orderdate);
            } else {
              installDate = `${this.formatDate(
                order.rentstart
              )}~${this.formatDate(order.rentend)}`;
            }

            // 품목 정보 처리
            const products = order.name2 ? order.name2.split(",") : [];
            const codes = order.b_name3 ? order.b_name3.split(",") : [];

            if (products.length > 0) {
              products.forEach((product, index) => {
                const code = codes[index] || "";

                tableHtml += `<tr>`;
                tableHtml += `<td>${installDate}</td>`;
                tableHtml += `<td>${order.order_name || ""}</td>`;
                tableHtml += `<td>${order.number || ""}</td>`;
                tableHtml += `<td>${order.gender || ""}</td>`;
                tableHtml += `<td>${code}</td>`;
                tableHtml += `<td>${product}</td>`;
                tableHtml += `<td>${product}</td>`;
                tableHtml += `<td>${order.manager || ""}</td>`;
                tableHtml += `<td>${deliveryText}</td>`;
                tableHtml += `<td>${order.address} ${
                  order.addressdetail || ""
                }</td>`;
                tableHtml += `<td>${
                  order.guardname && order.guardname !== "본인"
                    ? order.guardname
                    : order.order_name
                }</td>`;
                tableHtml += `<td>${
                  order.guardname && order.guardname !== "본인"
                    ? order.guardtarget || "보호자"
                    : "본인"
                }</td>`;
                tableHtml += `<td>${infoType}</td>`;
                tableHtml += `<td>설명함</td>`;
                tableHtml += `</tr>`;
              });
            } else {
              tableHtml += `<tr>`;
              tableHtml += `<td>${installDate}</td>`;
              tableHtml += `<td>${order.order_name || ""}</td>`;
              tableHtml += `<td>${order.number || ""}</td>`;
              tableHtml += `<td>${order.gender || ""}</td>`;
              tableHtml += `<td></td>`;
              tableHtml += `<td></td>`;
              tableHtml += `<td></td>`;
              tableHtml += `<td>${order.manager || ""}</td>`;
              tableHtml += `<td>${deliveryText}</td>`;
              tableHtml += `<td>${order.address} ${
                order.addressdetail || ""
              }</td>`;
              tableHtml += `<td>${
                order.guardname && order.guardname !== "본인"
                  ? order.guardname
                  : order.order_name
              }</td>`;
              tableHtml += `<td>${
                order.guardname && order.guardname !== "본인"
                  ? order.guardtarget || "보호자"
                  : "본인"
              }</td>`;
              tableHtml += `<td>${infoType}</td>`;
              tableHtml += `<td>설명함</td>`;
              tableHtml += `</tr>`;
            }
          });
        } else {
          tableHtml +=
            '<tr><td colspan="14" style="text-align:center;">데이터가 없습니다.</td></tr>';
        }

        tableHtml += "</tbody>";

        // 데이터 효율적으로 로드
        this.loadDataEfficiently(tableHtml);

        // 엑셀 내보내기
        setTimeout(() => {
          this.exportExcelAdvanced("i");
          Swal.close();
        }, 1000);
      } catch (error) {
        console.error("엑셀 변환 중 오류 발생:", error);
        Swal.fire({
          title: "오류",
          text: "엑셀 변환 중 오류가 발생했습니다.",
          icon: "error",
          confirmButtonText: "확인",
        });
        window.isProcessing = false;
      }
    },

    showSmsHistory() {
      // Swal.fire({
      //   title: "문자발송내역",
      //   width: "90%",
      //   html: `
      //       <div class="flexcolumn sms_area" style="height:600px;">
      //         <div class="flex">
      //           <div class="sms_tab_menu all">전체</div>
      //           <div class="sms_tab_menu basic">카카오/문자</div>
      //           <div class="sms_tab_menu alert">알림톡</div>
      //           <div class="sms_tab_menu doc tab_on">계약서</div>
      //         </div>
      //         <table class="sms_table sms_display">
      //           <thead>
      //             <tr class="tablemenu">
      //               <th>일자</th>
      //               <th>성함</th>
      //               <th>주민번호</th>
      //               <th>구분</th>
      //               <th>계약서</th>
      //               <th>발신번호</th>
      //               <th>수신번호</th>
      //               <th>서명</th>
      //               <th>주문서번호</th>
      //             </tr>
      //           </thead>
      //           <tbody class="sms_table_tbody">
      //             <tr>
      //               <td colspan="9">데이터를 불러오는 중입니다...</td>
      //             </tr>
      //           </tbody>
      //         </table>
      //       </div>
      //     `,
      //   allowOutsideClick: false,
      //   showCancelButton: true,
      //   showConfirmButton: false,
      //   cancelButtonColor: "#d33",
      //   cancelButtonText: "닫기",
      // });

      this.getSmsHistory("basic");
    },
    async getSmsHistory() {
      try {
        const response = await sendkakao_get_url("1681102066", "wjdwhdrkr2");

        window.open(response.data.result, '_blank', 'width=1380,height=800');
      } catch (error) {
        console.error("SMS 내역 로딩 중 오류:", error);
        Swal.fire({
          title: "오류",
          text: "SMS 내역을 불러오는 중 오류가 발생했습니다.",
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    },
    async showFaxHistory() {
      try {
        // 실제 구현 시 아래 코드 활성화
        /*
          const response = await axios.post('/api/fax-history-url', {
            companynumber: "회사번호",
            popbillid: "팝빌아이디"
          });
          
          if (response.data && response.data.data && response.data.data.result) {
            window.open(response.data.data.result, "_blank");
          }
          */

        // 현재는 개발 중이므로 알림만 표시
        this.deving();
      } catch (error) {
        console.error("팩스 내역 URL 가져오기 오류:", error);
        Swal.fire({
          title: "오류",
          text: "팩스 발송 내역을 불러오는 중 오류가 발생했습니다.",
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    },
    // 주문서 Excel 배치 등록
    showOrderExcelBatch() {
      Swal.fire({
        icon: "info",
        title: "주문서엑셀등록",
        width: "40%",
        html: `<div style="display:flex; flex-direction:column; gap:10px; justify-content:flex-start; align-items:flex-start; font-weight:bold;">
                <div style="font-weight:bold;">* 주문서엑셀등록은 주문서의 일괄 파일을 업로드하여 주문서를 일괄입력하는 기능입니다.</div>
                <div style="font-weight:bold;">* 일괄 양식 파일을 다운로드하여 사용하실 수 있습니다.</div>
                <div style="font-weight:bold;">* 사업자에 등록되어있는 수급자만 주문서가 입력됩니다.</div>
                <div style="font-weight:bold;">* 구입제품만 등록이 가능합니다.</div>
                </div>
            <div class="flex" style="margin:10px 0px;">
                <div class="order_excel_batch_btn" style="margin-right: 10px; padding: 10px; background: #1a2136; color: white; border-radius: 5px; cursor: pointer;" @click="excelBatchDownload">양식파일 다운로드</div>
                <div class="order_excel_batch_btn" style="padding: 10px; background: #1a2136; color: white; border-radius: 5px; cursor: pointer;" @click="excelBatchUpload">주문서엑셀등록</div>
            </div>`,
        cancelButtonText: "닫기",
        allowOutsideClick: false,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonColor: "#d33",
      });
    },

    // Excel 양식 파일 다운로드
    excelBatchDownload() {
      // 실제 API 호출 대신 샘플 파일을 생성하여 다운로드
      try {
        // 샘플 데이터 생성
        const sampleData = [
          {
            주문일자: new Date().toISOString().slice(0, 10),
            수급자성함: "홍길동",
            주민번호: "123456-1234567",
            품목코드: "P001",
            수량: 1,
            배송주소: "서울시 강남구",
            상세주소: "123-456",
            연락처1: "010-1234-5678",
            연락처2: "02-123-4567",
            보호자성함: "홍보호",
            메모: "배송 전 연락 바랍니다.",
          },
        ];

        // 엑셀 워크시트 생성
        const worksheet = XLSX.utils.json_to_sheet(sampleData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "주문서양식");

        // 엑셀 파일 다운로드
        XLSX.writeFile(workbook, "주문배치일괄등록.xlsx");

        Swal.fire({
          title: "다운로드 완료",
          text: "양식 파일이 다운로드 되었습니다.",
          icon: "success",
          confirmButtonText: "확인",
        });
      } catch (error) {
        console.error("양식 파일 다운로드 중 오류:", error);
        Swal.fire({
          title: "오류",
          text: "양식 파일 다운로드 중 오류가 발생했습니다.",
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    },

    // Excel 배치 파일 업로드 및 처리
    excelBatchUpload() {
      // 파일 입력 요소 생성
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".xlsx, .xls";
      input.multiple = true; // 다중 파일 선택 가능

      input.onchange = async (e) => {
        const files = e.target.files;
        if (!files.length) return;

        try {
          // 로딩 표시
          Swal.fire({
            title: "일괄 파일 처리중...",
            text: "잠시만 기다려주세요.",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          const results = [];
          // const dataObj = {};

          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            // Excel 파일 읽기
            const data = await this.readExcelFile(file);

            // 실제 구현 시 데이터 처리 로직 추가
            results.push({
              filename: file.name,
              data: data,
            });
          }

          // 현재는 개발 중이므로 성공 메시지만 표시
          Swal.fire({
            title: "처리 완료",
            html: `
                <div>
                  <p style="font-weight:bold;">처리된 파일: ${results.length}개</p>
                  <p style="font-weight:bold;">미등록 수급자: 0명</p>
                  <p style="font-weight:bold;">미등록 품목번호: 0개</p>
                </div>
              `,
            icon: "success",
            width: "50%",
          });

          // 실제로는 여기서 API 호출하여 서버로 데이터 전송
          /*
            const response = await axios.post('/api/batch-process-excel', {
              data: dataObj,
              company: "회사명"
            });
            
            // 응답 처리
            */
        } catch (error) {
          console.error("파일 처리 중 오류:", error);
          Swal.fire({
            title: "오류 발생",
            text: "파일 처리 중 오류가 발생했습니다.",
            icon: "error",
          });
        }
      };

      // 파일 선택 다이얼로그 표시
      input.click();
    },

    // Excel 파일 읽기 함수
    async readExcelFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (e) {
          try {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            resolve(jsonData);
          } catch (error) {
            reject(error);
          }
        };

        reader.onerror = function (error) {
          reject(error);
        };

        reader.readAsBinaryString(file);
      });
    },

    // 자격변경 알림 보기
    showQualificationChangeAlert(sdate, edate) {
      // 현재 날짜 가져오기
      const today = new Date();
      const firstDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      );
      const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      );

      // 날짜 포맷 변환 함수
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        return `${year}${month}`;
      };

      // 기본값 설정
      const startDate = sdate || formatDate(firstDayOfMonth);
      const endDate = edate || formatDate(lastDayOfMonth);

      // HTML 생성
      const yearOptions = [];
      for (let y = today.getFullYear(); y >= 2020; y--) {
        yearOptions.push(`<option value="${y}">${y}년</option>`);
      }

      const monthOptions = [];
      for (let m = 1; m <= 12; m++) {
        monthOptions.push(
          `<option value="${String(m).padStart(2, "0")}">${m}월</option>`
        );
      }

      Swal.fire({
        title: "자격변경",
        html: `
            <div style="margin-bottom:10px; display:flex; align-items:center; justify-content:center;">
              <select id="claim_alert_start_year" style="padding:5px; border:1px solid #ddd; border-radius:5px; margin-right:5px;">
                ${yearOptions.join("")}
              </select>
              <select id="claim_alert_start_month" style="padding:5px; border:1px solid #ddd; border-radius:5px;">
                ${monthOptions.join("")}
              </select>
              <span style="margin:0 10px; font-weight:bold;">~</span>
              <select id="claim_alert_end_year" style="padding:5px; border:1px solid #ddd; border-radius:5px; margin-right:5px;">
                ${yearOptions.join("")}
              </select>
              <select id="claim_alert_end_month" style="padding:5px; border:1px solid #ddd; border-radius:5px;">
                ${monthOptions.join("")}
              </select>
              <button onclick="Swal.getPopup().querySelector('#search_qualification_btn').click()" style="padding:5px 10px; margin-left:10px; background:#4CAF50; color:white; border:none; border-radius:5px; cursor:pointer;">조회</button>
              <button id="search_qualification_btn" style="display:none;" @click="fetchQualificationChangeData()"></button>
            </div>
            <div style="position: relative;">
              <table style="margin:0 auto; border-collapse:collapse; width:100%; text-align:center;">
                <thead style="position: sticky; top: 0; background: #f5f5f5; z-index: 1;">
                  <tr>
                    <th style="width:100px; border:1px solid #ddd; font-weight:bold; height:30px; text-align:center;">수급자</th>
                    <th style="width:120px; border:1px solid #ddd; font-weight:bold; height:30px; text-align:center;">주민번호</th>
                    <th style="width:100px; border:1px solid #ddd; font-weight:bold; height:30px; text-align:center;">이전자격</th>
                    <th style="width:100px; border:1px solid #ddd; font-weight:bold; height:30px; text-align:center;">변동자격</th>
                    <th style="width:100px; border:1px solid #ddd; font-weight:bold; height:30px; text-align:center;">변동일자</th>
                  </tr>
                </thead>
              </table>
              <div style="max-height: 500px; overflow-y: auto;">
                <table style="margin:0 auto; border-collapse:collapse; width:100%; text-align:center;">
                  <tbody id="qualification_data_table">
                    <tr>
                      <td colspan="5" style="border:1px solid #ddd; height:30px;">데이터를 조회해 주세요.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          `,
        icon: "info",
        width: "50%",
        showConfirmButton: false,
        cancelButtonText: "닫기",
        cancelButtonColor: "#d33",
        showCancelButton: true,
        didOpen: () => {
          // 기본 날짜 설정
          const startYear = startDate.substring(0, 4);
          const startMonth = startDate.substring(4, 6);
          const endYear = endDate.substring(0, 4);
          const endMonth = endDate.substring(4, 6);

          document.getElementById("claim_alert_start_year").value = startYear;
          document.getElementById("claim_alert_start_month").value = startMonth;
          document.getElementById("claim_alert_end_year").value = endYear;
          document.getElementById("claim_alert_end_month").value = endMonth;
        },
      });
    },

    // 자격변경 데이터 조회
    async fetchQualificationChangeData() {
      try {
        // DOM 요소에서 날짜 값 가져오기
        const popup = Swal.getPopup();
        if (!popup) return;

        // const startYear = popup.querySelector('#claim_alert_start_year').value;
        // const startMonth = popup.querySelector('#claim_alert_start_month').value;
        // const endYear = popup.querySelector('#claim_alert_end_year').value;
        // const endMonth = popup.querySelector('#claim_alert_end_month').value;

        // const startDate = startYear + startMonth;
        // const endDate = endYear + endMonth;

        // 현재는 개발 중이므로 샘플 데이터만 표시
        const sampleData = [
          {
            FNM: "김철수",
            key: "ClaimAlert:20241121:(복)복지용구의료기:L2007137253",
            data: {
              BDAY: "19421008",
              QLF_CHWIDUK_DT: "20241027",
              CHG_BF_QLF_TYPE: "일반",
              CHG_AF_QLF_TYPE: "장애",
            },
          },
          {
            FNM: "이영희",
            key: "ClaimAlert:20241122:(복)복지용구의료기:L1624001486",
            data: {
              BDAY: "19331224",
              QLF_CHWIDUK_DT: "20241108",
              CHG_BF_QLF_TYPE: "일반",
              CHG_AF_QLF_TYPE: "장애",
            },
          },
        ];

        // 테이블 내용 생성
        let tableContent = "";

        if (sampleData.length > 0) {
          sampleData.forEach((obj) => {
            const prevType = obj.data.CHG_BF_QLF_TYPE || "감경";
            const newType = obj.data.CHG_AF_QLF_TYPE || "감경";
            const isDisabled = newType === "장애" ? "color:red;" : "";

            tableContent += `<tr>
                <td style="width:100px; border:1px solid #ddd; height:30px;">${
                  obj.FNM
                }</td>
                <td style="width:120px; border:1px solid #ddd; height:30px;">${
                  obj.key.split(":")[3]
                }</td>
                <td style="width:100px; border:1px solid #ddd; height:30px;">${prevType}</td>
                <td style="width:100px; border:1px solid #ddd; height:30px; ${isDisabled}">${newType}</td>
                <td style="width:100px; border:1px solid #ddd; height:30px;">${
                  obj.data.QLF_CHWIDUK_DT
                }</td>
              </tr>`;
          });
        } else {
          tableContent = `<tr><td colspan="5" style="border:1px solid #ddd; height:30px;">조회된 데이터가 없습니다.</td></tr>`;
        }

        // 테이블 내용 업데이트
        const tableElement = popup.querySelector("#qualification_data_table");
        if (tableElement) {
          tableElement.innerHTML = tableContent;
        }

        // 실제 구현 시 API 호출 코드
        /*
          const response = await axios.post('/api/qualification-change', {
            claim_alert_date: this.getMonthRange(startDate, endDate),
            company: "회사명"
          });
          
          if (response.data.code === 200) {
            // 테이블 업데이트 로직
          }
          */
      } catch (error) {
        console.error("자격변경 데이터 조회 오류:", error);
        Swal.fire({
          title: "오류",
          text: "자격변경 데이터를 불러오는 중 오류가 발생했습니다.",
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    },

    updateSelectedOrders() {
      const selectedOrders = this.orders.filter((order) => order.selected);
      if (selectedOrders.length === 0) {
        Swal.fire({
          title: "알림",
          text: "일괄 수정할 주문서를 선택해주세요.",
          icon: "warning",
          confirmButtonText: "확인",
        });
        return;
      }

      Swal.fire({
        title: "주문서 일괄 수정",
        html: `
            <div style="display: flex; flex-direction: column; gap: 15px; padding: 10px;">
              <div style="text-align: left; margin-bottom: 10px; font-weight: bold; color: #333;">
                선택된 주문서 수: ${selectedOrders.length}개
              </div>
              <div style="text-align: left;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">주문상태</label>
                <select id="batch-order-confirm1" class="swal2-select" style="width: 100%; margin: 0;">
                  <option value="">변경 안함</option>
                  <option value="1">미확정</option>
                  <option value="2">확정</option>
                </select>
              </div>


              <div style="text-align: left;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">담당자</label>
                <select id="batch-manager" class="swal2-select" style="width: 100%; margin: 0;">
                  <option value="">담당자 선택</option>
                </select>
              </div>
              
              <!--div style="text-align: left;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">메모</label>
                <textarea id="batch-comment" class="swal2-textarea" placeholder="메모" style="width: 100%; margin: 0; height: 80px;"></textarea>
              </div-->
              
              <div style="text-align: left;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">배송방법</label>
                <select id="batch-delivery-method" class="swal2-select" style="width: 100%; margin: 0;">
                  <option value="">변경 안함</option>
                  <option value=0>내방</option>
                  <option value=1>택배</option>
                  <option value=2>물류 (기관배송)</option>
                  <option value=3>소독</option>
                  <option value=4>공급업체</option>
                </select>
              </div>
              
              <div style="text-align: left;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">배송상태</label>
                <select id="batch-delivery-status" class="swal2-select" style="width: 100%; margin: 0;">
                  <option value="">변경 안함</option>
                  <option value="0">배송대기</option>
                  <option value="1">배송완료</option>
                  <option value="2">회수중</option>
                  <option value="3">회수완료</option>
                </select>
              </div>
              
              <!--div style="text-align: left;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">공단계약</label>
                <select id="batch-contract" class="swal2-select" style="width: 100%; margin: 0;">
                  <option value="">변경 안함</option>
                  <option value="0">미계약</option>
                  <option value="1">계약완료</option>
                  <option value="2">부분계약</option>
                  <option value="3">취소계약</option>
                </select>
              </div-->
            </div>
          `,
        showCancelButton: true,
        confirmButtonText: "일괄 수정",
        cancelButtonText: "취소",
        didOpen: () => {
          const managerSelect = document.getElementById("batch-manager");
          this.userList.forEach((user) => {
            managerSelect.innerHTML += `<option value="${user.name}">${user.name}</option>`;
          });
        },
        preConfirm: () => {
          const orderStatus = document.getElementById(
            "batch-order-confirm1"
          ).value;
          const manager = document.getElementById("batch-manager").value;
          // const comment = document.getElementById('batch-comment').value;
          const deliveryMethod = document.getElementById(
            "batch-delivery-method"
          ).value;
          const deliveryStatus = document.getElementById(
            "batch-delivery-status"
          ).value;
          // const contract = document.getElementById('batch-contract').value;

          // 수정할 데이터 객체 생성
          const updateData = {};

          if (orderStatus) updateData.confirm1 = parseInt(orderStatus);
          if (manager) updateData.manager = manager;
          // if (comment) updateData.comment = comment;
          if (deliveryMethod)
            updateData.deliveryType = parseInt(deliveryMethod);
          if (deliveryStatus)
            updateData.deliveryStatus = parseInt(deliveryStatus);
          // if (contract) updateData.contract = contract;

          // 아무 필드도 선택하지 않은 경우
          if (Object.keys(updateData).length === 0) {
            Swal.showValidationMessage("최소 하나 이상의 항목을 수정해주세요.");
            return false;
          }

          // selectedOrders에서 guardTarget 제외하고 반환
          const filteredOrders = selectedOrders.map((order) => {
            const {
              guardTarget,
              contractState,
              cancled,
              printCnt,
              confirm2,
              confirm1Manager,
              client,
              orderProducts,
              selected,
              ...orderWithoutGuardTarget
            } = order;
            console.log(
              "guardTarget",
              guardTarget,
              contractState,
              cancled,
              printCnt,
              confirm2,
              confirm1Manager,
              client,
              orderProducts,
              selected
            );
            return orderWithoutGuardTarget;
          });

          return {
            updateData,
            selectedOrders: filteredOrders,
          };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const { updateData, selectedOrders } = result.value;

          // 로딩 표시
          this.$swalLoading();

          // 선택된 주문서에 업데이트 데이터 적용
          const ordersToUpdate = selectedOrders.map((order) => ({
            id: order.id,
            ...updateData,
          }));

          console.log("ordersToUpdate", ordersToUpdate);

          for (let i = 0; i < ordersToUpdate.length; i++) {
            // API 호출
            batchUpdateOrder(ordersToUpdate[i])
              .then((response) => {
                console.log("response", response);
                this.$swalClose();
                Swal.fire({
                  title: "수정 완료",
                  text: "선택한 주문서가 일괄 수정되었습니다.",
                  icon: "success",
                  confirmButtonText: "확인",
                }).then(() => {
                  // 주문 목록 새로고침
                  this.fetchOrders();
                });
              })
              .catch((error) => {
                this.$swalClose();
                console.error("주문서 일괄 수정 오류:", error);
                Swal.fire({
                  title: "오류",
                  text: "주문서 일괄 수정 중 오류가 발생했습니다.",
                  icon: "error",
                  confirmButtonText: "확인",
                });
              });
          }
        }
      });
    },
    // 선택된 주문서 일괄 출력
    printSelectedOrders() {
      const selectedOrders = this.orders.filter((order) => order.selected);

      if (selectedOrders.length === 0) {
        Swal.fire({
          title: "알림",
          text: "출력할 주문서를 선택해주세요.",
          icon: "warning",
          confirmButtonText: "확인",
        });
        return;
      }

      Swal.fire({
        title: "출력 유형 선택",
        html: `
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="font-weight: bold; margin-bottom: 10px;">출력할 문서 유형을 선택하세요</div>
              <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
                <button class="print-type-btn" data-type="all" style="padding: 10px 15px; background: #1a2136; color: white; border: none; border-radius: 5px; cursor: pointer; min-width: 120px;">전체</button>
              </div>
            </div>
          `,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "닫기",
        cancelButtonColor: "#d33",
        didOpen: () => {
          // 출력 유형 버튼에 이벤트 연결
          const printTypeBtns = document.querySelectorAll(".print-type-btn");
          printTypeBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
              const printType = btn.getAttribute("data-type");
              this.executePrint(selectedOrders, printType);
              Swal.close();
            });
          });
        },
      });
    },

    // 실제 출력 기능 수행
    executePrint(orders, printType) {
      // 선택된 주문서 ID 배열
      const orderIds = orders.map((order) => order.id);
      console.log(`출력 유형: ${printType}, 주문서 IDs:`, orderIds);

      // 현재는 개발 중이므로 알림만 표시
      Swal.fire({
        title: "인쇄 준비 중",
        text: `${orderIds.length}개 주문서 출력을 준비하고 있습니다...`,
        icon: "info",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        console.log(orderIds);
        this.orderId = orderIds;
        this.showModal_obj.doc_print = true;
        this.person = orderIds.length;
      });
    },

    // 주문서 복사 기능
    copyOrder(order) {
      Swal.fire({
        title: "주문서 복사",
        text: `${order.order_name}님의 주문서를 복사하시겠습니까?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "복사",
        cancelButtonText: "취소",
      }).then((result) => {
        if (result.isConfirmed) {
          this.executeCopyOrder(order);
        }
      });
    },

    // 실제 주문서 복사 실행
    async executeCopyOrder() {
      try {
        // 로딩 표시
        Swal.fire({
          title: "주문서 복사 중",
          text: "잠시만 기다려주세요...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        // 주문서 복사 로직
        /*
          const response = await axios.post('/api/copy-order', {
            orderId: order.num,
          });
          
          if (response.data.success) {
            Swal.fire({
              title: '복사 완료',
              text: '주문서가 성공적으로 복사되었습니다.',
              icon: 'success',
              confirmButtonText: '확인'
            });
            
            // 주문서 목록 갱신
            this.fetchOrders();
          } else {
            throw new Error(response.data.message || '주문서 복사 실패');
          }
          */

        // 현재는 개발 중이므로 성공 메시지만 표시
        setTimeout(() => {
          Swal.fire({
            title: "복사 완료",
            text: "주문서가 성공적으로 복사되었습니다.",
            icon: "success",
            confirmButtonText: "확인",
          });
        }, 1000);
      } catch (error) {
        console.error("주문서 복사 중 오류:", error);
        Swal.fire({
          title: "오류",
          text: "주문서 복사 중 오류가 발생했습니다.",
          icon: "error",
          confirmButtonText: "확인",
        });
      }
    },

    // 시작일과 종료일 사이의 월 범위 배열 생성
    getMonthRange(startDate, endDate) {
      const result = [];

      // 문자열을 Date 객체로 변환
      const start = new Date(
        startDate.slice(0, 4),
        parseInt(startDate.slice(4, 6)) - 1
      );
      const end = new Date(
        endDate.slice(0, 4),
        parseInt(endDate.slice(4, 6)) - 1
      );

      // 월 범위 계산
      let current = new Date(start);
      while (current <= end) {
        const year = current.getFullYear();
        const month = String(current.getMonth() + 1).padStart(2, "0");
        result.push(year + month);

        // 다음 월로 이동
        current.setMonth(current.getMonth() + 1);
      }

      return result;
    },

    // 수가변경 안내 팝업
    showFeeChangeNotice() {
      Swal.fire({
        title: "수가변경품목 렌탈취소계약 안내",
        icon: "info",
        html: `
            <div style="text-align: left; padding: 10px; line-height: 1.6; font-size: 16px;">
              <p><strong>① '렌탈취소' 메뉴로 이동해주세요</strong></p>
              <p><strong>② 선택렌탈취소계약 진행 안내</strong></p>
              <p>③ 선택렌탈취소계약 진행 시 계약종료일이 자동으로 <strong style="color: #ff4500;">2025-04-30</strong>로 설정됩니다.</p>
              <p>④ 취소할 계약은 4개의 데이터역에서 조시되며, 이후 수계약이 필요합니다.</p>
              <br>
              <p><strong>⑤ 수계약의 방법</strong></p>
              <p>⑥ <strong>선택렌탈연장</strong> 기능을 통해 렌탈적으로 계약연장 진행</p> 
              <p>⑦ 혹은 개별 품목별로 연장 진행 가능</p>
              <br>
              <p><strong>⑧ 참고사항</strong></p>
              <p style="color: #ff4500; font-weight: bold;">⑨ 렌탈취소계약 진행 시 공단차의 반응이 없으면 프로그램 자체에서 업데이트 진행 예정입니다.</p>
              <p style="color: #ff4500; font-weight: bold;">⑩ 렌탈연장 진행 시 수급자의 현재 적용구간까지 연장으로 권장합니다.</p>
              <p style="font-weight: bold;">⑪ 특일 취소 및 특일 계약연장 시 '동일품목 계약건 알림'이 발생할 수 있습니다.<br/>
                <strong>24시간 경과 후</strong> 수계약을 진행하시기 바랍니다</p>
            </div>
          `,
        confirmButtonText: "확인",
        confirmButtonColor: "#3085d6",
        width: "800px",
      });
    },
  },
  beforMount() {},
  mounted() {
    this.fetchOrders();
    this.getUserListData();
  },
  watch: {
    orders: {
      deep: true,
      handler() {
        this.selectAll = this.orders.every((order) => order.selected);
      },
    },
    startDate: {
      handler() {
        this.fetchOrders();
      },
    },
    endDate: {
      handler() {
        this.fetchOrders();
      },
    },
  },
  created() {
    // 컴포넌트 생성 시 날짜 기본값 설정 및 초기 데이터 로드
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.startDate = this.repace_date_hipen(firstDayOfMonth);
    this.endDate = this.repace_date_hipen(today);
    this.fetchOrders();
  },
};
</script>
