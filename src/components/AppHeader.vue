<template>
  <!-- 모달창 -->
  <ModalPage v-model:show="showModalSystem" 
  :height="'78%'" :width="'95%'" :parent="'header'">
    <ModalSystem :show="showModalSystem" @update:show="showModalSystem = $event"
      @close="showModalSystem = false" :source="'button'" />
  </ModalPage>
  
  <!-- 메뉴 토글 버튼 -->
  <MenuToggle @click="toggleSidebar" :style="{ left: isSidebarOpen ? '190px' : '10px', backgroundColor: isSidebarOpen ? '#3498db' : '' }">
    <i v-if="!isSidebarOpen" class="material-icons">menu</i>
    <i v-else class="material-icons blueBg">close</i>
  </MenuToggle>
  
  <!-- 오버레이 -->
  <Overlay :class="{ active: isSidebarOpen }" @click="closeSidebar"></Overlay>
  
  <Header :class="{ 'sidebar-open': isSidebarOpen }">
    <!-- 사용자 정의 타이틀바 추가 -->
    <TitleBar class="mobileNone">
      <Title>한방에 큐</Title>
      <WindowControls>
        <WindowControl class="minimize" @click="minimizeWindow">─</WindowControl>
        <WindowControl class="maximize" @click="maximizeWindow">□</WindowControl>
        <WindowControl class="close" @click="closeWindow">✕</WindowControl>
      </WindowControls>
    </TitleBar>
    <MainNav v-if="!isLoginPage" :class="{ 'mobile-menu-open': isSidebarOpen }">
      <MenuContainer>
        <MenuLeft>
          <MenuItem class="deskNone"></MenuItem>
          <MenuItem @click.prevent="navigateTo('/home')" :class="'deskNone ' + [isActive('/home') ? 'router-link-active' : '']">홈</MenuItem>
          <MenuItem @click.prevent="navigateTo('/')" :class="[isActive('/') ? 'router-link-active' : '']">수급자조회하기</MenuItem>
          <MenuItem @click.prevent="navigateTo('/lookup')" :class="[isActive('/lookup') ? 'router-link-active' : '']">최근조회기록</MenuItem>
          <MenuItem @click.prevent="navigateTo('/schedule')" :class="'mobileNone ' + [isActive('/schedule') ? 'router-link-active' : '']">한방에큐</MenuItem>
          <MenuItem @click.prevent="navigateTo('/client')" :class="[isActive('/client') ? 'router-link-active' : '']">수급자목록</MenuItem>
          <MenuItem @click.prevent="navigateTo('/orders')" :class="[isActive('/orders') ? 'router-link-active' : '']">주문 및 발주</MenuItem>
          <MenuItem @click.prevent="navigateTo('/product')" :class="'mobileNone ' + [isActive('/product') ? 'router-link-active' : '']">재고관리</MenuItem>
          <MenuItem @click.prevent="navigateTo('/rent')" :class="[isActive('/rent') ? 'router-link-active' : '']">대여관리</MenuItem>
          <MenuItem @click.prevent="navigateTo('/delivery')" :class="[isActive('/delivery') ? 'router-link-active' : '']">배송관리</MenuItem>
          <MenuItem @click.prevent="navigateTo('/dashboard')" :class="'mobileNone ' + [isActive('/dashboard') ? 'router-link-active' : '']">청구/통계관리</MenuItem>
          <MenuItem @click.prevent="navigateTo('/cms')" :class="'mobileNone ' + [isActive('/cms') ? 'router-link-active' : '']">CMS관리</MenuItem>
          <MenuItem @click.prevent="navigateTo('/virtualaccount')" :class="'mobileNone ' + [isActive('/virtualaccount') ? 'router-link-active' : '']">가상계좌관리</MenuItem>
          <MenuItem @click.prevent="navigateTo('/zeroclient')" :class="'mobileNone ' + [isActive('/zeroclient') ? 'router-link-active' : '']">기초관리</MenuItem>
          <MenuItem @click.prevent="navigateTo('/notice')" :class="'mobileNone ' + [isActive('/notice') ? 'router-link-active' : '']">공지사항</MenuItem>
          <MenuItem @click.prevent="navigateTo('/rate')" :class="'mobileNone ' + [isActive('/rate') ? 'router-link-active' : '']">평가관리</MenuItem>
          <MenuItem @click.prevent="navigateTo('/redesignation')" :class="'mobileNone ' + [isActive('/redesignation') ? 'router-link-active' : '']">지정갱신관리</MenuItem>
        </MenuLeft>
        <MenuRight class="mobileNone">
          <MenuItem @click="showModalSystem = true" :class="['system-menu', isActive('/system') ? 'router-link-active' : '']">시스템관리</MenuItem>
        </MenuRight>
      </MenuContainer>
    </MainNav>
  </Header>
  
  <!-- 하단 네비게이션 바 -->
  <BottomNavigation>
    <NavButton @click="goHome" :class="{ active: isActive('/home') }">
      <i class="material-icons">home</i>
      <NavButtonText>홈</NavButtonText>
    </NavButton>
    <NavButton @click="goBack">
      <i class="material-icons">arrow_back</i>
      <NavButtonText>뒤로</NavButtonText>
    </NavButton>
    <NavButton @click="goForward">
      <i class="material-icons">arrow_forward</i>
      <NavButtonText>앞으로</NavButtonText>
    </NavButton>
    <NavButton @click="refresh">
      <i class="material-icons">refresh</i>
      <NavButtonText>새로고침</NavButtonText>
    </NavButton>
    <NavButton @click="scrollToTop">
      <i class="material-icons">arrow_upward</i>
      <NavButtonText>맨위로</NavButtonText>
    </NavButton>
  </BottomNavigation>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import * as PublicCss from '@/assets/styles/public.js';
