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
 * 주문 관련 API 함수들
 */

/**
 * 주문 목록 조회
 * @param {Object} params - 조회 파라미터 (페이지, 검색어 등)
 * @returns {Promise} API 응답
 */
export const getOrders = async (params = {}) => {
  try {
    const response = await apiClient.get('/order', { params });
    return response.data;
  } catch (error) {
    console.error('주문 목록 조회 오류:', error);
    throw error;
  }
};

/**
 * 주문 상세 조회
 * @param {string|number} id - 주문 ID
 * @returns {Promise} API 응답
 */
export const getOrder = async (id) => {
  try {
    const response = await apiClient.get(`/order/${id}`);
    return response.data;
  } catch (error) {
    console.error(`주문 상세 조회 오류 (ID: ${id}):`, error);
    throw error;
  }
};

/**
 * 주문 수정 이력 조회
 * @param {string|number} id - 주문 ID
 * @returns {Promise} API 응답
 */
export const getOrderHistory = async (id) => {
  try {
    const response = await apiClient.get(`/order/history/${id}`);
    return response.data;
  } catch (error) {
    console.error(`주문 수정 이력 조회 오류 (ID: ${id}):`, error);
    throw error;
  }
};

export const getOrdersByIds = async (ids) => {
  try {
    const response = await apiClient.get(`/order/ids`, { params: { ids } });
    return response.data;
  } catch (error) {
    console.error(`주문 상세 조회 오류 (ID: ${ids}):`, error);
    throw error;
  }
};

/**
 * 주문 생성
 * @param {Object} orderData - 생성할 주문 데이터
 * @returns {Promise} API 응답
 */
export const createOrder = async (orderData) => {
  try {
    const response = await apiClient.post('/order', orderData);
    return response.data;
  } catch (error) {
    console.error('주문 생성 오류:', error);
    throw error;
  }
};

/**
 * 주문 수정
 * @param {string|number} id - 주문 ID
 * @param {Object} orderData - 수정할 주문 데이터
 * @returns {Promise} API 응답
 */
export const updateOrder = async (orderData) => {
  try {
    const response = await apiClient.patch(`/order/${orderData.id}`, orderData);
    return response.data;
  } catch (error) {
    console.error(`주문 수정 오류 (ID: ${orderData.id}):`, error);
    throw error;
  }
};

export const updateDeliveryStateOrder = async (orderData) => {
  try {
    const response = await apiClient.patch(`/order/delivery-state/${orderData.id}`, orderData);
    return response.data;
  } catch (error) {
    console.error(`주문 배송상태 수정 오류 (ID: ${orderData.id}):`, error);
    throw error;
  }
};

/**
 * 주문 일괄 수정
 * @param {Object} orderData - 수정할 주문 데이터
 * @returns {Promise} API 응답
 */
export const batchUpdateOrder = async (orderData) => {
  try {
    const response = await apiClient.patch(`/order/batch`, orderData);
    return response.data;
  } catch (error) {
    console.error(`주문 수정 오류 (ID: ${orderData.id}):`, error);
    throw error;
  }
};

/**
 * 주문 삭제
 * @param {string|number} id - 주문 ID
 * @returns {Promise} API 응답
 */
export const deleteOrder = async (id) => {
  try {
    const response = await apiClient.delete(`/order/${id}`);
    return response.data;
  } catch (error) {
    console.error(`주문 삭제 오류 (ID: ${id}):`, error);
    throw error;
  }
};

/**
 * 주문 상태 변경
 * @param {string|number} id - 주문 ID
 * @param {string} status - 변경할 상태
 * @returns {Promise} API 응답
 */
export const changeOrderStatus = async (id, status) => {
  try {
    const response = await apiClient.patch(`/orders/${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error(`주문 상태 변경 오류 (ID: ${id}):`, error);
    throw error;
  }
};

/**
 * 주문 엑셀 다운로드
 * @param {Object} params - 다운로드 파라미터
 * @returns {Promise} API 응답 (Blob)
 */
export const exportOrdersToExcel = async (params = {}) => {
  try {
    const response = await apiClient.get('/orders/export', {
      params,
      responseType: 'blob'
    });
    
    // 파일 다운로드 처리
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    
    // 파일명 설정
    const contentDisposition = response.headers['content-disposition'];
    let filename = '주문_목록.xlsx';
    
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1];
      }
    }
    
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return { success: true, message: '엑셀 다운로드 완료' };
  } catch (error) {
    console.error('주문 엑셀 다운로드 오류:', error);
    throw error;
  }
};

export const getOrderComment = async (orderId) => {
  try {
    const response = await apiClient.get(`/order/comment/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`주문 메모 조회 오류 (ID: ${orderId}):`, error);
    throw error;
  }
};

// 주문 메모 생성
export const createOrderComment = async (orderData) => { 
  console.log( 'orderData',orderData);
  try {
    const response = await apiClient.post(`/order/comment`, orderData);
    return response.data;
  } catch (error) {
    console.error(`주문 메모 생성 오류 (ID: ${orderData.orderId}):`, error);
    throw error;
  }
};

// 주문 메모 고정
export const fixOrderComment = async (commentId, fix) => {
  try {
    const response = await apiClient.patch(`/order/comment/fix/${commentId}`, { fix });
    return response.data;
  } catch (error) {
    console.error(`주문 메모 고정 오류 (ID: ${commentId}):`, error);
    throw error;
  }
};

export const deleteOrderComment = async (id) => {
  try {
    const response = await apiClient.delete(`/order/comment/${id}`);
    return response.data;
  } catch (error) {
    console.error(`주문 메모 삭제 오류 (ID: ${id}):`, error);
    throw error;
  }
};

export const confirmOrder = async (id, nextState) => {
  try {
    const response = await apiClient.patch(`/order/confirm/${id}`, { nextState });
    return response.data;
  } catch (error) {
    console.error(`주문 확정 오류 (ID: ${id}):`, error);
    throw error;
  }
};

export const saveSelectedDocumentImage = async (selectedPages) => {
  try {
    console.log(selectedPages);
    const response = await apiClient.post(`/common/save-selected-document-image`, selectedPages);
    return response.data;
  } catch (error) {
    console.error(`선택한 서류 이미지 저장 오류:`, error);
    throw error;
  }
};

export const getClientOrderDataByClientId = async (clientId) => {
  try {
    const response = await apiClient.get(`/order/client-order-data/${clientId}`);
    return response.data;
  } catch (error) {
    console.error(`수급자 주문서들 데이터 조회 오류 (ID: ${clientId}):`, error);
    throw error;
  }
};

export const getClientRentDataByClientId = async (clientId) => {
  try {
    const response = await apiClient.get(`/rent/client-rent-data/${clientId}`);
    return response.data;
  } catch (error) {
    console.error(`수급자 대여서들 데이터 조회 오류 (ID: ${clientId}):`, error);
    throw error;
  }
};

export const splitOrder = async (orderData) => {
  try {
    const response = await apiClient.post(`/order/split`, orderData);
    return response.data;
  } catch (error) {
    console.error(`주문서분리 오류 (ID: ${orderData.id}):`, error);
    throw error;
  }
};

export default {
  getOrders,
  getOrder,
  getOrdersByIds,
  getOrderHistory,
  createOrder,
  updateOrder,
  batchUpdateOrder,
  deleteOrder,
  changeOrderStatus,
  exportOrdersToExcel,
  getOrderComment,
  createOrderComment,
  deleteOrderComment,
  confirmOrder,
  fixOrderComment,
  apiClient
};