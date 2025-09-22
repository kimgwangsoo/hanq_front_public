import styled from 'vue3-styled-components';

// 기본 컨테이너 및 레이아웃 관련 스타일
export const MainLookupContainer = styled.div`
  display: flex;
  margin-top: 40px;
  margin-right: 5px;
  margin-left: 5px;
  font-weight: bold;
  text-align: center;
  
  @media (max-width: 768px) {
    margin-top: 30px;
    margin-bottom: 70px;
    margin-right: 2px;
    margin-left: 2px;
  }
`;

export const Loader = styled.div`
  display: none;
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  @keyframes spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

// 유틸리티 스타일 컴포넌트
export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexStart = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FlexColumnCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FlexColumnStart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width:100%;
  height: 100%;
  padding-bottom: 10px;
  
  @media (max-width: 768px) {
    width: 95%;
    margin-top: 15px;
  }
`;

export const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 9px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
  cursor: pointer;
  background: #fff;
  color: #000;
  
  &:hover {
    background: #fff;
    border: 1px solid #CC414D;
    border-radius: 2px;
    box-shadow: 1px 1px 1px 1px #CC414D;
    color: #000;
  }
`;

// 상단 영역
export const MainTop = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column
  width: 50%;
  height: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

export const MainTopLeft = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 95%;
    flex-direction: column;
    align-items: center;
  }
`;

export const MainLookupTitle = styled.div`
  padding: 5px;
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  background: #1a2136;
  border-radius: 5px;
  color: #fff;
`;

export const SearchSection = styled.div`
  min-width: 45%;
  max-width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 95%;
    max-width: 100%;
    margin-bottom: 15px;
  }
`;

export const GuideShow = styled.div`
  cursor: pointer;
`;

export const PrintBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 30px;
  background: #333;
  box-shadow: 0 8px 1px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
  color: #fff;
  border-radius: 5px;
  margin: 10px;
  font-size: 16px;
  
  &:hover {
    background: #fff;
    color: #000;
    cursor: pointer;
  }
`;

export const QuickSearch = styled.div`
  margin: 0px 0px 5px 0px;
  display: flex;
  justify-content: space-between;
`;

export const QuickSearchInput = styled.input`
  width: 50%;
  height: 35px;
  font-size: 18px;
  text-align: center;
  border-radius: 5px;
  border: none;
  background: #d9d9d9;
`;

export const QuickSearchBtn = styled.div`
  width: 60px;
  height: 35px;
  box-shadow: 0 8px 1px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
  background: #333;
  border-radius: 5px;
  color: #fff;
  line-height: 35px;
  cursor: pointer;
  
  &:hover {
    background: #fff;
    color: #000;
  }
`;

export const DateSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DateInput = styled.div`
  margin: 5px;
  width: 100%;
  
  input {
    width: 105%;
    height: 30px;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    border-radius: 5px;
    border: none;
    background: #d9d9d9;
    
    @media (max-width: 768px) {
      font-size: 16px;
      height: 28px;
    }
  }
`;

export const InfoSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InfoInput = styled.div`
  width: 65%;
  
  input {
    width: 100%;
    height: 40px;
    margin-top: 10px;
    font-size: 18px;
    text-align: center;
    border-radius: 5px;
    border: none;
    background: #d9d9d9;
    
    @media (max-width: 768px) {
      font-size: 16px;
      height: 35px;
    }
  }
  
  @media (max-width: 768px) {
  }
`;

export const InfoButton = styled.div`
  width: 30%;
  position: relative;
`;

export const InfoBtn = styled.div`
  width: 100%;
  
  div {
    width: 85%;
    height: 75px;
    margin-top: 10px;
    background: #414141;
    font-weight: bold;
    color: #fff;
    border-radius: 5px;
    
    @media (max-width: 768px) {
      width: 80%;
      height: 60px;
      font-size: 14px;
    }
  }
`;

export const InfoBtn2 = styled.div`
  z-index: -1;
  width: 100%;
  display: none;
  top: auto;
  
  div {
    width: 100%;
    height: 90px;
    margin-top: 10px;
    background: #414141;
    font-weight: bold;
    color: #fff;
  }
`;

export const ToolSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ToolButton = styled.div`
  width: 100%;
  
  div {
    width: 98%;
    margin-top: 10px;
  }
`;

export const ToolBrowser = styled.div`
  width: 100%;
  
  div {
    font-size: 18px;
    font-weight: bold;
    background: #eab7b7;
    
    img {
      width: 12%;
      padding-right: 10px;
    }
  }
`;

export const ToolClientUp = styled.div`
  width: 100%;
  
  div {
    font-size: 18px;
    font-weight: bold;
    background: #c7e4ff;
  }

  @media (max-width: 768px) {
    div {
      font-size: 16px;
    }
  }
`;

// 정보 패널
export const InfoPanel = styled.div`
  min-width: 45%;
  background: #fff;
  margin-left: 15px;
  font-size: 18px;
  border-radius: 10px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  > div {
    margin-top: 20px;
  }
  
  > div > div {
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 10px;
    margin-bottom: 2px;
    font-size: 16px;

    > div {
      margin-top: 10px;
    }
  }
