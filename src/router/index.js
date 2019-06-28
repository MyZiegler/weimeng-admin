import Vue from 'vue'
import Router from 'vue-router'

// import first from '@/pages/first'

import index from '@/pages/index'
import index1 from '@/pages/index2'
import shopnum from '@/pages/shopnum'
import style from '@/pages/style'
import pageset from '@/pages/pageset'
import order from '@/pages/order'
import team from '@/pages/team'
import orders from '@/pages/orders'
import orderm from '@/pages/orderm'
import customer from '@/pages/customer'
import income from '@/pages/income'
import channels from '@/pages/channels'
import marketing from '@/pages/marketing'
import server from '@/pages/server'
import overview from '@/pages/overview'
import setting from '@/pages/setting'
import register from '@/pages/register'
import login from '@/pages/login'
import addproduct from '@/pages/addproduct'
import demo from '@/pages/demo'
//营销模块
import Coupon from '@/pages/marketing/Coupon'
import Couponcode from '@/pages/marketing/Couponcode'
import seckill from '@/pages/marketing/seckill'
import gift from '@/pages/marketing/gift'
import payForgift from '@/pages/marketing/payForgift'
import reduceSend from '@/pages/marketing/reduceSend'
import Discount from '@/pages/marketing/Discount'
import packingBargain from '@/pages/marketing/packingBargain'
import combo from '@/pages/marketing/combo'
import mailTool from '@/pages/marketing/mailTool'
import manyP from '@/pages/marketing/manyP'
import OrderCashback from '@/pages/marketing/OrderCashback'
import toGetPaid from '@/pages/marketing/toGetPaid'
import membercard from '@/pages/marketing/membercard'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/',
      redirect: "index/overview",

      name: 'index',
      component: index
    },
    {
      path: '/demo',
      name: 'demo',
      component: demo
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      redirect: "index/overview",
      name: 'index',
      component: index,
      meta: {
        title: '',
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [
        {
          name: 'shopnum',
          path: 'shopnum',
          component: shopnum
        },
        {
          name: 'style',
          path: 'style',
          component: style
        },
        {
          name: 'pageset',
          path: 'pageset',
          component: pageset
        },
        {
          name: 'order',
          path: 'order',
          component: order
        },
        {
          name: 'team',
          path: 'team',
          component: team
        },
        {
          name: 'orders',
          path: 'orders',
          component: orders
        },
        {
          name: 'orderm',
          path: 'orderm',
          component: orderm
        },
        {
          name: 'customer',
          path: 'customer',
          component: customer
        },
        {
          name: 'income',
          path: 'income',
          component: income
        }, {
          name: 'channels',
          path: 'channels',
          component: channels
        }, {
          name: 'marketing',
          path: 'marketing',
          component: marketing
        },
        {
          name: 'server',
          path: 'server',
          component: server
        }, {
          name: 'overview',
          path: 'overview',
          component: overview
        },
        {
          name: 'setting',
          path: 'setting',
          component: setting
        },
        {
          name: 'Coupon',
          path: 'Coupon',
          component: Coupon
        },
        {
          name: 'seckill',
          path: 'seckill',
          component: seckill
        },
        {
          name: 'gift',
          path: 'gift',
          component: gift
        },
        {
          name: 'payForgift',
          path: 'payForgift',
          component: payForgift
        },
        {
          name: 'Discount',
          path: 'Discount',
          component: Discount
        },
        {
          name: 'combo',
          path: 'combo',
          component: combo
        },
        {
          name: 'mailTool',
          path: 'mailTool',
          component: mailTool
        },
        {
          name: 'Couponcode',
          path: 'Couponcode',
          component: Couponcode
        },
        {
          name: 'OrderCashback',
          path: 'OrderCashback',
          component: OrderCashback
        },
        {
          name: 'toGetPaid',
          path: 'toGetPaid',
          component: toGetPaid
        },
        {
          name: 'membercard',
          path: 'membercard',
          component: membercard
        },
        {
          name: 'addproduct',
          path: 'addproduct',
          component: addproduct
        },
        {
          name: 'combo',
          path: 'combo',
          component: combo
        },
        {
          name: 'manyP',
          path: 'manyP',
          component: manyP
        },
        {

          name: 'packingBargain',
          path: 'packingBargain',
          component: packingBargain
        },
        {
          name: 'reduceSend',
          path: 'reduceSend',
          component: reduceSend
        },
      ],

    },
    {
      path: '/index1',
      redirect: "overview",
      name: 'index1',
      component: index1,
      children: [
        {
          name: 'shopnum',
          path: 'shopnum',
          component: shopnum
        },
        {
          name: 'style',
          path: 'style',
          component: style
        },
        {
          name: 'pageset',
          path: 'pageset',
          component: pageset
        },
        {
          name: 'order',
          path: 'order',
          component: order
        },
        {
          name: 'team',
          path: 'team',
          component: team
        },
        {
          name: 'orders',
          path: 'orders',
          component: orders
        },
        {
          name: 'orderm',
          path: 'orderm',
          component: orderm
        },
        {
          name: 'customer',
          path: 'customer',
          component: customer
        },
        {
          name: 'income',
          path: 'income',
          component: income
        }, {
          name: 'channels',
          path: 'channels',
          component: channels
        }, {
          name: 'marketing',
          path: 'marketing',
          component: marketing
        },
        {
          name: 'server',
          path: 'server',
          component: server
        }, {
          name: 'overview',
          path: 'overview',
          component: overview
        },
        {
          name: 'setting',
          path: 'setting',
          component: setting
        },
        {
          name: 'Coupon',
          path: 'Coupon',
          component: Coupon
        },
        {
          name: 'seckill',
          path: 'seckill',
          component: seckill
        },
        {
          name: 'gift',
          path: 'gift',
          component: gift
        },
        {
          name: 'payForgift',
          path: 'payForgift',
          component: payForgift
        },
        {
          name: 'reduceSend',
          path: 'reduceSend',
          component: reduceSend
        },
        {
          name: 'Discount',
          path: 'Discount',
          component: Discount
        },
        {

          name: 'packingBargain',
          path: 'packingBargain',
          component: packingBargain
        },
        {
          name: 'combo',
          path: 'combo',
          component: combo
        },
        {
          name: 'manyP',
          path: 'manyP',
          component: manyP
        },
        {
          name: 'mailTool',
          path: 'mailTool',
          component: mailTool
        },
        {
          name: 'Couponcode',
          path: 'Couponcode',
          component: Couponcode
        },
        {
          name: 'OrderCashback',
          path: 'OrderCashback',
          component: OrderCashback
        },
        {
          name: 'toGetPaid',
          path: 'toGetPaid',
          component: toGetPaid
        },
        {
          name: 'membercard',
          path: 'membercard',
          component: membercard
        },
        {
          name: 'addproduct',
          path: 'addproduct',
          component: addproduct
        }
      ],

    },


  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
},
  mode: 'history'

})
