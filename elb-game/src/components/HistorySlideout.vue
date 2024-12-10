<template>
    <div id="history">
        <div @click="historyToggle">
            <span v-if="!historyShow">
                <RightArrow /> Previous Guesses
                <RightArrow />
            </span>
            <span v-else>
                <LeftArrow /> Previous Guesses
                <LeftArrow />
            </span>
            <Transition name="slide">
                <div id="history-slide" v-if="historyShow">
                    <div v-if="guessHistory.length === 0">No previous guesses</div>
                    <div v-else>
                        <div class="history-array" v-for="each in guessHistory" :key="each.guess">
                            <div class="history-guess">{{ each.guess }}</div>
                            <ResultLights :resultArray="each.result.split(';')" />
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script setup>
// system imports
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

//store imports
import { useHistoryStore } from '../stores/history.js';

//component imports
import ResultLights from './ResultLights.vue';
import RightArrow from './SVGs/RightArrow.vue';
import LeftArrow from './SVGs/LeftArrow.vue';

// store refs
const { guessHistory } = storeToRefs(useHistoryStore());

// local setup
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

#history-slide {
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

.slide-enter-active,
.slide-leave-active {
    width: 350px;
    transition: all 1s ease;
}

.slide-enter-from,
.slide-leave-to {
    width: 0px;
    opacity: 0;
}
</style>