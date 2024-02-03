<template>
    <div class="header-cart-deleted-modal-backdrop hidden" @click.self="closeModal">
        <div class="header-cart-deleted-modal">
            <div class="flex justify-end"><img @click="closeModal" class="cursor-pointer" src="../assets/images/icon-close.svg" alt="close"></div>
            <div class="text-[4rem]">❌</div>
            <div class="font-bold text-gray-700">Item was successfully deleted from cart!</div>
        </div>
    </div>
</template>

<script setup>

const closeModal = () => {
    document.querySelector(".header-cart-deleted-modal-backdrop").classList.add("hidden");
}
</script>