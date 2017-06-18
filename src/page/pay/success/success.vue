<template>
  <div class="success">
    <div class="con">
      <div class="text">支付成功</div>
      <img src="./logo.png" alt="">
      <p>sono.mobi</p>
      <router-link to="/user/goods_order" class="btn orderBtn" replace>查看订单</router-link>
      <router-link to="/user/goods_order" class="btn" replace>查看商品</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        created () {
            let _this = this
            this.$nextTick(function () {
              _this.$store.commit("CLOSESPINNER")
            })
        }
    }
</script>

<style type="text/less" lang="less" rel="stylesheet/less">
.success{
  position: fixed;
  left: 0;
  top:0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  .con{
    position: absolute;
    width: 100%;
    top:1rem;
    left: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    .text{
      font-size: 0.3rem;
      font-weight: bold;
      color: #000;
      line-height: 1em;
      margin-bottom: 0.2rem;
    }
    img{
      width: 1.04rem;
      display: block;
      margin: 0 auto;
    }
    p{
      font-size: 0.28rem;
      color: #699a24;
      font-weight: bold;
      line-height: 1em;
      margin-bottom: 0.3rem;
    }
    .btn{
      width: 2.6rem;
      margin:0 auto 0.3rem;
      border-radius: 0.25rem;
      height: 0.5rem;
      border: 1px solid #989898;
      color: #989898;
      line-height: 0.5rem;
      box-sizing: border-box;
      &.orderBtn{
        background-color: #ff434c;
        color: #fff;
        border: none;
      }
    }
  }
}
</style>
