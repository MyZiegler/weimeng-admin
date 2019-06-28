<!--  -->
<template>
  <div class="out cleaarfix">
    <top></top>
    <div class="main clearfix">
      <!-- <a-range-picker @change="onChange" :placeholder="['开始时间', '结束时间']" /> -->
      <div class="meetnum">
        <div class="meetnumT clearfix">
          <div class="meetnumTl fl">访问量</div>
          <div class="meetnumTr fr">
            <div
              class="fl today"
              @click="today"
            >今日</div>
            <div
              class="fl today"
              @click="thisweek"
            >本周</div>
            <div class="fl today" @click="thismouth">本月</div>
            <div class="fl today" @click="thisyear">今年</div>
            <div class="date fl">
              <a-range-picker
                @change="onChange"
                :placeholder="['开始时间', '结束时间']"
              />
            </div>
          </div>
        </div>
        <div class="meetnumM">
          <v-chart
            :forceFit="true"
            :tooltip="123"
            :height="height"
            :data="data"
            :scale="scale"
          >
            <v-tooltip />
            <v-axis />
            <v-bar position="year*订单量" />
          </v-chart>
        </div>
      </div>
      <div class="hotsearch fl">
        <div class="title">线上热门搜索</div>
        <div class="line1 fl">
          <v-chart
            :forceFit="true"
            :height="heightLine1"
            :data="dataLine1"
            :scale="scaleLine1"
          >
            <v-tooltip />
            <v-axis />
            <v-line
              position="year*value"
              :size="2"
            />
            <v-area position="year*value" />
          </v-chart>
        </div>
        <div class="line2 fl">
          <v-chart
            :forceFit="true"
            :height="heightLine1"
            :data="dataLine1"
            :scale="scaleLine1"
          >
            <v-tooltip />
            <v-axis />
            <v-line
              position="year*value"
              :size="2"
            />
            <v-area position="year*value" />
          </v-chart>
        </div>
        <div class="table fl">

          <a-table
            :columns="columns"
            :dataSource="dataTable"
            @change="onChange"
            :pagination="pagination"
            size="small"
          >
            <div
              slot="operation"
              slot-scope="week"
            >
              <div>{{(week*1000/10)+"%"}}</div>
            </div>
          </a-table>
        </div>
      </div>
      <div class="sellnum fl">
        <div class="title clearfix">
          <div>销售额类别占比</div>
          <div class="title1">
            <div
              class="all fl"
              :class="{blue:bool}"
              v-on:click="change"
            >全部渠道</div>
            <div
              class="fl inline"
              :class="{blue:bool1}"
              v-on:click="change1"
            >线上</div>
            <div
              class="fl outline"
              :class="{blue:bool2}"
              v-on:click="change2"
            >门店</div>
          </div>
        </div>
        <div class="pie">
          <div class="pietitle">
            <div class="pietitleT">销售额</div>
            <div class="pietitleN">¥ 123,224</div>
          </div>
          <div>
            <v-chart
              :forceFit="true"
              :height="height2"
              :data="datapie"
              :scale="scalepie"
            >
              <v-tooltip
                :showTitle="false"
                dataKey="item*percent"
              />
              <v-axis />
              <v-legend dataKey="item" />
              <v-pie
                position="percent"
                color="item"
                :vStyle="pieStyle"
                :label="labelConfig"
              />
              <v-coord
                type="theta"
                :radius="0.75"
                :innerRadius="0.6"
              />
            </v-chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "@/components/top";
const columns = [
  {
    title: "排名",
    dataIndex: "key"
  },
  {
    title: "搜索关键词",
    dataIndex: "search"
  },
  {
    title: "用户数",
    dataIndex: "usernum",

    filterMultiple: true,
    // onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.usernum - b.usernum
  },
  {
    title: "周涨幅",
    dataIndex: "week",
    scopedSlots: { customRender: "operation" },
    // filterMultiple: true,
    // onFilter: (value, record) => record.address.indexOf(value) === 0,
    sorter: (a, b) => a.week - b.week
  }
];

const dataTable = [
  {
    key: "1",
    search: "John Brown",
    usernum: 32,
    week: 0.28
  },
  {
    key: "2",
    search: "John",
    usernum: 33,
    week: 0.08
  },
  {
    key: "3",
    search: "Brown",
    usernum: 34,
    week: 0.02
  },
  {
    key: "4",
    search: "John Brown",
    usernum: 30,
    week: 0.18
  },
  {
    key: "5",
    search: "John Brown",
    usernum: 31,
    week: 1.28
  }
];

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

