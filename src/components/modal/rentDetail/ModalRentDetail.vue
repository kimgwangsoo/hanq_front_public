<template>
  <ModalNeed 
  v-model:show="showNeedModal" 
  :client-data="rentDetail.order.client" 
  :need-data="needCurrentData"
  :cmd="cmd"
  @save="getAllClientNeed" />

  <FlexTopDiv>
    <RDContent>
      <RDWhiteBtn @click="goOrderModifyPage">
        <i class="material-icons">reply</i>
        주문/발주서 이동
      </RDWhiteBtn>
      <CommonTitleArea style="margin-bottom: 0;">
        <CommonTitleIcon>
          <i class="material-icons">manage_accounts</i>
        </CommonTitleIcon>
        &nbsp;
        <CommonTitleDiv>대여 정보</CommonTitleDiv>
      </CommonTitleArea>

      <ClientFormTable style="width: 100%;" class="tdLeft tdPadding">
        <thead>
          <tr>
            <th>주문일자</th>
            <td>
              {{ formatDate(rentDetail.cancled) }}
            </td>
            <th>CMS 출금상태</th>
            <td>
              {{ cmsStateText }}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>현재 유효기간</th>
            <td colspan="3">
              {{ rentDetail.order?.client?.rcgt }}
            </td>
          </tr>

          <tr>
            <th rowspan="2">현재 적용구간</th>
            <td>
              {{ rentDetail.order?.client?.apdtS }}
            </td>
            <th rowspan="2">다음 적용구간</th>
            <td>
              
            </td>
          </tr>

          <tr>
            <td>
              {{ rentDetail.order?.client?.apdtE }}
            </td>
            <td>
            </td>
          </tr>

          <tr>
            <th>수급자 성함</th>
            <td>{{ rentDetail.order?.client?.name }}</td>
            <th>인정번호</th>
            <td>{{ rentDetail.order?.client?.number }}</td>
          </tr>

          <tr>
            <th>생년월일</th>
            <td>{{ rentDetail.order?.client?.resident }}</td>
            <th>등급</th>
            <td>{{ rentDetail.order?.ranker }}</td>
          </tr>

          <tr>
            <th>대상</th>
            <td>{{ rentDetail.order?.target }}</td>
            <th>본인부담율</th>
            <td>{{ rentDetail.order?.sale }}</td>
          </tr>

          <tr>
            <th rowspan="2">배송 주소</th>
            <td rowspan="2">{{ rentDetail.order?.addressNum }}</td>
            <td colspan="2">{{ rentDetail.order?.address }}</td>
          </tr>

          <tr>
            <td colspan="2">
              {{ rentDetail.order?.addressDetail }}
            </td>
          </tr>

          <tr>
            <th>보호자성함</th>
            <td>{{ rentDetail.order?.guardName }}</td>
            <th>수급자 관계</th>
            <td>{{ rentDetail.order?.clientRelationInfo?.guardTarget }}</td>
          </tr>


          <tr>
            <th>연락처1</th>
            <td>{{ rentDetail.order?.phone1 }}</td>
            <th>연락처2</th>
            <td>{{ rentDetail.order?.phone2 }}</td>
          </tr>

          <tr>
            <th>센터명</th>
            <td>{{ rentDetail.order?.centerName }}</td>
            <th>담당자</th>
            <td>{{ rentDetail.order?.confirm1Manager }}</td>
          </tr>

          <tr>
            <th>배송/물류담당자</th>
            <td>{{ getDeliveryMethodCodeReverse(rentDetail.order?.deliveryType) }}</td>
            <th>배송상태</th>
            <td>{{ deliveryStateText }}</td>
          </tr>

          <tr>
            <th colspan="4" style="font-size: 18px;">
              욕구사정기록 내역
              <button class="white" @click="registerNeedItem">기록 추가/작성하기</button>
            </th>
          </tr>
          <tr>
            <th>작성일</th>
            <th colspan="3">총평</th>
          </tr>
          <tr v-for="i in needList" :key="i" @click="updateNeedItem(i.id, i)">
            <td>{{ i.date }}</td>
            <td colspan="3">
              {{ i.resultTxt }}
            </td>
          </tr>
        </tbody>
      </ClientFormTable>
    </RDContent>

    <RDContent>
      <RDSubTitle>
        <i class="material-icons">drive_file_rename_outline</i> &nbsp;
        메모 &nbsp;
      </RDSubTitle>

      <RDMemoDiv>
        <FlexDiv style="justify-content: flex-start;">
          <SearchInput />
          <RDWhiteBtn>입력</RDWhiteBtn>
        </FlexDiv>
        <!-- 메모 목록 -->
        <RDMemoItem 
            v-for="(comment, index) in orderCommentList" 
            :key="index"
          >
            <RDCommentHeader>
              <RDCommentInfo>
                {{ new Date(comment.createdAt).toISOString().slice(0, 19).replace('T', ' ') }}
                {{ comment.user?.name || '' }}
              </RDCommentInfo>
              <Delete @click="removeComment(comment.id)" style="cursor: pointer;"/>
            </RDCommentHeader>
            <RDCommentContent>
              {{ comment.txt || '' }}
            </RDCommentContent>
          </RDMemoItem>
          
          <!-- 메모가 없을 경우 -->
          <RDCommentEmpty v-if="orderCommentList.length === 0">
            등록된 메모가 없습니다.
          </RDCommentEmpty>
      </RDMemoDiv>


      <RDSubTitle>
        <i class="material-icons">category</i> &nbsp;
        현재 대여 내역 [ {{ rentDetail.order?.orderProducts?.length || 0 }} ]
        <RDStateSpan 
          :class="{ 
            'red': rentDetail.rentStatus == '회수', 
            'green': rentDetail.rentStatus == '대여중', 
            'orange': rentDetail.rentStatus == '중지' 
          }"
        >
          {{ rentDetail.rentStatus }}
        </RDStateSpan>
        <RDStateSpan v-if="rentDetail.rentStatus == '회수'">
          (
          회수등록일:{{ rentDetail.rentWithdraws[0].withdrawDate }}
          <span v-if="rentDetail.rentWithdraws[0].withdrawComment">&nbsp;&nbsp;
          회수사유:{{ rentDetail.rentWithdraws[0].withdrawComment }}</span>
          )
        </RDStateSpan>
      </RDSubTitle>
      <RDTable>
        <thead>
          <tr>
            <th>품목코드</th>
            <th>바코드</th>
            <th>품목</th>
            <th>품목명</th>
            <th>계약시작</th>
            <th>계약종료</th>
            <th>단가</th>
            <th>본인부담금</th>
            <th>공단부담금</th>
            <!--<th>비급여처리</th>-->
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in rentDetail.order?.orderProducts" :key="item.id">
            <td>{{ item.product?.pcode }}</td>
            <td>{{ item.orderProductBcodes[0].bcode }}</td>
            <td>{{ item.product?.pitem }}</td>
            <td>{{ item.product?.pname }}</td>
            <td>{{ rentDetail.rentStart }}</td>
            <td>{{ rentDetail.rentEnd }}</td>
            <td>{{ item.product?.rentPrice }}원</td>
            <td>{{ (parseInt(item.product?.rentPrice) * (parseInt(rentDetail.order?.sale)/100)).toLocaleString() }}원</td>
            <td>{{ (parseInt(item.product?.rentPrice - item.product?.rentPrice * (parseInt(rentDetail.order?.sale)/100))).toLocaleString() }}원</td>
            <!--<td>
              <input type="checkbox" :checked="item.isNonBenefit" />
            </td>-->
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="6">합계</td>
            <td>{{ rentDetail.order?.orderProducts.reduce((acc, item) => acc + parseInt(item.product?.rentPrice), 0).toLocaleString() }}원</td>
            <td>{{ rentDetail.order?.orderProducts.reduce((acc, item) => acc + parseInt(item.product?.rentPrice) * (parseInt(rentDetail.order?.sale)/100), 0).toLocaleString() }}원</td>
            <td>{{ rentDetail.order?.orderProducts.reduce((acc, item) => acc + parseInt(item.product?.rentPrice) - parseInt(item.product?.rentPrice) * (parseInt(rentDetail.order?.sale)/100), 0).toLocaleString() }}원</td>
            <td></td>
          </tr>
        </tfoot>
      </RDTable>

      <RDSubTitle>
        <i class="material-icons">playlist_add</i> &nbsp;
        대여계약 가능 적용구간&nbsp; 
        <!--span class="guideSpan redFont">!연장계약시 적용구간 갱신 필요</span-->
        &nbsp; 
        <RDWhiteBtn @click="showReSearchModal">재조회</RDWhiteBtn>
      </RDSubTitle>

      <RDTable>
        <thead>
          <tr>
            <!--th>상태</th-->
            <th>품목</th>
            <th>품목명</th>
            <th>내구연한</th>
            <th>계약시작</th>
            <th>계약종료</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="edt_validTermDt.length === 0">
            <td colspan="5" style="text-align: center;" id="noContractPeriod">데이터 불러오는중...</td>
          </tr>
          <tr v-for="(i, index) in edt_validTermDt" :key="i">
            <!--td>미계약</td-->
            <td>{{ i.product.pitem }}</td>
            <td>{{ i.product.pname }}</td>
            <td :rowspan="edt_validTermDt.filter(item => item.product.pname === i.product.pname).length" 
                v-if="index === 0 || edt_validTermDt[index-1].product.pname !== i.product.pname">
              {{ rentDetail.durabilityInfo && rentDetail.durabilityInfo.find(item => item.pcode === i.product.pcode)?.endDate || '' }}
            </td>
            <td>{{ i.rentStart }}</td>
            <td>{{ i.rentEnd }}</td>
            <td>
              <RDWhiteBtn>적용</RDWhiteBtn>
            </td>
          </tr>
        </tbody>
      </RDTable>
    </RDContent>
  </FlexTopDiv>

  <ModalBtnHeightDiv />
  <ModalBtnDiv class="spaceAround">
    <div style="width: 35%; display: flex; justify-content: center; gap: 10px;">
      <RDWhiteBtn class="width30" v-if="rentDetail.order.contractState == 'n' || rentDetail.order.contractState == 'cok'" @click="showContractModal">
        공단계약하기
        <i class="material-icons">monitor</i>
      </RDWhiteBtn>

      <!-- <RDWhiteBtn class="width30" v-if="rentDetail.order.contractState == 'ok'" @click="showContractModifyModal">
        공단계약수정
        <i class="material-icons">monitor</i>
      </RDWhiteBtn> -->

      <RDWhiteBtn class="width30" v-if="rentDetail.order.contractState == 'ok'" @click="showContractModifyModal">
        공단계약취소
        <i class="material-icons">monitor</i>
      </RDWhiteBtn>

      <RDWhiteBtn class="width30" v-if="rentDetail.order.contractState == 'ok'" @click="showExtendModal">
        공단계약연장
        <i class="material-icons">monitor</i>
      </RDWhiteBtn>
    </div>

    <div style="width: 60%; display: flex; gap: 10px; justify-content: space-around;">
      <BlueBtn v-if="rentDetail.rentStatus === '대여중'" class="width30" @click="showReturnModal">
        <i class="material-icons">not_accessible</i>
        회수 등록
      </BlueBtn>
      <BlueBtn v-if="rentDetail.rentStatus === '회수'&&rentDetail.order.deliveryState === '2'" class="width30" @click="showReturnCompleteModal">
        회수 완료
      </BlueBtn>
      <BlueBtn v-if="rentDetail.rentStatus === '회수'" class="width30" @click="showCancelModal">
        <i class="material-icons">not_accessible</i>
        회수 취소
      </BlueBtn>
      <!-- <BlueBtn v-if="rentDetail.rentStatus === '대여중'" class="width30" @click="showStopModal">
        <i class="material-icons">pause</i>
        대여 중지
      </BlueBtn> -->
      <BlueBtn v-if="rentDetail.rentStatus === '중지'" class="width30" @click="showStopCancelModal">
        <i class="material-icons">pause</i>
        대여 중지 취소
      </BlueBtn>
    </div>
  </ModalBtnDiv>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import * as PublicCss from '@/assets/styles/public.js';
