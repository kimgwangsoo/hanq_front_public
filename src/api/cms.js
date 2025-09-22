import api from './index';

/**
 * CMS 결제 목록 조회
 * @param {object} params - 검색 조건
 * @returns {Promise} API 응답
 */
export function getCMSList(params = {}) {
  return api.get('/cms', { params });
}

/**
 * CMS 결제 상세 조회
 * @param {number} id - CMS 결제 ID
 * @returns {Promise} API 응답
 */
export function getCMSDetail(id) {
  return api.get(`/cms/${id}`);
}

/**
 * CMS 결제 등록
 * @param {object} data - CMS 결제 데이터
 * @returns {Promise} API 응답
 */
export function createCMS(data) {
  return api.post('/cms', data);
}

/**
 * CMS 결제 수정
 * @param {number} id - CMS 결제 ID
 * @param {object} data - 수정할 데이터
 * @returns {Promise} API 응답
 */
export function updateCMS(id, data) {
  return api.put(`/cms/${id}`, data);
}

/**
 * CMS 결제 삭제
 * @param {number} id - CMS 결제 ID
 * @returns {Promise} API 응답
 */
export function deleteCMS(id) {
  return api.delete(`/cms/${id}`);
}

/**
 * CMS 결제 재처리
 * @param {number} id - CMS 결제 ID
 * @returns {Promise} API 응답
 */
export function retryCMS(id) {
  return api.post(`/cms/${id}/retry`);
}

/**
 * CMS 일괄 처리
 * @param {Array} ids - CMS 결제 ID 배열
 * @returns {Promise} API 응답
 */
export function processBulkCMS(ids) {
  return api.post('/cms/bulk-process', { ids });
}

/**
 * 실패건 재처리
 * @returns {Promise} API 응답
 */
export function retryFailedCMS() {
  return api.post('/cms/retry-failed');
}

export default {
  getCMSList,
  getCMSDetail,
  createCMS,
  updateCMS,
  deleteCMS,
  retryCMS,
  processBulkCMS,
  retryFailedCMS
}; 