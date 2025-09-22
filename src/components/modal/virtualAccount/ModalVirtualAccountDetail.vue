<template>
  <VirtualSendContent class="virtualSendContent">
    <div class="title">가상계좌 상세</div>

    <VirtualTable class="detail">
      <thead>
        <tr>
          <th>등록일</th>
          <td>2025-01-01</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>고객명</th>
          <td>
            홍길동
          </td>
        </tr>
        <tr>
          <th>인정번호</th>
          <td>
            L1234567890
          </td>
        </tr>
        <tr>
          <th>연락처</th>
          <td>
            010-1234-5678
            &nbsp;
            <button class="blueBtn">재발송</button>
          </td>
        </tr>

        <tr>
          <th>가상계좌은행</th>
          <td>
            농협
          </td>
        </tr>

        <tr>
          <th>가상계좌번호</th>
          <td>
            000000000000000
          </td>
        </tr>
        <tr>
          <th>입금가능<br>기간</th>
          <td>
            2099-12-31
          </td>
        </tr>

        <tr>
          <th>항목명</th>
          <td>
            <select disabled>
              <option value="본인부담금">본인부담금</option>
              <option value="비급여">비급여</option>
              <option value="기타">기타</option>
            </select>
          </td>
        </tr>

        <tr>
          <th>입금여부</th>
          <td class="pastelGreenBg">
            <!-- 미납이면 위에 클래스 pastelRedBg 쓰시면 됩니당 -->
            납부일시: 2025-01-01 10:00:00
          </td>
        </tr>

        <tr>
          <th>입금금액</th>
          <td>
            <input type="text" disabled placeholder="입금금액">
          </td>
        </tr>

        <tr>
          <th>현금영수증<br>인증번호</th>
          <td>
            <input type="text" disabled placeholder="현금영수증 인증번호">
          </td>
        </tr>

        <tr>
          <th>비고</th>
          <td>
            <textarea disabled placeholder="수정기능 업데이트 중입니다."></textarea>
          </td>
        </tr>
      </tbody>
    </VirtualTable>
  </VirtualSendContent>
</template>

<script>
import * as PublicCss from '@/assets/styles/public.js';
import * as ModalCss from '@/assets/styles/ModalCss.js';
import * as VirtualAccountCss from '@/assets/styles/virtualAccount/VirtualAccountCss.js'

export default {
  name: 'ModalVirtualAccountDetail',
  components: {
    ...PublicCss,
    ...ModalCss,
    ...VirtualAccountCss,
  },

  setup() {
    return {
    }
  }
}
</script>