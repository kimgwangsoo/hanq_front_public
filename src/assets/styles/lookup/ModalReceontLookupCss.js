import styled from 'vue3-styled-components'

// 타이틀
export const RLTitle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column
  font-size: 18px;
  font-weight: bold;

  .timeTitle {
    margin-top: 5px;
    font-size: 16px;
  }
`;

export const RLTable = styled.table`
  min-width: 300px;
  max-width: 350px;
  margin-right: 15px;

  th {
    padding: 5px;
    border: 1px solid #ddd;
    background-color: #1a2136;
    color: white;
  }

  td {
    border: 1px solid #ddd;
    padding: 15px;
  }

  @media (max-width: 768px) {
    min-width: 200px;
    max-width: 250px;
    width: 100%;

    th {
      padding: 3px;
    }

    td {
      padding: 8px;
    }
  }
`;

// 구매가능불가능 품목 테이블
export const RLAvailableTable = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  margin-right: 15px;

  th {
    padding: 8px 40px;
    border-radius: 10px;
    border: 2px solid #ddd;
  }

  td {
    min-width: 230px;
    padding: 10px;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    margin-top: 10px;
    
    th {
      padding: 3px;
    }

    td {
      min-width: 100px;
      max-width: 200px;
      width: 100%;
      font-size: 12px;
      font-weight: bold;
    }
    
  }
`;

// 적용구간 테이블 container
export const RLContractTContainer = styled.div`
  max-height: 500px;
  overflow-y: auto;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

// 품목별 적용구간 내 계약 이력 테이블
export const RLContractTable = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  max-width: 600px;

  th {
    position: sticky;
    top: 0;
    background-color: #1a2136;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 10px;
    color: white;
  }

  .lineDiv {
    padding: 2px 10px;
    margin: 5px;
    border: 1px solid #999;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    line-height: 2.0;
  }

  @media (max-width: 768px) {
    th {
      padding: 3px 15px;
    }

    td {
      padding: 8px;
    }
  }
`;

export const RDWhiteBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  height: 40px;
  width: 100px;
  

  &.marginBtn {
    margin: 15px 10px;
  }

  &:hover {
    background-color: #1a2136;
    color: #fff;
  }

  @media (max-width: 768px) {
    font-size: 14px;

    &.marginBtn {
      margin: 6px 3px;
    }
  }
`;