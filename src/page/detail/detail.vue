<template>
  <div class="detail mainContent">

    <base-scroll>
      <sonoHeader></sonoHeader>
      <goods-detail ref="goods" :goodsData="goodsData"></goods-detail>
      <div class="commentCon">
        <div class="title">
          用户反馈
          <div class="icon">
            <img src="./icon_comment.png" alt="">
            {{commentData.sum}}
          </div>
        </div>
        <div class="box">
          <template v-if="commentData.list.length>0">
            <comment_item :data="item" v-for="item in commentData.list" :key="item.user_id"></comment_item>
          </template>
          <template v-else>
            <p class="tips">暂无评论</p>
          </template>
        </div>
        <div class="btn_more" @click="forMore" v-show="commentData.list.length>0">{{btnText}}</div>
      </div>
      <bottom></bottom>
    </base-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from "../../components/header/header.vue"
  import goodsDetail from '../../components/goodsDetail/goodsDetail.vue'
  import commentItem from "../../components/comment_item/comment_item.vue"
  import bottom from '../../components/bottom/bottom.vue'
  import {getGoodsDetail, getCommentList} from '../../service'
  import {mapMutations} from "vuex"
  import baseScroll from "../../components/baseScroll/baseScroll.vue"
  import wx from 'weixin-js-sdk'
  export default {
    data () {
      return {
        page: 1,
        num: 4,
        btnText: "更多点评",
        goodsData: {},
        commentData: {
          sum: 0,
          list: []
        }
      }
    },
    created(){
      let _this = this
      let shareData = {}

      getGoodsDetail(_this.$route.query.id, function (d) {
        _this.goodsData = d
        _this.SETGOODSDATA(d);
        if(d.remained_number=='0'){
            let o = {
                id:d.good_id,
                prize:d.prize,
                title:d.title
            }
            _this.SETBOOKDATA(o)
        }
        _this.$nextTick(function () {
          _this.CLOSESPINNER()
        })
        shareData = {
          title:_this.goodsData.title,
          desc: "南屋北舍是一群有着不同职业，但对于南北农产品有着自己想法的吃货们组成的团队。",
          link: "http://www.sono.mobi"+_this.$router.currentRoute.fullPath,
          imgUrl: _this.goodsData.thumb
        };
        wx.ready(function () {
          wx.onMenuShareAppMessage(shareData);
          wx.onMenuShareTimeline(shareData);
        });
      })
      getCommentList(_this.$route.query.id, _this.page, _this.num, function (d) {
        if (d.list.length < _this.num) {
          _this.btnText = "无更多评论"
        }
        _this.commentData = d
        _this.page++
       })

    },
    methods: {
      ...mapMutations([
        'SETGOODSDATA',
        "CLOSESPINNER",
        "SETBOOKDATA"
      ]),
      forMore (){
        let _this = this
        if(_this.btnText=="无更多评论"){
            return;
        }
        if (_this.page > 2) {
          _this.$router.push("/comment?id=" + _this.$route.query.id)
          return
        }
        getCommentList(_this.$route.query.id, _this.page, _this.num, function (d) {
          if (d.list.length < _this.num) {
            _this.page++;
            _this.btnText = "无更多评论"
          } else {
            _this.page++;
            _this.btnText = "点击查看更多"
          }
          _this.commentData.list = _this.commentData.list.concat(d.list)
        })
      }
    },
    components: {
      "sonoHeader": header,
      goodsDetail,
      bottom,
      "comment_item": commentItem,
      baseScroll
    },
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .detail {
    bottom: 0.8rem;
    .base-scroll .box{
      background-color: #F4F4F4;
    }
    .content {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
      .header{
        position: relative;
      }
      .commentCon {
        background-color: #fff;
        .box {
          background-color: #fff;
          .comment_item {
            margin: 0 0.3rem;
            &:last-child {
              border-bottom: none;
            }
          }
          .tips {
            text-align: center;
            margin-top: 0.3rem;
          }
        }
        .btn_more {
          height: 0.5rem;
          line-height: 0.5rem;
          color: #ff434c;
          text-align: center;
          font-size: 0.24rem;
          margin: 0 0.3rem;
          background-color: #EBEBEB;
        }
        .title {
          box-sizing: border-box;
          width: 100%;
          z-index: 1000;
          background-color: #ebebeb;
          height: 0.5rem;
          line-height: 0.5rem;
          color: #262626;
          text-align: left;
          padding: 0 0.3rem;
          .icon {
            float: right;
            img {
              width: 0.28rem;
              vertical-align: top;
              margin-top: 0.11rem;
              margin-right: 0.05rem;
            }
          }
        }
      }
    }
    .head {
      height: 1.4rem;
      padding-top: 0.3rem;
      background-color: #fff;
      box-sizing: border-box;
      margin-bottom: 0.1rem;
      h1 {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 0.3rem;
        text-align: center;
        display: block;
        line-height: 1em;
        font-size: 0.3rem;
        color: #333333;
        margin-bottom: 0.2rem;
        font-weight: 700;
      }
      p {
        color: #b4282d;
        font-size: 0.3rem;
        line-height: 1em;
        text-align: center;
      }
    }
    .container {
      background-color: #fff;
      min-height: 2rem;
    }
  }
</style>
