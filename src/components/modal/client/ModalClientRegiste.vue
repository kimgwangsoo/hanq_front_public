<template>
  <div>
    <ClientTitle>
      <FlexDiv>
        <i class="material-icons">face</i>
        &nbsp;수급자등록하기
      </FlexDiv>
      <div>
        <button @click="showRecentSearchModal">
          최근 공단조회내역 불러오기 
          <i class="material-icons">mouse</i>
        </button>
      </div>
      <div>
        <select>
          <option>급여</option>
          <!-- <option>비급여</option> -->
        </select>
      </div>
    </ClientTitle>

    <FlexDiv>
      <ClientFormTable>
        <tr>
          <th>
            * 인정번호
          </th>
          <td>
            <InputField placeholder="요양인정번호 10자리" v-model="formData.number" />
          </td>
        </tr>
        <tr>
          <th>
            * 수급자성함
          </th>
          <td>
            <InputField v-model="formData.name" />
          </td>
        </tr>
        <tr>
          <th>
            * 생년월일
          </th>
          <td>
            <InputField placeholder="예시 : 1999-01-01" v-model="formData.resident" />
          </td>
        </tr>
        <tr>
          <th>
            * 성 별
          </th>
          <td>
            <SelectField v-model="formData.gender">
              <option value="선택">선택</option>
              <option value="남">남</option>
              <option value="여">여</option>
            </SelectField>
          </td>
        </tr>
        <tr>
          <th rowspan="2">유효기간</th>
          <td>
            <InputField type="date" v-model="rcgtFr" />
          </td>
        </tr>
        <tr>
          <td>
            <InputField type="date" v-model="rcgtTo" />
          </td>
        </tr>
        <tr>
          <th rowspan="3">주소1</th>
          <td @click="searchAddress('address1')">
            <AddressRow>
              <FullWidthInput placeholder="우편번호" v-model="formData.addressnum" readonly />
              <SearchButton><i class="material-icons">search</i></SearchButton>
            </AddressRow>
          </td>
        </tr>
        <tr>
          <td>
            <InputField placeholder="주소" v-model="formData.address" readonly />
          </td>
        </tr>
        <tr>
          <td>
            <InputField placeholder="상세주소" v-model="formData.addressDetail" />
          </td>
        </tr>
        <tr>
          <th rowspan="4">주소2</th>
          <td>
            <label>
            <input type="checkbox" v-model="sameAddress" @change="copySameAddress" /> 주소 1과 주소 2 동일
            </label>
          </td>
        </tr>
        <tr>
          <td @click="searchAddress('address2')">
            <AddressRow>
              <FullWidthInput placeholder="우편번호" v-model="formData.address2Num" readonly />
              <SearchButton><i class="material-icons">search</i></SearchButton>
            </AddressRow>
          </td>
        </tr>
        <tr>
          <td>
            <InputField placeholder="주소" v-model="formData.address2" readonly />
          </td>
        </tr>
        <tr>
          <td>
            <InputField placeholder="상세주소" v-model="formData.address2Detail" />
          </td>
        </tr>
        <tr>
          <th>연락처1</th>
          <td>
            <InputField v-model="formData.phone1" />
          </td>
        </tr>
        <tr>
          <th>연락처2</th>
          <td>
            <InputField v-model="formData.phone2" />
          </td>
        </tr>
        <tr>
          <th>보호자성함</th>
          <td>
            <InputField v-model="formData.guardName" />
          </td>
        </tr>
        <tr>
          <th>수급자관계</th>
          <td>
            <SelectField v-model.number="formData.clientRelationInfoId">
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
            </SelectField>
          </td>
        </tr>
        <tr>
          <th>보호자 생년월일</th>
          <td>
            <InputField type="date" v-model="formData.guardResident" />
          </td>
        </tr>
        <tr>
          <th>담당자</th>
          <td>
            <SelectField v-model="formData.manager">
              <option value="">선택</option>
              <option v-for="user in userList" :key="user.id" :value="user.name">{{ user.name }}</option>
            </SelectField>
          </td>
        </tr>
        <tr>
          <th>센터명/개인</th>
          <td>
            <InputField v-model="formData.centerName" />
          </td>
        </tr>
        <tr>
          <th>
            * 대 상
          </th>
          <td>
            <SelectField v-model="formData.target">
              <option value="일반">일반</option>
              <option value="감경">감경</option>
              <option value="기초">기초</option>
              <option value="의료급여">의료급여</option>
            </SelectField>
          </td>
        </tr>
        <tr>
          <th>
            * 등 급
          </th>
          <td>
            <SelectField v-model="formData.ranker">
              <option value="6등급">6등급</option>
              <option value="5등급">5등급</option>
              <option value="4등급">4등급</option>
              <option value="3등급">3등급</option>
              <option value="2등급">2등급</option>
              <option value="1등급">1등급</option>
            </SelectField>
          </td>
        </tr>
        <tr>
          <th>
            * 본인부담율
          </th>
          <td>
            <SelectField v-model="formData.sale">
              <option value="1" type="number">선택</option>
              <option value="15" type="number">15%</option>
              <option value="9" type="number">9%</option>
              <option value="6" type="number">6%</option>
              <option value="0" type="number">0%</option>
            </SelectField>
          </td>
        </tr>
        <tr>
          <th>은행명</th>
          <td>
            <SelectField v-model="formData.bankName">
              <option value="선택">선택</option>
              <option value="산업은행">산업은행</option>
              <option value="기업은행">기업은행</option>
              <option value="국민은행">국민은행</option>
              <option value="외환은행">외환은행</option>
              <option value="수협">수협</option>
              <option value="농협">농협</option>
              <option value="우리은행">우리은행</option>
              <option value="제일은행">제일은행</option>
              <option value="씨티은행">씨티은행</option>
              <option value="대구은행">대구은행</option>
              <option value="부산은행">부산은행</option>
              <option value="광주은행">광주은행</option>
              <option value="제주은행">제주은행</option>
              <option value="전북은행">전북은행</option>
              <option value="경남은행">경남은행</option>
              <option value="새마을금고">새마을금고</option>
              <option value="신협">신협</option>
              <option value="우체국">우체국</option>
              <option value="하나은행">하나은행</option>
              <option value="신한은행">신한은행</option>
              <option value="케이뱅크">케이뱅크</option>
              <option value="카카오뱅크">카카오뱅크</option>
            </SelectField>
          </td>
        </tr>
        <tr>
          <th>계좌번호</th>
          <td>
            <InputField v-model="formData.bankAccout" />
          </td>
        </tr>
        <tr>
          <th>예금주</th>
          <td>
            <InputField v-model="formData.bankAdmin" />
          </td>
        </tr>
        <tr>
          <th>예금주연락처</th>
          <td>
            <InputField v-model="formData.bankPhone" />
          </td>
        </tr>
        <tr>
          <th>예금주주민번호(앞6자리)</th>
          <td>
            <InputField v-model="formData.bankResident" maxlength="6" />
          </td>
        </tr>
        <tr>
          <th>메모</th>
          <td>
            <TextareaField v-model="formData.memo"></TextareaField>
          </td>
        </tr>

        <tr>
          <th>서 명</th>
          <td>
            <RegisterButton @click="toggleSignature">서명하기</RegisterButton>
          </td>
        </tr>

        <tr v-if="showSignature">
          <th></th>
          <td>
            <SignatureArea>
              <canvas ref="signatureCanvas" width="600" height="200"></canvas>
              <FlexDiv>
                <button @click="clearSignature">지우기</button>
              </FlexDiv>
            </SignatureArea>
          </td>
        </tr>

        <tr class="borderNone">
          <td colspan="2">
            <RegisterButton class="marginTop" @click="saveClient">
              <i class="material-icons green">check_circle</i>
              등록하기
            </RegisterButton>
          </td>
        </tr>
      </ClientFormTable>
    </FlexDiv>
  </div>
