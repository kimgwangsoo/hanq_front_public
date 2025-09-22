import styled from 'vue3-styled-components';

export const DContainer = styled.div`
  padding: 10px;
`;

export const DMainDiv = styled.div`
  display: flex;
  gap: 20px;
  min-height: 50vh;
  max-height: 65vh;
  overflow-y: auto;
`;

// 왼쪽 섹션
export const DSection = styled.div`
  flex: 1;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &.right {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    .content {
      margin-bottom: 20px;
    }
  }
`;

// 섹션 헤더
export const DSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center
  margin-bottom: 10px;
`;

// 섹션 헤더 정보
export const DHeaderInfo = styled.div`
  font-size: 17px;
  font-weight: bold;
  color: #1a2136;
  margin: 0 15px;
`;

// 섹션 헤더 검색 영역
export const DSearchArea = styled.div`
  display: flex;
  align-items: center;

  input {
    width: 150px;
    padding: 8px 16px;
    margin-right: 5px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 14px;
  }

  button {
    border: 1px solid #1a2136;
    background: #1a2136;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
`;

// 테이블 컨테이너
export const DTableContainer = styled.div`
  max-height: 550px;
  overflow-y: auto;
  border: 1px solid #1a2136;
  scrollbar-color: #ddd #f1f1f1;

  &.small {
    max-height: 250px;
  }
`;

// 테이블
export const DTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #1a2136;
  font-size: 15px;

  thead {
    position: sticky;
    top: 0;
    z-index: 1;
    box-shadow: inset 0 0 0 1000px #1a2136;
  }

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
    text-align: center;
    border: 1px solid #000;
  }

  th {
    border-bottom: 3px solid #ddd;
    background-color: #1a2136;
    color: #fff;
  }
`;