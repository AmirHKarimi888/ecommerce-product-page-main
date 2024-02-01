import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import Http from "../Http";

export const useStore = defineStore("store", () => {
    const products = ref([]);
    const selectedProduct = ref({});

    const getAllProducts = async () => {
        await Http.get(Http.url + "/products")
        .then((res) => products.value = res.data);
    }

    const getProduct = async (id = "1") => {
        await Http.get(Http.url + `/products/${id}`)
        .then((res) => selectedProduct.value = res.data);
    }

    return { products, selectedProduct, getAllProducts, getProduct }
})