<template>
  <div>
    <div id="doc">
      <div style="font-weight: bold; font-size: 18px; text-align: center; ">
        자동이체 이용 신청서
      </div>
      <div style="font-weight: bold; font-size: 15px; text-align: center; margin-bottom: 5px;">
        (신청 구분(택 1): &nbsp;&nbsp;
        <span class="topchk">&nbsp;O&nbsp;</span>
        <span class="chkservice" @click="changeState">신규</span> /
        &nbsp;&nbsp;&nbsp;
        <span class="topchk"></span>
        <span class="chkservice" @click="changeState">변경</span> /
        &nbsp;&nbsp;&nbsp;
        <span class="topchk"></span>
        <span class="chkservice" @click="changeState">해지</span>)
      </div>
      <div style="font-size: 13px; margin-bottom: 5px;">
        ◈ 수납기관 및 요금정보[수납기관 기재란]
      </div>
      <table style="font-size: 13px; border-collapse: collapse; width: 100%;" cellspacing="0">
        <tr>
          <td style="
                border-style: solid;
                border-width: 2pt 1pt 1pt 2pt;
                padding: 2px;
              " colspan="10" bgcolor="#F1F1F1">
            <div style="text-align: center;">
              수납 기관명
            </div>
          </td>
          <td style="
                border-style: solid;
                border-width: 2pt 1pt 1pt 1pt;
              " colspan="10">
            <span style="padding-left: 5px;">
              
            </span>
          </td>
          <td style="
                border-style: solid;
                border-width: 2pt 1pt 1pt 1pt;
              " bgcolor="#F1F1F1">
            <div style="text-align: center;">
              대표자명
            </div>
          </td>
          <td style="
                border-style: solid;
                border-width: 2pt 2pt 1pt 1pt;
              ">
            <span style="padding-left: 5px;">
              
            </span>
          </td>
        </tr>
        <tr>
          <td style="
                border-style: solid;
                border-width: 1pt 1pt 1pt 2pt;
                padding: 2px;
                " colspan="10" bgcolor="#F1F1F1">
            <div style="text-align: center;">
              사업장 주소
            </div>
          </td>
          <td style="
                border-style: solid;
                border-width: 1pt 2pt 1pt 1pt;
              " colspan="12">
            <span style="padding-left: 5px;">
              
            </span>
          </td>
        </tr>
        <tr>
          <td style="
                border-style: solid;
                border-width: 1pt 1pt 1pt 2pt;
                padding: 2px;
              " colspan="10" bgcolor="#F1F1F1">
            <div style=" text-align: center;">
              사업자등록번호
            </div>
          </td>
          <td style="
                border-style: solid;
                border-width: 1pt 1pt 1pt 1pt;
              " colspan="10">
            <span style="padding-left: 5px;">

            </span>
          </td>
          <td style="
                border-style: solid;
                border-width: 1pt 1pt 1pt 1pt;
              " bgcolor="#F1F1F1">
            <div style="text-align: center;">
              자동이체 사유
            </div>
          </td>
          <td style="
                border-style: solid;
                border-width: 1pt 2pt 1pt 1pt;
              ">
            <span style="padding-left: 5px;">
              
            </span>
          </td>
        </tr>
        <tr>
          <td style="
                border-style: solid;
                border-width: 1pt 1pt 1pt 2pt;
                padding: 2px;
              " colspan="10" bgcolor="#F1F1F1">
            <div style=" text-align: center;">
              출금통장 기재내역
            </div>
          </td>
          <td style="
                border-style: solid;
                border-width: 1pt 1pt 1pt 1pt;
              " colspan="10">
            <span style="padding-left: 5px">

            </span>
          </td>
          <td style="
                border-style: solid;
                border-width: 1pt 1pt 1pt 1pt;
              " bgcolor="#F1F1F1">
            <div style="text-align: center;">
              수납 요금
            </div>
          </td>
          <td style="
                border-style: solid;
                border-width: 1pt 2pt 1pt 1pt;
              ">
            <span>
              
            </span>
          </td>
        </tr>
        <tr>
          <td style="
                border-style: solid;
                border-width: 1pt 1pt 1pt 2pt;
                padding: 2px;
              " colspan="20" bgcolor="#F1F1F1">
            <div style="text-align: center;">
              납부자 번호(고객번호)
            </div>
          </td>
          <td style="
                border-style: solid;
                border-width: 1pt 1pt 1pt 1pt;
              " bgcolor="#F1F1F1">
            <div style="text-align: center;">
              이체 시작 월
            </div>
          </td>
          <td style="
                border-style: solid;
                border-width: 1pt 2pt 1pt 1pt;
              " bgcolor="#F1F1F1">
            <div style="text-align: center;">
              지정 출금일
            </div>
          </td>
        </tr>
        <tr>
          <td style="
                width: 14pt;
                border-style: solid;
                border-right-style: dashed;
                border-width: 1pt 1pt 2pt 2pt;
                padding: 2px;
              ">
            <div style="text-align: center;">
            </div>
          </td>
          <td style="
                width: 14pt;
                border-bottom-style: solid;
                border-right-style: dashed;
                border-width: 1pt 1pt 2pt 1pt;
                padding: 2px;
              ">
            <div style="text-align: center;">
            </div>
          </td>
          <td style="
                width: 14pt;
                border-bottom-style: solid;
                border-right-style: dashed;
                border-width: 1pt 1pt 2pt 1pt;
                padding: 2px;
              ">
            <div style="text-align: center;">
            </div>
          </td>
          <td style="
                width: 14pt;
                border-bottom-style: solid;
                border-right-style: dashed;
                border-width: 1pt 1pt 2pt 1pt;
                padding: 2px;
              ">
            <div style="text-align: center;">
            </div>
          </td>
          <td style="
                width: 14pt;
                border-bottom-style: solid;
                border-right-style: dashed;
                border-width: 1pt 1pt 2pt 1pt;
                padding: 2px;
              ">
            <div style="text-align: center;">
            </div>
          </td>
          <td style="
                width: 14pt;
                border-bottom-style: solid;
                border-right-style: dashed;
                border-width: 1pt 1pt 2pt 1pt;
                padding: 2px;
              ">
            <div style="text-align: center;">
            </div>
          </td>
          <td style="
                width: 14pt;
                border-bottom-style: solid;
                border-right-style: dashed;
                border-width: 1pt 1pt 2pt 1pt;
                padding: 2px;
              ">
            <div style="text-align: center;"></div>
          </td>
          <td style="
                width: 14pt;
                border-bottom-style: solid;
                border-right-style: dashed;
                border-width: 1pt 1pt 2pt 1pt;
                padding: 2px;
              ">
            <div style="text-align: center;"></div>
          </td>
          <td style="
                width: 14pt;
                border-bottom-style: solid;
                border-right-style: dashed;
                border-width: 1pt 1pt 2pt 1pt;
                padding: 2px;
              ">
            <div style="text-align: center;"></div>
          </td>
          <td style="
                width: 14pt;
                border-bottom-style: solid;
                border-right-style: dashed;
                border-width: 1pt 1pt 2pt 1pt;
                padding: 2px;
              ">
            <div style="text-align: center;"></div>
          </td>
          <td style="
                width: 14pt;
                border-bottom-style: solid;
                border-right-style: dashed;
                border-width: 1pt 1pt 2pt 1pt;
                padding: 2px;
              ">
            <div style="text-align: center;"></div>
          </td>
          <td style="
                width: 14pt;
                border-bottom-style: solid;
                border-right-style: dashed;
                border-width: 1pt 1pt 2pt 1pt;
                padding: 2px;
              ">
            <div style="text-align: center;"></div>
          </td>
          <td style="
                width: 14pt;
                border-bottom-style: solid;
                border-right-style: dashed;
                border-width: 1pt 1pt 2pt 1pt;
                padding: 2px;
              ">
            <div style="text-align: center;"></div>
          </td>
          <td style="
                width: 14pt;
                border-bottom-style: solid;
                border-right-style: dashed;
                border-width: 1pt 1pt 2pt 1pt;
                padding: 2px;
              ">
            <div style="text-align: center;"></div>
          </td>
          <td style="
                width: 14pt;
                border-bottom-style: solid;
                border-right-style: dashed;
                border-width: 1pt 1pt 2pt 1pt;
                padding: 2px;
              ">
            <div style="text-align: center;"></div>
          </td>
          <td style="
                width: 14pt;
                border-bottom-style: solid;
                border-right-style: dashed;
                border-width: 1pt 1pt 2pt 1pt;
                padding: 2px;
              ">
            <div style="text-align: center;"></div>
          </td>
          <td style="
                width: 14pt;
                border-bottom-style: solid;
                border-right-style: dashed;
                border-width: 1pt 1pt 2pt 1pt;
                padding: 2px;
              ">
            <div style="text-align: center;"></div>
          </td>
          <td style="
                width: 14pt;
                border-bottom-style: solid;
                border-right-style: dashed;
                border-width: 1pt 1pt 2pt 1pt;
                padding: 2px;
              ">
            <div style="text-align: center;"></div>
          </td>
          <td style="
                width: 14pt;
                border-bottom-style: solid;
                border-right-style: dashed;
                border-width: 1pt 1pt 2pt 1pt;
                padding: 2px;
              ">
            <div style="text-align: center;"></div>
          </td>
          <td style="
                width: 14pt;
                border-bottom-style: solid;
                border-right-style: dashed;
                border-width: 1pt 1pt 2pt 1pt;
                padding: 2px;
              ">
            <div style="text-align: center;"></div>
          </td>
          <td style="
                width: 140pt;
                border-style: solid;
                border-width: 1pt 1pt 2pt 1pt;
              ">
            <div style="text-align: center; padding: 2px;">
              <input
                style="font-size: 13px; border:none; border-bottom: 1px solid #000; border-radius: 0; width: 35px;" />년
              <input
                style="font-size: 13px; border:none; border-bottom: 1px solid #000; border-radius: 0; width: 15px;" />월
            </div>
          </td>
          <td style="
                width: 149pt;
                border-style: solid;
                border-width: 1pt 2pt 2pt 1pt;
              ">
            <div style="text-align: center;">
              매월 25일
            </div>
          </td>
        </tr>
      </table>
      <div style="font-size: 13px; padding: 5px 0 5px 0;">
        ◈ 자동이체 신청정보[신청인 기재란]
      </div>
      <table style="font-size: 13px; border-collapse: collapse; width:100%" cellspacing="0">
        <tr>
          <td style="
                width: 144pt;
                border-style: solid;
                border-width: 2pt 1pt 1pt 2pt;
                padding: 2px;
                " bgcolor="#DEEAF6">
            <div style="text-align: center;">
              신청인명
            </div>
          </td>
          <td style="
                width: 146pt;
                border-style: solid;
                border-width: 2pt 1pt 1pt 1pt;
              ">
            <span style="padding-left: 3px">
            </span>
          </td>
          <td style="
                width: 121pt;
                border-style: solid;
                border-width: 2pt 1pt 1pt 1pt;
              " bgcolor="#DEEAF6">
            <div style="text-align: center;">
              예금주와의 관계
            </div>
          </td>
          <td style="
                width: 149pt;
                border-style: solid;
                border-width: 2pt 2pt 1pt 1pt;
              ">
            <span style="padding-left: 3px">
              본인
            </span>
          </td>
        </tr>
        <tr>
          <td style="
                width: 144pt;
                border-style: solid;
                border-width: 1pt 1pt 1pt 2pt;
                padding: 2px;
                " bgcolor="#DEEAF6">
            <div style="text-align: center;">
              신청인 연락처
            </div>
          </td>
          <td style="
                width: 146pt;
                border-style: solid;
                border-width: 1pt 1pt 1pt 1pt;
              ">
            <span style="padding-left: 3px">
            </span>
          </td>
          <td style="
                width: 144pt;
                border-style: solid;
                border-width: 1pt 1pt 1pt 1pt;
                padding: 2px;
                " bgcolor="#DEEAF6">
            <div style="text-align: center;">
              신청인 연락처
            </div>
          </td>
          <td style="
                width: 146pt;
                border-style: solid;
                border-width: 1pt 2pt 1pt 1pt;
              ">
            <span style="padding-left: 3px">
            </span>
          </td>
        </tr>
        <tr>
          <td style="
                border-style: solid;
                border-width: 1pt 2pt 1pt 2pt;
                padding: 2px;
              " colspan="4" bgcolor="#BCD5ED">
            <div style="text-align: center;">
              자동이체 정보
            </div>
          </td>
        </tr>
        <tr>
          <td style="
                border-style: solid;
                border-width: 1pt 1pt 1pt 2pt;
                padding: 2px;" bgcolor="#BCD5ED">
            <div style="text-align: center;">
              출금이체 결제수단
            </div>
          </td>
          <td style="
                width: 416pt;
                border-style: solid;
                border-width: 1pt 2pt 1pt 1pt;
              " colspan="3">
            <span style="padding-left: 10px;">
              ✔ 계좌
            </span>
          </td>
        </tr>
        <tr>
          <td style="
                border-style: solid;
                border-width: 1pt 1pt 1pt 2pt;
                padding: 2px; text-align: center;" bgcolor="#BCD5ED">
            <span>
              예금주명
            </span>
          </td>
          <td style="
                width: 146pt;
                border-style: solid;
                border-width: 1pt 1pt 1pt 1pt;
              ">
            <span style="padding-left: 3px">
            </span>
          </td>
          <td style="
                width: 121pt;
                border-style: solid;
                border-width: 1pt 1pt 1pt 1pt;
              " bgcolor="#BCD5ED">
            <div style="text-align: center;">
              예금주 생년월일
              <br />
              (주민번호 앞 6자리)
            </div>
          </td>
          <td style="
                width: 149pt;
                border-style: solid;
                border-width: 1pt 2pt 1pt 1pt;
              ">
            <span style="padding-left: 3px;">
            </span>
          </td>
        </tr>
        <tr>
          <td style="
                width: 144pt;
                border-style: solid;
                border-width: 1pt 1pt 1pt 2pt;
              " bgcolor="#BCD5ED">
            <div style="text-align: center;">
              은행명
            </div>
          </td>
          <td style="
                width: 146pt;
                border-style: solid;
                border-width: 1pt 1pt 1pt 1pt;
              ">
            <p style="text-indent: 0pt; text-align: left">
            </p>
          </td>
          <td style="
                width: 121pt;
                border-style: solid;
                border-width: 1pt 1pt 1pt 1pt;
              " bgcolor="#BCD5ED">
            <div style="text-align: center;">
              사업자등록번호
            </div>
          </td>
          <td style="
                width: 149pt;
                border-style: solid;
                border-width: 1pt 2pt 1pt 1pt;
              ">
            <p style="padding-left: 28pt; text-indent: 0pt; text-align: left">
            </p>
          </td>
        </tr>
        <tr>
          <td style="
                width: 144pt;
                border-style: solid;
                border-width: 1pt 1pt 2pt 2pt;
              " bgcolor="#BCD5ED">
            <div style="text-align: center;">
              계좌 번호
            </div>
          </td>
          <td style="
                width: 146pt;
                border-style: solid;
                border-width: 1pt 1pt 2pt 1pt;
              ">
            <p style="text-indent: 0pt; text-align: left">
            </p>
          </td>
          <td style="
                width: 121pt;
                border-style: solid;
                border-width: 1pt 1pt 2pt 1pt;
              " bgcolor="#BCD5ED">
            <div style="text-align: center;">
              예금주 연락처
            </div>
          </td>
          <td style="
                width: 149pt;
                border-style: solid;
                border-width: 1pt 2pt 2pt 1pt;
              ">
            <p style="text-indent: 0pt; text-align: left">
            </p>
          </td>
        </tr>
      </table>
      <span style="font-size: 13px;">
        ※ 평생계좌(휴대폰번호)번호, 법인공용카드, 선불카드, 해외발행카드 등
        일부 계좌 및 카드는 자동이체 서비스 신청이 불가합니다.
      </span>
      <table style="font-size: 13px; border-collapse: collapse; width: 100%; margin-top: 3px;" cellspacing="0">
        <tr>
          <td style="border-style: solid;
                border-width: 1pt;
                text-align: center;" colspan="2">
            <span>
              자동이체 서비스 약관
            </span>
          </td>
        </tr>
        <tr>
          <td style="
                width: 279pt;
                text-align: left;
                border-style: solid;
                border-width: 1pt;">
            <div style="padding: 5px;">
              <li>
                <span>신청자는 본 신청서에 서명하거나 공인인증 및 그에 준하는
                  전자 인증절차를 통함으로써 본 서비스를 이용할 수
                  있습니다.</span>
              </li>
              <li>
                <span>회사는 서비스 제공을 위하여 이용자가 제출한 지급결제수단
                  정보를 해당 금융기관(통신사 포함)에 제공할 수
                  있습니다.</span>
              </li>
              <li>
                <span>자동이체 개시일을 이용자가 지정하지 않은 경우 재화 등을
                  공급하는 자로부터 사전 통지 받은 납기일을 최초
                  개시일로 하며, 출금은 이용업체와 협의한 날짜에 계좌출금이
                  이루어 집니다.</span>
              </li>
              <li>

                <span>자동이체 금액은 해당 지정 출금일 영업 시간 내에 입금된
                  예금(지정출금일에 입금된 타점권은 제외)에 한하여 출금
                  처리 되며, 출금이체 금액의 이의가 있는 경우에는
                  이용업체에 협의하여 조정키로 합니다.</span>
              </li>
              <li>
                <span>
                  납기일에 동일한 수종의 자동이체 청구가 있는 경우 이체 우선
                  순위는 이용자의 거래 금융기관이 정하는 바에 따릅니다.
                </span>
              </li>
            </div>
          </td>
          <td style="
                width: 279pt;
                text-align: left;
                border-style: solid;
                border-width: 1pt;">
            <div style="padding: 5px;">
              <li>
                자동이체 납부일이 영업일이 아닌 경우에는 다음 영업일을
                납부일로 합니다.
              </li>
              <li>
                <span>이용자가 자동이체 신청(신규, 해지, 변경)을 원하는 경우
                  해당 납기일 30일 전까지 회사에 통지해야
                  합니다.</span>
              </li>
              <li>
                <span>이용자가 제출한 지급결제수단의 잔액(예금한도, 신용한도
                  등)이 예정 결제금액보다 부족하거나 지급제한, 연체 등
                  납부자의 과실에 의해 발생하는 손해의 책임은 이용자에게
                  있습니다.</span>
              </li>
              <li>

                <span>이용자가 금융기관 및 회사가 정하는 기간 동안 자동이체
                  이용 실적이 없는 경우 사전 통지 후 자동이체를 해지할
                  수 있습니다.</span>
              </li>
              <li>
                <span>회사는 이용자와의 자동이체서비스 이용과 관련된 구체적인
                  권리, 의무를 정하기 위하여 본 약관과는 별도로
                  자동이체서비스이용약관을 제정할 수 있습니다.</span>
              </li>
            </div>
          </td>
        </tr>
        <tr>
          <td style="
                border-style: solid;
                text-align: left;
                border-width: 1pt;" colspan="2">
            [개인정보 수집 및 이용 동의]
            <li>
              수집 및 이용목적: 자동이체를 통한 요금 수납, 민원처리 및
              동의여부 통지,
            </li>
            <li>
              수집 항목: 신청인(성명, 연락처, 휴대번호), 예금(카드)주명,
              은행(카드)명, 계좌(카드)번호, 생년월일(사업자등록번호),
              카드유효기간
            </li>
            <li>
              보유 및 이용기간: 수집 이용 동의일부터 자동이체서비스
              종료일(해지일)까지며, 보유는 해지일로부터 5년간 보존 후
              파기(관계 법령에 의거)
            </li>
            <div style="padding-right: 4px;
                  padding-top: 5px;
                  text-align: right;">
              신청자는 개인정보 수집 및 이용을 거부할 수 있습니다. 단,
              거부하는 경우 자동이체 신청이 정상적으로 처리되지 않습니다.
            </div>
            <div style="padding-right: 4px;
                  padding-top: 5px;
                  text-align: right;">
              <span>✔</span><span>동의함</span>&nbsp;&nbsp;&nbsp; 동의 안함
            </div>
          </td>
        </tr>
        <tr>
          <td style="
                border-style: solid;
                text-align: left;
                border-width: 1pt;" colspan="2">
            [개인정보 제3자 제공 동의]
            <li>
              <span>개인정보를 제공받는 자: 나이스페이먼츠 주식회사,
                은행(신한/SC제일/씨티/하나/농협/기업/국민/저축/수협/신협/우체국/새마을금고/대구/부산/경남/광주/전북/조흥/제주),
                카드사(국민/비씨/롯데/삼성/NH농협/현대/신한/하나/우리)</span>
            </li>
            <li>
              개인정보를 제공받는 자의 개인정보 이용 목적: 자동이체 서비스 제공 및 출금동의 확인, 신규 등록 및 해지 사실 확인 및 통지, 민원 처리
            </li>
            <li>
              제공하는 개인정보의 항목: 신청(성명, 연락처, 휴대번호), 예금(카드)주명, 은행(카드)명, 계좌(카드)번호, 생년월일(사업자등록번호), 카드유효기간
            </li>
            <li>개인정보를 제공받는 자의 개인정보 보유 및 이용기간: 자동이체 신청부터 해지까지. 단, 관련 법령에 의거 일정기간 보유.</li>
            <div style="padding-right: 4px;
                  padding-top: 5px;
                  text-align: right;">
              신청자는 개인정보 제3자 제공을 거부할 수 있습니다. 단, 거부하는 경우 자동이체 신청이 정상적으로 처리되지 않습니다.
            </div>
            <div style="padding-right: 4px;
                  padding-top: 5px;
                  text-align: right;">
              <span>✔</span><span>동의함</span>&nbsp;&nbsp;&nbsp; 동의 안함
            </div>
          </td>
        </tr>
        <tr>
          <td style="
                border-style: solid;
                text-align: left;
                border-width: 1pt;" colspan="2">
            [자동이체 동의여부 및 해지사실 통지안내]
            <br />
            나이스페이먼츠 주식회사 및 금융기관(은행 및 카드사)은
            자동이체 서비스의 안정적 운영을 위하여 고객의 연락처 정보를 활용하여
            문자메시지, 유선 등으로 고객의 자동이체 동의 여부 및 해지사실을 통지할 수 있습니다.
          </td>
        </tr>
        <tr>
          <td style="
                border-style: solid;
                text-align: left;
                border-width: 1pt;" colspan="2">
            [금융거래정보의 제공동의서]
            <br />
            본 신청과 관련하여 본인은 위 기재한 금융거래정보
            (신청인(성명, 연락처), 예금주명, 예금주휴대폰번호, 출금은행명,
            계좌번호, 예금주 생년월일(사업자등록번호)를 자동이체 신규 신청하는 때로부터
            서면으로 해지 신청할 때까지 나이스페이먼츠 주식회사, 금융기관,
            공공금융기관에 제공하는 것에 대하여 [금융실거래 및 비밀보장에 관한 법률]의
            규정에 따라 동의합니다.
          </td>
        </tr>
      </table>
      <span style="font-size: 13px; font-weight: bold;">위와 같이 금융거래정보의 제공 및 개인정보 수집 및 이용, 개인정보 제
        3 자 제공에 동의하며, 자동이체 서비스 약관을 확인하고 자동이체
        이용을 신청합니다.
      </span>
      <div style="font-size: 13px; text-align: center; margin-bottom: 3px;">
        <input style="font-size: 13px; border:none; border-bottom: 1px solid #000; border-radius: 0; width: 35px;" />년
        <input style="font-size: 13px; border:none; border-bottom: 1px solid #000; border-radius: 0; width: 35px;" />월
        <input style="font-size: 13px; border:none; border-bottom: 1px solid #000; border-radius: 0; width: 35px;" />일
      </div>
      <table style="font-size: 13px; border-collapse: collapse; margin-left: 40%" cellspacing="0">
        <tr>
          <td style="
                width: 42pt;
                border-style: solid;
                border-width: 1pt 1pt 1pt 1pt;
                text-align: center;
              " bgcolor="#D9D9D9">
            신청인
          </td>
          <td style="
                width: 121pt;
                border-style: solid;
                border-width: 1pt 1pt 1pt 1pt;
              ">
            <span style="font-size: 11px; color: #000">

            </span>
            &nbsp;<span>(인) 또는 서명</span>
          </td>
          <td style="
                width: 71pt;
                border-style: solid; 
                border-width: 1pt 1pt 1pt 1pt;
                text-align: center;
              " bgcolor="#D9D9D9">
            <span>예금(카드)주<br />동의란</span>
          </td>
          <td style="
                width: 135pt;
                border-style: solid;
                border-width: 1pt 1pt 1pt 1pt;
              ">
            <span class="guardname" style="font-size: 11px; color: #000">

            </span>
            &nbsp;<span>(인) 또는 서명</span>
          </td>
        </tr>
      </table>
      <span style="font-size: 10px; font-weight: bold;">
        *신청인과 예금주/카드주가 상이한 경우에는 예금주/카드주의 동의가
        필요하며, 날인 또는 서명은 출금통장의 거래날인, 서명 사용
      </span>
    </div>

    <ModalBtnHeightDiv></ModalBtnHeightDiv>

    <ModalBtnDiv>
      <ModalBtn>내려받기</ModalBtn>
      <ModalBtn class="green">증빙전송하기</ModalBtn>
      <ModalBtn class="red" @click="$emit('close')">닫기</ModalBtn>
    </ModalBtnDiv>
  </div>
</template>

<script>
import * as ModalCss from "@/assets/styles/ModalCss.js";
export default {
  name: "ModalCms",
  components: {
    ...ModalCss,
  },
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
};
</script>
