<template>
  <!-- Modals -->
   <ModalPage 
   v-model:show="showModalVirtualAccountSend" 
    :height="'75%'" 
    :width="'30%'" 
    :parent="'virtualAccount'"
    >
    <ModalVirtualAccount @close="showModalVirtualAccountSend = false" />
   </ModalPage>

   <ModalPage 
   v-model:show="showModalVirtualAccountDetail" 
    :height="'75%'" 
    :width="'25%'" 
    :parent="'virtualAccount'"
    >
    <ModalVirtualAccountDetail @close="showModalVirtualAccountDetail = false" />
   </ModalPage>

   <ModalPage 
   v-model:show="showModalVirtualAccountAdd" 
    :height="'75%'" 
    :width="'25%'" 
    :parent="'virtualAccount'"
    >
    <ModalVirtualAccountAdd @close="showModalVirtualAccountAdd = false" />
   </ModalPage>

  <BaseOrderTemplate :search-query="searchQuery" 
    :current-page="currentPage" 
    :total-pages="totalPages"
    search-placeholder="고객명 또는 연락처를 입력하세요."
    :detail-search-button="false"
    header-info-class=""
    @update:search-query="searchQuery = $event" 
    @search="handleSearch" 
    @page-change="handlePageChange"
    ref="baseTemplate">

    <!-- Title Title -->
    <template #title-icon>
      <span class="material-icons">payments</span>
    </template>
    <template #title-text>
      가상계좌 관리
    </template>

    <!-- Header Buttons -->
    <template #header-buttons>
      <TypeSelect v-model="searchStatus">
        <option value="A">전체</option>
        <option value="D">미납</option>
        <option value="O">납부</option>
      </TypeSelect>
      <DateInput type="date" v-model="startDt" />
      <FlexDiv>~</FlexDiv>
      <DateInput type="date" v-model="endDt" />
      <BlueBtn @click="handleSearch">날짜조회</BlueBtn>
      <BlueBtn @click="getToday">당일</BlueBtn>
      <BlueBtn @click="getYesterday">전일</BlueBtn>
      <BlueBtn @click="getThisMonth">당월</BlueBtn>
      <BlueBtn @click="getLastMonth">전월</BlueBtn>
      <BlueBtn @click="getAll">전체</BlueBtn>

      <WhiteBtn @click="showModalVirtualAccountSend = true"> 
        <i class="material-icons">forward_to_inbox</i>
        &nbsp;
        가상계좌 발송
      </WhiteBtn>
      <WhiteBtn @click="showModalVirtualAccountAdd = true"> 
        <i class="material-icons">create</i>
        &nbsp;
        가상계좌 채번 등록  
      </WhiteBtn>
    </template>

    <!-- Header Info -->
    <template #header-info>
      <AccountStInfoDiv>
      사용가능계좌 <ACountDiv class="pastelGreenBg"> {{ accountStatus.available }}개</ACountDiv>
      </AccountStInfoDiv>

      <AccountStInfoDiv>
      사용중인계좌 <ACountDiv class="pastelBlueBg"> {{ accountStatus.used }}개</ACountDiv>
      </AccountStInfoDiv>

      <AccountStInfoDiv> 
        납부 <ACountDiv class="pastelGreenBg"> {{ accountStatus.success_amt.toLocaleString() }}원</ACountDiv>
      </AccountStInfoDiv>

      <AccountStInfoDiv> 
        미납 <ACountDiv class="pastelRedBg"> {{ accountStatus.danger_amt.toLocaleString() }}원</ACountDiv>
      </AccountStInfoDiv>

      <AccountStInfoDiv> 
        등록실패 <ACountDiv class="pastelRedBg"> {{ accountStatus.error_amt.toLocaleString() }}원</ACountDiv>
      </AccountStInfoDiv>
    </template>

    <!-- Content Area (Tab buttons, Table, etc) -->
    <!-- Tab Buttons -->
    <!-- Pagination -->
    <template #pagination-area>
      <div></div>
    </template>
    <!-- Table -->
    <template #table>
      <TableContainer>
        <DataTable class="blueTh">
          <thead>
            <tr>
              <th>순번</th>
              <th>등록일</th>
              <th>고객명</th>
              <th>인정번호</th>
              <th>연락처</th>
              <th>가상계좌<br>은행</th>
              <th>가상계좌번호</th>
              <th>입금가능기간</th>
              <th>항목명</th>
              <th>입금금액</th>
              <th>입금여부<br>(약 15분 소요)</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="virtualAccountList.length === 0">
              <td colspan="12" style="text-align: center; padding: 20px;">등록된 가상계좌가 없습니다.</td>
            </tr>
            <tr v-for="(item, index) in virtualAccountList" :key="item.id" @click="showAccountDetail(item)">
              <td>{{ virtualAccountList.length - index }}</td>
              <td>{{ item.date }}</td>
              <td>
                {{ item.name }}
                <button v-if="item.email" class="ordermodify_view" @click.stop="Swal.fire('개발중입니다')">주문서보기</button>
              </td>
              <td>{{ item.number }}</td>
              <td>{{ item.tel }}</td>
              <td>{{ getBankNm(item.bank) }}</td>
              <td>{{ item.account }}</td>
              <td>{{ item.dt1 }} ~ {{ item.dt2 }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.amount.toLocaleString() + "원" }}</td>
              <td :class="{ 'pastelGreenBg': item.st == '납부', 'pastelRedBg': item.st == '미납' }">
                {{ item.st }}
                <br>
                {{ item.stDt }}
              </td>
              <td>{{ item.memo }}</td>
            </tr>
          </tbody>
        </DataTable>
      </TableContainer>
    </template>

    
  </BaseOrderTemplate>

