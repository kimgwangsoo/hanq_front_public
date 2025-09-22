export const navigationMenus = [
  {
    title: '홈',
    icon: 'home',
    path: '/',
    name: 'Home'
  },
  {
    title: '대시보드',
    icon: 'dashboard',
    path: '/dashboard',
    name: 'Dashboard',
    requiresAuth: true
  },
  {
    title: '주문 관리',
    icon: 'shopping_cart',
    requiresAuth: true,
    children: [
      {
        title: '주문 목록',
        path: '/orders',
        name: 'OrderList'
      },
      {
        title: '주문 등록',
        path: '/orders/create',
        name: 'OrderCreate'
      }
    ]
  },
  {
    title: '임대료 관리',
    icon: 'home',
    requiresAuth: true,
    children: [
      {
        title: '임대료 조회',
        path: '/rent',
        name: 'RentLookup'
      },
      {
        title: '임대료 등록',
        path: '/rent/create',
        name: 'RentCreate'
      }
    ]
  },
  {
    title: '고객 관리',
    icon: 'people',
    requiresAuth: true,
    children: [
      {
        title: '고객 목록',
        path: '/client',
        name: 'ClientList'
      },
      {
        title: '고객 등록',
        path: '/client/create',
        name: 'ClientCreate'
      }
    ]
  },
  {
    title: 'CMS 결제',
    icon: 'payment',
    requiresAuth: true,
    children: [
      {
        title: 'CMS 목록',
        path: '/cms',
        name: 'CMSList'
      },
      {
        title: 'CMS 등록',
        path: '/cms/create',
        name: 'CMSCreate'
      }
    ]
  },
  {
    title: '일정 관리',
    icon: 'schedule',
    requiresAuth: true,
    children: [
      {
        title: '일정 목록',
        path: '/schedule',
        name: 'ScheduleList'
      },
      {
        title: '일정 등록',
        path: '/schedule/create',
        name: 'ScheduleCreate'
      }
    ]
  },
  {
    title: '통합 조회',
    icon: 'search',
    requiresAuth: true,
    children: [
      {
        title: '통합 검색',
        path: '/lookup',
        name: 'LookupSearch'
      },
      {
        title: '고급 검색',
        path: '/lookup/advanced',
        name: 'LookupAdvanced'
      },
      {
        title: '즐겨찾기',
        path: '/lookup/favorites',
        name: 'LookupFavorites'
      }
    ]
  },
  {
    title: '제품 관리',
    icon: 'inventory',
    requiresAuth: true,
    children: [
      {
        title: '제품 목록',
        path: '/product',
        name: 'ProductList'
      },
      {
        title: '제품 등록',
        path: '/product/create',
        name: 'ProductCreate'
      }
    ]
  },
  {
    title: '제품 조회',
    icon: 'search',
    requiresAuth: true,
    children: [
      {
        title: '제품 조회',
        path: '/mainlookup',
        name: 'MainLookup'
      },
      {
        title: '빠른 검색',
        path: '/quick-search',
        name: 'QuickSearch'
      },
      {
        title: '수급자 등록',
        path: '/client-register',
        name: 'ClientRegister'
      }
    ]
  }
];

export const getMenuByName = (name) => {
  for (const menu of navigationMenus) {
    if (menu.name === name) return menu;
    if (menu.children) {
      const child = menu.children.find(c => c.name === name);
      if (child) return child;
    }
  }
  return null;
};

export const getMenuByPath = (path) => {
  for (const menu of navigationMenus) {
    if (menu.path === path) return menu;
    if (menu.children) {
      const child = menu.children.find(c => c.path === path);
      if (child) return child;
    }
  }
  return null;
}; 