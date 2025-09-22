<template>  
<!-- Modals -->
   <!-- 판매수량 모달창 -->
   <ModalPage v-model:show="showModalSalesAmountDetail" 
  :height="'78%'" :width="'90%'" :parent="'billDashboard'">
    <ModalSalesAmountDetail :show="showModalSalesAmountDetail" 
      @update:show="showModalSalesAmountDetail = $event"
      @close="showModalSalesAmountDetail = false" />
  </ModalPage>

  <!-- 대여수량 모달창 -->
  <ModalPage v-model:show="showModalRentalAmountDetail" 
  :height="'78%'" :width="'90%'" :parent="'billDashboard'">
    <ModalRentalAmountDetail :show="showModalRentalAmountDetail" 
      @update:show="showModalRentalAmountDetail = $event"
      @close="showModalRentalAmountDetail = false" />
  </ModalPage>

<BDMainContainer>
  <BDHeaderTitle>
    <i class="material-icons">insert_chart</i> &nbsp;
    복지용구 통계
  </BDHeaderTitle>
  
  <FlexLeft class="marginBottom10">
    <BDCompanyTitle>
      테스트 복지용구의료기 
      <BDYearSelect v-model="selectedYear">
        <option value="2025">2025년</option>
        <option value="2024">2024년</option>
        <option value="2023">2023년</option>
    </BDYearSelect> 매출 통계
    </BDCompanyTitle>
  </FlexLeft>
  
  <!-- 전체 요약 카드 -->
  <BDStCardContainer>
    <BDStCard>
      <BDStCardIcon>
        <IconStyles class="icon-orders"></IconStyles>
      </BDStCardIcon>
      <BDStCardContent>
        <h2>{{ formatPrice(stats.monthSale) }}만원</h2>
        <p>{{ nowMonth }}월 판매 금액</p>
      </BDStCardContent>
    </BDStCard>
    
    <BDStCard>
      <BDStCardIcon>
        <IconStyles class="icon-products"></IconStyles>
      </BDStCardIcon>
      <BDStCardContent>
        <h2>{{ formatPrice(stats.monthRental) }}만원</h2>
        <p>{{ nowMonth }}월 대여 금액</p>
      </BDStCardContent>
    </BDStCard>
    
    <BDStCard>
      <BDStCardIcon>
        <IconStyles class="icon-clients"></IconStyles>
      </BDStCardIcon>
      <BDStCardContent>
        <h2>{{ formatPrice(stats.monthTotal) }}만원</h2>
        <p>{{ nowMonth }}월 합계 금액</p>
      </BDStCardContent>
    </BDStCard>
    
    <BDStCard>
      <BDStCardIcon>
        <IconStyles class="icon-revenue"></IconStyles>
      </BDStCardIcon>
      <BDStCardContent>
        <h2>{{ formatPrice(stats.yearTotal) }}만원</h2>
        <p>올해 총 매출</p>
      </BDStCardContent>
    </BDStCard>
  </BDStCardContainer>
  
  <BDChartContainer>
    <BDChartCard>
      <h3>
        <i class="material-icons">bar_chart</i>
        월별 합계 금액
      </h3>
      <div class="chartContainer">
        <Bar :data="barChartData" :options="chartOptions" />
      </div>
    </BDChartCard>

    <BDChartCard>
      <h3>
        <i class="material-icons">pie_chart</i>
        품목별 판매/대여 금액
        <BDMonthSelect v-model="selectedMonth">
          <option v-for="month in 12" :key="month" :value="month">{{ month }}월</option>
        </BDMonthSelect>
      </h3>
      <BDPieChartContainer>
        <div style="position: relative; width: 220px; height: 220px; margin: auto;">
          <Doughnut :data="doughnutChartData" :options="doughnutChartOptions" />
        </div>
        <BDPieLegend>
          <BDPieLegendItem v-for="(item, index) in sortedCategoryData" :key="'legend-'+index">
            <LegendColor :style="{ backgroundColor: item.color }"></LegendColor>
            <LegendLabel>{{ item.name }}</LegendLabel>
            <LegendValue>{{ formatPrice(item.amount) }}</LegendValue>
          </BDPieLegendItem>
        </BDPieLegend>
      </BDPieChartContainer>
    </BDChartCard>
  </BDChartContainer>

  <BDChartContainer>
    <BDChartCard>
      <h3>
        <i class="material-icons">show_chart</i>
        월별 판매 금액 <BDButton @click="showModalSalesAmountDetail = true">판매 수량 자세히 보기</BDButton>
      </h3>
      <div class="chartContainer">
        <Line :data="salesLineChartData" :options="chartOptions" />
      </div>
    </BDChartCard>
    <BDChartCard>
      <h3>
        <i class="material-icons">show_chart</i>
        월별 대여 금액 <BDButton @click="showModalRentalAmountDetail = true">대여 수량 자세히 보기</BDButton>
      </h3>
      <div class="chartContainer">
        <Line :data="rentalLineChartData" :options="chartOptions" />
      </div>
    </BDChartCard>
  </BDChartContainer>
  
  <div class="marginBottom10">
    <BDManagerContainer>
      <FlexLeft class="marginBottom10">
        <i class="material-icons">people</i>
        <BDMonthSelect v-model="selectedMonth" class="marginRight10">
          <option v-for="month in 12" :key="month" :value="month">{{ month }}월</option>
        </BDMonthSelect>
        월 담당자별 계약금액
      </FlexLeft>
      <FlexBetween class="marginBottom10">
        <div>
          <BDCountSelect class="marginRight10">
            <option value="5">5개</option>
            <option value="10">10개</option>
            <option value="20">20개</option>
            <option value="30">30개</option>
          </BDCountSelect>
        </div>

        <div>
          검색 : 
          <CommonInput type="text" class="marginRight10" />
        </div>
      </FlexBetween>

      <BDManagerTable>
        <thead>
          <tr>
            <th @click="sortBy('name')">
              담당자 <i class="material-icons sortIcon">{{ sortState.key === 'name' ? (sortState.order === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down') : 'unfold_more' }}</i>
            </th>
            <th @click="sortBy('team')">
              부서 <i class="material-icons sortIcon" >{{ sortState.key === 'team' ? (sortState.order === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down') : 'unfold_more' }}</i>
            </th>
            <th @click="sortBy('sales')">
              구입품목합계 <i class="material-icons sortIcon" >{{ sortState.key === 'sales' ? (sortState.order === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down') : 'unfold_more' }}</i>
            </th>
            <th @click="sortBy('rental')">
              대여품목합계 <i class="material-icons sortIcon" >{{ sortState.key === 'rental' ? (sortState.order === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down') : 'unfold_more' }}</i>
            </th>
            <th @click="sortBy('total')">
              총합계 <i class="material-icons sortIcon" >{{ sortState.key === 'total' ? (sortState.order === 'asc' ? 'arrow_drop_up' : 'arrow_drop_down') : 'unfold_more' }}</i>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in paginatedData" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.team }}</td>
            <td>{{ formatPrice(item.buyPrice) }}</td>
            <td>{{ formatPrice(item.rentPrice) }}</td>
            <td>{{ formatPrice(item.buyPrice + item.rentPrice) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="5">
              <FlexBetween>
                <div>
                  {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, managerContractData.length) }} / 총 {{ managerContractData.length }}명
                </div>
                <!-- 페이징 -->
                <BDPaginationContainer>
                  <BDPageBtn @click="prevPage" :disabled="currentPage === 1">
                    <i class="material-icons">chevron_left</i>
                  </BDPageBtn>
                  <BDPageNum 
                    v-for="page in 5" 
                    :key="page" 
                    :class="{ active: page === currentPage }"
                    @click="goToPage(page)">
                    {{ page }}
                  </BDPageNum>
                  <BDPageBtn @click="nextPage" :disabled="currentPage === totalPages">
                    <i class="material-icons">chevron_right</i>
                  </BDPageBtn>
                </BDPaginationContainer>
              </FlexBetween>
            </td>
          </tr>
        </tfoot>
      </BDManagerTable>
    </BDManagerContainer>
  </div>
</BDMainContainer>
</template>

<script>
import * as PublicCss from '@/assets/styles/public.js'
import * as BillDashboardCss from '@/assets/styles/billDashboard/BillDashboardCss.js'
import { getFindMonthAllPrice, getFindMonthBuyPrice, getFindMonthRentalPrice, getFindMonthDoughnut, getFindMonthManagerContract } from '@/api/dashboard';
import ModalPage from '@/components/modal/ModalPage.vue'
import ModalSalesAmountDetail from '@/components/modal/billDashboard/ModalSalesAmountDetail.vue'
import ModalRentalAmountDetail from '@/components/modal/billDashboard/ModalRentalAmountDetail.vue'

import { reactive, ref, computed, onMounted } from 'vue';
import { formatPrice, formatDate } from '@/utils/format';
import { Bar, Doughnut, Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement)

export default ({
  name: 'BDMainPage',
  components: {
    ...PublicCss,
    ...BillDashboardCss,
    ModalPage,
    ModalSalesAmountDetail,
    ModalRentalAmountDetail,
    Bar,
    Doughnut,
    Line,
  },

  setup() {
    const showModalSalesAmountDetail = ref(false);
    const showModalRentalAmountDetail = ref(false);
    const selectedYear = ref('2025');
    const selectedMonth = ref(new Date().getMonth() + 1);
    const nowMonth = ref(new Date().getMonth() + 1);

    const sortState = reactive({ key: '', order: 'asc' });

    // Paging state
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    
    const stats = reactive({
      monthSale: 1000,
      monthRental: 1000,
      monthTotal: 2000,
      yearTotal: 10000000
    });

    const buyContractData = ref([]);

    const rentalContractData = ref([]);

    const totalContractData = ref([]);

    const managerContractData = ref([]);
    
    const sortBy = (key) => {
      if (sortState.key === key) {
        sortState.order = sortState.order === 'asc' ? 'desc' : 'asc';
      } else {
        sortState.key = key;
        sortState.order = 'asc';
      }
    };

    const sortedManagerContractData = computed(() => {
      if (!sortState.key) {
        return managerContractData.value;
      }

      const dataToSort = [...managerContractData.value];

      return dataToSort.sort((a, b) => {
        let valA, valB;

        if (sortState.key === 'total') {
          valA = a.buyPrice + a.rentPrice;
          valB = b.buyPrice + b.rentPrice;
        } else {
          valA = a[sortState.key];
          valB = b[sortState.key];
        }

        let comparison = 0;
        if (typeof valA === 'string' && typeof valB === 'string') {
          comparison = valA.localeCompare(valB);
        } else {
          comparison = valA - valB;
        }
        
        return sortState.order === 'asc' ? comparison : -comparison;
      });
    });

    const totalPages = computed(() => {
      return Math.ceil(sortedManagerContractData.value.length / itemsPerPage.value);
    });

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return sortedManagerContractData.value.slice(start, end);
    });

    const goToPage = (page) => {
      currentPage.value = page;
    };

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

    // 품목별 데이터
    const categoryData = ref([]);

    const sortedCategoryData = computed(() => {
      return [...categoryData.value].sort((a, b) => b.amount - a.amount);
    });

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };

    const doughnutChartOptions = {
      ...chartOptions,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed !== null) {
                label += formatPrice(context.parsed);
              }
              return label;
            }
          }
        }
      }
    };
    
    const barChartData = computed(() => ({
      labels: totalContractData.value.map(d => d.name),
      datasets: [
        {
          label: '월별 합계',
          backgroundColor: '#1a2136',
          data: totalContractData.value.map(d => d.sales)
        }
      ]
    }));

    const salesLineChartData = computed(() => ({
      labels: buyContractData.value.map(d => d.name),
      datasets: [
        {
          label: '월별 판매',
          borderColor: '#4ECB71',
          backgroundColor: '#4ECB71',
          data: buyContractData.value.map(d => d.sales),
          tension: 0.4,
        }
      ]
    }));

    const rentalLineChartData = computed(() => ({
      labels: rentalContractData.value.map(d => d.name),
      datasets: [
        {
          label: '월별 대여',
          borderColor: '#8BB8FF',
          backgroundColor: '#8BB8FF',
          data: rentalContractData.value.map(d => d.sales),
          tension: 0.4,
        }
      ]
    }));

    const doughnutChartData = computed(() => ({
      labels: sortedCategoryData.value.map(c => c.name),
      datasets: [
        {
          backgroundColor: sortedCategoryData.value.map(c => c.color),
          data: sortedCategoryData.value.map(c => c.amount)
        }
      ]
    }));

    const fetchMonthAllPrice = async () => {
      const response = await getFindMonthAllPrice(selectedYear.value, selectedMonth.value);
      console.log("합계", response);
      totalContractData.value = response.map(d => ({ name: d.month, sales: d.totalPrice }));
      stats.monthTotal = response.find(d => d.month === nowMonth.value).totalPrice;
      stats.yearTotal = response.reduce((acc, d) => acc + d.totalPrice, 0);
    }

    const fetchMonthBuyPrice = async () => {
      const response = await getFindMonthBuyPrice(selectedYear.value, selectedMonth.value);
      console.log("구입", response);
      buyContractData.value = response.map(d => ({ name: d.month, sales: d.totalPrice }));
      stats.monthSale = response.find(d => d.month === nowMonth.value).totalPrice;
    }

    const fetchMonthRentalPrice = async () => {
      const response = await getFindMonthRentalPrice(selectedYear.value, selectedMonth.value);
      console.log("대여", response);
      rentalContractData.value = response.map(d => ({ name: d.month, sales: d.totalPrice }));
      stats.monthRental = response.find(d => d.month === nowMonth.value).totalPrice;
    }

    const fetchMonthDoughnut = async () => {
      const response = await getFindMonthDoughnut(selectedYear.value, selectedMonth.value);
      console.log("품목", response);
      const color = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6', '#1abc9c', '#e84393', '#00b894', '#fd79a8', '#6c5ce7', '#74b9ff', '#a29bfe', '#55efc4', '#ffeaa7'];
      categoryData.value = response.map((d, index) => ({ name: d.name, amount: d.totalPrice, color: color[index] }));
    }

    const fetchManagerContractData = async () => {
      const response = await getFindMonthManagerContract(selectedYear.value, selectedMonth.value);
      console.log("담당자", response);
      managerContractData.value = response;
    }

    onMounted(() => {
      fetchMonthAllPrice();
      fetchMonthBuyPrice();
      fetchMonthRentalPrice();
      fetchMonthDoughnut();
      fetchManagerContractData();
    });
    return {
      showModalSalesAmountDetail,
      showModalRentalAmountDetail,
      stats,
      selectedYear,
      selectedMonth,
      managerContractData,
      sortedManagerContractData,
      sortBy,
      sortState,
      currentPage,
      itemsPerPage,
      totalPages,
      paginatedData,
      goToPage,
      prevPage,
      nextPage,
      categoryData,
      sortedCategoryData,
      formatPrice,
      formatDate,
      barChartData,
      doughnutChartData,
      salesLineChartData,
      rentalLineChartData,
      chartOptions,
      doughnutChartOptions,
      nowMonth,
    };
  }
});


</script>
