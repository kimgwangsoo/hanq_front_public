import styled from 'vue3-styled-components';
import { keyframes } from 'vue3-styled-components'
const fadeIn = keyframes`
 from {
    opacity: 0;
    transform: scale(0.9); /* Scale down from center */
  }
  to {
    opacity: 1;
    transform: scale(1); /* Scale up to normal size */
  }
`;
export const ModalOverlayDiv = styled.div` 
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const ModalDivArea = styled.div`
    background: white;
    border-radius: 8px;
    padding: 1em;
    position: relative;
    width: 95%;
    max-width: 95%;
    max-height: 95vh;
    display: flex;
    flex-direction: column;
    animation: ${fadeIn} 0.3s ease-out;

    @media (max-width: 768px) {
      padding: 3px;
      width: 95% !important;
    }
  `;

  export const ModalCloseBtn = styled.button`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -15px;
    right: -10px;
    width: 40px;
    height: 40px;
    background: #333;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.5em;
    z-index: 200;

    @media (max-width: 768px) {
      top: -10px;
      right: -5px;
      width: 35px;
      height: 35px;
    }
  `;

  export const ModalScrollArea = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
    &.scrollAreaBorder {
      border: 2px solid #1a2136;
    }
    /* 스크롤바 스타일링 */
    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    @media (max-width: 768px) {
      &.scrollAreaBorder {
        border: 1px solid #1a2136;
    }

    /* 스크롤바 스타일링 */
    &::-webkit-scrollbar {
      width: 3px;
    }
    
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #888;
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
    }
  `;

  export const ModalBtnHeightDiv = styled.div`
    height: 60px;
  `;

  export const ModalBtnDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;

    width: calc(100% - 2em);
    height: 60px;
    bottom: 0;

    background-color: white;

    &.spaceAround {
      justify-content: space-around;
    }
  `;

  export const ModalBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    border: none;
    border-radius: 5px;
    background-color: #4690ff;
    color: white;
    cursor: pointer;
    padding: 10px 20px;
    margin: 10px 5px;
    font-size: 16px;

    &.blue {
      background-color: #1a2136;
    }

    &.green {
      background-color: #306e48;
    }

    &.pastelGreenBg {
      background-color: #dff0d8;
      color: #306e48;
    }

    &.red {
      background-color: #c40000;
    }

    &.gray {
      background-color: #666;
    }

    &:hover {
      background-color: rgb(100, 100, 100, 0.5);
    }
  `;