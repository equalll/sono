import store from '../store'
import {getUserInfo} from "../service"
export const setStorage = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStorage = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStorage = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

export const getPar = par => {
  //获取当前URL
  var local_url = window.location.href;
  //获取要取得的get参数位置
  var get = local_url.indexOf(par +"=");
  if(get == -1){
    return "";
  }
  //截取字符串
  var get_par = local_url.slice(par.length + get + 1);
  //判断截取后的字符串是否还有其他get参数
  var nextPar = get_par.indexOf("&");
  if(nextPar != -1){
    get_par = get_par.slice(0, nextPar);
  }
  return get_par;
}

export const currentUrl = () =>{
  //获取当前URL
  var local_url = document.location.href;
  var url = local_url.slice(0,local_url.indexOf("?"))
  var reg_url = /^[^\?]+\?([\w\W]+)$/,
    reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
    arr_url = reg_url.exec(local_url),
    ret = {};
  if (arr_url && arr_url[1]) {
    var str_para = arr_url[1], result;
    while ((result = reg_para.exec(str_para)) != null) {
      ret[result[1]] = result[2];
    }
  }
  url += "?"
  for(var i in ret){
    if(i!=="code"&&i!=="token"){
      url += i+'='+ret[i]+"&"
    }
  }
  url = url.slice(0,url.length-1)
  return url
}

export const oauth = () =>{
  let href = encodeURIComponent(window.location.href);
  window.location.href = 'http://admin.sono.mobi'+"/wechat/oauth?type=2&url="+href
}

export const getOauth = () =>{
  if(getPar("code")&&getPar("token")){
    setStorage("sono_userid",getPar("code"));
    setStorage("sono_token",getPar("token"));
    let obj = {
      "user_id":getPar("code"),
      "token":getPar("token")
    }
    store.commit('SETUSERINFO',obj);
    window.location.href = currentUrl()
  }else{
    if(getStorage("sono_userid")&&getStorage("sono_token")){
      let obj = {
        "user_id":getStorage("sono_userid"),
        "token":getStorage("sono_token")
      }
      store.commit('SETUSERINFO',obj);
      getUserInfo(function (d) {
        store.commit('SETUSER',d);
      })
    }
  }
}
