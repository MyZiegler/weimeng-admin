<!-- -->
<template>
  <div class="page-marketing">
    <top1></top1>
    <div class="center clearfix">
      <div class="head">
        <div class="title">打包一口价</div>
        <div class="options-bar">
          <div class="list-status">
            <div class="status-item" v-for="(tab,index) in tabs" :key="index" :class="{'status-item-on':tab.active}" @click="clickTab(index)">
              {{tab.name}}
            </div>
          </div>
          <a-button type="primary" v-if="!newRow" @click="create" style="margin-top: 8px;float:right;">新建赠品</a-button>
          <div class="search-box" v-if="!newRow">
            <a-input-search placeholder="搜索" style="width: 160px;float: right;margin-top: 8px;margin-right: 39px;" @search="onSearch" />
          </div>
        </div>
      </div>
      <div class="table-area" v-if="!newRow">
        <a-table :dataSource="data" :columns="columns">
          <span slot="actName" slot-scope="actName">
            <span style="color: #1890FF;">{{actName}}</span>
          </span>
          <span slot="state" slot-scope="state">
            <span v-if="state=='USING'">使用中</span>
            <span v-else-if="state=='LOSE'">已失效</span>
          </span>
          <span slot="action" slot-scope="i,item">
            <span v-if="item.state=='USING'">
              <span class="blue-btn">编辑</span>
              <span class="blue-btn">使失效</span>
            </span>
            <span v-else>
              <span class="gray-btn">已失效</span>
            </span>
            <span :style="{color:'#f5222d',marginLeft:'10px'}">删除</span>
          </span>
        </a-table>
      </div>
      <div class="edit-area" v-else>
        <div class="body">
          <div class="prev-box">
            <div class="page-top"></div>
            <div class="page-title"></div>
            <div class="page-goods-list">
              <div class="page-goods-item" v-for="index in 6" :key="index">

              </div>
            </div>
            <div class="page-btn"></div>
          </div>
          <div class="input-box">
            <a-form :autoFormCreate="(form)=>{this.form = form}" @submit="handleSubmit">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='活动名称' required>
                <a-input style="width: 224px;" />
              </a-form-item>

              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='生效时间' required>
                <a-date-picker :disabledDate="disabledStartDate" showTime format="YYYY-MM-DD HH:mm:ss" v-model="startValue" placeholder="开始时间" @openChange="handleStartOpenChange" :style="datePickerStyle" />
                <a-date-picker :disabledDate="disabledEndDate" showTime format="YYYY-MM-DD HH:mm:ss" placeholder="结束时间" v-model="endValue" :open="endOpen" @openChange="handleEndOpenChange" :style="datePickerStyle" />
              </a-form-item>

              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='促销规则' required>
                <a-input :style="smallInputStyle" />
                元
                <a-input :style="smallInputStyle" />
                件
              </a-form-item>

              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='优惠叠加' required>
                <a-radio-group @change="radioChange" v-model="discountSuperposition_radioValue">
                  <a-radio :style="radioStyle" value='kediejia'>可叠加 </a-radio>
                  <a-radio :style="radioStyle" value='bukediejia'>不可叠加
                    <div style="color: #6b6b6b;font-size: 12px">是否可以和优惠券、优惠码、支付有礼、订单返现促销活动进行优惠叠加</div>
                  </a-radio>
                </a-radio-group>
              </a-form-item>

              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='商品限制' required>
                <a-radio-group @change="radioChange2" v-model="goodsLimitValue">
                  <a-radio :style="radioStyle" :value="1">全部商品</a-radio>
                  <a-radio :style="radioStyle" :value="2">
                    <span class="radio-row">
                      <span style="font-size:14px;">指定商品可用</span><span style="float: right;font-size: 12px;color: #1890ff;">添加商品</span>
                    </span>
                    <div class="goodsAdded" v-if="goodsLimitIndex==2">
                      <div class="goods-item" v-for="(item,i) in addGoodsList" :key="item.id">
                        <div class="goods-name">{{item.name}}</div>
                        <div class="btn-delete" @click="delGoodsItem(i)">删除</div>
                      </div>
                    </div>
                  </a-radio>
                  <a-radio :style="radioStyle" :value="3">
                    <span class="radio-row">
                      <span style="font-size:14px;">指定商品不可用</span><span style="float: right;font-size: 12px;color: #1890ff;">添加商品</span>
                    </span>
                    <div class="goodsAdded" v-if="goodsLimitIndex==3">
                      <div class="goods-item" v-for="(item,i) in addGoodsList" :key="item.id">
                        <div class="goods-name">{{item.name}}</div>
                        <div class="btn-delete" @click="delGoodsItem2(i)">删除</div>
                      </div>
                    </div>
                  </a-radio>
                </a-radio-group>
              </a-form-item>

            </a-form>
          </div>
        </div>
        <div class="footer">
          <a-button @click="editCancel" style="position: absolute;bottom: 26px;right: 255px;">取消</a-button>
          <a-button style="position: absolute;bottom: 26px;right: 157px;" type="primary" htmlType='submit'>完成</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top1 from "@/components/top1";
