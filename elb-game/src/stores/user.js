import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useGuessStore } from './guesses';

export const useUserStore = defineStore('user', () => {
  const user = ref({
    id: '',
    name: 'Jerry',
    guesscount: 0,
    timerend: -1
  });
  const guessHistory = storeToRefs(useGuessStore());

  async function isUser(userInfo) {
    try {
      const response = await fetch('http://localhost:5050/checkuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      });
      user.value = await response.json();
    } catch (error) {
      console.log(error);
    }

    // update guessHistory
    try {
      const response = await fetch('http://localhost:5050/gethistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.value.id })
      })
      const result = await response.json();
      guessHistory.value = JSON.parse(result);
    }
    catch (error) {
      console.log(error);
    }
  }

  return { user, isUser };
});
