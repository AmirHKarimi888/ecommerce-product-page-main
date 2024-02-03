<template>
    <div class="product-details">
        <h3 class="product-details-pre-title">SNEAKER COMPANY</h3>
        <h1 class="product-details-title">{{ useStore().selectedProduct?.title }}</h1>
        <p class="product-details-descr">
            {{ useStore().selectedProduct?.description }}
        </p>
        <ProductDetailsAddToCart />
    </div>
</template>

<script setup>
import { ProductDetailsAddToCart } from ".";
import { useStore } from "../store";
</script>