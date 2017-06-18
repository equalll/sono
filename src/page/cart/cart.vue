<template>
  <div class="cart mainContent" @click="hideMore">
    <div class="title">购物车</div>
    <base-scroll>
      <div class="addressCon" @click.stop>
        <template v-if="defaultAddress.id">
          <div class="flex">
            <div class="name">{{defaultAddress.consignee}}</div>
            <div class="mobile">{{defaultAddress.mobile}}</div>
          </div>
          <div v-if="defaultAddress" class="addressText">
            {{defaultAddress.province_name}}省{{defaultAddress.city_name}}市{{defaultAddress.district_name}}{{defaultAddress.address}}
          </div>
        </template>
        <transition name="fade">
          <div class="moreAddress" v-show="ifAddress||!defaultAddress.id" >
            <sono-address @hideMore="hideMore" @setDefault="setDefault"></sono-address>
          </div>
        </transition>
        <div v-show="defaultAddress.id" class="more" @click="showMore">
          其他地址<img src="./icon_down.png">
        </div>

        <!--<div v-else @click="newAddress" class="add">+新增地址</div>-->
      </div>
      <div class="order_list">
        <h1>南屋北舍</h1>
        <p class="tips" v-if="!cartData||cartData.length==0">购物车为空</p>
        <transition-group name="slide" tag="ul">
          <li v-for="(item,index) in cartData" :key="item">
            <div class="base">
              <div class="name">商品：{{item.goods_name}}</div>
              <div class="price">￥{{item.goods_price}}</div>
            </div>
            <div class="goods">
              <div class="imgCon" v-lazy:background-image="item.product_img"></div>
              <div class="controls">
                <div class="name">
                  {{item.product_name}}
                  <span class="delete" @click="delCart(item.id,index)">删除</span>
                </div>
                <div class="control">
                  <cart-control :cartData="item"></cart-control>
                  <span class="numText">&times;{{item.goods_number}}</span>
                </div>
              </div>
            </div>
          </li>
        </transition-group>
        <p class="bill" v-if="cartData.length>0">开具发票：购买后，在“我的订单”申请</p>
        <div class="total">合计：￥{{total}}</div>
        <div class="submit" v-if="cartData.length>0" @click="toAddOrder">去结算</div>
      </div>
    </base-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll"
  import address from "../../components/address/address.vue"
  import cartControl from '../../components/cartControl/cartControl.vue'
  import {getCartList, deleteCart, addOrder, getUserInfo} from "../../service"
  import {mapState, mapMutations} from 'vuex'
  import baseScroll from "../../components/baseScroll/baseScroll.vue"
  export default {
    data () {
      return {
        ifAddress: false,
        cartData: ''
      }
    },
    created(){
      let _this = this;

      getCartList(function (d) {
//        if (d.cart.length == 0) {
//          let o = {
//            title: "提示",
//            desc: "您的购物车为空，去首页看看吧！",
//            btn: [
//              {
//                name: "取消"
//              },
//              {
//                name: "确定",
//                callback: function () {
//                  _this.CLOSEALERT()
//                  _this.$router.replace("/index")
//
//                }
//              }
//            ]
//          }
//          _this.CLOSESPINNER()
//          _this.OPENALERT(o)
//          return
//        }
        _this.cartData = d.cart
        _this.$nextTick(function () {
          _this.CLOSESPINNER()
        })
      })
    },
    computed: {
      ...mapState({
        defaultAddress (state) {
          return state.defaultAddress
        }
      }),
      total () {
        let _this = this
        let total = 0;
        for (let i = 0; i < _this.cartData.length; i++) {
          total += _this.cartData[i].goods_number * _this.cartData[i].goods_price
        }
        return total.toFixed(2);
      }
    },
    components: {
      "sono-address": address,
      cartControl,
      baseScroll
    },
    methods: {
      ...mapMutations([
        "OPENALERT",
        "CLOSEALERT",
        "SETFORMDATA",
        "SETDEFAULTADDRESS",
        "CLOSESPINNER"
      ]),
      showMore () {
        this.ifAddress = true
      },
      hideMore () {
        this.ifAddress = false
      },
      setDefault (o) {
        this.SETDEFAULTADDRESS(o)
      },
      newAddress (){
        let formData = {
          id: "",
          consignee: "",
          mobile: "",
          province: 31,
          city: 383,
          district: 3229,
          address: "",
          zipcode: ""
        }
        this.SETFORMDATA(formData)
        this.$router.push("/edit")
      },
      delCart (id, index) {
        let _this = this
        let o = {
          title: "提示",
          desc: "确定删除该商品？",
          btn: [
            {
              name: "取消"
            },
            {
              name: "确定",
              callback: function () {
                deleteCart(id, function () {
                  _this.cartData.splice(index, 1)
                  _this.CLOSEALERT()
                  getUserInfo(function (d) {
                    _this.$store.commit('SETUSER', d);
                  })
                })
              }
            }
          ]
        }
        _this.OPENALERT(o)
      },
      toAddOrder (){
        let _this = this
        if (!_this.defaultAddress.id) {
          let o = {
            title: "提示",
            desc: "暂无地址信息",
            btn: [
              {
                name: "取消"
              },
              {
                name: "添加",
                callback: function () {
                  _this.$router.push("/edit")
                  _this.CLOSEALERT()
                }
              }
            ]
          }
          _this.OPENALERT(o)
          return
        }
        addOrder(function (d) {
          _this.$router.replace("/pay?id=" + d.order_id)
          getUserInfo(function (d) {
            _this.$store.commit('SETUSER', d);
          })
        })
      }
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .cart {
    .title {
      background-color: #ebebeb;
      height: 0.5rem;
      line-height: 0.5rem;
      color: #262626;
      text-align: center;
      margin-bottom: 0.05rem;
      position: relative;
      z-index: 1000;
    }
    .content {
      position: absolute;
      left: 0;
      top: 0.55rem;
      bottom: 0;
      right: 0;
    }
    .addressCon {
      height: 2rem;
      padding: 0.2rem 0.3rem;
      box-sizing: border-box;
      background-color: #ebebeb;
      border-bottom: 0.08rem solid #FF434C;
      position: relative;
      z-index: 100;
      .add {
        width: 1.5rem;
        line-height: 0.48rem;
        border: 1px solid #262626;
        text-align: center;
        margin: 0 auto;
      }
      .flex {
        display: flex;
        justify-content: space-around;
        margin-bottom: 0.2rem;
        font-size: 0.24rem;
        div {
          flex: 1;
        }
        .name {
          text-align: left;
        }
        .mobile {
          text-align: right;
          font-weight: bold;
          color: #000;
        }
      }
      .addressText {
        font-size: 0.3rem;
        line-height: 1.2em;
      }
      .moreAddress {
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 100;
        background-color: #ebebeb;
        max-height: 8rem;
        overflow: auto;
        &.fade-enter-active, &.fade-leave-active {
          transition: all 0.5s ease
        }
        &.fade-enter, &.fade-leave-active {
          opacity: 0;
        }
      }
      .more {
        position: absolute;
        right: 0.3rem;
        bottom: 0.2rem;
        color: #B4B4B4;
        font-size: 0.24rem;
        img {
          width: 0.3rem;
          vertical-align: top;
          margin-top: 0.04rem;
          margin-left: 0.1rem;
        }
      }
    }
    .order_list {
      padding: 0.3rem;
      .bill {
        margin-top: 0.1rem;
        color: #666;
        font-size: 0.2rem;
      }
      .tips {
        text-align: center;
        margin: 0.3rem auto 0.2rem;
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
          &.slide-leave-active {
            position: absolute;
          }
          &.slide-enter-active, &.slide-leave-active {
            transform: translateY(0);
            transition: all 0.5s ease;
          }
          &.slide-enter, &.slide-leave-active {
            opacity: 0;
            transform: translateY(30px);
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
              padding: 0.1rem 0 0;
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
