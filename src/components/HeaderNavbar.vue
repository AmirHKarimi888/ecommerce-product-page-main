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
            <span class="navbar-btns-search" @click="toggleSearchBox"><span class="fa fa-search cursor-pointer font-thin" alt="Search"></span></span>
            <span v-if="useStore().loginStatus" class="navbar-btns-cart" @click="toggleCart">
                <span v-if="useStore().loggedInUser?.cart.length > 0" class="w-4 h-4 relative top-2 left-1 flex justify-center items-center rounded-full bg-orange-500 text-white text-[70%]">{{ useStore().loggedInUser?.cart.reduce((t, p) => t + p.quantity, 0) }}</span>
                <span class="fa fa-shopping-cart cursor-pointer text-gray-600 text-xl" alt="Cart"></span>
            </span>
            <span v-if="useStore().loginStatus" class="navbar-btns-avatar" @click="toggleProfile"><img class="w-12 cursor-pointer rounded-full" :src="useStore().loggedInUser?.avatar" alt="Avatar" /></span>
            <RouterLink v-else to="/signup" class="navbar-btns-signup text-white">Signup</RouterLink>
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
    <HeaderSearchBox
      v-if="searchBoxView"
      @closeSearchBox="closeSearchBox"
    />
</template>

<script setup>
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import { HeaderCart, HeaderProfile, HeaderSidebar, HeaderSearchBox } from ".";
import { useStore } from "../store";

const navItems = reactive([
    { title: "Collections", link: "/collections" },
    { title: "Men", link: "/collections/men" },
    { title: "Women", link: "/collections/women" },
    // { title: "About", link: "/" },
    { title: "Contact", link: "/contact" }
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

const searchBoxView = ref(false);
const toggleSearchBox = () => {
    searchBoxView.value = !searchBoxView.value;
    setTimeout(() => {
        const searchBoxBackdropEl = document.querySelector(".header-search-box-backdrop");
        const searchBoxEl = document.querySelector(".header-search-box");
        searchBoxBackdropEl?.classList.toggle("hidden");
        searchBoxEl?.classList.add("fadeInToRight");
    }, 10)
}

const closeSearchBox = () => {
    document.querySelector(".header-search-box-backdrop").classList.add("hidden");
    searchBoxView.value = false;
}
</script>