import "./style.css";
// import { MotionPlugin } from "@vueuse/motion";
import { createApp } from "vue";
import { createPinia } from "pinia";
// import { createHead } from "unhead";

import App from "@/App.vue";
import router from "./router";
// @ts-ignore
// import VueDraggableResizable from "vue-draggable-resizable";
// import "vue-draggable-resizable/dist/VueDraggableResizable.css";
// import ts from "typescript";

const app = createApp(App);
// const head = createHead();

app.use(createPinia());
app.use(router);
// app.component("vue-draggable-resizable", VueDraggableResizable);

// app.use(MotionPlugin);
app.mount("#app");
