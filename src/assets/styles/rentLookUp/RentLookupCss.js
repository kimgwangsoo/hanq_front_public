import styled from 'vue3-styled-components'

// Title Area Components
export const TitleArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`

export const TitleIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #e3f2fd;
  border-radius: 8px;
  color: #1976d2;
  
  .material-icons {
    font-size: 24px;
  }
`

export const TitleText = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
`

// Search Area Components
export const SearchArea = styled.div`
  display: flex;
  // gap: 10px;
  align-items: center;
`

export const SearchInput = styled.input`
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  width: 250px;
  height: 35px;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`

export const SearchButton = styled.button`
  box-shadow: 0 8px 9px -4px rgba(0,0,0,0.3), 0 4px 18px 0 rgba(0,0,0,0.2);
  border-radius: 5px;
  border: none;
  background: #fff;
  color: #000;
  width: 60px;
  margin-left: 5px;
  height: 40px;
  &:hover{
    cursor: pointer;
    background: #1a2136;
    color: #fff;
  }
`

// Filter Components
export const FilterContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
`

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  label {
    font-weight: 500;
    color: #555;
    white-space: nowrap;
  }
  
  span {
    color: #666;
  }
`

export const DateInput = styled.input`
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

export const FilterSelect = styled.select`
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

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

export const InfoText = styled.span`
  font-size: 14px;
  color: #666;
  font-weight: 500;
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

export const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  
  ${props => {
    switch (props.status) {
      case 'paid':
        return `
          background: #e8f5e8;
          color: #388e3c;
        `
      case 'unpaid':
        return `
          background: #fff3e0;
          color: #f57c00;
        `
      case 'overdue':
        return `
          background: #ffebee;
          color: #d32f2f;
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

// RentLookupPageCss.js에서 가져온 컴포넌트들

export const PopbillDom = styled.div`
  position: absolute;
  top: -3500px;
  width: 210mm;
  height: 297mm;
  border: 1px solid black;
  background: #fff;
  z-index: 9999999999;
  overflow-y: scroll;
`;

export const FlexC = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexT = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const FlexE = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const FlexColC = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FlexColS = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const FlexColE = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

export const BB = styled.div`
  border-bottom: 1px solid #000;
`;

export const BR = styled.div`
  border-right: 1px solid #000;
`;

export const BL = styled.div`
  border-left: 1px solid #000;
`;

export const BD = styled.div`
  border-bottom: 1px solid #000;
`;

export const BT = styled.div`
  border-top: 1px solid #000;
`;

export const MBody = styled.div`
  font-weight: bold;
  width: 21cm;
  min-height: 29.7cm;
`;

export const A4Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
`;

export const FooterButton = styled.button`
  width: 180px;
  padding: 10px;
  border: 1px solid #000000;
  border-radius: 5px;
  background: #ffffff;
  font-weight: bold;
  cursor: pointer;

  span {
    font-size: 15px;

    &:nth-child(2) {
      padding-left: 3%;
      font-size: 20px;
      color: #646464;
    }
  }

  &:hover {
    border: 1px solid #CC414D;
    background: #fff;
    color: #000;
  }
`;

export const ModalOverlay = styled.div`
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
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  padding: 20px;
  border-bottom: 1px solid #eee;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const FlexItem = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 10px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  
  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }
  
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableHeader = styled.th`
  background-color: #f5f5f5;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
  font-weight: bold;
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
`;

export const StyledChart = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
`;

export const ChartContainer = styled.div`
  width: 100%;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const NavButton = styled.button`
  padding: 8px 16px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  
  &:hover {
    background: #e0e0e0;
  }
  
  &.active {
    background: #007bff;
    color: white;
    border-color: #007bff;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const ChartNav = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Th = styled.th`
  background-color: #f5f5f5;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
  font-weight: bold;
`;

export const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;

export const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const Ul = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const Li = styled.li`
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const A = styled.a`
  color: #007bff;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const P = styled.p`
  margin-bottom: 15px;
  line-height: 1.5;
`;

export const Div = styled.div``;

export const Span = styled.span``;

export const Img = styled.img`
  max-width: 100%;
  height: auto;
`;

export const Form = styled.form`
  width: 100%;
`;

export const Col = styled.div`
  flex: 1;
  padding: 0 15px;
`;

export const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  overflow: hidden;
`;

export const CardHeader = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  background: #f9f9f9;
`;

export const CardBody = styled.div`
  padding: 20px;
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: #f5f5f5;
  color: #333;
`;

export const Small = styled.small`
  font-size: 85%;
  color: #666;
`;

export const H5 = styled.h5`
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: 600;
`;

export const H4 = styled.h4`
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: 600;
`;

export const H3 = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: 600;
`;

export const H2 = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 600;
`;

export const H1 = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: 600;
`;

export const Footer = styled.footer`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  text-align: center;
  color: #666;
`;

// 필터 관련 컴포넌트
export const ActiveFiltersDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  width: 100%;
`;

export const FilterTag = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
  color: #333;
`;

export const FilterTagName = styled.div`
  font-weight: bold;
  margin-right: 5px;
`;

export const FilterTagValue = styled.div`
  margin-right: 10px;
`;

export const CloseFilterTag = styled.span`
  color: #ff0000;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  margin-left: 5px;
`;

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 10px;
  }
`;

export const DashboardItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const DashboardTitle = styled.div`
  font-size: 18px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const DashboardValue = styled.div`
  font-size: 18px;
  font-weight: bold;
  display: flex;
  span {
    display: flex;
    flex-direction: row;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 5px 10px;
    margin: 3px 0;
    border-radius: 4px;
    background-color: #f8f9fa;
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;