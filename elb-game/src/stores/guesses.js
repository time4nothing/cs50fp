import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

export const useGuessStore = defineStore('guesses', () => {
    const guess = ref('99999999');
    const guesses = reactive([{
        id: '1',
        timestamp: null,
        guess: '99999999',
        result: 'no,no,no,no,no,no,no,no'
    }]);

    return { guess, guesses };
});