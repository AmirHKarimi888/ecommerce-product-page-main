<template>
    <div class="product-details-add-to-cart">
        <div class="product-details-price">
            <span class="product-details-price-main">${{ +useStore().selectedProduct?.price?.toFixed(2) *
                +useStore().selectedProduct?.discount }}</span>
            <span class="product-details-price-discount">{{ +useStore().selectedProduct?.discount * 100 }}%</span>
            <div class="product-details-price-prev-price">${{ useStore().selectedProduct?.price }}</div>
        </div>

        <div class="product-details-btns">
            <span class="product-details-plus-minus">
                <span class="product-details-minus-btn" @click="quantity > 0 ? quantity-- : null"><img
                        src="../assets/images/icon-minus.svg" alt="minus"></span>
                <span class="product-details-quantity">{{ quantity }}</span>
                <span class="product-details-plus-btn" @click="quantity++"><img src="../assets/images/icon-plus.svg"
                        alt="plus"></span>
            </span>

            <span class="product-details-add-to-card-btn" @click="addToCart">
                <img src="../assets/images/icon-cart.svg" alt="cart">
                <span>Add to cart</span>
            </span>
        </div>
    </div>
    <HeaderCartAddedModal />
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useStore } from '../store';
import Http from "../Http";
import { HeaderCartAddedModal } from ".";

const props = defineProps(["selectedProductId"]);

const quantity = ref(0);
const foundInCartItem = ref({});

onMounted(async () => {
    await useStore().getLoggedInUser(props.selectedProductId)
        .then(() => {
            foundInCartItem.value = useStore().loggedInUser?.cart?.find(item => {
                if (item?.uid === useStore().selectedProduct?.uid) {
                    return item;
                }
            })

            if (foundInCartItem.value) quantity.value = foundInCartItem.value?.quantity;
        })
})


const addToCart = async () => {

    if (foundInCartItem.value) {

        useStore().loggedInUser.cart.filter(item => {
            if (item?.uid === useStore().selectedProduct.uid) {
                item.quantity = quantity.value;
            }
        })

        await Http.put(Http.url + `/users/${useStore().loggedInUser?.id}`, {
            ...useStore().loggedInUser
        })
            .then(async () => {
                await Http.get(Http.url + `/users/${useStore().loggedInUser.id}`)
                    .then((res) => useStore().loggedInUser = res.data);
            })
            .then(() => {
                document.querySelector(".header-cart-added-modal-backdrop").classList.remove("hidden");
            })

    } else {

        if (quantity.value > 0) {
            await Http.put(Http.url + `/users/${useStore().loggedInUser?.id}`, {
                ...useStore().loggedInUser,
                cart: [
                    ...useStore().loggedInUser?.cart,
                    {
                        id: useStore().selectedProduct?.id,
                        uid: useStore().selectedProduct?.uid,
                        quantity: quantity.value
                    }
                ]
            })
                .then(async () => {
                    await Http.get(Http.url + `/users/${useStore().loggedInUser.id}`)
                        .then((res) => useStore().loggedInUser = res.data);
                })
                .then(() => {
                document.querySelector(".header-cart-added-modal-backdrop").classList.remove("hidden");
            })
        }
    }
}
</script>