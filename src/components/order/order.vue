<template>
  <div class="order" @click="toDetail(data.good_id)">
    <div class="base">
      <span class="num">订单号：{{data.order_sn}}</span>
      <span class="status">{{status[data.order_status-1]}}</span>
    </div>
    <div class="description">
      <div class="name">
          <span class="goods">商品：{{data.good_name}}</span>

          <span v-if="data.order_status=='5'||data.order_status=='4'" class="btn" @click.stop="toDiscuss(data)">写点评</span>
          <span @click.stop="toPay(data.id)" class="btn" v-else-if="data.order_status=='1'">去支付</span>
      </div>
      <div class="box">
        <!--<div v-for="item in data.ordergoods" class="picBox" v-lazy:background-image="item.product_img"></div>-->
        <div class="picBox" v-lazy:background-image="data.good_img"></div>
        <div class="desc">
          <div class="time">下单时间：{{formatTime(data.create_time,nowTime)}}</div>
          <div class="price">合计：<span style="color: #ff434c">{{data.order_amount}}</span></div>
          <div class="group" v-if="data.order_status=='4'||data.order_status=='5'||data.order_status=='6'">
            <div @click.stop="openDesc('1',data.id)" class="btn_logistics">查看物流信息</div>
            <div @click.stop="openBill" class="bill">开具发票</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from "vuex"
    //1未支付,2已取消,3待发货,4已发货,5待评价,6已完成
    export default {
        data () {
            return{
                status:[
                    "未支付","已取消","待发货","已发货","待评价","已完成"
                ]
            }
        },
        props:{
            data:{},
            nowTime:{
                default:new Date().getTime()
            }
        },
        computed:{
        },
        methods:{
          ...mapMutations(["SETDISCUSSDATA","OPENBILL"]),
          formatDate (s) {
            let date = new Date(s);
            let y = date.getFullYear()+ 1<10?'0'+date.getFullYear():date.getFullYear();
            let m = date.getMonth() + 1<10?'0'+date.getMonth():date.getMonth();
            let d = date.getDate() + 1<10?'0'+date.getDate():date.getDate();
            let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            let min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            return y+"-"+m+"-"+d+"  "+h+":"+min;
          },
          formatTime (a,n){
            let _this = this;
            let add = parseInt(a)*1000;
            let now = parseInt(n)*1000;
            if(now - add>24*60*60*1000){//超过24小时
              return this.formatDate(add);
            }else if(now - add>60*60*1000){//超过1小时
              return parseInt((now-add)/(60*60*1000))+"小时前"
            }else if(now - add>60*1000){//超过一分钟
              return parseInt((now-add)/(60*1000))+"分钟前"
            }else{
              return parseInt((now-add)/1000)+"秒前"
            }
          },
          toDiscuss (data){
              let o = {
                  id:data.id,
                  good_id:data.good_id,
                  name:data.good_name,
                  img:data.good_img,
                  type:1
              }
              this.SETDISCUSSDATA(o)
              this.$router.push("/discuss")
          },
          toDetail(id){
//            this.$router.push("/detail?id="+id)
          },
          toPay(id){
            this.$router.push("/pay?id="+id)
          },
          openBill(){
              this.OPENBILL()
          },
          openDesc(type,id){
            this.$router.push("/desc?type="+type+"&id="+id)
          }
        }
    }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
.order{
  padding: 0.2rem 0.3rem;
  color: #262626;
  background-color: #fff;
  margin-bottom: 0.1rem;
  &.slide-enter-active, &.slide-leave-active {
    transform: translateY(0);
    transition: transform 1s ease;
  }
  &.slide-enter, &.slide-leave-active {
    opacity: 0;
    transform: translateY(30px);
  }
  .base{
    line-height: 1em;
    padding-bottom: 0.1rem ;
    font-size: 0.2rem;
    border-bottom: 1px solid #aaa;
    margin-bottom: 0.24rem;
    color: #0b0b0b;
    font-weight: 700;
    .status{
      float: right;
    }
  }
  .description{
    .name{
      font-size: 0.24rem;
      height: 0.36rem;
      line-height: 0.36rem;
      display: flex;
      .goods{
        flex: 1;
      }
      .btn{
        display: inline-block;
        width: 1.16rem;
        flex: 0 0 1.16rem;
        color: #fff;
        background-color: #ff434c;
        text-align: center;
        font-size: 10px;
      }
    }
    .box{
      display: flex;
      align-content:flex-start;
      overflow: hidden;
      flex-wrap:wrap;
      width: 100%;
      .picBox{
        display: inline-block;
        flex: 0 0 1.2rem;
        height: 1.2rem;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        margin-right: 0.2rem;
        margin-top: 0.2rem;
        background-color: #ebebeb;
        background-image: url(http://sonotemp.b0.upaiyun.com/sono2.0/static/images/default.jpg);
        &[lazy=loading]{
          background-image: url(http://sonotemp.b0.upaiyun.com/sono2.0/static/images/default.jpg);
        }
        &[lazy=error]{
          background-image: url(http://sonotemp.b0.upaiyun.com/sono2.0/static/images/default.jpg);
        }
      }
      .desc{
        flex: 1;
        padding-top: 0.2rem;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
        .time{
          color: #8d8d8d;
          line-height: 1em;
          margin-top: 0.1rem;
          font-size: 0.2rem;
        }
        .price{
          font-size: 0.24rem;
        }
        .group{
          display: flex;
          flex-direction: row;
          height: 0.36rem;
        line-height:0.36rem;
          .btn_logistics{
            color: #ff434c;
            width: 1.56rem;
            height: 0.36rem;
            font-size: 10px;
            text-align: center;
            line-height: 0.36rem;
            box-sizing: border-box;
            border: 1px solid #aaaaaa;
          }
          .bill{
            font-size: 10px;
            color: #ff434c;
            padding: 0 0.2rem;
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
