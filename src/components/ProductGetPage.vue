<template>
    <ProductGetDiv>
        <ProductGetHeaderArea>
            <ProductGetTitleArea>
                <Domain/>&nbsp;&nbsp;&nbsp;<span>내 창고</span>
            </ProductGetTitleArea>
            <ProductGetSearchArea>
                <ProductGetSearchInputTxt type="text" placeholder="검색어를 입력하세요" v-model="searchQuery" @keyup.enter="fetchData()" />
                <ProductGetSearchBtn @click="fetchData()"><Magnify/></ProductGetSearchBtn>
            </ProductGetSearchArea>
            <div>
                <div>검색 품목:{{ products_info.total_cnt }}개</div>
            </div>
        </ProductGetHeaderArea>
        <ProductGetBodyArea>
            <ProductGetBodyCategory>
                <ProductGetBodyCategoryBuy>
                    <div>판매</div>
                    <ProductGetBodyCategoryBuyBtnArea>
                        <div><ProductGetBodyCategoryBuyBtn :class="{ active: searchQuery === '이동변기' }" @click="fetchData('이동변기')">이동변기</ProductGetBodyCategoryBuyBtn><ProductGetBodyCategoryBuyBtn :class="{ active: searchQuery === '목욕의자' }" @click="fetchData('목욕의자')">목욕의자</ProductGetBodyCategoryBuyBtn></div>
                        <div><ProductGetBodyCategoryBuyBtn :class="{ active: searchQuery === '지팡이' }" @click="fetchData('지팡이')">지팡이</ProductGetBodyCategoryBuyBtn><ProductGetBodyCategoryBuyBtn :class="{ active: searchQuery === '욕창예방 매트리스' }" @click="fetchData('욕창예방 매트리스')">욕창예방매트리스</ProductGetBodyCategoryBuyBtn></div>
                        <div><ProductGetBodyCategoryBuyBtn :class="{ active: searchQuery === '성인용보행기' }" @click="fetchData('성인용보행기')">성인용보행기</ProductGetBodyCategoryBuyBtn><ProductGetBodyCategoryBuyBtn :class="{ active: searchQuery === '욕창예방방석' }" @click="fetchData('욕창예방방석')">욕창예방방석</ProductGetBodyCategoryBuyBtn></div>
                        <div><ProductGetBodyCategoryBuyBtn :class="{ active: searchQuery === '간이변기' }" @click="fetchData('간이변기')">간이변기</ProductGetBodyCategoryBuyBtn><ProductGetBodyCategoryBuyBtn :class="{ active: searchQuery === '자세변환용구' }" @click="fetchData('자세변환용구')">자세변환용구</ProductGetBodyCategoryBuyBtn></div>
                        <div><ProductGetBodyCategoryBuyBtn :class="{ active: searchQuery === '안전손잡이' }" @click="fetchData('안전손잡이')">안전손잡이</ProductGetBodyCategoryBuyBtn><ProductGetBodyCategoryBuyBtn :class="{ active: searchQuery === '요실금팬티' }" @click="fetchData('요실금팬티')">요실금팬티</ProductGetBodyCategoryBuyBtn></div>
                        <div><ProductGetBodyCategoryBuyBtn :class="{ active: searchQuery === '미끄럼방지양말' }" @click="fetchData('미끄럼방지양말')">미끄럼방지양말</ProductGetBodyCategoryBuyBtn><ProductGetBodyCategoryBuyBtn :class="{ active: searchQuery === '미끄럼방지매트' }" @click="fetchData('미끄럼방지매트')">미끄럼방지매트</ProductGetBodyCategoryBuyBtn></div>
                    </ProductGetBodyCategoryBuyBtnArea>
                </ProductGetBodyCategoryBuy>
                <ProductGetBodyCategoryRent>
                    <div>대여</div>
                    <ProductGetBodyCategoryRentBtnArea>
                        <div><ProductGetBodyCategoryRentBtn :class="{ active: searchQuery === '전동침대' }" @click="fetchData('전동침대')">전동침대</ProductGetBodyCategoryRentBtn><ProductGetBodyCategoryRentBtn :class="{ active: searchQuery === '수동휠체어' }" @click="fetchData('수동휠체어')">수동휠체어</ProductGetBodyCategoryRentBtn></div>
                        <div><ProductGetBodyCategoryRentBtn :class="{ active: searchQuery === '경사로' }" @click="fetchData('경사로')">경사로</ProductGetBodyCategoryRentBtn><ProductGetBodyCategoryRentBtn :class="{ active: searchQuery === '이동욕조' }" @click="fetchData('이동욕조')">이동욕조</ProductGetBodyCategoryRentBtn></div>
                        <div><ProductGetBodyCategoryRentBtn :class="{ active: searchQuery === '성인용보행기' }" @click="fetchData('성인용보행기')">성인용보행기</ProductGetBodyCategoryRentBtn><ProductGetBodyCategoryRentBtn :class="{ active: searchQuery === '배회감지기' }" @click="fetchData('배회감지기')">배회감지기</ProductGetBodyCategoryRentBtn></div>
                        <div><ProductGetBodyCategoryRentBtn :class="{ active: searchQuery === '욕창예방 매트리스' }" @click="fetchData('욕창예방 매트리스')">욕창예방매트리스</ProductGetBodyCategoryRentBtn></div>
                    </ProductGetBodyCategoryRentBtnArea>
                </ProductGetBodyCategoryRent>
            </ProductGetBodyCategory>
            <ProductGetBodyTable>
                <ProductGetBodyTableThead>
                    <tr>
                        <th>품목</th>
                        <th>품목코드</th>
                        <th>품목명</th>
                        <th>구입/대여</th>
                        <th>급여/비급여</th>
                        <th>출고단가</th>
                        <th>상세보기</th>
                    </tr>
                </ProductGetBodyTableThead>
                <ProductGetBodyTableTbody>
                    <tr v-if="products_info.products.length === 0">
                        <td colspan="7" style="text-align: center; padding: 20px;">데이터 불러오는중...</td>
                    </tr>
                    <tr v-for="(product, index) in products_info.products" :key="index" class="product-row" @click="productDetail(product,'list')">
                        <td class="product-cell">{{ product.pitem }}</td>
                        <td class="product-cell">{{ product.pcode }}</td>
                        <td class="product-cell">{{ product.pname }}</td>
                        <td v-if="product.target === '구입 또는 대여'" @click.stop class="product-cell">
                            <select 
                                v-model="product.selectedTarget" 
                                @change="updateTarget(product)"
                                class="target-select"
                            >
                                <option value="구입">구입</option>
                                <option value="대여">대여</option>
                            </select>
                        </td>
                        <td v-else class="product-cell">
                            {{ product.target }}
                        </td>
                        <td class="product-cell">급여</td>
                        <td v-if="product.target == '구입 또는 대여'" class="product-cell price-cell">
                            {{ product.buyPrice }} / {{ product.rentprice }}
                        </td>
                        <td v-else-if="product.target == '구입'" class="product-cell price-cell">
                            {{ product.buyPrice }}
                        </td>
                        <td v-else-if="product.target == '대여'" class="product-cell price-cell">
                            {{ product.rentPrice }}
                        </td>
                        <td class="action-cell" @click.stop>
                            <HanqBtn 
                                @click="productDetail(product,'view')"
                                class="view-btn"
                            >보기</HanqBtn>
                        </td>
                    </tr>
                </ProductGetBodyTableTbody>
            </ProductGetBodyTable>
            <ProductGetBodyProductInfo>
                <ProductGetBodyProductInfoImg :src="productSrc"/>
            </ProductGetBodyProductInfo>
        </ProductGetBodyArea>
        
    </ProductGetDiv>
