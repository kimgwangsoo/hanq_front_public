<template>
  <!-- Modals -->
  <ModalPage v-model:show="showModalPersonErr" 
  :height="'60%'" 
  :width="'60%'" :parent="'bdoriginalclaim'">
    <ModalPersonErr :show="showModalPersonErr" 
    @update:show="showModalPersonErr = $event"
    @cancel="showModalPersonErr = false" 
    @close="showModalPersonErr = false"  />
  </ModalPage>

  <ModalPage v-model:show="showModalMoneyErr" 
  :height="'60%'" 
  :width="'60%'" :parent="'bdoriginalclaim'">
    <ModalMoneyErr :show="showModalMoneyErr" 
    @update:show="showModalMoneyErr = $event"
    @cancel="showModalMoneyErr = false" 
    @close="showModalMoneyErr = false"  />
  </ModalPage>

  <ModalPage v-model:show="showModalNotClaimErr" 
  :height="'60%'" 
  :width="'60%'" :parent="'bdoriginalclaim'">
    <ModalNotClaimErr :show="showModalNotClaimErr" 
    @update:show="showModalNotClaimErr = $event"
    @cancel="showModalNotClaimErr = false" 
    @close="showModalNotClaimErr = false"  />
  </ModalPage>

  <BDMainContainer>
    <BDHeaderTitle>
      <i class="material-icons">credit_card</i> &nbsp;
      원청구
    </BDHeaderTitle>

    <BDBanner>
      <select v-model="selectedMonth" @change="changeMonth" style="width: 50px; height: 30px; border: 1px solid #ccc; border-radius: 5px; margin-right: 10px; font-size: 20px;">
        <option v-for="month in 12" :key="month" :value="month" :selected="month === selectedMonth">
          {{ month }}
        </option>
      </select>
      월 청구대상자 목록
    </BDBanner>

    <FlexTopDiv class="width100">
      <div class="width50 marginRight10">
        <FlexBetween>
          <div></div>
          <FlexDiv>
            <BDSubTitle>
              ■ 대상자 
            </BDSubTitle>
            <GreenBtn class="marginLeft10">엑셀변환</GreenBtn>
          </FlexDiv>
          <div>
            <CommonInput />
          </div>
        </FlexBetween>
        <BDOCTableContainer>
          <BDOCTable>
            <thead>
              <tr>
                <th>번호</th>
                <th>성명</th>
                <th>생년월일</th>
                <th>인정번호</th>
                <th>등급</th>
                <th>구분</th>
                <th>감경구분</th>
                <th>금액</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in 100" :key="i">
                <td>{{ i }}</td>
                <td>홍길동</td>
                <td>1990-01-01</td>
                <td>L1234567890</td>
                <td>4등급</td>
                <td>일반</td>
                <td>15%</td>
                <td>{{ formatPrice(10000) }}원</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="8">
                  <FlexLeft>
                  ■ 건수 : 
                  <BDOCCount>1000명</BDOCCount>

                  <BDOCBtn @click="showModalPersonErr = true">청구대상오류 <div class="count">7</div> </BDOCBtn>
                  <BDOCBtn @click="showModalMoneyErr = true">청구금액오류 <div class="count">10</div> </BDOCBtn>
                </FlexLeft>
                </td>
              </tr>
              <tr>
                <td colspan="8">
                  <FlexLeft>
                    ■ 장기요양급여비용총액 : <BDOCCount> 134,698,170원</BDOCCount>
                  </FlexLeft>
                </td>
              </tr>
            </tfoot>
          </BDOCTable>
        </BDOCTableContainer>
      </div>

      <div class="width50 marginLeft10">
        <FlexBetween>
          <div></div>
          <FlexDiv>
            <BDSubTitle>
              ■ 청구 결과 내역 
            </BDSubTitle>
            <GreenBtn class="marginLeft10">엑셀변환</GreenBtn>
          </FlexDiv>
          <div>
            <CommonInput />
          </div>
        </FlexBetween>
        <BDOCTableContainer>
          <BDOCTable>
            <thead>
              <tr>
                <th>번호</th>
                <th>성명</th>
                <th>인정번호</th>
                <th>감경구분</th>
                <th>청구금액</th>
                <th>총액</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in 100" :key="i" >
                <td>{{ i }}</td>
                <td>홍길동</td>
                <td>L1234567890</td>
                <td>15%</td>
                <td>{{ formatPrice(10000) }}원</td>
                <td>{{ formatPrice(10000) }}원</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="6">
                  <FlexLeft>
                    ■ 건수 : 
                    <BDOCCount>1000명</BDOCCount>
                  </FlexLeft>
                </td>
              </tr>
              <tr>
                <td colspan="6">
                  <FlexLeft>
                    ■ 장기요양급여비용총액 :
                    <BDOCCount> 134,698,170원</BDOCCount>
                      *미청구금액 미포함
                  </FlexLeft>
                </td>
              </tr>
              <tr>
                <td colspan="6">
                  <FlexLeft>
                    ■ 청구액 : 
                    <BDOCCount> 134,698,170원</BDOCCount>
                  </FlexLeft>
                </td>
              </tr>
              <tr>
                <td colspan="6">
                  <FlexLeft>
                    ■ 미청구 : 
                    <BDOCCount> <span class="redFont">7</span> 건</BDOCCount>
                    <BDOCBtn @click="showModalNotClaimErr = true">내용 확인</BDOCBtn>
                  </FlexLeft>
                </td>
              </tr>
            </tfoot>
          </BDOCTable>
        </BDOCTableContainer>
      </div>
    </FlexTopDiv>

    <FlexDiv>
      <BDOCSubmitBtn>
        <i class="material-icons">payments</i> &nbsp;
        청구하기
      </BDOCSubmitBtn>
    </FlexDiv>


    </BDMainContainer>
</template>

<script>
import { ref } from 'vue'
import * as PublicCss from '@/assets/styles/public.js'
import * as BillDashboardCss from '@/assets/styles/billDashboard/BillDashboardCss.js'
import ModalPage from '@/components/modal/ModalPage.vue'
import ModalPersonErr from '@/components/modal/billDashboard/ModalPersonErr.vue'
import ModalMoneyErr from '@/components/modal/billDashboard/ModalMoneyErr.vue'
import ModalNotClaimErr from '@/components/modal/billDashboard/ModalNotClaimErr.vue'
import { formatPrice } from '@/utils/format.js'

export default ({
  name: 'BDOriginalClaim',
  components: {
    ...PublicCss,
    ...BillDashboardCss,
    ModalPage,
    ModalPersonErr,
    ModalMoneyErr,
    ModalNotClaimErr,
  },
  setup() {
    const showModalPersonErr = ref(false)
    const showModalMoneyErr = ref(false)
    const showModalNotClaimErr = ref(false)
    // 현재 월을 가져와서 전월을 기본값으로 설정
    const currentDate = new Date();
    const selectedMonth = ref(currentDate.getMonth()); // 0부터 시작하므로 현재 월은 currentDate.getMonth() + 1
    const changeMonth = () => {
      console.log(selectedMonth.value)
    }
    return {
      showModalPersonErr,
      showModalMoneyErr,
      showModalNotClaimErr,
      formatPrice,
      selectedMonth,
      changeMonth,
    }
  }
});
</script>
