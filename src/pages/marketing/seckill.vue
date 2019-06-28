<!-- -->
<template>
  <div class="page-marketing">
    <top1></top1>
    <div class="center clearfix main">
      <div class="head">
        <div class="title">秒杀</div>
        <div class="options-bar">
          <div class="list-status">
            <div class="status-item" v-for="(tab,index) in tabs" :key="index" :class="{'status-item-on':tab.active}" @click="clickTab(index)">
              {{tab.name}}
            </div>
          </div>
          <a-button type="primary" v-if="!newRow" @click="create" style="margin-top: 8px;float:right;">新建秒杀</a-button>
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
            <span v-if="state=='USING'">正在进行</span>
            <span v-else-if="state=='LOSE'">已失效</span>
          </span>
          <span slot="action" slot-scope="i,item">
            <span v-if="item.state=='USING'">
              <a href="javascript:;">编辑</a>
              <a href="javascript:;" @click="failure(item)">使失效</a>
            </span>
            <span v-else>
              <a href="javascript:;" style="color:#acacac">已失效</a>
            </span>
            <a href="javascript:;" :style="{color:'#f5222d',marginLeft:'10px'}" @click="showModal(item)">删除</a>
          </span>
        </a-table>
      </div>
      <div class="edit-area" v-else>
        <div class="body">
          <div class="prev-box">

          </div>
          <div class="input-box">
            <a-form ref="newSeckill">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='商品设置' required>
                <a href="javascript:;">添加商品</a><span style="font-size:11px;font-weight:400;color:#f0606f;margin-left: 12px">只能添加一件商品</span>
              </a-form-item>

              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='生效时间' required>
                <a-date-picker :disabledDate="disabledStartDate" showTime format="YYYY-MM-DD HH:mm:ss" v-model="startValue" placeholder="开始时间" @openChange="handleStartOpenChange" :style="datePickerStyle" />
                <a-date-picker :disabledDate="disabledEndDate" showTime format="YYYY-MM-DD HH:mm:ss" placeholder="结束时间" v-model="endValue" :open="endOpen" @openChange="handleEndOpenChange" :style="datePickerStyle" />
              </a-form-item>

              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='活动标签' required>
                <a-input style="width: 112px;margin-right: 17px" /><span style="font-size: 11px;color: #000;">显示在商品旁边2-5字</span>
              </a-form-item>

              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='限购' required>
                <div style="font-size: 12px">每人
                  <a-input style="width: 48px;margin: 0 10px;" />笔订单</div>
              </a-form-item>

              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='取消订单' required>
                <div style="font-size: 12px">买家
                  <a-input style="width: 48px;margin: 0 10px;" />分钟内未支付订单取消</div>
              </a-form-item>
            </a-form>
          </div>
        </div>
        <div class="footer">
          <a-button @click="editCancel" style="position: absolute;bottom: 26px;right: 255px;">取消</a-button>
          <a-button @click="editOk" style="position: absolute;bottom: 26px;right: 157px;" type="primary" htmlType='submit'>完成</a-button>
        </div>
      </div>
    </div>
    <a-modal :visible="visible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
      <p>{{ModalText}}</p>
    </a-modal>
  </div>
</template>

<script>
import top1 from "@/components/top1";
import SeckillController from "@/model-controllers/seckill-controller";
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
    scopedSlots: { customRender: "validity" },
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
    actName: "优惠礼包",
    validity: "2018.1.30 - 2018.4.21",
    actStatus: "正在进行",
    status: 1
  },
  {
    key: 2,
    actName: "双十一",
    validity: "2018.10.28 - 2018.12.28",
    actStatus: "已失效",
    status: 0
  },
  {
    key: 3,
    actName: "全场任选",
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
      ModalText: "确认删除",
      visible: false,
      confirmLoading: false,
      data,
      delid: 0,
      columns,
      newRow: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      /*日期选择器设置*/
      startValue: null,
      endValue: null,
      endOpen: false,
      datePickerStyle: { width: "224px", marginRight: "40px" }
    };
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
  components: {
    top1: top1
  },

  computed: {},
  mounted() {
    let that = this;
    SeckillController.getAllSeckills(function(getAllSeckills) {
      console.log(getAllSeckills);
      that.data = getAllSeckills;
    });
  },
  methods: {
    /**搜索**/
    onSearch(e) {
      console.log(e);
    },
    //使失效
    failure(recods) {
      console.log(recods);
      SeckillController.editSeckill(
        recods.id,
        JSON.stringify({ state: "LOSE" }),
        function(USING) {
          recods.state = "LOSE";
        }
      );
    },
    //删除
    showModal(item) {
      this.visible = true;
      this.delid = item.id;
      console.log(item);
    },
    handleOk(e) {
      let that = this;

      SeckillController.deleteSeckill(that.delid, function(data) {});
      that.ModalText = "正在删除中";
      that.confirmLoading = true;
      setTimeout(() => {
        that.visible = false;
        that.confirmLoading = false;
        SeckillController.getAllSeckills(function(getAllSeckills) {
          console.log(getAllSeckills);
          that.data = getAllSeckills;
        });
      }, 2000);
    },
    handleCancel(e) {
      this.visible = false;
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
    /**编辑完成*/
    editOk() {
      // this.newRow=false;
      console.log(this.$refs.newSeckill);
      // this.$refs.newSeckill.form.submit();
    },
    editCancel() {
      this.newRow = false;
    }
  }
};
</script>
<style scoped>
.page-marketing {
  /* min-width: 1450px; */
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
  height: 620px;
  width: 438px;
  /*position: absolute;
    left: 44px;
    top: 0;*/
  background-image: url("../../assets/kill.png");
  background-size: 100% 100%;
  box-shadow: 0 0.5px 0 0.5px #b7b7b7;
  position: relative;
}
.input-box {
  /*height: 308px;*/
  width: 560px;
  border: 1px solid #b7b7b7;
  position: absolute;
  right: 71px;
  top: 0;
  padding: 32px 0;
}
</style>
