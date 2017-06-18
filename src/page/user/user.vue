<template>
  <div class="user mainContent" @scroll="handleScroll" ref="user">
      <div v-show="ifFixed" class="tabCon fixed">
        <div class="tab">
          <router-link to="/user/goods_order" replace>商品订单</router-link>
        </div>
        <div class="tab">
          <router-link to="/user/try_order" replace>试用订单</router-link>
        </div>
      </div>
      <sono-scroll :minHeight="minHeight" @scroll="handleScroll" :noMore="noMore" @loadMore="loadMore" ref="scroll">
        <div class="top" style="background-image: url(http://sonotemp.b0.upaiyun.com/sono/images/user_bg.jpg)">
          <img class="avatar" :src="userInfo.self_img" alt="">
          <div class="content">
            <span class="name">{{userInfo.nick_name}}</span>
            <div class="menu">
              <span class="item">订单数:{{userInfo.order_num}}</span>
              <span class="item" style="background-color:#FFCF3D;">试用数:{{userInfo.free_num}}</span>
            </div>
          </div>
        </div>
        <div class="menu_tab">
          <router-link class="item logistics" to="/logistics">
            <span></span>
            <p>物流信息</p>
          </router-link>
          <router-link class="item try" to="/tryList">
            <span></span>
            <p>我的试用</p>
          </router-link>
          <router-link class="item cart" to="/cart">
            <span></span>
            <p>购物车</p>
          </router-link>
          <router-link class="item address" to="/addressList">
            <span></span>
            <p>收货地址</p>
          </router-link>
        </div>
        <div class="orderCon">
          <div class="title">
             南屋北舍
          </div>
          <div class="tabCon" ref="tabCon">
            <div class="tab">
              <router-link to="/user/goods_order" replace>商品订单</router-link>
            </div>
            <div class="tab">
              <router-link to="/user/try_order" replace>试用订单</router-link>
            </div>
          </div>
          <transition name="move">
            <keep-alive>
              <router-view ref="order"></router-view>
            </keep-alive>
          </transition>
        </div>
      </sono-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getUserInfo,getOrderList,getFreeList} from '../../service'
  import BScroll from "better-scroll"
  import {mapState,mapMutations} from 'vuex'
  import scroll from '../../components/scroll/scroll.vue'
  export default {
    data () {
      return {
        minHeight:0,
        goods_page:1,
        free_page:1,
        num:5,
        noMore:false,
        ifFixed:false
      }
    },
    components:{
      "sono-scroll":scroll
    },
    computed: mapState({
      userInfo: state =>state.user.user
    }),
    created(){
      let _this = this;
      _this.loadMore();

      _this.$nextTick(function () {
        _this.minHeight = _this.$refs.user.getBoundingClientRect().height
      })
    },
    watch: {
      '$route' (to) {
        this.noMore = false;
        this.$refs.scroll.pullText = "加载中...";
        this.loadMore()
      }
    },
    methods:{
      ...mapMutations([
        'SETORDERDATA',
        "CLOSESPINNER",
        "NEWORDERSCROLL",
        "OPENALERT"
      ]),
      handleScroll(){
        if(this.$refs.tabCon.getBoundingClientRect().top>0){
          this.ifFixed = false
        }else{
            this.ifFixed = true
        }
      },
      getOrderHeight () {
          let _this = this
      },
      loadMore () {
        let _this = this
        if(_this.$router.currentRoute.path == '/user/goods_order'){
          getOrderList(_this.goods_page,_this.num,function (d) {
              if(d.list.length<_this.num){
                _this.noMore = true
                _this.$refs.scroll.pullText = "无更多内容"
                _this.$refs.scroll.$refs.pullUp.className = '';
              }
              if(_this.goodsList){
                _this.goodsList.list = _this.goodsList.list.concat(d.list)
              }else{
                _this.goodsList = d
              }
              _this.SETORDERDATA({
                obj:_this.goodsList,
                str:"goodsOrder"
              });
              _this.goods_page++
          })
        }
        if(_this.$router.currentRoute.path == '/user/try_order'){
          getFreeList(_this.free_page,_this.num,function (d) {
            if(d.list.length<_this.num){
              _this.noMore = true
              _this.$refs.scroll.pullText = "无更多内容"
              _this.$refs.scroll.$refs.pullUp.className = '';
            }
            if(_this.tryList){
              _this.tryList.list = _this.tryList.list.concat(d.list);
            }else{
              _this.tryList = d;
            }
            _this.SETORDERDATA({
              obj:_this.tryList,
              str:"tryOrder"
            });
            _this.free_page++
          })
        }
      }
    },

  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .user{
    top:0;
    background-color: #EBEBEB;
    .tabCon{
      padding: 0 0.3rem;
      height: 0.65rem;
      line-height: 0.65rem;
      display: flex;
      box-sizing: border-box;
      background-color: #fff;
      overflow: hidden;
      &.fixed{
        position: fixed;
        width: 100%;
        left: 0;
        top:0;
        z-index: 10000;
      }
      .tab{
        flex: 1;
        text-align: center;
        a{
          height: 0.65rem;
          display: block;
          box-sizing: border-box;
          border-bottom: 0.1rem solid #ebebeb;
          &.active{
            border-bottom: 0.1rem solid #ff434c;
          }
        }
        &:first-child{
          margin-right: 0.2rem;
        }
      }
    }
    .content{
      background: none;
      .top{
        height: 1.9rem;
        box-sizing: border-box;
        padding: 0.3rem;
        background-size: 100% auto;
        background-position: center;
        .avatar{
          width: 1.3rem;
          height: 1.3rem;
          border-radius: 50%;
          vertical-align: top;
          margin-right: 0.2rem;
          background-color: #ebebeb;
          background-image: url(./default.jpg);
          background-size: cover;
          background-repeat: no-repeat;
        }
        .content{
          display: inline-block;
          span{
            display: inline-block;
          }
          .name{
            color: #000;
            font-size: 0.24rem;
            line-height: 1em;
            margin-top: 0.3rem;
            margin-bottom: 0.2rem;
          }
          .menu{
            .item{
              width: 1.3rem;
              height: 0.4rem;
              border-radius: 0.2rem;
              background-color: #fff;
              font-size: 0.2rem;
              text-align: center;
              line-height: 0.4rem;
              margin-right: 0.1rem;
              color: #262626;
            }
          }
        }
      }
      .menu_tab{
        height: 1.4rem;
        background-color: #fff;
        display: flex;
        .item{
          flex: 1;
          text-align: center;
          font-size: 0.2rem;
          p{
            line-height: 1em;
            margin-top: 0.1rem;
            color: #010101;
          }
          span{
            display: block;
            height: 0.9rem;
            width: 0.9rem;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            margin: 0.1rem auto 0;
          }
          &.logistics{
            span{
              background-color: #84BB44;
              background-image: url(./icon_logistics.png);
            }
          }
          &.try{
            span{
              background-color: #FFAF32;
              background-image: url(./icon_try.png);
            }
          }
          &.cart{
            span{
              background-color: #EB4141;
              background-image: url(./icon_cart.png);
            }
          }
          &.address{
            span{
              background-color: #BABABA;
              background-image: url(./icon_list.png);
            }
          }
        }
      }
      .orderCon{
        .title{
          height: 0.5rem;
          line-height: 0.5rem;
          padding: 0 0.3rem;
        }

      }
    }
  }
</style>
