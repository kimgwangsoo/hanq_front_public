<template>
  <ModalPage
    v-model:show="showPaymentModal"
    :height="paymentModalHeight"
    :width="paymentModalWidth"
    :parent="'payment'"
  >
    <ModalPayment
      :show="showPaymentModal"
      @update:show="showPaymentModal = $event"
      @save="getPaymentList"
      :clientData="clientData"
      :paymentCurrentData="paymentCurrentData"
      :cmd="cmd"
    />
  </ModalPage>
  <ModalPage
    v-model:show="showNeedModal"
    :height="needModalHeight"
    :width="needModalWidth"
    :parent="'need'"
  >
    <ModalNeed
      :show="showNeedModal"
      @update:show="showNeedModal = $event"
      @save="getAllClientNeed"
      :clientData="clientData"
      :needCurrentData="needCurrentData"
      :cmd="cmd"
    />
  </ModalPage>
  <Container>
    <InfoRow>
      <InfoColumn v-if="parent == 'mainlookup'" withBorder height="100px">
        <SectionHeader>수급자 기본정보</SectionHeader>
        <SectionContent>
          <InfoText><strong>주소:</strong> {{ clientData.address }}</InfoText>
          <InfoText><strong>연락처:</strong> {{ clientData.phone1 }}</InfoText>
          <InfoText
            ><strong>센터명:</strong> {{ clientData.centerName }}</InfoText
          >
          <InfoText><strong>담당자:</strong> {{ clientData.manager }}</InfoText>
          <InfoText><strong>메모:</strong> {{ clientData.memo }}</InfoText>
        </SectionContent>
      </InfoColumn>
      <InfoColumn :style="{ width: parent === 'client' ? '100%' : '50%' }">
        <SectionHeader>입금관리</SectionHeader>
        <SectionContent>
          <FlexContainer>
            <FlexGroup>
              <span
                ><strong>총 결제금액:</strong>
                {{ paymentList.totalAmount }}</span
              >
              <span
                ><strong>입금완료:</strong> {{ paymentList.paidAmount }}</span
              >
              <span
                ><strong>환불완료:</strong> {{ paymentList.unpaidAmount }}</span
              >
            </FlexGroup>
            <div>
              <ActionButton class="register-payment" @click="registerPayment"
                >입금 등록</ActionButton
              >
            </div>
          </FlexContainer>
          <div>
            <CISTable>
              <thead>
                <tr>
                  <th>입금일자</th>
                  <th>입금액</th>
                  <th>입금방식</th>
                  <th>구분</th>
                  <th class="mobileNone">비고</th>
                  <th>수정/삭제</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in paymentList.items"
                  :key="'payment-' + index"
                >
                  <td>{{ item.payAt }}</td>
                  <td>{{ item.price }}</td>
                  <td>
                    {{
                      item.type == 0
                        ? "계좌이체"
                        : item.type == 1
                        ? "카드"
                        : "현금"
                    }}
                  </td>
                  <td>{{ item.action == 0 ? "입금완료" : "환불완료" }}</td>
                  <td class="mobileNone">{{ item.txt }}</td>
                  <td style="width: 110px">
                    <ActionButton @click="updatePaymentItem(item.id, item)"
                      >수정</ActionButton
                    >
                    <ActionButton @click="deletePaymentItem(item.id)"
                      >삭제</ActionButton
                    >
                  </td>
                </tr>
              </tbody>
            </CISTable>
          </div>
        </SectionContent>
      </InfoColumn>
    </InfoRow>
    <RentSection v-if="clientRentData.length > 0">
      <SectionHeader>대여관리</SectionHeader>
      <SectionContent>
        <CISTable>
          <thead>
            <tr>
              <th>대여시작일</th>
              <th>대여종료일</th>
              <th>대여품목</th>
              <th>대여상품명</th>
              <th>대여상태</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rent, index) in clientRentData" :key="'rent-'+index">
              <td>{{ rent.rentStart }}</td>
              <td>{{ rent.rentEnd }}</td>
              <td>{{ rent.productName }}</td>
              <td>{{ rent.productItem }}</td>
              <td :style="{ backgroundColor: rent.rentStatus === '대여중' ? '#e6f7e6' : rent.rentStatus === '회수' ? '#ffe6e6' : '' }">{{ rent.rentStatus }}</td>
            </tr>
          </tbody>
        </CISTable>
      </SectionContent>
    </RentSection>
    <NeedSection>
      <SectionHeader>욕구사정기록</SectionHeader>
      <SectionContent>
        <FlexContainer>
          <FlexGroup>
            <span><strong>총 기록 수:</strong> {{ needList.length }}</span>
          </FlexGroup>
          <div style="display: flex; align-items: center">
            <ActionButton class="register-payment" @click="registerNeedItem"
              >기록 작성하기</ActionButton
            >
          </div>
        </FlexContainer>
      </SectionContent>
      <SectionContent>
        <CISTable>
          <thead>
            <tr>
              <th>욕구사정일자</th>
              <th>욕구사정총평</th>
              <th>수정/삭제</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in needList" :key="'need-' + index">
              <td>{{ item.date }}</td>
              <td>{{ item.resultTxt }}</td>
              <td>
                <ActionButton @click="updateNeedItem(item.id, item)"
                  >수정</ActionButton
                >
                <ActionButton @click="deleteNeedItem(item.id)"
                  >삭제</ActionButton
                >
              </td>
            </tr>
          </tbody>
        </CISTable>
      </SectionContent>
    </NeedSection>
    <OrderSection>
      <SectionHeader>주문관리</SectionHeader>
      <SectionContent>
        <CISTable>
          <thead>
            <tr>
              <!-- <th>주문번호</th> -->
              <th>주문일자</th>
              <th>상품명</th>
              <th>수량</th>
              <th>금액</th>
              <th class="mobileNone">담당자</th>
              <th>배송상태</th>
            </tr>
          </thead>
          <tbody>

            <tr v-for="(order, index) in clientOrderData" :key="'order-'+index">
              <!-- <td>{{ order.orderNumber }}</td> -->
              <td>{{ order.orderDate }}</td>
              <td>{{ order.productName }}</td>
              <td>{{ order.quantity }}</td>
              <td>{{ order.amount }}</td>
              <td>{{ order.manager }}</td>
              <td>{{ 
                order.deliveryStatus === '0' ? '배송대기' : 
                order.deliveryStatus === '1' ? '배송완료' : 
                order.deliveryStatus === '2' ? '회수중' : 
                order.deliveryStatus === '3' ? '회수완료' : 
                order.deliveryStatus 
              }}</td>
            </tr>
          </tbody>
        </CISTable>
      </SectionContent>
    </OrderSection>
  </Container>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import * as PublicCss from '@/assets/styles/public.js';
