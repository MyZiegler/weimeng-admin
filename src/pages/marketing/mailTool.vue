<!-- -->
<template>
    <div class="page-marketing">
        <top1></top1>
        <div class="center clearfix">
            <div class="head">
                <div class="title">包邮工具</div>
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
                    <a-button type="primary" v-if="!newRow" @click="create" style="margin-top: 8px;float:right;">新建包邮
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
                <a-table :dataSource="data" :columns="columns" :loading="isTableLoad">
                  <span slot="actName" slot-scope="actName">
                    <span style="color: #1890FF;">{{actName}}</span>
                  </span>
                  <span slot="validity" slot-scope="i,item">
                    <div>{{item.start_time | dateformat('YYYY-MM-DD HH:mm:ss')}}-</div>
                    <div>{{item.end_time | dateformat('YYYY-MM-DD HH:mm:ss')}}</div>
                  </span>
                  <span slot="state" slot-scope="state">
                    <span v-if="state==='USING'">正在进行</span>
                    <span v-else-if="state==='INVALID'">已失效</span>
                  </span>
                  <span slot="action" slot-scope="i,item">
                    <span v-if="item.state=='USING'">
                      <span class="blue-btn" @click="editMailTool(item.id)">编辑</span>
                      <span class="blue-btn" @click="invalidateActivity(item.id)">使失效</span>
                    </span>
                    <span v-else>
                      <span class="gray-btn">已失效</span>
                    </span>
                    <span class="del-btn" @click="delActivity(item.id)">删除</span>
                  </span>
                </a-table>
            </div>
            <div class="edit-area" v-else>
              <a-form :autoFormCreate="(form)=>{this.form = form}"
                      @submit="handleSubmit"
              >
                <div class="body">
                    <div class="prev-box">

                    </div>
                    <div class="input-box">

                        <a-form-item
                          :labelCol="labelCol"
                          :wrapperCol="wrapperCol"
                          label='工具名称'
                          required
                          fieldDecoratorId="activity_name"
                          :fieldDecoratorOptions="{
                            rules: [{ required: true, message: '请输入包邮工具名称' }],
                            initialValue:nameInputValue
                          }"

                        >
                          <a-input style="width: 248px;"  />
                        </a-form-item>

                        <a-form-item
                          :labelCol="labelCol"
                          :wrapperCol="wrapperCol"
                          label='生效时间'
                          required
                          fieldDecoratorId="effective_time"
                          :fieldDecoratorOptions="{
                            initialValue:'PERIOD'
                          }"
                        >
                          <a-radio-group
                            @change="effectiveTimeRadioChange"
                          >
                            <a-radio
                              :style="{display:'block',height:'75px'}"
                              value="PERIOD"
                            >
                              <a-date-picker
                                :disabledDate="disabledStartDate"
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                v-model="startValue"
                                placeholder="开始时间"
                                @openChange="handleStartOpenChange"
                                :style="datePickerStyle"
                                :disabled="timePickerDisable"
                              />
                              <a-date-picker
                                :disabledDate="disabledEndDate"
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder="结束时间"
                                v-model="endValue"
                                :open="endOpen"
                                @openChange="handleEndOpenChange"
                                style="width: 224px;display: block;margin:10px 0 0 24px;"
                                :disabled="timePickerDisable"
                              />
                            </a-radio>
                            <a-radio :style="radioStyle" value="ALWAYS">长期有效</a-radio>
                          </a-radio-group>

                        </a-form-item>

                        <a-form-item
                          :labelCol="labelCol"
                          :wrapperCol="wrapperCol"
                          label='配送方式'
                          required
                          fieldDecoratorId="delivery_method"
                          :fieldDecoratorOptions="{
                            initialValue:'DELIVERY'
                          }"
                        >
                          <a-select :style="smallSelectStyle" @change="deliverWaySelectChange">
                            <a-select-option value="DELIVERY">快递</a-select-option>
                            <a-select-option value="PICKUP">自提</a-select-option>
                          </a-select>
                        </a-form-item>

                        <div class="rule-item-wrap" v-if="showMailRule">
                          <div class="rule-item" v-for="(item,index) in ruleItemNum" :key="index">
                            <a-form-item
                              :labelCol="labelCol"
                              :wrapperCol="wrapperCol"
                              label='包邮区域'
                              required
                            >
                              <span class="blue-btn">编辑包邮区域</span>
                              <div>dongbei</div>
                            </a-form-item>
                            <a-form-item
                              :labelCol="labelCol"
                              :wrapperCol="wrapperCol"
                              label='包邮规则'
                              required
                              :fieldDecoratorId="mail_rule[0]"
                              :fieldDecoratorOptions="{
                                rules: [{ required: true, message: '请输入规则' }]
                              }"
                            >
                              满
                              <a-input :style="smallInputStyle"  />
                              <a-select defaultValue="yuan" :style="smallSelectStyle" @change="mailRuleSelectChange">
                                <a-select-option value="yuan">元</a-select-option>
                                <a-select-option value="jian">件</a-select-option>
                              </a-select>
                              免运费
                            </a-form-item>
                            <span v-if="index>0" class="del-btn" @click="delRuleItem(index)">删除</span>
                          </div>
                        </div>

                        <a-form-item
                          :wrapperCol="{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 24, },
                          }"
                          required
                          v-if="showMailRule"
                        >
                          <a-button type="dashed" icon="plus" block @click="addRuleItem">新增规则</a-button>
                        </a-form-item>

                        <a-form-item
                          label="商品限制"
                          :labelCol="labelCol"
                          :wrapperCol="wrapperCol"
                          required
                          fieldDecoratorId="product_limit"
                          :fieldDecoratorOptions="{
                            initialValue:goodsLimitRadioValue
                          }"
                        >
                          <a-radio-group @change="goodsLimitRadioChange">

                            <a-radio :style="goodsLimitRadioStyle" value="SELECTED">
                              <span class="radio-row">
                                <span style="font-size:14px;">指定商品可用</span><span style="float: right;font-size: 12px;color: #1890ff;">添加商品</span>
                              </span>
                              <div class="goodsAdded" v-if="goodsLimitRadioValue=='SELECTED'">
                                <div class="goods-item" v-for="(item,i) in addGoodsList" :key="item.id">
                                  <div class="goods-name">{{item.name}}</div>
                                  <div class="del-btn" @click="delGoodsItem(i)">删除</div>
                                </div>
                              </div>
                            </a-radio>

                            <a-radio :style="goodsLimitRadioStyle" value="EXCEPT">
                              <span class="radio-row">
                                <span style="font-size:14px;">指定商品不可用</span><span style="float: right;font-size: 12px;color: #1890ff;">添加商品</span>
                              </span>
                              <div class="goodsAdded" v-if="goodsLimitRadioValue=='EXCEPT'">
                                <div class="goods-item" v-for="(item,i) in addGoodsList" :key="item.id">
                                  <div class="goods-name">{{item.name}}</div>
                                  <div class="del-btn" @click="delGoodsItem(i)">删除</div>
                                </div>
                              </div>
                            </a-radio>

                            <a-radio :style="goodsLimitRadioStyle" value="ALL">全部商品</a-radio>

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
            </div>
        </div>
    </div>
