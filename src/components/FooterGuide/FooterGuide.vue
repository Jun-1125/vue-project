<template>
  <footer class="footer_guide border-1px">
    <span class="guide_item" :class="{on: $route.path==='/msite'}" @click="goTo('/msite')"><!-- 什么时候用对象语法: 类名确定, 但不确定有没有 -->
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </span>
    <span class="guide_item" :class="{on: $route.path==='/search'}" @click="goTo('/search')">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </span>
    <span class="guide_item" :class="{on: $route.path==='/order'}" @click="goTo('/order')">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </span>
    <span class="guide_item" :class="{on: $route.path==='/profile'}" @click="goTo('/profile')">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </span>
  </footer>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'FooterGuide',
    //方法
    methods:{
      // 事件回调函数
      goTo(path){//前台路由导航的时候是没有进行发请求的
        // 编程式路由导航（路由的跳转）
        this.$router.replace(path)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'

  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>

<!--  强制绑定数据(动态添加数据)
  : 强制绑定数据，动态添加数据   
  ：class“{}”   :class "{on:false}" 对象语法，类名确定，但不确定有没有
  ：class "{}"  :class "on"  字符串的方式  类名不确定，但是确定是有的
   
   路由跳转（两种方式）
    声明式路由导航  routerlink
    编程式的路由导航(js编码) $router对象   需要手动的添加点击事件监听@click='goTo'
  :class="{on: $route.path==='/msite'}  ，相当于默认添加了this.$router  this相当于路由器
    动态获取路由的组件来确定需要读取的哪个组件

    methods为什么不是数组而是对象，因为每个函数都有名字，函数是靠名字标识的

    路由跳转
    push  有回退的功能
    replace 无回退的功能
    
-->