`;

export const InfoBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const LookupTitle = styled.div`
  background: #d9d9d9;
  color: #000;
  height: 40px;
  width: 120px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 120px;
    height: 35px;
    font-size: 14px;
  }
`;

export const LookupBox = styled.div`
  width: 150px;
  height: 40px;
  box-shadow: 0 8px 1px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 190px;
    height: 35px;
    font-size: 14px;
  }
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

// 제품 정보 영역
export const ProductSection = styled.div`
  background: #fff;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > div {
    width: 100%;
    display: flex;
    justify-content: center;
    
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
  }
  
  > div > div {
    width: 100%;
    margin: 5px;
  }
`;

export const ProductInfo = styled.div`
  height: 30px;
  font-size: 15px;
  display: flex;
  justify-content: space-between;
`;

export const ProductCount = styled.div`
  font-size: 20px;
  padding-left: 3px;
  padding-right: 3px;
`;

export const ProductBox = styled.div`
  width: 100%;
  height: 73px;
  box-shadow: 0 8px 1px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  font-size: 16px;
  overflow-y: scroll;
`;

export const ProductItem = styled.div`
  padding-bottom: 3px;
`;

// 하단 영역
export const MainBottom = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const StatusSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 97%;
    flex-direction: column;
    align-items: center;
  }
`;

export const StatusLeftColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  > div {
    width: 93%;
    border-radius: 5px;
  }
`;

export const StatusRightColumn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  > div {
    width: 93%;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    padding-bottom: 30px;
  }
`;

export const StatusTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 5px;
  background: ${props => props.green ? '#599273' : '#1a2136'};
  color: #fff;
  font-size: 18px;
  &.green{
    background: #599273;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    height: 35px;
    font-size: 16px;
    margin-bottom: 5px;
  }
`;

export const StatusBox = styled.div`
  box-shadow: 0 8px 1px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: #fff;
  font-size: 18px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: ${props => props.marginBottom ? '5px' : '0'};
`;

export const StatusBoxBuy = styled(StatusBox)`
  height: 270px;

  @media (max-width: 768px) {
    margin-top: -5px;
    margin-bottom: 5px;
  }
`;

export const StatusBoxBuyNot = styled(StatusBox)`
  height: 210px;

  @media (max-width: 768px) {
    margin-top: -5px;
    margin-bottom: 5px;
  }
`;

export const StatusBoxRent = styled(StatusBox)`
  height: 75px;

  @media (max-width: 768px) {
    margin-top: -5px;
    margin-bottom: 5px;
  }
`;

export const StatusBoxRentNot = styled(StatusBox)`
  height: 135px;

  @media (max-width: 768px) {
    margin-top: -5px;
    margin-bottom: 5px;
  }
`;

// 전체 이력 영역
export const HistorySection = styled.div`
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    width: 95%;
    margin-top: 10px;
  }
`;

export const HistoryRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  
  > div {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    
    > div {
      width: 95%;
      margin-bottom: 10px;
    }
  }
`;

export const TotalDate = styled.div`
  width: 97%;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  height: 40px;
  border-radius: 5px;
  background: ${props => props.active ? '#599273' : '#a8a8a8'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TotalBox = styled.div`
  width: 97%;
  height: 175px;
  box-shadow: 0 8px 1px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow-y: scroll;
  div{
    font-size:14px;
  }
`;

export const TotalItem = styled.div`
  padding-bottom: 3px;
`;

// 팝업 및 가이드
export const Popup = styled.div`
  width: 100%;
  height: 100%;
  display: none;
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999;
`;

export const PopupInner = styled.div`
  max-width: 900px;
  height: 880px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 1);
  border-radius: 8px;
  background: #fff;
  
  @media (max-width: 1650px) {
    height: 600px;
  }
  
  @media (max-width: 768px) {
    max-width: 95%;
    height: 80vh;
    overflow-y: auto;
  }
`;

export const PopupClose = styled.a`
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
  background: rgba(0, 0, 0, 0.8);
  font-family: Arial, Sans-Serif;
  font-size: 20px;
  text-align: center;
  line-height: 100%;
  color: #fff;
  
  &:hover {
    transform: translate(50%, -50%) rotate(180deg);
    background: rgba(0, 0, 0, 1);
    text-decoration: none;
  }
`;

export const Guide = styled.div`
  width: 100%;
  height: 100%;
  display: none;
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
`;

export const GuideInner = styled.div`
  max-width: 900px;
  height: 880px;
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 1);
  border-radius: 8px;
  background: #fff;
  
  @media (max-width: 768px) {
    max-width: 95%;
    height: 80vh;
    overflow-y: auto;
  }
`;

export const GuideClose = styled.a`
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
  background: rgba(0, 0, 0, 0.8);
  font-family: Arial, Sans-Serif;
  font-size: 20px;
  text-align: center;
  line-height: 100%;
  color: #fff;
  
  &:hover {
    transform: translate(50%, -50%) rotate(180deg);
    background: rgba(0, 0, 0, 1);
    text-decoration: none;
  }
`;

export const ClientupIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;