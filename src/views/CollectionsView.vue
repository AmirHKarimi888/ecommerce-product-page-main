<template>
    <main>
        <div class="collections-view" v-if="collectionsView">
            <ul class="collection-product-items">
                <li class="collection-product-item" v-for="product of displayingProducts">
                    <RouterLink :to="{ name: 'Product', params: { id: product?.uid } }">
                        <div class="collection-product-item-img-container">
                            <img :src="product?.pictures[0].src" alt="poster">
                        </div>
                        <div class="mt-5 text-gray-600 font-bold">{{ product?.title }}</div>
                        <div class="mt-2 flex justify-center gap-2">
                            <span class="line-through bg-gray-300 p-2 rounded-lg">${{ +product?.price.toFixed(2) }}</span>
                            <span class="bg-orange-500 p-2 rounded-lg text-white">${{ (+product?.price * (1 - +product?.discount)).toFixed(2)
                            }}</span>
                        </div>
                    </RouterLink>
                </li>
            </ul>

            <Pagination 
              v-if="paginationView"
              :pagination="pagination"
              :paginationStart="paginationStart"
              :paginationEnd="paginationEnd"
              @goToPrevious="goToPrevious"
              @goToNext="goToNext"
            />
        </div>

        <div v-else>
            <Spinner />
        </div>
    </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "../store";
import { Pagination, Spinner } from "../components";

const collectionsView = ref(false);
const paginationView = ref(false);

const displayingProducts = ref([]);

const paginationEnd = ref(0);
const paginationStart = ref(0);
const pagination = ref(1);

onMounted(async () => {
    await useStore().getAllProducts()
        .then(() => {
            paginationEnd.value = useStore().products.length;
            paginationStart.value = useStore().products.length - 6;
        })
        .then(() => {
            if (paginationStart.value >= 0) {
                displayingProducts.value = useStore().products
                    .slice(paginationStart.value, paginationEnd.value)
                    .reverse();

            } else {
                displayingProducts.value = useStore().products
                    .slice(0, paginationEnd.value)
                    .reverse();
            }
        })
        .then(() => collectionsView.value = true)
        .then(() => paginationView.value = true)
})

const goToPrevious = () => {
    paginationEnd.value+=6;
    paginationStart.value+=6;
    pagination.value--;

    displayingProducts.value = useStore().products
    .slice(paginationStart.value, paginationEnd.value)
    .reverse();
}

const goToNext = () => {
    paginationEnd.value-=6;
    paginationStart.value-=6;
    pagination.value++;

    if(paginationStart.value >= 0) {
        displayingProducts.value = useStore().products
        .slice(paginationStart.value, paginationEnd.value)
        .reverse();
    } else {
        displayingProducts.value = useStore().products
        .slice(0, paginationEnd.value)
        .reverse();
    }
}
</script>