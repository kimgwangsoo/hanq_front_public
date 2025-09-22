<template>
  <div id="print-root">
    <!-- 상단구역 -->
    <LPrintTopDiv>
      <LogoSection>
        <img :src="filePreview.logo" alt="logo">
      </LogoSection>
      <ClientInfoSection>
        <div>
        {{ 조회일자 }}
      </div>
        <div>
        성함: {{ clientData.name }}
      <br>
        인정번호 : {{ clientData.number }}
    </div>
    </ClientInfoSection>
    <BusinessCardSection>
      <img :src="filePreview.card" alt="card">
    </BusinessCardSection>
  </LPrintTopDiv>

  <!-- 조회 데이터 구역 -->
  <LPrintFlexDiv>
    <InfoPanel class="marginRight10">
      <FlexLeft class="marginBottom10">
        <LookupTitle>생년월일</LookupTitle>
        <LookupBox>{{ lookupData.regident }}</LookupBox>
      </FlexLeft>
      <FlexLeft class="marginBottom10">
        <LookupTitle>성별</LookupTitle>
        <LookupBox>{{ lookupData.gender }}</LookupBox>
      </FlexLeft>
      <FlexLeft class="marginBottom10">
        <LookupTitle>인정등급</LookupTitle>
        <LookupBox>{{ lookupData.ranker }}</LookupBox>
      </FlexLeft>
      <FlexLeft class="marginBottom10">
        <LookupTitle>대상</LookupTitle>
        <LookupBox>{{ lookupData.reduce_nm }}</LookupBox>
      </FlexLeft>
      
    </InfoPanel>
    <InfoPanel>
    <FlexLeft class="marginBottom10">
      <LookupTitle>본인부담율</LookupTitle>
      <LookupBox>{{ lookupData.reduce_sale }}</LookupBox></FlexLeft>
      <FlexLeft class="marginBottom10">
        <LookupTitle>사용가능금액</LookupTitle>
        <LookupBox>{{ lookupData.money }}</LookupBox>
      </FlexLeft>
      <FlexLeft class="marginBottom10">
        <LookupTitle>특이사항</LookupTitle>
        <LookupBox :style="{ color: lookupData.sisulColor }">{{ lookupData.sisul }}</LookupBox></FlexLeft>
      <FlexLeft class="marginBottom10">
        <LookupTitle>현재유효기간</LookupTitle>
        <LookupBox v-html="lookupData.rcgt"></LookupBox>
      </FlexLeft>
    </InfoPanel>
  </LPrintFlexDiv>

  <!-- 적용구간 -->
  <ApplySection>
    <span>적용구간</span>
    <div>
      <template v-if="totalDates && totalDates.length > 0">
        <div v-for="i in Math.ceil(totalDates.length / 2)" :key="i">
          <span :class="{ 'active': totalDates[(i-1)*2].active }">{{ totalDates[(i-1)*2].text }}</span>
          <span v-if="(i-1)*2+1 < totalDates.length">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span v-if="(i-1)*2+1 < totalDates.length" :class="{ 'active': totalDates[(i-1)*2+1].active }">{{ totalDates[(i-1)*2+1].text }}</span>
        </div>
      </template>
      <template v-else>
        <div>정보 없음</div>
      </template>
    </div>
  </ApplySection>

  <!-- 품목 여부 -->
  <ItemsContainer>
    <!-- 구매 관련 품목 -->
    <PurchaseItemsContainer>
      <ItemSection>
        <ItemTitle class="greenBg">구매가능품목</ItemTitle>
        <ItemContent>
          <div v-for="(item, index) in statusItems.statusBoxBuy" :key="`buy-${index}`" class="status_item">
            {{ item }}
          </div>
        </ItemContent>
      </ItemSection>

      <ItemSection>
        <ItemTitle class="redBg">사용불가품목</ItemTitle>
        <ItemContent>
          <div v-for="(item, index) in statusItems.statusBoxBuyNot" :key="`buy-${index}`" class="status_item">
            {{ item }}
          </div>
        </ItemContent>
      </ItemSection>
    </PurchaseItemsContainer>

    <!-- 대여 관련 품목 -->
    <RentItemsContainer>
      <ItemSection>
        <ItemTitle class="greenBg">대여중인 품목</ItemTitle>
        <ItemContent>
          <div v-for="(item, index) in statusItems.statusBoxRent" :key="`rent-${index}`" class="status_item">
            {{ item }}
          </div>
        </ItemContent>
      </ItemSection>

      <ItemSection>
        <ItemTitle class="greenBg">대여가능품목</ItemTitle>
        <ItemContent>
          {{ displayRentAvailableItems.join('\n ') }}
        </ItemContent>
      </ItemSection>

      <ItemSection>
        <ItemTitle class="redBg">대여불가품목</ItemTitle>
        <ItemContent>
          <div v-for="(item, index) in statusItems.statusBoxRentNot" :key="`rent-${index}`" class="status_item">
            {{ item }}
          </div>
        </ItemContent>
      </ItemSection>
    </RentItemsContainer>
  </ItemsContainer>
