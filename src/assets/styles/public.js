import styled from 'vue3-styled-components';
import { injectGlobal } from 'vue3-styled-components';

injectGlobal`
// @font-face {
//   font-family: 'Pretendard-Regular';
//   src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
//   font-weight: 400;
//   font-style: normal;
//   }

  body, input, textarea, button, select, a, .swal2-popup, .swal2-modal {
      font-family: sans-serif;
  }
  
  table, th, td {
    border-collapse: collapse;
    text-align: center;
  }
  body.swal2-toast-shown .swal2-container.swal2-top {
    top:50px;
  }
  input, select, textarea {
    &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  }

  .deskNone {
    display: none !important;

    @media (max-width: 768px) {
      display: block !important;
    }
  }
  .mobileNone {
    @media (max-width: 768px) {
      display: none !important;
    }
  }

  .borderNone {
      border: none !important;
  }
    
  .flex-div{
    width: 100%;
    display: flex;
    align-items: center;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-column-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

injectGlobal`
/* SweetAlert2 커스텀 스타일 */
.swal2-confirm {
  background-color: #3085d6;
  color: white;
}

.swal-container {
  z-index: 9999;
}

.swal-popup {
  padding: 20px;
  font-family: 'Noto Sans KR', sans-serif;
  height: 70vh !important;
  max-height: 70vh !important;
  display: flex !important;
  flex-direction: column !important;

  @media (max-width: 768px) {
    padding: 0;
  }
}

  .swal2-html-container input {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px;
    font-size: 14px;
    font-weight: normal;
  }

  .blueBtn {
    border: 1px solid #4285f4;
    background-color: #4285f4;
    color: #fff;
    border-radius: 5px;
    padding: 6px 8px;
    cursor: pointer;

    &:hover {
      background-color: #fff;
      color: #4285f4;
    }
  }

  .swalListContainer {
    max-height: 400px;
    overflow-y: auto;
    scrollbar-color: #ddd #f1f1f1;
    border: 1px solid #1a2136;

    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background: #ddd;
      border-radius: 4px;
    }
  }
  
  .swalListTable {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #1a2136;
    font-size: 15px;

    thead {
      position: sticky;
      top: 0;
      z-index: 1;
      background-color: #1a2136;
      box-shadow: inset 0 0 0 1000px #000;
    }

    tr {
      cursor: pointer;
      
      &.trHover {
        &:hover {
          background-color: #ddd;
        }
      }
    }

    th, td {
      padding: 6px;
      text-align: center;
      border: 1px solid #ddd;
    }

    th {
      border-bottom: 3px solid #ddd;
      background-color: #1a2136;
      color: #fff;
    }

    input {
      width: 90%;
      padding: 5px;
      border: 1px solid #ddd;
      font-size: 14px;
    }

    button {
      padding: 5px;
      min-width: 50px;
      border: none;
      border-radius: 5px;
      font-size: 14px;
      background-color: #ddd;
      cursor: pointer;

      &:hover {
        background-color: #1a2136;
        color: white;
      }
    }
  }

  .swalSelect {
    padding: 6px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;

injectGlobal`
  /* 공통 클래스 모음 */
  .marginLeft10 {
    margin-left: 10px !important;
  }

  .marginRight10 {
    margin-right: 10px !important;
  }

  .marginTop10 {
    margin-top: 10px;
  }

  .marginBottom10 {
    margin-bottom: 10px;
  }

  .width30 {
    width: 30% ;
  }

  .width50 {
    width: 50%;
  }

  .width60 {
    width: 60%;
  }

  .width80 {
    width: 80%;
  }

  .width90 {
    width: 90%;
  }

  .width100 {
    width: 100%;
  }

  .height40 {
    height: 40px;
  }
    
  .greenFont {
    color: #306e48;
  }

  .greenBg {
    background-color: #306e48;
    color: white;
  }
    
  .pastelGreenBg {
    background-color: #dff0d8;
  }

  .redFont {
    color: #c40000;
  } 

  .redBg {
    background-color: #c40000;
    color: white;
  }

  .pastelRedBg {
    background-color: #f2dede;
  }

  .blueFont {
    color: #4690ff;
  } 

  .blueBg {
    background-color: #4690ff;
    color: white;
  }

  .mainBlueBg {
    background-color: #1a2136;
    color: white;
  }

  .pastelBlueBg {
    background-color: #d9edf7;
  }

  .yellowFont {
    color: #ffa500;
  }

  .yellowBg {
    background-color: #ffa500;
    color: white;
  }

  .pastelYellowBg {
    background-color: #ffe458;
  }

  .grayFont { 
    color: #666;
  }

  .grayBg {
    background-color: #f2f2f2;
    color: #1a2136;
  }

  .darkGrayBg {
    background-color: #666;
    color: #fff;
  }

  .pastel {
    background: #f5f5f5;
  }

`;

// 가로 가운데 정렬
export const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// 가로 상위 정렬
export const FlexTopDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
  align-items: center;
    flex-direction: column;
  }
