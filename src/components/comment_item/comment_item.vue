<template>
  <div class="comment_item">
    <div class="left">
      <img :src="data.head_img" alt="">
      <div class="name">{{data.user_name}}</div>
      <div class="label">{{data.user_tag}}</div>
    </div>
    <div class="right">
      <div class="info">
        <span class="score">{{data.comment_rank}}</span>分
        <span class="time">
          <img src="http://sonotemp.b0.upaiyun.com/sono2.0/static/images/icon_clock.png" alt="">
          {{fromTime(data.add_time,data.now_time)}}
        </span>
      </div>
      <div class="text">
        <fold-text :content="data.content"></fold-text>
      </div>
      <div class="imgList">
        <div class="pic" @click="openSwiper(index)" v-for="(item,index) in data.image" v-lazy:background-image="item">
        </div>

      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import foldText from "../../components/fold_text/fold_text.vue"
  import {mapMutations} from "vuex"
  export default {
    props: {
      data: {
        type: Object
      }
    },
    created () {
    },
    components:{
      foldText
    },
    methods: {
      ...mapMutations([
        'OPENSWIPER'
      ]),
      openSwiper (index){
        let swiperData = new Object();
        swiperData.initialSlide = index;
        swiperData.list = []
        for(let i in this.data.image){
          swiperData.list.push(this.data.image[i])
        }
        this.OPENSWIPER(swiperData)
      },
      formatDate(s){
        let date = new Date(s);
        let y = date.getFullYear()+ 1<10?'0'+date.getFullYear():date.getFullYear();
        let m = date.getMonth() + 1<10?'0'+date.getMonth():date.getMonth();
        let d = date.getDate() + 1<10?'0'+date.getDate():date.getDate();
        let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return y + "-" + m + "-" + d + "  " + h + ":" + min;
      },
      fromTime(a, n){
        let add = parseInt(a) * 1000;
        let now = parseInt(n) * 1000;
        if (now - add > 24 * 60 * 60 * 1000) {//超过24小时
          return this.formatDate(add);
        } else if (now - add > 60 * 60 * 1000) {//超过1小时
          return parseInt((now - add) / (60 * 60 * 1000)) + "小时前"
        } else if (now - add > 60 * 1000) {//超过一分钟
          return parseInt((now - add) / (60 * 1000)) + "分钟前"
        } else {
          return parseInt((now - add) / 1000) + "秒前"
        }
      }
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .comment_item {
    padding: 0.2rem 0;
    min-height: 1.5rem;
    border-bottom: 1px solid #aaa;
    display: flex;
    &.slide-enter-active, &.slide-leave-active {
      transform: translateY(0);
      transition: transform 1s ease;
    }
    &.slide-enter, &.slide-leave-active {
      opacity: 0;
      transform: translateY(30px);
    }
    .left {
      width: 1rem;
      flex: 0 0 1rem;
      margin-right: 0.2rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      img {
        display: block;
        width: 0.8rem;
        border-radius: 50%;
        height: 0.8rem;
        margin: 0 auto 0.05rem;
      }
      .name {
        line-height: 0.4rem;
        height: 0.4rem;
        font-size: 0.2rem;
        border-radius: 0.2rem;
        white-space: nowrap;
        overflow: hidden;
        box-sizing: border-box;
        padding: 0 0.1rem;
        text-overflow: ellipsis;
        background-color: #ff434c;
        color: #fff;
        text-align: center;
        margin-bottom: 0.05rem;
      }
      .label {
        text-align: center;
        color: #ff434c;
        font-size: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1em;
      }
    }
    .right {
      flex: 1;
      font-size: 0.2rem;
      .info {
        margin-bottom: 0.1rem;
        .score {
          font-size: 0.3rem;
          color: #ff434c;
          font-weight: bold;
          display: inline-block;
          margin-right: 0.05rem;
        }
        .time {
          float: right;
          font-size: 0.2rem;
          line-height: 0.22rem;
          img {
            width: 0.22rem;
            vertical-align: top;
          }
        }
      }
      .text {
        font-size: 0.2rem;
        line-height: 1.4em;
        .more {
          text-decoration: underline;
          white-space: nowrap;
        }
      }
      .imgList {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .pic {
          width: 1.2rem;
          height: 1.2rem;
          margin: 0.2rem 0.2rem 0 0;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-color: #ebebeb;
          background-image: url(http://sonotemp.b0.upaiyun.com/sono2.0/static/images/default.jpg);
        }
      }
    }
  }
</style>
