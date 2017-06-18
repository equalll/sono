<template>
  <div class='list'>
    <transition-group  v-if="addressData.length>0" name="slide" tag="ul">
      <li v-for="(item,index) in addressData" @click="setDefault(index)" :key="index">
        <div class="flex">
          <div class="name">{{item.consignee}}</div>
          <div class="mobile">{{item.mobile}}</div>
          <span v-show="item.id==defaultAddress.id" class="default"></span>
        </div>
        <div class="address">
          {{item.province_name}}省{{item.city_name}}市{{item.district_name}}{{item.address}}
        </div>
        <div class="controls">
          <div @click.stop="delAddress(item.id,index)" class="delete">删除</div>
          <div @click.stop="editAddress(item)" class="edit">编辑</div>
        </div>
      </li>
    </transition-group>
    <p class="tips" v-else>暂无地址信息</p>
    <div class="add" @click.stop="newAddress()">+新增地址</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getAddressList,deleteAddress} from "../../service"
  import {mapState,mapMutations} from 'vuex'
  export default {
    data () {
      return {
        addressData:[]
      }
    },
    created () {
      let _this = this
      console.log("created")
      if(_this.addressData.length==0){
        getAddressList(function (d) {
            if(d.length>0){
              _this.addressData = d;
              _this.SETDEFAULTADDRESS(d[0]);//默认第一个为默认地址
            }
        })
      }else{
          console.log(_this.addressData)
      }
      _this.$nextTick(function () {
        _this.$store.commit("CLOSESPINNER")
      })
    },

    computed:{
      ...mapState({
        defaultAddress (state) {
          return state.defaultAddress
        },
        addressData (state){
          return state.addressList
        }
      })
    },
    methods: {
      ...mapMutations([
        "SETDEFAULTADDRESS",
        "SETFORMDATA",
        "OPENALERT",
        "CLOSEALERT"
      ]),
      editAddress (e) {
        let formData = {
          id:e.id,
          consignee: e.consignee,
          mobile: e.mobile,
          province: e.province,
          city: e.city,
          district: e.district,
          address: e.address,
          zipcode: e.zipcode
        }
        this.SETFORMDATA(formData)
        this.$router.push("/edit")
      },
      delAddress (id,index) {
        let _this = this
//        if(_this.addressData.length===1){
//            return;
//        }
        let o =  {
          title:"提示",
          desc:"确定删除该地址？",
          btn:[
            {
              name:"取消"
            },
            {
              name:"确定",
              callback:function () {
                deleteAddress(id,function (d) {
                  _this.CLOSEALERT(o)
                  _this.addressData.splice(index,1)
                  if(id==_this.defaultAddress.id){
                    if(_this.addressData.length>0){
                      _this.SETDEFAULTADDRESS(_this.addressData[0])
                    }else{
                      _this.SETDEFAULTADDRESS({})
                    }
                  }
                })
              }
            }
          ]
        }
        _this.OPENALERT(o)
      },
      setDefault (index){
        this.$emit('setDefault',this.addressData[index])
        this.$emit("hideMore")
      },
      newAddress (){
        let formData = {
          id:"",
          consignee:"",
          mobile:"",
          province: 31,
          city: 383,
          district: 3229,
          address:"",
          zipcode:""
        }
        this.SETFORMDATA(formData)
        this.$router.push("/edit")
      }
    }
  }
</script>

<style lang="less" type="text/less" rel="stylesheet/less">
  .list {
    background-color: #ebebeb;
    padding-bottom: 0.2rem;
    ul {
      padding: 0 0.3rem 0.2rem;
      li {
        padding: 0.2rem 0;
        border-bottom: 1px solid #b4b4b4;
        word-break: break-all;
        font-size: 0.24rem;
        &.slide-leave-active {
          position: absolute;
        }
        &.slide-enter-active, &.slide-leave-active {
          transform: translateY(0);
          transition: transform 1s ease;
        }
        &.slide-enter, &.slide-leave-active {
          opacity: 0;
          transform: translateY(30px);
        }
        .flex {
          margin-bottom: 0.1rem;
          font-size: 0.24rem;
          height: 0.26rem;
          line-height: 0.26rem;
          display: flex;
          .default {
            flex: 0 0 0.26rem;
            width: 0.26rem;
            background-image: url(/static/images/dotted.png);
            background-size: 0.26rem auto;
            background-position: center;
            background-repeat: no-repeat;
            margin-left: 0.2rem;
          }
          div {
            flex: 1;
            &.name {
              text-align: left;
            }
            &.mobile {
              text-align: right;
              color: #000;
              font-weight: bold;
            }
          }
        }
        .address {
          line-height: 1.2em;
        }
        .controls {
          display: flex;
          justify-content: flex-end;
          .edit {
            color: #333;
            margin-left: 0.2rem;
          }
          .delete {
            color: #333;
          }
        }
      }
    }
    .add {
      width: 1.5rem;
      line-height: 0.48rem;
      border: 1px solid #262626;
      text-align: center;
      margin: 0 auto;
    }
  }
</style>
