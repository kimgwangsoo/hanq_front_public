import styled from 'vue3-styled-components';

export const WContent = styled.div`
  width: 100%;
  margin: 10px 0;
`;

export const WTitle = styled.div`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin: 15px 0 20px 0;
`;

// 출금 상태 div
export const WStInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 5px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;

  .countIfno {
    color: #306e48;
    margin: 3px 8px;
    font-size: 20px;
    font-weight: bold;

    &.redFont {
      color: #c40000;
    }
  }
`;

// 출금 상태 table
export const WStTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;

  th {
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 6px;
    color: #fff;
    background-color: #1a2136;
    border: 1px solid #1a2136;
  }

  td {
    padding: 6px;
    border: 1px solid #ddd;
    border-top: none;
  }
`;