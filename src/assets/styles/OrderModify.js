import styled from 'vue3-styled-components';

export const OrderModifyDiv = styled.div`
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: center;
`;

export const OrderModifyFooterArea = styled.div`
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    background:#fff;
    height: 100px;
`;

export const OrderModifySubmitBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: #122459;
    width: 100%;
    height: 27px;
    margin: 5px;
    border-radius: 3px;
    box-shadow: 0 8px 9px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    color: #fff;
    padding: 15px;
`;

export const OrderModifyServiceBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 180px;
    padding: 15px;
    border-radius: 5px;
    background: #fbffff;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 8px 9px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
    margin: 5px;
`;

export const OrderModifySubmitBtnArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 100%;
`;

export const OrderModifyServiceBtnArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 100%;
`;

export const OrderModifyProductArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    width:70%;
    padding-bottom: 200px;
}`;

export const OrderModifyClientTableMemoSelect = styled.select`
    width: 100%;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
`;

// 메모 아이템 컨테이너
export const OrderCommentItem = styled.div`
  border: 1px solid #ccc;
  margin: 5px;
  padding: 5px;
  text-align: left;
`;

// 메모 헤더 영역 (날짜와 삭제 버튼을 포함)
export const OrderCommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

// 메모 내용 영역
export const OrderCommentContent = styled.div`
`;

// 메모 날짜와 작성자 텍스트
export const OrderCommentInfo = styled.span`
  font-size: 0.9em;
  color: #666;
`;

export const OMemoTypeSpan = styled.span`
  color:rgb(255, 136, 0);
  font-weight: bold;
  font-size: 14px;
`;

export const MemoPinBtn = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  color: #666;
  font-size: 10px;
`;

// 고정 버튼
export const MemoFixBtn = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  color: #666;
`;

// 메모 없음 안내 메시지
export const OrderCommentEmpty = styled.div`
  color: #999;
  font-style: italic;
  padding: 10px;
  text-align: center;
`;

export const OrderUpClientBtn = styled.div`
  padding: 5px 5px;
  border-radius: 5px;
  background: #ffffff;
  font-weight: bold;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  box-shadow: 0 8px 9px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
  writing-mode: vertical-rl;
  text-orientation: upright;
  min-height: 50px;
  width: 30px;
  line-height: 30px;

  &.active {
    background: #122459;
    color: #fff;
  }

  &.disabled-btn {
    background: #ccc;
    color: #fff;
    cursor: not-allowed;
  }
`;
