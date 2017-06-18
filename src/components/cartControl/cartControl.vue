<template>
  <div class="cartControl">
    <img class="icon" src="./icon_sub.png" @click="sub" alt="">
    <span class="num">{{cartData.goods_number}}</span>
    <img class="icon" src="./icon_plus.png" @click="plus" alt="">
  </div>
</template>

<script type="text/ecmascript-6">
  import {editCart} from "../../service"
  export default {
    props: {
      cartData: {
        type: Object
      }
    },
    methods: {
      sub () {
        let _this = this
        if (this.cartData.goods_number > 1) {
            if(_this.cartData.id){
              editCart(_this.cartData.id, this.cartData.goods_number - 1, function () {
                _this.cartData.goods_number--
              })
            }else{
              _this.cartData.goods_number--
            }
        }
      },
      plus () {
        let _this = this
        if (this.cartData.goods_number < this.cartData.remained_number) {
          if(_this.cartData.id){
            editCart(_this.cartData.id, this.cartData.goods_number + 1, function () {
              _this.cartData.goods_number++
            })
          }else{
            _this.cartData.goods_number++
          }
        }
      }
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .cartControl {
    display: flex;
    height: 0.36rem;
    .icon {
      flex: 0 0 0.36rem;
      width: 0.36rem;
    }
    .num {
      display: inline-block;
      line-height: 0.36rem;
      background-color: #E9E9E9;
      margin: 0 0.04rem;
      min-width: 0.6rem;
      box-sizing: border-box;
      padding: 0 0.1rem;
      text-align: center;
    }
  }
</style>
