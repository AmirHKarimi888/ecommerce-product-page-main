<template>
    <div class="product-details-add-to-cart">
        <div class="product-details-price">
            <span class="product-details-price-main">${{ +useStore().selectedProduct?.price?.toFixed(2) *
                (1 - +useStore().selectedProduct?.discount) }}</span>
            <span class="product-details-price-discount">{{ +useStore().selectedProduct?.discount * 100 }}%</span>
            <div class="product-details-price-prev-price">${{ useStore().selectedProduct?.price }}</div>
        </div>

        <ProductDetailsRating />

        <div class="product-details-btns">
            <span v-if="useStore().loginStatus" class="product-details-plus-minus">
                <span class="product-details-minus-btn" @click="quantity > 0 ? quantity-- : null"><img
                        src="../assets/images/icon-minus.svg" alt="minus"></span>
                <span class="product-details-quantity">{{ quantity }}</span>
                <span class="product-details-plus-btn" @click="quantity++"><img src="../assets/images/icon-plus.svg"
                        alt="plus"></span>
            </span>

            <span v-if="useStore().loginStatus" class="product-details-add-to-card-btn" @click="addToCart">
                <img src="../assets/images/icon-cart.svg" alt="cart">
                <span>Add to cart</span>
            </span>

            <span v-else class="product-details-add-to-card-btn">
                <RouterLink to="/signup">Signup To Order</RouterLink>
            </span>
        </div>
    </div>
    <HeaderCartAddedModal />
    <HeaderCartDeletedModal />
    <HeaderCartChangedModal />
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useStore } from '../store';
import Http from "../Http";
import { HeaderCartAddedModal, HeaderCartDeletedModal, HeaderCartChangedModal, ProductDetailsRating } from ".";


const quantity = ref(0);
const foundInCartItem = ref({});
const previousFoundInCartItem = ref({});

const setFoundInCartItem = () => {

    if(useStore().loggedInUser) {
        foundInCartItem.value = useStore().loggedInUser?.cart?.find(item => {
                if (item?.uid === useStore().selectedProduct?.uid) {
                    return item;
                }
            })

        if (foundInCartItem.value) quantity.value = foundInCartItem.value?.quantity;
    }
}


onMounted(() => {
    setFoundInCartItem();

    previousFoundInCartItem.value = { ...foundInCartItem.value };
})


const addToCart = async () => {

    if (useStore().loginStatus) {

        if (foundInCartItem.value) {


            if (quantity.value > 0) {


                useStore().loggedInUser.cart.filter(item => {
                    if (item?.uid === useStore().selectedProduct.uid) {
                        item.quantity = quantity.value;
                    }
                })


                if (previousFoundInCartItem.value.quantity !== quantity.value) {
                    await Http.put(Http.url + `/users/${useStore().loggedInUser?.id}`, {
                        ...useStore().loggedInUser
                    })
                    .then(async () => await useStore().getLoggedInUser())
                        .then(() => setFoundInCartItem())
                        .then(() => previousFoundInCartItem.value = { ...foundInCartItem.value })
                        .then(() => {
                            document.querySelector(".header-cart-changed-modal-backdrop").classList.remove("hidden");
                        })
                }
            }


            if (quantity.value === 0) {
                let updatedResCart = [];

                updatedResCart = useStore().loggedInUser.cart.filter(i => i.uid !== useStore().selectedProduct.uid ? i : null);

                await Http.put(Http.url + `/users/${useStore().loggedInUser.id}`, {
                    ...useStore().loggedInUser,
                    cart: updatedResCart
                })
                    .then(() => setFoundInCartItem())
                    .then(() => {
                        document.querySelector(".header-cart-deleted-modal-backdrop").classList.remove("hidden");
                    })
            }


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
                    .then(async () => await useStore().getLoggedInUser())
                    .then(() => setFoundInCartItem())
                    .then(() => {
                        document.querySelector(".header-cart-added-modal-backdrop").classList.remove("hidden");
                    })
            }
        }
    }

}


</script>