import styled from 'vue3-styled-components';

// 시스템 내용 div
export const SystemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22%;
  margin-right: 40px;

  &:last-child {
    margin-right: 0;
  }
`;

// 50% div
export const System50Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin-right: 40px;

  &:last-child {
    margin-right: 0;
  }
`;

// 시스템 메뉴 타이틀
export const SystemTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 6px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #1a2136;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

// 계약서 확인 링크
export const ContractLink = styled.div`
  color: #4285f4;
  font-size: 20px;
  font-weight: bold;
  text-decoration: underline;

  &:hover {
    color: #4285f4;
    cursor: pointer;
  }
`;

// 시스템 테이블
export const SystemTable = styled.table`
  width: 100%;
  margin-top: 5px;
  margin-bottom: 20px;

  th {  
    padding: 6px 8px;
    background-color: #fff;
    border: 1px solid #ddd;
  }
  
  td {
    padding: 6px 8px;
    border: 1px solid #ddd;
    background-color: #f5f5f5;

    &.red {
      background-color: #f2dede;
    }

    &.green {
      background-color: #dff0d8;
    }
  }

  tbody tr:hover {
    border: 2px solid #1a2136;
    background-color: #f5f5f5;
    cursor: pointer;
  }

`;

// 회사 정보 테이블
export const CompanyTable = styled.table`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;

  th {
    text-align: left;
    padding: 6px 8px;
    font-size: 16px;
  }

  td {
    text-align: left;
    padding: 6px 8px;
    font-size: 20px;
    font-weight: bold;
  }

  input:not([type="checkbox"]) {
    width: 95%;
    padding: 6px 8px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  label {
    cursor: pointer;
  }

  .smallFont {
    font-weight: normal;
    font-size: 15px;
  }
`;

// 페이징 컨테이너
export const PagingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

// 페이징 버튼
export const PagingBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
  font-weight: bold;

  &:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  
  &:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  
  &.active {
    background-color: #4285f4;
    border: 1px solid #4285f4;
    color: #fff;
  }
`;

// 파란색 버튼
export const SystemBlueBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #4285f4;
  background-color: #4285f4;
  color: #fff;
  border-radius: 5px;
  padding: 6px 8px;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #4285f4;
  }
`;

export const ManagerContainer = styled.div`
  padding: 20px;
  width: 100%;
  margin: 0 auto;
`;

// 담당자 관리 테이블
export const ManagerTable = styled.table`
  width: 95%;
  tr:hover td {
    background-color: #f0f0f0;
  }

  th {
      background-color: #1a2136;
      color: #fff;
      text-align: left;
      padding: 6px 8px;
      width: 35%;
      border: 1px solid #ddd;
    }

   td {
      padding: 6px 8px;
      border: 1px solid #ddd;
      background-color: #f9f9f9;
      text-align: left;
    }
  
  input:not([type="checkbox"]), select {
    width: 90%;
    padding: 8px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
`

export const SystemManagerCheckLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;

  input[type="checkbox"] {
    margin-right: 8px;
    width: 20px;
    height: 20px;
  }

`;

