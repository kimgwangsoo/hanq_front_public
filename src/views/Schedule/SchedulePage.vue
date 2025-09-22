<template>
  <!-- Modals -->

  <!-- 대여연장관리 / 기초미연장 / 대여중지 모달창 : 대여관리 모달창 -->
  <ModalPage v-model:show="showModalRentDetail" 
  :height="'78%'" :width="'90%'" 
  :parent="'schedule'">
    <ModalRentDetail :show="showModalRentDetail" 
    @update:show="showModalRentDetail = $event"
    @close="showModalRentDetail = false"
    :rentItem="selectedRentItem"
    @goOrderModifyPage="handleMoneyItemClick(selectedRentItem.order)"
    /> 
  </ModalPage>

  <!-- 대여연장관리 / 대여중지 모달창 : 연장내역 창 -->
  <ModalPage v-model:show="showModalRentExtension" 
  :height="'78%'" :width="'100%'" 
  :parent="'schedule'">
    <ModalRentExtension :show="showModalRentExtension" 
    @update:show="showModalRentExtension = $event"
    @close="showModalRentExtension = false" />
  </ModalPage>

  <!-- 기초미연장 모달창 : 기초 이용내역서 출력 창 -->
  <ModalPage v-model:show="showModalZeroUsage" 
  :height="'78%'" :width="'100%'" 
  :parent="'schedule'">
    <ModalZeroUsage :show="showModalZeroUsage" 
    @update:show="showModalZeroUsage = $event"
    @close="showModalZeroUsage = false" />
