<!--优惠券  -->
<template>
  <div class="out">
    <top1></top1>
    <div class="main clearfix">
      <div class="title">优惠套餐</div>
      <div class="tabs clearfix">
        <div class="all fl" :class="current==index?'check':''" v-for="(item,index) in titles" :key="item.index" v-on:click="toggle(index)">{{item.tip}}</div>

        <div class="add fr" v-on:click="add" v-if="bool">新建优惠活动</div>
        <div class="search fr" v-if="bool">
          <a-input placeholder="搜索" v-model="search"></a-input>
        </div>
      </div>
      <div class="table fl" v-if="bool">
        <a-table :columns="columns" :dataSource="data">
          <div slot="name" slot-scope="text">{{text}}</div>
          <div slot="state" slot-scope="state">
           <div v-if="state=='USING'" class="status-cell">
                <div class="txt-status">使用中</div>
              </div>
              <div v-if="state=='close'" class="status-cell">
                <div class="txt-status">关闭</div>
              </div>
              <div v-if="state==''" class="status-cell">
                <div class="txt-status">异常</div>
              </div>
          </div>
          <span slot="customTitle">
            <a-icon type="smile-o" /> Name</span>
          <span slot="per" slot-scope="per">
            <div>{{per*1000/10+"%"}}</div>
          </span>
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
          <img src="../../assets/优惠套餐@2x.png" alt="">
          <div class="pos">
            <div class="post">优惠套餐 <span>节省¥99</span></div>
            <div class="imgs">
              <div class="img1 fl">
                <img src="../../assets/pic_marketing1@2x.png" alt="">
                ¥45
              </div>
              <span class="fl">+</span>
              <div class="img1 fl">
                <img src="../../assets/pic_marketing1@2x.png" alt="">
                ¥45
              </div>
              <span class="fl">+</span>
              <div class="img1 fl">
                <img src="../../assets/pic_marketing1@2x.png" alt="">
                ¥45
              </div>
            </div>
          </div>
        </div>
        <div class="formr fl">
          <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
            <a-form-item label='活动名称' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="note" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your note!' }]}">
              <a-input />
            </a-form-item>
            <a-form-item label='生效时间' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="note" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your note!' }]}">
              <a-date-picker :disabledDate="disabledStartDate" showTime format="YYYY-MM-DD HH:mm:ss" v-model="startValue" placeholder="Start" @openChange="handleStartOpenChange" />
              <a-date-picker :disabledDate="disabledEndDate" showTime format="YYYY-MM-DD HH:mm:ss" placeholder="End" v-model="endValue" :open="endOpen" @openChange="handleEndOpenChange" />
            </a-form-item>
            <a-form-item>
              <div class="table">
                <div>
                  <div style="margin-bottom: 16px">
                    <a-button type="primary" @click="start" :disabled="!hasSelected" :loading="loading">
                      全部移除
                    </a-button>
                    <span style="margin-left: 8px">
                      <template v-if="hasSelected">
                        {{`已选中 ${selectedRowKeys.length} 条`}}
                      </template>
                      <div slot="operation" slot-scope="text, record">
                        <a-popconfirm v-if="datas.length" title="Sure to delete?" @confirm="() => onDelete(record.key)">
                          <a href="javascript:;">Delete</a>
                        </a-popconfirm>
                      </div>
                    </span>
                  </div>
                  <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="tables" :dataSource="datas" />
                </div>
              </div>
            </a-form-item>
            <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
              <a-button type='primary' htmlType='submit'>
                Submit
              </a-button>
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
import DiscountComboController from "@/model-controllers/discount-combo-controller";

