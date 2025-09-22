export default [
  {
    path: '/cms',
    name: 'CMSPage',
    component: () => import('@/views/CMS/CMSPage.vue'),
    meta: { 
      requiresAuth: true,
      title: 'CMS 결제 관리',
      icon: 'payment'
    }
  }
]; 