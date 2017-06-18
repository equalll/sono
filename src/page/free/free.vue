<template>
  <div class="free mainContent">
    <sonoHeader></sonoHeader>
    <base-scroll>
      <div class="main">
        <h1>{{freeData.good_name}}</h1>
        <p>申请时间:{{formatDate(freeData.start_time)}} 至 {{formatDate(freeData.end_time)}}</p>
      </div>
      <div class="tips">
        <p>收到试用产品后，<span>请在10天内发表试用反馈</span>。反馈将影
          响下次试用资格，优质的反馈将得到平台的特别礼物。</p>
      </div>
      <div class="form">
        <form @submit.prevent="handleSubmit">
          <div class="controls">
            <span class="label">姓名</span>
            <input v-model="formData.name" type="text" placeholder="请输入您的姓名">
          </div>
          <div class="controls">
            <span class="label">手机号</span>
            <input v-model="formData.mobile" type="text" placeholder="请输入您的手机号">
          </div>
          <div class="controls" style="border-bottom: none">
            <span class="label">性别</span>
            <select v-model="formData.sex" id="" style="background-position-x:3.4rem;">
              <option value="">请选择性别</option>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
          <div class="controls flex" style="border-bottom: none">
            <select @change="provinceChange($event)" v-model="formData.province" ref="province">
              <option v-for="item in provinceData" :value="item.id">
                {{item.region_name}}
              </option>
            </select>
            <select @change="cityChange($event)" v-model="formData.city" ref="city">
              <option v-for="item in cityData" :value="item.id">
                {{item.region_name}}
              </option>
            </select>
            <select v-model="formData.district" ref="district">
              <option v-for="item in districtData" :value="item.id">
                {{item.region_name}}
              </option>
            </select>
          </div>
          <div class="controls textarea" style="height: 1.16rem">
            <span class="label">地址</span>
            <textarea v-model="formData.address" rows="2">
              </textarea>
          </div>
          <div class="controls textarea" style="height: 1.16rem">
            <span class="label">申请理由</span>
            <textarea v-model="formData.reason" rows="2">
              </textarea>
          </div>

          <input class="submit" type="submit" value="申请试用">
          <h1 @click="OPENCONTENT('protocolData')">《试用服务协议》 </h1>
          <h1 @click="OPENCONTENT('lawData')">《法律声明及隐私权政策》</h1>

        </form>
        <p class="sm">本活动解释权归 杭州南屋北舍网络科技有限公司 所有</p>
      </div>
      <goods-detail ref="goods" :goodsData="goodsData"></goods-detail>
      <bottom></bottom>
    </base-scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from "../../components/header/header.vue"
  import goodsDetail from '../../components/goodsDetail/goodsDetail.vue'
  import baseScroll from "../../components/baseScroll/baseScroll.vue"
  import bottom from '../../components/bottom/bottom.vue'
  import {mapMutations} from 'vuex'
  import region from "../../components/region/region.vue"
  import {getFreeActivity, getGoodsDetail, addFree, getRegionInfo} from "../../service"
  import wx from 'weixin-js-sdk'

  export default {
    data () {
      return {
        freeData: "",
        formData: {
          name: "",
          mobile: "",
          sex: "",
          province: 31,
          city: 383,
          district: 3229,
          address: "",
          reason: ""
        },
        goodsData: {},
        provinceData: [],
        cityData: [],
        districtData: [],
        ifAlready:false
      }
    },
    components: {
      "sonoHeader": header,
      baseScroll,
      goodsDetail,
      bottom,
      region
    },
    created () {
      let _this = this
      let shareData = {}
      getRegionInfo(1, function (p) {
        _this.provinceData = p;
        getRegionInfo(_this.formData.province, function (c) {
          _this.cityData = c;
          getRegionInfo(_this.formData.city, function (d) {
            _this.districtData = d;
          })
        })

      })
      getFreeActivity(function (d) {
        _this.freeData = d
        getGoodsDetail(d.good_id, function (d) {
          _this.goodsData = d;

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

          _this.$nextTick(function () {
            _this.CLOSESPINNER()
          })
        })
      })
    },
    vuerify: {
      'formData.name': {
        test: /\S+/,
        message: '姓名不能为空'
      },
      'formData.mobile': [
        {
          test: /\S+/,
          message: '手机号不能为空'
        },
        "mobile"
      ],
      'formData.sex': {
        test: /\S+/,
        message: '请选择您的性别'
      },
      'formData.address': {
        test: /\S+/,
        message: '请填写您的详细地址'
      },
      'formData.reason': {
        test: /\S+/,
        message: '请填写您的申请理由'
      }
    },
    computed: {
      errors () {
        return this.$vuerify.$errors
      }
    },
    methods: {
      ...mapMutations(
        [
          'OPENCONTENT',
          "OPENALERT",
          "CLOSEALERT",
          "OPENPOP",
          "OPENSPINNER",
          "CLOSESPINNER"
        ]
      ),
      handleSubmit () {
        let _this = this
        if(_this.ifAlready){
            _this.OPENPOP("不可重复申请试用！")
            return;
        }
        if (this.$vuerify.check()) {
          _this.OPENSPINNER("数据提交中...")
          let data = {
            ..._this.formData,
            id: _this.freeData.id
          }
          addFree(data, function (d) {
            _this.ifAlready = true
            _this.CLOSESPINNER()
            let o = {
              title: "提交成功",
              desc: "您的信息已提交，您可关注'南屋北舍'公众号，查看试用的申请结果！",
              btn: [
                {
                  name: "确定",
                  callback:function () {
                    window.location.reload()
                    _this.CLOSEALERT()
                  }
                }
              ]
            }
            _this.OPENALERT(o)
          })
        }else{
            let a = 0;
            for(let i in _this.errors){
                if(a==0){
//                    console.log(typeof _this.errors[i])
                    if(typeof _this.errors[i]=="object"){
                      _this.errors[i].forEach(function (s,index) {
                          if(index==0){
                            _this.OPENPOP(s)
                          }
                      })
                    }else{
                      _this.OPENPOP(_this.errors[i])
                    }

                }
                a++;
            }
        }
      },
      formatDate(s){
        let date = new Date(parseInt(s) * 1000);
        let y = date.getFullYear()+ 1<10?'0'+date.getFullYear():date.getFullYear();
        let m = date.getMonth() + 1<10?'0'+date.getMonth():date.getMonth();
        let d = date.getDate() + 1<10?'0'+date.getDate():date.getDate();
        let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        let min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        return y + "-" + m + "-" + d;
      },
      provinceChange (e) {
        let _this = this
        getRegionInfo(_this.formData.province, function (c) {
          _this.cityData = c;
          _this.formData.city = _this.cityData[0].id;
          getRegionInfo(_this.formData.city, function (d) {
            _this.districtData = d;
            _this.formData.district = _this.districtData[0].id;
          })
        })
      },
      cityChange (e) {
        let _this = this
        getRegionInfo(_this.formData.city, function (d) {
          _this.districtData = d;
          _this.formData.district = _this.districtData[0].id;
        })
      }
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .free {
    background-color: #f4f4f4;
    .base-scroll .box{
      background: none;
    }
    .content {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      top: 1rem;
      .main {
        padding: 0.3rem;
        background-color: #fff;
        text-align: center;
        margin-bottom: 0.1rem;
        h1 {
          font-size: 0.3rem;
          color: #333333;
          line-height: 1em;
          margin-bottom: 0.2rem;
        }
        p {
          font-size: 0.2rem;
          color: #b4282d;
        }
      }
      .tips {
        padding: 0.3rem;
        background-color: #fff;
        font-size: 0.2rem;
        line-height: 2em;
        margin-bottom: 0.1rem;
        p {
          padding: 0 0.15rem;
          color: #464646;
          span {
            text-decoration: underline;
            color: #000000;
          }
        }
      }
      .form {
        padding: 0.3rem 0.3rem 0.4rem;
        background-color: #fff;
        margin-bottom: 0.1rem;
        form {
          padding: 0 0.6rem;
          .controls {
            padding: 0.3rem 0 0;
            min-height: 0.56rem;
            line-height: 0.56rem;
            display: flex;
            border-bottom: 1px solid rgba(170,170,170,0.6);
            position: relative;
            font-size: 0.24rem;
            z-index: 10;
            .error_tips {
              position: absolute;
              width: 50%;
              font-size: 12px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              right: 0;
              top: 100%;
              line-height: 1.5em;
              color: #ff434c;
              text-align: right;
              z-index: -1;
              display: none;
            }
            &.flex {
              flex-wrap: wrap;
              font-size: 0;
              select {
                height: 0.56rem;
              }
            }
            span {
              flex: 0 0 1rem;
              width: 1rem;
              text-align: left;
              color: #1c1c1c;
              font-size: 0.24rem;
              white-space: nowrap;
            }
            input, select, textarea {
              flex: 1;
              text-indent: 0.4rem;
              border: none;
              background: none;
              color: #666;
              -webkit-appearance: none;
              font-size: 0.24rem;
            }
            select {
              border: 1px solid #aaa;
              border-radius: 0;
              text-indent: 0.2rem;
              margin-right: 0.15rem;
              background-image: url(/static/images/select_arrow.png);
              background-size: 0.16rem auto;
              background-position-x: 1rem;
              background-position-y: center;
              background-repeat: no-repeat;
              padding: 0;
            }
            &.textarea {
              &:after {
                position: absolute;
                content: "";
                width: 100%;
                height: 0;
                border-top: 1px solid rgba(170,170,170,0.6);
                left: 0;
                top: 0.9rem;
              }
            }
            textarea {
              flex: none;
              position: absolute;
              width: 100%;
              height: 1.16rem;
              left: 0;
              line-height: 0.56rem;
              padding: 0;
              text-indent: 1rem;
            }
          }
          .submit {
            display: block;
            border: none;
            background: none;
            -webkit-appearance: none;
            background-color: #ff434c;
            width: 3.8rem;
            height: 0.5rem;
            line-height: 0.5rem;
            text-align: center;
            color: #fff;
            margin: 0.5rem auto 0;
            border-radius: 0.2rem;
            font-size: 0.24rem;
          }
          h1 {
            font-size: 0.24rem;
            color: #1c57ff;
            line-height: 2em;
            text-align: center;
          }
        }
        .sm {
          color: #464646;
          font-size: 0.20rem;
          line-height: 2em;
          text-align: center;
        }
      }
    }
  }
</style>
