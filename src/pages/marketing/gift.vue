<!-- -->
<template>
    <div class="page-marketing">
        <top></top>
        <div class="center clearfix">
          <div class="head">
            <div class="title">赠品</div>
            <div class="options-bar">
              <div class="list-status">
                <div class="status-item"
                     v-for="(tab,index) in tabs"
                     :key="index"
                     :class="{'status-item-on':tab.active}"
                     @click="clickTab(index)"
                >
                  {{tab.name}}
                </div>
              </div>
              <a-button type="primary" v-if="!newRow" @click="create" style="margin-top: 8px;float:right;">新建赠品</a-button>
              <div class="search-box" v-if="!newRow">
                <a-input-search
                  placeholder="搜索"
                  style="width: 160px;float: right;margin-top: 8px;margin-right: 39px;"
                  @search="onSearch"
                />
              </div>
            </div>
          </div>
          <div class="table-area" v-if="!newRow">
            <a-table :dataSource="data" :columns="columns">
                <span slot="actName" slot-scope="actName" >
                  <span style="color: #1890FF;">{{actName}}</span>
                </span>
              <span slot="action" slot-scope="i,item">
                  <span v-if="item.status==1">
                    <a href="">编辑</a>
                    <a href="">使失效</a>
                  </span>
                  <span v-else>
                    <a href="" style="color:#acacac">已失效</a>
                  </span>
                  <a href="javascript:;" :style="{color:'#f5222d',marginLeft:'10px'}">删除</a>
                </span>
            </a-table>
          </div>
          <div class="edit-area" v-else>
            <div class="body">
              <div class="prev-box">
                <div class="gift-item">
                  <div class="gift-img">
                    <img class="img-gift" :src="goodsNull.imgUrl" alt="">
                  </div>
                  <div class="gift-info" v-if="!noImg">
                    <div class="info-row-1">
                      <div class="gift-name fl">{{goodsNull.name}}</div>
                      <div class="gift-price fr">¥ 0.00</div>
                    </div>
                    <div class="info-row-2">
                      <div class="gift-property fl">{{goodsNull.Property}}</div>
                      <div class="gift-num fr">x1</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="input-box">
                <a-form :autoFormCreate="(form)=>{this.form = form}"
                        @submit="handleSubmit"
                >
                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label='活动名称'
                    required
                  >
                    <a-input style="width: 224px;" />
                  </a-form-item>

                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label='时间限制'
                    required
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

                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label='领取有效期'
                    required
                  >
                    <a-input style="width: 48px;margin-right:10px;" /><span>次</span>
                  </a-form-item>

                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label='购买限制'
                    required
                  >
                    <a-radio-group @change="radioChange" v-model="radioValue">
                      <a-radio :style="radioStyle" value='0'>每人 <a-input style="width: 42px;margin: 0 10px;"/>次</a-radio>
                      <a-radio :style="radioStyle" value='1'>不限购</a-radio>
                    </a-radio-group>
                  </a-form-item>

                  <a-form-item
                    :labelCol="labelCol"
                    :wrapperCol="wrapperCol"
                    label='选择商品'
                    required
                  >
                    <div class="addGoods-row">
                      <div class="addGoods" @click="showAddGoodsModal">
                        <div class="btn-addGoods" v-if="noImg">
                          <div class="icon-plus">+</div>
                          <div class="btn-name">选择商品</div>
                        </div>
                        <div class="img-goods" v-else>
                          <img style="height: 100%;width: 100%  ;" :src="goodsNull.imgUrl" alt="">
                        </div>
                      </div>
                      <span class="toNewGoods"><a href="../order">去新建商品</a></span>
                      <div class="tips">只能选择一件无规格商品</div>
                    </div>

                  </a-form-item>
                </a-form>
              </div>
            </div>
            <div class="footer">
              <a-button @click="editCancel" style="position: absolute;bottom: 26px;right: 255px;">取消</a-button>
              <a-button style="position: absolute;bottom: 26px;right: 157px;" type="primary" htmlType='submit'>完成</a-button>
            </div>
          </div>
          <a-modal
            centered
            width="820px"
            v-model="addGoodsModalVisible"
            @ok="addGoodsOk"
            :bodyStyle="{height:'368px',padding:'34px 35px 30px 46px'}"
          >

          </a-modal>
        </div>
    </div>
</template>

