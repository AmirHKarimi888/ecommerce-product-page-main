<template>
    <div class="sidebar-backdrop hidden" @click.self="emit('toggleSidebar')">
        <div class="sidebar">
            <span class="sidebar-close-btn" @click="emit('toggleSidebar')"><img src="../assets/images/icon-close.svg" alt="Close-Sidebar"></span>

            <ul class="sidebar-items">
              <li class="sidebar-item" v-for="(item, index) of navItems" :key="index">
                <RouterLink :to="item.link">{{ item.title }}</RouterLink>
              </li>
            </ul>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(["navItems"]);

const emit = defineEmits(["toggleSidebar"]);
</script>