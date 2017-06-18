<template>
  <div class="scroll-container" ref="scroll">
    <div class="content">
      <div class="box" :style="{minHeight:minHeight+'px'}">
        <slot></slot>
      </div>
      <div id="pullUp" ref="pullUp">
        <span class="pullUpIcon"></span><span class="pullUpLabel">{{pullText}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll"
  export default {
    data () {
      return {
        pullText:"释放刷新"
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
    created (){
      let _this = this
      this.$nextTick(function () {
        _this.scroll = new BScroll(this.$refs.scroll, {
          click: false,
          preventDefault:false,
          probeType:3
        })
        _this.scroll.on("scroll",function () {
          if(_this.scroll.scrollerHeight-_this.scroll.scroller.getBoundingClientRect().height>100){
            _this.scroll.refresh()
          }
          if(_this.scroll.scrollerHeight<parseInt(_this.scroll.scroller.getBoundingClientRect().height)){
            _this.scroll.refresh()
          }
          if(_this.noMore){
            return
          }
          if (_this.scroll.y < (_this.scroll.maxScrollY - 10) &&
            (!_this.$refs.pullUp.className.match('flip')&&
            !_this.$refs.pullUp.className.match('loading'))) {
            _this.$refs.pullUp.className = 'flip';
            _this.pullText = "释放刷新"
          } else if (_this.scroll.y > (_this.scroll.maxScrollY + 10) && _this.$refs.pullUp.className.match('flip')) {
            _this.$refs.pullUp.className = '';
          }
        })
        this.scroll.on("scrollEnd",function () {
          console.log("11")
          if (_this.$refs.pullUp.className.match('flip')) {
            _this.$refs.pullUp.className = 'loading';
            _this.pullText = "上拉加载更多..."
            if(_this.noMore){
              return
            }
            _this.$emit("loadMore")
          }
        })
        this.scroll.on("refresh",function () {
          if (_this.$refs.pullUp.className.match('loading')) {
            _this.$refs.pullUp.className = '';
            _this.pullText = "上拉加载更多..."
          }
        })
//          _this.$router.afterEach(function (a) {
//              console.log(a)
//            if (a.path == "/user/goods_order"||a.path == "/user/try_order") {
//              console.log(_this.scroll)
//              if(_this.scroll){
//                _this.scroll.refresh()
//              }
//            }
//          })
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

    .content{
      background-color: #fff;
    }
  }
</style>
