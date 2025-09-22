<template>
  <ModalPaymentContainer>
    <Title>{{ cmd == 'register' ? '입금 등록' : '입금 수정' }}</Title>
    <FormGroup>
      <Label>입금액</Label>
      <PaymentInput type="number" v-model.number="paymentData.price" placeholder="입금액을 입력하세요" />
    </FormGroup>
    <FormGroup>
      <Label>입금일자</Label>
      <Datepicker 
      v-model:value="paymentData.payAt"
      placeholder="입금일자"
      style="width:150px;height:35px;"/>
    </FormGroup>
    <FormGroup>
      <Label>입금 유형</Label>
      <SelectField v-model.number="paymentData.type">
        <option value=0>계좌이체</option>
        <option value=1>카드결제</option>
        <option value=2>현금</option>
      </SelectField>
    </FormGroup>
    <FormGroup v-if="isRental">
      <Label>대여 시작일</Label>
      <PaymentInput type="date" v-model="paymentData.rentStartDate" />
    </FormGroup>
    <FormGroup v-if="isRental">
      <Label>대여 종료일</Label>
      <PaymentInput type="date" v-model="paymentData.rentEndDate" />
    </FormGroup>
    <FormGroup>
      <Label>메모</Label>
      <TextareaField v-model="paymentData.txt" placeholder="메모를 입력하세요" />
    </FormGroup>
    <FormGroup>
      <Label>처리 상태</Label>
      <SelectField v-model.number="paymentData.action">
        <option value=0>입금완료</option>
        <option value=1>환불완료</option>
      </SelectField>
    </FormGroup>
    <ButtonGroup>
      <SaveButton @click="savePayment">저장</SaveButton>
      <CancelButton @click="cancel">취소</CancelButton>
    </ButtonGroup>
  </ModalPaymentContainer>
 </template>

<script>
import { defineComponent, reactive, computed } from 'vue';
import * as PaymentCss from '@/assets/styles/payment/PaymentModalCss.js';
import Datepicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import Swal from 'sweetalert2';
import { createPayment, updatePayment } from '@/api/payment';
export default defineComponent({
  name: 'ModalPayment',
  components: {
    ...PaymentCss,
    Datepicker
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    orderId: {
      type: Number,
      default: null
    },
    clientData: {
      type: Object,
      default: null
    },
    parent: {
      type: String,
      default: 'client'
    },
    cmd: {
      type: String,
      default: 'register'
    },
    paymentCurrentData: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:show', 'cancel', 'save'],
  setup(props, { emit }) {
    const paymentData = reactive({
      id: (props.cmd == 'update') ? props.paymentCurrentData.id : null,
      orderId: props.orderId,
      clientId: props.clientData.id,
      price: (props.cmd == 'update') ? props.paymentCurrentData.price : 0,
      payAt: (props.cmd == 'update') ? new Date(props.paymentCurrentData.payAt) : new Date(),
      type: (props.cmd == 'update') ? props.paymentCurrentData.type : 0,
      txt: (props.cmd == 'update') ? props.paymentCurrentData.txt : '',
      action: (props.cmd == 'update') ? props.paymentCurrentData.action : 0,
    });

    const isRental = computed(() => {
      return paymentData.type === '대여';
    });

    const savePayment = async () => {
      console.log(props.cmd,"props.cmd")
      if(paymentData.price == 0 || paymentData.price == null){
        Swal.fire({
          title: '입금액을 입력해주세요.',
          icon: 'warning',
          confirmButtonText: '확인'
        });
        return;
      }
      if(props.cmd == 'update'){
        const response = await updatePayment(paymentData.id,paymentData);
        if(response.success){
          Swal.fire({
            title: '입금 수정이 완료되었습니다.',
            icon: 'success',
            confirmButtonText: '확인'
          });
        }
      }else{
        // 등록 시에는 id 필드 제거
        const paymentDataForCreate = { ...paymentData };
        delete paymentDataForCreate.id;
        
        const response = await createPayment(paymentDataForCreate);
        if(response.success){
          Swal.fire({
            title: '입금 등록이 완료되었습니다.',
            icon: 'success',
            confirmButtonText: '확인'
          });
        }
      }
      
      // 여기서 결제 정보 저장 로직 구현
      emit('save', paymentData);
      emit('update:show', false);
    };

    const cancel = () => {
      emit('cancel');
      emit('update:show', false);
    };

    return {
      paymentData,
      isRental,
      savePayment,
      updatePayment,
      cancel
    };
  }
});
</script>

