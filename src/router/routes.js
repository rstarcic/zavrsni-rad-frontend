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
        path: "employer",
        component: () => import("pages/SignupEmployer.vue"),
      },
      {
        path: "job-seeker",
        component: () => import("pages/SignupJobSeeker.vue"),
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
