import styled from 'vue3-styled-components';

// 사이드바
export const RSidebar = styled.div`
  width: 200px;
  min-height: calc(100vh - 20px);
  background-color: #1a2136;
  color: #fff;
  padding: 10px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
`;

export const RSidebarTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  padding: 0 20px 10px 20px;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #4ECB71;
`;

export const RSidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RSidebarMenuItem = styled.div`
  padding: 8px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  
  &:not(.active):hover {
    background-color: #fff;
    color: #1a2136;
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
`;

// 평가관리 상단 정보 영역
export const RTopInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  padding: 10px 0;
  margin-bottom: 10px;
  background-color: #f0f0f0;
  border-bottom: 2px solid #ddd;

  .title {
    margin: 10px 0;
    font-size: 24px;
    font-weight: bold;
  }

  .desc {
    margin: 10px 0;
    font-size: 16px;
    font-weight: bold;
  }
`;

// 버튼 영역 컨테이너
export const RBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-top: 10px;
  margin-bottom: 10px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: #fff;
    color: #1a2136;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;

    &:hover, &.active {
      background-color: #1a2136;
      color: #fff;
    }
  }
`;

// 평가 정보 영역
export const RInfo = styled.div`
  width: 100%;
  height: 600px;
  overflow-y: auto;
`

// 가이드 문구
export const RGuide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: #1a2136;
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0;
`;

// 평가 기준 테이블
export const RRoleTable = styled.table`
  border: 1px solid #ddd;
  margin-bottom: 30px;

  th, td {
    padding: 8px;
  }

  th {
    background-color: #1a2136;
    color: #fff;
  }

  td {
    border: 1px solid #ddd;
    text-align: left;
    line-height: 1.5;
  }

  i {
    font-size: 24px;
    text-align: center;
  }

  .new {
    padding: 5px 10px;
    margin-left: 10px;
    background-color: #4ECB71;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
  }
`;

// 분수
export const RFraction = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  vertical-align: middle;

  span {
    padding: 0 5px;
  }

  .numerator {
    border-bottom: 1px solid #000;
  }

  .denominator {
  }
`;

// 수식
export const RFormula = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 16px;
`

// 타이틀 컨테이너
export const RTitleContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 60px;
  width: 100%;
`

// 모달창 타이틀
export const RModalTitle = styled.div`
  font-size: 24px;
  font-weight: bold;

  padding: 10px 15px;
  border-bottom: 3px solid #4690ff;
`

// 이미지 컨테이너
export const RImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

export const RDetailImage = styled.img`
  max-width: 85%;
  max-height: 100%;
  object-fit: contain;
`

export const RNoImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #666;
  font-size: 18px;
`
