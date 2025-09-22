export default [
  {
    path: '/virtualaccount',
    name: 'VirtualAccount',
    component: () => import('@/views/VirtualAccount/VirtualAccountPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '가상계좌관리',
      icon: 'account_balance'
    }
  }
]