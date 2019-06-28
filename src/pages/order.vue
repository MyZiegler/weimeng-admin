<!--  -->
<template>
  <!-- <div>tab4</div> -->
  <div class="out">
    <top></top>
    <div
      class="main clearfix"
      style="margin:24px"
    >
      <div class="title clearfix">
        <div class="titlel fl">商品列表</div>
        <div class="titler fr">
          <input
            type="text"
            v-model="searchText"
            placeholder="请输入"
          >
          <div class="icon">
            <a-icon type="search" />
          </div>

        </div>
      </div>
      <div class="group1 clearfix">
        <div class="groupl fl">一级分组：</div>
        <div
          :class=" {'groupmshow':bool}"
          class="groupm fl"
        >
          <div
            class="fl groupitem"
            v-for="item in group1"
            :key="item.index"
          >{{item}}</div>
        </div>
        <div
          class="groupr fr"
          v-on:click="showorhide"
        >
          <div
            class="show"
            v-if="!bool"
          >展开
            <a-icon type="up" />
          </div>
          <div
            class="hide"
            v-else
          >收起
            <a-icon type="down" />
          </div>
        </div>
      </div>
      <div class="group2 clearfix">
        <div class="groupl fl">二级分组：</div>
        <div
          class="fl groupitem"
          v-for="item in group2"
          :key="item.index"
        >{{item}}</div>
        <div class="groupm fl"></div>
        <!-- <div class="groupr fr"></div> -->
      </div>
      <div class="elsec">
        <div class="elseText fl">其他选项：</div>
        <div class="price fl">价格：</div>
        <div class="fl">
          <a-select
            size="default"
            defaultValue="a1"
            style="width: 224px"
            @change="handleChange"
          >
            <a-select-option
              v-for="i in 25"
              :key="(i + 9).toString(36) + i"
            >
              {{(i + 9).toString(36) + i}}
            </a-select-option>
          </a-select>
        </div>
        <div class="sellnum fl"> 销量：</div>
        <a-select
          size="default"
          defaultValue="a1"
          style="width: 224px"
          @change="handleChange"
        >
          <a-select-option
            v-for="i in 25"
            :key="(i + 9).toString(36) + i"
          >
            {{(i + 9).toString(36) + i}}
          </a-select-option>
        </a-select>
        <div class="add fr">
          <router-link
            type="primary"
            to="addproduct"
          >
            添加商品
          </router-link>

        </div>
      </div>
      <div class="table fl">
        <a-list
          itemLayout="horizontal"
          :dataSource="productList"
          :pagination="pagination"
          :loading="bool"
        >
          <a-list-item
            slot="renderItem"
            slot-scope="item, index"
          >
            <a
              slot="actions"
              @click="edit(item)"
            >编辑</a>
            <a
              slot="actions"
              @click="showConfirm(item)"
            >
              删除
            </a>
            <a-list-item-meta :description="item.product_share_description">
              <a
                slot="title"
                href="javascript:;"
              >{{item.product_name}}</a>
              <a-avatar
                slot="avatar"
                :src="item.product_face"
              />
            </a-list-item-meta>
            <a-list-item-meta :description="item.create_time|dateformat('YYYY-MM-DD HH:mm')">
              <a slot="title">发布时间</a>
              <!-- <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> -->
            </a-list-item-meta>
          </a-list-item>
        </a-list>

      </div>
    </div>

  </div>
</template>

<script>
import top from "@/components/top";
import editor from "@/components/editor";
import ProductController from "@/model-controllers/product-controller";
import OrderController from "@/model-controllers/order-controller";

