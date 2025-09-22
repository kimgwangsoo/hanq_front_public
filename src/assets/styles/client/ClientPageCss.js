import styled from 'vue3-styled-components'

// Header Components
export const HeaderButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  
  &:hover {
    background: #e9ecef;
    border-color: #adb5bd;
  }
  
  .material-icons {
    font-size: 16px;
  }
`
// Header Info
export const InfoText = styled.span`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`

// 구별 div
export const InfoDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2px;
  height: 35px;
  line-height: 10px;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 15px;
  font-weight: bold;

  &.black{
    border: 1px solid #000;
  }

  &.green{
    border: 1px solid #306e48;
  }

  &.blue{
    border: 1px solid #4690ff;
  }

  &.yellow{
    border: 1px solid #ffa500;
  }

  &.red{
    border: 1px solid #c40000;
  }
`

// Tab Components
export const TabButton = styled.button`
  padding: 10px 16px;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  font-size: 14px;
  color: #666;
  transition: all 0.2s;
  
  &.active {
    color: #007bff;
    border-bottom-color: #007bff;
    font-weight: 500;
  }
  
  &:hover:not(.active) {
    color: #333;
    background: #f8f9fa;
  }
`

// Table Components


export const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  
  ${props => {
    switch (props.status) {
      case 'active':
        return `
          background: #e8f5e8;
          color: #388e3c;
        `
      case 'inactive':
        return `
          background: #fff3e0;
          color: #f57c00;
        `
      default:
        return `
          background: #f5f5f5;
          color: #666;
        `
    }
  }}
`

export const ActionButton = styled.button`
  padding: 6px 12px;
  margin-right: 6px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
  
  &:hover {
    background: #f8f9fa;
    border-color: #adb5bd;
  }
  
  &:last-child {
    margin-right: 0;
  }
`

// Action Area
export const ActionArea = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

// Modal Components
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
  
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }
`

export const ModalBody = styled.div`
  padding: 20px;
  max-height: 60vh;
  overflow-y: auto;
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #eee;
`

export const SearchForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const ClientForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  
  label {
    font-weight: 500;
    color: #333;
    font-size: 14px;
  }
  
  input, select, textarea {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    
    &:focus {
      outline: none;
      border-color: #007bff;
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 60px;
  }
  
  span {
    color: #666;
    margin: 0 8px;
  }
`

export const Button = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  
  &.primary {
    background: #007bff;
    color: white;
    border-color: #007bff;
    
    &:hover {
      background: #0056b3;
      border-color: #0056b3;
    }
  }
  
  &:not(.primary) {
    background: white;
    color: #333;
    
    &:hover {
      background: #f8f9fa;
    }
  }
`

// Detail Info Components
export const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const InfoRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`

export const InfoLabel = styled.span`
  min-width: 100px;
  font-weight: 500;
  color: #333;
  font-size: 14px;
`

export const InfoValue = styled.span`
  flex: 1;
  color: #555;
  font-size: 14px;
  word-break: break-word;
` 