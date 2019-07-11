<template>
<div class="cartcontrol">
  <transition name="move">
    <!-- <div class="iconfont icon-remove_circle_outline" v-show="food.count>0" @click="updateFoodCount(false)"></div> -->
                                                                          <!-- 阻止事件冒泡 -->
    <div class="iconfont icon-remove_circle_outline" v-show="food.count>0" @click.stop="updateFoodCount(false)"></div>
  </transition>
  <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
  <div class="iconfont icon-add_circle" @click.stop="updateFoodCount(true)"></div>
</div>
</template>

<script type="text/ecmascript-6">
  export default {
      name:'GartControl',
      props:{
          food: Object
      },
      methods:{
          updateFoodCount (isAdd) {
            //   this.food.count   不是此组件的，数据在哪个组件，更新数据就在哪个组件
            //food  vuex中的state中 food==>foods==>goods==> state(vuex)   
            //所以需要commit/dispatch   dispatch只能两个参数，第一个是action   第二个是数据
            //this.$store.dispatch('updateFoodCount',isAdd,this.food) 所以需要对象包裹
            this.$store.dispatch('updateFoodCount',{isAdd,food:this.food})
          }
      }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-remove_circle_outline
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all 0.5s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-add_circle
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>
