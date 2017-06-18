<template>
  <div class="buyGoods" @click="CLOSEGOODS">
    <div class="content" @click.stop>
      <div class="info">
        <div class="imgCon" v-lazy:background-image="goodsData.thumb"></div>
        <div class="base">
          <div class="numInfo">
            本次数量:{{goodsData.product_number}}<span class="red">剩余:{{goodsData.remained_number}}</span>
          </div>
          <div class="price">
            <sub>￥</sub>{{goodsData.prize}}
          </div>
        </div>
      </div>
      <div class="type">
        {{goodsData.product_name}}
      </div>
      <div class="control">
        购买数量
        <cart-control :cartData="cartData"></cart-control>
      </div>
      <div class="btnGroup">
        <div class="btn add" @click="addToCart">加入购物车</div>
        <div class="btn right" @click="payNow">立即去结算</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import {addCart,getUserInfo} from "../../service"
  import cartControl from '../../components/cartControl/cartControl.vue'
  export default {
    data () {
      return {
        cartData: {
          id: "",
          goods_number: 1,
          remained_number: 1
        }
      }
    },
    computed: {
      ...mapState({
        goodsData(state){
          let _this = this
          _this.cartData.goods_number = 1
          _this.cartData.remained_number = parseInt(state.goodsData.remained_number)
          return state.goodsData
        }
      })
    },
    methods: {
      ...mapMutations([
        'CLOSEGOODS',
        "OPENPOP"
      ]),
      addToCart () {
        let _this = this
        addCart(this.cartData.goods_number, function (d) {
          _this.OPENPOP("商品成功添加到购物车!")
          getUserInfo(function (data) {
            _this.$store.commit('SETUSER',data);
          })
          setTimeout(function () {
            _this.CLOSEGOODS()
          },500)
        })
      },
      payNow () {
        let _this = this
        addCart(this.cartData.goods_number, function (d) {
          _this.CLOSEGOODS()
          getUserInfo(function (data) {
            _this.$store.commit('SETUSER',data);
          })
          _this.$router.push("/cart")
        })
      }
    },
    components: {
      cartControl
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .buyGoods {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.8);
    &.fade-enter-active, &.fade-leave-active {
      transition: opacity .5s
    }
    &.fade-enter, &.fade-leave-active {
      opacity: 0
    }
    .content {
      position: absolute;
      width: 100%;
      box-sizing: border-box;
      padding: 0.3rem 0.5rem;
      top: 50%;
      -webkit-transform: translateY(-50%);
      background-color: #fff;
      .info {
        height: 0.8rem;
        display: flex;
        .imgCon {
          width: 1.6rem;
          height: 1.6rem;
          flex: 0 0 1.6rem;
          border: 1px solid #C3C3C3;
          box-sizing: border-box;
          border-radius: 4px;
          position: relative;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          top: -0.8rem;
          background-image: url(/static/images/default.jpg);
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }
        .base {
          flex: 1;
          margin-left: 0.3rem;
          text-align: left;
          .numInfo {
            line-height: 1em;
            margin-bottom: 0.1rem;
            .red {
              color: #C41414;
              margin-left: 0.2rem;
            }
          }
          .price {
            font-size: 0.36rem;
            color: #8DB610;
            font-weight: bold;
            sub {
              font-size: smaller;
              font-weight: lighter;
              vertical-align: super;
            }
          }
        }
      }
      .type {
        padding: 0 0.16rem;
        height: 0.36rem;
        line-height: 0.36rem;
        border: 1px solid #FF575F;
        color: #FF575F;
        display: inline-block;
        margin-top: 0.2rem;
      }
      .control {
        margin-top: 0.3rem;
        display: flex;
        line-height: 0.36rem;
        .cartControl {
          margin-left: 0.1rem;
        }
      }
      .btnGroup {
        display: flex;
        height: 0.6rem;
        line-height: 0.6rem;
        margin-top: 0.2rem;
        .btn {
          margin: 0 0.2rem;
          flex: 1;
          text-align: center;
          border-radius: 3px;
          color: #fff;
          font-size: 0.32rem;
          font-weight: bold;
          &.add {
            background-color: #8DB610;
          }
          &.right {
            background-color: #B61010;
          }
        }
      }
    }
  }
</style>
