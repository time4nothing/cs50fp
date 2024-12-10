<template>
    <div id="guess-count">
        <div id="guess-count-text">Attempt</div>
        <div id="guess-count-display">{{ !guesscount ? '00' : formattedGuessCount }}</div>
    </div>
</template>

<script setup>
// system imports
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';

// store imports
import { useUserStore } from '../stores/user.js';

// store refs
const { user } = storeToRefs(useUserStore());

// local setup
const guesscount = ref(user.value.guesscount);

const formattedGuessCount = computed(() => {
    let formattedGuess = '';
    if (guesscount.value < 10) {
        formattedGuess = '0' + guesscount.value;
    } else {
        formattedGuess = guesscount.value;
    }
    return formattedGuess;
})

watch(user, () => {
    guesscount.value = user.value.guesscount;
})
</script>

<style scoped>
#guess-count {
    display: flex;
    align-items: center;
}

#guess-count-text {
    font-size: 1.5rem;
    padding: 4px 10px;
    background-color: rgb(56, 56, 56);
    color: white;
}

#guess-count-display {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    color: white;
    border: 2px solid white;
    width: 30px;
    height: 75%;
    font-size: 1.5rem;
}
</style>