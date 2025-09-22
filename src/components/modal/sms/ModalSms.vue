<template>
  <div>
    <FlexDiv>
      <CommonTitleArea>
        <CommonTitleDiv>
          <i class="material-icons">sms</i>&nbsp;
          카카오톡 / 문자 발송
        </CommonTitleDiv>
      </CommonTitleArea>
    </FlexDiv>

    <SmsBody>
      <!-- 발신번호 목록 -->
      <SmsContent>
        <SmsTableTitle>발신번호 목록</SmsTableTitle>
        <SmsTable>
          <thead>
            <tr>
              <th>선택</th>
              <th>발신번호</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" @click="selectCallNum = !selectCallNum" />
              </td>
              <td>010-1234-5678</td>
            </tr>
          </tbody>
        </SmsTable>
      </SmsContent>

      <!-- 문자 발송 내용 선택 -->
      <SmsContent>
        <SmsTableTitle>문자 발송 내용 선택</SmsTableTitle>
        <MsgContentList>
          <MsgTypeItem class="active">
              (친구톡, SMS)<br/>
              직접작성
          </MsgTypeItem>
          <MsgTypeItem v-for="item in 6" :key="item">
              (알림톡 탬플릿)
              <br/>
              전동침대 대여(임대)에 관한 유의사항
          </MsgTypeItem>
          <MsgTypeItem>
              (친구톡, SMS)
              <br/>
              급여제공기록지
          </MsgTypeItem>
        </MsgContentList>
      </SmsContent>

      <!-- 메시지 내용 -->
      <SmsContent class="width20">
        <SmsTableTitle>메시지 내용</SmsTableTitle>
        <!-- 발신번호가 선택되지 않았다면 경고 문구 출력-->
        <MsgWarning v-if="!selectCallNum">발신번호를 선택해주세요.</MsgWarning>
          <MsgTextarea placeholder="내용을 입력해주세요."></MsgTextarea>
      </SmsContent>

      <!-- 수신자 선택 -->
      <SmsContent>
        <SmsTableTitle>수신자 선택</SmsTableTitle>
        <RecipientTab>
          <button :class="activeTab == 'select' ? 'active' : ''" @click="activeTab = 'select'">선택형식</button>
          <button :class="activeTab == 'manual' ? 'active' : ''" @click="activeTab = 'manual'">수동직접입력</button>
        </RecipientTab>

        <RecipientContent v-if="activeTab == 'select'">
          <FlexDiv>
            <RecipientLabel>대여월</RecipientLabel>
            <RecipientSelect>
              <option>6월</option>
              <option>5월</option>
              <option>4월</option>
            </RecipientSelect>
          </FlexDiv>
          <FlexDiv>
            <RecipientLabel>품목</RecipientLabel>
            <RecipientSelect>
              <option>전체</option>
              <option>전동침대</option>
              <option>배회감지기</option>
            </RecipientSelect>
          </FlexDiv>
          <FlexDiv>
            <RecipientLabel>상태</RecipientLabel>
            <RecipientSelect>
              <option>전체</option>
              <option>대여중</option>
              <option>당월 회수</option>
            </RecipientSelect>
          </FlexDiv>
        </RecipientContent>

        <RecipientContent v-if="activeTab == 'manual'"> 
          <SmsSearch>
            <input type="text" placeholder="검색어를 입력" />
            <button>검색</button>
          </SmsSearch>

          <RecipientTableContainer>
            <RecipientTable>
            <thead>
              <tr>
                <th>성함</th>
                <th>인정번호</th>
                <th>+</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(item, index) in recipientList" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.phone }}</td>
                <td>
                  <button @click="addRecipient(item)" :class="item.select ? 'red' : ''">+</button>
                </td>
              </tr>
              </tbody>
            </RecipientTable>
          </RecipientTableContainer>
        </RecipientContent>
      </SmsContent>

      <!-- 수신자 목록 -->
      <SmsContent class="width30">
        <SmsTableTitle>수신자 목록 [ {{ recipientSelectList.length }}명 ]</SmsTableTitle>
        <SmsSearch>
          <input type="text" placeholder="검색어를 입력해주세요." />
          <button>검색</button>
        </SmsSearch>

        <RecipientTableContainer v-if="activeTab == 'select'">
        <RecipientTable>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>성함</th>
              <th>인정번호</th>
              <th>대여품목</th>
              <th>연락처</th>
              <th>대여종료일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>홍길동</td>
              <td>L1234567890</td>
              <td>전동침대</td>
              <td>01012345678</td>
              <td>2025-06-30</td>
            </tr>
            <!-- 데이터가 없을 때 표시 -->
            <tr>
              <td colspan="6">
                검색 조건에 맞는 데이터가 없습니다.
              </td>
            </tr>
            </tbody>
          </RecipientTable>
        </RecipientTableContainer>

        <RecipientTableContainer v-if="activeTab == 'manual'">
        <RecipientTable>
          <thead>
            <tr>
              <th></th>
              <th>성함</th>
              <th>인정번호</th>
              <th>연락처</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in recipientSelectList" :key="index">
              <td>
                <button class="red">-</button>
              </td>  
              <td>{{ item.name }}</td>
              <td>{{ item.lNum }}</td>
              <td>{{ item.phone }}</td>
            </tr>
            <!-- 데이터가 없을 때 표시 -->
            <tr>
              <td colspan="4">
                검색 조건에 맞는 데이터가 없습니다.
              </td>
            </tr>
          </tbody>
        </RecipientTable>
        </RecipientTableContainer>
      </SmsContent>
    </SmsBody>

    <ModalBtnHeightDiv />
    <ModalBtnDiv>
      <ModalBtn class="green">예약발송</ModalBtn>
      <ModalBtn class="red">취소</ModalBtn>
    </ModalBtnDiv>
  </div>
</template>

<script>
import { ref } from 'vue';
import * as PublicCss from '@/assets/styles/public.js';
import * as ModalCss from '@/assets/styles/ModalCss.js';
import * as ModalSmsCss from '@/assets/styles/rentLookUp/ModalSmsCss.js';

export default {
  name: 'ModalSms',
  components: {
    ...PublicCss,
    ...ModalCss,
    ...ModalSmsCss
  },

  setup() {
    const selectCallNum = ref(false);
    const activeTab = ref('manual');

    const recipientList = ref([
      {
        name: '홍길동',
        phone: '01012345678',
        lNum: 'L1234567890',
        select: false
      },
      {
        name: '김길동',
        phone: '01012345679',
        lNum: 'L1234567891',
        select: false
      }
    ]);
    const recipientSelectList = ref([]);

    const addRecipient = (data) => {
      recipientSelectList.value.push(data);
    }

    return {
      selectCallNum,
      activeTab,
      recipientList,
      recipientSelectList,
      addRecipient,
    }
  }
}
</script>