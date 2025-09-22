import { createRouter, createWebHistory } from 'vue-router';
import { authGuard, roleGuard, saveLastVisitedGuard } from '@/router/guards';
import orderRoutes from '@/router/routes/order';
import authRoutes from '@/router/routes/auth';
import mainlookupRoutes from '@/router/routes/mainlookup';
import rentRoutes from '@/router/routes/rent';
import clientRoutes from '@/router/routes/client';
import cmsRoutes from '@/router/routes/cms';
import scheduleRoutes from '@/router/routes/schedule';
import lookupRoutes from '@/router/routes/lookup';
import productRoutes from '@/router/routes/product';
import redesignationRoutes from '@/router/routes/redesignation';
import noticeRoutes from '@/router/routes/notice';
import virtualAccountRoutes from '@/router/routes/virtualAccount';
import zeroclientRoutes from '@/router/routes/zeroclient';
import rateRoutes from '@/router/routes/rate';  

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/MainLookupPage.vue'),
    meta: { 
      title: '홈',
      keepAlive: true
    }
  },
  {
    path: '/dashboard',
    name: 'BillDashboard',
    component: () => import('@/views/BillDashbord/BillDashboardPage.vue'),
    meta: { 
      requiresAuth: true,
      title: '청구/통계관리',
      icon: 'dashboard'
    }
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: () => import('@/components/ForbiddenPage.vue'),
    meta: { title: '접근 금지' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/components/NotFoundPage.vue'),
    meta: { title: '페이지를 찾을 수 없음' }
  },
  ...mainlookupRoutes,
  ...orderRoutes,
  ...rentRoutes,
  ...clientRoutes,
  ...cmsRoutes,
  ...scheduleRoutes,
  ...lookupRoutes,
  ...productRoutes,
  ...redesignationRoutes,
  ...authRoutes,
  ...noticeRoutes,
  ...virtualAccountRoutes,
  ...zeroclientRoutes,
  ...rateRoutes
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active'
});

// 네비게이션 가드 설정
router.beforeEach(authGuard);
router.beforeEach(roleGuard);
router.beforeEach(saveLastVisitedGuard);

// 페이지 타이틀 설정
router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} - HANQ` : 'HANQ';
});

export default router;