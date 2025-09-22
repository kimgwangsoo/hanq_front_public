<template>
  <FlexTopDiv>
    <S50Container>
      <div>
        <!-- 선택된 수급자가 없으면 미리보기 화면입니다. 생성을 진행해주세요 텍스트 보여주기 -->
        <SGuideText v-if="selectedZeroCount === 0">
          <p>이용내역서 미리보기 화면입니다. </p>
          <p>'이용내역서 생성'을 진행해주세요.</p>
        </SGuideText>
        <div v-else>
          <iframe src="/print/DocLongTermUse.html" width="100%" height="630px"></iframe>
        </div>
      </div>
    </S50Container>

    <S50Container>
      <SSubTitle class="subTitle2">기초이용내역서</SSubTitle>
      <STableContainer class="marginBottom10 zeroList">
        <STable>
          <thead>
            <tr>
              <th>
                <input type="checkbox" v-model="selectedZeroCount" />
              </th>
              <th>수급자</th>
              <th>인정번호</th>
              <th>연락처</th>
              <th>품목명</th>
              <th>담당자</th>
              <th>계약시작일</th>
              <th>계약종료일</th>
              <th>내구연한 만료일</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 10" :key="i">
              <td>
                <input type="checkbox" v-model="selectedZeroCount" />
              </td>
              <td>수급자</td>
              <td>인정번호</td>
              <td>연락처</td>
              <td>품목명</td>
              <td>담당자</td>
              <td>
                <input type="date" />
              </td>
              <td>
                <input type="date" />
              </td>
              <td>내구연한 만료일</td>
            </tr>
          </tbody>
        </STable>
      </STableContainer>

      <FlexDiv>
        <label class="marginRight10">
          <input type="checkbox" />
          입소이용의뢰서
        </label>

        <label class="marginLeft10">
          <input type="checkbox" />
          이용내역서
        </label>
      </FlexDiv>
    </S50Container>
  </FlexTopDiv>

  <ModalBtnHeightDiv></ModalBtnHeightDiv>
  <ModalBtnDiv>
    <ModalBtn>이용내역서 생성</ModalBtn>
    <ModalBtn class="blue">이용내역서 출력</ModalBtn>
    <ModalBtn class="gray">닫기</ModalBtn>
  </ModalBtnDiv>
</template>

<script>
import { ref } from 'vue'
import * as PublicCss from '@/assets/styles/public.js'
import * as ModalCss from '@/assets/styles/ModalCss.js';
import * as ScheduleCss from '@/assets/styles/schedule/ScheduleCss.js';

export default {
  name: 'ModalZeroUsage',
  components: {
    ...PublicCss,
    ...ModalCss,
    ...ScheduleCss,
  },
  setup() {
    const selectedZeroCount = ref(0)

    return {
      selectedZeroCount,
    }
  },
}
</script>