`;

// 세로 가운데 정렬
export const FlexColumnCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 세로 왼쪽 정렬
export const FlexColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

// 양쪽 정렬
export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 왼쪽 정렬
export const FlexLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

// 왼쪽 위쪽 정렬
export const FlexLeftTop = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

// 오른쪽 정렬
export const FlexRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

// 줄바꿈용 div
export const LineBreak = styled.div`
  width: 100%;
  height: 1px;
`

export const FontBold = styled.div`
  font-weight: bold;
`;

export const HanqBtn = FontBold.extend`
  box-shadow: 0 8px 9px -4px rgba(175, 156, 156, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
  padding: 7px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

// 버튼 기본 스타일
export const CommonBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  
  border-radius: 5px;
  border: none;
  box-shadow: 0 5px 5px -4px rgba(0,0,0,0.3), 0 4px 18px 0 rgba(0,0,0,0.2);

  height: 40px;
  line-height: 10px;
  margin: 0 2px;
  padding: 10px;
  cursor: pointer;

  font-size: 15px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 3px 8px;
    height: 30px;
  }
`;

// 남색 버튼
export const BlueBtn = CommonBtn.extend`
  background: #1a2136;
  border: 1px solid #1a2136;
  color: #fff;
  &:hover {
    background: #fff;
    border: 1px solid #1a2136;
    color: #1a2136;
  }

  &.active-btn {
    background: #fff;
    border: 1px solid #1a2136;
    color: #1a2136;
  }
`;

// 남색 선 버튼
export const BlueLineBtn = CommonBtn.extend`
  background: #fff;
  border: 1px solid #1a2136;
  box-shadow: none;

  color: #1a2136;
  &:hover {
    background: #1a2136;
    color: #fff;
  }
`;

// 흰색 버튼
export const WhiteBtn = CommonBtn.extend`
  background: #fff;
  border: 1px solid #fff;
  &:hover {
    background: #1a2136;
    border: 1px solid #1a2136;
    color: #fff;
  }

  &.active {
    background: #1a2136;
    border: 1px solid #1a2136;
    color: #fff;
  }
`;

// 녹색 버튼
export const GreenBtn = CommonBtn.extend`
  background: #306e48;
  border: 1px solid #306e48;
  color: #fff;
  &:hover {
    background: #fff;
    border: 1px solid #306e48;
    color: #306e48;
  }
`;

// 녹색 선버튼
export const GreenLineBtn = CommonBtn.extend`
  background: #fff;
  border: 1px solid #306e48;
  color: #306e48;
  box-shadow: none;
  &:hover {
    background: #306e48;
    border: 1px solid #306e48;
    color: #fff;
  }
`;

// 빨간색 버튼
export const RedBtn = CommonBtn.extend`
  background: #c40000;
  border: 1px solid #c40000;
  color: #fff;
  &:hover {
    background: #fff;
    border: 1px solid #c40000;
    color: #c40000;
  }
`;

// 주황색 버튼
export const OrangeBtn = CommonBtn.extend`
  background: #DD8F46;
  border: 1px solid #DD8F46;
  color: #fff;
  &:hover {
    background: #fff;
    border: 1px solid #DD8F46;
    color: #DD8F46;
  }
`;

// input 기본 스타일
export const CommonInput = styled.input`
  height: 35px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const DateInput = styled.input`
  padding: 0 8px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 30px;
    font-size: 12px;
  }
`

