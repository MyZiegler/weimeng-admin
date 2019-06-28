<!--  -->
<template>
  <div class="orderm">
    <top></top>
      <div class="center clearfix" style="margin:24px">
        <div class="title">订单管理</div>
        <div class="sift-area">
          <div class="row">
            <div class="input-item">
              <span class="label">查询：</span>
              <div class="input-box">
                <a-input placeholder="请输入商品名或订单号" />
              </div>
            </div>
            <div class="input-item">
              <span class="label">订单状态：</span>
              <div class="input-box">
                <a-select style="width: 272px" @change="handleChange" placeholder="请选择">
                  <a-select-option value="0">关闭</a-select-option>
                  <a-select-option value="1">已发货</a-select-option>
                  <a-select-option value="2">已完成</a-select-option>
                  <a-select-option value="-1">待付款</a-select-option>
                  <a-select-option value="-2">待发货</a-select-option>
                </a-select>
              </div>
            </div>
          </div>
          <div class="row">
            <div>
              <span class="label">时间：</span>
              <a-date-picker
                :disabledDate="disabledStartDate"
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                v-model="startValue"
                placeholder="开始时间"
                @openChange="handleStartOpenChange"
                :style="datePickerStyle"
              />
            </div>
            <a-date-picker
              :disabledDate="disabledEndDate"
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="结束时间"
              v-model="endValue"
              :open="endOpen"
              @openChange="handleEndOpenChange"
              :style="datePickerStyle"
            />
            <div>
              <a-button type="primary">查询</a-button>
              <a-button>重置</a-button>
            </div>
          </div>
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
                <div class="txt-status">已发货</div>
              </div>
              <div v-if="status==0" class="status-cell">
                <div class="circle" style="background-color: #000000"></div>
                <div class="txt-status">关闭</div>
              </div>
              <div v-if="status==2" class="status-cell">
                <div class="circle" style="background-color: #52C41A"></div>
                <div class="txt-status">已完成</div>
              </div>
              <div v-if="status==-1" class="status-cell">
                <div class="circle" style="background-color: #FFF718"></div>
                <div class="txt-status">待发货</div>
              </div>
              <div v-if="status==-2" class="status-cell">
                <div class="circle" style="background-color: #F5222D"></div>
                <div class="txt-status">待付款</div>
              </div>
            </div>
            <div slot="price" slot-scope="price">
                <div>¥{{price}}</div>
            </div>
          </a-table>
        </div>
      </div>
  </div>
</template>

<script>
import top from "@/components/top";
import OrderController from "@/model-controllers/order-controller"

const columns=[
  {
    title:'商品名',
    dataIndex:'goodsName',

  },
  {
    title:'买家',
    dataIndex:'nikeName',
  },
  {
    title:'单价',
    dataIndex:'price',
    sorter:(a, b) => a.price - b.price,
    align:'center',
    scopedSlots: { customRender: "price" },

  },
  {
    title:'数量',
    dataIndex:'num',
    sorter:(a,b)=>a.num-b.num,
    align:'center',
  },
  {
    title:'状态',
    dataIndex:'status',
    filters:[
      {text:'关闭',value:'0'},
      {text:'已发货',value:'1'},
      {text:'已完成',value:'2'},
      {text:'待付款',value:'-1'},
      {text:'待发货',value:'-2'}
    ],
    scopedSlots:{customRender:'status'},
    filterMultiple: false,
    onFilter: (value, record) => value==record.status,
  },
  {
    title:'下单时间',
    dataIndex:'time',
    sorter: true,
    scopedSlots: { customRender: 'time' },
    align:'center',
  },
];
const data=[
  {
    key:1,
    userId:1,
    nikeName:'123abc',
    goodsName:'一件商品',
    price:13.3,
    num:1,
    status:0,
    time:'2017-10-31 23:12:00',
  },
  {
    key:2,
    userId:1,
    nikeName:'123abc',
    goodsName:'一件商品',
    price:14.3,
    num:2,
    status:1,
    time:'2017-10-31 23:12:00'
  },
  {
    key:3,
    userId:1,
    nikeName:'123abc',
    goodsName:'一件商品',
    price:12.3,
    num:3,
    status:2,
    time:'2017-10-31 23:12:00'
  },
  {
    key:4,
    userId:1,
    nikeName:'123abc',
    goodsName:'一件商品',
    price:16.3,
    num:4,
    status:-1,
    time:'2017-10-31 23:12:00'
  },
  {
    key:5,
    userId:1,
    nikeName:'1234abc',
    goodsName:'一件商品万',
    price:15.3,
    num:5,
    status:-2,
    time:'2017-10-31 23:12:00'
  },
  {
    key:6,
    userId:1,
    nikeName:'123abc',
    goodsName:'一件商品',
    price:11.3,
    num:6,
    status:0,
    time:'2017-10-31 23:12:00'
  },
  {
    key:7,
    userId:1,
    nikeName:'1234abc',
    goodsName:'一件商品万',
    price:15.3,
    num:5,
    status:-2,
    time:'2017-10-31 23:12:00'
  }
];
/*表格事件*/
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
      /*表格初始化设置*/
      columns,
      data,
      rowSelection,
      pagination:{
        total:data.length,
        pageSize:8
      },
      loading:false,
      /*日期选择器设置*/
      startValue: null,
      endValue: null,
      endOpen: false,
      datePickerStyle:{width:'224px',marginRight:'40px'}
    };
  },
  /*日期时间选择器事件*/
  watch: {
    startValue(val) {
      console.log('startValue', val)
    },
    endValue(val) {
      console.log('endValue', val)
    }
  },
  components: {
    top:top
  },

  computed: {},

  mounted(){
    let that =this;

    that.getAllData();
  },
  methods: {
    getAllData(){
      let that = this;

      OrderController.getAllOrders((data)=>{
        console.log(data)
        // that.data=data
      })
    },
    /*下拉菜单事件*/
    handleChange(){

    },
    /*日期时间选择器*/
    disabledStartDate (startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    disabledEndDate (endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    handleStartOpenChange (open) {
      if (!open) {
        this.endOpen = true;
      }
    },
    handleEndOpenChange (open) {
      this.endOpen = open;
    },
    handleTableChange(){

    }
  }
}

</script>



<style scoped>
  .orderm{
    /* min-width: 1350px; */
    height: 100%;
    background-color: #F0F2F5;
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
    padding:30px 0 20px;
  }
  .title{
    padding-left: 68px;
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(0,0,0,0.65);
    margin-bottom: 56px;
  }
  .sift-area{
    padding: 0 149px 0 75px;
    margin-top: 50px;
  }
  .sift-area .label{
    font-size: 14px;
    font-weight: 400;
    margin-right: 20px;
  }
  .sift-area .row{
    display: flex;
    align-items: center;
    margin-bottom: 26px;
  }
  .sift-area .row:last-child{
    justify-content: space-between;
  }
  .input-item{
    display: flex;
    align-items: center;

  }
  .sift-area .input-box{
    width: 272px;
    margin-right: 48px;
  }
  .table-area{
    margin-top: 16px;
    padding: 0 32px;
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
