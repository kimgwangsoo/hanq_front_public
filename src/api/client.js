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

/**
 * 수급자 목록 조회
 * @param {Object} params - 조회 파라미터 (페이지, 검색어 등)
 * @returns {Promise} API 응답
 */
export const getClients = async (params = {}) => {
  try {
    const response = await apiClient.get('/recipient', { params });
    return response.data;
  } catch (error) {
    console.error('수급자 목록 조회 오류:', error);
    throw error;
  }
};

/**
 * 수급자 상세 정보 조회
 * @param {string|number} id - 수급자 ID
 * @returns {Promise} API 응답
 */
export const getClientById = async (id) => {
  try {
    const response = await apiClient.get(`/recipient/${id}`);
    return response.data;
  } catch (error) {
    console.error(`수급자 정보 조회 오류 (ID: ${id}):`, error);
    throw error;
  }
};

export const getClientByNumber = async (number) => {
  try {
    const response = await apiClient.get(`/recipient/number/${number}`);
    return response.data;
  } catch (error) {
    console.error(`수급자 정보 조회 오류 (번호: ${number}):`, error);
    throw error;
  }
};

/**
 * 수급자 욕구사정기록 조회
 * @param {string|number} id - 수급자 ID
 * @returns {Promise} API 응답
 */
export const getClientNeedData = async (id) => {
  try {
    const response = await apiClient.get(`/clients/${id}/need`);
    return response.data;
  } catch (error) {
    console.error(`욕구사정기록 조회 오류 (ID: ${id}):`, error);
    throw error;
  }
};

/**
 * 새 수급자 등록
 * @param {Object} clientData - 등록할 수급자 데이터
 * @returns {Promise} API 응답
 */
export const createClient = async (clientData) => {
  try {
    console.log("clientData", clientData)
    const response = await apiClient.post('/recipient', clientData);
    console.log("response", response)
    return response.data;
  } catch (error) {
    console.error('수급자 등록 오류:', error);
    throw error;
  }
};

/**
 * 수급자 정보 수정
 * @param {string|number} id - 수급자 ID
 * @param {Object} clientData - 수정할 수급자 데이터
 * @returns {Promise} API 응답
 */
export const updateClient = async (id, clientData) => {
  try {
    const response = await apiClient.put(`/recipient/${id}`, clientData);
    return response.data;
  } catch (error) {
    console.error(`수급자 정보 수정 오류 (ID: ${id}):`, error);
    throw error;
  }
};

/**
 * 수급자 삭제
 * @param {string|number} id - 수급자 ID
 * @returns {Promise} API 응답
 */
export const deleteClient = async (id) => {
  try {
    const response = await apiClient.delete(`/recipient/${id}`);
    return response.data;
  } catch (error) {
    console.error(`수급자 삭제 오류 (ID: ${id}):`, error);
    throw error;
  }
};

/**
 * 적용구간 만료 예정 수급자 목록 조회
 * @param {string} year - 년도
 * @param {string} month - 월
 * @returns {Promise} API 응답
 */
export const getExpiringSectionClients = async (year, month) => {
  try {
    const response = await apiClient.get(`/recipient/expiring-sections`, {
      params: { year, month }
    });
    return response.data;
  } catch (error) {
    console.error(`적용구간 만료 예정 수급자 목록 조회 오류:`, error);
    throw error;
  }
};

/**
 * 욕구사정기록 저장
 * @param {string|number} clientId - 수급자 ID
 * @param {Object} needData - 욕구사정기록 데이터
 * @returns {Promise} API 응답
 */
export const saveClientNeedData = async (clientId, needData) => {
  try {
    const response = await apiClient.post(`/recipient/${clientId}/need`, needData);
    return response.data;
  } catch (error) {
    console.error(`욕구사정기록 저장 오류 (ID: ${clientId}):`, error);
    throw error;
  }
};

/**
 * 욕구사정기록 수정
 * @param {string|number} clientId - 수급자 ID
 * @param {string|number} needId - 욕구사정기록 ID
 * @param {Object} needData - 욕구사정기록 데이터
 * @returns {Promise} API 응답
 */
export const updateClientNeedData = async (clientId, needId, needData) => {
  try {
    const response = await apiClient.put(`/recipient/${clientId}/need/${needId}`, needData);
    return response.data;
  } catch (error) {
    console.error(`욕구사정기록 수정 오류 (ID: ${clientId}):`, error);
    throw error;
  }
};

