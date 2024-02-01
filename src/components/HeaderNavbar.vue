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
            <span class="navbar-btns-cart"><img class="w-6" src="../assets/images/icon-cart.svg" alt="Cart" /></span>
            <span class="navbar-btns-avatar"><img class="w-12 cursor-pointer" src="../assets/images/image-avatar.png" alt="Avatar" /></span>
        </div>
    </nav>
    <HeaderSidebar
      :navItems="navItems" 
      @toggleSidebar="toggleSidebar"
    />
</template>

<script setup>
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import { HeaderSidebar } from ".";

const navItems = reactive([
    { title: "Collections", link: "/" },
    { title: "Men", link: "/" },
    { title: "Women", link: "/" },
    { title: "About", link: "/" },
    { title: "Contact", link: "/" }
])

const toggleSidebar = () => {
    const sidebarBackdropEl = document.querySelector(".sidebar-backdrop");
    const sidebarEl = document.querySelector(".sidebar");
    sidebarBackdropEl.classList.toggle("hidden");
    sidebarEl.classList.add("fadeInToRight");
}
</script>