<template>
  <div class="scroll-container" @scroll="handleScroll" ref="scroll">
    <div class="content" v-infinite-scroll="loadMore" infinite-scroll-distance="20" >
      <div class="box" :style="{minHeight:minHeight+'px'}">
        <slot></slot>
      </div>
      <div id="pullUp" class="loading" ref="pullUp">
        <span class="pullUpIcon" v-show="!noMore"></span><span class="pullUpLabel">{{pullText}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      data () {
          return {
            pullText:"加载中..."
          }
      },
      props:{
        minHeight:{
          default:0
        },
        noMore:{
          default:false
        }
      },
      methods:{
        handleScroll(){
            this.$emit("scroll")
        },
        loadMore:function () {
          if(!this.noMore&&this.$store.state.canLoad){
            this.$emit("loadMore")
          }else{
          }
        }
      },
      created (){
        let _this = this
        _this.$nextTick(function () {
          let wrapper = _this.$refs.scroll;
          let touchstartY;
          wrapper.addEventListener( 'touchstart', function (ev) {
            let events = ev.touches[ 0 ] || ev;
            touchstartY = events.clientY;
          }, false );

          wrapper.addEventListener( 'touchmove', function (ev) {
            let events = ev.touches[ 0 ] || ev;
            let scrollTop = wrapper.scrollTop;
            let	offsetHeight = wrapper.offsetHeight;
            let	scrollHeight = wrapper.scrollHeight;
            if ( events.clientY > touchstartY && (wrapper.scrollTop === 0) ) {
              // 下拉时并且页面已经到顶部时
              ev.preventDefault();
            } else if ( events.clientY < touchstartY && (scrollTop + offsetHeight >= scrollHeight) ) {
              // 上拉时并且页面已经到底部时
              ev.preventDefault();
            }
          }, false );
        })
      }
    }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
.scroll-container{
  position: absolute;
  width: 100%;
  left: 0;
  top:0;
  right: 0;
  bottom: 0;
  z-index: 100;
  overflow: auto;
  overflow-scrolling: touch;
  -webkit-overflow-scrolling: touch;
  .content{
    background-color: #fff;
    zoom: 1;
  }
}
</style>
