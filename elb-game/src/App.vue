<template>
    <div id="page">
        <div id="panel">
            <LockForm />
            <ResultLights />
            <OutputBar />
            <KeypadArea />

            <div id="bottom">
                <button id="reset-button">New Game</button>
            </div>
        </div>
        <HistorySlideout />
    </div>
</template>

<script setup>
import LockForm from './components/LockForm.vue';
import ResultLights from './components/ResultLights.vue';
import OutputBar from './components/OutputBar.vue';
import KeypadArea from './components/KeypadArea.vue';
import HistorySlideout from './components/HistorySlideout.vue';
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
    padding: 10px;
    display: flex;
    justify-content: center;
}

#reset-button {
    width: 150px;
    height: 40px;
    border-radius: 10px;
    font-size: 1.4rem;
}

#output.gameover {
    font-family: 'Oswald';
    text-align: center;
    color: rgb(76, 187, 23);
    font-size: 3rem;
}
</style>