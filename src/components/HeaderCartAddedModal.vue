<template>
    <div class="header-cart-added-modal-backdrop hidden" @click.self="closeModal">
        <div class="header-cart-added-modal">
            <div class="flex justify-end"><img @click="closeModal" class="cursor-pointer" src="../assets/images/icon-close.svg" alt="close"></div>
            <div class="text-[4rem]">✔</div>
            <div class="font-bold text-gray-700">Item was successfully added to cart!</div>
        </div>
    </div>
</template>

<script setup>

const closeModal = () => {
    document.querySelector(".header-cart-added-modal-backdrop").classList.add("hidden");
}
</script>