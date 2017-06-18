<template>
  <div class="header">
    <a href="http://mp.weixin.qq.com/s/BZ7T_Oi526o53_450SNKTA" target="_blank"><div class="icon like"></div></a>
    <div class="center">
      <img src="./logo.png" alt="">
      <p>南北农产品 优选平台</p>
    </div>
    <router-link to="/info">
      <div class="icon info"><i v-if="ifInfo"></i></div>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        computed:{
            ifInfo:function () {
              return this.$store.state.user.message
            }
        }
    }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
.header{
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  height: 1rem;
  background-color: #91bb35;
  color: #fff;
  z-index:1000;
  box-shadow: 0 0 0.1rem #91bb35;
  display: flex;
  padding: 0 0.3rem;
  justify-content: space-between;
  align-items:center;
  left: 0;
  top:0;
  .icon{
    width: 0.32rem;
    height: 0.32rem;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    &.like{
      background-image: url(./like.png);
      background-size: 0.32rem auto;
    }
    &.info{
      background-image: url(./info.png);
      background-size: auto 0.32rem;
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
  }
  .center{
    height: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    img{
      width: 1.42rem;
    }
    p{
      font-size: 0.2rem;
      color: #181a1b;
      margin-top: 0.1rem;
    }
  }
}
</style>