export default {
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      bool:false,
      fileList: [
        {
          uid: "-1",
          name: "xxx.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }
      ],
      productList: [],
      pagination: {
        // showSizeChanger: true,
        showQuickJumper: true,
        onChange: page => {
          console.log(page);
        },
        pageSize: 5
      },
      loading: false,
      visible: false,
      searchText: "",
      group1: [
        "全部",
        "食物",
        "日用",
        "百货",
        "类目一",
        "类目二",
        "类目三",
        "类目四",
        "类目五",
        "类目六",
        "类目七",
        "类目八",
        "类目九",
        "类目十",
        "类目十一"
      ],
      group2: ["清洁用品", "五金工具"],
      bool: false,
      fabu: "发布时间"
    };
  },
  mounted() {
   this.getAll()
    ProductController.getProductById(3, function(product) {});
  },
  components: {
    top: top,
    editor: editor
  },

  computed: {},

  methods: {
    showConfirm(item) {
      let that = this
      this.$confirm({
        title: "确认删除",
        content: "是否确认删除？",
        onOk() {
          console.log(item);
          ProductController.deleteProduct(item.product_id, function(data) {
            console.log(data);
            that.getAll()
          });
          
          return new Promise((resolve, reject) => {
            ProductController.getAllProducts(function(productList) {
            that.productList = productList;
            
          });
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          }).catch(() => console.log("Oops errors!"));
        },
        onCancel() {}
      });
    },
    getAll(){
       let that = this;
       that.bool=true
    ProductController.getAllProducts(function(productList) {
      that.bool=false
      that.productList = productList;
    });
    },

    deleteitem(item) {
      console.log(item);
    },
    edit(item) {
      this.$router.push({
        name: "addproduct",
        params: item
      });
    },
    showorhide: function() {
      this.bool = !this.bool;
    },
    handleChange(value) {
      console.log(`Selected: ${value}`);
    },
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      this.loading = true;
      setTimeout(() => {
        this.visible = false;
        this.loading = false;
      }, 3000);
    },
    handleCancel(e) {
      this.visible = false;
    },
    handlecancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    }
  }
};
</script>
<style scoped>
.clearfix {
  overflow: auto;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.icon {
  position: absolute;
  font-size: 14px;
  top: 10px;
  right: 45px;
  color: rgba(0, 0, 0, 0.25);
}
.out {
  background-color: #f0f2f5;
  height: 100%;
  /* min-width: 1200px; */
}
.main {
  /* margin: 24px; */
  height: auto;
  background-color: #fff;
  /* margin-left: 280px; */
  padding-left: 32px;
  /* min-width: 1200px; */
}
.title {
  /* margin-left: 32px; */
  padding-top: 24px;
  margin-bottom: 42px;
  /* border: 1px solid transparent; */
}
.titlel {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
}
.titler {
  position: relative;
}
.titler input {
  outline: none;
  width: 260px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  margin-right: 32px;
  padding-left: 12px;
  /* position: relative; */
}
::-webkit-input-placeholder {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.25);
  line-height: 22px;
} /* 使用webkit内核的浏览器 */
:-moz-placeholder {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.25);
  line-height: 22px;
} /* Firefox版本4-18 */
::-moz-placeholder {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.25);
  line-height: 22px;
} /* Firefox版本19+ */
:-ms-input-placeholder {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.25);
  line-height: 22px;
}
.group1 {
  line-height: 40px;
}
.group2 {
  border-bottom: 1px solid #e9e9e9;
}
.groupm {
  width: 80%;
  overflow: hidden;
  height: 40px;
}
.groupmshow {
  height: auto;
}
.groupm .groupitem:first-child {
  margin-left: 0;
}
.groupr {
  margin-right: 46px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(24, 144, 255, 1);
  /* line-height: 22px; */
}
.groupitem {
  margin-right: 40px;
}
.elsec {
  margin-top: 15px;
}
.elseText,
.price,
.sellnum {
  margin-top: 5px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 22px;
}
.price {
  margin-left: 24px;
}
.sellnum {
  margin-left: 48px;
}
.add {
  margin-right: 54px;
}
.table {
  width: 100%;
  margin-top: 40px;
  padding-right: 32px;
  margin-bottom: 43px;
}
.name {
  margin-left: 330px;
}
.nameinput input {
  width: 468px;
  /* height:32px; */
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
.nameti {
  margin-top: 12px;
  /* margin-left: 24px; */
}
.nameimg {
  margin-left: 24px;
}
.nameinput {
  margin-top: 12px;
}
</style>
