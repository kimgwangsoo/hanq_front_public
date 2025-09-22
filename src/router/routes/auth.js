export default [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/LoginPage.vue'),
    meta: { 
      guest: true,
      title: '로그인',
      layout: 'auth'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Login/LoginPage.vue'),
    meta: { 
      guest: true,
      title: '회원가입',
      layout: 'auth'
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/Login/LoginPage.vue'),
    meta: { 
      guest: true,
      title: '비밀번호 찾기',
      layout: 'auth'
    }
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: () => import('@/views/Login/LoginPage.vue'),
    meta: { 
      guest: true,
      title: '비밀번호 재설정',
      layout: 'auth'
    },
    props: true
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Login/LoginPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '내 정보',
      icon: 'user'
    }
  }
]; 