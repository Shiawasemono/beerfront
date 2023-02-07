<template>
  <v-card>
    <v-layout>
      <v-app-bar
        density="compact"
      >
        <v-app-bar-title>Devices</v-app-bar-title>

        <template v-slot:append>
          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <v-row dense v-if="!loading">
            <v-col
              v-for="v, k in iSpindels"
              :key="k"
              cols="3"
            >
              <iSpindel :name="k" :info="v" :active="k in active.devices"/>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
  import axios from 'axios'
  import iSpindel from '@/components/iSpindel.vue'
  import { pinia } from "@/main.js"
  import { useDeviceStore } from "@/store/activeDevices.js"
  export default {
    iSpindels: {},
    loading: true,
    active: null,
    components: {
      iSpindel,
    },
    data: function () {
      return {
        iSpindels: {},
        loading: true,
        active: null,
      }
    },
    async created() {
      this.iSpindels = await this.getiSpindels()
      this.active = await this.getActive()
      this.loading = false
    },
    methods: {
      changeTab (name) {
        this.currentTab.name = name
      },
      getiSpindels : async() => {
        const {data: iSpindels} = await axios.get("http://hestia:8081/iSpindels")
        return iSpindels
      },
      getActive : async() => {
        const active = useDeviceStore(pinia)
        return active
      },

    }
  }
</script>