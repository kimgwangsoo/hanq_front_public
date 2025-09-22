/**
 * API 모듈 인덱스
 * 
 * 모든 API 모듈을 한 곳에서 내보냅니다.
 * 이를 통해 API 호출을 일관되게 관리하고 가져올 수 있습니다.
 */

import * as clientApi from './client';
import * as authApi from './auth';
import * as orderApi from './order';
import * as lookupApi from './lookup';

export {
  clientApi,
  authApi,
  orderApi,
  lookupApi
};

/**
 * API 설정 초기화 함수
 * @param {Object} config - API 설정 객체
 * @param {string} config.baseURL - API 기본 URL
 * @param {string} config.token - 인증 토큰
 */
export const initializeApi = (config = {}) => {
  const { baseURL, token } = config;
  
  // 각 API 모듈의 설정 초기화
  if (baseURL) {
    // 기본 URL 설정
    if (clientApi.setBaseURL) clientApi.setBaseURL(baseURL);
    if (authApi.setBaseURL) authApi.setBaseURL(baseURL);
    if (orderApi.setBaseURL) orderApi.setBaseURL(baseURL);
    if (lookupApi.setBaseURL) lookupApi.setBaseURL(baseURL);
  }
  
  if (token) {
    // 토큰 설정
    if (clientApi.setToken) clientApi.setToken(token);
    if (authApi.setToken) authApi.setToken(token);
    if (orderApi.setToken) orderApi.setToken(token);
    if (lookupApi.setToken) lookupApi.setToken(token);
  }
};

export default {
  client: clientApi,
  auth: authApi,
  order: orderApi,
  lookup: lookupApi,
  initializeApi
}; 