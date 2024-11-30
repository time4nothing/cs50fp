<template>
    <div id="keypad">
        <KeypadButton value="1" text="1"/>
        <KeypadButton value="2" text="2"/>
        <KeypadButton value="3" text="3"/>
        <KeypadButton value="4" text="4"/>
        <KeypadButton value="5" text="5"/>
        <KeypadButton value="6" text="6"/>
        <KeypadButton value="7" text="7"/>
        <KeypadButton value="8" text="8"/>
        <KeypadButton value="9" text="9"/>
        <KeypadButton value="backspace" />
        <KeypadButton value="0" text="0"/>
        <KeypadButton value="enter" />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useGuessStore } from '../stores/guesses.js';
import { useKeypadStore } from '../stores/keypad.js';

import KeypadButton from './KeypadButton.vue';

const { guess } = storeToRefs(useGuessStore());
const { keypadError } = storeToRefs(useKeypadStore());
const guessError = ref(false);

// buttons flash red if keypadError
watch(keypadError, () => {
    const guessTemp = guess.value;
    if (keypadError.value) {
        guess.value = 'Error';
        guessError.value = true;
        setTimeout(() => {
            guess.value = guessTemp;
            guessError.value = false;
        }, 1200);
    }
})
</script>

<style scoped>
#keypad {
    background-color: rgb(56, 56, 56);
    display: grid;
    grid-template-columns: repeat(3, 8rem);
    grid-template-rows: repeat(4, 7rem);
    gap: 5px;
    padding: 20px;
    margin: 20px;
    place-content: center;
    border-radius: 10px;
}
</style>