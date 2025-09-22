<template>
  <!-- Modals -->
  <ModalPage v-model:show="showModalRateDetail" 
    :height="'78%'" 
    :width="'100%'" 
    :parent="'rate'">
      <ModalRateDetail :show="showModalRateDetail" 
      :imgKeyword="selectComponentNum" />
  </ModalPage>

  <FlexLeftTop class="width100">
    <RSidebar>
      <RSidebarTitle>평가관리</RSidebarTitle>
      <RSidebarMenu>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'one' }" @click="selectComponentNum = 'one'; selectComponent = 'InstitutionOperation'">
          1. 운영규정
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'two' }" @click="selectComponentNum = 'two'; selectComponent = 'InstitutionOperation'">
          2. 제품관리대장
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'three' }" @click="selectComponentNum = 'three'; selectComponent = 'InstitutionOperation'">
          3. 제품취급
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'four' }" @click="selectComponentNum = 'four'; selectComponent = 'InstitutionOperation'">
          4. 전용차량
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'five' }" @click="selectComponentNum = 'five'; selectComponent = 'InstitutionOperation'">
          5. 보수(임금)
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'six' }" @click="selectComponentNum = 'six'; selectComponent = 'EnvironmentalSafety'">
          6. 개인정보보호
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'seven' }" @click="selectComponentNum = 'seven'; selectComponent = 'EnvironmentalSafety'">
          7. 제품보관
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'eight' }" @click="selectComponentNum = 'eight'; selectComponent = 'EnvironmentalSafety'">
          8. 소독실시
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'nine' }" @click="selectComponentNum = 'nine'; selectComponent = 'EnvironmentalSafety'">
          9. 소독위탁
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'ten' }" @click="selectComponentNum = 'ten'; selectComponent = 'EnvironmentalSafety'">
          10. 소독관리
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'eleven' }" @click="selectComponentNum = 'eleven'; selectComponent = 'EnvironmentalSafety'">  
          11. 시설기준
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'twelve' }" @click="selectComponentNum = 'twelve'; selectComponent = 'EnvironmentalSafety'">
          12. 제품수리/보수관리
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'thirteen' }" @click="selectComponentNum = 'thirteen'; selectComponent = 'ClientGuarantee'">
          13. 급여계약설명
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'fourteen' }" @click="selectComponentNum = 'fourteen'; selectComponent = 'ClientGuarantee'">
          14. 제품사용설명
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'fifteen' }" @click="selectComponentNum = 'fifteen'; selectComponent = 'ClientGuarantee'">
          15. 수급자상담관리
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'sixteen' }" @click="selectComponentNum = 'sixteen'; selectComponent = 'ClientGuarantee'">
          16. 급여제공역량관리
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'seventeen' }" @click="selectComponentNum = 'seventeen'; selectComponent = 'ClientGuarantee'">
          17. 연장대여동의서
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'eighteen' }" @click="selectComponentNum = 'eighteen'; selectComponent = 'ClientGuarantee'">
          18. 수급자 알권리 보장
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'nineteen' }" @click="selectComponentNum = 'nineteen'; selectComponent = 'PayrollProcess'">
          19. 욕구사정
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'twenty' }" @click="selectComponentNum = 'twenty'; selectComponent = 'PayrollProcess'">
          20. 급여제공기록지 제공
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'twentyOne' }" @click="selectComponentNum = 'twentyOne'; selectComponent = 'PayrollProcess'">
          21. 제품전시
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'twentyTwo' }" @click="selectComponentNum = 'twentyTwo'; selectComponent = 'PayrollProcess'">
          22. 가격표시제
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'twentyThree' }" @click="selectComponentNum = 'twentyThree'; selectComponent = 'PayrollProcess'">
          23. 설치 및 제품설명
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'twentyFour' }" @click="selectComponentNum = 'twentyFour'; selectComponent = 'PayrollResult'">
          24. 활동지원도움
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'twentyFive' }" @click="selectComponentNum = 'twentyFive'; selectComponent = 'PayrollResult'">
          25. 노인인권보호
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'twentySix' }" @click="selectComponentNum = 'twentySix'; selectComponent = 'PayrollResult'">
          26. 급여과정 만족도
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'twentySeven' }" @click="selectComponentNum = 'twentySeven'; selectComponent = 'PayrollResult'">
          27. 서비스 만족도 조사(유선)
        </RSidebarMenuItem>
        <RSidebarMenuItem :class="{ active: selectComponentNum === 'twentyEight' }" @click="selectComponentNum = 'twentyEight'; selectComponent = 'PayrollResult'">
          28. 질향상노력
        </RSidebarMenuItem>
      </RSidebarMenu>
    </RSidebar>

    <div class="width100">
      <RTopInfo>
        <div class="title">평가관리 (2차 업데이트)</div>
        <div class="desc">복지용구 전체 평가 내역을 확인할수있습니다.</div>

        <RBtnContainer>
          <button :class="{ active: selectComponent === 'InstitutionOperation' }" @click="selectComponent = 'InstitutionOperation'">
            <i class="material-icons">home</i> &nbsp;
            기관운영 [14점]
          </button>
          <button :class="{ active: selectComponent === 'EnvironmentalSafety' }" @click="selectComponent = 'EnvironmentalSafety'">
            <i class="material-icons">construction</i> &nbsp;
            환경 및 안전 [25점]
          </button>
          <button :class="{ active: selectComponent === 'ClientGuarantee' }" @click="selectComponent = 'ClientGuarantee'">
            <i class="material-icons">person</i> &nbsp;
            수급자 권리보장 [23점]
          </button>
          <button :class="{ active: selectComponent === 'PayrollProcess' }" @click="selectComponent = 'PayrollProcess'">
            <i class="material-icons">handshake</i> &nbsp;
            급여제공과정 [20점]
          </button>
          <button :class="{ active: selectComponent === 'PayrollResult' }" @click="selectComponent = 'PayrollResult'">
            <i class="material-icons">payment</i> &nbsp;
            급여제공결과 [18점]
          </button>
        </RBtnContainer>
        
      </RTopInfo>
      <div class="width100">
        <InstitutionOperation v-if="selectComponent === 'InstitutionOperation'" 
        v-model:selectComponentNum="selectComponentNum" 
        v-model:showModalRateDetail="showModalRateDetail" />
        <EnvironmentalSafety v-if="selectComponent === 'EnvironmentalSafety'" 
        v-model:selectComponentNum="selectComponentNum" 
        v-model:showModalRateDetail="showModalRateDetail" />
        <ClientGuarantee v-if="selectComponent === 'ClientGuarantee'" 
        v-model:selectComponentNum="selectComponentNum" 
        v-model:showModalRateDetail="showModalRateDetail" />
        <PayrollProcess v-if="selectComponent === 'PayrollProcess'" 
        v-model:selectComponentNum="selectComponentNum" 
        v-model:showModalRateDetail="showModalRateDetail" />
        <PayrollResult v-if="selectComponent === 'PayrollResult'" 
        v-model:selectComponentNum="selectComponentNum" 
        v-model:showModalRateDetail="showModalRateDetail" />
      </div>
    </div>
  </FlexLeftTop>
