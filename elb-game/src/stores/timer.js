import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useTimerStore = defineStore('timer', () => {
    const timerLength = ref('20:00:00');

    return { timerLength };
});