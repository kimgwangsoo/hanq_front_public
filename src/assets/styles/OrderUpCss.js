import styled from 'vue3-styled-components';
import { injectGlobal } from 'vue3-styled-components';

injectGlobal`
    .bcode_load_tr{
        border: 1px solid #ddd;
        border-radius: 5px;
        &:hover{
            background: #f0f0f0;
        }
        cursor: pointer;
        td{
            padding:5px 20px;
        }
    }
    @keyframes buzz {
        10% { transform: translateX(3px) rotate(2deg); }
        20% { transform: translateX(-3px) rotate(-2deg); }
        30% { transform: translateX(3px) rotate(2deg); }
        40% { transform: translateX(-3px) rotate(-2deg); }
        50% { transform: translateX(2px) rotate(1deg); }
        60% { transform: translateX(-2px) rotate(-1deg); }
        70% { transform: translateX(2px) rotate(1deg); }
        80% { transform: translateX(-2px) rotate(-1deg); }
        90% { transform: translateX(1px) rotate(0); }
        100% { transform: translateX(-1px) rotate(0); }
    }
    
    @media (max-width: 768px) {
        .mx-datepicker {
            width: 100% !important;
        }
        
        .mx-input {
            height: 30px !important;
            font-size: 12px !important;
        }
        
        .full-width {
            width: 100% !important;
        }
        
        .address-row th,
        .address-row td {
            width: 100% !important;
        }
        
        .date-row th,
        .date-row td {
            width: 100% !important;
        }
        
        .memo-row th,
        .memo-row td {
            width: 100% !important;
        }
    }
`;

export const OrderUpDiv = styled.div`
    // position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    
    @media (max-width: 768px) {
        flex-direction: column;
        padding: 10px;
    }
`;

export const OrderUpTitle = styled.div`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    width: 100%;
    
    @media (max-width: 768px) {
        font-size: 16px;
    }
`;

export const OrderUpTitleBtn = styled.button`
    background: #1a2136;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    margin-left: 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0 8px 9px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
`;

export const OrderUpClientArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    width:30%;
    
    @media (max-width: 768px) {
        width: 100%;
        margin-bottom: 20px;
    }
}`;

export const OrderUpCenterArea = styled.div`
    width:5%;
    
    @media (max-width: 768px) {
        display: none;
    }
`;

export const OrderUpProductArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    width:70%;
    
    @media (max-width: 768px) {
        width: 100%;
    }
}`;

export const OrderUpClientUpBtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px;
    padding: 15px;
    height: 15px;
    border-radius: 3px;
    box-shadow: 0 8px 9px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
    font-weight: bold;
    transition: all 0.2s ease-in-out;

    &.buzz {
        animation: buzz 0.75s linear;
    }
    
    @media (max-width: 768px) {
        margin: 5px;
        padding: 12px;
        width: 200px;
    }
}`;

export const OrderUpClientTable = styled.table`
    width: 100%;
    border-spacing: 0;

    th {
        border: 1px solid #ffffff;
        border-radius: 2px;
        width: 100px;
        font-size: 14px;
        background: #1a2136;
        color: #fff;
    }
    
    @media (max-width: 768px) {
        font-size: 12px;

        tr {
            display: flex;
            flex-wrap: wrap;
            border: 1px solid #ddd;
            margin-bottom: 5px;
        }

        th, td {
            display: flex;
            width: 50%;
            box-sizing: border-box;
            text-align: center;
            padding: 8px;
            align-items: center;
            justify-content: center;
        }

        th {
            font-size: 12px;
            text-align: center;
            background: #1a2136;
        }

        td[colspan="3"] {
            width: 100%;
        }

        /* 데이트피커 관련 스타일 */
        td:has(.mx-datepicker) {
            padding-top: 5px;
            padding-bottom: 5px;
        }
    }
}`;

export const OrderUpClientTableTr = styled.tr`
    margin: 10px;
    
    @media (max-width: 768px) {
        display: block;
    }
`;

export const OrderUpProductHeaderArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0px;
    width:98%;
    
    @media (max-width: 768px) {
        flex-wrap: wrap;
        gap: 10px;
    }
}`;

