<template>
  <ModalPage v-model:show="showClientRegisteModal" :height="modal_height" :width="modal_width" :parent="'lookup'">
    <ModalClientRegiste :show="showClientRegisteModal" @update:show="showClientRegisteModal = $event"
      @cancel="showClientRegisteModal = false" @save="loadClientData" @close="showClientRegisteModal = false" :source="'button'" />
  </ModalPage> 
  <FlexTopDiv>
    <div>
      <RLTitle>
        <div class="material-icons">history</div> 
        <div>조회내역 자세히 보기</div>
        <div class="timeTitle">{{ new Date(selectedLookupItems.createdAt).toISOString().replace('T', ' ').substring(0, 19) }}</div>
      </RLTitle>
      <FlexDiv>
        <RDWhiteBtn class="marginBtn">재조회</RDWhiteBtn>
        <RDWhiteBtn class="marginBtn" @click="showClientRegisteModal = true">수급자등록</RDWhiteBtn>
      </FlexDiv>
    </div>
  </FlexTopDiv>

  <FlexTopDiv>
    <RLTable>
      <tr>
        <th>수급자성함</th>
        <td>{{ selectedLookupItems.name }}</td>
      </tr>
      <tr>
        <th>인정번호</th>
        <td>{{ selectedLookupItems.number }}</td>
      </tr>
      <tr>
        <th>생년월일</th>
        <td>{{ selectedLookupItems.resident }}</td>
      </tr>
      <tr>
        <th>등급</th>
        <td>{{ selectedLookupItems.ranker }}</td>
      </tr>
      <tr>
        <th>사용가능금액</th>
        <td>{{ selectedLookupItems.money }}원</td>
      </tr>
      <tr>
        <th>시설이용유무</th>
        <td>{{ selectedLookupItems.sisulState }}</td>
      </tr>
      <tr>
        <th>현재 유효기간</th>
        <td>{{ selectedLookupItems.rcgt }}</td>
      </tr>
      <tr>
        <th>현재 적용구간</th>
        <td>{{ selectedLookupItems.nextEdtApdtDt ? selectedLookupItems.nextEdtApdtDt.replace(/(\d{4})-(\d{2})-(\d{2})~(\d{4})-(\d{2})-(\d{2})/, '$1-$2-$3 ~ $4-$5-$6').replace('|', ' ') : '' }}</td>
      </tr>
      <tr>
        <th>조회일자</th>
        <td>{{ new Date(selectedLookupItems.createdAt).toISOString().replace('T', ' ').substring(0, 19) }}</td>
      </tr>
    </RLTable>

    <div>
      <RLAvailableTable>
        <thead>
          <tr>
            <th class="greenBg">구매 가능 품목</th>
            <th class="greenBg">대여 중인 품목</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div v-for="(item, index) in selectedLookupItems.clientLookupHistoryImpossibles" :key="'buy-'+index">
                {{ item.productCategory.name }} {{ item.cnt > 1 ? item.cnt + '개' : '' }}<br v-if="index < selectedLookupItems.clientLookupHistoryImpossibles.length - 1">
              </div>
            </td>
            <td>
              <div v-for="(item, index) in selectedLookupItems.clientLookupHistoryRents" :key="'rent-'+index">
                {{ item.productCategory.name }} {{ item.cnt > 1 ? item.cnt + '개' : '' }}<br v-if="index < selectedLookupItems.clientLookupHistoryRents.length - 1">
              </div>
              <div v-if="selectedLookupItems.clientLookupHistoryRents?.length === 0">대여 중인 품목 없음</div>
            </td>
          </tr>

          <tr>
            <th class="redBg">사용불가품목</th>
            <th class="redBg">대여불가품목</th>
          </tr>
          <tr>
            <td>
              <div v-for="(item, index) in selectedLookupItems.clientLookupHistoryBuyPossibles" :key="'impossible-'+index">
                {{ item.productCategory.name }}<br v-if="index < selectedLookupItems.clientLookupHistoryImpossibles.length - 1">
              </div>
              <div v-if="selectedLookupItems.clientLookupHistoryImpossibles?.length === 0">사용불가 품목 없음</div>
            </td>
            <td>
              <div v-for="(item, index) in selectedLookupItems.ClientLookupHistoryRentPossibles" :key="'rentImpossible-'+index">
                {{ item.productCategory.name }}<br v-if="index < selectedLookupItems.ClientLookupHistoryRentPossibles.length - 1">
              </div>
              <div v-if="!selectedLookupItems.ClientLookupHistoryRentPossibles || selectedLookupItems.ClientLookupHistoryRentPossibles.length === 0">대여불가 품목 없음</div>
            </td>
          </tr>
        </tbody>
      </RLAvailableTable>
    </div>

    <RLContractTContainer>
      <RLContractTable>
        <thead>
          <tr>
            <th colspan="2">품목별 적용구간 내 계약이력</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in selectedLookupItems?.clientLookupHistoryContractAlls" :key="'contract-'+index">
            <td>
              <div class="lineDiv">
                {{ item.productList.pitem }} | {{ item.productList.pname }} | {{ item.contractDate }} | {{ item.bcode }}
              </div>
            </td>
            <td>
              <RDWhiteBtn @click="productLookup(selectedLookupItems.name, selectedLookupItems.number, item.productList.pcode, item.bcode)">
                업체
                조회
              </RDWhiteBtn>
            </td>
          </tr>
          <tr v-if="!selectedLookupItems.clientLookupHistoryContractAlls || selectedLookupItems.clientLookupHistoryContractAlls.length === 0">
            <td colspan="2">계약 이력이 없습니다</td>
          </tr>
        </tbody>
      </RLContractTable>
    </RLContractTContainer>

  </FlexTopDiv>
