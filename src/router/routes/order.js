export default [
  {
    path: '/orders',
    name: 'OrderList',
    component: () => import('@/views/Order/OrderPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '주문 관리',
      icon: 'shopping-cart'
    }
  },
  {
    path: '/orders/create',
    name: 'OrderCreate',
    component: () => import('@/components/OrderUpPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '주문 등록',
      icon: 'plus-circle'
    }
  },
  {
    path: '/orders/:id',
    name: 'OrderDetail',
    component: () => import('@/components/OrderModifyPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '주문 상세',
      icon: 'clipboard-list'
    },
    props: true
  },
  {
    path: '/orders/:id/edit',
    name: 'OrderEdit',
    component: () => import('@/components/OrderModifyPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '주문 수정',
      icon: 'edit'
    },
    props: route => ({ 
      id: route.params.id,
      isEditMode: true
    })
  }
]; 