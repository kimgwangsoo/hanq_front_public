import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store' // 스토어 import
import SwalPlugin from './plugins/SwalPlugin';
import commonPlugin from './plugins/commonPlugin';
// import { initializeApi } from './api';
import axios from 'axios';
import * as ChannelService from '@channel.io/channel-web-sdk-loader';
// Axios 기본 설정
axios.defaults.baseURL = process.env.VUE_APP_API_URL || '/';

// 요청 인터셉터 설정
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      // 인증 오류 시 로그인 페이지로 리다이렉트
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

// API 초기화 설정
// initializeApi({
//   baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000',
//   token: localStorage.getItem('token')
// });

const app = createApp(App);
app.use(store);
// 라우터 사용
app.use(router);
app.use(SwalPlugin);
app.use(commonPlugin);
// 라우터 전환 시 로딩 상태 관리
router.beforeResolve((to, from, next) => {
  // 페이지 전환 시 로딩 상태 설정 가능
  next();
});

// 전역 네비게이션 에러 핸들러 추가
router.onError((error) => {
  console.error('라우터 에러:', error);
});

// Axios를 전역에서 사용할 수 있도록 설정
app.config.globalProperties.$axios = axios;

ChannelService.loadScript();
ChannelService.boot({
  "pluginKey": "c879753d-f44d-4b11-9f2f-2f250a5725c7", // fill your plugin key
});
app.mount('#app');