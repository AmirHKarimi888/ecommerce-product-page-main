<template>
    <div class="header-search-box-backdrop hidden" @click.self="emit('closeSearchBox')">
        <div class="header-search-box">
            <form @submit.prevent="searchForProducts" class="header-search-box-search-input">
                <input type="text" v-model="searchInput">
                <button>Search</button>
            </form>
            <ul v-if="collectionsView && displayingProducts.length > 0" class="header-search-box-items">
                <li class="header-search-box-item" v-for="product of displayingProducts">
                    <RouterLink :to="{ name: 'Product', params: { id: product?.uid } }">
                        <div class="header-search-box-item-img-container">
                            <img :src="product?.pictures[0].src" alt="poster">
                        </div>
                        <div class="mt-5 text-gray-600 font-bold">{{ product?.title }}</div>
                        <div class="mt-2 flex justify-center gap-2">
                            <span class="line-through bg-gray-300 p-2 rounded-lg">${{ product?.price }}</span>
                            <span class="bg-orange-500 p-2 rounded-lg text-white">${{ +product?.price * (1 - +product?.discount)
                            }}</span>
                        </div>
                    </RouterLink>
                </li>
            </ul>

            <div v-if="displayingProducts.length === 0" class="header-search-box-item-nothing-found">
                Nothing was found!
            </div>

            <Pagination 
              v-if="paginationView && displayingProducts.length > 0"
              :pagination="pagination"
              :paginationStart="paginationStart"
              :paginationEnd="paginationEnd"
              @goToPrevious="goToPrevious"
              @goToNext="goToNext"
            />

           <div v-if="!collectionsView">
             <Spinner />
           </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "../store";
import { Pagination, Spinner } from "../components";

const emit = defineEmits(["closeSearchBox"]);

const collectionsView = ref(false);
const paginationView = ref(false);

const searchInput = ref("");

const displayingProducts = ref([]);

const paginationEnd = ref(0);
const paginationStart = ref(0);
const pagination = ref(1);

onMounted(async () => {
    await useStore().getAllProducts()
    .then(() => collectionsView.value = true)
    .then(() => paginationView.value = true)
        // .then(() => {
        //     paginationEnd.value = useStore().products.length;
        //     paginationStart.value = useStore().products.length - 6;
        // })
        // .then(() => {
        //     displayingProducts.value = useStore().products
        //     .slice(paginationStart.value, paginationEnd.value)
        //     .reverse();
        // })
        // .then(() => collectionsView.value = true)
        // .then(() => paginationView.value = true)
})

const searchForProducts = async () => {
    if(searchInput.value !== "") {
        collectionsView.value = false;
        paginationView.value = false;

        await useStore().getAllProducts()
        .then(() => {
            displayingProducts.value = useStore().products
            .filter(product => {
                if(product.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
                product.description.toLowerCase().includes(searchInput.value.toLowerCase()) ||
                product.type.toLowerCase() === searchInput.value.toLowerCase()) {
                    return product;
                }
            })
        })
        .then(() => {
            paginationEnd.value = displayingProducts.value.length;
            paginationStart.value = displayingProducts.value.length - 6;
        })
        .then(() => {
            displayingProducts.value = displayingProducts.value
            .slice(paginationStart.value, paginationEnd.value)
            .reverse();
        })
        .then(() => collectionsView.value = true)
        .then(() => paginationView.value = true)
        
    } else {
        displayingProducts.value = [];
    }
}

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