export default [
  {
    path: '/rate',
    name: 'RateMainPage',
    component: () => import('@/views/Rate/RateMainPage.vue'),
    meta: {
      requiresAuth: true,
      title: '평가관리',
      icon: 'home'
    }
  }
]