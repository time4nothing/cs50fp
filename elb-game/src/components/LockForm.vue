<template>
    <div id="top">
        <input id="name" name="name" v-model="user.name" size="20" autocomplete="off"
               placeholder="Enter a name" />
        <button id="unlock-button" type="submit" :disabled="!keypadLocked || guessError"
                @click="unlock">
            {{ keypadLocked ? 'Unlock' : 'Unlocked' }}
        </button>
    </div>

    <div id="unlocktimer">
        <span id="delaytext">Lock Delay</span>
        <div id="timer">{{ timer < 0 ? '00:00:00' : formattedTimer }}</div>
        </div>
</template>

<script setup>
// system imports
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

// store imports
import { useUserStore } from '../stores/user.js';
import { useGuessStore } from '../stores/guesses.js';
import { useKeypadStore } from '../stores/keypad.js';
import { useTimerStore } from '../stores/timer.js';

// store refs
const { user } = storeToRefs(useUserStore());
const { guessError } = storeToRefs(useGuessStore());
const { keypadLocked } = storeToRefs(useKeypadStore());
const { timer } = storeToRefs(useTimerStore());

// store functions
const { updateUser } = useUserStore();
const { clearGuess } = useGuessStore();
const { unlockKeypad } = useKeypadStore();

// local setup
function unlock() {
    updateUser(user.value);
    clearGuess();
    unlockKeypad();
}

const formattedTimer = computed(() => {
    const timeLeft = timer.value;
    let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    let seconds = Math.floor((timeLeft / 1000) % 60);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    const display = `${hours}:${minutes}:${seconds}`;

    return display;
})
</script>

<style scoped>
#top {
    margin-top: 10px;
    padding: 10px;
    display: flex;
    justify-content: center;
}

#unlock-button {
    width: 75px;
}

#unlocktimer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
}

#delaytext {
    font-size: 1.2rem;
    padding: 4px 10px;
    background-color: rgb(56, 56, 56);
    color: white;
}

#timer {
    background-color: black;
    height: 30px;
    width: 110px;
    font-size: 1.2rem;
    color: red;
    font-family: 'DSEG7 Modern';
    align-content: center;
    text-align: center;
}
</style>