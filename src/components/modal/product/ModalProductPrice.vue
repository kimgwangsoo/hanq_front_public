<template>
  <div>
  <PSubTitle class="flex-center">품목 가격표 출력</PSubTitle>

  <ProductPriceContainer v-for="i in 30" :key="i">
    <ProductCard v-for="(product, index) in products" :key="index">
      <CardContent>
        <LeftPanel>
          <ProductName>{{ product.name }}</ProductName>
          <ProductName class="model">{{ product.model }}</ProductName>
          <ProductImage>
            <img :src="product.image" :alt="product.name" />
          </ProductImage>
        </LeftPanel>
        <RightPanel>
          <MonthlyPrice>월 {{ product.price }}원</MonthlyPrice>
          <DiscountPrice>15%: {{ product.discount15 }}원</DiscountPrice>
          <DiscountPrice>9%: {{ product.discount9 }}원</DiscountPrice>
          <DiscountPrice>6%: {{ product.discount6 }}원</DiscountPrice>
        </RightPanel>
      </CardContent>
      <ProductCode>{{ product.code }}</ProductCode>
    </ProductCard>
  </ProductPriceContainer>

  <ModalBtnHeightDiv></ModalBtnHeightDiv>
    <ModalBtnDiv>
      <ModalBtn>인쇄</ModalBtn>
      <ModalBtn class="gray">닫기</ModalBtn>
    </ModalBtnDiv>
  </div>
</template>

<script>
import { ref } from 'vue'
import * as PublicCss from '@/assets/styles/public.js'
import * as ModalCss from '@/assets/styles/ModalCss'
import * as ProductPageCss from '@/assets/styles/product/ProductPageCss'

export default {
  name: 'ModalProductPrice',
  components: {
    ...PublicCss,
    ...ModalCss,
    ...ProductPageCss,
  },
  setup() {
    const products = ref([
      {
        name: '이동욕조',
        model: 'YW-BA-1000',
        image: 'https://via.placeholder.com/150', // Replace with actual image path
        price: '25,700',
        discount15: '3,855',
        discount9: '2,313',
        discount6: '1,542',
        code: 'B03030030001'
      },
      {
        name: '이동욕조',
        model: 'YW-BA-2000',
        image: 'https://via.placeholder.com/150', // Replace with actual image path
        price: '25,700',
        discount15: '3,855',
        discount9: '2,313',
        discount6: '1,542',
        code: 'B03030030101'
      },
      {
        name: '이동욕조',
        model: 'YH-2002',
        image: 'https://via.placeholder.com/150', // Replace with actual image path
        price: '33,400',
        discount15: '5,010',
        discount9: '3,006',
        discount6: '2,004',
        code: 'B03030031001'
      }
    ]);

    return {
      products,
    }
  }
}
</script>