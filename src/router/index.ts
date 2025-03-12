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
      path: "/tasks/:project",
      component: () => import("@/views/TasksView.vue"),
      name: "tasks",
    },
  ],
});

export default router;
