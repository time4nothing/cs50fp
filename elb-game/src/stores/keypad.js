import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useKeypadStore = defineStore('keypad', () => {
    const keypadLockStatus = ref(true);

    function toggleLock() {
        keypadLockStatus.value = !keypadLockStatus.value;
    }

    return { keypadLockStatus, toggleLock };
})