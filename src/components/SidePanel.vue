<template>
  <v-navigation-drawer
    expand-on-hover
    rail
    v-model="visible"
  >
    <v-list>
      <v-list-item
        prepend-avatar="@/assets/beer-icon.svg"
        title="To beer or not to beer"
        subtitle="that is the question"
      >
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-view-dashboard-variant" title="Dashboard" value="dashboard" @click="changeTab('dashboard')"></v-list-item>
      <v-list-item prepend-icon="mdi-video-input-antenna" title="Devices" value="devices" @click="changeTab('devices')"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { useTabStore } from "@/store/currentTab.js"
  import { pinia } from "@/main.js"
    export default {
      name: 'SidePanel',
      setup() {
        // store
        const currentTab = useTabStore(pinia)

        return {
          currentTab,
        }
      },
      data: function () {
        return {
          'selected': "dashboard",
          'visible': true
        }
      },
      methods: {
        changeTab (name) {
          this.currentTab.name = name
        }
      }
    }
</script>