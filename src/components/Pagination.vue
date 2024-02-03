<template>
    <div class="flex justify-center gap-3 mb-12">
        <span
            class="w-12 h-12 flex justify-center items-center border border-gray-400 rounded-full cursor-pointer bg-gray-200"
            @click="pagination - 1 > 0 ? emit('goToPrevious') : null">{{ +pagination - 1 > 0 ? pagination - 1 : "-" }}</span>
        <span
            class="w-12 h-12 flex justify-center items-center border border-gray-400 rounded-full bg-gray-200 text-orange-500">{{
                +pagination }}</span>
        <span
            class="w-12 h-12 flex justify-center items-center border border-gray-400 rounded-full cursor-pointer bg-gray-200"
            @click="paginationStart >= 0 ? emit('goToNext') : null">{{ paginationStart >= 0 ? +pagination + 1 : "-" }}</span>
    </div>
</template>

<script setup>

const props = defineProps(["pagination", "paginationStart", "paginationEnd"]);

const emit = defineEmits(["goToPrevious", "goToNext"]);
</script>