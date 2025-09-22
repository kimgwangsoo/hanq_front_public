import styled from 'vue3-styled-components';

// 내용 div
export const RDContent = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:nth-child(2) {
    margin-left: 20px;
    width: 60%;
  }
`;

// 서브 타이틀
export const RDSubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  font-size: 20px;
  font-weight: bold;

  .guideSpan {
    font-size: 14px;
  }
`;

// 메모 구간 div
export const RDMemoDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 10px;
`;

// 메모 항목 스타일
export const RDMemoItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
  margin-bottom: 5px;
`;

// 주문 코멘트 헤더
export const RDCommentHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
`;

// 주문 코멘트 정보
export const RDCommentInfo = styled.div`
  font-weight: bold;
  color: #1a2136;
`;

// 주문 코멘트 내용
export const RDCommentContent = styled.div`
  margin-top: 5px;
  white-space: pre-wrap;
`;

// 주문 코멘트 없음 메시지
export const RDCommentEmpty = styled.div`
  padding: 20px;
  text-align: center;
  color: #888;
  font-style: italic;
`;

// 흰색 버튼
export const RDWhiteBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  border-radius: 4px;
  border: none;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  height: 40px;

  &:hover {
    background-color: #1a2136;
    color: #fff;
  }
`;

// 대여 내역 테이블
export const RDTable = styled.table`
  width: 100%;
  margin-top: 5px;
  margin-bottom: 20px;
  border: 1px solid #1a2136;

  tfoot {
    border-top: 2px solid #1a2136;
    font-size: 16px;
    font-weight: bold;
  }

  th, td {
    padding: 5px;
    text-align: center;
  }

  th {
    background-color: #1a2136;
    color: white;
    font-weight: bold;
    font-size: 16px;
  }
`;

// 상태 스판
export const RDStateSpan = styled.span`
  /*background-color: #599273;*/
  font-weight: bold;
  font-size: 20px;
  padding: 0px 20px;

  &.red {
    color: red;
  }

  &.green {
    color: green;
  }

  &.orange {
    color: orange;
  }
`;
