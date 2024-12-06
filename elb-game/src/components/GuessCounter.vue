<template>
    <div id="guess-count">
        <div id="guess-count-text">Attempts</div>
        <div id="guess-count-display">{{ !guesscount ? '00' : guesscount }}</div>
    </div>
</template>

<script setup>
// system imports
import { storeToRefs } from 'pinia';

// store imports
import { useUserStore } from '../stores/user.js';

// store refs
const { guesscount } = storeToRefs(useUserStore());
</script>