<template>
  <div class="region">
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
</template>

<script type="text/ecmascript-6">
  import {getRegionInfo} from "../../service"
  import {mapState} from 'vuex'
  export default {
    data () {
        return {
          provinceData:[],
          cityData:[],
          districtData:[]
        }
    },
    props:{
      formData:{
      }
    },
    computed:{
      ...mapState({
        formData (state) {
          return state.addressData.formData
        }
      })
    },
    created () {
      let _this = this
      _this.$nextTick(function () {
        getRegionInfo(1,function (p) {
          _this.provinceData = p;
          getRegionInfo(_this.formData.province,function (c) {
            _this.cityData = c;
            getRegionInfo(_this.formData.city,function (d) {
              _this.districtData = d;
            })
          })

        })
      })
    },
    methods: {
      provinceChange (e) {
        let _this = this
        getRegionInfo(_this.formData.province,function (c) {
          _this.cityData = c;
          _this.formData.city = _this.cityData[0].id;
          getRegionInfo(_this.formData.city,function (d) {
            _this.districtData = d;
            _this.formData.district = _this.districtData[0].id;
          })
        })
      },
      cityChange (e) {
        let _this = this
        getRegionInfo(_this.formData.city,function (d) {
          _this.districtData = d;
          _this.formData.district = _this.districtData[0].id;
        })
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .region{
    flex: 1;
    display: flex;
  }
</style>
