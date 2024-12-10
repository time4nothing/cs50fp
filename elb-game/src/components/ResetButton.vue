<template>
    <button id="reset-button" @click="newGame">New Game</button>
</template>

<script setup>
// system imports
import { storeToRefs } from 'pinia';

// store imports
import { useUserStore } from '../stores/user.js';
import { useGuessStore } from '../stores/guesses.js';
import { useKeypadStore } from '../stores/keypad.js';
import { useHistoryStore } from '../stores/history.js';

// store refs
const { user, usertimerend } = storeToRefs(useUserStore());
const { guess, resultArray } = storeToRefs(useGuessStore());
const { keypadLocked } = storeToRefs(useKeypadStore());

// store functions
const { clearUserFromDB } = useUserStore();
const { clearHistory } = useHistoryStore();

// local setup
function newGame() {
    clearUserFromDB(user.value.id);
    user.value = {};
    usertimerend.value = '';
    guess.value = '';
    resultArray.value = ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no'];
    clearHistory();
    keypadLocked.value = true;
}
</script>

<style scoped>
#reset-button {
    width: 150px;
    height: 40px;
    border-radius: 10px;
    font-size: 1.4rem;
}
</style>