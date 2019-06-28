<!--  -->
<template>
  <div class="out">
    <top></top>
    <div class="main" style="margin:24px">
      <div class="title">订单数据</div>
      <div class="aweek clearfix">
        <div class="aweek1 fl">
          <div>{{aweek.title1}}</div>
          <div>{{aweek.title1num}}</div>
        </div>
        <div class="aweek1 fl">
          <div>{{aweek.title2}}</div>
          <div>{{aweek.title2num}}</div>
        </div>
        <div class="aweek1 fl">
          <div>{{aweek.title3}}</div>
          <div>{{aweek.title3num}}</div>
        </div>
        <div class="aweek1 fl">

          <div>{{aweek.title4}}</div>
          <div class="pos">去提现</div>

          <div>{{aweek.title4num}}</div>
        </div>
      </div>
      <div class="percentage">
        <div class="percentageT">各品类占比</div>
        <origin></origin>
      </div>
      <div class="line">
        <div class="lineT">销售额趋势</div>
        <div>
          <v-chart :forceFit="true" :tooltip="123" :height="height" :data="data" :scale="scale">
            <v-tooltip />
            <v-axis />
            <v-bar position="year*订单量" />
          </v-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "@/components/top";
import origin from "@/components/origin";

const DataSet = require('@antv/data-set');
const data = [
  { year: "10 月", "订单量": 100 },
  { year: "11 月", "订单量": 52 },
  { year: "12 月", "订单量": 61 },
  { year: "1 月", "订单量": 145 },
  { year: "2 月", "订单量": 48 },
  { year: "3 月", "订单量": 38 },
  { year: "4 月", "订单量": 38 },
  { year: "5 月", "订单量": 38 }
];

const scale = [
  {
    dataKey: "订单量",
    tickInterval: 20
  }
];
export default {
  data() {
    return {
      aweek: {
        title1: "七天订单数量",
        title1num: 0,
        title2: "待付款",
        title2num: 10,
        title3: "待发货",
        title3num: 10,
        title4: "7天收入",
        title4num: "¥2123.20"
      },
      data,
      scale,
      height: 400,
    };
  },

  components: {
    top: top,
    origin:origin
  },

  computed: {},

  methods: {}
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
  /* min-width: 1200px; */
  background-color: #f0f2f5;
  height: 100%;
}
.main {
  background-color: #fff;
  /* margin: 24px; */
  /* margin-left: 280px; */
  height: auto;
  /* padding-bottom: 140px; */
  /* padding-top: 24px; */
}
.title {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 33px;
  margin-left: 68px;
  padding-top: 41px;
  padding-bottom: 46px;
}
.aweek {
  margin-left: 139px;
  border: 1px solid rgba(232, 232, 232, 1);
  width: 716px;
  text-align: center;
}
.aweek1 {
  width: 159px;
  height: 103px;
  border-right: 1px solid rgba(232, 232, 232, 1);
  text-align: center;
}
.aweek1 div:first-child {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 22px;
  margin-top: 24px;
}
.aweek1 div:last-child {
  font-size: 32px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 45px;
}
.aweek .aweek1:last-child {
  width: 235px;
  border: none;
  position: relative;
}
.aweek .aweek1 .pos {
  position: absolute;
  top: 26px;
  right: 19px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(24, 144, 255, 1);
  line-height: 22px;
}
.line {
  width: 533px;
  height: 399px;
  margin-left: 114px;
}
.lineT {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 22px;
  margin-left: 48px;
}
.percentage{
  width: 552px;
  margin-left: 114px;
}
.percentageT{
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 22px;
  margin-left: 48px;
}
</style>