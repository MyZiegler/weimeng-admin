<!--  -->
<template>
  <div class="page-set">
    <top></top>
    <div class="center clearfix main">
      <div class="search-bar">
        <div class="input-item">
          <div class="input-label">页面名称：</div>
          <a-input placeholder="请输入"/>
        </div>
        <div class="input-item">
          <div class="input-label">描述：</div>
          <a-input placeholder="请输入"/>
        </div>
        <div>
          <a-button type="primary">查询</a-button>
          <a-button>重置</a-button>
        </div>
        <a-button type="primary" icon="plus" :style="{marginRight:'20px'}">新建</a-button>
      </div>
      <div class="table-area clearfix">
        <a-table :columns="columns"
                 :dataSource="data"
                 :pagination="pagination"
                 :loading="loading"
                 @change="handleTableChange"
                 :rowSelection="rowSelection"
        >
          <div slot="status" slot-scope="status">
              <div v-if="status==1" class="status-cell">
                <div class="circle" style="background-color: #1890ff"></div>
                <div class="txt-status">使用中</div>
              </div>
              <div v-if="status==0" class="status-cell">
                <div class="circle" style="background-color: #000000"></div>
                <div class="txt-status">关闭</div>
              </div>
              <div v-if="status==-1" class="status-cell">
                <div class="circle" style="background-color: #F5222D"></div>
                <div class="txt-status">异常</div>
              </div>
          </div>
          <span slot="action" slot-scope="action">
              <a href="javascript:;">编辑</a>
              <a-divider type="vertical" />
              <a href="javascript:;" :style="{color:'#f5222d'}">删除</a>
          </span>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import top from "@/components/top";
const columns=[
  {
    title:'页面名称',
    dataIndex:'pageName',
  },
  {
    title:'描述',
    dataIndex:'description'
  },
  {
    title:'状态',
    dataIndex:'status',
    filters:[
      {text:'关闭',value:0},
      {text:'使用中',value:1},
      {text:'异常',value:-1}
    ],
    scopedSlots:{customRender:'status'}
  },
  {
    title:'更新时间',
    dataIndex:'updateTime',
    sorter: true,
    scopedSlots: { customRender: 'updateTime' },
  },
  {
    title:'操作',
    dataIndex:'action',
    scopedSlots:{customRender:'action'}
  },
];
const data=[
  {
    key:1,
    pageId:'12312',
    pageName:'页面名称1',
    description:'这是一段描述，关于这个应用',
    status:1,
    updateTime:'2017-10-31 23:12:00'
  },
  {
    key:2,
    pageId:'12312',
    pageName:'页面名称2',
    description:'这是一段描述，关于这个应用',
    status:0,
    updateTime:'2017-10-31 23:12:00'
  },
  {
    key:3,
    pageId:'12312',
    pageName:'页面名称3',
    description:'这是一段描述，关于这个应用',
    status:1,
    updateTime:'2017-10-31 23:12:00'
  },
  {
    key:4,
    pageId:'12312',
    pageName:'页面名称4',
    description:'这是一段描述，关于这个应用',
    status:-1,
    updateTime:'2017-10-31 23:12:00'
  },
  {
    key:5,
    pageId:'12312',
    pageName:'页面名称5',
    description:'这是一段描述，关于这个应用',
    status:1,
    updateTime:'2017-10-31 23:12:00'
  },
  {
    key:6,
    pageId:'12312',
    pageName:'页面名称6',
    description:'这是一段描述，关于这个应用',
    status:-1,
    updateTime:'2017-10-31 23:12:00'
  },
  {
    key:7,
    pageId:'12312',
    pageName:'页面名称7',
    description:'这是一段描述，关于这个应用',
    status:1,
    updateTime:'2017-10-31 23:12:00'
  },
  {
    key:8,
    pageId:'12312',
    pageName:'页面名称8',
    description:'这是一段描述，关于这个应用',
    status:1,
    updateTime:'2017-10-31 23:12:00'
  },
  {
    key:9,
    pageId:'12312',
    pageName:'页面名称9',
    description:'这是一段描述，关于这个应用',
    status:-1,
    updateTime:'2017-10-31 23:12:00'
  },
  {
    key:10,
    pageId:'12312',
    pageName:'页面名称10',
    description:'这是一段描述，关于这个应用',
    status:1,
    updateTime:'2017-10-31 23:12:00'
  },
  {
    key:11,
    pageId:'12312',
    pageName:'页面名称11',
    description:'这是一段描述，关于这个应用',
    status:1,
    updateTime:'2017-10-31 23:12:00'
  },
];
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
      data,
      rowSelection,
      pagination:{
        total:11,
        pageSize:8
      },
      loading:false
    };
  },

  components: {
    top:top
  },

  computed: {},


  methods: {
    handleTableChange () {

    },
  }
}

</script>
<style scoped>
  .page-set{
    /* min-width: 1350px; */
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
    box-sizing: border-box;
    border-radius: 2px;
    /* margin: 24px 24px 24px 280px; */
    height: auto;
    background-color: #fff;
    /*不同页面的padding*/
    padding:60px 32px 32px;
  }
  .content{
    background-color: #fff;
    width: 100%;
    border-radius: 2px;
    position: relative;
    /*不同页面的padding*/
    padding: 60px 32px 32px;
  }
  .search-bar{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }
  .search-bar .ant-input{
    width: 272px;
  }
  .input-item{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }
  .input-label{
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(0,0,0,0.85);
    line-height:22px;
  }
  .table-area{
    width: 100%;
    margin-top: 44px;
    position: relative;
  }
  .status-cell{
    display: flex;
    align-items: center;
  }
  .circle{
    width: 6px;
    height: 6px;
    border-radius: 6px;
    margin-right: 8px;
  }
  .txt-status{
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(0,0,0,0.65);
  }
</style>
