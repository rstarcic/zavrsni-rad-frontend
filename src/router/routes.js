const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/HomePage.vue") },
      { path: "/login", component: () => import("pages/LoginPage.vue") },
    ],
  },
  {
    path: "/signup",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "client",
        component: () => import("src/pages/SelectClientType.vue"),
      },
      {
        path: "client/individual",
        component: () => import("src/pages/SignupClient.vue"),
        props: { clientType: "individual" },
      },
      {
        path: "client/business",
        component: () => import("src/pages/SignupClient.vue"),
        props: { clientType: "business" },
      },
      {
        path: "service-provider",
        component: () => import("pages/SignupServiceProvider.vue"),
      },
    ],
  },
  {
    path: "/client",
    component: () => import("layouts/ClientLayout.vue"),
    children: [
      {
        path: "individual/profile",
        component: () => import("src/pages/ClientProfile.vue"),
      },
      {
        path: "business/profile",
        component: () => import("src/pages/ClientProfile.vue"),
      },
    ],
  },
  {
    path: "/service-provider",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "profile",
        component: () => import("src/pages/ServiceProviderProfile.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
