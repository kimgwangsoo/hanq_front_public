<template>
  <BaseOrderTemplate 
    :current-page="currentPage" 
    :total-pages="totalPages"
    ref="baseTemplate">
    
    <!-- Title Title -->
    <template #title-icon>
      <span class="material-icons">campaign</span>
    </template>
    <template #title-text>
      공지사항
    </template>

    <!-- Search Area -->
    <template #search-area>
      <!-- 비워두면 검색 부분이 표시되지 않습니다 -->
      <div></div>
    </template>

    <!-- Header Info -->
    
    <!-- Content Area (Tab buttons, Table, etc) -->
    <!-- Tab Buttons -->
    <!-- Pagination -->
    <!-- Table -->
    <template #table>
      <TableContainer>
        <NoticeTable>
          <thead>
            <tr>
              <th>분류</th>
              <th>날짜</th>
              <th>제목</th>
            </tr>
          </thead>
          
          <tbody>
            <tr v-for="(item, index) in noticeList" :key="index" @click="openNoticeDetail(item)">
              <td :class="getBgColor(item.type)">{{ item.type }}</td>
              <td>{{ item.date }}</td>
              <td class="grayBg">{{ item.title }}</td>
            </tr>
          </tbody>
        </NoticeTable>
      </TableContainer>
    </template>
  </BaseOrderTemplate>
</template>

<script>
import { ref } from 'vue'
import BaseOrderTemplate from '@/components/BaseOrderTemplate.vue'
import * as PublicCss from '@/assets/styles/public.js'
import * as NoticeCss from '@/assets/styles/notice/NoticeCss.js'  

export default {
  name: 'NoticePage',
  components: {
    BaseOrderTemplate,
    ...PublicCss,
    ...NoticeCss,
  },
  setup() {
    
    const currentPage = ref(1)
    const pageSize = ref(10)
    const totalPages = ref(1)
    const totalCount = ref(0)
    const baseTemplate = ref(null)

    const noticeList = ref([
      {
        type: '고정',
        title: '한큐 사용 설명서',
        date: '2024-08-30',
      },
      {
        type: '고정',
        title: '애니사인 설치파일',
        date: '2024-08-30',
      },
      {
        type: '고정',
        title: '원격프로그램 설치파일',
        date: '2024-08-30',
      },
      {
        type: '한큐',
        title: '한큐 사용 설명서 뷰어 업데이트',
        date: '2025-07-07',
      },

      {
        type: '한큐',
        title: '한큐 시스템 점검 안내',
        content: `2024-08-11(일) 24:00 ~ 06:00 시스템 점검으로 접속이 불가합니다. 
        기존 7월31일까지 계약완료 처리된 주문/발주서가 일괄 출고 처리 적용예정입니다.
          [ 재고관리 업데이트 예정 내용 ]
        - 주문서 품목별 색상, 사이즈 추가 ( 색상,사이즈별 수량관리 )
        - 재고관리 기능 개선 (입,출고 관리)
        - 대여제품 소독제품 공단 연동 (일괄 소독 진행)`,
        date: '2025-07-07',
      },

      {
        type: '건강보험공단',
        title: '복지용구 온라인 쇼핑몰 관련 안내',
        date: '2025-07-07',
      }
    ])

    const getBgColor = (type) => {
      if (type === '고정') {
        return 'pastelBlueBg'
      } else if (type === '건강보험공단') {
        return 'pastelRedBg'
      } else {
        return ''
      }
    }

    const openNoticeDetail = (item) => {
      baseTemplate.value.showSwalModal({
        title: `[${item.title}]`,
        width: "60%",
        showConfirmButton: false,
        html: `
          <div class="notice-content">
            <div class="notice-date">${item.date}</div>
            <div>${item.content}</div>
          </div>
        `,
      })
    }

    return {
      currentPage,
      pageSize,
      totalPages,
      totalCount,
      baseTemplate,
      noticeList,
      getBgColor,
      openNoticeDetail,
    }
  }
}
</script>
