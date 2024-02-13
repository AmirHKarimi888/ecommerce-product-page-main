<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useStore } from "./store";
import { FooterView, HeaderView } from './components';

//Get loggedIn user
onMounted(async () => {
  await useStore().getAllUsers()
    .then(() => {
      if ("loggedInUser" in localStorage) {

        const uid = localStorage.getItem("loggedInUser");

        useStore().loggedInUser = useStore().users?.find(user => {
          if (user?.uid === uid) {
            return user;
          }
        })

        useStore().loggedInUser ? useStore().loginStatus = true : useStore().loginStatus = false;

      } else {
        // localStorage.setItem("loggedInUser", "8888888888");
        // window.location.href = "/";
      }
    })
})


</script>

<template>
  <HeaderView />
  <RouterView />
  <FooterView />
</template>