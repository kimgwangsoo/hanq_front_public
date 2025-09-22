import styled from 'vue3-styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

export const InfoRow = styled.div`
  display: flex;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  margin-bottom: 15px;
`;

export const InfoColumn = styled.div`
  width: 50%;
  ${props => props.withBorder && 'border-right: 1px solid #e0e0e0;'}
  ${props => props.height && `height: ${props.height};`}
  transition: all 0.3s ease;
`;

export const SectionHeader = styled.div`
  border-bottom: 1px solid #e0e0e0;
  background-color: #1a2136;
  color: white;
  padding: 3px 15px;
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  text-align: center;
`;

export const SectionContent = styled.div`
  padding: 12px 15px;
  text-align: left;
  background-color: #ffffff;

  @media (max-width: 768px) {
    padding: 8px 6px;
  }
`;

export const InfoText = styled.p`
  margin: 8px 0;
  line-height: 1.6;
  color: #333;
  font-size: 16px;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

export const FlexGroup = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
  
  span {
    font-size: 17px;
    color: #333;
  }
  
  strong {
    color: #1a2136;
  }

  @media (max-width: 768px) {
    gap: 10px;
    span {
      font-size: 14px;
    }
  }
`;

export const ActionButton = styled.button`
  background-color: #1a2136;
  color: white;
  padding: 7px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  margin: 0 3px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &.register-payment {
    padding: 10px 16px;
    font-weight: bold;
    background-color: #2c3e50;
  }

  &:hover {
    background-color: #2a3146;
    box-shadow: 0 3px 6px rgba(0,0,0,0.15);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  @media (max-width: 768px) {
    padding: 5px 10px;
    margin: 3px 3px;
  }
`;

export const CISTable = styled.table`
  width: 100%;
  box-shadow: 0 2px 5px rgba(0,0,0,0.08);
  border-radius: 6px;
  overflow: hidden;
  font-size: 13px;

  thead {
    tr {
      background-color: #1a2136;
      color: #fff;
    }
  }

  th {
    padding: 10px 12px;
    border: 1px solid #e0e0e0;
    font-weight: 600;
    text-align: center;
    white-space: nowrap;
  }

  td {
    padding: 8px 12px;
    border: 1px solid #e0e0e0;
    text-align: center;
    vertical-align: middle;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #f9f9f9;
    }
  }

  @media (max-width: 768px) {
    th, td {
      padding: 5px 10px;
      font-size: 12px;
    }
  }
`;

export const OrderSection = styled.div`
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
`;

export const NeedSection = styled.div`
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  margin-bottom: 15px;
`;

export const RentSection = styled.div`
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  margin-bottom: 15px;
`;