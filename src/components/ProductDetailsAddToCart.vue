<template>
    <div class="product-details-add-to-cart">
        <div class="product-details-price">
            <span class="product-details-price-main">${{ +useStore().selectedProduct?.price?.toFixed(2) * +useStore().selectedProduct?.discount }}</span>
            <span class="product-details-price-discount">{{ +useStore().selectedProduct?.discount * 100 }}%</span>
            <div class="product-details-price-prev-price">${{ useStore().selectedProduct?.price }}</div>
        </div>

        <div class="product-details-btns">
            <span class="product-details-plus-minus">
                <span class="product-details-minus-btn"><img src="../assets/images/icon-minus.svg" alt="minus"></span>
                <span class="product-details-quantity">0</span>
                <span class="product-details-plus-btn"><img src="../assets/images/icon-plus.svg" alt="plus"></span>
            </span>

            <span class="product-details-add-to-card-btn">
                <img src="../assets/images/icon-cart.svg" alt="cart">
                <span>Add to cart</span>
            </span>
        </div>
    </div>
</template>

<script setup>
import { useStore } from '../store';

</script>