export const OrderUpProductHeaderBtn = styled.div`
    position: relative;
    cursor: pointer;
    border: 1px solid #fff;
    border-radius: 5px;
    padding: 8px;
    box-shadow: 0 8px 9px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
    font-weight:bold;
    
    @media (max-width: 768px) {
        padding: 6px;
        font-size: 12px;
    }
}`;

export const OrderUpProductHeaderBtnToolTip = styled.div`
    position: absolute;
    background-color: #1a2136;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 10px;
    display: block;
    width: 150px;
    text-align: center;
    &:after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 8px;
        border-style: solid;
        border-color: #1a2136 transparent transparent transparent;
    }
`;

export const OrderUpProductTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #ddd;
    thead{
        display:block;
    }
    tbody{
        display:block;
        tr{
            font-size:14px;
            font-weight:bold;
            border-bottom: 1px solid #000;
            height:40px;
            td{
                text-align: center;
                width:150px;
            }
        }
    }
    
    @media (max-width: 768px) {
        overflow-x: auto;
        display: block;
        
        thead {
            width: 100%;
        }
        
        tbody {
            width: 100%;
            
            tr {
                font-size: 12px;
                height: auto;
                
                td {
                    padding: 5px 2px;
                    width: auto;
                    min-width: 70px;
                }
            }
        }
    }
}`;

export const OrderUpProductTableTheadTr = styled.tr`
    background: #1a2136;
    color:#fff;
    th{
        width:150px;
        text-align: center;
    }
    
    @media (max-width: 768px) {
        th {
            width: auto;
            min-width: 70px;
            font-size: 12px;
            padding: 5px 2px;
        }
    }
}`;

export const OrderUpProductUpArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}`;

export const OrderUpPorudctUpBtn = styled.div`
    margin: 15px;
    margin-bottom: 0px;
    cursor: pointer;
    border: 0 solid;
    border-radius: 5px;
    color:#fff;
    background:rgb(204, 65, 77);
    padding:8px;
    font-size:10px;
    font-weight:bold;
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    transition: all 0.8s ease-in-out;
    &:hover{
        animation: buzz 0.8s ease-in-out;
    }
    
    @media (max-width: 768px) {
        margin: 10px;
        padding: 6px;
    }
}`;

export const OrderUpSubmitArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:100%;
    margin:20px;
    
    @media (max-width: 768px) {
        margin: 10px 0;
    }
}`;

export const OrderUpSubmitBtn = styled.button`
    background: #1a2136;
    width: 700px;
    height: 55px;
    margin: 10px;
    border: 1px solid #000000;
    border-radius: 3px;
    box-shadow: 1px 1px 1px 1px #000000;
    font-size: 30px;
    cursor: pointer;
    color: #fff;
    &:hover{
        background: #fff;
        color: #000;
    }
    
    @media (max-width: 768px) {
        width: 90%;
        height: 45px;
        font-size: 20px;
        margin: 5px;
    }
`;

export const OUInput150 = styled.input`
    width: 150px;
    height: 30px;
    
    @media (max-width: 768px) {
        width: 95%;
        height: 28px;
        font-size: 12px;
    }
`;

export const OrderUpClientInputTxtW260 = styled.input`
    width: 260px;
    height: 30px;
    
    @media (max-width: 768px) {
        width: 95%;
        font-size: 12px;
        margin-bottom: 5px;
    }
`;

export const OrderUpClientInputTxtW60per = styled.input`
    width:62%;
    height: 30px;
    margin-left: 5px;
    
    @media (max-width: 768px) {
        width: 100%;
        height: 28px;
        font-size: 12px;
    }
`;

export const OrderModifyClientMemoArea = styled.td`
    
`;

export const OrderModifyClientMemoBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 3px;
    padding: 10px;
    max-height: 40px;
    font-weight: bold;
    margin-left: 10px;
    background: #fff;
    border: none;
    box-shadow: 0 8px 9px -4px rgba(0, 0, 0, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);

    &:hover{
        background: #f0f0f0;
    }
`;

