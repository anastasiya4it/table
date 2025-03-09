import { createRouter, createWebHistory } from "vue-router";

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: '',
//       name: 'home',
//       component: HomeView,
//       meta: {
//         title: 'Аудіоказки Украінською',
//         icon: 'prize'
//       },
//       children:[
//         {
//           path:'/',
//           component: HomeView,
//           name: 'home',
//           meta: { title: 'home', icon: 'home' }
//         },
//         {
//           path: '/:title',
//           component: () => import('@/views/TaleView.vue'),
//           name: 'tale',
//           meta: { title: 'tale', icon: 'list' }
//         },
//       ]
//     },
//   ],
// })
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      meta: {
        title: "Аудіоказки Украінською",
        icon: "prize",
      },
    },
    {
      path: "/projects",
      component: () => import("@/views/ProjectsView.vue"),
      name: "tale",
      meta: { title: "tale", icon: "list" },
    },
    // {
    //   path: "/rozdily",
    //   component: () => import("@/views/CategoriesView.vue"),
    //   name: "categories",
    //   meta: { title: "categories", icon: "list" },
    // },
    // {
    //   path: "/rozdil/:title",
    //   component: () => import("@/views/CategoryView.vue"),
    //   name: "category",
    //   meta: { title: "category", icon: "list" },
    // },
    // {
    //   path: "/poshuk",
    //   component: () => import("@/views/SearchView.vue"),
    //   name: "search",
    //   meta: { title: "search", icon: "list" },
    //   props: (route) => ({ query: route.query.q }),
    // },
  ],
});

export default router;
