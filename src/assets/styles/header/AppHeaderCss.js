import styled from 'vue3-styled-components';

// 헤더 컴포넌트
export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #1a2136;
  color: white;
  z-index: 999999998;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    height: 100%;
    width: 250px;
    left: -250px;
    right: auto;
    
    &.sidebar-open {
      left: 0;
    }
  }
`;

// 타이틀바 영역
export const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  background-color: #1a2136;
  -webkit-app-region: drag;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
`;

export const WindowControls = styled.div`
  display: flex;
  -webkit-app-region: no-drag;
`;

export const WindowControl = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &.close:hover {
    background-color: #e81123;
  }
`;

// 메인 네비게이션
export const MainNav = styled.nav`
  height: 50px;
//   overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 3px;
  }
  
  &::-webkit-scrollbar-track {
    background: #2c3e50;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #95a5a6;
    border-radius: 3px;
  }
  
  @media (max-width: 768px) {
    height: calc(100% - 30px);
    overflow-y: auto;
    padding-bottom: 80px; 
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 1rem;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0;
    height: auto;
  }
`;

export const MenuLeft = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    height: auto;
  }
`;

export const MenuRight = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: auto;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
    margin-top: 10px;
  }
`;

export const MenuItem = styled.a`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 15px;
  color: #ecf0f1;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.3s, color 0.3s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    cursor: pointer;
  }
  
  &.router-link-active {
    background-color: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    font-weight: bold;
    border-bottom: 3px solid #3498db;
  }
  
//   &.system-menu {
//     background-color: rgba(52, 152, 219, 0.2);
//   }

  @media (max-width: 768px) {
    width: 100%;
    height: 40px;
    font-size: 15px;
    padding: 5px 0 5px 25px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    
    &.router-link-active {
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      border-left: 3px solid #3498db;
    }
  }
`;

// 기타 스타일
export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1.5rem;
  height: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Logo = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
`;

export const Username = styled.span`
  margin-right: 1rem;
  font-weight: 500;
`;

export const LogoutButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

// 하단 네비게이션 바
export const BottomNavigation = styled.nav`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background-color: #1a2136;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    z-index: 999;
    justify-content: space-around;
    align-items: center;
  }
`;

export const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: #ecf0f1;
  padding: 5px;
  flex: 1;
  cursor: pointer;
  
  &:hover {
    color: #ffffff;
  }
  
  &.active {
    color: #3498db;
  }

  .material-icons {
    font-size: 20px;
    margin-bottom: 2px;
  }
`;

export const NavButtonIcon = styled.div`
  font-size: 25px;
  margin-bottom: 2px;
`;

export const NavButtonText = styled.div`
  margin-top: 2px;
  font-size: 15px;
`;

// 메뉴 토글 버튼
export const MenuToggle = styled.button`
  display: none;
  
  @media (max-width: 768px) {
    position: fixed;
    display: flex;
    top: 5px;
    left: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #1a2136;
    border: 1px solid #fff;
    color: white;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    z-index: 999999999;
  }
`;

// 오버레이
export const Overlay = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    
    &.active {
      opacity: 1;
      pointer-events: auto;
    }
  }
`;