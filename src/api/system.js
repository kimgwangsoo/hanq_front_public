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
 * 회사 정보 조회 API
 * @returns {Promise<Object>} 회사 정보 데이터
 */
export const getCompanyInfo = async () => {
  const response = await apiClient.get('/company');
  return response.data;
};

/**
 * 담당자 목록 조회 API
 * @param {Object} params - 페이지네이션 파라미터 (page, perPage)
 * @returns {Promise<Object>} 담당자 목록 데이터
 */
export const getUserList = async (params = {}) => {
  const response = await apiClient.get('/user', { params });
  return response.data;
};

/**
 * 회사 정보 업데이트 API
 * @param {Object} companyData - 업데이트할 회사 정보
 * @returns {Promise<Object>} 업데이트된 회사 정보
 */
export const updateCompanyInfo = async (companyData) => {
  const response = await apiClient.patch('/company', companyData);
  return response.data;
};

/**
 * 담당자 추가 API
 * @param {Object} userData - 추가할 담당자 정보
 * @returns {Promise<Object>} 추가된 담당자 정보
 */
export const addUser = async (userData) => {
  const response = await apiClient.post('/user/add', userData);
  return response.data;
};

/**
 * 담당자 삭제 API
 * @param {number} userId - 삭제할 담당자 ID
 * @returns {Promise<Object>} 삭제 결과
 */
export const deleteUser = async (userId) => {
  const response = await apiClient.delete(`/user/${userId}`);
  return response.data;
};

/**
 * 회사 파일 업로드 API
 * @param {FormData} formData - 업로드할 파일 데이터
 * @returns {Promise<Object>} 업로드된 파일 정보
 */
export const uploadCompanyFile = async (formData) => {
  const response = await apiClient.post('/company/file', formData,{
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  });
  console.log(response);
  return response.data;
};

/**
 * 회사 파일 조회 API
 * @param {string} type - 조회할 파일 타입
 * @returns {Promise<Object>} 조회된 파일 정보
 */
export const getCompanyFile = async (type) => {
  const response = await apiClient.get(`/company/file/${type}`);
  return response.data;
};

/**
 * 업체 등록 API
 * @param {string} type - 등록할 업체 타입
 * @param {Object} data - 등록할 업체 정보
 * @returns {Promise<Object>} 등록된 업체 정보
 */
export const createSystemCompany = async (type, data) => {
  const response = await apiClient.post(`/company/${type}`, data);
  return response.data;
};

/**
 * 업체 삭제 API
 * @param {string} type - 삭제할 업체 타입
 * @param {number} id - 삭제할 업체 ID
 * @returns {Promise<Object>} 삭제된 업체 정보
 */
export const deleteSystemCompany = async (type, id) => {
  const response = await apiClient.delete(`/company/${type}/${id}`);
  return response.data;
};

/**
 * 업체 정보 조회 API
 * @param {string} type - 조회할 업체 타입
 * @param {number} id - 조회할 업체 ID
 * @returns {Promise<Object>} 조회된 업체 정보
 */
export const getSystemCompany = async (type, id) => {
  const response = await apiClient.get(`/company/${type}/${id}`);
  return response.data;
};

/**
 * 업체 목록 조회 API
 * @param {string} type - 조회할 업체 타입
 * @returns {Promise<Object>} 조회된 업체 목록
 */
export const getSystemCompanyList = async (type) => {
  const response = await apiClient.get(`/company/${type}`);
  return response.data;
};