<template>
  <div class="goods_order" :style="{minHeight:minHeight+'px'}">
    <template v-if="!goodsOrder.list||goodsOrder.list.length==0">
      <p class="tips">暂无商品订单信息</p>
    </template>
    <transition-group name="slide" tag="div">
    <order :data="item" v-for="item in goodsOrder.list" :key="item"  :nowTime="goodsOrder.now_time"></order>
    </transition-group>
  </div>
</template>

<script type="text/ecmascript-6">
    import {mapState,mapMutations} from 'vuex'
    import order from '../../../components/order/order.vue'
    export default {
        props:['minHeight'],
        computed:mapState({
          goodsOrder: function (state) {
            return state.goodsOrder
          }
        }),
        activated () {
          this.CLOSESPINNER()
        },
        created(){
          this.$nextTick(function () {
            this.CLOSESPINNER()
          })
        },
        components: {
          order
        },
        methods: {
          ...mapMutations([
            "CLOSESPINNER"
          ]),
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .goods_order{
    &.move-enter-active{
      transition: opacity 0.5s ease;
    }
    &.move-leave-active,&.move-enter{
      opacity: 0;
    }
    .tips{
      text-align: center;
      margin-top: 0.3rem;
    }
  }
</style>
