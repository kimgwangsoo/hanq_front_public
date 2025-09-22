import styled from 'vue3-styled-components';

export const AccountStInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
  margin-left: 20px;
`

export const ACountDiv = styled.div`
  padding: 4px 8px;
  margin-top: 2px;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
`

export const TypeSelect = styled.select`
  padding: 0 8px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`

export const VirtualSendContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .guide {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`

export const VirtualTable = styled.table`
  width: 100%;
  font-size: 16px;

  &.detail {
    th,
    td {
      padding: 8px;
    }
  }

  th,
  td {
    padding: 5px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f2f2f2;
  }

  input {
    width: 95%;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;

    &.newClient {
      min-width: 150px;
      max-width: 250px;
      margin-right: 5px;
    }

    &:disabled {
      background-color: #f2f2f2;

      &::placeholder {
        color: #000;
      }
    }
  }

  select {
    width: 95%;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;

    &:disabled {
      background-color: #f2f2f2;
      color: #000;
    }
  }

  textarea {
    width: 95%;
    padding: 5px;
    min-height: 100px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
  }
`
// 엑셀 업로드 구역
export const ExcelFileDiv = styled.div`
    width: 90%;
    margin-bottom: 30px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    background-color: #f9f9f9;

  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    color: #1a2136;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: white;
  }

  .upload-btn {
    min-width: 80px;
  }

  .fail-list-container {
    width: 100%;
    margin-top: 20px;
  }

  .list-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    color: #c40000;
  }

  .table-container {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    max-height: 300px;
    overflow-y: auto;
  }
`