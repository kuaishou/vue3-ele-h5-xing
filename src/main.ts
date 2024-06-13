// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

//post-css  px--to--rem  计算
const rootValur = 16
const rootWidth = 390
const deviceWidth = document.documentElement.clientWidth
document.documentElement.style.fontSize = (deviceWidth * rootValur) / rootWidth + 'px'

app.mount('#app')