import * as ClientInfoSectionCss from '@/assets/styles/ClientInfoSectionCss';
import { getPayment, deletePayment } from '@/api/payment';
import { findAllClientNeed, deleteNeed } from '@/api/client';
import Swal from 'sweetalert2';
import ModalPage from '@/components/modal/ModalPage.vue';
import ModalPayment from '@/components/modal/payment/ModalPayment.vue';
import ModalNeed from '@/components/modal/need/ModalNeed.vue';
import { getClientOrderDataByClientId } from '@/api/order';
import { getClientRentDataByClientId } from '@/api/rent';
export default {
  name: "ClientInfoSection",
  components: {
    ...PublicCss,
    ...ClientInfoSectionCss,
    ModalPayment,
    ModalPage,
    ModalNeed,
  },
  props: {
    parent: {
      type: String,
      default: "client",
    },
    clientData: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["register-payment", "update-payment", "delete-payment"],
  setup(props) {
    const cmd = ref("register");
    const paymentList = ref([]);
    const showPaymentModal = ref(false);
    const paymentModalHeight = ref("60%");
    const paymentModalWidth = ref("30%");
    const paymentCurrentData = ref({});
    const showNeedModal = ref(false);
    const needCurrentData = ref({});
    const needModalHeight = ref("60%");
    // 768px 이하일 때 모달 너비 조정
    const needModalWidth = computed(() => {
      return window.innerWidth < 768 ? "100%" : "30%";
    });
    const needList = ref([]);
    const clientOrderData = ref({});
    const clientRentData = ref({});
    const getPaymentList = async () => {
      const response = await getPayment(props.clientData.id);
      paymentList.value = response;
    }

    const fetchClientRentDataByClientId = async () => {
      const response = await getClientRentDataByClientId(props.clientData.id);
      if (response.success) {
        clientRentData.value = (response.items || []).map(o => {
          const items = o.order.orderProducts || [];
          console.log("items", o)
          const productNames = items.map(op => op.product?.pname).filter(Boolean).join(', ');
          const productItems = items.map(op => op.product?.pitem).filter(Boolean).join(', ');
          return {
            rentStart: o.rentStart,
            rentEnd: o.rentEnd,
            productName: productNames,
            productItem: productItems,
            rentStatus: o.rentStatus,
          }
        })
      }
    }

    const fetchClientOrderDataByClientId = async () => {
      const response = await getClientOrderDataByClientId(props.clientData.id);
      if (response.success) {
        console.log("response", response);
        clientOrderData.value = (response.items || []).map((o) => {
          const items = o.orderProducts || [];
          const productNames = items
            .map((op) => op.product?.pname)
            .filter(Boolean)
            .join(", ");
          console.log("productNames", productNames);
          const quantity = items.reduce(
            (sum, op) => sum + (Number(op.cnt) || 0),
            0
          );
          const amountNum = items.reduce((sum, op) => {
            const p = op.product || {};
            const unit =
              p.target === "구입" ? Number(p.buyPrice) : Number(p.rentPrice);
            return sum + (Number(unit) || 0) * (Number(op.cnt) || 0);
          }, 0);
          console.log("o", o);
          const deliveryStatus =
            o.deliveryState ||
            (o.confirm1 === 3 ? "출고" : o.confirm1 === 2 ? "확정" : "미확정");
          return {
            orderNumber: o.id,
            orderDate: o.orderDate,
            productName: productNames,
            quantity,
            amount: amountNum.toLocaleString(),
            deliveryStatus,
            manager: o.manager,
          };
        });
      }
    };

    const deletePaymentItem = async (id) => {
      Swal.fire({
        title: "결제 정보 삭제",
        text: "정말로 이 결제 정보를 삭제하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await deletePayment(id);
          if (response.success) {
            Swal.fire({
              title: "삭제 완료",
              text: "결제 정보가 성공적으로 삭제되었습니다.",
              icon: "success",
            });
            getPaymentList();
          } else {
            Swal.fire({
              title: "오류 발생",
              text: "결제 정보 삭제 중 오류가 발생했습니다.",
              icon: "error",
            });
          }
        }
      });
    };

    const updatePaymentItem = async (id, paymentData) => {
      // 현재 결제 정보 가져오기
      const currentPayment = paymentList.value.items.find(
        (item) => item.id === id
      );

      if (!currentPayment) return;

      // 수정 폼 표시
      showPaymentModal.value = true;
      cmd.value = "update";
      paymentCurrentData.value = paymentData;
      console.log(paymentCurrentData.value, "paymentCurrentData");
    };

    const registerPayment = () => {
      showPaymentModal.value = true;
      cmd.value = "register";
      paymentCurrentData.value = {};
    };

    const getAllClientNeed = async () => {
      console.log("getAllClientNeed");
      const response = await findAllClientNeed(props.clientData.id);
      needList.value = response.items;
    };

    const registerNeedItem = () => {
      showNeedModal.value = true;
      cmd.value = "register";
      needCurrentData.value = {};
    };

    const updateNeedItem = async (id, needData) => {
      console.log("updateNeedItem", id, needData);
      showNeedModal.value = true;
      cmd.value = "update";
      needCurrentData.value = needData;
    };

    const deleteNeedItem = async (id) => {
      console.log("deleteNeedItem", id);
      Swal.fire({
        title: "욕구사정기록 삭제",
        text: "정말로 이 욕구사정기록을 삭제하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteNeed(id);
          if (response.success) {
            Swal.fire({
              title: "삭제 완료",
              text: "욕구사정기록이 성공적으로 삭제되었습니다.",
              icon: "success",
            });
            getAllClientNeed();
          } else {
            Swal.fire({
              title: "오류 발생",
              text: "욕구사정기록 삭제 중 오류가 발생했습니다.",
              icon: "error",
            });
          }
        }
      });
    };

    onMounted(() => {
      if (props.clientData.id) {
        console.log("props.orders", props.orders);
        getPaymentList();
        getAllClientNeed();
        fetchClientOrderDataByClientId();
        fetchClientRentDataByClientId();
      }
    });
    return {
      clientOrderData,
      clientRentData,
      needList,
      paymentList,
      deletePaymentItem,
      updatePaymentItem,
      showPaymentModal,
      paymentModalHeight,
      getPaymentList,
      paymentModalWidth,
      cmd,
      paymentCurrentData,
      registerPayment,
      showNeedModal,
      needModalHeight,
      needModalWidth,
      needCurrentData,
      getAllClientNeed,
      updateNeedItem,
      deleteNeedItem,
      registerNeedItem,
    };
  },
};
</script>
