<template>
    <div class="product-pictures max-[500px]:hidden">
        <div class="product-thumbnail">
            <div class="product-thumbnail-container">
                <img @click="toggleProductPictureModal" :src="showingMainPicture" class="cursor-pointer" alt="Product-Thumbnail">
            </div>
            <ProductPictureModal 
             :selectedProductsPictures="selectedProductsPictures"
             :showingMainPicture="showingMainPicture"
             :counter="counter"
             @selectPicture="selectPicture" 
             @toggleProductPictureModal="toggleProductPictureModal"
             @showPreviousPicture="showPreviousPicture"
             @showNextPicture="showNextPicture"
            />
        </div>

        <div class="product-select-pictures">
            <span v-for="picture of selectedProductsPictures" :key="picture?.id" class="cursor-pointer"
                @click="selectPicture(picture)">
                <img :src="picture?.thumbnail" :class="counter === +picture?.id ? 'border-4 border-orange-600 rounded-lg' : ''" alt="Product-Picture">
            </span>
        </div>
    </div>



    <div class="product-pictures-mobile min-[501px]:hidden">
        <div class="product-pictures-mobile-main" :style="{ backgroundImage: `url(${showingMainPicture})` }">
            <span @click="showNextPicture" class="product-pictures-mobile-btn"><img class=""
                    src="../assets/images/icon-previous.svg" alt="next"></span>
            <span @click="showPreviousPicture" class="product-pictures-mobile-btn"><img class=""
                    src="../assets/images/icon-next.svg" alt="prev"></span>
        </div>

        <!-- <div class="product-pictures-mobile-btns">

        </div> -->
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from '../store';
import { ProductPictureModal } from "../components";

const props = defineProps(["selectedProductId"]);

const selectedProduct = ref({});
const selectedProductsPictures = ref([]);

const showingMainPicture = ref('');

const counter = ref(1);

onMounted(() => {
    
    if(useStore().selectedProduct) {
        selectedProduct.value = useStore().selectedProduct
        selectedProductsPictures.value = selectedProduct.value.pictures
        showingMainPicture.value = selectedProductsPictures.value[0].src
    }
})


const toggleProductPictureModal = () => {
    const productPictureModalBackdropEl = document.querySelector(".product-picture-modal-backdrop");
    const productPictureModalEl = document.querySelector(".product-picture-modal");

    productPictureModalBackdropEl.classList.toggle("hidden");
    productPictureModalEl.classList.add("fadeIn");

}

//Desktop
const selectPicture = (picture) => {
    showingMainPicture.value = picture?.src;
    counter.value = +picture?.id;
}


//Mobile picture slider

const showPreviousPicture = () => {

    counter.value --;
    counter.value === 0 ? counter.value = 4 : null;
    showingMainPicture.value = selectedProductsPictures.value[counter.value - 1].src;
}

const showNextPicture = () => {

    counter.value ++;
    counter.value === 5 ? counter.value = 1 : null;
    showingMainPicture.value = selectedProductsPictures.value[counter.value - 1].src;
}


// const autoSlideToggler = () => {
//     counter.value ++;
//     counter.value === 5 ? counter.value = 1 : null;
//     showingMainPicture.value = selectedProductsPictures.value[counter.value - 1].src;

//     document.querySelector(".product-pictures-mobile-main").classList.add("moveToRight");
//     setTimeout(() => {
//         document.querySelector(".product-pictures-mobile-main").classList.remove("moveToRight");
//     }, 1500)

// }

// const Inter = setInterval(autoSlideToggler, 4000);

// if (window.innerWidth >= 501) {
//     clearInterval(Inter);
// }

// window.addEventListener("resize", () => {
//     if (window.innerWidth >= 501) {
//         clearInterval(Inter);
//     }
// })


</script>