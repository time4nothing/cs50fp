<template>
    <div id="page">
        <div id="panel">
            <LockForm />
            <ResultLights :resultArray="resultArray" />
            <OutputBar />
            <KeypadArea />

            <div id="bottom">
                <GuessCounter />
                <ResetButton />
            </div>
        </div>
        <HistorySlideout />
    </div>
</template>

<script setup>
// system imports
import { storeToRefs } from 'pinia';

// store imports
import { useGuessStore } from './stores/guesses.js';

// component imports
import LockForm from './components/LockForm.vue';
import ResultLights from './components/ResultLights.vue';
import OutputBar from './components/OutputBar.vue';
import KeypadArea from './components/KeypadArea.vue';
import HistorySlideout from './components/HistorySlideout.vue';
import GuessCounter from './components/GuessCounter.vue';
import ResetButton from './components/ResetButton.vue';

// store refs
const { resultArray } = storeToRefs(useGuessStore());
</script>

<style>
body {
    margin: 0;
    background-image: url('./assets/images/wall.png');
    background-size: 100% auto;
    background-color: rgb(43, 43, 43);
}

#page {
    display: flex;
    justify-content: center;
    margin-top: 40px;
}

#panel {
    background-color: rgb(78, 78, 78);
    max-width: 500px;
    border: 10px solid rgb(0, 0, 0);
}

#bottom {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
}
</style>