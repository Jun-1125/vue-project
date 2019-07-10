

import Vue from 'vue'
import App from './App'
// 引入路由
import router from './router'
import store from './vuex/store'
import Header from './components/Header/Header.vue'
import CartControl from './components/CartControl/CartControl.vue'
import Star from './components/Star/Star.vue'
import './mock/mockServer'

import { Button } from 'mint-ui'
// 表单的验证
import './validate'
//定义全局组件(所有组件都可以看到) 组件引入不能使用先注册，就是指定标签名
Vue.component('Header',Header)
Vue.component('Star',Star)
Vue.component('CartControl',CartControl)
Vue.component( Button.name, Button )//minit按钮

/* eslint-disable no-new */
new Vue({
  el: '#app',
  /* components: { App },
  template: '<App/>' */
  /* 
  非回调函数的特点：我们自己调用，自己指定函数的形参变量对应的实参数据
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
