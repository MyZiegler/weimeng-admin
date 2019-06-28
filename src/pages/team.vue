<!--  -->
<template>
  <div class="out">
    <top></top>
    <div class="main clearfix">
      <div class="title">商品列表</div>
      <div class="trees fl">
        <a-input-search
          style="margin-bottom: 8px"
          placeholder="Search"
          @change="onChange"
        />
        <a-tree
          @expand="onExpand"
          :expandedKeys="expandedKeys"
          :autoExpandParent="autoExpandParent"
          :treeData="gData"
        >
          <template
            slot="title"
            slot-scope="{title}"
          >
            <span v-if="title.indexOf(searchValue) > -1">
              {{title.substr(0, title.indexOf(searchValue))}}
              <span style="color: #f50">{{searchValue}}</span>
              {{title.substr(title.indexOf(searchValue) + searchValue.length)}}
            </span>
            <span v-else>{{title}}</span>
          </template>
        </a-tree>
      </div>
      <div class="trans fl">
        <a-transfer
    :dataSource="mockData"
    :listStyle="{
      width: '300px',
      height: '300px',
    }"
    :targetKeys="targetKeys"
    @change="handleChange"
    :render="renderItem"
  >

  </a-transfer>
      </div>
    </div>
  </div>

</template>

<script>
import top from "@/components/top";

const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || "0";
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key, scopedSlots: { title: "title" } });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const dataList = [];
const generateList = data => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
};
generateList(gData);

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
export default {
  data() {
    return {
       mockData: [],
      targetKeys: [],
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      gData,
      // treeData,
      searchText: "",
      bool: true,
      current: 1,
      boolcheck: false,
      orderlist: [
        {
          imgsrc: "",
          title: "锤子",
          des: "结实结实结实结实好用好用"
        }
      ],
      mockData: [],
      targetKeys: []
    };
  },
  mounted() {
    this.getMock();
  },
  watch: {
    checkedKeys(val) {
      console.log("onCheck", val);
    }
  },
  components: {
    top: top
  },

  computed: {},

  methods: {
     getMock() {
      const targetKeys = [];
      const mockData = [];
      for (let i = 0; i < 20; i++) {
        const data = {
          key: i.toString(),
          title: `content${i + 1}`,
          description: `description of content${i + 1}`,
          chosen: Math.random() * 2 > 1,
        };
        if (data.chosen) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      }
      this.mockData = mockData
      this.targetKeys = targetKeys
    },
    renderItem(item) {
      const customLabel = (
        <span class="custom-item">
          <img src="../../static/evaluate_pic@2x.png" style="height:22px"/>

          {item.title} - {item.description}
        </span>
      );

      return {
        label: customLabel, // for displayed item
        value: item.title, // for title and filter matching
      };
    },
    handleChange(targetKeys, direction, moveKeys) {
      console.log(targetKeys, direction, moveKeys);
      this.targetKeys = targetKeys
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onChange(e) {
      const value = e.target.value;
      const expandedKeys = dataList
        .map(item => {
          if (item.key.indexOf(value) > -1) {
            return getParentKey(item.key, gData);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      });
    },
    getMock() {
      const targetKeys = [];
      const mockData = [];
      for (let i = 0; i < 20; i++) {
        const data = {
          key: i.toString(),
          title: `content${i + 1}`,
          description: `description of content${i + 1}`,
          chosen: Math.random() * 2 > 1
        };
        if (data.chosen) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      }
      this.mockData = mockData;
      this.targetKeys = targetKeys;
    },
    filterOption(inputValue, option) {
      return option.description.indexOf(inputValue) > -1;
    },
    handleChange(targetKeys, direction, moveKeys) {
      console.log(targetKeys, direction, moveKeys);
      this.targetKeys = targetKeys;
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
.out {
  /* min-width: 1200px; */
  background-color: #f0f2f5;
  height: 100%;
}
.main {
  background-color: #fff;
  /* margin: 24px; */
  /* margin-left: 280px; */
  height: auto;
  padding-bottom: 140px;
}
.title {
  margin-left: 32px;
  padding-top: 28px;
  height: 24px;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
  padding-bottom: 58px;
}
.tree {
  width: 234px;
  height: 602px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  margin-left: 100px;
  position: relative;
}
.treeT {
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  margin-top: 8px;
  padding-bottom: 9px;
  margin-bottom: 2px;
}
.treeTl {
  margin-left: 24px;
  height: 22px;
  font-size: 14px;
  font-family: HelveticaNeue;
  color: rgba(0, 0, 0, 0.45);
  line-height: 22px;
}
.treeTr {
  margin-right: 19px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(24, 144, 255, 1);
  line-height: 22px;
  cursor: pointer;
}
.search {
  position: relative;
}
input {
  outline: none;
  width: 210px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  padding-left: 12px;
  margin-left: 12px;
  border: 1px solid rgba(0, 0, 0, 0.15);
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

.icon {
  position: absolute;
  font-size: 14px;
  top: 8px;
  right: 12px;
  color: rgba(0, 0, 0, 0.25);
}
.addTeam {
  width: 234px;
  line-height: 52px;
  background: rgba(24, 144, 255, 1);
  border: 1px solid rgba(151, 151, 151, 1);
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  position: absolute;
  bottom: 0;
  cursor: pointer;
}
.goods {
  width: 303px;
  height: 602px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  position: relative;
  margin-left: 41px;
}
.goods input {
  width: 280px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
.goods .addTeam {
  width: 302px;
  height: 52px;
  background: rgba(24, 144, 255, 1);
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.treeTm {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  line-height: 22px;
  margin-left: 50px;
}
.allgoods {
  width: 303px;
  height: 602px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  margin-left: 72px;
  position: relative;
}
.allgoods .page {
  height: 38px;
  width: 302px;
  position: absolute;
  bottom: 0;
  text-align: right;
}
.allgoods input {
  width: 280px;
  height: 32px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
.tree .list {
  height: auto;
  overflow: visible;
  margin-left: 28px;
}
.listmain {
  height: 102px;
  border-bottom: 1px solid #e9e9e9;
}
.checkbox {
  margin-top: 40px;
  margin-left: 12px;
}
.image {
  margin-top: 24px;
  margin-left: 22px;
}
.image img {
  width: 48px;
  height: 48px;
}
.title-des {
  margin-left: 28px;
}
.titles {
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.65);
  line-height: 22px;
  margin-top: 23px;
  margin-bottom: 3px;
}
.des {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.45);
  line-height: 22px;
}
</style>