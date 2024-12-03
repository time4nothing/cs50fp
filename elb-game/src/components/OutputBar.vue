<template>
    <div :class="['output', { 'is-error': guessLocked }]">
        {{ guess }}
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useGuessStore } from '../stores/guesses.js';

const { guess, guessLocked } = storeToRefs(useGuessStore());
</script>

<style scoped>
.output {
    background-color: black;
    height: 70px;
    width: 420px;
    padding: 10px 0;
    font-size: 4rem;
    margin: 10px auto;
    border: 3px solid darkgrey;
    font-family: 'DSEG7 Modern';
    color: white;
    text-align: right;
}

.is-error {
    border-color: red;
}

#output.gameover {
    font-family: 'Oswald';
    text-align: center;
    color: rgb(76, 187, 23);
    font-size: 3rem;
}
</style>