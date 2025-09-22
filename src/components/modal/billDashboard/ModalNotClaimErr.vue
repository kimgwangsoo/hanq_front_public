<template>
  <BDHeaderTitle>
    미청구 오류 내용 [ 7 ]
  </BDHeaderTitle>

  <BDErrTableContainer>
    <BDErrTable>
      <thead>
        <tr>
          <th>성함</th>
          <th>인정번호</th>
          <th>금액</th>
          <th>사유</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in 7" :key="item">
          <td>홍길동</td>
          <td>L1234567890</td>
          <td>{{ formatPrice(10000) }}원 </td>
          <td class="width50">제품코드 및 제조번호(M18030043014-210200000120) 품목의 장기요양급여비용 청구액 이(가) 계약의 단가 보다 큽니다. 확인하시기 바랍니다</td>
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
  name: 'ModalPersonErr',
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
