// system imports
import { ref, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia'

// store imports
import { useUserStore } from './user';

// define store
export const useTimerStore = defineStore('timer', () => {
    // store refs
    const { usertimerend } = storeToRefs(useUserStore());

    // local variables
    const timer = ref(0);
    let countdown = null;

    // function to start countdown
    function startCountdown(newValue) {
        stopCountdown();
        countdown = setInterval(() => {
            timer.value = (newValue - Date.now());
            if (timer.value <= 0) {
                stopCountdown();
            }
        }, 1000)
    }

    // function to stop countdown
    function stopCountdown() {
        clearInterval(countdown);
    }

    // watcher to update countdown timer
    watch(usertimerend, (newValue) => {
        timer.value = (newValue - Date.now());
        startCountdown(newValue);
        if (newValue === 0) {
            stopCountdown();
        }
    })

    return { timer };
});