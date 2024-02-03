<template>
    <div class="header-cart-container hidden z-10">
        <div class="header-cart">
            <div class="header-cart-title">Cart</div>

            <ul v-if="cartItems.length > 0" class="header-cart-items">
                <li v-for="(item, index) of cartItems" :key="index" class="header-cart-item">

                    <a :href="`/products/${item?.uid}`">
                        <span class="header-cart-item-thumbnail">
                            <img :src="item?.pictures[0].thumbnail" alt="product">
                        </span>
                    </a>

                    <a :href="`/products/${item?.uid}`">
                        <span class="header-cart-item-descr">
                            <div class="header-cart-item-descr-title">{{ item?.title }}</div>
                            <div class="header-cart-item-descr-price">
                                <span class="header-cart-item-descr-price-single">${{ +item?.price * (1 - +item?.discount) }} × {{
                                    item?.quantity }}</span>
                                <span class="header-cart-item-descr-price-total"> = ${{ +item?.price * (1 - +item?.discount) *
                                    item?.quantity }}</span>
                            </div>
                        </span>
                    </a>

                    <span class="header-cart-item-delete-btn" @click="deleteFromCart(item)">
                        <img src="../assets/images/icon-delete.svg" alt="delete-product">
                    </span>
                </li>

                <li class="header-cart-item">
                    <span class="header-cart-item-descr">
                        <span class="font-bold text-md">Total Price :</span>
                        <span class="font-bold text-md text-orange-600"> ${{ cartItems.reduce((t, p) => t = t + (p.price * p.quantity * (1 - p.discount)), 0) }}</span>
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

const getCartItems = async () => {
    await useStore().getLoggedInUser()
        .then(() => {
            useStore().loggedInUser.cart.map(async (item) => {
                await Http.get(Http.url + `/products/${item.id}`)
                    .then((res) => {
                        cartItems.value.push({
                            ...res.data,
                            quantity: item.quantity
                        });
                    })
            })
        })

}

onMounted(async () => {
    await getCartItems();
})

const deleteFromCart = async (item) => {
    let updatedResCart = [];

    updatedResCart = useStore().loggedInUser.cart.filter(i => i.uid !== item.uid ? i : null);

    await Http.put(Http.url + `/users/${useStore().loggedInUser.id}`, {
        ...useStore().loggedInUser,
        cart: updatedResCart
    })
        .then(() => cartItems.value = [])
        .then(async () => await getCartItems())
        .then(() => {
                document.querySelector(".header-cart-deleted-modal-backdrop").classList.remove("hidden");
        })
}
</script>