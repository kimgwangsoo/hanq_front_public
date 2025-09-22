<template>
  <!-- Modals -->
   <!-- 소독내역 공단등록 -->
  <ModalPage v-model:show="showModalDisinfectionDetail" :height="'65%'" :width="'90%'" :parent="'product'">
    <ModalDisinfectionDetail :show="showModalDisinfectionDetail" @update:show="showModalDisinfectionDetail = $event" />
  </ModalPage>

  <!-- 품목 가격표 출력 -->
  <ModalPage v-model:show="showModalProductPrice" :height="'78%'" :width="'60%'" :parent="'product'">
    <ModalProductPrice :show="showModalProductPrice" @update:show="showModalProductPrice = $event" />
  </ModalPage>

  <!-- 재고 관리창 -->
  <ModalPage v-model:show="showModalProductManagement" :height="'78%'" :width="'100%'" :parent="'product'">
    <ModalProductManagement
    :show="showModalProductManagement"
    @update:show="(val) => { showModalProductManagement = val; }"
    :selectedProduct="selectedProduct"
    @loadProductList="loadProductList"
     />
  </ModalPage>

  <BaseOrderTemplate :search-query="searchQuery" :current-page="currentPage" :total-pages="totalPages" :detailSearchButton="false"
    search-placeholder="품목명, 품목코드" @update:search-query="searchQuery = $event" @search="handleSearch"
    @page-change="handlePageChange" ref="baseTemplate" :headerInfoClass="'minWidth0'">

    <!-- Title Title -->
    <template #title-icon>
      <span class="material-icons">corporate_fare</span>
    </template>
    <template #title-text>
      재고 관리
    </template>

    <!-- Header Buttons -->
    <template #header-buttons>
      <FlexColumnLeft class="width100">
        <div class="width100">
          <FlexBetween>
            <ProductCategory class="marginBottom10" @click="handleProductCategoryClick('')" :class="{ active: selectedProductItem === '' }">전체보기</ProductCategory>
            <FlexDiv>
              <BlueBtn>공단 총 품목 : {{ productCount }}개</BlueBtn>
              <WhiteBtn>보유재고 품목 : {{ productCount }}개</WhiteBtn>
            </FlexDiv>
          </FlexBetween>
        </div>

        <PCategoryTitle>급여 품목</PCategoryTitle>

        <ProductGroup>
          <FlexDiv>
            <div>판매 &nbsp;</div>
            <PBtnContainer>
              <ProductCategory @click="handleProductCategoryClick('이동변기')" :class="{ active: selectedProductItem === '이동변기' }">이동변기
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick('목욕의자')" :class="{ active: selectedProductItem === '목욕의자' }">목욕의자
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick('성인용보행기')" :class="{ active: selectedProductItem === '성인용보행기' }">성인용보행기
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick('욕창예방방석')" :class="{ active: selectedProductItem === '욕창예방방석' }">욕창예방방석
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick('간이변기')" :class="{ active: selectedProductItem === '간이변기' }">간이변기
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick('자세변환용구')" :class="{ active: selectedProductItem === '자세변환용구' }">자세변환용구
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick('지팡이')" :class="{ active: selectedProductItem === '지팡이' }">지팡이</ProductCategory>
              <ProductCategory @click="handleProductCategoryClick('욕창예방 매트리스')" :class="{ active: selectedProductItem === '욕창예방 매트리스' }">욕창예방 매트리스</ProductCategory>
              <ProductCategory @click="handleProductCategoryClick('안전손잡이')" :class="{ active: selectedProductItem === '안전손잡이' }">안전손잡이</ProductCategory>
              <ProductCategory @click="handleProductCategoryClick('요실금팬티')" :class="{ active: selectedProductItem === '요실금팬티' }">요실금팬티</ProductCategory>
              <ProductCategory @click="handleProductCategoryClick('미끄럼방지용품')" :class="{ active: selectedProductItem === '미끄럼방지용품' }">미끄럼방지용품</ProductCategory>
              <ProductCategory @click="handleProductCategoryClick('경사로(실내용)')" :class="{ active: selectedProductItem === '경사로(실내용)' }">경사로(실내용)</ProductCategory>
            </PBtnContainer>
          </FlexDiv>
        </ProductGroup>

        <ProductGroup>
          <FlexDiv>
            <div>대여 &nbsp;</div>
            <PBtnContainer>
              <ProductCategory @click="handleProductCategoryClick('전동침대')" :class="{ active: selectedProductItem === '전동침대' }">전동침대
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick('수동휠체어')" :class="{ active: selectedProductItem === '수동휠체어' }">수동휠체어
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick('경사로(실외용)')" :class="{ active: selectedProductItem === '경사로(실외용)' }">경사로(실외용)
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick('이동욕조')" :class="{ active: selectedProductItem === '이동욕조' }">이동욕조
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick('배회감지기')" :class="{ active: selectedProductItem === '배회감지기' }">배회감지기
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick('욕창예방 매트리스')" :class="{ active: selectedProductItem === '욕창예방 매트리스' }">욕창예방매트리스
              </ProductCategory>
            </PBtnContainer>
          </FlexDiv>
        </ProductGroup>

        <PCategoryTitle>보유 재고 구분</PCategoryTitle>

        <ProductGroup>
          <FlexDiv>
            <div>판매</div>
            <PBtnContainer>
              <ProductCategory @click="handleProductCategoryClick(selectedProductItem, 'saleall')" :class="{ active: selectedStockType === 'saleall' }">전체<PBadge>{{ stockCount.saleStock }}</PBadge>
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick(selectedProductItem, 'saleUnrelease')" :class="{ active: selectedStockType === 'saleUnrelease' }">미출고<PBadge>{{ stockCount.saleUnrelease }}</PBadge>
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick(selectedProductItem, 'saleAs')" :class="{ active: selectedStockType === 'saleAs' }">A/S<PBadge>{{ stockCount.saleAs }}</PBadge>
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick(selectedProductItem, 'saleUsed')" :class="{ active: selectedStockType === 'saleUsed' }">중고<PBadge>{{ stockCount.saleUsed }}</PBadge>
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick(selectedProductItem, 'saleFaulty')" :class="{ active: selectedStockType === 'saleFaulty' }">불량<PBadge>{{ stockCount.saleFaulty }}</PBadge>
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick(selectedProductItem, 'saleReturn')" :class="{ active: selectedStockType === 'saleReturn' }">자진신고<PBadge>{{ stockCount.saleReturn }}</PBadge>
              </ProductCategory>
            </PBtnContainer>
          </FlexDiv>


        </ProductGroup>

        <ProductGroup>
          <FlexDiv>
            <div>대여</div>
            <PBtnContainer>
              <ProductCategory @click="handleProductCategoryClick(selectedProductItem, 'rentalall')" :class="{ active: selectedStockType === 'rentalall' }">전체<PBadge>{{ stockCount.rentalStock }}</PBadge>
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick(selectedProductItem, 'rentalUnrelease')" :class="{ active: selectedStockType === 'rentalUnrelease' }">
                소독 미출고<PBadge>{{ stockCount.rentalUnrelease }}</PBadge>
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick(selectedProductItem, 'rentalAs')" :class="{ active: selectedStockType === 'rentalAs' }">
                미소독 미출고<PBadge>{{ stockCount.rentalAs }}</PBadge>
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick(selectedProductItem, 'rentalUsed')" :class="{ active: selectedStockType === 'rentalUsed' }">A/S<PBadge>{{ stockCount.rentalUsed }}</PBadge>
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick(selectedProductItem, 'rentalUsed')" :class="{ active: selectedStockType === 'rentalUsed' }">중고<PBadge>{{ stockCount.rentalUsed }}</PBadge>
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick(selectedProductItem, 'rentalFaulty')" :class="{ active: selectedStockType === 'rentalFaulty' }">불량<PBadge>{{ stockCount.rentalFaulty }}</PBadge>
              </ProductCategory>
              <ProductCategory @click="handleProductCategoryClick(selectedProductItem, 'rentalReturn')" :class="{ active: selectedStockType === 'rentalReturn' }">자진신고<PBadge>{{ stockCount.rentalReturn }}</PBadge>
              </ProductCategory>
            </PBtnContainer>
          </FlexDiv>
        </ProductGroup>

        <FlexDiv>
          <GreenBtn @click="showExcelProductUpload">엑셀 재고등록</GreenBtn>
          <BlueBtn @click="showModalDisinfectionDetail = true">소독내역 공단등록</BlueBtn>
          <BlueBtn @click="showModalProductPrice = true">품목 가격표 출력</BlueBtn>
        </FlexDiv>
      </FlexColumnLeft>
    </template>
    <template #table>
      <TableContainer>
        <DataTable>
          <thead>
            <tr>
              <th>품목</th>
              <th>이미지</th>
              <th>품목명</th>
              <th>품목코드</th>
              <th>구입/대여</th>
              <th>급여/비급여</th>
              <th>출고단가</th>
              <th>매입단가</th>
              <th>색상</th>
              <th>사이즈</th>
              <th>수량</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="item in productList" :key="item.id">
              <!-- 기본 제품 정보 행 -->
              <tr @click="handleProductItemClick(item)" class="product-row">
                <td :rowspan="getTotalRowspan(item)">{{ item.pitem }}</td>
                <td :rowspan="getTotalRowspan(item)">
                  <img :src="getProductImageUrl(item.pcode)" alt="이미지" style="width: 100px; height: 100px;" />
                </td>
                <td :rowspan="getTotalRowspan(item)">{{ item.pname }}</td>
                <td :rowspan="getTotalRowspan(item)">{{ item.pcode }}</td>
                <td :rowspan="getTotalRowspan(item)">{{ item.target }}</td>
                <td :rowspan="getTotalRowspan(item)"></td>
                <td :rowspan="getTotalRowspan(item)">
                  <template v-if="item.target === '구입'">{{ item.buyPrice }}</template>
                  <template v-else-if="item.target === '대여'">{{ item.rentPrice }}</template>
                  <template v-else>{{ item.buyPrice }}/{{ item.rentPrice }}</template>
                </td>
                <td :rowspan="getTotalRowspan(item)"></td>
                
                <!-- 색상/사이즈 정보가 없는 경우 -->
                <td v-if="!hasColorOrSize(item)">
                </td>
                <td v-if="!hasColorOrSize(item)">
                </td>
                <td v-if="!hasColorOrSize(item)">
                  <template v-for="stock in item.stocks" :key="stock.id">
                    {{ stock.count }}
                  </template>
                </td>
              </tr>
              
              <!-- 색상만 있는 경우 -->
              <template v-if="hasOnlyColors(item)">
                <tr v-for="(color, cIndex) in item.productColors" :key="`${item.productColorId}-color-only-${cIndex}`" class="stock-row">
                  <td>{{ color.productColorInfo?.name }}</td>
                  <td>-</td>
                  <td :class="{ 'out-of-stock': getColorStockQuantity(item, color) === 0 }">
                    {{ getColorStockQuantity(item, color) }}
                  </td>
                </tr>
              </template>
              
              <!-- 사이즈만 있는 경우 -->
              <template v-if="hasOnlySizes(item)">
                <tr v-for="(sizeValue, sIndex) in getSizeArray(item)" :key="`${item.id}-size-only-${sIndex}`" class="stock-row">
                  <td>-</td>
                  <td>{{ sizeValue }}</td>
                  <td :class="{ 'out-of-stock': getSizeStockQuantity(item, sizeValue) === 0 }">
                    {{ getSizeStockQuantity(item, sizeValue) }}
                  </td>
                </tr>
              </template>
              
              <!-- 색상과 사이즈 모두 있는 경우 -->
              <template v-if="hasColorsAndSizes(item)">
                <template v-for="(color, cIndex) in item.productColors" :key="`${item.productColorId}-color-${cIndex}`">
                  <tr v-for="(sizeValue, sIndex) in getSizeArray(item)" :key="`${item.id}-size-${sIndex}-${cIndex}`" class="stock-row">
                    <!-- 첫번째 사이즈 행에만 색상 표시 -->
                    <td v-if="sIndex === 0" :rowspan="getSizeArray(item).length">
                      {{ color.productColorInfo?.name }}
                    </td>
                    <td>{{ sizeValue }}</td>
                    <td :class="{ 'out-of-stock': getColorSizeStockQuantity(item, color, sizeValue) === 0 }">
                      {{ getColorSizeStockQuantity(item, color, sizeValue) }}
                    </td>
                  </tr>
                </template>
              </template>
            </template>
          </tbody>
        </DataTable>
      </TableContainer>
    </template>

  </BaseOrderTemplate>

