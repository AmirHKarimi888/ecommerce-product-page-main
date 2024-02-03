<template>
    <div class="header-cart-changed-modal-backdrop hidden" @click.self="closeModal">
        <div class="header-cart-changed-modal">
            <div class="flex justify-end"><img @click="closeModal" class="cursor-pointer" src="../assets/images/icon-close.svg" alt="close"></div>
            <div class="text-[4rem]">🔄</div>
            <div class="font-bold text-gray-700">Item was successfully changed in cart!</div>
        </div>
    </div>
</template>

<script setup>

const closeModal = () => {
    document.querySelector(".header-cart-changed-modal-backdrop").classList.add("hidden");
}
</script>