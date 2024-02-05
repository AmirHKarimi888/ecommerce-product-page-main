<script setup>
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";
import { useStore } from "./store";
import { FooterView, HeaderView } from './components';

let users = ref([]);

//Get loggedIn user
onMounted(() => {
  useStore().getAllUsers()
    .then(() => users.value = useStore().users)
    .then(() => {
      if ("loggedInUser" in localStorage) {

        const uid = localStorage.getItem("loggedInUser");

        useStore().loggedInUser = users.value.find(user => {
          if(user?.uid === uid) {
            return user;
          }
        })

        useStore().loggedInUser ? useStore().loginStatus = true : useStore().loginStatus = false;

      } else {
        localStorage.setItem("loggedInUser", "8888888888");
        window.location.href = "/";
      }
    })
})

</script>

<template>
  <HeaderView />
  <RouterView />
  <FooterView />
</template>