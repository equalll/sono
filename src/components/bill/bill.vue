<template>
  <div class="bill_cover" @click="closeBill">
    <img @click.stop src="http://sonotemp.b0.upaiyun.com/sono2.0/static/img/code.jpg" alt="">
    <p>扫码<br>加客服开票</p>
    <!--<a href="#" @click.stop>开票类型和范围&gt;</a>-->
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        methods:{
          closeBill () {
            this.$store.commit("CLOSEBILL")
          }
        }
    }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
.bill_cover{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top:0;
  z-index: 10000;
  background-color: rgba(0,0,0,0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  &.fade-enter-active, &.fade-leave-active {
    transition: opacity .5s
  }
  &.fade-enter, &.fade-leave-active {
   opacity: 0
  }
  img{
    width: 4.3rem;
    display: block;
    margin: 0 auto 0.2rem;
  }
  p{
    color: #fff;
    font-size: 0.3rem;
    line-height: 1.6em;
    margin-bottom: 0.5rem;
  }
  a{
    text-decoration: underline;
    color: #ffcc33;
  }
}
</style>
