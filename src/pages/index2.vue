<template>
  <div id="account clearfix">
    <div class="title">
      <div class="titlel">
        <div class="logo"><img src="../assets/注册1@2x.png" alt=""></div>
        <div class="titleT">蔚盟后台管理</div>
      </div>
      <div class="titler">
        <div class="person">
          <div class="headImg"></div>
          <div class="name">用户名</div>
        </div>
        <div class="meassage"><img src="../assets/icon_top_notification@2x.png" alt=""></div>

        <div class="search"><img src="../assets/icon_top_search@2x.png" alt=""></div>

        <div class="set">
          <router-link to="/setting"><img src="../assets/icon_top_setting@2x.png" alt=""></router-link>
        </div>

      </div>
    </div>
    <div class="left clearfix">
      <div class="shop clearfix">
        <!-- <div class="bor"></div> -->
        <div v-on:cilck="change">
          <router-link to="/overview">

            <div class="icon">
              <img src="../assets/icon_NAV_general_selected@2x.png" alt="" v-if="bool">
              <img src="../assets/icon_NAV_general_normal@2x.png" alt="" v-else>
            </div>

            <div class="text">概况</div>
          </router-link>

        </div>
      </div>

      <div class="shop">
        <div v-on:click="change1">
          <div class="icon">
            <img src="../assets/icon_NAV_store_normal @2x.png" alt="" v-if="!bool1">
            <img src="../assets/icon_NAV_store_selected@2x.png" alt="" v-else>
          </div>
          <div class="text">店铺</div>
          <a-icon type="down" v-if="bool1" />
          <a-icon type="up" v-else />
        </div>
        <div class="tab" v-if="bool1">
          <!-- 使用 router-link 组件来导航. -->
          <!-- 通过传入 `to` 属性指定链接. -->
          <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->

          <div v-for="(item,index) in tab1" :key="index">
            <router-link :to="item.link">{{item.title}}</router-link>
          </div>

          <!-- 注意这里的路径，course和order是account的子路由 -->
        </div>
      </div>
      <div class="shop">
        <div v-on:click="change2">
          <div class="icon">
            <img src="../assets/icon_NAV_goods_normal @2x.png" alt="" v-if="!bool2">
            <img src="../assets/icon_NAV_goods_selected@2x.png" alt="" v-else>
          </div>
          <div class="text">商品</div>
          <a-icon type="down" v-if="bool2" />
          <a-icon type="up" v-else />
        </div>
        <div class="tab" v-if="bool2">
          <!-- 使用 router-link 组件来导航. -->
          <!-- 通过传入 `to` 属性指定链接. -->
          <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->

          <div v-for="(item,index) in tab2" :key="index">
            <router-link :to="item.link">{{item.title}}</router-link>
          </div>

          <!-- 注意这里的路径，course和order是account的子路由 -->
        </div>
      </div>
      <div class="shop">
        <div v-on:click="change3">
          <div class="icon">
            <img src="../assets/icon_NAV_classify_normal @2x.png" alt="" v-if="!bool3">
            <img src="../assets/icon_NAV_classify_selected@2x.png" alt="" v-else>
          </div>
          <div class="text">订单</div>
          <a-icon type="down" v-if="bool3" />
          <a-icon type="up" v-else />
        </div>
        <div class="tab" v-if="bool3">
          <!-- 使用 router-link 组件来导航. -->
          <!-- 通过传入 `to` 属性指定链接. -->
          <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->

          <div v-for="(item,index) in tab3" :key="index">
            <router-link :to="item.link">{{item.title}}</router-link>
          </div>

          <!-- 注意这里的路径，course和order是account的子路由 -->
        </div>
      </div>
      <div class="shop">
        <div v-on:click="change4">
          <div class="icon">
            <img src="../assets/icon_NAV_person_normal @2x.png" alt="" v-if="!bool3">
            <img src="../assets/icon_NAV_person_selected@2x.png" alt="" v-else>
          </div>
          <div class="text">客户</div>
          <a-icon type="down" v-if="bool4" />
          <a-icon type="up" v-else />
        </div>
        <div class="tab" v-if="bool4">
          <!-- 使用 router-link 组件来导航. -->
          <!-- 通过传入 `to` 属性指定链接. -->
          <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->

          <div v-for="(item,index) in tab4" :key="index">
            <router-link :to="item.link">{{item.title}}</router-link>
          </div>

          <!-- 注意这里的路径，course和order是account的子路由 -->
        </div>
      </div>
      <div class="shop">
        <div v-on:click="change5">
          <div class="icon">
            <img src="../assets/icon_NAV_property_normal @2x.png" alt="" v-if="!bool3">
            <img src="../assets/icon_NAV_property_selected@2x.png" alt="" v-else>
          </div>
          <div class="text">资产</div>
          <a-icon type="down" v-if="bool5" />
          <a-icon type="up" v-else />
        </div>
        <div class="tab" v-if="bool5">
          <!-- 使用 router-link 组件来导航. -->
          <!-- 通过传入 `to` 属性指定链接. -->
          <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->

          <div v-for="(item,index) in tab5" :key="index">
            <router-link :to="item.link">{{item.title}}</router-link>
          </div>

          <!-- 注意这里的路径，course和order是account的子路由 -->
        </div>
      </div>
      <div class="shop">
        <div v-on:click="change6">
          <div class="icon">
            <img src="../assets/icon_NAV_ marketing_normal @2x.png" alt="" v-if="!bool3">
            <img src="../assets/icon_NAV_ marketing_selected@2x.png" alt="" v-else>
          </div>
          <div class="text">营销</div>
          <a-icon type="down" v-if="bool6" />
          <a-icon type="up" v-else />
        </div>
        <div class="tab" v-if="bool6">
          <!-- 使用 router-link 组件来导航. -->
          <!-- 通过传入 `to` 属性指定链接. -->
          <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->

          <div v-for="(item,index) in tab6" :key="index">
            <router-link :to="item.link">{{item.title}}</router-link>
          </div>

          <!-- 注意这里的路径，course和order是account的子路由 -->
        </div>
      </div>
      <div class="shop">
        <div class="bor"></div>
        <div>
          <router-link to="/server">服务订购</router-link>

        </div>
      </div>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <div class="detail">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import { icon } from "ant-design-vue";