// label flex div
export const FlexLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

// 공통 헤더 타이틀 스타일
export const CommonTitleArea = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 0;
    margin-bottom: 10px;
`;

// 공통 헤더 타이틀 아이콘
export const CommonTitleIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #e8f5e8;
  border-radius: 8px;
  color: #306e48;
  
  .material-icons {
    font-size: 24px;
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 16px;

    .material-icons {
      font-size: 20px;
    }
  }
`;

// 공통 헤더 타이틀
export const CommonTitleDiv = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-size: 24px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

// 검색 영역
export const SearchArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 0;
    margin-bottom: 5px;
  }
`;

// 검색 입력창
export const SearchInput = styled.input`
  // padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 250px;
  height: 35px;
  margin-right: 8px;
  font-size: 16px;

  @media (max-width: 768px) {
    width: 150px
    font-size: 13px;
  }
`;

// 검색 버튼
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

// 데이터 테이블 컨테이너
export const TableContainer = styled.div`
  overflow-x: auto;
  border: 2px solid #1a2136;

  &.maxHeight600 {
    max-height: 600px;
  }

  &.maxHeight400 {
    max-height: 400px;
  }
`

// 데이터(목록) 테이블
export const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    position: sticky;
    top: 0;
    z-index: 1;

    &.blueTh {
      th {
        background: #1a2136;
        color: #fff;
      }
    }
  }

  th, td {
    padding: 8px;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background: #f8f9fa;
    font-weight: 600;
    color: #333;
    font-size: 14px;
    border-bottom: 2px solid #1a2136;
  }
  
  td {
    text-align: center;
    font-size: 14px;

    &.green {
      background: #DFF0D8;
    }

    &.red { 
      background: #F2DEDE;
    }

    &.blue {
      background: #D9EDF7;
    }
  }
  
  tr {
    &.yellow{
      background: #FCF8E3;
    }

    &.green{
      background: #DFF0D8;
    }

    &.red{
      background: #F2DEDE;
    }

    &.blue{
      background: #D9EDF7;
    }

    &:not(thead tr):hover {
      background: rgba(255, 255, 255, 0.1);
      border-top: 2px solid #1a2136;
      border-bottom: 2px solid #1a2136;
      cursor: pointer;
    }
  }

  &.font16 {
    th, td {
      font-size: 16px;
    }
  }
  
  &.blueTh th {
    position: sticky;
    top: 0;
    z-index: 1;
    background: #1a2136;
    border-top: 1px solid #1a2136;
    border-bottom: 1px solid #1a2136;
    border-left: 1px solid #f8f9fa;
    color: #fff;

    &:first-child {
      border-left: 1px solid #1a2136;
    }

    &:last-child {
      border-right: 1px solid #1a2136;
    }
  }

  @media (max-width: 768px) {
    th, td {
      font-size: 10px;
      padding: 5px 3px;
    }
  }
`

// 수급자 기본정보 테이블
export const ClientFormTable = styled.table`
  width: 70%;
  margin-bottom: 20px;

  &.tdLeft {
    td {
      text-align: left;
    }
  }

  &.tdPadding {
    td {
      padding: 5px;
    }
  }

  th {
    padding: 5px;
    border: 1px solid #ddd;
    width: 25%;
    background-color: #1a2136;
    color: white;
    font-size: 14px;
  }

  td {
    border: 1px solid #ddd;
  }

  button {
    background-color: #1a2136;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
    font-weight: bold;
    
    &:hover {
      background-color: #1a2136;
    }

    &.white {
      background-color: #fff;
      color: #1a2136;
      border: 1px solid #1a2136;

      &:hover {
        border: 1px solid #fff;
        background-color: #1a2136;
        color: #fff;
      }
    }
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    cursor: pointer;
    margin: 5px;
    font-size: 16px;
    font-weight: bold;
  }

  .borderNone {
    th, td {
      border: none;
    }
  }

  @media (max-width: 768px) {
    width: 100%;

    th {
      padding: 3px;
      border: 1px solid #ddd;
      min-width: 70px;
      background-color: #1a2136;
      color: white;
      font-size: 12px;
    }
  }
`;