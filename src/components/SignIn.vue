<template>
    <div class="singin">
        <form @submit.prevent="signIn"
            class="max-w-sm mx-auto max-sm:w-[90%] border p-6 rounded-lg bg-gray-100 border-gray-300 shadow-lg my-20">

            <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input type="email" v-model="email" v-bind="emailAttrs"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required>
                <div class="text-sm my-2 text-red-600">{{ errors?.email }}</div>
            </div>

            <div class="mb-5">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input :type="showPassword ? 'text' : 'password'" v-model="password" v-bind="passwordAttrs"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required>

                <div class="flex items-start my-2">
                    <div class="flex items-center h-5">
                        <input type="checkbox" v-model="showPassword"
                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300">
                    </div>
                    <label class="ms-2 text-sm font-medium text-gray-900">show</label>
                </div>

                <div class="text-sm my-2 text-red-600">{{ errors?.password }}</div>
            </div>


            <div class="flex items-start mt-10 mb-2">
                <div class="flex items-center h-5">
                    <input type="checkbox"
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required>
                </div>
                <label for="remember" class="ms-2 text-sm font-medium text-gray-900">I am not a robot</label>
            </div>

            <button type="submit"
                class="text-white bg-orange-600 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Sign
                In</button>

            <div v-if="foundErrorView" class="text-sm my-2 text-red-600">User not found</div>
            <div class="text-sm mt-4 text-gray-700">You have not got any accounts?
                <span @click="useSignupStore().signupView = true" class="text-orange-600 cursor-pointer font-bold">Sign Up</span>
            </div>
        </form>
    </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import { ref } from "vue";
import * as yup from "yup";
import { useSignupStore, useStore } from "../store";
import Http from "../Http";

const schema = yup.object({

    email: yup.string()
        .email("Email is not valid")
        .required("Email is required"),

    password: yup.string()
    .min(8, "Password must contain at least eight characters")
        .matches(/[0-9]/i, "Password must contain at least one number")
        .matches(/[a-z]/, "Password must contain at least one lower case letter")
        .matches(/[A-Z]/, "Password must contain at least one upper case letter")
        .matches(/[@!#$%&?"]/i, "Password must contain at least one special character")
    .required("Password is required"),
})

const { values, errors, defineField } = useForm({
    validationSchema: schema
})

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");


const showPassword = ref(false);
const foundErrorView = ref(false);

const signIn = async () => {

    let foundUser = {};

    await useStore().getAllUsers()
    .then(() => {
        foundUser = useStore().users.find(user => {
            if(user.email === values.email && user.password === values.password) {
                return user;
            }
        })

        if(foundUser) {

            foundErrorView.value = true;

            localStorage.setItem("loggedInUser", foundUser?.uid);
            window.location.href = "/";

        } else {

            foundErrorView.value = false;
        }
    })
}
</script>