<template>
  <!-- Modals -->
  <ModalPage v-model:show="showClientRegisteModal" :height="RegisteModalHeight" :width="RegisteModalWidth" :parent="'client'">
    <ModalClientRegiste :show="showClientRegisteModal" @update:show="showClientRegisteModal = $event"
      @cancel="showClientRegisteModal = false" @save="loadClientData" @close="showClientRegisteModal = false" :source="'button'" />
  </ModalPage>

  <ModalPage v-model:show="showClientModifyModal" :height="ModifyModalHeight" :width="ModifyModalWidth" :parent="'client'"
    :scrollAreaBorder="true">
    <ModalClientModify ref="showClientModifyRef" :show="showClientModifyModal" :clientId="selectedClientId"
      @update:show="showClientModifyModal = $event" @cancel="showClientModifyModal = false" @delete="loadClientData"  @close="showClientModifyModal = false" />
  </ModalPage>

  <BaseOrderTemplate 
    :search-query="searchQuery" 
    :current-page="currentPage" 
    :total-pages="totalPages"
    :items="clientItems" 
    :filters="activeFilters" 
    search-placeholder="수급자성함, 인정번호, 연락처 검색"
    @update:search-query="searchQuery = $event" @search="handleSearch"
    @page-change="handlePageChange"
    @show-search-popup="showSwalDetailSearch" 
    @remove-filter="removeFilter" 
    @clear-filters="clearFilters"
    ref="baseTemplate">
    
    <!-- Title Title -->
    <template #title-icon>
      <span class="material-icons">people</span>
    </template>
    <template #title-text>
      수급자 관리
    </template>

    <!-- Header Buttons -->
    <template #header-buttons>
      <BlueBtn @click="showClientRegisteModal = true; showClientRegisteLoading()">수급자등록하기</BlueBtn>
      <LineBreak class="deskNone" />
      <DateInput v-model:value="filters.startDate" type="date" />
      <FlexDiv>~</FlexDiv>
      <DateInput v-model="filters.endDate" type="date" />
      <BlueBtn>날짜조회</BlueBtn>
      <BlueBtn class="mobileNone" @click="showBulkClientUpload">수급자일괄등록(엑셀)</BlueBtn>
      <BlueBtn class="mobileNone" @click="showClientDemandRecord">욕구사정기록내역</BlueBtn>
      <BlueBtn class="mobileNone" @click="showClientConsultation">수급자상담내역</BlueBtn>

      <GreenBtn class="mobileNone" @click="showExcelExport">
        <MicrosoftExcel />&nbsp;엑셀변환
      </GreenBtn>
      <BlueBtn class="mobileNone" @click="showExpiringSections">적용구간 만료예정자</BlueBtn>
    </template>

    <!-- Header Info -->
    <template #header-info>
      <InfoDiv class="mobileNone black">전체: {{ totalCount }}명</InfoDiv>
      <InfoDiv class="mobileNone green">일반: {{ targetCountGroups?.length > 0 ? targetCountGroups[0] : 0 }}명</InfoDiv>
      <InfoDiv class="mobileNone yellow">감경: {{ targetCountGroups?.length > 0 ? targetCountGroups[1] : 0 }}명</InfoDiv>
      <InfoDiv class="mobileNone blue">의료급여: {{ targetCountGroups?.length > 0 ? targetCountGroups[2] : 0 }}명</InfoDiv>
      <InfoDiv class="mobileNone red">기초: {{ targetCountGroups?.length > 0 ? targetCountGroups[3] : 0 }}명</InfoDiv>
    </template>

    <!-- Content Area (Tab buttons, Table, etc) -->
    <!-- Tab Buttons -->
    <!-- Pagination -->
    <!-- Table -->
    <template #table>
      <TableContainer>
        <DataTable>
          <thead>
            <tr>
              <th>번호</th>
              <th>수급자성함</th>
              <th>인정번호</th>
              <th>생년월일</th>
              <th class="mobileNone">대상</th>
              <th class="mobileNone">등급</th>
              <th class="mobileNone">본인부담율</th>
              <th class="mobileNone">성별</th>
              <th class="mobileNone">적용구간1</th>
              <th class="mobileNone">적용구간2</th>
              <th class="mobileNone">주소</th>
              <th class="mobileNone">상세주소</th>
              <th class="mobileNone">보호자성함</th>
              <th class="mobileNone">관계</th>
              <th class="mobileNone">연락처1</th>
              <th class="mobileNone">연락처2</th>
              <th class="mobileNone">센터명</th>
              <th>담당자</th>
              <th class="mobileNone">메모</th>
              <th class="mobileNone">서명</th>
              <th class="mobileNone">욕구사정</th>
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item) in paginatedItems" :key="item.id" :class="getRowClass(item)"
              @click="openClientModifyModal(item)">
              <td>{{ item.cnum }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.number }}</td>
              <td>{{ item.resident.split('-')[0] + '-**-**' }}</td>
              <td class="mobileNone">{{ item.target }}</td>
              <td class="mobileNone">{{ item.ranker }}</td>
              <td class="mobileNone">{{ parseInt(item.sale) }}%</td>
              <td class="mobileNone">{{ item.gender }}</td>
              <td class="mobileNone">{{ item.apdtS }}</td>
              <td class="mobileNone">{{ item.apdtE }}</td>
              <!-- <td>{{ item.addressnum }}</td> -->
              <td class="mobileNone">{{ item.address }}</td>
              <td class="mobileNone">{{ item.addressDetail }}</td>
              <td class="mobileNone">{{ item.guardName }}</td>
              <td class="mobileNone">{{ item.clientRelationInfo.guardTarget }}</td>
              <td class="mobileNone">{{ item.phone1 }}</td>
              <td class="mobileNone">{{ item.phone2 }}</td>
              <td class="mobileNone">{{ item.centerName }}</td>
              <td>{{ item.manager }}</td>
              <td class="mobileNone">{{ item.requestMemo }}</td>
              <td class="mobileNone"></td>
              <td class="mobileNone"></td>
              <td>{{ new Date(item.createdAt).toISOString().split('T')[0] }}</td>
            </tr>
          </tbody>
        </DataTable>
      </TableContainer>
    </template>
  </BaseOrderTemplate>
