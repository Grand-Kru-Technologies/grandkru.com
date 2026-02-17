import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/vue/content/pages/HomePage.vue"),
    props: {
      default: {
        label: "Home",
        faIcon: "fa-solid fa-home",
        inPageNavbar: true,
        shouldAlwaysPreload: true,
      },
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/vue/content/pages/AboutPage.vue"),
    props: {
      default: {
        label: "About",
        faIcon: "fa-solid fa-info-circle",
        inPageNavbar: false,
        shouldAlwaysPreload: true,
      },
    },
  },
  {
    path: "/services",
    name: "services",
    component: () => import("@/vue/content/pages/ServicesPage.vue"),
    props: {
      default: {
        label: "Services",
        faIcon: "fa-solid fa-briefcase",
        inPageNavbar: false,
        shouldAlwaysPreload: true,
      },
    },
  },
  {
    path: "/portfolio",
    name: "portfolio",
    component: () => import("@/vue/content/pages/PortfolioPage.vue"),
    props: {
      default: {
        label: "Portfolio",
        faIcon: "fa-solid fa-folder-open",
        inPageNavbar: false,
        shouldAlwaysPreload: true,
      },
    },
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/vue/content/pages/ContactPage.vue"),
    props: {
      default: {
        label: "Contact",
        faIcon: "fa-solid fa-envelope",
        inPageNavbar: false,
        shouldAlwaysPreload: true,
      },
    },
  },
  // Catch-all redirect to home
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    }
    return { top: 0 };
  },
});

export default router;