<template>
    <footer
        class="relative bottom-0 left-0 w-full p-4 bg-white border-t border-gray-300 shadow md:flex md:items-center md:justify-between md:p-6">
        <span class="text-sm text-gray-600 sm:text-center">© 2023 <a href="https://github.com/AmirHKarimi888"
                class="hover:underline">AmirHK888™</a>. All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
            <li v-for="(item, index) of navItems" :key="index">
                <RouterLink class="hover:underline me-4 md:me-6" :to="item.link">{{ item.title }}</RouterLink>
            </li>
        </ul>
    </footer>
</template>

<script setup>
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";

const navItems = reactive([
    { title: "Collections", link: "/collections" },
    { title: "Men", link: "/collections/men" },
    { title: "Women", link: "/collections/women" },
    // { title: "About", link: "/" },
    { title: "Contact", link: "/contact" }
])
</script>