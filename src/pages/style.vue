<!--  -->
<template>
  <div class="shop-style">
    <top></top>
    <div class="center clearfix main">
      <a-tabs defaultActiveKey="1" @change="callback" :tabBarStyle="{boxSizing:'border-box',paddingLeft:'40px',paddingTop:'18px'}">
        <a-tab-pane tab="底部标签" key="1" style="max-height: 844px;overflow-y: auto">
          <div class="tab-content">
            <div class="change-prev">
              <a-row :style="{width:'100%'}">
                <a-col :span="3">
                  <div class="title">修改预览：</div>
                </a-col>
                <a-col :span="21">
                  <div class="see-change-wrap">
                    <ul class="see-change">
                      <li class="icon-item" v-for="(item,index) in tabSum" :style="{width:100/tabSum+'%'}" :key="index">
                        <img src="../assets/icon_top_user.png" alt="" class="icon-img">
                        <div class="icon-name">{{tabsList[index]}}</div>
                      </li>
                    </ul>
                  </div>
                </a-col>
              </a-row>
            </div>
            <div class="edit-tabs">
              <div class="tab-num">
                <div class="title">标签数量：</div>
                <a-select
                  defaultValue="4"
                  style="width: 80px"
                  @change="handleChange"
                >
                  <a-select-option v-for="i in tabMaxNum" :key="i">{{i}}</a-select-option>
                </a-select>
              </div>
              <ul class="tab-list">
                <li class="tab-item" v-for="(item,index) in tabSum" :key="index">
                  <div class="title">标签{{index+1}}</div>
                  <div class="item-content">
                    <div class="option-row">
                      <div class="label">名称：</div>
                      <a-input :value="tabsList[index]" style="width: 112px;" v-if="tabsList[index]" />
                    </div>
                    <div class="option-row">
                      <div class="label">Icon：</div>
                      <div class="content-input">
                        <a-select
                          :maxTagCount="maxTagCount"
                          placeholder="请选择"
                          style="width: 112px;"
                          @change="changeIcon"
                        >
                          <a-select-option v-for="iconItem in iconItems" :key="iconItem.id" :data-index="iconItem.id">
                            <div class="icon-option">
                              <img :src="iconItem.icon" alt="">
                              <img :src="iconItem.iconOn" alt="">
                            </div>
                          </a-select-option>
                        </a-select>
                      </div>
                    </div>
                    <div class="option-row">
                      <div class="label">页面：</div>
                      <div class="content-input">
                        <a-select defaultValue="首页" style="width: 112px" @change="pageChange(item,index,$event)">
                          <a-select-option v-for="(page,pageIndex) in pages" :key="pageIndex">{{page.name}}</a-select-option>
                        </a-select>
                      </div>
                    </div>
                  </div>
                </li>

              </ul>
            </div>
          </div>
          <div class="save-row">
            <a-button :style="{position:'absolute',right:'73px',top:'50%',transform:'translateY(-50%)',width:''}" type="primary" icon="save">保存</a-button>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="配色方案" key="2">
          <div class="tab2-content">
            <div class="color-prev">
              <div class="label">修改预览：</div>
              <div class="prev-item" :style="colorOn"></div>
              <div class="prev-item" :style="colorOn"></div>
            </div>
            <div class="color-scheme">
              <div class="label">配色方案：</div>
              <div class="color-list">
                <a-radio-group @change="onChange1" :defaultValue="defaultColor">
                  <a-radio style="margin-right: 100px;align-items: center;display: flex" :value="item.color" :key="item.value" v-for="item in colorSchemes">
                    <div class="color-circle" :style="{backgroundColor:item.color}"></div>
                  </a-radio>
                </a-radio-group>
              </div>
            </div>
          </div>
          <div class="save-row">
            <a-button :style="{position:'absolute',right:'73px',top:'50%',transform:'translateY(-50%)',width:''}" type="primary" icon="save">保存</a-button>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import top from "@/components/top"
