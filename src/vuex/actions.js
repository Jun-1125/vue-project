/* 
包含n个用于间接修改状态数据的方法的对象
*/
// api上的接口请求函数
//import Cookies from 'js-cookie'
import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqAutoLogin
} from '../api'

import { 
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_TOKEN,
  RESET_TOKEN
} from "./mutation-types"

export default {
  
  /* 
  获取当前地址的异步action
  */
  
 async getAddress({ commit, state }){
    //发送异步ajax请求   经纬度
    const { latitude,longitude } = state//名称
      //有顺序要求  reqAddress返回的一个promise   和index.js中的地址传递位置
    const result = await reqAddress (longitude, latitude) 
    // 有结构后，提交mutation
    if(result.code===0){
      //const data = result.data
      const address = result.data
      //提交  commit
      commit(RECEIVE_ADDRESS,address)//提交会触发mutations调用
    }
  },

  /* 
  获取分类列表的异步action    
  对象{}  {commit}  commit是个函数 data需要就传，不需要就不传
  getCategorys({对象},data){}
  */
  async getCategorys({commit}, callback) {
    // 发异步ajax请求
    const result = await reqCategorys()
    // 有了结果后, 提交mutation
    if (result.code===0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, categorys)
      // 在更新状态数据后执行回调函数
      typeof callback === 'function' && callback() // 发通知
    }
  },

  /* 
  获取商家列表的异步action
  */
  async getShops({commit, state}) {
    const { longitude, latitude } = state
    // 发异步ajax请求   到api请求接口看需要传的数据 reqShops只需要一个数据，所以用对象包起来
    const result = await reqShops({longitude, latitude})
    // 有了结果后, 提交mutation
    if (result.code===0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, shops)
    }
  },

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
    /* // 清除cookie中的user_id
    Cookies.remove('user_id') */
  },

  // 自动登录异步
   async autoLogin ({commit,state}) {
    const token = state.token
    if(token){
      const result = await reqAutoLogin()
      if(result.code===0){
        const user = result.data
        commit(RECEIVE_USER,{ user })
      }
    }
  }
}