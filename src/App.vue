<template>
  <div id="app">
    <APPHeader v-if="!isRedesignationPage" />
    <!-- <AutomationButton v-if="showAutomationButton" /> -->
    <div class="main-content" :class="{ 'login-page': isLoginPage, 'redesignation-page': isRedesignationPage }">
      <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component 
            v-if="route.meta.keepAlive !== false" 
            :is="Component" 
            :key="route.name" 
          />
        </keep-alive>
        <component 
          v-if="route.meta.keepAlive === false" 
          :is="Component" 
          :key="route.name" 
        />
      </router-view>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import APPHeader from './components/AppHeader.vue';
import { useRoute } from 'vue-router';
// import AutomationButton from './components/AutomationButton.vue';

export default defineComponent({
  components: {
    APPHeader,
    // AutomationButton
  },
  setup() {
    const route = useRoute();
    
    const isLoginPage = computed(() => {
      return route.path === '/login';
    });
    
    // 지정갱신관리 메뉴(예: /redesignation), 로그인 페이지일 때 헤더 숨김
    const isRedesignationPage = computed(() => route.path.startsWith('/redesignation') || route.path === '/login');
    
    return {
      $route: route,
      isLoginPage,
      isRedesignationPage
    };
  },
  data() {
    return {
      showAutomationButton: true // 필요에 따라 조건부로 표시할 수 있습니다
    };
  },
  provide: {
    theme: ''
  },
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
  /* font-family: 'Noto Sans KR', sans-serif; */
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-top: 80px; /* 타이틀바(30px) + 메뉴바(50px) 높이만큼 여백 추가 */

  @media (max-width: 768px) {
    margin-top: 30px;
  }
}

.main-content.login-page {
  margin-top: 30px; /* 로그인 페이지에서는 타이틀바(30px)만큼만 여백 추가 */
}

.main-content.redesignation-page {
  margin-top: 0; /*지정갱신관리 페이지에서는 여백 없음*/
}
</style>