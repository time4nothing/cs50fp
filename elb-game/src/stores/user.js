import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = reactive({
    id: '1',
    name: 'Jerry',
    guessCount: 0,
    timerEnd: null
  });

  return { user };
});
