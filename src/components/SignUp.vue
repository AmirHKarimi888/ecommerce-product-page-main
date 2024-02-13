<template>
    <div class="signup">
        <form @submit.prevent="createAccount"
            class="max-w-sm mx-auto max-sm:w-[90%] border p-6 rounded-lg bg-gray-100 border-gray-300 shadow-lg my-20">
            <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
                <input type="text" v-model="username" v-bind="usernameAttrs"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required>
                <div class="text-sm my-2 text-red-600">{{ errors?.username }}</div>
            </div>
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

            <div class="mb-5">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password Confirm</label>
                <input :type="showPasswordConfirmation ? 'text' : 'password'" v-model="passwordConfirmation"
                    v-bind="passwordConformationAttrs"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required>

                <div class="flex items-start my-2">
                    <div class="flex items-center h-5">
                        <input type="checkbox" v-model="showPasswordConfirmation"
                            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300">
                    </div>
                    <label class="ms-2 text-sm font-medium text-gray-900">show</label>
                </div>

                <div class="text-sm my-2 text-red-600">{{ errors?.passwordConfirmation }}</div>
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
                Up</button>

            <div v-if="existingErrorView" class="text-sm my-3 text-red-600">User already exists</div>
            <div class="text-sm mt-4 text-gray-700">You have already got an account?
                <span @click="useSignupStore().signupView = false" class="text-orange-600 cursor-pointer font-bold">Sign In</span>
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
    username: yup.string()
        .min(2, "Username must be at least two characters")
        .required("Username is required"),

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

    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required("Confirm your password")
})

const { values, errors, defineField } = useForm({
    validationSchema: schema
})

const [username, usernameAttrs] = defineField("username");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [passwordConfirmation, passwordConformationAttrs] = defineField("passwordConfirmation");


const showPassword = ref(false);
const showPasswordConfirmation = ref(false);
const existingErrorView = ref(false);

//Generate random color for avatar
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = "";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//Generate random uid
function generateUid() {
    return Math.floor(Math.random() * 10000000000000);
}

//Date of today
let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = today.getFullYear();

today = mm + "/" + dd + "/" + yyyy;


//Time of now in AM or PM
function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
}

const createAccount = async () => {

    console.log(generateUid())
    let existingUser = {};

    await useStore().getAllUsers()
        .then(async () => {

            let lastId = useStore().users
            .sort((user1, user2) => +user2?.id - +user1?.id)[0]?.id;

            const newUser = {
                id: `${+lastId + 1}`,
                uid: `${generateUid()}`,
                username: values?.username,
                email: values?.email,
                password: values?.password,
                avatar: `https://ui-avatars.com/api/?name=${values?.username}&background=${getRandomColor()}&color=fff`,
                created: `${today} at ${formatAMPM(new Date())}`,
                cart: [],
                admin: false
            }

            existingUser = useStore().users.find(user => {
                if (user?.email === values.email) {
                    return user;
                }
            })

            if (existingUser) {
                existingErrorView.value = true;

            } else {
                existingErrorView.value = false;

                await Http.post(Http.url + "/users", newUser)
                .then(() => localStorage.setItem("loggedInUser", newUser.uid))
                .then(() => window.location.href = "/")
            }
        })
}
</script>