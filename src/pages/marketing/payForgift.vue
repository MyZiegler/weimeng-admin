<!--优惠券  -->
<template>
  <div class="out">
    <top1></top1>
    <div class="main clearfix">
      <div class="title">支付有礼</div>
      <div class="tabs clearfix">
        <div class="all fl" :class="current==index?'check':''" v-for="(item,index) in titles" :key="item.index" v-on:click="toggle(index)">{{item.tip}}</div>

        <div class="add fr" v-on:click="add" v-if="bool">新建支付有礼</div>
        <div class="search fr" v-if="bool">
          <a-input placeholder="搜索" v-model="search"></a-input>
        </div>
      </div>
      <div class="table fl" v-if="bool">
        <a-table :columns="columns" :dataSource="data">
          <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
          <a slot="state" slot-scope="state" href="javascript:;">
           <div v-if="state=='USING'" class="status-cell">
                <div class="txt-status">使用中</div>
              </div>
              <div v-if="state=='close'" class="status-cell">
                <div class="txt-status">关闭</div>
              </div>
              <div v-if="state==''" class="status-cell">
                <div class="txt-status">异常</div>
              </div>
          </a>
          <span slot="customTitle">
            <a-icon type="smile-o" /> Name</span>
          <span slot="action" slot-scope="text, record">
            <a href="javascript:;">编辑</a>
            <a-divider type="vertical" />
            <a href="javascript:;" class="ant-dropdown-link">
              使失效
            </a>
          </span>
        </a-table>
      </div>
      <div class="form clearfix" v-else>
        <div class="forml fl">
          <div class="img"><img src="../../assets/支付有礼_奖励优惠券@2x.png" alt=""></div>
          <div class="imgsmall"><img src="../../assets/支付有礼_奖励优惠券1@2x.png" alt=""></div>
        </div>
        <div class="formr fl">
          <a-form>
            <a-form-item label='活动名称' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="活动名称" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your 活动名称!' }]}">
              <a-input v-model="title" style="width:224px" />
            </a-form-item>
            <a-form-item label='生效时间' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="生效时间" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your 生效时间!' }]}">
              <div>
                <a-date-picker :disabledDate="disabledStartDate" showTime format="YYYY-MM-DD" v-model="startValue" placeholder="Start" @openChange="handleStartOpenChange" />
              </div>
              <div>
                <a-date-picker :disabledDate="disabledEndDate" showTime format="YYYY-MM-DD" placeholder="End" v-model="endValue" :open="endOpen" @openChange="handleEndOpenChange" />
              </div>
            </a-form-item>
            <a-form-item label='活动内容' :labelCol="{ span: 5 }" :wrapperCol="{ span: 15 }" fieldDecoratorId="活动内容" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your 活动内容!' }]}">
              <a-radio-group :value="size" @change="handleSizeChange">
                <a-radio-button :style="radioStyle1" value="发放优惠券">发放优惠券</a-radio-button>
                <a-radio-button :style="radioStyle1" value="发放优惠码">发放优惠码</a-radio-button>
                <a-radio-button :style="radioStyle1" value="发放赠品">发放赠品</a-radio-button>
              </a-radio-group>
              <div class="btn">{{size.replace("发放","添加")}}</div>
            </a-form-item>
            <a-form-item label='优惠门槛' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="优惠门槛" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your 优惠门槛!' }]}">
              订单满 <em>
                <a-input v-model="outPrice" style="width:40px" /> 元（不含运费） </em> 
            </a-form-item>
            <a-form-item label='商品限制' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="商品限制" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your 商品限制!' }]}">
              <a-radio-group @change="onChange3" v-model="value3">
                <a-radio :style="radioStyle" :value="1">全部商品 </a-radio>
                <a-radio :style="radioStyle" :value="2">指定商品可用 <span v-if="value3==2">添加商品</span></a-radio>
                <a-radio :style="radioStyle" :value="3">指定商品不可用 <span v-if="value3==3">添加商品</span></a-radio>
              </a-radio-group>
              </a-form-item>
          </a-form>
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
import PayforgiftController from "@/model-controllers/payforgift-controller";
const columns = [
  {
    title: "优惠券名称",
    dataIndex: "activity_name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
    width: 150
  },
  {
    title: "有效期",
    key: "validity",
    dataIndex: "validity",
    align: "center"
  },

  {
    title: "活动状态",
    key: "state",
    dataIndex: "state",
    align: "center",
    scopedSlots:{customRender:'state'}
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
    validity: "领取后一天有效",
    state: 0
  },
  {
    key: "2",
    name: "双十一优惠券",
    validity: "2018.10.28- 2018.12.28",
    state: 1
  },
  {
    key: "3",
    name: "全场任选免费券",
    validity: "领取后一天有效",
    state: 0
  }
];
export default {
  data() {
    return {
      startValue: null,
      endValue: null,
      endOpen: false,
      data,
      size: "发放优惠券",
      search: "",
      columns,
      bool: false,
      title: "新人瓜果蔬菜大礼包",
      price: 20,
      price1: 0,
      price2: 10,
      price3: 5,
      count: 0,
      countx: 0,
      outPrice: "",
      value: 1,
      value3: 1,
      days: 0,
      des: "",
      radioStyle: {
        display: "block",
        height: "auto",
        lineHeight: "30px"
      },
      radioStyle1: {
        display: "inline-block",
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

  computed: {},
mounted() {
   let that = this;
        PayforgiftController.getAllPayforgifts(function(getAllPayforgifts) {
          console.log(getAllPayforgifts)
          // that.data=coupons
          that.data=getAllPayforgifts
    });
},
  methods: {
    handleSizeChange(e) {
      this.size = e.target.value;
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
    onChange1(e) {
      console.log("radio checked", e.target);
      console.log("value1", this.value1);
    },
    onChange2(e) {
      console.log("radio checked", e.target);
      console.log("value2", this.value2);
    },
    onChange3(e) {
      console.log("radio checked", e.target);
      console.log("value3", this.value3);
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
.form {
  border-bottom: 1px solid #b7b7b7;
  padding-bottom: 27px;
}
.forml {
  background-color: #f0f2f5;
  margin-left: 87px;
  margin-top: 56px;
  position: relative;
}
.formr {
  width: 560px;
  height: 690px;
  background: rgba(255, 255, 255, 1);
  border-radius: 6px;
  border: 1px solid;
  margin-left: 117px;
  margin-top: 41px;
}
.name {
  margin-left: 48px;
  margin-top: 16px;
}
.name span {
  color: rgba(240, 96, 111, 1);
}
.dateend {
  margin-left: 89px;
  margin-top: 15px;
}
.bottom {
  line-height: 80px;
  padding-left: 807px;
}
.btn {
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(24, 144, 255, 1);
  line-height: 17px;
  /* margin-left: 100px; */
}
.img img {
  width: 356px;
}
.imgsmall {
  position: absolute;
  bottom: 35px;
  left: 0;
}
.imgsmall img {
  width: 356px;
}
</style>