</template>
<script>
import { reactive, ref } from 'vue';
import * as injectGlobal from '../assets/styles/public.js';
import * as ProductGetCss from '../assets/styles/ProductGetCss.js';
import Domain from 'vue-material-design-icons/Domain.vue';
import Magnify from 'vue-material-design-icons/Magnify.vue';
import Swal from 'sweetalert2';
import { getProducts, getProductOptions } from '../api/product';
import { getProductImageUrl } from '../components/modal/product/utils/imgUrl'
export default {
    components: {
        ...injectGlobal,
        ...ProductGetCss,
        Domain,Magnify
    },
    props: {
        existingProducts: {
            type: Array,
            default: () => []
        }
    },
    setup() {
        const productSrc = ref('');
        const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
        return {
            products_info: reactive({
                products: [],
                total_cnt: 0,
            }),
            searchQuery: '',
            Toast,
            productSrc,
        };
    },

    computed: {
        existingTarget() {
            return this.existingProducts.length > 0 ? this.existingProducts[0].target : null;
        }
        
    },
    mounted() {
        this.fetchData();
        
    },
    methods: {
        async fetchData(pitem) {
            try {
                const response = await getProducts({
                    page: 1,
                    limit: 10,
                    search: this.searchQuery,
                    pitem: pitem
                });
                this.products_info.products = [];
                this.products_info.products = response.items;
                this.products_info.total_cnt = response.total;
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            }
        },
        //productGetTableTr클릭시 해당 품목의 상세정보를 OrderUpPage로 전달
        async productDetail(product,type) {
            this.productSrc = getProductImageUrl(product.pcode);
            if (type != 'view') {
                if (this.existingTarget === null || this.existingTarget === product.target) {
                    if (product.target === '구입 또는 대여') {
                        if (!product.selectedTarget) {
                        this.tost_alert('warning', '구입 또는 대여를 선택해주세요.');
                        return;
                        }
                        product.target = product.selectedTarget;
                    }
                    try {
                        const response = await getProductOptions({
                            product_list_id: product.id
                        });

                        const result = response;
                        if (result.color.length > 0) {
                            product.colorOptions = result.color[0].colorIds.split(",");
                            product.colors = Array(product.quantity).fill(product.colorOptions[0]);
                        } else {
                            product.colorOptions = [];
                            product.colors = [];
                        }

                        if (result.size.length > 0) {
                            product.sizeOptions = result.size[0].size.split(",");
                            product.sizes = Array(product.quantity).fill(product.sizeOptions[0]);
                        } else {
                            product.sizeOptions = [];
                            product.sizes = [];
                        }
                        this.$emit('productDetail', product);
                        this.tost_alert('success', `${product.pname} <br/>추가완료`);
                        } catch (error) {
                        console.error('제품 상세 정보 로드 중 오류 발생:', error);
                        }
                } else {
                    this.tost_alert('warning',`현재 주문에는 ${this.existingTarget} 제품만 추가할 수 있습니다.`);
                }
            }
        },
        productModalClose() {
            this.$emit('close');
        },
        tost_alert(icon,txt){
          this.Toast.fire({
            icon: icon,
            title: txt
          });
        },
        updateTarget(product) {
            if (product.target === '구입 또는 대여') {
                product.target = product.selectedTarget;
            }
        },
    },
      name: 'ProductGetPage'
    };
</script>