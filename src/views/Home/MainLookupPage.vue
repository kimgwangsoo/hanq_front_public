<template>
    <!-- Modals -->
  <ModalPage v-model:show="showClientRegisteModal" 
  :height="modal_height" :width="modal_width" :parent="'client'">
    <ModalClientRegiste :show="showClientRegisteModal" @update:show="showClientRegisteModal = $event"
      @cancel="showClientRegisteModal = false" source="button"/>
  </ModalPage>

  <!-- 화면출력하기 -->
  <ModalPage v-model:show="showPrintModal" 
  :height="modal_height" :width="'40%'" :parent="'client'">
    <ModalLookupPrint 
    :show="showPrintModal"
    :clientData="clientData"
    :lookupData="lookupData"
    :totalDates="totalDates"
    :statusItems="statusItems"
    @update:show="showPrintModal = $event"
    @cancel="showPrintModal = false"/>
  </ModalPage>

  <div>
    <Loader v-show="isLoading" />
    <MainLookupContainer>
      <MainTop>
        <MainTopLeft>
          <SearchSection>
            <div class="deskNone">사업소 수급자 검색</div>
            <!-- <GuideShow class="mobileNone" @click="showGuide">화면 학습 하기</GuideShow> -->
            <PrintBtn class="mobileNone" @click="printScreen">화면출력<span class="material-icons">print</span></PrintBtn>
            
            <QuickSearch class="mobileNone">
              수급자검색:<QuickSearchInput v-model="quickSearchName" placeholder="성함" />
              <QuickSearchBtn @click="quickSearchPopup"><span class="material-icons">search</span></QuickSearchBtn>
            </QuickSearch>
            
            <DateSection class="mobileNone">
              <DateInput>
                <input type="number" v-model="searchDate.year" placeholder="년도" />
              </DateInput>
              <DateInput>
                <input type="number" v-model="searchDate.month" placeholder="월" />
              </DateInput>
              <DateInput>
                <input type="number" v-model="searchDate.day" placeholder="일" />
              </DateInput>
            </DateSection>
            
            <InfoSection>
              <InfoInput>
                <div>
                  <input type="text" v-model="searchInfo.name" placeholder="성함" @keyup.enter="lookup" />
                </div>
                <div>
                  <input type="text" v-model="searchInfo.number" placeholder="인정번호" @keyup.enter="lookup" />
                </div>
              </InfoInput>
              <InfoButton>
                <InfoBtn @click="lookup">
                  <Button>조회하기</Button>
                </InfoBtn>
                <InfoBtn2 v-show="isLoading">
                  <Button>조회중</Button>
                </InfoBtn2>
              </InfoButton>
            </InfoSection>
            
            <ToolSection>
              <ToolButton>
                <ToolBrowser class="mobileNone" @click="chromeRun">
                  <Button><img src="@/assets/img/bg_aside.png" />공단로그인창</Button>
                </ToolBrowser>
                <ToolClientUp @click="showClientRegisteModal = true">
                  <Button>수급자등록/주문하기</Button>
                </ToolClientUp>
              </ToolButton>
            </ToolSection>
          </SearchSection>
          
          <InfoPanel>
            <InfoBox><LookupTitle>생년월일</LookupTitle><LookupBox class="regident">{{ lookupData.regident }}</LookupBox></InfoBox>
            <InfoBox><LookupTitle>성별</LookupTitle><LookupBox class="gender">{{ lookupData.gender }}</LookupBox></InfoBox>
            <InfoBox><LookupTitle>인정등급</LookupTitle><LookupBox class="ranker">{{ lookupData.ranker }}</LookupBox></InfoBox>
            <InfoBox><LookupTitle>대상</LookupTitle><LookupBox class="target">{{ lookupData.reduce_nm }}</LookupBox></InfoBox>
            <InfoBox><LookupTitle>본인부담율</LookupTitle><LookupBox class="sale">{{ lookupData.reduce_sale }}</LookupBox></InfoBox>
            <InfoBox><LookupTitle>사용가능금액</LookupTitle><LookupBox class="money">{{ lookupData.money }}</LookupBox></InfoBox>
            <InfoBox><LookupTitle>특이사항</LookupTitle><LookupBox class="sisul" :style="{ color: lookupData.sisulColor }">{{ lookupData.sisul }}</LookupBox></InfoBox>
            <InfoBox><LookupTitle>현재유효기간</LookupTitle><LookupBox class="rcgt" v-html="lookupData.rcgt"></LookupBox></InfoBox>
          </InfoPanel>
        </MainTopLeft>
        <StatusSection>
          <StatusLeftColumn>
            <div>
              <StatusTitle class="green">
                구매가능품목 
                <span v-if="buyItems" class="deskNone" @click="buyItems = !buyItems">&nbsp;&nbsp; ▲</span>
                <span v-else class="deskNone" @click="buyItems = !buyItems">&nbsp;&nbsp; ▼</span>
              </StatusTitle>
              <StatusBoxBuy v-if="buyItems">
                <div v-for="(item, index) in statusItems.statusBoxBuy" :key="`buy-${index}`" class="status_item">
                  {{ item }}
                </div>
              </StatusBoxBuy>
            </div>
            <div>
              <StatusTitle class="green">
                대여중인품목
                <span v-if="rentItems" class="deskNone" @click="rentItems = !rentItems">&nbsp;&nbsp; ▲</span>
                <span v-else class="deskNone" @click="rentItems = !rentItems">&nbsp;&nbsp; ▼</span>
              </StatusTitle>
              <StatusBoxRent v-if="rentItems">
                <div v-for="(item, index) in statusItems.statusBoxRent" :key="`rent-${index}`" class="status_item">
                  {{ item }}
                </div>
              </StatusBoxRent>
            </div>
          </StatusLeftColumn>
          
          <StatusRightColumn>
            <div>
              <StatusTitle>
                사용불가품목
                <span v-if="buyNotItems" class="deskNone" @click="buyNotItems = !buyNotItems">&nbsp;&nbsp; ▲</span>
                <span v-else class="deskNone" @click="buyNotItems = !buyNotItems">&nbsp;&nbsp; ▼</span>
              </StatusTitle>
              <StatusBoxBuyNot v-if="buyNotItems">
                <div v-for="(item, index) in statusItems.statusBoxBuyNot" :key="`buy-not-${index}`" class="status_item">
                  {{ item }}
                </div>
              </StatusBoxBuyNot>
            </div>
            <div>
              <StatusTitle>
                대여불가품목
                <span v-if="rentNotItems" class="deskNone" @click="rentNotItems = !rentNotItems">&nbsp;&nbsp; ▲</span>
                <span v-else class="deskNone" @click="rentNotItems = !rentNotItems">&nbsp;&nbsp; ▼</span>
              </StatusTitle>
              <StatusBoxRentNot v-if="rentNotItems">
                <div v-for="(item, index) in statusItems.statusBoxRentNot" :key="`rent-not-${index}`" class="status_item">
                  {{ item }}
                </div>
              </StatusBoxRentNot>
            </div>
          </StatusRightColumn>
        </StatusSection>
        
      </MainTop>
      
      <MainBottom>
        <FlexColumnStart class="mobileNone">
          <!-- 버튼 영역 추가 -->
          <ButtonRow>
            <button 
              @click="showSection = 'product'" 
              style="background: #1a2136; color: white; padding: 8px 15px; border: none; border-radius: 5px; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2); margin-right: 10px;"
              :style="{ background: showSection === 'product' ? '#3a4156' : '#1a2136' }"
            >
              조회 품목 정보 보기
            </button>
            <button 
              v-if="clientData.id"
              @click="showSection = 'client'" 
              style="background: #1a2136; color: white; padding: 8px 15px; border: none; border-radius: 5px; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2);"
              :style="{ background: showSection === 'client' ? '#3a4156' : '#1a2136' }"
            >
              수급자 정보 보기
            </button>
          </ButtonRow>
          <div v-if="showSection === 'client'" style="width:100%; overflow-y: auto; ">
            <ClientInfoSection @register-payment="showPaymentModal = true" parent="mainlookup" :clientData="clientData"/>
          </div>
          <ProductSection v-if="showSection === 'product'">
            <FlexCenter>
              <div v-for="(product, index) in productGroups[0]" :key="`product1-${index}`">
                <ProductInfo>
                  <div>{{ product.name }}</div>
                  <FlexCenter>구매수량:&nbsp;&nbsp;<ProductCount>{{ product.count }}</ProductCount>개</FlexCenter>
                </ProductInfo>
                <ProductBox>
                  <div v-for="(item, itemIndex) in productItems[product.index]" :key="`item-${product.index}-${itemIndex}`" class="product_item">
                    {{ item }}
                  </div>
                </ProductBox>
              </div>
            </FlexCenter>
            
            <FlexCenter>
              <div v-for="(product, index) in productGroups[1]" :key="`product2-${index}`">
                <ProductInfo>
                  <div>{{ product.name }}</div>
                  <FlexCenter>구매수량:&nbsp;&nbsp;<ProductCount>{{ product.count }}</ProductCount>개</FlexCenter>
                </ProductInfo>
                <ProductBox>
                  <div v-for="(item, itemIndex) in productItems[product.index]" :key="`item-${product.index}-${itemIndex}`" class="product_item">
                    {{ item }}
                  </div>
                </ProductBox>
              </div>
            </FlexCenter>
            
            <FlexCenter>
              <div v-for="(product, index) in productGroups[2]" :key="`product3-${index}`">
                <ProductInfo>
                  <div>{{ product.name }}</div>
                  <FlexCenter>구매수량:&nbsp;&nbsp;<ProductCount>{{ product.count }}</ProductCount>개</FlexCenter>
                </ProductInfo>
                <ProductBox>
                  <div v-for="(item, itemIndex) in productItems[product.index]" :key="`item-${product.index}-${itemIndex}`" class="product_item">
                    {{ item }}
                  </div>
                </ProductBox>
              </div>
            </FlexCenter>
            
            <FlexCenter>
              <div v-for="(product, index) in productGroups[3]" :key="`product4-${index}`">
                <ProductInfo>
                  <div>{{ product.name }}</div>
                  <FlexCenter>구매수량:&nbsp;&nbsp;<ProductCount>{{ product.count }}</ProductCount>개</FlexCenter>
                </ProductInfo>
                <ProductBox>
                  <div v-for="(item, itemIndex) in productItems[product.index]" :key="`item-${product.index}-${itemIndex}`" class="product_item">
                    {{ item }}
                  </div>
                </ProductBox>
              </div>
            </FlexCenter>
          </ProductSection>
        </FlexColumnStart>
        
        <HistorySection v-if="showSection != 'client'" class="mobileNone">
          <HistoryRow>
            <div v-for="(date, index) in totalDates.slice(0, 4)" :key="`date1-${index}`">
              <TotalDate :active="date.active">{{ date.text }}</TotalDate>
              <TotalBox>
                <div v-for="(item, itemIndex) in totalBoxItems[index]" :key="`total-item-${index}-${itemIndex}`" class="total_item">
                  {{ item }}
                </div>
              </TotalBox>
            </div>
          </HistoryRow>
          
          <HistoryRow>
            <div v-for="(date, index) in totalDates.slice(4, 8)" :key="`date2-${index}`">
              <TotalDate :active="date.active">{{ date.text }}</TotalDate>
              <TotalBox>
                <div v-for="(item, itemIndex) in totalBoxItems[index + 4]" :key="`total-item-${index + 4}-${itemIndex}`" class="total_item">
                  {{ item }}
                </div>
              </TotalBox>
            </div>
          </HistoryRow>
        </HistorySection>
      </MainBottom>
    </MainLookupContainer>
    
    <!-- 팝업 및 가이드 -->
    <Popup ref="popup" data-popup="popup-1">
      <PopupInner>0000
        <ClientupIframe name="clientup" id="clientup" :src="clientupSrc"></ClientupIframe>
        <PopupClose href="#" @click="closePopup">x</PopupClose>
      </PopupInner>
    </Popup>
    
    <Guide ref="guide" data-guide="guide-1">
      <GuideInner>
        <GuideClose href="#" @click="closeGuide">x</GuideClose>
      </GuideInner>
    </Guide>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted, onUnmounted, getCurrentInstance } from 'vue';
