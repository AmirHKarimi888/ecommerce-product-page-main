<template>
    <main>
        <SignUp v-if="useSignupStore().signupView" />

        <SignIn v-else />
    </main>
</template>

<script setup>
import { useSignupStore } from "../store"
import { SignUp, SignIn } from "../components"

</script>