import { createRouter, createWebHistory } from "vue-router";
import { HomeView, CollectionsView, MenView, WomenView, ProductView } from "../views";
 
const routes = [
    { path: "/", name: "Home", component: HomeView },
    { path: "/collections", name: "Collections", component: CollectionsView },
    { path: "/collections/men", name: "Men", component: MenView },
    { path: "/collections/women", name: "Women", component: WomenView },
    { path: "/products/:id", name: "Product", component: ProductView },
    { path: "/contact", name: "Contact", beforeEnter() { window.open('https://amirhk888.iran.liara.run/about'), '_blank' } }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    linkExactActiveClass: "text-orange-500"
})

export default router;