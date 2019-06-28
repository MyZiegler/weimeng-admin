<!--  -->
<template>
  <div class="bg">
    <titles></titles>
    <a-form
      @submit="handleSubmit"
      :autoFormCreate="(form)=>{this.form = form}"
    >
      <template v-if="form">
        <a-form-item
          :validateStatus="userNameError() ? 'error' : ''"
          :help="userNameError() || ''"
          fieldDecoratorId="email"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入用户名!' }]}"
        >
          <a-input
            @focus="erristrue"
            placeholder='用户名'
            style="width:368px"
          >
            <a-icon
              slot="prefix"
              type='user'
              style="color:rgba(0,0,0,.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item
          :validateStatus="passwordError() ? 'error' : ''"
          :help="passwordError() || ''"
          fieldDecoratorId="password"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码!' }]}"
        >
          <a-input
            @focus="erristrue"
            type='password'
            placeholder='密码'
            style="width:368px"
          >
            <a-icon
              slot="prefix"
              type='lock'
              style="color:rgba(0,0,0,.25)"
            />
          </a-input>
          <a-alert v-if="isErr" style="width:368px;"
            message="账号或密码错误"
            type="error"
          />
        </a-form-item>
        <a-form-item>
          <a-button
            type='primary'
            htmlType='submit'
            style="width:368px"
            :disabled="hasErrors(form.getFieldsError())"
          >
            登陆
          </a-button>
        </a-form-item>
      </template>
    </a-form>
    <div class="bottomb">
      <bottom></bottom>

    </div>
  </div>
</template>

<script>
import titles from "@/components/title";
import bottom from "@/components/bottom";
// import cookie from "@/common/js/cookie.js";
// import myAxios from "@/common/js/common-api";
import JSCookie from "js-cookie";
// import accessTokenApi from "@/api/access-token-api.js";
import axios from "axios";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  data() {
    return {
      bool: true,
      bool1: false,
      cata: "",
      phonenum: "",
      hasErrors,
      form: null,
      isErr:false,
    };
  },

  components: {
    titles: titles,
    bottom: bottom
  },
  created() {
    let $this = this;

    if (JSCookie.get("accessToken")) {
      $this.redirectBack();
    }
  },
  mounted() {
    this.$nextTick(() => {
      // To disabled submit button at the beginning.
      this.form.validateFields();
    });
  },
  computed: {},

  methods: {
    erristrue(){
      this.isErr=false
    },
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("userName") && getFieldError("userName");
    },
    // Only show error after a field is touched.
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    handleSubmit(e) {
      let that = this;
      e.preventDefault();
      // console.log(e);
      this.form.validateFields((err, values) => {
        if (!err) {
          // JSCookie.set("info", values);
          console.log("Received values of form: ", values);
          // if(values.email=="admin"&&values.password=="nishengri"){

          // }
          // var xhr = new XMLHttpRequest();
          // xhr.open("GET", "http://192.168.31.109:3000/admin/login");
          // xhr.send(values);
          // xhr.onreadystatechange = function() {
          //   var DONE = 4; // readyState 4 代表已向服务器发送请求
          //   var OK = 200; // status 200 代表服务器返回成功
          //   if (xhr.readyState === DONE) {
          //     if (xhr.status === OK) {
          //       console.log(xhr.responseText); // 这是返回的文本
          //     } else {
          //       alert("账号或密码错误")
          //       console.log("Error: " + xhr.status); // 在此次请求中发生的错误
          //     }
          //   }
          // };
          axios
            .post("http://192.168.31.109:3000/admin/login", {
              params: values
            })
            .then(resp => {
              console.log(resp.data);
              let fiveDays = 60 * 60 * 24 * 5;
              if (resp.data.id) {
                JSCookie.set("accessToken", resp.data.id, {
                  expires: fiveDays
                });
                // that.redirectBack();
                // window.location.href = "http://admin.weiyun.xianqianapp.com/index";
              } else {
                this.isErr=true
                // alert("账号或密码不正确");
              }
            })
            .catch(err => {
              //失败回调
              console.log(err)
              console.log("请求失败：" + err.status + "," + err.statusText);
            });
        }
      });
    },
    redirectBack() {
      if (this.$route.query.redirect) {
        //     let redirect = decodeURIComponent(this.$route.query.redirect);
        let redirect = this.$route.query.redirect;
        this.$router.push(redirect);
      } else {
        this.$router.push("/");
      }
    },
    change() {
      this.bool = true;
      this.bool1 = false;
    },
    change1() {
      this.bool1 = true;
      this.bool = false;
    },
    onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    }
  }
};
</script>
<style scoped>
.fl {
  float: left;
}
.bg {
  background: url("../assets/注册@2x.png") no-repeat 100% 100%;
  /* text-align: center; */
  padding-left: 35%;
  /* margin: 0 auto; */
  min-width: 1200px;
  min-height: 800px;
}
.title1,
.title2 {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 24px;
  cursor: pointer;
  padding: 8px;
  margin-right: 97px;
}
.title2 {
  margin-left: 72px;
}
.check {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(24, 144, 255, 1);
  line-height: 24px;
  border-bottom: 2px solid #1890ff;
}
.inp1,
.inp2 {
  width: 368px;
  height: 40px;
  /* background:rgba(255,255,255,1); */
  border-radius: 4px;
  /* border:1px solid; */
  margin-top: 36px;
}
.selfl {
  width: 96px;
}
.self {
  margin-top: 24px;
}
.selfr {
  width: 56px;
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(24, 144, 255, 1);
  line-height: 22px;
  margin-left: 206px;
  /* margin-top: 24px; */
}
.submit {
  margin-top: 24px;
  width: 368px;
}
.name {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 22px;
  margin-top: 25px;
}
.elselogin img {
  width: 24px;
  margin-top: 24px;
  margin-left: 16px;
}
.re {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(24, 144, 255, 1);
  line-height: 22px;
  margin-top: 25px;
  margin-left: 100px;
}
.bottomb {
  margin-left: -4%;
}
</style>