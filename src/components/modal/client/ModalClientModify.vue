<template>
  <div style="position:relative;">

    <TabContainer>
      <TabButton :class="{ active: activeTab === 'basicInfo' }" @click="activeTab = 'basicInfo'">
        <i class="material-icons">settings</i>
        수급자 기본정보
      </TabButton>
      <TabButton :class="{ active: activeTab === 'cmsInfo' }" @click="activeTab = 'cmsInfo'">
        <i class="material-icons">currency_exchange</i>
        수급자 결제정보(CMS/가상계좌)
      </TabButton>
    </TabContainer>

    <div v-if="activeTab === 'basicInfo'" style="position:relative;">
      <FlexTopDiv>
        <div style="width:45%;"> 
          <ClientTitle>
            <!-- <FlexDiv>
            <i class="material-icons">face</i>
            &nbsp;수급자 입소이용의뢰서 정보
          </FlexDiv> -->
            <div>
              <select class="modify">
                <option>급여</option>
                <!-- <option>비급여</option> -->
              </select>
            </div>
          </ClientTitle>
          <FlexDiv>
            <!-- 수급자 기본정보 탭 -->
            <ClientFormTable>
              <tr>
                <th>
                  인정번호
                </th>
                <td>
                  <div style="display: flex; align-items: center; gap: 5px;">
                    <InputField placeholder="요양인정번호 10자리" v-model="formData.number" /> 
                    <span>-</span> 
                    <InputField placeholder="요양인정번호 뒤 3자리" v-model="formData.numberSub" />
                  </div>
                </td>
              </tr>
              <tr>
                <th>
                  수급자성함
                </th>
                <td>
                  <InputField v-model="formData.name" />
                </td>
              </tr>
              <tr>
                <th>
                  생년월일
                </th>
                <td>
                  <InputField placeholder="예시 : 1999-01-01" v-model="formData.resident" />
                  <span v-if="formData.resident" style="color: #666; float: left;">({{ calculatedAge }}세)</span>
                </td>
              </tr>
              <tr>
                <th>
                  성 별
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
                  <InputField type="date" v-model="rcgtFr" readonly/>
                </td>
              </tr>
              <tr>
                <td>
                  <InputField type="date" v-model="rcgtTo" readonly/>
                </td>
              </tr>
              <tr>
                <th rowspan="2">적용구간</th>
                <td>
                  <InputField type="date" v-model="formData.apdtS" readonly/>
                </td>
              </tr>
              <tr>
                <td>
                  <InputField type="date" v-model="formData.apdtE" placeholder="yyyy-mm-dd" readonly/>
                </td>
              </tr>

              <tr>
                <th rowspan="3">주소1</th>
                <td @click="searchAddress('address1')">
                  <AddressRow>
                    <FullWidthInput placeholder="우편번호" v-model="formData.addressNum" readonly />
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
                  <FlexDiv>
                    <label>
                      <input type="checkbox" v-model="sameAddress" @change="copySameAddress" /> 주소1과 주소2 동일
                    </label>

                    <label>
                      <input type="checkbox" />
                      기존 주문서 주소 일괄 수정
                    </label>
                  </FlexDiv>
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
                <th rowspan="2">연락처1</th>
                <td>
                  <label>
                    <input type="checkbox" />
                    기존 주문서 연락처 일괄 수정
                  </label>
                </td>
              </tr>
              <tr>
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
                    <option v-for="user in userList" :key="user.id" :value="user.name">{{ user.name }}</option>
                  </SelectField>
                </td>
              </tr>
              <tr>
                <th>센터명</th>
                <td>
                  <InputField v-model="formData.centerName" />
                </td>
              </tr>
              <tr>
                <th>
                  대 상
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
                  등 급
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
                  본인부담율
                </th>
                <td>
                  <SelectField v-model="formData.sale">
                    <option value="선택">선택</option>
                    <option value="15">15%</option>
                    <option value="9">9%</option>
                    <option value="6">6%</option>
                    <option value="0">0%</option>
                  </SelectField>
                </td>
              </tr>
              <tr>
                <th>메모</th>
                <td>
                  <TextareaField v-model="formData.memo"></TextareaField>
                </td>
              </tr>
              <!-- <tr>
                <th>
                  욕구사정기록
                  <br>
                  <br>
                  <button class="white" @click="showNeedModal = true">기록 추가/작성하기</button>
                </th>
                <td>
                  <RecordDiv @click="openNeedModal(need)" v-for="need in needData" :key="need.num">
                    {{ need.date }} {{ need.resulttext }}
                  </RecordDiv>
                </td>
              </tr> -->
              <tr>
                <th>서 명</th>
                <td>
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                    <img v-if="signData.sign" :src="signData.sign" alt="서명" style="width: 100px; height: 100px;">
                    <div v-else style="width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; border: 1px dashed #ccc;">서명없음</div>
                    <RegisterButton @click="toggleSignature">서명수정</RegisterButton>
                    <RegisterButton v-if="signData.sign" @click="clearSignature" style="margin-left: 10px;">
                      <i class="material-icons red">delete</i>
                      서명삭제
                    </RegisterButton>
                  </div>
                </td>
              </tr>
              <tr v-if="showSignature">
                <th>
                  실시간 좌표: {{ realTimeCoordinates }}
                </th>
                <td>
                  <SignatureArea>
                    <canvas ref="signatureCanvas" width="400" height="400"></canvas>
                    <FlexDiv>
                      <button @click="clearSignature">지우기</button>
                    </FlexDiv>
                  </SignatureArea>
                </td>
              </tr>
            </ClientFormTable>
          </FlexDiv>
        </div>
        <CHalfSubDiv>
          <ClientInfoSection :clientData="formData" parent="client" />
        </CHalfSubDiv>
      </FlexTopDiv>
      <FlexDiv style="position:sticky; bottom:0; right:0; background:#fff;">
        <!-- <RegisterButton class="marginTop">
          <i class="material-icons blue">rocket</i>
          주문서 입력
        </RegisterButton> -->
        <RegisterButton class="marginTop" @click="saveClient">
          <i class="material-icons green">person</i>
          수정하기
        </RegisterButton>
        <RegisterButton class="marginTop" @click="removeClient">
          <i class="material-icons red">delete</i>
          삭제하기
        </RegisterButton>
      </FlexDiv>
    </div>

    <!-- 수급자 결제정보 탭 -->
    <div v-if="activeTab === 'cmsInfo'" style="width: 100%;">
      <ClientCMSComponent :client="formData" @update="updateCMSInfo" @save="saveCMSInfo" />
    </div>
  </div>
