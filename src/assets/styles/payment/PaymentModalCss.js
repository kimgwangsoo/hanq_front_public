import styled from 'vue3-styled-components';

export const ModalPaymentContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  max-width: 500px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
`;

const baseField = `
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

export const PaymentInput = styled.input`${baseField}`;
export const SelectField = styled.select`${baseField}`;
export const TextareaField = styled.textarea`
  ${baseField}
  height: 100px;
  resize: vertical;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const baseButton = `
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
`;

export const SaveButton = styled.button`
  ${baseButton}
  background-color: #4CAF50;
  color: white;
`;

export const CancelButton = styled.button`
  ${baseButton}
  background-color: #f44336;
  color: white;
`;