export const OrderUpClientSelectW150 = styled.select`
    width:150px;
    height: 40px;

    // 계약상태에 따른 배경색 설정
    &.contract-ok {
        background-color:rgb(199, 248, 201); // 초록색 (계약완료)
        color: #000;
    }
    
    &.contract-vok {
        background-color:rgb(255, 234, 157); // 노란색 (부분계약완료)
        color: black;
    }   
    
    &.contract-cok {
        background-color:rgb(255, 205, 210); // 연한 빨간색 (취소계약완료)
        color: black;
    }
    
    @media (max-width: 768px) {
        width: 95%;
        height: 35px;
        font-size: 12px;
    }
`;

export const OUClientAddressBtn = styled.button`
    background: #ffffff;
    height: 28px;
    margin: 5px;
    border: 1px solid #000000;
    border-radius: 3px;
    box-shadow: 1px 1px 1px 1px #000000;
    font-size: 15px;
    cursor: pointer;
    width:150px;
    
    @media (max-width: 768px) {
        margin: 0 0 10px 0;
    }
`;

export const OrderUPProductTableTotalPriceTr = styled.tr`
    background: #fff;
    border: 1px solid #ddd;
`;

export const OrderupProductCntInput = styled.input`
    width:30px;
    height:20px;
    border-radius: 5px;
    border:1px solid #000;
    margin: 0 5px;
    text-align: center;
`;

export const OrderUpProductTableInput = styled.input`
    width:23px;
    height:23px;
`;

export const OrderUpProductTableInputTxt = styled.input`
    width:100px;
    height:30px;
    
    @media (max-width: 768px) {
        width: 80px;
        height: 25px;
        font-size: 12px;
    }
`;

export const OrderUpProductTableBcodeAreaDiv = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const OrderUpProductTableColorSelect = styled.select`
    height:35px;
    
    @media (max-width: 768px) {
        height: 30px;
        font-size: 12px;
    }
`;

export const OrderUpProductTableSizeSelect = styled.select`
    height:35px;
    
    @media (max-width: 768px) {
        height: 30px;
        font-size: 12px;
    }
`;

export const OrderUpProductTableBarcodeBtn = styled.button`
    width: 100%;
    position: absolute;
    right: 145px;
    top: 0px;
    height: 30px;
    box-shadow: 0 8px 9px -4px rgba(175, 156, 156, 0.3), 0 4px 18px 0 rgba(0, 0, 0, 0.2);
    background: #fff;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    
    @media (max-width: 768px) {
        right: 100px;
        height: 25px;
        font-size: 10px;
    }
`;

export const OrderUpBcodeLoadTr = styled.tr`
    &:hover{
        background: #f0f0f0;
    }
    cursor: pointer;
`;


// 메모 아이템 컨테이너
export const OrderCommentItem = styled.div`
border: 1px solid #ccc;
margin: 5px;
padding: 5px;
text-align: left;
`;

// 메모 헤더 영역 (날짜와 삭제 버튼을 포함)
export const OrderCommentHeader = styled.div`
display: flex;
justify-content: space-between;
`;

// 메모 내용 영역
export const OrderCommentContent = styled.div`
margin-top: 5px;
`;

// 메모 날짜와 작성자 텍스트
export const OrderCommentInfo = styled.span`
font-size: 0.9em;
color: #666;
`;

// 메모 없음 안내 메시지
export const OrderCommentEmpty = styled.div`
color: #999;
font-style: italic;
padding: 10px;
text-align: center;
`;

// 메모 이미지 첨부 미리보기 영역
export const OCImgPreviewArea = styled.div`
display: flex;
flex-wrap: wrap;
gap: 5px;
max-height: 120px;
padding: 5px;
overflow-y: auto;
`;

// 메모 이미지 첨부 미리보기 개별 컨테이너
export const OCImgPreviewContainer = styled.div`
position: relative;
width: 80px;
height: 80px;
`;

// 메모 이미지 첨부 미리보기 이미지
export const OCImgPreviewImg = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
border-radius: 4px;
`;


// 이미지 정보
export const OCImgPreviewInfo = styled.div`
position: absolute;
bottom: 0;
left: 0;
right: 0;
background: rgba(0,0,0,0.5);
color: white;
font-size: 10px;
padding: 2px;
text-align: center;
`;

// 이미지 제거 버튼
export const OCImgPreviewRemoveBtn = styled.button`
position: absolute;
top: -5px;
right: -5px;
background: red;
color: #fff;
border: #fff 1px solid;
border-radius: 50%;
cursor: pointer;
`;