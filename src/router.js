import { createWebHistory, createRouter } from "vue-router"
import StockLogin from "./views/StockLogin.vue"
import StockMain from "./views/StockMain.vue"
import JoinComponent from "./components/JoinComponent.vue"
import LoginComponent from "./components/LoginComponent.vue"
import Dashboard from "./views/Dashboard.vue"

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/main",
    name: "main",
    redirect: "/dashboard",
    component: StockMain,
    children: [
      {
        path: "/dashboard",
        components: { default: Dashboard },
      },
    ],
  },
  {
    path: "/login",
    component: StockLogin,
    children: [
      {
        path: "",
        component: LoginComponent,
      },
      {
        path: "join",
        component: JoinComponent,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
