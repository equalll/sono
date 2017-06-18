<template>
  <div class="swiperCon" @click="closeSwiper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="item in swiperData" :key="item" :data-background="item" class="swiper-lazy">
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState,mapMutations} from "vuex"
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    computed:{
      ...mapState({
        swiperData: (state) =>{
          return state.swiperData.list
        },
        swiperOption:(state)=>{
          return   {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            lazyLoading : true,
            initialSlide:state.swiperData.initialSlide
          }
        }
      })
    },
    methods:{
      ...mapMutations([
          "ClOSESWIPER"
      ]),
      closeSwiper(){
        this.ClOSESWIPER()
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .swiperCon {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter:blur(10px);
    &.fade-enter-active, &.fade-leave-active {
      transition: opacity .5s
    }
    &.fade-enter, &.fade-leave-active {
      opacity: 0
    }
    .swiper-container{
      height: 100%;
      .swiper-slide{
        height: 100%;
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
</style>
