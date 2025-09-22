<template>
  <VirtualSendContent class="virtualSendContent">
    <div class="title">가상계좌 채번 등록</div>
    <div class="guide">* 가상계좌 발송 전 채번 등록을 해주세요.</div>
    <div class="guide">* 더빌에서 받은 채번 엑셀 파일을 그대로 올려주세요.</div>

    <!-- 엑셀 파일 등록 -->
    <ExcelFileDiv>
      <div class="title">엑셀 파일 등록 [ {{ virtualAccountList.length }}개 ]</div>
      <div class="controls">
        <input type="file" accept=".xlsx,.xls" @change="handleExcelFile" ref="fileInput" />
      </div>
    </ExcelFileDiv>

    <!-- 등록 실패 리스트 -->
    <div>
      <div>등록 실패 리스트 [ {{ failList.length }}개 ]</div>
      <div>
        <VirtualTable>
          <thead>
            <tr>
              <th>번호</th>
              <th>가상계좌번호</th>
              <th>비고</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in failList" :key="index">
              <td v-if="failList.length === 0" colspan="3" class="center">
                등록 실패 리스트가 없습니다.
              </td>
              <td>{{ index + 1 }}</td>
              <td>{{ item.accountNo }}</td>
              <td>{{ item.memo }}</td>
            </tr>
          </tbody>
        </VirtualTable>
      </div>
    </div>
  </VirtualSendContent>
</template>

<script>
import { ref } from "vue";
import * as XLSX from "xlsx";
import * as PublicCss from "@/assets/styles/public.js";
import * as ModalCss from "@/assets/styles/ModalCss.js";
import * as VirtualAccountCss from "@/assets/styles/virtualAccount/VirtualAccountCss.js";
import Swal from "sweetalert2";
import { createVirtualAccountBatch } from "@/api/virtualAccount";

export default {
  name: "ModalVirtualAccount",
  components: {
    ...PublicCss,
    ...ModalCss,
    ...VirtualAccountCss,
  },

  setup() {
    const virtualAccountList = ref([]);
    const failList = ref([]);
    const excelFile = ref(null);
    const fileInput = ref(null);

    const handleExcelFile = (e) => {
  excelFile.value = e.target.files[0];
  console.log("excelFile", excelFile.value);

  // 엑셀 확장자 아니면 return
  if (
    !excelFile.value.name.endsWith(".xlsx") &&
    !excelFile.value.name.endsWith(".xls")
  ) {
    Swal.fire({
      title: "파일 오류",
      text: "엑셀 파일만 등록 가능합니다.",
      icon: "error",
    });
    // 파일 인풋 초기화
    if (fileInput.value) {
      fileInput.value.value = "";
    }
    excelFile.value = null;
    return;
  }

  // E열의 2행부터 읽어서 가상계좌번호 리스트를 만들기
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e.target.result;
    const workbook = XLSX.read(data, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // 전체 데이터를 JSON으로 변환
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: "A" });

    // 2행부터 A열과 E열 데이터만 추출 (1행은 헤더로 간주)
    const accountNumbers = [];
    for (let i = 1; i < jsonData.length; i++) {
      if (jsonData[i].E && jsonData[i].A) {
        accountNumbers.push( {thebillId: jsonData[i].A, accountNo: jsonData[i].E});
      }
    }

    virtualAccountList.value = accountNumbers;
    
    // 파일 읽기가 완료된 후 여기서 등록 요청을 수행
    for (let i = 0; i < virtualAccountList.value.length; i++) {
      setVirtualAccount(virtualAccountList.value[i]);
    }
  };
  reader.readAsBinaryString(excelFile.value);
};

    // 가상계좌번호 등록 요청
    const setVirtualAccount = async (reqData) => {
      const { thebillId, accountNo } = reqData;
      const request = {
        userId: parseInt(JSON.parse(localStorage.getItem('user')).id),
        userNm: JSON.parse(localStorage.getItem('user')).name,
        companyNm: JSON.parse(localStorage.getItem('user')).companyName,
        thebillId: String(thebillId),
        accountNo: String(accountNo),
        vkey: "1",
      };

      console.log("계좌 등록 request", request);

      try {
        const response = await createVirtualAccountBatch(request);
        if (response.success === false) {
          failList.value.push(
            {
              accountNo: accountNo[1],
              memo: "",
            }
          );
        }
      } catch (error) {
        failList.value.push(
          {
            accountNo: accountNo[1],
            memo: "",
          }
        );
        console.error("가상계좌번호 등록 오류:", error);
      }
    };
    return {
      virtualAccountList,
      failList,
      excelFile,
      fileInput,
      handleExcelFile,
      setVirtualAccount,
    };
  },
};
</script>
