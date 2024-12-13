// system imports
import { ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';

// store imports
import { useTimerStore } from './timer.js';

// define store
export const useKeypadStore = defineStore('keypad', () => {
    // local variables
    const keypadLocked = ref(true);
    const keypadError = ref(false);
    const unlockError = ref(false);
    const lockDelayEnabled = ref(true);

    // store refs
    const { timer } = storeToRefs(useTimerStore());

    // check if lockDelay is enabled
    async function checkDelayStatus() {
        try {
            const response = await fetch('http://localhost:5050/checklockstatus');
            const result = await response.json();
            lockDelayEnabled.value = result.status;
        }
        catch (error) {
            console.log(error);
        }
    }

    // unlock keypad if timer countdown done
    function unlockKeypad() {
        if (timer.value <= 0 || lockDelayEnabled.value === false) {
            keypadLocked.value = !keypadLocked.value;
        } else {
            unlockError.value = true;
            setTimeout(() => {
                unlockError.value = false;
            }, 300)
        }
    }

    return { keypadLocked, keypadError, unlockError, lockDelayEnabled, checkDelayStatus, unlockKeypad };
})