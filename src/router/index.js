import { createRouter, createWebHistory } from "vue-router";
import { HomeView } from "../views";
 
const routes = [
    { path: "/", component: HomeView }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;