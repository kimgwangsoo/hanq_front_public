import styled from 'vue3-styled-components';

// export const OrderDiv = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding-top: 20px;
//     padding-left: 50px;
//     padding-right: 50px;
//     padding-bottom: 100px;
// `;

// export const OrderTitleArea = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width:100%;
// `;

// export const TitleDiv = styled.h1` 
//     font-size: 20px;
//     text-align: center;
//     font-weight: bold;
// `;

// export const TitleIcon = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 40px;
//   height: 40px;
//   background: #e8f5e8;
//   border-radius: 8px;
//   color: #388e3c;
  
//   .material-icons {
//     font-size: 24px;
//   }
// `

// export const OrderHeaderArea = styled.div`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-top: 10px;
//     width:100%;
// }`;

// export const OrderHeaderButtonArea = styled.div`
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;
//     margin-top: 10px;
//     width:100%;
// `;

// export const OrderHeaderSearchArea = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width:100%;
// `;

// export const OrderDateInput = styled.input`
//     width: 8%;
//     height: 35px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
// `;


// export const OrderSearchInput = styled.input`
//     width: 250px;
//     height: 35px;
//     border: 1px solid #ccc;
//     border-radius: 4px;
// `;


// export const OrderHeaderInfo = styled.div`
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;
//     margin-top: 10px;
//     width:100%;
//     font-size: 12px;
//     font-weight: bold;
// `;


// export const OrderTableArea = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     margin-top: 10px;
//     width:100%;
// `;

// const OrderButtonCss = `
//     width: 14%;
//     height: 40px;
//     line-height: 10px;
//     color: white;
//     border: none;
//     padding:10px;
//     border-radius: 5px;
//     cursor: pointer;
//     box-shadow: 0 8px 9px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
//     margin: 0 5px;
//     font-size:15px;
//     font-weight: bold;
// `;

// export const OrderButton = styled.button`
//     ${OrderButtonCss}
//     background: #1a2136;
// `;

// export const OrderButtonExcel = styled.button`
//     ${OrderButtonCss}
//     background: rgb(48, 110, 72);
//     display:flex;
//     align-items:center;
//     justify-content:center;
//     width: 13%;
//     font-size:15px;
// `;

// export const OrderDateButton = styled.button`
//     width: 5%;
//     height: 40px;
//     line-height: 10px;
//     background-color: #1a2136;
//     color: white;
//     border: none;
//     padding:10px;
//     border-radius: 5px;
//     cursor: pointer;
//     box-shadow: 0 8px 9px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
//     margin: 0 2px;
//     font-size:15px;
//     font-weight: bold;
// `;


// export const OrderSearchBtn = styled.button`
//     box-shadow: 0 8px 9px -4px rgba(0,0,0,0.3), 0 4px 18px 0 rgba(0,0,0,0.2);
//     border-radius: 5px;
//     border: none;
//     background: #fff;
//     color: #000;
//     width: 60px;
//     margin-left: 5px;
//     height: 40px;
//     &:hover{
//         cursor: pointer;
//         background: #1a2136;
//         color: #fff;
//     }
// `;

// export const OrderHeaderInfoArea = styled.div`
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;
//     margin-top: 10px;
//     width:30%;
// `;


// export const OrderPageNationArea = styled.div`
//     display: flex;
//     justify-content: space-around;
//     align-items: center;
//     width:100%;
//     background: #1a2136;
// `;

// export const OrderPageLeftArea = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 60%;
//     // color:#fff;
// `;

// export const OrderPageRightArea = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 50%;
// `;

// export const OrderPageCenterArea = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 50%;
//     margin:20px;
// `;

// export const OrderPageBtn = styled.button`
//     position: relative;
//     float: left;
//     padding: 4px 11px;
//     margin-left: -1px;
//     line-height: 1.42857143;
//     color: #337ab7;
//     text-decoration: none;
//     background-color: #fff;
//     border: 1px solid #ddd;
//     font-size:24px;
//     &:hover{
//         cursor: pointer;
//     }
//     &.current-page {
//         background-color: #337ab7;
//         color: #fff;
//         border-color: #337ab7;
//     }
//     &:disabled{
//         cursor: not-allowed;
//     }
//     &.double-left{
//         border-top-left-radius: 5px;
//         border-bottom-left-radius: 5px;
//     }
//     &.double-right{
//         border-top-right-radius: 5px;
//         border-bottom-right-radius: 5px;
//     }
// `;

// export const OrderTable = styled.table`
//     width: 100%;
//     border-collapse: collapse;
//     border-spacing: 0;
// `;

// export const OrderTableHead = styled.thead`
//     background: #F2F2F2;
// `;

// export const OrderTableTbody = styled.tbody`
// `;



