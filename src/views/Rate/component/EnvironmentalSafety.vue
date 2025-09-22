<template>
  <RBtnContainer>
    <button :class="{ active: selectComponentNum === 'six' }" @click="$emit('update:selectComponentNum', 'six')">6. 개인정보보호 [1점]</button>
    <button :class="{ active: selectComponentNum === 'seven' }" @click="$emit('update:selectComponentNum', 'seven')">7. 제품보관 [4점]</button>
    <button :class="{ active: selectComponentNum === 'eight' }" @click="$emit('update:selectComponentNum', 'eight')">8. 소독실시 [4점]</button>
    <button :class="{ active: selectComponentNum === 'nine' }" @click="$emit('update:selectComponentNum', 'nine')">9. 소독위탁 [4점]</button>
    <button :class="{ active: selectComponentNum === 'ten' }" @click="$emit('update:selectComponentNum', 'ten')">10. 소독관리 [4점]</button>
    <button :class="{ active: selectComponentNum === 'eleven' }" @click="$emit('update:selectComponentNum', 'eleven')">11. 시설기준 [4점]</button>
    <button :class="{ active: selectComponentNum === 'twelve' }" @click="$emit('update:selectComponentNum', 'twelve')">12. 제품수리/보수관리 [4점]</button>
  </RBtnContainer>

  <RInfo>
    <!-- 개인정보보호 컴포넌트 -->
    <div v-if="selectComponentNum == 'six'">
      <RGuide>기관은 수급자 등의 개인정보를 보호하여 관리하는지 평가합니다 [1점]
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
              <td>개인정보 관련 자료 보관함에 잠금장치가 되어있음</td>
              <td rowspan="2">현장</td>
            </tr>

            <tr>
              <td>기관</td>
              <td>
                <FlexLeft>
                  개인정보 관련 자료를 적정하게 보관함
                  <div class="new">신설</div>
                </FlexLeft>
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
              <td>개인정보시건현장 이미지</td>
              <td>
                <input type="file" />
              </td>
            </tr>
          </tbody>
        </RRoleTable>
      </FlexTopDiv>
    </div>

    <!-- 제품보관 컴포넌트 -->
    <div v-if="selectComponentNum == 'seven'">
      <RGuide>기관이 제품 오염을 방지하기 위해 제품을 분리/보관하고 있는지 평가합니다   [4점]
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
              <td>소독 전·후 제품을 분리하여 별도의 공간에 보관함</td>
              <td rowspan="2">현장</td>
            </tr>

            <tr>
              <td>기관</td>
              <td>
                <FlexLeft>
                  소독 후 제품을 비닐시트 등으로 포장함
                  <div class="new">신설</div>
                </FlexLeft>
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
              <td>	소독제품보관예시 이미지</td>
              <td>
                <input type="file" />
              </td>
            </tr>
          </tbody>
        </RRoleTable>
      </FlexTopDiv>
    </div>

    <!-- 소독실시 컴포넌트 -->
    <div v-if="selectComponentNum == 'eight'">
      <RGuide>기관이 감염관리를 위해 제품의 소독관리를 효율적으로 하고 있는지 평가합니다 [4점]
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
              <td>대여제품에 대하여 소독을 실시함</td>
              <td rowspan="2">전산, 기록</td>
            </tr>

            <tr>
              <td>
                <RFormula>
                  <RFraction>
                    <span class="numerator">분모 중 소독실시 건 수</span>
                    <span class="denominator">계약 종료 후 재대여제품 건 수</span>
                  </RFraction>
                  <span> x 100</span>
                </RFormula>
              </td>
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
                대여관리
              </td>
              <td>
                대여관리 메뉴 상단 `소독관리` 엑셀 변환
              </td>
              <td>
                <button class="blueBtn" @click="$router.push('/rent')">이동</button>
              </td>
            </tr>
          </tbody>
        </RRoleTable>
      </FlexTopDiv>
    </div>

    <!-- 소독위탁 컴포넌트 -->
    <div v-if="selectComponentNum == 'nine'">
      <RGuide>기관이 전문소독을 실시하여 제품의 위생관리에 노력하고 있는지 평가합니다 [4점]
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
              <td>소독전문업체나 소독대행 복지용구사업소에 위탁하여 소독을 실시함</td>
              <td rowspan="2">기록</td>
            </tr>

            <tr>
              <td>기관</td>
              <td>
                자체소독을 실시함
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
              <td>
                소독위탁계약서()	파일 선택
              </td>
              <td>
                <input type="file" />
              </td>
            </tr>
          </tbody>
        </RRoleTable>
      </FlexTopDiv>
    </div>

    <!-- 소독관리 컴포넌트 -->
    <div v-if="selectComponentNum == 'ten'">
      <RGuide>기관이 감염예방을 위하여 올바른 수준의 소독을 실시하고 소독제를 관리하는지 평가합니다 [4점]   
        <OrangeBtn class="marginLeft10" @click="$emit('update:showModalRateDetail', true)">자세히 보기</OrangeBtn>
      </RGuide>

      <RGuide>
        소독매뉴얼 샘플제공
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
                <FlexLeft>
                  복지용구의 소독매뉴얼을 비치하고있음
                  <div class="new">신설</div>
                </FlexLeft>
              </td>
              <td rowspan="2">기록</td>
            </tr>

            <tr>
              <td>기관</td>
              <td>
                <FlexLeft>
                  소독제를 적절하게 보관하여 사용하고 있음
                  <div class="new">신설</div>
                </FlexLeft>
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
              <td>
                소독매뉴얼
              </td>
              <td>
                <input type="file" />
              </td>
            </tr>
          </tbody>
        </RRoleTable>
      </FlexTopDiv>
    </div>

    <!-- 시설기준 컴포넌트 -->
    <div v-if="selectComponentNum == 'eleven'">
      <RGuide>기관이 수급자의 급여이용 편의를 위해 시설기준을 충족하고 있는지 평가합니다 [4점]   
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
                시설기준을 준수함
                <br>
                - 사무실 
                <br>
                - 진열 및 체험공간(23.1m² 이상)이 있고 복지용구를 진열하고 있음
                <br>
                - 별도의 세정/수리 등 설비 및 비품보관 공간
              </td>
              <td>현장</td>
            </tr>
          </tbody>
        </RRoleTable>
      </FlexTopDiv>
    </div>

    <!-- 제품수리/보수관리 컴포넌트 -->
    <div v-if="selectComponentNum == 'twelve'">
      <RGuide>기관이 제품의 수리 및 보수 관리에 대한 지침을 비치하고 관리하는지 평가합니다 [4점]   
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
                <FlexLeft>
                  제품 수리 및 보수 관리지침을 비치하고 내용이 충실함
                  <div class="new">신설</div>
                </FlexLeft>
                - 필수사항: 제품 사후관리(A/S 등) 방법, 처리기한
              </td>
              <td>현장, 기록</td>
            </tr>

            <tr>
              <td>기관</td>
              <td>
                <FlexLeft>
                  제품 수리·보수 관리대장을 작성함
                  <div class="new">신설</div>
                </FlexLeft>
                - 필수사항: 접수일자, 수급자명, 품목명, 제품명, 제품코드, 수리/보수사항, 처리일자, 처리내용
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
                주문 및 발주 <br> (A/S관리대장)
              </td>
              <td>
                주문 및 발주 메뉴 상단 `엑셀변환`
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
  name: 'EnvironmentalSafety',
  components: {
    ...PublicCss,
    ...RateCss
  },
  props: {
    selectComponentNum: {
      type: String,
      required: true,
      default: 'six'
    }
  },
  emits: ['update:selectComponentNum'],
  setup() {
    return {
    }
  }
}
</script>