/**
 * 모든 수급자 욕구사정기록 목록 조회
 * @param {Object} params - 검색 파라미터 (검색어, 페이지 등)
 * @returns {Promise} API 응답
 */
export const getAllClientNeedRecords = async (params = {}) => {
  try {
    const response = await apiClient.get('/clients/need-records', { params });
    return response.data;
  } catch (error) {
    console.error('욕구사정기록 목록 조회 오류:', error);
    throw error;
  }
};

/**
 * 수급자 욕구사정기록 조회
 * @param {string|number} id - 수급자 ID
 * @returns {Promise} API 응답
 */
export const findOneClientNeed = async (id) => {
  try {
    const response = await apiClient.get(`/recipient/${id}/need`);
    return response.data;
  } catch (error) {
    console.error(`욕구사정기록 조회 오류 (ID: ${id}):`, error);
    throw error;
  }
};

/**
 * 수급자 욕구사정기록 목록 조회
 * @param {string|number} id - 수급자 ID
 * @returns {Promise} API 응답
 */
export const findAllClientNeed = async (id) => {
  try {
    const response = await apiClient.get(`/recipient/${id}/need/all`);
    return response.data;
  } catch (error) {
    console.error(`욕구사정기록 목록 조회 오류 (ID: ${id}):`, error);
    throw error;
  }
};

/**
 * 욕구사정기록 ID로 조회
 * @param {string|number} id - 수급자 ID
 * @param {string|number} needId - 욕구사정기록 ID
 * @returns {Promise} API 응답
 */
export const findOneNeed = async (id, needId) => {
  try {
    const response = await apiClient.get(`/recipient/${id}/need/${needId}`);
    return response.data;
  } catch (error) {
    console.error(`욕구사정기록 조회 오류 (ID: ${id}):`, error);
    throw error;
  }
};

/**
 * 욕구사정기록 삭제
 * @param {string|number} id - 욕구사정기록 ID
 * @returns {Promise} API 응답
 */
export const deleteNeed = async (id) => {
  try {
    const response = await apiClient.delete(`/recipient/${id}/need`);
    return response.data;
  } catch (error) {
    console.error(`욕구사정기록 삭제 오류 (ID: ${id}):`, error);
    throw error;
  }
};

/**
 * 최근 공단조회내역 목록 조회
 * @returns {Promise} API 응답
 */
export const getLookupAll = async (limit) => {
  try {
    const response = await apiClient.get(`/recipient/lookup-all?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('최근 공단조회내역 목록 조회 오류:', error);
    throw error;
  }
};

export const getClientSign = async (id) => {
  try {
    const response = await apiClient.get(`/recipient/${id}/sign`);
    return response.data;
  } catch (error) {
    console.error(`수급자 서명 조회 오류 (ID: ${id}):`, error);
    throw error;
  }
};

export const updateClientSign = async (id, sign) => {
  try {
    const response = await apiClient.put(`/recipient/${id}/sign`, { sign });
    return response.data;
  } catch (error) {
    console.error(`수급자 서명 수정 오류 (ID: ${id}):`, error);
    throw error;
  }
};

export const deleteClientSign = async (id) => {
  try {
    const response = await apiClient.delete(`/recipient/${id}/sign`);
    return response.data;
  } catch (error) {
    console.error(`수급자 서명 삭제 오류 (ID: ${id}):`, error);
    throw error;
  }
};

/**
 * 수급자 엑셀 템플릿 다운로드
 * @param {string} type - 템플릿 유형 (basic, history, nonbenefit)
 * @returns {Promise} API 응답
 */
export const downloadClientExcelTemplate = async (type = 'basic') => {
  try {
    // 응답 타입을 blob으로 설정하여 파일 다운로드
    const response = await apiClient.get(`/clients/excel-template/${type}`, {
      responseType: 'blob'
    });
    
    // 파일 다운로드 처리
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    
    // 파일명 설정 (응답 헤더에서 파일명 추출 또는 기본값 사용)
    const contentDisposition = response.headers['content-disposition'];
    let filename = '수급자_엑셀_템플릿.xlsx';
    
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
    
    return { success: true, message: '템플릿 다운로드 완료' };
  } catch (error) {
    console.error('엑셀 템플릿 다운로드 오류:', error);
    throw error;
  }
};

export default {
  getClients,
  getClientById,
  getClientNeedData,
  createClient,
  updateClient,
  deleteClient,
  getExpiringSectionClients,
  saveClientNeedData,
  getAllClientNeedRecords,
  downloadClientExcelTemplate,
  deleteNeed,
  apiClient
}; 