// export const OrderTableTr = styled.tr`
//     border-bottom: 1px solid #ccc;
//     &.success {
//         background: #dff0d8;
//     }
//     &.danger {
//         background: #f2dede;
//     }
//     &.warning {
//         background: #fcf8e3;
//     }
//     &.info {
//         background: #d9edf7;
//     }
//     &.order_tr{
//         &:hover {
//             opacity: 0.5;
//             background: #E4E4E4;
//             color:#000;
//             cursor: pointer;
//         }
//     }
// `;

// export const OrderTableTrTh = styled.th`
//     padding: 10px;
//     text-align: center;
//     border-bottom: 1px solid #ccc;
//     input{
//         width: 25px;
//         height: 25px;
//     }
//     &.orderdate{
//         width: 80px;
//     }
//     &.name2{
//         width: 150px;
//     }
//     &.address{
//         width: 250px;
//     }
// `;

// export const OrderTableTrTd = styled.td`
//     padding: 5px;
//     text-align: center;
//     border-bottom: 1px solid #ccc;
//     input{
//         width: 25px;
//         height: 25px;
//     }
// `;

// export const FilterArea = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 100%;
// `;

// export const FilterDiv = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     padding: 10px;
//     margin: 10px;
// `;

// export const FilterDeleteBtn = styled.div`
//     color:#ff0000;
//     cursor: pointer;
// `;



export const OrderTableButtonArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    margin-bottom: -15px;
`;

export const OrderTableButton = styled.button`
    background: #ffffff;
    width: calc(25% + 20px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-weight: bold;
    cursor: pointer;
    border: none;
    position: relative;
    margin-right: -20px;
    padding: 3px;
    clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%);

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(110, 110, 110, 0.39);
        z-index: -1;
        clip-path: polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 20px 50%);
    }

    &::after {
        content: '';
        position: absolute;
        top: 1px;
        left: 1px;
        right: 1px;
        bottom: 1px;
        background: inherit;
        z-index: -1;
        clip-path: polygon(0 0, calc(100% - 19px) 0, calc(100% - 1px) 50%, calc(100% - 19px) 100%, 0 100%, 19px 50%);
    }

    &.active {
        background: #1a2136;
        color: #fff;
    }

    &:first-child {
        clip-path: polygon(0 0, calc(100% - 19px) 0, 100% 50%, calc(100% - 19px) 100%, 0 100%);

        &::before {
            clip-path: polygon(0 0, calc(100% - 19px) 0, 100% 50%, calc(100% - 19px) 100%, 0 100%);
        }

        &::after {
            clip-path: polygon(1px 1px, calc(100% - 19px) 1px, calc(100% - 1px) 50%, calc(100% - 19px) calc(100% - 1px), 1px calc(100% - 1px));
        }
    }

    &:last-child {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 20px 50%);
        width: calc(25% + 20px);
        margin-right: 0;

        &::before {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 20px 50%);
        }

        &::after {
            clip-path: polygon(1px 1px, calc(100% - 1px) 1px, calc(100% - 1px) calc(100% - 1px), 1px calc(100% - 1px), 19px 50%);
        }
    }
        
    @media (max-width: 786px) {
        font-size: 15px;
    }
`;

export const OrderStCnt = styled.div`
    font-size: 20px;
    font-weight: bold;

    @media (max-width: 786px) {
        font-size: 15px;
    }
`;

export const OrderStTitle = styled.div`
    padding: 3px 15px;
    font-size: 17px;
    font-weight: bold;
    background: #ff0000;
    border-radius: 10px;
    color:#fff;
    &.all{
        background: #1a2136;
    }
    &.unconfirm{
        background: #FFE08C;
        color:#000;
    }
    &.confirm{
        background: #B7F0B1;
        color:#000;
    }
    &.release{
        background: #B5B2FF;
        color:#000;
    }

    @media (max-width: 786px) {
        padding: 3px 10px;
        font-size: 13px;
    }
`;

export const OrderPageSelect = styled.select`
    width: 100px;
    height: 35px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 18px;
    text-align: center;
`;

export const OrderPagePrintBtn = styled.button`
    padding: 5px 30px;
    cursor: pointer;
    margin-left:10px;
    box-shadow: 0 8px 9px -4px rgba(255, 255, 255, 0.082), 0 4px 18px 0 rgba(253, 253, 253, 0.089);
    border-radius: 5px;
    border:none;
    background: #fff;
    color: #000;
    font-size: 18px;
    font-weight: bold;

    @media (max-width: 1300px) {
    font-size: 18px;
    }
`;

export const OrderDeleteBtn = styled.div`
    margin: 20px auto;
    text-align: center;
    width: 100px;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 8px 9px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
`;
