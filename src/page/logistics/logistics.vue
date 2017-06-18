<template>
  <div class="logistics mainContent">
    <div class="title">物流通知</div>
    <div class="scrollContent" ref="logistics">
      <p v-if="wuliuData.length==0" class="tips">暂无物流信息</p>
      <sono-scroll v-show="wuliuData.length>0" :minHeight="minHeight" :noMore="noMore" @loadMore="loadMore" ref="scroll">
        <ul>
          <li v-for="item in wuliuData" @click="forDetail(item.type,item.order_sn,item.title)">
            <p>{{formatDate(item.create_time)}}</p>
            <div class="con">
              <div class="base">
                <span>您购买的:{{item.title}}</span>
                <span>{{stateText[item.read_mark]}}</span>
              </div>
              <div class="desc">
                <span class="text">
                  {{item.content}}
                </span>
                <span class="icon"></span>
              </div>
            </div>
          </li>
        </ul>
      </sono-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import scroll from '../../components/scroll/scroll.vue'
  import BScroll from "better-scroll"
  import {getWuliuData} from "../../service"
  export default {
    data () {
      return {
        page: 1,
        num: 4,
        minHeight: 0,
        wuliuData:[],
        stateText:["","未读","已读"],
        noMore:false
      }
    },
    created () {
      let _this = this
      _this.$nextTick(function () {
        _this.minHeight = _this.$refs.logistics.getBoundingClientRect().height;
        _this.$store.commit("CLOSESPINNER")
      })
//      getWuliuData(_this.page,_this.num,function (d) {
//        _this.page+=1;
//        _this.wuliuData = d
//        _this.$nextTick(function () {
//          _this.minHeight = _this.$refs.logistics.getBoundingClientRect().height;
//          _this.$store.commit("CLOSESPINNER")
//        })
//      })
    },
    components: {
      "sono-scroll": scroll
    },
    methods: {
      formatDate(s){
        let date = new Date(parseInt(s) * 1000);
        let y = date.getFullYear()+ 1<10?'0'+date.getFullYear():date.getFullYear();
        let m = date.getMonth() + 1<10?'0'+date.getMonth():date.getMonth();
        let d = date.getDate() + 1<10?'0'+date.getDate():date.getDate();
        let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return y + "-" + m + "-" + d + "  " + h + ":" + min;
      },
      loadMore(){
        let _this = this
        getWuliuData(_this.page,_this.num,function (d) {
          if(d.length<_this.num){
              _this.noMore = true
            _this.$refs.scroll.$refs.pullUp.className = '';
            _this.$refs.scroll.$refs.pullUp.querySelector('.pullUpLabel').innerHTML = "无更多内容";
          }
          _this.page+=1;
          _this.wuliuData = _this.wuliuData.concat(d)
        })
      },
      forDetail(type,sn,s){
        this.$router.push("/desc?type="+type+"&sn="+sn)
        if(type=='2'){
          window.localStorage.setItem("descTitle",s);
        }
      }
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .logistics {
    .title {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      top: 0;
      background-color: #ebebeb;
      height: 0.5rem;
      line-height: 0.5rem;
      color: #262626;
      text-align: center;
      padding: 0 0.3rem;
      z-index: 200;
    }
    .scrollContent {
      position: fixed;
      left: 0;
      bottom: 0.8rem;
      right: 0;
      top: 0.5rem;
      ul {
        padding: 0 0.3rem;
        li {
          margin-bottom: 0.3rem;
          p {
            text-align: center;
            line-height: 2em;
            font-size: 0.24rem;
            color: #969696;
          }
          .con {
            background-color: #F5F5F5;
            padding: 0.2rem 0.2rem;
            .base {
              font-size: 0.24rem;
              color: #252525;
              margin-bottom: 0.2rem;
              display: flex;
              justify-content: space-between;
            }
            .desc{
              display: flex;
              align-items:flex-end;
              .text{
                flex: 1;
                color: #969696;
                line-height: 1.2em;
              }
              .icon{
                width: 0.3rem;
                height: 0.3rem;
                background-image: url(./icon_go.png);
                background-position: right bottom;
                flex: 0 0 0.3rem;
                background-repeat: no-repeat;
                background-size: 0.16rem auto;
              }
            }
          }
        }
      }
    }
  }
</style>
