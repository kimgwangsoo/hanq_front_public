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

export const getPayment = async (id) => {
    console.log(id,"id")
    const response = await apiClient.get(`/payment/${id}`);
    return response.data;
}

export const createPayment = async (paymentData) => {
    const response = await apiClient.post('/payment', paymentData);
    return response.data;
}

export const updatePayment = async (id, paymentData) => {
    const response = await apiClient.patch(`/payment/${id}`, paymentData);
    return response.data;
}

export const deletePayment = async (id) => {
    const response = await apiClient.delete(`/payment/${id}`);
    return response.data;
}

export const getPaymentList = async () => {
    const response = await apiClient.get('/payment');
    return response.data;
}

export default {
    getPayment,
    createPayment,
    updatePayment,
    deletePayment,
    getPaymentList,
    apiClient
}