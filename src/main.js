/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import { createPinia } from 'pinia'

// Plugins
import { registerPlugins } from '@/plugins'

import VueApexCharts from "vue3-apexcharts";

export const pinia = createPinia()
const app = createApp(App)

app.use(VueApexCharts);
registerPlugins(app)

app.mount('#app')
