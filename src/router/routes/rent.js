export default [
  {
    path: '/rent',
    name: 'RentLookup',
    component: () => import('@/views/Rent/RentLookupPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '임대료 조회',
      icon: 'home'
    }
  },
  {
    path: '/rent/create',
    name: 'RentCreate',
    component: () => import('@/views/Rent/RentLookupPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '임대료 등록',
      icon: 'add_home'
    }
  },
  {
    path: '/rent/:id',
    name: 'RentDetail',
    component: () => import('@/views/Rent/RentLookupPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '임대료 상세',
      icon: 'home'
    },
    props: true
  },
  {
    path: '/rent/:id/edit',
    name: 'RentEdit',
    component: () => import('@/views/Rent/RentLookupPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '임대료 수정',
      icon: 'edit'
    },
    props: route => ({ 
      id: route.params.id,
      isEditMode: true
    })
  }
]; 