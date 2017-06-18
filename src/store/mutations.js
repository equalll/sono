import {
  SETUSERINFO,
  SETUSER,
  SETORDERDATA,
  CLOSECONTENT,
  OPENCONTENT,
  CLOSEALERT,
  OPENALERT,
  ClOSESWIPER,
  OPENSWIPER,
  SETADDRESSDATA,
  CLOSEGOODS,
  OPENGOODS,
  SETGOODSDATA,
  SETFORMDATA,
  SETDEFAULTADDRESS,
  SETDISCUSSDATA,
  OPENPOP,
  CLOSEPOP,
  OPENSPINNER,
  CLOSESPINNER,
  SETBOOKDATA,
  OPENBILL,
  CLOSEBILL,
  SETCANLOAD
} from './mutation-types.js'

export default {
  [SETUSERINFO] (state, obj) {
    state.userInfo = obj
  },
  [SETUSER] (state, obj) {
    state.user = obj
  },
  [SETORDERDATA](state, o){
    state[o.str] = o.obj
  },
  [CLOSECONTENT](state){
    state.ifContent = false
  },
  [OPENCONTENT](state, s){
    state.htmlData = s;
    state.ifContent = true
  },
  [CLOSEALERT](state){
    state.ifAlert = false
  },
  [OPENALERT](state, o){
    state.alertData = o;
    state.ifAlert = true;
  },
  [ClOSESWIPER](state){
    state.ifSwiper = false
  },
  [OPENSWIPER](state, d){
    state.swiperData = d;
    state.ifSwiper = true
  },
  [SETADDRESSDATA](state, d){
    state.addressData = d
  },
  [OPENGOODS](state){
    state.ifBuy = true
  },
  [CLOSEGOODS](state){
    state.ifBuy = false
  },
  [SETGOODSDATA](state, o){
    if(o.remained_number==0){
      state.navType = 2
    }else{
      state.navType = 1
    }
    state.goodsData = o
  },
  [SETFORMDATA](state, o){
    state.addressData.formData = o
  },
  [SETDEFAULTADDRESS](state, o){
    state.defaultAddress = o
  },
  [SETDISCUSSDATA](state, o){
    state.discussData = o
  },
  [CLOSEPOP](state){
    state.pop.ifPop = false
  },
  [OPENPOP](state, s){
    state.pop.text = s
    state.pop.ifPop = true
    setTimeout(function () {
      state.pop.ifPop = false
    },700)
  },
  [OPENSPINNER](state,s){
    state.spinnerText = s;
    state.ifSpinner = true
  },
  [CLOSESPINNER](state){
    state.ifSpinner = false
  },
  [SETBOOKDATA](state,o){
    state.bookData = o
  },
  [OPENBILL](state){
    state.ifBill = true
  },
  [CLOSEBILL](state){
    state.ifBill = false
  },
  [SETCANLOAD](state,flag){
    state.canLoad = flag
  },
}
