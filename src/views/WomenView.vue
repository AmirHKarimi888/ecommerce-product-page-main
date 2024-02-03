<template>
    <main>
        <div class="collections-view" v-if="collectionsView">
            <ul class="collection-product-items">
                <li class="collection-product-item" v-for="product of displayingProducts">
                    <RouterLink :to="{ name: 'Product', params: { id: product?.uid } }">
                        <img :src="product?.pictures[0].src" alt="poster">
                        <div class="mt-5 text-gray-600 font-bold">{{ product?.title }}</div>
                        <div class="mt-2 flex justify-center gap-2">
                            <span class="line-through bg-gray-300 p-2 rounded-lg">${{ product?.price }}</span>
                            <span class="bg-orange-500 p-2 rounded-lg text-white">${{ +product?.price * +product?.discount
                            }}</span>
                        </div>
                    </RouterLink>
                </li>
            </ul>
        </div>

        <div v-else>
            <Spinner />
        </div>
    </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "../store";
import { Spinner } from "../components";

const collectionsView = ref(false);

const displayingProducts = ref([]);

onMounted(async () => {
    await useStore().getAllProducts()
        .then(() => {
            displayingProducts.value = useStore().products
            .slice(useStore().products.length - 6, useStore().products.length)
            .filter(product => product?.type === "women" ? product : null)
            .reverse();
        })
        .then(() => collectionsView.value = true);
})
</script>