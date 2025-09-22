<template>
    <ModalOverlay>
      <ModalContent>
        <DocPrintsArea>
          <div style="width: 100%; height: 100%;">
            <ModalHeader>
              <h2>인쇄 미리보기</h2>
              <PrintSelect>
                <h3>프린트 선택</h3>
                <CheckboxContainer v-for="(pageGroup, groupName) in pageUrls" :key="groupName">
                  <CheckboxTypeContainer>
                    <CheckboxTypeBtn 
                      v-for="(pages, typeName) in pageGroup" 
                      :key="typeName"
                      :class="{ 'active': selectedType === typeName }"
                      @click="selectType(typeName)">
                      {{ typeName }}
                    </CheckboxTypeBtn>
                  </CheckboxTypeContainer>
                  <CheckboxItemContainer>
                    <CheckboxItem v-for="(page, index) in pageGroup[selectedType]" :key="index" @click="selectPage(page)">
                      <input type="checkbox" :id="'page-' + selectedType + '-' + index" :value="page" v-model="selectedPages" />
                      <label>{{ page.name }}</label>
                    </CheckboxItem>
                  </CheckboxItemContainer>
                </CheckboxContainer>
              </PrintSelect>
            </ModalHeader>
            <DocPrintsArea>
                <DocPrintsBtnArea>
                  <DocPrintsBtnGroup>
                    <DocPrintsBtn @click="convertToPdf"><FileDocument/>&nbsp;&nbsp;&nbsp;선택PDF변환</DocPrintsBtn>
                    <DocPrintsBtn @click="printAll"><FileDocument/>&nbsp;&nbsp;&nbsp;선택프린트</DocPrintsBtn>
                    <!-- <DocPrintsBtn @click="printAll"><FileDocument/>&nbsp;&nbsp;&nbsp;전체프린트</DocPrintsBtn> -->
                  </DocPrintsBtnGroup>
                  <DocPrintsBtnGroup>
                    <DocPrintsBtn @click="saveSelectedDocumentImages"><FileDocument/>&nbsp;&nbsp;&nbsp;문자발송</DocPrintsBtn>
                    <DocPrintsBtn @click="saveSelectedDocumentImages"><FileDocument/>&nbsp;&nbsp;&nbsp;팩스발송</DocPrintsBtn>
                    <DocPrintsBtn><FileDocument/>&nbsp;&nbsp;&nbsp;문서24</DocPrintsBtn>
                  </DocPrintsBtnGroup>
                </DocPrintsBtnArea>
                
                <PreviewContainer>
                    <PreviewPageDiv v-for="i in personCnt" :key="i" :id="`printContent-${i}`" :ref="el => { if (el) printContentRefs[i-1] = el }" v-html="currentPageContent"></PreviewPageDiv>
                </PreviewContainer>
            </DocPrintsArea>
          </div>
          <DocPrintsBtnArea>
              <PrintSettingsContainer>
                <br/>
                <PrintSettingsTitle>문서 설정</PrintSettingsTitle>
                <br/>
                <PrintSettingGroup>
                  <!-- <PrintSettingsRow>
                    <label>테이블 셀 넓이:</label>
                    <input type="number" v-model.number="tableConfig.cellSize" min="10" max="120" step="5" style="font-size: 15px; width: 40px; margin-left: 10px;" @input="handleTableConfig('cellSize', tableConfig.cellSize)" />
                    <span>%</span>
                  </PrintSettingsRow> -->
                  <PrintSettingsRow>
                    <label>테이블 셀 높이:</label>
                    <input type="number" v-model.number="tableConfig.cellHeight" min="10" max="120" step="5" style="font-size: 15px; width: 40px; margin-left: 10px;" @input="handleTableConfig('cellHeight', tableConfig.cellHeight)" />
                    <span>px</span>
                  </PrintSettingsRow>
                  <PrintSettingsRow>
                    <label>폰트 크기:</label>
                    <!-- <input type="range" v-model="tableConfig.fontSize" min="8" max="16" step="1" @change="handleTableConfig('fontSize', tableConfig.fontSize)" /> -->
                    <input type="number" v-model.number="tableConfig.fontSize" min="8" max="16" step="1" style="font-size: 15px; width: 40px; margin-left: 10px;" @input="handleTableConfig('fontSize', tableConfig.fontSize)" />
                    <span>pt</span>
                  </PrintSettingsRow>
                  <PrintSettingsRow>
                    <label>여백 조정:</label>
                    <!-- <input type="range" v-model="tableConfig.pagePadding" min="5" max="30" step="5" @change="handleTableConfig('pagePadding', tableConfig.pagePadding)" /> -->
                    <input type="number" v-model.number="tableConfig.pagePadding" min="5" max="30" step="5" style="font-size: 15px; width: 40px; margin-left: 10px;" @input="handleTableConfig('pagePadding', tableConfig.pagePadding)" />
                    <span>px</span>
                  </PrintSettingsRow>
                </PrintSettingGroup>
                <PrintSettingGroup>
                  <PrintSettingsRow>
                    <label>원단위 절사</label>
                    <input type="checkbox" v-model="tableConfig.isTruncate" @change="handleTableConfig('isTruncate', tableConfig.isTruncate)" style="width: 25px; height: 25px;"/>
                  </PrintSettingsRow>
                  <PrintSettingsRow>
                    <label>출력 확인 일자:</label>
                  </PrintSettingsRow>
                  <PrintSettingsRow>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <label><input type="radio" v-model="dateOption" value="orderDate" @change="handleTableConfig('printDate', tableConfig.printDate)"/> 주문일자</label>
                      <label><input type="radio" v-model="dateOption" value="today" @change="handleTableConfig('printDate', tableConfig.printDate)"/> 오늘</label>
                      <label><input type="radio" v-model="dateOption" value="custom"/> 특정일자</label>
                    </div>
                  </PrintSettingsRow>
                  <PrintSettingsRow>
                    <input v-if="dateOption === 'custom'" type="date" v-model="tableConfig.printDate" @change="handleTableConfig('printDate', tableConfig.printDate)" />

                  </PrintSettingsRow>
                </PrintSettingGroup>
                <PrintSettingGroup>
                  <PrintSettingsRow>
                    <label>급여제공기록지 사업소 담당자</label>
                  </PrintSettingsRow>
                  <PrintSettingsRow>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <label><input type="radio" v-model.number="tableConfig.option1_1" value=0 checked @click="handleTableConfig('option1_1', 0)"/> 대표자</label>
                      <label><input type="radio" v-model.number="tableConfig.option1_1" value=1 @click="handleTableConfig('option1_1', 1)"/> 주문서담당자</label>
                    </div>
                  </PrintSettingsRow>
                </PrintSettingGroup>
                <PrintSettingGroup>
                  <PrintSettingsRow>
                    <label>공급계약서 기타 협약사항:</label>
                  </PrintSettingsRow>
                  <PrintSettingsRow>
                    <textarea type="text" id="option2_1" v-model="tableConfig.option2_1" style="width: 100%; height: 100px;"/>
                  </PrintSettingsRow>
                  <PrintSettingsRow>
                    <button @click="handleTableConfig('option2_1', tableConfig.option2_1)" style="padding: 8px 16px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; margin-top: 10px;">내용저장</button>
                  </PrintSettingsRow>
                  
                </PrintSettingGroup>
              </PrintSettingsContainer>
            </DocPrintsBtnArea>
          </DocPrintsArea>
        <FixedFooter>
          <FooterButton @click="prevPage" :disabled="currentPageIndex === 0"><ArrowLeft /> 이전</FooterButton>
          <span>{{ currentPageIndex + 1 }} / {{ selectedPages.length }}</span>
          <FooterButton @click="nextPage" :disabled="currentPageIndex === selectedPages.length - 1">다음 <ArrowRight /></FooterButton>
        </FixedFooter>
      </ModalContent>
    </ModalOverlay>
  </template>
  <script>
  import { ref, onMounted, watch, nextTick, getCurrentInstance, onBeforeMount } from 'vue';
