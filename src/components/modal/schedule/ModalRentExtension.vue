<template>
  <!-- Modal -->
  <!-- 대여연장관리 모달창 -->
  <ModalPage v-model:show="showModalRentMsg" 
  :height="'75%'" :width="'50%'" 
  :parent="'schedule'">
    <ModalRentMsg :show="showModalRentMsg" 
    @update:show="showModalRentMsg = $event"
    @close="showModalRentMsg = false" />
  </ModalPage>

  <FlexTopDiv>
    <S50Container>
      <div>
        <!-- 선택된 수급자가 없으면 미리보기 화면입니다. 생성을 진행해주세요 텍스트 보여주기 -->
        <SGuideText v-if="selectedItems.length === 0">
          <p>우측 연장내역에서 출력할 내역을 선택해주세요.</p>
        </SGuideText>
        <div v-else>
          <!-- 연장계약서류 파일로 수정 필요 -->
          <DocPrints :key="docPrintKey" :pageUrls="pageUrls" :orderId="selectedOrderIds" :person="selectedItems.length" />
        </div>
      </div>
    </S50Container>

    <S50Container>
      <SSubTitle class="subTitle2">연장내역</SSubTitle>
      <SSubTitle class="guideTitle">(2024-01-24 업데이트 이후 신규연장계약 내역만 표시)</SSubTitle>

      <FlexDiv class="marginTop10">
        <SSearchInput type="text" placeholder="검색어를 입력해주세요." />
        <SSelect>
          <option>2025년</option>
          <option>2024년</option>
          <option>2023년</option>
        </SSelect>
        <SSelect>
         <option>1월</option>
         <option>2월</option>
         <option>3월</option>
         <option>4월</option>
         <option>5월</option>
         <option>6월</option>
         <option>7월</option>
        </SSelect>

        <WhiteBtn>날짜조회</WhiteBtn>
      </FlexDiv>

      <STableContainer class="marginBottom10 zeroList">
        <STable class="font14">
          <thead>
            <tr>
              <th>
                <input type="checkbox" :checked="isAllSelected" @change="toggleAllSelection" />
              </th>
              <th>성함</th>
              <th>인정번호</th>
              <th>품목명</th>
              <!-- <th>품목코드</th> -->
              <th>바코드</th>
              <th>연장시작일<br/>~연장종료일</th>
              <th>진행날짜</th>
              <th>전자서명</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in rentExtensionItems" :key="item.id">
              <td>
                <input type="checkbox" :checked="isItemSelected(item)" @change="toggleItemSelection(item)" />
              </td>
              <td>{{ item.order.client.name }}</td>
              <td>{{ item.order.client.number }}</td>
              <td>{{ item.order.orderProducts[0].product.pname }}</td>
              <!-- <td>M18030043014</td> -->
              <td>{{ item.order.orderProducts[0].orderProductBcodes[0].bcode }}</td>
              <td>{{ item.constractStartDate }}<br/>~{{ item.contractEndDate }}</td>
              <td>{{ item.contractAt }}</td>
              <td></td>
            </tr>
          </tbody>
        </STable>
      </STableContainer>

      <SCheckboxContainer>
        계약서 생성 수급자 : {{ selectedItems.length }}명
      </SCheckboxContainer>
    </S50Container>
  </FlexTopDiv>

  <ModalBtnHeightDiv></ModalBtnHeightDiv>
  <ModalBtnDiv>
    <ModalBtn class="green"> <i class="material-icons">
      file_download</i> 미연장내역 엑셀변환</ModalBtn>
    <ModalBtn class="green"> <i class="material-icons">
      file_download</i> 연장내역 엑셀변환</ModalBtn>
    <!-- <ModalBtn class="gray">닫기</ModalBtn> -->
  </ModalBtnDiv>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import * as PublicCss from '@/assets/styles/public.js'
import * as ModalCss from '@/assets/styles/ModalCss.js';
import * as ScheduleCss from '@/assets/styles/schedule/ScheduleCss.js';
import ModalPage from '@/components/modal/ModalPage.vue'
import ModalRentMsg from '@/components/modal/schedule/ModalRentMsg.vue' 
import DocPrints from '@/components/DocPrints.vue'
import { findAllRentExtension } from '@/api/schedule.js'
export default {
  name: 'ModalRentExtension',
  components: {
    ...PublicCss,
    ...ModalCss,
    ...ScheduleCss,
    ModalPage,
    ModalRentMsg,
    DocPrints
  },
  setup() {
    const selectedItems = ref([])
    const showModalRentMsg = ref(false)
    const selectedOrderIds = ref([])
    const rentExtensionItems = ref([])
    const docPrintKey = ref(0) // DocPrints 컴포넌트 강제 리렌더링을 위한 키
    const pageUrls = ref([
        {
          "일반/감경":
          [
            {url: '/print/Doc1.ejs', name: '급여제공기록지'},
            {url: '/print/Doc2.ejs', name: '복지용구 공급 계약서'},
            {url: '/print/Doc3.ejs', name: '개인정보 수집 및 활용동의서'},
            {url: '/print/Doc4.ejs', name: '제품설치대장'},
            {url: '/print/Doc5.ejs', name: '장기요양급여비용 명세서'},
          ],
          "기초/의료급여": [
            {url: '/print/ZeroDoc1.ejs', name: '입소이용 의뢰서'},
            {url: '/print/ZeroDoc2.ejs', name: '재가서비스 이용내역서'},
          ],
          "추가급여": [
            {url: '/print/AddSalary.ejs', name: '추가급여신청서'},
          ],
          "거래명세서/영수증": [
            {url: '/print/Doc6.ejs', name: '거래명세서'},
            {url: '/print/Doc7.ejs', name: '영수증'},
          ],
          "발주서": [
            {url: '/print/Doc8.ejs', name: '발주서'},
          ]
        }
      ])

    const loadRentExtension = async () => {
      const response = await findAllRentExtension();
      console.log(response, "response");
      rentExtensionItems.value = response.items
    }

    const isItemSelected = (item) => {
      return selectedItems.value.some(selectedItem => selectedItem.id === item.id);
    }

    const toggleItemSelection = (item) => {
      const index = selectedItems.value.findIndex(selectedItem => selectedItem.id === item.id);
      if (index === -1) {
        selectedItems.value.push(item);
      } else {
        selectedItems.value.splice(index, 1);
      }
      updateSelectedOrderIds();
    }

    const isAllSelected = computed(() => {
      return rentExtensionItems.value.length > 0 && selectedItems.value.length === rentExtensionItems.value.length;
    });

    const toggleAllSelection = () => {
      if (isAllSelected.value) {
        selectedItems.value = [];
      } else {
        selectedItems.value = [...rentExtensionItems.value];
      }
      updateSelectedOrderIds();
    }

    const updateSelectedOrderIds = () => {
      selectedOrderIds.value = selectedItems.value.map(item => item.order.id);
      // DocPrints 컴포넌트 강제 리렌더링
      docPrintKey.value += 1;
    }

    // selectedItems가 변경될 때마다 DocPrints 컴포넌트 리렌더링
    watch(selectedItems, () => {
      docPrintKey.value += 1;
    });

    onMounted(() => {
      loadRentExtension();
    })

    return {
      selectedItems,
      showModalRentMsg,
      pageUrls,
      selectedOrderIds,
      rentExtensionItems,
      isItemSelected,
      toggleItemSelection,
      isAllSelected,
      toggleAllSelection,
      docPrintKey
    }
  },
}
</script>