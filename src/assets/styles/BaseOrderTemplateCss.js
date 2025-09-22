import styled from 'vue3-styled-components';

// 기본 컨테이너 스타일
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 100px;

  @media (max-width: 768px) {
    padding-left: 5px;
    padding-right: 5px;
  }
`;

// 제목 영역 스타일
export const TitleArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px 0;
`;

export const TitleIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #e8f5e8;
  border-radius: 8px;
  color: #388e3c;
  margin-right: 8px;
  
  .material-icons {
    font-size: 24px;
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;

    .material-icons {
      font-size: 20px;
    }
  }
`;

export const TitleText = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

// 검색 영역 스타일
export const SearchArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

export const SearchInput = styled.input`
  // padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 250px;
  height: 35px;
  margin-right: 8px;

  @media (max-width: 768px) {
    width: 150px
    font-size: 13px;
  }
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  margin-right: 8px;
  width: 60px;
  height: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #1a2136;
    color: white;
  }

  @media (max-width: 768px) {
    width: 45px;

    .material-icons {
      font-size: 18px;
    }
  }
`;

// 필터 영역 스타일
export const FilterArea = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: flex-start;
    padding: 0;
    margin-bottom: 5px;
    display: flex;
    flex-wrap: wrap;
  }
`;

// 필터 태그 컴포넌트 (재사용 가능)
export const FilterTag = styled.div`
  display: flex;
  align-items: center;
  background-color: #e9f5e9;
  border: 1px solid #4CAF50;
  border-radius: 4px;
  padding: 4px 8px;
  margin: 0 4px;
  font-size: 16px;
  color: #333;

  .filter-remove {
    margin-left: 5px;
    cursor: pointer;
    font-weight: bold;
    color: #f44336;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    width: calc(50% - 8px);
    margin: 2px 4px;
    box-sizing: border-box;
  }
`;

// 필터 초기화 버튼 (재사용 가능)
export const FilterClearButton = styled.button`
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 4px 8px;
  margin: 0 4px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 8px 12px;
    width: 100%;
  }
`;

// 헤더 버튼 영역 스타일
export const HeaderArea = styled.div`
  display: flex;
  // justify-content: space-between;
  width: 100%;
`;

export const HeaderButtonArea = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  width: 100%;
`;

export const HeaderInfoArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-width: 30%;

  &.minWidth40 {
    min-width: 40%;
  }

  &.minWidth0 {
    min-width: 0%;
  }

  &.minWidth400 {
    min-width: 400px;
  }

  &.fontSize12 {
    font-size: 12px;
    font-weight: bold;
  }
`;

export const AddButton = styled.button`
  padding: 8px 16px;
  background-color: #4c6ef5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  height: 40px;
  box-shadow: 0 8px 9px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
  font-weight: bold;
`;

export const ExcelButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  background-color: #1e7e34;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  height: 40px;
  box-shadow: 0 8px 9px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
  font-weight: bold;
`;

// 날짜 선택 영역 스타일
export const DatePickerWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DateSearchButton = styled.button`
  padding: 8px 16px;
  background: #1a2136;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  height: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  color: white;
  &:hover {
    background-color: #e9ecef;
  }
`;

export const DateButtonWrap = styled.div`
  display: flex;
  gap: 4px;
`;

export const DateRangeButton = styled.button`
  width: 14%;
    height: 40px;
    line-height: 10px;
    background-color: #1a2136;
    color: white;
    border: none;
    padding:10px;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 8px 9px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
    margin: 0 5px;
    font-size:15px;
    font-weight: bold;
`;

// 탭 버튼 영역 스타일
export const TabButtonArea = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  width: 100%;
`;

export const StatusButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  height: 70px;
  width: calc(25% - 6px);
  justify-content: center;
  flex-direction: column;
  
  &.active {
    background-color: #1a2136;
    color: white;
  }
`;

export const StatusName = styled.span`
  margin-right: 8px;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 1rem;
  
  &.all {
    color: inherit;
  }
  
  &.unconfirm {
    color: #dc3545;
  }
  
  &.confirm {
    color: #fd7e14;
  }
  
  &.release {
    color: #28a745;
  }
  
  .active & {
    color: white;
  }
`;

export const StatusCount = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 6px;
  background-color: #dee2e6;
  color: #495057;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: bold;
  
  .active & {
    background-color: white;
    color: #4c6ef5;
  }
`;

// 페이지네이션 영역 스타일
export const PaginationArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #1a2136;
`;

export const PageLeftArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 33%;
`;

export const PageCenterArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33%;
  margin:20px;
`;

export const PageRightArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 33%;
`;

export const PageButton = styled.button`
    position: relative;
    float: left;
    padding: 4px 11px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
    font-size:24px;
    &:hover{
        cursor: pointer;
    }
    &.current-page {
        background-color: #337ab7;
        color: #fff;
        border-color: #337ab7;
    }
    &:disabled{
        cursor: not-allowed;
    }
    &.double-left{
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    &.double-right{
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    @media (max-width: 768px) {
      padding: 5px 8px;
      font-size: 16px;

      .material-icons {
        font-size: 17px;
      }
    }
`;

// 테이블 영역 스타일
export const TableArea = styled.div`
  margin-bottom: 15px;
  overflow-x: auto;
  width: 100%;
`;

export const TableContainer = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
`;

export const TableHeader = styled.div`
  background-color: #f8f9fa;
  padding: 10px;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
`;

// 액션 영역 스타일
export const ActionArea = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

export const ActionButton = styled.button`
  padding: 4px 8px;
  margin: 0 2px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.75rem;
  
  &.edit {
    background-color: #4c6ef5;
    color: white;
  }
  
  &.delete {
    background-color: #dc3545;
    color: white;
  }
`;

export const DeleteButton = styled.button`
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-right: 10px;
  font-weight: bold;
`;

export const PrintButton = styled.button`
  padding: 8px 16px;
  background-color: #17a2b8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-right: 10px;
  font-weight: bold;
`;

// 테이블 관련 스타일
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f8f9fa;
  
  th {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    font-weight: bold;
  }
`;

export const TableBody = styled.tbody`
  tr {
    &:hover {
      background-color: #f1f3f5;
      cursor: pointer;
    }
    
    &:nth-child(even) {
      background-color: #f8f9fa;
    }
  }
  
  td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
`;

// 모달 영역 스타일
export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 80%;
  width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e9ecef;
  font-weight: bold;
  font-size: 1.25rem;
`;

export const ModalBody = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  border-top: 1px solid #e9ecef;
`;

export const ModalButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 8px;
  font-weight: bold;
  
  &.primary {
    background-color: #4c6ef5;
    color: white;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  &.cancel {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
  }
`; 