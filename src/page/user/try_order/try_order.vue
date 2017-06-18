<template>
  <div class="try_order">
    <template v-if="!tryOrder.list||tryOrder.list.length==0">
      <p class="tips">暂无试用订单信息</p>
    </template>
    <sono-try :data="item" v-for="item in tryOrder.list" :key="item" :nowTime="tryOrder.now_time"></sono-try>
  </div>
</template>

<script type="text/ecmascript-6">
    import {mapState,mapMutations} from 'vuex'
    import sonoTry from '../../../components/try/try.vue'
    export default {
      created(){
        this.$nextTick(function () {
          this.CLOSESPINNER()
        })
      },
      activated(){
        this.CLOSESPINNER()
      },
      computed:mapState({
        tryOrder: function (state) {
          return state.tryOrder
        }
      }),
      components: {
        sonoTry
      },
      methods: {
        ...mapMutations([
          "CLOSESPINNER"
        ]),
      }
    }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .try_order{
    &.move-enter-active{
      transition: opacity 0.5s ease;
    }
    &.move-leave-active,&.move-enter{
      opacity: 0;
      /*transform: translateX(-100%);*/
    }
    .tips{
      text-align: center;
      margin-top: 0.3rem;
    }
  }
</style>
