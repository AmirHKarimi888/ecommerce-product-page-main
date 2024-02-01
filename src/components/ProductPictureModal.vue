<template>
    <div class="product-picture-modal-backdrop hidden" @click.self="emit('toggleProductPictureModal')">
        <div class="product-picture-modal">
            <div class="product-picture-modal-thumbnail">
                <img :src="showingMainPicture" alt="Product-Thumbnail">
            </div>

            <div class="product-picture-modal-select-pictures">
                <span v-for="picture of selectedProductsPictures" :key="picture?.id" class="cursor-pointer" :class="counter === +picture?.id ? 'border-4 border-orange-600 rounded-lg opacity-50' : ''"
                    @click="emit('selectPicture', picture)">
                    <img :src="picture?.thumbnail" alt="Product-Picture">
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>

const emit = defineEmits(["selectPicture", "toggleProductPictureModal"])

const props = defineProps(["selectedProductsPictures", "showingMainPicture", "counter"])


</script>