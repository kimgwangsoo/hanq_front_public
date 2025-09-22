import styled from 'vue3-styled-components';

// 컨테이너 박스
export const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

// 50% 컨테이너
export const S50Container = styled.div`
  // width: 50%;
  height: 750px;
  overflow-y: auto;
  padding: 10px;

  label {
    cursor: pointer;
  }
`;

// grid-container
export const SGridContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

// grid row
export const SGridRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

// 각 섹션 컨테이너
export const SectionContainer = styled.div`
  width: 95%;
  height: 350px;
  border-radius: 8px;
  padding: 10px;
  padding-bottom: 0;
  margin-bottom: 20px;

  .header {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;

// 서브 타이틀
export const SSubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 18px;
  font-weight: bold;

  .personCnt {
    font-size: 14px;
    font-weight: normal;
    color: #030000;
  }

  &.subTitle2 {
    font-size: 20px;
  }
    
  &.guideTitle {
    color: #888;
    font-size: 18px;
    font-weight: bold;
  }
`;

// 가이드 텍스트 div
export const SGuideText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
`;

// 체크박스 컨테이너
export const SCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  font-size: 18px;
`;

// 검색창
export const SSearchInput = styled.input`
  width: 120px;
  padding: 5px 8px;
  margin: 0 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const SSelect = styled.select`
  padding: 5px 8px;
  margin: 0 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

// 검색 영역
export const DateSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  input {
    padding: 5px;
    border: 2px solid #ddd;
    border-radius: 4px;
    width:100px;
  }
`;

// 한방에 큐 흰색 버튼
export const SWhiteBtn = styled.button`
  background-color: #fff;
  padding: 5px 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  cursor: pointer;
  font-size: 16px;

  .material-icons {
    font-size: 16px;
    font-weight: bold;
    margin-top: 2px;
  }

  &:hover {
    background-color: #f0f0f0;
  }
`;

// 버튼들
export const SBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background-color: #1a2136;
  }
`;

// 테이블 컨테이너
export const STableContainer = styled.div`
  margin-top: 10px;
  height: 280px;
  overflow-x: auto;
  border: 2px solid #1a2136;

  &.zeroList {
    height: 400px;
  }
`;

export const STable = styled.table`
  width: 100%;

  thead {
    background-color: #1a2136;
    color: #fff;
    font-weight: bold;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  tbody tr {
    &:hover {
      background-color: #ddd;
      font-weight: bold;
      cursor: pointer;
    }
  }

  th, td {
    padding: 5px;
    text-align: center;
  }

  td {
    border-bottom: 1px solid #ddd;
  }

  input {
    padding: 5px;
  }

  &.font14 {
    font-size: 14px;
  }
`;

// 모달창 타이틀
export const SModalTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

// 문자 발송 테이블 컨테이너
export const SMsgTableContainer = styled.div`
  width: 400px;
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 10px;
  border: 1px solid #ddd;
`;

// 문자 발송 테이블
export const SMsgTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  border: 1px solid #ddd;

  thead {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #ddd;
    box-shadow: inset 0 0 0 1000px #ddd;
  }

  th, td {
    padding: 5px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    font-weight: bold;
  }
  
  th {
    background-color: #ddd;
  }

  input {
    width: 20px;
    height: 20px;
  }
`;

// 문자 발송 텍스트 영역
export const SMsgTextarea = styled.textarea`
  padding: 3px;
  width: 500px;
  height: 250px;
  resize: none;
  border-radius: 4px;
`;