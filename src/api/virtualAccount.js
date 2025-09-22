import apiClient from './apiClient';
/**
 * API 기본 URL 설정
 * @param {string} baseURL - 설정할 기본 URL
 */
export const setBaseURL = (baseURL) => {
  apiClient.defaults.baseURL = baseURL;
};

/**
 * API 인증 토큰 설정
 * @param {string} token - 설정할 인증 토큰
 */
export const setToken = (token) => {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// 요청 인터셉터 - 토큰 추가 등
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 응답 인터셉터 - 에러 처리, 토큰 갱신 등
apiClient.interceptors.response.use(
  response => response,
  async error => {
    // 401 에러(인증 실패) 처리
    if (error.response && error.response.status === 401) {
      // 로그인 페이지로 이동 또는 토큰 갱신 로직
      localStorage.removeItem('token');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

// 가상계좌 목록 조회
export const getVirtualAccountList = (params) => {
  return apiClient.post('/virtualaccount/getlist', params);
};

// 가상계좌 조회
export const getVirtualAccountCount = () => {
  return apiClient.post('/virtualaccount/getacc', {
  });
};

// 가상계좌 등록
export const createVirtualAccount = (params) => {
  return apiClient.post('/virtualaccount/create', {
    ...params,
  });
};

// 가상계좌 채번 등록
export const createVirtualAccountBatch = (param) => {
  return apiClient.post('/virtualaccount/create/batch',
    param,
  );
};

// 가상계좌 삭제
export const deleteVirtualAccount = (vkey) => {
  return apiClient.post('/virtualaccount/delete', {
    vkey: vkey,
  });
};

// 가상계좌 재발송
export const resendVirtualAccount = (params) => {
  return apiClient.post('/virtualaccount/resend', params);
};

// 가상계좌 모바일 중복 조회
export const checkMobile = (mobile) => {
  return apiClient.post('/virtualaccount/mobile_check', {
    mobile: mobile
  });
};

// 가상계좌 검색
export const searchCustomer = (search) => {
  return apiClient.post('/virtualaccount/search_customer', {
    search: search
  });
};
