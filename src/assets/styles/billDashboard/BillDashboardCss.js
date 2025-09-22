import styled from 'vue3-styled-components';

// 사이드바
export const BDSidebar = styled.div`
  width: 200px;
  min-height: calc(100vh - 80px);
  background-color: #1a2136;
  color: #fff;
  padding: 20px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
`;

export const BDSidebarTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  padding: 0 20px 15px 20px;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #4ECB71;
`;

export const BDSidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BDSidebarMenuItem = styled.div`
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    background-color: rgba(255, 255, 255, 0.15);
    border-left: 3px solid #4ECB71;
    padding-left: 17px;
    font-weight: 500;
  }
  
  i {
    margin-right: 10px;
    font-size: 18px;
    opacity: 0.8;
  }
  
  .menu-arrow {
    position: absolute;
    right: 15px;
    opacity: 0.7;
    font-size: 12px;
    transition: transform 0.2s ease;
  }

  .menu-arrow.open {
    transform: rotate(90deg);
  }
`;

export const BDSidebarSection = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

export const BDSidebarSectionTitle = styled.div`
  padding: 0 20px 10px 20px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const BDSidebarSubMenu = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.2);
  padding-left: 28px;
`;

export const BDSidebarSubMenuItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.15);
    border-left: 3px solid #4ECB71;
    padding-left: 17px;
    font-weight: 500;
  }
`;

export const BDMainContainer = styled.div`
  padding: 20px;
  flex: 1;
  max-width: calc(100% - 200px);
  height: calc(100vh - 80px);
  overflow-y: auto;
`;

// 메인 페이지 타이틀
export const BDHeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  color: #1a2136;
  margin-bottom: 8px;
`;

// 업체명 타이틀
export const BDCompanyTitle = styled.div`
  display: flex;
  width: 100%;
  gap: 3px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 25px;
`;

// 년도 선택
export const BDYearSelect = styled.select`
  padding: 5px 10px;
  border: 1px solid #1a2136;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  background-color: #d9edf7;
`;

// 월 선택
export const BDMonthSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 18px;
  background-color: #fff;
  margin-left: 10px;
`;

// n개씩 보기
export const BDCountSelect = styled.select`
  padding: 3px 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 18px;
`;

// 전체 요약 카드 div
export const BDStCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
`;

// 전체 요약 카드
export const BDStCard = styled.div`
  flex: 1;
  min-width: 200px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

// 전체 요약 카드 아이콘
export const BDStCardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

// 전체 요약 카드 내용
export const BDStCardContent = styled.div`
  h2 {
    font-size: 24px;
    margin: 0 0 5px 0;
    color: #1a2136;
  }

  p {
    margin: 0;
    color: #6c757d;
  }
`;

// 차트 컨테이너
export const BDChartContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
`;

// 차트 카드
export const BDChartCard = styled.div`
  flex: 1;
  min-width: 300px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 400px;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 15px;
    color: #1a2136;
    display: flex;
    align-items: center;

    i {
      margin-right: 8px;
    }
  }

  .chartContainer {
    flex-grow: 1;
  }

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

// 품목별 판매 대여 금액 차트 컨테이너
export const BDPieChartContainer = styled.div`
  display: flex;
  height: 300px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

// 품목별 판매 대여 금액 차트 범례
export const BDPieLegend = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  padding-top: 20px;
  padding-left: 20px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

// 품목별 판매 대여 금액 차트 범례 아이템
export const BDPieLegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
`;

export const LegendColor = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 3px;
`;

export const LegendLabel = styled.div`
  flex: 1;
  color: #495057;
`;

export const LegendValue = styled.div`
  color: #1a2136;
  font-weight: 500;
`;

// 담당자별 테이블 컨테이너
export const BDManagerContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 18px;
    margin-top: 0;
    margin-bottom: 15px;
    color: #1a2136;
  }
`;
export const BDManagerTable = styled.table`
  width: 100%;
  border: 1px solid #ddd;

  th, td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 500;
    color: #495057;
    cursor: pointer;
    user-select: none;
  }

  th:hover {
    background-color: #e9ecef;
  }

  .sortIcon {
    vertical-align: middle;
    font-size: 20px;
  }
`;

// 테이블 컨테이너
export const BDAmountContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  height: 600px;
  overflow-x: auto;
  border: 1px solid #ddd;
`;

// 수량 모달창 테이블
export const BDAmountTable = styled.table`
  width: 100%;
  font-size: 16px;

  thead {
    position: sticky;
    top: 0;
  }

  th, td {
    padding: 12px;
  }

  th {
    background-color: #1a2136;
    color: #fff;
  }

  td {
    border-bottom: 1px solid #ddd;
  }
