<template>
  <div class="pop">
    <p v-html="popText"></p>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from "vuex"
  export default {
      computed:{
        ...mapState({
          popText:state=>state.pop.text
        })
      },
      created (){
          let _this = this
          this.$nextTick(function () {

          })
      }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .pop {
    position: fixed;
    z-index: 200000;
    left: 50%;
    top: 50%;
    font-size: 0.24rem;
    color: #fff;
    padding: 0.4rem 0.3rem;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
    -webkit-transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.8);
    white-space: nowrap;
    line-height: 1.6em;
    &.fade-enter-active, &.fade-leave-active {
      transition: opacity .5s
    }
    &.fade-enter, &.fade-leave-active {
      opacity: 0
    }
  }
</style>
