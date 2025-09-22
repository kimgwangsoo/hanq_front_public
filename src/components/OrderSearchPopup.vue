<template>
    <div>
      <div class="flex-div" v-for="field in fields" :key="field.id">
        <span class="spanStyle">{{ field.label }} :</span>
        <select v-if="field.type === 'select'" :id="field.id" class="swal2-input">
          <option v-for="option in field.options" :key="option.value" :value="option.value" :selected="searchParams[field.id] === option.value">
            {{ option.label }}
          </option>
        </select>
        <input v-else :type="field.type" :id="field.id" class="swal2-input" :value="searchParams[field.id]">
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchPopup',
    props: {
      searchParams: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        fields: [
          {id: 'contractState', 
          label: '계약상태', 
          type: 'select', 
          options: [
            { value: '', label: '전체' }, 
            { value: 'ok', label: '계약완료' }, 
            { value: 'vok', label: '부분계약완료' }, 
            { value: 'cok', label: '취소계약완료' }, 
            { value: 'n', label: '미계약' }]
          },
          {
            id: 'deliveryState',
            label: '배송상태',
            type: 'select',
            options: [
              { value: '', label: '전체' },
              { value: '1', label: '배송완료' },
              { value: '2', label: '배송대기' },
              { value: '3', label: '회수중' },
              { value: '4', label: '회수완료' }
            ]
          },
          {
            id: 'deliveryType',
            label: '배송방법',
            type: 'select',
            options: [
              { value: '0', label: '전체' },
              { value: '1', label: '내방' },
              { value: '2', label: '택배' },
              { value: '3', label: '물류' },
              { value: '4', label: '소독업체' },
              { value: '5', label: '공급업체' }
            ]
          },
          { id: 'printOption', label: '인쇄', type: 'select', options: [{ value: '0', label: '선택' }] },
          { id: 'pname', label: '품목명', type: 'text' },
          { id: 'centerName', label: '센터명', type: 'text' },
          { id: 'manager', label: '담당자', type: 'text' },
          { id: 'phone1', label: '연락처', type: 'text' },
          { id: 'bcode', label: '바코드', type: 'text' },
          { id: 'memo', label: '메모', type: 'text' },
        ]
      }
    },
    methods: {
      getFormValues() {
        const values = {};
        this.fields.forEach(field => {
          values[field.id] = document.getElementById(field.id).value;
        });
        return values;
      }
    }
  }
  </script>
 
<style scoped> 
  .swal2-input {
    font-size: 16px;
    @media (max-width: 768px) {
      font-size: 13px;
    }
  }

  .spanStyle {
    width: 100px;
    @media (max-width: 768px) {
      font-size: 15px;
      font-weight: bold;
    }
  }

  
</style>