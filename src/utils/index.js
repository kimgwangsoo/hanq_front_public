import format from './format';
import validation from './validation';
import storage from './storage';

/**
 * 지정된 시간만큼 대기하는 Promise 함수
 * @param {number} ms - 대기 시간 (밀리초)
 * @returns {Promise} 대기 Promise
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 객체의 깊은 복사본을 생성
 * @param {object} obj - 복사할 객체
 * @returns {object} 복사된 객체
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 객체에서 빈 값(null, undefined, '')을 제거
 * @param {object} obj - 처리할 객체
 * @returns {object} 빈 값이 제거된 객체
 */
export function removeEmptyValues(obj) {
  const result = {};
  
  for (const key in obj) {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      result[key] = obj[key];
    }
  }
  
  return result;
}

/**
 * 에러 메시지 생성
 * @param {Error} error - 에러 객체
 * @returns {string} 포맷된 에러 메시지
 */
export function formatErrorMessage(error) {
  if (!error) return '알 수 없는 오류가 발생했습니다.';
  
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  
  return error.message || '알 수 없는 오류가 발생했습니다.';
}

export default {
  format,
  validation,
  storage,
  sleep,
  deepClone,
  removeEmptyValues,
  formatErrorMessage
}; 