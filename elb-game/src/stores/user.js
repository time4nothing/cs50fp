import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = reactive({
    id: '1',
    name: 'Jerry',
    guesscount: 0,
    timerend: -1
  });

  async function isUser(user) {
    try {
      const response = await fetch('http://localhost:5050/checkuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return { user, isUser };
});
