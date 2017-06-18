<template>
  <div class="pay mainContent">
    <div class="title">购物车</div>
    <base-scroll>
      <h1>sono</h1>
      <transition-group name="slide" tag="ul">
        <li v-for="(item,index) in orderData" :key="item">
          <div class="base">
            <div class="name">商品：{{item.good_name}}</div>
            <div class="price">￥{{item.shop_price}}</div>
          </div>
          <div class="goods">
            <div class="imgCon" v-lazy:background-image="item.good_img"></div>
            <div class="controls">
              <div class="name">
                {{item.product_name}}
              </div>
              <div class="number">
                &times;{{item.number}}
              </div>
            </div>
          </div>
        </li>
      </transition-group>
      <div class="total">合计：￥{{total}}</div>
      <div class="submit" @click="toPayOrder">去支付</div>
      <router-view></router-view>
    </base-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll"
  import {getOrderDetail, configJssdk, orderJssdk,getUserInfo} from "../../service"
  import baseScroll from "../../components/baseScroll/baseScroll.vue"
  import wx from 'weixin-js-sdk'
  import {mapMutations} from "vuex"
  export default {
    data () {
      return {
        orderData: ''
      }
    },
    created () {
      let _this = this
//      configJssdk(function (msg) {
//        wx.config({
//          appId: msg.appId,
//          timestamp: msg.timestamp,
//          nonceStr: msg.nonceStr,
//          signature: msg.signature,
//          jsApiList: [
//            'checkJsApi',
//            'chooseWXPay'
//          ]
//        });
//      });
      getOrderDetail(_this.$router.currentRoute.query.id, function (d) {
        _this.orderData = d.orderGood
        _this.$nextTick(function () {
          _this.CLOSESPINNER()
        })
      })
    },
    methods: {
      ...mapMutations([
          "CLOSESPINNER",
          "OPENPOP"
      ]),
      toPayOrder () {
        let _this = this
        orderJssdk(_this.$router.currentRoute.query.id, function (data) {
          wx.chooseWXPay({
            timestamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType, // 注意：新版支付接口使用 MD5 加密
            paySign: data.sign,
            success: function (res) {  //支付成功后的回调函数
              if (res.errMsg == "chooseWXPay:ok") {
                //支付成功
                getUserInfo(function (d) {
                  _this.$store.commit('SETUSER',d);
                })
                _this.$router.replace("/pay/success")
              } else {
                _this.OPENPOP(res.errMsg)
              }
            },
            cancel: function (res) {
              if (res.errMsg == "chooseWXPay:ok") {
                //支付成功
                getUserInfo(function (d) {
                  _this.$store.commit('SETUSER',d);
                })
                _this.$router.replace("/pay/success")
              } else {
                _this.OPENPOP("some error")
              }
              _this.OPENPOP("用户已取消")
            },
            error: function (e) {
              _this.OPENPOP("支付失败")
            }
          });
        })

      }
    },
    components: {
      baseScroll
    },
    computed: {
      total () {
        let _this = this
        let total = 0;
        for (let i = 0; i < _this.orderData.length; i++) {
          total += _this.orderData[i].number * _this.orderData[i].shop_price
        }
        return total;
      }
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .pay {
    .title {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      top: 0;
      background-color: #ebebeb;
      height: 0.5rem;
      line-height: 0.5rem;
      color: #262626;
      padding: 0 0.3rem;
      z-index: 100;
      text-align: center;
    }
    .content {
      position: absolute;
      left: 0;
      right: 0;
      top: 0.5rem;
      bottom: 0;
      z-index: 10;
      background-color: #fff;
      .box {
        padding: 0 0.3rem;
      }
      .total {
        text-align: right;
        margin-top: 0.2rem;
        font-weight: bold;
        color: #FF434C;
        font-size: 0.3rem;
      }
      .submit {
        background-color: #FF434C;
        height: 0.5rem;
        line-height: 0.5rem;
        width: 3.8rem;
        border-radius: 0.25rem;
        color: #fff;
        text-align: center;
        font-size: 0.3rem;
        margin: 0.4rem auto;
      }
      h1 {
        line-height: 2em;
        font-size: 0.2rem;
        border-bottom: 1px solid #aaa;
      }
      ul {
        li {
          padding-top: 0.2rem;
          border-bottom: 1px solid #aaa;
          &.slide-enter-active, &.slide-leave-active {
            transform: translateY(0);
            transition: all 0.5s ease;
          }
          &.slide-enter, &.slide-leave-active {
            opacity: 0;
            transform: translateY(10px);
          }
          .base {
            display: flex;
            line-height: 1em;
            margin-bottom: 0.2rem;
            .name {
              text-align: left;
              flex-grow: 1;
            }
            .price {
              text-align: right;
              font-weight: bold;
            }
          }
          .goods {
            height: 1.2rem;
            display: flex;
            margin-bottom: 0.2rem;
            .imgCon {
              flex: 0 0 1.2rem;
              margin-right: 0.2rem;
              width: 1.2rem;
              background-color: #ebebeb;
              background-image: url(/static/images/default.jpg);
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
            }
            .controls {
              flex: 1;
              display: flex;
              padding: 0.1rem 0;
              flex-direction: column;
              justify-content: space-between;
              .name {
                color: #8d8d8d;
                font-size: 0.2rem;
                line-height: 0.3rem;
                .delete {
                  border: 1px solid #aaa;
                  color: #FF434C;
                  line-height: 0.3rem;
                  font-size: 10px;
                  padding: 0 0.1rem;
                  float: right;
                }
              }
              .number {
                text-align: right;
                font-weight: bold;
                color: #6C6D6F;
              }
              .control {
                height: 0.36rem;
                line-height: 0.36rem;
                justify-content: space-between;
                display: flex;
                .numText {
                  float: right;
                  font-size: 0.24rem;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
