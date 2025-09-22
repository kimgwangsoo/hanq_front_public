export default [
  {
    path: '/redesignation',
    name: 'Redesignation',
    component: () => import('@/views/Redesignation/RedesignationPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '지정갱신관리',
      icon: 'refresh'
    }
  },
]