</template>

<script>
import { ref, reactive, computed, onMounted, getCurrentInstance } from 'vue'
import BaseOrderTemplate from '@/components/BaseOrderTemplate.vue'
import * as ClientPageCss from '@/assets/styles/client/ClientPageCss.js'
import * as PublicCss from '@/assets/styles/public.js'
import MicrosoftExcel from 'vue-material-design-icons/MicrosoftExcel.vue';
import ModalPage from '@/components/modal/ModalPage.vue'
import ModalClientRegiste from '@/components/modal/client/ModalClientRegiste.vue';
import ModalClientModify from '@/components/modal/client/ModalClientModify.vue';
import { getClients, getExpiringSectionClients, getAllClientNeedRecords } from '@/api/client.js';
import { downloadExcelTemplate } from '@/api/common.js';
import { useStore } from 'vuex';
import io from 'socket.io-client';
import * as XLSX from 'xlsx';
import Datepicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';

export default {
  name: 'ClientPage',
  components: {
    BaseOrderTemplate,
    ...ClientPageCss,
    ...PublicCss,
    MicrosoftExcel,
    ModalPage,
    ModalClientRegiste,
    ModalClientModify,
  },
  setup() {
    // app 인스턴스 가져오기
    // const { proxy } = getCurrentInstance();
    // 소켓 객체
    let socket = null;
    const app = getCurrentInstance().appContext;
    const store = useStore();
    const user = store.state.user;
    // Reactive data
    const searchQuery = ref('')
    const currentPage = ref(1)
    const pageSize = ref(10)
    const totalPages = ref(1)
    const totalCount = ref(0)
    const targetCountGroup = ref([
      { target: '0', count: '0' },
      { target: '1', count: '0' },
      { target: '2', count: '0' },
      { target: '3', count: '0' }
    ])
    const baseTemplate = ref(null)
    const showClientRegisteModal = ref(false)
    const showClientModifyModal = ref(false)
    const showClientModifyRef = ref(null);
    const RegisteModalHeight = ref('78%') 
    const RegisteModalWidth = ref('50%')
    const ModifyModalHeight = ref('78%')
    const ModifyModalWidth = ref('90%')
    const selectedClientId = ref(null)

    // 적용구간 만료예정자 데이터
    const expiringClients = ref([])

    const clientItems = ref([])
    const filters = reactive({
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      clientType: '',
      status: ''
    })
    
    console.log(filters.startDate)
    console.log(filters.endDate)

    const detailSearch = reactive({
      // 보호자 성함
      name: '',
      // 센터명
      centerName: '',
      // 담당자
      manager: '',
      // 연락처1
      phone1: '',
      //연락처2
      phone2: '',
      // 주소
      address: '',
    })

    // Computed
    const paginatedItems = computed(() => {
      return clientItems.value || []
    })

    // 활성화된 필터 계산 (detailSearch에서 값이 있는 항목만)
    const activeFilters = computed(() => {
      const result = {};
      Object.entries(detailSearch).forEach(([key, value]) => {
        if (value && value.trim() !== '') {
          result[key] = value;
        }
      });
      return result;
    })

    const targetCountGroups = computed(() => {
      return targetCountGroup.value?.map(item => item.count)
    })

    // Methods
    const handleSearch = () => {
      currentPage.value = 1
      loadClientData()
    }

    const handlePageChange = (page) => {
      currentPage.value = page
      loadClientData()
    }

    const loadClientData = async () => {
      app.config.globalProperties.$swalLoading();
      try {
        // API 호출 로직
        const response = await getClients({
          page: currentPage.value,
          limit: pageSize.value,
          search: searchQuery.value, // 검색어 추가
          ...activeFilters.value
        });
        targetCountGroup.value = response.targetCountGroup
        clientItems.value = response.items
        totalPages.value = response.totalPages
        totalCount.value = response.total

      } catch (error) {
        console.error('Error loading client data:', error)
      } finally {
        app.config.globalProperties.$swalClose();
      }
    }

    // 특정 필터 제거
    const removeFilter = (key) => {
      detailSearch[key] = '';
      handleSearch();
    }

    // 모든 필터 초기화
    const clearFilters = () => {
      Object.keys(detailSearch).forEach(key => {
        detailSearch[key] = '';
      });
      handleSearch();
    }

    const getRowClass = (item) => {
      switch (item.target) {
        case '일반':
          return 'green';
        case '감경':
          return 'yellow';
        case '의료급여':
          return 'blue';
        case '기초':
          return 'red';
        default:
          return '';
      }
    }

    const showSwalDetailSearch = () => {
      baseTemplate.value.showSwalModal({
        title: '상세 검색',
        width: window.innerWidth < 768 ? "100%" : "30%",
        confirmButtonText: '검색',
        html: `
          <div class="swal-search-form">
            <div class="swal-form-group">
              <label>보호자성함</label>
              <input id="swal-name" class="swal2-input" placeholder="보호자성함">
            </div>
            <div class="swal-form-group">
              <label>센터명</label>
              <input id="swal-center" class="swal2-input" placeholder="센터명">
            </div>
            <div class="swal-form-group">
              <label>담당자</label>
              <input id="swal-manager" class="swal2-input" placeholder="담당자">
            </div>
            <div class="swal-form-group">
              <label>연락처1</label>
              <input id="swal-phone1" class="swal2-input" placeholder="연락처1">
            </div>
            <div class="swal-form-group">
              <label>연락처2</label>
              <input id="swal-phone2" class="swal2-input" placeholder="연락처2">
            </div>
            <div class="swal-form-group">
              <label>주소</label>
              <input id="swal-address" class="swal2-input" placeholder="주소">
            </div>
          </div>
        `,
        preConfirm: () => {
          return {
            name: document.getElementById('swal-name').value,
            centerName: document.getElementById('swal-center').value,
            manager: document.getElementById('swal-manager').value,
            phone1: document.getElementById('swal-phone1').value,
            phone2: document.getElementById('swal-phone2').value,
            address: document.getElementById('swal-address').value
          };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          // 검색 조건을 detailSearch에 복사
          Object.assign(detailSearch, result.value);
          // 검색 실행
          loadClientData();
        }
      });
    }

    // 소켓 연결 시작 함수
    const socket_start = () => {
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
            baseTemplate.value.showSwalModal({
              icon: 'error',
              title: '서버 연결 오류',
              text: '소켓 서버에 연결할 수 없습니다. 관리자에게 문의하세요.'
            });
          });
          
          // 연결 종료 이벤트 리스너
          socket.on('disconnect', (reason) => {
            console.log('소켓 연결이 종료되었습니다. 이유:', reason);
          });

          // 엑셀 업로드 처리 이벤트 리스너
          socket.on('exceluse', function(data) {
            console.log(data);
            const datasplit = data.data;
            const datcnt = data.cnt;
            
            if(datasplit == 'end'){ 
              // app.config.globalProperties.$swalClose(); 
              const excelStateElement = document.querySelector('.excelstate');
              if (excelStateElement) {
                excelStateElement.innerHTML = '수급자 일괄등록완료';
              }
            }
            if(datasplit == 'n'){ 
              const memberElements = document.querySelectorAll('.excelmember');
              if (memberElements && memberElements[datcnt]) {
                const statusSpans = memberElements[datcnt].querySelectorAll('span');
                if (statusSpans && statusSpans[1]) {
                  statusSpans[1].textContent = 'check_circle';
                  statusSpans[1].style.color = 'rgb(55, 138, 55)';
                }
              }
            }
            if(datasplit == 'y'){ 
              const memberElements = document.querySelectorAll('.excelmember');
              if (memberElements && memberElements[datcnt]) {
                const spans = memberElements[datcnt].querySelectorAll('span');
                if (spans && spans[1] && spans[2]) {
                  spans[1].textContent = 'cancel';
                  spans[2].textContent = '(중복등록)';
                  spans[1].style.color = '#ff0000';
                }
              }
            }
            if(datasplit == 'd'){ 
              const memberElements = document.querySelectorAll('.excelmember');
              if (memberElements && memberElements[datcnt]) {
                const spans = memberElements[datcnt].querySelectorAll('span');
                if (spans && spans[1] && spans[2]) {
                  spans[1].textContent = 'cancel';
                  spans[2].textContent = '(조회불가)';
                  spans[1].style.color = '#ff0000';
                }
              }
            }
            //socket.emit('disconnect2', {'name': uid});
          });
        } catch (error) {
          console.error('Error loading client data:', error);
        } finally {
          // app.config.globalProperties.$swalClose();
        }
      }
    }

    const showBulkClientUpload = () => {
      // 로딩 표시
      app.config.globalProperties.$swalLoading();
      
      // 약간의 지연 시간 후 로딩 닫기
      setTimeout(() => {
        app.config.globalProperties.$swalClose();
        
        baseTemplate.value.showSwalModal({
          icon: 'info',
          title: '수급자일괄등록',
          width: "40%",
          confirmButtonText: '취소',
          showConfirmButton: false,
          html: `
            <div>
              <div class="swal-description">※ 아래 엑셀파일 다운로드 후 양식에 맞게 작성 후 업로드해주세요 ※</div>
              <div class="swal-button-group">
                <button class="swal-excel-btn" id="download-excel-template">엑셀양식내려받기</button>
                <button class="swal-excel-btn" id="upload-excel-with-history">엑셀등록(기본정보+수급자판매/대여이력 포함등록하기)</button>
                <!--button class="swal-excel-btn" id="upload-excel-basic">엑셀등록(기본정보만 등록하기)</button>
                <button class="swal-excel-btn" id="upload-excel-nonbenefit">엑셀등록(비급여)</button-->
              </div>
            </div>
          `,
          didOpen: () => {
            // 엑셀 양식 다운로드 버튼 클릭 이벤트
            document.getElementById('download-excel-template')?.addEventListener('click', () => {
              // 로딩 표시
              app.config.globalProperties.$swalLoading();
              
              // 다운로드 로직 구현 (예시)
              setTimeout(async () => {
                const fileUrl = await downloadExcelTemplate('(한큐)수급자일괄등록.xlsx');  // 서버에서 제공하는 파일 URL
                console.log(fileUrl);
                const a = document.createElement('a');
                a.href = fileUrl;
                a.download = '(한큐)수급자일괄등록.xlsx';  // 다운로드할 파일 이름 지정
                document.body.appendChild(a);
                a.click();
                // document.body.removeChild(a);
                // app.config.globalProperties.$swalClose();
                // Swal.fire({
                //   icon: 'success',
                //   title: '다운로드 완료',
                //   text: '엑셀 양식이 다운로드되었습니다.',
                //   confirmButtonText: '확인'
                // });
              }, 1000);
            });
            
            // 엑셀 업로드 버튼들 이벤트 처리
            ['upload-excel-with-history', 'upload-excel-basic', 'upload-excel-nonbenefit'].forEach(id => {
              document.getElementById(id)?.addEventListener('click', () => {
                // 파일 선택 다이얼로그 표시
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.xlsx, .xls';
                
                input.onchange = (e) => {
                  if (e.target.files.length > 0) {
                    // 엑셀 파일 읽기 함수
                    const readExcel = () => {
                      const name = [];
                      const number = [];
                      const sex = [];
                      const address1 = [];
                      const address2 = [];
                      const address1_1 = [];
                      const address2_2 = [];
                      const guardname = [];
                      const guardtarget = [];
                      const phone1 = [];
                      const phone2 = [];
                      const center = [];
                      const manager = [];
                      
                      const reader = new FileReader();
                      reader.onload = function() {
                        const data = reader.result;
                        const workBook = XLSX.read(data, { type: 'binary' });
                        
                        workBook.SheetNames.forEach(function(sheetName) {
                          console.log('SheetName: ' + sheetName);
                          const rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
                          
                          rows.forEach(row => {
                            if (row['성함'] && row['성함'] !== null && row['성함'] !== undefined) {
                              name.push(row['성함'].replace(/,/g, ' '));
                              number.push(row['인정번호'] !== undefined ? String(row['인정번호']).replace(/,/g, ' ') : '');
                              sex.push(row['성별'] !== undefined ? String(row['성별']).replace(/,/g, ' ') : '');
                              address1.push(row['주소'] !== undefined ? String(row['주소']).replace(/,/g, ' ') : '');
                              address2.push(row['상세주소'] !== undefined ? String(row['상세주소']).replace(/,/g, ' ') : '');
                              address1_1.push(row['주소2'] !== undefined ? String(row['주소2']).replace(/,/g, ' ') : '');
                              address2_2.push(row['상세주소2'] !== undefined ? String(row['상세주소2']).replace(/,/g, ' ') : '');
                              guardname.push((row['보호자성함'] !== undefined && row['보호자성함'] !== '') ? String(row['보호자성함']).replace(/,/g, ' ') : '본인');
                              guardtarget.push(row['관계(본인,자녀,배우자,자부,형제)'] !== undefined ? String(row['관계(본인,자녀,배우자,자부,형제)']).replace(/,/g, ' ') : '');
                              phone1.push(row['연락처1'] !== undefined ? String(row['연락처1']).replace(/[^0-9]/g, '') : '');
                              phone2.push(row['연락처2'] !== undefined ? String(row['연락처2']).replace(/[^0-9]/g, '') : '');
                              center.push(row['센터명'] !== undefined ? String(row['센터명']).replace(/,/g, ' ') : '');
                              manager.push(row['담당자'] !== undefined ? String(row['담당자']).replace(/,/g, ' ') : '');
                            }
                          });
                        });
                        
                        // 현재 날짜 포맷팅
                        const now = new Date();
                        const year = now.getFullYear();
                        const mon = (now.getMonth() + 1) > 9 ? '' + (now.getMonth() + 1) : '0' + (now.getMonth() + 1);
                        const day = now.getDate() > 9 ? '' + now.getDate() : '0' + now.getDate();
                        const chan_val = year + mon + day;
                        socket_start('clientexcel');
                        socket.emit('disconnect2', { 'name': 'su_rhkdtn' });
                        socket.emit('login', { 'name': 'su_rhkdtn' });
                        socket.emit('clientexcel', {
                          'id': 'su_rhkdtn',
                          'company': user.companyName,
                          'name': name,
                          'number': number,
                          'address1': address1,
                          'address2': address2,
                          'address1_1': address1_1,
                          'address2_2': address2_2,
                          'guardname': guardname,
                          'guardtarget': guardtarget,
                          'phone1': phone1,
                          'phone2': phone2,
                          'center': center,
                          'manager': manager,
                          'date': chan_val,
                          'companynum': user.cnum,
                          'userId': user.id,
                          'companyId': user.companyId
                        });

                        console.log( {
                          'id': 'su_rhkdtn',
                          'company': user.companyName,
                          'name': name,
                          'number': number,
                          'address1': address1,
                          'address2': address2,
                          'address1_1': address1_1,
                          'address2_2': address2_2,
                          'guardname': guardname,
                          'guardtarget': guardtarget,
                          'phone1': phone1,
                          'phone2': phone2,
                          'center': center,
                          'manager': manager,
                          'date': chan_val,
                          'companynum': user.cnum,
                          'userId': user.id,
                          'companyId': user.companyId
                        })
                        
                        // 엑셀 데이터 표시
                        let excelstr = '';
                        name.forEach((n, i) => {
                          excelstr += `<div class="flex excelmember">${n}&nbsp;&nbsp;<span style="font-weight:bold;">${number[i]}</span>&nbsp;&nbsp;<span class="material-icons" style="color:rgb(55, 138, 55); font-size:28px;"></span><span class="re"></span></div>`;
                        });
                        
                        app.config.globalProperties.$swalClose();
                        
                        // 결과 모달 표시
                        baseTemplate.value.showSwalModal({
                          width: '550px',
                          fontsize: '23px',
                          didOpen: () => {
                            // app.config.globalProperties.$swalLoading();
                          },
                          title: '',
                          html:
                            `<div style="font-size:27px; font-weight:bold; padding:10px;">총 ${name.length}명</div>` +
                            `<div class="flexcolumnstart" style="height:300px; overflow-y:scroll;"><div>${excelstr}</div></div>` +
                            '<div class="excelstate" style="font-size:25px; font-weight:bold; padding:10px;">수급자일괄등록 진행중...</div>',
                          showCancelButton: true,
                          cancelButtonColor: '#d33',
                          confirmButtonText: '확인',
                          cancelButtonText: '취소',
                          allowOutsideClick: false,
                        }).then((result) => {
                          if (!result.isConfirmed) {
                            // socket.emit('disconnect2', {'name': uid});
                            // socket.emit('login', {'name': uid});
                            // socket.emit('clientexcelstop', { 'id': uid });
                          }
                        });
                      };
                      
                      reader.readAsBinaryString(e.target.files[0]);
                    };
                    
                    // 로딩 표시 후 엑셀 읽기 실행
                    // app.config.globalProperties.$swalLoading();
                    readExcel();
                  }
                };
                
                input.click();
              });
            });
          }
        });
      }, 300);
    }

    const showExpiringSections = () => {
      // 로딩 표시
      app.config.globalProperties.$swalLoading();
      
      // 적용구간 만료예정자 데이터 로드
      // 테이블 행 HTML 생성
      let tableRows = '';

      // 로딩 닫기
      app.config.globalProperties.$swalClose();

      baseTemplate.value.showSwalModal({
        title: '적용구간 만료예정자',
        width: "50%",
        showConfirmButton: false,
        html: `
          <div>
            <div class="section-selection">
              <select id="year-select" class="section-select">
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
              <span class="select-label">년</span>
              
              <select id="month-select" class="section-select">
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                
              </select>
              <span class="select-label">월</span>
              
              <button id="search-expiring-btn" class="swal-btn">조회</button>
            </div>
            
            <div class="consultation-header">
              <div class="consultation-title">만료예정자 목록</div>
              <!--button id="excel-export-btn" class="swal-btn green">엑셀변환</button-->
            </div>
            
            <div class="expiring-table-container">
              <table class="expiring-table">
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>수급자성함</th>
                    <th>인정번호</th>
                    <th>대상</th>
                    <th>만료일</th>
                  </tr>
                </thead>
                <tbody id="expiring-table-body">
                  ${tableRows}
                </tbody>
              </table>
            </div>
          </div>
        `,
        didOpen: async () => {
          // 현재 날짜 객체 생성
          const now = new Date();
          const currentYear = now.getFullYear();
          const currentMonth = (now.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 +1, 두 자리로 포맷팅
          
          // 년도 선택 요소 설정
          const yearSelect = document.getElementById('year-select');
          for (let i = 0; i < yearSelect.options.length; i++) {
            if (yearSelect.options[i].value === currentYear.toString()) {
              yearSelect.selectedIndex = i;
              break;
            }
          }
          
          // 월 선택 요소 설정
          const monthSelect = document.getElementById('month-select');
          for (let i = 0; i < monthSelect.options.length; i++) {
            if (monthSelect.options[i].value === currentMonth) {
              monthSelect.selectedIndex = i;
              break;
            }
          }

          // 만료 예정 수급자 데이터 조회 함수
          const fetchExpiringClients = async () => {
            try {
              
              const year = document.getElementById('year-select').value;
              const month = document.getElementById('month-select').value;
              
              // API 호출하여 만료 예정 수급자 데이터 가져오기
              const response = await getExpiringSectionClients(year, month);
              let expiringClients = response.data || [];
              
              // 테이블 업데이트
              const tableBody = document.getElementById('expiring-table-body');
              tableBody.innerHTML = '';
              
              expiringClients.forEach((client, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                  <td>${index + 1}</td>
                  <td>${client.name}</td>
                  <td>${client.number}</td>
                  <td>${client.target}</td>
                  <td>${client.nextEdtApdtDt.replace('|', '')}</td>
                `;
                tableBody.appendChild(row);
              });
              
            } catch (error) {
              console.error('만료 예정 수급자 목록 조회 오류:', error);
            }
          };
          
          // 조회 버튼 클릭 이벤트 리스너 등록
          document.getElementById('search-expiring-btn').addEventListener('click', fetchExpiringClients);
          
          // 모달 열릴 때 자동으로 데이터 조회
          fetchExpiringClients();
        }
      });
    }

    const showExcelExport = () => {
      // 로딩 표시
      app.config.globalProperties.$swalLoading();
      
      // 약간의 지연 시간 후 로딩 닫기
      setTimeout(() => {
        app.config.globalProperties.$swalClose();
        
        baseTemplate.value.showSwalModal({
          icon: 'info',
          title: '엑셀변환 선택',
          width: "30%",
          showConfirmButton: false,
          html: `
            <div class="excel-export-modal">
              <div class="excel-button-container">
                <button class="excel-export-btn" id="export-client-list">수급자목록</button>
                <button class="excel-export-btn" id="export-client-history">수급자 급여개시현황</button>
              </div>
            </div>
          `,
          didOpen: () => {
            // 엑셀 내보내기 버튼 클릭 이벤트
            document.getElementById('export-client-list')?.addEventListener('click', () => {
              // 로딩 표시
              app.config.globalProperties.$swalLoading();
              
              // 엑셀 내보내기 로직 구현 (예시)
              setTimeout(() => {
                app.config.globalProperties.$swalClose();
                // Swal.fire({
                //   icon: 'success',
                //   title: '엑셀 변환 완료',
                //   text: '수급자 목록이 엑셀 파일로 변환되었습니다.',
                //   confirmButtonText: '확인'
                // });
              }, 1000);
            });
            
            document.getElementById('export-client-history')?.addEventListener('click', () => {
              // 로딩 표시
              app.config.globalProperties.$swalLoading();
              
              // 엑셀 내보내기 로직 구현 (예시)
              setTimeout(() => {
                app.config.globalProperties.$swalClose();
                // Swal.fire({
                //   icon: 'success',
                //   title: '엑셀 변환 완료',
                //   text: '수급자 급여개시현황이 엑셀 파일로 변환되었습니다.',
                //   confirmButtonText: '확인'
                // });
              }, 1000);
            });
          }
        });
      }, 300);
    }

    const showClientConsultation = () => {
      // 로딩 표시
      app.config.globalProperties.$swalLoading();
      
      // 테이블 행 HTML 생성
      let tableRows = '';
      for (let i = 0; i < 7; i++) {
        const year = i < 2 ? '2025' : i < 5 ? '2024' : '2023';
        const month = (i % 4) + 1;
        const day = ((i + 1) * 5) % 30 || 1;
        const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

        tableRows += `
          <tr>
            <td>${i + 1}</td>
            <td>${i % 2 === 0 ? '김고객' : '이고객'}</td>
            <td>${i % 2 === 0 ? 'L1234567890' : 'L1234567891'}</td>
            <td>${i % 3 === 0 ? '특이사항 내용 길이 테스트 길이만큼 길어지는지 테스트' : ''}</td>
            <td>${i % 2 === 0 ? '홍길동' : '김담당'}</td>
            <td>${date}</td>
          </tr>
        `;
      }

      // 로딩 닫기
      app.config.globalProperties.$swalClose();

      baseTemplate.value.showSwalModal({
        icon: 'info',
        title: '수급자상담내역',
        width: "80%",
        showConfirmButton: false,
        html: `
          <div>
            <div class="consultation-header">
              <div class="search-section">
                <button class="search-tab active">성함/인정번호</button>
                <button class="search-tab">작성자</button>
                <input type="text" class="section-input" placeholder="검색어를 입력하세요">
                <button class="search-button">검색</button>
              </div>
              <div class="consultation-info">
                <span>총 상담수 : 7회</span>
              </div>
            </div>
            
            <div class="section-table">
              <table class="expiring-table">
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>성함</th>
                    <th>인정번호</th>
                    <th>특이사항</th>
                    <th>작성자</th>
                    <th>작성일</th>
                  </tr>
                </thead>
                <tbody>
                  ${tableRows}
                </tbody>
              </table>
            </div>
            
          </div>
        `,
        didOpen: (popup) => {
          // 검색 탭 전환
          const searchTabs = popup.querySelectorAll('.search-tab');
          searchTabs.forEach(tab => {
            tab.addEventListener('click', () => {
              searchTabs.forEach(t => t.classList.remove('active'));
              tab.classList.add('active');
            });
          });

          // 검색 버튼
          const searchButton = popup.querySelector('.search-button');
          const searchInput = popup.querySelector('.section-input');
          if (searchButton && searchInput) {
            searchButton.addEventListener('click', () => {
              // 검색 로직 구현
            });
          }

        }
      });
    }

    // 욕구사정기록지
    const showClientDemandRecord = async () => {
      try {
        // 로딩 표시
        app.config.globalProperties.$swalLoading();
        
        // API 호출하여 욕구사정기록 데이터 가져오기
        const response = await getAllClientNeedRecords({
          page: 1,
          limit: 100
        });
        
        const needRecords = response.data.items || [];
        const totalRecords = response.data.total || 0;
        
        // 테이블 행 HTML 생성
        let tableRows = '';
        if (needRecords.length > 0) {
          needRecords.forEach((record, index) => {
            tableRows += `
              <tr class="demand-record-row" data-client-id="${record.number}">
                <td>${index + 1}</td>
                <td>${record.name}</td>
                <td>${record.number}</td>
                <td>${record.resulttext ? (record.resulttext.length > 10 ? record.resulttext.substring(0, 10) + '...' : record.resulttext) : ''}</td>
                <td>${record.manager || ''}</td>
                <td>PC</td>
                <td>${record.date ? new Date(record.date).toISOString().split('T')[0] : ''}</td>
              </tr>
            `;
          });
        } else {
          // 데이터가 없을 경우 기본 표시
          tableRows = `
            <tr>
              <td colspan="7" style="text-align: center;">욕구사정기록이 없습니다.</td>
            </tr>
          `;
        }
        
        // 로딩 닫기
        app.config.globalProperties.$swalClose();

        baseTemplate.value.showSwalModal({
          icon: 'info',
          title: '수급자 욕구사정기록 내역',
          width: "80%",
          confirmButtonText: "인쇄",
          allowOutsideClick: false,
          allowEscapeKey: false,
          html: `
            <div>
              <div class="consultation-header">
                <div class="search-section">
                  <button class="search-tab active">성함/인정번호</button>
                  <button class="search-tab">작성자</button>
                  <input type="text" class="section-input" placeholder="검색어를 입력하세요">
                  <button class="search-button">검색</button>
                </div>
                <div class="consultation-info">
                  <span>총 욕구사정기록 수 : ${totalRecords}회</span>
                </div>
              </div>
              
              <div class="section-table">
                <table class="expiring-table">
                  <thead>
                    <tr>
                      <th>번호</th>
                      <th>성함</th>
                      <th>인정번호</th>
                      <th>총평</th>
                      <th>작성자</th>
                      <th>구분</th>
                      <th>작성일</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${tableRows}
                  </tbody>
                </table>
              </div>
              
            </div>
          `,
          didOpen: (popup) => {
            // 검색 탭 전환
            const searchTabs = popup.querySelectorAll('.search-tab');
            searchTabs.forEach(tab => {
              tab.addEventListener('click', () => {
                searchTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
              });
            });

            // 검색 버튼
            const searchButton = popup.querySelector('.search-button');
            const searchInput = popup.querySelector('.section-input');
            if (searchButton && searchInput) {
              searchButton.addEventListener('click', async () => {
                const searchValue = searchInput.value;
                const activeTab = popup.querySelector('.search-tab.active');
                const searchType = activeTab.textContent === '성함/인정번호' ? 'name' : 'manager';
                  
                try {
                  // 검색 API 호출
                  const searchResponse = await getAllClientNeedRecords({
                    page: 1,
                    limit: 100,
                    [searchType]: searchValue
                  });
                    
                  const searchResults = searchResponse.data.items || [];
                  const tbody = popup.querySelector('tbody');
                    
                  // 테이블 내용 업데이트
                  if (searchResults.length > 0) {
                    let newRows = '';
                    searchResults.forEach((record, index) => {
                      newRows += `
                        <tr class="demand-record-row" data-client-id="${record.number}">
                          <td>${index + 1}</td>
                          <td>${record.name}</td>
                          <td>${record.number}</td>
                          <td>${record.resulttext ? (record.resulttext.length > 10 ? record.resulttext.substring(0, 10) + '...' : record.resulttext) : ''}</td>
                          <td>${record.manager || ''}</td>
                          <td>PC</td>
                          <td>${record.date ? new Date(record.date).toISOString().split('T')[0] : ''}</td>
                        </tr>
                      `;
                    });
                    tbody.innerHTML = newRows;
                  } else {
                    tbody.innerHTML = `
                      <tr>
                        <td colspan="7" style="text-align: center;">검색 결과가 없습니다.</td>
                      </tr>
                    `;
                  }
                    
                  // 검색 결과 수 업데이트
                  const infoSpan = popup.querySelector('.consultation-info span');
                  infoSpan.textContent = `총 욕구사정기록 수 : ${searchResponse.data.total || 0}회`;
                    
                } catch (error) {
                  console.error('욕구사정기록 검색 오류:', error);
                }
              });
            }

            // 테이블 행 클릭 이벤트
            const demandRecordRows = popup.querySelectorAll('.demand-record-row');
            demandRecordRows.forEach(row => {
              row.addEventListener('click', () => {
                const clientId = row.getAttribute('data-client-id');
                if (clientId) {
                  // 해당 수급자 정보 조회
                  // getClients({
                  //   search: clientId,
                  //   limit: 1
                  // }).then(response => {
                  //   if (response.data.items && response.data.items.length > 0) {
                  //     const client = response.data.items[0];
                        
                  //     // ModalClientModify 열기
                  //     selectedClientId.value = client.num;
                  //     showClientModifyModal.value = true;
                        
                  //     // ModalNeed 열기
                  //     setTimeout(() => {
                  //       showClientModifyRef.value?.openNeedModal();
                  //     }, 100);
                  //   }
                  // }).catch(error => {
                  //   console.error('수급자 정보 조회 오류:', error);
                  // });
                }
              });
            });
          }
        });
      } catch (error) {
        // 오류 발생 시 로딩 닫기
        app.config.globalProperties.$swalClose();
        console.error('욕구사정기록 목록 조회 오류:', error);
      }
    };

    // 수급자 수정 모달 열기
    const openClientModifyModal = (client) => {
      // 로딩 표시
      app.config.globalProperties.$swalLoading();
      selectedClientId.value = client.id;
      showClientModifyModal.value = true;
      
      // 모달이 열린 후 약간의 지연 시간을 두고 로딩 닫기
      setTimeout(() => {
        app.config.globalProperties.$swalClose();
      }, 500);
    }

    // 수급자 등록 모달 열기 시 로딩 표시
    const showClientRegisteLoading = () => {
      // 로딩 표시
      app.config.globalProperties.$swalLoading();
      
      // 모달이 열린 후 약간의 지연 시간을 두고 로딩 닫기
      setTimeout(() => {
        app.config.globalProperties.$swalClose();
      }, 500);
    }

    // Lifecycle
    onMounted(() => {
        loadClientData()
      })

    return {
      Datepicker,
      searchQuery,
      currentPage,
      pageSize,
      totalPages,
      totalCount,
      clientItems,
      filters,
      detailSearch,
      paginatedItems,
      activeFilters,
      targetCountGroups,
      expiringClients,
      RegisteModalHeight,
      RegisteModalWidth,
      ModifyModalHeight,
      ModifyModalWidth,
      showClientRegisteModal,
      showClientModifyModal,
      selectedClientId,
      handleSearch,
      handlePageChange,
      loadClientData,
      removeFilter,
      clearFilters,
      getRowClass,
      baseTemplate,
      showSwalDetailSearch,
      showBulkClientUpload,
      showExpiringSections,
      showExcelExport,
      showClientConsultation,
      showClientDemandRecord,
      showClientModifyRef,
      openClientModifyModal,
      showClientRegisteLoading
    }
  }
}
</script>