import printJS from 'print-js';
import * as DocPrintsCss from '@/assets/styles/DocPrintsCss';
import FileDocument from 'vue-material-design-icons/FileDocument.vue';
import ArrowLeft from 'vue-material-design-icons/ArrowLeft.vue';
import ArrowRight from 'vue-material-design-icons/ArrowRight.vue';
import { getOrder, getOrdersByIds } from '@/api/order';
import Swal from 'sweetalert2';
import { useStore } from 'vuex';
import { getStampUrl } from '@/utils/stampUrl';
// import { calculateRentPrice, addStampImage, applyDataToElements, clearTableRows, addDummyRows } from './DocPrints.js';
import { getPrintTemplate, getBulkPrintTemplates } from '@/api/print';
import { getClientSign } from '@/api/client';
import { setupDocument } from './DocPrints.js';
import { getDocOptionsByCompanyId, updateDocOption, createDocOption } from '@/api/service';
import { saveSelectedDocumentImage } from '@/api/order';
import { saveSmsData } from '@/api/common';
// import { getLookupOneMongoDB } from '@/api/rent';
  export default {
    name: 'PrintPreviewModal',
    components: {
      ...DocPrintsCss,
      FileDocument,
      ArrowLeft,
      ArrowRight
    },
    props: {
      pageUrls: {
        type: Array,
        required: true
      },
      person: {
        type: Number,
        required: true
      },
      orderId: {
        type: Array,
        required: true
      }
    },
    setup(props, { emit }) {
      const instance = getCurrentInstance();
      const root = instance?.appContext.config.globalProperties;
      const personCnt = ref(props.person);
      const store = useStore();
      const currentPageIndex = ref(0);
      const currentPageContent = ref('');
      const printContentRefs = ref([]);
      const order = ref([]);
      const selectedType = ref(Object.keys(props.pageUrls[0])[0]);
      const selectedPages = ref([]);
      const docOptionId = ref(null);
      const signData = ref([{
        sign: '',
        fileName: ''
      }]);
      const validTermDates = ref([]);
      const getOrderData = async () => {
        try {
          if (props.orderId.length > 1) {
            const response = await getOrdersByIds(props.orderId);
            // props.orderId 순서에 맞게 응답 배열 정렬
            const sortedOrders = [];
            props.orderId.forEach(id => {
              const foundOrder = response.items.find(item => item.id === id);
              if (foundOrder) {
                // rent 데이터를 orderProducts로 이동
                if (foundOrder.rent) {
                  foundOrder.orderProducts.forEach(async product => {
                    // 내구연한 정보 가져오기
                    if (product.orderProductBcodes && product.orderProductBcodes.length > 0) {
                      try {
                        const rentBcodeInfo = await root.$common.fetchRentItemBcodeInfo(product.product.pcode, product.orderProductBcodes[0].bcode);
                        product.rent = {
                          ...foundOrder.rent,
                          isRentItem: true, // rent에서 온 항목임을 표시
                          durabilityEndDate: rentBcodeInfo.items?.endDate || null // 내구연한 정보 저장
                        }
                      } catch (error) {
                        console.error('내구연한 정보 조회 실패:', error);
                        product.rent = {
                          ...foundOrder.rent,
                          isRentItem: true // rent에서 온 항목임을 표시
                        }
                      }
                    } else {
                      product.rent = {
                        ...foundOrder.rent,
                        isRentItem: true // rent에서 온 항목임을 표시
                      }
                    }
                  });
                }
                sortedOrders.push(foundOrder);
              }
            });
            
            // client.id와 orderDate가 같은 주문들을 합치기
            const mergedOrders = [];
            const processedIndices = new Set();
            
            for (let i = 0; i < sortedOrders.length; i++) {
              if (processedIndices.has(i)) continue;
              
              const currentOrder = sortedOrders[i];
              const mergedOrder = {...currentOrder};
              const mergedProducts = [...currentOrder.orderProducts];
              
              for (let j = i + 1; j < sortedOrders.length; j++) {
                if (processedIndices.has(j)) continue;
                
                const nextOrder = sortedOrders[j];
                if (currentOrder.client.id === nextOrder.client.id && 
                    currentOrder.orderDate === nextOrder.orderDate) {
                  // orderProducts 배열 합치기 (이미 rent 데이터도 포함되어 있음)
                  mergedProducts.push(...nextOrder.orderProducts);
                  mergedOrder.mergeCheck = true;
                  processedIndices.add(j);
                  personCnt.value--;
                }
              }
              
              mergedOrder.orderProducts = mergedProducts;
              mergedOrders.push(mergedOrder);
              processedIndices.add(i);
            }
            
            order.value = mergedOrders;
          } else {
            const response = await getOrder(props.orderId);
            const orderItem = response.items;
            
            // rent 데이터를 orderProducts로 이동
            if (orderItem.rent) {
              orderItem.orderProducts.forEach(async product => {
                // 내구연한 정보 가져오기
                if (product.orderProductBcodes && product.orderProductBcodes.length > 0) {
                  try {
                    const rentBcodeInfo = await root.$common.fetchRentItemBcodeInfo(product.product.pcode, product.orderProductBcodes[0].bcode);
                    product.rent = {
                      ...orderItem.rent,
                      isRentItem: true, // rent에서 온 항목임을 표시
                      durabilityEndDate: rentBcodeInfo.items?.endDate || null // 내구연한 정보 저장
                    }
                  } catch (error) {
                    console.error('내구연한 정보 조회 실패:', error);
                    product.rent = {
                      ...orderItem.rent,
                      isRentItem: true // rent에서 온 항목임을 표시
                    }
                  }
                } else {
                  product.rent = {
                    ...orderItem.rent,
                    isRentItem: true // rent에서 온 항목임을 표시
                  }
                }
              });
            }
            
            order.value = [orderItem];
          }
        } catch (error) {
          console.error('Error getting order:', error);
        }
      }

      const sendSms = async () => {
        try {
          const phonereq = '01022890656';
          const phoneres = '01058861136';
          // const company = '(수)복지용구의료기3';
          const type = 'orderDoc';
          // selectedPages에서 id 값을 배열로 추출
          const doc = selectedPages.value.map(page => page.id);
          
          // SMS 데이터 객체 생성
          const smsData = {
            orderId: props.orderId,
            companyId: 1, // 회사 ID 설정
            phoneReq: phonereq,
            phoneRes: phoneres,
            // sendDate: new Date().toISOString().split('T')[0], // 현재 날짜
            doc: doc.join(','), // id 값들을 쉼표로 구분하여 저장
            type: type
          };
          
          // API를 통해 SMS 데이터 저장
          const response = await saveSmsData(smsData);
          console.log('SMS 데이터 저장 결과:', response);
          // return axios({
          //   method:'post',
          //   url:'/smsinsert',
          //   data:{
          //       name:name[0],
          //       number:number[0],
          //       company:company,
          //       phonereq:phonereq,
          //       phoneres:phoneres[0],
          //       doc:doc,
          //       orderkey:key,
          //       type:type
          //   }
          // const response = await sendSms(selectedPages.value, order.value, store.getters, tableConfig.value, dateOption.value);
          // console.log(response);
        } catch (error) {
          console.error('Error sending sms:', error);
        }
      }

      // 선택한 서류 이미지 저장 함수 (HTML2Canvas 사용 버전)
      const saveSelectedDocumentImages = async () => {
        try {
          // 로딩 표시
          Swal.fire({
            title: '이미지 변환 중...',
            text: '문서를 이미지로 변환하는 중입니다.',
            background: 'rgba(0,0,0,0)',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });
          
          // 공급계약서 기타 협약사항 높이 저장
          tableConfig.value.option2_1_height = document.getElementById('option2_1')?.scrollHeight || 0;
          
          // 템플릿 가져오기
          const html = await getBulkPrintTemplates(selectedPages.value, order.value, store.getters, tableConfig.value, dateOption.value);
          currentPageContent.value = html;
          
          // DOM이 업데이트된 후 실행
          await nextTick();
          
          // 각 페이지에 대한 스타일 및 설정 적용
          for (let i = 1; i < personCnt.value + 1; i++) {
            applyTableStyles(i);
            
            // 원단위 절사 옵션이 활성화된 경우 적용
            if (tableConfig.value.isTruncate) {
              applyPriceFormatting();
            }
          }
          
          // 인쇄 페이지 스타일 설정
          applyPrintPageStyles();
          
          // 캡처 전 여백과 스타일을 추가로 적용
          const printContents = document.querySelectorAll('[id^="printContent-"]');
          printContents.forEach(content => {
            // 원래 스타일 백업
            const originalStyle = content.getAttribute('style') || '';
            
            // 여백과 테두리 추가 (캡처 후 제거할 예정)
            // content.style.margin = '25px';
            // content.style.padding = '15px';
            // content.style.boxSizing = 'border-box';
            // content.style.position = 'relative';
            // content.style.pageBreakInside = 'avoid';
            // content.style.pageBreakAfter = 'always';
            
            // 원래 스타일 정보 저장 (나중에 복원하기 위해)
            content.setAttribute('data-original-style', originalStyle);
          });
          
          // HTML 요소를 찾아서 이미지로 변환
          const pageElements = document.querySelectorAll('[id^="printContent-"]');
          
          // html2canvas 라이브러리 동적 로드
          let html2canvas;
          try {
            html2canvas = (await import('html2canvas')).default;
          } catch (e) {
            console.error('html2canvas 라이브러리를 로드할 수 없습니다:', e);
            throw new Error('이미지 변환에 필요한 라이브러리를 로드할 수 없습니다.');
          }
          
          // 각 페이지를 이미지로 변환하여 서버에 전송
          for (let i = 1; i < pageElements.length; i++) {
            const element = pageElements[i];
            
            // HTML2Canvas 옵션 설정
            const options = {
              scale: 3, // 더 높은 해상도 (3배 스케일)
              useCORS: true, // 외부 이미지 허용
              allowTaint: true, // 외부 리소스 허용
              backgroundColor: '#ffffff', // 배경색 흰색
              logging: false, // 로그 비활성화
              // width: element.offsetWidth,
              // height: element.offsetHeight,
              // windowWidth: element.offsetWidth + 50, // 여백 추가
              // windowHeight: element.offsetHeight + 50, // 여백 추가
              // x: -25, // 좌측 여백 조정
              // y: -25, // 상단 여백 조정
              scrollX: 0, // 스크롤 위치 고정
              scrollY: 0, // 스크롤 위치 고정
              foreignObjectRendering: false, // 더 정확한 렌더링
              removeContainer: true, // 임시 컨테이너 제거
              letterRendering: true, // 텍스트 렌더링 품질 향상
              imageTimeout: 0, // 이미지 로딩 타임아웃 없음
              ignoreElements: (element) => {
                // 인쇄에 필요하지 않은 요소 무시
                return element.classList && 
                  (element.classList.contains('no-print') || 
                   element.classList.contains('hidden'));
              }
            };
            
            // HTML을 캔버스로 변환
            const canvas = await html2canvas(element, options);
            
            // 캔버스를 PNG 이미지로 변환 (Base64 인코딩) - 품질 최대로 설정
            const imageData = canvas.toDataURL('image/png', 1.0);
            
            // 원래 스타일 복원
            const originalStyle = element.getAttribute('data-original-style');
            if (originalStyle !== null) {
              element.setAttribute('style', originalStyle);
            }
            
            // Base64 데이터에서 헤더 제거
            const base64Data = imageData.replace(/^data:image\/png;base64,/, '');
            
            // 서버에 저장할 데이터 준비
            const pageData = {
              orderId: order.value[0]?.id,
              documentType: selectedType.value,
              documentName: `${selectedPages.value[0].name}_${i+1}`,
              imageData: base64Data, // HTML 대신 이미지 데이터 전송
              format: 'png' // 이미지 형식 명시
            };


            //===============================================
            // 올드 한큐 추가 데이터 구성 시작
            const additionalData = {
              data: imageData,
              id: `${order.value[0].client.name}${order.value[0].client.number}${selectedPages.value[i].id}`,
              type: 'jpg',
              name: store.getters.companyName || '',
              orderkey: order.value[0]?.id
            };
            
            console.log('팝빌 메시지 전송 시작')
            // 팝빌 메시지 전송
            var msg = JSON.stringify(additionalData);
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    console.log(xhr.response);
                }
            };
            xhr.open('POST', 'https://한큐.com/popbill_send_msg_doc_order');
            xhr.send(msg);
            // 올드 한큐 전송 종료
            //===============================================

            // API 호출하여 서버에 저장
            await saveSelectedDocumentImage(pageData);
            
            // 진행 상황 업데이트
            Swal.update({
              title: '이미지 저장 중...',
              text: `페이지 ${i+1}/${pageElements.length} 처리 중...`
            });
          }
          
          Swal.fire({
            icon: 'success',
            title: '저장 완료',
            text: '선택한 서류 이미지가 성공적으로 저장되었습니다.'
          });
        } catch (error) {
          console.error('선택한 서류 이미지 저장 중 오류:', error);
          Swal.fire({
            icon: 'error',
            title: '저장 실패',
            text: '서류 이미지 저장 중 오류가 발생했습니다.'
          });
        } finally {
          Swal.close();
        }
      };
      const dateOption = ref('orderDate');

      const tableConfig = ref({
        // cellSize: 100,
        fontSize: 11,
        pagePadding: 10,
        isTruncate: false,
        cellHeight: 30,
        option1_1: 0,
        option2_1: '',
        option2_1_height: 0,
        printDate: ''
      });

      // 회사 ID로 문서 옵션 불러오기
      const loadDocOptions = async () => {
        try {
          const companyId = store.getters.companyId;
          const response = await getDocOptionsByCompanyId(companyId);
          
          if (response.success && response.data) {
            docOptionId.value = response.data.id;
            
            // 테이블 설정에 DB 값 적용
            tableConfig.value = {
              fontSize: response.data.tableFontSize || 11,
              pagePadding: response.data.tableSideMargin || 10,
              cellHeight: response.data.tableCellHeight || 30,
              isTruncate: response.data.isTruncate || false,
              option1_1: response.data.option1_1 || 0,
              option2_1: response.data.option2_1 || ''
            };
          }
        } catch (error) {
          console.error('문서 옵션 로드 중 오류:', error);
        }
      };

      const handleTableConfig = async (type, value) => {
        if (type === 'cellSize') {
          tableConfig.value.cellSize = value;
        } else if (type === 'fontSize') {
          tableConfig.value.fontSize = value;
        } else if (type === 'pagePadding') {
          tableConfig.value.pagePadding = value;
        } else if (type === 'isTruncate') {
          tableConfig.value.isTruncate = value;
        } else if (type === 'cellHeight') {
          tableConfig.value.cellHeight = value;
        } else if (type === 'option1_1') {
          tableConfig.value.option1_1 = value;
        } else if (type === 'option2_1') {
          tableConfig.value.option2_1 = value;
        } else if (type === 'printDate') {
          tableConfig.value.printDate = value;
        }
        
        // DB에 설정 저장
        try {
          const companyId = store.getters.companyId;
          const docOption = {
            companyId,
            tableFontSize: tableConfig.value.fontSize,
            tableSideMargin: tableConfig.value.pagePadding,
            tableCellHeight: tableConfig.value.cellHeight,
            isTruncate: tableConfig.value.isTruncate,
            option1_1: tableConfig.value.option1_1,
            option2_1: tableConfig.value.option2_1
          };
          if (type != 'printDate') {
          
            if (docOptionId.value) {
              // 기존 옵션 업데이트
              await updateDocOption(docOptionId.value, {
                id: docOptionId.value,
                ...docOption
              });
            } else {
              // 새 옵션 생성
              const response = await createDocOption(docOption);
              if (response.success && response.data) {
                docOptionId.value = response.data.id;
              }
            }
          }
        } catch (error) {
          console.error('문서 옵션 저장 중 오류:', error);
        }
        
        // 설정 변경 후 현재 페이지 다시 로드하여 실시간으로 반영
        const currentPage = props.pageUrls[0][selectedType.value][currentPageIndex.value];
        loadPage(currentPage);
      }

      const selectType = (type) => {
        selectedType.value = type;
        selectedPages.value = props.pageUrls[0][type];
        currentPageIndex.value = 0;
        loadPage(props.pageUrls[0][selectedType.value][0]);
      }

      const getClientSignData = async () => {
        try {
          if (order.value && order.value.length > 0) {
            // order.value 배열의 각 항목에 대해 서명 데이터 가져오기
            for (let i = 0; i < order.value.length; i++) {
              if (order.value[i] && order.value[i].client) {
                const response = await getClientSign(order.value[i].client.id);
                if (response.success) {
                  // signData 배열이 충분한 길이를 가지고 있는지 확인
                  if (!signData.value[i]) {
                    signData.value[i] = {};
                  }
                  signData.value[i].sign = response.sign;
                  signData.value[i].fileName = response.fileName;
                }
              }
            }
            
            // 서명 데이터를 가져온 후 화면 갱신을 위해 nextTick 사용
            await nextTick();
            
            // 서명 이미지를 화면에 적용
            applySignToDocument();
          }
        } catch (error) {
          console.error('서명 데이터 가져오기 오류:', error);
        }
      }

      // 서명 이미지를 문서에 적용하는 함수 추가
      const applySignToDocument = () => {
        
        // 모든 페이지에 대해 서명 이미지 적용
        for (let i = 0; i < printContentRefs.value.length; i++) {
          if (!signData.value[i]) return;
          const pageDiv = printContentRefs.value[i].$el;
          const signElements = pageDiv.querySelectorAll('.clientSignBox');
          
          if (signElements.length > 0 && signData.value[i] && signData.value[i].sign) {
            signElements.forEach(element => {
              // 이미지 요소 생성
              const img = document.createElement('img');
              img.src = signData.value[i].sign;
              img.style.position = 'absolute';
              img.style.width = '100px';
              img.style.height = '100px';
              img.style.right = '10px';
              img.style.top = '10px';
              img.style.transform = 'translateY(-50%)';
              img.style.zIndex = '999';
              
              // 기존 내용 제거 후 이미지 추가
              // element.innerHTML = '';
              element.appendChild(img);
            });
          }
        }
      }

      const selectPage = (page) => {
        loadPage(page);
      };

      const allLoadPage = async () => {
        // 로딩 표시
        Swal.fire({
          background: 'rgba(0,0,0,0)',
          allowOutsideClick: false
        });
        Swal.showLoading();

        // 공급계약서 기타 협약사항 높이 저장
        tableConfig.value.option2_1_height = document.getElementById('option2_1').scrollHeight;
        // 템플릿 가져오기
        console.log(validTermDates.value,"validTermDates.value")
        const html = await getBulkPrintTemplates(selectedPages.value, order.value, store.getters, tableConfig.value, dateOption.value, validTermDates.value);
        currentPageContent.value = html;
        
        // DOM이 업데이트된 후 실행
        nextTick(() => {
          // 각 페이지에 대한 스타일 및 설정 적용
          for (let i = 1; i < personCnt.value + 1; i++) {
            applyTableStyles(i);
            
            // 원단위 절사 옵션이 활성화된 경우 적용
            // if (tableConfig.value.isTruncate) {
            //   applyPriceFormatting();
            // }
          }
          
          // 인쇄 페이지 스타일 설정
          applyPrintPageStyles();
        });
        
        // 인쇄 실행
        nextTick(() => {
          executePrint(html);
        });
        
        Swal.close();
      }
      
      // 테이블 스타일 적용 함수
      const applyTableStyles = (pageIndex) => {
        const allTables = document.querySelectorAll(`#printContent-${pageIndex} table`);
        allTables.forEach(table => {
          // 폰트 크기 적용 (특정 클래스 제외)
          const allElements = table.querySelectorAll('td, th');
          allElements.forEach(element => {
            if (!element.classList.contains('tit') && !element.classList.contains('font_fix')) {
              element.style.fontSize = `${tableConfig.value.fontSize}pt`;
            }
          });
          
          // 셀 높이 조정
          const allCells = table.querySelectorAll('td, th');
          allCells.forEach(cell => {
            cell.style.height = `${tableConfig.value.cellHeight}px`;
          });
        });
      }
      
      // 인쇄 페이지 스타일 적용
      const applyPrintPageStyles = () => {
        const printContents = document.querySelectorAll('[id^="printContent-"]');
        printContents.forEach((content, index) => {
          content.style.position = 'relative';
          content.style.display = 'block';
          content.style.pageBreakAfter = 'always';
          content.style.marginBottom = '20px';
          
          if (index > 0) {
            content.style.marginTop = '20px';
          }
        });
      }
      
      // 인쇄 실행
      const executePrint = async (html) => {
        import('print-js').then(() => {
          printJS({
            printable: html,
            type: 'raw-html',
            documentTitle: '인쇄 문서',
            targetStyles: ['*'],
            style: `
            @page { size: A4; margin: 0; }
            body { margin: 0; }
            [id^="printContent-"] { width: 210mm; padding: 10mm; }
            @media print {
              .page-break { page-break-after: always; }
              table { page-break-inside: auto; }
              tr { page-break-inside: avoid; page-break-after: auto; }
              td, th { page-break-inside: avoid; }
              thead { display: table-header-group; }
              tfoot { display: table-footer-group; }
            }
            `
          });
        });
        //프린트 완료 후 첫번째 화면 리셋
        await loadPage(props.pageUrls[0][selectedType.value][0]);

      }

      // 첫페이지 종류와 인원수 수신
      const loadPage = async (item) => {
        try {
          const html = await getPrintTemplate(item.url);
          currentPageContent.value = html;
          nextTick(() => {
            let orderIndex = 0;
            
            for (let i = 1; i < personCnt.value + 1; i++) {
              // 공통 setupDocument 함수 호출
              const pageDiv = document.querySelector(`#printContent-${i}`);
              const currentOrder = order.value[orderIndex];
              const currentSignData = signData.value[orderIndex];
              setupDocument(pageDiv, currentOrder, store.getters, currentSignData, item.url, getStampUrl, tableConfig.value, dateOption.value, validTermDates.value);
              // 테이블 스타일 적용
              applyTableStyles(i);
              
              // 원단위 절사 적용
              // if (tableConfig.value.isTruncate) {
              //   applyPriceFormatting();
              // }
              
              // 페이지 로드 후 서명 적용
              applySignToDocument();
              orderIndex++;
            }
          });
        } catch (error) {
          console.error('Error loading page:', error);
          currentPageContent.value = '<p>Error loading page content</p>';
        }
      };
      
      // 가격 포맷팅 함수
      const applyPriceFormatting = () => {
        // 매입가 원단위 절사 (10원 단위로)
        const buyElements = document.querySelectorAll('.pdfstr_custum_buy');
        buyElements.forEach(el => {
          if (el.textContent) {
            const value = parseInt(el.textContent.replace(/,/g, ''));
            if (!isNaN(value)) {
              const truncatedValue = Math.floor(value / 10) * 10;
              el.textContent = truncatedValue.toLocaleString();
            }
          }
        });
        
        // 공임 원단위 올림처리 (10원 단위로)
        const gongElements = document.querySelectorAll('.pdfstr_custum_gong');
        gongElements.forEach(el => {
          if (el.textContent) {
            const value = parseInt(el.textContent.replace(/,/g, ''));
            if (!isNaN(value)) {
              const roundedValue = Math.ceil(value / 10) * 10;
              el.textContent = roundedValue.toLocaleString();
            }
          }
        });
        
        // 단가 계산 (매입가 + 공임)
        const danElements = document.querySelectorAll('.pdfstr_custum_dan');
        danElements.forEach(el => {
          const row = el.closest('tr');
          if (row) {
            const buyEl = row.querySelector('.pdfstr_custum_buy');
            const gongEl = row.querySelector('.pdfstr_custum_gong');
            
            if (buyEl && gongEl) {
              const buyValue = parseInt(buyEl.textContent.replace(/,/g, '')) || 0;
              const gongValue = parseInt(gongEl.textContent.replace(/,/g, '')) || 0;
              const totalValue = buyValue + gongValue;
              el.textContent = totalValue.toLocaleString();
            }
          }
        });
      }
  
      const nextPage = () => {
        if (currentPageIndex.value < selectedPages.value.length - 1) {
          currentPageIndex.value++;
        }
      };
  
      const prevPage = () => {
        if (currentPageIndex.value > 0) {
          currentPageIndex.value--;
        }
      };
  
      const closeModal = () => {
        emit('close');
      };
      
      const convertToPdf = () => {
        // PDF 변환 로직 구현
        console.log('PDF 변환 기능');
      };
      
      const printAll = async () => {
        allLoadPage();
      };

      // 몽고DB 유저 조회 내역 가져오기
      // const fetchLookupOneMongoDB = async () => {
      //   console.log(order.value[0].client.name, order.value[0].client.number, "몽고DB 유저 조회 내역");
      //   const response = await getLookupOneMongoDB(order.value[0].client.name, order.value[0].client.number);
      //   console.log(response, "몽고DB 유저 조회 내역");
      //   // 유효기간 데이터 추출
      //   if (response && response.items && response.items.length > 0) {
      //     const validTermData = response.items[0].edt_validTermDt + response.items[0].next_edt_apdtDt;
      //     if (validTermData) {
      //       // 문자열에서 날짜 형식(YYYY-MM-DD~YYYY-MM-DD) 추출
      //       const datePattern = /\d{4}-\d{2}-\d{2}~\d{4}-\d{2}-\d{2}/g;
      //       const matches = validTermData.match(datePattern);
            
      //       if (matches && matches.length > 0) {
      //         // 각 날짜 범위를 ~로 분리하여 배열에 순서대로 저장
      //         const validTermDates = [];
      //         matches.forEach(match => {
      //           const [startDate, endDate] = match.trim().split('~');
      //           validTermDates.unshift({
      //             rentStart: startDate,
      //             rentEnd: endDate,
      //           });
      //         });
      //         console.log("추출된 적용구간 데이터:", validTermDates);

      //         return validTermDates;
      //       } else {
      //         console.log("유효기간 데이터를 찾을 수 없습니다.");
      //         return null;
      //       }
      //     }
      //   }
      // };
  
      watch(currentPageIndex, (newIndex) => {
        loadPage(props.pageUrls[0][selectedType.value][newIndex]);
      });
  
      onBeforeMount(() => {
        root.$swalLoading();
      });
      
      onMounted(async () => {
        // 주문 데이터를 가져온 후 첫 페이지 로드
        try {
          
          await getOrderData().then(async () => {
            getClientSignData();
            validTermDates.value = await root.$common.fetchLookupOneValidTermDatesMongoDB(order.value[0].client.name, order.value[0].client.number);
          });
          
          // 문서 옵션 로드 추가
          await loadDocOptions();
          
          if (props.pageUrls.length > 0) {
            await loadPage(props.pageUrls[0][selectedType.value][0]);
            selectedPages.value = props.pageUrls[0][selectedType.value];
            root.$swalClose();
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: '오류',
            text: '초기 데이터 로딩 중 오류가 발생했습니다.',
          });
          console.error('초기 데이터 로딩 중 오류 발생:', error);
        }
      });
  
      return {
        personCnt,
        currentPageIndex,
        currentPageContent,
        printContentRefs,
        nextPage,
        prevPage,
        closeModal,
        print,
        convertToPdf,
        printAll,
        selectPage,
        selectedType,
        selectType,
        selectedPages,
        tableConfig,
        handleTableConfig,
        allLoadPage,
        dateOption,
        saveSelectedDocumentImages,
        sendSms
      };
    },
  }
  </script>