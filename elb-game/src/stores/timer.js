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

    // watcher to update countdown timer
    watch(usertimerend, (newValue) => {
        timer.value = (newValue - Date.now());
        const countdown = setInterval(() => {
            timer.value = (newValue - Date.now());
            if (timer.value <= 0) {
                clearInterval(countdown);
            }
        }, 1000)
        
    })

    return { timer };
});