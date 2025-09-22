<template>
  <ModalPage v-model:show="showModal_obj.client_up" :width="madal_width.client_up" :height="madal_height.client_up">
      <ClientGetPage @clientDetail="handleClientDetail" @close="showModal_obj.client_up= false"/>
  </ModalPage>

  <OrderUpDiv>
    <OrderUpClientArea>
      <FlexDiv>
        <OrderUpTitle>주문서 입력({{ user.companyName }})</OrderUpTitle>
      </FlexDiv>
      <OrderUpClientUpBtn @click="showModal_obj.client_up= true" class="clientUpBtn">
        수급자 불러오기&nbsp;&nbsp;<RocketLaunch/>
      </OrderUpClientUpBtn>
      
      <OrderUpClientTable>
        <thead></thead>
        <tbody>
          <tr class="date-row">
              <th>주문일자</th>
                <Datepicker 
                v-model:value="orderDate" 
                placeholder="주문일자"
                style="width:150px;height:35px;"
                />
          </tr>
          <tr>
              <th>수급자성함</th>
              <td>
                <OUInput150 type="text" v-model="client_data_obj.name" readonly />
              </td>
              <th>인정번호</th>
              <td>
                <OUInput150 type="text" placeholder="요양인정번호 10자리"
                 v-model="client_data_obj.number" readonly/>
              </td>
          </tr>
          <tr>
              <th>생년월일</th>
              <td><OUInput150 type="text" v-model="client_data_obj.resident" readonly/></td>
              <th>등 급</th>
              <td><OUInput150 type="text" v-model="client_data_obj.ranker" 
                readonly/></td>
          </tr>
          <tr>
              <th>대 상</th>
              <td><OUInput150 type="text" v-model="client_data_obj.target" readonly/></td>
              <th>본인부담율</th>
              <td>
                <OUInput150 type="text" v-model="client_data_obj.sale" />
              </td>
          </tr>
          <tr v-if="hasRentalProduct" class="date-row">
            <th>대여 시작일</th>
            <td>
                <Datepicker 
                v-model:value="rentalStartDate" 
                placeholder="대여 시작일"
                style="width:150px;height:35px;"
                />
            </td>
            <th>대여 종료일</th>
            <td>
                <Datepicker 
                v-model:value="rentalEndDate" 
                placeholder="대여 종료일"
                style="width:150px;height:35px;"
                />
            </td>
          </tr>
          <tr class="address-row">
            <th>주소1<br/> (배송주소)</th>
            <td>
                <OUClientAddressBtn @click="openDaumPostcode(1)">주소 검색</OUClientAddressBtn>
                <OUInput150 v-model="postcode_obj.postcode1" type="text" placeholder="우편번호"/><br>
            </td>
            <td colspan="2">
                <OrderUpClientInputTxtW260 v-model="postcode_obj.address1" type="text" placeholder="주소"/>
                <OrderUpClientInputTxtW260 v-model="postcode_obj.detailAddress1" type="text" placeholder="상세주소"/>
            </td>
          </tr>
          <tr class="address-row">
            <th>주소2</th>
            <td>
              <OUClientAddressBtn @click="openDaumPostcode(2)">주소 검색</OUClientAddressBtn>
              <OUInput150 v-model="postcode_obj.postcode2" type="text" placeholder="우편번호"/><br>
            </td>
            <td colspan="2">
              <OrderUpClientInputTxtW260 v-model="postcode_obj.address2" type="text" placeholder="주소"/>
              <OrderUpClientInputTxtW260 v-model="postcode_obj.detailAddress2" type="text" placeholder="상세주소"/>
            </td>
          </tr>
          <tr>
              <th>보호자성함</th>
              <td><OUInput150 type="text" v-model = "client_data_obj.guardName"/></td>
              <th>수급자관계</th>
              <td>
                <OrderUpClientSelectW150 v-model.number="client_data_obj.clientRelationInfoId">
                  <option value=1>가족</option>
                  <option value=2>가족(배우자)</option>
                  <option value=3>가족(자녀)</option>
                  <option value=4>가족(부모)</option>
                  <option value=5>가족(형제)</option>
                  <option value=6>가족(자손)</option>
                  <option value=7>가족(자부)</option>
                  <option value=8>사회복지공무원</option>
                  <option value=9>시군구청장이 지정한자</option>
                  <option value=10>본인</option>
                  <option value=11>기타(친척등)</option>
                </OrderUpClientSelectW150>
              </td>
          </tr>
          <tr>
              <th>연락처1</th>
              <td><OUInput150 type="text" v-model = "client_data_obj.phone1"/></td>
              <th>연락처2</th>
              <td><OUInput150 type="text" v-model = "client_data_obj.phone2"/></td>
          </tr>
          <tr>
              <th>센터명</th>
              <td><OUInput150 type="text" v-model = "client_data_obj.centerName"/></td>
              <th>담당자</th>
              <td>
                <OrderUpClientSelectW150 v-model="client_data_obj.manager">
                  <option value="">선택</option>
                  <option v-for="user in userList" :key="user.id" :value="user.name">{{ user.name }}</option>
                </OrderUpClientSelectW150>
              </td>
          </tr>
          <tr>
              <th>영업자</th>
              <td>
                <OrderUpClientSelectW150 v-model="salesPerson">
                  <option value="없음">없음</option>
                </OrderUpClientSelectW150>
              </td>
          </tr>
          <tr>
              <th>배송방법</th>
              <td>
                <OrderUpClientSelectW150 v-model="deliveryMethod">
                  <option value="0">내방</option>
                  <option value="1">물류 (기관배송)</option>
                  <option value="2">택배</option>
                  <option value="3">공급업체</option>
                </OrderUpClientSelectW150>
              </td>
          </tr>
          <OrderUpClientTableTr class="date-row">
              <th>출고요청</th>
              <td>
                <OrderUpClientSelectW150>
                  <option>선택</option>
                </OrderUpClientSelectW150>
              </td>
              <th>배송요청일/시</th>
              <td>
                <Datepicker 
                  v-model:value="orderDate" 
                  placeholder="배송요청일시"
                  style="width:150px;height:35px;"
                  /><br/>
                  <OrderUpClientSelectW150 v-model="delivery_time">
                      <option value="0">오전</option>
                      <option value="1">오후</option>
                  </OrderUpClientSelectW150>
              </td>
          </OrderUpClientTableTr>
          <OrderUpClientTableTr class="memo-row">
              <th>받주시 메모</th>
              <td colspan="3"><textarea rows="4" v-model="orderComment" style="width: 100%;"></textarea></td>
          </OrderUpClientTableTr>
        </tbody>
      </OrderUpClientTable>
    </OrderUpClientArea>
    <OrderUpCenterArea>

    </OrderUpCenterArea>
    <OrderUpProductArea>
      <OrderUpProductHeaderArea>
        <div class="flex-center">
          <OrderUpProductHeaderBtn @click="selectAll">전체선택</OrderUpProductHeaderBtn>&nbsp;
          <OrderUpProductHeaderBtn @click="deselectAll">선택해제</OrderUpProductHeaderBtn>
        </div>
        <div></div>
        <OrderUpProductHeaderBtn @click="deleteSelectedProducts">선택품목삭제</OrderUpProductHeaderBtn>
      </OrderUpProductHeaderArea>
      <OrderUpProductTable>
        <thead>
            <OrderUpProductTableTheadTr>
              <th>선택</th><th>품목코드</th><th>바코드</th><th>품목</th><th>품목명</th><th>사이즈</th><th>색상</th><th>비고</th><th>수량</th><th>단가</th>
            </OrderUpProductTableTheadTr>
            <tbody>
              <tr v-for = "(product, index) in products_obj" :key="index">
                <td><OrderUpProductTableInput type="checkbox" :checked="product.selected" @change="toggleProductSelection(index)"/></td>
                <td>{{ product.pcode }}</td>
                <td  
                @mouseenter="product.showStockButton = true" 
                @mouseleave="product.showStockButton = false">
                  <OrderUpProductTableBcodeAreaDiv v-for="n in product.quantity" :key="`barcode-${index}-${n}`">
                    <OrderUpProductTableBarcodeBtn
                      v-show="product.showStockButton" 
                      @click="loadStock(index, n-1)" 
                    >
                      재고불러오기
                    </OrderUpProductTableBarcodeBtn>
                    <OrderUpProductTableInputTxt type="text" v-model="product.barcodes[n-1]" :placeholder="`바코드`"/>
                    <Delete @click="removeBarcodeField(index, n-1)" style="cursor: pointer;"/>
                  </OrderUpProductTableBcodeAreaDiv>
                </td>
                <td>{{ product.pitem }}</td>
                <td>{{ product.pname }}</td>
                <td>
                  <div v-for="n in product.quantity" :key="`size-${index}-${n}`">
                     <OrderUpProductTableSizeSelect v-if="product.sizeOptions.length > 0" v-model="product.sizes[n-1]" class="size_select">
                      <option v-for="size in product.sizeOptions" :key="size" :value="size">{{ size }}</option>
                     </OrderUpProductTableSizeSelect>
                  </div>
                </td>
                <td>
                  <div v-for="n in product.quantity" :key="`color-${index}-${n}`">
                    <OrderUpProductTableColorSelect v-if="product.colorOptions.length > 0" v-model="product.colors[n-1]" class="color_select">
                      <option v-for="color in product.colorOptions" :key="color" :value="color">{{ color_obj.value[color] }}</option>
                    </OrderUpProductTableColorSelect>
                  </div>
                </td>
                <td>
                  <div v-for="n in product.quantity" :key="`note-${index}-${n}`">
                    <OrderUpProductTableInputTxt 
                      type="text" 
                      v-model="product.notes[n-1]" 
                      :placeholder="`비고`"
                    />
                  </div>
                </td>
                <td>
                  <FlexDiv>
                    <HanqBtn @click="decreaseQuantity(index)">-</HanqBtn>
                    <OrderupProductCntInput type="text" v-model="product.quantity"/>
                    <HanqBtn @click="increaseQuantity(index)">+</HanqBtn>
                  </FlexDiv>
                </td>
                <td>{{ format.price(product.target === '대여' ? product.rentPrice : product.buyPrice) }}원</td>
              </tr>
              <OrderUPProductTableTotalPriceTr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>합계</td>
              <td>{{ totalQuantity }}개</td>
              <td>{{ format.price(totalPrice) }}원</td>
            </OrderUPProductTableTotalPriceTr>
            </tbody>
           
        </thead>
        <tbody>

        </tbody>
      </OrderUpProductTable>
      <OrderUpProductUpArea>
        <OrderUpPorudctUpBtn @click="checkClientInfoAndOpenModal">
          <Plus/>
        </OrderUpPorudctUpBtn>
        <ModalPage v-model:show="showModal_obj.product_up" :width="madal_width.product_up" :height="madal_height.product_up">
          <ProductGetPage 
            @productDetail="handleProductDetail"
            :existingProducts="products_obj"
          />
        </ModalPage>
        <FontBold>품목 추가하기</FontBold>
      </OrderUpProductUpArea>
      <OrderUpSubmitArea>
        <OrderUpSubmitBtn @click="submitOrder">주문하기</OrderUpSubmitBtn>
        <OrderUpSubmitBtn>확정주문하기</OrderUpSubmitBtn>
      </OrderUpSubmitArea>
    </OrderUpProductArea>
  </OrderUpDiv>