</template>

<script> 
import * as PublicCss from '@/assets/styles/public.js';
import * as ModalClientCss from '@/assets/styles/client/ModalClientCss.js';
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import Swal from 'sweetalert2';
import { createClient, getLookupAll } from '@/api/client.js';
import { useStore } from 'vuex';
import { getUserList } from '@/api/user.js';

export default {
  name: 'ModalClientRegiste',
  components: {
    ...PublicCss,
    ...ModalClientCss
  },
  props: {
    show: Boolean,
    client: Object,
    source: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const root = instance?.appContext.config.globalProperties;  
    const store = useStore();
    const formData = ref({
      number: '',
      name: '',
      resident: '',
      gender: '선택',
      addressNum: '',
      address: '',
      addressDetail: '',
      address2Num: '',
      address2: '',
      address2Detail: '',
      phone1: '',
      phone2: '',
      guardName: '',
      clientRelationInfoId: 10,
      guardResident: '',
      manager: '',
      centerName: '',
      target: '일반',
      ranker: '6등급',
      sale: 1,
      bankName: '선택',
      bankAccout: '',
      bankAdmin: '',
      bankPhone: '',
      bankResident: '',
      bankDate: '',
      memo: '',
      chk: '',
      msgno: '',
      rcgt: '',
      apdtS: '',
      apdtE: '',
      cnum: ''
    });
    const rcgtFr = ref('');
    const rcgtTo = ref('');

    const sameAddress = ref(false);
    const showSignature = ref(false);
    const signatureCanvas = ref(null);
    const userList = ref([]);
    let isDrawing = false;
    let ctx = null;

    // 다음 주소 검색 스크립트 로드
    const loadDaumPostcodeScript = () => {
      return new Promise((resolve) => {
        if (window.daum && window.daum.Postcode) {
          return resolve();
        }
        
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    };

    const setManager = () => {
      formData.value.manager = store.getters.user.name;
    };

    onMounted(() => {
      loadDaumPostcodeScript();
      getUserListData();
      setManager();
    });

    // 주소 검색 함수
    const searchAddress = async (type) => {
      await loadDaumPostcodeScript();
      
      new window.daum.Postcode({
        oncomplete: (data) => {
          const roadAddr = data.roadAddress;
          
          if (type === 'address1') {
            formData.value.addressNum = data.zonecode;
            formData.value.address = roadAddr;
            
            // 주소1과 주소2 동일 체크박스가 체크되어 있으면 주소2도 업데이트
            if (sameAddress.value) {
              formData.value.address2Num = data.zonecode;
              formData.value.address2 = roadAddr;
              formData.value.address2Detail = formData.value.addressDetail;
            }
          } else {
            formData.value.address2Num = data.zonecode;
            formData.value.address2 = roadAddr;
          }
        }
      }).open();
    };

    // 주소 복사 함수
    const copySameAddress = () => {
      if (sameAddress.value) {
        formData.value.address2Num = formData.value.addressNum;
        formData.value.address2 = formData.value.address;
        formData.value.address2Detail = formData.value.addressDetail;
      } else {
        formData.value.address2Num = '';
        formData.value.address2 = '';
        formData.value.address2Detail = '';
      }
    };

    // 서명 캔버스 토글
    const toggleSignature = () => {
      showSignature.value = !showSignature.value;
      
      if (showSignature.value) {
        // 다음 렌더링 사이클에서 캔버스 초기화
        setTimeout(() => {
          initSignatureCanvas();
        }, 0);
      }
    };

    // 서명 캔버스 초기화
    const initSignatureCanvas = () => {
      if (!signatureCanvas.value) return;
      
      ctx = signatureCanvas.value.getContext('2d');
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000';
      
      // 이벤트 리스너 추가
      signatureCanvas.value.addEventListener('mousedown', startDrawing);
      signatureCanvas.value.addEventListener('mousemove', draw);
      signatureCanvas.value.addEventListener('mouseup', stopDrawing);
      signatureCanvas.value.addEventListener('mouseout', stopDrawing);
      
      // 터치 이벤트 지원
      signatureCanvas.value.addEventListener('touchstart', handleTouch);
      signatureCanvas.value.addEventListener('touchmove', handleTouch);
      signatureCanvas.value.addEventListener('touchend', stopDrawing);
    };

    // 서명 그리기 시작
    const startDrawing = (e) => {
      isDrawing = true;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    };

    // 서명 그리기
    const draw = (e) => {
      if (!isDrawing) return;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    };

    // 터치 이벤트 처리
    const handleTouch = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = signatureCanvas.value.getBoundingClientRect();
      const offsetX = touch.clientX - rect.left;
      const offsetY = touch.clientY - rect.top;
      
      if (e.type === 'touchstart') {
        startDrawing({ offsetX, offsetY });
      } else if (e.type === 'touchmove') {
        draw({ offsetX, offsetY });
      }
    };

    // 그리기 중지
    const stopDrawing = () => {
      isDrawing = false;
    };

    // 서명 지우기
    const clearSignature = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, signatureCanvas.value.width, signatureCanvas.value.height);
      formData.value.signature = '';
    };

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    onUnmounted(() => {
      if (signatureCanvas.value) {
        signatureCanvas.value.removeEventListener('mousedown', startDrawing);
        signatureCanvas.value.removeEventListener('mousemove', draw);
        signatureCanvas.value.removeEventListener('mouseup', stopDrawing);
        signatureCanvas.value.removeEventListener('mouseout', stopDrawing);
        signatureCanvas.value.removeEventListener('touchstart', handleTouch);
        signatureCanvas.value.removeEventListener('touchmove', handleTouch);
        signatureCanvas.value.removeEventListener('touchend', stopDrawing);
      }
    });

    // 저장 함수
    const saveClient = async () => {
      // 필수 항목 검증
      const requiredFields = { 'number': '인정번호', 'name': '수급자성함', 'resident': '생년월일', 'gender': '성별', 'target': '대상', 'ranker': '등급', 'sale': '본인부담율' }
      const missingFields = Object.keys(requiredFields).filter(field => !formData.value[field]);
      
      if (missingFields.length > 0) {
        Swal.fire({
          icon: 'warning',
          title: '입력 오류',
          text: `필수 항목을 모두 입력해주세요: ${missingFields.map(key => requiredFields[key]).join(', ')}`,
          confirmButtonText: '확인'
        });
        return;
      }
      
      try {
        // sale을 숫자 타입으로 변환
        const clientData = { ...formData.value };
        clientData.sale = Number(clientData.sale);
        
        // 수급자 등록 API 호출
        const response = await createClient(clientData);
        
        if (response) {
          // 응답이 성공하지 않은 경우 (이미 등록된 수급자)
          if (!response.success) {
            Swal.fire({
              icon: 'error',
              title: '등록 실패',
              text: response.message || '이미 등록된 수급자입니다.'
            });
            return;
          }
          Swal.fire({
            icon: 'success',
            title: '수급자가 성공적으로 등록되었습니다.'
          });
          // 부모 컴포넌트에 저장 이벤트 발생
          emit('save', formData.value);
          // 모달 닫기
          emit('update:show', false);
        }
      } catch (error) {
        console.error('수급자 등록 오류:', error);
        Swal.fire({
          icon: 'error',
          title: '등록 실패',
          text: '수급자 등록 중 오류가 발생했습니다.'
        });
      }
    };

    /**
     * response.data.data 형식
     * {
     *   address: "전남 광양시 진상면 신시2길 51",
     *   addressdetail: "",
     *   addressnum: "57707",
     *   centername: "N동행",
     *   chk: "y",
     *   date: "2025-07-01T15:00:00.000Z",
     *   date1: "20240812",
     *   date2: "20250811",
     *   guardname: "손복순",
     *   guardtarget: "본인",
     *   manager: "윤여륜",
     *   name: "손복순",
     *   num: 705874,
     *   number: "L2207119777",
     *   phone1: "01025083831",
     *   ranker: "4등급",
     *   rcgt: "2024-08-12 ~ 2028-08-11",
     *   regident: "1939-04-02",
     *   sale: "0%",
     *   sex: "여",
     *   target: "기초"
     * }
     */
    // 최근 공단조회내역 모달 표시 함수
    const showRecentSearchModal = async () => {
      try {
        root.$swalLoading();
        const response = await getLookupAll(20);
        root.$swalClose();
        Swal.fire({
          title: '최근 공단조회내역',
          html: `
            <div class="swalListContainer">
              <table class="swalListTable" id="recentSearchTable">
                <thead>
                  <tr>
                    <th>조회일시</th>
                    <th>성명</th>
                    <th>인정번호</th>
                  </tr>
                </thead>
                <tbody>
                  ${response.items.map((item, index) => `
                    <tr class="trHover" data-index="${index}">
                      <td>${item.createdAt.split('T')[0]}</td>
                      <td>${item.name}</td>
                      <td>${item.number}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          `,
          width: 600,
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: '닫기',
          didOpen: () => {
            // 테이블 행 클릭 이벤트 추가
            const rows = document.querySelectorAll('#recentSearchTable tbody tr');
            rows.forEach(row => {
              row.addEventListener('click', async () => {
                const index = parseInt(row.getAttribute('data-index'));
                const clientData = response.items[index];
                
                // 데이터 바인딩
                formData.value.number = clientData.number || '';
                formData.value.name = clientData.name || '';
                formData.value.resident = clientData.resident || '';
                formData.value.gender = clientData.gender || '선택';
                formData.value.target = clientData.target.replace(/[^가-힣]/g, '') || '일반';
                formData.value.ranker = clientData.ranker || '6등급';
                formData.value.sale = parseInt(clientData.sale.replace(".0", "").replace(/[^0-9]/g, '').replace(/ /g, '')) || 1;
                formData.value.rcgt = clientData.rcgt || '';
                rcgtFr.value = clientData.rcgt.split('~')[0].replace(/ /g, '') || '';
                rcgtTo.value = clientData.rcgt.split('~')[1].replace(/ /g, '') || '';
                
                // source가 button인 경우에만 추가 정보 바인딩
                if (props.source === 'button') {
                  // 주소 정보
                  if (clientData.addressNum) formData.value.addressNum = clientData.addressNum;
                  if (clientData.address) formData.value.address = clientData.address;
                  if (clientData.addressDetail) formData.value.addressDetail = clientData.addressDetail;
                  
                  // 보호자 정보
                  formData.value.guardName = clientData.guardName || '';
                  formData.value.clientRelationInfoId = clientData.clientRelationInfoId || 10;
                  
                  // 연락처
                  formData.value.phone1 = clientData.phone1 || '';
                  
                  // 센터 및 담당자 정보
                  const getUser = await store.getters.user;
                  console.log(getUser,"getUser")
                  formData.value.manager = getUser.name || clientData.manager || '';
                  
                  // 적용구간간
                  let nextEdtApdtDt = clientData.nextEdtApdtDt ? clientData.nextEdtApdtDt.replace(/ \|$/, "").split("~") : [];
                  if (nextEdtApdtDt[0]) {
                    formData.value.apdtS = nextEdtApdtDt[0];
                  }
                  
                  if (nextEdtApdtDt[1]) {
                    formData.value.apdtE = nextEdtApdtDt[1];
                  }
                }
                console.log(formData.value,"formData")
                // 모달 닫기
                Swal.close();
                
                // source 값에 따라 다른 메시지 표시
                if (props.source === 'button') {
                  Swal.mixin({
                    toast: true,
                    position: 'top-middle',
                    showConfirmButton: false,
                    timer: 1000
                  }).fire({
                    icon: 'success',
                    title: '수급자 정보가 성공적으로 불러와졌습니다.'
                  });
                }
              });
            });
          }
        });
      } catch (error) {
        console.error('최근 공단조회내역 조회 오류:', error);
        Swal.fire({
          icon: 'error',
          title: '오류',
          text: '최근 공단조회내역을 불러오는 중 오류가 발생했습니다.'
        });
      }
    };

    const getUserListData = async () => {
      const response = await getUserList({page: 1, perPage: 1000});
      if(response.success){
        userList.value = response.items;
      }
    };

    return {
      formData,
      rcgtFr,
      rcgtTo,
      sameAddress,
      searchAddress,
      copySameAddress,
      showSignature,
      signatureCanvas,
      toggleSignature,
      clearSignature,
      saveClient,
      showRecentSearchModal,
      getUserListData,
      userList
    };
  },
};
</script>
