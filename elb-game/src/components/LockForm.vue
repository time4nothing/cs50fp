<template>
    <div id="top">
        <input id="name" name="name" v-model="user.name" size="20" autocomplete="off"
               placeholder="Enter a name">
        <button type="submit" :disabled="!keypadLocked" @click="unlock">{{ keypadLocked ?
            'Unlock' : 'Unlocked' }}</button>
    </div>

    <div id="unlocktimer">
        <span id="delaytext">Lock Delay</span>
        <div id="timer">{{ timer < 0 ? '' : formattedTimer(timer) }}</div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/user.js';
import { useTimerStore } from '../stores/timer.js';
import { useKeypadStore } from '../stores/keypad.js';

const { user } = storeToRefs(useUserStore());
const { isUser } = useUserStore();
const { timer, formattedTimer } = storeToRefs(useTimerStore());
const { keypadLocked } = storeToRefs(useKeypadStore());
const { unlockKeypad } = useKeypadStore();

function unlock() {
    isUser(user.value);
    unlockKeypad();
}
</script>

<style scoped>
#top {
    margin-top: 10px;
    padding: 10px;
    display: flex;
    justify-content: center;
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