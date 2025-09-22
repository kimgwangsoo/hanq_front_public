<template>
  <BDMainContainer>
  <BDHeaderTitle class="marginBottom10">
    <i class="material-icons">assignment_ind</i> &nbsp;
    <BDYearSelect class="marginRight10">
      <option value="2025">2025</option>
      <option value="2024">2024</option>
      <option value="2023">2023</option>
    </BDYearSelect>년
    <BDMonthSelect class="marginRight10">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </BDMonthSelect>월

    청구확정내역
  </BDHeaderTitle>

  <BDStCardContainer class="marginTop10">
    <BDStCard>
      <BDStCardIcon>
        <IconStyles class="icon-revenue"></IconStyles>
      </BDStCardIcon>
      <BDStCardContent>
        <p>급여비용총액</p>
        <h2>120,463,270</h2>
      </BDStCardContent>
    </BDStCard>
    
    <BDStCard>
      <BDStCardIcon>
        <IconStyles class="icon-products"></IconStyles>
      </BDStCardIcon>
      <BDStCardContent>
        <p>지급총액</p>
        <h2>109,576,560</h2>
      </BDStCardContent>
    </BDStCard>
    
    <BDStCard>
      <BDStCardIcon>
        <IconStyles class="icon-clients"></IconStyles>
      </BDStCardIcon>
      <BDStCardContent>
        <p>본인부담금총액</p>
        <h2>10,886,710</h2>
      </BDStCardContent>
    </BDStCard>
    
    <BDStCard>
      <BDStCardIcon>
        <IconStyles class="icon-cancel"></IconStyles>
      </BDStCardIcon>
      <BDStCardContent>
        <p>심사불능건수</p>
        <h2>4</h2>
      </BDStCardContent>
    </BDStCard>
  </BDStCardContainer>

  <FlexBetween class="marginBottom10">
    <div>
      <BDCountSelect>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </BDCountSelect>
      개씩 보기
    </div>
    <div>
      검색 : <CommonInput />
    </div>
  </FlexBetween>

  <div>
    <BDMonthHistoryTable>
      <thead>
        <tr>
          <th>성함</th>
          <th>인정번호</th>
          <th>청구월</th>
          <th>급여총액</th>
          <th>지급액</th>
          <th>본인부담금</th>
          <th>상태</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in 10" :key="item">
          <td>테스트</td>
          <td>L1234567890</td>
          <td>202505</td>
          <td>56540</td>
          <td>56540</td>
          <td>0</td>
          <td>지급</td>
        </tr>
      </tbody>
    </BDMonthHistoryTable>

    <BDPaginationContainer class="marginTop10">
      <BDPageBtn @click="prevPage" :disabled="currentPage === 1">
        <i class="material-icons">chevron_left</i>
      </BDPageBtn>
      <BDPageNum 
        v-for="page in 5" 
        :key="page" 
        :class="{ active: page === currentPage }"
        >
        {{ page }}
      </BDPageNum>
      <BDPageBtn @click="nextPage" :disabled="currentPage === totalPages">
        <i class="material-icons">chevron_right</i>
      </BDPageBtn>
    </BDPaginationContainer>
  </div>
</BDMainContainer>
</template>

<script>
import { ref } from 'vue';
import * as PublicCss from '@/assets/styles/public.js'
import * as BillDashboardCss from '@/assets/styles/billDashboard/BillDashboardCss.js'

export default ({
  name: 'BDMonthHistory',
  components: {
    ...PublicCss,
    ...BillDashboardCss,
  },
  setup() {
    const currentPage = ref(1);
    const totalPages = ref(5);
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };
    return {
      currentPage,
      totalPages,
      prevPage,
      nextPage,
    }
  }
});
</script>