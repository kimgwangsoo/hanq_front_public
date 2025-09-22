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

export const getFindMonthBuyPrice = async (startDate, endDate) => {
  try {
    const response = await apiClient.get(`/dashboard/buy?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  } catch (error) {
    console.error('월별 판매 금액 조회 오류:', error);
    throw error;
  }
};

export const getFindMonthRentalPrice = async (startDate, endDate) => {
  try {
    const response = await apiClient.get(`/dashboard/rental?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  } catch (error) {
    console.error('월별 대여 금액 조회 오류:', error);
    throw error;
  }
};

export const getFindMonthAllPrice = async (startDate, endDate) => {
  try {
    const response = await apiClient.get(`/dashboard/total?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  } catch (error) {
    console.error('월별 합계 금액 조회 오류:', error);
    throw error;
  }
};

export const getFindMonthDoughnut = async (year, month) => {
  try {
    const response = await apiClient.get(`/dashboard/doughnut?year=${year}&month=${month}`);
    return response.data;
  } catch (error) {
    console.error('월별 품목 금액 조회 오류:', error);
    throw error;
  }
};

export const getFindMonthManagerContract = async (year, month) => {
  try {
    const response = await apiClient.get(`/dashboard/manager?year=${year}&month=${month}`);
    return response.data;
  } catch (error) {
    console.error('월별 담당자 조회 오류:', error);
    throw error;
  }
};