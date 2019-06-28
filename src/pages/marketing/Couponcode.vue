<!--优惠券  -->
<template>
    <div class="out">
        <top1></top1>
        <div class="main clearfix">
            <div class="title">优惠码</div>
            <div class="tabs clearfix">
                <div class="all fl" :class="current==index?'check':''" v-for="(item,index) in titles" :key="item.index" v-on:click="toggle(index)">{{item.tip}}</div>

                <div class="add fr" v-on:click="add" v-if="bool">新建优惠码</div>
                <div class="search fr" v-if="bool">
                    <a-input placeholder="搜索" v-model="search"></a-input>
                </div>
            </div>
            <div class="table fl" v-if="bool">
                <a-table :columns="columns" :dataSource="data">
                    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
                    <span slot="customTitle">
                        <a-icon type="smile-o" /> Name</span>
                    <span slot="per" slot-scope="per">
                        <div>{{per*1000/10+"%"}}</div>
                    </span>
                    <div>

                    </div>
                    <span slot="action" slot-scope="text, record">
                        <a href="javascript:;" @click="editor(record)">编辑</a>
                        <a-divider type="vertical" />
                        <a href="javascript:;" class="ant-dropdown-link">
                            使失效
                        </a>
                    </span>
                </a-table>
            </div>
            <div class="addmar table clearfix" v-else>
                <div class="addmarl fl">
                    <div class="addmarlt">
                        <div class="addt clearfix">
                            <div class="pvwtitle fl">{{title}}</div>
                            <div class="share fl">分享</div>
                        </div>
                        <div class="price">{{"￥"+price}}</div>
                        <div class="moneyoff">{{outPrice?"订单满"+ outPrice+"元 (不含运费)":"订单满 xx 元 (不含运费)"}}</div>
                        <div class="date">{{"有效日期"+date}}</div>
                    </div>
                    <div class="addmarlm">使用说明</div>
                    <div class="addmarlb">{{des?des:"暂无使用说明……"}}</div>
                </div>
                <div class="addmarr fl">
                    <div class="addmarrt">
                        <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
                            <a-form-item label='优惠码名称' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="name" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your name!' }]}">
                                <a-input v-model="title"/>
                            </a-form-item>
                            <a-form-item label='码类型' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="type" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your type!' }]}">
                                <a-radio-group @change="onChange" v-model="value">
                                    <a-radio :style="radioStyle1" :value="1">一卡一码</a-radio>
                                    <a-radio :style="radioStyle1" :value="2">通用码</a-radio>
                                </a-radio-group>
                            </a-form-item>
                            <a-form-item label='生成方式' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="method" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your method!' }]}">
                                <a-radio-group @change="onChange" v-model="value1">
                                    <a-radio :style="radioStyle1" :value="1">自动生成</a-radio>
                                    <a-radio :style="radioStyle1" :value="2">倒入码库</a-radio>
                                </a-radio-group>
                            </a-form-item>
                            <a-form-item label='库存' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="count" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your count!' }]}">
                                <a-input style="width:40px;display:inline-blobk" />张
                            </a-form-item>
                            <a-form-item label='面值' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="price" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your price!' }]}">
                                <a-input v-model="price" style="width:40px;display:inline-blobk" />元
                            </a-form-item>
                            <a-form-item label='优惠门槛' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="menkan" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your menkan!' }]}">
                                <a-radio-group @change="onChange" v-model="value2">
                                    <a-radio :style="radioStyle" :value="1">订单满 <em>
                                            <a-input v-model="outPrice" style="width:40px" /> 元（不含运费） </em></a-radio>
                                    <a-radio :style="radioStyle" :value="2">无门槛 <span class="warn">请谨慎设置无门槛优惠</span></a-radio>
                                </a-radio-group>
                            </a-form-item>

                            <!-- <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
                                <a-button type='primary' htmlType='submit'>
                                    Submit
                                </a-button>
                            </a-form-item> -->
                        </a-form>
                    </div>
                    <div class="addmarrb">
                        <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
                            <a-form-item label='领取限制' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="xianz" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your xianz!' }]}">
                                <a-input style="width:40px;display:inline-blobk" />张 </a-form-item>
                            <a-form-item label='时间限制' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="timeline" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your timeline!' }]}">
                                <a-radio-group @change="onChange" v-model="value3">
                                    <a-radio :style="radioStyle" :value="1">固定时间
                                        <div class="datestart">
                                            <a-date-picker :disabledDate="disabledStartDate" showTime format="YYYY-MM-DD" v-model="startValue" placeholder="Start" @openChange="handleStartOpenChange" />
                                        </div>
                                        <div class="dateend">
                                            <a-date-picker :disabledDate="disabledEndDate" showTime format="YYYY-MM-DD " placeholder="End" v-model="endValue" :open="endOpen" @openChange="handleEndOpenChange" />
                                        </div>
                                    </a-radio>
                                    <a-radio :style="radioStyle" :value="2">领到码 <em>
                                            <a-input v-model="days" style="width:40px" /> 天有效 </em></a-radio>
                                </a-radio-group>
                            </a-form-item>
                            <a-form-item label='商品限制' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="method" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your method!' }]}">
                                <a-radio-group @change="onChange" v-model="value4">
                                    <a-radio :style="radioStyle" :value="1">全部商品 </a-radio>
                                    <a-radio :style="radioStyle" :value="2">指定商品可用</a-radio>
                                    <a-radio :style="radioStyle" :value="3">指定商品不可用</a-radio>

                                </a-radio-group>
                            </a-form-item>
                            <a-form-item label='使用说明' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="count" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your count!' }]}">
                                <a-input v-model='des' />
                            </a-form-item>

                            <!-- <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
                                <a-button type='primary' htmlType='submit'>
                                    Submit
                                </a-button>
                            </a-form-item> -->
                        </a-form>

                    </div>
                </div>

            </div>
            <div class="bottom" v-if="!bool">
                <a-button v-on:click="cancel">取消</a-button>
                <a-button type="primary">保存</a-button>
            </div>
        </div>
    </div>