import PackingBargainController from "@/model-controllers/packing-bargain-controller";
const columns = [
  {
    title: "活动名称",
    dataIndex: "activity_name",
    key: "actName",
    scopedSlots: { customRender: "actName" }
  },
  {
    title: "有效期",
    dataIndex: "validity",
    key: "validity",
    align: "center"
  },
  {
    title: "活动状态",
    dataIndex: "state",
    key: "actStatus",
    scopedSlots: { customRender: "state" },
    align: "center"
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    align: "center",
    scopedSlots: { customRender: "action" }
  }
];
const data = [
  {
    key: 1,
    actName: "一口价1",
    validity: "2018.1.30 - 2018.4.21",
    actStatus: "正在进行",
    status: 1
  },
  {
    key: 2,
    actName: "一口价2",
    validity: "2018.10.28 - 2018.12.28",
    actStatus: "已失效",
    status: 0
  },
  {
    key: 3,
    actName: "一口价3",
    validity: "2018.10.28 - 2018.12.28",
    actStatus: "已失效",
    status: 0
  }
];
export default {
  data() {
    return {
      tabs: [
        {
          name: "全部",
          active: true
        },
        {
          name: "未开始",
          active: false
        },
        {
          name: "进行中",
          active: false
        },
        {
          name: "已结束",
          active: false
        }
      ],
      newRow: false,
      data,
      columns,
      /*表单栅栏*/
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12, offset: 1 }
      },
      /*日期选择器设置*/
      startValue: null,
      endValue: null,
      endOpen: false,
      datePickerStyle: { width: "224px" }, //时间选择器
      smallInputStyle: { width: "40px" }, //小输入框宽度
      radioStyle: {
        display: "block",
        minHeight: "30px",
        lineHeight: "30px",
        margin: "5px 0"
      },
      discountSuperposition_radioValue: "kediejia", //优惠叠加
      goodsLimitValue: 2,
      goodsLimitIndex: 2,
      addGoodsList: [
        {
          id: 1,
          name: "shangpin1"
        }
      ]
    };
  },

  components: {
    top1: top1
  },
  /*日期时间选择器事件*/
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
  PackingBargainController.getAllPackingBargains(function(data){
    console.log(data)
    that.data=data
  })
},
  methods: {
    /**搜索**/
    onSearch(e) {
      console.log(e);
    },
    /**新建**/
    create() {
      this.newRow = !this.newRow;
    },
    /**点击标签**/
    clickTab(index) {
      let _this = this;
      _this.tabs.forEach(function(item) {
        item.active = false;
      });
      _this.tabs[index].active = true;
    },
    /**取消新建*/
    editCancel() {
      this.newRow = false;
    },
    /**表单提交*/
    handleSubmit(e) {
      console.log(e);
    },
    /**日期时间选择器*/
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
    /**优惠叠加单选*/
    radioChange(e) {
      console.log("discount superposition radioValue:" + e.target.value);
    },
    /**商品限制*/
    radioChange2(e) {
      console.log("goods limit radio change", e.target.value);
      this.goodsLimitIndex = e.target.value;
    },
    /**删除指定的商品*/
    delGoodsItem(i) {},
    /**删除指定不用的商品*/
    delGoodsItem2(i) {}
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
div,
ul,
li {
  box-sizing: border-box;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.blue-btn {
  font-size: 14px;
  color: #1890ff;
}
.red-btn {
  font-size: 14px;
  color: #f0606f;
}
.gray-btn {
  font-size: 14px;
  color: #acacac;
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
.list-status {
  height: 48px;
  float: left;
}
.status-item {
  float: left;
  padding: 0 36px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  position: relative;
}
.status-item:hover {
  cursor: pointer;
  color: #1890ff;
}
.status-item-on {
  color: #1890ff;
}
.status-item-on:after {
  content: "";
  display: block;
  width: 80px;
  height: 2px;
  background-color: #1890ff;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-40px);
}
.edit-area {
  width: 100%;
  position: relative;
}
.edit-area .footer {
  height: 80px;
  width: 100%;
  border-top: 1px solid #b7b7b7;
  position: absolute;
  bottom: 0;
  left: 0;
}
.edit-area .body {
  width: 100%;
  padding-bottom: 150px;
  padding-left: 66px;
}
.prev-box {
  height: 669px;
  width: 376px;
  box-shadow: 0 0.5px 0.5px 0.5px #b7b7b7;
  position: relative;
  display: inline-block;
  vertical-align: top;
  background-color: #f7f7f7;
}
.prev-box .page-top {
  position: absolute;
  top: 0;
  height: 64px;
  width: 100%;
  background-size: 100%;
  background-image: url("../../../static/titlebar_pack.png");
}
.prev-box .page-title {
  position: absolute;
  top: 69px;
  height: 45px;
  width: 100%;
  line-height: 45px;
  text-align: center;
  font-size: 12px;
  background-color: #fff;
}
.page-goods-list {
  position: absolute;
  width: 100%;
  max-height: 550px;
  overflow-y: auto;
  top: 119px;
  background-color: #fff;
}
.page-goods-item {
  height: 83.5px;
  width: 100%;
  background-color: #fff;
  border-bottom: #d8d8d8 1px solid;
}
.prev-box .page-btn {
  z-index: 99;
  position: absolute;
  width: 44px;
  height: 44px;
  bottom: 70.5px;
  right: 32.5px;
  background-image: url("../../../static/icon_add.png");
  background-size: 100% 100%;
}
.input-box {
  display: inline-block;
  width: 560px;
  min-height: 450px;
  border-radius: 6px;
  border: 1px solid #b7b7b7;
  padding: 32px;
}
.radio-row {
  display: inline-block;
  width: 100%;
}
.goodsAdded {
  width: 100%;
  padding: 5px 0 5px 24px;
}
.goods-item {
  height: 20px;
  width: 100%;
  margin: 5px 0;
  line-height: 20px;
}
.goods-name {
  float: left;
  font-size: 14px;
  margin-right: 20px;
}
.btn-delete {
  float: right;
  font-size: 12px;
  color: #f0606f;
}
</style>
