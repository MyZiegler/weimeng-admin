<!--  -->
<template>
  <div class="customer">
    <top></top>
    <div class="center clearfix" style="margin:24px">
      <div class="title">客户管理</div>
      <div class="search-bar">
        <a-form layout='inline' @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
          <a-form-item
            label='关键词'
            fieldDecoratorId="keywords"
          >
            <a-input placeholder="手机号/微信昵称" />
          </a-form-item>
          <a-form-item
            style="margin-left: 20px"
          >
            <a-button type='primary' htmlType='submit'>查询</a-button>
            <a-button style="margin-left: 10px" @click="formReset">重置</a-button>
          </a-form-item>
        </a-form>
        <!--<div class="item-box">
          <div class="input-label">关键词：</div>
          <a-input placeholder="手机号/微信昵称"/>
        </div>
        &lt;!&ndash;<div class="input-item">
          <div class="input-label">来源：</div>
          <a-select style="width: 272px" @change="handleChange" placeholder="请选择">
            <a-select-option value="微信">微信</a-select-option>
            <a-select-option value="网页">网页</a-select-option>
          </a-select>
        </div>&ndash;&gt;
        <div class="item-box">
          <a-button type="primary" @click="onSearch">查询</a-button>
          <a-button>重置</a-button>
        </div>-->
      </div>
      <div class="action-bar">
        <a-button>批量导出</a-button>
        <a-dropdown>
          <a-menu slot="overlay" @click="selectMoreAction">
            <a-menu-item key="1">1st item</a-menu-item>
            <a-menu-item key="2">2nd item</a-menu-item>
            <a-menu-item key="3">3rd item</a-menu-item>
          </a-menu>
          <a-button>
            更多操作 <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>
      <div class="table-area clearfix">
        <a-table :columns="columns"
                 :dataSource="data"
                 :pagination="pagination"
                 :loading="loading"
                 @change="handleTableChange"
                 :rowSelection="rowSelection"
        >
          <div slot="updateTime" slot-scope="updateTime">
            <!--{{new Date(+new Date(updateTime)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')}}-->
            {{updateTime | dateformat}}
          </div>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import top from "@/components/top";
import UserController from "@/model-controllers/user-controller";
import axios from "axios";

const columns=[
  {
    title:'微信昵称',
    dataIndex:'nickName',
  },
  {
    title:'手机号',
    dataIndex:'user_phone'
  },
  {
    title:'购买次数',
    dataIndex:'user_buy_count',
    sorter: (a,b)=>a.buyTimes-b.buyTimes,
    scopedSlots: { customRender: 'buyTimes' },
    align:'center',
  },
  {
    title:'更新时间',
    dataIndex:'create_time',
    sorter: true,
    scopedSlots: { customRender: 'updateTime' },
  },
];
/*const data=[
  {
    key:1,
    pageId:'12312',
    nikeName:'微信昵称',
    phone:'12312345678',
    buyTimes:126,
    origin:'微信',
    updateTime:'2017-10-31 23:12:00'
  },
  {
    key:2,
    pageId:'12312',
    nikeName:'微信昵称',
    phone:'12312345678',
    buyTimes:121,
    origin:'网页',
    updateTime:'2017-10-31 23:12:00'
  },
  {
    key:3,
    pageId:'12312',
    nikeName:'微信昵称',
    phone:'12312345678',
    buyTimes:123,
    origin:'微信',
    updateTime:'2017-10-31 23:12:00'
  },
  {
    key:4,
    pageId:'12312',
    nikeName:'微信昵称',
    phone:'12312345678',
    buyTimes:124,
    origin:'网页',
    updateTime:'2017-10-31 23:12:00'
  },
  {
    key:5,
    pageId:'12312',
    nikeName:'微信昵称',
    phone:'12312345678',
    buyTimes:127,
    origin:'微信',
    updateTime:'2017-10-31 23:12:00'
  },
  {
    key:6,
    pageId:'12312',
    nikeName:'微信昵称',
    phone:'12312345678',
    buyTimes:128,
    origin:'微信',
    updateTime:'2017-10-31 23:12:00'
  },
  {
    key:7,
    pageId:'12312',
    nikeName:'微信昵称',
    phone:'12312345678',
    buyTimes:121,
    origin:'网页',
    updateTime:'2017-10-31 23:12:00'
  },
  {
    key:8,
    pageId:'12312',
    nikeName:'微信昵称',
    phone:'12312345678',
    buyTimes:123,
    origin:'微信',
    updateTime:'2017-10-31 23:12:00'
  },
  {
    key:9,
    pageId:'12312',
    nikeName:'微信昵称',
    phone:'12312345678',
    buyTimes:122,
    origin:'微信',
    updateTime:'2017-10-31 23:12:00'
  },
];*/
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};
export default {
  data () {
    return {
      columns,
      data:[],
      rowSelection,
      pagination:{
        pageSize:10
      },
      loading:false
    };
  },

  components: {
    top:top
  },

  computed: {},

  mounted(){
    let that =this;

    that.getAllUsers();
  },

  methods: {
    handleSubmit(e){
      let that = this;

      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log("Received values of form: ", values);
          UserController.getUsersBySearch(values.keywords,(userList)=>{
              console.log(userList);
            that.data=userList;
            }
          )
        }else{
          console.log(values)
        }
      });
    },
    formReset(){
      let that = this;

      that.form.resetFields();
      that.getAllUsers();
    },
    getAllUsers(){
      let that = this;

      UserController.getAllUsers(function (userList) {
        that.data=userList;
        console.log(that.data);
      });
    },
    handleChange(){

    },
    selectMoreAction(){

    },
    handleTableChange () {

    },
  }
}

</script>
<style scoped>
  .customer{
    /* min-width: 1400px; */
    background-color: #F0F2F5;
    height: 100%;
  }
  .clearfix{
    overflow: auto;
  }
  div,ul,li{
    box-sizing: border-box;
  }
  /*中间动态内容区域*/
  .center{
    /* margin: 24px 24px 24px 280px; */
    height: auto;
    background-color: #fff;
    border-radius: 2px;
    /*不同页面的padding*/
    padding:41px 29px 46px 35px;
  }
  .title{
    padding-left: 32px;
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(0,0,0,0.65);
    margin-bottom: 48px;
  }
  .search-bar{
    width: 100%;
    padding-left: 70px;
  }
  .search-bar .ant-input{
    width: 272px;
  }
  .input-item{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }
  .item-box{
    margin-left: 30px;
    position: relative;
  }
  .input-label{
    width: 60px;
    text-align: right;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(0,0,0,0.85);
    line-height:32px;
    position: absolute;
    left: -55px;
  }
  .action-bar{
    padding-left:70px;
    margin-top: 35px;
  }
  .table-area{
    width: 100%;
    margin-top: 28px;
    position: relative;
  }
</style>
