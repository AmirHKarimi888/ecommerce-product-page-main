<template>
    <div class="header-cart-container hidden">
        <div class="header-cart">
            <div class="header-cart-title">Cart</div>

            <ul v-if="cartItems.length > 0" class="header-cart-items">
                <li v-for="(item, index) of cartItems" :key="index" class="header-cart-item">
                    <span class="header-cart-item-thumbnail">
                        <img :src="item?.pictures[0].thumbnail" alt="product">
                    </span>

                    <span class="header-cart-item-descr">
                        <div class="header-cart-item-descr-title">{{ item?.title }}</div>
                        <div class="header-cart-item-descr-price">
                            <span class="header-cart-item-descr-price-single">${{ +item?.price * +item?.discount }} * {{ item?.quantity }}</span>
                            <span class="header-cart-item-descr-price-total"> = ${{ +item?.price * +item?.discount * item?.quantity }}</span>
                        </div>
                    </span>

                    <span class="header-cart-item-delete-btn">
                        <img src="../assets/images/icon-delete.svg" alt="delete-product">
                    </span>
                </li>

            </ul>
            <div v-if="cartItems.length > 0" class="header-cart-checkout-btn">Checkout</div>

            <div v-else class="header-cart-items">
                Your cart is empty!
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useStore } from "../store";
import Http from "../Http";

const cartItems = ref([]);

onMounted(async () => {

    await useStore().getLoggedInUser()
    .then(() => {
        useStore().loggedInUser.cart.map(async(item) => {
            await Http.get(Http.url + `/products/${item.id}`)
            .then((res) => {
                cartItems.value.push({
                    ...res.data,
                    quantity: item.quantity
                });
            })
        })
    })
})
</script>