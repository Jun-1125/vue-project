

import Vue from 'vue'
import App from './App'
// 引入路由
import router from './router'
import store from './vuex/store'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
//定义全局组件(所有组件都可以看到) 组件引入不能使用先注册，就是指定标签名
Vue.component('Header',Header)
Vue.component('Star',Star)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  /* components: { App },
  template: '<App/>' */
  /* 非回调函数的特点：我们自己调用，自己指定函数的形参变量对应的实参数据
  回调函数，特点：不是我们调用，形参变量不由我们定义，所以需要我们根据形参变量来定义实参数据
  形参变量是个函数，接收一个组件

  箭头函数的箭头有两个作用：
  1.定义一个匿名函数（必然有的）
  2.(有可能有的return的作用)
    箭头右边紧跟大括号就没有renturn的作用，
    箭头右边没有紧跟大括号就有renturn的作用
  */
// render函数接收一个函数参数，返回的是函数参数返回的结果
  // render:createElement => createElement(App)  //createElement创建元素，模板的标签名App
  render:h => h(App),
  router,//配置路由
  store//配置vuex
})
/* 
  组件间通信的方式
   props：函数数据(子向父)    非函数数据(父向子)
   slot：插槽   父向子传递数据  
   {{}}： 插值   通过写标签的时候通过属性传过去

   注册组件
    局部注册  component:{}
    全局注册  在入口文件中
*/
/* 
v-for="shop in shops" 
 v-for=''指令
 属性是表达式shop in shops
*/