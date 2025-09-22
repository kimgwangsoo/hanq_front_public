import styled, { injectGlobal }  from 'vue3-styled-components';

injectGlobal`
  @media print {
    @page {
      size: A4;
      margin: 0mm;
    }

    body * {
      position: static !important;
      visibility: hidden !important;
    }

    #print-root, #print-root * {
      visibility: visible !important;
    }

    #print-root {
      position: absolute !important;  /* 상단에 붙이기 위해 absolute로 변경 */
      left: 0 !important;
      top: 0 !important;
      width: 100% !important;
      height: auto !important;
      margin: 0 !important;
      padding: 0 !important;
      background: #fff !important;
      max-height: 1123px !important; /* A4 높이(297mm) 기준 - 1페이지만 출력 */
      overflow: hidden !important; /* 넘치는 부분 숨김 */

      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;   /* 표준 */
      color-adjust: exact !important;         /* 레거시 */
    }

    #print-root .${'LookupTitle'} {
      background: #d9d9d9 !important;
    }
    #print-root .${'StatusTitle'} {
      background: #1a2136 !important;
    }
    #print-root .${'StatusTitle'}.green {
      background: #599273 !important;
    }

    .ModalOverlayDiv, .ModalDivArea, .ModalBtnHeightDiv, .ModalBtnDiv, .ModalCloseBtn {
      display: none !important;
      visibility: hidden !important;
    }
    
    /* 두번째 페이지 방지 */
    html, body {
      height: 100% !important;
      overflow: hidden !important;
      margin: 0 !important;
      padding: 0 !important;
    }
  }
`
// 상단부분
export const LPrintTopDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 15px;
  background-color: #fff;
`;

// 정보 패널
export const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.06);
  margin: 0 5px 15px 5px;
  
  @media (max-width: 768px) {
    width: 100%;
  }
  @media print {
    margin: 0 2px 10px 2px; /* Smaller margin for print */
    padding: 10px;
    box-shadow: none;
    border: 1px solid #eee; /* Light border for definition */
    flex: 1; /* Allow panels to grow */
  }
`;

export const LookupTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 120px;
  margin-right: 10px;
  border-radius: 5px;
  background: #d9d9d9;
  font-weight: bold;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
 
  @media (max-width: 768px) {
    width: 120px;
    height: 35px;
    font-size: 14px;
  }
  @media print {
    width: 100px; /* Smaller width for print */
    height: 30px;
    font-size: 12px;
    margin-right: 5px;
    box-shadow: none;
  }
`;

export const LookupBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    width: 190px;
    height: 35px;
    font-size: 14px;
  }
  @media print {
    width: 130px; 
    height: 30px;
    font-size: 15px;
    box-shadow: none;
  }
`;

// 적용구간 스타일
export const ApplySection = styled.div`
  width: 100%;
  margin: 15px 0;
  padding: 12px;
  background: #d9d9d9;
  border-radius: 8px;
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  color: #1a2136;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin: 12px 0;
    padding: 10px;
  }
  @media print {
    margin: 10px 0; 
    padding: 8px;
    font-size: 16px;
    border-radius: 5px;
  }
`;

// 품목 섹션 컨테이너
export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
  @media print {
    margin-bottom: 0px;
    page-break-inside: avoid;
  }
`;

// 구매 관련 품목 컨테이너
export const PurchaseItemsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
  }
  @media print {
    flex-direction: row; 
    gap: 5px;
    margin-bottom: 5px;
  }
`;

// 대여 관련 품목 컨테이너
export const RentItemsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
  }
  @media print {
    flex-direction: row;
    gap: 5px;
  }
`;

// 각 품목 섹션
export const ItemSection = styled.div`
  flex: 1;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 8px;
  }
  @media print {
    box-shadow: none;
    margin-bottom: 5px;
    padding: 8px;
  }
`;

// 품목 섹션 제목
export const ItemTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  padding: 10px;
  margin-bottom: 12px;
  color: white;
  border-radius: 6px;
  text-align: center;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
    margin-bottom: 10px;
  }
  @media print {
    background:${props => props.greenBg ? 'green' : props.redBg ? 'red' : ''} ; 
    box-shadow: none;
    padding: 6px;
    font-size: 18px;
    margin-bottom: 8px;
  }
`;

// 품목 내용
export const ItemContent = styled.div`
  padding: 10px;
  white-space: pre-line;
  font-size: 18px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    min-height: 100px;
    font-size: 14px;
    padding: 8px;
  }
  @media print {
    min-height: unset;
    font-size: 16px;
    padding: 8px;
    line-height: 1.4;
  }
`;

// 로고 및 상단 정보 스타일
export const LogoSection = styled.div`
  img {
    width: 230px;
  }
  @media print {
    img {
      width: 230px;
    }
  }
`;

export const ClientInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 0 10px;
  line-height: 1.6;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  gap: 10px;
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 12px;
    margin: 0 5px;
  }
  @media print {
    font-size: 14px;
    padding: 10px;
    margin: 0 5px;
  }
`;

export const BusinessCardSection = styled.div`
  img {
    width: 230px;
  }
  // text-align: center;
  // padding: 12px;
  // font-size: 16px;
  // border: 1px dashed #aaa;
  // border-radius: 8px;
  // margin: 10px 0;
  // background-color: #f9f9f9;
  // box-shadow: inset 0 0 5px rgba(0,0,0,0.05);
  
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px;
    img {
      width: 100px;
    }
  }
  @media print {
    font-size: 12px;
    padding: 8px;
    margin: 5px 0;
    border: 1px solid #eee; /* Less prominent border for print */
    background-color: #fff; /* White background for print */
    box-shadow: none;
    img {
      width: 230px;
    }
  }
`;

// 서명 영역 스타일
export const SignatureArea = styled.div`
  margin-top: 30px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
  .signature-date {
    margin-bottom: 20px;
    font-size: 16px;
  }
  
  .signature-line {
    display: flex;
    align-items: center;
    
    span {
      margin-right: 10px;
      font-size: 16px;
    }
    
    .line {
      width: 200px;
      height: 1px;
      border-bottom: 1px solid #000;
      margin-top: 5px;
    }
  }
  
  @media print {
    margin-top: 40px;
  }
  
  @media (max-width: 768px) {
    padding: 10px;
    
    .signature-date {
      font-size: 14px;
    }
    
    .signature-line span {
      font-size: 14px;
    }
  }
`;

export const LPrintFlexDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
  @media print {
    flex-direction: row; /* Ensure horizontal layout for print */
    flex-wrap: wrap; /* Allow items to wrap */
    justify-content: space-around; /* Distribute items evenly */
  }
`;