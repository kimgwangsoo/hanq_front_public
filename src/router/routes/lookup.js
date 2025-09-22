export default [
  {
    path: '/lookup',
    name: 'LookupSearch',
    component: () => import('@/views/Lookup/LookupPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '통합 조회',
      icon: 'search'
    }
  },
  {
    path: '/lookup/advanced',
    name: 'LookupAdvanced',
    component: () => import('@/views/Lookup/LookupPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '고급 검색',
      icon: 'manage_search'
    },
    props: { 
      defaultTab: 'advanced'
    }
  },
  {
    path: '/lookup/favorites',
    name: 'LookupFavorites',
    component: () => import('@/views/Lookup/LookupPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '즐겨찾기',
      icon: 'bookmark'
    },
    props: { 
      defaultTab: 'favorites'
    }
  }
]; 