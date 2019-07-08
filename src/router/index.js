//路由器对象模块
// 引入vue
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// 声明使用vue插件
Vue.use(VueRouter)
// 引入路由


export default new VueRouter({//配置对象
  //配置应用中所有路由(相当于路由器通电)
  routes
})
//router是对象，里面有路由，路由是数组（包含多个路由）
/* export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
}) */