const DataSet = require("@antv/data-set");
const data = [
        { year: "0时", 订单量: 100 },
        { year: "1时", 订单量: 52 },
        { year: "2时", 订单量: 61 },
        { year: "3时", 订单量: 145 },
        { year: "4时", 订单量: 145 },
        { year: "5时", 订单量: 145 },
        { year: "6时", 订单量: 145 },
        { year: "7时", 订单量: 145 },
        { year: "8时", 订单量: 145 },
        { year: "9时", 订单量: 145 },
        { year: "10时", 订单量: 145 },
        { year: "11时", 订单量: 145 },
        { year: "12时", 订单量: 145 },
        { year: "13时", 订单量: 145 },
        { year: "14时", 订单量: 145 },
        { year: "15时", 订单量: 145 },
        { year: "16时", 订单量: 145 },
        { year: "17时", 订单量: 145 },
        { year: "18时", 订单量: 0 },
        { year: "19时", 订单量:  0},
        { year: "20时", 订单量: 0 },
        { year: "21时", 订单量: 0 },
        { year: "22时", 订单量: 0 },
        { year: "23时", 订单量: 0 }
        // { year: "22时", 订单量: 145 },
      ];
const dataLine1 = [
  { year: "1991", value: 15468 },
  { year: "1992", value: 16100 },
  { year: "1993", value: 15900 },
  { year: "1994", value: 17409 },
  { year: "1995", value: 17000 },
  { year: "1996", value: 31056 },
  { year: "1997", value: 31982 },
  { year: "1998", value: 32040 },
  { year: "1999", value: 33233 }
];
const scaleLine1 = [
  {
    dataKey: "value",
    min: 10000
  },
  {
    dataKey: "year",
    min: 0,
    max: 1
  }
];
const scale = [
  {
    dataKey: "订单量",
    tickInterval: 20
  }
];
const sourceData = [
  { item: "家用电器", count: 36 },
  { item: "食用酒水", count: 20 },
  { item: "个护健康", count: 16 },
  { item: "服饰箱包", count: 10 },
  { item: "母婴产品", count: 9 },
  { item: "其他", count: 9 }
];

const scalepie = [
  {
    dataKey: "percent",
    min: 0,
    formatter: ".0%"
  }
];

