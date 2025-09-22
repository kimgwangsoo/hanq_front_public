<template>
  <FlexLeftTop class="width100 grayBg">
    <!-- 사이드바 -->
    <BDSidebar>
      <BDSidebarTitle>청구/통계 관리</BDSidebarTitle>
      <BDSidebarMenu>
        <BDSidebarMenuItem :class="selectedMenu === 'main' ? 'active' : ''" @click="selectedMenu = 'main'">
          <i class="material-icons">bar_chart</i>
          통계관리
        </BDSidebarMenuItem>
      </BDSidebarMenu>
      
      <BDSidebarSection>
        <BDSidebarSectionTitle>보고서</BDSidebarSectionTitle>
        <BDSidebarMenu>
          <BDSidebarMenuItem :class="selectedMenu === 'billing' ? 'active' : ''" @click="toggleMenu('billing')">
            <i class="material-icons">request_quote</i>
            급여비용청구
            <span class="menu-arrow" :class="{ open: openMenus.billing }">&gt;</span>
          </BDSidebarMenuItem>
          <BDSidebarSubMenu v-if="openMenus.billing">
            <BDSidebarSubMenuItem :class="selectedMenu === 'originalClaim' ? 'active' : ''" @click="selectedMenu = 'originalClaim'">원청구</BDSidebarSubMenuItem>
            <BDSidebarSubMenuItem>보완청구</BDSidebarSubMenuItem>
            <BDSidebarSubMenuItem>추가청구</BDSidebarSubMenuItem>
          </BDSidebarSubMenu>

          <BDSidebarMenuItem @click="toggleMenu('history')">
            <i class="material-icons">receipt_long</i>
            청구내역
            <span class="menu-arrow" :class="{ open: openMenus.history }">&gt;</span>
          </BDSidebarMenuItem>
          <BDSidebarSubMenu v-if="openMenus.history">
            <BDSidebarSubMenuItem :class="selectedMenu === 'monthHistory' ? 'active' : ''" @click="selectedMenu = 'monthHistory'">월별청구내용</BDSidebarSubMenuItem>
          </BDSidebarSubMenu>
        </BDSidebarMenu>
      </BDSidebarSection>
    </BDSidebar>

    <!-- 메인 컨테이너 -->
     <!-- 통계관리 -->
    <BDMainPage v-if="selectedMenu === 'main'" />

    <!-- 급여비용청구 -->
    <!-- 원청구 -->
    <BDOriginalClaim v-if="selectedMenu === 'originalClaim'" />

    <!-- 청구내역 -->
    <BDMonthHistory v-if="selectedMenu === 'monthHistory'" />

  </FlexLeftTop>
</template>

<script>
import * as PublicCss from '@/assets/styles/public.js'
import * as BillDashboardCss from '@/assets/styles/billDashboard/BillDashboardCss.js'
import { ref } from 'vue'
import BDMainPage from '@/views/BillDashbord/BDMainPage.vue'
import BDOriginalClaim from '@/views/BillDashbord/BDOriginalClaim.vue'
import BDMonthHistory from '@/views/BillDashbord/BDMonthHistory.vue'

export default ({
  name: 'BillDashboardPage',
  components: {
    ...PublicCss,
    ...BillDashboardCss,
    BDMainPage,
    BDOriginalClaim,
    BDMonthHistory,
  },
  setup() {

    const selectedMenu = ref('main')
    
    const openMenus = ref({
      billing: false,
      history: false
    });

    const toggleMenu = (menu) => {
      openMenus.value[menu] = !openMenus.value[menu];
    };

    return {
      selectedMenu,
      openMenus,
      toggleMenu,
    }
  }
});
</script> 