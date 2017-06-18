<template>
  <div class="tryList mainContent">
    <div class="title">我的试用中心</div>
    <div class="scrollCon" ref="tryList">
      <p v-if="tryListData.list.length==0" class="tips">暂无试用信息</p>
      <sono-scroll v-show="tryListData.list.length>0" :minHeight="minHeight" :noMore="noMore" @loadMore="loadMore" ref="scroll">
        <ul>
          <li v-for="item in tryListData.list">
            <div class="time">{{getTime(item.order.create_time)}}</div>
            <div class="con" v-lazy:background-image="item.order.good_img">
              <div class="status" v-if="tryListData.now_time-item.activ.end_time>0">已结束</div>
              <div class="status red" v-else>进行中</div>
              <div class="name">{{item.order.good_name}}</div>
              <div class="result" :class="resultClass[item.status]">
                {{result[item.status]}}
              </div>
            </div>
          </li>
        </ul>
      </sono-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  //1 未支付  2已取消  3
  import Vue from 'vue'
  import BScroll from "better-scroll"
  import {getFreeList} from "../../service"
  import scroll from '../../components/scroll/scroll.vue'
  export default {
    data () {
        return {
            page:1,
            num:8,
            minHeight:0,
            tryListData:{
                list:[]
            },
            result:['试用资格审核中……','通过审核，等待发货','未通过','写点评','已点评 任务完成'],
            resultClass:["","",'btn fail','btn','green'],
            noMore:false
        }
    },
    created () {
      let _this = this
      _this.$nextTick(function () {
        _this.$store.commit("CLOSESPINNER");
        _this.minHeight = _this.$refs.tryList.getBoundingClientRect().height
      })
    },
    components:{
        "sono-scroll":scroll
    },
    methods:{
      getTime (d) {
          return new Date(parseInt(d) * 1000).toLocaleString()
      },
      loadMore(){
        let _this = this
        getFreeList(_this.page,_this.num,function (d) {
          if(d.list.length<_this.num){
            _this.noMore = true;
            _this.$refs.scroll.pullText = "无更多内容"
            _this.$refs.scroll.$refs.pullUp.className = '';
          }
          _this.tryListData.list = _this.tryListData.list.concat(d.list)
          _this.page++;
        })
      }
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .tryList {
    background-color: #eeee;
    .title{
      position: absolute;
      width: 100%;
      left: 0;
      top:0;
      z-index: 100;
      background-color: #ddd;
      height: 0.5rem;
      line-height: 0.5rem;
      color: #262626;
      text-align: center;
      /*margin-bottom: 0.05rem;*/
    }
    .scrollCon{
      position: absolute;
      top: 0.5rem;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
      .scroll-container .content{
        background:none;
      }
    }
    ul{
      li{
        a{
          display: block;
        }
        background-color: #fff;
        padding: 0.2rem 0.3rem;
        margin-bottom: 0.1rem;
        .time{
          text-align: center;
          color: #000;
          line-height: 1em;
          font-size: 0.2rem;
          margin-bottom: 0.1rem;
        }
        .con {
          height: 2.25rem;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          background-image: url(/static/images/default.jpg);
          background-color: #ebebeb;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 10;
          color: #fff;
          text-align: center;
          font-size: 0.2rem;
          .status{
            margin-bottom: 0.2rem;
            &.red{
              color: #ff434c;
            }
          }
          .name{
            margin-bottom: 0.2rem;
            font-size: 0.24rem;
          }
          .result{
            font-size: 0.2rem;
            &.green{
              color: #8db610;
            }
            &.btn{
              line-height: 0.4rem;
              width: 1.8rem;
              padding: 0 0.2rem;
              box-sizing: border-box;
              background-color: #ff434c;
              border-radius: 0.2rem;
              margin: 0 auto;
              &.fail{
                background-color: #000;
              }
            }
          }
          &[lazy=loading]{
            background-image: url(/static/images/default.jpg);
          }
          &[lazy=error]{
            background-image: url(/static/images/default.jpg);
          }
          &:after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top:0;
            background-color: rgba(0,0,0,0.6);
            backdrop-filter:blur(2px);
            z-index: -1;
          }
        }
      }
    }
  }
</style>
