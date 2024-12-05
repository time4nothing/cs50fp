import { ref, watch } from 'vue';
import { defineStore, storeToRefs } from 'pinia'
import { useUserStore } from './user';

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