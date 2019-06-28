<!--  -->
<template>
    <div>
        <div id="editor"></div>
    </div>
</template>

<script>
// 引用
import E from "wangeditor"; // 使用 npm 安装

// var E = require('/wangEditor.min.js')  // 使用下载的源码

export default {
  props: {
          text: {
              type: String,
              default: () => {
                  return ''
              }
          }
      },
  data() {
    return {
      des:"",
    };
  },

  components: {},

  computed: {},

  mounted() {
    // 创建编辑器
    // this.des=text
    var editor = new E("#editor");
    // editor.customConfig.uploadImgServer = "/upload";
        editor.customConfig.zIndex = 1

    editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
    editor.customConfig.uploadImgServer = 'http://192.168.31.109:3000/api/StorageFiles/upload'
    editor.customConfig.debug = location.href.indexOf('wangeditor_debug_mode=1') > 0
    editor.create();
    console.log(editor.txt.html())
        editor.txt.html(this.text)
        

  },

  methods: {}
};
</script>
<style scoped>
div{
    width: 680px;
}
</style>