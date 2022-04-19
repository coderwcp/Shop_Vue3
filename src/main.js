import { createApp } from 'vue'
import App from './App'
// 注册路由
import router from '@/router'
// 注册Vuex
import store from '@/store'
// 注册 全局组件 及 自定义指令
import UI from '@/components/library'
// 引入基础样式
import '@/assets/style/base.css'

createApp(App).use(store).use(router).use(UI).mount('#app')
