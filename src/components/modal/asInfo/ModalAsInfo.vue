<template>
  <div class="as-info-container">
    <div class="as-info-header">
      <h2>A/S 접수내역</h2>
    </div>
    
    <div class="as-info-content">
      <!-- A/S 접수 내역 테이블 -->
      <div class="as-info-table-container">
        <table class="as-info-table">
          <thead>
            <tr>
              <th>접수일시</th>
              <th>품목명</th>
              <th>제품코드</th>
              <th>제품바코드</th>
              <th>수리/보수사항</th>
              <th>처리내용</th>
              <th>처리일시</th>
              <th>처리상태</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="asRecords.length === 0">
              <td colspan="7" class="no-data">등록된 A/S 내역이 없습니다.</td>
            </tr>
            <tr v-for="(record, index) in asRecords" :key="index">
              <td>{{ formatDate(record.receiptAt) }}</td>
              <td>{{ record.product.pname }}</td>
              <td>{{ record.product.pcode }}</td>
              <td>{{ record.orderProductBcode.bcode }}</td>
              <td>
                <template v-if="!record.receiptEndDate">
                  <textarea v-model="record.receiptTxt" class="receipt-textarea"></textarea>
                </template>
                <template v-else>
                  {{ record.receiptTxt }}
                </template>
              </td>
              <td>
                  <template v-if="!record.receiptEndDate">
                    <textarea v-model="record.receiptEndTxt" class="process-textarea"></textarea>
                  </template>
                  <template v-else>
                    {{ record.receiptEndTxt }}
                  </template>
              </td>

              <td>
                <input v-if="!record.receiptEndDate" type="date" 
                  v-model="record.receiptEndDateCopy" 
                  class="date-input"
                />
                <template v-else>{{ record.receiptEndDate }}</template>
              </td>
              <td>
                {{ !record.receiptEndDate ? '미처리' : record.processState }}
                <button v-if="!record.receiptEndDate" class="complete-button" @click="completeAsRecord(record.id, record.receiptTxt, record.receiptEndTxt, record.receiptEndDateCopy)">처리완료</button>
                <button v-if="!record.receiptEndDate" class="delete-button" @click="deleteAsRecord(record.id)">삭제</button>
                <button v-else class="cancel-button" @click="cancelAsRecordData(record.id)">처리취소</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 선택된 제품 목록 -->
      <div class="selected-products-container" v-if="selectedProducts && selectedProducts.length > 0">
        <h3>선택된 제품</h3>
        <div class="selected-products-list">
          <div v-for="(product, index) in selectedProducts" :key="index" class="selected-product-item">
            <div class="product-info">
              <span class="product-name">{{ product.product?.pname || '제품명 없음' }}</span>
              <span class="product-code">({{ product.product?.pcode || '코드 없음' }})</span>
              <div class="product-barcodes">
                <div v-for="(bcode, bcodeIndex) in product.orderProductBcodes" :key="bcodeIndex" class="barcode-item">
                  <span class="barcode">{{ bcode.bcode || '바코드 없음' }}</span>
                  <button class="select-for-as-button" @click="selectProductForAs(product, bcode.bcode)">
                    이 바코드로 A/S 접수
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- A/S 접수 폼 -->
      <div class="as-info-form" v-if="selectedProducts && selectedProducts.length > 0">
        <h3>A/S 접수하기</h3>
        <div class="form-group">
          <label>품목명</label>
          <input type="text" v-model="newAsRecord.itemName" placeholder="품목명을 입력하세요" readonly>
        </div>
        <div class="form-group">
          <label>제품코드</label>
          <input type="text" v-model="newAsRecord.productPcode" placeholder="제품명을 입력하세요" readonly>
        </div>
        <div class="form-group">
          <label>제품바코드</label>
          <input type="text" v-model="newAsRecord.productBcode" placeholder="제품바코드를 입력하세요" readonly>
        </div>
        <div class="form-group">
          <label>수리/보수사항</label>
          <textarea v-model="newAsRecord.repairDetails" placeholder="수리/보수사항을 입력하세요"></textarea>
        </div>
        <div class="form-group">
            <label>접수일자</label>
            <input type="date" v-model="newAsRecord.receiptDate" placeholder="접수일자를 입력하세요">
        </div>
        <div class="form-buttons">
          <button class="submit-button" @click="submitAsRecord">접수하기</button>
          <button class="cancel-button" @click="closeModal">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { createAsInfo, findAsInfo, updateAsInfo, cancelAsInfo, deleteAsInfo } from '../../../api/asInfo';