import Swal from 'sweetalert2';
import * as styled from '@/assets/styles/mainLookUp/MainLookupPageCss';
import io from 'socket.io-client';
import ModalClientRegiste from '@/components/modal/client/ModalClientRegiste.vue';
import ModalPage from '@/components/modal/ModalPage.vue';
import ModalLookupPrint from '@/components/modal/mainlookup/ModalLookupPrint.vue';
import ClientInfoSection from '@/components/ClientInfoSection.vue';
import { getClientByNumber } from '@/api/client';
import { getCompanyCertificatePw } from '@/api/company';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'MainLookupPage',
  components: {
    ...styled,
    ModalClientRegiste,
    ModalPage,
    ModalLookupPrint,
    ClientInfoSection
  },
  setup() {
    const instance = getCurrentInstance();
    const root = instance?.appContext.config.globalProperties;
    const store = useStore();
    const user = store.state.user;
    // 모바일이면 기본 false, 데스크탑이면 기본 true
    // 조회 후 일괄 true로 변경 필요
    const buyItems = ref(window.innerWidth <= 768 ? false : true);
    const rentItems = ref(window.innerWidth <= 768 ? false : true);
    const buyNotItems = ref(window.innerWidth <= 768 ? false : true);
    const rentNotItems = ref(window.innerWidth <= 768 ? false : true);
    const showSection = ref('product');
    const showClientRegisteModal = ref(false)
    const showPrintModal = ref(false)
    const modal_height = ref('78%')
    const modal_width = ref('50%')

    // 로딩 상태
    const isLoading = ref(false);
    
    // 소켓 객체
    let socket = null;
    
    // 사용자 정보 (실제 애플리케이션에서는 저장소나 세션에서 가져와야 함)
    // const userInfo = reactive({
    //   uid: localStorage.getItem('uid') || 'default_uid',
    //   company: localStorage.getItem('company') || 'default_company'
    // });
    
    // 검색 및 입력 데이터
    const quickSearchName = ref('');
    const searchDate = reactive({
      year: new Date().getFullYear(),
      month: String(new Date().getMonth() + 1).padStart(2, '0'),
      day: String(new Date().getDate()).padStart(2, '0')
    });
    const searchInfo = reactive({
      name: '',
      number: ''
    });
    
    // iframe 소스
    const clientupSrc = ref('');
    
    // DOM 요소 참조
    const popup = ref(null);
    const guide = ref(null);
    
    // 제품 아이템 데이터 저장
    const productItems = reactive(Array(12).fill().map(() => []));
    
    // 상태 박스 아이템 데이터 저장
    const statusItems = reactive({
      statusBoxBuy: [],
      statusBoxBuyNot: [],
      statusBoxRent: [],
      statusBoxRentNot: []
    });
    
    // 전체 박스 아이템 데이터 저장
    const totalBoxItems = reactive(Array(8).fill().map(() => []));
    
    // 조회 결과 데이터
    const lookupData = reactive({
      regident: '',
      gender: '',
      ranker: '',
      reduce_nm: '',
      reduce_sale: '',
      money: '',
      sisul: '',
      sisulColor: '#000',
      rcgt: ''
    });
    // 수급자 데이터
    const clientData = reactive({
      id: 1,
      number: '',
      name: '',
      resident: '',
    });
    
    // 제품 그룹 데이터
    const productGroups = reactive([
      [
        { name: '이동변기(5년,1개)', count: 0, index: 0 },
        { name: '목욕의자(5년,1개)', count: 0, index: 1 },
        { name: '성인용보행기(5년,2개)', count: 0, index: 2 }
      ],
      [
        { name: '욕창예방방석(3년,1개)', count: 0, index: 3 },
        { name: '욕창예방매트리스(3년,1개)', count: 0, index: 4 },
        { name: '지팡이(2년,1개)', count: 0, index: 5 }
      ],
      [
        { name: '자세변환용구(1년,5개)', count: 0, index: 6 },
        { name: '간이변기(1년,2개)', count: 0, index: 7 },
        { name: '안전손잡이(1년,10개)', count: 0, index: 8 }
      ],
      [
        { name: '요실금팬티(1년,4개)', count: 0, index: 9 },
        { name: '미끄럼방지양말(1년,6개)', count: 0, index: 10 },
        { name: '미끄럼방지매트(1년,5개)', count: 0, index: 11 }
      ]
    ]);
    
    // 날짜 데이터
    const totalDates = reactive([
      { text: '', active: false },
      { text: '', active: false },
      { text: '', active: false },
      { text: '', active: false },
      { text: '', active: false },
      { text: '', active: false },
      { text: '', active: false },
      { text: '', active: false }
    ]);

    
    // 숫자 형식 변환 함수 (10 미만이면 앞에 0 추가)
    const numberFormatZero = (x) => {
      const num = parseInt(x);
      return num < 10 ? '0' + num : String(num);
    };
    
    // 컴포넌트 마운트 시 초기화
    onMounted(() => {
      // 날짜 데이터 초기화
      const now = new Date();
      searchDate.year = now.getFullYear();
      searchDate.month = String(now.getMonth() + 1).padStart(2, '0');
      searchDate.day = String(now.getDate()).padStart(2, '0');
      
      // 제품 그룹 초기화
      initProductGroups();
      
      // 날짜 데이터 초기화
      initTotalDates();
    });
    
    // 기능 함수들
    
    // 가이드 표시
    const showGuide = () => {
      Swal.fire({
        width: "75%",
        icon: 'info',
        title: '화면 학습 영상 선택',
        html: `<div class="guide_swal">
                <div class="guide_swal_button guide_on" onclick="guide_on_chrome(this,'MainLookup_video1')">1.공단로그인</div>
                <div class="guide_swal_button" onclick="guide_on_lookup(this,'MainLookup_video2')">2.조회하기</div>
                <div class="guide_swal_button" onclick="guide_on_client_up(this,'MainLookup_video3')">3.수급자등록/주문하기</div>
              </div>
              <br/>
              <div class="video_area">
               
              </div>`,
        showConfirmButton: false
      });
    };
    
    // 화면 출력
    const printScreen = () => {
      showPrintModal.value = true;
    };
    
    // 수급자 검색 팝업
    const quickSearchPopup = () => {
      if (quickSearchName.value !== '') {
        Swal.showLoading();
        // 여기에 axios 요청 구현
      }
    };
    // 조회 기능
    const lookup = () => {
      window.electron.send('lookup', "김동완", "L2408000226", 4, "19340908", "20240823", "20250904");
      

      const nameVal = searchInfo.name;
      const numVal = searchInfo.number;
      const dateVal = searchDate.year + numberFormatZero(searchDate.month) + numberFormatZero(searchDate.day);
      
      if (nameVal !== "" && numVal !== "" && dateVal !== "") {
        isLoading.value = true;
        // window.electron.send('lookup', nameVal, numVal, 4, "19340908", "20240823", "20250904");
        // 소켓 연결 및 조회 요청 구현
        socket_start('go_lookup_res');
        
        // 기존 소켓 연결 해제 후 재연결
        socket.emit('disconnect2', { 'name': user.name });
        socket.emit('login', { 'name': user.name });
        
        // 조회 요청 전송
        socket.emit('go_lookup_req', { 
          'name': user.name,
          'cname': nameVal.trim(), 
          'cnumber': numVal.replace(/ /g,''), 
          'company': user.companyName,
          'date': dateVal,
          'companyId': user.companyId,
          'userId': user.id
        });
        console.log(user.companyId, user.id, "companyId, userId");
        clientData.id = null;
        showSection.value = 'product';
        // 조회 시작 상태 설정
        lookup_set_start();
      } else {
        Swal.fire({
          icon: 'error',
          title: '조회 실패',
          text: '조회 조건을 모두 입력해주세요',
        });
      }
    };
    
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
            isLoading.value = false;
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
          
          // 크롬 자동화 응답 이벤트 리스너
          socket.on('chrome_run_response', (response) => {
            console.log('크롬 자동화 응답 수신:', response);
            
            if (response.success) {
              Swal.fire({
                icon: 'success',
                title: '실행 성공',
                text: '공단 로그인창이 실행되었습니다.',
                timer: 2000,
                showConfirmButton: false
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: '실행 실패',
                text: `오류: ${response.error || '알 수 없는 오류가 발생했습니다.'}`,
                confirmButtonText: '확인'
              });
            }
          });
        } catch (error) {
          console.error('소켓 초기화 오류:', error);
          isLoading.value = false;
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
        socket.on(eventName, async (data) => {
          console.log('소켓 응답 수신:', data);
          isLoading.value = false;
          
          // 조회 결과 처리
          if (data.name === "death") {
            Swal.fire('자격상실수급자');
          } else if (data.name === "errorsession") {
            Swal.fire({
              icon: 'warning',
              title: '공단로그인창을 실행해주세요'
            });
          } else if (data.name === "error") {
            if(data.retryerror!=''){
                const response = await root.$common.fetchLookupOneMongoDB(searchInfo.name, searchInfo.number)
                console.log(response,"response");
                let resident = '';
                let rcgt = '';
                let ranker = '';
                if(response && response.success && response.items && response.items.length > 0){
                    resident = response.items[0].resident ? response.items[0].resident.replace(/-/g,'') : '';
                    rcgt = response.items[0].rcgt ? response.items[0].rcgt.split(' ')[0].replace(/-/g,'') : '';
                    ranker = response.items[0].ranker ? response.items[0].ranker.replace(/\D/g, '') : '';
                }
                
                // 현재 날짜 가져오기
                const now = new Date();
                const year = now.getFullYear().toString();
                const month = (now.getMonth() + 1).toString().padStart(2, '0');
                const day = now.getDate().toString().padStart(2, '0');
                
                Swal.fire({
                    icon: 'warning',
                    width: '500px',
                    title: '조회 실패(직접입력요청)',
                    html: `
                    <div style="font-size:20px; font-weight:bold; display:flex; flex-direction:column; gap:10px; align-items:center;">
                        <div class="retry_col"><span>생년월일:</span><input type="text" style="border-radius:5px; width:100px; height:30px;" value="${resident}" class="retry_resident" oninput="this.value = this.value.replace(/[^0-9]/g, '')" placeholder="19000101"></div>
                        <div class="retry_col"><span>유효기간시작일:</span><input type="text" style="border-radius:5px; width:100px; height:30px;" value="${rcgt}" class="retry_rcgt" oninput="this.value = this.value.replace(/[^0-9]/g, '')" minlength="8" placeholder="20250101"></div>
                        <div class="retry_col"><span>등급:</span><select style="border-radius:5px; width:100px; height:30px;" class="retry_ranker">
                            <option value="">선택</option>
                            <option value="6">인지지원등급</option>
                            <option value="5">5등급</option>
                            <option value="4">4등급</option>
                            <option value="3">3등급</option>
                            <option value="2">2등급</option>
                            <option value="1">1등급</option>
                        </select></div>
                        <div class="retry_col" style="display:flex; align-items:center;"><span>조회일자:</span><span>
                            <input type="text" class="retry_date" value="${year}" style="width:50px;">년 
                            <input type="text" class="retry_date" value="${month}" style="width:45px;">월 
                            <input type="text" class="retry_date" value="${day}" style="width:45px;">일</span>
                        </div>
                    </div>`,
                    showCancelButton: true,
                    confirmButtonText: "재조회",
                    cancelButtonText: "취소",
                    didOpen: () => {
                        // 등급 선택 값 설정
                        if (ranker) {
                            document.querySelector('.retry_ranker').value = ranker;
                        }
                        
                        // 숫자 입력 필드에 이벤트 리스너 추가
                        document.querySelectorAll('.retry_date').forEach((el, index) => {
                            if (index > 0) { // 월, 일 필드에만 적용
                                el.addEventListener('change', (e) => {
                                    // 한 자리 숫자인 경우 앞에 0 추가
                                    if (e.target.value.length === 1) {
                                        e.target.value = '0' + e.target.value;
                                    }
                                });
                            }
                        });
                    },
                    preConfirm: () => {
                        console.log('preConfirm');
                        const retry_resident = document.querySelector('.retry_resident').value;
                        const rcgtval = document.querySelector('.retry_rcgt').value;
                        
                        if (rcgtval.length < 8) {
                            Swal.showValidationMessage('유효기간시작일을 8자리로 입력해주세요.');
                            return false;
                        } else if (retry_resident.length < 8) {
                            Swal.showValidationMessage('생년월일을 8자리로 입력해주세요.');
                            return false;
                        }
                        return true;
                    }
                }).then(result => {
                    if (result.isConfirmed) {
                        const nameval = searchInfo.name;
                        const numval = searchInfo.number;
                        const dateInputs = document.querySelectorAll('.retry_date');
                        const date = dateInputs[0].value + dateInputs[1].value + dateInputs[2].value;
                        const resident = document.querySelector('.retry_resident').value;
                        const ranker = document.querySelector('.retry_ranker').value;
                        const rcgt = document.querySelector('.retry_rcgt').value;
                        
                        socket_start('go_lookup_res');
                        socket.emit('disconnect2', {'name': user.name});
                        socket.emit('login', {'name': user.name});
                        socket.emit('go_lookup_req', { 
                            'name': user.name, 
                            'cname': nameval, 
                            'cnumber': numval.replace(/ /g,''), 
                            'company': user.companyName, 
                            'date': date, 
                            'regident': resident, 
                            'ranker': ranker,
                            'rcgt': rcgt,
                            'retry': 'y',
                            'companyId': user.companyId,
                            'userId': user.id
                        });
                        
                        console.log({ 
                            'name': user.name, 
                            'cname': nameval, 
                            'cnumber': numval.replace(/ /g,''), 
                            'company': user.companyName, 
                            'date': date, 
                            'regident': resident, 
                            'ranker': ranker,
                            'rcgt': rcgt,
                            'retry': 'y',
                            'companyId': user.companyId,
                            'userId': user.id
                        });
                        
                        lookup_set_start();
                    }
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: '조회 실패',
                    text: '장기요양수급자가 아닙니다',
                });
            }
          } else {
            // 조회 성공 시 데이터 처리
            checkClient();
            updateLookupData(data);
          }
        });
      }
    };

    // 조회한 수급자가 기존에 등록되어있는지 확인
    const checkClient = async () => {

      const response = await getClientByNumber(searchInfo.number);
      if (response.success) {
        console.log("response", response)
        clientData.id = response.item.id;
        clientData.name = response.item.name;
        clientData.number = response.item.number;
        clientData.resident = response.item.resident;
        clientData.address = response.item.address;
        clientData.phone1 = response.item.phone1;
        clientData.centerName = response.item.centerName;
        clientData.manager = response.item.manager;
        clientData.memo = response.item.memo;
      }
    };

    // 조회 데이터 업데이트 함수
    const updateLookupData = (data) => {
      // 수신된 데이터를 기반으로 lookupData 업데이트
      if (data) {
        lookupData.regident = data.regident || '';
        lookupData.gender = data.gender || '';
        lookupData.ranker = data.ranker || '';
        lookupData.reduce_nm = data.reduce_nm || '';
        lookupData.reduce_sale = data.reduce_sale || '';
        lookupData.money = data.money ? (parseInt(data.money).toLocaleString() + '원') : '';
        lookupData.sisul = data.sisul || '시설입소안함';
        lookupData.sisulColor = data.sisul === '시설입소' || data.sisul === '휠체어보장구' ? '#ff0000' : '#000';
        lookupData.rcgt = data.rcgt ? data.rcgt.split('~')[0] + '~<br/>' + data.rcgt.split('~')[1] : '';
        
        // 제품 정보 업데이트
        if (data.uproduct) {
          statusBoxSet(data.uproduct, 'statusBoxBuy');
        }
        if (data.buy_product_not_array) {
          statusBoxSet(data.buy_product_not_array, 'statusBoxBuyNot');
        }
        if (data.rproduct) {
          statusBoxSet(data.rproduct, 'statusBoxRent');
        }
        if (data.rent_product_not_array) {
          statusBoxSet(data.rent_product_not_array, 'statusBoxRentNot');
        }
        
        // 날짜 및 제품 데이터 업데이트
        if (data.apdt_fr_dt_arr && data.apdt_to_dt_arr && data.use_amt_arr) {
          totalDateSet(data.apdt_fr_dt_arr, data.apdt_to_dt_arr, data.use_amt_arr);
        }
        
        if (data.all_product_array2) {
          totalBoxSet(data.all_product_array2);
          productBoxSet(data.all_product_array2);
        }
      }
      Swal.close();
    };
    
    // 날짜 형식 변환 함수 (YYYYMMDD -> YYYY-MM-DD)
    const dateFormat = (date) => {
      const year = date.substring(0, 4);
      const month = date.substring(4, 6);
      const day = date.substring(6, 8);
      return year + "-" + month + "-" + day;
    };
    
    // 날짜 비교 함수 (전체 구매이력 체크)
    const compareDate = (date1, date2) => {
      const date1Arr = date1.split('-');
      const date2Arr = date2.split('-');
      const date1Num = parseInt(date1Arr[0] + date1Arr[1] + date1Arr[2]);
      const date2Num = parseInt(date2Arr[0] + date2Arr[1] + date2Arr[2]);
      
      return date1Num >= date2Num ? 1 : -1;
    };
    
    // 날짜 비교 함수 (현재 유효기간 체크)
    const compareDate2 = (date1, date2) => {
      const date1Arr = date1.split('-');
      const date2Arr = date2.split('-');
      const date1Num = parseInt(date1Arr[0] + date1Arr[1] + date1Arr[2]);
      const date2Num = parseInt(date2Arr[0] + date2Arr[1] + date2Arr[2]);
      
      return date1Num > date2Num ? 1 : -1;
    };
    
    // 현재 날짜가 유효기간 내에 있는지 확인하는 함수
    const totalDateNow = (startDate, endDate) => {
      const lookUpDate = searchDate.year + '-' + numberFormatZero(searchDate.month) + '-' + numberFormatZero(searchDate.day);
      
      if (compareDate(lookUpDate, startDate) === 1 && compareDate2(lookUpDate, endDate) === -1) {
        return startDate + "~" + endDate;
      }
      return null;
    };
    
    // 현재 유효기간 저장 변수
    const currentValidPeriod = ref('');
    
    // 날짜 데이터 설정 함수
    const totalDateSet = (startDates, endDates) => {
      // 인쇄용 날짜 배열 초기화
      const printDateArr = [];
      
      for (let i = 0; i < startDates.length && i < totalDates.length; i++) {
        // 날짜 형식 변환 및 텍스트 설정
        const formattedStartDate = dateFormat(startDates[i].replace(/[']|\//g, ''));
        const formattedEndDate = dateFormat(endDates[i].replace(/[']|\//g, ''));
        const dateText = formattedStartDate + " ~ " + formattedEndDate;
        
        // 인쇄용 날짜 배열에 추가
        printDateArr.push(dateText);
        
        // totalDates 배열 업데이트
        totalDates[i].text = dateText;
        
        // 현재 유효기간인지 확인
        const isCurrentPeriod = totalDateNow(formattedStartDate, formattedEndDate);
        
        if (isCurrentPeriod) {
          // 현재 유효기간 저장
          currentValidPeriod.value = dateText;
          // 활성화 상태로 설정
          totalDates[i].active = true;
        } else {
          // 비활성화 상태로 설정
          totalDates[i].active = false;
        }
      }
    };
    
    // 상태 박스 설정 함수
    const statusBoxSet = (arr, targetRef) => {
      if (!arr) return;
      
      // 상태 아이템 배열 초기화
      statusItems[targetRef] = [];
      
      // 데이터가 없는 경우 '없음' 표시
      if (arr.length === 0) {
        statusItems[targetRef].push('없음');
        return;
      }
      
      // 데이터 추가
      arr.forEach(item => {
        statusItems[targetRef].push(item.replace(/['"]/g, ''));
      });
    };
    
    // 제품 박스 설정 함수
    const productBoxSet = (arr) => {
      if (!arr || !currentValidPeriod.value) return;
      
      // 현재 유효기간 분리
      const periodParts = currentValidPeriod.value.split('~');
      const startDate = periodParts[0].trim();
      const endDate = periodParts[1].trim();
      
      // 제품 그룹 초기화
      productGroups.forEach(group => {
        group.forEach(product => {
          product.count = 0;
        });
      });
      
      // 제품 아이템 배열 초기화
      for (let i = 0; i < productItems.length; i++) {
        productItems[i] = [];
      }
      
      // 제품 데이터 처리
      arr.forEach(item => {
        const name1 = item[0].replace(/[')(]/g, '').split('/')[0];
        const name2 = item[0].replace(/[')(]/g, '').split('/')[1];
        const date = item[1].replace(/[']/g, '');
        // const status = item[2].replace(/[']/g, '');
        // const pcode = item[3].replace(/[']/g, '');
        const bcode = item[4].replace(/[']/g, '');
        const type = item[6].replace(/[')(]/g, '');
        const money = item[7].replace(/[')(]/g, '');
        
        // 제품 유형에 따라 처리
        let productIndex = -1;
        let needDateCheck = false;
        
        if (name1.includes('이동변기')) {
          productIndex = 0;
        } else if (name1.includes('목욕의자')) {
          productIndex = 1;
        } else if (name1.includes('성인용보행기')) {
          productIndex = 2;
        } else if (name1.includes('욕창예방방석')) {
          productIndex = 3;
        } else if (name1.includes('욕창예방 매트리스')) {
          productIndex = 4;
        } else if (name1.includes('지팡이')) {
          productIndex = 5;
        } else if (name1.includes('자세변환용구')) {
          productIndex = 6;
          needDateCheck = true;
        } else if (name1.includes('간이변기')) {
          productIndex = 7;
          needDateCheck = true;
        } else if (name1.includes('안전손잡이')) {
          productIndex = 8;
          needDateCheck = true;
        } else if (name1.includes('요실금팬티')) {
          productIndex = 9;
          needDateCheck = true;
        } else if (name1.includes('미끄럼 방지용품')) {
          needDateCheck = true;
          if (parseInt(money) < 10000) {
            productIndex = 10; // 미끄럼방지양말
          } else {
            productIndex = 11; // 미끄럼방지매트
          }
        }
        
        // 제품 박스에 추가
        if (productIndex >= 0) {
          // 날짜 체크가 필요한 경우
          if (needDateCheck) {
            if (compareDate(date, startDate) === 1 && compareDate(date, endDate) === -1) {
              addProductToBox(productIndex, date, name2, bcode, type);
            }
          } else {
            addProductToBox(productIndex, date, name2, bcode, type);
          }
        }
      });
    };
    
    // 제품 박스에 아이템 추가 함수
    const addProductToBox = (productIndex, date, name, bcode, type) => {
      // 제품 그룹과 인덱스 찾기
      let groupIndex = Math.floor(productIndex / 3);
      let indexInGroup = productIndex % 3;
      
      // 제품 카운트 증가
      productGroups[groupIndex][indexInGroup].count++;
      
      // 제품 아이템 추가
      productItems[productIndex].push(`${date} ${name} [${bcode}] ${type}`);
    };
    
    // 전체 박스 설정 함수
    const totalBoxSet = (arr) => {
      if (!arr) return;
      
      // 전체 박스 초기화
      for (let i = 0; i < totalBoxItems.length; i++) {
        totalBoxItems[i] = [];
      }
      
      // 데이터 처리
      arr.forEach(item => {
        // const name1 = item[0].replace(/[')(]/g, '').split('/')[0];
        const name2 = item[0].replace(/[')(]/g, '').split('/')[1];
        const date = item[1].replace(/[']/g, '');
        // const status = item[2].replace(/[']/g, '');
        // const pcode = item[3].replace(/[']/g, '');
        const bcode = item[4].replace(/[']/g, '');
        const type = item[6].replace(/[')(]/g, '');
        // const money = item[7].replace(/[')(]/g, '');
        
        // 각 날짜 구간에 대해 체크
        for (let i = 0; i < totalDates.length; i++) {
          if (!totalDates[i].text) continue;
          
          const dateParts = totalDates[i].text.split('~');
          const startDate = dateParts[0].trim();
          const endDate = dateParts[1].trim();
          
          // 날짜가 해당 구간에 포함되는지 확인
          if (compareDate(date, startDate) === 1 && compareDate(endDate, date) === 1) {
            // 해당 박스에 아이템 추가
            totalBoxItems[i].push(`${date} ${name2} [${bcode}] ${type}`);
          }
        }
      });
    };
    
    // 조회 시작 상태 설정 함수
    const lookup_set_start = () => {
      // 로딩 상태 표시 및 UI 업데이트 로직
      Swal.fire({
        title: '조회 중입니다',
        text: '잠시만 기다려주세요...',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      
      // 기존 데이터 초기화
      lookupData.regident = '';
      lookupData.gender = '';
      lookupData.ranker = '';
      lookupData.reduce_nm = '';
      lookupData.reduce_sale = '';
      lookupData.money = '';
      lookupData.sisul = '';
      lookupData.sisulColor = '#000';
      lookupData.rcgt = '';
      
      // 제품 그룹 초기화
      productGroups.forEach(group => {
        group.forEach(product => {
          product.count = 0;
        });
      });
      
      // 날짜 데이터 초기화
      totalDates.forEach(date => {
        date.text = '';
        date.active = false;
      });
      
      // 현재 유효기간 초기화
      currentValidPeriod.value = '';
      
      // 상태 박스 초기화
      Object.keys(statusItems).forEach(key => {
        statusItems[key] = [];
      });
      
      // 제품 박스 초기화
      for (let i = 0; i < productItems.length; i++) {
        productItems[i] = [];
      }
      
      // 전체 박스 초기화
      for (let i = 0; i < totalBoxItems.length; i++) {
        totalBoxItems[i] = [];
      }
    };
    
    // 공단 로그인창 실행
    const chromeRun = async () => {
      try {

        const certPasswordItem = await getCompanyCertificatePw();
        console.log(certPasswordItem, "certPasswordItem");
        const id = user.companyId;
        const selectedBrowser = 'chrome';
        const cnum = user.cnum;
        const cname = user.companyName;
        const certPassword = certPasswordItem.items;
        console.log(id, cnum, cname, certPassword, "id, cnum, cname, certPassword");
        // 로딩 표시
        Swal.fire({
          title: '공단 로그인창 실행 중',
          text: 'Chrome 브라우저로 실행 중입니다. 잠시만 기다려주세요.',
          timer: 10000,
          timerProgressBar: true,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        // 웹드라이버 상태 확인 요청 먼저 보내기
        window.electron.send('webdriver-check');
        
        // 웹드라이버 상태 확인 결과 수신 리스너
        const checkUnsubscribe = window.electron.receive('webdriver-status', (status) => {
          checkUnsubscribe(); // 리스너 해제
          
          console.log('웹드라이버 상태:', status);
          // 상태와 무관하게 로그인 요청 전송 (백그라운드에서 필요시 재시작)
          window.electron.send('longtermLogin', selectedBrowser, id, cnum, cname, certPassword);
          
          // 자동화 결과 수신 리스너 등록
          const unsubscribe = window.electron.receive('automation-complete', (result) => {
            unsubscribe(); // 리스너 해제
            
            if (result && result.success) {
              Swal.fire({
                icon: 'success',
                title: '실행 성공',
                text: result.message || '공단 로그인창이 실행되었습니다.',
                timer: 3000,
                showConfirmButton: false
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: '실행 실패',
                text: (result && result.error) || '공단 로그인창이 실행되지 않았습니다.',
                showConfirmButton: true
              });
            }
          });
        });
      } catch (error) {
        console.error('오류 발생:', error);
        Swal.fire({
          icon: 'error',
          title: '오류 발생',
          text: error.message || '알 수 없는 오류가 발생했습니다.',
        });
      }
    };
    
    // 수급자등록/주문하기 팝업
    const quickClientUp = () => {
      clientupSrc.value = "//xn--9o7b95g.com/clientup?chk=proram&username=";
      // 팝업 표시 로직
      if (popup.value) {
        popup.value.style.display = 'block';
      }
    };
    
    // 팝업 닫기
    const closePopup = () => {
      if (popup.value) {
        popup.value.style.display = 'none';
      }
    };
    
    // 가이드 닫기
    const closeGuide = () => {
      if (guide.value) {
        guide.value.style.display = 'none';
      }
    };
    
    // 컴포넌트 언마운트 시 소켓 연결 해제
    onUnmounted(() => {
      if (socket) {
        socket.disconnect();
      }
    });
    
    // 제품 그룹 초기화 함수
    const initProductGroups = () => {
      // 제품 그룹 초기화
      productGroups.forEach(group => {
        group.forEach(product => {
          product.count = 0;
        });
      });
    };
    
    // 날짜 데이터 초기화 함수
    const initTotalDates = () => {
      // 날짜 데이터 초기화
      totalDates.forEach(date => {
        date.text = '';
        date.active = false;
      });
    };
    
    return {
      isLoading,
      quickSearchName,
      searchDate,
      searchInfo,
      lookupData,
      productGroups,
      totalDates,
      clientupSrc,
      popup,
      guide,
      productItems,
      statusItems,
      totalBoxItems,
      currentValidPeriod,
      showClientRegisteModal,
      showPrintModal,
      modal_height,
      modal_width,
      showSection,
      clientData,
      buyItems,
      rentItems,
      buyNotItems,
      rentNotItems,
      // 메서드들
      showGuide,
      printScreen,
      quickSearchPopup,
      lookup,
      chromeRun,
      quickClientUp,
      closePopup,
      closeGuide,
      checkClient
    };
  }
});
</script>

<style>
@font-face {
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 200;
  src: url(https://fonts.gstatic.com/s/sourcesanspro/v21/6xKydSBYKcSV-LCoeQqfX1RYOo3i94_wlxdr.ttf) format('truetype');
}

@font-face {
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 300;
  src: url(https://fonts.gstatic.com/s/sourcesanspro/v21/6xKydSBYKcSV-LCoeQqfX1RYOo3ik4zwlxdr.ttf) format('truetype');
}

@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 16px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: 'liga';
}
</style>

