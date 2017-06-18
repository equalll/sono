<template>
  <!--<div class="nav">-->
  <transition-group name="slide" tag="div" class="nav">
    <div class="nav_item icon-home" key="1">
      <router-link to="/index">
        <div class="icon"></div>
        <p>首页</p>
      </router-link>
    </div>
    <template v-if="navType==0">
      <div class="nav_item icon-select" key="2">
        <router-link to="/all">
          <div class="icon"></div>
          <div>全部精选</div>
        </router-link>
      </div>
      <div class="nav_item icon-free" key="3">
        <router-link to="/free">
          <div class="icon"></div>
          <div>试用活动</div>
        </router-link>
      </div>
    </template>
    <div class="nav_item icon-cart" key="4">
      <router-link to="/cart">
        <div class="icon"><i v-if="ifCart"></i></div>
        <div>购物车</div>
      </router-link>
    </div>
    <div class="nav_item icon-user" key="5">
      <router-link to="/user">
        <div class="icon"></div>
        <div>个人中心</div>
      </router-link>
    </div>
    <template v-if="navType==1">
      <div class="nav_item icon-fix" @click="OPENGOODS"
           style="border-left: 1px solid rgba(180, 40, 45,0.1);color: #abaaaa;font-size: 0.24rem" key="6">
        <div>加入购物车</div>
      </div>
      <div class="nav_item icon-fix" @click="payNow" style="background-color: #b4282d;font-size: 0.24rem" key="7">
        <div>立即购买</div>
      </div>
    </template>
    <template v-if="navType==2">
      <div class="nav_item saleOut" @click="toReserve" key="9">
        <div>该产品已售罄<span>我要预定</span></div>
      </div>
    </template>
  </transition-group>
  <!--</div>-->
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import {addCart,getUserInfo} from "../../service"
  export default {
    computed: mapState({
      navType: state => state.navType,
      ifCart:state=>state.user.cartMessage
    }),
    methods: {
      ...mapMutations([
        'OPENGOODS'
      ]),
      payNow () {
        let _this = this
        addCart(1, function (d) {
          getUserInfo(function (data) {
            _this.$store.commit('SETUSER',data);
          })
          _this.$router.push("/cart")
        })
      },
      toReserve () {
          this.$router.push("/reserve")
      }
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .nav {
    position: fixed;
    width: 100%;
    height: 0.8rem;
    text-align: center;
    left: 0;
    bottom: 0;
    color: #fff;
    background-color: #2b2223;
    display: flex;
    z-index: 100;
    font-size: 10px;
    transition: all 0.4s ease;
    box-shadow: 0 0 0.1rem #2b2223;
    &.show-enter-active, &.show-leave-active {
      transition: transform .5s ease;
    }
    &.show-enter, &.show-leave-active {
      transform: translateY(100%);
    }
    .nav_item {
      flex: 1;
      height: 0.8rem;
      transition: all 0.4s ease;
      box-sizing: border-box;
      justify-content: center;
      display: flex;
      &.saleOut{
        background-color: #90bb34;
        border-left: 1px solid rgba(180, 40, 45, 0.1);
        font-size: 0.24rem;
        width: 3.2rem;
        flex: 0 0 3.2rem;
        text-align: center;
        line-height: 0.8rem;
        span{
          text-decoration: underline;
          margin-left: 0.25rem;
        }
      }
      &.slide-leave-active {
        position: absolute;
      }
      &.slide-enter-active, &.slide-leave-active {
        transform: translateX(0);
        transition: transform 1s ease;
      }
      &.slide-enter, &.slide-leave-active {
        opacity: 0;
        transform: translateX(10px);
      }
      &.icon-fix {
        flex: 0 0 1.6rem;
        width: 1.6rem;
        text-align: center;
        line-height: 0.8rem;
      }
      &.icon-home {
        a {
          .icon {
            background-size: 0.32rem auto;
            background-image: url(./home.png);
          }
          &.active {
            .icon {
              background-image: url(./home_active.png);
            }
          }
        }
      }
      &.icon-select {
        a {
          .icon {
            background-size: 0.36rem auto;
            background-image: url(./select.png);
          }
          &.active {
            .icon {
              background-image: url(./select_active.png);
            }
          }
        }
      }
      &.icon-free {
        a {
          .icon {
            background-size: 0.34rem auto;
            background-image: url(./free.png);
          }
          &.active {
            .icon {
              background-image: url(./free_active.png);
            }
          }
        }
      }
      &.icon-user {
        a {
          .icon {
            background-size: 0.30rem auto;
            background-image: url(./user.png);
          }
          &.active {
            .icon {
              background-image: url(./user_active.png);
            }
          }
        }
      }
      &.icon-cart {
        a {
          .icon {
            background-size: 0.34rem auto;
            background-image: url(./cart.png);
            position: relative;
            i{
              position: absolute;
              width: 0.16rem;
              height: 0.16rem;
              border-radius: 50%;
              background-color: red;
              right: 0;
              top:0;
            }
          }
          &.active {
            .icon {
              background-image: url(./cart_active.png);
            }
          }
        }
      }
      a {
        display: flex;
        height: 0.8rem;
        width: 100%;
        color: #fff;
        flex-direction: column;
        justify-content: center;
        &.active {
          color: #b6e428;
        }
        .icon {
          width: 0.36rem;
          height: 0.34rem;
          background-repeat: no-repeat;
          background-position: center;
          align-self: center;
          margin-bottom: 0.09rem;
        }
        div {
          display: inline-block;
        }
        span {
          flex: 1;
        }
      }
    }
  }
</style>
