<template>
    <button class="keypad-button" :class="{ 'is-error': keypadError }" name="button" :value="props.value" @click="updateGuess(props.value)">
        <span v-if="props.value === 'backspace'">
            <BackspaceButton />
        </span>
        <span v-else-if="props.value === 'enter'">
            <EnterButton />
        </span>
        <span v-else>{{ props.text }}</span>
    </button>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useGuessStore } from '../stores/guesses.js';
import { useKeypadStore } from '../stores/keypad.js';

import EnterButton from './SVGs/EnterButton.vue';
import BackspaceButton from './SVGs/BackspaceButton.vue';

const props = defineProps(['value', 'text']);
const { keypadError } = storeToRefs(useKeypadStore());
const { updateGuess } = useGuessStore();
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

.is-locked {
    color: #a9a9a9
}

.is-error {
    color: red;
}

svg text {
    text-anchor: middle;
    font-family: 'Oswald';
    color: white;
}
</style>