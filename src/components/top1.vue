<!--  -->
<template>
    <div class="top">
        <div class="nav-bar">
            <a-breadcrumb>
                <a-breadcrumb-item>{{title.title1}}</a-breadcrumb-item>
                <a-breadcrumb-item>{{title.title2}}</a-breadcrumb-item>
                <a-breadcrumb-item>{{title.title3}}</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="title-bar">
            <img class="shop-head" src="../assets/icon_top_user.png" alt="" />
            <div class="shop-name">{{shop_name}}</div>
          <a-popover placement="bottom">
            <template slot="content">
              <div class="qrcode-box">
                <div class="tips">微信扫码访问店铺</div>
                <img class="img-qrcode" :src="shopInfo.qrcodeUrl" />
              </div>
            </template>
            <a-button class="btn-title btn-blue" type="primary">
              <!--<img src="../assets/icon_top_user.png" alt="">-->
              <a-icon type="qrcode" style="margin-right: 5px"/>
              <div>访问店铺</div>
            </a-button>
          </a-popover>
            <a-button class="btn-title btn-center">新建模版</a-button>
            <a-button class="btn-title">发布商品</a-button>
        </div>
    </div>
</template>

<script>
import ShopConfigController from "@/model-controllers/shop-config-controller";

export default {
  data() {
    return {
      shopInfo:{
        pageview:'70',
        visitors:'42',
        goodsPageview:'2,223',
        goodsVisitor:'231',
        minPage:'4',
        goods:'2',
        qrcodeUrl:'../../static/qrcode.png'//本地图片地址放在了static文件夹中
      },
      shop_name:"",
      title:{
          title1:"店铺",
          title2:"风格装修",
          title3:"三级菜单",
      },
      props:{
        
      }
    };
  },

  components: {},

  computed: {},
  mounted () {
    let that = this;
    ShopConfigController.getAllShopConfigs(function(shopconfigs) {
      that.shop_name = shopconfigs[0].shop_name;
    });
  },
  methods: {}
};
</script>
<style scoped>
  .top{
    height: 122px;
    background-color: #fff;
    box-sizing: border-box;
    /* padding-left: 256px; */
  }
  .top>div{
    width: 100%;
  }
  .nav-bar{
    padding: 16px 32px;
  }
  .title-bar{
    padding: 2px 32px;
    overflow: auto;
    zoom: 1;
  }
  .shop-head{
    float: left;
    width: 28px;
    height: 28px;
    margin-right: 16px;
  }
  .shop-name{
    float: left;
    font-size:20px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(0,0,0,0.85);
    line-height:28px;
  }
  .title-bar .btn-title{
    float:right;
  }
  .btn-blue{
    display: flex;
    align-items: center;
  }
  .btn-blue img{
    margin-right: 10px;
    width: 17px;
    height: 17px;
  }
  .btn-center{
    margin: 0 27px 0 17px;
  }
  .info-bar{
    padding: 30px 32px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .info-item{
    text-align: center;
    padding: 0 30px;
    position: relative;
  }
  .info-item:after{
    content:'';
    display: block;
    width:1px;
    height:40px;
    background:rgba(233,233,233,1);
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0,-20px);
  }
  .info-item:last-child:after{
    display: none;
  }
  .info-item .txt-name{
    height:22px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(0,0,0,0.45);
    line-height:22px;
  }
  .info-item .txt-num{
    height:38px;
    font-size:30px;
    font-family:HelveticaNeue;
    color:rgba(0,0,0,0.85);
    line-height:38px;
  }
  .qrcode-box{
    width: 120px;
    height: 140px;
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .img-qrcode{
    width: 100px;
    height: 100px;
  }
  .qrcode-box .tips{
    font-size: 10px;
  }
</style>
