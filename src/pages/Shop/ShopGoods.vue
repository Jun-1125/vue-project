<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="leftWrapper">
        <ul ref="leftUl">
          <li class="menu-item" v-for="(good,index) in goods" :key="good.name" 
          :class="{current:currentIndex===index}" @click="clickItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" v-if="good.icon" :src="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper" ref="rightWrapper">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="good in goods" :key="good.name">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="food in good.foods" 
                :key="food.name" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
          
        </ul>
      </div>

      <!-- <ShopCart/> -->
      <shop-cart/>
    </div>

    <Food ref="food" :food="food"/>
    <!-- <Food v-show="isShow"/>  可以直接显示子组件Food -->
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
import Food from '../../components/Food/Food.vue'//在components中注册组件
import ShopCart from '../../components/ShopCart/ShopCart.vue'
  export default {
    name:'ShopGoods',
    data(){
      return{
        scrollY:0,//右侧滑动的坐标:scollY,初始为0，滑动右侧时不断更新
        tops:[],//右侧所有分类li的top的数组:tops,初始值为[],列表数据显示之后统计tops,
        food:{},//需要显示的food(子组件中拿这个food进行使用,子组件中使用props中声明可使用)
      }
    },
    // mounted是在界面显示后执行
    mounted (){
      // 如果当前数据已经有了=====>列表数据已经显示了
      // (和watch中的不影响)针对的是别的路由跳转过来
      if(this.goods.length>0){
        this.initScroll()
        this.initTops()
      }
    },
    computed:{
      ...mapState({
        goods: state => state.shop.goods
      }),
     
      // 因为在shop内发送的请求，在外面不在当前组件   路由组件第一次访问的时候就有了    不是更新后才有数据
      // 当前分类的下标  currentIndex初始时调用一次，index是没值的
      currentIndex () {
        const {scrollY, tops} = this
        // 计算出最新的下标  index最新的下标，判断和当前的下标进行比较
        const index = tops.findIndex((top, index) => scrollY>=top && scrollY<tops[index+1])
        // 如果index有变化  this.leftScroll中leftScroll开始是没值的
        if (index!==this.index && this.leftScroll) {
          // 保存index(当前的下标)  如果放在if前，会理解为重新赋值
          this.index = index
          // 在当前分类发生变化时, 让右侧列表滑动当前分类处
          const li = this.$refs.leftUl.children[index]//先找到li   从父找子节点
          this.leftScroll.scrollToElement(li, 300)//scrollToElement滑动到当前元素 
        }

        return index//分类的下标
      }
    },
    /* mounted(){
      // new BScroll(this.$refs.leftWrapper,{})
      //new BScroll(this.$refs.rightWrapper,{}) 
    }, */
    //绑定监听
    watch:{
      goods(){
        this.$nextTick(()=>{
          //列表显示之后
          this.initScroll()
          this.initTops()
        })
      }
    },

    methods:{
      //初始化滚动
      initScroll(){//Scroll禁止了点击事件，所有的点击事件都是由他进行分发
        this.leftScroll = new BScroll(this.$refs.leftWrapper,{
          //标识分发点击事件
          click:true
        })
        this.rightScroll = new BScroll(this.$refs.rightWrapper,{
          /* 
          probeType:3
          */
          //标识分发点击事件
          click:true,
          probeType:1
        })

        //绑定滚动的监听
        /* const.rightScroll.on('scroll',(event) => {
          //scroll的回调
          console.log('scroll',event.x,event.y)
          this.scrollY = Math.abs(event.y)   只有y轴方向进行滑动，x轴没有移动
        }) */
        //绑定滚动的监听 scroll   使用this保存当前的rightScroll,因为下面需要调用，所以需要保存下，下面就可以使用
        this.rightScroll.on('scroll',({x,y}) => {
          console.log('scroll',x,y)
          this.scrollY = Math.abs(y)
        })
        //绑定滚动结束的监听 scrollend
        this.rightScroll.on('scrollEnd',({x,y}) => {
            console.log('scrollEnd',x,y)
            this.scrollY = Math.abs(y)
        })
      },
      // 初始化y轴的top
      initTops(){
        const tops = []
        let top = 0
        tops.push(top)
        //遍历所有右侧分类li
        const lis = this.$refs.rightUl.children
        //伪数组  lis  转为真数组
        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })

        //更新tops数据
        this.tops = tops
        console.log('tops',tops)
      },
      //根据下标点击事件
      clickItem(index){
        const top = this.tops[index]
        //让当前分类项立即变化（左侧分类变了，说明current变了，说明scrollY变了）
        this.scrollY = top//(top目标值)
        //让右侧列表滑动到对应的位置
        // 想要使用上面的rightScroll，将保存的this拿到这里使用
        // 需要正值，但是沿着y轴向下滑动，得到的是负值，负负得正
        this.rightScroll.scrollTo(0,-top,300)
      },

      //显示指定的food
      //父组件，Food是子组件
      /*
      父子组件关系(父组件内有子组件的标签) 
      子组件调用父组件的方法/函数：函数类型的props
      父组件调用子组件的方法：(通过ref标识子组件标签)
                          将方法作为标签属性的方法传递给父组件（从而在父组件内调用子组件对象，可以调用其内部的方法）

        现在父组件想要调用子组件的方法(toggleShow)
        调用的其实是子组件对象的方法（toggleShow） 
        组件和组件对象是两个不同的概念

        <Food ref="food"/>子标签
        ref标识子组件标签，从而得到子组件对象，父组件可以调用其内部的方法
       */
      showFood(food){
        //data中的food什么时候有值
        this.food = food
        //ref标识子标签Food，此时的food为ref标识子标签定义的
        this.$refs.food.toggleShow()
      }
    },

    components:{
      Food,
      ShopCart
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

