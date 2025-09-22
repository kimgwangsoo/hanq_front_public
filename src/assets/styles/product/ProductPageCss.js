import styled from 'vue3-styled-components';

// 카테고리 버튼 스타일
export const ProductCategory = styled.button`
  padding: 8px 12px;
  margin: 2px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover, &.active {
    background-color: #1a2136;
    color: white;
    border-color: #1a2136;
  }
`;

// 카테고리 그룹 스타일
export const ProductGroup = styled.div`
  margin: 5px 0;
  
  > div:first-child {
    font-weight: bold;
    margin-right: 10px;
    min-width: 40px;
  }
`;

// 카테고리 제목 스타일
export const PCategoryTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 15px 0 5px 0;
  padding-bottom: 5px;
  border-bottom: 2px solid #1a2136;
`;

// 카테고리 버튼 컨테이너
export const PBtnContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

// 카운트 배지 스타일
export const PBadge = styled.span`
  display: inline-block;
  background-color: #c40000;
  color: white;
  border-radius: 5px;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  margin-left: 5px;
  padding: 0 5px;
`;

// 소제목 타이틀
export const PSubTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0 5px 0;
`;

// 소독내역 테이블
export const PDisinfectionTable = styled.table`
  width: 100%;
  border: 1px solid #ddd;

  th, td{
    border: 1px solid #ddd;
    padding: 5px 10px;
  }

  th {
    background-color: #f0f0f0;
  }

  .font18 {
    font-size: 18px;
  }

  input {
    width: 100px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;
  }

  select {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;
  }
`;

export const PAddBtn = styled.button`
  background-color: #306e48;
  color: #fff;
  border: 1px solid #306e48;
  border-radius: 5px;
  padding: 5px 10px;
  &:hover {
    background-color: #fff;
    color: #306e48;
    border: 1px solid #306e48;
  }
`;

export const PDeleteBtn = styled.button`
  background-color: #c40000;
  color: #fff;
  border: 1px solid #c40000;
  border-radius: 5px;
  padding: 5px 10px;

  &:hover {
    background-color: #fff;
    color: #c40000;
    border: 1px solid #c40000;
  }
`;

export const PSearchBtn = styled.button`
  background-color: #1a2136;
  color: #fff;
  border: 1px solid #1a2136;
  border-radius: 5px;
  padding: 5px 10px;

  &:hover {
    background-color: #fff;
    color: #1a2136;
    border: 1px solid #1a2136;
  }
`

// 바코드 등록 버튼
export const PAddBarcodeBtn = styled.button`
  width: 200px;
  font-size: 15px;
  background-color: #fff;
  border: 1px solid #1a2136;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #1a2136;
    color: #fff;
    border: 1px solid #1a2136;
  }
`

export const ProductPriceContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

export const ProductCard = styled.div`
  border: 2px solid #f39c12;
  padding: 15px;
  width: 250px;
`;

export const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  white-space: nowrap;
`;

export const ProductName = styled.div`
  font-size: 16px;
  font-weight: bold;

  &.model {
  color: #007bff;
  margin-bottom: 10px;
  }
`;

export const ProductImage = styled.div`
  margin-top: 10px;
  img {
    width: 150px;
    height: auto;
  }
`;

export const MonthlyPrice = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const DiscountPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

export const ProductCode = styled.div`
  margin-top: 10px;
  text-align: right;
  color: #555;
  font-size: 14px;
`;

// 바코드 검사 div
export const PBarCodeSearchDiv = styled.div`
  width: 100%;
  text-align: center;
  padding: 5px 0;
  font-size: 15px;
  font-weight: bold;
  background-color: #ddd;
  border-radius: 5px;
`

// 재고 관리 창
// 현황 타이틀
export const PStTitle = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  padding: 5px 10px;

  border-radius: 5px;
  background-color: #1a2136;
  color: #fff;
`

// 테이블 컨테이너
export const PStTableContainer = styled.div`
  width: 100%;
  height: 270px;
  overflow-y: auto;
  border: 1px solid #ddd;
  margin-top: 10px;
  margin-right: 10px;
  border-radius: 5px;

  &.height600 {
    height: 600px;
  }
`

// 현황 테이블
export const PStTable = styled.table`
  width: 100%;
  font-size: 14px;

  thead {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: #f0f0f0;
  }

  th {
    padding: 5px 10px;
  }

  select {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 3px;
  }

  tr {
    &[draggable="true"] {
      cursor: grab;
    }
  }

  .dragging {
    opacity: 0.5;
    background: #f0f0f0;
    border: 2px dashed #ccc;
  }
`

// 재고 정보 테이블
export const PStInfoTable = styled.table`
  border: 1px solid #ddd;
  font-size: 14px;

  th, td {
    border: 1px solid #ddd;
    padding: 5px 10px;
  }

  th {
    background-color: #1a2136;
    color: #fff;
  }
`

// input 스타일
export const PPInput = styled.input`
  width: 200px;
  border: 1px solid #888;
  border-radius: 5px;
  padding: 8px;
`

// label 컨테이너
export const PLabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`

export const PLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
`

// 바코드 div
export const PBarCodeDiv = styled.div`
  position: relative;
  padding: 8px 3px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: bold;
  color: #000;
  overflow: visible;
`

export const BarCodeAction = styled.div`  
  position: fixed;
  z-index: 9999;
  background-color: #ffe458;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: bold;
  box-shadow: 0 8px 9px -4px rgba(0,0,0,0.3), 0 4px 18px 0 rgba(0,0,0,0.2);
  cursor: pointer;
  display: block;
`

// 재고 표시 스타일
export const StockItem = styled.div`
  margin-bottom: 5px;
  border-bottom: 1px dashed #eee;
  padding-bottom: 3px;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`

export const ColorName = styled.div`
  font-weight: bold;
  margin-bottom: 3px;
  color: #1a2136;
`

export const SizeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const SizeItem = styled.span`
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 12px;
  white-space: nowrap;
  
  b {
    color: #1a2136;
  }
  
  &.out-of-stock {
    background-color: #ffe6e6;
    
    b {
      color: #c40000;
    }
  }
`