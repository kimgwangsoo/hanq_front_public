import styled from 'vue3-styled-components';

// 공지 테이블
export const NoticeTable = styled.table`
  width: 100%;

  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }

  // 첫번째 th 가로는 100px
  th:first-child {
    width: 100px;
  }

  // 두번째 th 가로는 100px
  th:nth-child(2) {
    width: 150px;
  } 

  tr:hover {
    border: 2px solid #1a2136;
    cursor: pointer;
  }
`;