<script>
    import top from "@/components/top";
    const columns=[
      {
        title:'活动名称',
        dataIndex:'actName',
        key:'actName',
        scopedSlots:{customRender:'actName'}
      },
      {
        title:'有效期',
        dataIndex:'validity',
        key:'validity',
        align:'center'
      },
      {
        title:'活动状态',
        dataIndex:'actStatus',
        key:'actStatus',
        align:'center'
      },
      {
        title:'操作',
        dataIndex:'action',
        key:'action',
        align:'center',
        scopedSlots:{customRender:'action'}
      },
    ];
    const data=[
      {
        key:1,
        actName:'优惠礼包',
        validity:'2018.1.30 - 2018.4.21',
        actStatus:'正在进行',
        status:1,
      },
      {
        key:2,
        actName:'双十一',
        validity:'2018.10.28 - 2018.12.28',
        actStatus:'已失效',
        status:0,
      },
      {
        key:3,
        actName:'全场任选',
        validity:'2018.10.28 - 2018.12.28',
        actStatus:'已失效',
        status:0,
      },
    ];
    export default {
        data() {
            return {
              goodsNull:{},
              goodsToAdd:{
                name:'原味荣松饼',
                Property:'原味一件',
                imgUrl:'../../../static/qrcode.png'
              },
              noImg:true,
              radioValue:1,
              radioStyle: {
                display: 'block',
                height: '30px',
                lineHeight: '30px',
              },
              tabs:[
                {
                  name:'全部',
                  active:true
                },
                {
                  name:'未开始',
                  active:false
                },
                {
                  name:'进行中',
                  active:false
                },
                {
                  name:'已结束',
                  active:false
                },
              ],
              data,
              columns,
              newRow:false,//创建新数据
              addGoodsModalVisible:false,//选择商品弹窗
              labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
              },
              wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
              },
              /*日期选择器设置*/
              startValue: null,
              endValue: null,
              endOpen: false,
              datePickerStyle:{width:'224px'},
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
            top: top
        },

        computed: {},


        methods: {
          /**搜索**/
          onSearch(e){
            console.log(e);
          },
          /**新建**/
          create(){
            this.newRow=!this.newRow;
          },
          /**点击标签**/
          clickTab(index){
            let _this = this;
            _this.tabs.forEach(function (item) {
              item.active=false;
            })
            _this.tabs[index].active=true;
          },
          /**日期时间选择器*/
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
          /**单选按钮*/
          radioChange(e){
            console.log('radio change',e)
          },
          /**编辑完成*/
          handleSubmit(e){
            console.log(e);
          },
          /*editOk(){
            // this.newRow=false;
            console.log(this.$refs.newSeckill)
            this.$refs.newSeckill.form.submit();
          },*/
          editCancel(){
            this.newRow=false;
          },
          showAddGoodsModal(){
            this.addGoodsModalVisible=true;
          },
          addGoodsOk(){
            this.addGoodsModalVisible = false
            this.noImg = false;
            this.goodsNull=this.goodsToAdd;
          }
        }
    }

</script>
<style scoped>
  .page-marketing{
    /* min-width: 1400px; */
    background-color: #f0f2f5;
    height: 100%;
  }
  .clearfix{
    overflow: auto;
  }
  div,ul,li{
    box-sizing: border-box;
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  /*中间动态内容区域*/
  .center{
    box-sizing: border-box;
    border-radius: 2px;
    /* margin: 24px 24px 24px 280px; */
    height: auto;
    background-color: #fff;
    /*不同页面的padding*/
    padding:30px 0 0;
  }
  .head,
  .table-area{
    padding: 0 55px;
  }
  .center .head>.title{
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(0,0,0,0.65);
    padding: 12px;
  }
  .center .head>.options-bar{
    height: 48px;
    margin: 34px 0;
  }
  .list-status{
    height: 48px;
    float: left;
  }
  .status-item{
    float: left;
    padding: 0 36px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    position: relative;
  }
  .status-item:hover{
    cursor:pointer;
    color: #1890ff;
  }
  .status-item-on{
    color: #1890ff;
  }
  .status-item-on:after{
    content: '';
    display: block;
    width: 80px;
    height: 2px;
    background-color: #1890ff;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-40px);
  }
  .edit-area{
    width: 100%;
    position: relative;
  }
  .edit-area .footer{
    height: 80px;
    width: 100%;
    border-top: 1px solid #b7b7b7;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .edit-area .body{
    width: 100%;
    padding-bottom: 150px;
    padding-left: 66px;
  }
  .prev-box{
    height: 669px;
    width: 376px;
    /*position: absolute;
    left: 44px;
    top: 0;*/
    background-image:url("../../assets/gift.png");
    background-size:100% 100%;
    box-shadow: 0  0.5px 0 0.5px #b7b7b7;
    position: relative;
  }
  .gift-item{
    width: 100%;
    height: 83px;
    position: absolute;
    top: 282px;
  }
  .gift-img{
    width: 75px;
    height: 75px;
    background-color: #b7b7b7;
    position: absolute;
    left: 29px;
    top: 0;
  }
  .gift-info{
    width: 100%;
    height: 100%;
    padding: 6.5px 25.5px  14.5px 122.5px;
  }
  .info-row-1{
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(0,0,0,0.79);

    margin-bottom: 54px;
  }
  .gift-price{
    font-size: 12px;
    color: #ff3b30;
  }
  .info-row-2{
    font-size:10px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(138,138,138,0.79);
    line-height:14px;
  }
  .input-box{
    /*height: 308px;*/
    width: 560px;
    border: 1px solid #b7b7b7;
    position: absolute;
    right: 71px;
    top: 0;
    padding: 32px 0;
  }
  .addGoods-row{
    width: 100%;
    height: 134px;
  }
  .addGoods{
    width: 108px;
    height: 108px;
    margin-left: 27px;
    float: left;
    margin-right: 60px;
    margin-bottom: 8px;
  }
  .addGoods:hover{
    cursor: pointer;
  }
  .btn-addGoods{
    width: 100%;
    height: 100%;
    border: 1px dashed #b7b7b7;
    position: relative;
  }
  .icon-plus{
    width: 24px;
    height: 24px;
    position: absolute;
    top: 24px;
    left: 40px;
    line-height: 24px;
    text-align: center;
    font-size: 40px;
    color: #b7b7b7;
  }
  .btn-name{
    width:56px;
    height:22px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#b7b7b7;
    line-height:22px;
    position: absolute;
    bottom: 20px;
    left: 28px;
  }
  .img-goods{
    width: 100%;
    height: 100%;
  }
  .toNewGoods{
    width:70px;
    height:20px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(24,144,255,1);
    line-height:20px;
    float: left;
  }
  .tips{
    width:154px;
    height:22px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(0,0,0,0.45);
    line-height:22px;
    clear: left;
  }
  .img-gift{
    height: 100%;
    width: 100%;
  }
</style>
