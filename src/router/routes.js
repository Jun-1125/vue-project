
//路由组件
import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo.vue'
import ShopRatings from '../pages/Shop/ShopRatings.vue'


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
      path:'/shop',
      component:Shop,
      children:[
        {
          path:'/shop/goods',
          component:ShopGoods
        },
        {
          path:'/shop/ratings',
          component:ShopRatings
        },
        {
          path:'info',
          component:ShopInfo
        },
        {
          path:'',
          redirect:'/shop/goods'
        },
      ]
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