</ModalPage>

  <!-- 미계약 모달창 : 주문서 수정창 -->
  <ModalPage v-model:show="showModalMoneyDetail" 
  :height="'78%'" :width="'100%'" 
  :parent="'schedule'">
    <ModalMoneyDetail :show="showModalMoneyDetail" 
    @update:show="showModalMoneyDetail = $event"
    @close="showModalMoneyDetail = false" 
    :orderId="selectedMoneyItem.id"
    />
  </ModalPage>

  <MainContainer>
    <TitleArea>
      <TitleIcon>
        <span class="material-icons">pending_actions</span>
      </TitleIcon>
      <TitleText>
        한방에 큐 
      </TitleText>
    </TitleArea>

    <SContainer>
      <SGridContainer>
        <!-- 첫 번째 행 -->
        <SGridRow>
          <!-- 첫 번째 열: 대여 연장 관리 -->
          <SectionContainer>
            <div class="header">
              <FlexDiv>
                <SWhiteBtn class="marginRight10">선택일괄연장</SWhiteBtn>
                <SSubTitle>
                  <i class="material-icons">more_time</i>
                  <div>대여연장관리</div>
                  <div class="personCnt">[{{ rentCount }}]명</div>
                  <SBtn class="blueBg marginRight10" @click="showModalRentExtension = true">연장내역</SBtn>
                </SSubTitle>
                <div>
                  <SSearchInput 
                    placeholder="수급자 검색 Enter" 
                  />
                </div>

                <DateSearch>
                  <input type="date" v-model="dateRange.start">
                  &nbsp;~&nbsp;
                  <input type="date" v-model="dateRange.end">
                  <SWhiteBtn class="marginLeft10" @click="loadRentItems">
                    <i class="material-icons">search</i>
                  </SWhiteBtn>
                </DateSearch>
              </FlexDiv>
            </div>

            <STableContainer>
              <STable>
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>수급자</th>
                    <th>인정번호</th>
                    <th>연락처</th>
                    <th>품목명</th>
                    <th>담당자</th>
                    <th>계약시작일</th>
                    <th>계약종료일</th>
                    <th>내구연한<br/>만료일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="item in rentItems" 
                    :key="item.id" 
                    @click="handleRentItemClick(item)"
                  >
                    <td><input type="checkbox" :value="item.id"></td>
                    <td>{{ item.order.client.name }}</td>
                    <td>{{ item.order.client.number }}</td>
                    <td>{{ item.order.client.phone }}</td>
                    <td>{{ item.order.orderProducts[0].product.pname }}</td>
                    <td>{{ item.order.client.manager }}</td>
                    <td>{{ item.rentStart }}</td>
                    <td>{{ item.rentEnd }}</td>
                    <td></td>
                  </tr>
                </tbody>
              </STable>
            </STableContainer>
          </SectionContainer>
          
          <!-- 두 번째 열: 기초 미연장 (이전에는 미계약 관리였음) -->
          <SectionContainer>
            <div class="header">
              <FlexDiv>
                <SBtn class="blueBg marginRight10" @click="showModalZeroUsage = true">기초 이용내역서 출력</SBtn>
                <SSubTitle>
                  <i class="material-icons">emoji_people</i>
                  <div>기초미연장</div>
                  <div class="personCnt">[{{ zeroCount }}]명</div>
                  <SBtn class="greenBg marginRight10">엑셀변환</SBtn>
                </SSubTitle>
                <div>
                  <SSearchInput 
                    placeholder="수급자 검색 Enter" 
                  />
                </div>
              </FlexDiv>
            </div>

            <STableContainer>
              <STable>
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>수급자</th>
                    <th>인정번호</th>
                    <th>연락처</th>
                    <th>품목명</th>
                    <th>담당자</th>
                    <th>계약시작일</th>
                    <th>계약종료일</th>
                    <th>내구연한<br/>만료일</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="item in zeroItems" 
                    :key="item.id" 
                    @click="handleRentItemClick(item)"
                  >
                    <td><input type="checkbox" :value="item.id"></td>
                    <td>{{ item.order.client.name }}</td>
                    <td>{{ item.order.client.number }}</td>
                    <td>{{ item.order.client.phone }}</td>
                    <td>{{ item.order.orderProducts[0].product.pname }}</td>
                    <td>{{ item.order.client.manager }}</td>
                    <td>{{ item.rentStart }}</td>
                    <td>{{ item.rentEnd }}</td>
                    <td></td>
                  </tr>
                </tbody>
              </STable>
            </STableContainer>
          </SectionContainer>
        </SGridRow>

        <!-- 두 번째 행 -->
        <SGridRow>
          <!-- 첫 번째 열: 미계약 -->
          <SectionContainer>
            <div class="header">
              <FlexDiv>
                <SWhiteBtn class="marginRight10">선택일괄계약</SWhiteBtn>
                <SSubTitle>
                  <i class="material-icons">money_off_csred</i>
                  <div>미계약</div>
                  <div class="personCnt">[{{ moneyCount }}]명</div>
                  <SBtn class="greenBg marginRight10">엑셀변환</SBtn>
                </SSubTitle>
                <div>
                  <SSearchInput 
                    placeholder="수급자 검색 Enter" 
                  />
                </div>

                <DateSearch>
                  <input type="date" v-model="moneyDateRange.start">
                  &nbsp;~&nbsp;
                  <input type="date" v-model="moneyDateRange.end">
                  <SWhiteBtn class="marginLeft10" @click="loadMoneyItems">
                    <i class="material-icons">search</i>
                  </SWhiteBtn>
                </DateSearch>
              </FlexDiv>
            </div>

            <STableContainer>
              <STable>
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>수급자</th>
                    <th>품목명</th>
                    <th>계약시작일</th>
                    <th>담당자</th>
                    <th>배송상태</th>
                    <th>계약여부</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="item in moneyItems" 
                    :key="item.id" 
                    @click="handleMoneyItemClick(item)"
                  >
                    <td><input type="checkbox" :value="item.id"></td>
                    <td>{{ item.client.name }}</td>
                    <td>{{ item.orderProducts[0].product.pname }}</td>
                    <td>{{ item.orderDate }}</td>
                    <td>{{ item.manager }}</td>
                    <td>{{ 
                      item.deliveryState === '0' ? '배송대기' : 
                      item.deliveryState === '1' ? '배송완료' : 
                      item.deliveryState === '2' ? '회수중' : 
                      item.deliveryState === '3' ? '회수완료' : 
                      item.deliveryState 
                    }}</td>
                    <td class="redFont">
                      <i class="material-icons">close</i>
                    </td>
                  </tr>
                </tbody>
              </STable>
            </STableContainer>
          </SectionContainer>
          
          <!-- 두 번째 열: 대여중지 -->
          <SectionContainer>
            <div class="header">
              <FlexDiv>
                <SSubTitle>
                  <i class="material-icons">stop_circle</i>
                  <div>대여중지</div>
                  <div class="personCnt">[]명</div>
                  <SBtn class="greenBg marginRight10" @click="showModalRentExtension = true">엑셀변환</SBtn>
                </SSubTitle>
                <div>
                  <SSearchInput 
                    placeholder="수급자 검색 Enter" 
                  />
                </div>
              </FlexDiv>
            </div>

            <STableContainer>
              <STable>
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>수급자</th>
                    <th>인정번호</th>
                    <th>대상</th>
                    <th>품목명</th>
                    <th>중지일</th>
                    <th>사유</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="item in stopItems" 
                    :key="item.id" 
                    @click="showModalRentDetail = true"
                  >
                    <td><input type="checkbox" :value="item.id"></td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.number }}</td>
                    <td>{{ item.target }}</td>
                    <td>{{ item.productName }}</td>
                    <td>{{ item.stopDate }}</td>
                    <td>{{ item.reason }}</td>
                  </tr>
                </tbody>
              </STable>
            </STableContainer>
          </SectionContainer>
        </SGridRow>
      </SGridContainer>
    </SContainer>
    
    <!-- 팝업 및 iframe 영역 -->
    <RentAddIframe id="rent_add_iframe" name="rent_add_iframe" src="/rentaddiframe" frameborder="0"></RentAddIframe>
  </MainContainer>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import * as ScheduleCss from '@/assets/styles/schedule/ScheduleCss'
