import mock_wuliu from './mock_wuliu'
import API from './api'
import axios from 'axios'
import qs from 'qs'
import store from "../store/index"

export const getSelectData = (p,n,callback) =>{
  // let data = qs.stringify({
  //   user_id:store.state.userInfo.user_id,
  //   token:store.state.userInfo.token
  // });
  // axios({
  //   method:'post',
  //   url:API.baseUrl+API.list.recommend,
  //   data:data
  // }).then(function (response) {
  //   API.handleResponse(response.data,function (d) {
  //     console.log(d)
  //   })
  // }).catch(function (error) {
  //   console.log(error);
  // })
  axios({
    method:'get',
    url:"http://admin.sono.mobi/actlist/index"
  }).then(function (response) {
    callback(response.data)
  }).catch(function (error) {
    console.log(error);
  })
}
export const getAllGoods = (p,n,callback) =>{
  store.commit("SETCANLOAD",false)
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
    page: p,
    num: n
  });
  axios({
    method:'post',
    url:API.baseUrl+API.list.allGoods,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const getGoodsDetail = (id,callback) =>{
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
    id:id
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.goodsDetail,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const addCart = (n,callback) =>{
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
    goods_id:store.state.goodsData.good_id,
    product_id:store.state.goodsData.product_id,
    goods_number:n
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.addCart,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const getCartList = (callback) =>{
  store.commit("SETCANLOAD",false)
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.cartList,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const deleteCart = (id,callback) =>{
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
    id:id
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.deleteCart,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const editCart = (id,num,callback) =>{
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
    id:id,
    goods_number:num
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.editCart,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const addAddress = (obj,callback) =>{
  let userInfo = {
    ...obj,
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token
  }
  let data = qs.stringify(userInfo)
  axios({
    method:'post',
    url:API.baseUrl+API.list.addAddress,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const getRegionInfo = (id,callback) => {
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
    pid:id
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.regionInfo,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const getAddressList = (callback) =>{
  store.commit("SETCANLOAD",false)
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.addressList,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const deleteAddress = (id,callback) =>{
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
    id:id
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.deleteAddress,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const getCommentList = (id,p,n,callback) =>{
  store.commit("SETCANLOAD",false)
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
    id:id,
    page:p,
    num:n
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.commentList,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const getRecommendList = (callback) =>{
  store.commit("SETCANLOAD",false)
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.recommendList,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const getWuliuData = (p,n,callback)=>{
  store.commit("SETCANLOAD",false)
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
    page:p,
    num:n
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.wuliu,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const addOrder = (callback)=>{
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
    address_id:store.state.defaultAddress.id
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.addOrder,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const getOrderDetail = (id,callback) =>{
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
    id:id
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.orderDetail,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const getUserInfo = (callback)=>{
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.userInfo,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const uploadImg = (code,callback) => {
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
    code:code
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.uploadImg,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const addComment = (obj,callback) =>{
  let d = {
    ...obj,
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token
  }
  let data = qs.stringify(d)
  axios({
    method:'post',
    url:API.baseUrl+API.list.addComment,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const editAddress = (obj,callback) =>{
  let userInfo = {
    ...obj,
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token
  }
  let data = qs.stringify(userInfo)
  axios({
    method:'post',
    url:API.baseUrl+API.list.editAddress,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const getOrderList = (p,n,callback) =>{
  store.commit("SETCANLOAD",false)
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
    page:p,
    num:n
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.orderList,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const getFreeList = (p,n,callback)=>{
  store.commit("SETCANLOAD",false)
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
    page:p,
    num:n
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.freeList,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const getFreeActivity = (callback)=>{
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.freeActivity,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const addFree = (obj,callback) =>{
  let o = {
    ...obj,
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
  }
  let data = qs.stringify(o)
  axios({
    method:'post',
    url:API.baseUrl+API.list.addFree,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const configJssdk = (callback)=>{
  console.log(window.location.href.split('#')[0])
  let data = qs.stringify({
    url:encodeURIComponent(window.location.href.split('#')[0])
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.configJssdk,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const orderJssdk = (id,callback)=>{
  let o = {
    id:id,
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
  }
  let data = qs.stringify(o)
  axios({
    method:'post',
    url:API.baseUrl+API.list.orderJssdk,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const getMessageList = (p,n,callback)=>{
  store.commit("SETCANLOAD",false)
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
    page:p,
    num:n
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.messageList,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const messageRead = (id,callback)=>{
  let data = qs.stringify({
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
    id:id
  })
  axios({
    method:'post',
    url:API.baseUrl+API.list.messageRead,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const addBook = (obj,callback)=>{
  let o = {
    ...obj,
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
  }
  let data = qs.stringify(o)
  axios({
    method:'post',
    url:API.baseUrl+API.list.addBook,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const freeDetail = (obj,callback)=>{
  let o = {
    ...obj,
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
  }
  let data = qs.stringify(o)
  axios({
    method:'post',
    url:API.baseUrl+API.list.freeDetail,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      console.log(d)
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
export const orderDetail = (obj,callback)=>{
  let o = {
    ...obj,
    user_id:store.state.userInfo.user_id,
    token:store.state.userInfo.token,
  }
  let data = qs.stringify(o)
  axios({
    method:'post',
    url:API.baseUrl+API.list.orderDetail,
    data:data
  }).then(function (response) {
    API.handleResponse(response.data,function (d) {
      callback(d)
    })
  }).catch(function (error) {
    console.log(error);
  })
}