import { useStore } from 'vuex';
import Swal from 'sweetalert2';
export default {
  name: 'ModalAsInfo',
  props: {
    orderId: {
      type: [String, Number],
      required: true
    },
    clientId: {
      type: [String, Number],
      required: true
    },
    selectedProducts: {
      type: Array,
      required: true
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const user = store.getters.user;
    console.log('user:', user);
    const asRecords = ref([]);
    const newAsRecord = ref({
      itemName: '',
      productPcode: '',
      productBcode: '',
      receiptDate: new Date().toISOString().substr(0, 10),
      receiptTxt: '',
      receiptEndDate: '',
      receiptEndTxt: '',
      productId: null // 선택된 제품 ID 저장
    });
    
    // 편집 모드 관련 변수
    const editMode = ref(false);
    const editTarget = ref(null);
    const editField = ref('');
    const editValue = ref('');
    
    // 선택된 제품으로 A/S 접수 폼 채우기
    const selectProductForAs = (product, bcode) => {
      if (product && product.product) {
        newAsRecord.value = {
          itemName: product.product.pname || '',
          productPcode: product.product.pcode || '',
          productBcode: bcode || '',
          repairDetails: '',
          processDetails: '',
          receiptDate: new Date().toISOString().substr(0, 10),
          processDate: null,
          productId: product.id || null
        };
      }
    };

    const fetchAsRecords = async () => {
      try {
        // API 호출로 해당 주문의 A/S 내역을 가져옵니다
        const response = await findAsInfo(props.orderId);
        asRecords.value = response.items;
      } catch (error) {
        console.error('A/S 내역을 불러오는 중 오류가 발생했습니다:', error);
        
      }
    };

    const submitAsRecord = async () => {
      try {
        // 필수 필드 검증
        if (!newAsRecord.value.itemName || !newAsRecord.value.productPcode || !newAsRecord.value.repairDetails || !newAsRecord.value.productBcode || !newAsRecord.value.receiptDate) {
          Swal.fire({
            icon: 'error',
            title: '품목명, 제품명, 수리/보수사항, 제품바코드, 접수일자는 필수 입력 항목입니다.',
            timer: 1500,
            showConfirmButton: false,
          });
          return;
        }

        // API 호출로 A/S 접수 정보를 저장합니다
        await createAsInfo({
          orderId: props.orderId,
          productId: props.selectedProducts[0].productId,
          orderProductBcodeId: props.selectedProducts[0].orderProductBcodes[0].id,
          receiptTxt: newAsRecord.value.repairDetails,
          receiptAt: new Date().toISOString()
        });

        // 성공 메시지 표시
        Swal.fire({
          icon: 'success',
          title: 'A/S 접수가 완료되었습니다.',
          timer: 1500,
          showConfirmButton: false,
        });
        
        // 폼 초기화
        newAsRecord.value = {
          itemName: '',
          productPcode: '',
          productBcode: '',
          repairDetails: '',
          processDetails: '',
          receiptDate: new Date().toISOString().substr(0, 10),
          processDate: null
        };
        
        // 목록 새로고침
        fetchAsRecords();
      } catch (error) {
        console.error('A/S 접수 중 오류가 발생했습니다:', error);
        alert('A/S 접수 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    };
    
    // A/S 레코드 수정 함수
    const editAsRecord = (record, field) => {
      editMode.value = true;
      editTarget.value = record;
      editField.value = field;
      editValue.value = record[field];
      
      // 팝업으로 수정창 표시
      const newValue = prompt(`${field === 'repairDetails' ? '수리/보수사항' : '처리내용'}을 수정해주세요:`, record[field]);
      
      if (newValue !== null) {
        // 실제 API 호출을 통한 수정 처리
        try {
          // API 호출 코드
          // await axios.put(`/api/as-records/${record.id}`, { [field]: newValue });
          
          // 테스트용 로직 - 실제로는 API 호출로 대체
          record[field] = newValue;
          
          alert('수정이 완료되었습니다.');
          
          // 편집 모드 종료
          editMode.value = false;
          editTarget.value = null;
          editField.value = '';
          editValue.value = '';
        } catch (error) {
          console.error('수정 중 오류가 발생했습니다:', error);
          alert('수정 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
    };
    
    // A/S 접수 취소 함수
    const cancelAsRecordData = async (id) => {
      try {
        await cancelAsInfo(id);
        Swal.fire({
          icon: 'success',
          title: 'A/S 처리가 취소되었습니다.',
          timer: 1500,
          showConfirmButton: false,
        });
        fetchAsRecords();
      } catch (error) {
        console.error('A/S 접수 취소 중 오류가 발생했습니다:', error);
        alert('A/S 접수 취소 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    const completeAsRecord = async (id, receiptTxt, receiptEndTxt, receiptEndDateCopy) => {
      try {
        Swal.fire({
          title: 'A/S 처리가 완료하시겠습니까?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '완료',
          cancelButtonText: '취소'
        }).then(async (result) => {
          if (result.isConfirmed) {
            // API 호출 코드
            await updateAsInfo(id, {
              receiptTxt: receiptTxt,
              receiptEndDate: receiptEndDateCopy,
              receiptEndTxt: receiptEndTxt
            });
            
            Swal.fire({
              icon: 'success',
              title: 'A/S 처리가 완료되었습니다.',
              timer: 1500,
              showConfirmButton: false,
            });
            fetchAsRecords();
          }
        });
      } catch (error) {
        console.error('A/S 처리 중 오류가 발생했습니다:', error);
        Swal.fire({
          icon: 'error',
          title: 'A/S 처리 중 오류가 발생했습니다.',
          text: '다시 시도해주세요.'
        });
      }
    };
    
    // A/S 레코드 삭제 함수
    const deleteAsRecord = async (id) => {
      try {
        Swal.fire({
          title: 'A/S 레코드를 삭제하시겠습니까?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '삭제',
          cancelButtonText: '취소'
        }).then(async (result) => {
          if (result.isConfirmed) {
            // API 호출 코드
            await deleteAsInfo(id);
            
            // 테스트용 로직 - 실제로는 API 호출로 대체
            asRecords.value = asRecords.value.filter(r => r.id !== id);
            
            Swal.fire({
              icon: 'success',
              title: 'A/S 레코드가 삭제되었습니다.',
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      } catch (error) {
        console.error('A/S 레코드 삭제 중 오류가 발생했습니다:', error);
        alert('A/S 레코드 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    };

    const formatDate = (date) => {
      if (!date) return '-';
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const closeModal = () => {
      emit('close');
    };

    onMounted(() => {
      fetchAsRecords();
      
      // 선택된 제품이 있으면 첫 번째 제품으로 폼 초기화
      console.log('selectedProducts:', props.selectedProducts);
      if (props.selectedProducts && props.selectedProducts.length > 0) {
        selectProductForAs(props.selectedProducts[0], props.selectedProducts[0].orderProductBcodes[0].bcode);
      }
    });

    return {
      asRecords,
      newAsRecord,
      submitAsRecord,
      formatDate,
      closeModal,
      editAsRecord,
      cancelAsRecordData,
      deleteAsRecord,
      editMode,
      editTarget,
      editField,
      editValue,
      selectProductForAs,
      completeAsRecord
    };
  }
};
</script>

<style scoped>
.as-info-container {
  padding: 20px;
  font-family: 'Noto Sans KR', sans-serif;
}

.as-info-header {
  margin-bottom: 20px;
  text-align: center;
}

.as-info-header h2 {
  font-size: 24px;
  color: #333;
}

.as-info-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.as-info-table-container {
  overflow-x: auto;
}

.as-info-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.as-info-table th, .as-info-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.as-info-table th {
  background-color: #f5f5f5;
  font-weight: bold;
}

.as-info-table .no-data {
  text-align: center;
  padding: 20px;
  color: #888;
}

.as-info-form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.as-info-form h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input, .form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group textarea {
  height: 100px;
  resize: vertical;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.submit-button, .cancel-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
}

.submit-button:hover {
  background-color: #45a049;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}

.cancel-button:hover {
  background-color: #d32f2f;
}

.edit-button {
  background-color: #2196F3;
  color: white;
  padding: 4px 8px;
  margin-left: 5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

.edit-button:hover {
  background-color: #0b7dda;
}

.delete-button {
  background-color: #ff5722;
  color: white;
  padding: 4px 8px;
  margin-left: 5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

/* 선택된 제품 목록 스타일 */
.selected-products-container {
  margin-bottom: 20px;
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.selected-products-container h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 18px;
  color: #333;
}

.selected-products-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.selected-product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.product-info {
  display: flex;
  /* flex-direction: column; */
}

.product-name {
  font-weight: bold;
  font-size: 16px;
}

.product-code {
  color: #666;
  font-size: 14px;
}

.select-for-as-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
}

.select-for-as-button:hover {
  background-color: #45a049;
}
</style>