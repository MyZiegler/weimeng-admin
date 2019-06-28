<!-- -->
<template>
  <div class="page-marketing">
    <top1></top1>
    <div class="center clearfix">
      <div class="head">
        <div class="title">会员卡</div>
      </div>
      <div class="tabs">
        <a-tabs defaultActiveKey="1" @change="callback">
          <a-tab-pane tab="无门槛会员卡" key="1">
            <div class="list" v-if="bool">
              <div class="card fl" v-for="item in cardlist" :key="item.index"> 
                <div class="name">{{item.card_name}}</div>
                <div class="bgbox" :style="{backgroud:item.card_color}">
                  <img src="" alt="">
                </div>
                <div class="clearfix cardb">
                  <div class="fl edit">编辑</div>
                  <div class="fl delete">删除</div>
                </div>
              </div>
            
              <div class="add fl" v-on:click='add'>
                <div class="addin">
                  +
                </div>
                <div class="addnew">
                  新建会员卡
                </div>
              </div>
            </div>
            <div class="form clearfix" v-else>
              <div class="forml fl">
                <img src="../../assets/card@2x.png" alt="">
                <div class="cardsin" :style="{backgroundColor:colorCell[colorRadioValue].color}">
                  <div class="clearfix">
                    <div class="shoplogo fl"></div>
                    <div class="shoptitle fl">{{title}}</div>
                    <div class="imglink fr"></div>
                  </div>
                  <div class="validity">有效期：</div>
                </div>
              </div>
              <div class="formr fl">
                <div class="formtop">
                  <a-form>
                    <a-form-item label='店铺名称' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="name">
                      {{title}}
                    </a-form-item>
                    <a-form-item label='店铺logo' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="logo">
                      <img src="" alt="">
                    </a-form-item>
                    <a-form-item label='卡片样式' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="type">
                      <a-radio-group @change="onChange" v-model="value">
                        <a-radio :style="radioStyle" :value="1">纯色背景
                          <a-radio-group :defaultValue='0' @change="colorRadioChange" v-model="colorRadioValue">
                            <a-radio-button :style="colorCellStyle" :value="index" v-for="(item,index) in colorCell" :key="index">
                              <div class="color-cell" :style="{backgroundColor:item.color}"></div>
                            </a-radio-button>
                          </a-radio-group>
                        </a-radio>
                        <a-radio :style="radioStyle" :value="2">图片背景</a-radio>
                      </a-radio-group>
                    </a-form-item>
                    <a-form-item label='卡片名称' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="cardname">
                      <a-input v-model="title" />
                    </a-form-item>
                    <a-form-item label='会员权益' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="vip">
                      <a-row>
                        <a-col :span="24">
                          <a-checkbox value="A">包邮</a-checkbox>
                        </a-col>
                        <a-col :span="24">
                          <a-checkbox value="B">打折 <a-input v-model="zhe" style="width:40px"></a-input> 折</a-checkbox>
                        </a-col>
                        <a-col :span="24">
                          <a-checkbox value="C">送优惠券</a-checkbox>
                        </a-col>
                        <a-col :span="24">
                          <a-checkbox value="D">送积分<a-input v-model="fen" style="width:40px"></a-input> 积分</a-checkbox>
                        </a-col>
                      </a-row>
                    </a-form-item>
                    <a-form-item label='使用须知' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="cardname">
                      <a-textarea :autosize="{ minRows: 2, maxRows: 6 }" style="width:224px;height:115px" />
                    </a-form-item>
                    <a-form-item label='客服电话' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="phonenum">
                      <a-input v-model="num" />
                    </a-form-item>
                  </a-form>
                </div>
                <div class="formbot">
                  <a-form>

                    <a-form-item label='会员期限' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="type">
                      <a-radio-group @change="onChange" v-model="value1">
                        <a-radio :style="radioStyle" :value="1">无限期</a-radio>
                        <a-radio :style="radioStyle" :value="2">
                          <a-input v-model="days"></a-input> 天
                        </a-radio>
                        <a-radio :style="radioStyle" :value="3">
                          <a-date-picker :disabledDate="disabledStartDate" showTime format="YYYY-MM-DD " v-model="startValue" placeholder="Start" @openChange="handleStartOpenChange" />

                          <div class="end">
                            <a-date-picker :disabledDate="disabledEndDate" showTime format="YYYY-MM-DD" placeholder="End" v-model="endValue" :open="endOpen" @openChange="handleEndOpenChange" />
                          </div>
                        </a-radio>
                      </a-radio-group>
                    </a-form-item>
                    <a-form-item label='过期调整' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="phonenum">
                      <a-select defaultValue="lucy" style="width: 120px" @change="handleChange">
                        <a-select-option value="jack">非会员</a-select-option>
                        <a-select-option value="lucy">会员</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-form>
                </div>
              </div>
            </div>
          </a-tab-pane>
          <a-tab-pane tab="按规则会员卡" key="2">
            <div class="list" v-if="bool">
              <div class="card fl">
                <div class="name">shen</div>
                <img src="../../assets/card_red@2x.png" alt="">
                <div class="clearfix cardb">
                  <div class="fl edit">编辑</div>
                  <div class="fl delete">删除</div>
                </div>
              </div>
              <div class="card fl">
                <div class="name">shen</div>
                <img src="../../assets/card_black@2x.png" alt="">
                <div class="clearfix cardb">
                  <div class="fl edit">编辑</div>
                  <div class="fl delete">删除</div>
                </div>
              </div>
              <div class="add fl" v-on:click='add'>
                <div class="addin">
                  +
                </div>
                <div class="addnew">
                  新建会员卡
                </div>
              </div>
            </div>
            <div class="form clearfix" v-else>
              <div class="forml fl">
                <img src="../../assets/card@2x.png" alt="">
                <div class="cardsin" :style="{backgroundColor:colorCell[colorRadioValue].color}">
                  <div class="clearfix">
                    <div class="shoplogo fl"></div>
                    <div class="shoptitle fl">{{title}}</div>
                    <div class="imglink fr"></div>
                  </div>
                  <div class="validity">有效期：</div>
                </div>
              </div>
              <div class="formr fl">
                <div class="formtop">
                  <a-form>
                    <a-form-item label='店铺名称' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="name">
                      {{title}}
                    </a-form-item>
                    <a-form-item label='店铺logo' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="logo">
                      <img src="" alt="">
                    </a-form-item>
                    <a-form-item label='卡片样式' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="type">
                      <a-radio-group @change="onChange" v-model="value">
                        <a-radio :style="radioStyle" :value="1">纯色背景
                          <a-radio-group :defaultValue='0' @change="colorRadioChange" v-model="colorRadioValue">
                            <a-radio-button :style="colorCellStyle" :value="index" v-for="(item,index) in colorCell" :key="index">
                              <div class="color-cell" :style="{backgroundColor:item.color}"></div>
                            </a-radio-button>
                          </a-radio-group>
                        </a-radio>
                        <a-radio :style="radioStyle" :value="2">图片背景</a-radio>
                      </a-radio-group>
                    </a-form-item>
                    <a-form-item label='卡片名称' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="cardname">
                      <a-input v-model="title" />
                    </a-form-item>
                    <a-form-item label='会员权益' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="vip">
                      <a-row>
                        <a-col :span="24">
                          <a-checkbox value="A">包邮</a-checkbox>
                        </a-col>
                        <a-col :span="24">
                          <a-checkbox value="B">打折 <a-input v-model="zhe" style="width:40px"></a-input> 折</a-checkbox>
                        </a-col>
                        <a-col :span="24">
                          <a-checkbox value="C">送优惠券</a-checkbox>
                        </a-col>
                        <a-col :span="24">
                          <a-checkbox value="D">送积分<a-input v-model="fen" style="width:40px"></a-input> 积分</a-checkbox>
                        </a-col>

                      </a-row>
                    </a-form-item>
                    <a-form-item label='使用须知' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="cardname">
                      <a-textarea :autosize="{ minRows: 2, maxRows: 6 }" style="width:224px;height:115px" />
                    </a-form-item>
                    <a-form-item label='客服电话' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="phonenum">
                      <a-input v-model="num" />
                    </a-form-item>
                  </a-form>
                </div>
                <div class="formbot">
                  <a-form>

                    <a-form-item label='会员期限' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="type">
                      <a-radio-group @change="onChange" v-model="value1">
                        <a-radio :style="radioStyle" :value="1">无限期</a-radio>
                        <a-radio :style="radioStyle" :value="2">
                          <a-input v-model="days"></a-input> 天
                        </a-radio>
                        <a-radio :style="radioStyle" :value="3">
                          <a-date-picker :disabledDate="disabledStartDate" showTime format="YYYY-MM-DD " v-model="startValue" placeholder="Start" @openChange="handleStartOpenChange" />

                          <div class="end">
                            <a-date-picker :disabledDate="disabledEndDate" showTime format="YYYY-MM-DD" placeholder="End" v-model="endValue" :open="endOpen" @openChange="handleEndOpenChange" />
                          </div>
                        </a-radio>
                      </a-radio-group>
                    </a-form-item>
                    <a-form-item label='过期调整' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="phonenum">
                      <a-select defaultValue="lucy" style="width: 120px" @change="handleChange">
                        <a-select-option value="jack">非会员</a-select-option>
                        <a-select-option value="lucy">会员</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-form>
                </div>
              </div>
            </div>

          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import top1 from "@/components/top1";
