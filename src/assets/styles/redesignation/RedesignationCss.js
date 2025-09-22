import styled from 'vue3-styled-components'

// 컨텐츠 영역
export const ReContentArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

// 테이블 영역
export const ReTableContainer = styled.div`
  width: 50%;
  min-height: 70vh;
  max-height: 70vh;
  overflow-y: auto;
  border: 1px solid #1a2136;
  border-radius: 5px;
  margin-right: 20px;
`;

// 심사항목 테이블
export const ReTable = styled.table`
  width: 100%;
  font-size: 16px;
  
  thead {
    position: sticky;
    top: 0;
    z-index: 1;
    box-shadow: inset 0 0 0 1000px #1a2136;
  }

  th {
    padding: 8px;
    color: #fff;
    background-color: #1a2136;
    border: 1px solid #1a2136;

    &.widthNum {
      width: 10%;
    }
  }

  td {
    padding: 8px;
    text-align: left;
    border: 1px solid #1a2136;

    &.smallTitle {
      font-weight: bold;
      background-color: #f2f2f2;
      color: #1a2136;
      border-bottom: 2px solid #1a2136;
    }

    &.fontCenter {
      text-align: center;
    }

    &.tdLink {
      &:hover {
        cursor: pointer;
        font-weight: bold;
        color: #1a2136;
        text-decoration: underline;
        background-color:rgb(227, 242, 245);
      }
    }

    strong {
      color: #1a2136;
      font-style: italic;
      font-weight: bold;
      background-color: #9999;
      padding: 2px 4px;
      border-radius: 3px;
    }
  }
`;

export const ReTableTd = styled.td`
  background-color: #f2f2f2;
  font-size: 18px;
  line-height: 1.6;

  .guide {
    margin-left: 10px;
    font-size: 15px;
  }
`;

// 우측 파일 영역
export const ReFileArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  min-height: 66vh;
  max-height: 66vh;
  padding: 20px;
  margin-bottom: 20px;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #999;
  background-color: #f8f9fa;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }
`;

// 파일 섹션 컨테이너
export const ReFileSection = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
`;

// 섹션 제목
export const ReFileSectionTitle = styled.h3`
  display: flex;
  align-items: center;
  margin: 0 0 10px 0;
  padding-bottom: 10px;
  color: #1a2136;
  border-bottom: 2px solid #1a2136;
  font-weight: bold;

  &::before {
    content: '';
    width: 4px;
    height: 20px;
    background-color: #1a2136;
    border-radius: 2px;
    margin-right: 10px;
  }
`;

// 파일 목록 컨테이너
export const ReFileList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  &.employee {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    padding: 10px;
  }

  &.employeeFile {
    margin-top: 5px;
    margin-left: 20px;
  }
`;

// 파일 아이템
export const ReFileItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  margin-bottom: 10px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

// 종사자명
export const ReEmployeeName = styled.span`
  font-size: 16px;
  color: #333;
  flex: 1;
  display: flex;
  align-items: center;
`;

// 파일명
export const ReFileName = styled.span`
  font-size: 16px;
  color: #333;
  flex: 1;
  
  &::before {
    content: '📄';
    margin-right: 8px;
  }
`;

// 파일 버튼들
export const ReFileButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #1a2136;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 5px;

  &:hover {
    background-color: #303f9f;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &.download {
    background-color: #4caf50;
    color: #fff;
    
    &:hover {
      background-color: #45a049;
    }
  }

  &.delete {
    background-color: #f44336;
    
    &:hover {
      background-color: #da190b;
    }
  }
`;

// 파일 업로드 영역
export const ReFileUploadArea = styled.div`
  border: 2px dashed #1a2136;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  background: rgba(26, 35, 126, 0.05);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background: rgba(26, 35, 126, 0.1);
    border-color: #303f9f;
  }

  &.dragover {
    background: rgba(26, 35, 126, 0.15);
    border-color: #303f9f;
    transform: scale(1.02);
  }
  
  &.disabled {
    border-color: #ccc;
    background: rgba(0, 0, 0, 0.05);
    cursor: not-allowed;
    
    &:hover {
      background: rgba(0, 0, 0, 0.05);
      border-color: #ccc;
      transform: none;
    }
  }
`;

// 업로드 텍스트
export const ReUploadText = styled.p`
  margin: 0;
  color: #1a2136;
  font-size: 14px;
  font-weight: 500;

  &.main {
    font-size: 16px;
    margin-bottom: 5px;
  }

  &.sub {
    font-size: 12px;
    color: #666;
  }
`;

// 파일 입력
export const ReFileInput = styled.input`
  display: none;
`;

// 업로드 버튼
export const ReUploadButton = styled.button`
  background-color: #1a2136;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #303f9f;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(26, 35, 126, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
  
  &.disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
    
    &:hover {
      background-color: #ccc;
      transform: none;
      box-shadow: none;
    }
  }
`;

// 진행률 바
export const ReProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 10px;

  &::after {
    content: '';
    display: block;
    height: 100%;
    background-color: #4caf50;
    width: ${props => props.progress || 0}%;
    transition: width 0.3s ease;
  }
`;

// 안내 메시지
export const ReInfoMessage = styled.div`
  padding: 12px;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 15px;
  font-weight: bold;
  color: #1976d2;
  background: #e3f2fd;
  border: 1px solid #2196f3;
  border-radius: 6px;

  &.warning {
    background: #fff3e0;
    border-color: #ff9800;
    color: #f57c00;
  }
`;

// 빈 상태 표시
export const ReEmptyState = styled.div`
  text-align: center;
  padding: 30px 20px;
  color: #999;
`;


export const ReDownloadSt = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 500;

  background-color: #DFF0D8;
  color: #306e48;
  border: 1px solid #DFF0D8;

  ::before {
    content: "✔";
    font-weight: bold;
    margin-right: 4px;
    }

  &.pending {
    background-color: #F2DEDE;
    color: #c40000;
    border: 1px solid #F2DEDE;

    ::before {
      content: "⚠";
      font-weight: bold;
      margin-right: 4px;
    }
  }
`

export const ReFileCount = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 15px;
  background-color: #cce5ff;
  color: #0056b3;
  margin-left: 8px;

  ::before {
    content: "📎 ";
    margin-right: 4px;
  }

  &.noFile {
    background-color: #ffe6e6;
    color: #c40000;
  }
`