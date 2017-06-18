<template>
  <div class="addressList mainContent">
    <div class="title">
      地址列表
    </div>
    <base-scroll>
      <sono-address></sono-address>
    </base-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import address from "../../components/address/address.vue"
  import baseScroll from "../../components/baseScroll/baseScroll.vue"
  export default {
    components: {
      "sono-address": address,
      "base-scroll":baseScroll
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .addressList {
    .title {
      background-color: #ebebeb;
      height: 0.5rem;
      line-height: 0.5rem;
      color: #262626;
      text-align: center;
      margin-bottom: 0.05rem;
      position: relative;
      z-index: 100;
    }
    .content {
      position: absolute;
      left: 0;
      right: 0;
      top: 0.55rem;
      z-index: 10;
      bottom: 0;
      .list ul li .flex .default {
        display: none
      }
    }
  }
</style>
