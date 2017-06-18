<template>
  <div class="goodsDetail">
    <div class="title">
      <h1>{{goodsData.title}}</h1>
      <p>¥ {{goodsData.prize}}</p>
    </div>
    <!--<book :id="goodsData.good_id" v-if="goodsData.remained_number=='0'"></book>-->
    <div class="imgCon" v-html="goodsData.content">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import book from "../book/book.vue"
  export default {
    props: {
      goodsData: {
        type: Object
      }
    },
    created () {
      let _this = this
      this.$nextTick(function () {
        _this.$emit("refreshScroll")
      })
    },
    components: {
      book
    },
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .goodsDetail {
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
    .imgCon {
      width: 100%;
      background-color: #ffffff;
      min-height: 1rem;
      img {
        width: 100%;
        display: block;
      }
    }
  }
</style>
