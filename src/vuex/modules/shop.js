
//管理商家列表模板

import Vue from 'vue'
import {
    reqGoods,
    reqRatings,
    reqInfo
  } from '../../api'
  
import {
    RECEIVE_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    ADD_FOOD_COUNT,
    REDUCE_FOOD_COUNT
  } from "../mutation-types"

const state = {
    goods: [], // 商品列表
    ratings: [], // 商家评价列表
    info: {}, // 商家信息
}

const mutations = {
    [RECEIVE_INFO](state, {info}) {
        state.info = info
    },
    
    [RECEIVE_RATINGS](state, {ratings}) {
        state.ratings = ratings
    },
    
    [RECEIVE_GOODS](state, {goods}) {
        state.goods = goods
    },

    [ADD_FOOD_COUNT](state, food) {//state不能省略，data不使用时可以省略
        //第一次count是没有的，所以会出错   
        //hasOwnProperty给food添加一个属性名count ，值为1，但是没有数据绑定
        //food是响应式对象（对象或者自己本身发生改变，界面就会更新）
        // Vue.set(target,key,value){Object | Array} target {string | number} key {any} value
        //为响应式对象添加一个属性，确保新属性也是响应式的，并且能够触发视图更新
        if(!food.hasOwnProperty('count')){
            Vue.set(food,'count',1)
        }else{
            food.count++
        }
    },

    [REDUCE_FOOD_COUNT](state, food) {
        if(food.count>0){
            food.count--
        }
    }
}

const actions = {
    //异步获取商品列表   cb=callback回调函数
    // 异步获取商家商品列表
    async getShopGoods({commit}, cb) {
        const result = await reqGoods()
        if(result.code===0) {
        const goods = result.data
        commit(RECEIVE_GOODS, {goods})
        cb && cb()
        }
    },
    
        //异步获取商家信息
    async getShopInfo({commit},cb) {
        // 发异步ajax请求   到api请求接口看需要传的数据 reqShops只需要一个数据，所以用对象包起来
        const result = await reqInfo()
        // 有了结果后, 提交mutation
        if (result.code===0) {
        const info = result.data
        commit(RECEIVE_INFO, {info})
    
        cb && cb()
        }
    },
    
    //异步获取商检评论列表
    async getShopRatings({commit},cb) {
        // 发异步ajax请求   到api请求接口看需要传的数据 reqShops只需要一个数据，所以用对象包起来
        const result = await reqRatings()
        // 有了结果后, 提交mutation
        if (result.code===0) {
        const ratings = result.data
        commit(RECEIVE_RATINGS, {ratings})
    
        cb && cb()
        }
    },

    updateFoodCount ({commit},{isAdd,food}) {
        if(isAdd){
            commit(ADD_FOOD_COUNT,food)
        }else{
            commit(REDUCE_FOOD_COUNT,food)
        }
    }
}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}