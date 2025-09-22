export default [
  {
    path: '/zeroclient',
    name: 'ZeroClient',
    component: () => import('@/views/ZeroClient/ZeroClientPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '기초관리',
      icon: 'home'
    }
  }
]