</div>

  <ModalBtnHeightDiv></ModalBtnHeightDiv>
    <ModalBtnDiv>
      <ModalBtn class="green" @click="printDocument">프린트</ModalBtn>
      <ModalBtn class="red" @click="$emit('cancel')">닫기</ModalBtn>
    </ModalBtnDiv>
</template>

<script>
import { ref, onMounted, computed, defineComponent, reactive } from 'vue';
import * as PublicCss from '@/assets/styles/public.js';
import * as ModalCss from '@/assets/styles/ModalCss.js';  
import * as ModalLookupPrintCss from '@/assets/styles/mainLookUp/ModalLookupPrintCss.js';
import { getCompanyFile } from '@/api/system';
export default defineComponent({
  name: 'ModalLookupPrint',
  components: {
    ...PublicCss,
    ...ModalCss,
    ...ModalLookupPrintCss,
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    clientData: {
      type: Object,
      required: false
    },
    lookupData: {
      type: Object,
      required: false
    },
    totalDates: {
      type: Object,
      required: false
    },
    statusItems: {
      type: Object,
      required: false
    }
  },
  emits: ['update:show', 'cancel'],
  setup(props) {
    const 조회일자 = ref(new Date().toLocaleDateString());
    const buyAvailableItems = ref([
    ]);
    const rentAvailableItems = ref([
      "전동침대",
      "수동휠체어",
      "경사로(실외용)",
      "이동욕조",
      "욕창예방 매트리스",
      "배회감지기"
    ]);

    const filePreview = reactive({
      card: '',
      logo: ''
    });


    // 대여불가품목을 제외한 대여가능품목 목록 계산
    const displayRentAvailableItems = computed(() => {
      // rentAvailableItems에서 rentNotItems와 statusItems.statusBoxRent, statusItems.statusBoxRentNot에 있는 항목을 제외
      return rentAvailableItems.value.filter(item => 
        !props.statusItems?.statusBoxRent?.includes(item) && 
        !props.statusItems?.statusBoxRentNot?.includes(item)
      );
    });

    // 프린트 기능
    const printDocument = () => {
      // 원래 페이지 제목 저장
      const originalTitle = document.title;
      
      // 인쇄/저장 시 파일명을 '화면출력'으로 설정
      document.title = 'hanq';
      
      // 인쇄 실행
      window.print();
      
      // 인쇄 후 원래 페이지 제목 복원
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    };

    // const printDocument = () => {
    //   const source = document.getElementById('print-root'); // 출력할 루트
    //   if (!source) return;

    //   // 1) 새 창 열기
    //   const printWindow = window.open('', '_blank', 'width=900,height=1000');

    //   // 2) 현재 문서의 <style> 과 <link rel="stylesheet">를 모두 수집
    //   const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    //     .map(el => el.outerHTML)
    //     .join('\n');

    //   // 3) 출력 색 보존 + A4 설정 + 여백 등 인쇄 전용 CSS
    //   const printCSS = `
    //     <style>
    //       @page { size: A4; margin: 15mm; }
    //       @media print {
    //         html, body { background: #fff !important; }
    //         #print-root {
    //           -webkit-print-color-adjust: exact !important;
    //           print-color-adjust: exact !important;
    //           color-adjust: exact !important;
    //         }
    //       }
    //     </style>
    //   `;

    //   // 4) 출력할 HTML 구성 (print-root의 내부만 복사)
    //   const html = `
    //     <html>
    //       <head>
    //         <meta charset="utf-8">
    //         ${styles}
    //         ${printCSS}
    //       </head>
    //       <>
    //         <div id="print-root">${source.innerHTML}</div>
    //         <>
    //           // 로고 등 이미지 로딩 후 인쇄
    //           window.onload = function() {
    //             window.focus();
    //             window.print();
    //             window.close();
    //           };
    //         </ script>
    //       </ body>
    //     </ html>
    //   `;

    //   // 5) 새 창에 쓰고 닫기(로드되면 window.onload에서 인쇄)
    //   printWindow.document.open();
    //   printWindow.document.write(html);
    //   printWindow.document.close();
    //   printWindow.print();
    //   printWindow.close();
    // };

    const getCompanyFileFn = async (type) => {
      try {
        // 회사 파일 가져오기 API 호출
        const response = await getCompanyFile(type);
        // 파일 미리보기 업데이트
        filePreview[type] = response.data;
      } catch (error) {
        console.error(`파일 가져오기 중 오류 발생:`, error);
      }
    };

    onMounted(() => {
      getCompanyFileFn('card');
      getCompanyFileFn('logo');
      console.log(props.statusItems,"statusItems");
    });

    return {
      조회일자,
      buyAvailableItems,
      rentAvailableItems,
      displayRentAvailableItems,
      printDocument,
      filePreview,
    };
  }
});
</script>