import * as AppHeaderCss from '@/assets/styles/header/AppHeaderCss.js';
import ModalPage from '@/components/modal/ModalPage.vue'
import ModalSystem from '@/components/modal/system/ModalSystem.vue' 

export default defineComponent({
  name: 'APPHeader',
  components: {
    ...AppHeaderCss,
    ...PublicCss,
    ModalPage,
    ModalSystem
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const user = ref({});
    const showModalSystem = ref(false); 
    const isSidebarOpen = ref(false);
    
    const isLoggedIn = computed(() => {
      return localStorage.getItem('token') !== null;
    });
    
    const isLoginPage = computed(() => {
      return route.path === '/login';
    });
    
    onMounted(() => {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          user.value = JSON.parse(userStr);
        } catch (e) {
          console.error('사용자 정보 파싱 오류:', e);
        }
      }
    });

    const navigateTo = (path) => {
      console.log('메뉴 클릭:', path);
      if (route.path !== path) {
        router.push({
          path: path
        }).catch(err => {
          if (err.name !== 'NavigationDuplicated') {
            console.error('라우팅 오류:', err);
          }
        });
      }
      // 모바일에서 메뉴 클릭 시 사이드바 닫기
      if (window.innerWidth <= 768) {
        closeSidebar();
      }
    };
    
    const isActive = (path) => {
      return route.path === path;
    };

    const logout = () => {
      // 로그아웃 처리
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    };
    
    // 윈도우 컨트롤 함수
    const minimizeWindow = () => {
      console.log('최소화 버튼 클릭됨');
      
      try {
        if (window.electron && typeof window.electron.send === 'function') {
          window.electron.send('minimize-window');
        } else {
          console.log('window.electron API를 찾을 수 없습니다. 브라우저 환경에서 실행 중인지 확인하세요.');
        }
      } catch (error) {
        console.error('최소화 처리 중 오류:', error);
      }
    };
    
    const maximizeWindow = () => {
      console.log('최대화 버튼 클릭됨');
      
      try {
        if (window.electron && typeof window.electron.send === 'function') {
          window.electron.send('maximize-window');
        } else {
          console.log('window.electron API를 찾을 수 없습니다. 브라우저 환경에서 실행 중인지 확인하세요.');
        }
      } catch (error) {
        console.error('최대화 처리 중 오류:', error);
      }
    };
    
    const closeWindow = () => {
      console.log('닫기 버튼 클릭됨');
      
      try {
        if (window.electron && typeof window.electron.send === 'function') {
          window.electron.send('close-window');
        } else {
          console.log('window.electron API를 찾을 수 없습니다. 브라우저 환경에서 실행 중인지 확인하세요.');
        }
      } catch (error) {
        console.error('닫기 처리 중 오류:', error);
      }
    };
    
    // 사이드바 토글
    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };
    
    // 사이드바 닫기
    const closeSidebar = () => {
      isSidebarOpen.value = false;
    };
    
    // 하단 네비게이션 바 함수
    const goHome = () => {
      router.push('/home');
    };
    
    const goBack = () => {
      router.go(-1);
    };
    
    const goForward = () => {
      router.go(1);
    };
    
    const refresh = () => {
      window.location.reload();
    };
    
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    return { 
      logout,
      isLoggedIn,
      isLoginPage,
      user,
      navigateTo,
      isActive,
      minimizeWindow,
      maximizeWindow,
      closeWindow,
      showModalSystem,
      isSidebarOpen,
      toggleSidebar,
      closeSidebar,
      goHome,
      goBack,
      goForward,
      refresh,
      scrollToTop
    };
  },
});
</script>