<!--  -->
<template>
  <!-- <div>tab4</div> -->
  <div class="out">
    <top1></top1>
    <div
      class="main clearfix"
      style="margin:24px"
    >
      <div class="title clearfix">
        <div
          class="titlel fl"
          v-if="!product_id"
        >添加商品</div>
        <div
          class="titlel fl"
          v-else
        >修改商品</div>
      </div>
      <div class="form">
        <a-form
          @submit="handleSubmit"
          :autoFormCreate="(form)=>{this.form = form}"
        >
          <a-form-item
            label='商品名称'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
            fieldDecoratorId="product_name"
            getFieldDecorator='product_name'

            :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入您的商品名称!' }]}"
          >
            <a-input
              v-model="product_name"
              style="width:470px;height:32px"
              placeholder="商品标题名称必须填写，最多100字。"
            />
          </a-form-item>
          <a-form-item
            label='分享描述'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
            fieldDecoratorId="product_share_description"
          >
            <a-input
              style="width:470px;height:32px"
              placeholder="描述会在微信分享出的链接中显示"
            />
          </a-form-item>
          <a-form-item
            label='图片'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
            fieldDecoratorId="product_imgs"
          >
            <div class="clearfix">
              <a-upload
                action="http://192.168.31.109:3000/api/StorageFiles/upload"
                listType="picture-card"
                :fileList="fileList"
                @preview="handlePreview"
                @change="handleChange"
                :showUploadList='true'
              >
                <div v-if="fileList.length < 8">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">Upload</div>
                </div>
              </a-upload>
              <a-modal
                :visible="previewVisible"
                :footer="null"
                @cancel="handleCancel"
              >
                <img
                  alt="example"
                  style="width: 100%"
                  :src="previewImage"
                />
              </a-modal>
            </div>
            <div class="tips">建议尺寸：800*800像素，你可以拖拽图片调整顺序，最多上传15张</div>
          </a-form-item>
          <div style="background:#F5F5F5;width:100%;">
            <a-form-item
              label='商品类目'
              :labelCol="{ span: 5 }"
              :wrapperCol="{ span: 12 }"
              fieldDecoratorId="product_type"
            >
              <a-select
                defaultValue="lucy"
                style="width: 120px"
                @change="handleChange1"
              >
                <a-select-option
                  :value="item.value"
                  v-for="item in selects"
                  :key="item.index"
                >{{item.tip}}</a-select-option>
              </a-select>
              <div class="tips">商品类目及类目细项</div>
            </a-form-item>
            <a-form-item
              label='商品分组'
              :labelCol="{ span: 5 }"
              :wrapperCol="{ span: 12 }"
              fieldDecoratorId="product_list"
            >

              <div>
                <a-select
                  :defaultValue="provinceData[0]"
                  v-model="province"
                  style="width: 120px"
                  @change="handleProvinceChange"
                >
                  <a-select-option
                    v-for="province in provinceData"
                    :key="province"
                  >{{province}}</a-select-option>
                </a-select>
                <a-select
                  v-model="secondCity"
                  style="width: 120px"
                >
                  <a-select-option
                    v-for="city in cities"
                    :key="city"
                  >{{city}}</a-select-option>
                </a-select>
                <router-link to="/index/team">去新建分组</router-link>
              </div>

            </a-form-item>
            <a-form-item
              label='商品卖点'
              :labelCol="{ span: 5 }"
              :wrapperCol="{ span: 12 }"
              fieldDecoratorId="sell_ponit"
            >
              <a-input
                style="width:457px;height:32px"
                placeholder="在商品详情页标题下面展示卖点信息，建议60字以内"
              />
            </a-form-item>
          </div>

          <a-form-item
            label='商品规格'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
            fieldDecoratorId="property_id_list"
          >
            <div v-if="typevalue>=1">
              <div class="typename">
                <span>规格名：</span>
                  <a-select
                defaultValue="lucy"
                style="width: 120px"
                @change="handleChange1"
              >
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
              </a-select>
              </div>
              <div class="typevalue"> 规格值：<span v-for="item in values1" :key="item.index" style="position:relative"><a-input  style="width:97px;margin-right:15px"></a-input><img src="../assets/system-closea.png" class="closeimg" @click="subValue1(item.index)"> </span>  <span @click="addValue1">添加规格值</span>  </div>
            </div>
            <div v-if="typevalue>=2">2</div>
            <div v-if="typevalue>=3">3</div>
            <a-button
              @click="addType"
              :disabled="typevalue==3"
            >添加规格</a-button> <span
              class="tips"
              v-if="typevalue==3"
            >规格最多只能添加三项</span>
          </a-form-item>
          <a-form-item
            label='价格'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
            fieldDecoratorId="product_current_price"
            :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入您的价格!' }]}"
          >
            <a-input
              style="width:161px;height:32px"
              placeholder="请输入价格"
            />
          </a-form-item>
          <a-form-item
            label='划线价'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
            fieldDecoratorId="product_origin_price"
          >
            <a-input
              style="width:161px;height:32px"
              placeholder="请输入价格"
            />
            <div class="tips">商品没有优惠的情况下，划线价在商品详情会以划线形式显示</div>
          </a-form-item>
          <a-form-item
            label='库存'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
            fieldDecoratorId="product_stock"
            :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入您的库存!' }]}"
          >
            <a-input
              style="width:97px;height:32px"
              placeholder="请输入库存"
            />
            <div class="tips">库存为0时，会放到「已售罄」的商品列表里</div>
          </a-form-item>
          <div style="background:#f5f5f5;width:100%">
            <a-form-item
              label='运费'
              :labelCol="{ span: 5 }"
              :wrapperCol="{ span: 12 }"
              fieldDecoratorId="mail_price"
              :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入您的运费!' }]}"
            >
              <a-radio-group
                @change="onChange"
                v-model="value"
              >

                <a-radio
                  :style="radioStyle"
                  :value="1"
                >固定
                  <a-input
                    v-model='mail'
                    placeholder="请输入价格"
                  />
                </a-radio>
                <a-radio
                  :style="radioStyle"
                  :value="2"
                >自动运费
                  <a-select
                    defaultValue="10"
                    style="width: 120px"
                    @change="changeSelect"
                    v-model="value2"
                  >
                    <a-select-option value="10">10</a-select-option>
                    <a-select-option value="20">20</a-select-option>
                    <a-select-option value="30">30</a-select-option>
                  </a-select>
                </a-radio>

              </a-radio-group>
              <div class="tips">运费模版支持按地区设置运费，按购买件数计费，按重量计算运费</div>
            </a-form-item>
          </div>
          <a-form-item
            label='商品详情'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
            fieldDecoratorId="product_description"
          >
            <editor
              :text="text"
              @parent="parent"
            ></editor>
          </a-form-item>
          <div style="height:1px;width:100%;background:#B7B7B7;margin-bottom:21px"></div>
          <a-form-item :wrapperCol="{ span: 18, offset: 5 }">
            <a-button style="margin-left:807px;margin-right:24px" @click="cancel">取消 </a-button>
            <a-button
              type='primary'
              htmlType='submit'
            >
              完成
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>

  </div>
