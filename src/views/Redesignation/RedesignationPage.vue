<template>
  <MainContainer>
    <TitleArea>
      <TitleIcon>
        <span class="material-icons">description</span>
      </TitleIcon>
      <TitleText>
        갱신기관 심사자료 확인서 
        <!-- <ReFileButton class="download" @click="downloadAllFiles">
          첨부한 파일 전체 내려받기 &nbsp;
          <i class="material-icons">file_download</i>
        </ReFileButton> -->
      </TitleText>
    <img src="@/assets/img/redesignation_banner1.png" alt="배너 이미지" class="banner-image" style="margin-left: 122px; width: 300px; height: auto; max-width: 300px; float: right;" />
    </TitleArea>

    <ReContentArea @dragover.prevent @drop.prevent>
      <ReTableContainer>
        <ReTable>
          <thead>
            <tr>
              <th class="widthNum">지표번호</th>
              <th>심사 항목</th>
              <th style="width:90px; text-align:center;">첨부 상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <ReTableTd colspan="3">
                ✔ 이 확인서(하단의 서류)는 지정갱신 <strong>심사 자료 제출 참고 목록</strong>이며 기관 대표자가 확인하여 수정제출<br>
                <div class="guide">※ 각 시/군/구 별 요청 내용은 차이가 있으니 요구사항에 맞는 항목을 확인해주세요</div>
                <div class="guide">※ 2025년 심사 시, 2024년 자료 제출</div>
                ✔ 동일 기관 내 복지용구를 포함한 복수의 재가급여를 운영하는 경우, 재가, 복지용구 확인서 각각 작성해야합니다.<br>
              </ReTableTd>
            </tr>

            <tr>
              <td class="smallTitle fontCenter">2-1</td>
              <td class="smallTitle" colspan="3">기관 연간사업 운영계획 수립 및 차제 정기평가</td>
            </tr>

            <tr>
              <td rowspan="2"></td>
              <td class="tdLink" @click="handleItemSelect('연간 사업운영계획서', '2-1')">
                가. 연간 사업운영계획서 <span v-html="templateTagHtml"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '연간 사업운영계획서'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="tdLink" @click="handleItemSelect('사업계획에 따른 정기평가 결과보고서', '2-1')">
                나. 사업계획에 따른 정기평가 결과보고서(개선사항 포함) <span v-html="createInfoTagHtml('정기평가 결과보고서 직접첨부')"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '사업계획에 따른 정기평가 결과보고서'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="smallTitle fontCenter">2-2</td>
              <td class="smallTitle" colspan="3">직원 교육 계획 실시 및 지원</td>
            </tr>

            <tr>
              <td rowspan="2"></td>
              <td class="tdLink" @click="handleItemSelect('직원교육 계획 및 실시 자료', '2-2')">
                가. 직원교육 계획 및 실시 자료 <span v-html="templateTagHtml"></span>
                <br>
                * (필수) 인권, 노인학대 예방 교육, (직원역량강화) 감염병 및 성희롱·성폭력 예방교육
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '직원교육 계획 및 실시 자료'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="tdLink" @click="handleItemSelect('시설장 등 종사자의 직무교육에 관한 기록 및 관리', '2-2')">
                나. 시설장 등 종사자의 직무교육에 관한 기록 및 관리 <span v-html="templateTagHtml"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '시설장 등 종사자의 직무교육에 관한 기록 및 관리'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="smallTitle fontCenter">2-3</td>
              <td class="smallTitle" colspan="3">수급자 안전보호 및 고충처리와 개인정보 보호</td>
            </tr>

            <tr>
              <td rowspan="4"></td>
              <td class="tdLink" @click="handleItemSelect('수급자 인권보호 및 민원처리에 대한 계획 및 규정', '2-3')">
                가. 수급자 인권보호 및 민원처리에 대한 계획 및 규정 <span v-html="templateTagHtml"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '수급자 인권보호 및 민원처리에 대한 계획 및 규정'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="tdLink" @click="handleItemSelect('수급자 인권보호 및 민원처리 절차 운영 확인 자료', '2-3')">
                나. 수급자 인권보호 및 민원처리 절차 운영 확인 자료 <span v-html="createInfoTagHtml('주문 및 발주 제품관리/AS관리대장 엑셀변환')"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '수급자 인권보호 및 민원처리 절차 운영 확인 자료'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="tdLink" @click="handleItemSelect('개인정보 보호 계획 및 규정', '2-3')">
                다. 개인정보 보호 계획 및 규정 <span v-html="templateTagHtml"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '개인정보 보호 계획 및 규정'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="tdLink" @click="handleItemSelect('개인정보 보호 교육 실시 자료', '2-3')">
                라. 개인정보 보호 교육 실시 자료 <span v-html="templateTagHtml"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '개인정보 보호 교육 실시 자료'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="smallTitle fontCenter">2-4</td>
              <td class="smallTitle" colspan="3">서비스 질 개선 노력과 감염병 및 위험 관리</td>
            </tr>

            <tr>
              <td rowspan="4"></td>
              <td class="tdLink" @click="handleItemSelect('복지용구 급여제공기록지 서류', '2-4')">
                가. 복지용구 급여제공기록지 서류 <span v-html="createInfoTagHtml('주문 및 발주 일괄출력기능')"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '복지용구 급여제공기록지 서류'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="tdLink" @click="handleItemSelect('수급자에게 복지용구 급여제공기록지 주기적 제공 관련 자료', '2-4')">
                나. 수급자에게 복지용구 급여제공기록지 주기적 제공 관련 자료 <span v-html="createInfoTagHtml('대여관리 문자발송기능')"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '수급자에게 복지용구 급여제공기록지 주기적 제공 관련 자료'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="tdLink" @click="handleItemSelect('복지용구 소독지침에 따른 소독 매뉴얼', '2-4')">
                다. 복지용구 소독지침에 따른 소독 매뉴얼 <span v-html="templateTagHtml"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '복지용구 소독지침에 따른 소독 매뉴얼'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="tdLink" @click="handleItemSelect('소독 실시 및 표면오염도 측정 결과 자료', '2-4')">
                라. 소독 실시 및 표면오염도 측정 결과 자료 <span v-html="createInfoTagHtml('장기요양업무포털 소독관리 메뉴 이용')"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '소독 실시 및 표면오염도 측정 결과 자료'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="smallTitle fontCenter">3-1</td>
              <td class="smallTitle" colspan="3">운영위원회 구성 및 실시 ··· 공간 확보 및 서류 관리</td>
            </tr>

            <tr>
              <td rowspan="3"></td>
              <td class="tdLink" @click="handleItemSelect('기관의 운영에 필요한 규정 또는 정관', '3-1')">
                가. 기관의 운영에 필요한 규정 또는 정관 <span v-html="templateTagHtml"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '기관의 운영에 필요한 규정 또는 정관'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="tdLink" @click="handleItemSelect('복지용구 전시 체험 공간(면적 등) 배치 관련 자료', '3-1')">
                나. 복지용구 전시 체험 공간(면적 등) 배치 관련 자료 <span v-html="templateTagHtml"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '복지용구 전시 체험 공간(면적 등) 배치 관련 자료'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="tdLink" @click="handleItemSelect('운영과 관련된 회의 정기개최 회의 결과 등 실시자료', '3-1')">
                다. 운영과 관련된 회의 정기개최 회의 결과 등 실시자료 <span v-html="templateTagHtml"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '운영과 관련된 회의 정기개최 회의 결과 등 실시자료'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="smallTitle fontCenter">3-2</td>
              <td class="smallTitle" colspan="3">기관 회계 관리의 투명성 및 재정운영 기준 준수 여부</td>
            </tr>

            <tr>
              <td rowspan="4"></td>
              <td class="tdLink" @click="handleItemSelect('회계담당자 (지정 신원보증보험 교육 수료 등) 확인서류', '3-2')">
                가. 회계담당자 (지정 신원보증보험 교육 수료 등) 확인서류 <span v-html="createInfoTagHtml('수료증 첨부')"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '회계담당자 (지정 신원보증보험 교육 수료 등) 확인서류'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="tdLink" @click="handleItemSelect('정기 회계감사 실시 자료 (수입지출 관련 내용)', '3-2')">
                나. 정기 회계감사 실시 자료 (수입·지출 관련 내용) <span v-html="createInfoTagHtml('희망이음에서 다운로드')"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '정기 회계감사 실시 자료 (수입지출 관련 내용)'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="tdLink" @click="handleItemSelect('예결산서 법정 기관 내 市(시)에 제출여부(행복e음)', '3-2')">
                다. 예·결산서 법정 기관 내 市(시)에 제출여부(행복e음) <span v-html="createInfoTagHtml('희망이음에서 다운로드')"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '예결산서 법정 기관 내 市(시)에 제출여부(행복e음)'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>
            <tr>
              <td class="tdLink" @click="handleItemSelect('본인부담금 안내 및 수납 서류', '3-2')">
                라. 본인부담금 안내 및 수납 서류 <span v-html="createInfoTagHtml('주문 및 발주 엑셀변환 기능')"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '본인부담금 안내 및 수납 서류'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="smallTitle fontCenter">3-3</td>
              <td class="smallTitle" colspan="3">재해 발생 대비 예방 및 안전 관리에 관한 사항</td>
            </tr>

            <tr>
              <td rowspan="2"></td>
              <td class="tdLink" @click="handleItemSelect('재해발생 대비 보험 가입 서류', '3-3')">
                가. 재해발생 대비 보험 가입 서류(수급자 배상 관련 보험) <span v-html="createInfoTagHtml('보험 안내 및 가입문의 가능')"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '재해발생 대비 보험 가입 서류'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="tdLink" @click="handleItemSelect('종사자 수급자(보호자) 대상 안전교육 및 주의사항 안내 등 자료', '3-3')">
                나. 종사자, 수급자(보호자) 대상 안전교육 및 주의사항 안내 등 자료 <span v-html="templateNotProvidedTagHtml"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '종사자 수급자(보호자) 대상 안전교육 및 주의사항 안내 등 자료'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="smallTitle fontCenter">4-1</td>
              <td class="smallTitle" colspan="3">표준근로계약서 사용 및 종사자의 적정 급여수준 준수</td>
            </tr>

            <tr>
              <td rowspan="4"></td>
              <td class="tdLink" @click="handleItemSelect('표준근로계약서 자료', '4-1')">
                가. 표준근로계약서 자료 <span v-html="templateTagHtml"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '표준근로계약서 자료'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="tdLink" @click="handleItemSelect('표준근로계약 주요 사항 준수여부 확인 자료', '4-1')">
                나. 표준근로계약 주요 사항 준수여부 확인 자료 <span v-html="templateTagHtml"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '표준근로계약 주요 사항 준수여부 확인 자료'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="tdLink" @click="handleItemSelect('근로기준법에 따른 급여체계 및 내역 제공 자료', '4-1')">
                다. 근로기준법에 따른 급여체계 및 내역 제공 자료 <span v-html="templateTagHtml"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '근로기준법에 따른 급여체계 및 내역 제공 자료'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="tdLink" @click="handleItemSelect('근로기준법에 따른 급여지급 확인 서류', '4-1')">
                라. 근로기준법에 따른 급여지급 확인 서류
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '근로기준법에 따른 급여지급 확인 서류'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="smallTitle fontCenter">4-2</td>
              <td class="smallTitle" colspan="3">건강관리 및 복리후생, 고충처리 등 직원 복지제도 운영</td>
            </tr>

            <tr>
              <td rowspan="5"></td>
              <td class="tdLink" @click="handleItemSelect('종사자 건강검진 실시 관련 확인 자료', '4-2')">
                가. 종사자 건강검진 실시 관련 확인 자료 <span v-html="templateTagHtml"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '종사자 건강검진 실시 관련 확인 자료'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="tdLink" @click="handleItemSelect('종사자 복리후생 지원제도 확인 자료', '4-2')">
                나. 종사자 복리후생 지원제도 확인 자료 <span v-html="templateTagHtml"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '종사자 복리후생 지원제도 확인 자료'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="tdLink" @click="handleItemSelect('종사자 고충처리 절차 및 지침', '4-2')">
                다. 종사자 고충처리 절차 및 지침  <span v-html="templateTagHtml"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '종사자 고충처리 절차 및 지침'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="tdLink" @click="handleItemSelect('종사자 인권보호 및 고충처리 관련 확인 자료', '4-2')">
                라. 종사자 인권보호 및 고충처리 관련 확인 자료 <span v-html="templateTagHtml"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '종사자 인권보호 및 고충처리 관련 확인 자료'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>

            <tr>
              <td class="tdLink" @click="handleItemSelect('종사자 고충 해결 수행 및 의견수렴 반영 관련 자료', '4-2')">
                마. 종사자 고충 해결 수행 및 의견수렴 반영 관련 자료 <span v-html="templateTagHtml"></span>
              </td>
              <td style="text-align:center;">
                <template v-if="isFileAttached(templates.find(t => t.name === '종사자 고충 해결 수행 및 의견수렴 반영 관련 자료'))">
                  <i class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">attach_file</i> 첨부됨
                </template>
                <template v-else>
                  <span style="color: #aaa; font-size: 13px;">미첨부</span>
                </template>
              </td>
            </tr>
          </tbody>
        </ReTable>
      </ReTableContainer>

      <!-- 양식 다운로드 섹션 -->
      <!-- 선택 항목이 없을 경우 -->
      <ReFileArea v-if="!selectedItem">
        <ReFileSection>
          <ReInfoMessage>
            왼쪽 목록에서 다운받고 싶은 양식 또는 첨부하고 싶은 파일을 선택해주세요.
          </ReInfoMessage>
        </ReFileSection>
      </ReFileArea>

      <!-- 선택 항목이 있을 경우 -->
      <ReFileArea v-else>
        <ReFileSection>
          <ReFileSectionTitle>양식 다운로드</ReFileSectionTitle>
          
          <ReFileList v-if="
                           !(selectedItem === '사업계획에 따른 정기평가 결과보고서' && selectedCategory === '2-1') &&
                           !(selectedItem === '수급자 인권보호 및 민원처리 절차 운영 확인 자료' && selectedCategory === '2-3') &&
                           !(selectedItem === '복지용구 급여제공기록지 서류' && selectedCategory === '2-4') && 
                           !(selectedItem === '수급자에게 복지용구 급여제공기록지 주기적 제공 관련 자료' && selectedCategory === '2-4') &&
                           !(selectedItem === '본인부담금 안내 및 수납 서류' && selectedCategory === '3-2') &&
                           !(selectedItem === '재해발생 대비 보험 가입 서류' && selectedCategory === '3-3') &&
                           !(selectedItem === '회계담당자 (지정 신원보증보험 교육 수료 등) 확인서류' && selectedCategory === '3-2') &&
                           !(selectedItem === '정기 회계감사 실시 자료 (수입지출 관련 내용)' && selectedCategory === '3-2') &&
                           !(selectedItem === '예결산서 법정 기관 내 市(시)에 제출여부(행복e음)' && selectedCategory === '3-2') &&
                           !(selectedItem === '근로기준법에 따른 급여지급 확인 서류' && selectedCategory === '4-1') &&
                           !(selectedItem === '소독 실시 및 표면오염도 측정 결과 자료' && selectedCategory === '2-4')
                           ">

            <ReFileItem>
              <ReFileName>
                {{ selectedItem }}
              </ReFileName>
              <ReFileButton class="download" @click="downloadTemplate">
                다운로드
              </ReFileButton>
            </ReFileItem>
          </ReFileList>

          <ReInfoMessage v-else-if="selectedItem === '사업계획에 따른 정기평가 결과보고서' && selectedCategory === '2-1'" class="info" style="font-size: 18px;">
            하단에 정기평가 결과보고서에 개선사항을 추가 작성 후<br/> 첨부해 주세요
          </ReInfoMessage>

          <ReInfoMessage v-else-if="selectedItem === '수급자 인권보호 및 민원처리 절차 운영 확인 자료' && selectedCategory === '2-3'" class="info" style="font-size: 18px;">
            주문 및 발주 메뉴 이동 후<br/>엑셀변환 기능에서 제품관리/AS관리대장 엑셀 월별 저장
          </ReInfoMessage>

          <ReInfoMessage v-else-if="selectedItem === '복지용구 급여제공기록지 서류' && selectedCategory === '2-4'" class="info" style="font-size: 18px;">
            주문 및 발주 메뉴 이동 후<br/>주문서별 계약서 출력 및 일괄출력 기능 이용 출력 저장
          </ReInfoMessage>
          
          <ReInfoMessage v-else-if="selectedItem === '수급자에게 복지용구 급여제공기록지 주기적 제공 관련 자료' && selectedCategory === '2-4'" class="info" style="font-size: 18px;">
            대여관리 메뉴 이동 후<br/> 문자발송 기능에서 월별 급여제공기록지와 발송대장 다운로드 저장
          </ReInfoMessage>
          
          <ReInfoMessage v-else-if="selectedItem === '재해발생 대비 보험 가입 서류' && selectedCategory === '3-3'" class="info" style="font-size: 18px;">
            보험 안내 및 가입문의<br/><br/> 010-5873-2844 박태욱 팀장
          </ReInfoMessage>

          <ReInfoMessage v-else-if="selectedItem === '회계담당자 (지정 신원보증보험 교육 수료 등) 확인서류' && selectedCategory === '3-2'" class="info" style="font-size: 18px;">
            https://edu.ssis.or.kr/main.do 교육 사이트 접속 후<br/>
            하단에 수료증을 첨부해주세요
          </ReInfoMessage>

          <ReInfoMessage v-else-if="selectedItem === '정기 회계감사 실시 자료 (수입지출 관련 내용)' && selectedCategory === '3-2'" class="info" style="font-size: 18px;">
            희망이음 접속 후 자료 다운로드
          </ReInfoMessage>

          <ReInfoMessage v-else-if="selectedItem === '예결산서 법정 기관 내 市(시)에 제출여부(행복e음)' && selectedCategory === '3-2'" class="info" style="font-size: 18px;">
            희망이음 접속 후 자료 다운로드
          </ReInfoMessage>

          <ReInfoMessage v-else-if="selectedItem === '근로기준법에 따른 급여지급 확인 서류' && selectedCategory === '4-1'" class="info" style="font-size: 18px;">
            하단에 급여명세서를 첨부해 주세요
          </ReInfoMessage>

          <ReInfoMessage v-else-if="selectedItem === '소독 실시 및 표면오염도 측정 결과 자료' && selectedCategory === '2-4'" class="info" style="font-size: 18px;">
            장기요양업무포털 소독관리 메뉴 이용
          </ReInfoMessage>
          
          <ReInfoMessage v-else class="info" style="font-size: 18px;">
            주문 및 발주 메뉴 이동 후<br/>엑셀변환 기능의 본인부담금 수납대장 월별 엑셀변환
          </ReInfoMessage>
          
        </ReFileSection>
        

        <!-- 파일 첨부/다운로드 섹션 -->
        <ReFileSection>
          <ReFileSectionTitle>제출파일 첨부 / 다운로드</ReFileSectionTitle>
          <ReInfoMessage class="warning">
            다양한 파일 형식을 첨부할 수 있습니다.<br/> (PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, HWP, ZIP, TXT, HTML, JPG, PNG, GIF)<br/>
            파일이 여러개일경우 ZIP 파일로 압축 후 첨부해 주세요
          </ReInfoMessage>
          <!-- 파일 업로드 영역 -->
          <ReFileUploadArea 
            class="file-upload-area" 
            :class="{ 
              dragover: isDragOver,
              disabled: uploadedFiles.length > 0 
            }" 
            @click="triggerFileInput" 
            @dragover="handleDragOver" 
            @dragleave="handleDragLeave" 
            @drop="handleFileDrop"
          >
            <ReUploadText class="main">
              {{ uploadedFiles.length > 0 ? '이미 파일이 첨부되어 있습니다' : '파일을 여기에 끌어다 놓거나 클릭하세요' }}
            </ReUploadText>
            <ReUploadText class="sub">
              {{ uploadedFiles.length > 0 ? '새 파일을 첨부하려면 기존 파일을 먼저 삭제하세요' : '다양한 파일 형식 지원 (항목당 파일 1개만 첨부 가능)' }}
            </ReUploadText>
            <ReUploadButton 
              type="button" 
              :class="{ disabled: uploadedFiles.length > 0 }"
              :disabled="uploadedFiles.length > 0"
            >
              {{ uploadedFiles.length > 0 ? '파일 첨부됨' : '파일 선택' }}
            </ReUploadButton>
          </ReFileUploadArea>

          <ReFileInput ref="fileInput" type="file" multiple @change="handleFileSelect" />

          <!-- 업로드된 파일 목록 -->
          <ReFileList v-if="uploadedFiles.length > 0">
            <ReFileItem v-for="(file, index) in uploadedFiles" :key="index">
              <ReFileName>{{ file.name }}</ReFileName>
              <div>
                <ReFileButton @click="handleFileDownload(file)">다운로드</ReFileButton>
                <ReFileButton class="delete" @click="deleteFile(index)">삭제</ReFileButton>
              </div>
            </ReFileItem>
          </ReFileList>

          <!-- 빈 상태 -->
          <ReEmptyState v-else>
            업로드된 파일이 없습니다.
          </ReEmptyState>

          <!-- 업로드 진행률 -->
          <ReProgressBar v-if="uploadProgress > 0" :progress="uploadProgress" />
        </ReFileSection>

        <!-- 직원별로 파일 첨부가 필요한 경우 -->
        <ReFileSection v-if="selectedCategory === '4-1' || selectedCategory === '4-2'">
          <ReFileSectionTitle>직원별 파일 첨부</ReFileSectionTitle>
          <ReFileList class="employee" v-for="employee in employeeList" :key="employee.name">
            <ReFileItem>
              <ReEmployeeName>
                <i class="material-icons">person</i>
                {{ employee.name }}({{ employee.id }})
              </ReEmployeeName>
              <ReFileButton class="download" @click="uploadEmployeeFile(employee)">첨부</ReFileButton>              
            </ReFileItem>

            <ReFileList class="employeeFile">
              <ReFileItem v-for="(file, index) in employee.files" :key="file.name">
                <ReFileName>{{ file.name }}</ReFileName>
                <div>
                  <ReFileButton class="download" @click="downloadEmployeeFile(employee, file)">다운로드</ReFileButton>
                  <ReFileButton class="delete" @click="deleteEmployeeFile(employee, index)">삭제</ReFileButton>
                </div>
              </ReFileItem>
            </ReFileList>
          </ReFileList>
        </ReFileSection>
      </ReFileArea>
    </ReContentArea>
  </MainContainer>
