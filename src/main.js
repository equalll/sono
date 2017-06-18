import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import Vuerify from "vuerify"


import VueLazyload from 'vue-lazyload'
import './assets/js/resize'
import {getOauth} from './utils/main'
import Distpicker from 'v-distpicker'
import infiniteScroll from  'vue-infinite-scroll'

Vue.use(infiniteScroll)
Vue.use(Vuerify,{
  mobile:{
    test:/^(?:13\d|15\d|14\d|17\d|18[0123456789])-?\d{5}(\d{3}|\*{3})$/,
    message:"手机号格式有误"
  },
  email:{
    test:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    message:"邮箱格式有误"
  }
});
Vue.component('v-distpicker', Distpicker);
getOauth()

// if ('addEventListener' in document) {
//   document.addEventListener('DOMContentLoaded', function() {
//     FastClick.attach(document.body);
//   }, false);
// }

Vue.use(VueLazyload, {
  attempt: 6
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})



switch (router.currentRoute.path){
  case "/detail":
    store.state.navType = 1;
    store.state.ifNav = true;
    break;
  case "/reserve":
    router.replace("/index");
    break;
  default:
    store.state.ifNav = true;
    store.state.navType = 0;
    break;
}




// router.afterEach(function (a) {
//   store.commit("OPENSPINNER","数据加载中...");
//
//   switch (a.path){
//     case "/detail"://6
//       store.state.navType = 1;
//       store.state.ifNav = true;
//       break;
//     case "/all"://2
//     case "/free"://9
//     case "/index"://10
//     case "/user"://个人主页
//       shareData = {
//         title:"南屋北舍",
//         desc: "南屋北舍是一群有着不同职业，但对于南北农产品有着自己想法的吃货们组成的团队。",
//         link: "http://www.sono.mobi"+a.fullPath,
//         imgUrl: "http://sonotemp.b0.upaiyun.com/sono/images/logo.png"
//       };
//       store.state.ifNav = true;
//       store.state.navType = 0;
//       break;
//     default:
//       store.state.ifNav = true;
//       store.state.navType = 0;
//       shareData = {
//         title:"南屋北舍",
//         desc: "南屋北舍是一群有着不同职业，但对于南北农产品有着自己想法的吃货们组成的团队。",
//         link: "http://www.sono.mobi",
//         imgUrl: "http://sonotemp.b0.upaiyun.com/sono/images/logo.png"
//       };
//       break;
//   }
//   wx.ready(function () {
//     wx.onMenuShareAppMessage(shareData);
//     wx.onMenuShareTimeline(shareData);
//   });
//   try {
//     _hmt.push(['_trackPageview', a.path]);
//   }catch (e){
//
//   }
// })
