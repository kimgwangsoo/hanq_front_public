<template>
  <!-- 담당자 추가 모달 -->
  <ModalPage v-model:show="showMangerModal" 
  :height="modal_height" :width="modal_width" :parent="'system'">
    <ModalManager 
    :show="showMangerModal"
    :manageType="manageType"
    :managerData="managerData"
    @getMangerList="fetchUserList"
    @update:show="showMangerModal = $event"
    @close="showMangerModal = false"/>
  </ModalPage>

  <div>
    <FlexTopDiv>
      <SystemContent>
        <SystemTitle>
          <span class="material-icons">person</span>
          &nbsp;
          담당자 목록
        </SystemTitle>

        <SearchArea>
          <SearchInput type="text" placeholder="검색어를 입력하세요." />
          <SearchButton>
            <span class="material-icons">search</span>
          </SearchButton>
        </SearchArea>

        <SystemTable>
          <thead>
            <tr class="borderNone">
              <th class="borderNone" colspan="5" >
                <FlexRight>
                  <SystemBlueBtn v-if="isAdmin" @click="openMangerModal('Add', {})">담당자 추가</SystemBlueBtn>
                </FlexRight>
              </th>
            </tr>
            <tr>
              <th colspan="5">
                <!-- 페이징 버튼 -->
                <PagingContainer>
                  <PagingBtn v-for="page in userListTotalPage" :key="page" @click="userListPage = page">{{ page }}</PagingBtn>
                </PagingContainer>
              </th>
            </tr>
            <tr>
              <th>번호</th>
              <th>담당자명</th>
              <th>담당자아이디</th>
              <th>부서</th>
              <th>권한</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in userList" :key="item.id" @click="openMangerModal('Update', item)">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.userName }}</td>
              <td>{{ item.department }}</td>
              <td>
                <i class="material-icons">person</i>
              </td>
            </tr>
          </tbody>
        </SystemTable>

        <SystemTitle>
          프로그램 이용 계약서
        </SystemTitle>

        <ContractLink>
          계약서 확인 링크 접속
        </ContractLink>
      </SystemContent>

      <SystemContent>
        <SystemTitle>
          <span class="material-icons">business</span>
          &nbsp;
          회사 정보
        </SystemTitle>

        <CompanyTable>
          <thead>
            <tr>
              <th>회사명</th>
              <td>{{ companyInfo.name }}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>대표자</th>
              <td>{{ companyInfo.ceoName }}</td>
            </tr>
            <tr>
              <th>사업장 주소</th>
              <td class="smallFont">{{ companyInfo.address }}</td>
            </tr>
            <tr>
              <th>
                <SystemBlueBtn @click="openDaumPostcode(1)">
                  주소 검색 &nbsp;
                  <i class="material-icons">search</i>
                </SystemBlueBtn>
              </th>
              <td>
                <input type="text" placeholder="상세주소를 검색하세요." v-model="companyInfo.addressDetail" @change="handleCompanyInfoUpdate('addressDetail', companyInfo.addressDetail)" />
              </td>
            </tr>
            <tr>
              <th>공인인증서 암호</th>
              <td>
                <input type="password" placeholder="공인인증서 암호를 입력하세요." v-model="companyInfo.certificatePw" @change="handleCompanyInfoUpdate('certificatePw', companyInfo.certificatePw)" />
              </td>
            </tr>
            <tr>
              <th>사업자등록번호</th>
              <td>
                <input type="text" placeholder="사업자등록번호를 입력하세요." v-model="companyInfo.bnum" @change="handleCompanyInfoUpdate('bnum', companyInfo.bnum)" />
              </td>
            </tr>
            <tr>
              <th>기관 전화번호</th>
              <td>
                <input type="text" placeholder="기관 전화번호를 입력하세요." v-model="companyInfo.phone" @change="handleCompanyInfoUpdate('phone', companyInfo.phone)" />
              </td>
            </tr>
            <tr>
              <th>기관 팩스 번호</th>
              <td>
                <input type="text" placeholder="기관 팩스 번호를 입력하세요." v-model="companyInfo.fax" @change="handleCompanyInfoUpdate('fax', companyInfo.fax)" />
              </td>
            </tr>

            <tr>
              <td colspan="2"></td>
            </tr>
            <tr>
              <td colspan="2"></td>
            </tr>

            <tr>
              <td colspan="2">
                <FlexDiv>
                  직인 등록하기 &nbsp;
                  <input type="file" ref="stampFileInput" style="display: none" @change="handleFileUpload('stamp', $event)" accept="image/*" />
                  <SystemBlueBtn @click="stampFileInput.click()">파일 선택</SystemBlueBtn>
                  &nbsp;
                  <SystemBlueBtn @click="uploadFile('stamp')">저장하기</SystemBlueBtn>
                </FlexDiv>
              </td>
            </tr>

            <tr>
              <td colspan="2">
                <FlexDiv>
                  <img :src="filePreview.stamp || ''" alt="직인 이미지" v-if="filePreview.stamp" style="max-width: 200px; max-height: 200px;" />
                  <div v-else>직인 이미지가 없습니다</div>
                </FlexDiv>
              </td>
            </tr>

            <tr>
              <td colspan="2"></td>
            </tr>
            <tr>
              <td colspan="2"></td>
            </tr>

            <tr>
              <td colspan="2">
                <FlexDiv>
                  명함 등록하기 &nbsp;
                  <input type="file" ref="cardFileInput" style="display: none" @change="handleFileUpload('card', $event)" accept="image/*" />
                  <SystemBlueBtn @click="cardFileInput.click()">파일 선택</SystemBlueBtn>
                  &nbsp;
                  <SystemBlueBtn @click="uploadFile('card')">저장하기</SystemBlueBtn>
                </FlexDiv>
              </td>
            </tr>

            <tr>
              <td colspan="2">
                <FlexDiv>
                  <img :src="filePreview.card || ''" alt="명함 이미지" v-if="filePreview.card" style="max-width: 200px; max-height: 200px;" />
                  <div v-else>명함 이미지가 없습니다</div>
                </FlexDiv>
              </td>
            </tr>

            <tr>
              <td colspan="2"></td>
            </tr>
            <tr>
              <td colspan="2"></td>
            </tr>

            <tr>
              <td colspan="2">
                <FlexDiv>
                  로고 등록하기 &nbsp;
                  <input type="file" ref="logoFileInput" style="display: none" @change="handleFileUpload('logo', $event)" accept="image/*" />
                  <SystemBlueBtn @click="logoFileInput.click()">파일 선택</SystemBlueBtn>
                  &nbsp;
                  <SystemBlueBtn @click="uploadFile('logo')">저장하기</SystemBlueBtn>
                </FlexDiv>
              </td>
            </tr>

            <tr>
              <td colspan="2">
                <FlexDiv>
                  <img :src="filePreview.logo || ''" alt="로고 이미지" v-if="filePreview.logo" style="max-width: 200px; max-height: 200px;" />
                  <div v-else>로고 이미지가 없습니다</div>
                </FlexDiv>
              </td>
            </tr>
            
          </tbody>
        </CompanyTable>
      </SystemContent>

      <SystemContent>
        <SystemTitle>
          <span class="material-icons">groups</span>
          &nbsp;
          대대여 업체 관리
        </SystemTitle>

        <BlueLineBtn @click="openRentalSaveModal">대대여 업체 등록</BlueLineBtn>

        <SystemTable>
          <thead>
            <tr>
              <th>번호</th>
              <th>업체명</th>
              <th>사업자등록번호</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in rentalCompanies" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.cnum }}</td>
              <td>
                <SystemBlueBtn @click="openCompanyInfoModal({ type: 'rental', id: item.id }, '대대여')">상세</SystemBlueBtn>
                <SystemBlueBtn class="redBg" @click="deleteCompany('rental', item.id)">삭제</SystemBlueBtn>
              </td>
            </tr>
            <tr v-if="rentalCompanies.length === 0">
              <td colspan="4">등록된 대대여 업체가 없습니다.</td>
            </tr>
          </tbody>
        </SystemTable>

        <SystemTitle>
          <span class="material-icons">cleaning_services</span>
          &nbsp;
          소독 업체 관리
        </SystemTitle>

        <BlueLineBtn @click="openCleanSaveModal">소독 업체 등록</BlueLineBtn>

        <SystemTable>
          <thead>
            <tr>
              <th>번호</th>
              <th>업체명</th>
              <th>사업자등록번호</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cleanCompanies" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.bnum }}</td>
              <td>
                <SystemBlueBtn @click="openCompanyInfoModal({ type: 'clean', id: item.id }, '소독')">상세</SystemBlueBtn>
                <SystemBlueBtn class="redBg" @click="deleteCompany('clean', item.id)">삭제</SystemBlueBtn>
              </td>
            </tr>
            <tr v-if="cleanCompanies.length === 0">
              <td colspan="4">등록된 소독 업체가 없습니다.</td>
            </tr>
          </tbody>
        </SystemTable>

        <SystemTitle>
          <span class="material-icons">settings</span>
          &nbsp;
          프로그램 설정 
        </SystemTitle>

        <CompanyTable>
          <thead>
            <tr>
              <td colspan="2">
                <label>
                  <input type="checkbox" v-model.number="userOptions.optionPhone" @change="putUserOption('optionPhone', userOptions.optionPhone)" />
                  계약시 번호 없음
                </label>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="2">
                <label>
                  <input type="checkbox" v-model.number="userOptions.optionLookup" @change="putUserOption('optionLookup', userOptions.optionLookup)" />
                  공단창 동시 조회
                </label>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <label>
                  <input type="checkbox" />
                  공단계약시 계약서 문자 자동발송
                </label>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <label>
                  <input type="checkbox" />
                  가상계좌 미납시 문자 자동발송
                </label>
              </td>
            </tr>
          </tbody>
        </CompanyTable>

        <SystemTitle>
          <span class="material-icons">account_circle</span>
          &nbsp;
          더빌 CMS 계정
        </SystemTitle>

        <CompanyTable>
          <thead>
            <tr>
              <th>아이디 : </th>
              <td>
                <input type="text" placeholder="아이디를 입력하세요." />
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>API KEY : </th>
              <td>
                <input type="password" placeholder="API KEY를 입력하세요." />
              </td>
            </tr>
          </tbody>
        </CompanyTable>
      </SystemContent>

      <SystemContent>
        <SystemTitle>
          <span class="material-icons">store</span>
          &nbsp;
          도매 업체 관리
        </SystemTitle>

        <BlueLineBtn @click="openWholesaleSaveModal">도매 업체 등록</BlueLineBtn>

        <SystemTable>
          <thead>
            <tr>
              <th>번호</th>
              <th>업체명</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in wholesaleCompanies" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>
                <SystemBlueBtn @click="openLoginSaveModal(item)">로그인 정보</SystemBlueBtn>
                <SystemBlueBtn class="redBg" @click="deleteCompany('wholesale', item.id)">삭제</SystemBlueBtn>
              </td>
            </tr>
            <tr v-if="wholesaleCompanies.length === 0">
              <td colspan="3">등록된 도매 업체가 없습니다.</td>
            </tr>
          </tbody>
        </SystemTable>

        <SystemTitle>
          <span class="material-icons">share</span>
          &nbsp;
          공유 업체 관리
        </SystemTitle>

        <!-- <BlueLineBtn @click="openShareSaveModal">공유 업체 등록/요청</BlueLineBtn> -->

        <SystemTable>
          <thead>
            <tr>
              <th>상태</th>
              <th>업체</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="(item, index) in 4" :key="index">
              <td class="green">승인</td>
              <td>공유 업체</td>
              <td class="red">
                삭제
              </td>
            </tr> -->
            
          </tbody>
        </SystemTable>

        <SystemTitle>
          <span class="material-icons">description</span>
          &nbsp;
          문서24 계정
        </SystemTitle>

        <CompanyTable>
          <thead>
            <tr>
              <th>아이디 : </th>
              <td>
                <input type="text" placeholder="아이디를 입력하세요." />
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>비밀번호 : </th>
              <td>
                <input type="password" placeholder="비밀번호를 입력하세요." />
              </td>
            </tr>
          </tbody>
        </CompanyTable>
      </SystemContent>
    </FlexTopDiv>
  </div>
