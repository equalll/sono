<template>
  <div class="reserve mainContent">
    <sonoHeader></sonoHeader>
    <base-scroll>
      <div class="title">
        <h1>{{bookData.title}}</h1>
        <p>¥ {{bookData.prize}}</p>
      </div>
      <book :id="bookData.id"></book>
      <bottom></bottom>
    </base-scroll>
  </div>

</template>

<script type="text/ecmascript-6">
  import header from "../../components/header/header.vue"
  import baseScroll from "../../components/baseScroll/baseScroll.vue"
  import book from "../../components/book/book.vue"
  import bottom from '../../components/bottom/bottom.vue'
  import wx from 'weixin-js-sdk'

  export default {
    components: {
      "sonoHeader": header,
      baseScroll,
      book,
      bottom
    },
    created () {
      let _this = this
      let shareData = {}
      this.$nextTick(function () {
        this.$store.commit("CLOSESPINNER")
        shareData = {
          title:_this.bookData.title,
          desc: "南屋北舍是一群有着不同职业，但对于南北农产品有着自己想法的吃货们组成的团队。",
          link: "http://test.www.sono.mobi/detail?id="+_this.bookData.id,
          imgUrl: _this.bookData.thumb
        };
        wx.ready(function () {
          wx.onMenuShareAppMessage(shareData);
          wx.onMenuShareTimeline(shareData);
        });
      })
    },
    computed:{
      bookData(){
          return this.$store.state.bookData;
      }
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
.reserve{
  .base-scroll .box{
    background-color: #F4F4F4;
  }
  .content {
    position: absolute;
    left: 0;
    top:1rem;
    right: 0;
    bottom: 0;
    .title {
      padding: 0.5rem 0.3rem;
      text-align: center;
      font-size: 0.3rem;
      line-height: 1em;
      background-color: #fff;
      margin-bottom: 0.1rem;
    h1 {
      color: #333333;
      margin-bottom: 0.2rem;
    }
    p {
      color: #b4282d;
    }
    }
  }
}
</style>