</template>

<script>
import { ref } from 'vue'
import * as PublicCss from '@/assets/styles/public.js'
import * as RateCss from '@/assets/styles/rate/RateCss.js'  
import InstitutionOperation from '@/views/Rate/component/InstitutionOperation.vue'
import EnvironmentalSafety from '@/views/Rate/component/EnvironmentalSafety.vue'
import ClientGuarantee from '@/views/Rate/component/ClientGuarantee.vue'
import PayrollProcess from '@/views/Rate/component/PayrollProcess.vue'
import PayrollResult from '@/views/Rate/component/PayrollResult.vue'
import ModalPage from '@/components/modal/ModalPage.vue'
import ModalRateDetail from '@/components/modal/rate/ModalRateDetail.vue' 

export default {
  name: 'RateMainPage',
  components: {
    ...PublicCss,
    ...RateCss,
    ModalPage,
    ModalRateDetail,
    InstitutionOperation,
    EnvironmentalSafety,
    ClientGuarantee,
    PayrollProcess,
    PayrollResult
  },

  setup() {
    const selectComponent = ref('InstitutionOperation')
    const selectComponentNum = ref('one')
    const showModalRateDetail = ref(false)

    return {
      selectComponent,
      selectComponentNum,
      showModalRateDetail
    }
  }
  
}
</script>
