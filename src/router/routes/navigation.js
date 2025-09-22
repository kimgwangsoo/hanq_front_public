// 상단 메뉴 네비게이션 라우트
export default [
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search/SearchPage.vue'),
    meta: { title: '수급자조회하기' }
  },
  {
    path: '/recent',
    name: 'Recent',
    component: () => import('@/views/Recent/RecentPage.vue'),
    meta: { title: '최근조회기록' }
  },
  {
    path: '/hanq',
    name: 'Hanq',
    component: () => import('@/views/Hanq/HanqPage.vue'),
    meta: { title: '한방에큐' }
  },
  {
    path: '/recipients',
    name: 'Recipients',
    component: () => import('@/views/Recipients/RecipientsPage.vue'),
    meta: { title: '수급자목록' }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/Order/OrderPage.vue'),
    meta: { title: '주문 및 발주' }
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: () => import('@/views/Inventory/InventoryPage.vue'),
    meta: { title: '재고관리' }
  },
  {
    path: '/rental',
    name: 'Rental',
    component: () => import('@/views/Rental/RentalPage.vue'),
    meta: { title: '대여관리' }
  },
  {
    path: '/delivery',
    name: 'Delivery',
    component: () => import('@/views/Delivery/DeliveryPage.vue'),
    meta: { title: '배송관리' }
  },
  {
    path: '/billing',
    name: 'Billing',
    component: () => import('@/views/Billing/BillingPage.vue'),
    meta: { title: '청구/통계관리' }
  },
  {
    path: '/cms',
    name: 'CMS',
    component: () => import('@/views/CMS/CMSPage.vue'),
    meta: { title: 'CMS관리' }
  },
  {
    path: '/virtual-account',
    name: 'VirtualAccount',
    component: () => import('@/views/VirtualAccount/VirtualAccountPage.vue'),
    meta: { title: '가상계좌관리' }
  },
  {
    path: '/basic',
    name: 'Basic',
    component: () => import('@/views/Basic/BasicPage.vue'),
    meta: { title: '기초관리' }
  },
  {
    path: '/notice',
    name: 'Notice',
    component: () => import('@/views/Notice/NoticePage.vue'),
    meta: { title: '공지사항' }
  },
  {
    path: '/evaluation',
    name: 'Evaluation',
    component: () => import('@/views/Evaluation/EvaluationPage.vue'),
    meta: { title: '평가관리' }
  },
  {
    path: '/system',
    name: 'System',
    component: () => import('@/views/System/SystemPage.vue'),
    meta: { title: '시스템관리' }
  }
]; 