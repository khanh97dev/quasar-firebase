const routes = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('../pages/Home/HomePage.vue') },
      {
        path: '/table',
        component: () => import('../pages/Table/TablePage.vue'),
      },
      {
        path: '/camera',
        component: () => import('../pages/Camera/CameraPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
