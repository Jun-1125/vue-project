/* 
包含n个接口请求函数的模块
调用ajax函数发送请求
每个函数返回的都是promise
*/
// 调用ajax发请求
import ajax from './ajax'

// config/index.js中配置代理 
//const BASE = 'http://localhost:5000'
const BASE = '/api'

// 1.根据经纬度获取位置详情    先写纬度再写经度
export const reqAddress = (longitude, latitude) => ajax.get(BASE + `/position/${latitude},${longitude}`)

// 2.获取食品分类列表
export const reqCategorys = () => ajax({
  method: 'GET',
  url: BASE + '/index_category',
  headers:{
    needToken:true//拦截器可以看到 放在headers内
  }
})

// 3.根据经纬度获取商铺列表
export const reqShops = ({latitude, longitude}) => ajax({
  method: 'GET',
  url: BASE + '/shops',
  params: { latitude, longitude },
  headers:{
    needToken:true//拦截器可以看到 放在headers内
  }
})

// 发送短信验证码
export const reqSendCode = (phone) => ajax({
  method: 'GET',
  url: BASE + '/sendcode',
  params: { phone }
})

// 用户名密码登录
export const reqPwdLogin = ({ name, pwd, captcha }) => ajax({
  method: 'POST',
  url: BASE + '/login_pwd',
  data: {
    name,
    pwd,
    captcha
  }
})

// 手机号/短信登录
export const reqSmsLogin = (phone, code) => ajax({
  method: 'POST',
  url: BASE + '/login_sms',
  data: {
    phone,
    code
  }
})

//自动登录的请求
export const reqAutoLogin = () => ajax({
  url: BASE + '/auto_login',
  headers: { needToken: true }
})
