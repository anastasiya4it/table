import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/ProjectsView.vue"),
    },
    {
      path: "/project-tasks",
      component: () => import("@/views/HomeView.vue"),
      name: "tale",
    },
  ],
});

export default router;
