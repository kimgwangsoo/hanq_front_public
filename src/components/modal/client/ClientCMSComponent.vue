<template>
  <div>
    <ModalPage v-model:show="showCmsModal" @close="showCmsModal = false" width="40%" height="60%">
      <ModalCms />
    </ModalPage>
  </div>
  <FlexDiv>
    <ClientFormTable>
      <tr>
        <th>은행명</th>
        <td>
          <SelectField>
            <option value="선택">선택</option>
            <option value="산업은행">산업은행</option>
            <option value="기업은행">기업은행</option>
            <option value="국민은행">국민은행</option>
            <option value="외환은행">외환은행</option>
            <option value="수협">수협</option>
            <option value="농협">농협</option>
            <option value="우리은행">우리은행</option>
            <option value="제일은행">제일은행</option>
            <option value="씨티은행">씨티은행</option>
            <option value="대구은행">대구은행</option>
            <option value="부산은행">부산은행</option>
            <option value="광주은행">광주은행</option>
            <option value="제주은행">제주은행</option>
            <option value="전북은행">전북은행</option>
            <option value="경남은행">경남은행</option>
            <option value="새마을금고">새마을금고</option>
            <option value="신협">신협</option>
            <option value="우체국">우체국</option>
            <option value="하나은행">하나은행</option>
            <option value="신한은행">신한은행</option>
            <option value="케이뱅크">케이뱅크</option>
            <option value="카카오뱅크">카카오뱅크</option>
          </SelectField>
        </td>
      </tr>
      <tr>
        <th>계좌번호</th>
        <td>
          <InputField />
        </td>
      </tr>
      <tr>
        <th>예금주</th>
        <td>
          <InputField />
        </td>
      </tr>
      <tr>
        <th>예금주연락처</th>
        <td>
          <InputField />
        </td>
      </tr>
      <tr>
        <th>예금주 주민번호(앞6자리)</th>
        <td>
          <InputField maxlength="6" />
        </td>
      </tr>
      <tr>
        <th>출금일</th>
        <td>
          <InputField />
        </td>
      </tr>
      <tr>
        <th>CMS 신청서</th>
        <td>
          <CMSBtn @click="showCmsModal = true">작성/전송하기</CMSBtn>
        </td>
      </tr>

      <tr>
        <th>증빙전송</th>
        <td>
          <CMSSt>미전송</CMSSt>
          <!-- <CMSSt class="green">전송완료</CMSSt>
          <CMSSt>전송실패</CMSSt>
          <CMSSt class="green">신청완료</CMSSt> -->
        </td>
      </tr>

      <tr>
        <th>CMS 해지</th>
        <td>
          <CMSBtn class="red">해지요청</CMSBtn>
        </td>
      </tr>
    </ClientFormTable>
  </FlexDiv>

  <!-- <FlexColumnCenter>
    <ClientTitle class="subTitle">{{}}월 대여품목 입력정보</ClientTitle>
    <div>
      <CMSInfoTable>
        <thead>
        <tr>
          <th>품목</th>
          <th>한달<br class="deskNone" />금액</th>
          <th>출금<br class="deskNone">예정금액</th>
          <th>계약<br class="deskNone">시작일</th>
          <th>계약<br class="deskNone">종료일</th>
          <th>본인부담금</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td>3,000원</td>
          <td>3,000원</td>
          <td>2024-01-01</td>
          <td>2024-01-01</td>
          <td>1,000원</td>
        </tr>
        </tbody>
      </CMSInfoTable>
    </div>
  </FlexColumnCenter>

  <FlexColumnCenter>
    <ClientTitle class="subTitle">CMS 출금 정보</ClientTitle>
    <div>
      <CMSInfoTable>
        <thead>
        <tr>
          <th>출금일</th>
          <th>출금금액</th>
          <th>출금예금주</th>
          <th>상태</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>2024-01-01</td>
          <td>3,000원</td>
          <td>홍길동</td>
          <td>출금완료</td>
        </tr>
        </tbody>
      </CMSInfoTable>
    </div>
  </FlexColumnCenter>

  <FlexColumnCenter>
    <ClientTitle class="subTitle">
      대여 입금처리내역
    </ClientTitle>
    <ClientTitle class="subTitle">미수금 총액: 0원</ClientTitle>

    <FlexDiv>
      <CMSInfoTable>
        <thead>
        <tr>
          <th>결제일</th>
          <th>결제<br class="deskNone">방식</th>
          <th>결제<br class="deskNone">금액</th>
          <th>구분</th>
          <th>결제기간</th>
          <th>현재<br class="deskNone">결제잔액</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        </tbody>
      </CMSInfoTable>
    </FlexDiv>
  </FlexColumnCenter>

  <FlexColumnCenter>
    <ClientTitle class="subTitle">
      <div>
      <select class="small">
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      </select>년

      <select class="small">
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
      </select>

      <span class="mobileNone">~</span>
      <div class="deskNone">~</div>

      <select class="small">
        <option value="2024">2024</option>
        <option value="2025">2025</option>
      </select>년

      <select class="small">
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
      </select>
    </div>
      <div>
      월 구입품목 주문서 입력정보
      </div>
    </ClientTitle>

    <CMSInfoTableContainer>
      <CMSInfoTable>
        <thead>
        <tr>
          <th>주문<br class="deskNone" />일자</th>
          <th>품목코드</th>
          <th>제품명</th>
          <th>단가</th>
          <th>수량</th>
          <th>공단<br class="deskNone" />부담금</th>
          <th>본인<br class="deskNone" />부담금</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in 10" :key="item">
          <td>2024-10-23</td>
          <td>M06060154501</td>
          <td>애슬론</td>
          <td>606,000원</td>
          <td>1개</td>
          <td>569,640원</td>
          <td>36,360원</td>
        </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">합계</td>
            <th>606,000원</th>
            <th>1개</th>
            <th>569,640원</th>
            <th>36,360원</th>
          </tr>
        </tfoot>
      </CMSInfoTable>
    </CMSInfoTableContainer>
  </FlexColumnCenter>

  <FlexColumnCenter>
    <ClientTitle class="subTitle"> 구입 입금처리내역</ClientTitle>

    <CMSInfoTableContainer>
      <CMSInfoTable>
        <thead>
        <tr>
          <th>결제일</th>
          <th>결제방식</th>
          <th>결제금액</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in 10" :key="item">
          <td>2024-10-23</td>
          <td>카드</td>
          <td>13,000원</td>
        </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2">합계</td>
            <th>13,0000원</th>
          </tr>
        </tfoot>
      </CMSInfoTable>
    </CMSInfoTableContainer>
  </FlexColumnCenter> -->

  <FlexDiv>
    <RegisterButton class="marginTop small">
      <i class="material-icons blue">rocket</i>
      주문서 입력
    </RegisterButton>
    
  </FlexDiv>

  <FlexDiv> 
  <RegisterButton class="marginTop small marginBottom">
      <i class="material-icons green">currency_exchange</i>
      CMS 정보 수정하기
    </RegisterButton>
  </FlexDiv>
</template>

<script>
import { ref } from 'vue';
import * as PublicCss from '@/assets/styles/public.js';
import * as ModalClientCss from '@/assets/styles/client/ModalClientCss.js';
import ModalCms from '@/components/modal/cms/ModalCms.vue';
import ModalPage from '@/components/modal/ModalPage.vue';

export default {
  name: 'ClientCMSComponent',
  components: {
    ...PublicCss,
    ...ModalClientCss,
    ModalCms,
    ModalPage
  },
  props: {
    client: {
      type: Object,
      required: true
    }
  },
  emits: ['update', 'save', 'cancel'],
  setup() {
    const showCmsModal = ref(false);

    return {
      showCmsModal
    };
  },
};
</script>