import MemberCardController from "@/model-controllers/member-card-controller";

export default {
  data() {
    return {
      bool: true,
      title: "良品铺子",
      formLayout: "horizontal",
      value: 1,
      value1: 1,
      zhe: 0,
      fen: 0,
      num: 0,
      days: 0,
      cardlist:[],
      startValue: null,
      endValue: null,
      endOpen: false,
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px"
      },
      colorCell: [
        {
          color: "#EE3E3E",
          imgUrl: "../../static/payhelp_red.png"
        },
        {
          color: "#EEA03E",
          imgUrl: "../../static/payhelp_yellow.png"
        },
        {
          color: "#4EB024",
          imgUrl: "../../static/payhelp_green.png"
        },
        {
          color: "#5357C2",
          imgUrl: "../../static/payhelp_blue.png"
        },
        {
          color: "#B02482",
          imgUrl: "../../static/payhelp_purple.png"
        }
      ],
      colorRadioValue: 0,
      colorCellStyle: {
        width: "22px",
        height: "22px",
        marginRight: "20px",
        padding: "0",
        marginTop: "10.5px"
      }
    };
  },

  components: {
    top1: top1
  },
  watch: {
    startValue(val) {
      console.log("startValue", val);
    },
    endValue(val) {
      console.log("endValue", val);
    }
  },
  computed: {},
  mounted() {
    let that = this;
    MemberCardController.getAllMemberCards(function(getAllMemberCards) {
      console.log(getAllMemberCards);
      // that.data=coupons
      that.cardlist = getAllMemberCards;
      
    });
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    add() {
      this.bool = false;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    onChange(e) {
      console.log("radio checked", e.target.value);
    },
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    colorRadioChange(e) {
      console.log(e.target.value);
      var imgIndex = e.target.value;
      var arr = this.colorCell;
      console.log(arr[imgIndex]);
      this.backgroundUrl = arr[imgIndex].imgUrl;
      this.value = 1;
    },
    onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    }
  }
};
</script>
<style scoped>
.page-marketing {
  /* min-width: 1400px; */
  background-color: #f0f2f5;
  height: 100%;
}
.clearfix {
  overflow: auto;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
/*中间动态内容区域*/
.center {
  box-sizing: border-box;
  border-radius: 2px;
  /* margin: 24px 24px 24px 280px; */
  height: auto;
  background-color: #fff;
  /*不同页面的padding*/
  padding: 30px 0 0;
}
.head,
.table-area {
  padding: 0 55px;
}
.center .head > .title {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  padding: 12px;
}
.center .head > .options-bar {
  height: 48px;
  margin: 34px 0;
}
.tabs {
  padding-left: 48px;
}
.tabs > .ant-tabs-card > .ant-tabs-bar {
  border: none;
}
.card {
  position: relative;
}
.name {
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: black;
  line-height: 33px;
  position: absolute;
  left: 22px;
  top: 23px;
}
.card:first-child {
  margin-left: 0;
}
.card {
  margin-left: 93px;
}
.card img {
  width: 287px;
}
.bgbox{
  width: 287px;
  height: 146px;
}
.cardb {
  width: 287px;
  line-height: 40px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid;
  margin-top: -6px;
}
.edit {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(24, 144, 255, 1);
  cursor: pointer;
  margin-left: 187px;
  margin-right: 15px;
}
.delete {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(240, 96, 111, 1);
  cursor: pointer;
}
.add {
  width: 287px;
  height: 186px;
  background: rgba(243, 243, 243, 1);
  border-radius: 6px;
  border: 1px solid #979797;
  text-align: center;
  margin-left: 93px;
  cursor: pointer;
}
.addin {
  width: 104px;
  height: 104px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  font-size: 140px;
  font-weight: 100;
  text-align: center;
  border: 1px dashed #979797;
  margin-left: 92px;
  margin-top: 26px;
  line-height: 79px;
}
.addnew {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.45);
  line-height: 22px;
  text-align: center;
  margin-top: 13px;
}
.form {
  margin: 44px;
}
.forml {
  position: relative;
}
.forml img {
  width: 429px;
}
.cardsin {
  position: absolute;
  top: 92px;
  left: 29px;
  width: 372px;
  height: 193px;
  background: rgba(217, 72, 72, 1);
  border-radius: 5px;
}
/* .tabs > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
} */
.shoplogo {
  width: 29px;
  height: 29px;
  background-color: #fff;
  margin-left: 26px;
  margin-top: 23px;
}
.shoptitle {
  /* width: 55px; */
  height: 19px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 19px;
  margin-left: 9px;
  margin-top: 28px;
}
.imglink {
  width: 22px;
  height: 22px;
  background: rgba(255, 255, 255, 1);
  margin: 26px;
}
.validity {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 19px;
  margin-top: 72px;
  margin-left: 26px;
}
.formr {
  width: 560px;
  margin-left: 32px;
  border: 1px solid #b7b7b7;
}
.end {
  margin-top: 10px;
  margin-left: 24px;
}
.color-cell {
  height: 18px;
  width: 18px;
  margin: 0 auto;
}
</style>
