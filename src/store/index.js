import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  ifContent:false,
  ifAlert:false,
  ifNav:true,
  ifBill:false,
  navType:0,
  ifSwiper:false,
  ifBuy:false,
  ifSpinner:true,
  spinnerText:"数据加载中...",
  goodsData:{},//当前可购买的商品信息
  goodsOrder:{},
  tryOrder:{},
  htmlData:'',
  alertData:{},
  swiperData:{},
  bookData:{},
  pop:{
    ifPop:false,
    text:""
  },
  discussData:{},
  addressData:{
    formData: {
      id:"",
      consignee:"",
      mobile:"",
      province: 31,
      city: 383,
      district: 3229,
      address:"",
      zipcode:""
    }
  },
  defaultAddress:{},
  userInfo:{
    "user_id":"",
    "token":""
  },
  user:{
    user:{

    }
  },
  canLoad:true,
  shareData:{

  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
