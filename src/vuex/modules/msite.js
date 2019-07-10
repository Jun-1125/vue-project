

//管理首页模块的
import {
    reqAddress,
    reqCategorys,
    reqShops
  } from '../../api'

import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS
  } from "../mutation-types"

const state = {
    latitude: 40.10038, // 纬度
    longitude: 116.36867, // 经度
    // 后面需要获取的信息（不确定的信息）
    address: {}, // 地址信息对象
    categorys: [], // 分类数组
    shops: [], //商家数组
}

const mutations = {
    // 根据经纬度获取位置信息
  [RECEIVE_ADDRESS](state, address) {
    state.address = address
  },

  // 获取食品分类列表
  [RECEIVE_CATEGORYS](state, categorys) {
    state.categorys = categorys
  },
  
  // 根据经纬度获取商家列表
  [RECEIVE_SHOPS](state, shops) {
    state.shops = shops
  },
  zzz (state) {

  }
}

const actions = {
        //获取当前地址的异步action
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
    }
}

const getters = {
  bbb(state) { // 当前模块的

  }
}

export default {
    state,
    mutations,
    actions,
    getters
}