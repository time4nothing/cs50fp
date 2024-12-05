<template>
    <button class="keypad-button"
            :class="{ 'is-error': keypadError || unlockError, 'is-locked': keypadLocked }"
            name="button" :value="props.value" @click="updateGuess(props.value)"
            :disabled="keypadLocked">
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
// system imports
import { storeToRefs } from 'pinia';

// store imports
import { useGuessStore } from '../stores/guesses.js';
import { useKeypadStore } from '../stores/keypad.js';

// component imports
import EnterButton from './SVGs/EnterButton.vue';
import BackspaceButton from './SVGs/BackspaceButton.vue';

// store refs
const { keypadLocked, keypadError, unlockError } = storeToRefs(useKeypadStore());

// store functions
const { updateGuess } = useGuessStore();

// local setup
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