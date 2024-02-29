import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import Http from "../Http";

export const useStore = defineStore("store", () => {
    const products = ref([]);
    const selectedProduct = ref({});
    const users = ref([]);
    const loggedInUser = ref({});
    const loginStatus = ref(false);


    const getAllProducts = async () => {
        await Http.get(Http.url + "/products")
        .then((res) => products.value = res.data);
    }

    const getProduct = async (id) => {
        try {
            await Http.get(Http.url + `/products/${id}`)
            .then((res) => selectedProduct.value = res.data);
        } catch {
            
            let foundProduct = products.value.find(product => product.uid === id);
            
            if(!foundProduct) {
                
                let thisId = location.href.substring(location.href.lastIndexOf('/') + 1);
                foundProduct = products.value.find(product => thisId.includes(product.uid));

                if(foundProduct) {
                    location.href = `/products/${foundProduct.uid}`;

                } else {
                    location.href = "/notfound";
                }
            }
        }
    }

    const getAllUsers = async() => {
        await Http.get(Http.url + `/users`)
        .then((res) => users.value = res.data);
    }

    const getLoggedInUser = async() => {

        const uid = localStorage.getItem("loggedInUser");

        await getAllUsers()
        .then(() => {
            loggedInUser.value = users.value.find(user => {
                if(user?.uid === uid) {
                  return user;
                }
            })
        })
        .then(() => {
            loggedInUser.value ? loginStatus.value = true : loginStatus.value = false;
        })
    }

    return { products, selectedProduct, loggedInUser, loginStatus, users, getAllProducts, getProduct, getAllUsers, getLoggedInUser }
})

export const useSignupStore = defineStore("signup", () => {
    const signupView = ref(true);

    return { signupView }
})