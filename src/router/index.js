import { createRouter, createWebHistory } from "vue-router";
import { HomeView, CollectionsView, ProductView } from "../views";
 
const routes = [
    { path: "/", name: "Home", component: HomeView },
    { path: "/collections", name: "Collections", component: CollectionsView },
    { path: "/products/:id", name: "Product", component: ProductView }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    linkExactActiveClass: "text-orange-500"
})

export default router;