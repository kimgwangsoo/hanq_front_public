<template>
  <!-- Modals -->
   <!-- 수급자 CMS 정보창 -->
  <ModalPage v-model:show="showModalCmsDetail" 
    :height="'78%'" 
    :width="'50%'" :parent="'cms'"
    :scrollAreaBorder="true">
    <TabContainer>
      <TabButton class="active">
        <i class="material-icons">currency_exchange</i>
        수급자 결제정보(CMS/가상계좌)
      </TabButton>
    </TabContainer>
    <ClientCMSComponent :client="formData" @update="updateCMSInfo" @save="saveCMSInfo" />
  </ModalPage>

  <!-- 출금내역 확인창 -->
  <ModalPage v-model:show="showModalWithdrawalList" 
    :height="'78%'" 
    :width="'90%'" :parent="'cms'">
    <ModalWithdrawalDetail />
  </ModalPage>

  <BaseOrderTemplate 
    :search-query="searchQuery" 
    :current-page="currentPage" 
    :total-pages="totalPages"
    :items="cmsList" 
    :detail-search-button="false"
    :refresh-button="true"
    search-placeholder="검색어를 입력하세요."
    @update:search-query="searchQuery = $event" 
    @search="handleSearch" 
    @page-change="handlePageChange"
    ref="baseTemplate">

    <!-- Title Title -->
    <template #title-icon>
      <span class="material-icons">account_balance</span>
    </template>
    <template #title-text>
      CMS 결제 관리
    </template>

    <!-- Search Area -->

    <!-- Header Buttons -->
    <template #header-buttons>
      <DateInput type="date" />
      <FlexDiv>~</FlexDiv>
      <DateInput type="date" />
      <BlueBtn>날짜조회</BlueBtn>

      <CmsStInfo class="greenBg height40">출금등록완료 : 646명</CmsStInfo>
      <CmsStInfo class="darkGrayBg height40">출금등록 중 : 20명</CmsStInfo>
    </template>

    <!-- Header Info -->
    <template #header-info>
      <WhiteBtn @click="showCmsCancelList">CMS 해지 회원 조회</WhiteBtn>
      <WhiteBtn style="margin-left: 15px;" @click="showModalWithdrawalList = true">출금내역 확인</WhiteBtn>
    </template>

    <!-- Content Area (Tab buttons, Table, etc) -->
    <!-- Tab Buttons -->
    <!-- Pagination -->
    <!-- Table -->
    <template #table>
      <TableContainer>
        <DataTable>
          <thead>
            <tr>
              <th>번호</th>
              <th>수급자성함</th>
              <th>인정번호</th>
              <th>생년월일</th>
              <th>연락처</th>
              <th>예금주</th>
              <th>계좌번호</th>
              <th>은행</th>
              <th>메모</th>
              <th>증빙상태</th>
              <th>출금상태</th>
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cmsList" :key="index" @click="showModalCmsDetail = true">
              <td class="grayBg">{{ index + 1 }}</td>
              <td class="grayBg">{{ item.name }}</td>
              <td class="grayBg">{{ item.num }}</td>
              <td class="grayBg">{{ item.birth.slice(0, 2) + '****' + item.birth.slice(4) }}</td>
              <td class="grayBg">{{ item.tel.slice(0, 3) + '****' + item.tel.slice(7) }}</td>
              <td class="grayBg">{{ item.account.slice(0, 1) + '*' + item.account.slice(2) }}</td>
              <td class="grayBg">{{ item.accountNum.slice(0, 3) + '***' + item.accountNum.slice(7) }}</td>
              <td class="grayBg">{{ getBankNm(item.bank) }}</td>
              <td class="grayBg">{{ item.memo }}</td>
              <td :class="getProofStClass(item.proofSt)">{{ item.proofSt }}</td>
              <td :class="getWithdrawalStClass(item.withdrawalSt)">{{ item.withdrawalSt }}</td>
              <td class="grayBg">{{ item.dt }}</td>
            </tr>
          </tbody>
        </DataTable>
      </TableContainer>
    </template>
    </BaseOrderTemplate>
    
</template>

<script>
import { ref } from 'vue'
import * as PublicCss from '@/assets/styles/public.js'
import * as CMSCss from '@/assets/styles/cms/CMSPageCss.js'
import * as ModalClientCss from '@/assets/styles/client/ModalClientCss.js'
import BaseOrderTemplate from '@/components/BaseOrderTemplate.vue'
import ModalPage from '@/components/modal/ModalPage.vue'
import ClientCMSComponent from '@/components/modal/client/ClientCMSComponent.vue';
import ModalWithdrawalDetail from '@/components/modal/cms/ModalWithdrawalDetail.vue';

