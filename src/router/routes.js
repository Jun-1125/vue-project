
//路由组件
import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'


export default [
    {
      path:'/msite',
      component:Msite,
      meta:{
        isShowFooter:true
      }
    },
    {
      path:'/search',
      component:Search,
      meta:{
        isShowFooter:true
      }
    },
    {
      path:'/order',
      component:Order,
      meta:{
        isShowFooter:true
      }
    },
    {
      path:'/profile',
      component:Profile,
      // meta的值只能是对象，路由元信息
      meta:{
        isShowFooter:true
      }
    },
    {
      path:'/login',
      component:Login
    },
  
    {
      path:'/',//项目根路径
      redirect:'msite'//重定向
    }
]
//router是对象，里面有路由，路由是数组（包含多个路由）
/* export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
}) */