const dv = new DataSet.View().source(sourceData);
dv.transform({
  type: "percent",
  field: "count",
  dimension: "item",
  as: "percent"
});
const datapie = dv.rows;
export default {
  data() {
    return {
      data,
      scale,
      height: 400,
      heightLine1: 200,
      dataLine1,
      scaleLine1,
      dataTable,
      columns,
      pagination: {
        // showSizeChanger: true,
        showQuickJumper: true,
        onChange: page => {
          console.log(page);
        },
        pageSize: 4
      },
      bool: true,
      bool1: false,
      bool2: false,
      datapie,
      scalepie,
      height2: 400,
      pieStyle: {
        stroke: "#fff",
        lineWidth: 1
      },
      labelConfig: [
        "percent",
        {
          formatter: (val, item) => {
            return item.point.item + ": " + val;
          }
        }
      ]
    };
  },

  components: {
    top: top
  },

  computed: {},

  methods: {
    today() {
      this.data = [
        { year: "0时", 订单量: 100 },
        { year: "1时", 订单量: 52 },
        { year: "2时", 订单量: 61 },
        { year: "3时", 订单量: 145 },
        { year: "4时", 订单量: 145 },
        { year: "5时", 订单量: 145 },
        { year: "6时", 订单量: 145 },
        { year: "7时", 订单量: 145 },
        { year: "8时", 订单量: 145 },
        { year: "9时", 订单量: 145 },
        { year: "10时", 订单量: 145 },
        { year: "11时", 订单量: 145 },
        { year: "12时", 订单量: 145 },
        { year: "13时", 订单量: 145 },
        { year: "14时", 订单量: 145 },
        { year: "15时", 订单量: 145 },
        { year: "16时", 订单量: 145 },
        { year: "17时", 订单量: 145 },
        { year: "18时", 订单量: 145 },
        { year: "19时", 订单量: 145 },
        { year: "20时", 订单量: 145 },
        { year: "21时", 订单量: 145 },
        { year: "22时", 订单量: 145 },
        { year: "23时", 订单量: 145 }
        // { year: "22时", 订单量: 145 },
      ];
    },
    thisweek() {
      this.data = [
        { year: "周一", 订单量: 100 },
        { year: "周二", 订单量: 52 },
        { year: "周三", 订单量: 61 },
        { year: "周四", 订单量: 145 },
        { year: "周五", 订单量: 48 },
        { year: "周六", 订单量: 38 },
        { year: "周日", 订单量: 38 }
      ];
    },
    thismouth() {
      this.data = [
        { year: "1号", 订单量: 100 },
        { year: "2号", 订单量: 52 },
        { year: "3号", 订单量: 61 },
        { year: "4号", 订单量: 145 },
        { year: "5号", 订单量: 145 },
        { year: "6号", 订单量: 145 },
        { year: "7号", 订单量: 145 },
        { year: "8号", 订单量: 145 },
        { year: "9号", 订单量: 145 },
        { year: "10号", 订单量: 145 },
        { year: "11号", 订单量: 145 },
        { year: "12号", 订单量: 145 },
        { year: "13号", 订单量: 145 },
        { year: "14号", 订单量: 145 },
        { year: "15号", 订单量: 145 },
        { year: "16号", 订单量: 145 },
        { year: "17号", 订单量: 145 },
        { year: "18号", 订单量: 145 },
        { year: "19号", 订单量: 145 },
        { year: "20号", 订单量: 145 },
        { year: "21号", 订单量: 145 },
        { year: "22号", 订单量: 145 },
        { year: "23号", 订单量: 145 },
        { year: "24号", 订单量: 145 },
        { year: "25号", 订单量: 145 },
        { year: "26号", 订单量: 145 },
        { year: "27号", 订单量: 145 },
        { year: "28号", 订单量: 145 },
        { year: "29号", 订单量: 145 },
        { year: "30号", 订单量: 145 },
        { year: "31号", 订单量: 145 },
        
      ];
    },
    thisyear(){
      this.data=[
  { year: "10 月", 订单量: 100 },
  { year: "11 月", 订单量: 52 },
  { year: "12 月", 订单量: 61 },
  { year: "1 月", 订单量: 145 },
  { year: "2 月", 订单量: 48 },
  { year: "3 月", 订单量: 38 },
  { year: "4 月", 订单量: 38 },
  { year: "5 月", 订单量: 38 },
  { year: "6 月", 订单量: 38 },
  { year: "7 月", 订单量: 38 },
  { year: "8 月", 订单量: 38 },
  { year: "9 月", 订单量: 38 }
];
    },
    onChange(date, dateString) {
      console.log(date);
    },
    change() {
      this.bool = true;
      this.bool1 = false;
      this.bool2 = false;
    },
    change1() {
      this.bool = false;
      this.bool1 = true;
      this.bool2 = false;
    },
    change2() {
      this.bool = false;
      this.bool1 = false;
      this.bool2 = true;
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
}
.main {
  /* margin: 24px; */
  /* margin-left: 280px; */
  height: auto;
  padding-bottom: 24px;
}
.meetnum {
  width: auto;
  height: 404px;
  background: #fff;
}
.meetnumT {
  padding-top: 12px;
  padding-left: 32px;
  padding-right: 32px;
  border-bottom: 1px solid #f0f2f5;
  line-height: 32px;
  padding-bottom: 12px;
}
.today {
  margin-right: 12px;
}
.title {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
  padding-left: 24px;
  margin-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f2f5;
}
.hotsearch {
  border-right: 24px solid #f0f2f5;
}
.hotsearch,
.sellnum {
  background-color: #fff;
  border-top: 24px solid #f0f2f5;
  width: 50%;
  height: 530px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
}
.line1,
.line2 {
  width: 50%;
}
.table {
  width: 100%;
}
.title1 {
  margin-top: 16px;
}
.all {
  width: 88px;
  line-height: 32px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px 0px 0px 4px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  text-align: center;
  /* background: rgba(255, 255, 255, 1); */
  border: 1px solid rgba(217, 217, 217, 1);
}
.inline,
.outline {
  width: 60px;
  line-height: 32px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px 0px 0px 4px;
  border: 1px solid rgba(217, 217, 217, 1);
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  text-align: center;
}
.outline,
.inline {
  border-left: none;
}
.blue {
  color: rgba(24, 144, 255, 1);
  border: 1px solid rgba(24, 144, 255, 1);
}
.pie {
  position: relative;
}
.pietitle {
  position: absolute;
  top: 132px;
  left: 47%;
}
.pietitleT {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.45);
  line-height: 22px;
  margin-left: 34px;
}
.pietitleN {
  font-size: 140%;
  font-family: HelveticaNeue;
  color: rgba(0, 0, 0, 0.85);
  line-height: 38px;
}
</style>