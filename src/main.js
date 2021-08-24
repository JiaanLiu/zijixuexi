// import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'


// import toast from './components/content/toast'
// createApp(App).use(router).use(store).use(toast).mount('#app')
createApp(App).use(router).use(store).mount('#app')


// Vue.prototype.$bus = new Vue()

// import { request } from '@/network/request'
// request({
//     url: '/home/multidata'
// }).then(res => {
//     console.log(res);
//     console.log('网络请求成功');
// }).catch(err => {
//     console.log(err);
// })