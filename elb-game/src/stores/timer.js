import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', () => {
    const timerLength = '20:00:00';

    return { timerLength };
});