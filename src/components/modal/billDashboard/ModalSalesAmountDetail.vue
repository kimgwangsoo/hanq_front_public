<template>
  <div>
    <BDHeaderTitle>판매수량</BDHeaderTitle>

    <FlexDiv>
      <BDMonthSelect v-model="selectedMonth" class="marginRight10">
        <option value="1">1월</option>
        <option value="2">2월</option>
        <option value="3">3월</option>
        <option value="4">4월</option>
        <option value="5">5월</option>
        <option value="6">6월</option>
        <option value="7">7월</option>
        <option value="8">8월</option>
        <option value="9">9월</option>
        <option value="10">10월</option>
        <option value="11">11월</option>
        <option value="12">12월</option>
      </BDMonthSelect>

      <GreenBtn>엑셀변환</GreenBtn>
    </FlexDiv>

    <BDAmountContainer>
      <BDAmountTable>
        <thead>
          <tr>
            <th>품목</th>
            <th>품목코드</th>
            <th>품목명</th>
            <th>금액</th>
            <th>판매수량</th>
            <th>반품수량</th>
            <th>합계</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in 100" :key="item">
            <td>미끄럼 방지용품</td>
            <td>1234567890</td>
            <td>위풋 논슬립 돌돌이 양말 양면</td>
            <td>6,500원</td>
            <td>100개</td>
            <td>12개</td>
            <td>572,000원</td>
          </tr>
        </tbody>
      </BDAmountTable>
    </BDAmountContainer>
  </div>
</template>

<script>
import * as PublicCss from '@/assets/styles/public.js'
import * as ModalCss from "@/assets/styles/ModalCss.js";
import * as BillDashboardCss from '@/assets/styles/billDashboard/BillDashboardCss.js'

export default {
  name: 'ModalSalesAmountDetail',
  components: {
    ...PublicCss,
    ...ModalCss,
    ...BillDashboardCss,
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
};
</script>