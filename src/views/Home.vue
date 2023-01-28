<template>
  <v-layout class="fill-height">
    <SidePanel />

    <v-main>
      <div v-if="currentTab.currentTabName == 'home'" class="center">
        <Home />
      </div>
      <div v-else-if="currentTab.currentTabName == 'dashboard'">
        <Dashboard />
      </div>
      <div v-else-if="currentTab.currentTabName == 'devices'">
        <Devices />
      </div>
    </v-main>
  </v-layout>
</template>

<script>
  import SidePanel from "@/components/SidePanel.vue"
  import Home from "@/components/Home.vue"
  import Devices from "@/components/Devices.vue"
  import Dashboard from "@/components/Dashboard.vue"
  import { useTabStore } from "@/store/currentTab.js"
  import { useDeviceStore } from "@/store/activeDevices.js"
  import axios from 'axios'
  import { pinia } from "@/main.js"
  export default {
    components: {
      SidePanel,
      Home,
      Devices,
      Dashboard,
    },
    watch: {
      currentTab(newTab, oldTab) {
        this.getActiveDevices()
      }
    },
    setup() {
      // store
      const currentTab = useTabStore(pinia)
      const active = useDeviceStore(pinia)

      return {
        currentTab,
        active,
      }
    },
    created() {
      this.getActiveDevices()
    },
    methods: {
      getActiveDevices () {
        axios.get("http://hestia:8080/activeDevices")
           .then(data => {
              this.active.devices = data.data
            })
           .catch(error => console.log(error))
      },
    },
  }
</script>