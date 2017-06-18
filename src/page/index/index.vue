<template>
  <div class="index mainContent">
    <sonoHeader></sonoHeader>
    <base-scroll>
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in recommendData.image" :key="item" v-lazy:background-image="item.image">
          <div class="event" @click="goTo(item.id)"></div>
          <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <div class="listCon">
        <div class="title">精选商品</div>
        <div class="line"></div>
        <p v-if="recommendData.recommend.length==0" class="tips">暂无精选商品</p>
        <transition-group name="slide" tag="ul">
          <template v-for="item in recommendData.recommend">
            <item :itemData="item" :key="item"></item>
          </template>
        </transition-group>
      </div>
      <div class="listCon">
        <div class="title">全部商品</div>
        <div class="line"></div>
        <p v-if="recommendData.good.length==0" class="tips">暂无商品</p>
        <transition-group name="slide" tag="ul">
          <template v-for="item in recommendData.good">
            <item :key="item.id" :itemData="item"></item>
          </template>
        </transition-group>
      </div>
      <router-link class="toAll" to="/all">查看全部商品</router-link>
      <bottom></bottom>
    </base-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from "../../components/header/header.vue"
  import baseScroll from "../../components/baseScroll/baseScroll.vue"
  import Vue from 'vue'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import bottom from '../../components/bottom/bottom.vue'
  import item from '../../components/item/item.vue'
  import {getRecommendList} from "../../service"
  import {mapMutations} from "vuex"
  export default {
    data () {
        return {
          recommendData:{
            recommend:[

            ],
            good:[]
          },
          swiperOption: {
            pagination: '.swiper-pagination',
            paginationClickable: true
          }
        }
    },
    created(){
      let _this = this
      getRecommendList(function (d) {
        _this.recommendData = d
        _this.$nextTick(function () {
          _this.CLOSESPINNER()
        })
      })
    },
    methods:{
      ...mapMutations([
          "CLOSESPINNER"
      ]),
      goTo (id) {
        this.$router.push("/detail?id="+id)
      }
    },
    components: {
      "sonoHeader":header,
      swiper,
      swiperSlide,
      bottom,
      item,
      baseScroll
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .swiper-container{
    height: 3.3rem;
    width: 100%;
    overflow: hidden;
    background-color: #333;
    .swiper-slide{
      background-size: cover;
      background-position: center;
      .event{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top:0;
        z-index: 100;
      }
      img{
        position: absolute;
        height: 100%;
        top:0;
        left: 50%;
        transform: translateX(-50%);
      }
      .swiper-lazy-preloader{
        z-index: -1;
      }
    }
    .swiper-pagination-bullet{
      width: 0.18rem;
      height: 0.18rem;
      background-color: rgba(0,0,0,0.5);
    }

    .swiper-pagination-bullet-active{
      background-color: #b6e429;
    }
  }
  .index{
    .content{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      top:1rem;
    }
    .listCon{
      position: relative;
      border-bottom: 0.1rem solid #91bb35;
      overflow: hidden;
      .title{
        font-size: 0.32rem;
        line-height: 0.6rem;
        color: #343434;
        text-align: center;
      }
      .line{
        position: absolute;
        width: 1px;
        height: 100%;
        left: 50%;
        transform: translateX(-50%);
        top:0.6rem;
        border-left: 1px solid #d9d9d9;
      }
      ul{
        font-size: 0;
        border-top: 1px solid #d9d9d9;
      }
    }
    .toAll{
      margin: 0 0.3rem;
      height: 0.5rem;
      line-height: 0.5rem;
      background-color: #91bb35;
      border-radius: 4px;
      display: block;
      color: #fff;
      font-size: 0.3rem;
      text-align: center;
      box-sizing: border-box;
      margin-top: 0.3rem;
    }
  }
  .tips {
    padding: 0.3rem 0 0.2rem;
    text-align: center;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet{
    margin: 0 0.05rem;
  }
  .swiper-container .swiper-slide .swiper-lazy-preloader{
    opacity: 0;
  }
</style>