`;

// 청구확정내역 테이블
export const BDMonthHistoryTable = styled.table`
  width: 100%;
  font-size: 20px;

  th, td {
    padding: 12px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #1a2136;
    color: #fff;
  }

  td {
    background-color: #fff;
  }

  tr {
    &:hover {
      border: 2px solid #1a2136;
    }
  }
`;

// 오류 내용 테이블 컨테이너
export const BDErrTableContainer = styled.div`
  width: 99%;
  height: 500px;
  overflow-y: auto;
  margin-top: 20px;
  border: 1px solid #ddd;
`;

// 오류 내용 테이블
export const BDErrTable = styled.table`
  width: 100%;
  font-size: 20px;

  thead {
    position: sticky;
    top: 0;
    box-shadow: inset 0 0 0 1000px #ddd;
  }

  th, td {
    padding: 10px 5px;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #1a2136;
    color: #fff;
  }

  td {
    line-height: 1.5;
  }
`;

// 서브 타이틀
export const BDSubTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #1a2136;
`;

// 원청구 배너 컨테이너
export const BDBanner = styled.div`
  width: 100%;
  padding: 20px 0;
  margin-bottom: 20px;
  text-align: center;
  font-size: 25px;
  font-weight: 600;
  border-radius: 8px;
  background-color: #1a2136;
  color: #fff;
`;

// 원청구 테이블 컨테이너
export const BDOCTableContainer = styled.div`
  width: 100%;
  height: 650px;
  overflow-y: auto;
  margin-top: 10px;
`;

// 원청구 테이블
export const BDOCTable = styled.table`
  width: 100%;

  thead {
    position: sticky;
    top: 0;
  }

  tfoot {
    position: sticky;
    bottom: 0;
    font-size: 20px;
    box-shadow: inset 0 0 0 1000px #ddd;
    td {
      padding-left: 15px;
      background-color: #1a2136;
      color: #fff;
      text-align: left;
    }
  }

  th, td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #1a2136;
    color: #fff;
  }

  td {
    background-color: #ddd; 
    border-bottom: 1px solid #1a2136;
  }
`;

// 원청구 카운트 div
export const BDOCCount = styled.div`
  padding: 5px 10px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: #fff;
  color: #1a2136;
  border-radius: 5px;
  font-weight: bold;
`;

// 원청구 버튼
export const BDOCBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 15px;
  margin-left: 20px;
  margin-right: 20px;
  background-color: #fff;
  border: 1px solid #1a2136;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;

  .count {
    background-color: #c40000;
    color: #fff;
    border-radius: 5px;
    padding: 3px 6px;
    margin-left: 3px;
  }

  &:hover {
    background-color: #1a2136;
    border: 1px solid #fff;
    color: #fff;
  }
`;

// 청구하기 버튼
export const BDOCSubmitBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background-color: #c40000;
  border: 1px solid #c40000;
  border-radius: 5px;
  padding: 10px 150px;
  margin-top: 30px;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;

  .material-icons {
    font-size: 30px;
  }

  &:hover {
    background-color: #fff;
    color: #1a2136;
  }
`;

// 아이콘 스타일
export const IconStyles = styled.span`
  width: 36px;
  height: 36px;
  background-color: #1a2136;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  
  &::before {
    font-family: 'Material Icons';
    font-size: 20px;
  }
  
  &.icon-orders::before {
    content: "shopping_cart";
  }
  
  &.icon-products::before {
    content: "inventory_2";
  }
  
  &.icon-clients::before {
    content: "group";
  }
  
  &.icon-revenue::before {
    content: "paid";
  }

  &.icon-cancel::before {
    content: "cancel";
  }
`;

// 청구 페이지 기본 버튼 스타일
export const BDButton = styled.button`
  background-color: #1a2136;
  color: #fff;
  border: 1px solid #1a2136;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;

  &:hover {
    background-color: #fff;
    color: #1a2136;
  }
`;

// 페이징 컨테이너
export const BDPaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

// 페이징 버튼 (이전, 다음)
export const BDPageBtn = styled.button`
  background-color: transparent;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
    background-color: transparent;
  }

  i {
    font-size: 25px;
  }
`;

// 페이징 번호
export const BDPageNum = styled.span`
  padding: 6px 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  color: #555;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;

  &:hover {
    color: #1a2136;
  }

  &.active {
    color: #1a2136;
    font-weight: 700;
    border-bottom: 2px solid #1a2136;
  }
`;