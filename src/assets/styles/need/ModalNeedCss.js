import styled from 'vue3-styled-components';

export const TitleTable = styled.table`
  width: 100%;
  font-size: 15px;
  margin-bottom: 10px;

  th, td {
    padding: 6px;
    text-align: center;

    &.title {
      font-size: 25px;
      font-weight: bold;
    }
  }

  td {
    text-align: left;

    &.right {
      text-align: right;
    }
  }

  input {
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 5px;
    font-size: 14px;
    margin-right: 10px;
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
    
    th, td {
      padding: 4px;
      
      &.title {
        font-size: 18px;
      }
    }
    
    input {
      width: 100%;
      font-size: 12px;
      padding: 3px;
      margin-right: 0;
    }
  }
`;

export const NeedTable = styled.table`
  width: 100%;
  border: 1px solid #ddd;
  font-size: 15px;

  th, td {
    border: 1px solid #ddd;
    padding: 6px;
  }

  th {
    background-color: #eee;
    color: #1a2136;
    font-weight: bold;
  }

  textarea {
    width: 90% !important;
    height: 100px;
    border: 1px solid #ddd;
    padding: 10px;
    font-size: 14px;
  }

  input {
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: 5px;
    font-size: 14px;
    margin-right: 10px;
  }

  label {
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-right: 10px;
  }
  
  @media (max-width: 768px) {
    textarea {
      height: 80px;
      padding: 5px;
      font-size: 12px;
    }
    
    input {
      padding: 3px;
      font-size: 12px;
      margin-right: 5px;
      width: calc(100% - 10px);
    }
    
    label {
      font-size: 12px;
      margin-right: 5px;
      display: inline-block;
      margin-bottom: 5px;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const ActionButton = styled.button`
  padding: 10px 20px;
  background-color:rgb(255, 255, 255);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
  
  @media (max-width: 768px) {
    padding: 8px 10px;
    font-size: 12px;
    margin-right: 5px;
    white-space: nowrap;
  }
`;