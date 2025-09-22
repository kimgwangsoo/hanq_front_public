export default [
  {
    path: '/mainlookup',
    name: 'MainLookup',
    component: () => import('@/views/Home/MainLookupPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '제품 조회 시스템',
      layout: 'default',
      icon: 'search'
    }
  },
  {
    path: '/quick-search',
    name: 'QuickSearch',
    component: () => import('@/views/Home/MainLookupPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '빠른 검색',
      layout: 'default',
      icon: 'find_in_page'
    }
  },
  {
    path: '/client-register',
    name: 'ClientRegister',
    component: () => import('@/views/Home/MainLookupPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '수급자 등록',
      layout: 'default',
      icon: 'person_add'
    },
  }
]; 