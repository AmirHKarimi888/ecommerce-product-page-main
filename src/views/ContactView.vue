<template>
    <main>
        <div class="contact-view">
            <ul class="contact-items">
                <li class="contact-item" v-for="(link, index) of links" :key="index">
                    <a :href="link?.address">
                        <span :class="link?.icon"></span>
                        <span>{{ link?.title }}</span>
                    </a>
                </li>
            </ul>
        </div>
    </main>
</template>

<script setup>
import { reactive } from "vue";

const links = reactive([
    { title: "Linkedin", icon: "fa fa-linkedin", address: "https://www.linkedin.com/in/amir-h-karimi-01193b215/" },
    { title: "Website", icon: "fa fa-globe", address: "https://amirhk888.iran.liara.run/" },
    { title: "Github", icon: "fa fa-github", address: "https://github.com/AmirHKarimi888/" },
    { title: "X", icon: "fa fa-twitter", address: "https://twitter.com/amirhk888" }
])
</script>