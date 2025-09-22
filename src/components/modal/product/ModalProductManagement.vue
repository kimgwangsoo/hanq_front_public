<template>
  <div>
    <CommonTitleDiv>{{ selectedProduct.pname }}</CommonTitleDiv>
    <div class="marginBottom10">
    </div>

    <FlexTopDiv style="justify-content: flex-start">
      <div>
        <PStInfoTable style="width: 380px">
          <thead>
            <tr>
              <th>이미지</th>
              <td>
                <img 
                  :src="getProductImageUrl(selectedProduct.pcode)" 
                  alt="이미지" 
                  style="width: 200px; height: 200px; transition: transform 0.3s ease;" 
                  @mouseenter="$event.target.style.transform = 'scale(1.5)'" 
                  @mouseleave="$event.target.style.transform = 'scale(1)'"
                />
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>품목</th>
              <td>
                {{ selectedProduct.pitem }}
              </td>
            </tr>
            <tr>
              <th>품목명</th>
              <td>
                {{ selectedProduct.pname }}
              </td>
            </tr>
            <tr>
              <th>품목코드</th>
              <td>
                {{ selectedProduct.pcode }}
              </td>
            </tr>
            <tr>
              <th>구입/대여</th>
              <td>
                {{ selectedProduct.target }}
              </td>
            </tr>

            <tr>
              <th>출고단가</th>
              <td>
                <template v-if="selectedProduct.target === '구입'">{{ parseInt(selectedProduct.buyPrice).toLocaleString() }}원</template>
                <template v-else-if="selectedProduct.target === '대여'">{{ parseInt(selectedProduct.rentPrice).toLocaleString() }}원</template>
                <template v-else>{{ parseInt(selectedProduct.buyPrice).toLocaleString() }}원/{{ parseInt(selectedProduct.rentPrice).toLocaleString() }}원</template>
              </td>
            </tr>

            <tr>
              <th>입고단가</th>
              <td></td>
            </tr>
            <tr>
              <th>본인부담금</th>
              <td>
                <div>15% : {{ selectedProduct.target === '대여' ? Math.round(selectedProduct.rentPrice * 0.15).toLocaleString() : Math.round(selectedProduct.buyPrice * 0.15).toLocaleString() }}원</div>
                <div>9% : {{ selectedProduct.target === '대여' ? Math.round(selectedProduct.rentPrice * 0.09).toLocaleString() : Math.round(selectedProduct.buyPrice * 0.09).toLocaleString() }}원</div>
                <div>6% : {{ selectedProduct.target === '대여' ? Math.round(selectedProduct.rentPrice * 0.06).toLocaleString() : Math.round(selectedProduct.buyPrice * 0.06).toLocaleString() }}원</div>
              </td>
            </tr>
            <tr>
              <th>생산유무</th>
              <td>
                {{ selectedProduct.state }}
              </td>
            </tr>
            <tr>
              <th>입고등록</th>
              <td>

                <table style="width: 270px">
                  <thead>
                    <tr>
                      <th>재고구분</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <PLabelContainer>
                          <PLabel class="marginRight10">
                            <input type="radio" name="stock" value="미출고" checked @click="createBcodeInfo.stockType = 'unrelease'" />
                            미출고
                          </PLabel>
                          <PLabel class="marginRight10 marginLeft10">
                            <input type="radio" name="stock" value="A/S" @click="createBcodeInfo.stockType = 'as'" />
                            A/S
                          </PLabel>
                          <PLabel class="marginRight10 marginLeft10">
                            <input type="radio" name="stock" value="중고" @click="createBcodeInfo.stockType = 'used'" />
                            중고
                          </PLabel>
                          <PLabel class="marginRight10 marginLeft10">
                            <input type="radio" name="stock" value="불량" @click="createBcodeInfo.stockType = 'defective'" />
                            불량
                          </PLabel>
                          <PLabel class="marginLeft10">
                            <input type="radio" name="stock" value="자진신고" @click="createBcodeInfo.stockType = 'selfReport'" />
                            자진신고
                          </PLabel>
                        </PLabelContainer>
                      </td>
                    </tr>
                    <tr>
                      <th>색상</th>
                    </tr>
                    <tr>
                      <td>
                        <PLabelContainer>
                          <PLabel v-for="(color, index) in selectedProduct.productColors" :key="color.productColorId" class="marginRight10" @click="createBcodeInfo.productColorId = color.productColorId">
                            <input type="radio" name="stockColor" :value="color.productColorId" :checked="index === 0" />
                            {{ color.productColorInfo?.name }}
                          </PLabel>
                        </PLabelContainer>
                      </td>
                    </tr>
                    <tr>
                      <th>사이즈</th>
                    </tr>
                    <tr>
                      <td>
                        <PLabelContainer>
                          <PLabel v-for="(size, index) in selectedProduct.productSizes && selectedProduct.productSizes[0] ? selectedProduct.productSizes[0].size.split(',') : []" :key="size" class="marginRight10" @click="createBcodeInfo.productSize = size">
                            <input type="radio" name="stockSize" :value="size" :checked="index === 0" />
                            {{ size }}
                          </PLabel>
                        </PLabelContainer>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <PPInput class="marginBottom10" placeholder="바코드를 입력해주세요" v-model="createBcodeInfo.bcode" @input="createBcodeInfo.bcode = $event.target.value.replace(/[^0-9]/g, '')" />
                        <br>
                        <PAddBarcodeBtn @click="createBcode">바코드 등록</PAddBarcodeBtn>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

          </tbody>
        </PStInfoTable>
      </div>

      <div class="marginLeft10 marginRight10" style="width: 60%">
        <PStTitle>재고현황</PStTitle>

        <FlexDiv class="marginTop10">
          바코드 검색: &nbsp;
          <PPInput placeholder="바코드를 입력해주세요" />
        </FlexDiv>

        <FlexTopDiv>
          <PStTableContainer @dragover.prevent @drop="onDrop('unrelease', $event)">
            <PStTable>
              <thead>
                <tr>
                  <th colspan="5">미출고 0개 
                  </th>
                </tr>
                <tr>
                  <th>바코드</th>
                  <th v-if="selectedProduct.productColors && selectedProduct.productColors[0]">색상</th>
                  <th v-if="selectedProduct.productSizes && selectedProduct.productSizes[0]">사이즈</th>
                  <th>입고일</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in unreleaseList" :key="item.id" draggable="true"
                  @dragstart="onDragStart(item, 'unrelease', $event)">
                  <td>
                    <PBarCodeDiv
                      :class="!item.orderId ? 'pastelGreenBg' : 'pastelYellowBg'"
                      @mouseenter="item.st == 1 && onBarcodeMouseEnter($event, item)"
                      @mouseleave="item.st == 1 && onBarcodeMouseLeave()"
                    >
                      {{ item.bcode }}
                    </PBarCodeDiv>
                  </td>
                  <td v-if="selectedProduct.productColors && selectedProduct.productColors[0]">
                    <select v-model="item.productColorId" :disabled="!!item.orderId" @change="onChangeOption(item)">
                      <option v-for="color in selectedProduct.productColors" :key="color.productColorId" :value="color.productColorId">{{ color.productColorInfo?.name }}</option>
                    </select>
                  </td>
                  <td v-if="selectedProduct.productSizes && selectedProduct.productSizes[0]">
                    <select v-model="item.productSize" :disabled="!!item.orderId" @change="onChangeOption(item)">
                      <option v-for="size in selectedProduct.productSizes && selectedProduct.productSizes[0] ? selectedProduct.productSizes[0].size.split(',') : []" :key="size" :value="size">{{ size }}</option>
                    </select>
                  </td>
                  <td>
                    <div>{{ dayjs(item.lastRestockDt).format('YYYY-MM-DD') }}</div>
                  </td>
                  <td @click="onDeleteBarcode(item)">
                    <i v-if="!item.orderId" class="material-icons redFont">clear</i>
                  </td>
                  </tr>
              </tbody>
            </PStTable>
          </PStTableContainer>

          <PStTableContainer @dragover.prevent @drop="onDrop('as', $event)">
            <PStTable>
              <thead>
                <tr>
                  <th colspan="5">A/S 0개 
                  </th>
                </tr>
                <tr>
                  <th>바코드</th>
                  <th v-if="selectedProduct.productColors && selectedProduct.productColors[0]">색상</th>
                  <th v-if="selectedProduct.productSizes && selectedProduct.productSizes[0]">사이즈</th>
                  <th>입고일</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in asList" :key="item.id" draggable="true" @dragstart="onDragStart(item, 'as', $event)">
                  <td>
                    <PBarCodeDiv
                      :class="!item.orderId ? 'pastelGreenBg' : 'pastelYellowBg'"
                      @mouseenter="item.st == 1 && onBarcodeMouseEnter($event, item)"
                      @mouseleave="item.st == 1 && onBarcodeMouseLeave()"
                    >
                      {{ item.bcode }}
                    </PBarCodeDiv>
                  </td>
                  <td v-if="selectedProduct.productColors && selectedProduct.productColors[0]">
                    <select v-model="item.productColorId">
                      <option v-for="color in selectedProduct.productColors" :key="color.productColorId" :value="color.productColorId">{{ color.productColorInfo?.name }}</option>
                    </select>
                  </td>
                  <td v-if="selectedProduct.productSizes && selectedProduct.productSizes[0]">
                    <select v-model="item.productSize">
                      <option v-for="size in selectedProduct.productSizes && selectedProduct.productSizes[0] ? selectedProduct.productSizes[0].size.split(',') : []" :key="size" :value="size">{{ size }}</option>
                    </select>
                  </td>
                  <td>
                    <div>{{ dayjs(item.lastRestockDt).format('YYYY-MM-DD') }}</div>
                  </td>
                  <td>
                    <i v-if="!item.orderId" class="material-icons redFont">clear</i>
                  </td>
                </tr>
              </tbody>
            </PStTable>
          </PStTableContainer>

          <PStTableContainer @dragover.prevent @drop="onDrop('used', $event)">
            <PStTable>
              <thead>
                <tr>
                  <th colspan="5">중고 0개 
                  </th>
                </tr>
                <tr>
                  <th>바코드</th>
                  <th v-if="selectedProduct.productColors && selectedProduct.productColors[0]">색상</th>
                  <th v-if="selectedProduct.productSizes && selectedProduct.productSizes[0]">사이즈</th>
                  <th>입고일</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in usedList" :key="item.id" draggable="true"
                  @dragstart="onDragStart(item, 'used', $event)">
                  <td>
                    <PBarCodeDiv
                      :class="!item.orderId ? 'pastelGreenBg' : 'pastelYellowBg'"
                      @mouseenter="item.st == 1 && onBarcodeMouseEnter($event, item)"
                      @mouseleave="item.st == 1 && onBarcodeMouseLeave()"
                    >
                      {{ item.bcode }}
                    </PBarCodeDiv>
                  </td>
                  <td v-if="selectedProduct.productColors && selectedProduct.productColors[0]">
                    <select v-model="item.productColorId">
                      <option v-for="color in selectedProduct.productColors" :key="color.productColorId" :value="color.productColorId">{{ color.productColorInfo?.name }}</option>
                    </select>
                  </td>
                  <td v-if="selectedProduct.productSizes && selectedProduct.productSizes[0]">
                    <select v-model="item.productSize">
                      <option v-for="size in selectedProduct.productSizes && selectedProduct.productSizes[0] ? selectedProduct.productSizes[0].size.split(',') : []" :key="size" :value="size">{{ size }}</option>
                    </select>
                  </td>
                  <td>
                    <div>{{ dayjs(item.lastRestockDt).format('YYYY-MM-DD') }}</div>
                  </td>
                  <td>
                    <i v-if="!item.orderId" class="material-icons redFont">clear</i>
                  </td>
                </tr>
              </tbody>
            </PStTable>
          </PStTableContainer>
        </FlexTopDiv>

        <FlexTopDiv>
          <PStTableContainer @dragover.prevent @drop="onDrop('defective', $event)">
            <PStTable>
              <thead>
                <tr>
                  <th colspan="5">불량 0개 
                  </th>
                </tr>
                <tr>
                  <th>바코드</th>
                  <th v-if="selectedProduct.productColors && selectedProduct.productColors[0]">색상</th>
                  <th v-if="selectedProduct.productSizes && selectedProduct.productSizes[0]">사이즈</th>
                  <th>입고일</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in defectiveList" :key="item.id" draggable="true"
                  @dragstart="onDragStart(item, 'defective', $event)">
                  <td>
                    <PBarCodeDiv
                      :class="!item.orderId ? 'pastelGreenBg' : 'pastelYellowBg'"
                      @mouseenter="item.st == 1 && onBarcodeMouseEnter($event, item)"
                      @mouseleave="item.st == 1 && onBarcodeMouseLeave()"
                    >
                      {{ item.bcode }}
                    </PBarCodeDiv>
                  </td>
                  <td v-if="selectedProduct.productColors && selectedProduct.productColors[0]">
                    <select v-model="item.productColorId">
                      <option v-for="color in selectedProduct.productColors" :key="color.productColorId" :value="color.productColorId">{{ color.productColorInfo?.name }}</option>
                    </select>
                  </td>
                  <td v-if="selectedProduct.productSizes && selectedProduct.productSizes[0]">
                    <select v-model="item.productSize">
                      <option v-for="size in selectedProduct.productSizes && selectedProduct.productSizes[0] ? selectedProduct.productSizes[0].size.split(',') : []" :key="size" :value="size">{{ size }}</option>
                    </select>
                  </td>
                  <td>
                    <div>{{ dayjs(item.lastRestockDt).format('YYYY-MM-DD') }}</div>
                  </td>
                  <td>
                    <i v-if="!item.orderId" class="material-icons redFont">clear</i>
                  </td>
                </tr>
              </tbody>
            </PStTable>
          </PStTableContainer>

          <PStTableContainer @dragover.prevent @drop="onDrop('selfReport', $event)">
            <PStTable>
              <thead>
                <tr>
                  <th colspan="5">자진신고 0개 
                  </th>
                </tr>
                <tr>
                  <th>바코드</th>
                  <th v-if="selectedProduct.productColors && selectedProduct.productColors[0]">색상</th>
                  <th v-if="selectedProduct.productSizes && selectedProduct.productSizes[0]">사이즈</th>
                  <th>입고일</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in selfReportList" :key="item.id" draggable="true"
                  @dragstart="onDragStart(item, 'selfReport', $event)">
                  <td>
                    <PBarCodeDiv
                      :class="!item.orderId ? 'pastelGreenBg' : 'pastelYellowBg'"
                      @mouseenter="item.st == 1 && onBarcodeMouseEnter($event, item)"
                      @mouseleave="item.st == 1 && onBarcodeMouseLeave()"
                    >
                      {{ item.bcode }}
                    </PBarCodeDiv>
                  </td>
                  <td v-if="selectedProduct.productColors && selectedProduct.productColors[0]">
                    <select v-model="item.productColorId">
                      <option v-for="color in selectedProduct.productColors" :key="color.productColorId" :value="color.productColorId">{{ color.productColorInfo?.name }}</option>
                    </select>
                  </td>
                  <td v-if="selectedProduct.productSizes && selectedProduct.productSizes[0]">
                    <select v-model="item.productSize">
                      <option v-for="size in selectedProduct.productSizes && selectedProduct.productSizes[0] ? selectedProduct.productSizes[0].size.split(',') : []" :key="size" :value="size">{{ size }}</option>
                    </select>
                  </td>
                  <td>
                    <div>{{ dayjs(item.lastRestockDt).format('YYYY-MM-DD') }}</div>
                  </td>
                  <td>
                    <i v-if="!item.orderId" class="material-icons redFont">clear</i>
                  </td>
                </tr>
              </tbody>
            </PStTable>
          </PStTableContainer>
        </FlexTopDiv>
      </div>

      <div style="width: 17%">
        <PStTitle>출고현황</PStTitle>

        <PStTableContainer class="height600" @dragover.prevent @drop="onDrop('release', $event)">
          <PStTable>
            <thead>
              <tr>
                <th>바코드</th>
                <th v-if="selectedProduct.productColors && selectedProduct.productColors[0]">색상</th>
                <th v-if="selectedProduct.productSizes && selectedProduct.productSizes[0]">사이즈</th>
                <th>출고일</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in releaseList" :key="item.id" draggable="true"
                @dragstart="onDragStart(item, 'release', $event)">
                <td>
                    <PBarCodeDiv
                      :class="!item.orderId ? 'pastelGreenBg' : 'pastelYellowBg'"
                      @mouseenter="item.st == 1 && onBarcodeMouseEnter($event, item)"
                      @mouseleave="item.st == 1 && onBarcodeMouseLeave()"
                    >
                      {{ item.bcode }}
                    </PBarCodeDiv>
                  </td>
                <td v-if="selectedProduct.productColors && selectedProduct.productColors[0]">
                  <select v-model="item.productColorId">
                    <option v-for="color in selectedProduct.productColors" :key="color.productColorId" :value="color.productColorId">{{ color.productColorInfo?.name }}</option>
                  </select>
                </td>
                <td v-if="selectedProduct.productSizes && selectedProduct.productSizes[0]">
                  <select v-model="item.productSize">
                    <option v-for="size in selectedProduct.productSizes && selectedProduct.productSizes[0] ? selectedProduct.productSizes[0].size.split(',') : []" :key="size" :value="size">{{ size }}</option>
                  </select>
                </td>
                <td>
                  <div>{{ dayjs(item.lastRestockDt).format('YYYY-MM-DD') }}</div>
                </td>
                <td>
                  <i v-if="!item.orderId" class="material-icons redFont">clear</i>
                </td>
              </tr>
            </tbody>
          </PStTable>
        </PStTableContainer>

      </div>
    </FlexTopDiv>

    <ModalBtnHeightDiv></ModalBtnHeightDiv>
    <ModalBtnDiv>
      <PBarCodeSearchDiv>
        바코드 검사 :
        <PPInput placeholder="바코드를 입력해주세요" /> -
        <PPInput placeholder="바코드를 입력해주세요" />
        <PSearchBtn class="marginLeft10">조회</PSearchBtn>
      </PBarCodeSearchDiv>
    </ModalBtnDiv>
    <!-- 테이블 바깥, template 맨 아래에 힌트 버튼 추가 -->
    <BarCodeAction
      v-if="showHint"
      :style="hintStyle"
      @mouseenter="showHint = true"
      @mouseleave="showHint = false"
      @click="openOrderModify"
    >
      주문서 보기
    </BarCodeAction>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import * as PublicCss from '@/assets/styles/public.js'
