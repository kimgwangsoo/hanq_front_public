<template>
  <div ref="modalContent" style="display: none;">
    <TitleTable>
      <tr>
        <th class="title">욕구사정 기록지</th>
        <th>작성일</th>
        <td>
          <input type="date" name="assessmentDate" :value="formData?.date || ''" />
        </td>
      </tr>
      <tr>
        <th></th>
        <th>작성자</th>
        <td>{{ needData?.manager }}</td>
      </tr>
      <tr>
        <th></th>
        <th></th>
        <td class="right">서명 (인)</td>
      </tr>
    </TitleTable>
    <ButtonContainer>
      <ActionButton class="ai-button">AI 자동작성</ActionButton>
      <ActionButton class="history-button" @click="loadRecentHistory">최근 작성내역 불러오기</ActionButton>
    </ButtonContainer>
    <div>
      <NeedTable>
        <tr>
          <th>수급자성명</th>
          <td>
            {{ clientData.name || '성함' }}
          </td>

          <th>키</th>
          <td>
            <input style="width: 60px;" name="height" :value="formData?.cm || ''" /> cm
          </td>

          <th>생년월일</th>
          <td>
            {{ clientData.resident || '0000-00-00' }}
          </td>
        </tr>

        <tr>
          <th>인정번호/등급</th>
          <td>
            {{ clientData.number || 'L1234567890' }} / {{ clientData.ranker || '등급' }}
          </td>

          <th>체중</th>
          <td>
            <input style="width: 60px;" name="weight" :value="formData?.kg || ''" /> kg
          </td>

          <th>성별/연령</th>
          <td>
            {{ clientData.gender || '남' }} / {{ calculatedAge }}세
          </td>
        </tr>

        <tr>
          <th>주소</th>
          <td colspan="3">
            {{ clientData.address || '' }} {{ clientData.addressDetail || '' }}
          </td>

          <th>전화번호</th>
          <td>
            {{ clientData.phone1 || '010-0000-0000' }}
          </td>
        </tr>

        <tr>
          <th colspan="6">1. 신체상태(일상생활 동작 수행능력)</th>
        </tr>
        <tr>
          <td colspan="6">
            <textarea style="width: 100%; height: 100px; border: 1px solid #ddd; padding: 10px;" name="body" v-model="formData.body"></textarea>
          </td>
        </tr>

        <tr>
          <th colspan="6">2. 인지상태(정신상태, 감정)</th>
        </tr>
        <tr>
          <td colspan="6">
            <textarea style="width: 100%; height: 100px; border: 1px solid #ddd; padding: 10px;" name="mental" v-model="formData.mental"></textarea>
          </td>
        </tr>

        <tr>
          <th colspan="6">3. 가족 및 환경 상태</th>
        </tr>
        <tr class="mobileNone">
          <th>구분</th>
          <th colspan="5">확인</th>
        </tr>
        <tr>
          <th>주수발자</th>
          <td>
            <label>
              <input type="radio" name="caregiver" value="유" :checked="needData?.family === '유'" /> 유
            </label>
            <label>
              <input type="radio" name="caregiver" value="무" :checked="needData?.family === '무'" /> 무
            </label>
          </td>

          <th>관계</th>
          <td colspan="3">
            <input style="width: 90%; padding: 5px;" name="familyRelation" :value="needData?.familytarget || ''" />
          </td>
        </tr>

        <tr>
          <th>자녀수</th>
          <td colspan="5" style="text-align: left;">
            <input style="width: 90%; padding: 5px;" name="childrenCount" :value="needData?.childrenCnt || ''" />
          </td>
        </tr>

        <tr>
          <th>동거인</th>
          <td colspan="5">
            <div class="checkbox-container">
              <label>
                <input type="checkbox" style="margin-right: 5px;" name="withLive" value="독거" :checked="needData?.withlive?.includes('독거')" /> 독거
              </label>
              <label>
                <input type="checkbox" style="margin-right: 5px;" name="withLive" value="부부" :checked="needData?.withlive?.includes('부부')" /> 부부
              </label>
              <label>
                <input type="checkbox" style="margin-right: 5px;" name="withLive" value="부모" :checked="needData?.withlive?.includes('부모')" /> 부모
              </label>
              <label>
                <input type="checkbox" style="margin-right: 5px;" name="withLive" value="자녀" :checked="needData?.withlive?.includes('자녀')" /> 자녀
              </label>
              <label>
                <input type="checkbox" style="margin-right: 5px;" name="withLive" value="손자녀" :checked="needData?.withlive?.includes('손자녀')" /> 손자녀
              </label>
              <label>
                <input type="checkbox" style="margin-right: 5px;" name="withLive" value="친척" :checked="needData?.withlive?.includes('친척')" /> 친척
              </label>
              <label>
                <input type="checkbox" style="margin-right: 5px;" name="withLive" value="친구,이웃" :checked="needData?.withlive?.includes('친구,이웃')" /> 친구,이웃
              </label>
            </div>
          </td>
        </tr>

        <tr>
          <th colspan="6">4. 희망급여</th>
        </tr>

        <tr>
          <th colspan="3">보유중인 품목</th>
          <th colspan="3" class="mobileNone">희망 품목</th>
        </tr>

        <tr>
          <td colspan="3">
            <textarea style="width: 100%; height: 120px; border: 1px solid #ddd; padding: 10px;" name="haveProduct" v-model="formData.haveProduct"></textarea>
          </td>
          <th colspan="3" class="deskNone">희망 품목</th>

          <td colspan="3">
            <textarea style="width: 100%; height: 120px; border: 1px solid #ddd; padding: 10px;" name="wantProduct" v-model="formData.wantProduct"></textarea>
          </td>
        </tr>

        <tr>
          <th colspan="6">5. 총평</th>
        </tr>
        <tr>
          <td colspan="6">
            <textarea style="width: 100%; height: 120px; border: 1px solid #ddd; padding: 10px;" name="resultTxt" v-model="formData.resultTxt"></textarea>
          </td>
        </tr>
      </NeedTable>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref, nextTick, watch, computed, onMounted, defineComponent } from 'vue';
