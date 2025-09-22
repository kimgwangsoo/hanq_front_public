<template>
  <RBtnContainer>
    <button :class="{ active: selectComponentNum === 'one' }" @click="$emit('update:selectComponentNum', 'one')">1. 운영규정 [1점]</button>
    <button :class="{ active: selectComponentNum === 'two' }" @click="$emit('update:selectComponentNum', 'two')">2. 제품관리대장 [4점]</button>
    <button :class="{ active: selectComponentNum === 'three' }" @click="$emit('update:selectComponentNum', 'three')">3. 제품취급 [4점]</button>
    <button :class="{ active: selectComponentNum === 'four' }" @click="$emit('update:selectComponentNum', 'four')">4. 전용차량 [3점]</button>
    <button :class="{ active: selectComponentNum === 'five' }" @click="$emit('update:selectComponentNum', 'five')">5. 보수(임금) [2점]</button>
  </RBtnContainer>

  <RInfo>
  <!-- 운영규정 컴포넌트 -->
  <div v-if="selectComponentNum == 'one'">
    <RGuide>기관이 자체적인 운영규정을 마련하여 비치하고 그에 따라 운영하고 있는지 평가합니다 [1점]
      <OrangeBtn class="marginLeft10" @click="$emit('update:showModalRateDetail', true)">자세히 보기</OrangeBtn>
    </RGuide>
    <RGuide>
      운영규정 샘플제공
      <GreenBtn class="marginLeft10"> 다운로드 </GreenBtn>
    </RGuide>

    <FlexTopDiv class="width100">
      <RRoleTable class="width60 marginRight10">
        <thead>
          <tr>
            <th colspan="2">평가기준</th>
            <th>평가방법</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>기관</td>
            <td>운영규정을 직원이 열람 가능한 장소에 비치하고 내용이 충실함</td>
            <td rowspan="8">현장, 기록</td>
          </tr>
          <tr>
            <td colspan="2">운영규정 6개 항목</td>
            
          </tr>
          <tr>
            <td colspan="2">
              (1) 이용계약에 관한 사항<br>
              - 계약기간, 계약목적, 월 이용료 및 그 밖의 비용 부담액, 신원인수인의 권리 및 의무, 계약의 해제
            </td>
          </tr>
          <tr>
            <td colspan="2">
              (2) 이용료 등 비용에 대한 변경 방법 및 정차 등에 관한 사항
            </td>
          </tr>
          <tr>
            <td colspan="2">
              (3) 서비스의 내용과 그 비용의 부담에 관한 사항
            </td>
          </tr>
          <tr>
            <td colspan="2">
              (4) 제품 안내에 관한 사항 <br>
              - 취급 제품의 홍보, 안내 정보게시
            </td>
          </tr>
          <tr>
            <td colspan="2">
              (5) 제품 유통에 관한 사항 <br>
              - 배송방법, 재고관리
            </td>
          </tr>
          <tr>
            <td colspan="2">
              (6) 제품 소독에 관한 사항 <br>
              - 소독방법(자체소독, 위탁소독 등)
            </td>
          </tr>
        </tbody>
      </RRoleTable>

      <RRoleTable>
        <thead>
          <tr>
            <th>상태</th>
            <th>제목(.zip 압축 첨부)</th>
            <th>파일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <i class="material-icons redFont">cancel</i>
            </td>
            <td>운영규정</td>
            <td>
              <input type="file" />
            </td>
          </tr>
        </tbody>
      </RRoleTable>
    </FlexTopDiv>
  </div>

  <!-- 제품관리대장 컴포넌트 -->
  <div v-if="selectComponentNum == 'two'">
    <RGuide>기관이 제품의 체계적인 관리를 위하여 판매 및 대여한 제품에 대한 관리대장을 작성하는지 평가합니다   [4점]

      <OrangeBtn class="marginLeft10" @click="$emit('update:showModalRateDetail', true)">자세히 보기</OrangeBtn>
    </RGuide>
    <RGuide>
      운영규정 샘플제공
      <GreenBtn class="marginLeft10"> 다운로드 </GreenBtn>
    </RGuide>

    <FlexTopDiv class="width100">
      <RRoleTable class="width60 marginRight10">
        <thead>
          <tr>
            <th colspan="2">평가기준</th>
            <th>평가방법</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>기관</td>
            <td>제품관리대장을 작성함</td>
            <td rowspan="8">기록</td>
          </tr>
          <tr>
            <td>기관</td>
            <td>필수사항이 모두 확인됨 <br>
              - 필수사항: 일자, 수급자명, 품목명, 제품명, 제품코드, 구분(판매,대여,회수), 대여기간, 배송구분</td>
          </tr>
          
        </tbody>
      </RRoleTable>

      <RRoleTable>
        <thead>
          <tr>
            <th>메뉴</th>
            <th>내용</th>
            <th>확인</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              주문 및 발주
            </td>
            <td>주문 및 발주 메뉴 상단 "엑셀변환"</td>
            <td>
              <button class="blueBtn" @click="$router.push('/orders')">이동</button>
            </td>
          </tr>
        </tbody>
      </RRoleTable>
    </FlexTopDiv>
  </div>

  <!-- 제품취급 컴포넌트 -->
  <div v-if="selectComponentNum == 'three'">
    <RGuide>수급자(보호자)가 편리하게 선택할 수 있도록 판매 및 대여제품을 취급하고 있는지 평가합니다   [4점] 

      <OrangeBtn class="marginLeft10" @click="$emit('update:showModalRateDetail', true)">자세히 보기</OrangeBtn>
    </RGuide>

    <FlexTopDiv class="width100">
      <RRoleTable class="width60 marginRight10">
        <thead>
          <tr>
            <th colspan="2">평가기준</th>
            <th>평가방법</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>기관</td>
            <td>	판매 및 대여품목을 취급함</td>
            <td rowspan="20">전산, 현장</td>
          </tr>
          <tr>
            <td colspan="2">
              1.이동욕조
            </td>
          </tr>
          <tr>
            <td colspan="2">
              2.목욕의자
            </td>
          </tr>
          <tr>
            <td colspan="2">
              3.배회감지기
            </td>
          </tr>
          <tr>
            <td colspan="2">
              4.안전손잡이
            </td>
          </tr>
          <tr>
            <td colspan="2">
              5.경사로(실외용)
            </td>
          </tr>
          <tr>
            <td colspan="2">
              6.경사로(실내용)
            </td>
          </tr>
          <tr>
            <td colspan="2">
              7.미끄럼 방지용품
            </td>
          </tr>
          <tr>
            <td colspan="2">
              8.욕창예방방석
            </td>
          </tr>
          <tr>
            <td colspan="2">
              9.욕창예방 매트리스
            </td>
          </tr>
          <tr>
            <td colspan="2">
              10. 지팡이
            </td>
          </tr>
          <tr>
            <td colspan="2">
              11. 성인용보행기
            </td>
          </tr>
          <tr>
            <td colspan="2">
              12.수동휠체어
            </td>
          </tr>
          <tr>
            <td colspan="2">
              13.자세변환용구
            </td>
          </tr>
          <tr>
            <td colspan="2">
              14.수동침대
            </td>
          </tr>
          <tr>
            <td colspan="2">
              15.전동침대
            </td>
          </tr>
          <tr>
            <td colspan="2">
              16.이동변기
            </td>
          </tr>
          <tr>
            <td colspan="2">
              17.간이변기
            </td>
          </tr>
          <tr>
            <td colspan="2">
              18.요실금팬티
            </td>
          </tr>
          <tr>
            <td colspan="2">
              19.목욕리프트
            </td>
          </tr>
        </tbody>
      </RRoleTable>
    </FlexTopDiv>
  </div>

  <!-- 전용차량 컴포넌트 -->
  <div v-if="selectComponentNum == 'four'">
    <RGuide>기관이 안전하고 신속한 제품배송을 위해 전용차량을 이용하여 제품을 배송하는지 평가합니다   [3점]  
      <OrangeBtn class="marginLeft10" @click="$emit('update:showModalRateDetail', true)">자세히 보기</OrangeBtn>
    </RGuide>

    <FlexTopDiv class="width100">
      <RRoleTable class="width60 marginRight10">
        <thead>
          <tr>
            <th colspan="2">평가기준</th>
            <th>평가방법</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>기관</td>
            <td>제품 전부를 전용차량을 이용하여 배송함</td>
            <td rowspan="2">기록</td>
          </tr>
          <tr>
            <td>기관</td>
            <td>필수사항이 모두 확인됨 <br>
              - 필수사항: 일자, 수급자명, 품목명, 제품명, 제품코드, 구분(판매,대여,회수), 대여기간, 배송구분</td>
          </tr>
          
        </tbody>
      </RRoleTable>

      <RRoleTable>
        <thead>
          <tr>
            <th>상태</th>
            <th>제목(.zip 압축 첨부)</th>
            <th>파일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <i class="material-icons greenFont">check_circle</i>
            </td>
            <td>자동차등록증(대표자, 법인, 직원)</td>
            <td>
              <input type="file" />
            </td>
          </tr>
        </tbody>
      </RRoleTable>
    </FlexTopDiv>
  </div>

  <!-- 보수(임금) 컴포넌트 -->
  <div v-if="selectComponentNum == 'five'">
    <RGuide>직원들이 안전된 고용환경에서 근무할 수 있도록 근로계약을 체결하고 이에 따른 보수(임금)를 지급받는지 평가합니다   [2점]  
      <OrangeBtn class="marginLeft10" @click="$emit('update:showModalRateDetail', true)">자세히 보기</OrangeBtn>
    </RGuide>

    <RGuide>
      근로계약서 샘플제공
      <GreenBtn class="marginLeft10"> 다운로드 </GreenBtn>
    </RGuide>

    <FlexTopDiv class="width100">
      <RRoleTable class="width60 marginRight10">
        <thead>
          <tr>
            <th colspan="2">평가기준</th>
            <th>평가방법</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>직원</td>
            <td>기관과 근로계약을 체결함 <br>
              · 근로계약서 필수사항: 보수(임금), 소정근로시간, 휴일, 연차 유급휴가</td>
            <td rowspan="3">면담</td>
          </tr>
          
          <tr>
            <td>직원</td>
            <td>근로계약서에 명시된 보수(임금)를 지급받음</td>
          </tr>

          <tr>  
            <td>직원</td>
            <td>보수(임금)명세서를 매월 정기적으로 제공받음</td>
          </tr>
        </tbody>
      </RRoleTable>

      <RRoleTable>
        <thead>
          <tr>
            <th>상태</th>
            <th>제목(.zip 압축 첨부)</th>
            <th>파일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 10" :key="i">
            <td>
              <i class="material-icons redFont">cancel</i>
            </td>
            <td>근로계약서(직원1)</td>
            <td>
              <input type="file" />
            </td>
          </tr>
        </tbody>
      </RRoleTable>
    </FlexTopDiv>
  </div>
</RInfo>
</template>

<script>
import * as PublicCss from '@/assets/styles/public.js'
import * as RateCss from '@/assets/styles/rate/RateCss.js'  

export default {
  name: 'InstitutionOperation',
  components: {
    ...PublicCss,
    ...RateCss
  },
  props: {
    selectComponentNum: {
      type: String,
      required: true,
      default: 'one'
    },
    showModalRateDetail: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  emits: ['update:selectComponentNum', 'update:showModalRateDetail'],
  setup() {
    return {
    }
  }
}
</script>