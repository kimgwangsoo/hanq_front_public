/**
 * 로컬 스토리지에 데이터 저장
 * @param {string} key - 저장할 키
 * @param {any} value - 저장할 값
 */
export function setItem(key, value) {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('로컬 스토리지 저장 실패:', error);
  }
}

/**
 * 로컬 스토리지에서 데이터 불러오기
 * @param {string} key - 불러올 키
 * @param {any} defaultValue - 기본값
 * @returns {any} 저장된 값 또는 기본값
 */
export function getItem(key, defaultValue = null) {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return defaultValue;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error('로컬 스토리지 불러오기 실패:', error);
    return defaultValue;
  }
}

/**
 * 로컬 스토리지에서 데이터 삭제
 * @param {string} key - 삭제할 키
 */
export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('로컬 스토리지 삭제 실패:', error);
  }
}

/**
 * 로컬 스토리지 모두 비우기
 */
export function clearAll() {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('로컬 스토리지 초기화 실패:', error);
  }
}

/**
 * 세션 스토리지에 데이터 저장
 * @param {string} key - 저장할 키
 * @param {any} value - 저장할 값
 */
export function setSessionItem(key, value) {
  try {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('세션 스토리지 저장 실패:', error);
  }
}

/**
 * 세션 스토리지에서 데이터 불러오기
 * @param {string} key - 불러올 키
 * @param {any} defaultValue - 기본값
 * @returns {any} 저장된 값 또는 기본값
 */
export function getSessionItem(key, defaultValue = null) {
  try {
    const serializedValue = sessionStorage.getItem(key);
    if (serializedValue === null) {
      return defaultValue;
    }
    return JSON.parse(serializedValue);
  } catch (error) {
    console.error('세션 스토리지 불러오기 실패:', error);
    return defaultValue;
  }
}

export default {
  setItem,
  getItem,
  removeItem,
  clearAll,
  setSessionItem,
  getSessionItem
}; 