const pages=[
  {
    id:1,
    name:"首页"
  },
  {
    id:2,
    name:"分类"
  },
  {
    id:3,
    name:"购物车"
  },
  {
    id:4,
    name:"我的"
  },
];
export default {
  data() {
    return{
      tabMaxNum:6,//可设置的最大标签数
      tabSum:4,//设置标签数
      defaultColor:'#ED2121',
      maxTagCount:2,
      colorOn:'',//配色方案预览背景色
      tabsList:[
        '',
        '',
        '',
        '',
        '',
        '',
      ],
      tabIndex:'',
      iconItems:[
        {
          id:1,
          icon:'../../static/分类.png',
          iconOn:'../../static/分类1.png',
        },
        {
          id:2,
          icon:'../../static/分类.png',
          iconOn:'../../static/分类1.png',
        },
        {
          id:3,
          icon:'../../static/分类.png',
          iconOn:'../../static/分类1.png',
        },
        {
          id:4,
          icon:'../../static/分类.png',
          iconOn:'../../static/分类1.png',
        },
      ],
      pages,
      colorSchemes:[
        {
          value:1,
          color:'#ED2121',
        },
        {
          value:2,
          color:'#49CFA2',
        },
        {
          value:3,
          color:'#000',
        },
        {
          value:4,
          color:'#DE40C8',
        },
      ]
    };
  },

  components: {
    top:top,
  },
  computed: {},

  methods: {
    callback (key) {
      console.log(key)
    },
    /*标签数量下拉菜单选择器*/
    handleChange(value){
      console.log(`selected ${value}`);
      this.tabSum = value;/*
      for(var i=0;i<value;i++){
        this.tabsList.splice(i,1,'默认')
      }*/
    },
    changeIcon(value){
      console.log(`selected ${value}`);
    },
    /*页面下拉菜单选择*/
    pageChange(num,index,value){
      /*this.tabsList[index]=this.pages[value].name;
      this.tabIndex=index;*/
      console.log(this.tabsList);
      this.tabsList.splice(index,1,this.pages[value].name);
    },
    /*配色方案单选框*/
    onChange1(e){
      console.log(e);
      this.colorOn = {
        backgroundColor:e.target.value
      };
    }
  }
};
</script>
<style scoped>
  .shop-style{
    /* min-width: 1450px; */
    height: 100%;
    background-color: #F0F2F5;
  }
  div,ul,li{
    box-sizing: border-box;
  }
  .clearfix{
    overflow: auto;
  }
  /*中间动态内容区域*/
  .center{
    box-sizing: border-box;
    /*padding: 35px 35px 35px 291px;*/
    /* margin: 24px 24px 24px 280px; */
    height: auto;
    background-color: #fff;
    border-radius: 2px;
  }
  .content{
    background-color: #fff;
    width: 100%;
    border-radius: 2px;
    height: 916px;
    position: relative;
  }
  .tab-content{
    box-sizing: border-box;
    padding: 30px 48px 30px 57px;
  }
  .change-prev{
    width: 100%;
    /*min-width: 1100px;*/
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 64px;
    padding-bottom: 54px;
  }
  .change-prev .title{
    font-size:24px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(0,0,0,0.65);
    line-height: 100px;
  }
  .see-change-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .see-change{
    width:750px;
    height:100px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 1px 1px rgba(229,229,229,1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .icon-item{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .icon-img{
    width: 34px;
    height: 32px;
  }
  .icon-name{
    font-size:20px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(153,153,153,1);
  }
  .item-on .icon-name{
    color:rgba(234,104,25,1);
  }
  .tab-num{
    font-size:18px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(0,0,0,0.65);
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .tab-num .title{
    margin-right: 58px;
  }
  .tab-list{
    display: flex;
    flex-wrap: wrap;
    /*height: 514px;*/
    /*overflow-y: auto;*/
  }
  .tab-item{
    margin: 13px 17px 38px;
  }
  .tab-item .title{
    font-size:14px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(0,0,0,0.6);
    padding: 10px 0;
  }
  .tab-item .item-content{
    width:200px;
    height:165px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(0,0,0,0.5);
    padding: 18px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .tab-item .option-row{
    display: flex;
    justify-content: space-between;
    align-items: center;


    font-size:16px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(0,0,0,0.65);
  }
  .ant-select-dropdown-menu-item .icon-option{
    height: 55px;
    padding: 10px 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(216,216,216,0.5);
  }
  .noborder{
    border-bottom: unset;
  }
  .icon-option img{
    width: 24px;
    height: 22px;
  }
  .save-row{
    height: 64px;
    width: 100%;
    border-top: 1px rgba(216,216,216,1) solid;
    margin-top: 20px;
    position: relative;
  }
  /*标签二*/
  .tab2-content{
    padding: 56px 200px 172px 53px;
    height: 785px;
    width: 100%;
  }
  .color-prev{
    height: 434px;
    width: 100%;
  }
  .color-prev .label{
    width:120px;
    height:33px;
    font-size:24px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(0,0,0,0.65);
    line-height:33px;
    float: left;
  }
  .prev-item{
    height: 434px;
    width: 238px;
    background-color: #ED2121;
    float: left;
    margin-left: 62px;
  }
  .color-scheme{
    width: 100%;
    margin-top: 80px;
    display: flex;
    align-items: center;
  }
  .color-scheme .label{
    width:90px;
    height:25px;
    font-size:18px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(0,0,0,0.65);
    line-height:25px;
  }
  .color-list{
    margin-left: 97px;
  }
  .color-circle{
    height: 24px;
    width: 24px;
    border-radius: 12px;
    background-color: #000;
  }
  .tab2-content .ant-radio-group{
    align-items: center;
    display: flex;
  }
  .ant-select-selection-selected-value .icon-option{
    height: 28px;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: unset;
  }
</style>
