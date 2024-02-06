<template>
    <div class="product-details-add-to-cart">
        <div class="product-details-price">
            <span class="product-details-price-main">${{ +useStore().selectedProduct?.price?.toFixed(2) *
                (1 - +useStore().selectedProduct?.discount) }}</span>
            <span class="product-details-price-discount">{{ +useStore().selectedProduct?.discount * 100 }}%</span>
            <div class="product-details-price-prev-price">${{ useStore().selectedProduct?.price }}</div>
        </div>

        <p class="product-details-rate">
        <div><span class="text-orange-500">87%</span> Satisfactory</div>
        <input @click="rateToProduct" class="my-2" type="range" min="0" max="100" v-model="userProductRate">
        <div>
            <span v-if="foundRatedItem ? true : false">
                You gave <span class="text-orange-500">{{ userProductRate }}%</span> to this product
            </span>

            <span class="font-light" v-else>
                Do you want to rate? Just use the thumb above
            </span>
        </div>
        </p>

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
import { HeaderCartAddedModal, HeaderCartDeletedModal, HeaderCartChangedModal } from ".";


const quantity = ref(0);
const foundInCartItem = ref({});
const previousFoundInCartItem = ref({});

const setFoundInCartItem = async () => {
    await useStore().getLoggedInUser()
        .then(() => {
            foundInCartItem.value = useStore().loggedInUser?.cart?.find(item => {
                if (item?.uid === useStore().selectedProduct?.uid) {
                    return item;
                }
            })

            if (foundInCartItem.value) quantity.value = foundInCartItem.value?.quantity;

        })
}



const userProductRate = ref(0);
const foundRatedItem = ref({});
const previousFoundRatedItem = ref({});

const setFoundRatedItem = async () => {
    await useStore().getProduct(useStore().selectedProduct?.id)
        .then(() => {
            foundRatedItem.value = useStore().selectedProduct?.rates.find(item => {
                if (item?.email === useStore().loggedInUser.email) {
                    return item;
                }
            })

            if (foundRatedItem.value) userProductRate.value = foundRatedItem.value?.rate;

        })
}

onMounted(async () => {
    await setFoundInCartItem()
        .then(async () => await setFoundRatedItem())

    previousFoundInCartItem.value = { ...foundInCartItem.value };
    previousFoundRatedItem.value = { ...foundRatedItem.value };
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
                        .then(async () => {
                            await Http.get(Http.url + `/users/${useStore().loggedInUser.id}`)
                                .then((res) => useStore().loggedInUser = res.data);
                        })
                        .then(async () => await setFoundInCartItem())
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
                    .then(async () => await setFoundInCartItem())
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
                    .then(async () => {
                        await Http.get(Http.url + `/users/${useStore().loggedInUser.id}`)
                            .then((res) => useStore().loggedInUser = res.data);
                    })
                    .then(async () => await setFoundInCartItem())
                    .then(() => {
                        document.querySelector(".header-cart-added-modal-backdrop").classList.remove("hidden");
                    })
            }
        }
    }

}


const rateToProduct = async () => {
    if (useStore().loginStatus) {

        if (foundRatedItem.value) {
            useStore().selectedProduct.rates.filter(item => {
                if (item?.email === useStore().loggedInUser.email) {
                    item.rate = userProductRate.value;
                }
            })


            if (previousFoundInCartItem.value.rate !== userProductRate.value) {
                await Http.put(Http.url + `/products/${useStore().selectedProduct?.id}`, {
                    ...useStore().selectedProduct
                })
                    .then(async () => {
                        await Http.get(Http.url + `/products/${useStore().selectedProduct?.id}`)
                            .then((res) => useStore().selectedProduct = res.data);
                    })
                    .then(async () => await setFoundRatedItem())
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
                .then(async () => {
                    await Http.get(Http.url + `/products/${useStore().selectedProduct?.id}`)
                        .then((res) => useStore().selectedProduct = res.data);
                })
                .then(async () => await setFoundRatedItem())
        }
    }
}

</script>