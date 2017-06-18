<template>
  <div class="select mainContent">
    <sonoHeader></sonoHeader>
    <div class="content" ref="select">
      <div class="box">
        <div class="current">
          <transition-group name="slide" tag="ul">
            <li v-for="item in selectData.now" :key="item">
              <router-link :to="{path:'/detail',query:{id:item.id}}">
                <div v-lazy:background-image="item.image" class="box">
                  <img :src="item.type==1?'http://www.sono.mobi/vue/static/images/label_sale.png':'http://www.sono.mobi/vue/static/images/label_try.png'" class="label" alt="">
                  <div class="info">已售<br>{{item.num}}份</div>
                </div>
                <div class="text">
                  <h1>{{item.title}}</h1>
                  <p>{{item.introduce}}</p>
                </div>
              </router-link>
            </li>
          </transition-group>
        </div>
        <div v-if="selectData.old&&selectData.old.length>0" class="back">
          <div class="title">
            <span class="line"></span>
            <span class="text">往期回顾</span>
            <span class="line"></span>
          </div>
          <transition-group name="slide" tag="ul">
            <li v-for="item in selectData.old" :key="item">
              <router-link :to="{path:'/detail',jquery:{id:item.id}}">
                <div class="box" :style="{backgroundImage: 'url('+item.image+')'}">
                  <img :src="item.type==1?'/static/images/label_sale.png':'/static/images/label_try.png'" class="label" alt="">
                  <div class="name">{{item.title}}</div>
                  <div class="info" v-if="item.num==1" style="line-height: 0.576rem">
                    售罄
                  </div>
                  <div class="info" v-else>
                    已售<br>{{item.num}}份
                  </div>
                </div>
              </router-link>
            </li>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from "../../components/header/header.vue"
  import BScroll from "better-scroll"
  import {getSelectData} from '../../service'
  export default {
    data (){
        return{
          selectData:{}
        }
    },
    created(){
      let _this = this
      getSelectData(1,5,function(data){
          console.log(data)
          _this.selectData = data.data
      })
      this.$nextTick(function () {
        this.scroll = new BScroll(this.$refs.select,{
          click:true,
          probeType:2
        })
        this.scroll.on("scroll",function () {
          if(_this.scroll.scrollerHeight<_this.scroll.scroller.getBoundingClientRect().height){
            _this.scroll.refresh()
          }
        })
        console.log(_this.scroll.maxScrollY)
      })

    },
    components: {
      "sonoHeader":header
    },
    methods: {
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
.select{
  background-color: #f4f4f4;
  .content{
    position: fixed;
    left: 0;
    top:1rem;
    right: 0;
    bottom: 0.8rem;
    .current{
      li{
        background-color: #fff;
        border-bottom: 1px solid #E9E9E9;
        margin-bottom: 0.2rem;
        &.slide-enter-active, &.slide-leave-active {
          transform: translateY(0);
          transition: all 1s ease;
        }
        &.slide-enter, &.slide-leave-active {
          opacity: 0;
          transform: translateY(10px);
        }
        a{
          display: block;
          .box{
            position: relative;
            height: 2.2rem;
            background-size: cover;
            background-position: center;
            background-image: url(/static/images/select_default.jpg);
            &[lazy=loading]{
              background-image: url(/static/images/select_default.jpg);
            }
            &[lazy=error]{
              background-image: url(/static/images/select_default.jpg);
            }
            .label{
              position: absolute;
              width: 0.84rem;
              left: 0.3rem;
              top: 0.3rem;
            }
            .info{
              position: absolute;
              left: -0.3rem;
              top: 1.1rem;
              height: 0.6rem;
              width: 1.8rem;
              box-sizing: border-box;
              border: 1px solid rgba(194,224,55,.5);
              border-radius: 0.3rem;
              background-color: rgba(194,224,55,.8);
              padding-left: 0.6rem;
              color: #462828;
              font-size: 12px;
              line-height: 1.2em;
              text-align: left;
            }
          }
          .text{
            text-align: center;
            padding-bottom: 0.2rem;
            h1{
              font-size: 0.3rem;
              color: #262626;
              line-height: 1em;
              font-weight: bold;
              margin-top: 0.2rem;
            }
            p{
              margin-top: 0.1rem;
              color: #464646;
              font-size: 0.26rem;
              line-height: 1.2em;
              padding: 0 0.4rem;
            }
          }
        }
      }
    }
    .back{
      .title{
        height: 0.86rem;
        display: flex;
        line-height: 0.86rem;
        background-color: #fff;
        span{
          flex: 1;
          &.line{
            position: relative;
            top:50%;
            border-top: 1px solid #bfbfbf;
          }
          &.text{
            flex: 0 0 1.4rem;
            text-align: center;
            color: #7a7a7a;
            font-size: 0.24rem;
          }
        }
      }
      li{
        height: 2.7rem;
        overflow: hidden;
        margin-bottom: 0.2rem;
        &.slide-enter-active, &.slide-leave-active {
          transform: translateY(0);
          transition: all 1s ease;
        }
        &.slide-enter, &.slide-leave-active {
          opacity: 0;
          transform: translateY(10px);
        }
        a{
          display: block;
          height: 100%;
        }
        .box{
          height: 100%;
          position: relative;
          background-size: cover;
          background-position: center;
          z-index: 10;
          .label{
            position: absolute;
            width: 0.84rem;
            left: 0.3rem;
            top: 0.3rem;
          }
          &:after{
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top:0;
            content: " ";
            z-index: -1;
            background-color: rgba(255,255,255,0.4);
            backdrop-filter:blur(5px);
          }
          .name{
            position: absolute;
            color: #262626;
            font-size: 0.3rem;
            left: 0;
            width: 100%;
            font-weight: bold;
            text-align: center;
            top:0.92rem;
            line-height: 1em;
          }
          .info{
            position: absolute;
            width: 1.8rem;
            height: 0.6rem;
            border-radius: 0.3rem;
            background-color: rgba(194,224,55,.8);
            border: 1px solid rgba(194,224,55,.5);
            left: 2.3rem;
            top:1.38rem;
            color: #462828;
            text-align: center;
            line-height: 1.2em;
            padding: 0.012rem 0;
            font-size: 0.24rem;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
</style>
