<!--  -->
<template>
  <div class="overview">
    <div class="title">
      <div class="gaik">
        <div class="top1 top">概况</div>
        <div class="bottom1 bottom">{{shopdetail[0].name}}</div>
      </div>

      <div class="money">
        <div class="top">可提现余额</div>
        <div class="bottom">{{shopdetail[0].money}}</div>
      </div>
      <div class="line"></div>
      <div class="yesj">
        <div class="top">昨日交易额</div>
        <div class="bottom">{{shopdetail[0].yesterdaymoney}}</div>
      </div>
      <div class="line"></div>
      <div class="yesterday">
        <div class="top">昨日订单</div>
        <div class="bottom">{{shopdetail[0].yesterday}}</div>
      </div>
      <div class="line"></div>
      <div class="weiq">
        <div class="top">维权订单</div>
        <div class="bottom">{{shopdetail[0].weiqnum}}</div>
      </div>
      <div class="line"></div>
      <div class="daif">
        <div class="top">待发货订单</div>
        <div class="bottom">{{shopdetail[0].num}}</div>
      </div>

      <!-- <div class="line"></div> -->

    </div>
    <div class="main">
      <div class="mainout1">
        <div class="maint">常用功能</div>
        <div class="common clearfix">
          <div class="common1">
            <div class="commonImg"><img src="../assets/icon_common_release@2x.png" alt=""></div>
            <div class="commonTitle">发布商品</div>
          </div>
          <div class="common1">
            <div class="commonImg"><img src="../assets/icon_common_page@2x.png" alt=""></div>
            <div class="commonTitle">页面管理</div>
          </div>
          <div class="common1">
            <div class="commonImg"><img src="../assets/icon_common_coupon@2x.png" alt=""></div>
            <div class="commonTitle">优惠券</div>
          </div>
          <div class="common1">
            <div class="commonImg"><img src="../assets/icon_common_income@2x.png" alt=""></div>
            <div class="commonTitle">收入/提现</div>
          </div>
        </div>
      </div>
      <div class="mainout2">
        <div class="maint">营销功能</div>
        <div class="common clearfix">
          <div class="common2">
            <div class="commonImg"><img src="../assets/pic_marketing1@2x.png" alt=""></div>
            <div class="commondes">
              <div class="commondesT">多人拼团</div>
              <div class="commondesD">裂变式营销玩法</div>
              <div class="commondesY">运营活动</div>
            </div>
            <div class="use">应用</div>
          </div>
          <div class="common2">
            <div class="commonImg"><img src="../assets/pic_marketing2@2x.png" alt=""></div>
            <div class="commondes">
              <div class="commondesT">限时折扣</div>
              <div class="commondesD">门店网店通用</div>
              <div class="commondesY">运营活动</div>
            </div>
            <div class="use">应用</div>
          </div>
        </div>
      </div>
      <div class="mainout3">
        <div class="lastTitle clearfix">
          <div class="titleL">最新订单</div>
          <div class="titleR">
            <router-link to="/index/orderm">查看更多</router-link>
          </div>
        </div>
        <div id="components-table-demo-size">
          <!-- <h4>Middle size table</h4> -->
          <a-table :columns="columns" :dataSource="data" size="default" :pagination="false" />
          <!-- <h4>Small size table</h4> -->
          <!-- <a-table :columns="columns" :dataSource="data" size="small" /> -->
          <div class="footer clearfix">
            <div class="add">总计</div>
            <div class="price">{{price}}</div>
            <div class="num">{{num}}</div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShopConfigController from "@/model-controllers/shop-config-controller";

