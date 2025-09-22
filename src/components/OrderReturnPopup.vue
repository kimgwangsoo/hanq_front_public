<template>
    <div class="return-popup">
      <h2>반품할 품목을 선택해주세요</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>품목코드</th>
            <th>바코드</th>
            <th>품목</th>
            <th>품목명</th>
            <th>사이즈</th>
            <th>색상</th>
          </tr>
        </thead>
        <tbody>
          <ReturnPopupTr v-for="(product, index) in products" :key="index">
            <td><input type="checkbox" v-model="product.selected"></td>
            <td>{{ product.code }}</td>
            <td>{{ product.barcodes[0] }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.name2 }}</td>
            <td>{{ product.size }}</td>
            <td>{{ product.color }}</td>
          </ReturnPopupTr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ReturnPopupTr } from '@/assets/styles/OrderReturnPopupCss';
  export default {
    name: 'OrderReturnPopup',
    components: {
      ReturnPopupTr
    },
    props: {
      returnParams: {
        type: Object,
        required: true
      },
      products: {
        type: Array,
        required: true
      }
    },
    methods: {
      getFormValues() {
        // 선택된 제품들을 반환하는 로직
        return {
          selectedProducts: this.products.filter(product => product.selected)
        };
      }
    }
  }
  </script>
  
  <style scoped>
  /* 스타일 정의 */
  </style>