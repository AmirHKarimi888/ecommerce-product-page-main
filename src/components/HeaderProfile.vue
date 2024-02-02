<template>
    <div class="header-profile-container hidden z-10">
        <div class="header-profile">
        <div class="header-profile-title">
            <span v-if="useStore().loginStatus" class="header-profile-title-avatar"><img class="w-12 cursor-pointer" src="../assets/images/image-avatar.png" alt="Avatar" /></span>
            <span class="header-profile-title-username">
                {{ useStore().loggedInUser?.username }}
                <span class="header-profile-title-email">{{ useStore().loggedInUser?.email }}</span>
            </span>
        </div>
        <!-- <ul class="header-profile-items">
            <li class="header-profile-item">
                <span class="header-profile-item-thumbnail">
                    <img src="../assets/images/image-product-1-thumbnail.jpg" alt="product">
                </span>

                <span class="header-profile-item-descr">
                    <div class="header-profile-item-descr-title">Fall Limited Edition Sneakers</div>
                    <div class="header-profile-item-descr-price">
                        <span class="header-profile-item-descr-price-single">$125 * 3 </span>
                        <span class="header-profile-item-descr-price-total">$375</span>
                    </div>
                </span>

                <span class="header-profile-item-delete-btn">
                    <img src="../assets/images/icon-delete.svg" alt="delete-product">
                </span>
            </li>
        </ul> -->
        <div class="header-profile-checkout-btn">Sign Out</div>
    </div>
    </div>
</template>

<script setup>
import { useStore } from '../store';


</script>