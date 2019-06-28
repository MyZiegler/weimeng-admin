<!--  -->
<template>
  <div class="income">
    <top></top>
    <div class="center clearfix">
      <div class="title">收入</div>
      <div class="income-bar">
        <div class="money-table">
          <a-col :span="6">
            <div class="cell-name">七天收入</div>
            <div class="cell-content">¥{{sevenDaysIncome | MoneyFormat}}</div>
          </a-col>
          <a-col :span="6">
            <div class="cell-name">待结算</div>
            <div class="cell-content">¥{{money.money_tosettle | MoneyFormat}}</div>
          </a-col>
          <a-col :span="6">
            <div class="cell-name">可用余额</div>
            <div class="cell-content">¥{{money.available_balance | MoneyFormat}}</div>
            <div class="action up" @click="()=>withdraw(true)">提现</div>
            <div class="action down" @click="()=>showRecharge(true)">充值</div>
          </a-col>
          <a-col :span="6">
            <div class="cell-name">提现中</div>
            <div class="cell-content">¥{{money.money_withdrawing | MoneyFormat}}</div>
            <div class="tips">将于三日内到账</div>
          </a-col>
        </div>
        <a-modal
          width="1136px"
          :bodyStyle="withdrawBox"
          :visible="modal1Visible"
          :footer="null"
          @ok="() => withdraw(false)"
          @cancel="() => withdraw(false)"
          style="top:20px"
        >
          <div class="popup-content">
            <div class="popup-top">
              <a-steps :current="current">
                <a-step v-for="item in steps" :key="item.title" :title="item.title" />
              </a-steps>
            </div>
            <div class="popup-center">
              <div class="popup-center-input" v-if="current==0">
                <!--<div class="input-row" v-for="item in inputList">
                  {{item.title}}：<a-input :style="inputBoxStyle" :placeholder="item.placeholder"/>
                </div>-->
                <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
                  <a-form-item
                    v-for="item in inputList"
                    :key="item.key"
                    :label='item.title'
                    :labelCol="{ span: 5 ,offset:3}"
                    :wrapperCol="{ span: 10 }"
                    :fieldDecoratorId="item.fieldName"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: '不能为空！' }]}"
                  >
                    <a-input :placeholder="item.placeholder" />
                  </a-form-item>
                  <a-form-item
                    :wrapperCol="{offset:15 }"
                  >
                    <a-button
                      type="primary"
                      htmlType='submit'
                    >
                      下一步
                    </a-button>
                  </a-form-item>
                </a-form>
              </div>
              <div class="popup-center-info" v-else-if="current==1">
                <div class="info-input-row" v-for="(item,index) in inputList" :key="index">
                  <div class="info-label">{{item.title}}：</div>
                  <div class="info-content">{{item.value}}</div>
                </div>
              </div>
              <div class="popup-center-final" v-else>

              </div>
            </div>
            <div class="popup-bot" v-if="current>0">
              <a-button
                v-if="current < steps.length - 1"
                type="primary" @click="next"
                style="float: right;"
              >
                下一步
              </a-button>
              <a-button
                v-if="current == steps.length - 1"
                type="primary"
                @click="popupOK"
                style="float: right;"
              >
                完成
              </a-button>
              <a-button
                v-if="current>0"
                @click="prev"
                style="margin-left: 8px;float: left"
              >
                上一步
              </a-button>
            </div>
            <div class="popup-footer">
              <div class="txt-title">说明</div>
              <div class="txt-content">
                <p>转到银行卡</p>
                <p>请填写提现信息并确认信息无误，工作人员会在3个工作日内与您联系。</p>
              </div>
            </div>
          </div>
        </a-modal>
        <a-modal
          centered
          width="820px"
          v-model="modal2Visible"
          @ok="() => modal2Visible = false"
          :footer="null"
          :bodyStyle="rechargeBox"
          :afterClose="modal2Closed"
        >
          <div class="popup-content2" v-if="!showQrcode">
            <div class="title2">充值余额</div>
            <div class="popup-center2">
              <a-form @submit="handleSubmit2" :autoFormCreate="(form)=>{this.form = form}">
                <a-form-item
                  label='店铺名称'
                  :labelCol="{ span: 5 }"
                  :wrapperCol="{ span: 18,offset:1 }"
                  fieldDecoratorId="shopName"
                >
                  <a-col :span="10"><a-input disabled placeholder="请输入" :defaultValue="shopName" :key="shopName" /></a-col>
                </a-form-item>
                <a-form-item
                  label="充值金额"
                  :labelCol="{span:5}"
                  :wrapperCol="{span:18,offset:1}"
                  fieldDecoratorId="recahrgeNum"
                  :fieldDecoratorOptions="{rules: [{ required: true, message: '不能为空！' }]}"
                >
                  <a-col :span="10"><a-input placeholder="请输入"/></a-col>
                  <a-col :span="5" :offset="2"><a-button type="primary" htmlType='submit'>下一步</a-button></a-col>
                </a-form-item>
              </a-form>
            </div>
            <div class="popup-footer">
              <div class="txt-title">说明</div>
              <div class="txt-content">
                <p>充值后余额可以用于服务订购</p>
                <p>余额随时可以进行提现</p>
              </div>
            </div>
          </div v->
          <div class="popup-content2" v-else>
            <div class="title2">扫描下方二维码完成支付</div>
            <div class="popup-center2"></div>
          </div>
        </a-modal>
      </div>
      <div class="sift-area">
        <a-form
          @submit="handleSubmit3" :autoFormCreate="(form)=>{this.form = form}"
        >
          <div class="row">

            <a-col :span="8">
              <a-form-item
                label='时间'
                :labelCol="{ span: 3 }"
                :wrapperCol="{ span: 18,offset:1 }"
                fieldDecoratorId="start_time"
              >
                <a-date-picker
                  :disabledDate="disabledStartDate"
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  v-model="startValue"
                  placeholder="开始时间"
                  @openChange="handleStartOpenChange"
                  :style="datePickerStyle"
                />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item
                label=''
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 18,offset:1 }"
                fieldDecoratorId="end_time"
              >
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
              </a-form-item>
            </a-col>

            <!--<span class="label">时间：</span>
            <a-date-picker
              :disabledDate="disabledStartDate"
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              v-model="startValue"
              placeholder="开始时间"
              @openChange="handleStartOpenChange"
              :style="datePickerStyle"
            />
            <a-date-picker
              :disabledDate="disabledEndDate"
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="结束时间"
              v-model="endValue"
              :open="endOpen"
              @openChange="handleEndOpenChange"
              :style="datePickerStyle"
            />-->
          </div>

          <div class="row">
            <a-col :span="8">
              <a-form-item
                label='单号'
                :labelCol="{ span: 3 }"
                :wrapperCol="{ span: 18,offset:1 }"
                fieldDecoratorId="number"
              >
                <a-input placeholder="请输入" />
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item
                label='状态'
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 18,offset:1 }"
                fieldDecoratorId="state"
              >
                <a-select style="width: 272px" @change="handleChange" placeholder="请选择">
                  <a-select-option value="DEALING">正在处理</a-select-option>
                  <a-select-option value="OFF">操作关闭</a-select-option>
                  <a-select-option value="OK">成功</a-select-option>
                  <a-select-option value="FAIL">申请失败</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="6" :offset="2">
              <a-form-item>
                <a-col :span="6"><a-button type="primary" htmlType='submit'>查询</a-button></a-col>
                <a-col :span="6" :offset="1"><a-button>重置</a-button></a-col>
              </a-form-item>
            </a-col>
          </div>



            <!--<div class="input-item">
              <span class="label">单号：</span>
              <div class="input-box">
                <a-input placeholder="请输入" />
              </div>
            </div>
            <div class="input-item">
              <span class="label">状态：</span>
              <div class="input-box">
                <a-select style="width: 272px" @change="handleChange" placeholder="请选择">
                  <a-select-option value="DEALING">正在处理</a-select-option>
                  <a-select-option value="OFF">操作关闭</a-select-option>
                  <a-select-option value="OK">成功</a-select-option>
                  <a-select-option value="FAIL">申请失败</a-select-option>
                </a-select>
              </div>
            </div>
            <div>
              <a-button type="primary">查询</a-button>
              <a-button>重置</a-button>
            </div>-->
          <div class="row" v-show="false">
            <a-button type="primary" icon="plus">新建</a-button>
            <a-button style="margin: 0 8px;">批量操作</a-button>
            <a-dropdown>
              <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item key="1">操作一</a-menu-item>
                <a-menu-item key="2">操作二</a-menu-item>
                <a-menu-item key="3">操作三</a-menu-item>
              </a-menu>
              <a-button>
                更多操作<a-icon type="down" />
              </a-button>
            </a-dropdown>
          </div>
        </a-form>
      </div>
      <div class="blank">
        <div class="info-row" v-show="false">
          <div class="info-bar">
            <div class="info-icon"></div>
            <div class="selected">
              已选择<span>4</span>项
            </div>
            <div class="sum">
              金额调度总计：<span>36.4万</span>
            </div>
            <a href="javascript:;" class="clear">清空</a>
          </div>
        </div>
      </div>

      <div class="table-area clearfix">
        <a-table :columns="columns"
                 :dataSource="data"
                 :pagination="pagination"
                 @change="handleTableChange"
                 :rowSelection="rowSelection"
                 :loading="isTableLoad"
        >
          <div slot="state" slot-scope="state">
            <div v-if="state=='DEALING'" class="status-cell">
              <div class="circle" style="background-color: #1890ff"></div>
              <div class="txt-status">正在处理</div>
            </div>
            <div v-if="state=='OFF'" class="status-cell">
              <div class="circle" style="background-color: #000000"></div>
              <div class="txt-status">操作关闭</div>
            </div>
            <div v-if="state=='OK'" class="status-cell">
              <div class="circle" style="background-color: #52C41A"></div>
              <div class="txt-status">成功</div>
            </div>
            <div v-if="state=='FAIL'" class="status-cell">
              <div class="circle" style="background-color: #F5222D"></div>
              <div class="txt-status">申请失败</div>
            </div>
          </div>
          <div slot="money" slot-scope="money">
            <div>{{money | MoneyFormat }}</div>
            <!--<div>{{(money/10000).toFixed(2)}}万</div>-->
          </div>
          <div slot="time" slot-scope="time">
            <div>{{time | dateformat('YYYY-MM-DD HH:mm:ss') }}</div>
            <!--<div>{{(money/10000).toFixed(2)}}万</div>-->
          </div>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import top from "@/components/top";
