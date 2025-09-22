<template>
  <!-- 모달창 -->
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
  
  <WContent>
    <WTitle>출금내역 확인</WTitle>
    
    <FlexBetween class="marginBottom10">
      <FlexLeft>
        <DateInput type="date" /> 
        <FlexDiv> ~ </FlexDiv>
        <DateInput type="date" />

        <WhiteBtn class="marginLeft10">날짜 검색</WhiteBtn>
        <WhiteBtn class="marginLeft10">당월</WhiteBtn>
        <WhiteBtn class="marginLeft10">전월</WhiteBtn>
        <WhiteBtn class="marginLeft10">전체</WhiteBtn>

        <SearchInput class="marginLeft10" placeholder="수급자성함, 인정번호, 예금주, 계좌번호 검색" />
        <BlueBtn>검색</BlueBtn>
      </FlexLeft>

      <FlexDiv>
        <WStInfo>
          출금대상자 <div class="countIfno">369</div>건
        </WStInfo>
      </FlexDiv>
    </FlexBetween>

    <FlexBetween class="width100 marginBottom10">
      <FlexLeft>
      <WStInfo>
        출금 중 
        <div class="countIfno">0</div>건
        <div class="countIfno">0</div>원
      </WStInfo>
      <WStInfo>
        출금 완료 
        <div class="countIfno">0</div>건
        <div class="countIfno">0</div>원
      </WStInfo>
    </FlexLeft>

    <FlexDiv class="marginBottom10">
      <WStInfo>
        잔액부족<br>미출금 
        <div class="countIfno redFont">0</div>건
        <div class="countIfno redFont">0</div>원
      </WStInfo>
      <WStInfo>
        출금요청실패<br>미출금 
        <div class="countIfno redFont">0</div>건
        <div class="countIfno redFont">0</div>원
      </WStInfo>
      <WStInfo>
        미출금 <div class="countIfno redFont">369</div>건
      </WStInfo>
      <WStInfo>
        출금정지 중 <div class="countIfno redFont">0</div>건
      </WStInfo>
    </FlexDiv>
    </FlexBetween>

    <TableContainer class="maxHeight400">
    <WStTable>
      <thead>
        <tr>
          <th>수급자성함</th>
          <th>인정번호</th>
          <th>예금주</th>
          <th>은행명</th>
          <th>계좌번호</th>
          <th>출금일</th>
          <th>금액</th>
          <th>출금상태</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in 100" :key="item" @click="showModalCmsDetail = true">
          <td>홍길동</td>
          <td>L1234567890</td>
          <td>홍길동</td>
          <td>국민은행</td>
          <td>1234567890</td>
          <td></td>
          <td>0원</td>
          <td class="pastelredBg">미출금</td>
        </tr>
      </tbody>
    </WStTable>
    </TableContainer>
  </WContent>

  <ModalBtnHeightDiv />
  <ModalBtnDiv>
    <BlueBtn>확인</BlueBtn>
  </ModalBtnDiv>
</template>

<script>
import { ref } from 'vue';
import * as PublicCss from '@/assets/styles/public.js';
import * as ModalCss from '@/assets/styles/ModalCss.js';
import * as ModalClientCss from '@/assets/styles/client/ModalClientCss.js'
import * as ModalWithdrawalCss from '@/assets/styles/withdrawal/ModalWithdrawalCss.js';
import ModalPage from '@/components/modal/ModalPage.vue'
import ClientCMSComponent from '@/components/modal/client/ClientCMSComponent.vue';

export default {
  name: 'ModalWithdrawalDetail',
  components: {
    ...PublicCss,
    ...ModalCss,
    ...ModalClientCss,
    ...ModalWithdrawalCss,
    ModalPage,
    ClientCMSComponent,
  },

  setup() {
    const showModalCmsDetail = ref(false)
    return {
      showModalCmsDetail,
    }
  }
}
</script>