export default {
  data() {
    return {
      bool: false,
      bool1: false,
      bool2: false,
      bool3: false,
      bool4: false,
      bool5: false,
      bool6: false,
      currentIndex: 9999,
      tab1: [
        {
          link: "/shopnum",
          title: "店铺数据"
        },
        {
          link: "/style",
          title: "风格装修"
        },
        {
          link: "/pageset",
          title: "页面设置"
        }
      ],
      tab2: [
        {
          link: "/order",
          title: "商品管理"
        },
        {
          link: "/team",
          title: "商品分组"
        }
      ],
      tab3: [
        {
          link: "/orders",
          title: "订单数据"
        },
        {
          link: "/orderm",
          title: "订单管理"
        }
      ],
      tab4: [
        {
          link: "/customer",
          title: "客户管理"
        }
      ],
      tab5: [
        {
          link: "/income",
          title: "收入"
        }
      ],
      tab6: [
        {
          link: "/channels",
          title: "销售渠道"
        },
        {
          link: "/marketing",
          title: "营销玩法"
        }
      ]
    };
  },

  components: {},

  computed: {},

  methods: {
    change: function(index) {
      this.bool = !this.bool;
    },
    change1: function(index) {
      this.bool1 = !this.bool1;
    },
    change2: function(index) {
      this.bool2 = !this.bool2;
    },
    change3: function(index) {
      this.bool3 = !this.bool3;
    },
    change4: function(index) {
      this.bool4 = !this.bool4;
    },
    change5: function(index) {
      this.bool5 = !this.bool5;
    },
    change6: function(index) {
      this.bool6 = !this.bool6;
    },
  }
};
</script>
<style scoped>
.clearfix {
  overflow: auto;
}
.icon {
  float: left;
  margin-left: 24px;
  margin-right: 12px;
}
.icon img {
  width: 14px;
  height: 13px;
}
.text {
  float: left;
  margin-right: 140px;
}
.titleT {
  float: left;
}
.logo {
  float: left;
  margin-left: 24px;
  margin-right: 16px;
  width: 32px;
  height: 32px;
  margin-top: 3px;
  /* background-color: #fff; */
}
.logo img {
  width: 32px;
  /* height: 32px; */
}
.titlel {
  line-height: 64px;
  width: 256px;
  float: left;
  background-color: #002140;
  color: #fff;
  font-size: 18px;
}
.titler {
  height: 64px;
  min-width: 1200px;
}

.set,
.search,
.meassage,
.name {
  float: right;
  margin-top: 24px;
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

.title {
  height: 64px;
  width: 100%;
}
.left {
  float: left;
  background-color: #002140;
  text-align: center;
  min-height: 1300px;
}
/* .detail {
  float: left;
} */
.shop {
  text-align: left;
  width: 256px;
  color: #fff;
  /* margin-left: 24px; */

  /* float: left; */
  line-height: 50px;
}
.shop:last-child {
  margin-top: 144px;
}
.tab {
  text-align: left;
  width: 256px;
  /* float: left; */
  padding-left: 50px;
  background-color: #000c17;
  line-height: 40px;
}
a {
  outline: none;
  text-decoration: none;
  color: #fff;
}
.bor {
  float: left;
  width: 22px;
  height: 22px;
  background: rgba(189, 16, 224, 1);
  border: 1px solid rgba(151, 151, 151, 1);
  margin-top: 15px;
  margin-right: 27px;
  margin-left: 27px;
}
</style>

