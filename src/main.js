import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import axios from 'axios'
import mitt from 'mitt'

const app=createApp(App)

app.use(router)

app.use(ElementPlus)

for (let i in Icons) {
    app.component(i, Icons[i])
}

app.config.globalProperties.$axios = axios
axios.defaults.baseURL = '/api'

app.config.globalProperties.emitter = new mitt()

app.mount('#app')