import * as ModalCss from '@/assets/styles/ModalCss'
import * as ProductPageCss from '@/assets/styles/product/ProductPageCss'
import { createStock, getStock, deleteStock, updateStock } from '@/api/stock'
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import { getProductImageUrl } from './utils/imgUrl';

export default {
  name: 'ModalProductManagement',
  components: {
    ...PublicCss,
    ...ModalCss,
    ...ProductPageCss,
  },
  props: {
    selectedProduct: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const unreleaseList = ref([]);
    const asList = ref([]);
    const usedList = ref([]);
    const defectiveList = ref([]);
    const selfReportList = ref([]);
    const releaseList = ref([]);

    const listMap = {
      unrelease: unreleaseList,
      as: asList,
      used: usedList,
      defective: defectiveList,
      selfReport: selfReportList,
      release: releaseList,
    };

    // 주문서 힌트 버튼 상태 관리
    const showHint = ref(false)
    const hintStyle = ref({})
    const hintOrderNum = ref(null)

    function onBarcodeMouseEnter(event, item) {
      // 바코드 div의 화면 좌표 계산
      const rect = event.target.getBoundingClientRect()
      hintStyle.value = {
        top: `${rect.top + window.scrollY}px`,
        left: `${rect.left + window.scrollX - 90}px`, // 바코드 왼쪽 바깥에 띄움
        display: 'block',
        position: 'fixed'
      }
      // 필요한 주문 정보 저장 (임의)
      hintOrderNum.value = item.orderNum
      showHint.value = true
    }

    function onBarcodeMouseLeave() {
      showHint.value = false
    }

    const onDragStart = (item, fromList, event) => {
      event.target.classList.add('dragging');
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('itemId', item.id.toString());
      event.dataTransfer.setData('fromList', fromList);

      event.target.addEventListener('dragend', () => {
        event.target.classList.remove('dragging');
        event.target.style.cursor = 'grab';
      }, { once: true });
    };

    const onDrop = (toList, event) => {
      const itemId = parseInt(event.dataTransfer.getData('itemId'), 10);
      const fromList = event.dataTransfer.getData('fromList');

      if (fromList === toList) return;

      const fromListRef = listMap[fromList];
      const toListRef = listMap[toList];

      const itemIndex = fromListRef.value.findIndex(item => item.id == itemId);
      if (itemIndex > -1) {
        const [itemToMove] = fromListRef.value.splice(itemIndex, 1);
        toListRef.value.push(itemToMove);
      }
    };

    const createBcodeInfo = ref({
      productListId: props.selectedProduct.id,
      stockType: 'unrelease',
      productColorId: props.selectedProduct.productColors[0]?.productColorId,
      productSize: props.selectedProduct.productSizes[0]?.size.split(',')[0],
      bcode: null,
    });

    const createBcode = async () => {
      if (!createBcodeInfo.value.bcode || createBcodeInfo.value.bcode.trim() === '') {
        Swal.fire({
          title: '바코드 등록 실패',
          text: '바코드를 입력해주세요.',
          icon: 'error'
        });
        return;
      }
      const response = await createStock(createBcodeInfo.value);
      if (response.success) {
        getStockList();
        emit('loadProductList');
        Swal.fire({
          title: '재고 등록 성공',
          text: '재고 등록이 완료되었습니다.',
          icon: 'success'
        });
      }else if(response.success == false){
        Swal.fire({
          title: '바코드 등록 실패',
          text: response.message,
          icon: 'error'
        });
      }
    }

    const getStockList = async () => {
      const response = await getStock(props.selectedProduct.id);
      if (response.success) {
        unreleaseList.value = [];
        asList.value = [];
        usedList.value = [];
        defectiveList.value = [];
        selfReportList.value = [];
        releaseList.value = [];
        const { stock, stockStRestocks, stockStAs, stockStUseds, stockStFaulties, stockStReturns } = response.items;
        
        // 각 재고 항목을 해당 리스트에 분류
        stock.forEach(item => {
          // 재고 ID로 각 테이블에서 찾기
          const isRestock = stockStRestocks.some(restock => restock.stockId === item.id);
          const isAs = stockStAs.some(as => as.stockId === item.id);
          const isUsed = stockStUseds.some(used => used.stockId === item.id);
          const isFaulty = stockStFaulties.some(faulty => faulty.stockId === item.id);
          const isReturn = stockStReturns.some(returnItem => returnItem.stockId === item.id);
          // 해당하는 리스트에 추가
          if (isRestock) {
            unreleaseList.value.push(item);
          } else if (isAs) {
            asList.value.push(item);
          } else if (isUsed) {
            usedList.value.push(item);
          } else if (isFaulty) {
            defectiveList.value.push(item);
          } else if (isReturn) {
            selfReportList.value.push(item);
          } else if (item.releaseFl == 1) {
            releaseList.value.push(item);
          }
        });
        
      }
    }

    const onDeleteBarcode = async (item) => {
      Swal.fire({
        title: '바코드 삭제',
        text: '바코드를 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '삭제',
        cancelButtonText: '취소',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteStock(item.id);
          if (response.success) {
            getStockList();
            emit('loadProductList');
          }
        }
      });
    }

    const onChangeOption = async (item) => {
      try {
        console.log(item);
        await updateStock(item.id, { 
          productListId: item.productListId,
          productColorId: item.productColorId,
          productSize: item.productSize,
          bcode: item.bcode,
          stockType: item.stockType,
          orderId: item.orderId
        });
      } catch (error) {
        console.error('옵션 변경 오류:', error);
        Swal.fire({
          icon: 'error',
          title: '옵션 변경 실패',
          text: '제품 옵션 변경 중 오류가 발생했습니다.'
        });
      }
    }

    onMounted(() => {
      getStockList();
    })

    return {
      unreleaseList,
      asList,
      usedList,
      defectiveList,
      selfReportList,
      releaseList,
      onDragStart,
      onDrop,
      // 힌트 버튼 관련
      showHint,
      hintStyle,
      hintOrderNum,
      onBarcodeMouseEnter,
      onBarcodeMouseLeave,
      createBcodeInfo,
      createBcode,
      getStockList,
      onDeleteBarcode,
      onChangeOption,
      dayjs,
      getProductImageUrl,
    }
  }
}
</script>
