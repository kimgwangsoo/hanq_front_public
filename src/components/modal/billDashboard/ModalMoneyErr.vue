<template>
  <BDHeaderTitle>
    청구 금액 오류 내용 [ 10 ]
  </BDHeaderTitle>

  <BDErrTableContainer>
    <BDErrTable>
      <thead>
        <tr>
          <th>성함</th>
          <th>인정번호</th>
          <th>입력금액</th>
          <th>청구금액</th>
          <th>차액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in 10" :key="item">
          <td>홍길동</td>
          <td>L1234567890</td>
          <td>{{ formatPrice(110500) }}원 </td>
          <td>{{ formatPrice(109700) }}원 </td>
          <td>{{ formatPrice(110500 - 109700) }}원 </td>
        </tr>
      </tbody>
    </BDErrTable>
  </BDErrTableContainer>
</template>

<script>
import * as PublicCss from '@/assets/styles/public.js'
import * as BillDashboardCss from '@/assets/styles/billDashboard/BillDashboardCss.js'
import { formatPrice } from '@/utils/format.js'

export default {
  name: 'ModalMoneyErr',
  components: {
    ...PublicCss,
    ...BillDashboardCss,
  },
  setup() {
    return {
      formatPrice,
    }
  }
}
</script>
