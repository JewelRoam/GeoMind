import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './registerServiceWorker';

// 创建 Vue 应用
const app = createApp(App);

// 注册 Vue 插件
app.use(router);
app.use(createPinia());
app.use(ElementPlus);

// 挂载到 #app
app.mount('#app');
