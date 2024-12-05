import { ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { useTimerStore } from './timer.js';

export const useKeypadStore = defineStore('keypad', () => {
    // local variables
    const keypadLocked = ref(true);
    const keypadError = ref(false);
    const unlockError = ref(false);

    // store refs
    const { timer } = storeToRefs(useTimerStore());

    // unlock keypad if timer countdown done
    function unlockKeypad() {
        if (timer.value < 0) {
            keypadLocked.value = !keypadLocked.value;
        } else {
            unlockError.value = true;
            setTimeout(() => {
                unlockError.value = false;
            }, 300)
        }
    }

    return { keypadLocked, keypadError, unlockError, unlockKeypad };
})