import * as ModalCss from '@/assets/styles/ModalCss.js';
import * as ModalRentDetailCss from '@/assets/styles/rentLookUp/ModalRentDetailCss.js';
import ModalNeed from '@/components/modal/need/ModalNeed.vue';
import Swal from 'sweetalert2';
import { getRentDetail, getLookupOneMongoDB, updateRentStatus } from '@/api/rent';
import { getOrderComment, deleteOrderComment, updateDeliveryStateOrder } from '@/api/order';
import Delete from 'vue-material-design-icons/Delete.vue';
// import { useStore } from 'vuex';
import { findAllClientNeed } from '@/api/client';
export default {
  name: 'ModalRentDetail',
  components: {
    ...PublicCss,
    ...ModalCss,
    ...ModalRentDetailCss,
    ModalNeed,
    Delete
  },
  props: {
    rentItem: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    // const store = useStore();
    const goOrderModifyPage = () => {
      emit('goOrderModifyPage');
      emit('close');
    }

    // 대여 상세 정보
    const rentDetail = ref({
      order: {
        client: {},
        orderProducts: [],
      }
    });

    const edt_validTermDt = ref([]);
    
    // 배송 방법 코드 변환
    const getDeliveryMethodCodeReverse = (method) => {
      const methodMap = {
          0: '내방',
          1: '택배',
          2: '물류 (기관배송)',
          3: '소독',
          4: '공급업체'
      };
      return methodMap[method] || '내방';
    }

    // 욕구사정 모달 창
    const showNeedModal = ref(false);

    // 상세 정보 조회
    const fetchRentItem = async () => {
      try {
        const response = await getRentDetail(props.rentItem.id);
        rentDetail.value = response;
        console.log(response);
      } catch (error) {
        console.error('Failed to fetch rent detail:', error);
        Swal.fire('오류', '상세 정보를 불러오지 못했습니다.', 'error');
      }
    }

    // 날짜 포맷
    const formatDate = (dateString) => {
      if (!dateString) return '';
      return dateString.split(' ')[0];
    };

    // CMS 상태
    const cmsStateText = computed(() => {
      if (!rentDetail.value) return '';
      switch (rentDetail.value.cmsState) {
        case 1: return 'CMS 등록';
        default: return 'CMS 미등록';
      }
    });
    // 배송상태
    const deliveryStateText = computed(() => {
      if (!rentDetail.value?.order) return '';
      switch (rentDetail.value.order.deliveryState) {
        case '0': return '배송대기';
        case '1': return '배송완료';
        case '2': return '회수중';
        case '3': return '회수완료';
        default: return '알수없음';
      }
    });

    // 공단 계약창
    const showContractModal = () => {
      Swal.fire({
        title: '대여계약',
        // icon: 'info',
        showCancelButton: true,
        confirmButtonText: '계약',
        cancelButtonText: '닫기',
        width: '800px',
        height: '100%',
        html: `
          <div style="max-height: 650px; overflow-y: auto; padding-right: 5px;">
            <table class="swalListTable" style="margin-bottom: 15px;">
              <thead>
                <tr>
                  <th>품목코드</th>
                  <th>바코드</th>
                  <th>품목명</th>
                  <th>계약시작일</th>
                  <th>계약종료일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="checkbox" checked></td>
                  <td>S03091004118</td>
                  <td></td>
                  <td>전연BED ST-3</td>
                  <td>20250224</td>
                  <td>20250327</td>
                </tr>
                <tr>
                  <td><input type="checkbox" checked></td>
                  <td>M18030043104</td>
                  <td></td>
                  <td>MF-22D</td>
                  <td>20250224</td>
                  <td>20250327</td>
                </tr>
              </tbody>
            </table>
            <p style="color: red; margin-bottom: 15px;">*신규 품목은 소독절차를 자동생략합니다.</p>
            
            <div style="text-align: center; margin-bottom: 15px;">
              <p style="font-weight: bold; margin-bottom: 10px;">[소독구분]</p>
              <div style="margin-bottom: 15px;">
                <label style="margin-right: 10px;">
                  <input type="radio" name="sterilizeType" value="자체" checked> 자체
                </label>
                <label style="margin-right: 10px;">
                  <input type="radio" name="sterilizeType" value="위탁"> 위탁
                </label>
                <label>
                  <input type="radio" name="sterilizeType" value="동일인"> 동일인
                </label>
              </div>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 10px; max-width: 400px; margin: 0 auto;" class="sterilizeFields">
              <div>
                <div style="margin-bottom: 5px;">소독일자</div>
                <input type="date" value="20250222" style="padding: 5px;" name="sterilizeDate">
              </div>
              
              <div>
                <div style="margin-bottom: 5px;">소독업체명</div>
                <input type="text" style="padding: 5px;" name="sterilizeCompanyName">
              </div>
              
              <div>
                <div style="margin-bottom: 5px;">사업자등록번호</div>
                <input type="text" style="padding: 5px;" name="sterilizeCompanyNumber">
              </div>

              <div class="sterilizeCertFields">
                <div style="margin-bottom: 5px;">소독필증번호</div>
                <input type="text" style="padding: 5px;" name="sterilizeNumber">
              </div>
              
              <div class="bcodeFields">

              </div>
              
              <div>
                <div style="margin-bottom: 5px;">소독종류</div>
                <select style="width: 150px; padding: 5px;" name="sterilizeProductType">
                  <option value="약물소독">약물소독</option>
                  <option value="증기소독">증기소독</option>
                  <option value="일광소독">일광소독</option>
                  <option value="끓는물소독">끓는물소독</option>
                </select>
                </select>
              </div>
              
              <div>
                <div style="margin-bottom: 5px;">약품명</div>
                <input type="text" value="닥터큐" style="padding: 5px;" name="sterilizeProductName">
              </div>
              
              <div>
                <div style="margin-bottom: 5px;">사용량</div>
                <input type="text" value="500ml" style="padding: 5px;" name="sterilizeProductAmount">
              </div>
            </div>
          </div>
        `,
        didOpen: () => {
          // 테이블 내용을 동적으로 생성
          const tableBody = document.querySelector('.swalListTable tbody');
          tableBody.innerHTML = ''; // 기존 내용 초기화
          
          // rentDetail의 주문 상품 데이터가 있는 경우 테이블 행 생성
          if (rentDetail.value && rentDetail.value.order && rentDetail.value.order.orderProducts) {
            rentDetail.value.order.orderProducts.forEach(product => {
              const bcodeFields = document.querySelector('.bcodeFields');
              bcodeFields.innerHTML = '';
              product.orderProductBcodes.forEach(bcode => {
                const row = document.createElement('div');
                row.innerHTML = `
                  <div style="width:150xp; padding: 10px;">바코드:${bcode.bcode || ''}</div>
                `;
                bcodeFields.appendChild(row);
              });
              const row = document.createElement('tr');
              
              // 품목코드, 바코드, 품목명, 계약연장시작일, 계약연장종료일 열 생성
              row.innerHTML = `
                <td style="padding: 10px; border: 1px solid #ddd;">${product.product.pcode || ''}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${product.orderProductBcodes[0].bcode || ''}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${product.product.pname || ''}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">
                    <input type="date" class="swal2-input" style="width: 90%; margin: 0; height: 30px;" value="${rentDetail.value.rentStart || ''}">
                </td>
                <td style="padding: 10px; border: 1px solid #ddd;">
                    <input type="date" class="swal2-input" style="width: 90%; margin: 0; height: 30px;" value="${rentDetail.value.rentEnd || ''}">
                </td>
              `;
              
              tableBody.appendChild(row);
            });
          // 소독 종류 라디오 버튼 이벤트 핸들러 설정
          setTimeout(() => {
            const sterilizeTypeRadios = document.querySelectorAll('input[name="sterilizeType"]');
            const sterilizeCertFields = document.querySelector('.sterilizeCertFields');
            const sterilizeFields = document.querySelector('.sterilizeFields');
            
            // 초기 상태 설정 (기본값에 따라 필드 표시/숨김)
            const initialType = document.querySelector('input[name="sterilizeType"]:checked').value;
            if (initialType === '자체') {
              if (sterilizeCertFields) sterilizeCertFields.style.display = 'none';
            } else if (initialType === '위탁') {
              if (sterilizeCertFields) sterilizeCertFields.style.display = 'block';
            } else if (initialType === '동일인') {
              if (sterilizeCertFields) sterilizeCertFields.style.display = 'none';
            }
            
            // 라디오 버튼 변경 이벤트 리스너 추가
            sterilizeTypeRadios.forEach(radio => {
              radio.addEventListener('change', (e) => {
                const selectedType = e.target.value;
                
                if (selectedType === '자체') {
                  if (sterilizeFields) sterilizeFields.style.display = 'block';
                  if (sterilizeCertFields) sterilizeCertFields.style.display = 'none';
                } else if (selectedType === '위탁') {
                  if (sterilizeFields) sterilizeFields.style.display = 'block';
                  if (sterilizeCertFields) sterilizeCertFields.style.display = 'block';
                } else if (selectedType === '동일인') {
                  if (sterilizeFields) sterilizeFields.style.display = 'none';
                  if (sterilizeCertFields) sterilizeCertFields.style.display = 'none';
                }
              });
            });
          }, 100);
          }
        },
        preConfirm: () => {
          fetchLookupOneMongoDB().then((validTermDates) => {
            const args = JSON.stringify({
              rentStartOrigin: rentDetail.value.rentStart,
              rentId: rentDetail.value.id,
              orderData: rentDetail.value.order,
              rentAddContractData: {
                products: Array.from(document.querySelectorAll('.swalListTable tbody tr')).map((row, index) => {
                  const inputs = row.querySelectorAll('input');
                  const product = rentDetail.value.order.orderProducts[index];
                  return {
                    pcode: product.product.pcode || '',
                    bcode: product.orderProductBcodes[0].bcode || '',
                    pname: product.product.pname || '',
                    pitem: product.product.pitem || '',
                    startDate: inputs[0].value.replace(/-/g,'') || '',
                    endDate: inputs[1].value.replace(/-/g,'') || ''
                  };
                }),
                nextDateArray: validTermDates
              },
              cleanData:{
                sterilizeType: document.querySelector('input[name="sterilizeType"]:checked').value,
                sterilizeDate: document.querySelector('input[name="sterilizeDate"]').value,
                sterilizeCompanyName: document.querySelector('input[name="sterilizeCompanyName"]').value,
                sterilizeCompanyNumber: document.querySelector('input[name="sterilizeCompanyNumber"]').value,
                sterilizeProductName: document.querySelector('input[name="sterilizeProductName"]').value,
                sterilizeProductAmount: document.querySelector('input[name="sterilizeProductAmount"]').value,
                sterilizeProductType: document.querySelector('select[name="sterilizeProductType"]').value,
                sterilizeNumber: document.querySelector('input[name="sterilizeNumber"]').value, 
              }

            });
            console.log(args, "args");
            window.electron.send('rentContract', args);
            const unsubscribe = window.electron.receive('rentContractResponse', (result) => {
              unsubscribe();
                Swal.fire({
                  title: result.message,
                  icon: result.success ? 'success' : 'error',
                  confirmButtonText: '확인',
                  allowOutsideClick: false,
                });
                if (result.success) {
                  fetchRentItem();
                }
            });
          });        
          return false;
        }
      }).then((result) => {
        if (result.isConfirmed) {
          return true;
        }
      })
    }

    // 공단 계약창
    // const showContractModal2 = () => {
    //   Swal.fire({
    //     title: '선택하신 품목을 계약하시겠습니까?',
    //     icon: 'question',
    //     showCancelButton: true,
    //     confirmButtonText: '계약',
    //     cancelButtonText: '취소',
    //     width: '800px',
    //     html: `
    //       <div style="max-height: 450px; overflow-y: auto; padding-right: 5px;">
    //         <table class="swalListTable" style="margin-bottom: 15px;">
    //           <thead>
    //             <tr>
    //               <th>선택</th>
    //               <th>품목코드</th>
    //               <th>바코드</th>
    //               <th>품목명</th>
    //               <th>계약시작일</th>
    //               <th>계약종료일</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             <tr>
    //               <td><input type="checkbox" checked></td>
    //               <td>S03091004118</td>
    //               <td></td>
    //               <td>전연BED ST-3</td>
    //               <td>20250224</td>
    //               <td>20250327</td>
    //             </tr>
    //             <tr>
    //               <td><input type="checkbox" checked></td>
    //               <td>M18030043104</td>
    //               <td></td>
    //               <td>MF-22D</td>
    //               <td>20250224</td>
    //               <td>20250327</td>
    //             </tr>
    //           </tbody>
    //         </table>
    //         <p style="color: red; margin-bottom: 15px;">*신규 품목은 소독절차를 자동생략합니다.</p>
            
    //         <div style="text-align: center; margin-bottom: 15px;">
    //           <p style="font-weight: bold; margin-bottom: 10px;">[소독구분]</p>
    //           <div style="margin-bottom: 15px;">
    //             <label style="margin-right: 10px;">
    //               <input type="radio" name="sterilizeType" checked> 자체
    //             </label>
    //             <label style="margin-right: 10px;">
    //               <input type="radio" name="sterilizeType"> 위탁
    //             </label>
    //             <label>
    //               <input type="radio" name="sterilizeType"> 동일인
    //             </label>
    //           </div>
    //         </div>
            
    //         <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 10px; max-width: 400px; margin: 0 auto;">
    //           <div>
    //             <div style="margin-bottom: 5px;">소독일자</div>
    //             <input type="date" value="20250222" style="padding: 5px;">
    //           </div>
              
    //           <div>
    //             <div style="margin-bottom: 5px;">소독업체명</div>
    //             <input type="text" style="padding: 5px;">
    //           </div>
              
    //           <div>
    //             <div style="margin-bottom: 5px;">사업자등록번호</div>
    //             <input type="text" style="padding: 5px;">
    //           </div>
              
    //           <div>
    //             <div>바코드: </div>
    //             <div>바코드: </div>
    //           </div>
              
    //           <div>
    //             <div style="margin-bottom: 5px;">소독종류</div>
    //             <select style="width: 100%; padding: 5px;">
    //               <option>약품소독</option>
    //             </select>
    //           </div>
              
    //           <div>
    //             <div style="margin-bottom: 5px;">약품명</div>
    //             <input type="text" value="닥터큐" style="padding: 5px;">
    //           </div>
              
    //           <div>
    //             <div style="margin-bottom: 5px;">사용량</div>
    //             <input type="text" value="500ml" style="padding: 5px;">
    //           </div>
    //         </div>
    //       </div>
    //     `
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       const args = JSON.stringify({
    //         companyData: {
    //           name: store.getters.user.companyName,
    //           cnum: store.getters.user.cnum,
    //           bnum: store.getters.user.bnum,
    //         },
    //         orderData: rentDetail.value.order,
    //       });
    //       window.electron.send('rentContract', args);
    //     }
    //   })
    // }

    // 공단 계약 수정창
    const showContractModifyModal = () => {
      Swal.fire({
        title: '계약취소',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: '취소계약진행',
        cancelButtonText: '닫기',
        width: '800px',
        html:`
          <div style="max-height: 450px; overflow-y: auto; padding-right: 5px;">
            <table class="swalListTable" style="margin-bottom: 15px;">
              <thead>
                <tr>
                  <th>품목코드</th>
                  <th>바코드</th>
                  <th>품목명</th>
                  <th>계약종료일</th>
                  <th>계약삭제</th>
                </tr>
              </thead>
              <tbody>
                
              </tbody>
            </table>
          </div>
        `,
        didOpen: () => {
          const tableBody = document.querySelector('.swalListTable tbody');
          tableBody.innerHTML = ''; // 기존 내용 초기화
          rentDetail.value.order.orderProducts.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td style="padding: 10px; border: 1px solid #ddd;">${product.product.pcode || ''}</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${product.orderProductBcodes[0].bcode || ''}</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${product.product.pname || ''}</td>
              <td style="padding: 10px; border: 1px solid #ddd;">
                <input type="text" class="endDateInput" style="width: 150px; padding: 5px;" pattern="[0-9]*" inputmode="numeric" value="${rentDetail.value.rentEnd || ''}">
              </td>
              <td style="padding: 10px; border: 1px solid #ddd;">
                <input type="checkbox" class="deleteContract" style="width: 20px; height: 20px;" onchange="
                  if(this.checked) {
                    const endDateInput = this.parentElement.previousElementSibling.querySelector('.endDateInput');
                    const currentDate = endDateInput.value;
                    if(currentDate) {
                      const date = new Date(currentDate);
                      date.setDate(date.getDate() - 1);
                      const newDate = date.toISOString().split('T')[0];
                      endDateInput.value = newDate;
                      endDateInput.disabled = true;
                      endDateInput.style.backgroundColor = '#f0f0f0';
                      endDateInput.style.color = '#666';
                    }
                  } else {
                    const endDateInput = this.parentElement.previousElementSibling.querySelector('.endDateInput');
                    endDateInput.value = '${rentDetail.value.rentEnd || ''}';
                  }
                ">
              </td>
            `;
            tableBody.appendChild(row);
          });
        },
        preConfirm: () => {
          const args = JSON.stringify({
            orderData: rentDetail.value.order,
            rentId: rentDetail.value.id,
            rentCancelContractData: {
              products: Array.from(document.querySelectorAll('.swalListTable tbody tr')).map((row, index) => {
                const inputs = row.querySelectorAll('input');
                const product = rentDetail.value.order.orderProducts[index];
                return {
                  pcode: product.product.pcode || '',
                  bcode: product.orderProductBcodes[0].bcode || '',
                  pname: product.product.pname || '',
                  pitem: product.product.pitem || '',
                  endDate: inputs[0].value.replace(/-/g,'') || ''
                };
              })
            }
          });
          window.electron.send('rentContractCancel', args);
          const unsubscribe = window.electron.receive('rentContractCancelResponse', (result) => {
            unsubscribe();
            Swal.fire({
              title: result.message,
              icon: result.success ? 'success' : 'error',
              confirmButtonText: '확인',
              allowOutsideClick: false,
            });
          });
        }
      }).then((result) => {
        if (result.isConfirmed) {
          return true;
        }
      }).catch((err) => {
        console.log(err);
        return false;
      })
    }

    // 공단 계약 연장창
    const showExtendModal = () => {
      Swal.fire({
        title: '계약연장',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: '계약',
        cancelButtonText: '닫기',
        width: '800px',
        html: `
          <div style="max-height: 450px; overflow-y: auto; padding: 10px;">
            <table class="swalListTable" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr style="background-color: #f5f5f5;">
                  <th style="padding: 10px; border: 1px solid #ddd;">품목코드</th>
                  <th style="padding: 10px; border: 1px solid #ddd;">바코드</th>
                  <th style="padding: 10px; border: 1px solid #ddd;">품목명</th>
                  <th style="padding: 10px; border: 1px solid #ddd;">계약연장시작일</th>
                  <th style="padding: 10px; border: 1px solid #ddd;">계약연장종료일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd;">S03091004118</td>
                  <td style="padding: 10px; border: 1px solid #ddd;"></td>
                  <td style="padding: 10px; border: 1px solid #ddd;">전연BED ST-3</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">2026-09-23</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">
                    <input type="date" class="swal2-input" style="width: 90%; margin: 0; height: 30px;">
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #ddd;">M18030043104</td>
                  <td style="padding: 10px; border: 1px solid #ddd;"></td>
                  <td style="padding: 10px; border: 1px solid #ddd;">MF-22D</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">2026-09-23</td>
                  <td style="padding: 10px; border: 1px solid #ddd;">
                    <input type="date" class="swal2-input" style="width: 90%; margin: 0; height: 30px;">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        `,
        didOpen: () => {
          // 테이블 내용을 동적으로 생성
          const tableBody = document.querySelector('.swalListTable tbody');
          tableBody.innerHTML = ''; // 기존 내용 초기화
          
          // rentDetail의 주문 상품 데이터가 있는 경우 테이블 행 생성
          if (rentDetail.value && rentDetail.value.order && rentDetail.value.order.orderProducts) {
            rentDetail.value.order.orderProducts.forEach(product => {
              const row = document.createElement('tr');
              
              // 품목코드, 바코드, 품목명, 계약연장시작일, 계약연장종료일 열 생성
              row.innerHTML = `
                <td style="padding: 10px; border: 1px solid #ddd;">${product.product.pcode || ''}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${product.orderProductBcodes[0].bcode || ''}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${product.product.pname || ''}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${rentDetail.value.rentEnd ? new Date(new Date(rentDetail.value.rentEnd).setDate(new Date(rentDetail.value.rentEnd).getDate() + 1)).toISOString().split('T')[0].replace(/-/g, '') : ''}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">
                    <input type="number" class="swal2-input" style="width: 90%; margin: 0; height: 30px;">
                </td>
              `;
              
              tableBody.appendChild(row);
            });
          }
        },
        preConfirm: () => {
          fetchLookupOneMongoDB().then((validTermDates) => {
            const args = JSON.stringify({
              rentStartOrigin: rentDetail.value.rentStart,
              rentId: rentDetail.value.id,
              orderData: rentDetail.value.order,
              rentAddContractData: {
                products: Array.from(document.querySelectorAll('.swalListTable tbody tr')).map((row, index) => {
                  const inputs = row.querySelectorAll('input');
                  const product = rentDetail.value.order.orderProducts[index];
                  return {
                    pcode: product.product.pcode || '',
                    bcode: product.orderProductBcodes[0].bcode || '',
                    pname: product.product.pname || '',
                    pitem: product.product.pitem || '',
                    startDate: rentDetail.value.rentEnd ? new Date(new Date(rentDetail.value.rentEnd).setDate(new Date(rentDetail.value.rentEnd).getDate() + 1)).toISOString().split('T')[0].replace(/-/g, '') : '',
                    endDate: inputs[0].value || ''
                  };
                }),
                nextDateArray: validTermDates
              },
              

            });
            window.electron.send('rentContractAdd', args);
            const unsubscribe = window.electron.receive('rentContractAddResponse', (result) => {
              unsubscribe();
                Swal.fire({
                  title: result.message,
                  icon: result.success ? 'success' : 'error',
                  confirmButtonText: '확인',
                  allowOutsideClick: false,
                });
                if (result.success) {
                  fetchRentItem();
                }
            });
          });        
          return false;
        }
      }).then((result) => {
        if (result.isConfirmed) {
          return true;
        }
      })
    }

    const rentContractInfo = async (validTermDates) => {
      const formattedDates = [];
      for (let y = 0; y < rentDetail.value.order.orderProducts.length; y++) {
        for (let i = 0; i < validTermDates.length; i += 2) {
          if (i + 1 < validTermDates.length) {
            formattedDates.unshift({
              product: rentDetail.value.order.orderProducts[y].product,
              rentStart: validTermDates[i],
              rentEnd: validTermDates[i + 1]
            });
          }
        }
      }
      edt_validTermDt.value = formattedDates;
      console.log("대여계약가능 적용구간 표시:", edt_validTermDt.value);
    }

    // 몽고DB 유저 조회 내역 가져오기
    const fetchLookupOneMongoDB = async () => {
      console.log(rentDetail.value.order.client.name, rentDetail.value.order.client.number, "몽고DB 유저 조회 내역");
      const response = await getLookupOneMongoDB(rentDetail.value.order.client.name, rentDetail.value.order.client.number);
      console.log(response, "몽고DB 유저 조회 내역");
      // 유효기간 데이터 추출
      if (response && response.items && response.items.length > 0) {
        const validTermData = response.items[0].edt_validTermDt + response.items[0].next_edt_apdtDt;
        if (validTermData) {
          // 문자열에서 날짜 형식(YYYY-MM-DD~YYYY-MM-DD) 추출
          const datePattern = /\d{4}-\d{2}-\d{2}~\d{4}-\d{2}-\d{2}/g;
          const matches = validTermData.match(datePattern);
          
          if (matches && matches.length > 0) {
            // 각 날짜 범위를 ~로 분리하여 배열에 순서대로 저장
            const validTermDates = [];
            matches.forEach(match => {
              const [startDate, endDate] = match.trim().split('~');
              validTermDates.push(startDate);
              validTermDates.push(endDate);
            });
            console.log("추출된 유효기간 데이터:", validTermDates);

            /*=========================
            대여계약가능 적용구간 표시
            =========================*/
            rentContractInfo(validTermDates);

            return validTermDates;
          } else {
            console.log("유효기간 데이터를 찾을 수 없습니다.");
            edt_validTermDt.value = [];
            document.getElementById('noContractPeriod').innerHTML = '계약가능한 적용구간이 없습니다';
            return null;
          }
        }
      }
    }

    // 재조회
    const showReSearchModal = () => {
      Swal.fire({
        title: '재조회 하시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
      })
    }

    //회수 완료
    const showReturnCompleteModal = () => {
      Swal.fire({
        title: '회수 완료 하시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await updateDeliveryStateOrder({id: rentDetail.value.order.id, deliveryState: '3'});
          if (response.success) {
            fetchRentItem();
          }
        }
      })
    }

    // 회수 등록
    const showReturnModal = () => {
      Swal.fire({
        title: '회수 등록 하시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        width: '800px',
        html: `
          <div style="max-height: 450px; overflow-y: auto; padding-right: 5px;">
            <table class="swalListTable" style="margin-bottom: 15px;">
              <thead>
                <tr>
                  <th>선택</th>
                  <th>품목코드</th>
                  <th>바코드</th>
                  <th>품목명</th>
                </tr>
              </thead>
              <tbody>
                ${rentDetail.value.order.orderProducts.map(product => `
                  <tr>
                    <td><input type="checkbox" style="width: 25px; height: 25px;" checked></td>
                    <td>${product.product.pcode || ''}</td>
                    <td>${product.orderProductBcodes[0].bcode || ''}</td>
                    <td>${product.product.pname || ''}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            
            <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 10px; max-width: 400px; margin: 0 auto;">
              <div>
                <div style="margin-bottom: 5px;">회수등록일</div>
                <input type="date" id="withdrawDate" value="${new Date().toISOString().substr(0, 10)}" style="padding: 5px;">
              </div>
              
              <div>
                <div style="margin-bottom: 5px;">회수사유</div>
                <input type="text" id="withdrawComment" style="padding: 5px;">
              </div>
            </div>
        `,
        preConfirm: () => {
          const withdrawDate = document.getElementById('withdrawDate').value;
          const withdrawComment = document.getElementById('withdrawComment').value;
          
          if(withdrawDate === '') {
            Swal.showValidationMessage('회수 등록 날짜를 입력해주세요.');
            return false;
          }
          console.log(withdrawDate, "회수 등록 날짜");

          return {
            withdrawDate: withdrawDate,
            withdrawComment: withdrawComment
          }
        }
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await updateRentStatus(rentDetail.value.id, {rentStatus: 'n', withdrawComment: result.value.withdrawComment, withdrawDate: result.value.withdrawDate});
          if (response.success) {
            Swal.fire({
              title: '회수 등록 성공',
              icon: 'success',
              confirmButtonText: '확인',
            }).then(() => {
              fetchRentItem();
            });
            
          }else{
            Swal.fire({
              title: '회수 등록 실패',
              icon: 'error',
              confirmButtonText: '확인',
            }).then(() => {
              fetchRentItem();
            });
          }
        }
      })
    }

    // 회수 취소
    const showCancelModal = () => {
      Swal.fire({
        title: '회수 취소 하시겠습니까?',
        // text: '회수 취소일',
        // input: 'date',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await updateRentStatus(rentDetail.value.id, {rentStatus: 'y'});
          if (response.success) {
            Swal.fire({
              title: '회수 취소 성공',
              icon: 'success',
              confirmButtonText: '확인',
            }).then(() => {
              fetchRentItem();
            });
          }else{
            Swal.fire({
              title: '회수 취소 실패',
              icon: 'error',
              confirmButtonText: '확인',
            }).then(() => {
              fetchRentItem();
            });
          }
        }
      })
    }

    // 대여 중지
    const showStopModal = () => {
      Swal.fire({
        title: '대여 중지 하시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        width: '800px',
        html: `
          <div style="max-height: 450px; overflow-y: auto; padding-right: 5px;">
            <table class="swalListTable" style="margin-bottom: 15px;">
              <thead>
                <tr>
                  <th>품목코드</th>
                  <th>바코드</th>
                  <th>품목명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>S03091004118</td>
                  <td></td>
                  <td>전연BED ST-3</td>
                </tr>
                <tr>
                  <td>M18030043104</td>
                  <td></td>
                  <td>MF-22D</td>
                </tr>
              </tbody>
            </table>
            
            <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; max-width: 400px; margin: 0 auto;">
              <div style="margin-bottom: 10px;">
                <div style="margin-bottom: 5px;">중지날짜</div>
                <input type="date" value="20250222" style="padding: 5px;">
              </div>
              
              <div>
                <div style="margin-bottom: 5px;">중지사유</div>
                <input type="text" style="padding: 5px;">
              </div>
            </div>
        `
      })
    }

    // 대여 중지 재시작
    const showStopRestartModal = () => {
      Swal.fire({
        title: '대여 중지 재시작 하시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        width: '800px',
        html: `
          <div style="max-height: 450px; overflow-y: auto; padding-right: 5px;">
            <table class="swalListTable" style="margin-bottom: 15px;">
              <thead>
                <tr>
                  <th>품목코드</th>
                  <th>바코드</th>
                  <th>품목명</th>
                  <th>재시작일</th>
                  <th>종료일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>S03091004118</td>
                  <td></td>
                  <td>전연BED ST-3</td>
                  <td>
                    <input type="date" />
                  </td>
                  <td>
                    <input type="date" />
                  </td>
                </tr>
                <tr>
                  <td>M18030043104</td>
                  <td></td>
                  <td>MF-22D</td>
                  <td>
                    <input type="date" />
                  </td>
                  <td>
                    <input type="date" />
                  </td>
                </tr>
              </tbody>
            </table>
        `
      })
    }

    // 대여 중지 취소
    const showStopCancelModal = () => {
      Swal.fire({
        title: '대여 중지 취소 하시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        width: '800px',
        html: `
          <div style="max-height: 450px; overflow-y: auto; padding-right: 5px;">
            <table class="swalListTable" style="margin-bottom: 15px;">
              <thead>
                <tr>
                  <th>품목코드</th>
                  <th>바코드</th>
                  <th>품목명</th>
                  <th>중지일</th>
                  <th>이전 종료일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>S03091004118</td>
                  <td></td>
                  <td>전연BED ST-3</td>
                  <td>
                    2025-06-22
                  </td>
                  <td>
                    2026-09-22
                  </td>
                </tr>
                <tr>
                  <td>M18030043104</td>
                  <td></td>
                  <td>MF-22D</td>
                  <td>
                    2025-06-22
                  </td>
                  <td>
                    2026-09-22
                  </td>
                </tr>
              </tbody>
            </table>
        `
      })
    }

    // 메모 불러오기
    const orderCommentList = ref([]);
    const fetchMemo = async () => {
      const response = await getOrderComment(rentDetail.value.order.id);
      orderCommentList.value = response.items;
      console.log(orderCommentList.value);
    }

    // 메모 삭제
    const removeComment = async (id) => {
      const response = await deleteOrderComment(id);
      if (response.success) {
        fetchMemo();
      }
    }

    // 수급자 욕구사정기록 수정
    const updateNeedItem = async (id, needData) => {
      console.log("updateNeedItem", id, needData);
      showNeedModal.value = true;
      cmd.value = "update";
      needCurrentData.value = needData;
    };

    // 수급자 욕구사정기록 등록
    const needCurrentData = ref({});
    const cmd = ref("register");
    const registerNeedItem = () => {
      showNeedModal.value = true;
      cmd.value = "register";
      needCurrentData.value = {};
    };
    
    // 수급자 욕구사정기록 목록 조회
    const needList = ref([]);
    const getAllClientNeed = async () => {
      console.log("getAllClientNeed");
      const response = await findAllClientNeed(rentDetail.value.order.client.id);
      needList.value = response.items;
    };

    onMounted(() => {
      fetchRentItem().then(() => {
        fetchMemo();
        fetchLookupOneMongoDB();
        getAllClientNeed();
      });
    })

    return {
      showNeedModal,
      rentDetail,
      formatDate,
      cmsStateText,
      deliveryStateText,
      edt_validTermDt,
      showContractModal,
      showContractModifyModal,
      showExtendModal,
      showReSearchModal,
      showCancelModal,
      showReturnModal,
      showStopModal,
      showStopRestartModal,
      showStopCancelModal,
      getDeliveryMethodCodeReverse,
      fetchMemo,
      orderCommentList,
      removeComment,
      goOrderModifyPage,
      getAllClientNeed,
      needList,
      registerNeedItem,
      updateNeedItem,
      needCurrentData,
      cmd,
      showReturnCompleteModal,
    }
  }
}
</script>
