<template>
    <div id="history">
        <div @click="historyToggle">
            Previous Guesses
            <div id="history-open" v-if="historyShow">
                <div v-if="guessHistory.length === 0">No previous guesses</div>
                <div v-else>
                    <div class="history-array" v-for="each in guessHistory" :key="each.guess">
                        <div class="history-guess">{{ each.guess }}</div>
                        <ResultLights :resultArray="each.result.split(';')" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useGuessStore } from '../stores/guesses.js';

import ResultLights from './resultLights.vue';

const { guessHistory } = storeToRefs(useGuessStore());
const historyShow = ref(false);

function historyToggle() {
    historyShow.value = !historyShow.value;
}
</script>

<style scoped>
#history {
    background-color: black;
    color: white;
    font-size: 2rem;
    writing-mode: vertical-rl;
    text-align: center;
    padding: 0 5px 0 0;
}

#history-open {
    writing-mode: horizontal-tb;
    display: flex;
    padding: 10px;
    justify-content: center;
}

.history-array {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.history-guess {
    letter-spacing: 22px;
}
</style>