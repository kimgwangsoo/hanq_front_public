<template>
  <RBtnContainer>
    <button :class="{ active: selectComponentNum === 'nineteen' }" @click="$emit('update:selectComponentNum', 'nineteen')">19. 욕구사정 [4점]</button>
    <button :class="{ active: selectComponentNum === 'twenty' }" @click="$emit('update:selectComponentNum', 'twenty')">20. 급여제공기록지 제공 [4점]</button>
    <button :class="{ active: selectComponentNum === 'twentyOne' }" @click="$emit('update:selectComponentNum', 'twentyOne')">21. 제품전시 [4점]</button>
    <button :class="{ active: selectComponentNum === 'twentyTwo' }" @click="$emit('update:selectComponentNum', 'twentyTwo')">22. 가격표시제 [4점]</button>
    <button :class="{ active: selectComponentNum === 'twentyThree' }" @click="$emit('update:selectComponentNum', 'twentyThree')">23. 설치 및 제품설명 [4점]</button>
  </RBtnContainer>

  <RInfo>
    <!-- 욕구사정 컴포넌트 -->
    <div v-if="selectComponentNum == 'nineteen'">
      <RGuide>수급자의 건강상태와 개인적 특성 등을 반영한 종합적 욕구사정을 실시하여 질 높은 급여제공이 되도록 노력하는지 평가합니다 [4점]   
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
              <td>
                욕구사정을 연 1회 이상 실시함 
                <br>
                - 필수사항 : 수급자명, 일자, 작성자명, 총평 
                <br>
                - 신규수급자는 급여개시일까지 실시하였는지 확인함
              </td>
              <td rowspan="2">기록</td>
            </tr>

            <tr>
              <td>기관</td>
              <td>
                욕구사정 4개 항목이 모두 확인됨
              </td>
            </tr>
          </tbody>
        </RRoleTable>

        <RRoleTable class="width30">
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
                수급자 목록
              </td>
              <td>
                수급자 목록 메뉴 상단 `욕구사정기록내역`
              </td>
              <td>
                <button class="blueBtn" @click="$router.push('/client')">이동</button>
              </td>
            </tr>
          </tbody>
        </RRoleTable>
      </FlexTopDiv>
    </div>

    <!-- 급여제공기록지 제공 컴포넌트 -->
    <div v-if="selectComponentNum == 'twenty'">
      <RGuide>수급자별 작성한 급여제공기록지를 정기적으로 제공합니다 [4점]   
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
              <td>
                급여제공 시작과 종료 시, 대여기간 중 매월 1회 이상 수급자(보호자)에게 장기요양급여제공기록지를 제공함
              </td>
              <td rowspan="2">기록</td>
            </tr>

            <tr>
              <td>기관</td>
              <td>
                급여제공 시작과 종료 시, 대여기간 중 분기별 1회 이상 수급자(보호자)에게 장기요양급여제공기록지를 제공함
              </td>
            </tr>
          </tbody>
        </RRoleTable>

        <RRoleTable class="width30">
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
                대여관리
              </td>
              <td>
                대여관리 메뉴 상단 `문자발송내역`	
              </td>
              <td>
                <button class="blueBtn" @click="$router.push('/rent')">이동</button>
              </td>
            </tr>
          </tbody>
        </RRoleTable>
      </FlexTopDiv>
    </div>

    <!-- 제품전시 제공 컴포넌트 -->
    <div v-if="selectComponentNum == 'twentyOne'">
      <RGuide>기관이 수급자(보호자)에게 제품 정보를 제공하기 위해 복지용구를 전시하고 안내책자를 비치하고 있는지 평가합니다 [4점]   
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
              <td>
                복지용구를 전시하고 있으며 안내책자를 비치함
              </td>
              <td rowspan="2">현장</td>
            </tr>

            <tr>
              <td>기관</td>
              <td>
                1. 이동변기
                <br>
                2. 목욕의자
                <br>
                3. 성인용 보행기
                <br>
                4. 안전손잡이
                <br>
                5. 미끄럼방지용품(미끄럼방지매트, 미끄럼방지액, 미끄럼방지양말)
                <br>
                6. 간이변기(간이대변기·소변기)
                <br>
                7. 지팡이
                <br>
                8. 욕창예방방석
                <br>
                9. 자세변환용구
                <br>
                10. 요실금팬티
                <br>
                11. 수동휠체어
                <br>
                12. 전동침대
                <br>
                13. 수동침대
                <br>
                14. 이동욕조
                <br>
                15. 목욕리프트
                <br>
                16. 배회감지기
                <br>
                17. 경사로(실내용·실외용)
                <br>
                18. 욕창예방매트리스
              </td>
            </tr>
          </tbody>
        </RRoleTable>
      </FlexTopDiv>
    </div>
    
    <!-- 가격표시제 컴포넌트 -->
    <div v-if="selectComponentNum == 'twentyTwo'">
      <RGuide>기관이 수급질서 확립을 위해 복지용구에 대한 정확한 가격 정보를 수급자에게 제공하고 있는지 평가합니다 [4점]   
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
              <td>
                판매 및 대여 제품에 각 제품별 총 가격을 표시함
              </td>
              <td rowspan="2">현장</td>
            </tr>

            <tr>
              <td>기관</td>
              <td>
                각 제품별 본인부담금을 구분하여 표시함
              </td>
            </tr>
          </tbody>
        </RRoleTable>
      </FlexTopDiv>
    </div>

    <!-- 설치 및 제품설명 컴포넌트 -->
    <div v-if="selectComponentNum == 'twentyThree'">
      <RGuide>수급자(보호자)가 구입하거나 대여한 제품에 대하여 기관에서 설치 및 제품설명을 하는지 평가합니다 [4점]   
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
              <td>
                제품설치(설명)대장을 작성하고 제품을 설명함
              </td>
              <td rowspan="2">기록</td>
            </tr>

            <tr>
              <td>기관</td>
              <td>
                필수사항이 모두 확인됨
                <br>
                - 필수사항: 수급자명, 설치일자, 설치(설명)자, 설치장소, 배송구분, 제품명, 방법(유선,방문 등), 제품설명 여부, 확인자(성명 및 관계)
              </td>
            </tr>
          </tbody>
        </RRoleTable>

        <RRoleTable class="width30">
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
              <td>
                주문서 내 계약서 `제품설치대장`출력	
              </td>
              <td>
                <button class="blueBtn" @click="$router.push('/orders')">이동</button>
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
  name: 'PayrollProcess',
  components: {
    ...PublicCss,
    ...RateCss
  },
  props: {
    selectComponentNum: {
      type: String,
      required: true,
      default: 'nineteen'
    }
  },
  emits: ['update:selectComponentNum'],
}
</script>