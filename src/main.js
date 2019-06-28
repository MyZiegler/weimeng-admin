// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Viser from 'viser-vue';
import Vue from 'vue'
//引入 ant-design-vue及其css
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
//引入js-cookie
import JSCookie from 'js-cookie'

import App from './App'
import router from './router'
import moment from 'moment';
import 'moment/locale/zh-cn';


Vue.config.productionTip = false
Vue.use(Antd);
Vue.use(Viser);
moment.locale('zh-cn');
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
});
//货币三位分割
Vue.filter('MoneyFormat', function(money) {
  if (money && money != null) {
    money = String(money);
    var left = money.split('.')[0], right = money.split('.')[1];
    right = right ? (right.length >= 2 ? '.' + right.substr(0, 2) : '.' + right + '0') : '.00';
    var temp = left.split('').reverse().join('').match(/(\d{1,3})/g);
    return (Number(money) < 0 ? '-' : '') + temp.join(',').split('').reverse().join('') + right;
  } else if (money === 0) { // 注意===在这里的使用，如果传入的money为0,if中会将其判定为boolean类型，故而要另外做===判断
    return '0.00';
  } else {
    return '';
  }
});

/* eslint-disable no-new */
//判断是否是登陆状态
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
//     if (JSCookie.get("accessToken")) {  // 判断当前的token是否存在
//       next();
//     }
//     else {
//       next({
//         path: '/login',
//         query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     }
//   }
//   else {
//     next();
//   }
// });
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

