<template>
  <DContainer>
    <!-- 헤더 -->
    <FlexDiv>
      <CommonTitleArea>
        <CommonTitleDiv>
          내구연한관리
        </CommonTitleDiv>
      </CommonTitleArea>
    </FlexDiv>

    <!-- 메인 컨텐츠 영역 -->
    <DMainDiv>
      <!-- 왼쪽 영역 - 전체 품목 -->
      <DSection>
        <DSectionHeader>
          <GreenBtn @click="handleExcelUpload"> <MicrosoftExcel /> &nbsp; 엑셀등록</GreenBtn>
          <input type="file" ref="fileInput" style="display: none" @change="processExcelFile" accept=".xlsx, .xls" />
          <BlueBtn @click="showBarcodeModal">바코드등록</BlueBtn>
          <DHeaderInfo>
            누적품목: {{ durabilityList.length }}개
          </DHeaderInfo>
          <DSearchArea>
            <input type="text" placeholder="바코드 검색" id="searchDurability" />
            <button @click="searchDurability">검색</button>
          </DSearchArea>
        </DSectionHeader>
        
        <DTableContainer>
          <DTable>
            <thead>
              <tr>
                <th>등록일</th>
                <th>만료일</th>
                <th>품목</th>
                <th>제품명</th>
                <th>품목코드</th>
                <th>바코드</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in durabilityList" :key="item.id">
                <td>{{ item.uploadDate }}</td>
                <td>{{ item.endDate }}</td>
                <td>{{ item.productInfo?.pitem }}</td>
                <td>{{ item.productInfo?.pname }}</td>
                <td>{{ item.pcode }}</td>
                <td>{{ item.bcode }}</td>
              </tr>
            </tbody>
          </DTable>
        </DTableContainer>
      </DSection>

      <!-- 오른쪽 영역 -->
      <DSection class="right">
        <!-- 만료품목 섹션 -->
        <div class="content">
          <DSectionHeader>
            <DHeaderInfo>
              만료품목 : {{ expiredItems.length }}개
            </DHeaderInfo>
            <DSearchArea>
              <input type="text" placeholder="바코드 검색" />
              <button>검색</button>
            </DSearchArea>
          </DSectionHeader>
          
          <DTableContainer class="small">
            <DTable>
              <thead>
                <tr>
                  <th>등록일</th>
                  <th>만료일</th>
                  <th>품목</th>
                  <th>제품명</th>
                  <th>품목코드</th>
                  <th>바코드</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in expiredItems" :key="item.id">
                  <td>{{ item.uploadDate }}</td>
                  <td>{{ item.endDate }}</td>
                  <td>{{ item.productInfo?.pitem }}</td>
                  <td>{{ item.productInfo?.pname }}</td>
                  <td>{{ item.pcode }}</td>
                  <td>{{ item.bcode }}</td>
                </tr>
              </tbody>
            </DTable>
          </DTableContainer>
        </div>

        <!-- 만료예정품목 섹션 -->
        <div class="content">
          <DSectionHeader>
            <DHeaderInfo>
              만료예정품목(+3개월) : {{ expiringItems.length }}개
            </DHeaderInfo>
            <DSearchArea>
              <input type="text" placeholder="바코드 검색" />
              <button>검색</button>
            </DSearchArea>
          </DSectionHeader>
          
          <DTableContainer class="small">
            <DTable>
              <thead>
                <tr>
                  <th>등록일</th>
                  <th>만료일 ▲</th>
                  <th>품목</th>
                  <th>제품명</th>
                  <th>품목코드</th>
                  <th>바코드</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in expiringItems" :key="item.id">
                  <td>{{ item.uploadDate }}</td>
                  <td>{{ item.endDate }}</td>
                  <td>{{ item.productInfo?.pitem }}</td>
                  <td>{{ item.productInfo?.pname }}</td>
                  <td>{{ item.pcode }}</td>
                  <td>{{ item.bcode }}</td>
                </tr>
              </tbody>
            </DTable>
          </DTableContainer>
        </div>
      </DSection>
    </DMainDiv>

    <ModalBtnHeightDiv></ModalBtnHeightDiv>
    <ModalBtnDiv>
      <ModalBtn class="red" @click="$emit('close')">닫기</ModalBtn>
    </ModalBtnDiv>
  </DContainer>
</template>

