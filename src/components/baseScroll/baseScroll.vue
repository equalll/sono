<template>
  <div class="content base-scroll" ref="scroll">
    <div class="box">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll"
  export default {
    created () {
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
.base-scroll{
  overflow: auto;
  overflow-scrolling: touch;
  -webkit-overflow-scrolling: touch;
  -webkit-perspective: 0;

  .box{
    background-color: #fff;
    height: calc(100% + 1px);
    &:before {
      content:"";
      width: 1px;
      float: left;
      height: calc(100% + 1px);
      margin-left: -1px;
      display: block;
    }
    &:after{
      content:"";
      width: 100%;
      display: block;
      clear: both;
    }
  }
}
</style>
