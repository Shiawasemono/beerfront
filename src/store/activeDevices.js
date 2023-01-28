// Utilities
import { defineStore } from 'pinia'

export const useDeviceStore = defineStore('devices', {
  state: () => ({ devices: [] }),
  getters: {
    allDevices: (state) => state.devices,
  },
})