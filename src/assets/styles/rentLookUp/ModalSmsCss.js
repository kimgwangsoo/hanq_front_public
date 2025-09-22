import styled from 'vue3-styled-components';

// 문자발송 컨텐츠 전체 영역
export const SmsBody = styled.div`
  display: flex;
  width: 100%;
`;

// 문자발송 개별 컨텐츠 영역
export const SmsContent = styled.div`
  width: 15%;
  padding: 10px;
  min-height: 55vh;
  max-height: 60vh;
  border-right: 2px solid #ddd;

  &.width20{
    width: 20%;
  }

  &.width30{
    width: 30%;
  }

  &:last-child {
    border-right: none;
  }
`;

// 테이블 타이틀
export const SmsTableTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

// 경고 문구
export const MsgWarning = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

// 문자발송 테이블
export const SmsTable = styled.table`
  width: 100%;
  border: 1px solid #ddd;
  
  th{
    padding: 5px;
    background-color: #eee;
    border-bottom: 1px solid #ddd;
  }

  td{
    padding: 5px;
    border-bottom: 1px solid #ddd;
  }
`;

// 문자 발송 타입 목록
export const MsgContentList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  overflow-y: auto;
  height: 55vh;
`;

// 문자 발송 타입 목록 아이템
export const MsgTypeItem = styled.div`
  width: 86%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  font-size: 16px;

  &.active{
    background-color: #1a2136;
    color: white;
  }
`;

export const MsgTextarea = styled.textarea`
  width: 95%;
  min-height: 55vh;
  max-height: 60vh;
  border: 1px solid #9999;
  border-radius: 8px;
  resize: none;
  padding: 5px;
  font-size: 20px;
  font-weight: bold;
`;

// 수신자 탭
export const RecipientTab = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;

  button{
    width: 45%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 5px;
    background-color: #fff;
    font-size: 16px;
    cursor: pointer;
    
    &.active {
      background-color: #1a2136;
      color: white;
    }
  }
`;

// 필터 영역
export const RecipientContent = styled.div`
  padding: 5px;
`;

// 수신자 라벨
export const RecipientLabel = styled.label`
  width: 60px;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

// 수신자 선택
export const RecipientSelect = styled.select`
  flex: 1;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 18px;
  margin-bottom: 10px;
`;

// 검색 영역
export const SmsSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  margin-bottom: 10px;

  input{
    width: 80%;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    margin-right: 5px;
  }

  button{
    min-width: 50px;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #1a2136;
    background-color: #1a2136;
    color: #fff;
    cursor: pointer;
  }
`;

// 수신자 테이블 컨테이너
export const RecipientTableContainer = styled.div`
  height: 48vh;
  overflow-y: auto;
`;

// 수신자 테이블
export const RecipientTable = styled.table`
  width: 100%;

  thead {
    position: sticky;
    top: 0;
    z-index: 1;
    box-shadow: inset 0 0 0 1000px #1a2136;
  }
  
  th {
    padding: 8px;
    background-color: #1a2136;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }
  
  td {
    padding: 6px;
    background-color: #f8f8f8;
    border-bottom: 1px solid #9999;
  }
  
  button {
    padding: 5px 10px;
    font-weight: bold;
    border-radius: 5px;
    border: 1px solid #4690ff;
    background-color: #4690ff;
    color: #fff;
    cursor: pointer;

    &.red {
      background-color: #c40000;
      border: 1px solid #c40000;
    }
  }
`;
