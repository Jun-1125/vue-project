<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginType}" @click="loginType=true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginType}" @click="loginType=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: loginType}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!isRightPhone || computeTime>0" class="get_verification" 
                :class="{right_phone_number: isRightPhone}" @click.prevent="sendCode">
                {{computeTime>0 ? `已发送验证码(${computeTime}s)` : '获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginType}">
            <section>
              <section class="login_message">
                <input type="text" placeholder="用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="isShowPwd ? 'text' : 'password'" maxlength="8" placeholder="密码" v-model="pwd">
                <div class="switch_button" :class="isShowPwd ? 'on' : 'off'" @click="isShowPwd = !isShowPwd">
                  <div class="switch_circle" :class="{right: isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd ? 'abc' : ''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:5000/captcha" alt="captcha"
                  @click="updateCapcha" ref='captcha'>
              </section>
            </section>
          </div>
          <button class="login_submit" @click.prevent="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
/* 
 界面改变代表数据的变化
 vue：根据数据变化改变数据

 登录界面的变化：短信与密码登录的切换，下拉表单的变化
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
  
  data(){
      return{
        // 布尔类型判断，true显示短信登录界面，false显示密码登录界面
        loginType:true,(两种登录方式)
        // 手机号  需要在计算属性中用正则表达式定义
        phone:'',
        // 计时剩余的时间，为0时没有计时
        computeTime:0,
        // 是否显示密码，默认是不显示的
        isShowPwd:false
      }
    }
form 表单会自动提交数据，所以需要阻止默认行为  @click.prevent=""
<button :disabled="!isRightPhone" class="get_verification" :class="{right_phone_number:isRightPhone}">获取验证码</button>
           &父级选择器  （设置样式使用了）  &子找父   &.right_phone_number  color black

  组件间通信的方式
   props：函数数据(子向父)    非函数数据(父向子)
   slot：插槽   父向子传递数据  
   {{}}： 插值   通过写标签的时候通过属性传过去

   注册组件
    局部注册  component:{}
    全局注册  在入口文件中

*/
       

//import { setInterval, clearInterval } from 'timers'
import { reqSendCode, reqPwdLogin, reqSmsLogin } from '../../api'
//import { RECEIVE_USER } from '../../vuex/mutation-types'
  export default {
    data(){
      return{
        // 布尔类型判断，true为短信登录，false为密码
        loginType:false,
        // 手机号  需要在计算属性中用正则表达式定义
        phone:'',
        code:'',//短信验证码
        name:'',//用户名
        pwd:'',//密码
        captcha:'',//图形验证码

        // (发送验证码的倒计时)计时剩余的时间，为0时没有计时
        computeTime:0,
        // 是否显示密码，默认是不显示的
        isShowPwd:false
      }
    },
    // 计算属性
    computed:{
      /* 手机号(正则表达  /^$/)
        ^：起始位置
        $：结尾位置
        \d  :  [0-9]       \D   :  [^\d]
        {}:个数
        【布尔类型】test()方法字符串中包含了要测试的字符串就是true,反之false
      */
      isRightPhone(){
        return /^1\d{10}$/.test(this.phone)
      }
    },
    // 方法
    methods:{
      // 发送验证
      async sendCode () {
        // alert('----')
        // 设置最大时间
        this.computeTime = 10
        // 启动循环定时器进行计时
        const intervalId = setInterval(() => {
          this.computeTime--
          // 一旦到了0, 清除定时器
          if (this.computeTime===0) {
            clearInterval(intervalId)
          }
        }, 1000)


      // 表单验证


        // 发送ajax请求：发送短信验证码
        // 调用api  reqSendCode(promise对象)  传的参数是phone（api接口文档）
        // 定义常量result接收结果  使用了axsion响应拦截器让成功的回调得到的四reponse data
        const result = await reqSendCode(this.phone)
        if(result.code===0){
            alert('短信已成功发送')
        }else{
          alert(result.msg)
        }
      },

      // 更新图形验证码显示
      updateCapcha () {
        // 给img指定一个新的src值，携带一个时间戳的参数
        /* 
        ref 被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上
        如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；
        如果用在子组件上，引用就指向组件实例：
        $refs 是所有注册过的ref的一个集合
        */
      //  时间戳  携带一个时间戳的参数，？的后面是时间参数值，名称可以任意
        this.$refs.captcha.src='http://localhost:5000/captcha?time=' + Date.now()
      },

      // 登录(需要收集数据====短信登录还是密码登录，手机号，短信验证码，用户名，密码，图形验证码)
      async login () {
        let result
        //1.获取数据（密码或者短信登录），拿到结果result,根据拿到的结果处理响应
        const {loginType, phone, code, name, pwd, captcha} = this
        // 发密码登录的请求
        if(!loginType){//resulut不一致
          result = await reqPwdLogin({name,pwd,captcha})
        }else{
          // 发短信登录的请求（异步，ajax函数发送请求，每个函数返回的都是promise）
          result = await reqSmsLogin(phone,code)
        }

        // 2.根据结果处理进行响应处理
        console.log('result',result)

        //成功的状态code=0，data中包含_id,name,token {code: 0, data: {code: 0   data: {_id: "", name: "", token:}
        // token和cookies一样是有有效期的
        if(result.code === 0){
          // 将user信息保存到state中
          const user = result.data
          //this.$store.commit(RECEIVE_USER,{user})=====在action中定义了一个函数记录user（持久化保存token,在state中保存user）
          //dispatch做了两件事： 将token传到locaStorage中,将user传到vuex中的state
          // 请求需要授权检查的接口时，自动携带token，在响应拦截器中操作
          this.$store.dispatch('recordUser',user)
          // 跳转到个人中心
          this.$router.replace('/profile')
        }else{//登录失败
          alert(result.msg)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../../common/stylus/mixins.styl'

  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
