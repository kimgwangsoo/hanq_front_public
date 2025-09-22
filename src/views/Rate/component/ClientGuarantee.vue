<template>
  <RBtnContainer>
    <button :class="{ active: selectComponentNum === 'thirteen' }" @click="$emit('update:selectComponentNum', 'thirteen')">13. 급여계약설명 [4점]</button>
    <button :class="{ active: selectComponentNum === 'fourteen' }" @click="$emit('update:selectComponentNum', 'fourteen')">14. 제품사용설명 [4점]</button>
    <button :class="{ active: selectComponentNum === 'fifteen' }" @click="$emit('update:selectComponentNum', 'fifteen')">15. 수급자상담관리 [4점]</button>
    <button :class="{ active: selectComponentNum === 'sixteen' }" @click="$emit('update:selectComponentNum', 'sixteen')">16. 급여제공역량관리 [4점]</button>
    <button :class="{ active: selectComponentNum === 'seventeen' }" @click="$emit('update:selectComponentNum', 'seventeen')">17. 연장대여동의서 [4점]</button>
    <button :class="{ active: selectComponentNum === 'eighteen' }" @click="$emit('update:selectComponentNum', 'eighteen')">18. 수급자 알권리 보장 [3점]</button>
  </RBtnContainer>

  <RInfo>
    <!-- 급여계약설명 컴포넌트 -->
    <div v-if="selectComponentNum == 'thirteen'">
      <RGuide>기관이 수급자(보호자)의 만족도 향상을 위하여 노력하는지 평가합니다 [4점]   
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
              <td>수급자</td>
              <td>
                급여 계약 작성할 때 중요사항에 대해 중분히 설명을 들음
              </td>
              <td rowspan="2">면담</td>
            </tr>

            <tr>
              <td>수급자</td>
              <td>
                수급자(보호자)의 의견을 반영(존중)하여 급여계약을 체결함
              </td>
            </tr>
          </tbody>
        </RRoleTable>
      </FlexTopDiv>
    </div>

    <!-- 제품사용설명 컴포넌트 -->
    <div v-if="selectComponentNum == 'fourteen'">
      <RGuide>기관이나 공급업체에서 수급자(보호자)에게 제품 사용 및 주의사항에 대하여 설명하고 제품 사용설명서를 제공하였는지 평가합니다 [4점]   
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
              <td>수급자</td>
              <td>
                제품 이용 전 사용방법과 주의사항에 대해 설명을 들음
              </td>
              <td rowspan="2">면담</td>
            </tr>

            <tr>
              <td>수급자</td>
              <td>
                제품 이용 전 사용설명서를 제공받음
              </td>
            </tr>
          </tbody>
        </RRoleTable>
      </FlexTopDiv>
    </div>

    <!-- 수급자상담관리 컴포넌트 -->
    <div v-if="selectComponentNum == 'fifteen'">
      <RGuide>기관은 수급자의 상태 등을 파악하기 위해 정기적으로 상담을 실시하는지 평가합니다 [4점]
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
                모든 대여 수급자(보호자)에게 매월 상담을 실시함
                <br>
                - 필수사항: 확인인장, 확인방법, 수급자명, 사업소담당자, 상담대상자, 관계, 특이사항, 수급자(보호자)서명
              </td>
              <td rowspan="3">기록</td>
            </tr>

            <tr>
              <td>기관</td>
              <td>
                모든 대여 수급자(보호자)와 분기별 1회 이상 방문상담을 실시함 
                <br>
                - 필수사항: 확인일자, 확인방법, 수급자명, 사업소담당자, 상담대상자, 관계, 특이사항, 수급자(보호자)서명
              </td>
            </tr>

            <tr>
              <td>기관</td>
              <td>
                수급자(보호자)의 상담결과를 연 1회 이상 급여에 반영하여 제공함
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
                수급자 목록 메뉴 상단 `수급자상담내역`
              </td>
              <td>
                <button class="blueBtn" @click="$router.push('/client')">이동</button>
              </td>
            </tr>
          </tbody>
        </RRoleTable>
      </FlexTopDiv>
    </div>
    
    <!-- 급여제공역량관리 컴포넌트 -->
    <div v-if="selectComponentNum == 'sixteen'">
      <RGuide>기관은 직원이 수시로 읽고 현장에 적용할 수 있도록 급여제공지침을 비치하고 직원 역량관리를 위해 노력하고 있는지 평가합니다   [4점]
        <OrangeBtn class="marginLeft10" @click="$emit('update:showModalRateDetail', true)">자세히 보기</OrangeBtn>
      </RGuide>

      <RGuide>
        급여제공역량관리 샘플제공
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
              <td>
                급여제공지침 5개 항목을 마련하여 직원이 열람 가능한 장소에 비치하고 내용이 충실함
              </td>
              <td>현장, 기록</td>
            </tr>

            <tr>
              <td>직원</td>
              <td>
                <FlexLeft>
                  신규직원은 급여개시 전까지 교육을 받고 내용을 숙지함 
                  <div class="new">신설</div>
                </FlexLeft>
                - 신규교육 내용: 노인인권보호지침, 응급상황 대처법, 비상연락망
              </td>
              <td rowspan="2">면담</td>
            </tr>

            <tr>
              <td>직원</td>
              <td>
                <FlexLeft>
                  모든 직원이 연 1회 이상 운영규정과 급여제공지침에 대해 교육을 받고, 그 내용을 숙지함
                  <div class="new">신설</div>
                </FlexLeft>
              </td>
            </tr>
          </tbody>
        </RRoleTable>

        <RRoleTable class="width30">
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
              <td>
                급여제공지침
              </td>
              <td>
                <input type="file" />
              </td>
            </tr>
            <tr>
              <td>
                <i class="material-icons redFont">cancel</i>
              </td>
              <td>
                비상연락망
              </td>
              <td>
                <input type="file" />
              </td>
            </tr>
          </tbody>
        </RRoleTable>
      </FlexTopDiv>
    </div>
    
    <!-- 연장대여동의서 컴포넌트 -->
    <div v-if="selectComponentNum == 'seventeen'">
      <RGuide>기관은 수급자(보호자)에게 관련 사항을 설명하고 동의서를 작성하는지 평가합니다 [4점]
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
              <td rowspan="2">기관</td>
              <td>
                연장 대여기간 이용 동의서를 작성함
              </td>
              <td>기록, 전산</td>
            </tr>

            <tr>
              <td>
                필수사항이 모두 확인됨 
                <br>
                - 필수사항: 제품명, 제품코드, 대여기간, 확인내용 체크여부, 작성일자, 동의자 서명, 품목별 작동상태 점검표 작성여부
              </td>
              <td>기록</td>
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
                주문서 내 계약서 `연장대여동의서`출력
              </td>
              <td>
                <button class="blueBtn" @click="$router.push('/orders')">이동</button>
              </td>
            </tr>
          </tbody>
        </RRoleTable>
      </FlexTopDiv>
    </div>

    <!-- 수급자 알권리 보장 컴포넌트 -->
    <div v-if="selectComponentNum == 'eighteen'">
      <RGuide>수급자(보호자)에게 급여이용에 대한 정보를 제공하여 급여이용 및 선택을 결정할 수 있도록 지원하는지 평가합니다 [3점]
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
                급여이용에 필요한 정보를 기관 내부에 게시함 <br>
                - 운영규정의 개요, 제공하는 장기요양급여의 종류, 노인학대 신고기관, 최종 장기요양기관 평가결과
              </td>
              <td>현장</td>
            </tr>

            <tr>
              <td>기관</td>
              <td>
                노인장기요양보험 홈페이지에 장기요양기관의 정보를 게시함 
                <br>
                - 시군구 신고 항목 : 주소, 전화번호, 인력현황, 시설현황, 급여종류 
                <br>
                - 노인장기요양보험 : 홈페이지 등록 항목 : 장기요양급여 이용계약에 관한 사항, 사진, 홈페이지 주소, 교통편 ,주차시설
              </td>
              <td rowspan="2">전산</td>
            </tr>
            <tr>
              <td>기관</td>
              <td>기간의 정보가 변경된 경우 지체 없이 수정함</td>
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
  name: 'ClientGuarantee',
  components: {
    ...PublicCss,
    ...RateCss
  },
  props: {
    selectComponentNum: {
      type: String,
      required: true,
      default: 'thirteen'
    }
  },
  emits: ['update:selectComponentNum'],
}
</script>