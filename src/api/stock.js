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


// 재고 조회
export const getStock = async (productId) => {
  const response = await apiClient.get(`/stock/${productId}`);
  return response.data;
}

export const getStockCount = async (params) => {
  const response = await apiClient.get('/stock/count', { params });
  return response.data;
}

// 입고 등록
export const createStock = async (productData) => {
  const response = await apiClient.post('/stock', productData);
  return response.data;
}


export const updateStock = async (stockId, stockData) => {
  const response = await apiClient.patch(`/stock/${stockId}`, stockData);
  return response.data;
}

export const deleteStock = async (stockId) => {
  const response = await apiClient.delete(`/stock/${stockId}`);
  return response.data;
}

export default {
  createStock,
  getStock,
  updateStock,
  deleteStock,
  getStockCount,
}