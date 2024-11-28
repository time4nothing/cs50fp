<template>
    <div id="history">
        <div @click="historyToggle">
            Previous Guesses
            <div id="history-open" v-if="historyShow">
                History array
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

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
    align-items: center;
    padding: 10px;
}
</style>