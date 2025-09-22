export default [
  {
    path: '/schedule',
    name: 'ScheduleList',
    component: () => import('@/views/Schedule/SchedulePage.vue'),
    meta: { 
      requiresAuth: true,
      title: '일정 관리',
      icon: 'schedule'
    }
  },
  {
    path: '/schedule/create',
    name: 'ScheduleCreate',
    component: () => import('@/views/Schedule/SchedulePage.vue'),
    meta: { 
      requiresAuth: true,
      title: '일정 등록',
      icon: 'event'
    }
  },
  {
    path: '/schedule/:id',
    name: 'ScheduleDetail',
    component: () => import('@/views/Schedule/SchedulePage.vue'),
    meta: { 
      requiresAuth: true,
      title: '일정 상세',
      icon: 'event_note'
    },
    props: true
  },
  {
    path: '/schedule/:id/edit',
    name: 'ScheduleEdit',
    component: () => import('@/views/Schedule/SchedulePage.vue'),
    meta: { 
      requiresAuth: true,
      title: '일정 수정',
      icon: 'edit'
    },
    props: route => ({ 
      id: route.params.id,
      isEditMode: true
    })
  }
]; 