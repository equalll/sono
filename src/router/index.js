import Vue from 'vue'
import Router from 'vue-router'
import index from '../page/index/index.vue'
//import select from '../page/select/select.vue'
import free from '../page/free/free.vue'

import cart from '../page/cart/cart.vue'
import detail from '../page/detail/detail.vue'
import edit from '../page/edit/edit.vue'
import all from '../page/all/all.vue'
import discuss from '../page/discuss/discuss.vue'
import logistics from '../page/logistics/logistics.vue'

import pay from '../page/pay/pay.vue'
import success from '../page/pay/success/success.vue'

import user from '../page/user/user.vue'
import goods_order from '../page/user/goods_order/goods_order.vue'
import try_order from '../page/user/try_order/try_order.vue'

import addressList from '../page/addressList/addressList.vue'
import tryList from '../page/tryList/tryList.vue'
import comment from '../page/comment/comment.vue'
import info from '../page/info/info.vue'
import desc from '../page/desc/desc.vue'
import reserve from '../page/reserve/reserve.vue'

Vue.use(Router);

export default new Router({
  mode:"history",
  linkActiveClass:"active",
  routes: [
    {
      path: '/index', component: index
    },
    // {
    //   path: '/select', component: select
    // },
    {
      path: '/free', component: free
    },
    {
      path: '/cart', component: cart
    },
    {
      path: '/edit', component: edit
    },
    {
      path: '/all', component: all
    },
    {
      path: '/logistics', component: logistics
    },
    {
      path: '/user', component: user, redirect: '/user/goods_order',
      children:[
        {
          path: '/user/goods_order', component: goods_order
        },
        {
          path: '/user/try_order', component: try_order
        }
      ]
    },
    {
      path: '/detail', component: detail
    },
    {
      path: '/addressList', component: addressList
    },
    {
      path: '/tryList', component: tryList
    },
    {
      path: '/comment', component: comment
    },
    {
      path: '/discuss', component: discuss
    },
    {
      path: '/pay', component: pay,
      children:[
        {
          path: '/pay/success', component: success
        }
      ]
    },
    {
      path: '/info', component: info,
    },
    {
      path: '/desc', component: desc,
    },
    {
      path: '/reserve', component: reserve,
    },
    {
      path: '*', redirect: '/index'
    },
  ]
})
