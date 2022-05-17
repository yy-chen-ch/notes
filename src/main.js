import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import store from './store'
import API from './http'
//element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

//全局属性
app.config.globalProperties.$http = API
app.config.globalProperties.$store = store
app.config.globalProperties.$router = router

app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
