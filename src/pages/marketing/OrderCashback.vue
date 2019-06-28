<!-- -->
<template>
    <div class="page-marketing">
        <top1></top1>
        <div class="center clearfix">
            <div class="head">
                <div class="title">

                  订单返现

                </div>
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
                    <a-button type="primary" v-if="!newRow" @click="create" style="margin-top: 8px;float:right;">新建活动
                    </a-button>
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
                  <span slot="actName" slot-scope="actName">
                    <span style="color: #1890FF;">{{actName}}</span>
                  </span>
                  <span slot="state" slot-scope="state">
                    <span v-if="state==='USING'">正在进行</span>
                    <span v-else-if="state==='INVALID'">已失效</span>
                  </span>
                  <span slot="validity" slot-scope="i,item">
                    <div>{{item.start_time | dateformat('YYYY-MM-DD HH:mm:ss')}}-</div>
                    <div>{{item.end_time | dateformat('YYYY-MM-DD HH:mm:ss')}}</div>
                  </span>
                  <!--<span slot="action" slot-scope="i,item">
                    <span v-if="item.status==1">
                      <span class="blue-btn">编辑</span>
                      <span class="blue-btn">使失效</span>
                    </span>
                    <span v-else>
                      <span class="gray-btn">已失效</span>
                    </span>
                    <span :style="{color:'#f5222d',marginLeft:'10px'}">删除</span>
                  </span>-->
                  <span slot="action" slot-scope="i,item">
                    <span v-if="item.state==='USING'">
                      <span @click="editActivity(item.id)" class="blue-btn">编辑</span>
                      <span @click="invalidateActivity(item.id)" class="blue-btn">使失效</span>
                    </span>
                    <!--<span v-else>
                      <span @click="validateActivity(item.id)" class="blue-btn">使生效</span>
                    </span>-->
                    <span @click="delActivity(item.id)" class="del-btn">删除</span>
                  </span>
                </a-table>
            </div>
            <div class="edit-area" v-else>
              <a-form :autoFormCreate="(form)=>{this.form = form}"
                      @submit="handleSubmit"
                      :loading="tableLoad"
              >
                <div class="body">

                    <div class="prev-box">
                      <div class="mask"></div>
                    </div>
                    <div class="input-box">

                        <a-form-item
                          :labelCol="labelCol"
                          :wrapperCol="wrapperCol"
                          label='活动名称'
                          required
                          fieldDecoratorId="activity_name"
                          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入活动名称' }]}"
                        >
                          <a-input :style="widthStyle" />
                        </a-form-item>

                        <a-form-item
                          :labelCol="labelCol"
                          :wrapperCol="wrapperCol"
                          label='生效时间'
                          required
                          fieldDecoratorId="start_end_time"
                        >
                          <a-date-picker
                            :disabledDate="disabledStartDate"
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            v-model="startValue"
                            placeholder="开始时间"
                            @openChange="handleStartOpenChange"
                            :style="widthStyle"
                          />
                          <a-date-picker
                            :disabledDate="disabledEndDate"
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="结束时间"
                            v-model="endValue"
                            :open="endOpen"
                            @openChange="handleEndOpenChange"
                            style="width: 224px;display: block;margin:10px 0 0 0;"
                          />
                          <div class="red-btn" style="font-size: 12px;height: 17px;">返现活动有效期不能超过15天</div>
                        </a-form-item>

                        <a-form-item
                          :labelCol="labelCol"
                          :wrapperCol="wrapperCol"
                          label="返现方式"
                          required
                          fieldDecoratorId="cashbackWay"
                          :fieldDecoratorOptions="{
                            initialValue:cashbackWayRadioInitValue
                          }"
                        >
                          <a-radio-group
                            @change="this.cashbackWayRadioChange"
                          >
                            <a-radio value="RANDOM">随机返现</a-radio>
                            <a-radio value="REGULAR">固定返现</a-radio>
                          </a-radio-group>
                        </a-form-item>

                        <a-form-item
                          :labelCol="labelCol"
                          :wrapperCol="wrapperCol"
                          label="返现区间"
                          required
                          fieldDecoratorId="cashback_between"
                        >
                          <div v-if="cashBackWay=='RANDOM'">
                            <a-input :style="smallInputStyle" />%
                            -
                            <a-input :style="smallInputStyle" />%
                          </div>
                          <div v-else>
                            <a-input :style="smallInputStyle" />元
                          </div>
                        </a-form-item>

                        <a-form-item
                          :labelCol="labelCol"
                          :wrapperCol="wrapperCol"
                          label="返现限制"
                          required
                          fieldDecoratorId="limit_amount"
                        >
                          每人
                          <a-input :style="smallInputStyle" />
                          笔订单
                        </a-form-item>

                        <a-form-item
                          :labelCol="labelCol"
                          :wrapperCol="wrapperCol"
                          label='商品限制'
                          required
                        >
                          <a-radio-group @change="goodsLimitRadioChange" v-model="goodsLimitRadioValue">
                            <a-radio :style="radioStyle" :value="1">全部商品</a-radio>
                            <a-radio :style="radioStyle" :value="2">
                              <span class="radio-row">
                                <span style="font-size:14px;">指定商品可用</span><span style="float: right;font-size: 12px;color: #1890ff;" @click="addGoodsIncluded">添加商品</span>
                              </span>
                              <div class="goodsAdded" v-if="goodsLimitIndex==2">
                                <div class="goods-item" v-for="(item,i) in addGoodsList" :key="item.id">
                                  <div class="goods-name">{{item.name}}</div>
                                  <div class="btn-delete" @click="delGoodsItem(i)">删除</div>
                                </div>
                              </div>
                            </a-radio>
                            <a-radio :style="radioStyle" :value="3">
                              <span class="radio-row">
                                <span style="font-size:14px;">指定商品不可用</span><span style="float: right;font-size: 12px;color: #1890ff;">添加商品</span>
                              </span>
                              <div class="goodsAdded" v-if="goodsLimitIndex==3">
                                <div class="goods-item" v-for="(item,i) in addGoodsList" :key="item.id">
                                  <div class="goods-name">{{item.name}}</div>
                                  <div class="btn-delete" @click="delGoodsItem2(i)">删除</div>
                                </div>
                              </div>
                            </a-radio>
                          </a-radio-group>
                        </a-form-item>
                    </div>
                </div>
                <div class="footer">
                    <a-button @click="editCancel" style="position: absolute;bottom: 26px;right: 255px;">取消</a-button>
                    <a-button style="position: absolute;bottom: 26px;right: 157px;" type="primary" htmlType='submit'>
                        完成
                    </a-button>
                </div>
              </a-form>
              <a-modal
                centered
                width="680px"
                v-model="addGoodsModalVisible"
                @ok="addGoodsOk"
                :bodyStyle="{height:'700px',padding:'60px 52px 40px'}"
                :footer="null"
              >
                <div class="modal-content">
                  <div class="select-goods">
                    <div class="title">商品列表</div>
                    <div class="tree-wrap">
                      <div class="tree">
                        <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="searchGroupChange" />
                        <a-tree
                          checkable
                          @expand="onExpand"
                          :expandedKeys="expandedKeys"
                          :autoExpandParent="autoExpandParent"
                          :treeData="treeData"
                          v-model="checkedKeys"
                          @select="treeSelect"
                          :selectedKeys="selectedKeys"
                        >
                          <template slot="title" slot-scope="{title}">
                            <span v-if="title.indexOf(searchValue) > -1">
                              {{title.substr(0, title.indexOf(searchValue))}}
                              <span style="color: #f50">{{searchValue}}</span>
                              {{title.substr(title.indexOf(searchValue) + searchValue.length)}}
                            </span>
                            <span v-else>{{title}}</span>
                          </template>
                        </a-tree>
                      </div>
                      <a-button type="primary" class="btn-add">添加</a-button>
                    </div>
                  </div>
                  <div class="goods-selected">
                    <div class="title">
                      <a-checkbox
                        :indeterminate="indeterminate"
                        @change="goodsSelectedOnCheckAllChange"
                        :checked="checkAll"
                      >
                        0件
                      </a-checkbox>
                      <div>指定商品</div>
                      <div class="btn-remove red-btn">移除</div>
                    </div>
                    <div class="goods-wrap">
                      <div class="goods-list">
                        <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="searchGoodsItemChange" />
                        <a-checkbox-group :options="plainOptions"  v-model="goodsItemsCheckedList" @change="checkGoodsItemsChange" style="width: 100%">
                          <!--<div class="goods-item-modal" v-for="item in goodsList" >
                            <a-checkbox :value="item.id" :style="goodsItemCheckBoxStyle" ></a-checkbox>
                            <img :src="item.imgUrl" alt="" class="goods-img">
                            <div class="goods-info">
                              <div class="goods-name">{{item.name}}</div>
                              <div class="goods-des">{{item.des}}</div>
                            </div>
                          </div>-->
                        </a-checkbox-group>
                      </div>
                      <a-button type="primary" class="btn-add">确认</a-button>
                    </div>
                  </div>
                </div>
              </a-modal>
            </div>
        </div>
    </div>
