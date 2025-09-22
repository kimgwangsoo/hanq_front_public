<template>
  <div>
    <CommonTitleDiv>소독내역 공단등록하기</CommonTitleDiv>

    <PSubTitle class="flex-center">소독내역 추가 제품</PSubTitle>

    <div>
      <PDisinfectionTable>
        <thead>
          <tr>
            <th>품목</th>
            <th>품목명</th>
            <th>품목코드</th>
            <th>바코드</th>
            <th>소독구분</th>
            <th>소독일자</th>
            <th>필증번호</th>
            <th>작업시간</th>
            <th>소독종류</th>
            <th>약품명</th>
            <th>사용량</th>
            <th>소독종류추가</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>수동휠체어</td>
            <td>Mirage2(16D)</td>
            <td>M18030043004</td>
            <td>1234567890123456</td>
            <td>
              <select>
                <option >자체</option>
                <option >테스트</option>
              </select>
            </td>
            <td>
              <input type="date" />
            </td>
            <td>
              <input type="text" disabled />
            </td>
            <td>
              <select>
                <option :value="h" v-for="h in 24" :key="'start_h_'+h">{{ String(h-1).padStart(2, '0') }}</option>
              </select>시
              <select>
                <option :value="m" v-for="m in 60" :key="'start_m_'+m">{{ String(m-1).padStart(2, '0') }}</option>
              </select>분
              ~
              <select>
                <option :value="h" v-for="h in 24" :key="'end_h_'+h">{{ String(h-1).padStart(2, '0') }}</option>
              </select>시
              <select>
                <option :value="m" v-for="m in 60" :key="'end_m_'+m">{{ String(m-1).padStart(2, '0') }}</option>
              </select>분
            </td>
            <td>
              <div v-for="(item, index) in disinfectionItems" :key="index" class="disinfection-item">
                <select v-model="item.type">
                  <option>선택</option>
                  <option>약물소독</option>
                  <option>증기소독</option>
                  <option>일광소독</option>
                  <option>끓는물소독</option>
                </select>
              </div>
            </td>
            <td>
              <div v-for="(item, index) in disinfectionItems" :key="index" class="disinfection-item">
                <input type="text" v-model="item.medicine" placeholder="약품명" />
              </div>
            </td>
            <td>
              <div v-for="(item, index) in disinfectionItems" :key="index" class="disinfection-item">
                <input type="text" v-model="item.usage" placeholder="사용량" />
              </div>
            </td>
            <td>
              <PAddBtn class="marginBottom10" @click="addDisinfectionItem">추가 +</PAddBtn>
              <br>
              <PDeleteBtn @click="removeDisinfectionItem">삭제 -</PDeleteBtn>
            </td>
          </tr>
        </tbody>
      </PDisinfectionTable>
    </div>

    <PSubTitle class="flex-center">미소독 제품</PSubTitle>
    <div class="marginBottom10 flex-center">검색 : <CommonInput class="marginLeft10" /></div>
    <div>
      <PDisinfectionTable>
        <thead>
          <tr>
            <th>품목</th>
            <th>품목명</th>
            <th>품목코드</th>
            <th>바코드</th>
            <th>추가/취소</th>
          </tr>
        </thead>
        <tbody class="font18">
          <tr>
            <td>수동휠체어</td>
            <td>Mirage2(16D)</td>
            <td>M18030043004</td>
            <td>1234567890123456</td>
            <td>
              <PAddBtn>추가 +</PAddBtn>
              <PDeleteBtn>취소 -</PDeleteBtn>
            </td>
          </tr>
        </tbody>
      </PDisinfectionTable>
    </div>

    <ModalBtnHeightDiv></ModalBtnHeightDiv>
    <ModalBtnDiv>
      <ModalBtn>소독진행</ModalBtn>
      <ModalBtn class="gray">닫기</ModalBtn>
    </ModalBtnDiv>
  </div>
</template>

<script>
import * as PublicCss from '@/assets/styles/public.js'
import * as ModalCss from '@/assets/styles/ModalCss'
import * as ProductPageCss from '@/assets/styles/product/ProductPageCss'
import { ref } from 'vue'

export default {
  name: 'ModalDisinfectionDetail',
  components: {
    ...PublicCss,
    ...ModalCss,
    ...ProductPageCss,
  },
  setup() {
    const disinfectionItems = ref([
      { type: '선택', medicine: '', usage: '' }
    ]);

    const addDisinfectionItem = () => {
      disinfectionItems.value.push({ type: '선택', medicine: '', usage: '' });
    };

    const removeDisinfectionItem = (index) => {
      if (disinfectionItems.value.length > 1) {
        disinfectionItems.value.splice(index, 1);
      }
    };

    return {
      disinfectionItems,
      addDisinfectionItem,
      removeDisinfectionItem,
    }
  }
}
</script>