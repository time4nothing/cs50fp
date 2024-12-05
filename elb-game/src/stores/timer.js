// system imports
import { ref, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia'

// store imports
import { useUserStore } from './user';

// define store
export const useTimerStore = defineStore('timer', () => {
    // local variables
    const timer = ref(usertimerend);

    // store refs
    const { usertimerend } = storeToRefs(useUserStore());

    // watcher to update countdown timer
    watch(usertimerend, () => {
        const countdown = setInterval(() => {
            timer.value = usertimerend.value - Date.now();
            console.log(timer.value)
            if (timer.value < 0) {
                clearInterval(countdown);
            }
        }, 1000)
    })

    return { timer };
});