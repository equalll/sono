<template>
  <div class="book">
    <div class="code">
      <h1>长按扫码，联系客服直接预定 </h1>
      <img src="http://sonotemp.b0.upaiyun.com/sono2.0/static/img/code.jpg" alt="">
      <p>客服一：南小北</p>
    </div>
    <div class="formCon">
      <form @submit.prevent="handleSubmit">
        <h1>到货通知我</h1>
        <div class="controls">
          <span class="label">姓名</span>
          <input v-model="formData.content_name" type="text" placeholder="请输入姓名">
        </div>
        <div class="controls" style="border-bottom: none">
          <span class="label"></span>
          <div class="choose">联系方式任选其一</div>
        </div>
        <div class="controls">
          <span class="label">手机</span>
          <input v-model="formData.content_mobile" type="text" placeholder="请输入手机">
        </div>
        <div class="controls">
          <span class="label">邮箱</span>
          <input v-model="formData.content_email" type="text" placeholder="请输入联络邮箱">
        </div>
        <div class="controls">
          <span class="label">微信</span>
          <input v-model="formData.content_wechat" type="text" placeholder="请填写联络微信号">
        </div>
        <div class="others">
          <p>其他需求</p>
          <textarea v-model="formData.content_info"></textarea>
        </div>
        <input class="submit" type="submit" value="提交我的预定">
      </form>
    </div>
    <div class="code">
      <img src="http://sonotemp.b0.upaiyun.com/sono2.0/static/img/code2.jpg" alt="">
      <p>客服一：南小北</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from 'vuex'
  import {addBook} from "../../service"
  export default {
    data () {
      return {
        formData: {
          content_name: "",
          content_mobile: "",
          content_email: "",
          content_wechat: "",
          content_info: "",
        },
      }
    },
    props:{
        id:{
            default:""
        }
    },
    computed: {
      errors () {
        return this.$vuerify.$errors
      }
    },
    methods:{
      ...mapMutations(
        [
          "OPENALERT",
          "CLOSEALERT",
          "OPENPOP",
          "OPENSPINNER",
          "CLOSESPINNER"
        ]
      ),
      handleSubmit(){
        let _this = this
        if (this.$vuerify.check()){
          _this.OPENSPINNER("数据提交中...")
          let d = {
              ..._this.formData,
            good_id:_this.id
          }
          addBook(d,function () {
            _this.CLOSESPINNER()
            let o = {
              img:"check",
              title: "提交成功",
              desc: " 到货我们将第一时间通知您！",
              btn: [
                {
                  name: "回首页",
                  callback:function () {
                    _this.CLOSEALERT()
                    _this.$router.replace("/index")
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

      }
    },
    vuerify: {
      'formData.content_name': {
        test: /\S+/,
        message: '姓名不能为空'
      },
      'formData.content_mobile': [
        {
          test: /\S+/,
          message: '手机号不能为空'
        },
        "mobile"
      ],
      'formData.content_email': [
          {
            test: /\S+/,
            message: '请选择联络您的邮箱'
          },
          "email"
      ],
      'formData.content_wechat': {
        test: /\S+/,
        message: '请填写联络您的微信号'
      }
    },
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .book {
    .code {
      text-align: center;
      background-color: #fff;
      padding: 0.3rem 0 0.4rem;
      margin-bottom: 0.1rem;
      h1 {
        color: #000;
        font-size: 0.24rem;
        line-height: 1em;
      }
      img {
        width: 4.3rem;
      }
      p {
        color: #6b6d6f;
        font-size: 0.2rem;
      }
    }
    .formCon {
      padding: 0.3rem 0 0.4rem;
      background-color: #fff;
      margin-bottom: 0.1rem;
      h1 {
        font-size: 0.3rem;
        color: #000;
        font-weight: bold;
        line-height: 1em;
        text-align: center;
        margin-bottom: 0.3rem;
      }
      form {
        width: 4.6rem;
        margin: 0 auto;
        .controls {
          height: 0.6rem;
          line-height: 0.6rem;
          display: flex;
          border-bottom: 1px solid #aaaaaa;
          margin-bottom: 0.1rem;
          box-sizing: border-box;
          position: relative;
          .choose{
            color: #d6422f;
            position: relative;
            flex: 1;
            padding-left: 0.1rem;
            &:after{
              content: "";
              position: absolute;
              width: 0.12rem;
              height: 0.12rem;
              right: 100%;
              top:50%;

              margin-top: -0.06rem;
              margin-right: 0.1rem;
              border-radius: 50%;
              background-color: #d6422f;
            }
          }
          .label {
            flex: 0 0 1rem;
            width: 1rem;
            text-align: left;
            color: #1c1c1c;
            font-size: 0.24rem;
          }
          input {
            flex: 1;
            font-size: 0.24rem;
            color: #000;
            text-indent: 0.1rem;
            border: none;
            background: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          }
          .error_tips {
            position: absolute;
            width: 50%;
            font-size: 12px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            right: 0;
            bottom: 0;
            line-height: 1.5em;
            color: #ff434c;
            text-align: right;
            /*z-index: -1;*/
          }
        }
        .others {
          p {
            font-size: 0.24rem;
            color: #000;
            margin-top: 0.3rem;
            margin-bottom: 0.1rem;
          }
          textarea {
            padding: 0.1rem 0.2rem;
            line-height: 1.6em;
            height: 2.2rem;
            border: 1px solid #aaa;
            box-sizing: border-box;
            font-size: 0.24rem;
            width: 100%;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          }
        }
        .submit {
          display: block;
          width: 3.8rem;
          border-radius: 0.2rem;
          height: 0.5rem;
          background-color: #ff434c;
          color: #fff;
          font-size: 0.24rem;
          line-height: 0.5rem;
          text-align: center;
          appearance: none;
          margin: 0.3rem auto 0;
        }
      }
    }
  }
</style>