</template>

<script>
import * as PublicCss from '@/assets/styles/public.js';
import * as ModalClientCss from '@/assets/styles/client/ModalClientCss.js';
import { ref, onMounted, onUnmounted, defineExpose, watch, computed, reactive } from 'vue';
import ClientCMSComponent from '@/components/modal/client/ClientCMSComponent.vue';
import { formatDate, calculateAge } from '@/utils/format.js';
import { getClientById, updateClient, deleteClient, updateClientSign, getClientSign, deleteClientSign } from '@/api/client.js';
import { getUserList } from '@/api/user.js';
import Swal from 'sweetalert2';
import ClientInfoSection from '@/components/ClientInfoSection.vue';
export default {
  name: 'ModalClientModify',
  components: {
    ...PublicCss,
    ...ModalClientCss,
    ClientCMSComponent,
    ClientInfoSection,
  },
  props: ['clientId'],
  setup(props, { emit }) {
    const activeTab = ref('basicInfo'); 
    const formData = ref({
      id: props.clientId,
      number: '',
      name: '',
      resident: '',
      date1: '',
      date2: '',
      sex: '선택',
      addressNum: '',
      address: '',
      addressDetail: '',
      zipcode2: '',
      address2: '',
      address2Detail: '',
      phone1: '',
      phone2: '',
      guardName: '',
      guardTarget: '본인',
      manager: '',
      centerName: '',
      target: '일반',
      ranker: '6등급',
      sale: '선택',
      bankName: '선택',
      accountNumber: '',
      accountHolder: '',
      accountHolderPhone: '',
      accountHolderSSN: '',
      memo: '',
      sign: '',
      // CMS 관련 필드 추가
      cmsStatus: '신청전',
      cmsApplyDate: '',
      cmsCancelDate: ''
    });
    const signData = reactive({
      sign: '',
      fileName: ''
    });
    const rcgtFr = ref('');
    const rcgtTo = ref('');
    const userList = ref([]);
    const sameAddress = ref(false);
    const showSignature = ref(false);
    const signatureCanvas = ref(null);
    const showNeedModal = ref(false);
    const selectedNeedData = ref(null);
    const realTimeCoordinates = ref({ x: 0, y: 0 });
    let isDrawing = false;
    let ctx = null;

    // 나이 계산
    const calculatedAge = computed(() => {
      return calculateAge(formData.value.resident) || 0;
    });

    // 수급자 데이터 가져오기
    const fetchClientData = async () => {
      if (!props.clientId) return;
      
      try {
        const response = await getClientById(props.clientId);
        if (response) {
          const clientData = response.item;
          formData.value = {
            id: clientData.id || '',
            name: clientData.name || '',
            number: clientData.number || '',
            numberSub: clientData.numberSub || '',
            resident: clientData.resident || '',
            gender: clientData.gender || '선택',
            apdtS: formatDate(clientData.apdtS) || '',
            apdtE: formatDate(clientData.apdtE) || '',
            addressNum: clientData.addressNum || '',
            address: clientData.address || '',
            addressDetail: clientData.addressDetail || '',
            address2Num: clientData.address2Num || '',
            address2: clientData.address2 || '',
            address2Detail: clientData.address2Detail || '',
            phone1: clientData.phone1 || '',
            phone2: clientData.phone2 || '',
            guardName: clientData.guardName || '',
            clientRelationInfoId: clientData.clientRelationInfoId || 10,
            guardResident: clientData.guardResident || '',
            manager: clientData.manager || '',
            centerName: clientData.centerName || '',
            target: clientData.target || '일반',
            ranker: clientData.ranker || '6등급',
            sale: clientData.sale || 1,
            memo: clientData.memo || '',
          };
          rcgtFr.value = formatDate(clientData.rcgt.split('~')[0].replace(/ /g, '')) || '';
          rcgtTo.value = formatDate(clientData.rcgt.split('~')[1].replace(/ /g, '')) || '';
        }
      } catch (error) {
        console.error('수급자 데이터 가져오기 오류:', error);
      }
    };

    // clientId가 변경될 때마다 데이터 가져오기
    watch(() => props.clientId, () => {
      fetchClientData();
    }, { immediate: true });

    // 욕구사정기록 모달 열기
    const openNeedModal = (need) => {
      selectedNeedData.value = need;
      showNeedModal.value = true;
    };

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

    onMounted(() => {
      loadDaumPostcodeScript();
      fetchClientData();
      getClientSignData();
      getUserListData();
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
      realTimeCoordinates.value = { x: e.offsetX, y: e.offsetY };
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
      
      // 현재 커서 위치 표시
      const cursorPosition = document.createElement('div');
      cursorPosition.style.position = 'absolute';
      cursorPosition.style.left = `${touch.clientX}px`;
      cursorPosition.style.top = `${touch.clientY}px`;
      cursorPosition.style.width = '10px';
      cursorPosition.style.height = '10px';
      cursorPosition.style.borderRadius = '50%';
      cursorPosition.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
      cursorPosition.style.zIndex = '1000';
      cursorPosition.style.pointerEvents = 'none';
      realTimeCoordinates.value = { x: offsetX, y: offsetY };
      console.log(realTimeCoordinates.value,"realTimeCoordinates");
      document.body.appendChild(cursorPosition);
      
      // 잠시 후 커서 표시 제거
      setTimeout(() => {
        document.body.removeChild(cursorPosition);
      }, 500);

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
    const clearSignature = async () => {
      const response = await deleteClientSign(props.clientId);
      if (response && response.success) {
        Swal.fire({
          icon: 'success',
          title: '서명 삭제 완료',
          timer: 1500,
          showConfirmButton: false,
        });
        await getClientSignData();
      }
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

    // CMS 정보 업데이트
    const updateCMSInfo = (cmsData) => {
      // CMS 컴포넌트에서 받은 데이터로 formData 업데이트
      formData.value = {
        ...formData.value,
        ...cmsData
      };
    };

    // CMS 정보 저장
    const saveCMSInfo = (cmsData) => {
      // CMS 컴포넌트에서 받은 데이터로 formData 업데이트 후 저장
      formData.value = {
        ...formData.value,
        ...cmsData
      };

      // 부모 컴포넌트에 저장 이벤트 발생
      emit('save', formData.value);
    };

    // 서명 이미지 저장
    const saveSignature = async () => {
      if (!signatureCanvas.value) return;
      const signatureImage = signatureCanvas.value.toDataURL();
      console.log(signatureImage,"signatureImage")
      if (signatureImage) {
        const response = await updateClientSign(props.clientId, signatureImage);
        if (response && response.success) {
          Swal.fire({
            icon: 'success',
            title: '서명 저장 완료',
            timer: 1500,
            showConfirmButton: false,
          });
        }      
      }else{
        return;
      }
      
    };

    const getClientSignData = async () => {
      const response = await getClientSign(props.clientId);
      signData.sign = response.sign;
      signData.fileName = response.fileName;
    };

    // 저장 함수
    const saveClient = async () => {  
      // 필수 항목 검증
      const requiredFields = { 'number': '인정번호', 'name': '수급자성함', 'resident': '생년월일', 'gender': '성별', 'target': '대상', 'ranker': '등급', 'sale': '본인부담율' };
      const missingFields = Object.keys(requiredFields).filter(field => !formData.value[field]);

      if (missingFields.length > 0) {
        alert(`필수 항목을 모두 입력해주세요: ${missingFields.map(key => requiredFields[key]).join(', ')}`);
        return;
      }

      try {
        // 수급자 정보 업데이트
        const clientData = { ...formData.value };
        clientData.sale = Number(clientData.sale);
        const response = await updateClient(props.clientId, clientData);
        await saveSignature();
        
        if (response && response.success) {
          // 부모 컴포넌트에 저장 이벤트 발생
          emit('save', formData.value);
          emit('close');
          Swal.fire({
            icon: 'success',
            title: '수급자 정보 수정완료',
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        console.error('수급자 정보 저장 오류:', error);
        Swal.fire({
          icon: 'error',
          title: '수급자 정보 저장 중 오류가 발생했습니다.',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    };

    const removeClient = async () => {
      Swal.fire({
        title: '정말 삭제하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '삭제',
        cancelButtonText: '취소'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteClient(props.clientId);
          if (response && response.success) {
            Swal.fire({
              icon: 'success',
          title: '수급자 삭제완료',
          timer: 1500,
          showConfirmButton: false,
        });
        // 부모 컴포넌트에 삭제 이벤트 발생
        emit('delete', props.clientId);
        emit('close');
        }
        }
      });
    };

    const getUserListData = async () => {
      const response = await getUserList({page: 1, perPage: 1000});
      if(response.success){
        userList.value = response.items;
        console.log(userList.value,"userList")
      }
    };

    defineExpose({
      openNeedModal
    });

    return {
      activeTab,
      formData,
      rcgtFr,
      rcgtTo,
      sameAddress,
      searchAddress,
      copySameAddress,
      showSignature,
      signatureCanvas,
      showNeedModal,
      selectedNeedData,
      openNeedModal,
      toggleSignature,
      clearSignature,
      saveClient,
      removeClient,
      updateCMSInfo,
      saveCMSInfo,
      calculatedAge,
      realTimeCoordinates,
      getClientSignData,
      signData,
      getUserListData,
      userList
    };
  },
};
</script>
