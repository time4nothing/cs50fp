<template>
    <div id="keypad">
        <KeypadButton value="1" text="1" />
        <KeypadButton value="2" text="2" />
        <KeypadButton value="3" text="3" />
        <KeypadButton value="4" text="4" />
        <KeypadButton value="5" text="5" />
        <KeypadButton value="6" text="6" />
        <KeypadButton value="7" text="7" />
        <KeypadButton value="8" text="8" />
        <KeypadButton value="9" text="9" />
        <KeypadButton value="backspace" />
        <KeypadButton value="0" text="0" />
        <KeypadButton value="enter" />
    </div>
</template>

<script setup>
// system imports
import { watch } from 'vue';
import { storeToRefs } from 'pinia';

// store imports
import { useGuessStore } from '../stores/guesses.js';
import { useKeypadStore } from '../stores/keypad.js';

// component imports
import KeypadButton from './KeypadButton.vue';

// store refs
const { guess, guessLocked, guessError } = storeToRefs(useGuessStore());
const { keypadLocked, keypadError, unlockError } = storeToRefs(useKeypadStore());

// local setup
// Error flash - unlocks keypad after error
watch(keypadError, () => {
    const guessTemp = guess.value;
    if (keypadError.value) {
        guess.value = 'Error';
        guessLocked.value = true;
        guessError.value = true;
        keypadLocked.value = true;
        setTimeout(() => {
            guess.value = guessTemp;
            guessLocked.value = false;
            guessError.value = false;
            keypadLocked.value = false;
        }, 300);
    }
})

// Error flash - does NOT unlock keypad after error
watch(unlockError, () => {
    const guessTemp = guess.value;
    if (unlockError.value) {
        guess.value = 'Error';
        guessLocked.value = true;
        guessError.value = true;
        setTimeout(() => {
            guess.value = guessTemp;
            guessLocked.value = false;
            guessError.value = false;
        }, 300);
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