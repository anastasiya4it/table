import "./style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "./router";
import { VueDraggableNext as draggable } from "vue-draggable-next";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("draggable", draggable);
app.mount("#app");
