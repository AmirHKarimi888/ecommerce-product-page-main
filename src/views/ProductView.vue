<template>
    <main>
        <div class="product" v-if="showProduct">
            <ProductPictures :selectedProductId="foundProduct?.id" />
            <ProductDetails :selectedProductId="foundProduct?.id" />
        </div>

        <div v-else>
            <Spinner />
        </div>
    </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { ProductDetails, ProductPictures } from '../components';
import { useStore } from "../store";
import { Spinner } from "../components/index";


const { params } = useRoute();

const foundProduct = ref({});

const showProduct = ref(false);

onMounted(async () => {

    await useStore().getLoggedInUser()
        .then(async () => await useStore().getAllProducts())
        .then(() => foundProduct.value = useStore().products.find((product) => product.uid === params.id ? product : null))
        .then(async () => await useStore().getProduct(foundProduct.value?.id))
        .then(() => foundProduct.value = useStore().selectedProduct)
        .then(() => showProduct.value = true)
})
</script>