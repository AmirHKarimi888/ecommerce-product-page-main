<template>
    <div class="product-picture-modal-backdrop hidden z-20" @click.self="emit('toggleProductPictureModal')">
        
        <span class="product-picture-modal-close-btn" @click="emit('toggleProductPictureModal')"><img src="../assets/images/icon-close.svg" alt="Close-Product"></span>

        <div class="product-picture-modal">    
            <div class="product-picture-modal-thumbnail">
                <span class="w-12 h-12 p-2 cursor-pointer" @click="emit('showNextPicture')"><img src="../assets/images/icon-previous.svg" alt="next"></span>
                
                <img class="w-[450px]" :src="showingMainPicture" alt="Product-Thumbnail">

                <span class="w-12 h-12 p-2 cursor-pointer" @click="emit('showPreviousPicture')"><img src="../assets/images/icon-next.svg" alt="prev"></span>
            </div>

            <div class="product-picture-modal-select-pictures">
                <span v-for="picture of selectedProductsPictures" :key="picture?.id" class="cursor-pointer"
                    @click="emit('selectPicture', picture)">
                    <img :src="picture?.thumbnail" alt="Product-Picture" :class="counter === +picture?.id ? 'border-4 border-orange-600 rounded-lg rounded-lg opacity-50' : ''">
                </span>
            </div>
        </div>

    </div>
</template>

<script setup>

const emit = defineEmits(["selectPicture", "toggleProductPictureModal", "showPreviousPicture", "showNextPicture"])

const props = defineProps(["selectedProductsPictures", "showingMainPicture", "counter"])


</script>