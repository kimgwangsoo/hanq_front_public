<template>
  <FlexColumnCenter>
  <SModalTitle>
    문자 발송
  </SModalTitle>
  <FlexDiv class="marginBottom10">
    발신번호 : 
    <SSelect class="marginLeft10 marginBottom10">
      <option>010-1234-5678</option>
      <option>010-1234-5679</option>
    </SSelect>
  </FlexDiv>

  <SModalTitle>
    수신자 : 1명
  </SModalTitle>

  <SMsgTableContainer>
    <SMsgTable>
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>성함</th>
          <th>인정번호</th>
          <th>연락처</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 10" :key="i">
          <td>
            <input type="checkbox" />
          </td>
          <td>홍길동</td>
          <td>1234567890</td>
          <td>010-1234-5678</td>
        </tr>
      </tbody>
    </SMsgTable>
  </SMsgTableContainer>

  <FlexDiv class="marginBottom10">
    <WhiteBtn class="marginRight10" @click="selectedType = '카카오톡/문자'">카카오톡/문자</WhiteBtn>
    <WhiteBtn class="marginRight10" @click="selectedType = '알림톡'">알림톡</WhiteBtn>
    <WhiteBtn @click="selectedType = '계약서발송'">계약서발송</WhiteBtn>
  </FlexDiv>

  <FlexColumnCenter v-if="selectedType === '카카오톡/문자'">
    <SModalTitle>카카오톡/문자</SModalTitle>
    <div>
      <SMsgTextarea></SMsgTextarea>
    </div>
  </FlexColumnCenter>

  <FlexColumnCenter v-if="selectedType === '알림톡'">
    <SModalTitle>알림톡</SModalTitle>
    <FlexDiv class="marginBottom10">
      <WhiteBtn class="marginRight10">계약서 발송</WhiteBtn>
      <WhiteBtn>전동침대 대여(임대)에 관한 유의사항</WhiteBtn>
    </FlexDiv>
    <div>
      <SMsgTextarea></SMsgTextarea>
    </div>
  </FlexColumnCenter>

  <FlexColumnCenter v-if="selectedType === '계약서발송'">
    <SModalTitle>계약서발송</SModalTitle>
    <FlexDiv class="marginBottom10">
      <FlexLabel class="marginRight10">
        <input type="checkbox" />
         급여제공기록지
      </FlexLabel>
      <FlexLabel class="marginRight10">
        <input type="checkbox" />
         공급계약서
      </FlexLabel>
      <FlexLabel>
        <input type="checkbox" />
         급여비용명세서
      </FlexLabel>
    </FlexDiv>
    <div>
      <SMsgTextarea></SMsgTextarea>
    </div>
  </FlexColumnCenter>
</FlexColumnCenter>

  <ModalBtnHeightDiv></ModalBtnHeightDiv>
  <ModalBtnDiv>
    <ModalBtn>전송</ModalBtn>
  </ModalBtnDiv>
</template>

<script>
import { ref } from 'vue'
import * as PublicCss from '@/assets/styles/public.js'
import * as ModalCss from '@/assets/styles/ModalCss.js';
import * as ScheduleCss from '@/assets/styles/schedule/ScheduleCss.js';

export default {
  name: 'ModalRentMsg',
  components: {
    ...PublicCss,
    ...ModalCss,
    ...ScheduleCss,
  },
  setup() {
    const selectedType = ref('')

    return {
      selectedType
    }
  },
}
</script>