</template>

<script>
import * as PublicCss from '@/assets/styles/public.js';
import * as BaseOrderTemplateCss from '@/assets/styles/BaseOrderTemplateCss.js';
import * as RedesignationCss from '@/assets/styles/redesignation/RedesignationCss.js';
import { ref, onMounted } from 'vue';
import * as redesignationApi from '@/api/redesignation';
import Swal from 'sweetalert2';

export default {
  name: 'RedesignationPage',
  components: {
    ...PublicCss,
    ...BaseOrderTemplateCss,
    ...RedesignationCss,
  },
  setup() {
    // 파일 업로드 관련 상태
    const fileInput = ref(null);
    // 선택 항목
    const selectedItem = ref(null);
    const selectedCategory = ref(null);
    const selectedItemId = ref(null);
    const uploadedFiles = ref([]);
    const uploadProgress = ref(0);
    const isDragOver = ref(false);
    const templates = ref([]);
    const isLoading = ref(false);
    const allFiles = ref([]);
    window.company = ref('');
    window.memberGroup = ref('');
    
    // 양식제공 태그 HTML
    const templateTagHtml = '<span><span class="material-icons" style="color: #2196f3; font-size: 18px; vertical-align: middle;">description</span><span style="color: #2196f3; font-size: 14px;">(양식제공)</span></span>';
    
    // 양식미제공 태그 HTML
    const templateNotProvidedTagHtml = '<span><span style="color: #333; font-size: 14px;">(양식미제공)</span></span>';
    // 정보 태그 HTML 생성 함수
    const createInfoTagHtml = (text) => {
      return `<span><span class="material-icons" style="color: orange; font-size: 18px; vertical-align: middle;">info</span><span style="color: orange; font-size: 14px;">(${text})</span></span>`;
    };
    // 종사자 데이터 처리
    const employeeList = ref([]);
    
    // window.memberGroup에서 종사자 이름 데이터를 가져와 처리하는 함수
    const initializeEmployeeList = () => {
      console.log("initializeEmployeeList 호출됨");
      console.log("window.memberGroup:", window.memberGroup);
      console.log("window.memberGroup.value:", window.memberGroup.value);
      
      try {
        if (window.memberGroup && window.memberGroup.value) {
          let parsedData;
          
          // 문자열인 경우 JSON 파싱 시도
          if (typeof window.memberGroup.value === 'string') {
            try {
              parsedData = JSON.parse(window.memberGroup.value);
              console.log("JSON 파싱 결과:", parsedData);
            } catch (e) {
              console.error("JSON 파싱 오류:", e);
              parsedData = window.memberGroup.value;
            }
          } else {
            // 이미 객체인 경우
            parsedData = window.memberGroup.value;
          }
          
          // 데이터 형식에 따라 처리
          if (Array.isArray(parsedData)) {
            employeeList.value = parsedData.map(employee => ({
              id: employee.id || '',
              name: employee.name || '',
              files: []
            }));
          } else if (typeof parsedData === 'object' && parsedData !== null) {
            employeeList.value = Object.values(parsedData).map(employee => ({
              id: employee.id || '',
              name: employee.name || '',
              files: []
            }));
          }
          
          console.log("처리된 employeeList:", employeeList.value);
        } else {
          console.warn("memberGroup 데이터가 없습니다");
        }
      } catch (error) {
        console.error('종사자 데이터 처리 중 오류 발생:', error);
      }
    };

    // 양식 목록 조회
    const fetchTemplates = async () => {
      try {
        isLoading.value = true;
        const response = await redesignationApi.getTemplates();
        templates.value = response.data;
      } catch (error) {
        console.error('양식 목록 조회 실패:', error);
        showErrorAlert('양식 목록을 불러오는데 실패했습니다.');
      } finally {
        isLoading.value = false;
      }
    };

    // 파일 목록 조회
    const fetchFiles = async () => {
      if (!selectedCategory.value || !selectedItemId.value) return;
      
      try {
        isLoading.value = true;
        const response = await redesignationApi.getFiles(selectedCategory.value, selectedItemId.value, window.company.value);
        uploadedFiles.value = response.data.map(file => ({
          id: file.id,
          name: file.file_name || '파일명 없음', // original_name 사용
          size: file.file_size,
          type: file.mime_type,
          lastModified: new Date(file.created_at).getTime(), // created_at 사용
          uploaded_by: file.uploaded_by
        }));
        
        // 최신순으로 정렬 (createdAt 기준)
        uploadedFiles.value.sort((a, b) => b.lastModified - a.lastModified);
        
      } catch (error) {
        console.error('파일 목록 조회 실패:', error);
        showErrorAlert('파일 목록을 불러오는데 실패했습니다.');
      } finally {
        isLoading.value = false;
      }
    };

    // 직원별 파일 목록 조회
    const fetchEmployeeFiles = async (employee) => {
      try {
        isLoading.value = true;
        const response = await redesignationApi.getEmployeeFiles(employee.id, selectedCategory.value);
        // 현재 선택한 항목 제목과 파일명이 같은 첨부파일만 보이게 필터링
        employee.files = response.data
          .filter(file => file.original_name && file.original_name.startsWith(selectedItem.value))
          .map(file => ({
            id: file.id,
            name: file.original_name || '파일명 없음', // original_name 사용
            size: file.file_size,
            type: file.mime_type,
            lastModified: new Date(file.created_at).getTime() // created_at 사용
          }));
        // 최신순으로 정렬 (createdAt 기준)
        employee.files.sort((a, b) => b.lastModified - a.lastModified);
      } catch (error) {
        console.error('직원 파일 목록 조회 실패:', error);
        showErrorAlert('직원 파일 목록을 불러오는데 실패했습니다.');
      } finally {
        isLoading.value = false;
      }
    };

    // 항목 선택 시 처리
    const handleItemSelect = async (item, category) => {
      selectedItem.value = item;
      selectedCategory.value = category;
      selectedItemId.value = item;
      // 선택된 항목에 해당하는 파일만 조회
      await fetchFiles();
      // 전체 파일 목록 동기화
      await fetchAllFiles();
      // 직원별 파일 목록 조회
      for (const employee of employeeList.value) {
        await fetchEmployeeFiles(employee);
      }
    };

    // 파일 입력 트리거
    const triggerFileInput = () => {
      // 이미 파일이 첨부되어 있으면 아무 작업도 하지 않음
      if (uploadedFiles.value.length > 0) {
        return;
      }
      
      if (fileInput.value && typeof fileInput.value.click === 'function') {
        fileInput.value.click();
      } else {
        // 대체 방법: 직접 input 요소 생성 및 클릭
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        // input.accept = '.pdf';
        input.addEventListener('change', (event) => handleFileSelect(event));
        input.click();
      }
    };

    // 드래그 이벤트 핸들러
    const handleDragOver = (event) => {
      // 이미 파일이 첨부되어 있으면 아무 작업도 하지 않음
      if (uploadedFiles.value.length > 0) {
        return;
      }
      
      // ReFileUploadArea 내부에서만 드래그 앤 드롭 허용
      const target = event.target;
      const uploadArea = document.querySelector('.file-upload-area');
      
      // 이벤트가 ReFileUploadArea 내부에서 발생한 경우에만 처리
      if (uploadArea && (uploadArea.contains(target) || uploadArea === target)) {
        event.preventDefault(); // 기본 동작 방지
        isDragOver.value = true;
      }
    };

    const handleDragLeave = (event) => {
      // 이미 파일이 첨부되어 있으면 아무 작업도 하지 않음
      if (uploadedFiles.value.length > 0) {
        return;
      }
      
      // ReFileUploadArea 내부에서만 드래그 앤 드롭 허용
      const target = event.target;
      const uploadArea = document.querySelector('.file-upload-area');
      
      // 이벤트가 ReFileUploadArea 내부에서 발생한 경우에만 처리
      if (uploadArea && (uploadArea.contains(target) || uploadArea === target)) {
        isDragOver.value = false;
      }
    };

    const handleFileDrop = (event) => {
      // 이미 파일이 첨부되어 있으면 아무 작업도 하지 않음
      if (uploadedFiles.value.length > 0) {
        return;
      }
      
      // ReFileUploadArea 내부에서만 드래그 앤 드롭 허용
      const target = event.target;
      const uploadArea = document.querySelector('.file-upload-area');
      
      // 이벤트가 ReFileUploadArea 내부에서 발생한 경우에만 처리
      if (uploadArea && (uploadArea.contains(target) || uploadArea === target)) {
        event.preventDefault(); // 기본 동작 방지
        isDragOver.value = false;
        const files = event.dataTransfer.files;
        handleFiles(files);
      }
    };

    // 파일 선택 핸들러
    const handleFileSelect = (event) => {
      const files = event.target.files;
      
      if (!files || files.length === 0) return;

      // 파일 형식 검사 제거 (다양한 파일 형식 지원)
      handleFiles(files);
    };

    // 파일 처리 함수
    const handleFiles = async (files) => {
      if (!files || files.length === 0) return;
      if (!selectedCategory.value || !selectedItemId.value) {
        showErrorAlert('파일을 업로드할 항목을 선택해주세요.');
        return;
      }

      // 이미 첨부된 파일이 있는지 확인
      if (uploadedFiles.value.length > 0) {
        showErrorAlert('이미 첨부된 파일이 있습니다. 기존 파일을 삭제한 후 다시 시도해주세요.');
        return;
      }

      // 파일 크기 검증 (형식 검증 제거)
      const validFiles = Array.from(files).filter(file => {
        const isValidSize = file.size <= 20 * 1024 * 1024; // 20MB 제한으로 증가
        return isValidSize;
      });

      if (validFiles.length === 0) {
        showErrorAlert('유효한 파일이 없습니다. 파일 크기는 20MB 이하여야 합니다.');
        return;
      }

      showLoading('파일 업로드 중...');
      
      try {
        // 선택한 항목과 일치하는 템플릿 찾기
        const template = templates.value.find(t => t.name === selectedItem.value && t.category === selectedCategory.value);
        const templateId = template ? template.id : null;
        
        // validFiles 배열의 각 요소에 대해 반복 처리
        for (let i = 0; i < validFiles.length; i++) {
          const file = validFiles[i];
          // 업로드 진행률 시뮬레이션
          uploadProgress.value = 10;
          const interval = setInterval(() => {
            uploadProgress.value += 10;
            if (uploadProgress.value >= 100) {
              clearInterval(interval);
            }
          }, 200);

          // 파일 업로드 (템플릿 ID 전달)
          await redesignationApi.uploadFile(file, selectedCategory.value, selectedItemId.value, templateId, window.company.value);
          
          // 업로드 후 전체 파일 목록 동기화
          await fetchAllFiles();
          // 현재 선택된 항목의 파일 목록 다시 불러오기
          await fetchFiles();

          clearInterval(interval);
          uploadProgress.value = 0;
        }
        
        hideLoading();
        showSuccessAlert('파일이 성공적으로 업로드되었습니다.');
      } catch (error) {
        console.error('파일 업로드 실패:', error);
        hideLoading();
        showErrorAlert('파일 업로드에 실패했습니다.');
      }
    };

    // 파일 다운로드
    const handleFileDownload = async (file) => {
      try {
        console.log('파일 다운로드 시도:', file);
        await redesignationApi.downloadFile(file.id, file.name);
      } catch (error) {
        console.error('파일 다운로드 오류:', error);
        
        let errorMessage = '파일 다운로드 중 오류가 발생했습니다.';
        if (error.response) {
          if (error.response.status === 404) {
            errorMessage = '파일을 찾을 수 없습니다. 파일이 삭제되었거나 존재하지 않습니다.';
          } else if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        }
        
        showErrorAlert(errorMessage);
      }
    };

    // 양식 다운로드
    const downloadTemplate = async () => {
      if (!selectedItem.value || !selectedCategory.value) {
        showErrorAlert('다운로드할 양식을 선택해주세요.');
        return;
      }

      try {
        showLoading('양식 다운로드 중...');
        // 선택한 항목과 일치하는 템플릿 찾기
        const template = templates.value.find(t => t.name === selectedItem.value && t.category === selectedCategory.value);
        
        if (!template) {
          hideLoading();
          showErrorAlert('선택한 양식을 찾을 수 없습니다.');
          return;
        }
        // 파일 경로에서 확장자만 추출
        const fileExtension = template.file_path ? template.file_path.split('.').pop() : '';
        await redesignationApi.downloadTemplate(template.id, template.name, fileExtension);
        hideLoading();
      } catch (error) {
        console.error('양식 다운로드 실패:', error);
        hideLoading();
        showErrorAlert('양식 다운로드에 실패했습니다.');
      }
    };

    // 파일 삭제
    const deleteFile = async (index) => {
      const file = uploadedFiles.value[index];
      
      try {
        // 삭제 전 확인 다이얼로그 표시
        const result = await Swal.fire({
          title: '파일 삭제',
          text: '정말로 이 파일을 삭제하시겠습니까?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: '삭제',
          cancelButtonText: '취소',
          confirmButtonColor: '#d33',
        });
        
        if (result.isConfirmed) {
          showLoading('파일 삭제 중...');
          await redesignationApi.deleteFile(file.id);
          
          // 전체 파일 목록 및 현재 선택된 항목의 파일 목록 다시 불러오기
          await fetchAllFiles();
          await fetchFiles(); // 현재 선택된 항목의 파일 목록 다시 불러오기
          
          hideLoading();
          showSuccessAlert('파일이 성공적으로 삭제되었습니다.');
        }
      } catch (error) {
        console.error('파일 삭제 실패:', error);
        hideLoading();
        showErrorAlert('파일 삭제에 실패했습니다.');
      }
    };

    // 직원별 파일 첨부
    const uploadEmployeeFile = async (employee) => {
      if (!selectedCategory.value) {
        showErrorAlert('파일을 업로드할 항목을 선택해주세요.');
        return;
      }

      // 파일 선택 대화상자 열기
      const input = document.createElement('input');
      input.type = 'file';
      // accept 제한 제거
      
      input.onchange = async (event) => {
        const file = event.target.files[0];
        
        if (!file) return;
        
        // 파일 크기 검증
        if (file.size > 20 * 1024 * 1024) { // 20MB 제한
          showErrorAlert('파일 크기는 20MB 이하여야 합니다.');
          return;
        }

        try {
          showLoading('직원 파일 업로드 중...');
          
          // 선택한 항목과 일치하는 템플릿 찾기
          const template = templates.value.find(t => t.name === selectedItem.value && t.category === selectedCategory.value);
          const templateId = template ? template.id : null;
          
          await redesignationApi.uploadEmployeeFile(employee.id, file, selectedCategory.value, templateId, window.company.value+'_'+employee.id);
          
          // employee.files.push({ ... }); // 직접 추가 대신 목록 동기화
          await fetchEmployeeFiles(employee);
          
          hideLoading();
          showSuccessAlert('직원 파일이 성공적으로 업로드되었습니다.');
        } catch (error) {
          console.error('직원 파일 업로드 실패:', error);
          hideLoading();
          showErrorAlert('직원 파일 업로드에 실패했습니다.');
        }
      };
      
      input.click();
    };
      
    // 직원 파일 다운로드
    const downloadEmployeeFile = async (employee, file) => {
      try {
        showLoading('직원 파일 다운로드 중...');
        await redesignationApi.downloadEmployeeFile(employee.id, file.id);
        hideLoading();
      } catch (error) {
        console.error('직원 파일 다운로드 실패:', error);
        hideLoading();
        showErrorAlert('직원 파일 다운로드에 실패했습니다.');
      }
    };

    // 직원 파일 삭제
    const deleteEmployeeFile = async (employee, fileIndex) => {
      const file = employee.files[fileIndex];
      
      try {
        showLoading('직원 파일 삭제 중...');
        await redesignationApi.deleteEmployeeFile(employee.id, file.id);
        // employee.files.splice(fileIndex, 1); // 직접 제거 대신 목록 동기화
        await fetchEmployeeFiles(employee);
        hideLoading();
        showSuccessAlert('직원 파일이 성공적으로 삭제되었습니다.');
      } catch (error) {
        console.error('직원 파일 삭제 실패:', error);
        hideLoading();
        showErrorAlert('직원 파일 삭제에 실패했습니다.');
      }
    };

    // 전체 파일 다운로드
    const downloadAllFiles = async () => {
      try {
        showLoading('모든 파일 목록을 불러오는 중...');
        
        // 모든 카테고리의 파일 목록 조회
        const categories = ['2-1', '2-2', '2-3', '2-4', '3-1', '3-2', '3-3', '4-1', '4-2'];
        let allFiles = [];
        
        for (const category of categories) {
          try {
            const response = await redesignationApi.getFiles(category);
            if (response.data && response.data.length > 0) {
              allFiles = [...allFiles, ...response.data];
            }
          } catch (error) {
            console.error(`${category} 카테고리 파일 목록 조회 실패:`, error);
          }
        }
        
        hideLoading();
        
        if (allFiles.length === 0) {
          showErrorAlert('다운로드할 파일이 없습니다.');
          return;
        }
        
        // 파일 목록 표시
        const fileListHtml = allFiles.map(file => 
          `<div style="margin-bottom: 5px;">
            <span>${file.original_name}</span>
            <button class="download-btn" data-file-id="${file.id}" style="margin-left: 10px; background-color: #3498db; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">다운로드</button>
          </div>`
        ).join('');
        
        await Swal.fire({
          title: '전체 파일 목록',
          html: `
            <div style="max-height: 300px; overflow-y: auto; text-align: left;">
              ${fileListHtml}
            </div>
          `,
          confirmButtonText: '닫기',
          width: '600px',
          didOpen: (popup) => {
            // 다운로드 버튼에 이벤트 리스너 추가
            const downloadButtons = popup.querySelectorAll('.download-btn');
            downloadButtons.forEach(button => {
              button.addEventListener('click', async () => {
                const fileId = button.getAttribute('data-file-id');
                if (fileId) {
                  try {
                    showLoading('파일 다운로드 중...');
                    await redesignationApi.downloadFile(fileId);
                    hideLoading();
                  } catch (error) {
                    console.error('파일 다운로드 실패:', error);
                    hideLoading();
                    showErrorAlert('파일 다운로드에 실패했습니다.');
                  }
                }
              });
            });
          }
        });
      } catch (error) {
        console.error('전체 파일 목록 조회 실패:', error);
        hideLoading();
        showErrorAlert('파일 목록을 불러오는데 실패했습니다.');
      }
    };

    // Alert 관련 함수
    const showLoading = (message) => {
      Swal.fire({
        title: message || '처리 중...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
    };

    const hideLoading = () => {
      Swal.close();
    };

    const showSuccessAlert = (message) => {
      Swal.fire({
        icon: 'success',
        title: '성공',
        text: message,
        confirmButtonText: '확인'
      });
    };

    const showErrorAlert = (message) => {
      Swal.fire({
        icon: 'error',
        title: '오류',
        text: message,
        confirmButtonText: '확인'
      }); 
    };

    // 컴포넌트 마운트 시 양식 목록 조회
    onMounted(async () => {
      await fetchTemplates();
      await fetchAllFiles();
      
      // Python에서 데이터가 초기화될 때까지 기다림
      const checkDataInterval = setInterval(() => {
        if (window.memberGroup && window.memberGroup.value) {
          clearInterval(checkDataInterval);
          initializeEmployeeList();
          console.log("데이터 초기화 완료:", window.memberGroup.value);
        }
      }, 1000);
      
      // 최대 10초 후에는 강제로 초기화 시도
      setTimeout(() => {
        clearInterval(checkDataInterval);
        initializeEmployeeList();
        console.log("타임아웃 후 초기화 시도:", window.memberGroup);
      }, 10000);
    });

    const isFileAttached = (template) => {
      if (!template) return false;
      return allFiles.value.some(file => {
        // 카테고리 일치 확인
        if (file.category !== template.category) return false;
        
        // uploaded_by와 window.company 값 비교
        // 파일의 uploaded_by가 있고, window.company와 다르면 해당 파일은 무시
        console.log("isFileAttached", 'file.uploaded_by', file.uploaded_by, 'window.company', window.company);
        if (file.uploaded_by && file.uploaded_by !== window.company.value) return false;
        
        // item_id로 일치 확인
        if (file.item_id === (template.id ? template.id.toString() : undefined)) return true;
        
        // 파일 이름으로 일치 확인 (uploaded_by가 포함된 경우 처리)
        const fileName = file.file_name || '';
        // 파일 이름이 템플릿 이름으로 시작하고 _로 구분된 경우
        if (fileName.startsWith(template.name) && fileName.includes('_')) return true;
        
        // 이전 방식으로도 확인 (하위 호환성)
        if (fileName === template.name) return true;
        
        return false;
      });
    };

    // 추가된 함수: 모든 템플릿에 대해 파일 목록 조회
    const fetchAllFiles = async () => {
      try {
        const response = await redesignationApi.getFiles('', '', window.company.value); // 파라미터 없이 전체 목록 요청
        allFiles.value = response.data || [];
      } catch (error) {
        console.error('전체 파일 목록 조회 실패:', error);
      }
    };

    return {
      fileInput,
      selectedItem,
      selectedCategory,
      selectedItemId,
      uploadedFiles,
      uploadProgress,
      isDragOver,
      templates,
      employeeList,
      handleItemSelect,
      triggerFileInput,
      handleDragOver,
      handleDragLeave,
      handleFileDrop,
      handleFileSelect,
      handleFileDownload,
      downloadTemplate,
      downloadAllFiles,
      deleteFile,
      uploadEmployeeFile,
      downloadEmployeeFile,
      deleteEmployeeFile,
      isFileAttached,
      templateTagHtml,
      templateNotProvidedTagHtml,
      createInfoTagHtml
    };
  }
};
</script>
