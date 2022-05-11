import { createApp } from "vue";

import App from "./App.vue";
import store from "./js/constants.js";
import myRouter from "./router.js";
import ArgonDashboard from "./plugins/argon-dashboard";
import "element-plus/lib/theme-chalk/index.css";

const app = createApp(App);

app
  .use(myRouter)
  .use(ArgonDashboard)
  .use(require("vue-cookies"))
  .use(store)
  .mount("#app");
