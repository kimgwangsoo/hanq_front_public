export default [
  {
    path: '/product',
    name: 'ProductList',
    component: () => import('@/views/Product/ProductPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '제품 관리',
      icon: 'inventory'
    }
  },
  {
    path: '/product/create',
    name: 'ProductCreate',
    component: () => import('@/views/Product/ProductPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '제품 등록',
      icon: 'add_box'
    }
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('@/views/Product/ProductPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '제품 상세',
      icon: 'inventory_2'
    },
    props: true
  },
  {
    path: '/product/:id/edit',
    name: 'ProductEdit',
    component: () => import('@/views/Product/ProductPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '제품 수정',
      icon: 'edit'
    },
    props: route => ({ 
      id: route.params.id,
      isEditMode: true
    })
  }
]; 