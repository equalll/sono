<template>
  <div class="all mainContent">
    <sonoHeader></sonoHeader>
    <div class="scrollCon" ref="all">
      <sono-scroll :minHeight="minHeight" :noMore="noMore" @loadMore="loadMore" ref="scroll">
        <div class="listCon">
          <div class="line"></div>
          <transition-group name="slide" tag="ul">
            <item v-for="item in goodsData" :itemData="item" :key="item.id"></item>
          </transition-group>
        </div>
        <bottom v-if="moreData"></bottom>
      </sono-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import scroll from '../../components/scroll/scroll.vue'
  import item from '../../components/item/item.vue'
  import bottom from '../../components/bottom/bottom.vue'
  import {getAllGoods} from "../../service"
  import header from "../../components/header/header.vue"
  import {mapMutations} from "vuex"
  export default {
    data () {
      return{
        page:1,
        num:6,
        minHeight:0,
        moreData:false,
        goodsData:[],
        noMore:false,
        canLoad:true
      }
    },
    methods: {
      ...mapMutations([
        "CLOSESPINNER"
      ]),
      loadMore () {
        let _this = this
        if(!this.canLoad){return}
        getAllGoods(_this.page,_this.num,function (d) {
          _this.page+=1;
          _this.goodsData = _this.goodsData.concat(d.list)
          if(d.list.length<_this.num){
              _this.moreData = true;
              _this.noMore = true;
              _this.$refs.scroll.$refs.pullUp.className = '';
              _this.$refs.scroll.$refs.pullUp.querySelector('.pullUpLabel').innerHTML = "无更多内容";
          }
        })
      }
    },
    created () {
      let _this = this
      _this.$nextTick(function () {
        _this.minHeight = _this.$refs.all.getBoundingClientRect().height;
        _this.CLOSESPINNER()
      })
    },
    components:{
      "sonoHeader":header,
      "sono-scroll":scroll,
      item,
      bottom
    },
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .all {
    .scrollCon{
      position: absolute;
      top:1rem;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
      &:after{
        position: absolute;
        content: "sono.mobi";
        width: 100%;
        left: 0;
        bottom:0;
        z-index: 10;
        line-height: 2em;
        font-size: 0.2rem;
        text-align: center;
      }
      &:before{
        position: absolute;
        content: "sono.mobi";
        width: 100%;
        left: 0;
        top:0;
        z-index: 10;
        line-height: 2em;
        font-size: 0.2rem;
        text-align: center;
      }
    }
    .listCon{
      position: relative;
      border-bottom: 0.1rem solid #91bb35;
      overflow: hidden;
      box-sizing: border-box;
      .line{
        position: absolute;
        width: 1px;
        height: 100%;
        left: 50%;
        transform: translateX(-50%);
        top:0;
        border-left: 1px solid #d9d9d9;
      }
      ul{
        font-size: 0;
      }
    }
  }
</style>
