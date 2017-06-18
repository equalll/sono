<template>
  <div class="edit mainContent">
    <div class="content">
      <div class="title">
        {{functionText}}收货地址
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="form">
          <div class="controls">
            <span class="label">姓名</span>
            <input v-model="formData.consignee" type="text" placeholder="请输入姓名">
          </div>
          <div class="controls">
            <span class="label">手机号</span>
            <input v-model="formData.mobile" type="text" placeholder="11位手机号">
          </div>
          <div class="controls">
            <span class="label" style="margin-right: 0.4rem">选择地区</span>
            <region></region>
          </div>
          <div class="controls">
            <span class="label">详细地址</span>
            <input v-model="formData.address" type="text" placeholder="街道门牌信息">
          </div>
          <div class="controls">
            <span class="label">邮政编码</span>
            <input v-model="formData.zipcode" type="text" placeholder="邮政编码">
          </div>
        </div>
        <input class="submit" type="submit" :value="'确认'+functionText">
      </form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState, mapMutations} from 'vuex'
  import {addAddress,editAddress,getAddressList} from "../../service"
  import region from "../../components/region/region.vue"
  export default {
    data () {
      return {
        functionText: "添加",
        formData: {
          id: "",
          consignee: "",
          mobile: "",
          province: 31,
          city: 383,
          district: 3229,
          address: "",
          zipcode: ""
        }
      }
    },
    created () {
      this.formData = this.storeFormData
      if (this.storeFormData.consignee) {
        this.functionText = "修改"
      } else {
        this.functionText = "添加"
      }
      this.$nextTick(function () {
        this.CLOSESPINNER()
      })
    },
    computed: {
      errors () {
        return this.$vuerify.$errors
      },
      ...mapState({
        storeFormData (state) {
          return state.addressData.formData
        }
      })
    },
    vuerify: {
      'formData.consignee': {
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
      'formData.address': {
        test: /\S+/,
        message: '街道门牌信息不能为空'
      },
      'formData.zipcode': {
        test: /\S+/,
        message: '邮政编码不能为空'
      }
    },
    methods: {
      ...mapMutations([
        "OPENALERT",
        "CLOSEALERT",
        "OPENSPINNER",
        "CLOSESPINNER",
        "OPENPOP"
      ]),
      handleSubmit () {
        let _this = this
        if (this.$vuerify.check()) {
          if (_this.functionText == "添加") {
            _this.OPENSPINNER("数据提交中...");
            addAddress(this.formData, function (d) {
              _this.CLOSESPINNER()
              let o = {
                title: "添加成功",
                btn: [
                  {
                    name: "确定",
                    callback: function () {
                      _this.CLOSEALERT()
                      _this.$router.go(-1)
                    }
                  }
                ]
              }
              _this.OPENALERT(o)
            })
          }else{
            _this.OPENSPINNER("数据提交中...");
            editAddress(this.formData, function (d) {
              _this.CLOSESPINNER()
              let o = {
                title: "修改成功",
                btn: [
                  {
                    name: "确定",
                    callback: function () {
                      _this.CLOSEALERT()
                      _this.$router.go(-1)
                    }
                  }
                ]
              }
              _this.OPENALERT(o)
            })
          }
        }else{
          let a = 0;
          for(let i in _this.errors){
            if(a==0){
              console.log(typeof _this.errors[i])
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
    components: {
      region
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .edit {
    background-color: #f1f1f1;
    .content {
      .title {
        background-color: #ebebeb;
        height: 0.5rem;
        line-height: 0.5rem;
        color: #262626;
        text-align: center;
        border-bottom: 1px solid #b4b4b4;
      }
      form {
        .form {
          background-color: #ffffff;
          border-bottom: 1px solid #b4b4b4;
          padding: 0 0.3rem;
        }
        .controls {
          height: 0.8rem;
          line-height: 0.8rem;
          border-bottom: 1px solid rgba(170,170,170,0.6);
          display: flex;
          position: relative;
          z-index: 10;
          .error_tips {
            position: absolute;
            width: 50%;
            font-size: 12px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            right: 0;
            top: 0;
            line-height: 0.8rem;
            color: #ff434c;
            text-align: right;
            z-index: -1;
          }
          .label {
            font-size: 0.28rem;
            flex: 0 0 1.4rem;
            text-align: left;
            box-sizing: border-box;
            padding-left: 0.15rem;
            color: #737373;
          }
          input {
            flex: 1;
            padding-left: 0.4rem;
            background: none;
          }
          select {
            flex: 0 0 1.3rem;
            width: 1.3rem;
            appearance: none;
            background: none;
            border: none;
          }
          &:last-child {
            border-bottom: none;
          }
        }
        .submit {
          width: 3.8rem;
          display: block;
          height: 0.5rem;
          background-color: #ff434c;
          color: #fff;
          border-radius: 0.25rem;
          margin: 0.2rem auto;
          font-size: 0.24rem;
          appearance: none;
        }
      }
    }
  }
</style>
