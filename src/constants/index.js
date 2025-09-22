import orderStatus from './orderStatus';
import dateRanges from './dateRanges';

/**
 * 페이지 크기 옵션
 */
export const PAGE_SIZE_OPTIONS = [
  { value: 10, label: '10개씩' },
  { value: 20, label: '20개씩' },
  { value: 50, label: '50개씩' },
  { value: 100, label: '100개씩' }
];

/**
 * API 응답 코드
 */
export const API_RESPONSE_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

/**
 * 로컬 스토리지 키
 */
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  USER_ROLE: 'userRole',
  LAST_VISITED_PAGE: 'lastVisitedPage',
  THEME: 'theme'
};

/**
 * 사용자 역할
 */
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user'
};

/**
 * 결제 방법
 */
export const PAYMENT_METHODS = {
  CARD: 'card',
  BANK: 'bank',
  CASH: 'cash'
};

/**
 * 결제 방법 텍스트
 */
export const PAYMENT_METHOD_TEXT = {
  [PAYMENT_METHODS.CARD]: '카드',
  [PAYMENT_METHODS.BANK]: '계좌이체',
  [PAYMENT_METHODS.CASH]: '현금'
};

export default {
  orderStatus,
  dateRanges,
  PAGE_SIZE_OPTIONS,
  API_RESPONSE_CODE,
  STORAGE_KEYS,
  USER_ROLES,
  PAYMENT_METHODS,
  PAYMENT_METHOD_TEXT
}; 