</template>

<script>
import top1 from "@/components/top1";
import editor from "@/components/editor";
import ProductController from "@/model-controllers/product-controller";
const provinceData = ["Zhejiang", "Jiangsu"];
const cityData = {
  Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],
  Jiangsu: ["Nanjing", "Suzhou", "Zhenjiang"]
};
export default {
  data() {
    return {
      selects: [
        {
          value: "women",
          tip: "女人"
        },
        {
          value: "men",
          tip: "男人"
        },
        {
          value: "food",
          tip: "食品"
        },
        {
          value: "beautiful",
          tip: "美妆"
        },
        {
          value: "child",
          tip: "亲子"
        },
        {
          value: "inhome",
          tip: "居家"
        },
        {
          value: "Appliances",
          tip: "数码家电"
        },
        {
          value: "giftAndflower",
          tip: "礼品鲜花"
        },
        {
          value: "eats",
          tip: "餐饮外卖"
        },
        {
          value: "Fitness",
          tip: "丽人健身"
        },
        {
          value: " Recreation",
          tip: "休闲娱乐"
        },
        {
          value: "hotel",
          tip: "酒店客栈"
        },
        {
          value: "Wedding ",
          tip: "婚庆摄影"
        },
        {
          value: "cars",
          tip: "汽车养护"
        },
        {
          value: "houseserver",
          tip: "家政服务"
        },
        {
          value: "cards",
          tip: "门票卡券"
        },
        {
          value: "buildings",
          tip: "家装建材"
        },
        {
          value: "Glasses",
          tip: "钟表眼镜"
        },
        {
          value: "pet",
          tip: "宠物"
        },
        {
          value: "collect",
          tip: "文化收藏"
        },
        {
          value: "dailyuse",
          tip: "日用百货"
        },
        {
          value: "Education",
          tip: "教育培训"
        },
        {
          value: " Mediaserver",
          tip: "媒体服务"
        },
        {
          value: "pay",
          tip: "充值缴费"
        },
        {
          value: "others",
          tip: "其它"
        }
      ],
      values1:[],
      product_name: "",
      formLayout: "horizontal",
      previewVisible: false,
      previewImage: "",
      fileList: [],
      text: "",
      mail: 0,
      provinceData,
      cityData,
      value: 1,
      typevalue: 0,
      product_id: 0,
      province: provinceData[0],
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
      value2: 1,
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px"
      },
      onChange(e) {
        console.log("radio checked", e.target.value);
      }
    };
  },
  //创建前
  beforeCreate () {
    this.product_name = this.$route.params.product_name;
    
  },
  created() {
    // this.product_id = this.$route.params.product_id;
    this.text = this.$route.params.product_description;
  },

  mounted() {
    console.log(this.$route.params);
    this.product_name = this.$route.params.product_name;

  },
  components: {
    top1: top1,
    editor: editor
  },

  computed: {},

  methods: {
    addType() {
      this.typevalue++;
    },
    addValue1(){
      this.values1.push("")
    },
    subValue1(index){
      this.values1.splice(index,1)

    },
    handleSubmit(e) {
      e.preventDefault();
      console.log(this.secondCity, this.province);
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.value == 1) {
            values.mail_price = this.mail;
          } else {
            values.mail_price = this.value2;
          }
          console.log("Received values of form: ", values);
          ProductController.addProduct(values, function(data) {
            console.log(data);
          });
        }
      });
    },
    parent() {},
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
      console.log(fileList);
      console.log(this.fileList);
    },
    handleChange1(value) {
      console.log(`selected ${value}`);
    },
    handleProvinceChange(value) {
      this.cities = cityData[value];
      this.secondCity = cityData[value][0];
    },
    changeSelect(value) {
      console.log(`selected ${value}`);
    },
    handleChange1(value) {
      console.log(`selected ${value}`);
    },
    //点击取消按钮跳回到上一页
    cancel(){
      history.go(-1)
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
.fr {
  float: right;
}
.icon {
  position: absolute;
  font-size: 14px;
  top: 10px;
  right: 45px;
  color: rgba(0, 0, 0, 0.25);
}
.out {
  background-color: #f0f2f5;
  height: 100%;
  min-width: 1200px;
}
.main {
  /* margin: 24px; */
  height: auto;
  background-color: #fff;
  /* margin-left: 280px; */
  /* padding-left: 32px; */
}
.title {
  padding-top: 24px;
  margin-bottom: 42px;
  margin-left: 68px;
}
.titlel {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 33px;
}
.tips {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(183, 183, 183, 1);
  line-height: 20px;
  margin-top: 12px;
}
.closeimg{
  width: 10px;
  height: 10px;
  position: absolute;
  /* position: relative; */
  z-index: 99;
  /* top:0; */
  right: 10px;
}
</style>