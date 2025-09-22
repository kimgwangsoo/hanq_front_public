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


/**
 * 임대료 목록 조회
 * @param {object} params - 검색 조건
 * @returns {Promise} API 응답
 */
export const getRentList = async (params = {}) => {
  const response = await apiClient.get('/rent', { params });
  return response.data;
}

/**
 * 임대료 상세 조회
 * @param {number} id - 임대료 ID
 * @returns {Promise} API 응답
 */
export const getRentDetail = async (id) => {
  const response = await apiClient.get(`/rent/${id}`);
  return response.data;
}

/**
 * 임대료 등록
 * @param {object} data - 임대료 데이터
 * @returns {Promise} API 응답
 */
export const createRent = async (data) => {
  return apiClient.post('/rent', data);
}

/**
 * 임대료 수정
 * @param {number} id - 임대료 ID
 * @param {object} data - 수정할 데이터
 * @returns {Promise} API 응답
 */
export const updateRent = async (id, data) => {
  return apiClient.put(`/rent/${id}`, data);
}

/**
 * 임대료 삭제
 * @param {number} id - 임대료 ID
 * @returns {Promise} API 응답
 */
export const deleteRent = async (id) => {
  return apiClient.delete(`/rent/${id}`);
}

/**
 * 임대료 일괄 삭제
 * @param {Array} ids - 임대료 ID 배열
 * @returns {Promise} API 응답
 */
export const deleteBulkRent = async (ids) => {
  return apiClient.delete('/rent/bulk', { data: { ids } });
}

export const createDurability = async (data) => {
  const response = await apiClient.post('/rent/durability', data);
  return response.data;
}

export const getDurabilityList = async () => {
  const response = await apiClient.get('/rent/durability');
  return response.data;
}

export const getRentBcodeInfo = async (pcode,bcode) => {
  const response = await apiClient.get(`/rent/bcode-info/${pcode}/${bcode}`);
  return response.data;
}

export const getClientRentDataByClientId = async (clientId) => {
  const response = await apiClient.get(`/rent/client-rent-data/${clientId}`);
  return response.data;
}

export const getLookupOneMongoDB = async (name,number) => {
  const response = await apiClient.get(`/recipient/lookup-mongodb/${name}/${number}`);
  return response.data;
}

export const updateRentStatus = async (id, data) => {
  const response = await apiClient.put(`/rent/${id}/status`, data);
  return response.data;
}



export default {
  getRentList,
  getRentDetail,
  createRent,
  updateRent,
  deleteRent,
  deleteBulkRent,
  getLookupOneMongoDB
}; 