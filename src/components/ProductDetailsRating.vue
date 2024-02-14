<template>
    <p class="product-details-rate">
    <div v-if="useStore().selectedProduct?.rates.length > 0">
        <span
            :class="Math.floor(useStore().selectedProduct?.rates?.reduce((t, p) => t + +p.rate, 0) / useStore().selectedProduct?.rates?.length) >= 70 ? 'text-green-600'
                : Math.floor(useStore().selectedProduct?.rates?.reduce((t, p) => t + +p.rate, 0) / useStore().selectedProduct?.rates?.length) < 70 && Math.floor(useStore().selectedProduct?.rates?.reduce((t, p) => t + +p.rate, 0) / useStore().selectedProduct?.rates?.length) >= 50 ? 'text-yellow-500'
                    : Math.floor(useStore().selectedProduct?.rates?.reduce((t, p) => t + +p.rate, 0) / useStore().selectedProduct?.rates?.length) < 50 && Math.floor(useStore().selectedProduct?.rates?.reduce((t, p) => t + +p.rate, 0) / useStore().selectedProduct?.rates?.length) >= 30 ? 'text-orange-600'
                        : Math.floor(useStore().selectedProduct?.rates?.reduce((t, p) => t + +p.rate, 0) / useStore().selectedProduct?.rates?.length) < 30 ? 'text-red-600' : ''">{{
                Math.floor(useStore().selectedProduct?.rates?.reduce((t, p) => t + +p.rate, 0) /
                    useStore().selectedProduct?.rates?.length) }}%
        </span> Satisfaction
    </div>

    <input v-if="useStore().loginStatus" @mouseup="rateToProduct" @touchend="rateToProduct" class="my-2" type="range"
        min="0" max="100" v-model="userProductRate">
    <div>

        <span v-if="useStore().loginStatus && foundRatedItem ? true : false">
            You rated <span
                :class="userProductRate >= 70 ? 'text-green-600' : userProductRate < 70 && userProductRate >= 50 ? 'text-yellow-500' : userProductRate < 50 && userProductRate >= 30 ? 'text-orange-600' : userProductRate < 30 ? 'text-red-600' : ''">{{
                    userProductRate }}%</span> to this product
        </span>

        <span v-if="useStore().loginStatus && !foundRatedItem ? true : false" class="font-normal text-sm">
            Do you want to rate? Just use the thumb above
        </span>
    </div>
    </p>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useStore } from '../store';
import Http from "../Http";

const userProductRate = ref(0);
const foundRatedItem = ref({});
const previousFoundRatedItem = ref({});

const setFoundRatedItem = () => {

    foundRatedItem.value = useStore().selectedProduct?.rates.find(item => {
        if (item?.email === useStore().loggedInUser?.email) {
            return item;
        }
    })

    if (foundRatedItem.value) userProductRate.value = foundRatedItem.value?.rate;
}


onMounted(() => {
    if(useStore().loggedInUser) {
        setFoundRatedItem()
        previousFoundRatedItem.value = { ...foundRatedItem.value }
    }
})


const rateToProduct = async () => {
    if (useStore().loginStatus) {

        if (foundRatedItem.value) {
            useStore().selectedProduct.rates.filter(item => {
                if (item?.email === useStore().loggedInUser.email) {
                    item.rate = userProductRate.value;
                }
            })


            if (previousFoundRatedItem.value.rate !== userProductRate.value) {
                await Http.put(Http.url + `/products/${useStore().selectedProduct?.id}`, {
                    ...useStore().selectedProduct
                })
                    .then(async () => await useStore().getProduct(useStore().selectedProduct?.id))
                    .then(() => setFoundRatedItem())
                    .then(() => previousFoundRatedItem.value = { ...foundRatedItem.value })
            }

        } else {
            await Http.put(Http.url + `/products/${useStore().selectedProduct?.id}`, {
                ...useStore().selectedProduct,
                rates: [
                    ...useStore().selectedProduct?.rates,
                    {
                        email: useStore().loggedInUser.email,
                        rate: userProductRate.value
                    }
                ]
            })
                .then(async () => await useStore().getProduct(useStore().selectedProduct?.id))
                .then(() => setFoundRatedItem())
        }
    }
}
</script>