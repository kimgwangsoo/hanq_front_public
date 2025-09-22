export default [
  {
    path: '/client',
    name: 'ClientList',
    component: () => import('@/views/Client/ClientPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '고객 관리',
      icon: 'people'
    }
  },
  {
    path: '/client/create',
    name: 'ClientCreate',
    component: () => import('@/views/Client/ClientPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '고객 등록',
      icon: 'person_add'
    }
  },
  {
    path: '/client/:id',
    name: 'ClientDetail',
    component: () => import('@/views/Client/ClientPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '고객 상세',
      icon: 'person'
    },
    props: true
  },
  {
    path: '/client/:id/edit',
    name: 'ClientEdit',
    component: () => import('@/views/Client/ClientPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '고객 수정',
      icon: 'edit'
    },
    props: route => ({ 
      id: route.params.id,
      isEditMode: true
    })
  }
]; 