<template>
  <div class="bg">
    <div class="in">
      <titles></titles>
    <div class="form">
      <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
        <a-form-item>
          <div class="re">注册</div>
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 10 }" fieldDecoratorId="email" :fieldDecoratorOptions="{rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],}">
          <a-input placeholder='邮箱' />
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 10 }" fieldDecoratorId="password" :fieldDecoratorOptions="{rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],}">
          <a-input placeholder='6 - 16 位密码，区分大小写' type='password' />
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 10 }" fieldDecoratorId="Confirm Password" :fieldDecoratorOptions="{rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],}">
          <a-input placeholder='确认密码' type='password' onBlur={this.handleConfirmBlur} />
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 10 }" fieldDecoratorId="Phone Number" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your phone number!' }],}">
          <a-input-group compact>
            <a-select defaultValue="86" style="width: 20%">
              <a-select-option value="86">+86</a-select-option>
              <a-select-option value="87">+87</a-select-option>
            </a-select>
            <a-input style="width: 80%" type='phone' />
          </a-input-group>
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 10 }" fieldDecoratorId="Captcha" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your phone number!' }],}">
          <a-input-group compact>
            <a-input style="width: 60%" type='' />
            <a-button style="width:40%">获取验证码</a-button>
          </a-input-group>
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 10, offset: 0 }">
          <a-button type='primary' htmlType='submit' class="fl" style="width: 30%">
            注册
          </a-button>
          <div class="ower fl">
            <router-link to="/login">使用已有帐户登录</router-link>
          </div>
        </a-form-item>
      </a-form>
    </div>
  
    <bottom></bottom>
    </div>
  </div>
</template>

<script>
import { Form } from "ant-design-vue";
import titles from "@/components/title";
import bottom from "@/components/bottom";
export default {
  data() {
    return {
      formLayout: "horizontal",
      name: ""
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    }
  },
  components: {
    titles: titles,
    bottom: bottom
  }
};
</script>
<style>
.fl {
  float: left;
}
.in{
  margin-left: 35%;
}
.bg {
  background: url("../assets/注册@2x.png") no-repeat 100% 100%;
  /* text-align: center; */
  /* padding-left: 35%; */
  min-width: 1200px;
  min-height: 800px;
}
.ower {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(24, 144, 255, 1);
  line-height: 22px;
  margin-left: 35%;
  margin-top: 6px;
}

.re {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
}

</style>
