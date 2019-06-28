<!--优惠券  -->
<template>
  <div class="out">
    <top1></top1>
    <div class="main clearfix">
      <div class="title">限时折扣</div>
      <div class="tabs clearfix">
        <div class="all fl" :class="current==index?'check':''" v-for="(item,index) in titles" :key="item.index" v-on:click="toggle(index)">{{item.tip}}</div>

        <div class="add fr" v-on:click="add" v-if="bool">新建优惠券</div>
        <div class="search1 fr" v-if="bool">
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
        <a-form>
          <a-form-item>

          </a-form-item>
        </a-form>
        <div class="forml fl">
          <div class="formlt">
            {{title}}
          </div>
          <div class="formlCurrent clearfix">
            <div class="current fl">
              {{price}}
            </div>
            <div class="name fl">
              {{name?name:"限时折扣"}}
            </div>
            <div class="origin fl">
              价格：<em>{{origin}}</em>
            </div>
          </div>
          <div class="time">
            <span>距离恢复原价</span>
            <span>
              <em>{{hour}} </em> <i>小时</i><em>{{minute}}</em> <i>分钟</i><em>{{seconds}}</em><i>秒</i>
            </span>
          </div>
          <div class="tags">
            <span class="tag1">运费：¥10.00-¥20.00</span>
            <span class="tag2">剩余：5120</span>
            <span class="tag3">销量：11924</span>
          </div>
          <div class="mail clearfix">
            <div class="maill fl">
              <div class="maillt">
                <span class="mailtt">包邮</span><span class="maild">满68.00元部分地区包邮</span>
              </div>
              <div class="maillb">
                <span class="mailtt">加价购</span><span class="maild">满48元以折扣价在购物车换购热销商品</span>

              </div>
            </div>
            <div class="mailr fl"><img src="../../assets/运营@2x.png" alt=""></div>
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
            <a-form-item label='活动标签' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your note!' }]}">
              <a-input v-model="name" />
            </a-form-item>
            <a-form-item label='购买限制' :labelCol="{ span: 5 }">
              <a-radio-group @change="onChange" v-model="value">
                <a-radio :style="radioStyle" :value="1">每人<a-input style="width:40px"></a-input>件</a-radio>
                <a-radio :style="radioStyle" :value="2">不限购</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-form>
        </div>
      </div>
      <div class="table1 clearfix" v-if="!bool">
        <div class="select fl">
          <a-select :defaultValue="provinceData[0]" style="width: 120px" @change="handleProvinceChange">
            <a-select-option v-for="province in provinceData" :key="province">{{province}}</a-select-option>
          </a-select>
          <a-select v-model="secondCity" style="width: 120px">
            <a-select-option v-for="city in cities" :key="city">{{city}}</a-select-option>
          </a-select>
        </div>
        <div class="search">
          <a-input-search placeholder="input search text" style="width: 200px" @search="onSearch" />
        </div>
        <div style="margin-bottom: 16px">
          <a-button type="primary" @click="start" :disabled="!hasSelected" :loading="loading">
            Reload
          </a-button>
          <span style="margin-left: 8px">
            <template v-if="hasSelected">
              {{`Selected ${selectedRowKeys.length} items`}}
            </template>
          </span>
        </div>
        <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :pagination="pagination" :columns="columnss" :dataSource="datas" />
      </div>
      <div class="btn" v-if="!bool">
        <a-button @click="cancel" htmlType='button'>
          取消
        </a-button>
        <a-button type='primary' htmlType='submit'>
          保存
        </a-button>
      </div>
    </div>

  </div>
</template>

<script>
import top1 from "@/components/top1";
import DiscountComboController from "@/model-controllers/discount-combo-controller";

const columnss = [
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Age",
    dataIndex: "age"
  },
  {
    title: "Address",
    dataIndex: "address"
  }
];

const datas = [];
for (let i = 0; i < 46; i++) {
  datas.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`
  });
}
const provinceData = ["Zhejiang", "Jiangsu"];
const cityData = {
  Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],
  Jiangsu: ["Nanjing", "Suzhou", "Zhenjiang"]
};
const columns = [
  {
    title: "活动名称",
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
    width: 150
  },
  {
    title: "活动标签",
    dataIndex: "price",
    key: "price",
    align: "center"
  },
  {
    title: "活动状态",
    dataIndex: "confine",
    key: "confine",
    align: "center"
  },
  {
    title: "有效期",
    key: "validity",
    dataIndex: "validity",
    align: "center"
  },
  {
    title: "订单实付金额",
    key: "count",
    dataIndex: "count",
    align: "center"
  },
  {
    title: "付款订单数",
    key: "used",
    dataIndex: "used",
    align: "center"
  },
  {
    title: "付款人数",
    key: "rate",
    dataIndex: "rate",
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
    price: "限时折扣",
    confine: "正在进行",
    validity: "领取后一天有效",
    count: 1723.0,
    used: 1,
    rate: 1
  },
  {
    key: "2",
    name: "双十一优惠券",
    price: "已失效",
    confine: "不限张数 库存:50",
    validity: "2018.10.28- 2018.12.28",
    count: 1424.0,
    used: 2,
    rate: 2
  },
  {
    key: "3",
    name: "全场任选免费券",
    price: "已失效",
    confine: "不限张数 库存:28",
    validity: "领取后一天有效",
    count: 3145.14,
    used: 4,
    rate: 2
  }
];
export default {
  data() {
    return {
      provinceData,
      cityData,
      cities: cityData[provinceData[0]],
      secondCity: cityData[provinceData[0]][0],
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
      datas,
      columnss,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
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
        },
        {
          item: "Expired",
          tip: "已失效"
        }
      ],
      current: 0,
      pagination: {
        pageSize: 5
      }
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
    DiscountComboController.getAllDiscountCombos(function(
      getAllDiscountCombos
    ) {
      console.log(getAllDiscountCombos);
      // that.data=coupons
    });
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    }
  },

  methods: {
    cancel: function() {
      this.bool = true;
      console.log(this.bool);
    },
    onSearch(value) {
      console.log(value);
    },
    handleProvinceChange(value) {
      this.cities = cityData[value];
      this.secondCity = cityData[value][0];
    },
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
  width: 395px;
  height: 195px;
  border-radius: 6px;
  border: 1px solid #b7b7b7;
  margin-left: 64px;
  margin-top: 34px;
  padding-left: 16px;
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
  /* height: 299px; */
  border: 1px solid #b7b7b7;
  margin-left: 30px;
  margin-top: 34px;
}
.table {
  /* width: 1008px; */
  height: 532px;
  background: rgba(255, 255, 255, 1);
  /* border-radius: 6px; */
  /* border: 1px solid; */
  /* padding-top: 40px; */
  /* border-bottom: 1px solid #b7b7b7; */
  /* padding-bottom: 21px; */
}
.table1 {
  width: 1008px;
  height: 532px;
  background: rgba(255, 255, 255, 1);
  /* border-radius: 6px; */
  border: 1px solid #b7b7b7;
  padding-top: 40px;
  /* border-bottom: 1px solid #b7b7b7; */
  padding-bottom: 21px;
  margin-left: 64px;
  margin-top: 32px;
}
.select {
  margin-left: 34px;
}
.search {
  margin-left: 497px;
}

.btn {
  line-height: 79px;
  text-align: right;
  padding-right: 157px;
  background-color: #fff;
  border-top: 1px solid #b7b7b7;
  margin-top: 24px;
}
</style>