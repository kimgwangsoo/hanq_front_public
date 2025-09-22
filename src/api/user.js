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

export const getUserList = async (query) => {
  try {
    const response = await apiClient.get(`/user?page=${query.page}&perPage=${query.perPage}`);
    return response.data;
  } catch (error) {
    console.error('사용자 목록 조회 오류:', error);
    throw error;
  }
}


/**
 * 사용자 옵션 조회
 * @returns {Promise<Object>} 사용자 옵션 데이터
 */
export const getUserOption = async () => {
  try {
    const response = await apiClient.get(`/user/option`);
    console.log(response.data, "response.data");
    return response.data;
  } catch (error) {
    console.error('사용자 옵션 조회 오류:', error);
    throw error;
  }
}

/**
 * 사용자 옵션 업데이트
 * @param {string} option - 업데이트할 옵션 이름
 * @param {boolean} value - 업데이트할 옵션 값
 * @returns {Promise<Object>} 업데이트된 사용자 옵션 데이터
 */
export const updateUserOption = async (value) => {
  try {
    const response = await apiClient.put(`/user/option`, value);
    return response.data;
  } catch (error) {
    console.error('사용자 옵션 업데이트 오류:', error);
    throw error;
  }
}

/**
 * 담당자 추가
 * @param {Object} userData - 추가할 담당자 정보
 * @returns {Promise<Object>} 추가된 담당자 정보
 */
export const addUser = async (userData) => {
  try {
    const response = await apiClient.post('/user', userData);
    return response.data;
  } catch (error) {
    console.error('담당자 추가 API 오류:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || '서버 오류가 발생했습니다' 
    };
  }
}

/**
 * 담당자 수정
 * @param {Object} userData - 수정할 담당자 정보
 * @returns {Promise<Object>} 수정된 담당자 정보
 */
export const updateUser = async (userData) => {
  try {
    const response = await apiClient.put('/user', userData);
    return response.data;
  } catch (error) {
    console.error('담당자 수정 API 오류:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || '서버 오류가 발생했습니다' 
    };
  }
}

/**
 * 관리자인지 확인
 * @param {number} userId - 확인할 담당자 ID 또는 담당자 객체
 * @returns {Promise<Object>} 확인된 담당자 정보
 */
export const checkAdmin = async (userId) => {
  try {
    const response = await apiClient.get(`/user/admin/${userId}`);
    return response.data;
  } catch (error) {
    console.error('관리자인지 확인 API 오류:', error);
    return { 
      success: false, 
      message: error.response?.data?.message || '서버 오류가 발생했습니다' 
    };
  }
}