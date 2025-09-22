/**
 * 이메일 형식 검증
 * @param {string} email - 검증할 이메일
 * @returns {boolean} 유효성 여부
 */
export function isValidEmail(email) {
  if (!email) return false;
  
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
}

/**
 * 비밀번호 강도 검증 (8자 이상, 영문/숫자/특수문자 조합)
 * @param {string} password - 검증할 비밀번호
 * @returns {boolean} 유효성 여부
 */
export function isStrongPassword(password) {
  if (!password || password.length < 8) return false;
  
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return hasLetter && hasNumber && hasSpecial;
}

/**
 * 핸드폰 번호 형식 검증
 * @param {string} phoneNumber - 검증할 핸드폰 번호
 * @returns {boolean} 유효성 여부
 */
export function isValidPhoneNumber(phoneNumber) {
  if (!phoneNumber) return false;
  
  // 숫자만 추출
  const numbers = phoneNumber.replace(/[^0-9]/g, '');
  
  // 핸드폰 번호는 10~11자리
  return numbers.length >= 10 && numbers.length <= 11;
}

/**
 * 사업자 등록번호 형식 검증
 * @param {string} businessNumber - 검증할 사업자 등록번호
 * @returns {boolean} 유효성 여부
 */
export function isValidBusinessNumber(businessNumber) {
  if (!businessNumber) return false;
  
  // 숫자만 추출
  const numbers = businessNumber.replace(/[^0-9]/g, '');
  
  // 사업자 등록번호는 10자리
  return numbers.length === 10;
}

/**
 * 빈 값 검증
 * @param {any} value - 검증할 값
 * @returns {boolean} 유효성 여부
 */
export function isRequired(value) {
  if (value === null || value === undefined) return false;
  
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  
  return true;
}

/**
 * 숫자 형식 검증
 * @param {any} value - 검증할 값
 * @returns {boolean} 유효성 여부
 */
export function isNumber(value) {
  if (value === null || value === undefined || value === '') return false;
  
  return !isNaN(Number(value));
}

export default {
  isValidEmail,
  isStrongPassword,
  isValidPhoneNumber,
  isValidBusinessNumber,
  isRequired,
  isNumber
}; 