import * as PublicCss from '@/assets/styles/public.js';
import * as ModalNeedCss from '@/assets/styles/need/ModalNeedCss.js';
import { calculateAge } from '@/utils/format.js';
import { saveClientNeedData, updateClientNeedData, findOneNeed } from '@/api/client.js';

export default defineComponent({
  name: 'ModalNeed',
  components: {
    ...PublicCss,
    ...ModalNeedCss,
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    clientData: {
      type: Object,
      default: () => ({})
    },
    needCurrentData: {
      type: Object,
      default: () => ({})
    },
    existingAssessment: {
      type: Object,
      default: null
    },
    cmd: {
      type: String,
      default: 'register' // register, update
    },
    needData: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['save', 'update:show'],
  setup(props, { emit }) {
    const modalContent = ref(null);
    // 반응형 데이터 정의
    const formData = ref({
      date: new Date().toISOString().split('T')[0],
      body: '',
      mental: '',
      haveProduct: '',
      wantProduct: '',
      resultTxt: ''
    });
  
    // 나이 계산
    const calculatedAge = computed(() => {
      return calculateAge(props.clientData.resident) || 0;
    });

    const getNeedData = async () => {
      const response = await findOneNeed(props.clientData.id, props.needCurrentData.id);
      formData.value = response.item;
      console.log("formData?", formData.value)
    };

    // 욕구사정기록 저장 처리
    const handleNeedSave = async (needFormData) => {
      try {
        // 저장 로직 구현
        await saveClientNeedData(props.clientData.id, needFormData);
        emit('update:show', false);
        emit('save', needFormData);
      } catch (error) {
        console.error('욕구사정기록 저장 오류:', error);
      }
    };

    // 욕구사정기록 수정 처리
    const handleNeedUpdate = async (needFormData) => {
      console.log("needFormData", needFormData, props.clientData.id, props.needCurrentData.id)
      try {
        await updateClientNeedData(props.clientData.id, props.needCurrentData.id, needFormData);
        emit('update:show', false);
        emit('save', needFormData);
      } catch (error) {
        console.error('욕구사정기록 수정 오류:', error);
      }
    };

    // AI 자동 작성 처리
    const generateAIContent = async () => {
      // 요금 안내
      Swal.showLoading();
      const clientInfo = props.clientData;
      const request = {
        userId: JSON.parse(localStorage.getItem('user')).id,
        userNm: JSON.parse(localStorage.getItem('user')).name,
        companyNm: JSON.parse(localStorage.getItem('user')).companyName,
        clientNm: clientInfo.name,
        rank: clientInfo.ranker,
        gender: clientInfo.gender,
        age: calculatedAge.value,
        birthDate: clientInfo.resident,
        memo: clientInfo.memo,
        consl: [],
        buyItems: ['목욕의자', '이동변기', '성인용보행기', '지팡이', '안전손잡이', '미끄럼방지매트'],
        rentalItems: [],
        buyableItems: ['간이변기 2개', '요실금팬티 4개', '안전손잡이 8개', '미끄럼방지양말 6개', '미끄럼방지매트 2개', '성인용보행기 1개', '경사로 6개'],
        rentalableItems: ['수동휠체어', '경사로(실외용)', '욕창예방 매트리스', '배회감지기'],
        buyunavailableItems: ['욕창예방매트리스', '욕창예방방석', '자세변환용구'],
        rentalbuyunavailableItems: ['전동침대', '욕창예방매트리스', '이동욕조', '수동침대', '목욕리프트'],
      }

      try {
        const response = await axios.post('http://localhost:3000/ai/need', {userData: request});
        console.log("response", response);
        Swal.hideLoading();

        // 제일 앞 부분에 스페이스바 제거
        response.data.bodyTxt = response.data.bodyTxt.replace(/^ /, '');
        response.data.mentalTxt = response.data.mentalTxt.replace(/^ /, '');
        response.data.totalTxt = response.data.totalTxt.replace(/^ /, '');

        // formData 업데이트
        formData.value.body = response.data.bodyTxt;
        formData.value.mental = response.data.mentalTxt;
        formData.value.resultTxt = response.data.totalTxt;
        
        // SweetAlert 모달 내의 textarea 직접 업데이트
        const popup = Swal.getPopup();
        if (popup) {
          // 신체상태 업데이트
          const bodyTextarea = popup.querySelector('textarea[name="body"]');
          if (bodyTextarea) {
            bodyTextarea.value = response.data.bodyTxt;
          }
          
          // 인지상태 업데이트
          const mentalTextarea = popup.querySelector('textarea[name="mental"]');
          if (mentalTextarea) {
            mentalTextarea.value = response.data.mentalTxt;
          }
          
          // 총평 업데이트
          const resultTxtTextarea = popup.querySelector('textarea[name="resultTxt"]');
          if (resultTxtTextarea) {
            resultTxtTextarea.value = response.data.totalTxt;
          }
        }
      } catch (error) {
        console.error('AI 자동 작성 오류:', error);
      }
    }

    // 최근 작성내역 불러오기 처리
    const loadRecentHistory = async () => {
      console.log("loadRecentHistory")
    }
    
    // SweetAlert로 욕구사정 기록지 폼 열기
    const openNeedAssessmentForm = async () => {
      await nextTick(); // DOM이 완전히 렌더링된 후 실행
      
      const { value: result } = await Swal.fire({
        title: '',  // 제목 제거 (템플릿에 포함되어 있음)
        html: modalContent.value.innerHTML,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: '작성',
        cancelButtonText: '취소',
        width: window.innerWidth < 768 ? "100%" : "45%",
        heightAuto: false,
        customClass: {
          container: 'swal-container',
          popup: 'swal-popup',
          content: 'swal-content',
          actions: 'swal-actions'
        },
        didOpen: () => {
          // SweetAlert2 모달이 열린 후 텍스트 영역에 데이터 직접 설정
          const popup = Swal.getPopup();
          console.log("formData.value", formData.value)
          if (popup) {
            const bodyTextarea = popup.querySelector('textarea[name="body"]');
            if (bodyTextarea) {
              bodyTextarea.value = formData.value.body;
              bodyTextarea.addEventListener('input', (e) => {
                formData.value.body = e.target.value;
              });
            } else {
              console.log('bodyTextarea 요소를 찾을 수 없음');
            }
            
            const mentalTextarea = popup.querySelector('textarea[name="mental"]');
            if (mentalTextarea) {
              mentalTextarea.value = formData.value.mental;
              mentalTextarea.addEventListener('input', (e) => {
                formData.value.mental = e.target.value;
              });
            }
            
            const haveProductTextarea = popup.querySelector('textarea[name="haveProduct"]');
            if (haveProductTextarea) {
              haveProductTextarea.value = formData.value.haveProduct;
              haveProductTextarea.addEventListener('input', (e) => {
                formData.value.haveProduct = e.target.value;
              });
            }
            
            const wantProductTextarea = popup.querySelector('textarea[name="wantProduct"]');
            if (wantProductTextarea) {
              wantProductTextarea.value = formData.value.wantProduct;
              wantProductTextarea.addEventListener('input', (e) => {
                formData.value.wantProduct = e.target.value;
              });
            }
            
            const resultTxtTextarea = popup.querySelector('textarea[name="resultTxt"]');
            if (resultTxtTextarea) {
              resultTxtTextarea.value = formData.value.resultTxt;
              resultTxtTextarea.addEventListener('input', (e) => {
                formData.value.resultTxt = e.target.value;
              });
            }
          } else {
            console.log('popup 요소를 찾을 수 없음');
          }
          
          // AI 자동작성 버튼에 이벤트 리스너 추가
          const aiButton = popup.querySelector('.ai-button');
          if (aiButton) {
            aiButton.addEventListener('click', generateAIContent);
          }
          
          // 최근 작성내역 버튼에 이벤트 리스너 추가
          const historyButton = popup.querySelector('.history-button');
          if (historyButton) {
            historyButton.addEventListener('click', loadRecentHistory);
          }
        },
        preConfirm: () => {
          // 폼 데이터 수집
          const swalContainer = Swal.getPopup();
          if (!swalContainer) return null;
          
          const formData = {
            clientId: props.clientData.id || '',
            name: props.clientData.name || '',
            number: props.clientData.number || '',
            date: swalContainer.querySelector('input[name="assessmentDate"]')?.value || new Date(),
            manager: props.needCurrentData?.manager || 'empty',
            cm: swalContainer.querySelector('input[name="height"]')?.value || '',
            kg: swalContainer.querySelector('input[name="weight"]')?.value || '',
            body: swalContainer.querySelector('textarea[name="body"]')?.value || '',
            mental: swalContainer.querySelector('textarea[name="mental"]')?.value || '',
            family: swalContainer.querySelector('input[name="caregiver"]:checked')?.value || '',
            familyTarget: swalContainer.querySelector('input[name="familyRelation"]')?.value || '',
            childrenCnt: swalContainer.querySelector('input[name="childrenCount"]')?.value || '',
            withlive: Array.from(swalContainer.querySelectorAll('input[name="withLive"]:checked')).map(cb => cb.value),
            haveProduct: swalContainer.querySelector('textarea[name="haveProduct"]')?.value || '',
            wantProduct: swalContainer.querySelector('textarea[name="wantProduct"]')?.value || '',
            resultTxt: swalContainer.querySelector('textarea[name="resultTxt"]')?.value || '',
            type: 0
          };
          
          return formData;
        }
      });

      // 모달 닫힘 이벤트 발생
      // emit('update:show', false);

      if (result) {
        try {
          if(props.cmd == 'update'){
            await handleNeedUpdate(result);
          }else{
            await handleNeedSave(result);
          }
          // 저장 성공 메시지
          Swal.fire({
            title: '저장 완료',
            text: '욕구사정 기록지가 저장되었습니다.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        } catch (error) {
          console.error('욕구사정 기록지 저장 오류:', error);
          await Swal.fire({
            title: '저장 실패',
            text: '욕구사정 기록지 저장 중 오류가 발생했습니다.',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false
          });
        }
      }else{
        emit('update:show', false);
      }
    };

    // show prop이 변경될 때 모달 표시/숨김 - 이 부분이 중요!
    watch(() => props.show, async (newValue) => {
      if (newValue) {
        if (props.cmd == 'update') {
          await getNeedData();
        }
        openNeedAssessmentForm();
      }
    }, { immediate: true }); // immediate: true로 초기 렌더링 시에도 실행


    onMounted(() => {
      // onMounted에서는 getNeedData를 호출하지 않고 watch에서 처리
    });

    return {
      formData,
      modalContent,
      openNeedAssessmentForm,
      calculatedAge,
      handleNeedSave,
      getNeedData,
      findOneNeed,
      generateAIContent,
      loadRecentHistory,
      ...PublicCss,
      ...ModalNeedCss,
    };
  }
});
</script>

<style scoped>
/* SweetAlert 커스텀 스타일 */



/* 모바일 반응형 스타일 */
@media (max-width: 768px) {
  .swal-popup {
    padding: 10px;
    overflow-y: auto;
  }

  .checkbox-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  
  .checkbox-container label {
    display: inline-block;
    margin-bottom: 5px;
    margin-right: 5px;
    font-size: 12px;
  }

  table {
    font-size: 12px;

    tr {
      display: block;
    }

    th, td {
      font-size: 12px;
      padding: 4px;
      word-break: break-word;
      display: block;
      width: 100%;
      box-sizing: border-box;
    }

    td[colspan] {
      width: 100%;
    }

    /* 제목 행은 그대로 유지 */
    tr:has(th[colspan="6"]) {
      display: table-row;
    }

    tr:has(th[colspan="6"]) th {
      display: table-cell;
    }
  }



  input[type="date"], 
  input[type="text"],
  input[name="height"],
  input[name="weight"] {
    width: 100%;
    font-size: 12px;
    padding: 3px;
  }
}
</style>