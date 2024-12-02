import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useKeypadStore = defineStore('keypad', () => {
    const keypadLocked = ref(true);
    const keypadError = ref(false);

    function unlockKeypad() {
        keypadLocked.value = !keypadLocked.value;
    }

    return { keypadLocked, keypadError, unlockKeypad };
})