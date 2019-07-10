
//管理用户信息模板

import {
    reqAutoLogin
  } from '../../api'

import {
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_TOKEN,
    RESET_TOKEN
  } from "../mutation-types"

const state = {
    user: {}, // d登录用户信息对象
    token: localStorage.getItem('token_key'),//初始值
}

const mutations = {
    [RECEIVE_USER](state, {user}) {
        state.user = user
      },
    
    [RECEIVE_TOKEN](state, {token}) {
        state.token = token
    },
    
    [RESET_USER](state) {
        state.user = {}
    },
      
    [RESET_TOKEN](state) {
        state.token = ''
    },
    zzz(state) {

    }
}

const actions = {
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
    },
}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}