</template>

<script>
import top1 from "@/components/top1";
import CouponCodeController from "@/model-controllers/coupon-code-controller";
const columns = [
  {
    title: "优惠券名称",
    dataIndex: "coupon_name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
    width: 150
  },
  {
    title: "价值",
    dataIndex: "price",
    key: "price",
    align: "center"
  },
  {
    title: "领取限制",
    dataIndex: "coupon_restriction",
    key: "confine",
    align: "center"
  },
  {
    title: "有效期",
    key: "validity",
    dataIndex: "coupon_validity",
    align: "center"
  },
  {
    title: "领取次",
    key: "count",
    dataIndex: "coupon_count",
    align: "center"
  },
  {
    title: "已使用",
    key: "used",
    dataIndex: "coupon_used",
    align: "center"
  },
  {
    title: "使用率",
    key: "rate",
    dataIndex: "coupon_rate",
    align: "center",
    scopedSlots: { customRender: "per" }
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];

const data = [
  {
    key: "1",
    name: "优惠礼包",
    price: "20.00",
    confine: "不限张数 库存:51",
    validity: "领取后一天有效",
    count: 2,
    used: 1,
    rate: 0.5
  },
  {
    key: "2",
    name: "双十一优惠券",
    price: "8折",
    confine: "不限张数 库存:50",
    validity: "2018.10.28- 2018.12.28",
    count: 3,
    used: 2,
    rate: 0.67
  },
  {
    key: "3",
    name: "全场任选免费券",
    price: "6折",
    confine: "不限张数 库存:28",
    validity: "领取后一天有效",
    count: 7,
    used: 4,
    rate: 0.57
  }
];
export default {
  data() {
    return {
      startValue: null,
      endValue: null,
      endOpen: false,
      data,
      search: "",
      columns,
      bool: true,
      title: "新人瓜果蔬菜大礼包",
      price: 20,
      price1: 0,
      price2: 10,
      price3: 5,
      count: 0,
      countx: 0,
      outPrice: "",
      value: 1,
      value1: 1,
      value2: 1,
      value3: 1,
      value4: 1,
      days: 0,
      des: "",
      radioStyle: {
        display: "block",
        height: "auto",
        lineHeight: "30px"
      },
      radioStyle1: {
        // display: "block",
        height: "auto",
        lineHeight: "30px"
      },
      date: "20xx : 00 : 00-20xx : 00 : 00",
      titles: [
        {
          item: "all",
          tip: "全部"
        },
        {
          item: "nostart",
          tip: "未开始"
        },
        {
          item: "underway",
          tip: "进行中"
        },
        {
          item: "complete",
          tip: "已结束"
        }
      ],
      current: 0
    };
  },
  watch: {
    startValue(val) {
      console.log("startValue", val);
    },
    endValue(val) {
      console.log("endValue", val);
    }
  },
  components: {
    top1: top1
  },
 mounted() {
        let that = this;
        CouponCodeController.getAllCouponCodes(function(coupons) {
          console.log(coupons)
          that.data=coupons
    });
  },
  computed: {},

  methods: {
    editor(record){
      console.log(record)
      this.bool=false,
      this.title=record.coupon_name
      
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    toggle: function(index) {
      (this.current = index), console.log(this.titles[index]);
    },
    add: function() {
      this.bool = false;
    },
    onChange(e) {
      console.log("radio checked", e.target.value);
      console.log("value", this.value);
    },
    cancel() {
      this.bool = true;
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
.out {
  background-color: #f0f2f5;
  height: 100%;
  /* min-width: 1400px; */
}
.main {
  background-color: #fff;
  /* margin: 24px; */
  /* margin-left: 280px; */
  /* min-width: 1200px; */
}
.title {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 33px;
  margin-left: 56px;
  padding-top: 30px;
  margin-bottom: 46px;
}
.all:first-child {
  margin-left: 56px;
}
.all {
  width: 80px;
  text-align: center;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 34px;

  margin-right: 37px;
}
.check {
  color: #1890ff;
  border-bottom: 2px solid #1890ff;
}
.add {
  line-height: 32px;
  background: rgba(24, 144, 255, 1);
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  width: 104px;
  margin-left: 39px;
  margin-right: 74px;
  text-align: center;
  cursor: pointer;
}
.table {
  margin: 32px;
  width: 90%;
}
.addmar {
  border-bottom: 1px solid #b7b7b7;
  width: 100%;
  /* min-width: 1200px; */
  margin: 0;
  padding-bottom: 42px;
  margin-top: 53px;
}
.addmarl {
  margin-left: 32px;
  width: 350px;
  height: 604px;
  background: rgba(243, 243, 243, 1);
  box-shadow: 0px 7px 19px 5px rgba(223, 223, 223, 0.5);
  border: 1px solid #dfdfdf;
}
.addmarlt {
  width: 350px;
  height: 200px;
  background: linear-gradient(
    135deg,
    rgba(145, 104, 255, 1) 0%,
    rgba(168, 38, 251, 1) 100%
  );
  border-radius: 6px;
}
.addmarrt {
  border-bottom: 1px solid #b7b7b7;
  /* padding-bottom: 34px; */
}
.pvwtitle {
  font-size: 20px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 28px;
  margin-left: 24px;
  padding-top: 18px;
  height: 46px;
}
.addt {
  position: relative;
}
.share {
  width: 40px;
  height: 22px;
  border-radius: 4px;
  border: 1px solid;
  font-size: 10px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 22px;
  text-align: center;
  position: absolute;
  top: 18px;
  right: 18px;
}
.price {
  font-size: 40px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 56px;
  /* margin-left: 139px; */
  text-align: center;
  margin-top: 15px;
}
.moneyoff {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 20px;
  text-align: center;
  margin-top: 19px;
}
.date {
  font-size: 10px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.55);
  line-height: 14px;
  text-align: center;
  margin-top: 3px;
}
.addmarlm {
  line-height: 50px;
  margin-left: 22px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
}
.addmarlb {
  line-height: 50px;
  background: rgba(255, 255, 255, 1);
  padding-left: 22px;
}
.addmarr {
  width: 560px;
  /* height: 791px; */
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  border: 1px solid #b7b7b7;
  margin-left: 88px;
}

.warn {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(240, 96, 111, 1);
  line-height: 17px;
}
.bottom {
  line-height: 80px;
  padding-left: 807px;
}
</style>