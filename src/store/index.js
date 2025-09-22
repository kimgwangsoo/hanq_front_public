import { createStore } from 'vuex';
import apiClient from '../api/apiClient';

// Axios 요청 인터셉터: 모든 요청에 JWT 토큰 추가
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    user: (() => {
      try {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
      } catch (error) {
        console.error('사용자 데이터 파싱 오류:', error);
        localStorage.removeItem('user');
        return null;
      }
    })(),
    token: localStorage.getItem('token') || null,
  },
  mutations: {
    // 로그인 성공 시 상태 변경
    LOGIN_SUCCESS(state, { token, user }) {
      state.isLoggedIn = true;
      state.token = token;
      state.user = user;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    // 로그아웃 시 상태 초기화
    LOGOUT(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  actions: {
    // 로그인 API 호출
    async login({ commit }, credentials) {
      try {
        const response = await apiClient.post('/auth/login', credentials);
        const { access_token } = response.data;
        
        // 토큰을 이용해 사용자 프로필 정보 가져오기
        const userResponse = await apiClient.get('/auth/profile', {
          headers: { Authorization: `Bearer ${access_token}` }
        });

        commit('LOGIN_SUCCESS', { token: access_token, user: userResponse.data });
        
        // Electron 메인 프로세스에 토큰 저장 요청
        if (window.electron) {
          window.electron.send('save-auth-token', access_token);
        }
        
        return true; // 로그인 성공
      } catch (error) {
        console.error('Login failed:', error);
        commit('LOGOUT');
        return false; // 로그인 실패
      }
    },
    // 로그아웃
    logout({ commit }) {
      commit('LOGOUT');
      
      // Electron 메인 프로세스에 토큰 삭제 요청
      if (window.electron) {
        window.electron.send('save-auth-token', null);
      }
    },
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    user: state => state.user,
    companyName: state => state.user.companyName,
    cnum: state => state.user.cnum,
    companyId: state => state.user.companyId,
  },
});