import top1 from "@/components/top1";
const provinceData = ["Zhejiang", "Jiangsu"];
const cityData = {
  Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],
  Jiangsu: ["Nanjing", "Suzhou", "Zhenjiang"]
};
const tables = [
  {
    title: "商品信息",
    dataIndex: "name",
    algin: "center"
  },
  {
    title: "库存",
    dataIndex: "count",
    algin: "center"
  },
  {
    title: "原价",
    dataIndex: "origin",
    algin: "center"
  },
  {
    title: "operation",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

const datas = [];
for (let i = 0; i < 3; i++) {
  datas.push({
    key: i,
    name: `Edward King ${i}`,
    count: 32,
    origin: i
  });
}
const columns = [
  {
    title: "活动名称",
    dataIndex: "activity_name",
    key: "activity_name",
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
    dataIndex: "state",
    key: "state",
    align: "center"
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
    confine: "正在进行",
    validity: "领取后一天有效"
  },
  {
    key: "2",
    name: "双十一优惠券",
    confine: "不限张数 库存:50",
    validity: "2018.10.28- 2018.12.28"
  },
  {
    key: "3",
    name: "全场任选免费券",
    confine: "不限张数 库存:28",
    validity: "领取后一天有效"
  }
];
export default {
  data() {
    return {
      datas,
      tables,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      formLayout: "horizontal",
      startValue: null,
      endValue: null,
      endOpen: false,
      data,
      search: "",
      columns,
      time: 1541489371,
      hour: 10,
      minute: 10,
      seconds: 1,
      bool: true,
      title: "迷你烤香肠145g炭烤味",
      price: "¥ 20",
      name: "",
      origin: 16.7,
      count: 0,
      countx: 0,
      outPrice: "",
      days: 0,
      des: "",
      value: 1,

      radioStyle: {
        display: "block",
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
        DiscountComboController.getAllDiscountCombos(function(getAllDiscountCombos) {
          console.log(getAllDiscountCombos)
          that.data=getAllDiscountCombos
          // that.data=coupons
    });
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    }
  },

  methods: {
    toggle: function(index) {
      (this.current = index), console.log(this.titles[index]);
    },
    onChange(e) {
      console.log("radio checked", e.target.value);
    },
    add: function() {
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
    start() {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    cancel() {
      this.bool = true;
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
.forml {
  width: 353px;
  /* height: 195px;   */
  border-radius: 6px;
  border: 1px solid #b7b7b7;
  margin-left: 64px;
  margin-top: 34px;
  /* padding-left: 16px; */
  position: relative;
}
.formlt {
  font-size: 15px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 21px;
  margin-top: 15px;
}
.current {
  font-size: 18px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 59, 48, 1);
  line-height: 25px;
  margin-top: 6px;
}
.name {
  font-size: 10px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  line-height: 14px;
  padding: 2px;
  background: rgba(218, 41, 41, 1);
  margin-left: 10px;
  margin-top: 8px;
  margin-right: 14px;
}
.origin {
  font-size: 13px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 19px;
  margin-top: 8px;
}
.origin em {
  text-decoration: line-through;
}
.time {
  margin-top: 3px;
  border: 1px solid rgba(218, 41, 41, 1);
  /* line-height: 27px; */
  width: 210px;
}
.time span:first-child {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  line-height: 27px;
  background: rgba(218, 41, 41, 1);
  padding: 0px 7px;
  display: inline-block;
}
.time span:last-child {
  display: inline-block;
  width: 120px;
  margin-left: -4px;
}
.time em {
  font-size: 12px;
  font-family: HelveticaNeue;
  color: rgba(218, 41, 41, 1);
  line-height: 15px;
}
.time i {
  font-size: 12px;
  font-family: HelveticaNeue;
  color: #000;
  line-height: 15px;
}
.tags {
  margin-top: 12px;
}
.tags span {
  font-size: 13px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 19px;
}
.tags span:first-child {
  margin-right: 42px;
}
.tags span:last-child {
  margin-left: 29px;
}
.mailtt {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 59, 48, 1);
  line-height: 17px;
  border: 1px solid rgba(255, 59, 48, 1);
  display: inline-block;
  padding: 0 2px;
}
.maild {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(74, 144, 226, 1);
  line-height: 17px;
}
.maillt {
  margin-top: 8px;
}
.maillb {
  margin-top: 6px;
}
.maillt span:last-child {
  margin-left: 47px;
}
.maillb span:last-child {
  margin-left: 36px;
}
.mailr img {
  width: 12px;
  margin-left: 54px;
  margin-top: 16px;
}
.formr {
  width: 560px;
  /* height: 250px; */
  border: 1px solid #b7b7b7;
  margin-left: 30px;
  margin-top: 34px;
  padding-top: 32px;
}
.forml img {
  width: 350px;
}
.pos {
  width: 350px;
  height: 111px;
  position: absolute;
  top: 80px;
  left: 0;
  background-color: #fff;
}
.post {
  margin-left: 15px;
  margin-top: 6px;
  font-size: 13px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 19px;
}
.post span {
  color: rgba(234, 105, 25, 1);
  font-size: 10px;
}
.imgs {
  font-size: 9px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 13px;
}
.imgs img {
  width: 79px;
  height: 79px;
}
.bottom {
  line-height: 80px;
  padding-left: 807px;
}
</style>