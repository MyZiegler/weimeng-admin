<!-- -->
<template>
  <div class="page-marketing">
    <top1></top1>
    <div class="center clearfix">
      <div class="head">
        <div class="title">满减送</div>
        <div class="options-bar">
          <div class="list-status">
            <div
              class="status-item"
              v-for="(tab,index) in tabs"
              :key="index"
              :class="{'status-item-on':tab.active}"
              @click="clickTab(index)"
            >
              {{tab.name}}
            </div>
          </div>
          <a-button
            type="primary"
            v-if="!newRow"
            @click="create"
            style="margin-top: 8px;float:right;"
          >新建满减送</a-button>
          <div
            class="search-box"
            v-if="!newRow"
          >
            <a-input-search
              placeholder="搜索"
              style="width: 160px;float: right;margin-top: 8px;margin-right: 39px;"
              @search="onSearch"
            />
          </div>
        </div>
      </div>
      <div
        class="table-area"
        v-if="!newRow"
      >
        <a-table
          :dataSource="data"
          :columns="columns"
        >
          <span
            slot="actName"
            slot-scope="actName"
          >
            <span style="color: #1890FF;">{{actName}}</span>
          </span>
          <span
            slot="validity"
            slot-scope="i,item"
          >
            <span>{{item.start_time|dateformat('YYYY-MM-DD')}}-</span>
            <span>{{item.end_time|dateformat('YYYY-MM-DD')}}</span>
          </span>
          <span
            slot="state"
            slot-scope="state"
          >
            <span v-if="state=='USING'">正在进行</span>
          </span>
          <span
            slot="action"
            slot-scope="i,item"
          >
            <a href="javascript:;">编辑</a>
            <a
              href="javascript:;"
              :style="{color:'#f5222d',marginLeft:'10px'}"
            >删除</a>
          </span>
        </a-table>
      </div>
      <div
        class="edit-area"
        v-else
      >
        <div class="body">
          <div class="prev-box">
            <div class="mask"></div>

          </div>
          <div class="input-box">
            <a-form
              :autoFormCreate="(form)=>{this.form=form}"
              @submit="handleSubmit"
            >
              <div class="box-1">
                <a-form-item
                  label="商品限制"
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  required
                >
                  <a-radio-group
                    @change="radioChange"
                    v-model="goodsLimitValue"
                  >
                    <a-radio
                      :style="radioStyle"
                      :value="1"
                    >全部商品</a-radio>
                    <a-radio
                      :style="radioStyle"
                      :value="2"
                    >
                      <span class="radio-row">
                        <span style="font-size:14px;">指定商品可用</span><span style="float: right;font-size: 12px;color: #1890ff;">添加商品</span>
                      </span>
                      <div
                        class="goodsAdded"
                        v-if="radioIndex==2"
                      >
                        <div
                          class="goods-item"
                          v-for="(item,i) in addGoodsList"
                          :key="item.id"
                        >
                          <div class="goods-name">{{item.name}}</div>
                          <div
                            class="btn-delete"
                            @click="delGoodsItem(i)"
                          >删除</div>
                        </div>
                      </div>
                    </a-radio>
                    <a-radio
                      :style="radioStyle"
                      :value="3"
                    >
                      <span class="radio-row">
                        <span style="font-size:14px;">指定商品不可用</span><span style="float: right;font-size: 12px;color: #1890ff;">添加商品</span>
                      </span>
                      <div
                        class="goodsAdded"
                        v-if="radioIndex==3"
                      >
                        <div
                          class="goods-item"
                          v-for="(item,i) in addGoodsList"
                          :key="item.id"
                        >
                          <div class="goods-name">{{item.name}}</div>
                          <div
                            class="btn-delete"
                            @click="delGoodsItem(i)"
                          >删除</div>
                        </div>
                      </div>
                    </a-radio>
                  </a-radio-group>
                </a-form-item>
              </div>

              <div class="box-2">
                <a-form-item
                  label="优惠"
                  :labelCol="labelCol"
                  :wrapperCol="{span:24}"
                  required
                >
                  <div
                    class="discount-item"
                    v-for="index in discountNum"
                    :key="index"
                  >
                    <div class="thead">
                      <span>层级</span>
                      <span>优惠门槛</span>
                      <span>优惠方式</span>
                      <span>操作</span>
                    </div>
                    <div class="discount-content">
                      <div class="item-index">

                        {{index}}

                      </div>
                      <div class="discount-limit">
                        <span class="fs-14">满</span>
                        <a-input style="width: 40px;" />
                        <a-select
                          defaultValue="yuan"
                          style="width: 60px"
                          @change="selectChange_discountLimit"
                        >ss
                          <a-select-option value="yuan">元</a-select-option>
                          <a-select-option value="jian">件</a-select-option>
                        </a-select>

                      </div>
                      <div class="discount-way">
                        <a-radio-group
                          @change="radioChange_discountWay"
                          v-model="discountWayValue"
                        >

                          <a-radio
                            :style="radioStyle"
                            :value="1"
                          >
                            <span class="fs-14">减</span>
                            <a-input :style="smallInputStyle" />
                            <span>元</span>
                          </a-radio>

                          <a-radio
                            :style="radioStyle"
                            :value="2"
                          >
                            <span class="fs-14">打</span>
                            <a-input :style="smallInputStyle" />
                            <span>折</span>
                          </a-radio>

                          <a-radio
                            :value="3"
                            :style="{
                                        display: 'block',
                                        height: '50px',
                                        lineHeight: '30px',
                                        margin:'10px 0'
                                      }"
                          >
                            <span class="fs-14">包邮</span>
                            <div class="tips">
                              <div>同一订单，部分满足包邮，</div>
                              <div> 则所有商品都包邮</div>
                            </div>
                          </a-radio>

                          <a-radio
                            :style="radioStyle"
                            :value="4"
                          >
                            <span class="fs-14">送优惠券</span>
                            <a-select
                              placeholder="请选择"
                              :style="smallSelectStyle"
                              @change="selectChange_coupon"
                            >
                              <a-select-option value="youhuiquan1">优惠券11111</a-select-option>
                              <a-select-option value="youhuiquan2">优惠券2</a-select-option>
                            </a-select>
                            <span class="a-btn">去新建</span>
                            <br />
                            <a-input :style="smallInputStyle" />
                            <span class="fs-14">张</span>
                          </a-radio>

                          <a-radio
                            :style="radioStyle"
                            :value="5"
                          >
                            <span class="fs-14">送赠品</span>
                            <a-select
                              placeholder="请选择"
                              :style="smallSelectStyle"
                              @change="selectChange_gift"
                            >
                              <a-select-option value="gift1">赠品1</a-select-option>
                              <a-select-option value="gift2">赠品2</a-select-option>
                            </a-select>
                            <span class="a-btn">去新建</span>
                          </a-radio>

                        </a-radio-group>
                      </div>
                      <div
                        class="action-col"
                        v-if="index==discountNum && index!=1"
                      >

                        <span
                          class="red-txt-btn"
                          @click="delDiscountItem"
                        >删除</span>

                      </div>
                    </div>
                  </div>
                </a-form-item>
                <a-button
                  type="dashed"
                  icon="plus"
                  block
                  @click="addNewDiscount"
                >新增优惠</a-button>
              </div>

            </a-form>
          </div>
          <div class="footer">
            <a-button
              @click="editCancel"
              style="position: absolute;bottom: 26px;right: 255px;"
            >取消</a-button>
            <a-button
              style="position: absolute;bottom: 26px;right: 157px;"
              type="primary"
              htmlType='submit'
            >完成</a-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top1 from "@/components/top1";