const columns = [
  {
    title: "商品编号",
    dataIndex: "no"
  },
  {
    title: "商品名称",
    dataIndex: "name"
  },
  {
    title: "商品条码",
    dataIndex: "code"
  },
  {
    title: "单价",
    dataIndex: "price"
  },
  {
    title: "数量（件）",
    dataIndex: "num"
  },
  {
    title: "总金额",
    dataIndex: "prices"
  }
];
const data = [
  {
    key: "1",
    no: "1234561",
    name: "矿泉水",
    code: 12421432143214321,
    price: "2.00",
    num: 1,
    prices: "2.00"
  },
  {
    key: "2",
    no: "1234561",
    name: "矿泉水",
    code: 12421432143214321,
    price: "2.00",
    num: 1,
    prices: "2.00"
  },
  {
    key: "3",
    no: "1234561",
    name: "矿泉水",
    code: 12421432143214321,
    price: "2.00",
    num: 1,
    prices: "2.00"
  },
  {
    key: "4",
    no: "1234561",
    name: "矿泉水",
    code: 12421432143214321,
    price: "2.00",
    num: 1,
    prices: "2.00"
  },
  {
    key: "5",
    no: "1234561",
    name: "矿泉水",
    code: 12421432143214321,
    price: "2.00",
    num: 1,
    prices: "2.00"
  }
];
export default {
  data() {
    return {
      data,
      columns,
      num: 0,
      price: 100,
      shopdetail: [
        {
          name: "汪先生的铺子180905",
          num: "56",
          weiqnum: "8",
          yesterday: "2,223",
          yesterdaymoney: "¥10,345",
          money: "¥40,215"
        }
      ]
    };
  },

  components: {},

  computed: {},
  mounted() {
    let that = this;
    ShopConfigController.getAllShopConfigs(function(shopconfigs) {
      that.shopdetail[0].name = shopconfigs[0].shop_name;
      console.log(shopconfigs)
    });
  },
  methods: {}
};
</script>
<style scoped>
.clearfix {
  overflow: auto;
}
.overview {
  background-color: #f0f2f5;
  height: 100%;
}
.title {
  height: 98px;
  background: rgba(255, 255, 255, 1);
}
.line {
  width: 1px;
  height: 40px;
  background: rgba(233, 233, 233, 1);
  float: right;
  margin-top: 28px;
  margin-left: 14px;
  margin-right: 14px;
}
.daif,
.weiq,
.yesterday,
.yesj,
.money {
  float: right;
  text-align: center;
}
.bottom1 {
  font-size: 20px;
}
.gaik {
  float: left;
  margin-left: 32px;
}
.money {
  margin-right: 101px;
}
.top {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  line-height: 20px;
  margin: 17px 0;
}

.bottom {
  font-size: 30px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 28px;
  text-align: center;
}
.bottom1 {
  font-size: 20px;
}
.main {
  /* width:1136px; */
  /* margin: 24px; */
  height: 1154px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  /* margin-left: 280px; */
  padding: 0 32px;
}
.maint {
  padding-top: 24px;
  /* margin-left: 32px; */
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
.mainout2 .common {
  padding-bottom: 150px;
}
.common {
  margin-top: 29px;
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 39px;
}
.common1 .commonImg,
.commonTitle {
  float: left;
}
.common1 .commonImg img {
  width: 40px;
}
.commonTitle {
  margin-right: 50px;

  margin-left: 12px;
  margin-top: 9px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.85);
  line-height: 22px;
}
.common2 {
  position: relative;
  margin-right: 24px;
  float: left;
  width: 266px;
  height: 282px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  border: 1px solid rgba(233, 233, 233, 1);
}
.common2 .commonImg img {
  width: 266px;
}
.commondes {
  margin-left: 32px;
  margin-top: 20px;
}
.commondesT {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
}
.commondesD {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.45);
  line-height: 22px;
  margin-top: 4px;
  margin-bottom: 12px;
}
.commondesY {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.45);
  line-height: 20px;
}
.use {
  position: absolute;
  top: 238px;
  left: 191px;
  width: 55px;
  line-height: 24px;
  border-radius: 12px;
  border: 1px solid rgba(202, 202, 202, 1);
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.45);
  text-align: center;
}
.lastTitle {
  line-height: 55px;
}
.titleL {
  float: left;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
.titleR {
  float: right;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(27, 145, 255, 1);
  margin-right: 106px;
}
#components-table-demo-size {
  float: left;
  width: 100%;
}
.footer {
  line-height: 53px;
  border-bottom: 1px solid #e8e8e8;
  font-size: 14px;
  font-family: HelveticaNeue-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.65);
}
.add {
  margin-left: 16px;
  float: left;
}
.num {
  float: right;
  /* margin-right: 106px; */
  width: 17%;
  text-align: left;
}
.price {
  float: right;
  /* margin-right: 120px; */
  width: 11%;
  text-align: left;
}
</style>