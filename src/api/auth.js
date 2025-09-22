import apiClient from './apiClient';

export default {
  // 로그인
  login(credentials) {
    return apiClient.post('/auth/login', credentials);
  },
  
  // 로그아웃
  logout() {
    return apiClient.post('/auth/logout');
  },
  
  // 회원가입
  register(userData) {
    return apiClient.post('/auth/register', userData);
  },
  
  // 비밀번호 재설정 요청
  forgotPassword(email) {
    return apiClient.post('/auth/forgot-password', { email });
  },
  
  // 비밀번호 재설정
  resetPassword(token, newPassword) {
    return apiClient.post('/auth/reset-password', { token, newPassword });
  },
}; 