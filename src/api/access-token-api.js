import Vue from 'vue';
import axios from 'axios';

const myAxios = axios.create({
  baseURL: `https://esteelauderpos.com`,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
});

export default {
  /**
   * 员工登录
   */
  employeeLogin(loginData, onComplete, onFail) {
    myAxios.post('/employee/login', loginData).then(response => {
      if (response.status === 200) {
        onComplete && onComplete(response.data);

        return;
      }

      Vue.AlertModule.show({
        title: '登录失败',
        content: response.data.message,
        buttonText: '好的',
        onShow() { },
        onHide() { },
      });

      onFail && onFail();
    }, (errorRequest) => {
      onFail && onFail(errorRequest.response.data);
    }).catch(error => {
      console.log("appApi.companyStaffLogin error,", error);
    });
  },

  verifyAccessToken(accessToken, onSuccess, onFail) {
    myAxios.get('/access-token/validate?access_token=' + accessToken).then(response => {
      if (response.status === 200) {
        if (response.data.result === 'success') {
          onSuccess && onSuccess(response.data.data);

          return;
        }
      }

      onFail && onFail();
    }).catch(error => {
      console.log("appApi.verifyAccessToken error,", error);
    });
  },

  /**
   * 获取signature
   */
  getSignature(successCallback) {
    myAxios.post('/wechat/compose-jsapi-signature', {
      url: location.href.replace(location.hash, ''),
    }).then(response => {
      successCallback && successCallback.call(this, response.data.data);
    }).catch(error => {
      // errCb(error);
      console.log('addGroupOrder fail', error);
    });
  },
}
