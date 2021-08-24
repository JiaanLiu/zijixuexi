import { createApp, defineComponent } from 'vue'
import Toast from "./toast"

const obj = {}

obj.install = function(Vue) {
        // console.log('自创插件', Vue);
        //1.创建组件构造器
        const toastContrustor = Vue.extend(Toast)

        //2.new的方式，根据组件构造器，可以创建出来一个对象
        // const toast = defineComponent(Toast)
        const toast = new toastContrustor()

        //3.将组件对象，手动挂在到  某一个元素上
        // createApp(toast).mount(document.createElement('div'))
        toast.$mount(document.createElement('div'))

        //4.toast.$el对应的就是div  添加到body上
        document.body.appendChild(toast.$el)


        //5.定义$toast
        Vue.prototype.$toast = toast
    }
    //以上步骤是将Toast组件通过插件的方式挂载到DOM和Vue的原型上 并且可以经过$toast调用属性
export default obj