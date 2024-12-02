import { defineStore, storeToRefs } from 'pinia';
import { ref, reactive } from 'vue';
import { useKeypadStore } from './keypad';

export const useGuessStore = defineStore('guesses', () => {
    const guess = ref('99999999');
    const result = ref('no,no,no,no,no,no,no,no');
    const guessHistory = reactive([{
        id: '1',
        timestamp: null,
        guess: '99999999',
        result: 'no,no,no,no,no,no,no,no'
    }]);
    const guessLocked = ref(false);
    const { keypadLocked } = storeToRefs(useKeypadStore());

    function updateGuess(event) {
        if (guess.value.length === 8 && event === 'enter') {
            console.log('enter pressed');
            keypadLocked.value = true
        } else if (event === 'backspace') {
            guess.value = guess.value.slice(0, -1);
        } else if (guess.value.length < 8 && event !== 'enter') {
            guess.value += event;
        } else {
            guessLocked.value = true;
            setTimeout(() => {
                guessLocked.value = false;
            }, 300)
        }
    }

    return { guess, result, guessHistory, guessLocked, updateGuess };
});