</template>

<script>
  import { ref,reactive, toRaw } from 'vue';
  import * as injectGlobal from '../assets/styles/public.js';
  import * as OrderUpCss from '../assets/styles/OrderUpCss.js';
  import RocketLaunch from 'vue-material-design-icons/RocketLaunch.vue';
  import Plus from 'vue-material-design-icons/Plus.vue';
  import Delete from 'vue-material-design-icons/Delete.vue';
  import ModalPage from './modal/ModalPage.vue';
  import ClientGetPage from './ClientGetPage.vue';
  import ProductGetPage from './ProductGetPage.vue';
  import axios from 'axios';
  import Datepicker from 'vue-datepicker-next';
  import 'vue-datepicker-next/index.css';
  import Swal from 'sweetalert2';
  import { createOrder } from '../api/order';
  import { getColorInfo } from '../api/product';
  import { getUserList } from '../api/user';
  import { useStore } from 'vuex';
  import dayjs from 'dayjs';
  export default {
    components: {
      ...injectGlobal,
      ...OrderUpCss,
      ModalPage,
      ClientGetPage,
      ProductGetPage,
      RocketLaunch,Plus,Delete,
      Datepicker
    },
    props: ['client'],
    setup() {
      const store = useStore();
      const user = store.state.user;
      const clientUpBtn = ref(null);
      const color_obj = reactive({});
      const products_obj = ref([]);
      const orderComment = ref('');
      const client_data_obj = reactive({
        name: '',
        number: '',
        resident: '',
        address: '',
        guardName: '',
        clientRelationInfoId: '',
        manager: ''
      });
      const showModal_obj = reactive({
        client_up :  ref(false),
        product_up :  ref(false)
      });
      const madal_width = {
        client_up : '65%',
        product_up : '85%'
      };
      const madal_height = {
        client_up : '80%',
        product_up : '80%'
      };
      const postcode_obj = reactive({
        postcode1: '',
        address1: '',
        detailAddress1: '',
        postcode2: '',
        address2: '',
        detailAddress2: '',
      });
      
      return {
        showModal_obj,
        madal_width,
        madal_height,
        postcode_obj,
        client_data_obj,
        products_obj,
        color_obj,
        orderComment,
        clientUpBtn,
        user
      };
    },
    data() {
      return {
        salesPerson: '없음',
        deliveryMethod: '1',
        orderDate: new Date(),
        rentalStartDate: new Date(),
        rentalEndDate: new Date(),
        format: {
          price: (price) => {
            return new Intl.NumberFormat('ko-KR', { 
              style: 'decimal', 
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            }).format(price);
          },
          date: (dateString) => {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          }
        },
        userList: []
      };
    },
    computed: {
      hasRentalProduct() {
        return this.products_obj.some(product => product.target === '대여');
      },
      totalPrice() {
        return this.products_obj.reduce((total, product) => {
          console.log(product)
          const price = product.target === '대여' ? product.rentPrice : product.buyPrice;
          return total + (parseInt(price) * product.quantity);
        }, 0);
      },
      totalQuantity() {
        return this.products_obj.reduce((total, product) => {
          return total + product.quantity;
        }, 0);
      },
    },
    methods:{
      checkClientInfoAndOpenModal() {
        if (!this.client_data_obj.name || !this.client_data_obj.number) {
          Swal.fire({
            title: '수급자 정보 미입력',
            text: '수급자 불러오기를 진행해주세요',
            icon: 'warning',
            confirmButtonText: '확인',
            didOpen: () => {
              const clientUpBtn = document.querySelector('.clientUpBtn');
              if (clientUpBtn) {
                clientUpBtn.classList.add('buzz');
                setTimeout(() => {
                  clientUpBtn.classList.remove('buzz');
                }, 750); // 애니메이션 지속 시간과 일치
              }
            }
          });
        } else {
          this.showModal_obj.product_up = true;
        }
      },
      async getColorInfo() {
        try {
          const response = await getColorInfo();
          const data = response;
          if (data.success) {
            const newColorObj = {};
            data.items.forEach((obj) => {
              newColorObj[String(obj.id)] = obj.name;
            });
            this.color_obj.value = newColorObj;
          }
        } catch (error) {
          console.error('색상 테이블 가져오기 실패:', error);
        }
      },
      async loadStock(productIndex, barcodeIndex) {
        const product = this.products_obj[productIndex];
        try {
          const response = await axios.post('http://13.209.151.51:801/OrderBcodeLoad', {
            company: "(수)복지용구의료기3",
            itemid: product.num
          });

          const data = response.data;
          if (data.code === 200) {
            const stockData = data.data;
            let tableRows = '';

            stockData.forEach(item => {
              let status = '미출고';
              if (item.table_name === "stock_st_restock") status = '미출고';
              else if (item.table_name === "stock_st_as") status = 'A/S';
              else if (item.table_name === "stock_st_faulty") status = '불량';
              else if (item.table_name === "stock_st_discard") status = '자진신고';
              else if (item.table_name === "stock_st_used") status = '중고';
              tableRows += `
                <tr class="bcode_load_tr">
                  <td class="obj_bcode">${item.bcode}</td>
                  <td class="obj_size" data-size="${item.item_size_id}">${item.item_size_id}</td>
                  <td class="obj_color" data-color="${item.item_color_id}">${this.color_obj.value[item.item_color_id]}</td>
                  <td>${item.restock_dt}</td>
                  <td><div style="font-weight:bold;">${status}</div></td>
                </tr>
              `;
            });

            Swal.fire({
              title: `보유재고(${stockData.length}개)`,
              width: '45%',
              html: `
                <div class="bcode_area">
                  <table>
                    <thead>
                      <tr>
                        <th>바코드</th><th>사이즈</th><th>색상</th><th>입고일</th><th>구분</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${tableRows}
                    </tbody>
                  </table>
                </div>
              `,
              confirmButtonColor: 'rgb(218, 69, 45)',
              confirmButtonText: '닫기',
              allowOutsideClick: false,
              didOpen: () => {
                document.querySelectorAll('.bcode_load_tr').forEach(row => {
                  row.addEventListener('click', () => {
                    const bcode = row.querySelector('.obj_bcode').textContent;
                    const size = row.querySelector('.obj_size').dataset.size;
                    const color = row.querySelector('.obj_color').dataset.color;

                    this.products_obj[productIndex].barcodes[barcodeIndex] = bcode;
                    this.products_obj[productIndex].sizes[barcodeIndex] = size;
                    this.products_obj[productIndex].colors[barcodeIndex] = color;
                    Swal.close();
                  });
                });
              }
            });
          } else {
            Swal.fire({
              icon: 'warning',
              title: '입력가능한 재고가 없습니다',
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true
            });
          }
        } catch (error) {
          console.error('재고 불러오기 실패:', error);
          Swal.fire({
            icon: 'error',
            title: '재고 불러오기 실패',
            text: '재고 정보를 불러오는 중 오류가 발생했습니다.'
          });
        }
      },
      // 사업소 담당자 리스트 조회
      async getUserListData() {
        const response = await getUserList({page: 1, perPage: 1000});
        if(response.success){
          this.userList = response.items;
        }
      },

      // 다음 주소 검색 스크립트 로드
      loadDaumPostcodeScript(){
        return new Promise((resolve) => {
          if (window.daum && window.daum.Postcode) {
            return resolve();
          }
          
          const script = document.createElement('script');
          script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
          script.onload = () => resolve();
          document.head.appendChild(script);
        });
      },
      openDaumPostcode(type) {
        this.loadDaumPostcodeScript();
        const width = 500;  // 팝업 창 너비
        const height = 600; // 팝업 창 높이
        const left = Math.ceil((window.innerWidth - width) / 2);  // 화면 가로 중앙 위치
        const top = Math.ceil((window.innerHeight - height) / 2); // 화면 세로 중앙 위치
        new window.daum.Postcode({
          oncomplete: (data) => {
            if(type == 1){
              this.postcode_obj.postcode1 = data.zonecode;
              this.postcode_obj.address1 = data.address;
              this.postcode_obj.detailAddress1 = data.buildingName;
            }else{
              this.postcode_obj.postcode2 = data.zonecode;
              this.postcode_obj.address2 = data.address;
              this.postcode_obj.detailAddress2 = data.buildingName;
            }
          },
          width: width,
          height: height,
          left: left,
          top: top
        }).open();
      },
      handleClientDetail(client) {
        this.postcode_obj.postcode1 = client.addressNum;
        this.postcode_obj.address1 = client.address;
        this.postcode_obj.detailAddress1 = client.addressDetail;
        this.postcode_obj.postcode2 = client.address2Num;
        this.postcode_obj.address2 = client.address2;
        this.postcode_obj.detailAddress2 = client.address2Detail;
        this.rentalStartDate = new Date(this.orderDate);
        this.rentalEndDate = client.apdtE ? new Date(client.apdtE) : new Date(this.rentalStartDate.getFullYear() + 1, this.rentalStartDate.getMonth(), this.rentalStartDate.getDate());
        for (const key in client) {
          if (Object.hasOwnProperty.call(client, key)) {
            const data = client[key];
            
            if (key === 'sale') {
              this.client_data_obj[key] = data + '%';
            } else {
              this.client_data_obj[key] = data;
            }
          }
        }
      },
      increaseQuantity(index) {
        const product = this.products_obj[index];
        if (!product.quantity) {
          product.quantity = 1;
        }
        if (!product.barcodes) {
          product.barcodes = [''];
        }
        if (!product.sizes) {
          product.sizes = [''];
        }
        if (!product.colors) {
          product.colors = [''];
        }
        if (!product.notes) {
          product.notes = [''];
        }
        product.quantity++;
        product.barcodes.push('');
        if (product.sizeOptions.length > 0) {
          const lastSelectedSize = product.sizes[product.sizes.length - 1] || product.sizeOptions[0];
          product.sizes.push(lastSelectedSize);
        }
        if (product.colorOptions.length > 0) {
          const lastSelectedColor = product.colors[product.colors.length - 1] || product.colorOptions[0];
          product.colors.push(lastSelectedColor);
        }
        product.notes.push('');
      },

      decreaseQuantity(index) {
        const product = this.products_obj[index];
        product.quantity--;
        if (product.quantity <= 0) {
          // 수량이 0 이하가 되면 제품을 배열에서 제거
          this.products_obj.splice(index, 1);
        } else {
          // 수량이 1 이상이면 마지막 바코드와 노트 제거
          product.barcodes.pop();
          product.sizes.pop();
          product.colors.pop();
          product.notes.pop();
        }
      },

      removeBarcodeField(productIndex, barcodeIndex) {
        const product = this.products_obj[productIndex];
        product.barcodes.splice(barcodeIndex, 1);
        product.sizes.splice(barcodeIndex, 1);
        product.colors.splice(barcodeIndex, 1);
        product.notes.splice(barcodeIndex, 1);
        product.quantity--;
        if (product.quantity <= 0) {
          // 수량이 0 이하가 되면 제품을 배열에서 제거
          this.products_obj.splice(productIndex, 1);
        }
      },

      handleProductDetail(product) {
        const newProduct = JSON.parse(JSON.stringify(toRaw(product)));
        newProduct.quantity = 1;
        newProduct.barcodes = [''];
        newProduct.notes = [newProduct.note || '']; // 초기 note를 배열로 변환
        newProduct.selected = false;
        this.products_obj.push(newProduct);
      },
      selectAll() {
        this.products_obj.forEach(product => product.selected = true);
      },

      deselectAll() {
        this.products_obj.forEach(product => product.selected = false);
      },
      toggleProductSelection(index) {
        this.products_obj[index].selected = !this.products_obj[index].selected;
      },
      deleteSelectedProducts() {
        this.products_obj = this.products_obj.filter(product => !product.selected);
      },
      getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      },
      async submitOrder() {
        if (this.products_obj.length === 0) {
          Swal.fire({
            title: '주문 실패',
            text: '주문할 품목이 없습니다. 상품을 추가해주세요.',
            icon: 'error',
            confirmButtonText: '확인'
          });
          return;
        }else if(!this.client_data_obj.name || !this.client_data_obj.number){
          Swal.fire({
            title: '주문 실패',
            text: '수급자 정보가 없습니다. 수급자를 불러오세요.',
            icon: 'error',
            confirmButtonText: '확인'
          });
          return;
        }else if(!this.userList.find(user => user.name === this.client_data_obj.manager)){
          Swal.fire({
            title: '주문 실패',
            text: '담당자 정보가 없습니다. 담당자를 선택해주세요.',
            icon: 'error',
            confirmButtonText: '확인'
          });
          return;
        }
        const orderData = {
          orderDate: this.orderDate ? dayjs(this.orderDate).format('YYYY-MM-DD') : '', // String (yyyy-mm-dd hh:mm:ss)
          userId: this.userList.find(user => user.name === this.client_data_obj.manager).id, // Number
          rentalStartDate: dayjs(this.rentalStartDate).format('YYYY-MM-DD'), // String (yyyy-mm-dd)
          rentalEndDate: dayjs(this.rentalEndDate).format('YYYY-MM-DD'), // String (yyyy-mm-dd)
          clientId: this.client_data_obj.id, // Number
          target: this.client_data_obj.target, // String
          ranker: this.client_data_obj.ranker, // String
          sale: this.client_data_obj.sale, // String
          addressNum: this.postcode_obj.postcode1, // String
          address: this.postcode_obj.address1, // String
          addressDetail: this.postcode_obj.detailAddress1, // String
          address2Num: this.postcode_obj.postcode2, // String
          address2: this.postcode_obj.address2, // String
          address2Detail: this.postcode_obj.detailAddress2, // String
          guardName: this.client_data_obj.guardName, // String
          clientRelationInfoId: this.client_data_obj.clientRelationInfoId, // Int
          phone1: this.client_data_obj.phone1, // String
          phone2: this.client_data_obj.phone2, // String
          centerName: this.client_data_obj.centerName, // String
          deliveryType: this.getDeliveryMethodCode(this.deliveryMethod), // Number
          deliveryState: "0", // String
          manager: this.client_data_obj.manager, // String
          deliveryTime: "0", // String
          confirm1: 1, // Number
          comment: this.orderComment, // String
          products: this.products_obj.map(product => ({
            target: product.target, // String
            id: product.id, // Number
            quantity: product.quantity, // Number
            options:{
              size: product.sizes, // Array
              color: product.colors, // Array
              note: product.notes, // Array
              bcode: product.barcodes // Array
            }
          })),
        };

        const response = await createOrder(orderData);
        if(response.success){
          Swal.fire({
            title: '주문 성공',
            text: '주문이 성공적으로 제출되었습니다.',
            icon: 'success',
            confirmButtonText: '확인'
          });
          this.$emit('close-modal');
          this.$emit('fetch-orders');
        }
        // axios.post('/api/order', orderData)
        //   .then(response => {
        //     Swal.fire({
        //       title: '주문 성공',
        //       text: '주문이 성공적으로 제출되었습니다.',
        //       icon: 'success',
        //       confirmButtonText: '확인',
        //       allowOutsideClick: false,
        //     }).then((result) => {
        //       if (result.isConfirmed) {
        //         this.$emit('close-modal');
        //         this.$emit('fetch-orders');
        //       }
        //     });

        //   })
        //   .catch(error => {
        //     console.error('주문 제출 중 오류가 발생했습니다:', error);
        //     Swal.fire({
        //       title: '주문 실패',
        //       text: '주문 제출 중 오류가 발생했습니다. 다시 시도해주세요.',
        //       icon: 'error',
        //       confirmButtonText: '확인'
        //     });

        //   });
      },

      getDeliveryMethodCode(method) {
        const methodMap = {
          '내방': 0,
          '택배': 1,
          '물류 (기관배송)': 2,
          '소독': 3,
          '공급업체': 4
        };
        return methodMap[method] || 0;
      }
    },
    mounted() {
      this.getColorInfo();
      this.getUserListData();
    },
    name: 'OrderUpPage'
  };
</script>