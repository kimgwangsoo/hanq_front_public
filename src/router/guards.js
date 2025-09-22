/**
 * 인증 가드: 인증이 필요한 페이지에 대한 접근 제어
 */
export function authGuard(to, from, next) {
  const isAuthenticated = localStorage.getItem('token');
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // next({ name: 'Login', query: { redirect: to.fullPath } });
      next();
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (isAuthenticated) {
      next({ name: 'Dashboard' });
    } else {
      next();
    }
  } else {
    next();
  }
}

/**
 * 권한 가드: 사용자 권한에 따른 페이지 접근 제어
 */
export function roleGuard(to, from, next) {
  const userRole = localStorage.getItem('userRole');
  
  if (to.matched.some(record => record.meta.roles)) {
    if (!to.meta.roles.includes(userRole)) {
      next({ name: 'Forbidden' });
    } else {
      next();
    }
  } else {
    next();
  }
}

/**
 * 이전 페이지 저장: 사용자가 방문한 이전 페이지 정보 저장
 */
export function saveLastVisitedGuard(to, from, next) {
  // 기본적으로 모든 페이지에 keepAlive 설정
  if (to.meta.keepAlive === undefined) {
    to.meta.keepAlive = true;
  }
  
  if (from.name) {
    localStorage.setItem('lastVisitedPage', from.fullPath);
  }
  next();
} 