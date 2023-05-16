import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import { createHead } from "@vueuse/head"

const pinia = createPinia()
const head = createHead()

createApp(App).use(pinia).use(head).mount('#app')
