import styled, { css } from 'vue3-styled-components';

// ============================================
// 공통 스타일 정의
// ============================================

// 공통 입력 요소 스타일
const commonInputCss = css`
  input {
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 5px;
    font-size: 14px;
    margin-right: 10px;
  }

  textarea {
    width: 90% !important;
    height: 100px;
    border: 1px solid #ddd;
    padding: 10px;
    font-size: 14px;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    margin: 5px;
    font-size: 16px;
    font-weight: bold;
  }
`;

// 공통 버튼 스타일
const commonButtonCss = css`
  button {
    background-color: #1a2136;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
    font-weight: bold;

    &:hover {
      background-color: #2c3657;
    }

    &.white {
      background-color: #fff;
      color: #1a2136;
      border: 1px solid #1a2136;

      &:hover {
        border: 1px solid #fff;
        background-color: #1a2136;
        color: #fff;
      }
    }

    &.red {
      background-color: rgb(199, 0, 0);
      border: 1px solid rgb(199, 0, 0);
    }

    &.blue {
      background-color: #3085d6;
      border: 1px solid #3085d6;
    }
  }
`;

// Sticky 헤더 스타일
const stickyHeaderCss = css`
  thead {
    position: sticky;
    top: 0;
    z-index: 1;
    box-shadow: inset 0 0 0 1000px #1a2136;
  }
`;

// 컬러 클래스 스타일
const colorClassCss = css`
  &.green {
    background: #DFF0D8;
  }

  &.red {
    background: #F2DEDE;
  }

  &.blue {
    background: #D9EDF7;
  }

  &.yellow {
    background: #FCF8E3;
  }
`;

// ============================================
// 베이스 테이블 컴포넌트
// ============================================

export const BaseTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 8px;
    text-align: center;
    border: 1px solid #ddd;
  }

  th {
    background-color: #1a2136;
    color: #fff;
    font-weight: bold;
    font-size: 14px;
  }

  td {
    font-size: 14px;
  }

  ${commonInputCss}
  ${commonButtonCss}
`;

// ============================================
// 특화된 테이블 컴포넌트들
// ============================================

// 데이터 테이블 (기존 DataTable)
export const DataTable = styled(BaseTable)`
  th, td {
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }

  th {
    background: #f8f9fa;
    font-weight: 600;
    color: #333;
    border-bottom: 2px solid #1a2136;
  }

  td {
    ${colorClassCss}
  }

  tr {
    ${colorClassCss}

    &:not(thead tr):hover {
      background: rgba(255, 255, 255, 0.1);
      border-top: 2px solid #1a2136;
      border-bottom: 2px solid #1a2136;
      cursor: pointer;
    }
  }
`;

// 클라이언트 폼 테이블
export const ClientFormTable = styled(BaseTable)`
  width: 70%;
  margin-bottom: 20px;

  &.tdLeft {
    td {
      text-align: left;
    }
  }

  &.tdPadding {
    td {
      padding: 5px;
    }
  }

  th {
    padding: 5px;
    width: 25%;
  }

  .borderNone {
    th, td {
      border: none;
    }
  }
`;

// 수신자 테이블
export const RecipientTable = styled(BaseTable)`
  ${stickyHeaderCss}

  th {
    border-bottom: 1px solid #ddd;
  }

  td {
    padding: 6px;
    background-color: #f8f8f8;
    border-bottom: 1px solid #9999;
  }

  button {
    padding: 5px 10px;
    border-radius: 5px;
  }
`;

// SMS 테이블
export const SmsTable = styled(BaseTable)`
  border: 1px solid #ddd;

  th {
    padding: 5px;
    background-color: #eee;
    color: #1a2136;
    border-bottom: 1px solid #ddd;
  }

  td {
    padding: 5px;
    border-bottom: 1px solid #ddd;
  }
`;

// CMS 정보 테이블
export const CMSInfoTable = styled(BaseTable)`
  margin-bottom: 30px;

  th, td {
    padding: 10px;
  }

  th {
    font-size: 16px;
    border-left: 1px solid #ddd;
  }

  &.borderNone {
    border: 1px solid #1a2136;
    th, td {
      border: none;
    }
  }
`;

// 제목 테이블
export const TitleTable = styled(BaseTable)`
  font-size: 15px;
  margin-bottom: 10px;

  th, td {
    padding: 6px;

    &.title {
      font-size: 25px;
      font-weight: bold;
    }
  }

  td {
    text-align: left;

    &.right {
      text-align: right;
    }
  }

  th {
    background-color: transparent;
    color: inherit;
    border: none;
  }
`;

// 필요사항 테이블
export const NeedTable = styled(BaseTable)`
  font-size: 15px;

  th {
    background-color: #eee;
    color: #1a2136;
  }

  label {
    margin-right: 10px;
  }
`;

// 재평가 테이블
export const ReTable = styled(BaseTable)`
  font-size: 16px;
  ${stickyHeaderCss}

  th {
    &.widthNum {
      width: 10%;
    }
  }

  td {
    text-align: left;

    &.smallTitle {
      font-weight: bold;
      background-color: #f2f2f2;
      color: #1a2136;
      border-bottom: 2px solid #1a2136;
    }

    &.fontCenter {
      text-align: center;
    }

    &.tdLink {
      &:hover {
        cursor: pointer;
        font-weight: bold;
        color: #1a2136;
        text-decoration: underline;
        background-color: rgb(227, 242, 245);
      }
    }

    strong {
      color: #1a2136;
      font-style: italic;
      font-weight: bold;
      background-color: #9999;
      padding: 2px 4px;
      border-radius: 3px;
    }
  }
`;

// D테이블
export const DTable = styled(BaseTable)`
  border: 1px solid #1a2136;
  font-size: 15px;
  ${stickyHeaderCss}

  tr {
    cursor: pointer;

    &.trHover {
      &:hover {
        background-color: #ddd;
      }
    }
  }

  th, td {
    padding: 6px;
    border: 1px solid #000;
  }

  th {
    border-bottom: 3px solid #ddd;
  }
`;