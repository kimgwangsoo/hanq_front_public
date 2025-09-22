export default [
  {
    path: '/notice',
    name: 'NoticeList',
    component: () => import('@/views/Notice/NoticePage.vue'),
    meta: { 
      requiresAuth: true,
      title: '공지사항',
      icon: 'announcement'
    }
  },
]; 