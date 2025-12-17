import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "LandingPage",
      component: () => import("../views/LandingPage.vue"),
    },
    // {
    //   path: "/login",
    //   name: "Login",
    //   component: () => import("../views/Login.vue"),
    // },
    {
      path: "/apply-step1",
      name: "ApplyStep1",
      component: () => import("../views/ApplyStep1.vue"),
    },
    {
      path: "/apply-step2",
      name: "ApplyStep2",
      component: () => import("../views/ApplyStep2.vue"),
    },
    {
      path: "/apply-step3",
      name: "ApplyStep3",
      component: () => import("../views/ApplyStep3.vue"),
    },
    {
      path: "/apply-step4",
      name: "ApplyStep4",
      component: () => import("../views/ApplyStep4.vue"),
    },
    {
      path: "/apply-step5",
      name: "ApplyStep5",
      component: () => import("../views/ApplyStep5.vue"),
    },
    {
      path: "/application-complete",
      name: "ApplyStep6",
      component: () => import("../views/ApplyStep6.vue"),
    },

    {
      path: "/home",
      name: "Home",
      component: () => import("../views/Home.vue"),
      children: [
        {
          path: "",
          redirect: "dashboard",
        },
        {
          path: "/dashboard",
          name: "Dashboard",
          component: () =>
            import("../components/SideBarLinks.vue/Dashboard.vue"),
        },
        {
          path: "/loan",
          name: "Loan",
          component: () => import("../components/SideBarLinks.vue/Loan.vue"),
        },
        {
            path: '/loan/details',
            name: 'LoanDetails',
            component: () => import('../components/SideBarLinks.vue/Verifications.vue')
        },
        {
          path: "/creditAlert",
          name: "Payment",
          component: () =>
            import("../components/SideBarLinks.vue/creditAlert.vue"),
        },
        {
          path: "/verifications",
          name: "Verification",
          component: () =>
            import("../components/SideBarLinks.vue/Verifications.vue"),
        },
        {
          path: "/deduction",
          name: "Deduction",
          component: () =>
            import("../components/SideBarLinks.vue/Deduction.vue"),
        },
        {
          path: "/revenueAssurance",
          name: "RevenueAssurance",
          component: () =>
            import("../components/SideBarLinks.vue/revenueAssurance.vue"),
        },
        {
          path: "/reports",
          name: "Reports",
          component: () => import("../components/SideBarLinks.vue/Reports.vue"),
        },
        {
          path: "/loanDiskOperation",
          name: "LoanDiskOperation",
          component: () =>
            import("../components/SideBarLinks.vue/loanDiskOperation.vue"),
        },
        {
          path: "/issuesLibrary",
          name: "IssuesLibrary",
          component: () =>
            import("../components/SideBarLinks.vue/issuesLibrary.vue"),
        },
        {
          path: "/portalBalance",
          name: "PortalBalance",
          component: () =>
            import("../components/SideBarLinks.vue/portalBalance.vue"),
        },
      ],
    },
    {
      path: "/:catchAll(.*)",
      name: "404",
      component: () => import("../views/404.vue"),
    },
  ],
});

export default router;