</template>

<script>
    import top1 from "@/components/top1";
    import MailController from "@/model-controllers/mail-controller";
    import MailAndProductController from "@/model-controllers/mail-and-product-controller";
    import MailRuleController from "@/model-controllers/mail-rule-controller";
    import ProductController from "@/model-controllers/product-controller";
    import moment from 'moment';

    const columns = [
        {
            title: '规则名称',
            dataIndex: 'activity_name',
            key: 'actName',
            scopedSlots: {customRender: 'actName'},
            align: 'center'
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
            scopedSlots: {customRender: 'state'},

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
        /*{
            key: 1,
            actName: '包邮套餐1',
            validity: '2018.1.30 - 2018.4.21',
            actStatus: '正在进行',
            status: 1,
        },
        {
            key: 2,
            actName: '包邮套餐2',
            validity: '2018.10.28 - 2018.12.28',
            actStatus: '已失效',
            status: 0,
        },
        {
          activity_name: "江浙沪包邮"
          create_time: "2018-11-27T10:38:17.000Z"
          end_time: "2018-11-27T07:48:04.000Z"
          id: 1
          product_id_list: (2) [1, 2]
          rule_id_list: [1]
          start_time: "2018-11-26T07:48:04.000Z"
          state: "USING"
          update_time: null
        },*/
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
              labelCol: {
                xs: { span: 24 },
                sm: { span: 5 },
              },
              wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18,offset:1 },
              },
              startValue: null,
              endValue: null,
              endOpen: false,
              datePickerStyle:{width:'224px'},
              smallInputStyle:{width:'40px',margin:'0 5px'},//小输入框宽度
              smallSelectStyle:{minWidth:'80px',width:'auto',margin:'0 5px'},//小选择框宽度
              radioStyle: {
                display: 'block',
                height: '30px',
                lineHeight: '30px',
                margin:'5px 0',
              },
              goodsLimitRadioStyle: {
                display: 'block',
                minHeight: '30px',
                lineHeight: '30px',
                margin:'5px 0'
              },
              /**初始值*/
              timePickerDisable:false,
              isTableLoad:false,//表格加载状态
              ruleItemNum:1,
              effectiveTimeRadioValue:'PERIOD',
              goodsLimitValue:2,
              goodsLimitIndex:2,
              ruleItems:[
                '',
              ],

              mailRuleIdList:[],//保存到该条规则的包邮规则id数组
              mailRuleList:[],
              addGoodsList:[],
              addGoodsIdList:[],

              nameInputValue:'',
              editRowId:null,
              editRow:false,
              showMailRule:true,

              goodsLimitRadioValue:'SELECTED',
            };
        },

        components: {
            top1: top1,
        },

        computed: {},
      /*日期时间选择器事件*/
        watch: {
          startValue(val) {
            console.log('startValue', val)
          },
          endValue(val) {
            console.log('endValue', val)
          }
        },
        methods: {
          /**搜索**/
          onSearch(e) {
              console.log(e);
          },
          /**新建**/
          create() {
            let that = this;

              that.newRow = true;
              that.nameInputValue = '';
              that.startValue = null;
              that.endValue = null;
              that.goodsLimitRadioValue = 'SELECTED';
              that.addGoodsList = [];
              that.mailRuleList=[];
          },
          /**编辑一条数据*/
          editMailTool(mailId){
            let that = this;

            that.newRow=true;
            that.editRow=true;
            that.editId=mailId;

            MailController.getMailById(mailId,(res)=>{
              console.log('获取一条包邮工具信息',res);
              var mailRuleList = [];
              var goodsList = [];
              var ruleIdList = res.rule_id_list;
              var goodsIdList = res.product_id_list;

              that.nameInputValue=res.activity_name;
              that.startValue=moment(res.start_time,'HH:mm:ss');
              that.endValue=moment(res.end_time,'HH:mm:ss');
              that.goodsLimitRadioValue=res.product_limit;
              that.addGoodsIdList=JSON.stringify(res.product_id_list);
              that.mailRuleIdList=JSON.stringify(res.rule_id_list);

              if(res.delivery_method=='DELIVERY'){
                for(var i in ruleIdList)
                MailRuleController.getMailRuleById(ruleIdList[i],(res)=>{
                  mailRuleList.push(res);
                })
                that.mailRuleList=mailRuleList;
                console.log('包邮规则',mailRuleList)
              }
              if(res.product_limit !='ALL'){
                for(var i in goodsIdList){
                  ProductController.getProductById(goodsIdList[i],(res)=>{
                    goodsList.push(res);
                  })
                }
                that.addGoodsList=goodsList;
                console.log('指定商品',goodsList)
              }
            })
          },
          /**使失效*/
          invalidateActivity(id){
            let that = this;

            var data = {
              "state": "INVALID"
            };
            that.$confirm({
              title: '提示',
              content: '确认将这条活动更改为失效状态吗?',
              okText: '确认',
              cancelText: '取消',
              onOk() {
                console.log('INVALID OK');
                MailController.editMail(id,data,(data)=>{
                  console.log(data);
                  that.getMailList();
                });
              },
              onCancel() {
                console.log('INVALID Cancel');
              },
              class: 'changeState-modal',
            });
          },
          /**删除一条数据*/
          delActivity(id){
            let that = this;

            that.$confirm({
              title: '提示',
              content: '确认将这条包邮工具删除吗?',
              okText: '确认',
              cancelText: '取消',
              onOk() {
                console.log('del OK');
                MailController.deleteMail(id,(res)=>{
                  console.log('del a record',res);
                  that.getMailList();
                })
              },
              onCancel() {
                console.log('USING Cancel');
              },
              class: 'changeState-modal',
            });


          },
          /**点击标签**/
          clickTab(index) {
              let _this = this;
              _this.tabs.forEach(function (item) {
                  item.active = false;
              })
              _this.tabs[index].active = true;
          },
          /**取消新建*/
          editCancel() {
            let that = this;

            that.newRow = false;
            that.editId=null;
            that.editRow=false;
            that.form.resetFields();

            console.log('取消编辑')
          },
          /**表单提交*/
          handleSubmit(e){
            let that = this;
            e.preventDefault();

            if(!that.editRow){//不是编辑数据而是创建新数据
              this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                  var postData=values;
                  console.log("Received values of form: ", values);
                  if(values.effective_time==='PERIOD'){
                    postData.start_time=that.startValue._d;
                    postData.end_time=that.endValue._d;
                  }
                  if(values.product_limit==='ALL'){
                    let arr = that.getAllProductIdList();
                    postData.product_id_list=JSON.stringify(arr);
                  }
                  console.log('保存的信息',postData);
                  /*MailController.addMail(postData,(res)=>{
                    that.newRow=false;
                    that.editRow=false;
                    that.getMailList();
                    console.log('新增数据成功',res)
                  })*/
                }else{
                  console.log("表单缺少必填项",values)
                }
              });
            }else{//编辑一条数据
              that.form.validateFieldsAndScroll((err,values)=>{
                if (!err) {
                  console.log("Received values of form: ", values);
                }else{
                  console.log("表单缺少必填项",values)
                }
              })
            }

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
            console.log(open);
            this.effectiveTimeRadioValue='0';
            if (!open) {
              this.endOpen = true;
            }
          },
          handleEndOpenChange (open) {
            this.endOpen = open;
          },
          deliverWaySelectChange(e){
            let that = this;
            console.log(e)
            if(e==='PICKUP'){
              that.showMailRule=false;
            }else{
              that.showMailRule=true;
            }
          },
          effectiveTimeRadioChange(e){
            let that = this;

            var val = e.target.value;

            console.log('生效时间',val)
            if(val=='ALWAYS'){
              that.timePickerDisable=true;
            }else{
              that.timePickerDisable=false;
            }
          },
          mailRuleSelectChange(e){

          },
          goodsLimitRadioChange(e){
            let that = this;

            console.log(that.getAllProductIdList());

            console.log('goodsLimitIndex change',e.target.value);
            this.goodsLimitRadioValue=e.target.value;
          },
          /**删除已添加的商品*/
          delGoodsItem(i){
            console.log('del index:'+i)
          },
          addRuleItem(){
            this.ruleItemNum+=1;
            this.ruleItems.push('');
          },
          delRuleItem(index){
            this.ruleItemNum-=1;
            this.ruleItems.splice(index-1,1);
          },
          /*获取所有商品的id数组*/
          getAllProductIdList(){
            var allProductIdList=[];
            ProductController.getAllProducts((data)=>{
              console.log(data);
              for(var i in data){
                allProductIdList.push(data[i].product_id);
              }
            })
            return allProductIdList;
          },
          /**包邮工具*/
          getMailList(){
            let that = this;

            that.isTableLoad=true;
            MailController.getAllMails((data)=>{
              that.isTableLoad=false;
              console.log('获取所有包邮规则',data);
              that.data=data.reverse();
            })
          },
          /**包邮规则的方法*/
          addMailRule(postData){
            let that = this;

            MailRuleController.addMailRule(postData,(res)=>{
              console.log('添加一条包邮规则',res)
            })
          },
          editMailRule(mailRuleId,postData){
            let that = this;

            MailRuleController.editMailRule(mailRuleId,postData,(res)=>{
              console.log('修改一条包邮规则',res);
            })
          },
          deleteMailRule(mailRuleId){
            let that = this;

            MailRuleController.deleteMailRule(mailRuleId,(res)=>{
              console.log('修改一条包邮规则',res);
            })
          },
          /**指定的商品方法*/
          addMailAndProduct(postData){
            let that = this;

            MailRuleController.addMailAndProduct(postData,(res)=>{
              console.log('当前包邮工具指定一件商品',res)
            })
          },
          deleteMailAndProduct(ruleAndProductId){
            let that = this;

            MailRuleController.deleteMailAndProduct(ruleAndProductId,(res)=>{
              console.log('修改一条包邮规则',res);
            })
          },



        },
      mounted() {
          let that = this;

          that.getMailList();

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
  .blue-btn:hover,
  .red-btn:hover,
  .gray-btn:hover{
    cursor: pointer;
  }

  /*中间动态内容区域*/
  .center {
      box-sizing: border-box;
      border-radius: 2px;
      /* margin: 24px 24px 24px 280px; */
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
  }
  .input-box{
    width: 560px;
    /*min-height: 600px;*/
    border: 1px solid #b7b7b7;
    border-radius: 6px;
    padding-top: 32px;
    display: inline-block;
  }
  .rule-item-wrap{
    max-height: 500px;
    overflow-y: auto;
  }
  .rule-item{
    background-color: #f0f0f0;
    min-height: 160px;
    padding: 32px 0;
    margin-bottom: 10px;
    position: relative;
  }
  .rule-item .red-btn{
    position: absolute;
    right: 50px;
    top: 50%;
    transform: translateY(-50%);
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
  .goods-name{
    float: left;
    font-size: 14px;
    margin-right: 20px;
  }
  .btn-delete{
    float: right;
    font-size: 12px;
    color: #f0606f;
  }
</style>
