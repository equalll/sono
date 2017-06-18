<template>
  <div class="discuss mainContent">
    <div class="title">
      评价晒单
    </div>
    <base-scroll>
      <p>{{discussData.name}}</p>
      <div class="con">
        <div class="imgCon" :style="{backgroundImage:'url('+discussData.img+')'}"></div>
        <div class="desc">
          <span>评分：</span>
          <div class="star">
            <template v-for="(item,index) in 5">
              <i @click="giveScore(index)" :class="{'active':index<comment_rank}"></i>
            </template>
          </div>
        </div>
      </div>
      <textarea name="" v-model="content" maxlength="100"></textarea>
      <div class="input">
        <img src="./icon_pic.png" alt="">
        <span>添加图片</span>
        <input type="file" accept="image/*" @change="selectFileImage($event)">
      </div>
      <transition-group name="slide" class="imgList" tag="div">
        <div class="item" v-for="(item,index) in imgList" :key="index">
          <div class="img"  @click="openSwiper(index)" :class="{'active':item.status == 'active'}"
               :style="{backgroundImage:'url('+item.url+')'}"></div>
          <template v-if="item.status=='active'">
            <p @click="deleteImg(index)">删除</p>
          </template>
          <template v-else>
            <p>上传中...</p>
          </template>
        </div>
      </transition-group>
      <div class="submit" @click="submitData">提交评价</div>
    </base-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import EXIF from "exif-js"
  import MegaPixImage from "./mobileBUGFix.mini.js"
  import {mapState,mapMutations} from "vuex"
  import {uploadImg, addComment} from "../../service"
  import baseScroll from "../../components/baseScroll/baseScroll.vue"

  export default {
    data (){
      return {
        comment_rank: 5,
        imgList: [],
        content: ""
      }
    },
    created (){
      this.$nextTick(function () {
          this.CLOSESPINNER()
      })
    },
    computed: {
      ...mapState({
        discussData(state){
          return state.discussData
        }
      })
    },
    methods: {
      ...mapMutations([
         "OPENALERT",
        "CLOSEALERT",
        "CLOSESPINNER",
        "OPENSPINNER"
      ]),
      giveScore (index) {
        this.comment_rank = index + 1
      },
      selectFileImage (e) {
        let _this = this
        let file = e.target.files[0];
        let Orientation = null;
        if (file) {
          var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
          if (!rFilter.test(file.type)) {
            //showMyTips("请选择jpeg、png格式的图片", false);
            return;
          }
          //获取照片方向角属性，用户旋转控制
          EXIF.getData(file, function () {
            var a = EXIF.getAllTags(this);
            Orientation = EXIF.getTag(this, 'Orientation');
          });
          var oReader = new FileReader();
          oReader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
              var expectWidth = this.naturalWidth;
              var expectHeight = this.naturalHeight;
              if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
                expectWidth = 800;
                expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
              } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
                expectHeight = 1200;
                expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
              }
              var canvas = document.createElement("canvas");
              var ctx = canvas.getContext("2d");
              canvas.width = expectWidth;
              canvas.height = expectHeight;
              ctx.drawImage(this, 0, 0, expectWidth, expectHeight);

              var base64 = null;

              var mpImg = new MegaPixImage(image);
              mpImg.render(canvas, {
                maxWidth: 800,
                maxHeight: 1200,
                quality: 1,
                orientation: Orientation
              });
              base64 = canvas.toDataURL("image/jpeg", 1);
              let o = {
                url: base64,
                status: ""
              }
              _this.imgList.push(o)
              _this.OPENSPINNER("图片上传中...")
              uploadImg(base64, function (d) {
                _this.CLOSESPINNER()
                _this.imgList[_this.imgList.length - 1].url = d.path
                _this.imgList[_this.imgList.length - 1].status = "active"
                console.log(_this.imgList)
              })
            };
          };
          oReader.readAsDataURL(file);
        }
      },
      deleteImg (index) {
        let _this = this
        _this.imgList.splice(index, 1)
      },
      submitData (){
        let _this = this
        if (!this.content) {
          _this.OPENSPINNER("评论不能为空")
          return
        }
        let arr = [];
        _this.imgList.forEach(function (e) {
          arr.push(e.url)
        })
        let o = {
          order_id: _this.discussData.id,
          good_id: _this.discussData.good_id,
          type: _this.discussData.type,
          content: _this.content,
          image: arr,
          comment_rank: _this.comment_rank
        }
        console.log(o)
        _this.OPENSPINNER("数据提交中...")
        addComment(o, function (d) {
          _this.CLOSESPINNER()
          let o =  {
            title:"成功",
            desc:"评论添加成功！",
            btn:[
              {
                name:"确定",
                callback:function () {
                  _this.$router.go(-1);
                  _this.CLOSEALERT()
                }
              }
            ]
          }
          _this.OPENALERT(o)
        })
      },
      openSwiper(index){

      }
    },
    components: {
      baseScroll
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .discuss {
    .title {
      background-color: #ebebeb;
      height: 0.5rem;
      line-height: 0.5rem;
      color: #262626;
      text-align: center;
      padding: 0 0.3rem;
      z-index: 200;
      position: relative;
    }
    .content {
      position: absolute;
      left: 0;
      top: 0.5rem;
      bottom: 0;
      right: 0;
      z-index: 10;
      color: #262626;
      .box {
        padding: 0.3rem 0.3rem 1rem;
      }
      p {
        font-size: 0.24rem;
        line-height: 1em;
        margin: 0 0 0.2rem;
      }
      .con {
        height: 1.2rem;
        display: flex;
        margin-bottom: 0.2rem;
        .imgCon {
          width: 1.2rem;
          flex: 0 0 1.2rem;
          margin-right: 0.2rem;
          background-color: #ebebeb;
          background-image: url(/static/images/default.jpg);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .desc {
          flex: 1;
          display: flex;
          padding: 0.1rem 0;
          flex-direction: column;
          justify-content: space-between;
          span {
            font-size: 0.24rem;
          }
          .star {
            i {
              display: inline-block;
              width: 0.4rem;
              height: 0.4rem;
              background-image: url(./no_star.png);
              margin-right: 0.1rem;
              background-size: cover;
              background-position: center;
              background-repeat: no-repeat;
              &.active {
                background-image: url(./star.png);
              }
            }
          }
        }
      }
      textarea {
        appearance: none;
        background: none;
        padding: 0.2rem 0;
        border: none;
        width: 100%;
        height: 1.6rem;
        border-bottom: 1px solid #aaa;
        border-top: 1px solid #aaa;
        border-radius: 0;
        font-size: 0.24rem;
      }
      .input {
        width: 1.6rem;
        height: 0.6rem;
        margin-right: 0;
        float: right;
        position: relative;
        background-color: #FFAF32;
        display: flex;
        line-height: 0.6rem;
        justify-content: center;
        z-index: 10;
        font-size: 0.24rem;
        color: #fff;
        margin-top: 0.1rem;
        img {
          width: 0.26rem;
          height: 0.26rem;
          margin-top: 0.17rem;
          align-items: center;
          margin-right: 0.05rem;
        }
      }
      input[type=file] {
        appearance: none;
        opacity: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 100;
      }
      .submit {
        clear: both;
        width: 3.8rem;
        height: 0.6rem;
        background-color: #FF434C;
        border-radius: 8px;
        color: #fff;
        line-height: 0.6rem;
        text-align: center;
        margin: 0 auto;
        font-size: 0.3rem;
      }
      .imgList {
        display: flex;
        clear: both;
        padding: 0.4rem 0;
        justify-content: flex-end;
        .item {
          width: 1.2rem;
          flex: 0 0 1.2rem;
          margin-left: 0.1rem;
          margin-bottom: 0.1rem;
          &.slide-leave-active {
            position: absolute;
          }
          &.slide-enter-active, &.slide-leave-active {
            transform: translateX(0);
            transition: transform 1s ease;
          }
          &.slide-enter, &.slide-leave-active {
            opacity: 0;
            transform: translateX(10px);
          }
          .img {
            width: 1.2rem;
            height: 1.2rem;
            background-image: url(/static/images/default.jpg);
            background-position: center;
            background-size: cover;
            position: relative;
            &.active {
              &:after {
                opacity: 0;
              }
            }
            &:after {
              content: "";
              position: absolute;
              width: 100%;
              height: 100%;
              left: 0;
              top: 0;
              z-index: 100;
              background-color: rgba(0, 0, 0, 0.6);
              backdrop-filter: blur(5px);
              transition: all 0.4s ease;
            }
          }
          p {
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            color: #fff;
            font-size: 0.2rem;
            background-color: #FF434C;
            margin-top: 0.05rem;
          }
        }
      }
    }
  }
</style>
