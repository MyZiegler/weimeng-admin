<!-- -->
<template>
    <div class="page-marketing">
        <top1></top1>
        <div class="center clearfix">
            <div class="head">
                <div class="title">

                    找人代付

                </div>
                <div class="options-bar">
                    <!--<div class="list-status">
                        <div class="status-item"
                             v-for="(tab,index) in tabs"
                             :key="index"
                             :class="{'status-item-on':tab.active}"
                             @click="clickTab(index)"
                        >
                            {{tab.name}}
                        </div>
                    </div>-->
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
                <a-table :dataSource="data" :columns="columns" :loading="tableLoad">
                  <span slot="state" slot-scope="state">
                    <span v-if="state==='USING'">正在进行</span>
                    <span v-else-if="state==='INVALID'">已失效</span>
                  </span>
                  <span slot="action" slot-scope="i,item">
                    <span v-if="item.state==='USING'">
                      <span @click="editActivity(item.id)" class="blue-btn">编辑</span>
                      <span @click="invalidateActivity(item.id)" class="blue-btn">使失效</span>
                    </span>
                    <span v-else>
                      <span @click="validateActivity(item.id)" class="blue-btn">使生效</span>
                    </span>
                    <span @click="delActivity(item.id)" class="del-btn">删除</span>
                  </span>
                  <span slot="colorStyle" slot-scope="colorStyle">
                    <div class="color-cell" :style="{backgroundColor:colorStyle}"></div>
                  </span>
                </a-table>
            </div>
            <div class="edit-area" v-else>
              <a-form :autoFormCreate="(form)=>{this.form = form}"
                      @submit="handleSubmit"
              >
                <div class="body">
                    <div class="prev-box" :style="{backgroundImage:'url('+ backgroundUrl +')'}">
                      <div class="msg-box">{{msgContent}}</div>
                    </div>
                    <div class="input-box">
                        <a-form-item
                                :labelCol="labelCol"
                                :wrapperCol="wrapperCol"
                                label='选择颜色'
                                required
                                fieldDecoratorId="template_color"
                        >
                          <a-radio-group :defaultValue='0'  @change="colorRadioChange" >
                            <a-radio-button :style="colorCellStyle" :value="index" v-for="(item,index) in colorCell" :key="index">
                              <div class="color-cell" :style="{backgroundColor:item.color}"></div>
                            </a-radio-button>
                          </a-radio-group>

                        </a-form-item>

                        <a-form-item
                                :labelCol="labelCol"
                                :wrapperCol="wrapperCol"
                                label='编辑留言内容'
                                required
                                fieldDecoratorId="message_content"
                                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入留言内容' }]}"
                        >
                          <a-input :style="widthStyle" placeholder="请输入留言内容" v-model="msgContent" ref="input" @keyup.enter="msgContentChange(msgContent,$event)" />
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
    import ToGetPaidController from "@/model-controllers/toGetPaid-controller.js"

    const columns = [
        {
            title: '留言内容',
            dataIndex: 'message_content',
            key: 'message_content',
            align: 'center'
        },
        {
            title: '配色风格',
            dataIndex: 'template_color',
            key: 'template_color',
            align: 'center',
            scopedSlots: {customRender: 'colorStyle'}
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            align: 'center',
            scopedSlots: {customRender: 'state'}
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            scopedSlots: {customRender: 'action'}
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
              colorCell:[
                {
                  color:'#EE3E3E',
                  imgUrl:'../../static/payhelp_red.png'
                },
                {
                  color:'#EEA03E',
                  imgUrl:'../../static/payhelp_yellow.png'
                },
                {
                  color:'#4EB024',
                  imgUrl:'../../static/payhelp_green.png'
                },
                {
                  color:'#5357C2',
                  imgUrl:'../../static/payhelp_blue.png'
                },
                {
                  color:'#B02482',
                  imgUrl:'../../static/payhelp_purple.png'
                }

              ],

              newRow: false,
              data:[],
              columns,
              isCreateNewData:false,//是否创建新数据
              tableLoad:false,//表格是否加载状态
              /**初始化数据*/
              /*日期选择器设置*/
              startValue: null,
              endValue: null,
              endOpen: false,
              /*颜色*/
              colorRadioValue:'#ee3e3e',
              /*留言*/
              msgContent:'',
              /**样式*/
              /*表单样式*/
              labelCol: {
                  xs: {span: 24},
                  sm: {span: 5},
              },
              wrapperCol: {
                  xs: {span: 24},
                  sm: {span: 18, offset: 1},
              },
              widthStyle: {width: '224px'},//时间选择器
              smallInputStyle: {width: '40px', margin: '0 5px'},//小输入框宽度
              smallSelectStyle: {minWidth: '40px', width: 'auto', margin: '0 5px'},//小选择框宽度
              radioStyle: {
                  display: 'block',
                  height: '30px',
                  lineHeight: '30px',
                  margin: '5px 0',
              },
              goodsLimitRadioStyle: {
                  display: 'block',
                  minHeight: '30px',
                  lineHeight: '30px',
                  margin: '5px 0'
              },
              backgroundUrl: "../../static/payhelp_red.png",
              colorCellStyle:{
                width:'22px',
                height:'22px',
                marginRight:'20px',
                padding:'0',
                marginTop:'10.5px',
              },
              /**页面交互数据*/
              editRowId:null
            };
        },

        components: {
            top1: top1
        },

        computed: {},

        watch: {
          /*日期时间选择器事件*/
          startValue(val) {
              console.log('startValue', val)
          },
          endValue(val) {
              console.log('endValue', val)
          },
          msgContent(){
            let that = this;
            if (that.msgContent.length > 40) {
              that.$message.warning('最多显示40字');
              that.msgContent = String(that.msgContent).slice(0, 40);
            }
          }
        },
        mounted(){
          let that =this;

          that.getAll();

        },
        methods: {
          getAll(){
            let that = this;

            that.tableLoad=true;
            ToGetPaidController.getAllToGetPaids((actList)=>{
              that.tableLoad=false;
              that.data=actList;
              console.log(that.data);
            })
          },
          /**编辑一条数据*/
          editActivity(id){
            let that = this;

            that.newRow=true;
            that.editRowId=id;
            that.isCreateNewData=true;

            ToGetPaidController.getToGetPaidById(id,(toGetPaidData)=>{
              console.log(toGetPaidData);
              // that.$refs.input.value=toGetPaidData.message_content;
              // that.msgContent=toGetPaidData.message_content;
              // that.form.setFieldsInitialValue(message_content,toGetPaidData.message_content);
              that.form.setFieldsValue({
                message_content: toGetPaidData.message_content
              })
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
                ToGetPaidController.editToGetPaid(id,data,(data)=>{
                  console.log(data);
                  that.getAll();
                });
              },
              onCancel() {
                console.log('INVALID Cancel');
              },
              class: 'changeState-modal',
            });
          },
          /**使生效*/
          validateActivity(id){
            let that = this;

            var data = {
              "state": "USING"
            };
            that.$confirm({
              title: '提示',
              content: '确认将这条活动更改为使用状态吗?',
              okText: '确认',
              cancelText: '取消',
              onOk() {
                console.log('USING OK');
                ToGetPaidController.editToGetPaid(id,data,(data)=>{
                  console.log(data);
                  that.getAll();
                });
              },
              onCancel() {
                console.log('USING Cancel');
              },
              class: 'changeState-modal',
            });


          },
          /**删除一条数据*/
          delActivity(id){
            let that = this;

            that.$confirm({
              title: '提示',
              content: '确认将这条活动删除吗?',
              okText: '确认',
              cancelText: '取消',
              onOk() {
                console.log('del OK');
                ToGetPaidController.deleteToGetPaid(id,(res)=>{
                  console.log('del a record');
                  console.log(res);
                  that.getAll();
                })
              },
              onCancel() {
                console.log('USING Cancel');
              },
              class: 'changeState-modal',
            });


          },
          /**搜索**/
          onSearch(e) {
              console.log(e);
          },
          /**新建**/
          create() {
            let that = this;

            this.newRow = !this.newRow;
            that.isCreateNewData=true;

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
            let that = this;

            that.backgroundUrl='../../static/payhelp_red.png';
            that.newRow = false;
            that.isCreateNewData=false;
            that.msgContent='';

          },
          /**表单提交*/
          handleSubmit(e) {
            let that = this;

            e.preventDefault();
            this.form.validateFieldsAndScroll((err, values) => {
              if (!err) {
                var data={
                  message_content:values.message_content,
                  template_color:that.colorRadioValue
                };
                if(!that.isCreateNewData){//新建数据
                  console.log("Received values of form: ", data);
                  ToGetPaidController.addToGetPaid(data,(newRow)=>{
                    console.log('新建数据 '+newRow);
                    that.$message.info('新建成功');
                    that.newRow=false;
                    // that.data.push(newRow);
                    that.getAll();
                    /*重置页面数据*/
                    that.isCreateNewData=false;
                    that.backgroundUrl='../../static/payhelp_red.png';
                  })
                }else{//编辑某一条数据
                  console.log('编辑一条信息');
                  ToGetPaidController.editToGetPaid(that.editRowId,data,(res)=>{
                    console.log('编辑成功'+res);
                    that.$message.info('修改成功');
                    that.newRow=false;
                    that.getAll();//刷新表格数据

                    that.editRowId=null;
                    that.isCreateNewData=false;
                  })
                }
              }else{
                that.$message.warning('请填写完整的信息');
              }
            });
          },
          /**日期时间选择器*/
          disabledStartDate(startValue) {
              const endValue = this.endValue;
              if (!startValue || !endValue) {
                  return false;
              }
              return startValue.valueOf() > endValue.valueOf();
          },
          disabledEndDate(endValue) {
              const startValue = this.startValue;
              if (!endValue || !startValue) {
                  return false;
              }
              return startValue.valueOf() >= endValue.valueOf();
          },
          handleStartOpenChange(open) {
              if (!open) {
                  this.endOpen = true;
              }
          },
          handleEndOpenChange(open) {
              this.endOpen = open;
          },
          colorRadioChange(e) {
            let that = this;
            console.log(e.target.value);
            var imgIndex = e.target.value;
            var arr = that.colorCell;
            that.backgroundUrl=arr[imgIndex].imgUrl;
            that.colorRadioValue=arr[imgIndex].color;
          },
          msgContentChange(val,e){
            console.log(e);
            console.log(val.length);

          }
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

  .gray-btn {
      font-size: 14px;
      color: #acacac;
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
      margin: 12px 0;
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
    background-size: 100% 100%;
    position: relative;
  }

  .input-box {
      display: inline-block;
      width: 560px;
      border-radius: 6px;
      border: 1px solid #b7b7b7;
      padding: 32px 0;
    margin-left: 32px;
  }
  .color-cell{
    height: 18px;
    width: 18px;
    margin: 0 auto;
  }
  .msg-box{
    width: 100%;
    min-height: 30px;
    background-color: #fff;
    position: absolute;
    font-size: 14px;
    padding: 10px 23px;
    top: 405px;
  }
</style>
