<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh;">
    <a-layout-sider v-model="collapsed">
      <div class="logo">
        <img src="../assets/注册1@2x.png" alt="">蔚云后台管理
      </div>
      <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline">
        <a-menu-item key="1">
          <router-link to="/index/overview"><a-icon type="dashboard" />概况</router-link>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="shop" /><span>店铺</span></span>
          <a-menu-item key="3">
            <router-link to="/index/shopnum">店铺数据</router-link>
          </a-menu-item>
          <a-menu-item key="4">
            <router-link to="/index/style">风格装修</router-link>
          </a-menu-item>
          <a-menu-item key="5">
            <router-link to="/index/pageset">页面设置</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title">
            <a-icon type="mail" /><span>商品</span></span>
          <a-menu-item key="6">
            <router-link to="/index/order">商品管理</router-link>
          </a-menu-item>
          <a-menu-item key="7">
            <router-link to="/index/team">商品分组</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title">
            <a-icon type="profile" /><span>订单</span></span>
          <a-menu-item key="8">
            <router-link to="/index/orders">订单数据</router-link>
          </a-menu-item>
          <a-menu-item key="9">
            <router-link to="/index/orderm">订单分组</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub4">
          <span slot="title">
            <a-icon type="user" /><span>客户</span></span>
          <a-menu-item key="10">
            <router-link to="/index/customer">客户管理</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub5">
          <span slot="title">
           <a-icon type="pay-circle-o" /><span>资产</span></span>
          <a-menu-item key="11">
            <router-link to="/index/income">收入</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub6">
          <span slot="title">
            <a-icon type="rocket" /><span>营销</span></span>
          <a-menu-item key="12">
            <router-link to="/index/channels">销售渠道</router-link>
          </a-menu-item>
          <a-menu-item key="13">
            <router-link to="/index/marketing">营销玩法</router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="22">
          <a-icon type="file" />
          <span>File</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout style="overflow:auto;min-width:1200px">
      <a-layout-header style="background: #fff; padding: 0">
        <div class="titler">
          <div class="person">
            <div class="headImg"></div>
            <div class="name">用户名</div>
          </div>
          <div class="meassage"><img src="../assets/icon_top_notification@2x.png" alt=""></div>

          <div class="search"><img src="../assets/icon_top_search@2x.png" alt=""></div>

          <div class="set">
            <router-link to="/index/setting"><img src="../assets/icon_top_setting@2x.png" alt=""></router-link>
          </div>

        </div>
      </a-layout-header>
      <a-layout-content>

        <div :style="{  background: '#fff', minHeight: '360px'}">
          <router-view ></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Real Magic ©2018 Created by Real Magic
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      tab3: [
        {
          link: "",
          title: "订单数据"
        },
        {
          link: "/index/orderm",
          title: "订单管理"
        }
      ],
      tab4: [
        {
          link: "",
          title: "客户管理"
        }
      ],
      tab5: [
        {
          link: "/index/income",
          title: ""
        }
      ],
      tab6: [
        {
          link: "/index/channels",
          title: ""
        },
        {
          link: "/index/marketing",
          title: ""
        }
      ]
      
    };
    
  }
};
</script>

<style>
#components-layout-demo-side .logo {
  /* height: 32px; */
  /* background: rgba(255, 255, 255, 0.2); */
  padding: 16px;
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.titler {
  height: 64px;
  /* min-width: 1200px; */
}

.set,
.search,
.meassage,
.name {
  float: right;
  /* margin-top: 24px; */
}
.set img {
  /* margin-left: 966px; */
  width: 16px;
  margin-right: 25px;
}
.search img {
  width: 16px;
}
.meassage img {
  width: 16px;
  margin-left: 26px;
}
.person {
  float: right;
  margin-right: 22px;
}
.headImg {
  width: 24px;
  height: 24px;
  background: rgba(166, 219, 255, 1);
  border-radius: 50%;
  margin-top: 20px;
  margin-left: 26px;
  margin-right: 8px;
  float: left;
}
.logo img {
  width: 31px;
  padding-top: 3px;
  margin-right: 17px;
}
</style>