</template>
<script>
import { ref, onMounted } from 'vue'
import * as PublicCss from '@/assets/styles/public'
import ModalPage from '@/components/modal/ModalPage.vue'
import ModalClientRegiste from '@/components/modal/client/ModalClientRegiste.vue'
import * as ModalReceontLookupCss from '@/assets/styles/lookup/ModalReceontLookupCss'
import { io } from 'socket.io-client'
import { useStore } from 'vuex'
import Swal from 'sweetalert2'
export default {
  name: 'ModalRecentLookup',
  components: {
    ...PublicCss,
    ...ModalReceontLookupCss,
    ModalPage,
    ModalClientRegiste,
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    source: {
      type: String,
      default: ''
    },
    selectedLookupItems: {
      type: Object,
      required: false
    }
  },
  emits: ['update:show', 'cancel'],
  setup(props) {
    console.log(props.selectedLookupItems, 'selectedLookupItems')
    const store = useStore();
    const user = store.state.user;
    const modal_height = ref('78%')
    const modal_width = ref('50%')
    const showClientRegisteModal = ref(false)
    let socket = null;
    const loadClientData = () => {
      // 클라이언트 데이터 로드 함수
    }

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
          if (data.name === "fail") {
            Swal.fire({
              icon: 'error',
              title: '업체조회실패',
              html: '오류발생가 발생하여 재시도 부탁드립니다',
              allowOutsideClick: false,
            }); 
          } else if (data.name === "errorsession") {
            Swal.fire({
              icon: 'warning',
              title: '조회 실패<br/>(공단로그인창접속대기시간초과)',
              html: `
              <div style="font-size:20px; font-weight:bold;">공단로그인창을 재실행 또는 새로고침해주세요.</div><br/>
              <div style="font-size:20px; font-weight:bold; color:#ff0000;">사업소별 최초 공단로그인창을 실행해야 이용 가능합니다.</div>
              `,
            });
          } else {
            Swal.fire({
              icon: 'success',
              title: '업체조회완료',
              html: '<div style="font-weight:bold">'+data.name+'('+data.number+')</div>'+
              '<div style="font-weight:bold">'+data.pcode+'-'+data.bcode+'</div>'+
              '<div style="font-weight:bold">업체명 : '+data.resultcompany+'</div>'+
              '<div style="font-weight:bold">등록일 : '+data.resultdate+'</div>'+
              '<div style="font-weight:bold">연락처 : '+data.resulttel+'</div>'+
              '<div style="font-weight:bold">구분 : '+data.type+'</div>',
              allowOutsideClick: false,
            });
          }
        });
      }
    };

    const productLookup = (name,number,pcode, bcode) => {
      console.log({ 
        'name': "su_rhkdtn",
        'cname': name, 
        'cnumber': number, 
        'company': user.companyName, 
        'date': new Date().toISOString().substr(0, 10).replace(/-| /g,''), 
        'pcode': pcode, 
        'bcode': bcode
      })
      // // 소켓 연결 시작
      socket_start('go_lookup_buy_product_res');
      
      // 기존 연결 해제
      socket.emit('disconnect2', { 'name': "su_rhkdtn" });
      
      // 로그인 및 제품 조회 요청
      socket.emit('login', { 'name': "su_rhkdtn" });
      socket.emit('go_lookup_buy_product_req', { 
        'name': "su_rhkdtn",
        'cname': name.replace(/ /g,''), 
        'cnumber': number.replace(/ /g,''), 
        'company': user.companyName, 
        'date': new Date().toISOString().substr(0, 10).replace(/-| /g,''), 
        'pcode': pcode.replace(/ /g,''), 
        'bcode': bcode.replace(/ /g,'')
      });
    }

    onMounted(() => {
    })
    
    return {
      modal_height,
      modal_width,
      showClientRegisteModal,
      loadClientData,
      productLookup
    }
  }
}
</script>