/**
 * 날짜 형식 변환 (YYYY-MM-DD)
 * @param {Date|string} date - 변환할 날짜
 * @returns {string} 포맷된 날짜 문자열
 */
export function formatDate(date) {
  if (!date) return '';
  
  // 숫자 형식의 날짜 문자열 처리 (예: '20240101')
  if (typeof date === 'string') {
    // 공백 제거
    date = date.replace(/\s/g, '');
    
    // 이미 yyyy-MM-dd 형식이면 그대로 반환
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }
    
    // yyyyMMdd 형식이면 변환
    if (/^\d{8}$/.test(date)) {
      return date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    }
  }
  
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (e) {
    console.error('날짜 변환 오류:', e);
    return '';
  }
}

/**
 * 한국어 날짜 형식 변환 (YYYY년 MM월 DD일)
 * @param {Date|string} date - 변환할 날짜
 * @returns {string} 포맷된 한국어 날짜 문자열
 */
export function formatKoreanDate(date) {
  if (!date) return '';
  
  const d = new Date(date);
  return d.toLocaleDateString('ko-KR');
}

/**
 * 날짜 및 시간 형식 변환 (YYYY-MM-DD HH:MM)
 * @param {Date|string} date - 변환할 날짜
 * @returns {string} 포맷된 날짜 및 시간 문자열
 */
export function formatDateTime(date) {
  if (!date) return '';
  
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * 시간 형식 변환 (HH:MM)
 * @param {string} time - 변환할 시간
 * @returns {string} 포맷된 시간 문자열
 */
export function formatTime(time) {
  if (!time) return '';
  return time;
}

/**
 * 가격 형식 변환 (천 단위 구분)
 * @param {number} price - 변환할 가격
 * @returns {string} 포맷된 가격 문자열
 */
export function formatPrice(price) {
  if (price === null || price === undefined) return '0';
  return new Intl.NumberFormat('ko-KR').format(price);
}

/**
 * 통화 형식 변환 (원화)
 * @param {number} amount - 변환할 금액
 * @returns {string} 포맷된 통화 문자열
 */
export function formatCurrency(amount) {
  if (amount === null || amount === undefined) return '₩0';
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(amount);
}

/**
 * 전화번호 형식 변환 (XXX-XXXX-XXXX)
 * @param {string} phoneNumber - 변환할 전화번호
 * @returns {string} 포맷된 전화번호 문자열
 */
export function formatPhoneNumber(phoneNumber) {
  if (!phoneNumber) return '';
  
  // 숫자만 추출
  const numbers = phoneNumber.replace(/[^0-9]/g, '');
  
  if (numbers.length === 11) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  } else if (numbers.length === 10) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
  }
  
  return phoneNumber;
}

/**
 * 계좌번호 마스킹 처리
 * @param {string} accountNumber - 계좌번호
 * @returns {string} 마스킹된 계좌번호
 */
export function maskAccountNumber(accountNumber) {
  if (!accountNumber) return '';
  const length = accountNumber.length;
  if (length <= 4) return accountNumber;
  return accountNumber.substring(0, 3) + '*'.repeat(length - 6) + accountNumber.substring(length - 3);
}

/**
 * 주소 형식 변환 (우편번호 추가)
 * @param {object} address - 주소 객체
 * @returns {string} 포맷된 주소 문자열
 */
export function formatAddress(address) {
  if (!address) return '';
  
  const { zipCode, address1, address2 } = address;
  
  if (zipCode) {
    return `(${zipCode}) ${address1} ${address2 || ''}`.trim();
  }
  
  return `${address1} ${address2 || ''}`.trim();
}

/**
 * 파일 크기 형식 변환
 * @param {number} bytes - 바이트 크기
 * @returns {string} 포맷된 파일 크기
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 상태 텍스트 변환
 * @param {string} status - 상태 코드
 * @param {string} type - 상태 타입 (order, payment, client 등)
 * @returns {string} 한국어 상태 텍스트
 */
export function formatStatusText(status, type = 'default') {
  const statusMaps = {
    order: {
      pending: '대기',
      processing: '처리중',
      shipped: '배송중',
      delivered: '배송완료',
      cancelled: '취소'
    },
    payment: {
      success: '성공',
      failed: '실패',
      pending: '대기',
      cancelled: '취소'
    },
    client: {
      active: '활성',
      inactive: '비활성'
    },
    rent: {
      paid: '납부완료',
      unpaid: '미납',
      overdue: '연체'
    },
    default: {
      active: '활성',
      inactive: '비활성',
      pending: '대기',
      completed: '완료'
    }
  };
  
  const statusMap = statusMaps[type] || statusMaps.default;
  return statusMap[status] || status;
}

/**
 * 생년월일로부터 나이 계산
 * @param {string} birthDate - 생년월일 (YYYY-MM-DD 또는 YYYYMMDD 형식)
 * @returns {number} 계산된 나이
 */
export function calculateAge(birthDate) {
  if (!birthDate) return 0;
  
  // 날짜 형식 정규화
  let formattedBirthDate = birthDate;
  
  // 숫자만 있는 경우 (YYYYMMDD) 형식으로 변환
  if (/^\d{8}$/.test(birthDate)) {
    formattedBirthDate = birthDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
  }
  
  // 하이픈이 없는 경우 추가
  if (birthDate.length === 8 && !birthDate.includes('-')) {
    formattedBirthDate = `${birthDate.substring(0, 4)}-${birthDate.substring(4, 6)}-${birthDate.substring(6, 8)}`;
  }
  
  try {
    const birthDateObj = new Date(formattedBirthDate);
    if (isNaN(birthDateObj.getTime())) return 0;
    
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    
    // 생일이 아직 지나지 않은 경우 1살 빼기
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    
    return age;
  } catch (e) {
    console.error('나이 계산 오류:', e);
    return 0;
  }
}

export default {
  date: formatDate,
  koreanDate: formatKoreanDate,
  dateTime: formatDateTime,
  time: formatTime,
  price: formatPrice,
  currency: formatCurrency,
  phoneNumber: formatPhoneNumber,
  maskAccountNumber,
  address: formatAddress,
  fileSize: formatFileSize,
  statusText: formatStatusText,
  calculateAge
}; 