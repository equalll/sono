<template>
  <div class="descCon mainContent">
    <div class="title">订单追踪</div>
    <div class="con">
      <p class="">订单：{{title}}</p>
      <ul>
        <li v-for="item in descData">
          <p>承运：{{item.name}}</p>
          <p>快递单号：{{item.number}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {freeDetail, orderDetail} from "../../service"
  export default {
    data () {
      return {
        title:"",
        descData: []
      }
    },
    created () {
      let _this = this
      let type = this.$router.currentRoute.query.type
      let id = this.$router.currentRoute.query.id
      let sn = this.$router.currentRoute.query.sn

      if (type == '1') {//商品
        let o = {};
        if (id) {
          o.id = id
        } else {
          o.sn = sn
        }
        orderDetail(o, function (d) {
          _this.descData = d.orderUser.express_info
          _this.title = d.orderGood[0].good_name
        })
      } else if (type == '2') {//试用
        let o = {};
        if (id) {
          o.id = id
        } else {
          o.sn = sn
        }
        freeDetail(o,function (d) {
          _this.title = window.localStorage.getItem("descTitle")
          _this.descData = d.orderUser.express_info
        })
      }
      _this.$nextTick(function () {
        _this.$store.commit("CLOSESPINNER")
      })
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
.descCon{
  overflow: auto;
  overflow-scrolling: touch;
  -webkit-overflow-scrolling: touch;
  .title {
    width: 100%;
    background-color: #ebebeb;
    height: 0.5rem;
    line-height: 0.5rem;
    color: #262626;
    text-align: center;
    margin-bottom: 0.05rem;
  }
  .con{
    padding: 0.2rem 0.3rem;
    line-height: 1.5em;
  }
}
</style>