</template>

<script>
import { ref, onMounted, reactive } from 'vue'
import * as PublicCss from '@/assets/styles/public.js'
import * as VirtualAccountCss from '@/assets/styles/virtualAccount/VirtualAccountCss.js'
import BaseOrderTemplate from '@/components/BaseOrderTemplate.vue'
import ModalPage from '@/components/modal/ModalPage.vue'
import ModalVirtualAccount from '@/components/modal/virtualAccount/ModalVirtualAccount.vue'
import ModalVirtualAccountDetail from '@/components/modal/virtualAccount/ModalVirtualAccountDetail.vue'
import ModalVirtualAccountAdd from '@/components/modal/virtualAccount/ModalVirtualAccountAdd.vue'
import { getVirtualAccountList, getVirtualAccountCount } from '@/api/virtualAccount.js'
import Swal from 'sweetalert2'

export default {
  components: {
    ...PublicCss,
    ...VirtualAccountCss,
    BaseOrderTemplate,
    ModalPage,
    ModalVirtualAccount,
    ModalVirtualAccountDetail,
    ModalVirtualAccountAdd,
  },
  setup() {
    const searchQuery = ref('')
    const currentPage = ref(1)
    const totalPages = ref(1)
    const startDt = ref('') // 이번달 시작일
    const endDt = ref('') // 이번달 종료일
    const baseTemplate = ref(null)
    const showModalVirtualAccountSend = ref(false)
    const showModalVirtualAccountAdd = ref(false)
    const showModalVirtualAccountDetail = ref(false)
    const selectedAccount = ref(null)
    const searchStatus = ref('A')
    const accountStatus = reactive({
      available: 0,
      used: 0,
      success_amt: 0,
      danger_amt: 0,
      error_amt: 0
    })
    
    const virtualAccountList = ref([])


    const getBankNm = (bank) => {
      if (bank === '002') return '산업은행'
      if (bank === '003') return '기업은행'
      if (bank === '004') return '국민은행'
      if (bank === '005') return '외환은행'
      if (bank === '007') return '수협'
      if (bank === '011') return '농협'
      if (bank === '020') return '우리은행'
      if (bank === '023') return '제일은행'
      if (bank === '027') return '씨티은행'
      if (bank === '031') return '대구은행'
      if (bank === '032') return '부산은행'
      if (bank === '034') return '광주은행'
      if (bank === '035') return '제주은행'
      if (bank === '037') return '전북은행'
      if (bank === '039') return '경남은행'
      if (bank === '045') return '새마을금고'
      if (bank === '048') return '신협'
      if (bank === '071') return '우체국'
      if (bank === '081') return '하나은행'
      if (bank === '088') return '신한은행'
      if (bank === '089') return '케이뱅크'
      if (bank === '090') return '카카오뱅크'
      return '은행명오류'
    }

    // 당일 버튼 클릭시 둘 다 현재 날짜로 설정
    const getToday = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();

      startDt.value = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      endDt.value = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }

    // 전일 버튼 클릭시 전일 날짜로 설정
    const getYesterday = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate() - 1;

      startDt.value = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      endDt.value = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }

    // 당월 버튼 클릭시 당월 날짜로 설정
    const getThisMonth = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const lastDay = new Date(year, month, 0).getDate();

      startDt.value = `${year}-${month.toString().padStart(2, '0')}-01`;
      endDt.value = `${year}-${month.toString().padStart(2, '0')}-${lastDay.toString().padStart(2, '0')}`;
    }

    // 전월 버튼 클릭시 전월 날짜로 설정
    const getLastMonth = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const lastDay = new Date(year, month, 0).getDate();

      startDt.value = `${year}-${month.toString().padStart(2, '0')}-01`;
      endDt.value = `${year}-${month.toString().padStart(2, '0')}-${lastDay.toString().padStart(2, '0')}`;
    }

    // 전체 버튼 클릭시 전체 날짜로 설정
    const getAll = () => {
      startDt.value = '1999-01-01';
      endDt.value = '2099-12-31';
    }
    
    // 가상계좌 목록 조회
    const fetchVirtualAccountList = async () => {
      try {
        const response = await getVirtualAccountList({
          search: searchQuery.value,
          sdate: startDt.value,
          edate: endDt.value,
          status: searchStatus.value
        })
        
        if (response.data.code === 200) {
          const data = response.data.data
          accountStatus.success_amt = 0
          accountStatus.danger_amt = 0
          accountStatus.error_amt = 0
          
          virtualAccountList.value = data.map((item) => {
            let status = ''
            if (item.RESULTCD === null) {
              status = '등록대기'
            } else if (item.RESULTCD !== 'D000') {
              status = `등록실패[${item.RESULTCD}]\n${item.RESULTMSG}`
              accountStatus.error_amt += parseInt(item.PAYITEMAMT)
            } else {
              status = '미납'
              if (item.REGDT !== null) {
                accountStatus.success_amt += parseInt(item.PAYITEMAMT)
                status = `납부\n${item.PAYDAY.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3 $4:$5:$6')}`
              } else {
                accountStatus.danger_amt += parseInt(item.PAYITEMAMT)
              }
            }

            console.log("status", status)
            
            return {
              id: item.REGSEQ,
              date: item.PAYMASDT,
              name: item.CUSNM,
              number: item.CONTENT1 || '없음',
              tel: item.MOBILENO.replace(/(\d{3})(\d{4})(\d{4})/g, '$1-$2-$3'),
              bank: '011', // 농협
              account: item.VANO,
              dt1: item.RCPSTARTDT.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'),
              dt2: item.RCPENDDT.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3'),
              type: item.PAYITEMNM,
              amount: parseInt(item.PAYITEMAMT),
              st: item.REGDT !== null ? '납부' : '미납',
              stDt: item.REGDT !== null ? item.PAYDAY.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, '$1-$2-$3 $4:$5:$6') : '',
              memo: item.txt || '',
              rawData: item // 원본 데이터 저장
            }
          })
        } else {
          virtualAccountList.value = []
        }
      } catch (error) {
        console.error('가상계좌 목록 조회 실패:', error)
        Swal.fire('오류', '가상계좌 목록을 불러오는데 실패했습니다.', 'error')
      }
    }
    
    // 가상계좌 상태 조회
    const fetchAccountStatus = async () => {
      try {
        const response = await getVirtualAccountCount()
        if (response.data.code === 200) {
          accountStatus.available = response.data.data.notuse_cnt
          accountStatus.used = response.data.data.use_cnt
        }
      } catch (error) {
        console.error('가상계좌 상태 조회 실패:', error)
      }
    }
    
    // 검색 처리
    const handleSearch = () => {
      currentPage.value = 1
      fetchVirtualAccountList()
      fetchAccountStatus()
    }
    
    // 페이지 변경 처리
    const handlePageChange = (page) => {
      currentPage.value = page
      fetchVirtualAccountList()
    }
    
    // 가상계좌 상세 정보 조회
    const showAccountDetail = (account) => {
      selectedAccount.value = account
      showModalVirtualAccountDetail.value = true
    }
    
    // 페이지 로드시 현재 월의 시작일과 종료일 자동 설정
    onMounted(() => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      
      // 이번달 시작일 (YYYY-MM-01)
      startDt.value = `${year}-${month.toString().padStart(2, '0')}-01`;
      
      // 이번달 마지막 날짜 계산
      const lastDay = new Date(year, month, 0).getDate();
      
      // 이번달 종료일 (YYYY-MM-마지막날)
      endDt.value = `${year}-${month.toString().padStart(2, '0')}-${lastDay}`;
      
      // 초기 데이터 로드
      fetchVirtualAccountList()
      fetchAccountStatus()
    });

    return {
      searchQuery,
      currentPage,
      totalPages,
      startDt,
      endDt,
      virtualAccountList,
      baseTemplate,
      accountStatus,
      selectedAccount,
      searchStatus,
      getBankNm,
      getToday,
      getYesterday,
      getThisMonth,
      getLastMonth,
      getAll,
      handleSearch,
      handlePageChange,
      showAccountDetail,
      showModalVirtualAccountSend,
      showModalVirtualAccountAdd,
      showModalVirtualAccountDetail,
    }
  }
}
</script>