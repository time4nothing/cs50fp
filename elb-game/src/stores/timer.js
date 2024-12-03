import { defineStore, storeToRefs } from 'pinia'
import { ref, computed, watch } from 'vue';
import { useUserStore } from './user';

export const useTimerStore = defineStore('timer', () => {
    const { user } = storeToRefs(useUserStore());
    const timer = ref(user.value.timerend - Date.now());

    const formattedTimer = computed((timer) => {
        const timeLeft = timer;
        let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        let seconds = Math.floor((timeLeft / 1000) % 60);

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        const display = `${hours}:${minutes}:${seconds}`;

        return display;
    })

    watch(timer, () => {
        if (timer.value > 0) {
            setInterval(() => {
                timer.value = user.value.timerend - Date.now();
                console.log(timer.value)
            }, 1000)
        }
    })

    return { timer, formattedTimer };
});