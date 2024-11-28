<template>
    <div id="top">
        <input id="name" name="name" value="<%= name %>" size="20" autocomplete="off">
        <button type="submit" :disabled="!keypadLockStatus" @click="lockToggle">{{ keypadLockStatus ? 'Locked' : 'Unlocked' }}</button>
    </div>

    <div id="unlocktimer">
        <span id="delaytext">Lock Delay</span>
        <div id="timer"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const keypadLockStatus = ref(true);

function lockToggle() {
    keypadLockStatus.value = !keypadLockStatus.value;
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
}
</style>