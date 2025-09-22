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
 * 통합 검색
 * @param {object} params - 검색 조건
 * @returns {Promise} API 응답
 */
export function searchIntegrated(params = {}) {
  return apiClient.get('/lookup/search', { params });
}

/**
 * 고급 검색
 * @param {object} params - 고급 검색 조건
 * @returns {Promise} API 응답
 */
export function advancedSearch(params = {}) {
  return apiClient.post('/lookup/advanced-search', params);
}

/**
 * 즐겨찾기 목록 조회
 * @returns {Promise} API 응답
 */
export function getFavoritesList() {
  return apiClient.get('/lookup/favorites');
}

/**
 * 즐겨찾기 저장
 * @param {object} data - 즐겨찾기 데이터
 * @returns {Promise} API 응답
 */
export function saveFavorite(data) {
  return apiClient.post('/lookup/favorites', data);
}

/**
 * 즐겨찾기 수정
 * @param {number} id - 즐겨찾기 ID
 * @param {object} data - 수정할 데이터
 * @returns {Promise} API 응답
 */
export function updateFavorite(id, data) {
  return apiClient.put(`/lookup/favorites/${id}`, data);
}

/**
 * 즐겨찾기 삭제
 * @param {number} id - 즐겨찾기 ID
 * @returns {Promise} API 응답
 */
export function deleteFavorite(id) {
  return apiClient.delete(`/lookup/favorites/${id}`);
}

/**
 * 검색 결과 내보내기
 * @param {object} params - 내보내기 조건
 * @returns {Promise} API 응답
 */
export function exportSearchResults(params = {}) {
  return apiClient.get('/lookup/export', { 
    params,
    responseType: 'blob'
  });
}

/**
 * 검색 히스토리 조회
 * @returns {Promise} API 응답
 */
export function getSearchHistory() {
  return apiClient.get('/lookup/history');
}

/**
 * 검색 히스토리 삭제
 * @param {number} id - 히스토리 ID
 * @returns {Promise} API 응답
 */
export function deleteSearchHistory(id) {
  return apiClient.delete(`/lookup/history/${id}`);
}

export async function getLookupData(limit) {
  try {
    const response = await apiClient.get(`/recipient/lookup-all?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('조회 오류:', error);
    throw error;
  }
}

export default {
  searchIntegrated,
  advancedSearch,
  getFavoritesList,
  saveFavorite,
  updateFavorite,
  deleteFavorite,
  exportSearchResults,
  getSearchHistory,
  deleteSearchHistory
}; 