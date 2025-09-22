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
export const saveSmsData = async (data) => {
  const response = await apiClient.post('/common/order/sms', data);
  return response.data;
};

export const sendSms = async (data) => {
  const response = await apiClient.post('/common/send-sms', data);
  return response.data;
};

/**
 * 카카오 URL을 가져오는 함수
 * @param {string} companynumber - 회사 번호
 * @param {string} popbill_id - 팝빌 ID
 * @returns {Promise<Object>} - 카카오 URL 정보
 */
export const sendkakao_get_url = async (companynumber, popbill_id) => {
  const response = await apiClient.post('http://13.209.151.51:801/SendKakaoGetUrl', {
    companynumber: companynumber,
    popbillid: popbill_id
  });
  
  if (response.data) {
    return response.data;
  }
};


export const downloadExcelTemplate = async (filename) => {
  const response = await apiClient.get(`/common/download-excel-template/${filename}`);
  return response.data;
};
