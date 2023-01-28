// Utilities
import { defineStore } from 'pinia'

export const useTabStore = defineStore('tab', {
  state: () => ({ tab: 0, name: 'home' }),
  getters: {
    currentTabIdx: (state) => state.tab,
    currentTabName: (state) => state.name,
  },
})