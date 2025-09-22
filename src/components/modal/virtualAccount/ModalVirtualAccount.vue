<template>
  <VirtualSendContent class="virtualSendContent">
    <div class="title">가상계좌 발송</div>
    <div class="guide">
      * 가상계좌등록 5분 이내에 입금안내 문자가 자동발송됩니다.
    </div>
    <div class="guide">
      * 기존고객은 '내역불러오기'로 동일한 가상계좌를 사용할 수 있습니다.
    </div>

    <VirtualTable>
      <thead>
        <tr>
          <th><span class="redFont">*</span>&nbsp;고객명</th>
          <td>
            <div class="flex-div">
              <input type="text" class="newClient" placeholder="신규고객명">
              <button class="blueBtn" @click="showModalVirtualAccountSend">내역 불러오기</button>
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th><span class="redFont">*</span>&nbsp;연락처</th>
          <td>
            <input type="text" placeholder="연락처">
          </td>
        </tr>

        <tr>
          <th>가상계좌번호</th>
          <td>
            <input type="text" disabled placeholder="신규생성">
          </td>
        </tr>

        <tr>
          <th>가상계좌은행</th>
          <td>
            농협
          </td>
        </tr>

        <tr>
          <th><span class="redFont">*</span>&nbsp;입금가능<br>기간</th>
          <td>
            <input type="date" value="2099-12-31">
          </td>
        </tr>

        <tr>
          <th><span class="redFont">*</span>&nbsp;항목명</th>
          <td>
            <select>
              <option value="본인부담금">본인부담금</option>
              <option value="비급여">비급여</option>
              <option value="기타">기타</option>
            </select>
          </td>
        </tr>

        <tr>
          <th><span class="redFont">*</span>&nbsp;입금금액</th>
          <td>
            <input type="text" placeholder="입금금액">
          </td>
        </tr>

        <tr>
          <th>현금영수증<br>인증번호</th>
          <td>
            <input type="text" placeholder="현금영수증 인증번호">
          </td>
        </tr>

        <tr>
          <th>비고</th>
          <td>
            <textarea placeholder="비고"></textarea>
          </td>
        </tr>
      </tbody>
    </VirtualTable>
  </VirtualSendContent>

  <ModalBtnHeightDiv />
  <ModalBtnDiv>
    <BlueBtn>발송</BlueBtn>
    <RedBtn>취소</RedBtn>
  </ModalBtnDiv>
</template>

<script>
import * as PublicCss from '@/assets/styles/public.js';
import * as ModalCss from '@/assets/styles/ModalCss.js';
import * as VirtualAccountCss from '@/assets/styles/virtualAccount/VirtualAccountCss.js'
import Swal from 'sweetalert2';

export default {
  name: 'ModalVirtualAccount',
  components: {
    ...PublicCss,
    ...ModalCss,
    ...VirtualAccountCss,
  },

  setup() {
    const showModalVirtualAccountSend = () => {
      Swal.fire({
        title: '가상계좌 고객 불러오기',
        width: "40%",
        showCloseButton: true,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: '닫기',
        html: `
        <div class="width100">
        <div class="flex-div marginBottom10 width100">
          <input class="width80" type="text" placeholder="고객명 또는 연락처 검색">
          &nbsp;
          <button class="blueBtn">검색</button>
        </div>
        <div class="swalListContainer ">
          <table class="swalListTable">
            <thead>
              <tr>
                <th>최초등록일</th>
                <th>고객명</th>
                <th>연락처</th>
                <th>가상계좌번호</th>
                <th>비고</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr>
              <tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr>
              <tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr>
              <tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr><tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr>
              <tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr><tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr>
              <tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr><tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr>
              <tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr><tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr>
              <tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr><tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr>
              <tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr><tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr>
              <tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr><tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr>
              <tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr><tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr>
              <tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr><tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr>
              <tr>
                <td>2025-01-01</td>
                <td>홍길동</td>
                <td>010-1234-5678</td>
                <td>1234567890</td>
                <td>비고</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
        `,
      })
    }

    return {
      showModalVirtualAccountSend,
    }
  }
}
</script>