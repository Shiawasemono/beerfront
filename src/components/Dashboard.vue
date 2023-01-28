<template>
    <v-card>
      <v-layout>
        <v-app-bar
          density="compact"
        >
          <v-app-bar-title>Graphics</v-app-bar-title>
  
          <template v-slot:append>
            <v-btn icon="mdi-dots-vertical"></v-btn>
          </template>
        </v-app-bar>
  
        <v-main>
          <v-container fluid>
            <v-row dense v-if="!loading">
              <v-col
                v-for="dev in active.allDevices"
                :key="dev.name"
              >
                <v-card max-width="600">
                    <v-card-item :title="dev.name">
                        <Graphic :name="dev.name" :info="dev.time"/>
                    </v-card-item>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-layout>
    </v-card>
  </template>
  
  <script>
    import Graphic from '@/components/Graphic.vue'
    import { pinia } from "@/main.js"
    import { useDeviceStore } from "@/store/activeDevices.js"
    export default {
      iSpindels: {},
      loading: true,
      active: null,
      components: {
        Graphic,
      },
      data: function () {
        return {
          iSpindels: {},
          loading: true,
          active: null,
        }
      },
      async created() {
        this.active = await this.getActive()
        this.loading = false
      },
      methods: {
        changeTab (name) {
          this.currentTab.name = name
        },
        getActive : async() => {
          const active = useDeviceStore(pinia)
          return active
        },
  
      }
    }
  </script>