<template>
  <q-dialog v-model="isShow">
    <div class="dialog-content">
      <div class="tip">
        <p>打开财查到APP</p>
        <p>查看更多内容，体验更佳</p>
      </div>
      <div class="bottom-btn">
        <div @click.stop="goApp">打开app</div>
      </div>
    </div>
  </q-dialog>
</template>
<script>
import CallApp from "callapp-lib";
const option = {
  scheme: {
    protocol: "ccd" //URL Scheme 的 scheme 字段，要打开的 APP 的标识
  },
  //Android //安卓原生谷歌浏览器必须传递 Intent 协议地址，才能唤起 APP
  intent: {
    package: "com.lf.ccdapp",
    scheme: "a"
  },
  // IOS
  universal: {
    host: "ccdapp.aifound.cn/",
    pathKey: "a"
  },
  appstore: "https://itunes.apple.com/cn/app/id1449931291?mt=8", //APP 的 App Store
  yingyongbao: "https://sj.qq.com/myapp/detail.htm?apkName=com.lf.ccdapp", //APP 的 应用宝地址
  fallback: "https://www.qq.com", //唤端失败后跳转的地址
  timeout: 2000
};
export default {
  data() {
    return {
      isShow: false,
      option
    };
  },
  methods: {
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    },
    goApp() {
      const lib = new CallApp(option);
      lib.open({
        path: "" // app指定页面
      });
    }
  }
};
</script>
<style lang="stylus" src="./o-dialog.styl"></style>
