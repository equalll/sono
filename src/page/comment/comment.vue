<template>
  <div class="comment mainContent" ref="comment">
    <div class="title">
      用户反馈
      <div class="icon">
        <img src="./icon_comment.png" alt="">
        {{commentData.sum}}
      </div>
    </div>
    <sono-scroll :minHeight="minHeight" :noMore="noMore" @loadMore="loadMore" ref="scroll">
      <transition-group name="slide">
        <comment_item :data="item" v-for="item in commentData.list" :key="item.user_id"></comment_item>
      </transition-group>
    </sono-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import scroll from '../../components/scroll/scroll.vue'
  import commentItem from "../../components/comment_item/comment_item.vue"
  import {getCommentList} from "../../service"
  import {mapMutations} from 'vuex'
  export default {
    data () {
      return {
        minHeight: 0,
        commentData: {
            sum:0,
            list:[]
        },
        page: 1,
        num: 10,
        noMore:false
      }
    },
    created () {
      let _this = this;
      _this.id = _this.$router.currentRoute.query.id;
      getCommentList(_this.id, _this.page, _this.num, function (d) {
        if (d.sum==0) {
          let o = {
            title: "提示",
            desc: "暂无评论",
            btn: [
              {
                name: "确定",
                callback: function () {
                  _this.CLOSEALERT();
                  _this.$router.go(-1)
                }
              }
            ]
          }
          _this.OPENALERT(o);
          return
        }
        _this.commentData = d;
        _this.$nextTick(function () {
          _this.minHeight = _this.$refs.comment.getBoundingClientRect().height
          _this.$store.commit("CLOSESPINNER")
        })
      })

    },
    components: {
      "sono-scroll": scroll,
      "comment_item": commentItem
    },
    methods: {
      ...mapMutations([
        "OPENALERT",
        "CLOSEALERT"
      ]),
      loadMore () {
        let _this = this
        _this.page += 1;
        getCommentList(_this.id, _this.page, _this.num, function (d) {
          if(d.list.length<_this.num){
              _this.noMore = true;
              _this.$refs.scroll.pullText = "无更多内容"
              _this.$refs.scroll.$refs.pullUp.className = '';
          }
          if(d.list.length>0){
            _this.commentData.list = _this.commentData.list.concat(d.list);
          }
        })
      }
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .comment {
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
      text-align: left;
      padding: 0 0.3rem;
      margin-bottom: 0.05rem;
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
    .scroll-container {
      .box {
        box-sizing: border-box;
        padding: 0.5rem 0.3rem 0;
      }
    }
  }
</style>
