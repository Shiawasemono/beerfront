<template>
  <v-card class="text-container" max-width="270" :color="(active_button) ? '#efc84a' : '#D1D1D1'" style="color: black;">
    <div class="content-container">
      <v-container class="p-0">
        <v-row>
          <v-col cols="8">
            <v-card-item :title="name">
              <template v-slot:subtitle>
                <v-icon
                  :icon="(battery_level == 100) ? 'mdi-battery' : `mdi-battery-${battery_level}`"
                  size="18"
                  class="me-1 pb-1"
                  :color="(battery_level == 10) ? 'red' : 'black'"
                  :class="(battery_level == 10) ? 'blink' : ''"
                ></v-icon>
                {{ info.battery.toFixed(2) }} V
              </template>
            </v-card-item>
          </v-col>
          <v-col>
            <v-card-item class="pl-0">
              <v-switch
                v-model="active_button"
                hide-details
                color="success"
                @click="setActive"
                class="ml-3"
                elevation-0
                style="z-index: 1 !important;"
              ></v-switch>
            </v-card-item>
          </v-col>
        </v-row>
      </v-container>
      <div class="bubbles-container">
        <div :class="(active_button) ? 'bubbles' : 'bubbles_quiet'"></div>
      </div>
      <v-card-text class="pd-3 pt-0">
        <v-row align="center" no-gutters>
          <v-col
            class="text-h5"
            cols="6"
          >
            <v-icon
            :icon="'mdi-temperature-celsius'"
            size="22"
            class="me-1 pb-1"
            color="black"
            ></v-icon>
            {{ info.temperature.toFixed(1) }}&deg;
          </v-col>

          <v-col
            class="text-h5"
            cols="6"
          >
            <v-icon
            :icon="'mdi-chart-bubble'"
            size="22"
            class="me-1 pb-1"
            color="black"
            ></v-icon>
            {{ platoToSG(info.gravity).toFixed(4) }}
          </v-col>
        </v-row>
      </v-card-text>
    </div>
  </v-card>

</template>

<script>
  import axios from 'axios'
  import { pinia } from "@/main.js"
  import { useDeviceStore } from "@/store/activeDevices.js"
  export default {
    props: ['name', 'info'],
    active_devices: null,
    active_button: false,
    data: function () {
      return {
        'battery_level': 0,
        'active_button': false
      }
    },
    created: function() {
      this.battery_level = parseInt(this.checkBatteryLevel(this.info.battery))
      this.active_devices = useDeviceStore(pinia)
      this.active_button = this.checkIn(this.name, this.active_devices.allDevices)
    },
    methods: {
      platoToSG (value) {
        return 259 / (259 - value)
      },
      checkBatteryLevel (battery) {
        if (battery >= 4.2) return 100
        else if (battery <= 3.2) return 10
        else return `${Math.round((battery - 3.2) * 10)}0`
      },
      async setActive () {
        this.active_button = !this.active_button
        const test = await axios.post("http://hestia:8081/activateiSpindel", {"name": this.name, "time": Date.now(), "in_use": this.active_button})
        this.active_devices.devices = test.data
      },
      checkIn (name, list) {
        for (let elem in list) {
          if (list[elem].name == name) return true
        }
        return false
      },
    }
  }
</script>