import * as PublicCss from '@/assets/styles/public.js'
import * as BaseOrderTemplateCss from '@/assets/styles/BaseOrderTemplateCss.js' 
import ModalPage from '@/components/modal/ModalPage.vue'
import ModalRentDetail from '@/components/modal/rentDetail/ModalRentDetail.vue'
import ModalMoneyDetail from '@/components/OrderModifyPage.vue'
import ModalZeroUsage from '@/components/modal/schedule/ModalZeroUsage.vue' 
import ModalRentExtension from '@/components/modal/schedule/ModalRentExtension.vue'
import { getRentList } from '@/api/rent'
import { getOrders } from '@/api/order'
import Datepicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';

export default {
  name: 'SchedulePage',
  components: {
    ...ScheduleCss,
    ...PublicCss,
    ...BaseOrderTemplateCss,
    ModalPage,
    ModalRentDetail,
    ModalZeroUsage,
    ModalRentExtension,
    ModalMoneyDetail,
  },
  setup() {
    // 데이터 정의
    const showModalRentDetail = ref(false)
    const showModalZeroUsage = ref(false)
    const showModalRentExtension = ref(false)
    const showModalMoneyDetail = ref(false)
    const rentCount = ref(0)
    const zeroCount = ref(0)
    const moneyCount = ref(0)
    const stopCount = ref(0)
    
    const dateRange = reactive({
      start: formatToday('first'),
      end: formatToday('last')
    })
    
    const moneyDateRange = reactive({
      start: formatToday('first'),
      end: formatToday('last')
    })

    // 샘플 데이터
    const rentItems = ref([])
    const zeroItems = ref([])
    const moneyItems = ref([])
    const stopItems = ref([])
    
    // 대여 상세 데이터
    const selectedRentItem = ref(null)
    const handleRentItemClick = (item) => {
      selectedRentItem.value = item
      showModalRentDetail.value = true
    }

    // 미계약 상세 데이터
    const selectedMoneyItem = ref(null)
    const handleMoneyItemClick = (item) => {
      selectedMoneyItem.value = item
      showModalMoneyDetail.value = true
    }

    // 유틸리티 함수
    function formatToday(type) {
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      
      let day
      if (type === 'first') {
        day = '01' // 매월 1일
      } else if (type === 'last') {
        // 해당 월의 마지막 날짜 구하기
        const lastDay = new Date(year, today.getMonth() + 1, 0).getDate()
        day = String(lastDay).padStart(2, '0') // 매월 말일
      } else {
        day = String(today.getDate()).padStart(2, '0') // 기본값은 오늘 날짜
      }
      
      return `${year}-${month}-${day}`
    }
    
    // 메서드 정의
    
    // 데이터 로드 함수
    const loadRentItems = async () => {
      // API 호출 
      const response = await getRentList({
        page: 1,
        limit: 9999,
        rentStart: dateRange.start,
        rentEnd: dateRange.end,
        rentStatus: 'y',
        target: ['일반', '감경']
      });
      rentItems.value = response.items;
      rentCount.value = response.items.length;
      loadZeroItems();
    }
    
    const loadZeroItems = async () => {
      const response = await getRentList({
        page: 1,
        limit: 9999,
        rentStart: dateRange.start,
        rentEnd: dateRange.end,
        rentStatus: 'y',
        target: ['기초', '의료급여']
      });
      zeroItems.value = response.items;
      zeroCount.value = response.items.length;
    }
    
    const loadMoneyItems = async () => {
      const response = await getOrders({
          page: 1,
          sdate: moneyDateRange.start,
          edate: moneyDateRange.end,
          limit: 99999,
          search: '',
          contractStatus: 'n'
        });
      moneyItems.value = response.items;
      moneyCount.value = response.items.length;
    }
    
    const loadStopItems = () => {
      stopItems.value = [
      ]
      stopCount.value = stopItems.value.length
    }
    
    // 컴포넌트 마운트 시 초기 데이터 로드
    onMounted(() => {
      loadRentItems()
      loadZeroItems()
      loadMoneyItems()
      loadStopItems()
    })

    return {
      showModalRentDetail,
      showModalZeroUsage,
      showModalRentExtension,
      showModalMoneyDetail,
      rentCount,
      zeroCount,
      moneyCount,
      stopCount,
      dateRange,
      moneyDateRange,
      rentItems,
      zeroItems,
      moneyItems,
      stopItems,
      selectedRentItem,
      handleRentItemClick,
      selectedMoneyItem,
      handleMoneyItemClick,
      loadRentItems,
      loadZeroItems,
      loadMoneyItems,
      Datepicker
    }
  }
}
</script>