</template>

<script>
import { ref, onMounted } from 'vue'
import * as PublicCss from '@/assets/styles/public.js'
import * as ProductPageCss from '@/assets/styles/product/ProductPageCss'
import BaseOrderTemplate from '@/components/BaseOrderTemplate.vue'
import ModalPage from '@/components/modal/ModalPage.vue'
import ModalDisinfectionDetail from '@/components/modal/product/ModalDisinfectionDetail.vue'
import ModalProductPrice from '@/components/modal/product/ModalProductPrice.vue'
import ModalProductManagement from '@/components/modal/product/ModalProductManagement.vue'
import { getProducts } from '@/api/product'
import { getStockCount } from '@/api/stock'
import { getProductImageUrl } from '@/components/modal/product/utils/imgUrl'

export default {
  name: 'ProductPage',
  components: {
    BaseOrderTemplate,
    ...PublicCss,
    ...ProductPageCss,
    ModalPage,
    ModalDisinfectionDetail,
    ModalProductPrice,
    ModalProductManagement,
  },
  setup() {
    // 반응형 데이터
    const searchQuery = ref('')
    const currentPage = ref(1)
    const totalPages = ref(1)
    const baseTemplate = ref(null)
    const showModalDisinfectionDetail = ref(false)
    const showModalProductPrice = ref(false)
    const showModalProductManagement = ref(false)
    const selectedProduct = ref(null)
    const selectedProductItem = ref('')
    const selectedStockType = ref('')
    const stockCount = ref({})
    
    const getColorStockQuantity = (item, color) => {
      const stock = item.stocks.find(stock => stock.productColorId === color?.productColorId);
      return stock ? stock.count : 0;
    }

    const getSizeStockQuantity = (item, size) => {
      const stock = item.stocks.find(stock => stock.productSize === size);
      return stock ? stock.count : 0;
    }

    const getColorSizeStockQuantity = (item, color, size) => {
      const stock = item.stocks.find(stock => stock.productColorId === color?.productColorId && stock.productSize === size);
      return stock ? stock.count : 0;
    }

    
    // 색상과 사이즈 정보가 있는지 확인 함수들
    const hasColorOrSize = (item) => {
      return (item.productColors && item.productColors.length > 0) || 
             (item.productSizes && item.productSizes.length > 0);
    }
    
    const hasOnlyColors = (item) => {
      return (item.productColors && item.productColors.length > 0) && 
             (!item.productSizes || item.productSizes.length === 0);
    }
    
    const hasOnlySizes = (item) => {
      return (!item.productColors || item.productColors.length === 0) && 
             (item.productSizes && item.productSizes.length > 0);
    }
    
    const hasColorsAndSizes = (item) => {
      return (item.productColors && item.productColors.length > 0) && 
             (item.productSizes && item.productSizes.length > 0);
    }
    
    // 사이즈 배열 가져오기
    const getSizeArray = (item) => {
      if (!item.productSizes || item.productSizes.length === 0) return [];
      return item.productSizes[0].size ? item.productSizes[0].size.split(',') : [];
    }
    
    // 총 행 수 계산 (rowspan 용)
    const getTotalRowspan = (item) => {
      if (!hasColorOrSize(item)) return 1;
      
      if (hasColorsAndSizes(item)) {
        return item.productColors.length * getSizeArray(item).length +1;
      } else if (hasOnlyColors(item)) {
        return item.productColors.length+1;
      } else if (hasOnlySizes(item)) {
        return getSizeArray(item).length+1;
      }
      
      return 1;
    }
    
    // 검색 처리
    const handleSearch = () => {
      // 검색 로직 구현
      loadProductList()
    }

    // 페이지 변경 처리
    const handlePageChange = (page) => {
      currentPage.value = page
      // 페이지 변경 로직 구현
      loadProductList()
    }

    const handleProductItemClick = (item) => {
      showModalProductManagement.value = true
      selectedProduct.value = item
    }

    const handleProductCategoryClick = (item, stockType) => {
      currentPage.value = 1
      selectedProductItem.value = item
      selectedStockType.value = stockType
      loadProductList()
    }

    // 품목 리스트 조회
    const productList = ref([])
    const productCount = ref(0)
    const productLimit = ref(20)

    const loadProductList = async () => {
      try {
        // Swal 로딩 표시
        baseTemplate.value.$swalLoading();

          // API 호출
        const response = await getProducts({
          page: currentPage.value,
          limit: productLimit.value,
          pitem: selectedProductItem.value,
          stockType: selectedStockType.value,
          search: searchQuery.value,
        })
          productList.value = response.items
          productCount.value = response.total
          totalPages.value = Math.ceil(productCount.value / productLimit.value)
          currentPage.value = response.page
          loadProductCount()
        } catch (error) {
          console.error('품목 리스트 조회 실패:', error);
        } finally {
          baseTemplate.value.$swalClose();
        }
    }

    const loadProductCount = async () => {
      const response = await getStockCount({
        search: searchQuery.value,
        pitem: selectedProductItem.value,
      })
      stockCount.value = response.items
    }

    const showExcelProductUpload = () => {
      baseTemplate.value.showSwalModal({
        title: '재고 등록',
        width: "30%",
        html: `
            <div class="excel-export-modal">
              <div class="excel-button-container">
                <button class="excel-export-btn" id="export-client-list">
                  <i class="material-icons">file_download</i>
                  엑셀양식 다운로드
                  </button>
                <button class="excel-export-btn" id="export-client-history">
                  <i class="material-icons">attach_file</i>
                  엑셀 등록
                </button>
              </div>
            </div>
          `,
      })
    }

    onMounted(() => {
      loadProductList()
    })
    
    return {
      searchQuery,
      currentPage,
      totalPages,
      handleSearch,
      handlePageChange,
      showExcelProductUpload,
      baseTemplate,
      showModalDisinfectionDetail,
      showModalProductPrice,
      showModalProductManagement,
      productList,
      loadProductList,
      loadProductCount,
      productCount,
      productLimit,
      selectedProduct,
      selectedProductItem,
      selectedStockType,
      handleProductCategoryClick,
      handleProductItemClick,
      hasColorOrSize,
      hasOnlyColors,
      hasOnlySizes,
      hasColorsAndSizes,
      getSizeArray,
      getTotalRowspan,
      getColorStockQuantity,
      getSizeStockQuantity,
      getColorSizeStockQuantity,
      stockCount,
      getProductImageUrl,
    }
  }
}
</script>

<style scoped>
.product-row {
  background-color: #f8f9fa;
}

.stock-row td {
  border-top: none;
}

.out-of-stock {
  color: #c40000;
  font-weight: bold;
  background-color: #ffe6e6;
}
</style>