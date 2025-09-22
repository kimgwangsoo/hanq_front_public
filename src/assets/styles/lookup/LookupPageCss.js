import styled from 'vue3-styled-components';

// 메인 컨테이너
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 100px;

  @media (max-width: 768px) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

// 전체 담당자
export const OptionCheck = styled.label`
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #1a2136;
  cursor: pointer;
  margin-right: 10px;

  input[type="checkbox"] {
    margin-left: 5px;
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    font-size: 13px;

    input[type="checkbox"] {
      width: 30px;
      height: 30px;
    }
  }
`;

// 조회 회수 div
export const LookupCount = styled.div`
  border: 1px solid #1a2136;
  border-radius: 5px;
  text-align: center;
  padding: 5px 40px;
  margin-left: 10px;

  @media (max-width: 768px) {
    padding: 5px 20px;
    margin-left: 5px;
    font-size: 15px;
  }
`;

export const ClientUpButton = styled.span`
  width: 100px;
  padding: 10px;
  border: 1px solid #000000;
  border-radius: 5px;
  background: #ffffff;
  font-weight: bold;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  
  &:hover {
    border: 1px solid #2e89ff;
    background: #dcffff;
  }
`;

export const CountSpan = styled.span`
  font-weight: bold;
  color: #030000;
`;

// 테이블 스타일
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
//   border: 2px solid #000000;
  
  tr {
    height: 40px;
  }
  
  tr:nth-child(1) {
    border: 2px solid #000000;
    background: #1a2136;
    color: #ffffff;
    font-size: 15px;
    font-weight: bold;
  }
  
  > tbody > tr > td {
    padding: 6px;
    border: 1px solid #bebebe;
    text-align: center;
  }
`;

export const TableHeader = styled.tr`
  border: 2px solid #000000;
  background: #1a2136;
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
  
  td {
    padding: 6px;
  }
`;

export const TableRow = styled.tr`
  height: 40px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border: 2px solid #000000;
    opacity: 0.5;
  }
  
  &.success {
    background-color: #dff0d8;
  }
  
  &.info {
    background-color: #d9edf7;
  }
  
  &.warning {
    background-color: #fcf8e3;
  }
  
  &.danger {
    background-color: #f2dede;
  }
`;

// 모달 스타일
export const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  display: none;
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(0,0,0,0.3);
  z-index: 1000;
`;

export const ModalContent = styled.div`
  max-width: 80%;
  height: 700px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 2px 6px rgba(0,0,0,1);
  border-radius: 3px;
  background: #fff;
  
  &.popup-inner {
    max-width: 500px;
    height: 600px;
  }
  
  @media (max-width: 1400px) {
    height: 600px;
  }
  
  @media (max-width: 600px) {
    max-width: 350px;
    height: 500px;
  }
`;

export const ModalCloseButton = styled.a`
  width: 30px;
  height: 30px;
  padding-top: 4px;
  display: inline-block;
  position: absolute;
  top: 0px;
  right: 0px;
  transition: ease 0.25s all;
  transform: translate(50%, -50%);
  border-radius: 1000px;
  background: rgba(0,0,0,0.8);
  font-family: Arial, Sans-Serif;
  font-size: 20px;
  text-align: center;
  line-height: 100%;
  color: #fff;
  text-decoration: none;
  
  &:hover {
    transform: translate(50%, -50%) rotate(180deg);
    background: rgba(0,0,0,1);
    text-decoration: none;
  }
`;

export const IframeContainer = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

// 가이드 스타일
export const GuideButton = styled.div`
  cursor: pointer;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  font-weight: bold;
  align-self: flex-start;
  
  &:hover {
    background: #e9ecef;
  }
`;

// 페이징 스타일
export const PagingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PagingNumber = styled.a`
  border: 1px solid #ffffff;
  padding: 5px;
  border-radius: 4px;
  background: #ffffff;
  margin: 0 3px;
  cursor: pointer;
  
  &.active {
    background: #000000;
    color: #ffffff;
  }
`;

// 반응형 스타일
export const MobileHidden = styled.td`
  @media (max-width: 600px) {
    display: none;
  }
`;

// 배경 효과
export const BackgroundWrapper = styled.div`
  background: #f1f1f1;
  background: linear-gradient(to top right, #fdfdfd 0%, #ffffff 100%);
  position: absolute;
  top: 40%;
  left: 0;
  width: 100%;
  height: 800px;
  margin-top: -600px;
  overflow: hidden;
  color: white;
  z-index: -999;
`;

export const BubblesList = styled.ul`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const Bubble = styled.li`
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 33, 104, 0.15);
  bottom: -160px;
  animation: square 25s infinite;
  transition-timing-function: linear;
  
  &:nth-child(1) {
    left: 10%;
  }
  
  &:nth-child(2) {
    left: 20%;
    width: 80px;
    height: 80px;
    animation-delay: 2s;
    animation-duration: 17s;
  }
  
  &:nth-child(3) {
    left: 25%;
    animation-delay: 4s;
  }
  
  &:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    animation-duration: 22s;
    background-color: rgba(0, 0, 0, 0.25);
  }
  
  &:nth-child(5) {
    left: 70%;
  }
  
  &:nth-child(6) {
    left: 80%;
    width: 120px;
    height: 120px;
    animation-delay: 3s;
    background-color: rgba(0, 0, 0, 0.2);
  }
  
  &:nth-child(7) {
    left: 32%;
    width: 160px;
    height: 160px;
    animation-delay: 7s;
  }
  
  &:nth-child(8) {
    left: 55%;
    width: 20px;
    height: 20px;
    animation-delay: 15s;
    animation-duration: 40s;
  }
  
  &:nth-child(9) {
    left: 25%;
    width: 10px;
    height: 10px;
    animation-delay: 2s;
    animation-duration: 40s;
    background-color: rgba(0, 0, 0, 0.3);
  }
  
  &:nth-child(10) {
    left: 90%;
    width: 160px;
    height: 160px;
    animation-delay: 11s;
  }
  
  @keyframes square {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-800px) rotate(600deg);
    }
  }
`;