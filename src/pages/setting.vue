<!--  -->
<template>
    <div class="setting">
        <div class="title">设置中心</div>
        <div class="minititle">店铺设置</div>
        <div class="main">
            <div class="clearfix">
                <div class="mainT fl">店铺名称：</div>
                <div class="des fl" v-if="bool">{{name}}</div>
                <div class="des fl" v-else>
                    <a-input class="w200" type="text" v-model="name" />

                </div>
                <div class="reset fl" v-on:click="reset" v-if="bool">修改</div>
                <!-- <div class="reset fl" v-on:click="back" v-else>返回</div> -->
            </div>
            <div class="num clearfix ">
                <div class="mainT fl">店铺编号：</div>
                <div class="des fl">{{num}}</div>
            </div>
            <div class="type clearfix">
                <div class="mainT fl">主营类目：</div>
                <div class="des fl">{{type}}</div>
            </div>
            <div class="createdate clearfix">
                <div class="mainT fl">创建日期：</div>
                <div class="des fl">{{createdate|dateformat}}</div>
            </div>
            <div class="logo clearfix">
                <div class="mainT fl" style="margin-left:196px">店铺LOGO：</div>
                <div class="img fl">
                    <a-upload name="avatar" listType="picture-card" class="avatar-uploader" :showUploadList="false" action="cos.xianqianapp.com" :beforeUpload="beforeUpload" @change="handleChange">
                        <img v-if="imageUrl" :src="imageUrl" alt="avatar" class="logo" />
                        <div v-else>
                            <a-icon :type="loading ? 'loading' : 'plus'" />
                            <div class="ant-upload-text">上传图片</div>
                        </div>
                    </a-upload>
                    <div class="tip">只支持.jpg 格式</div>
                </div>
            </div>
            <div class="about clearfix">
                <div class="mainT fl">店铺简介：</div>
                <div class=" fl">
                    <a-textarea placeholder="Basic usage" :rows="4" />

                </div>
            </div>
            <div class="phonenum clearfix">
                <div class="mainT fl">店长手机号：</div>
                <div class="des fl" v-if="bool1">{{phonenum|tostring}}</div>
                <div class="des fl" v-else>
                    <a-input class="w200" type="text" v-model="phonenum" />
                </div>
                <div class="reset fl" v-on:click="refr" v-if="bool1">修改</div>
                <!-- <div class="reset fl" v-on:click="back" v-else>返回</div> -->
            </div>
        </div>
        <div class="submit">
            <a-button type="primary" @click="back">保存</a-button>
        </div>
    </div>
</template>

<script>
import ShopConfigController from "@/model-controllers/shop-config-controller";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      name: "12414134423",
      bool: true,
      bool1: true,
      phonenum: 18401223168,
      loading: false,
      imageUrl: "",
      num:0,
      type:"",
      createdate:""
    };
  },

  components: {},

  computed: {},
mounted() {
   let that = this;
    ShopConfigController.getAllShopConfigs(function(shopconfigs) {
      that.name=shopconfigs[0].shop_name
      that.num=shopconfigs[0].shop_number
      that.type=shopconfigs[0].shop_category
      that.phonenum=shopconfigs[0].shop_manager_phone
      that.createdate=shopconfigs[0].create_time
      console.log(that.shopdetail);
    });
},
  methods: {
    reset: function() {
      this.bool = false;
    },
    refr: function() {
      this.bool1 = false;
    },back: function() {
      this.bool1 = true;
      this.bool = true;
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" ||file.type === "image/png" ;
      console.log(file)
      if (!isJPG) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("必须小于 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  filters: {
    tostring: function(value) {
      var reg = /^(\d{3})\d{4}(\d{4})$/;
      value = value.toString();
      value = value.replace(reg, "$1****$2");
      console.log(value);
      return value;
    }
  }
};
</script>
<style scoped>
.clearfix {
  overflow: auto;
}
.fl {
  float: left;
}
.setting {
  background-color: #f0f2f5;
  padding-top: 45px;
}
.title {
  width: 96px;
  height: 33px;
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 33px;
  /* padding-top: 45px; */
  /* margin-left: 357px; */
}
.minititle {
  width: 80px;
  height: 28px;
  font-size: 20px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 28px;
  margin-left:45px;
  margin-top: 45px;
}
.mainT {
  margin-left: 224px;
  margin-top: 27px;
  /* width: 227px; */
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 22px;
}
.des {
  margin-top: 27px;
  /* width: 227px; */
  /* height: 22px; */
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 22px;
}
.reset {
  width: 32px;
  /* height: 22px; */
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(74, 144, 226, 1);
  line-height: 22px;
  margin-top: 27px;
  margin-left: 74px;
  cursor: pointer;
}
.w200 {
  width: 200px;
}
.tip {
  /* width: 99px; */
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.45);
  line-height: 22px;
  margin-top: 8px;
  margin-bottom: 23px;
}
.logo {
  /* width: 104px; */
}
.line {
  width: 984px;
  height: 1px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  margin-left: 356px;
  margin-top: 33px;
}
.submit {
  /* background-color: #fff; */
  padding-left: 363px;
  padding-top: 28px;
  margin-top: 28px;
}
</style>