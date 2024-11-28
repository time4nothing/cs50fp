<template>
    <button class="keypad-button" name="button" :value="props.value">{{ props.text }}</button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['value', 'text']);
</script>

<style scoped>
.keypad-button {
    background-color: rgb(119, 119, 119);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    font-size: 4rem;
    color: white;
}
</style>