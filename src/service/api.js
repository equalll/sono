import router from '../router'
import store from '../store'
import {oauth} from "../utils/main.js"
export default {
  // baseUrl:"http://admin.sono.dev",
  baseUrl:(process.env.NODE_ENV === 'development') ?"http://admin.sono.mobi":'http://admin.sono.mobi',
  errorMsg:{
    10001:"用户id为空",
    10002:"用户信息不存在",
    10003:"地区不存在",
    10004:"系统错误",
    20001:"商品不存在",
    20002:"商品已经下架",
    20003:"商品暂无可售规格",
    30001:"商品暂无可售规格",
    30002:"添加购物车失败，请重试",
    30003:"购物车id不可为空",
    30004:"暂无信息",
    30005:"删除购物车失败",
    30006:"修改购物车失败",
    40001:"保存地址信息失败",
    40002:"修改地址信息失败",
    40003:"地址信息不存在",
    40004:"区域信息不存在",
    50001:"商品不能为空",
    50002:"参数错误",
    50003:"已经评价过了",
    50004:"提交失败，请稍后重试",
    60001:"暂无试用活动",
    60003:"试用申请已经提交",
    60004:"试用申请提交失败",
  },
  list:{
    "recommend":"/activity/recommend",
    "allGoods":"/good/list",
    "goodsDetail":"/good/detail",
    "addCart":"/cart/add",
    "cartList":"/cart/list",
    "deleteCart":"/cart/del",
    "editCart":"/cart/edit",
    "addressList":"/user/listaddress",
    "addAddress":"/user/address",
    "regionInfo":"/user/region",
    "editAddress":"/user/editaddress",
    "commentList":"/comment/list",
    "deleteAddress":"/user/deladdress",
    "recommendList":"/good/recommend",
    "addOrder":"/order/add",
    "orderList":"/order/list",
    "userInfo":"/user/info",
    "uploadImg":"/comment/saveImg",
    "addComment":"/comment/add",
    "freeList":"/free/list",
    "freeActivity":"/free/activity",
    "addFree":"/free/add",
    "configJssdk":"/wechat/jssdkindex",
    "orderJssdk":"/order/jssdkorder",
    "wuliu":"/message/wuliu",
    "messageList":"/message/list",
    "messageRead":"/message/read",
    "addBook":"/reserve/add",
    "freeDetail":"/free/detail",
    "orderDetail":"/order/detail"
  },
  handleResponse(d,callback){
    let _this = this
    switch (parseInt(d.errcode)){
      case 0:
        if(!store.state.CANLOAD){
          store.commit("SETCANLOAD",true)
        }
        callback(d.data)
        break;
      case -1:
        oauth();
        break;
      case 20002:
        let a =  {
          title:"提示",
          desc:_this.errorMsg[d.errcode],
          btn:[
            {
              name:"确定",
              callback:function () {
                router.replace("/index")
                store.commit("CLOSEALERT")
              }
            }
          ]
        }
        store.commit("CLOSESPINNER")
        store.commit("OPENALERT",a)
        break;
      default:
        let o =  {
          title:"提示",
          desc:_this.errorMsg[d.errcode]?_this.errorMsg[d.errcode]:d.errmsg,
          btn:[
            {
              name:"确定",
              callback:function () {
                // router.push("/index")
                store.commit("CLOSEALERT")
              }
            }
          ]
        }
        store.commit("CLOSESPINNER")
        store.commit("OPENALERT",o)
        break;
    }
  }
}
