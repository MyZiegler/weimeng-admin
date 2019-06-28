<!--  -->
<template>
  <div class="out">
    <top></top>
    <div class="plays" style="margin:24px">
      <div class="title">营销玩法</div>
      <div class="main clearfix">

        <div class="mains clearfix fl" v-for="item in plays" :key="item.index">
          <router-link :to="item.routerLink">
            <div class="mainsl fl"><img :src="item.imgsrc" alt=""></div>
            <!-- <div class="mainsr fl">
              <div class="tip">{{item.tip}}</div>
              <div class="des">{{item.des}}</div>
            </div> -->
          </router-link>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "@/components/top";

export default {
  data() {
    return {
      plays: [
        {
          imgsrc: "../../static/营销_营销玩法@2x.png",
          tip: "优惠券",
          routerLink: "/index/Coupon"
        },
        {
          imgsrc: "../../static/营销_营销玩法1@2x.png",
          tip: "限时折扣",
          routerLink: "/index/Discount"
        },
        {
          imgsrc: "../../static/营销_营销玩法2@2x.png",
          tip: "支付有礼",
          routerLink: "/index/payForgift"
        },
        {
          imgsrc: "../../static/营销_营销玩法13@2x.png",
          tip: "优惠套餐",
          des: "多件商品组成优惠套餐 提升客单价",
          routerLink: "/index/combo"
        },
        {
          imgsrc: "../../static/营销_营销玩法7@2x.png",
          tip: "包邮工具",
          des: "包邮、运费减免",
          routerLink: "/index/mailTool"
        },
        {
          imgsrc: "../../static/营销_营销玩法5@2x.png",
          tip: "赠品",
          des: "设置赠品、回馈客户",
          routerLink: "/index/gift"
        },
        {
          imgsrc: "../../static/营销_营销玩法6@2x.png",
          tip: "多人拼团",
          // des: "设置并给客户发放会员卡",
          routerLink: "/index/manyP"
        },
        {
          imgsrc: "../../static/营销_营销玩法8@2x.png",
          tip: "秒杀",
          routerLink: "/index/seckill"
        },
        {
          imgsrc: "../../static/营销_营销玩法4@2x.png",
          tip: "优惠码",
          routerLink: "/index/Couponcode"
        },
        {
          imgsrc: "../../static/营销_营销玩法9@2x.png",
          tip: "打包一口价",
          des: "给我N元这里的商品随便挑",
          routerLink: "/index/packingBargain"
        },
        {
          imgsrc: "../../static/营销_营销玩法10@2x.png",
          tip: "满减/送",
          des: "购满一定金额或件数享受优惠",
          routerLink: "/index/reduceSend"
        },
        {
          imgsrc: "../../static/营销_营销玩法11@2x.png",
          tip: "订单返现",
          des: "客户下单后获得返现奖励",
          routerLink: "/index/OrderCashback"
        },
        {
          imgsrc: "../../static/营销_营销玩法12@2x.png",
          tip: "会员卡",
          routerLink: "/index/membercard"
        },
        {
          imgsrc: "../../static/营销_营销玩法3@2x.png",
          tip: "找人代付",
          des: "让客户可以邀请好友付款",
          routerLink: "/index/toGetPaid"
        }
      ]
    };
  },

  components: {
    top: top
  },

  computed: {},

  methods: {}
};
</script>
<style scoped>
.fl {
  float: left;
}
.out {
  background: #f0f2f5;
  height: 100%;
}
.plays {
  /* margin: 24px; */
  background-color: #fff;
  /* margin-left: 280px; */
  padding-bottom: 24px;
}
.title {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 33px;
  margin-left: 44px;
  padding-top: 30px;
}
.main {
  margin-left: 96px;
  margin-top: 69px;
}
.mains {
  width: 270px;
  height: 100px;
  background-color: #f7f7f7;
  margin-right: 66px;
  text-align: center;
  margin-top: 45px;
  /* margin-bottom: 46px; */
}
.mainsl img {
  width: 270px;
  /* margin: 25px; */
}
.tip {
  font-size: 20px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.65);
  line-height: 28px;
  margin-top: 20px;
  margin-bottom: 14px;
}
.des {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.45);
  line-height: 17px;
  white-space: normal;
  width: 144px;
}
</style>