<script>
import { onMounted, ref } from 'vue';
import * as PublicCss from '@/assets/styles/public.js';
import * as ModalCss from '@/assets/styles/ModalCss.js';
import * as ModalDurabilityCss from '@/assets/styles/rentLookUp/ModalDurabilityCss.js';
import Swal from 'sweetalert2';
import MicrosoftExcel from 'vue-material-design-icons/MicrosoftExcel.vue';
import { createDurability, getDurabilityList } from '@/api/rent';
import { useStore } from 'vuex';
import * as XLSX from 'xlsx';
export default {
  name: 'ModalDurability',
  components: {
    ...PublicCss,
    ...ModalCss,
    ...ModalDurabilityCss,
    MicrosoftExcel,
  },
  props: ['show'],
  setup() {
    const store = useStore();
    const storeGetters = store.getters;
    const durabilityList = ref([]);
    const expiredItems = ref([]);
    const expiringItems = ref([]);
    const fileInput = ref(null);
    
    const handleExcelUpload = () => {
      // 파일 입력 요소 클릭하여 파일 선택 다이얼로그 열기
      fileInput.value.click();
    };
    
    const showBarcodeModal = () => {
      Swal.fire({
        title: '바코드 등록',
        width: 500,
        confirmButtonText: '등록',
        showCancelButton: true,
        cancelButtonText: '닫기',
        html: `
        <div class="swal-search-form">
            <div class="swal-form-group">
              <label>품목코드</label>
              <input id="swal-itemCode" class="swal2-input" placeholder="품목코드">
            </div>
            <div class="swal-form-group">
              <label>바코드</label>
              <input id="swal-barcode" class="swal2-input" placeholder="바코드">
            </div>
            <div class="swal-form-group">
              <label>최초등록일</label>
              <input id="swal-firstRegisterDate" class="swal2-input" type="date" placeholder="최초등록일">
            </div>
            <div class="swal-form-group">
              <label>내구연한만료일</label>
              <input id="swal-endDate" class="swal2-input" type="date" placeholder="내구연한만료일">
            </div>
          </div>
        `,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const itemCode = document.getElementById('swal-itemCode').value;
          const barcode = document.getElementById('swal-barcode').value;
          const firstRegisterDate = document.getElementById('swal-firstRegisterDate').value;
          const endDate = document.getElementById('swal-endDate').value;
          
          const response = await createDurability({
            companyId: storeGetters.companyId,
            pcode: itemCode,
            bcode: barcode,
            uploadDate: firstRegisterDate,
            endDate: endDate,
          });
          if (response.success) {
            Swal.fire({
              title: '내구연한관리 등록 성공',
              text: '내구연한관리 등록이 완료되었습니다.',
              icon: 'success'
            });
            // 등록 후 목록 갱신
            fetchDurabilityList();
          }
        }
      });
    };

    const fetchDurabilityList = async () => {
      const response = await getDurabilityList();
      if (response.success) {
        durabilityList.value = response.items;
        
        // 오늘 날짜 기준으로 만료/만료예정 품목 분류
        const today = new Date();
        const threeMonthsLater = new Date();
        threeMonthsLater.setMonth(today.getMonth() + 3);
        
        // 날짜 비교를 위한 형식 변환 함수
        const parseDate = (dateStr) => {
          if (!dateStr) return null;
          return new Date(dateStr);
        };
        
        // 만료품목 필터링 (오늘 이전에 만료된 항목)
        expiredItems.value = response.items.filter(item => {
          const endDate = parseDate(item.endDate);
          return endDate && endDate < today;
        });
        
        // 만료예정품목 필터링 (오늘부터 3개월 이내에 만료되는 항목)
        expiringItems.value = response.items.filter(item => {
          const endDate = parseDate(item.endDate);
          return endDate && endDate >= today && endDate <= threeMonthsLater;
        });
        
        console.log('전체 품목:', durabilityList.value.length);
        console.log('만료 품목:', expiredItems.value.length);
        console.log('만료예정 품목:', expiringItems.value.length);
      }
    };

    const searchDurability = () => {
      const searchQuery = document.getElementById('searchDurability').value;
      if (searchQuery) {
        const filteredList = durabilityList.value.filter(item => 
          item.bcode && item.bcode.includes(searchQuery)
        );
        durabilityList.value = filteredList;
      } else {
        fetchDurabilityList();
      }
    };

    onMounted(() => {
      fetchDurabilityList();
    });

    // 엑셀 파일 처리 함수
    const processExcelFile = (event) => {
      const file = event.target.files[0];
      if (!file) return;
      
      // 로딩 표시
      Swal.fire({
        title: '엑셀 파일 처리 중...',
        text: '잠시만 기다려주세요.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          
          // 첫 번째 시트 가져오기
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          // 시트 데이터를 JSON으로 변환
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 'A' });
          
          // 데이터 처리
          const validRecords = [];
          const invalidRecords = [];
          
          for (let i = 1; i < jsonData.length; i++) { // 첫 번째 행은 헤더로 가정하고 건너뜀
            const row = jsonData[i];
            
            // B열에서 제품코드-바코드 형식 파싱
            if (!row.B) {
              invalidRecords.push(`행 ${i+1}: 제품코드-바코드 정보 없음`);
              continue;
            }
            
            const codeInfo = row.B.split('-');
            if (codeInfo.length !== 2) {
              invalidRecords.push(`행 ${i+1}: 제품코드-바코드 형식이 올바르지 않음 (${row.B})`);
              continue;
            }
            
            const pcode = codeInfo[0].trim();
            const bcode = codeInfo[1].trim();
            
            // F열(최초등록일)과 G열(내구연한만료일) 확인
            if (!row.F || !row.G) {
              invalidRecords.push(`행 ${i+1}: 최초등록일 또는 내구연한만료일 정보 없음`);
              continue;
            }
            
            // 날짜 형식 변환 (Excel 날짜를 YYYY-MM-DD 형식으로)
            let uploadDate, endDate;
            
            try {
              // Excel 날짜가 문자열로 들어올 경우 (예: "2023-01-01")
              if (typeof row.F === 'string') {
                uploadDate = row.F;
              } else {
                // Excel 날짜가 숫자로 들어올 경우
                const excelUploadDate = XLSX.SSF.parse_date_code(row.F);
                uploadDate = `${excelUploadDate.y}-${String(excelUploadDate.m).padStart(2, '0')}-${String(excelUploadDate.d).padStart(2, '0')}`;
              }
              
              if (typeof row.G === 'string') {
                endDate = row.G;
              } else {
                const excelEndDate = XLSX.SSF.parse_date_code(row.G);
                endDate = `${excelEndDate.y}-${String(excelEndDate.m).padStart(2, '0')}-${String(excelEndDate.d).padStart(2, '0')}`;
              }
            } catch (error) {
              invalidRecords.push(`행 ${i+1}: 날짜 형식 변환 오류 (${error.message})`);
              continue;
            }
            
            // 유효한 데이터 추가
            validRecords.push({
              pcode,
              bcode,
              uploadDate,
              endDate,
              companyId: storeGetters.companyId
            });
          }
          
          // 유효한 레코드가 없으면 오류 표시
          if (validRecords.length === 0) {
            Swal.fire({
              icon: 'error',
              title: '처리 실패',
              text: '유효한 데이터가 없습니다. 엑셀 파일 형식을 확인해주세요.'
            });
            return;
          }
          
          // 처리 결과 표시 및 API 호출 확인
          Swal.fire({
            icon: 'info',
            title: '엑셀 파일 처리 완료',
            html: `
              <p>총 ${validRecords.length + invalidRecords.length}개 항목 중 ${validRecords.length}개 처리 가능</p>
              ${invalidRecords.length > 0 ? `<p>오류 항목 ${invalidRecords.length}개:</p><ul>${invalidRecords.map(err => `<li>${err}</li>`).join('')}</ul>` : ''}
              <p>처리 가능한 ${validRecords.length}개 항목을 등록하시겠습니까?</p>
            `,
            showCancelButton: true,
            confirmButtonText: '등록',
            cancelButtonText: '취소'
          }).then((result) => {
            if (result.isConfirmed) {
              registerDurabilityBatch(validRecords);
            }
          });
        } catch (error) {
          console.error('엑셀 파일 처리 오류:', error);
          Swal.fire({
            icon: 'error',
            title: '처리 실패',
            text: `엑셀 파일을 처리하는 중 오류가 발생했습니다: ${error.message}`
          });
        }
      };
      
      reader.onerror = () => {
        Swal.fire({
          icon: 'error',
          title: '파일 읽기 실패',
          text: '파일을 읽는 중 오류가 발생했습니다.'
        });
      };
      
      reader.readAsArrayBuffer(file);
    };
    
    // 일괄 등록 함수
    const registerDurabilityBatch = async (records) => {
      try {
        Swal.fire({
          title: '등록 중...',
          text: '내구연한 정보를 등록하는 중입니다.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        
        let successCount = 0;
        let failCount = 0;
        
        // 각 레코드마다 API 호출
        for (const record of records) {
          try {
            const response = await createDurability(record);
            if (response.success) {
              successCount++;
            } else {
              failCount++;
            }
          } catch (error) {
            console.error('레코드 등록 실패:', error);
            failCount++;
          }
        }
        
        // 결과 표시
        Swal.fire({
          icon: successCount > 0 ? 'success' : 'warning',
          title: '등록 완료',
          html: `
            <p>총 ${records.length}개 중</p>
            <p>성공: ${successCount}개</p>
            <p>실패: ${failCount}개</p>
          `
        });
        
        // 목록 새로고침
        if (successCount > 0) {
          fetchDurabilityList();
        }
      } catch (error) {
        console.error('일괄 등록 실패:', error);
        Swal.fire({
          icon: 'error',
          title: '등록 실패',
          text: `일괄 등록 중 오류가 발생했습니다: ${error.message}`
        });
      }
    };
    
    return {
      showBarcodeModal,
      fetchDurabilityList,
      durabilityList,
      expiredItems,
      expiringItems,
      fileInput,
      handleExcelUpload,
      processExcelFile,
      searchDurability,
    };
  },
};
</script>