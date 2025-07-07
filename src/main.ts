import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { VueQueryPlugin } from '@tanstack/vue-query'

import 'element-plus/dist/index.css'
import './style.css'

const app = createApp(App)
app.use(createPinia())
app.use(ElementPlus, { locale: zhCn })
app.use(router)
app.use(VueQueryPlugin)

app.mount('#app')
