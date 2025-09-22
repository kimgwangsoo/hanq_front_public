import styled from 'vue3-styled-components';

export const ClientTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #1a2136;

  &.subTitle {
    font-size: 16px;
    margin-bottom: 10px;
    flex-direction: row;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  button {
    background-color: #fff;
    color: #1a2136;
    border: 1px solid #1a2136;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 5px;
    
    &:hover {
      background-color: #1a2136;
      color: #fff;
    }

    i {
      font-size: 16px;
    }
  }

  select {
    padding: 4px;
    text-align: center;
    border: 1px solid #1a2136;
    border-radius: 4px;
    font-size: 16px;
    width: 120px;

    &.modify {
      width: 300px;
      border: 2px solid #1a2136;
      font-size: 20px;
    }

    &.small {
      width: 80px;
    }

    @media (max-width: 768px) {
      padding: 2px;
      font-size: 12px;
      gap: 1px;

      &.small {
        width: 70px;
      }
    }
  }
`;

// 탭 컨테이너 스타일 추가
export const TabContainer = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: #fff;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
  z-index: 100;
`;

// 탭 버튼 스타일 추가
export const TabButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 12px 20px;
  background-color: #f5f5f5;
  border: none;
  border-bottom: 2px solid #1a2136;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
  
  &.active {
    background-color: #1a2136;
    color: white;
  }

  @media (max-width: 768px) {
    padding: 5px 10px;
    font-size: 12px;
  }
`;

export const RecordDiv = styled.div`
  padding: 5px;
  text-align: left;
  border: 1px solid #1a2136;
  border-radius: 5px;
  margin-bottom: 3px;

  &:hover {
    background-color: #1a2136;
    color: #fff;
    cursor: pointer;
  }
`;

export const InputField = styled.input`
  width: 100%;
  padding: 6px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;

  &.green {
    background-color: #DFF0D8;
    padding: 8px;
  }
  &[type="date"] {
    padding: 5px;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const SelectField = styled.select`
  width: 100%;
  padding: 5px;
  background-color: #DFF0D8;
  font-weight: bold;
  border: none;
  box-sizing: border-box;
  appearance: menulist;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const TextareaField = styled.textarea`
  width: 100%;
  padding: 8px;
  border: none;
  box-sizing: border-box;
  height: 80px;
  resize: vertical;
`;

export const AddressRow = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: pointer;
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 0 5px;

  &:hover {
    background-color: #e9e9e9;
  }
`;

export const FullWidthInput = styled.input`
  flex-grow: 1;
  padding: 10px 5px;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  background-color: transparent;
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  background-color: #1a2136;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2c3657;
  }
`;

export const SignatureArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px 0;

  canvas {
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 10px;
    cursor: crosshair;
    width: 100%;
    height: 100%;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
`;

// 등록하기 버튼
export const RegisterButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 50%;
  gap: 5px;
  padding: 12px;
  margin: 3px;
  background-color: #fff !important;
  color: #1a2136 !important;
  border: 1px solid #1a2136 !important;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;

  &.small {
    width: 30%;

    @media (max-width: 768px) {
      width: 70%;
    }
  }

  &.marginBottom {
    margin-bottom: 30px;
  }

  &:hover {
    background-color: #1a2136 !important;
    color: #fff !important;

    .material-icons {
      color: #fff !important;
    }
  }

  &.marginTop {
    margin-top: 20px;
  }
    
  .blue {
    color: #4690ff;
  }

  .green {
    color: #306e48;
  }

  .red {
    color: #c40000;
  }
`;

export const CMSInfoTableContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 30px;

  table {
    position: relative;
    margin-bottom: 0;

    th {
      position: sticky;
      top: 0;
      z-index: 10;
      background-color: #1a2136;
      color: white;
    }

    tbody {
      max-height: 200px;
      overflow-y: auto;
    }

    tfoot {
      position: sticky;
      bottom: 0;
      z-index: 10;
      background-color: #f5f5f5;
      font-weight: bold;
    }
  }
`;

// CMS 서브 정보 테이블
export const CMSInfoTable = styled.table`
  width: 100%;
  margin-bottom: 30px;

  th, td {
    padding: 10px;
    text-align: center;
    border: 1px solid #ddd;
  }

  th {
    background-color: #1a2136;
    color: white;
    font-weight: bold;
    font-size: 16px;
    border-left: 1px solid #ddd;
  }

  @media (max-width: 768px) {
    th, td {
      padding: 2px;
      font-size: 12px;
    }
  }
`;

// cms 신청서 작성/전송 버튼
export const CMSBtn = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background: #5A99BE !important;
  border: 1px solid #5A99BE !important;
  color: #fff;

  &:hover {
    background: #fff !important;
    color: #1a2136;
  }

  &.red {
    background: #BE5A5A !important;
    border: 1px solid #BE5A5A !important;

    &:hover {
    background: #fff !important;
    color: #1a2136;
  }
  }
`;

// cms 상태 색상
export const CMSSt = styled.div`
  padding: 8px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #BE5A5A;

  &.green {
    background-color: #5ABE5A;
  }
`;

// 절반 사이즈 서브 div
export const CHalfSubDiv = styled.div`
  width: 55%;

  @media (max-width: 768px) {
    width: 100%
  }
`;