export default {
  name: 'CMSPage',
  components: {
    ...PublicCss,
    ...CMSCss,
    ...ModalClientCss,
    BaseOrderTemplate,
    ModalPage,
    ClientCMSComponent,
    ModalWithdrawalDetail,
  },
  setup() {
    // 페이징 관련 변수
    const currentPage = ref(1)
    const pageSize = ref(10)
    const totalPages = ref(1)
    const totalCount = ref(0)
    const searchQuery = ref('')
    const showModalCmsDetail = ref(false)
    const showModalWithdrawalList = ref(false)
    const baseTemplate = ref(null)

    const cmsList = ref([
      {
        id: 1,
        name: '홍길동',
        num: 'L1234567890',
        birth: '780101',
        tel: '01012345678',
        account: '홍길동',
        accountNum: '0123456789123',
        bank: '004',
        memo: '',
        proofSt: '증빙(신규)전송완료',
        withdrawalSt: '출금등록중',
        dt: '2025-01-01',
      },
      {
        id: 2,
        name: '홍길동',
        num: 'L1234567890',
        birth: '780101',
        tel: '01012345678',
        account: '홍길동',
        accountNum: '0123456789123',
        bank: '003',
        memo: '',
        proofSt: '증빙(신규)전송완료',
        withdrawalSt: '출금등록중',
        dt: '2025-01-01',
      },
      {
        id: 3,
        name: '홍길동',
        num: 'L1234567890',
        birth: '780101',
        tel: '01012345678',
        account: '홍길동',
        accountNum: '0123456789123',
        bank: '002',
        memo: '',
        proofSt: '증빙(신규)전송실패',
        withdrawalSt: '출금등록실패',
        dt: '2025-01-01',
      },
      {
        id: 4,
        name: '홍길동',
        num: 'L1234567890',
        birth: '780101',
        tel: '01012345678',
        account: '홍길동',
        accountNum: '0123456789123',
        bank: '011',
        memo: '',
        proofSt: '증빙(신규)전송완료',
        withdrawalSt: '출금등록완료',
        dt: '2025-01-01',
      },
    ])

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

    const getProofStClass = (proofSt) => {
      if (proofSt === '증빙(신규)전송완료') {
        return 'pastelGreenBg'
      } else if (proofSt === '증빙(신규)전송실패') {
        return 'grayBg'
      } else {
        return 'pastelRedBg'
      }
    }

    const getWithdrawalStClass = (withdrawalSt) => {
      if (withdrawalSt === '출금등록완료') {
        return 'pastelGreenBg'
      } else if (withdrawalSt === '출금등록중') {
        return 'grayBg'
      } else if (withdrawalSt === '해지완료') {
        return 'grayBg'
      } else {
        return 'pastelRedBg'
      }
    }

    // CMS 해지 회원 조회
    const showCmsCancelList = () => {
      baseTemplate.value.showSwalModal({
          title: 'CMS 해지 회원 조회',
          width: "40%",
          showConfirmButton: false,
          html: `
            <div>
              <div class="section-table">
                <table class="expiring-table noneHover">
                  <thead>
                    <tr>
                      <th>수급자명</th>
                      <th>인정번호</th>
                      <th>해지일자</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>홍길동</td>
                      <td>L1234567890</td>
                      <td>2025-01-01</td>
                    </tr>
                    <tr>
                      <td>홍길동</td>
                      <td>L1234567890</td>
                      <td>2025-01-01</td>
                    </tr>
                    <tr>
                      <td>홍길동</td>
                      <td>L1234567890</td>
                      <td>2025-01-01</td>
                    </tr>
                    <tr>
                      <td>홍길동</td>
                      <td>L1234567890</td>
                      <td>2025-01-01</td>
                    </tr>
                    <tr>
                      <td>홍길동</td>
                      <td>L1234567890</td>
                      <td>2025-01-01</td>
                    </tr>
                    <tr>
                      <td>홍길동</td>
                      <td>L1234567890</td>
                      <td>2025-01-01</td>
                    </tr>
                    <tr>
                      <td>홍길동</td>
                      <td>L1234567890</td>
                      <td>2025-01-01</td>
                    </tr>
                    <tr>
                      <td>홍길동</td>
                      <td>L1234567890</td>
                      <td>2025-01-01</td>
                    </tr>
                    <tr>
                      <td>홍길동</td>
                      <td>L1234567890</td>
                      <td>2025-01-01</td>
                    </tr>
                    <tr>
                      <td>홍길동</td>
                      <td>L1234567890</td>
                      <td>2025-01-01</td>
                    </tr>
                    <tr>
                      <td>홍길동</td>
                      <td>L1234567890</td>
                      <td>2025-01-01</td>
                    </tr>
                    <tr>
                      <td>홍길동</td>
                      <td>L1234567890</td>
                      <td>2025-01-01</td>
                    </tr>
                    <tr>
                      <td>홍길동</td>
                      <td>L1234567890</td>
                      <td>2025-01-01</td>
                    </tr>
                    <tr>
                      <td>홍길동</td>
                      <td>L1234567890</td>
                      <td>2025-01-01</td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          `,
      })
    }

    return {
      currentPage,
      pageSize,
      totalPages,
      totalCount,
      searchQuery,
      cmsList,
      showModalCmsDetail,
      baseTemplate,
      getBankNm,
      getProofStClass,
      getWithdrawalStClass,
      showCmsCancelList,
      showModalWithdrawalList,
    }
  }
}
</script>