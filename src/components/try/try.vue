<template>
  <div class="tryCon">
    <div class="base">
      <span class="num">订单号：{{data.order.order_sn}}</span>
      <span class="status">{{data.order.status_name}}</span>
    </div>
    <div class="description">
      <div class="name">
        <span class="goods">商品：{{data.order.good_name}}</span>
        <router-link to="/discuss" v-if="data.order.status=='1'||data.order.status=='3'">
          <span class="btn" >写点评</span>
        </router-link>
      </div>
      <div class="box">
        <!--<div v-for="item in data.ordergoods" class="picBox" v-lazy:background-image="item.product_img"></div>-->
        <div class="picBox" v-lazy:background-image="data.order.good_img"></div>
        <div class="desc">
          <div class="time">下单时间：{{formatTime(data.order.create_time,nowTime)}}</div>
          <div v-if="data.order.order_status=='4'||data.order.order_status=='3'" class="btn_logistics" @click.stop="openDesc('2',data.order.order_sn)" >查看物流信息</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return{
        status:[
          "待审核","待评价","审核不通过","已发货","已评价"
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
    created(){
        console.log(this.data)
    },
    methods:{
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
      openDesc(type,sn){
        window.localStorage.setItem("descTitle",this.data.order.good_name);
        this.$router.push("/desc?type="+type+"&sn="+sn)
      }
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .tryCon{
    padding: 0.2rem 0.3rem;
    color: #262626;
    background-color: #fff;
    margin-bottom: 0.1rem;
    .base{
      line-height: 1em;
      padding-bottom: 0.1rem ;
      font-size: 0.2rem;
      border-bottom: 1px solid #aaa;
      margin-bottom: 0.2rem;
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
          word-break: break-all;
        }
        .btn{
          display: inline-block;
          width: 1.16rem;
          flex: 0 0 1.16rem;
          color: #fff;
          background-color: #ff434c;
          text-align: center;
          font-size:0.2rem;
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
          .btn_logistics{
            color: #ff434c;
            width: 1.56rem;
            height: 0.36rem;
            font-size: 0.2rem;
            text-align: center;
            line-height: 0.36rem;
            border: 1px solid #aaaaaa;
          }
        }
      }
    }
  }
</style>
