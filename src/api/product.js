import axios from 'axios';


// API 클라이언트 인스턴스 생성
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

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

export const getProducts = async (params) => {
  const response = await apiClient.get('/product', { params });
  return response.data;
}

export const getProductOptions = async (params) => {
  const response = await apiClient.get('/product/options', { params });
  return response.data;
}

export const getColorInfo = async (params) => {
  const response = await apiClient.get('/product/color-info', { params });
  return response.data;
}

// 제품 상세 조회
export const getProduct = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
}

// 제품 수정
export const updateProduct = async (id, productData) => {
  const response = await apiClient.put(`/products/${id}`, productData);
  return response.data;
}

// 제품 삭제
export const deleteProduct = async (id) => {
  const response = await apiClient.delete(`/products/${id}`);
  return response.data;
}

// 재고 확인
export const checkStock = async (productId, params) => {
  const response = await apiClient.get(`/products/${productId}/stock`, { params });
  return response.data;
}

// 재고 업데이트
export const updateStock = async (productId, stockData) => {
  const response = await apiClient.patch(`/products/${productId}/stock`, stockData);
  return response.data;
}

export const getProductImageUrl = (pcode) => {
  try {
    // 정적 이미지 경로 사용
    return `/img/products/p${pcode}.jpg`;
  } catch (error) {
    console.error('이미지 URL 생성 오류:', error);
    return '';
  }
}

export default {
  getProducts,
  
}; 