</template>

<script>
import * as PublicCss from '@/assets/styles/public.js';
import * as ModalSystemCss from '@/assets/styles/system/ModalSystemCss.js';
import ModalPage from '@/components/modal/ModalPage.vue';
import ModalManager from '@/components/modal/system/ModalManager.vue';
import Swal from 'sweetalert2';
import { getUserList, getCompanyInfo, updateCompanyInfo, uploadCompanyFile, getCompanyFile, createSystemCompany, deleteSystemCompany, getSystemCompany, getSystemCompanyList } from '@/api/system';
import { getUserOption, updateUserOption, checkAdmin } from '@/api/user';
import { ref, onMounted, reactive } from 'vue';

export default {
  name: 'ModalSystem',
  components: {
    ...PublicCss,
    ...ModalSystemCss,
    ModalPage,
    ModalManager,
  },
  props: {
    show: Boolean,
    source: {
      type: String,
      default: ''
    }
  },
  emits: ['close'],
  setup() {
    /*===============================================
    담당자 관리 모달 관련 변수, 관리창 on/off
    ===============================================*/
    const showMangerModal = ref(false);
    const modal_height = ref("50%");
    const modal_width = ref("25%");
    const manageType = ref('Add');
    const managerData = ref({});
    const isAdmin = ref(false);

    const checkAdminFn = async () => {
      try {
      const id = JSON.parse(localStorage.getItem('user')).id;
      const response = await checkAdmin(id);
      if (response.role === 'admin') {
        isAdmin.value = true;
      }
    } catch (error) {
      console.error('관리자인지 확인 중 오류 발생:', error);
      return false;
    }
  }

    const openMangerModal = (type, data) => {
      if (!isAdmin.value) {
        return;
      }
      manageType.value = type;
      if (type == 'Add') {
        // managerData.value를 초기화
        managerData.value = {
          companyId: parseInt(JSON.parse(localStorage.getItem('user')).companyId),
          name: '',
          userName: '',
          pw: '',
          department: '사원',
          role: '',
          email: '',
          phone: '',
          bankInfo: '',
        };
      } else {
        managerData.value = data;
        managerData.value.pw = '';
      }
      showMangerModal.value = true;
    };

    /*===============================================
    담당자 목록 조회 시작
    ===============================================*/
    const userList = ref([]);
    const userListPage = ref(1);
    const userListPerPage = ref(10);
    const userListTotal = ref(0);
    const userListTotalPage = ref(0);
    const userListLoading = ref(false);
    const userListError = ref(null);
    const fetchUserList = async () => {
      try {
        userListLoading.value = true;
        const response = await getUserList({
          page: userListPage.value,
          perPage: userListPerPage.value
        });
        userList.value = response.items;
        userListTotal.value = response.total;
        userListTotalPage.value = response.totalPage;
      } catch (error) {
        userListError.value = error;
      } finally {
        userListLoading.value = false;
      }
    }
    /*===============================================
    담당자 목록 조회 끝
    ===============================================*/

    /*===============================================
    회사 정보 조회 시작
    ===============================================*/
    const companyInfo = ref({});
    const companyInfoLoading = ref(false);
    const companyInfoError = ref(null);
    const fetchCompanyInfo = async () => {
      try {
        companyInfoLoading.value = true;
        const response = await getCompanyInfo();
        console.log(response);
        companyInfo.value = response.items;
        
        // 이미지 URL이 있으면 미리보기에 설정
        if (response.items.stampUrl) filePreview.stamp = response.items.stampUrl;
        if (response.items.cardUrl) filePreview.card = response.items.cardUrl;
        if (response.items.logoUrl) filePreview.logo = response.items.logoUrl;
      } catch (error) {
        companyInfoError.value = error;
      } finally {
        companyInfoLoading.value = false;
      }
    }
    /*===============================================
    회사 정보 조회 끝
    ===============================================*/

    /*===============================================
    회사 정보 업데이트 시작
    ===============================================*/
    const handleCompanyInfoUpdate = async (key, value) => {
      try {
        companyInfoLoading.value = true;
        const response = await updateCompanyInfo({ [key]: value });
        console.log(response);
      } catch (error) {
        companyInfoError.value = error;
      } finally {
        companyInfoLoading.value = false;
      }
    }
    
    /*===============================================
    사용자 옵션 관리 시작
    ===============================================*/
    // 사용자 옵션 상태 관리
    const userOptions = reactive({
      optionPhone: 0,
      optionLookup: 0
    });
    
    // 사용자 정보 가져오기
    const fetchUserOptions = async () => {
      try {
        const response = await getUserOption();
        if (response && response.items) {
          // 0, 1 값을 boolean으로 변환
          userOptions.optionPhone = response.items.optionPhone === 1;
          userOptions.optionLookup = response.items.optionLookup === 1;
        }
      } catch (error) {
        console.error('사용자 옵션 정보를 가져오는 중 오류 발생:', error);
      }
    };
    
    // 사용자 옵션 업데이트
    const putUserOption = async (key, value) => {
      try {
        // boolean 값을 0, 1로 변환
        const numericValue = value ? 1 : 0;
        const userData = {[key]: numericValue};
        
        // 로딩 표시
        Swal.fire({
          title: '설정 저장 중...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        
        const response = await updateUserOption(userData);
        
        if (response && response.success) {
          Swal.fire({
            icon: 'success',
            title: '설정이 저장되었습니다',
            showConfirmButton: false,
            timer: 1500
          });
        }
      } catch (error) {
        console.error(`사용자 옵션 업데이트 중 오류 발생:`, error);
        Swal.fire({
          icon: 'error',
          title: '설정 저장 실패',
          text: '옵션을 저장하는 중 오류가 발생했습니다.'
        });
      }
    };
    /*===============================================
    사용자 옵션 관리 끝
    ===============================================*/

    /*===============================================
    파일 업로드 관리 시작
    ===============================================*/
    // 파일 참조 생성
    const stampFileInput = ref(null);
    const cardFileInput = ref(null);
    const logoFileInput = ref(null);
    
    // 파일 객체 저장
    const files = reactive({
      stamp: null,
      card: null,
      logo: null
    });
    
    // 파일 미리보기 URL
    const filePreview = reactive({
      stamp: '',
      card: '',
      logo: ''
    });
    
    // 파일 선택 처리
    const handleFileUpload = (type, event) => {
      console.log(event.target.files[0]);
      const file = event.target.files[0];
      if (!file) return;
      
      // 파일 크기 제한 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: '파일 크기 초과',
          text: '파일 크기는 5MB 이하여야 합니다.'
        });
        return;
      }
      
      // 이미지 파일 타입 확인
      if (!file.type.match('image.*')) {
        Swal.fire({
          icon: 'error',
          title: '잘못된 파일 형식',
          text: '이미지 파일만 업로드 가능합니다.'
        });
        return;
      }
      
      // 파일 객체 저장
      files[type] = file;
      console.log(files[type]);
      // 미리보기 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        filePreview[type] = e.target.result;
      };
      reader.readAsDataURL(file);
    };
    
    // 파일 업로드 처리
    const uploadFile = async (type) => {
      if (!files[type]) {
        Swal.fire({
          icon: 'warning',
          title: '파일 없음',
          text: '먼저 파일을 선택해주세요.'
        });
        return;
      }
      
      try {
        // 로딩 표시
        Swal.fire({
          title: '파일 업로드 중...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        console.log(files[type]);
        const formData = new FormData();
        formData.append('file', files[type]);
        formData.append('type', type);
        const response = await uploadCompanyFile(formData);
        
        if (response && response.success) {
          Swal.fire({
            icon: 'success',
            title: '파일 업로드 성공',
            text: '이미지가 성공적으로 업로드되었습니다.',
            showConfirmButton: false,
            timer: 1500
          });
          
          // 회사 정보 다시 불러오기
          fetchCompanyInfo();
        } else {
          throw new Error('파일 업로드 실패');
        }
      } catch (error) {
        console.error(`파일 업로드 중 오류 발생:`, error);
        Swal.fire({
          icon: 'error',
          title: '파일 업로드 실패',
          text: '파일을 업로드하는 중 오류가 발생했습니다.'
        });
      }
    };
    /*===============================================
    파일 업로드 관리 끝
    ===============================================*/

    /*===============================================
    파일 가져오기 기능
    ===============================================*/
    // 파일 가져오기 함수
    const getCompanyFileFn = async (type) => {
      try {
        // 회사 파일 가져오기 API 호출
        const response = await getCompanyFile(type);
        // 파일 미리보기 업데이트
        console.log(response, type,"getCompanyFileFn");
        filePreview[type] = response.data;
      } catch (error) {
        console.error(`파일 가져오기 중 오류 발생:`, error);
        // Swal.fire({
        //   icon: 'error',
        //   title: `${type} 파일 가져오기 실패`,
        //   text: '파일을 가져오는 중 오류가 발생했습니다.'
        // });
      }
    };
    /*===============================================
    파일 가져오기 기능 끝
    ===============================================*/

    /*===============================================
    업체 관리 기능 시작
    ===============================================*/
    // 업체 목록 상태 관리
    const rentalCompanies = ref([]);
    const cleanCompanies = ref([]);
    const wholesaleCompanies = ref([]);

    // 업체 목록 조회
    const fetchCompanies = async (type) => {
      try {
        // API 호출 예시 (실제 API에 맞게 수정 필요)
        const response = await getSystemCompanyList(type);
        if (type === 'rental') rentalCompanies.value = response.items;
        else if (type === 'clean') cleanCompanies.value = response.items;
        else if (type === 'wholesale') wholesaleCompanies.value = response.items;
        
      } catch (error) {
        console.error(`${type} 업체 목록 조회 중 오류 발생:`, error);
        Swal.fire({
          icon: 'error',
          title: '업체 목록 조회 실패',
          text: '업체 목록을 가져오는 중 오류가 발생했습니다.'
        });
      }
    };

    // 업체 등록
    const registerCompany = async (type, data) => {
      try {
        await createSystemCompany(type, data);
        
        if (type === 'rental') {
          const newId = rentalCompanies.value.length > 0 ? Math.max(...rentalCompanies.value.map(c => c.id)) + 1 : 1;
          rentalCompanies.value.push({ id: newId, ...data });
        } else if (type === 'clean') {
          const newId = cleanCompanies.value.length > 0 ? Math.max(...cleanCompanies.value.map(c => c.id)) + 1 : 1;
          cleanCompanies.value.push({ id: newId, ...data });
        } else if (type === 'wholesale') {
          const newId = wholesaleCompanies.value.length > 0 ? Math.max(...wholesaleCompanies.value.map(c => c.id)) + 1 : 1;
          wholesaleCompanies.value.push({ id: newId, ...data });
        }
        
        Swal.fire({
          icon: 'success',
          title: '업체 등록 성공',
          text: '업체가 성공적으로 등록되었습니다.',
          showConfirmButton: false,
          timer: 1500
        });
      } catch (error) {
        console.error(`${type} 업체 등록 중 오류 발생:`, error);
        Swal.fire({
          icon: 'error',
          title: '업체 등록 실패',
          text: '업체를 등록하는 중 오류가 발생했습니다.'
        });
      }
    };
    // 대대여 업체 등록 모달창
    const openRentalSaveModal = () => {
      Swal.fire({
        title: '대대여 업체 등록',
        html: `
          <input type="text" placeholder="업체명 입력" id="swal-input1"/> 
          <br /><br /> 
          <input type="text" placeholder="업체 사업자등록번호 입력" id="swal-input2"/>
        `,
        showCancelButton: true,
        confirmButtonText: '저장',
        cancelButtonText: '취소',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(result.value);
          registerCompany('rental', { name: document.getElementById('swal-input1').value, cnum: document.getElementById('swal-input2').value });
        }
      });
    };

    // 도매 업체 등록 모달창
    const openWholesaleSaveModal = () => {
      Swal.fire({
        title: '도매 업체 등록',
        html: `
          <input type="text" placeholder="업체명을 입력하세요." id="swal-input1"/> 
        `,
        showCancelButton: true,
        confirmButtonText: '저장',
        cancelButtonText: '취소',
      }).then((result) => {
        if (result.isConfirmed) {
          registerCompany('wholesale', { name: document.getElementById('swal-input1').value });
        }
      });
    };

    // 소독 업체 등록 모달창
    const openCleanSaveModal = () => {
      Swal.fire({
        title: '소독 업체 등록',
        html: `
          <input type="text" placeholder="업체명을 입력하세요." id="swal-input1"/> 
          <br /><br /> 
          <input type="text" placeholder="업체 사업자등록번호를 입력하세요." id="swal-input2"/>
        `,
        showCancelButton: true,
        confirmButtonText: '저장',
        cancelButtonText: '취소',
      }).then((result) => {
        if (result.isConfirmed) {
          registerCompany('clean', { name: document.getElementById('swal-input1').value, bnum: document.getElementById('swal-input2').value });
        }
      });
    };

    // 공유 업체 등록/요청 모달창
    const openShareSaveModal = () => {
      Swal.fire({
        title: '공유 업체 등록/요청',
        html: `
          <input type="text" placeholder="업체명 또는 기관기호를 입력하세요." /> 
        `,
        showCancelButton: true,
        confirmButtonText: '저장',
        cancelButtonText: '취소',
      });
    };

    // 로그인 정보 입력
    const openLoginSaveModal = () => {
      Swal.fire({
        title: '로그인 정보 입력',
        html: `
          <input type="text" id="login-id" class="swal2-input" placeholder="아이디를 입력하세요." /> 
          <br />
          <div style="position: relative; display: flex; align-items: center; margin-top: 10px;">
            <input type="password" id="login-password" class="swal2-input" placeholder="비밀번호를 입력하세요." style="width: 100%;" />
            <span class="material-icons" id="toggle-password" style="position: absolute; right: 10px; cursor: pointer; color: #666;">
              visibility_off
            </span>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: '저장',
        cancelButtonText: '취소',
        didOpen: () => {
          const toggleBtn = document.getElementById('toggle-password');
          const passwordInput = document.getElementById('login-password');
          
          if (toggleBtn && passwordInput) {
            toggleBtn.addEventListener('click', () => {
              if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleBtn.textContent = 'visibility';
              } else {
                passwordInput.type = 'password';
                toggleBtn.textContent = 'visibility_off';
              }
            });
          }
        }
      });
    };

    // 업체 정보 모달창
    const openCompanyInfoModal = (info, title) => {
      Swal.fire({
        title: title + ' 업체 정보',
        html: `
          <label>사업자등록번호</label>
          <input type="text" placeholder="업체명을 입력하세요." id="swal-input1"/>
          <br /><br />
          <label>소독작업원 성명</label>
          <input type="text" placeholder="업체 사업자등록번호를 입력하세요." id="swal-input2"/>
          <br /><br />
          <label>직인 등록</label>
          <button class="blueBtn">파일 선택</button>
          <button class="blueBtn">직인 저장</button>
        `,
        showCancelButton: true,
        confirmButtonText: '저장',
        cancelButtonText: '취소',
        didOpen: () => {
          getSystemCompany(info.type, info.id).then((res) => {
            document.getElementById('swal-input1').value = res.items.name;
            document.getElementById('swal-input2').value = res.items.cnum;
          });
        }
      });
    };

    // 업체 삭제
    const deleteCompany = async (type, id) => {
      await deleteSystemCompany(type, id).then((res) => {
        if(res.success) {
          Swal.fire({
            icon: 'success',
            title: '업체 삭제 성공',
          });
          fetchCompanies(type);
        }
      });
    };

    /*===============================================
    업체 관리 기능 기능 끝
    ===============================================*/

    const openDaumPostcode = async (type) => {
      await loadDaumPostcodeScript();
      
      const width = 500;  // 팝업 창 너비
      const height = 600; // 팝업 창 높이
      const left = Math.ceil((window.innerWidth - width) / 2);  // 화면 가로 중앙 위치
      const top = Math.ceil((window.innerHeight - height) / 2); // 화면 세로 중앙 위치
      new window.daum.Postcode({
        oncomplete: (data) => {
          if(type == 1){
            companyInfo.value.address = data.address;
            handleCompanyInfoUpdate('address', data.address);
          }
        },
        width: width,
        height: height,
        left: left,
        top: top
      }).open();
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

    onMounted(async () => {
      await checkAdminFn();
      fetchUserList();
      fetchCompanyInfo();
      fetchUserOptions(); // 사용자 옵션 정보 가져오기
      await getCompanyFileFn('stamp');
      await getCompanyFileFn('card');
      await getCompanyFileFn('logo');
      await fetchCompanies('rental');
      await fetchCompanies('clean');
      await fetchCompanies('wholesale');
    });

    return {
      openRentalSaveModal,
      openWholesaleSaveModal,
      openCleanSaveModal,
      openShareSaveModal,
      openLoginSaveModal,
      openCompanyInfoModal,
      openDaumPostcode,
      fetchUserList,
      fetchCompanyInfo,
      userList,
      userListPage,
      userListPerPage,
      userListTotal,
      userListTotalPage,
      userListLoading,
      userListError,
      companyInfo,
      companyInfoLoading,
      companyInfoError,
      handleCompanyInfoUpdate,
      // 사용자 옵션 관련 변수 및 함수
      userOptions,
      fetchUserOptions,
      putUserOption,
      // 파일 업로드 관련 변수 및 함수
      files,
      filePreview,
      handleFileUpload,
      uploadFile,
      stampFileInput,
      cardFileInput,
      logoFileInput,
      // 업체 관리 관련 변수 및 함수
      rentalCompanies,
      cleanCompanies,
      wholesaleCompanies,
      deleteCompany,
      // 담당자 추가 관련 변수 및 함수
      showMangerModal,
      modal_height,
      modal_width,
      manageType,
      managerData,
      isAdmin,
      checkAdminFn,
      openMangerModal,
    };
  },
};
</script>
