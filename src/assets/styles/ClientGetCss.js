import styled from 'vue3-styled-components';

export const ClientGetDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const ClientGetTitleArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    font-weight: bold;
`;

export const ClientGetSearchArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    width:100%;
`;

export const ClientGetSearchBtn = styled.button`
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

export const ClientGetSearchInputTxt = styled.input`
    width:180px;
    height: 30px;
`;

export const ClientGetTable = styled.table`
    width: 90%;
    border-collapse: collapse;
    border-spacing: 0;
`;

export const ClientGetTableThead = styled.thead`
    background: #1a2136;
    color: #fff;
    display:block;
`;

export const ClientGetTableTbody = styled.tbody`
    display:block;
    width:100%;
    border-bottom: 1px solid #000000;
    height:500px;
    overflow-y:scroll;
`;

export const ClientGetTableTr = styled.tr`
    font-size: 14px;
    font-weight:bold;
    th{
        width:120px;
        text-align: center;
    };
    td{
        width:120px;
        text-align: center;
    };
    &.client_tr{
        &:hover {
            color:#333;
            border: 2px solid #000;
            cursor: pointer;
        }
    }
    .address{
        width:250px;
    };
    &.success{
        background: #dff0d8;
    }
    &.warning{
        background: #fcf8e3;
    }
    &.info{
        background: #d9edf7;
    }
    &.danger{
        background: #f2dede;
    }
    height:40px;
    text-align: center;
`;