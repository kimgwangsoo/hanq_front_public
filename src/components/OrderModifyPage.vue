  <template>
    <OrderModifyDiv>
      <OrderUpClientArea>
        <FlexDiv>
          <OrderUpTitle>주문서 수정({{ user.companyName }})</OrderUpTitle>
          <OrderUpTitleBtn @click="showOrderHistory">주문서기록</OrderUpTitleBtn>
        </FlexDiv>
        <!--OrderUpClientUpBtn @click="showModal_obj.client_up= true">
          수급자 불러오기&nbsp;&nbsp;<RocketLaunch/>
        </OrderUpClientUpBtn-->
        <ModalPage v-model:show="showModal_obj.client_up" :width="madal_width.client_up" :height="madal_height.client_up">
            <ClientGetPage @clientDetail="handleClientDetail" @close="showModal_obj.client_up= false"/>
        </ModalPage>
        <OrderUpClientTable>
          <thead></thead>
          <tbody>
            <tr>
              <th>주문일자</th>
              <div>
                <Datepicker 
                v-model:value="orderDate" 
                placeholder="주문일자"
                style="width:150px;height:35px;"
                />
              </div>
            </tr>
            <tr>
                <th>수급자성함</th>
                <td><OUInput150 type="text" v-model = "client_data_obj.name" readonly/></td>
                <th>인정번호</th>
                <td><OUInput150 type="text" placeholder="요양인정번호 10자리" v-model = "client_data_obj.number" readonly/></td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td><OUInput150 type="text" v-model = "client_data_obj.resident" readonly/></td>
              <th>등 급</th>
              <td><OUInput150 type="text" placeholder="" v-model = "client_data_obj.ranker" readonly/></td>
          </tr>
          <tr>
              <th>대 상</th>
              <td><OUInput150 type="text" v-model = "client_data_obj.target" readonly/></td>
              <th>본인부담율</th>
              <td>
                <OUInput150 type="text" placeholder="" v-model = "client_data_obj.sale" readonly/>
              </td>
          </tr>
            <tr v-if="hasRentalProduct">
              <th>대여 시작일</th>
              <td>
                <Datepicker 
                  v-model:value="rent_data_obj.rentStart" 
                  placeholder="대여 시작일"
                  :enable-time="false"
                  style="width:150px;height:35px;"
                />
              </td>
              <th>대여 종료일</th>
              <td>
                <Datepicker 
                  v-model:value="rent_data_obj.rentEnd" 
                  placeholder="대여 종료일"
                  :enable-time="false"
                  model-type="string"
                  format="YYYY-MM-DD"
                  
                  style="width:150px;height:35px;"
                />
              </td>
            </tr>
            <tr>
              <th>주소1<br/>(배송주소)</th>
              <td>
                  <OUClientAddressBtn @click="openDaumPostcode(1)">주소 검색</OUClientAddressBtn>
                  <OUInput150 v-model="postcode_obj.addressNum" type="text" placeholder="우편번호"/><br>
              </td>
              <td colspan="2">
                  <OrderUpClientInputTxtW260 v-model="postcode_obj.address" type="text" placeholder="주소"/>
                  <OrderUpClientInputTxtW260 v-model="postcode_obj.addressDetail" type="text" placeholder="상세주소"/>
              </td>
            </tr>
            <tr>
              <th>주소2</th>
              <td>
                <OUClientAddressBtn @click="openDaumPostcode(2)">주소 검색</OUClientAddressBtn>
                <OUInput150 v-model="postcode_obj.address2Num" type="text" placeholder="우편번호"/><br>
              </td>
              <td colspan="2">
                <OrderUpClientInputTxtW260 v-model="postcode_obj.address2" type="text" placeholder="주소"/>
                <OrderUpClientInputTxtW260 v-model="postcode_obj.address2Detail" type="text" placeholder="상세주소"/>
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
                <th>공단계약상태</th>
                <td>
                  <OrderUpClientSelectW150 v-model="contractState"
                  :class="{
                    'contract-ok': contractState === 'ok',
                    'contract-vok': contractState === 'vok',
                    'contract-cok': contractState === 'cok'
                  }">
                    <option value="n">미계약</option>
                    <option value="ok">계약완료</option>
                    <option value="vok">부분계약완료</option>
                    <option value="cok">취소계약완료</option>
                  </OrderUpClientSelectW150>
                </td>
            </tr>
            <tr>
                <th>배송방법</th>
                <td>
                  <OrderUpClientSelectW150 v-model="deliveryType">
                    <option value="내방">내방</option>
                    <option value="물류 (기관배송)">물류 (기관배송)</option>
                    <option value="택배">택배</option>
                    <option value="공급업체">공급업체</option>
                  </OrderUpClientSelectW150>
                </td>
                <th>배송상태</th>
                <td>
                  <div style="display:flex; gap: 3px;">
                    <OrderUpClientBtn 
                      :class="{ 
                        'active': deliveryState === '0',
                        'disabled-btn': hasRentalProduct && rent_data_obj.rentStatus === 'n'
                      }" 
                      @click="(hasRentalProduct && rent_data_obj.rentStatus === 'n') ? null : updateDeliveryState('0')">배송대기</OrderUpClientBtn>
                    <OrderUpClientBtn 
                      :class="{ 
                        'active': deliveryState === '1',
                        'disabled-btn': hasRentalProduct && rent_data_obj.rentStatus === 'n'
                      }" 
                      @click="(hasRentalProduct && rent_data_obj.rentStatus === 'n') ? null : updateDeliveryState('1')">배송완료</OrderUpClientBtn>
                    <OrderUpClientBtn 
                      :class="{ 
                        'active': deliveryState === '2',
                        'disabled-btn': hasRentalProduct && rent_data_obj.rentStatus === 'y'
                      }" 
                      @click="(hasRentalProduct && rent_data_obj.rentStatus === 'y') ? null : updateDeliveryState('2')">회수중</OrderUpClientBtn>
                    <OrderUpClientBtn 
                      :class="{ 
                        'active': deliveryState === '3',
                        'disabled-btn': hasRentalProduct && rent_data_obj.rentStatus === 'y'
                      }" 
                      @click="(hasRentalProduct && rent_data_obj.rentStatus === 'y') ? null : updateDeliveryState('3')">회수완료</OrderUpClientBtn>
                  </div>
                </td>
            </tr>
            <OrderUpClientTableTr>
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
            
            <OrderUpClientTableTr>
              <th>
                <OrderModifyClientTableMemoSelect v-model="selectedDeliveryMemo">
                  <option value="0">일반메모</option>
                  <option value="1">특이사항</option>
                </OrderModifyClientTableMemoSelect>
              </th>
              <OrderModifyClientMemoArea colspan="3">
                <FlexLeft>
                <OrderUpClientInputTxtW60per v-model="orderComment" @keyup.enter="orderComment ? createOrderCommentFn() : $event.preventDefault()" placeholder="메모를 입력하세요" :class="{ 'error': orderComment === '' }" required/>
                <OrderModifyClientMemoBtn @click="triggerFileInput" style="margin-right: 10px;">
                    <Paperclip/>
                  </OrderModifyClientMemoBtn>
                <OrderModifyClientMemoBtn @click="createOrderCommentFn">입력</OrderModifyClientMemoBtn>
                </FlexLeft>
                <FlexLeft style="margin-top: 10px;">
                  
                  <input
                    type="file"
                    ref="fileInput"
                    @change="handleFileUpload"
                    multiple
                    accept="image/*"
                    style="display: none;"
                  />
                  <OCImgPreviewArea v-if="imagePreviewUrls.length > 0">
                    <OCImgPreviewContainer v-for="(url, index) in imagePreviewUrls" :key="index">
                      <OCImgPreviewImg :src="url" @click="openImageModal([url], 0)" style="cursor: pointer;" />
                      <OCImgPreviewRemoveBtn @click="removeImage(index)">
                        X
                      </OCImgPreviewRemoveBtn>
                    </OCImgPreviewContainer>
                  </OCImgPreviewArea>
                </FlexLeft>
              </OrderModifyClientMemoArea>
            </OrderUpClientTableTr>

            <OrderUpClientTableTr>
              <th>
                메모내역
              </th>
              <th colspan="3" style="background-color: #fff; color: #000;">
                <!-- 메모 목록 -->
                <OrderCommentItem 
                  v-for="(comment, index) in orderCommentList" 
                  :key="index">
                  <OrderCommentHeader>
                    <OrderCommentInfo>
                      {{ comment.user?.name || '' }}
                      {{ new Date(comment.createdAt).toISOString().slice(0, 19).replace('T', ' ') }} 
                      
                      <OMemoTypeSpan v-if="comment.type == 1">&nbsp;&nbsp;특이사항</OMemoTypeSpan>
                      <MemoFixBtn v-if="comment.type == 0 && comment.fix == 0" @click="fixComment(comment.id, 1)">고정</MemoFixBtn>
                      <MemoFixBtn v-if="comment.type == 0 && comment.fix == 1" @click="fixComment(comment.id, 0)">고정취소</MemoFixBtn>
                      <!-- 고정 여부 핀 -->
                      <i class="material-icons" v-if="comment.type == 0 && comment.fix == 1">push_pin</i>
                    </OrderCommentInfo>
                    <Delete @click="removeComment(comment.id, comment.images)" style="cursor: pointer;"/>
                  </OrderCommentHeader>
                  <div v-html="comment.txt || ''"></div>
                  <!-- 이미지 띄우기 -->
                  <OCImgPreviewArea v-if="comment.images && comment.images.length > 0">
                    <OCImgPreviewContainer v-for="(url, index) in comment.images" :key="index">
                      <OCImgPreviewImg :src="url" @click="openImageModal(comment.images, index, comment.id)" style="cursor: pointer;" />
                    </OCImgPreviewContainer>
                  </OCImgPreviewArea>
                </OrderCommentItem>
                
                <!-- 메모가 없을 경우 -->
                <OrderCommentEmpty v-if="orderCommentList.length === 0">
                  등록된 메모가 없습니다.
                </OrderCommentEmpty>
              </th>
            </OrderUpClientTableTr>
          </tbody>
        </OrderUpClientTable>
      </OrderUpClientArea>
      <OrderUpCenterArea>

      </OrderUpCenterArea>
      <OrderModifyProductArea>
        <OrderUpProductHeaderArea>
          <FlexDiv>
            <OrderUpProductHeaderBtn @click="selectAll">전체선택</OrderUpProductHeaderBtn>&nbsp;
            <OrderUpProductHeaderBtn @click="deselectAll">선택해제</OrderUpProductHeaderBtn>
          </FlexDiv>
          <FlexDiv>
            <OrderUpProductHeaderBtn @click="asInfoSearch">선택 A/S 접수 및 내역</OrderUpProductHeaderBtn>&nbsp;
            <ModalPage v-model:show="showModal_obj.as_info" :width="madal_width.as_info" :height="madal_height.as_info">
              <AsInfoSearchPage :selectedProducts="selectedProducts" :orderId="orderId" :clientId="client_data_obj.clientId" />
            </ModalPage>
            <OrderUpProductHeaderBtn @click="bcodeChk">
              바코드조회
              <OrderUpProductHeaderBtnToolTip v-if="contractState === 'vok'" class="tooltip">버튼 클릭으로<br/>미계약된 바코드 확인</OrderUpProductHeaderBtnToolTip>
            </OrderUpProductHeaderBtn>
          </FlexDiv>
          <OrderUpProductHeaderBtn @click="deleteSelectedProducts">선택품목삭제</OrderUpProductHeaderBtn>
        </OrderUpProductHeaderArea>
        <OrderUpProductTable>
          <thead>
              <OrderUpProductTableTheadTr>
                <th>선택</th>
                <th>품목코드</th>
                <th>바코드</th>
                <th>품목</th>
                <th>품목명</th>
                <th>사이즈</th>
                <th>색상</th>
                <th>비고</th>
                <th>수량</th>
                <th>단가</th>
                <th>본인부담금</th>
                <th>공단부담금</th>
              </OrderUpProductTableTheadTr>
              <tbody>
                <tr v-for = "(product, index) in products_obj" :key="index">
                  <td><OrderUpProductTableInput type="checkbox" :checked="product.selected" @change="toggleProductSelection(index)" style="width: 25px; height: 25px;"/></td>
                  <td>{{ product.pcode }}</td>
                  <td  
                  @mouseenter="product.showStockButton = false" 
                  @mouseleave="product.showStockButton = false">
                    <OrderUpProductTableBcodeAreaDiv v-for="n in product.cnt" :key="`barcode-${index}-${n}`">
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
                  <div v-for="n in product.cnt" :key="`size-${index}-${n}`">
                      <OrderUpProductTableSizeSelect v-if="product.sizeOptions.length > 0" v-model="product.sizes[n-1]" class="size_select">
                        <option v-for="size in product.sizeOptions" :key="size" :value="size">{{ size }}</option>
                      </OrderUpProductTableSizeSelect>
                    </div>
                  </td>
                  <td>
                    <div v-for="n in product.cnt" :key="`color-${index}-${n}`">
                      <OrderUpProductTableColorSelect v-if="product.colorOptions.length > 0" v-model="product.colors[n-1]" class="color_select">
                        <option v-for="color in product.colorOptions" :key="color" :value="color">{{ color_obj.value[color] }}</option>
                      </OrderUpProductTableColorSelect>
                    </div>
                  </td>
                  <td>
                    <div v-for="n in product.cnt" :key="`note-${index}-${n}`">
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
                      <OrderupProductCntInput type="text" v-model="product.cnt"/>
                      <HanqBtn @click="increaseQuantity(index)">+</HanqBtn>
                    </FlexDiv>
                  </td>
                  <td>{{ format.price(product.basicPrice * product.cnt) }}원</td>
                  <td>{{ format.price(product.myPrice * product.cnt) }}원</td>
                  <td>{{ format.price(product.publicPrice * product.cnt) }}원</td>
                </tr>
                <OrderUPProductTableTotalPriceTr>
                  <td colspan="9">합계</td>
                  <td>{{ format.price(totalPriceObj.basicPrice) }}원</td>
                  <td>{{ format.price(totalPriceObj.myPrice) }}원</td>
                  <td>{{ format.price(totalPriceObj.publicPrice) }}원</td>
                </OrderUPProductTableTotalPriceTr>
              </tbody>
             
          </thead>
          <tbody>

          </tbody>
        </OrderUpProductTable>
        <OrderUpProductUpArea>
          <OrderUpPorudctUpBtn @click="showModal_obj.product_up= true">
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
      </OrderModifyProductArea>

      
    </OrderModifyDiv>
    <OrderModifyFooterArea>
        <OrderModifyServiceBtnArea>
          <OrderModifyServiceBtn 
            v-if="contractState === 'n' || contractState === 'cok' || contractState === 'vok'" 
            @click="hasRentalProduct ? $emit('show-rent-detail') : contractWithNhis('계약')">
            공단계약하기
          </OrderModifyServiceBtn>
          <OrderModifyServiceBtn v-if="contractState === 'ok'" @click="hasRentalProduct ? $emit('show-rent-detail') :contractWithNhis('취소계약')">공단계약취소</OrderModifyServiceBtn>
          <OrderModifyServiceBtn @click="showModal_obj.doc_print = true"><Printer/>&nbsp;&nbsp;&nbsp;계약서출력</OrderModifyServiceBtn>
          <ModalPage v-model:show="showModal_obj.doc_print" :width="madal_width.doc_print" :height="madal_height.doc_print">
            <DocPrints :pageUrls="pageUrls" :orderId="orderId" :person="person"/>
          </ModalPage>
        </OrderModifyServiceBtnArea>
        <OrderModifySubmitBtnArea>
          <OrderModifySubmitBtn @click="splitOrder">주문서분리</OrderModifySubmitBtn>
          <OrderModifySubmitBtn v-if="activeState === 1" @click="confirmOrder(2)"><Check/>&nbsp;&nbsp;&nbsp;주문확정</OrderModifySubmitBtn>
          <OrderModifySubmitBtn v-if="activeState === 2" @click="confirmOrder(3)"><Truck/>&nbsp;&nbsp;&nbsp;출고</OrderModifySubmitBtn>
          <OrderModifySubmitBtn v-if="activeState === 2" @click="confirmOrder(1)"><Ban/>&nbsp;&nbsp;&nbsp;주문확정취소</OrderModifySubmitBtn>
          <OrderModifySubmitBtn v-if="activeState === 3" @click="confirmOrder(2)"><Ban/>&nbsp;&nbsp;&nbsp;출고취소</OrderModifySubmitBtn>
          <OrderModifySubmitBtn v-if="activeState != 3" @click="submitOrder"><Wrench/>&nbsp;&nbsp;&nbsp;주문수정</OrderModifySubmitBtn>

        </OrderModifySubmitBtnArea>
      </OrderModifyFooterArea>
  </template>
  
  <script>
    import { ref,reactive, toRaw,h,createApp } from 'vue';
    import * as injectGlobal from '../assets/styles/public.js';
    import * as OrderUpCss from '../assets/styles/OrderUpCss.js';
    import * as OrderModifyCss from '../assets/styles/OrderModify.js';
    // import RocketLaunch from 'vue-material-design-icons/RocketLaunch.vue';
    import Plus from 'vue-material-design-icons/Plus.vue';
    import Delete from 'vue-material-design-icons/Delete.vue';
    import Wrench from 'vue-material-design-icons/Wrench.vue';
    import Check from 'vue-material-design-icons/Check.vue';
    import Printer from 'vue-material-design-icons/Printer.vue';
    import Paperclip from 'vue-material-design-icons/Paperclip.vue';
    import Truck from 'vue-material-design-icons/Truck.vue';
    import ModalPage from '@/components/modal/ModalPage.vue';
    import ClientGetPage from './ClientGetPage.vue';
    import ProductGetPage from './ProductGetPage.vue';
    import OrderReturnPopup from './OrderReturnPopup.vue';
    import DocPrints from './DocPrints.vue';
    import AsInfoSearchPage from './modal/asInfo/ModalAsInfo.vue';
    import axios from 'axios';
    import Datepicker from 'vue-datepicker-next';
    import 'vue-datepicker-next/index.css';
    import Swal from 'sweetalert2';
    import { getOrder, updateOrder, getOrderComment, createOrderComment, fixOrderComment,
      deleteOrderComment, confirmOrder, getOrderHistory, 
      updateDeliveryStateOrder,splitOrder } from '@/api/order.js';
    import { uploadImages, getImages, deleteImage } from '@/api/img.js';
    // uploadImages는 이미 위에서 가져왔으므로 제거
    import { getUserList, getUserOption } from '../api/user';
    import { useStore } from 'vuex';
    import dayjs from 'dayjs';
    import { io } from 'socket.io-client'
    export default {
      components: {
        ...injectGlobal,
        ...OrderUpCss,
        ...OrderModifyCss,
        ModalPage,
        ClientGetPage,
        ProductGetPage,
        // RocketLaunch,
        Plus,Delete,Wrench,Check,Printer,Paperclip,Truck,
        Datepicker,
        DocPrints,
        AsInfoSearchPage,
      },
      props: {
        orderId: {
          type: Number,
        }
    },
    emits: ['update', 'close'],
      setup() {
        const store = useStore();
        const user = store.state.user;
        const products_obj = ref([]);
        const color_obj = reactive({});
        const client_data_obj = reactive({
          name: '',
          number: '',
          resident: '',
          address: '',
          guardName: '',
          clientRelationInfoId: 10,
          manager: '',
          rcgt: ''
        });
        const showModal_obj = reactive({
          client_up :  ref(false),
          product_up :  ref(false),
          doc_print : ref(false),
          as_info : ref(false),
        });
        const madal_width = {
          client_up : '65%',
          product_up : '85%',
          doc_print : '85%',
          as_info : '70%'
        };
        const madal_height = {
          client_up : '700px',
          product_up : '700px',
          doc_print : '77%',
          as_info : '70%'
        };
        const postcode_obj = reactive({
          postcode1: '',
          address1: '',
          detailAddress1: '',
          postcode2: '',
          address2: '',
          detailAddress2: '',
        });
        const delivery_date = ref(null);
        const delivery_time = ref('0');
        const rent_data_obj = reactive({
          rentStart: '',
          rentEnd: '',
          rentStatus: '',
        });
        const activeState = ref(1);
        let socket = null;
        // 소켓 연결 시작 함수
        const socket_start = (eventName) => {
          if (!socket) {
            try {
              // 소켓 서버 주소 지정
              socket = io('http://localhost:803', {
                transports: ['polling', 'websocket'],
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
                forceNew: true,
                timeout: 10000
              });
              
              console.log('소켓 연결 시도:', socket);
              
              // 연결 이벤트 리스너
              socket.on('connect', () => {
                console.log('소켓 서버에 연결되었습니다. ID:', socket.id);
              });
              
              // 연결 오류 이벤트 리스너
              socket.on('connect_error', (error) => {
                console.error('소켓 연결 오류:', error);
                Swal.fire({
                  icon: 'error',
                  title: '서버 연결 오류',
                  text: '소켓 서버에 연결할 수 없습니다. 관리자에게 문의하세요.'
                });
              });
              
              // 연결 종료 이벤트 리스너
              socket.on('disconnect', (reason) => {
                console.log('소켓 연결이 종료되었습니다. 이유:', reason);
              });
              
            } catch (error) {
              console.error('소켓 초기화 오류:', error);
              Swal.fire({
                icon: 'error',
                title: '서버 연결 오류',
                text: '소켓 서버 연결 중 오류가 발생했습니다.'
              });
            }
          }
          
          // 기존 이벤트 리스너 제거
          if (socket) {
            socket.off(eventName);
            
            // 새 이벤트 리스너 등록
            socket.on(eventName, (data) => {
              console.log('소켓 응답 수신:', data);
              
              // 조회 결과 처리
              if (data.name === "errorsession") {
                Swal.fire({
                  icon: 'warning',
                  title: '조회 실패<br/>(공단로그인창접속대기시간초과)',
                  html: `
                  <div style="font-size:20px; font-weight:bold;">공단로그인창을 재실행 또는 새로고침해주세요.</div><br/>
                  <div style="font-size:20px; font-weight:bold; color:#ff0000;">사업소별 최초 공단로그인창을 실행해야 이용 가능합니다.</div>
                  `,
                });
              } else {
                if(data.name=="done"){
                  const element = document.querySelector('.p'+data.pcode+data.bcode);
                  if(element) element.innerHTML = '<div style="color:rgb(81, 187, 67); font-size:13px; font-weight:bold; width:100px;">정상</div>'; 
                }else if(data.name=="fail"){
                  const element = document.querySelector('.p'+data.pcode+data.bcode);
                  if(element) element.innerHTML = '<div style="color:#ff0000; font-size:13px; font-weight:bold; width:100px;">조회불가</div>';
                }else if(data.name=="none"){
                  const element = document.querySelector('.p'+data.pcode+data.bcode);
                  if(element) element.innerHTML = '<div style="color:#ff0000; font-size:13px; font-weight:bold; width:100px;">응답없음(재시도)</div>';
                }else{
                  let result_company = data.resultcompany ? '사용중['+data.resultcompany+']' : '';
                  if(result_company==''){
                    result_company = '응답없음(재시도)';
                  }
                  const element = document.querySelector('.p'+data.pcode+data.bcode);
                  if(element) element.innerHTML = '<div style="color:#ff0000; font-size:13px; font-weight:bold; width:100%;">'+result_company+'</div>';
                }
              }
            });
          }
        };

        // 바코드 검사 진행 함수
        const bcodeChk = async () => {
          // 테이블 행 미리 생성
          let initialTableRows = `<tr>
                <td>품목코드</td><td>바코드</td><td>품목</td><td>품목명</td><td>비고</td>
                </tr>`;
                
          // 모든 제품의 바코드 행을 미리 생성
          products_obj.value.forEach(product => {
            product.barcodes.forEach(barcode => {
              if (barcode) {
                initialTableRows += `<tr class="adddata">
                  <td class="pcode">${product.pcode}</td>
                  <td class="bcodeinput"><input class="cbcode" style="height:20px; width:100px; font-weight:bold;" type="text" value="${barcode}" readonly></td>
                  <td class="cproductname">${product.pitem}</td>
                  <td class="cproductname2">${product.pname}</td>
                  <td class="p${product.pcode.replace(/ /g, '')}${barcode.replace(/ /g, '')}"></td>
                </tr>`;
              }
            });
          });
          
          await Swal.fire({
            width: '900px',
            fontsize: '13px',
            title: '바코드검사진행',
            html: `<table class="confirmtable" style="width:100%; border-collapse:collapse; text-align:center; font-size:14px;"><style>.confirmtable td, .confirmtable th {border:1px solid #ddd; padding:8px;}</style>${initialTableRows}</table>`,
            icon: 'info',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            allowOutsideClick: false,
            didOpen: async () => {
              // 메시지 요소 생성 및 추가
              const confirmTable = document.querySelector('.confirmtable');
              const messageDiv = document.createElement('div');
              messageDiv.className = 'bcode_chk';
              messageDiv.style.fontSize = '20px';
              messageDiv.style.fontWeight = 'bold';
              messageDiv.style.color = '#ff0000';
              messageDiv.textContent = '품목별 바코드 검사중...';
              confirmTable.parentNode.insertBefore(messageDiv, confirmTable);
              
              Swal.disableButtons();
              socket_start('go_lookup_buy_product_res');
              socket.emit('disconnect2', { 'name': user.username });
              socket.emit('login', { 'name': user.username });
              
              for (let i = 0; i < products_obj.value.length; i++) {
                const product = products_obj.value[i];
                console.log(product);
                await new Promise(resolve => {
                  product.barcodes.forEach(async (barcode) => {
                    await new Promise(resolve2 => {
                      if (barcode) {
                        socket.emit('go_lookup_buy_product_req', { 
                          'name': user.username, 
                          'cname': client_data_obj.name.replace(/ /g, ''), 
                          'cnumber': client_data_obj.number.replace(/ /g, ''), 
                          'company': user.companyName, 
                          'date': dayjs().format('YYYY-MM-DD'), 
                          'pcode': product.pcode.replace(/ /g, ''), 
                          'bcode': barcode.replace(/ /g, '') 
                        });
                        setTimeout(resolve2, 500);
                      }
                    });
                  });
                  setTimeout(resolve, 500);
                });
              }
              
              // 메시지 요소 제거
              document.querySelector('.bcode_chk').remove();
              Swal.enableButtons();
            }
          });
        };


        return {
          showModal_obj,
          madal_width,
          madal_height,
          postcode_obj,
          client_data_obj,
          products_obj,
          color_obj,
          delivery_date,
          delivery_time,
          rent_data_obj,
          activeState,
          user,
          bcodeChk
        };
      },
      data() {
        return {
          person: 1,
          orderComment: '',
          orderCommentList: [],
          salesPerson: '없음',
          deliveryType: '내방',
          deliveryState: '0', // 배송 상태 (0:배송대기, 1:배송완료, 2:회수중, 3:회수완료)
          orderDate: new Date(),
          contractState: 'n',
          selectedDeliveryMemo: 0,
          imagePreviewUrls: [],
          selectedImages: [],
          imageComments: [],
          imageSizes: [], // 이미지 크기 정보 저장 배열
          imageModal: {
            commentId: null,
            images: [],
            currentIndex: 0
          },

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
          pageUrls: [
            {
              "일반/감경":
              [
                {id:0, url: '/print/Doc1.ejs', name: '급여제공기록지'},
                {id:1, url: '/print/Doc2.ejs', name: '복지용구 공급 계약서'},
                {id:2, url: '/print/Doc3.ejs', name: '개인정보 수집 및 활용동의서'},
                {id:3, url: '/print/Doc4.ejs', name: '제품설치대장'},
                {id:4, url: '/print/Doc5.ejs', name: '장기요양급여비용 명세서'},
              ],
              "기초/의료급여": [
                {url: '/print/ZeroDoc1.ejs', name: '입소이용 의뢰서'},
                {url: '/print/ZeroDoc2.ejs', name: '재가서비스 이용내역서'},
              ],
              "추가급여": [
                {url: '/print/AddSalary.ejs', name: '추가급여신청서'},
              ],
              "거래명세서/영수증": [
                {url: '/print/Receipt.ejs', name: '거래명세서'},
                {url: '/print/Receipt.ejs', name: '영수증'},
              ],
              "발주서": [
                {url: '/print/Doc8.ejs', name: '발주서'},
              ]
            }
          ],
          userList: [],
          selectedProducts: [],
          totalPriceObj: {
            basicPrice: 0,
            myPrice: 0,
            publicPrice: 0,
          },
          splitOrderData: {
            products: [],
            isReturn: false
          }
        };
      },
      computed: {
        hasRentalProduct() {
          console.log(this.orderData);
          for (let i = 0; i < this.products_obj.length; i++) {
            const product = this.products_obj[i];
            if (product.target === '대여' || (product.target === '구입 또는 대여' && this.rent_data_obj.rentStart)) {
              return true;
            }
          }
          return false;
        },
      },
      methods:{

        // 주문서분리
        async splitOrder() {

          // 전체 품목의 수량을 합산하여 확인
          let totalQuantity = 0;
          this.products_obj.forEach(product => {
            totalQuantity += parseInt(product.cnt) || 1;
          });
          
          // 총 수량이 2보다 작을 경우 알림 표시
          if (totalQuantity < 2) {
            Swal.fire({
              title: '알림',
              text: '분리할 품목이 없습니다.',
              icon: 'warning',
              confirmButtonText: '확인'
            });
            return;
          }

          // 바코드 목록 생성 - 각 제품을 개별 항목으로 분리
          const barcodeList = [];
          this.products_obj.forEach(product => {
            const count = parseInt(product.cnt) || 1;
            for (let i = 0; i < count; i++) {
              barcodeList.push({
                ...product,
                productId: product.id,
                selected: false,
                bcode: product.barcodes[i] || '',
                barcode: product.barcodes[i] || '',
                size: product.sizes[i] || '',
                color: product.colors[i] || '',
                note: product.notes[i] || '',
                notes: product.notes[i] || '',
              });
            }
          });

          // Swal로 테이블 표시
          const tableRows = barcodeList.map((item, index) => `
            <tr>
              <td><input type="checkbox" id="product-${index}" class="product-checkbox" style="width: 25px; height: 25px;"></td>
              <td>${item.pcode || ''}</td>
              <td>${item.barcode || ''}</td>
              <td>${item.pitem || ''}</td>
              <td>${item.pname || ''}</td>
              <td>${item.size || ''}</td>
              <td>${this.color_obj.value[item.color] || ''}</td>
              <td>${item.note || ''}</td>
            </tr>
          `).join('');

          const result = await Swal.fire({
            title: '주문 분리',
            icon: 'question',
            width:'60%',
            html: `
              <div style="font-weight: bold; font-size: 16px; color: #333; margin-bottom: 10px;">분리할 품목을 선택해주세요</div>
              <div style="max-height: 400px; overflow-y: auto; margin-bottom: 15px; border: 1px solid #e0e0e0; border-radius: 5px; display: flex; justify-content: center;">
                <table class="table table-bordered table-hover" style="text-align: center;">
                  <thead style="position: sticky; top: 0; background-color: #f8f9fa; z-index: 1;">
                    <tr style="background-color: #f1f1f1;">
                      <th style="text-align: center; vertical-align: middle; padding: 10px;">선택</th>
                      <th style="text-align: center; vertical-align: middle; padding: 10px;">코드</th>
                      <th style="text-align: center; vertical-align: middle; padding: 10px;">바코드</th>
                      <th style="text-align: center; vertical-align: middle; padding: 10px;">품목</th>
                      <th style="text-align: center; vertical-align: middle; padding: 10px;">제품명</th>
                      <th style="text-align: center; vertical-align: middle; padding: 10px;">사이즈</th>
                      <th style="text-align: center; vertical-align: middle; padding: 10px;">색상</th>
                      <th style="text-align: center; vertical-align: middle; padding: 10px;">비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${tableRows}
                  </tbody>
                </table>
              </div>
              <div style="text-align: left; margin-bottom: 10px; padding: 8px; background-color: #f9f9f9; border-radius: 5px;">
                <label style="display: flex; align-items: center; cursor: pointer; margin: 0;">
                  <input type="checkbox" id="isReturn" style="width: 20px; height: 20px; margin-right: 10px; cursor: pointer;">
                  <span style="font-weight: 500; color: #444;">반품 처리</span>
                </label>
              </div>
            `,
            showCancelButton: true,
            confirmButtonText: '분리하기',
            cancelButtonText: '취소',
            preConfirm: () => {
              const selectedProducts = [];
              const isReturn = document.getElementById('isReturn').checked;
              
              barcodeList.forEach((item, index) => {
                const checkbox = document.getElementById(`product-${index}`);
                if (checkbox && checkbox.checked) {
                  selectedProducts.push({
                    productId: item.productId,
                    cnt: 1,
                    barcodes: [item.bcode],
                    sizes: [item.size],
                    colors: [item.color],
                    notes: [item.note],
                    product: {
                      id: item.productId,
                      pname: item.pname,
                      pitem: item.pitem,
                      pcode: item.pcode,
                      buyPrice: item.buyPrice,
                      rentPrice: item.rentPrice
                    },
                    basicPrice: item.basicPrice || 0,
                    myPrice: item.myPrice || 0,
                    publicPrice: item.publicPrice || 0
                  });
                }
              });
              
              if (selectedProducts.length === 0) {
                Swal.showValidationMessage('최소 한 개 이상의 품목을 선택해주세요');
                return false;
              }
              
              return { selectedProducts, isReturn };
            }
          });

          if (result.isConfirmed) {
            this.splitOrderData = {
              id: this.orderId,
              products: result.value.selectedProducts,
              additionalInfo: {
                isReturn: result.value.isReturn
              }
            };
            const response = await splitOrder(this.splitOrderData);
            console.log(response);
            console.log(this.splitOrderData);
            if (response.success) {
              Swal.fire({
                title: '알림',
                text: '주문서분리가 완료되었습니다.',
                icon: 'success',
                confirmButtonText: '확인',
                allowOutsideClick: false,
              }).then(() => {
                this.fetchOrderData();
              });
            }

            // 분리된 주문 데이터로 모달 표시
            this.showModal_obj.split_order = true;
          }
        },
        
        // 공단계약하기 Swal
        async contractWithNhis(contractType) {
          // 선택된 제품이 없을 경우 알림 표시
          if (this.products_obj.length === 0) {
            Swal.fire({
              title: '알림',
              text: '품목이 없습니다.',
              icon: 'warning',
              confirmButtonText: '확인'
            });
            return;
          }

          // 바코드 목록 생성
          const barcodeList = [];
          this.products_obj.forEach(product => {
            const count = parseInt(product.cnt) || 1;
            for (let i = 0; i < count; i++) {
              barcodeList.push({
                ...product,
                selected: false,
                barcode: product.barcodes[i] || '',
                size: product.sizes[i] || '',
                color: product.colors[i] || '',
                notes: product.notes[i] || '',
              });
            }
          });

          // Swal로 테이블 표시
          const tableRows = barcodeList.map((item, index) => `
            <tr>
              <td><input type="checkbox" id="product-${index}" class="product-checkbox" style="width: 25px; height: 25px;" checked></td>
              <td>${item.pcode || ''}</td>
              <td>${item.barcode || ''}</td>
              <td>${item.pitem || ''}</td>
              <td>${item.pname || ''}</td>
              <td>${item.size || ''}</td>
              <td>${this.color_obj.value[item.color] || ''}</td>
              <td>${item.notes || ''}</td>
            </tr>
          `).join('');

          const result = await Swal.fire({
            title: '공단 ' + contractType + '을 진행하시겠습니까?',
            icon: 'question',
            html: `
            <div style="font-weight: bold;">계약진행일자: ${this.formatDate(this.orderDate)}</div>
              <div style="max-height: 400px; overflow-y: auto;">
                <table class="swal-table" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr>
                      <th style="padding: 8px; border: 1px solid #ddd;">
                        <input type="checkbox" id="select-all-checkbox" style="margin-right: 5px; width: 25px; height: 25px;" checked>
                      </th>
                      <th style="padding: 8px; border: 1px solid #ddd;">품목코드</th>
                      <th style="padding: 8px; border: 1px solid #ddd;">바코드</th>
                      <th style="padding: 8px; border: 1px solid #ddd;">품목</th>
                      <th style="padding: 8px; border: 1px solid #ddd;">품목명</th>
                      <th style="padding: 8px; border: 1px solid #ddd;">사이즈</th>
                      <th style="padding: 8px; border: 1px solid #ddd;">색상</th>
                      <th style="padding: 8px; border: 1px solid #ddd;">비고</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${tableRows}
                  </tbody>
                </table>
              </div>
            `,
            showCancelButton: true,
            confirmButtonText: '계약진행',
            cancelButtonText: '닫기',
            width: '60%',
            didOpen: () => {
              // 체크박스 이벤트 리스너 추가
              const productCheckboxes = document.querySelectorAll('.product-checkbox');
              const selectAllCheckbox = document.getElementById('select-all-checkbox');
              
              selectAllCheckbox.checked = true;
              // 초기값은 전체 체크
              barcodeList.forEach((item) => {
                item.selected = true;
              });

              // 개별 체크박스 이벤트
              productCheckboxes.forEach((checkbox, index) => {
                checkbox.addEventListener('change', () => {
                  barcodeList[index].selected = checkbox.checked;
                  
                  // 모든 체크박스가 선택되었는지 확인하여 전체 선택 체크박스 상태 업데이트
                  const allChecked = Array.from(productCheckboxes).every(cb => cb.checked);
                  const anyChecked = Array.from(productCheckboxes).some(cb => cb.checked);
                  
                  selectAllCheckbox.checked = allChecked;
                  selectAllCheckbox.indeterminate = anyChecked && !allChecked;
                });
              });
              
              // 전체 선택 체크박스 이벤트
              selectAllCheckbox.addEventListener('change', () => {
                const isChecked = selectAllCheckbox.checked;
                
                // 모든 체크박스 상태 업데이트
                productCheckboxes.forEach((checkbox, index) => {
                  checkbox.checked = isChecked;
                  barcodeList[index].selected = isChecked;
                });
              });
            }
          });

          if (result.isConfirmed) {
            const selectedProducts = barcodeList.filter(item => item.selected);
            if (selectedProducts.length === 0) {
              Swal.fire({
                title: '알림',
                text: '선택된 품목이 없습니다.',
                icon: 'warning',
                confirmButtonText: '확인'
              });
              return;
            }

            const userOption = await getUserOption();
            console.log(userOption,"userOption");
            
            // 선택된 품목으로 계약 진행
            console.log('선택된 품목:', selectedProducts);
            const args = JSON.stringify({
              orderId: this.orderId,
              selectedProducts: selectedProducts,
              orderDate: this.formatDate(this.orderDate).replace(/-/g, ""),
              name: this.client_data_obj.name,
              number: this.client_data_obj.number.replace(/[^0-9]/g, ''),
              guardName: this.client_data_obj.guardName,
              clientRelationInfoId: this.client_data_obj.clientRelationInfoId,
              phone1: this.client_data_obj.phone1,
              phone2: this.client_data_obj.phone2,
              rcgt: this.client_data_obj.rcgt.split('~')[0].replace(/-/g,"").replace(/ /g,""),
              ranker: this.client_data_obj.ranker.replace("등급",""),
              resident: this.client_data_obj.resident.replace(/-/g,"").replace(/ /g,""),
              optionPhone: userOption.items.optionPhone,
            });
            if (contractType === '취소계약') {
              window.electron.send('buyCancle', args);
            } else {
              window.electron.send('buyContract', args);
            }

            // 계약 진행 중
            Swal.fire({
              title: '계약 진행 중...',
              icon: 'info',
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
              }
            });
            if (contractType === '취소계약') {
              const unsubscribe = window.electron.receive('buyCancelResponse', (result) => {
                unsubscribe();
                if (result && result.success) {
                  Swal.fire({
                    title: '알림',
                    text: result.message,
                    icon: 'success',
                    confirmButtonText: '확인',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                  }).then(() => {
                    this.fetchOrderData();
                  });
                } else {
                  Swal.fire({
                    title: result.message,
                    html: result.data[0].txt,
                    icon: 'error',
                    confirmButtonText: '확인'
                  });
                }
              });
            } else {
              // 수신 리스너 등록
              const unsubscribe = window.electron.receive('buyContractResponse', (result) => {
                unsubscribe();
                if (result && result.success) {
                  // 계약서 다시 불러오기
                  Swal.fire({
                    title: '알림',
                    text: result.message,
                    icon: 'success',
                    confirmButtonText: '확인',
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    
                  }).then(() => {
                    this.fetchOrderData();
                  });
                } else {
                  Swal.fire({
                    title: result.message,
                    html: result.data[0].txt,
                    icon: 'error',
                    confirmButtonText: '확인'
                  });
                }
              });
            }
            
          }
        },


        // A/S 정보 검색 및 모달 표시
        asInfoSearch() {
          // 선택된 제품이 없을 경우 알림 표시
          // if (!this.products_obj.some(product => product.selected)) {
          //   Swal.fire({
          //     title: '알림',
          //     text: '선택된 품목이 없습니다.',
          //     icon: 'warning',
          //     confirmButtonText: '확인'
          //   });
          //   return;
          // }
          this.selectedProducts = this.products_obj.filter(product => product.selected);
          console.log(this.selectedProducts);``
          this.showModal_obj.as_info = true;
        },
        
        // 주문 기록 표시
        async showOrderHistory() {
            try {
                // 로딩 표시
                Swal.fire({
                    title: '기록 불러오는 중...',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                // API에서 주문 이력 데이터 가져오기
                const response = await getOrderHistory(this.orderId);
                
                if (!response.success || !response.items || response.items.length === 0) {
                    Swal.fire({
                        title: '주문서기록',
                        text: '수정 이력이 없습니다.',
                        icon: 'info'
                    });
                    return;
                }

                // 테이블 HTML 생성
                let tableRows = '';
                response.items.forEach(item => {
                    const date = new Date(item.modifiedAt);
                    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                    
                    // 변경 내용을 HTML로 변환
                    let changesHtml = '';
                    if (item.changes && item.changes.length > 0) {
                        changesHtml = item.changes.join('<br/>');
                    } else {
                        changesHtml = '기타 정보 수정';
                    }
                    
                    tableRows += `
                    <tr>
                        <td style="padding: 8px; border: 1px solid #ddd;">${formattedDate}</td>
                        <td style="padding: 8px; border: 1px solid #ddd; text-align: left;">${changesHtml}</td>
                        <td style="padding: 8px; border: 1px solid #ddd;">${item.userName}</td>
                    </tr>
                    `;
                });

                // 최종 팝업 표시
                Swal.fire({
                    title: '주문서기록',
                    width: "50%",
                    html: `
                        <div id="order-history-popup">
                            <table style="width: 100%; border-collapse: collapse;">
                                <thead>
                                    <tr>
                                        <th style="padding: 8px; border: 1px solid #ddd;">날짜</th>
                                        <th style="padding: 8px; border: 1px solid #ddd;">내용</th>
                                        <th style="padding: 8px; border: 1px solid #ddd;">담당자</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${tableRows}
                                </tbody>
                            </table>
                        </div>
                    `,
                });
            } catch (error) {
                console.error('주문 이력 조회 오류:', error);
                Swal.fire({
                    title: '오류 발생',
                    text: '주문 이력을 불러오는 중 오류가 발생했습니다.',
                    icon: 'error'
                });
            }
        },
        
        // 제품 선택 관련 기능
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
        
        // 반품 관련 기능
        showOrderReturnPopup() {
          Swal.fire({
            title: '반품 주문',
            width: "30%",
            html: '<div id="return-popup"></div>',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            didOpen: () => {
              const app = createApp({
                render: () => h(OrderReturnPopup, { 
                  returnParams: this.returnParams,
                  products: this.products_obj  // 현재 페이지의 품목 정보를 전달
                })
              });
              this.returnPopupInstance = app.mount('#return-popup');
            },
            preConfirm: () => {
              return this.returnPopupInstance.getFormValues();
            }
          }).then((result) => {
            if (result.isConfirmed) {
              this.returnParams = result.value;
            }
          });
        },
        
        // 데이터 조회 관련 기능
        async getColorTable() {
          try {
            const response = await axios.post('http://13.209.151.51:801/ColorTableGet', {});
            const data = response.data;
            if (data.code === 200) {
              const newColorObj = {};
              data.data.forEach((obj) => {
                newColorObj[String(obj.num)] = obj.name;
              });
              this.color_obj.value = newColorObj;
            }
          } catch (error) {
            console.error('색상 테이블 가져오기 실패:', error);
          }
        },
        async fetchOrderData() {
          try {
            const orderData = await getOrder(this.orderId);
            this.initializeClientData(orderData);
          } catch (error) {
            console.error('주문 데이터를 가져오는 중 오류가 발생했습니다:', error);
          }
        },
        
        // 날짜 포맷 관련 기능
        formatDate(dateString) {
          const date = new Date(dateString);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        },
        
        // 주소 관련 기능
        openDaumPostcode(type) {
          const width = 500;  // 팝업 창 너비
          const height = 600; // 팝업 창 높이
          const left = Math.ceil((window.innerWidth - width) / 2);  // 화면 가로 중앙 위치
          const top = Math.ceil((window.innerHeight - height) / 2); // 화면 세로 중앙 위치
          new window.daum.Postcode({
            oncomplete: (data) => {
              if(type == 1){
                this.postcode_obj.addressNum = data.zonecode;
                this.postcode_obj.address = data.address;
                this.postcode_obj.addressDetail = data.buildingName;
              }else{
                this.postcode_obj.address2Num = data.zonecode;
                this.postcode_obj.address2 = data.address;
                this.postcode_obj.address2Detail = data.buildingName;
              }
            },
            width: width,
            height: height,
            left: left,
            top: top
          }).open();
        },
        
        // 고객 정보 관련 기능
        handleClientDetail(client) {
          this.postcode_obj.addressNum = client.addressnum;
          this.postcode_obj.address = client.address;
          this.postcode_obj.addressDetail = client.addressdetail;
          this.postcode_obj.address2Num = client.addressnum2;
          this.postcode_obj.address2 = client.address2;
          this.postcode_obj.address2Detail = client.address2detail;
          for (const key in client) {
            if (Object.hasOwnProperty.call(client, key)) {
              const data = client[key];
              this.client_data_obj[key] = data;
            }
          }
        },
        
        // 제품 수량 관련 기능
        increaseQuantity(index) {
          const product = this.products_obj[index];
          if (!product.cnt) {
            product.cnt = 1;
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
          product.cnt++;
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
          this.totalPriceObj.basicPrice += parseInt(product.basicPrice);
          this.totalPriceObj.myPrice += parseInt(product.myPrice);
          this.totalPriceObj.publicPrice += parseInt(product.publicPrice);
        },
        decreaseQuantity(index) {
          const product = this.products_obj[index];
          product.cnt--;
          if (product.cnt <= 0) {
            // 수량이 0 이하가 되면 제품을 배열에서 제거
            this.products_obj.splice(index, 1);
          } else {
            product.barcodes.pop();
            product.sizes.pop();
            product.colors.pop();
            product.notes.pop();
          }
          this.totalPriceObj.basicPrice -= parseInt(product.basicPrice);
          this.totalPriceObj.myPrice -= parseInt(product.myPrice);
          this.totalPriceObj.publicPrice -= parseInt(product.publicPrice);
        },
        removeBarcodeField(productIndex, barcodeIndex) {
          const product = this.products_obj[productIndex];
          product.barcodes.splice(barcodeIndex, 1);
          product.sizes.splice(barcodeIndex, 1);
          product.colors.splice(barcodeIndex, 1);
          product.notes.splice(barcodeIndex, 1);
          product.cnt--;
          if (product.cnt <= 0) {
            // 수량이 0 이하가 되면 제품을 배열에서 제거
            this.products_obj.splice(productIndex, 1);
          }
          this.totalPriceObj.basicPrice -= parseInt(product.basicPrice);
          this.totalPriceObj.myPrice -= parseInt(product.myPrice);
          this.totalPriceObj.publicPrice -= parseInt(product.publicPrice);
        },
        
        // 제품 정보 관련 기능
        handleProductDetail(product) {
          const newProduct = JSON.parse(JSON.stringify(toRaw(product)));
          if (newProduct.id) {
            newProduct.productId = newProduct.id;
            delete newProduct.id;
          }
          newProduct.cnt = 1;
          newProduct.barcodes = [''];
          newProduct.notes = [newProduct.note || '']; // 초기 note를 배열로 변환
          newProduct.selected = false;
          if(newProduct.target === '대여'){
            newProduct.basicPrice = newProduct.rentPrice;
            newProduct.myPrice = newProduct.rentPrice * (parseInt(this.client_data_obj.sale)/100);
            newProduct.publicPrice = newProduct.basicPrice - newProduct.myPrice;
          }else{
            newProduct.basicPrice = newProduct.buyPrice;
            newProduct.myPrice = newProduct.buyPrice * (parseInt(this.client_data_obj.sale)/100);
            newProduct.publicPrice = newProduct.buyPrice - (newProduct.buyPrice * (parseInt(this.client_data_obj.sale)/100));
          }
          this.totalPriceObj.basicPrice += parseInt(newProduct.basicPrice);
          this.totalPriceObj.myPrice += parseInt(newProduct.myPrice);
          this.totalPriceObj.publicPrice += parseInt(newProduct.publicPrice);
          this.products_obj.push(newProduct);
        },
        
        // 날짜 관련 기능
        getTodayDate() {
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const day = String(today.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        },
        
        // 주문 제출 관련 기능
        async submitOrder() {
          // 주문 데이터 준비
          const orderData = {
            id: this.orderId,
            orderDate: this.orderDate ? dayjs(this.orderDate).format('YYYY-MM-DD') : '',
            rentalStartDate: this.rent_data_obj.rentStart ? dayjs(this.rent_data_obj.rentStart).format('YYYY-MM-DD') : '',
            rentalEndDate: this.rent_data_obj.rentEnd ? dayjs(this.rent_data_obj.rentEnd).format('YYYY-MM-DD') : '',
            target: this.client_data_obj.target || '',
            ranker: this.client_data_obj.ranker || '',
            sale: this.client_data_obj.sale || '',
            addressNum: this.postcode_obj.addressNum || '',
            address: this.postcode_obj.address || '',
            addressDetail: this.postcode_obj.addressDetail || '',
            address2Num: this.postcode_obj.address2Num || '',
            address2: this.postcode_obj.address2 || '',
            address2Detail: this.postcode_obj.address2Detail || '',
            guardName: this.client_data_obj.guardName || '',
            clientRelationInfoId: this.client_data_obj.clientRelationInfoId || 10,
            phone1: this.client_data_obj.phone1 || '',
            phone2: this.client_data_obj.phone2 || '',
            centerName: this.client_data_obj.centerName || '',
            deliveryType: this.getDeliveryMethodCode(this.deliveryType),
            manager: this.client_data_obj.manager || '',
            contractState: this.contractState || 'n',
            products: this.products_obj.map(product => {
              // eslint 경고 해결: selected 변수가 사용되지 않음
              const productWithoutSelected = { ...product };
              delete productWithoutSelected.selected;
              return productWithoutSelected;
            })
          };
          try {
            this.$swalLoading();
            // 주문 수정 API 호출
            const response = await updateOrder(orderData);
            if (response.success) {
              this.$swal.fire({
                icon: 'success',
                title: '주문이 성공적으로 수정되었습니다.',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                this.fetchOrderData();
                // this.$emit('close');
                this.$emit('update');  // 부모 컴포넌트에 업데이트 이벤트 발생
              });
            } else {
              this.$swal.fire({
                icon: 'error',
                title: '주문 수정 실패',
                text: '주문을 수정하는 중 오류가 발생했습니다.'
              });
            }
          } catch (error) {
            console.error('주문 수정 중 오류 발생:', error);
            this.$swal.fire({
              icon: 'error',
              title: '주문 수정 실패',
              text: '서버 오류가 발생했습니다.'
            });
          } finally {
            // this.$swalClose();
          }
          
        },
        
        // 배송 방법 관련 기능
        getDeliveryMethodCode(method) {
          const methodMap = {
            '내방': 0,
            '택배': 1,
            '물류 (기관배송)': 2,
            '소독': 3,
            '공급업체': 4
          };
          return methodMap[method] || 0;
        },
        getDeliveryMethodCodeReverse(method) {
        const methodMap = {
            0: '내방',
            1: '택배',
            2: '물류 (기관배송)',
            3: '소독',
            4: '공급업체'
        };
        return methodMap[method] || '내방';
        },
        
        // 데이터 초기화 관련 기능
        async initializeClientData(orderData) {
          
          if (orderData) {
            console.log(orderData, 'orderData');
            this.client_data_obj.name = orderData.items.client.name || '';
            this.client_data_obj.number = orderData.items.client.number || '';
            this.client_data_obj.resident = orderData.items.client.resident || '';
            this.client_data_obj.ranker = orderData.items.ranker || '';
            this.client_data_obj.target = orderData.items.target || '';
            this.client_data_obj.sale = orderData.items.sale || '';
            this.postcode_obj.addressNum = orderData.items.addressNum || '';
            this.postcode_obj.address = orderData.items.address || '';
            this.postcode_obj.addressDetail = orderData.items.addressDetail || '';
            this.postcode_obj.address2Num = orderData.items.address2Num || '';
            this.postcode_obj.address2 = orderData.items.address2 || '';
            this.postcode_obj.address2Detail = orderData.items.address2Detail || '';
            this.client_data_obj.guardName = orderData.items.guardName || '';
            this.client_data_obj.clientRelationInfoId = orderData.items.clientRelationInfoId || 10;
            this.client_data_obj.phone1 = orderData.items.phone1 || '';
            this.client_data_obj.phone2 = orderData.items.phone2 || '';
            this.client_data_obj.centerName = orderData.items.centerName || '';
            this.client_data_obj.manager = orderData.items.manager || '';
            this.client_data_obj.rcgt = orderData.items.client.rcgt || '';
            this.salesPerson = orderData.items.business || '없음';
            this.activeState = orderData.items.confirm1;
            this.deliveryType = this.getDeliveryMethodCodeReverse(orderData.items.deliveryType);
            this.deliveryState = orderData.items.deliveryState || '0'; // 배송 상태 초기화
            this.orderDate = new Date(orderData.items.orderDate);
            this.contractState = orderData.items.contractState || 'n';
            this.fetchOrderComment();
            if (orderData.items.rent) {
              this.rent_data_obj.rentStart = new Date(orderData.items.rent.rentStart) || '';
              this.rent_data_obj.rentEnd = new Date(orderData.items.rent.rentEnd) || '';
              this.rent_data_obj.rentStatus = orderData.items.rent.rentStatus || '';
            }
            // 제품 정보 초기화
            this.$swalLoading();
            this.products_obj = await Promise.all(orderData.items.orderProducts.map(async product => {
              console.log(product, 'product');
              // 수량 가져오기
              const quantity = parseInt(product.cnt) || 1;
              
              if(product.target === '대여'){
                product.basicPrice = product.rentPrice;
                product.myPrice = product.rentPrice * (parseInt(this.client_data_obj.sale)/100);
                product.publicPrice = product.basicPrice - product.myPrice;
              }else{
                product.basicPrice = product.buyPrice;
                product.myPrice = product.buyPrice * (parseInt(this.client_data_obj.sale)/100);
                product.publicPrice = product.buyPrice - (product.buyPrice * (parseInt(this.client_data_obj.sale)/100));
              }
              
              // 수량을 곱하여 총 금액 계산
              this.totalPriceObj.basicPrice += parseInt(product.basicPrice) * quantity;
              this.totalPriceObj.myPrice += parseInt(product.myPrice) * quantity;
              this.totalPriceObj.publicPrice += parseInt(product.publicPrice) * quantity;
              
              return {
                ...product,
              };
              // let bcode_arr = [];
              // product.orderProductBcodes.forEach(bcode => {
              //   bcode_arr.push(bcode.bcode);
              // });

              // return {
              //   ...product,
              //   quantity: product.cnt || 1,
              //   barcodes: bcode_arr?bcode_arr:[''],
              //   notes: product.orderProductBcodes.map(bcode => bcode.orderProductNotes.map(note => note.txt)),
              //   colorOptions: product.orderProductBcodes.map(bcode => bcode.orderProductColors?.map(color => color.productColor)),
              //   colors: product.orderProductBcodes.map(bcode => bcode.orderProductColors?.map(color => color.productColor)),
              //   sizeOptions: product.orderProductBcodes.map(bcode => bcode.orderProductSizes?.map(size => size.productSize)),
              //   sizes: product.orderProductBcodes.map(bcode => bcode.orderProductSizes?.map(size => size.productSize)),
              // };
            }));
            this.$swalClose();
          }
        },
        
        // 주문 메모 관련 기능
        // 주문 메모 조회
        async fetchOrderComment() {
          const response = await getOrderComment(this.orderId);
          if (response.success) {
            // 메모 데이터 가져오기
            const commentList = [...response.items];
            // 각 메모에 대해 이미지 가져오기
            for (const comment of commentList) {
              try {
                // 이미지 배열 초기화
                comment.images = [];
                
                // 이미지 목록 조회 API 호출
                const imageResponse = await getImages(
                  JSON.parse(localStorage.getItem('user')).companyId,
                  'order_comment',
                  'order_comment',
                  comment.id
                );
 
                if (imageResponse.success && imageResponse.images && imageResponse.images.length > 0) {
                  // 이미지 URL 배열 저장
                  comment.images = imageResponse.images.map(img => img.url);
                } 
              } catch (error) {
                console.error(`메모 ${comment.id}의 이미지 조회 중 오류 발생:`, error);
              }
            }
            
            this.orderCommentList = commentList;
          }
        },

        // 메모 생성        
        // 코멘트 저장 함수
        async createOrderCommentFn() {
          if(this.orderComment === '' && this.selectedImages.length === 0) {
            this.$swal.fire({
              title: '내용을 입력하거나 이미지를 첨부해주세요.',
              confirmButtonText: '확인',
            });
            return;
          }
          try {
            // 로딩 창 표시
            this.$swalLoading();
            
            const request = {
              userId: JSON.parse(localStorage.getItem('user')).id,
              companyId: JSON.parse(localStorage.getItem('user')).companyId,
              orderId: this.orderId,
              txt: this.orderComment,
              fix: this.selectedDeliveryMemo == "0" ? 0 : 1,
              type: this.selectedDeliveryMemo == "0" ? 0 : 1
            }

            // 메모 저장
            const response = await createOrderComment({
              ...request,
            });
            
            if (response.success) {
              // 메모 저장 성공 후 이미지 업로드 (별도 함수 호출)
              if (this.selectedImages.length > 0) {
                const imgResponse = await this.uploadCommentImages(response.id);
                
                if (imgResponse.success) {
                  this.$swalClose();
                  this.fetchOrderComment();
                } else {
                  // 이미 에러 메시지가 표시되었으므로 추가 에러 메시지는 필요 없음
                  this.$swalClose();
                }
              } else {
                this.$swalClose();
                this.fetchOrderComment();
              }
              this.orderComment = '';
              this.imagePreviewUrls = [];
              this.selectedImages = [];
              this.imageSizes = [];
            } else {
            this.$swal.fire({
              icon: 'error',
              title: '메모 생성 실패',
              text: response.message
            });
          }
        } catch (error) {
          console.error('메모 생성 중 오류 발생:', error);
          this.$swal.fire({
            icon: 'error',
            title: '메모 생성 실패',
            text: '메모 생성 중 오류가 발생했습니다.'
          });
        }
        },

        // 이미지 업로드 별도 함수
        async uploadCommentImages(commentId) {
          if (this.selectedImages.length === 0) return { success: true };
          
          try {
            // 이미지 업로드 완료를 기다리기 위해 Promise.all 사용
            const uploadPromises = [];
            
            // 모든 이미지에 대한 업로드 Promise 생성
            for (let index = 0; index < this.selectedImages.length; index++) {
              const file = this.selectedImages[index];
              
              // 각 이미지마다 별도의 FormData 생성
              const singleFormData = new FormData();
              singleFormData.append('folder', 'order_comment');
              singleFormData.append('companyId', JSON.parse(localStorage.getItem('user')).companyId);
              singleFormData.append('table', 'order_comment');
              singleFormData.append('tableId', commentId);
              singleFormData.append('index', index);
              singleFormData.append('images', file);
              
              // 업로드 Promise 추가
              const uploadPromise = uploadImages(singleFormData)
                .then(response => {
                  console.log(`이미지 ${index} 업로드 성공:`, response);
                  return response;
                })
                .catch(error => {
                  console.error(`이미지 ${index} 업로드 오류:`, error);
                  throw error; // 오류 전파
                });
              
              uploadPromises.push(uploadPromise);
            }
            
            // 모든 이미지 업로드가 완료될 때까지 대기
            await Promise.all(uploadPromises);
            
            return { success: true };
          } catch (imgError) {
            this.$swalClose();
            console.error('이미지 업로드 오류:', imgError);
            Swal.fire({
              icon: 'error',
              title: '이미지 업로드 실패',
              text: '이미지 업로드 중 오류가 발생했습니다.'
            });
            return { success: false, message: imgError.message };
          }
        },

        // 메모 고정 여부
        async fixComment(commentId, fix) {
          const response = await fixOrderComment(commentId, fix);
          if (response.success) {
            this.fetchOrderComment();
          }
        },

        async removeComment(commentId, img) {
          console.log('img', img);
          this.$swal.fire({
            title: '메모 삭제',
            text: '이 메모를 삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소'
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                // 여기에 메모 삭제 API 호출 코드를 추가하세요
                const response = await deleteOrderComment(commentId);
                if (response.success) {
                  img.forEach(async (img) => {
                    await deleteImage(img);
                  });
                  this.fetchOrderComment();
                  this.$swal.fire('삭제 완료', '메모가 삭제되었습니다.', 'success');
                }
              } catch (error) {
                console.error('메모 삭제 중 오류 발생:', error);
                this.$swal.fire('오류', '메모 삭제 중 오류가 발생했습니다.', 'error');
              }
            }
          });
        },

        // 이미지 삭제
        async deleteImage(img) {
          console.log('img', img);
          const response = await deleteImage(img);
          if (response.success) {
            this.fetchOrderComment();
          }
        },

        // 파일 입력 트리거 함수
        triggerFileInput() {
          this.$refs.fileInput.click();
        },
        
        // 이미지 모달 창 열기
        openImageModal(images, index, commentId = null) {
          this.imageModal.images = images;
          this.imageModal.currentIndex = index;
          this.imageModal.commentId = commentId;
          
          // SweetAlert2로 모달 표시
          this.showImageSweetAlert();
        },
        
        // SweetAlert2로 이미지 모달 표시
        showImageSweetAlert() {
          const currentImage = this.imageModal.images[this.imageModal.currentIndex];
          const totalImages = this.imageModal.images.length;
          
          // 이미지 HTML 생성
          const imageHtml = `
            <div class="swal-image-container">
              ${totalImages > 1 ? `<button id="prev-image" class="swal-nav-button swal-prev-button">&lt;</button>` : ''}
              <img src="${currentImage}" class="swal-image" />
              ${totalImages > 1 ? `<button id="next-image" class="swal-nav-button swal-next-button">&gt;</button>` : ''}
              ${totalImages > 1 ? `<div class="swal-image-counter">${this.imageModal.currentIndex + 1} / ${totalImages}</div>` : ''}
            </div>
          `;
          
          // 이미지 스타일 정의
          const style = document.createElement('style');
          style.innerHTML = `
            .swal-image-container {
              position: relative;
              max-height: 68vh;
              overflow: hidden;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .swal-image {
              max-width: calc(100% - 80px);
              max-height: 70vh;
              object-fit: contain;
            }
            .swal-image-counter {
              position: absolute;
              bottom: 10px;
              right: 10px;
              background: rgba(0, 0, 0, 0.5);
              color: white;
              padding: 5px 10px;
              border-radius: 5px;
            }
            .swal-nav-button {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              background: rgba(0, 0, 0, 0.5);
              color: white;
              border: none;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              font-size: 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              z-index: 10;
              transition: background 0.2s;
            }
            .swal-nav-button:hover {
              background: rgba(0, 0, 0, 0.8);
            }
            .swal-prev-button {
              left: 10px;
            }
            .swal-next-button {
              right: 10px;
            }
          `;
          document.head.appendChild(style);
          
          // SweetAlert2 모달 표시
          this.$swal.fire({
            html: imageHtml,
            showCloseButton: true,
            showConfirmButton: false,
            width: '60%',
            padding: '1rem',
            backdrop: 'rgba(0,0,0,0.8)',
            showClass: {
              popup: 'animate__animated animate__fadeIn'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOut'
            },
              footer: `
                <button id="download-image" class="swal2-styled swal2-confirm">다운로드</button>
              `,
              didOpen: () => {
                // 버튼 이벤트 리스너 추가
                if (totalImages > 1) {
                  document.getElementById('prev-image')?.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.prevImage();
                  });
                  document.getElementById('next-image')?.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.nextImage();
                  });
                }
              document.getElementById('download-image')?.addEventListener('click', this.downloadImage);
            },
              willClose: () => {
                // 버튼 이벤트 리스너 제거
                if (totalImages > 1) {
                  const prevBtn = document.getElementById('prev-image');
                  const nextBtn = document.getElementById('next-image');
                  if (prevBtn) {
                    const prevClone = prevBtn.cloneNode(true);
                    prevBtn.parentNode.replaceChild(prevClone, prevBtn);
                  }
                  if (nextBtn) {
                    const nextClone = nextBtn.cloneNode(true);
                    nextBtn.parentNode.replaceChild(nextClone, nextBtn);
                  }
                }
              document.getElementById('download-image')?.removeEventListener('click', this.downloadImage);
              
              // 스타일 제거
              document.head.removeChild(style);
            }
          });
        },
        
        // 이전 이미지 보기
        prevImage() {
          if (this.imageModal.currentIndex > 0) {
            this.imageModal.currentIndex--;
          } else {
            // 가장 첫 번째 이미지에서 이전을 누르면 가장 마지막 이미지로 이동
            this.imageModal.currentIndex = this.imageModal.images.length - 1;
          }
          this.showImageSweetAlert();
        },
        
        // 다음 이미지 보기
        nextImage() {
          if (this.imageModal.currentIndex < this.imageModal.images.length - 1) {
            this.imageModal.currentIndex++;
          } else {
            // 가장 마지막 이미지에서 다음을 누르면 처음으로 이동
            this.imageModal.currentIndex = 0;
          }
          this.showImageSweetAlert();
        },
        
        // 이미지 다운로드
        async downloadImage() {
          try {
            const currentImage = this.imageModal.images[this.imageModal.currentIndex];
            
            // 이미지 URL에서 바이너리 데이터 가져오기
            const response = await fetch(currentImage);
            const blob = await response.blob();
            
            // Blob URL 생성
            const blobUrl = URL.createObjectURL(blob);
            
            // 파일명 추출
            let fileName = `hanq_${Date.now().toString().slice(0, 10)}.png`;
            
            // 다운로드 링크 생성
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;
            document.body.appendChild(link);
            
            // 다운로드 트리거
            link.click();
            
            // 링크 요소 제거 및 Blob URL 해제
            setTimeout(() => {
              document.body.removeChild(link);
              URL.revokeObjectURL(blobUrl);
            }, 100);
          } catch (error) {
            console.error('이미지 다운로드 중 오류:', error);
            this.$swal.fire({
              icon: 'error',
              title: '다운로드 오류',
              text: '이미지 다운로드 중 오류가 발생했습니다.'
            });
          }
        },

        // 이미지 크기 정보 가져오기
        getImgSize(index) {
          if (this.imageSizes[index]) {
            const sizeKB = this.imageSizes[index] / 1024;
            return sizeKB < 1000 ? `${sizeKB.toFixed(1)} KB` : `${(sizeKB / 1024).toFixed(1)} MB`;
          }
          return '';
        },
        
        // 미리보기 이미지 삭제
        removeImage(index) {
          this.imagePreviewUrls.splice(index, 1);
          this.selectedImages.splice(index, 1);
          this.imageSizes.splice(index, 1);
        },

        // 이미지 리사이징 및 압축 함수
        resizeImgPreview(file) {
          return new Promise((resolve) => {
            const maxWidth = 1024;  // 최대 너비
            const maxHeight = 1024; // 최대 높이
            const quality = 0.7;    // 이미지 품질 (0.0 ~ 1.0)
            
            const reader = new FileReader();
            reader.onload = (e) => {
              const img = new Image();
              img.onload = () => {
                // 이미지 사이즈 계산
                let width = img.width;
                let height = img.height;
                
                // 이미지 리사이징
                if (width > maxWidth || height > maxHeight) {
                  const ratio = Math.min(maxWidth / width, maxHeight / height);
                  width = Math.floor(width * ratio);
                  height = Math.floor(height * ratio);
                }
                
                // Canvas에 이미지 그리기
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                // 압축된 이미지 데이터 URL 생성
                const dataUrl = canvas.toDataURL('image/jpeg', quality);
                
                // 압축된 이미지 크기 계산 (바이트)
                const byteString = atob(dataUrl.split(',')[1]);
                const byteLength = byteString.length;
                
                resolve({ dataUrl, byteLength });
              };
              img.src = e.target.result;
            };
            reader.readAsDataURL(file);
          });
        },
        
        // 파일 업로드 처리 함수
        async handleFileUpload(event) {
          const files = event.target.files;
          if (!files || files.length === 0) return;
          
          // 로딩 표시
          this.$swalLoading();
          
          try {
            // 이미지 파일 총 크기 계산 (3MB 제한)
            let totalSize = 0;
            let newFiles = [];
            
            // 기존 이미지 크기 계산
            for (const file of this.selectedImages) {
              totalSize += file.size;
            }
            
            // 새 파일 크기 계산
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              if (!file.type.startsWith('image/')) continue;
              totalSize += file.size;
              newFiles.push(file);
            }
            
            // 3MB(3,145,728 bytes) 제한 검사
            const maxSize = 3 * 1024 * 1024; // 3MB in bytes
            if (totalSize > maxSize) {
              this.$swalClose();
              await this.$swal.fire({
                icon: 'warning',
                title: '이미지 크기 제한 초과',
                text: `이미지 파일의 총 크기가 3MB를 초과합니다. (${(totalSize / (1024 * 1024)).toFixed(2)}MB / 3MB)`
              });
              return;
            }
            
            // 각 파일 처리
            for (const file of newFiles) {
              // 이미지 리사이징 및 압축
              const result = await this.resizeImgPreview(file);
              
              // 이미지 저장
              this.selectedImages.push(file);
              this.imagePreviewUrls.push(result.dataUrl);
              this.imageSizes.push(result.byteLength);
            }
            
            // 이미지 추가 완료 메시지
            if (this.selectedImages.length > 0) {
              this.$swal.fire({
                icon: 'success',
                title: '이미지 추가 완료',
                text: `${files.length}개의 이미지가 추가되었습니다.`,
                showConfirmButton: false,
                timer: 1500
              });
            }
          } catch (error) {
            console.error('이미지 처리 오류:', error);
            this.$swal.fire({
              icon: 'error',
              title: '이미지 처리 오류',
              text: '이미지 처리 중 오류가 발생했습니다.'
            });
          } finally {
            // 로딩 종료
            this.$swalClose();
            
            // 파일 입력 초기화 (동일한 파일 재선택 가능하게)
            event.target.value = '';
          }
        },

        // 이미지 처리 함수
        async processImages() {
          if (this.selectedImages.length === 0) return '';
          
          try {
            // 이미지 HTML 생성
            const imageHtmls = this.imagePreviewUrls.map(url => {
              return `<img src="${url}" alt="첨부 이미지" style="max-width: 100%; margin: 5px 0;" />`;
            });
            
            // 이미지 HTML 문자열 반환
            return imageHtmls.join('\n');
          } catch (error) {
            console.error('이미지 처리 중 오류 발생:', error);
            this.$swal.fire({
              icon: 'error',
              title: '이미지 처리 실패',
              text: '이미지를 처리하는 중 오류가 발생했습니다.'
            });
            return '';
          }
        },

        // 주문 확인 관련 기능
        async confirmOrder(nextState) {
          const response = await confirmOrder(this.orderId, nextState);
          if (response.success) {
            this.fetchOrderData();
            this.$emit('update');  // 부모 컴포넌트에 업데이트 이벤트 발생
          } else {
            this.$swal.fire({
              icon: 'error',
              title: '처리 실패',
              text: response.message
            });
          }
        },
        
        // 사용자 목록 관련 기능
        async getUserListData() {
          const response = await getUserList({page: 1, perPage: 1000});
          if(response.success){
            this.userList = response.items;
          }
        },
        
        // 배송 상태 변경 함수
        async updateDeliveryState(newState) {
          try {
            // 로딩 표시
            Swal.fire({
              title: '상태 변경 중...',
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
              }
            });
            
            // 주문 데이터 준비 (ID와 배송 상태만 포함)
            const orderData = {
              id: this.orderId,
              deliveryState: newState
            };
            
            // API 호출
            const response = await updateDeliveryStateOrder(orderData);
            
            if (response.success) {
              // 상태 업데이트
              this.deliveryState = newState;
              
              // 성공 메시지
              Swal.fire({
                icon: 'success',
                title: '배송 상태 변경 완료',
                text: '배송 상태가 성공적으로 변경되었습니다.',
                showConfirmButton: false,
                timer: 1500
              });
            } else {
              // 실패 메시지
              Swal.fire({
                icon: 'error',
                title: '배송 상태 변경 실패',
                text: '배송 상태를 변경하는 중 오류가 발생했습니다.'
              });
            }
          } catch (error) {
            console.error('배송 상태 변경 중 오류 발생:', error);
            Swal.fire({
              icon: 'error',
              title: '배송 상태 변경 실패',
              text: '서버 오류가 발생했습니다.'
            });
          }
        },
      },
      mounted() {
        this.getColorTable().then(() => {
          this.getUserListData().then(() => {
            this.fetchOrderData();
          });
        });
      },
      name: 'OrderModifyPage'
    };
  </script>