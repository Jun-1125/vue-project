
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
    cartFoods:[]//购物车食物数组(在计算属性中会自动收集数据，现在手动设置一个状态进行设置)
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
        /*
        hasOwnProperty为响应式对象添加一个属性，确保新属性也是响应式的，并且能够触发视图更新  
        hasOwnProperty给food添加一个属性名count ，值为1，但是没有数据绑定
        food是响应式对象（对象或者自己本身发生改变，界面就会更新）
        解决方案：
        Vue.set(target,key,value){Object | Array} target {string | number} key {any} value
        */
        if(!food.hasOwnProperty('count')){//从无到1
            Vue.set(food,'count',1)
            // 购物车食物数组  将food推送到数组中
            state.cartFoods.push(food)
        }else{//改变food.count的数量，购物车的数组count也会变化
            food.count++
            /* 
             两个引用变量指向同一个对象,其中一个引用变量去修改对象内部的数据，另一个引用变量可以看到
                1.用其中一个引用变量去改变对象内部的数据，另一个引用变量看到是修改后的对象
                    a={m:1}   b=a  
                2.让其中一个引用变量指向新的变量，另一个引用变量还是指向原来的，不是修改后的新的变量
            */
        }
    },

    [REDUCE_FOOD_COUNT](state, food) {
        if(food.count>0){
            food.count--
            /* 从cartFoods中删除此food，同时删除此属性，因为下次会进入上面的重新添加属性，
            若不删就会直接进入else判断,不会进入创建新属性了 */
            if(food.count===0){
                delete food.count//删除food中count属性
                /* splice()  增删改均可
                splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,
                    并以数组形式返回被修改的内容。此方法会改变原数组
                
                indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1
                */
               
                // 如果count减为0，从cartfood中删除food
                //state.cartFoods.splice(index,1)此时没有下标index==>state.cartFoods.indexOf(food)
                //需要遍历才可以得到  
                state.cartFoods.splice(state.cartFoods.indexOf(food),1)
            }
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
    /*   缺点：每次改变都需要重新再遍历，运行效率比较低=====>解决的方案：设计个状态

    // 计算属性carFoods 1.初始显示会执行  2.相关依赖的数据发生变化会执行（点击，
    // 根据状态进行计算===>foods的数组，遍历数组，返回数组
    // carFoods计算属性的方法会初始显示会执行，后面执行：相关依赖的数据发生变化会执行
    // 数据发生变化（点击加减号均是）
    缺点：每次触发都会重新再遍历，运行效率太低
    carFoods(state){
        const foods = []//foods的数组=====计算属性会自动收集count>0的food  优势：编码简单易于理解
        // 数据在状态内  carFoods===>foods===>good===>goods
        state.goods.forEach(good => {
            good.foods.forEach(food => {
                if(food.count > 0){
                    //将food添加进foods中,然后返回
                    foods.push(food)
                }
            })
        })
        //返回foods的数组
        return foods
    } 
    */
        //总数量 (根据状态)
        totalCount (state) {//当前的数据+当前food中的值
            return state.cartFoods.reduce((pre,food) => pre +food.count,0)
        },
        // 总价格
        totalPrice (state) {
            return state.cartFoods.reduce((pre,food) => pre + food.count * food.price,0)
        }
        
}

export default {
    state,
    mutations,
    actions,
    getters
}