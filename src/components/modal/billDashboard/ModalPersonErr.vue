<template>
  <BDHeaderTitle>
    청구 대상 오류 내용 [ 7 ]
  </BDHeaderTitle>

  <BDErrTableContainer>
    <BDErrTable>
      <thead>
        <tr>
          <th>인정번호</th>
          <th>내용</th>
          <th>금액</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in 7" :key="item">
          <td>L1234567890</td>
          <td>청구누락</td>
          <td>{{ formatPrice(10000) }}원 </td>
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
