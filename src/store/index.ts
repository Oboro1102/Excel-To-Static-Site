import { defineStore } from 'pinia';

interface State {
  windowWidth: number,
}

export const useStore = defineStore('main', {
  state: (): State => ({
    windowWidth: 1920
  }),
  actions: {
    setWindowWidth(width: number) {
      this.windowWidth = width
    }
  },
})