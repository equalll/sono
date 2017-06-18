<template>
  <div class="info mainContent">
    <div class="title">
      通知
    </div>
    <div class="scrollCon" ref="info">
      <p v-if="infoData.length==0" class="tips">暂无信息</p>
      <sono-scroll v-show="infoData.length>0" ref="scroll" :noMore="noMore" :minHeight="minHeight" @loadMore="loadMore">
        <transition-group name="slide" tag="ul">
          <li v-for="(item,index) in infoData" :key="item.id" @click="readMessage(item.id,index,item.type,item.order_sn,item.title)">
            <div class="icon" :class="{'try':item.type=='3'}">
              <i v-if="item.read_mark=='1'">1</i>
            </div>
            <div class="desc">
              <h1>
                {{type[item.type-1]}}<span>{{formatDate(item.create_time)}}</span>
              </h1>
              <p>{{item.content}}</p>
            </div>
          </li>
        </transition-group>
      </sono-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import scroll from '../../components/scroll/scroll.vue'
  import {getMessageList,messageRead,getUserInfo} from "../../service"
  import Vue from "vue"
  export default {
      //type 1物流通知 2试用物流通知  3试用通知
    data () {
      return {
        minHeight: 0,
        page: 1,
        num:10,
        type:["物流通知","物流通知","试用通知"],
        infoData:[],
        noMore:false
      }
    },
    components: {
      "sono-scroll": scroll
    },
    created(){
      let _this = this
      _this.$nextTick(function () {
        _this.$store.commit("CLOSESPINNER");
        _this.minHeight = _this.$refs.info.getBoundingClientRect().height
      })
    },
    methods:{
      loadMore () {
        let _this = this
        getMessageList(this.page,this.num,function (d) {
          if(d.length<_this.num){
            _this.noMore = true;
            _this.$refs.scroll.$refs.pullUp.className = '';
            _this.$refs.scroll.$refs.pullUp.querySelector('.pullUpLabel').innerHTML = "无更多内容";
          }
          _this.page+=1;
          _this.infoData = _this.infoData.concat(d)
        })
      },
      formatDate(s){
        let date = new Date(parseInt(s) * 1000);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return y + "-" + m + "-" + d + "  " + h + ":" + min;
      },
      readMessage(id,index,type,sn,s){
        let _this = this
        if(_this.infoData[index].read_mark=='2'){
          if(type=='3'){return}
          _this.$router.push("/desc?type="+type+"&sn="+sn)
          if(type=='2'){
            window.localStorage.setItem("descTitle",s);
          }
        }else{
          messageRead(id,function () {
            Vue.set(_this.infoData[index],"read_mark",2)
            getUserInfo(function (d) {
              _this.$store.commit('SETUSER',d);
            })
            if(type=='3'){return}
            _this.$router.push("/desc?type="+type+"&sn="+sn)
            if(type=='2'){
              window.localStorage.setItem("descTitle",s);
            }
          })
        }
      }
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .info {
    .title {
      position: absolute;
      box-sizing: border-box;
      width: 100%;
      z-index: 1000;
      top: 0;
      background-color: #ebebeb;
      height: 0.5rem;
      line-height: 0.5rem;
      color: #262626;
      text-align: center;
      padding: 0 0.3rem;
    }
    .scrollCon{
      position: absolute;
      left: 0;
      top: 0.5rem;
      right: 0;
      bottom: 0;
      ul{
        margin: 0 0.3rem;
      }
      li{
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 0.3rem 0 0.2rem;
        border-bottom: 1px solid #aaa;
        .icon{
          width: 0.8rem;
          height: 0.8rem;
          flex: 0 0 0.8rem;
          margin-right: 0.3rem;
          background-color: #84bb44;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% 100%;
          background-image: url(./icon_logistics.png);
          position: relative;
          i{
            width: 0.28rem;
            height: 0.28rem;
            line-height: 0.28rem;
            border: 1px solid #fff;
            border-radius: 50%;
            background-color: #ff434c;
            box-sizing: border-box;
            position: absolute;
            right: -0.1rem;
            top:-0.1rem;
            font-size: 0.2rem;
            color: #fff;
            text-align: center;
            font-style: normal;
          }
          &.try{
            background-color: #ffaf32;
            background-image: url(./icon_try.png);
          }
        }
        .desc{
          flex: 1;
          display: flex;
          justify-content: space-around;
          flex-direction: column;
          overflow: hidden;
          h1{
            font-size: 0.2rem;
            color: #262626;
            span{
              float: right;
              color: #969696;
              font-size: 0.2rem;
            }
          }
          p{
            width: 100%;
            font-size: 0.2rem ;
            color: #969696;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
</style>