</template>

<script>
    import top1 from "@/components/top1";
    import CashBackController from "@/model-controllers/cashback-controller.js";

    /*树控件*/
    const x = 3;
    const y = 2;
    const z = 1;
    const treeData = [];
    const generateData = (_level, _preKey, _tns) => {
      const preKey = _preKey || '0'
      const tns = _tns || treeData

      const children = []
      for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`
        tns.push({ title: key, key, scopedSlots: { title: 'title' }})
        if (i < y) {
          children.push(key)
        }
      }
      if (_level < 0) {
        return tns
      }
      const level = _level - 1
      children.forEach((key, index) => {
        tns[index].children = []
        return generateData(level, key, tns[index].children)
      })
    }
    generateData(z);
    const dataList = []
    const generateList = (data) => {
      for (let i = 0; i < data.length; i++) {
        const node = data[i]
        const key = node.key
        dataList.push({ key, title: key })
        if (node.children) {
          generateList(node.children, node.key)
        }
      }
    }
    generateList(treeData)

    const getParentKey = (key, tree) => {
      let parentKey
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node.children) {
          if (node.children.some(item => item.key === key)) {
            parentKey = node.key
          } else if (getParentKey(key, node.children)) {
            parentKey = getParentKey(key, node.children)
          }
        }
      }
      return parentKey
    }
    /*
    * activity_name: "0"
amount_limit: 2
cashback_end: 0
cashback_fixed: 10
cashback_start: 0
cashback_type: "REGULAR"
create_time: "2018-11-23T11:25:12.000Z"
end_time: "2018-11-23T11:21:13.000Z"
id: 1
product_id_list: Array(0)
start_time: "2018-11-23T11:21:13.000Z"
state: "USING"
update_time: null
    * */
    /*表格*/
    const columns = [
        {
            title: '活动名称',
            dataIndex: 'activity_name',
            key: 'actName',
            align:"center",
            scopedSlots: {customRender: 'actName'}
        },
        {
            title: '有效期',
            dataIndex: 'validity',
            key: 'validity',
            align: 'center',
            scopedSlots: {customRender: 'validity'}
        },
        {
            title: '活动状态',
            dataIndex: 'state',
            key: 'state',
            align: 'center',
            scopedSlots:{customRender:'state'}
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            scopedSlots: {customRender: 'action'}
        },
    ];
    const data = [
        {
            key: 1,
            actName: '名称1',
            validity: '2018.1.30 - 2018.4.21',
            actStatus: '正在进行',
            status: 1,
        },
        {
            key: 2,
            actName: '名称2',
            validity: '2018.10.28 - 2018.12.28',
            actStatus: '已失效',
            status: 0,
        },
        {
            key: 3,
            actName: '名称3',
            validity: '2018.10.28 - 2018.12.28',
            actStatus: '已失效',
            status: 0,
        },
    ];

    const plainOptions=[
      '1',
      '2'
    ];
    const goodsList=[
      {
        id:1,
        name:'shangpin1',
        imgUrl:'/static/evaluate_pic@2x.png',
        des:'结实结实结实结实好用好用'
      },
      {
        id:2,
        name:'shangpin2',
        imgUrl:'/static/evaluate_pic@2x.png',
        des:'结实结实结实结实好用好用'
      },
    ];
    export default {
        data() {
            return {
              tabs: [
                  {
                      name: '全部',
                      active: true
                  },
                  {
                      name: '未开始',
                      active: false
                  },
                  {
                      name: '进行中',
                      active: false
                  },
                  {
                      name: '已结束',
                      active: false
                  },
              ],
              newRow: false,
              data,
              columns,
              tableLoad:true,
              /**初始化数据*/
              /*日期选择器设置*/
              startValue: null,
              endValue: null,
              endOpen: false,
              cashbackWayRadioInitValue:'RANDOM',
              goodsLimitRadioValue:2,
              goodsLimitIndex:2,
              addGoodsList:[
                {
                  id:1,
                  name:'shangpin1',
                  imgUrl:'/static/evaluate_pic@2x.png',
                  des:'结实结实结实结实好用好用'
                },
                {
                  id:2,
                  name:'shangpin2',
                  imgUrl:'/static/evaluate_pic@2x.png',
                  des:'结实结实结实结实好用好用'
                },
              ],
              addGoodsModalVisible:false,
              /*树控件*/
              expandedKeys: [],
              searchValue: '',
              autoExpandParent: true,
              checkedKeys:[],//默认选择项
              selectedKeys:[],//选择的项
              treeData,
              /*已选的指定商品列表*/
              checkAll:false,
              indeterminate: false,
              goodsItemsCheckedList:[],
              plainOptions,
              goodsList,
              /**表单样式*/
              labelCol: {
                xs: { span: 24 },
                sm: { span: 5},
              },
              wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18,offset:1 },
              },
              widthStyle:{width:'224px'},//时间选择器
              smallInputStyle:{width:'40px',margin:'0 5px'},//小输入框宽度
              smallSelectStyle:{minWidth:'40px',width:'auto',margin:'0 5px'},//小选择框宽度
              radioStyle: {
                display: 'block',
                minHeight: '30px',
                lineHeight: '30px',
                margin:'5px 0',
              },
              goodsLimitRadioStyle: {
                display: 'block',
                minHeight: '30px',
                lineHeight: '30px',
                margin:'5px 0'
              },
              goodsItemCheckBoxStyle:{
                position:'absolute',
                left:'12px',
                top:'50%',
                transform:'translateY(-50%)',
              },
              /**表单交互数据*/
              cashBackWay:'RANDOM'
            };
        },
        components: {
            top1: top1
        },
        computed: {},
        /*日期时间选择器事件*/
        watch: {
          startValue(val) {
            console.log('startValue', val)
          },
          endValue(val) {
            console.log('endValue', val)
          },
          checkedKeys(val) {
            console.log('onCheck', val)
          }
        },
        mounted(){
          let that = this;

          that.getAllDatas();
        },
        methods: {
          /** 查询所有  */
          getAllDatas(){
            let that = this;

            CashBackController.getAllCashBacks(function (dataList) {
              that.data=dataList;
              console.log(that.data);
            });
          },
          /**搜索**/
          onSearch(e) {
              console.log(e);
          },
          /**新建**/
          create() {
              this.newRow = !this.newRow;
          },
          /**点击标签**/
          clickTab(index) {
              let _this = this;
              _this.tabs.forEach(function (item) {
                  item.active = false;
              });
              _this.tabs[index].active = true;
          },
          /**取消新建*/
          editCancel() {
              this.newRow = false;
          },
          /**表单提交*/
          handleSubmit(e){
            let that = this;


            e.preventDefault();
            this.form.validateFields((err, values) => {
              if (!err) {
                console.log("Received values of form: ", values);
              }else{
                console.log("表单缺少必填项",values)
              }
            });
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
          cashbackWayRadioChange(e){
            let that = this;
            let radioVal = e.target.value;


            console.log(radioVal);
            that.cashBackWay=radioVal;
          },
          goodsLimitRadioChange(e){
            console.log(e)
          },
          addGoodsIncluded(){
            this.addGoodsModalVisible=true;
          },
          /**添加指定商品弹窗中的选择完成*/
          addGoodsOk(){
            this.addGoodsModalVisible = false;
          },
          /**树控件*/
          onExpand  (expandedKeys) {
            this.expandedKeys = expandedKeys
            this.autoExpandParent = false
          },
          searchGroupChange (e) {
            console.log('搜索分组')
            console.log(this.treeData)
            const value = e.target.value
            const expandedKeys = dataList.map((item) => {
              if (item.key.indexOf(value) > -1) {
                return getParentKey(item.key, treeData)
              }
              return null
            }).filter((item, i, self) => item && self.indexOf(item) === i)
            Object.assign(this, {
              expandedKeys,
              searchValue: value,
              autoExpandParent: true,
            })
          },
          onCheck (checkedKeys) {
            console.log('onCheck', checkedKeys)
            this.checkedKeys = checkedKeys
          },
          treeSelect(selectedKeys, info){
            console.log('onSelect', info)
            this.selectedKeys = selectedKeys
          },
          /**已选商品列表*/
          goodsSelectedOnCheckAllChange (e) {
            console.log(e);
            Object.assign(this, {
              goodsItemsCheckedList: e.target.checked ? plainOptions : [],
              indeterminate: false,
              checkAll: e.target.checked,
            })
            console.log(this.goodsItemsCheckedList)
          },
          searchGoodsItemChange (e) {
            console.log('搜索已添加商品')
            /*console.log(this.treeData)
            const value = e.target.value
            const expandedKeys = dataList.map((item) => {
              if (item.key.indexOf(value) > -1) {
                return getParentKey(item.key, treeData)
              }
              return null
            }).filter((item, i, self) => item && self.indexOf(item) === i)
            Object.assign(this, {
              expandedKeys,
              searchValue: value,
              autoExpandParent: true,
            })*/
          },
          checkGoodsItemsChange(checkedList){
            console.log('多选指定商品项');
            console.log(checkedList);
            this.indeterminate = !!checkedList.length && (checkedList.length < plainOptions.length)
            this.checkAll = checkedList.length === plainOptions.length
          },
        }
    }

</script>
<style scoped>
  .page-marketing {
      /* min-width: 1400px; */
      background-color: #f0f2f5;
      height: 100%;
  }

  .clearfix {
      overflow: auto;
  }

  div, ul, li {
      box-sizing: border-box;
  }

  .fl {
      float: left;
  }

  .fr {
      float: right;
  }

  .blue-btn {
    font-size: 14px;
    color: #1890ff;
  }
  .blue-btn:hover{
    cursor: pointer;
    color: #49baf5;
  }
  .del-btn {
    font-size: 14px;
    color: #f5222d;
    margin-left: 10px;
  }
  .del-btn:hover{
    cursor: pointer;
    color: #b3232e;
  }

  .red-btn {
      font-size: 14px;
      color: #f0606f;
  }

  .gray-btn {
      font-size: 14px;
      color: #acacac;
  }

  /*中间动态内容区域*/
  .center {
      box-sizing: border-box;
      border-radius: 2px;
      /*margin: 24px 24px 24px 280px;*/
      height: auto;
      background-color: #fff;
      /*不同页面的padding*/
      padding: 30px 0 0;
  }

  .head,
  .table-area {
      padding: 0 55px;
  }

  .center .head > .title {
      font-size: 24px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      padding: 12px;
  }

  .center .head > .options-bar {
      height: 48px;
      margin: 34px 0;
  }

  .list-status {
      height: 48px;
      float: left;
  }

  .status-item {
      float: left;
      padding: 0 36px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      position: relative;
  }

  .status-item:hover {
      cursor: pointer;
      color: #1890ff;
  }

  .status-item-on {
      color: #1890ff;
  }

  .status-item-on:after {
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

  .edit-area {
      width: 100%;
      position: relative;
  }

  .edit-area .footer {
      height: 80px;
      width: 100%;
      border-top: 1px solid #b7b7b7;
      position: absolute;
      bottom: 0;
      left: 0;
  }

  .edit-area .body {
      width: 100%;
      padding-bottom: 150px;
      padding-left: 66px;
  }

  .prev-box {
      height: 669px;
      width: 376px;
      box-shadow: 0 0.5px 0.5px 0.5px #b7b7b7;
      position: relative;
      display: inline-block;
      vertical-align: top;
    background-image: url("../../../static/payback.png");
    background-size: 100% 100%;
  }
  .prev-box .mask{
    box-sizing: content-box;
    position: absolute;
    width: 100%;
    height: 20px;
    /*top: 100px;*/
    border-top: 536px solid rgba(0,0,0,0.5);
    border-bottom: 113px solid rgba(0,0,0,0.5);
  }
  .input-box{
    display: inline-block;
    width: 560px;
    min-height: 450px;
    border-radius: 6px;
    border: 1px solid #b7b7b7;
    padding: 32px 0;
    margin-left: 32px;
  }
  .radio-row{
    display: inline-block;
    width: 100%;
  }
  .goodsAdded{
    width: 100%;
    padding: 5px 0 5px 24px;
  }
  .goods-item{
    height: 20px;
    width: 100%;
    margin:5px 0;
    line-height: 20px;
  }
  .goodsAdded .goods-name{
    float: left;
    font-size: 14px;
    margin-right: 20px;
  }
  .btn-delete{
    float: right;
    font-size: 12px;
    color: #f0606f;
  }
  .modal-content{
    width: 100%;
    height: 100%;
  }
  .select-goods{
    width: 230px;
    height: 100%;
    border-radius: 9px;
    border: 1px solid #cecece;
    display: inline-block;
  }
  .modal-content .title{
    height: 39px;
    width: 100%;
    border-bottom: 1px solid #cecece;
    position: relative;
    text-align: center;
    line-height: 39px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .tree{
    padding-top:5px;
    height: 510px;
    width: 100%;
    overflow-y: auto;
  }
  .btn-add{
    height: 50px;
    width: 100%;
    border-radius: 0 0 9px 9px ;
  }
  .goods-selected{
    width: 300px;
    height: 100%;
    border-radius: 9px;
    border: 1px solid #cecece;
    margin-left: 42px;
    display: inline-block;
  }
  .goods-wrap{
    width: 100%;
  }
  .goods-list{
    width: 100%;
    height: 510px;
    padding: 5px 0;
    overflow-y: auto;
  }
  .goods-item-modal{
    height: 100px;
    width: 100%;
    border-bottom: 1px solid #e9e9e9;
    position: relative;
  }
  .goods-selected .goods-img{
    width: 48px;
    height: 48px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    overflow: hidden;
    position: absolute;
    top: 24px;
    left: 45px;
  }
  .goods-selected .goods-info{
    width: 100%;
    height: 100%;
    padding:0 15px 0 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .modal-content .goods-name{
    /*height: 30px;
    line-height: 30px;*/
    margin-bottom: 4px;
    font-size: 14px;
    color: #000;
    font-weight: 500;
  }
  .goods-des{
    font-size: 14px;
    text-overflow:ellipsis;
    display:-webkit-box;
    word-break:break-all;
    overflow:hidden;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;
  }
</style>