import SevenIncomeController from "@/model-controllers/seven-income-controller.js";
import ShopMoneyController from "@/model-controllers/shop-money-controller.js";
import FundApplyRecordController from "@/model-controllers/fundapply-record-controller.js";

const columns=[
  {
    title:'银行卡用户名',
    dataIndex:'bank_card_username',
    align:'center'

  },
  {
    title:'金额(元)',
    dataIndex:'transfer_amount',
    sorter:(a, b) => a.money - b.money,
    scopedSlots:{customRender:'money'},
    align:'center'
  },
  {
    title:'状态',
    dataIndex:'state',
    filters:[
      {text:'操作关闭',value:'OFF'},
      {text:'正在处理',value:'DEALING'},
      {text:'成功',value:'OK'},
      {text:'申请失败',value:'FAIL'}
    ],
    filterMultiple: false,
    onFilter: (value, record) => value==record.state,
    scopedSlots:{customRender:'state'},
    align:'center'
  },
  {
    title:'时间',
    dataIndex:'create_time',
    sorter: (a, b) => a.price - b.price,
    scopedSlots: { customRender: 'time' },
    align:'center',
  }
];
const data=[
  {
    bank_card: "40089230423400",
    bank_card_username: "小张",
    create_time: "2018-11-26T15:44:0,8.000Z",
    id: 1,
    open_account_bank: "杭州支行",
    phone_number: "17812341234",
    state: "DEALING",
    transfer_amount: 10000.11,
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
      shopName:'汪先生的铺子5188293',
      isTableLoad:false,
      columns,
      data,
      rowSelection,
      pagination:{
        total:data.length,
        pageSize:8
      },
      /*金额统计数据*/
      sevenDaysIncome:0,
      money:{
        available_balance: 20000.4,
        id: 1,
        money_tosettle: 4444.4,
        money_withdrawing: 10000.5,
        update_time: "2018-11-26T09:19:51.000Z"
      },
      /*日期选择器设置*/
      startValue: null,
      endValue: null,
      endOpen: false,
      datePickerStyle:{width:'224px',marginRight:'40px'},
      /*提现弹窗设置*/
      modal1Visible:false,
      modal2Visible:false,
      withdrawBox:{
        height:'700px',
        padding:'24px 32px',
      },
      rechargeBox:{
        height:'368px',
        padding:'34px 35px 30px 46px',
      },
      /*步骤条设置*/
      current: 0,
      steps: [{
        title: '填写提现信息',
        content: 'First-content',
      }, {
        title: '确认提现信息',
        content: 'Second-content',
      }, {
        title: '完成',
        content: 'Last-content',
      }],
      /*表单输入框*/
      inputBoxStyle:{
        width:'435px'
      },
      formLayout:'horizontal',
      inputList:[
        {
          key:'cardNum',
          title:'银行卡号',
          fieldName:'bank_card',
          placeholder:'请输入正确的卡号',
          value:''
        },
        {
          fieldName:'bank_card_username',
          key:'userName',
          title:'开户人姓名',
          placeholder:'请输入',
          value:''
        },
        {
          fieldName:'open_account_bank',
          key:'bankPlace',
          title:'开户行所在地',
          placeholder:'请输入',
          value:''
        },
        {
          fieldName:'transfer_amount',
          key:'withdrawNum',
          title:'提现金额',
          placeholder:'请输入',
          value:''
        },
        {
          fieldName:'phone_number',
          key:'phone',
          title:'手机号',
          placeholder:'请输入',
          value:''
        },
      ],
      /**表单提交信息*/
      valueObj:{},
      rechargeObj:{},//
      showQrcode:false,//是否显示充值二维码
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


  methods: {
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
    /*更多操作下拉菜单*/
    handleMenuClick(e) {
      console.log('click', e);
    },
    /*表格选择*/
    handleTableChange () {

    },
    /*提现按钮*/
    withdraw(args){
      this.modal1Visible = args;
    },
    showRecharge(args){
      this.modal2Visible = args;
    },
    next() {
      let that= this;

      if(that.current==1){
        that.addApplyRecord();
      }
    },
    prev() {
      this.current--
    },
    popupOK(){
      let that = this;

      that.modal1Visible= false;
      that.current=0;
      that.getAllApplyRecords();
    },
    /*表单*/
    handleSubmit (e) {
      let that = this;

      e.preventDefault()
      that.form.validateFields((err, values) => {
        if (!err) {
          that.current++;
          console.log('Received values of form: ', values)
          that.valueObj=values;
          that.inputList.map((item)=>{
            var name = item.fieldName;
            for(var key in values){
              if(key==name){
                item.value=values[key];
              }
            }
          })
        }

      })
    },
    handleSubmit2 (e) {
      let that = this;

      e.preventDefault()
      that.form.validateFields((err, values) => {
        if (!err) {
          console.log('充值的表单: ', values);
          that.rechargeObj=values;
          that.showQrcode=true;
        }
      })
    },
    handleSubmit3(e){
      let that = this;

      e.preventDefault()
      that.form.validateFields((err, values) => {
        if (!err) {
          console.log('查询的表单: ', values);
          console.log(values.end_time._d)
        }
      })
    },
    modal2Closed(){
      let that = this;

      that.showQrcode=false;
    },
    /**获取申请记录表*/
    getAllApplyRecords(){
      let that = this;

      that.isTableLoad=true;
      FundApplyRecordController.getAllFundApplyRecords((data)=>{
        that.isTableLoad=false;
        console.log('申请记录',data);
        that.data=data;
      })
    },
    /**添加一条申请记录*/
    addApplyRecord(){
      let that = this;

      FundApplyRecordController.addFundApplyRecord(that.valueObj,(res)=>{
        console.log('添加一条数据',res);
        that.current++;
      })
    }
  },
  mounted() {
    let that = this;
    SevenIncomeController.getAllSevenIncomes((data)=>{
      console.log('七天收入',data);
      that.sevenDaysIncome=data[0].money;

    });
    ShopMoneyController.getAllShopMoneys((data)=>{
      console.log('商店金额',data);
      that.money=data[0];
    });

    that.getAllApplyRecords();


  }
}

</script>
<style scoped>
  .income{
    /* min-width: 1480px; */
    background-color: #F0F2F5;
    height: 100%;
  }
  .clearfix{
    overflow: auto;
  }
  a{
    color: #1890ff;
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
  .income-bar{
    padding: 0 30px;
  }
  .money-table{
    width: 100%;
    height: 105px;
    border: 1px solid #e8e8e8;
  }
  .money-table .ant-col-6{
    width: 25%;
    height: 100%;
    border-right: 1px solid #e8e8e8;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .money-table .ant-col-6:last-child{
    border-right: unset;
  }
  .cell-name{
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
  }
  .cell-content{
    font-size:32px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    margin-top: 5px;
  }
  .money-table .ant-col-6:last-child{
    color: #de263d;
  }
  .action{
    position: absolute;
    right: 25px;
    color: #1990ff;
    font-size: 16px;
  }
  .action:hover{
    cursor:pointer;
  }
  .up{
    top: 27px;
  }
  .down{
    bottom: 27px;
  }
  .tips{
    font-size:10px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(0,0,0,0.35);
    position: absolute;
    bottom:4px;
  }
  .sift-area{
    padding: 0 149px 0 97px;
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
    margin-bottom: 30px;
  }
  .input-item{
    display: flex;
    align-items: center;

  }
  .sift-area .input-box{
    width: 272px;
    margin-right: 48px;
  }
  .info-row{
    padding: 0 32px;
    height: 40px;
    width: 100%;
  }
  .info-bar{
    height: 40px;
    width: 100%;
    background-color: #e6f7ff;
    line-height: 40px;
    padding-left: 16px;
    border-radius: 4px;
    border: 1px solid #bae7ee;
    font-size: 14px;
  }
  .info-icon{
    height: 14px;
    width: 14px;
    border-radius: 7px;
    overflow: hidden;
    background-image: url('../assets/icon_top_user.png');
    margin-top: 13px;
    margin-right: 8px;
  }
  .info-bar>div{
    float: left;
  }
  .selected span{
    color: #1890ff;
    padding: 0 5px;
  }
  .sum{
    margin: 0 24px 0 16px;
  }
  .sum span{
    font-weight: bolder;
  }
  .table-area{
    margin-top: 16px;
    padding: 0 32px;
  }
  .status-cell{
    display: flex;
    align-items: center;
    justify-content: center;
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
  .popup-content{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
  }
  .popup-content2{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .popup-top{
    width: 760px;
    margin-top: 80px;
  }
  .popup-center{
    /*height: 254px;*/
    width: 100%;
    margin-top: 40px;
  }
  .popup-center-input{

  }
  .popup-center .input-row{
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 24px;
    font-weight: 400;
  }

  .popup-bot{
    width: 100%;
    padding: 0 343px;
    height: 32px;
    position: absolute;
    bottom: 171px;
  }
   .popup-footer{
    height: 108px;
    width: 100%;
    border-top: 1px #e9e9e9 solid;
    position:absolute;
    bottom: 0;
    left: 0;
    color: #000;
  }
  .popup-content .popup-footer{
    padding-left: 48px;
  }
  .popup-center-final,
  .popup-center-info{
    width: 606px;
    height: 231px;
    border: 1px solid #e8e8e8;
    margin: 0 auto 40px;
    padding: 32px;
  }
  .info-input-row{
    display: flex;
    align-items: center;
    margin-bottom: 14px;
    color: #000;
    height: 22px;
    line-height: 22px;
  }
  .info-label{
    font-size: 14px;
    font-weight: 400;
    width: 100px;
    text-align: right;
  }
  .info-content{
    font-size:16px;
    font-family:HelveticaNeue;
  }
  .txt-title{
    font-size: 16px;
    font-weight: 500;
    margin: 20px 0 19px;
  }
  .txt-content{
    font-size:14px;
    font-weight: 400;
  }
  .txt-content p{
    height: 22px;
  }
  .popup-content2 .title2{
    font-size:16px;
    font-family:PingFangSC-Medium;
    font-weight:500;
    color:rgba(0,0,0,0.85);
    margin-top: 10px;
  }
  .blank{
    height: 40px;
    width: 100%;
  }
</style>
