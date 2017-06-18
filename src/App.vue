<template>
  <div id="app">
    <keep-alive>
      <transition name="move">
        <router-view></router-view>
      </transition>
    </keep-alive>
    <transition name="show">
      <sono-nav v-show="ifNav"></sono-nav>
    </transition>
    <transition name="fade">
      <sono-content v-if="ifContent"></sono-content>
    </transition>
    <transition name="fade">
      <alert-info v-show="ifAlert"></alert-info>
    </transition>
    <transition name="fade">
      <sono-buy v-show="ifBuy"></sono-buy>
    </transition>
    <transition name="fade">
      <sono-swiper v-if="ifSwiper"></sono-swiper>
    </transition>
    <transition name="fade">
    <pop v-if="ifPop"></pop>
    </transition>
    <transition name="fade">
      <spinner v-show="ifSpinner"></spinner>
    </transition>
    <transition name="fade">
      <bill v-if="ifBill"></bill>
    </transition>
  </div>
</template>

<script>
  import nav from "./components/nav/nav.vue"
  import { mapState } from 'vuex'
  import { configJssdk } from './service'
  import content from './components/contentBox/contentBox.vue'
  import alert from './components/alertInfo/alertInfo.vue'
  import sonoSwiper from './components/sonoSwiper/sonoSwiper.vue'
  import sonoBuy from './components/buyGoods/buyGoods.vue'
  import pop from "./components/pop/pop.vue"
  import spinner from "./components/spinner/spinner.vue"
  import bill from "./components/bill/bill.vue"
  import wx from 'weixin-js-sdk'
  import store from './store/'
  import router from './router'
  export default {
    name: 'app',
    created () {
      let shareData = {
        title:"南屋北舍",
        desc: "南屋北舍是一群有着不同职业，但对于南北农产品有着自己想法的吃货们组成的团队。",
        link: "http://www.sono.mobi"+router.currentRoute.fullPath,
        imgUrl: "http://sonotemp.b0.upaiyun.com/sono/images/logo.png"
      };
      configJssdk(function (msg) {
        wx.config({
          appId: msg.appId,
          timestamp: msg.timestamp,
          nonceStr: msg.nonceStr,
          signature: msg.signature,
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'checkJsApi',
            'chooseWXPay'
          ]
        });
      })
      wx.ready(function () {
        wx.onMenuShareAppMessage(shareData);
        wx.onMenuShareTimeline(shareData);
      });
      router.afterEach(function (a) {
        store.commit("OPENSPINNER","数据加载中...");

        switch (a.path){
          case "/detail"://6
            store.state.navType = 1;
            store.state.ifNav = true;
            break;
          case "/all"://2
          case "/free"://9
          case "/index"://10
          case "/user"://个人主页
            shareData = {
              title:"南屋北舍",
              desc: "南屋北舍是一群有着不同职业，但对于南北农产品有着自己想法的吃货们组成的团队。",
              link: "http://www.sono.mobi"+a.fullPath,
              imgUrl: "http://sonotemp.b0.upaiyun.com/sono/images/logo.png"
            };
            store.state.ifNav = true;
            store.state.navType = 0;
            break;
          default:
            store.state.ifNav = true;
            store.state.navType = 0;
            shareData = {
              title:"南屋北舍",
              desc: "南屋北舍是一群有着不同职业，但对于南北农产品有着自己想法的吃货们组成的团队。",
              link: "http://www.sono.mobi",
              imgUrl: "http://sonotemp.b0.upaiyun.com/sono/images/logo.png"
            };
            break;
        }
        wx.ready(function () {
          wx.onMenuShareAppMessage(shareData);
          wx.onMenuShareTimeline(shareData);
        });
        try {
          _hmt.push(['_trackPageview', a.path]);
        }catch (e){

        }
      })
    },
    computed: mapState({
      ifContent: state => state.ifContent,
      ifAlert: state => state.ifAlert,
      ifNav: state => state.ifNav,
      ifBuy:state=>state.ifBuy,
      ifSwiper:state=>state.ifSwiper,
      ifPop:state=>state.pop.ifPop,
      ifSpinner:state=>state.ifSpinner,
      ifBill:state=>state.ifBill,
    }),
    components:{
      "sonoNav":nav,
      "sonoContent":content,
      "alertInfo":alert,
      sonoSwiper,
      sonoBuy,
      pop,
      spinner,
      bill
    },
    methods: {

    }
  }
</script>

<style>
  @import "assets/css/reset.css";
</style>
