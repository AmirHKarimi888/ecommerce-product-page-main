<template>
    <nav class="navbar">
        <div class="navbar-logo">
            <span class="navbar-btns-menu" @click="toggleSidebar"><img class="cursor-pointer" src="../assets/images/icon-menu.svg" alt="Cart" /></span>
            <RouterLink to="/"><img src="../assets/images/logo.svg" alt="Logo" /></RouterLink>
        </div>

        <ul class="navbar-items">
            <li class="navbar-item" v-for="(item, index) of navItems" :key="index">
                <RouterLink :to="item.link">{{ item.title }}</RouterLink>
            </li>
        </ul>

        <div class="navbar-btns">
            <span v-if="useStore().loginStatus" class="navbar-btns-cart" @click="toggleCart"><img class="w-6" src="../assets/images/icon-cart.svg" alt="Cart" /></span>
            <span v-if="useStore().loginStatus" class="navbar-btns-avatar" @click="toggleProfile"><img class="w-12 cursor-pointer" src="../assets/images/image-avatar.png" alt="Avatar" /></span>
            <RouterLink v-else to="/" class="navbar-btns-signup">Signup</RouterLink>
        </div>
    </nav>
    <HeaderSidebar
      :navItems="navItems" 
      @toggleSidebar="toggleSidebar"
    />
    <HeaderCart 
      v-if="cartView"
    />
    <HeaderProfile
    />
</template>

<script setup>
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import { HeaderCart, HeaderProfile, HeaderSidebar } from ".";
import { useStore } from "../store";

const navItems = reactive([
    { title: "Collections", link: "/" },
    { title: "Men", link: "/" },
    { title: "Women", link: "/" },
    { title: "About", link: "/" },
    { title: "Contact", link: "/" }
])

const cartView =  ref(false);
const toggleCart = () => {
    cartView.value = !cartView.value;
    setTimeout(() => {
        const cartContainerEl = document.querySelector(".header-cart-container");
        const cartEl = document.querySelector(".header-cart");
        cartContainerEl?.classList.toggle("hidden");
        cartEl?.classList.add("fadeInToRight");
    }, 10)
}

const toggleProfile = () => {
    const profileContainerEl = document.querySelector(".header-profile-container");
    const profileEl = document.querySelector(".header-profile");
    profileContainerEl?.classList.toggle("hidden");
    profileEl?.classList.add("fadeInToRight");
}

const toggleSidebar = () => {
    const sidebarBackdropEl = document.querySelector(".sidebar-backdrop");
    const sidebarEl = document.querySelector(".sidebar");
    sidebarBackdropEl?.classList.toggle("hidden");
    sidebarEl?.classList.add("fadeInToRight");
}
</script>