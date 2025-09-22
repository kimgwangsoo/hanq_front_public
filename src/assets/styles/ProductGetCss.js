import styled from 'vue3-styled-components';

export const ProductGetDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ProductGetTitleArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    font-weight: bold;
`;

export const ProductGetSearchArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
    width:100%;
`;

export const ProductGetSearchBtn = styled.button`
    background: #ffffff;
    width: 60px;
    height: 33px;
    margin: 5px;
    border: 1px solid #000000;
    border-radius: 3px;
    box-shadow: 1px 1px 1px 1px #000000;
    font-size: 15px;
    cursor: pointer;
`;

export const ProductGetSearchInputTxt = styled.input`
    width:180px;
    height: 30px;
`;

export const ProductGetBodyArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    width:100%;
`;

export const ProductGetHeaderArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:100%;
    font-weight: bold;
`;

export const ProductGetBodyCategory = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:30%;
    font-weight: bold;
`;

export const ProductGetBodyTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const ProductGetBodyProductInfo = styled.td`
    width: 15%;
`;

export const ProductGetBodyCategoryBuy = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
`;

export const ProductGetBodyCategoryRent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
`;

export const ProductGetBodyCategoryBuyBtnArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    div {
        display:flex;
        justify-content: center;
        align-items: center;
    }
`;

export const ProductGetBodyCategoryRentBtnArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    div {
        display:flex;
        justify-content: center;
        align-items: center;
    }
`;

export const ProductGetBodyCategoryBuyBtn = styled.div`
    margin: 5px;
    padding: 10px;
    text-align: center;
    background-color: #fff;
    cursor: pointer;
    box-shadow: 0 8px 9px -4px rgba(175, 156, 156, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
    padding: 10px;
    border-radius: 5px;
    font-weight:bold;
    font-size:14px;
`;

export const ProductGetBodyCategoryRentBtn = styled.div`
    margin: 5px;
    padding: 10px;
    text-align: center;
    background-color: #fff;
    cursor: pointer;
    box-shadow: 0 8px 9px -4px rgba(175, 156, 156, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
    padding: 10px;
    border-radius: 5px;
    font-weight:bold;
    font-size:14px;
`;

export const ProductGetBodyProductInfoImg = styled.img`
    width: 100%;
    height: auto;
`;

export const ProductGetBodyTableThead = styled.thead`
    display:block;
    tr {
        th {
            width: 150px;
            text-align: center;
        }
    }   
`;

export const ProductGetBodyTableTbody = styled.tbody`
    display:block;
    font-weight:bold;
    font-size: 14px;
    tr {
        height:40px;
        cursor: pointer;
        &:hover {
            border: 1px solid #000;
        }
        td {
            width: 150px;
            text-align: center;
            select{
                height:30px;
            }
        }
    } 


    overflow-y:scroll;
    height: 500px;
`;

export const ProductGetBodyTableSelect = styled.select`
    height:30px;
`;