import ReduceSendController from "@/model-controllers/reduce-send-controller";
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
    align: "center",
    scopedSlots: { customRender: "validity" }
  },
  {
    title: "活动状态",
    dataIndex: "state",
    scopedSlots: { customRender: "state" },
    key: "actStatus",
    align: "center"
  },
  {
    title: "订单实付金额",
    dataIndex: "orderPayMoney",
    key: "orderPayMoney",
    align: "center"
  },
  {
    title: "付款订单数",
    dataIndex: "orderAmount",
    key: "orderAmount",
    align: "center"
  },
  {
    title: "付款人数",
    dataIndex: "payNum",
    key: "payNum",
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
    actName: "优惠礼包",
    startTime: "2018.10.11",
    endTime: "2018.11.03",
    actStatus: "正在进行",
    status: 1,
    orderPayMoney: 100.12,
    orderAmount: 21,
    payNum: 19
  },
  {
    key: 2,
    actName: "双十一优惠券",
    startTime: "2018.10.11",
    endTime: "2018.11.03",
    actStatus: "未开始",
    status: 0,
    orderPayMoney: 100.12,
    orderAmount: 21,
    payNum: 19
  },
  {
    key: 3,
    actName: "全场任选免费券",
    startTime: "2018.10.11",
    endTime: "2018.11.03",
    actStatus: "已结束",
    status: -1,
    orderPayMoney: 100.12,
    orderAmount: 21,
    payNum: 19
  }
];
export default {
  data() {
    return {
      discountIndex: 0,
      discountNum: 1,
      columns,
      data,
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
      /*表单设置*/
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5, offset: 1 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17, offset: 1 }
      },
      /*单选按钮设置*/
      goodsLimitValue: 1, //单选商品限制
      discountWayValue: 1, //单选优惠方式
      radioStyle: {
        display: "block",
        minHeight: "30px",
        lineHeight: "30px",
        margin: "5px 0"
      },
      addGoodsList: [
        {
          id: 1,
          name: "shangpin1"
        }
      ],
      radioIndex: 0, //选择应用的商品范围
      smallInputStyle: { width: "40px" }, //小输入框宽度
      smallSelectStyle: { minWidth: "80px", width: "auto" } //小选择框宽度
    };
  },

  components: {
    top1: top1
  },
  mounted() {
    let that = this;
    ReduceSendController.getAllReduceSends(function(data) {
      console.log(data);
      that.data = data;
    });
  },
  computed: {},

  methods: {
    /**点击标签**/
    clickTab(index) {
      let _this = this;
      _this.tabs.forEach(function(item) {
        item.active = false;
      });
      _this.tabs[index].active = true;
    },
    /**搜索**/
    onSearch(e) {
      console.log(e);
    },
    /**新建**/
    create() {
      this.newRow = !this.newRow;
    },
    editCancel() {
      this.newRow = false;
    },
    /**表单*/
    handleSubmit() {},
    /**选择应用商品范围*/
    radioChange(e) {
      console.log("radio change", e.target.value);
      this.radioIndex = e.target.value;
    },
    /**删除添加的商品*/
    delGoodsItem(i) {
      console.log("del index:" + i);
    },
    selectChange_discountLimit(e) {},
    radioChange_discountWay(e) {},
    selectChange_coupon(e) {},
    selectChange_gift(e) {},
    addNewDiscount() {
      this.discountNum += 1;
    },
    delDiscountItem() {
      this.discountNum -= 1;
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
div,
ul,
li {
  box-sizing: border-box;
}
.fs-10 {
  font-size: 10px;
}
.fs-14 {
  font-size: 14px;
}
.a-btn {
  font-size: 12px;
  color: #1890ff;
}
.fr {
  float: right;
}
.fl {
  float: left;
}
.red-txt-btn {
  font-size: 14px;
  color: #f0606f;
}
.red-txt-btn:hover {
  cursor: pointer;
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
  position: relative;
}
.prev-box {
  height: 669px;
  width: 376px;
  box-shadow: 0 0.5px 0.5px 0.5px #b7b7b7;
  position: relative;
  display: inline-block;
  vertical-align: top;

  background-image: url("../../../static/payback.png");
  background-size: 100% 100%;
}
.prev-box .mask {
  box-sizing: content-box;
  position: absolute;
  width: 100%;
  height: 20px;
  /*top: 100px;*/
  border-top: 579px solid rgba(0, 0, 0, 0.5);
  border-bottom: 70px solid rgba(0, 0, 0, 0.5);
}
.input-box {
  width: 560px;
  /*min-height: 700px;*/
  border: 1px solid #000;
  display: inline-block;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
}
.box-1 {
  padding: 32px 0 8px;
  border-bottom: 1px solid #000;
  width: 100%;
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
.box-2 {
  max-height: 795px;
  width: 100%;
  overflow-y: auto;
  padding-bottom: 27px;
}
.discount-item {
  min-height: 310px;
  width: 100%;
  background-color: #f5f5f5;
  padding-bottom: 10px;
  margin-bottom: 32px;
}
.box-2 .discount-item:last-child {
  margin-bottom: unset;
}
.thead {
  height: 40px;
  width: 100%;
}
.thead span {
  display: inline-block;
  width: 20%;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.thead span:nth-child(2) {
  width: 25%;
}
.thead span:nth-child(3) {
  width: 39%;
  text-align: left;
  padding-left: 26px;
}
.thead span:last-child {
  width: 14%;
}
.discount-content {
  height: 270px;
  width: 100%;
}
.item-index {
  text-align: center;
  height: 270px;
  width: 20%;
  line-height: 270px;
  float: left;
}
.discount-limit {
  width: 25%;
  height: 100%;
  float: left;
}
.discount-way {
  width: 39%;
  height: 100%;
  float: left;
}
.action-col {
  width: 14%;
  height: 100%;
  float: right;
  line-height: 270px;
  text-align: center;
}
.discount-content .tips {
  font-size: 10px;
  padding-left: 26px;
}
.discount-content .tips div {
  height: 14px;
  line-height: 14px;
}
</style>
