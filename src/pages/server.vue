<!--  -->
<template>
  <div class="server">
    <div class="center">
      <div class="server-item" v-for="(serverItem,index) in server" :class="index==1?'vip-item':''" :key="index">
        <div class="title">蔚云小程序<span>{{serverItem.title}}</span></div>
        <ol class="item-detail">
          <li v-for="item in serverItem.power" :key="item.index"> {{item}}</li>
          <!--<li>1、免费获得小程序功能</li>
          <li>2、基础运营功能</li>
          <li>3、部分模版</li>-->
        </ol>
        <div class="btn-buy">{{serverItem.price}}/年</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      server:[
        {
          title:'基础版',
          power:[
            '1、免费获得小程序功能',
            '2、基础运营功能',
            '3、部分模版'
          ],
          price:2500
        },
        {
          title:'豪华版',
          power:[
            '1、高级小程序功能',
            '2、全部高级运营功能',
            '3、全部高级模版'
          ],
          price:4400
        },
      ]
    };
  },

  components: {
  },

  computed: {},


  methods: {}
}

</script>
<style scoped>
  .server{
    height: 100%;
    min-width: 1380px;
    background-color: #F0F2F5;
    padding: 128px 132px 100px 371px;
  }
  .clearfix{
    overflow: auto;
  }
  div,ul,li{
    box-sizing: border-box;
  }
  .center{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .server-item{
    width:405px;
    height:605px;
    background-color: #D8D8D8;
    border:1px solid rgba(151,151,151,1);
    position: relative;
  }
  .vip-item{
    background-color: #B0B0B0;
  }
  .title{
    font-size:18px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(0,0,0,0.45);
    text-align: center;
    position: absolute;
    top: 61px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
  }
  .title span{
    font-size:34px;
    font-family:FZQKBYSJW--GB1-0;
    font-weight:normal;
    color:rgba(169,169,169,1);
    margin-left: 20px;
  }
  .item-detail{
    font-size:18px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(0,0,0,0.45);

    position: absolute;
    top: 173px;
    left: 104px;
    text-align: left;
  }
  .item-detail li{
    margin-bottom: 13px;
  }
  .btn-buy{
    width:172px;
    height:54px;
    background:rgba(247,187,20,1);
    border:1px solid rgba(151,151,151,1);
    text-align: center;
    line-height: 54px;
    font-size: 18px;

    position: absolute;
    bottom: 83px;
    left: 50%;
    transform: translateX(-86px);
  }
  .btn-buy:hover{
    cursor: pointer;
  }
  .vip-item .btn-buy{
    background-color: #E73C21;
  }
  .vip-item .title span{
    color: #D12A2A;
  }
</style>
