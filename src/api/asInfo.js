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

export const createAsInfo = async (createAsInfoServiceDto) => {
  const response = await apiClient.post('/service/as-info', createAsInfoServiceDto);
  return response.data;
};

export const findAsInfo = async (orderId) => {
  const response = await apiClient.get(`/service/as-info/${orderId}`);
  return response.data;
};

export const updateAsInfo = async (id, updateAsInfoServiceDto) => {
  const response = await apiClient.put(`/service/as-info/${id}`, updateAsInfoServiceDto);
  return response.data;
};

export const cancelAsInfo = async (id) => {
  const response = await apiClient.put(`/service/as-info/${id}/cancel`);
  return response.data;
};

export const deleteAsInfo = async (id) => {
  const response = await apiClient.delete(`/service/as-info/${id}`);
  return response.data;
};


export default {
    createAsInfo,
    findAsInfo,
    updateAsInfo,
    cancelAsInfo,
    deleteAsInfo
};
