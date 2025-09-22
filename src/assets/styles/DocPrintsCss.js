import styled from 'vue3-styled-components';

export const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ModalHeader = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    margin: 0;
    font-size: 1.5rem;
  }
  
  h3 {
    margin: 10px 0;
    font-size: 1.2rem;
    color: #333;
  }
`;

export const PrintSelect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const CheckboxTypeBtn = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 15px;
  margin: 0px 0px 10px 0px;
  background-color:rgb(255, 255, 255);
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 8px 9px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: #f0f0f0;
  }
  &.active {
    background-color: #333;
    color: white;
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

export const CheckboxTypeContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const CheckboxItemContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 95%;
  justify-content: center;
  align-items: center;
`;
export const CheckboxItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 100%;
  input[type="checkbox"] {
    cursor: pointer;
    width: 25px;
    height: 25px;
  }
  
  label {
    cursor: pointer;
    font-size: 0.9rem;
  }
`;

export const DocPrintsArea = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const DocPrintsBtnArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  gap: 10px;
  width:18%;
`;

export const DocPrintsBtnGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 10px;
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
    margin-bottom: 0;
  }
`;

export const DocPrintsBtn = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 15px;
  background-color:rgb(255, 255, 255);
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 8px 9px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const PrintSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const PrintSettingsTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: #333;
`;

export const PrintSettingsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PrintSettingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;


export const PreviewContainer = styled.div`
  flex: 1;
  overflow-y: scroll;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 490px;
`;

export const PreviewPageDiv = styled.div`
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 210mm;
  min-height: 297mm;
  padding: 20px;
`;

export const FixedFooter = styled.div`
  position: sticky;
  bottom: -10px;
  left: 0;
  right: 0;
  background-color: white;
  z-index: 9999;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  padding: 15px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FooterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 15px;
  background-color: #1a2136;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
  
  &:hover {
    background-color: #2a3146;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
