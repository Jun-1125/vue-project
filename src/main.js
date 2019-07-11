

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
  
// render函数接收一个函数参数，返回的是函数参数返回的结果
  // render:createElement => createElement(App)  //createElement创建元素，模板的标签名App
  render:h => h(App),
  router,//配置路由
  store//配置vuex
})

// 界面改变代表数据的变化

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

/* 
父子组件关系(父组件内有子组件的标签) 
  子组件调用父组件的方法/函数：函数类型的props
  父组件调用子组件的方法：(通过ref标识子组件标签)
                  将方法作为标签属性的方法传递给父组件（从而在父组件内调用子组件对象，可以调用其内部的方法）
*/

/* 
【子路由：页面的局部进行切换  可以使用显示与隐藏达到效果】
   不推荐子路由的原因是，两个界面比较相似，功能相似，避免代码的冗余
    显示隐藏 
       指令： v-if(新增或减少标签)/v-else/v-show(使用display)
              v-for="shop in shops" (v-for遍历)
              v-for=''指令
              属性是表达式shop in shops
              @事件绑定     @click 点击事件
              v-model 双向数据绑定    实时收集数据

  有数据的情况下再给数据进行添加事件，数据在data的状态中
  :class="{on:loginType}" @click="loginType=true"
  有数据后确定数据的类型和名称(为了能够读取此数据)

  form 表单会自动提交数据，所以需要阻止默认行为  @click.prevent=""
*/

/* 
    解决创建swiper对象之后不能正常轮播
    原因: 创建对象的时机太早(必须在列表显示之后)
    解决: 
      1. watch + nextTick()
      2. callback + nextTick()
      3. 利用dispatch()返回的promise
*/


/* 
获取分类列表的异步action    
对象{}  {commit}  commit是个函数 data需要就传，不需要就不传
getCategorys({对象},data){}
*/

/* 
hasOwnProperty为响应式对象添加一个属性，确保新属性也是响应式的，
  并且能够触发视图更新，但是没有数据绑定
解决方案：
  Vue.set(target,key,value){Object | Array} target {string | number} key {any} value
  
  if(!food.hasOwnProperty('count')){
            Vue.set(food,'count',1)
        }else{
            food.count++
        }
*/

/* 
//记录user:持久化保存token,在state中保存user
    recordUser ({commit},user) {
      // 将user的token保存到locaStorage中
      localStorage.setItem('token_key',user.token)
      // 将token保存到state中   传token参数，是个对象，值是user.token[根据mutation-types中确定]
      commit(RECEIVE_TOKEN, { token: user.token })
      // 将user保存到vuex中的state中
      delete user.token
      commit(RECEIVE_USER,{user})
    },
  
    //退出登录
    logout ({commit}) {
      // 重置状态中的user
      commit(RESET_USER)
      // 重置状态中的token
      commit(RESET_TOKEN)
      // 清除local中保存的token
      localStorage.removeItem('token_key')
       // 清除cookie中的user_id
     // Cookies.remove('user_id') 
    }
*/

/* 
数据在哪个组件，更新数据就在哪个组件
    使用分发action  =====>this.$strore.dispatch  使用commit/dispatch
    dispatch只能两个参数，第一个是action   第二个是数据，如果有多个数据，则需要使用对象的形式
*/

/* 
  两个引用变量指向同一个对象,其中一个引用变量去修改对象内部的数据，另一个引用变量可以看到
    1.用其中一个引用变量去改变对象内部的数据，另一个引用变量看到是修改后的对象
       a={m:1}    b=a  
    2.让其中一个引用变量指向新的变量，另一个引用变量还是指向原来的，不是修改后的新的变量
*/

/* splice()  增删改均可
    splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,
      并以数组形式返回被修改的内容。此方法会改变原数组
                
    indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1
*/