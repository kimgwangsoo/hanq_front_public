/**
 * 날짜 범위 유형
 */
export const DATE_RANGE_TYPE = {
  TODAY: 'today',
  YESTERDAY: 'yesterday',
  THIS_WEEK: 'thisWeek',
  LAST_WEEK: 'lastWeek',
  THIS_MONTH: 'thisMonth',
  LAST_MONTH: 'lastMonth',
  ALL: 'all'
};

/**
 * 날짜 범위 텍스트
 */
export const DATE_RANGE_TEXT = {
  [DATE_RANGE_TYPE.TODAY]: '당일',
  [DATE_RANGE_TYPE.YESTERDAY]: '전일',
  [DATE_RANGE_TYPE.THIS_WEEK]: '당주',
  [DATE_RANGE_TYPE.LAST_WEEK]: '전주',
  [DATE_RANGE_TYPE.THIS_MONTH]: '당월',
  [DATE_RANGE_TYPE.LAST_MONTH]: '전월',
  [DATE_RANGE_TYPE.ALL]: '전체'
};

/**
 * 날짜 범위 계산 함수
 * @param {string} rangeType - 날짜 범위 유형
 * @returns {Object} { startDate, endDate }
 */
export function getDateRange(rangeType) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const day = today.getDay(); // 0: 일요일, 1: 월요일, ... 6: 토요일
  
  let startDate, endDate;
  
  switch (rangeType) {
    case DATE_RANGE_TYPE.TODAY:
      startDate = new Date(year, month, date);
      endDate = new Date(year, month, date, 23, 59, 59);
      break;
    case DATE_RANGE_TYPE.YESTERDAY:
      startDate = new Date(year, month, date - 1);
      endDate = new Date(year, month, date - 1, 23, 59, 59);
      break;
    case DATE_RANGE_TYPE.THIS_WEEK:
      // 이번 주 월요일부터 일요일까지
      const monday = new Date(year, month, date - day + (day === 0 ? -6 : 1));
      startDate = monday;
      endDate = new Date(year, month, monday.getDate() + 6, 23, 59, 59);
      break;
    case DATE_RANGE_TYPE.LAST_WEEK:
      // 저번 주 월요일부터 일요일까지
      const lastMonday = new Date(year, month, date - day + (day === 0 ? -6 : 1) - 7);
      startDate = lastMonday;
      endDate = new Date(year, month, lastMonday.getDate() + 6, 23, 59, 59);
      break;
    case DATE_RANGE_TYPE.THIS_MONTH:
      startDate = new Date(year, month, 1);
      endDate = new Date(year, month + 1, 0, 23, 59, 59);
      break;
    case DATE_RANGE_TYPE.LAST_MONTH:
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 0, 23, 59, 59);
      break;
    case DATE_RANGE_TYPE.ALL:
      startDate = new Date(1999, 0, 1);
      endDate = new Date(2099, 0, 1, 23, 59, 59);
      break;
    default:
      startDate = new Date(year, month, date);
      endDate = new Date(year, month, date, 23, 59, 59);
  }
  
  return { startDate, endDate };
}

/**
 * 날짜 범위 옵션 목록 (버튼용)
 */
export const DATE_RANGE_OPTIONS = [
  { value: DATE_RANGE_TYPE.TODAY, label: DATE_RANGE_TEXT[DATE_RANGE_TYPE.TODAY] },
  { value: DATE_RANGE_TYPE.YESTERDAY, label: DATE_RANGE_TEXT[DATE_RANGE_TYPE.YESTERDAY] },
  { value: DATE_RANGE_TYPE.THIS_WEEK, label: DATE_RANGE_TEXT[DATE_RANGE_TYPE.THIS_WEEK] },
  { value: DATE_RANGE_TYPE.LAST_WEEK, label: DATE_RANGE_TEXT[DATE_RANGE_TYPE.LAST_WEEK] },
  { value: DATE_RANGE_TYPE.THIS_MONTH, label: DATE_RANGE_TEXT[DATE_RANGE_TYPE.THIS_MONTH] },
  { value: DATE_RANGE_TYPE.LAST_MONTH, label: DATE_RANGE_TEXT[DATE_RANGE_TYPE.LAST_MONTH] },
  { value: DATE_RANGE_TYPE.ALL, label: DATE_RANGE_TEXT[DATE_RANGE_TYPE.ALL] }
];

export default {
  TYPE: DATE_RANGE_TYPE,
  TEXT: DATE_RANGE_TEXT,
  OPTIONS: DATE_RANGE_OPTIONS,
  getDateRange
}; 