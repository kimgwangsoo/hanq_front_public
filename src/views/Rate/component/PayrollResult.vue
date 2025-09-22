<template>
  <RBtnContainer>
    <button :class="{ active: selectComponentNum === 'twentyFour' }" @click="$emit('update:selectComponentNum', 'twentyFour')">24. 활동지원도움 [4점]</button>
    <button :class="{ active: selectComponentNum === 'twentyFive' }" @click="$emit('update:selectComponentNum', 'twentyFive')">25. 노인인권보호 [5점]</button>
    <button :class="{ active: selectComponentNum === 'twentySix' }" @click="$emit('update:selectComponentNum', 'twentySix')">26. 급여과정 만족도 [4점]</button>
    <button :class="{ active: selectComponentNum === 'twentySeven' }" @click="$emit('update:selectComponentNum', 'twentySeven')">27. 서비스 만족도 조사(유선) [4점]</button>
    <button :class="{ active: selectComponentNum === 'twentyEight' }" @click="$emit('update:selectComponentNum', 'twentyEight')">28. 질향상노력 [1점]</button>
  </RBtnContainer>

  <RInfo>
    <!-- 활동지원도움 컴포넌트 -->
    <div v-if="selectComponentNum == 'twentyFour'">
      <RGuide>수급자가 복지용구 제품을 사용하여 일상생활 및 신체활동 지원에 도움이 되었는지 평가합니다 [4점]   
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
                수급자의 일상생활에 도움을 받음
              </td>
              <td rowspan="2">면담</td>
            </tr>

            <tr>
              <td>수급자</td>
              <td>
                수급자의 신체활동에 도움을 받음
              </td>
            </tr>
          </tbody>
        </RRoleTable>
      </FlexTopDiv>
    </div>

    <!-- 노인인권보호 컴포넌트 -->
    <div v-if="selectComponentNum == 'twentyFive'">
      <RGuide>기관은 수급자(보호자)의 권리를 보호하고 있는지 평가합니다 [5점]   
        <OrangeBtn class="marginLeft10" @click="$emit('update:showModalRateDetail', true)">자세히 보기</OrangeBtn>
      </RGuide>

      <RGuide>
        의무교육 온라인수강 사이트

        <GreenBtn class="marginLeft10" @click="openNewTab('https://in.kohi.or.kr/index.do')"> https://in.kohi.or.kr/index.do </GreenBtn>
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
                <FlexLeft>
                  모든 직원에게 노인인권 및 학대예방교육을 연 1회 이상 실시함
                  <div class="new">신설</div>
                </FlexLeft>
                - 필수사항: 교육일시, 강사명, 교육내용, 교육방법, 참석자(서명)
              </td>
              <td >기록</td>
            </tr>

            <tr>
              <td>직원</td>
              <td>
                <FlexLeft>
                  직원은 노인인권 및 학대예방교육의 내용을 숙지하고 있음
                  <div class="new">신설</div>
                </FlexLeft>
              </td>
              <td>면담</td>
            </tr>

            <tr>
              <td>수급자</td>
              <td>
                <FlexLeft>
                  수급자는 급여를 이용하는 모든 과정에서 직원으로부터 존중받음
                  <div class="new">신설</div>
                </FlexLeft>
              </td>
              <td>면담</td>
            </tr>
          </tbody>
        </RRoleTable>

        <RRoleTable class="width40">
          <thead>
            <tr>
              <th>상태</th>
              <th>제목(.zip 압축 첨부)<br>(연1회 파일 기록 PDF 병합 첨부)</th>
              <th>파일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <i class="material-icons greenFont">check_circle</i>
              </td>
              <td>
                노인인권/학대예방 교육 수료증(직원1)
              </td>
              <td>
                <input type="file" class="fileInput" />
              </td>
            </tr>
          </tbody>
        </RRoleTable>
      </FlexTopDiv>
    </div>

    <!-- 급여과정 만족도 컴포넌트 -->
    <div v-if="selectComponentNum == 'twentySix'">
      <RGuide>급여제공 과정에 대하여 수급자가 만족하는지 평가합니다 [4점]  
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
                직원은 친절하고 전문성을 갖추었음
              </td>
              <td rowspan="3">면담</td>
            </tr>

            <tr>
              <td>수급자</td>
              <td>
                외관 및 청결상태가 양호한 제품을 신속히 배송함
              </td>
            </tr>

            <tr>
              <td>수급자</td>
              <td>
                <FlexLeft>
                  수급자(보호자)의 문의 또는 불편사항 등 의견에 적극적으로 응대함
                  <div class="new">신설</div>
                </FlexLeft>
              </td>
            </tr>
          </tbody>
        </RRoleTable>
      </FlexTopDiv>
    </div>

    <!-- 서비스 만족도 컴포넌트 -->
    <div v-if="selectComponentNum == 'twentySeven'">
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
                기관이 장기요양제도나 서비스내용에 대해 안내를 잘 합니까?
              </td>
              <td rowspan="5">유선</td>
            </tr>

            <tr>
              <td>수급자</td>
              <td>
                기관이 귀하의 요구사항을 해결하기 위해 노력합니까?
              </td>
            </tr>

            <tr>
              <td>수급자</td>
              <td>
                직원이 예의를 갖추고 친절하게 서비스를 제공합니까?
              </td>
            </tr>
            <tr>
              <td>수급자</td>
              <td>
                기관이 정확한 본인부담금액 및 납부방법을 안내합니까?
              </td>
            </tr>
            <tr>
              <td>수급자</td>
              <td>
                기관에서 제공하는 서비스 내용에 대하여 만족하십니까?
              </td>
            </tr>
          </tbody>
        </RRoleTable>
      </FlexTopDiv>
    </div>

    <!-- 질향상노력 컴포넌트 -->
    <div v-if="selectComponentNum == 'twentyEight'">
      <RGuide>평가지표에 반영되지 않는 기관의 우수한 사례나 강점, 서비스 내용 충실도 등 기관이 서비스질 향상을 위해 노력하는지 평가합니다 [1점]  
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
              <td colspan="3">지표적용기간: 2021.1월 ~ 평가일</td>
            </tr>
            <tr>
              <td>기관</td>
              <td>
                <FlexLeft>
                  수급자의 서비스 만족도 향상을 위해 노력함
                  <div class="new">신설</div>
                </FlexLeft>
              </td>
              <td>기록, 현장</td>
            </tr>
            <tr>
              <td>기관</td>
              <td>
                <FlexLeft>
                  직원의 직무 만족도 향상을 위해 노력함
                  <div class="new">신설</div>
                </FlexLeft>
              </td>
              <td>기록, 현장</td>
            </tr>
            <tr>
              <td colspan="3">지표적용기간: 2021.1월 ~ 2023. 12월</td>
            </tr>

            <tr>
              <td>기관</td>
              <td>
                <FlexLeft>
                  우수소독사업소로 지정받음
                  <div class="new">신설</div>
                </FlexLeft>
              </td>
              <td>전산</td>
            </tr>
            <tr>
              <td colspan="3">2021.1월 ~ 2024년 평가 종료월</td>
            </tr>

            <tr>
              <td>기관</td>
              <td>
                  청구상담봉사자로 위촉되어 활동한 실적이 있음
              </td>
              <td>전산</td>
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
  name: 'PayrollResult',
  components: {
    ...PublicCss,
    ...RateCss
  },
  props: {
    selectComponentNum: {
      type: String,
      required: true,
      default: 'twentyFour'
    }
  },
  emits: ['update:selectComponentNum'],
  methods: {
    openNewTab(url) {
      // 크롬 브라우저 새 창에서 열기
      // 큰 창으로 켜기 (전체화면x)
      window.open(url, '_blank', 'width=1500,height=800')
    }
  }
}
</script>