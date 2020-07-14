<template>
  <div class="invite-auth-wrapper">
    <div class="top-wrapper">
      <div class="left">
        <img v-if="logo" :src="logo" alt="logo" />
        <img v-else src="./img/defaultCompany.png" alt="logo" />
      </div>
      <div class="right">
        <p>{{ company }}</p>
        <p>邀请企业主来认证，让公司资料更完善。</p>
      </div>
    </div>
    <div class="center-wrapper">
      <div class="left">
        <ul class="navs">
          <li
            :class="{ active: active === index }"
            v-for="(item, index) in leftArr"
            :key="item"
            @click="scrollTo(index)"
          >
            {{ item }}
          </li>
          <li></li>
        </ul>
      </div>
      <div class="right">
        <img :src="item" v-for="item in rightArr" :key="item" />
        <div style="height:80px;"></div>
      </div>
    </div>
    <div class="btn-wrapper" v-if="!isWeixin && hideshow">
      <button @click="auth">立即认证</button>
      <button @click="invite">
        邀请认证
      </button>
    </div>
    <button class="weixinAuth" @click="auth" v-if="isWeixin && hideshow">
      立即认证
    </button>
    <auth-dialog ref="authDialog"></auth-dialog>
  </div>
</template>

<script>
import apis from "../../api/common";
import authDialog from "./components/auth-dialog";
const leftArr = [
  "专属主页",
  "信息维护",
  "资质荣誉",
  "企业品牌",
  "金牌顾问",
  "特色服务",
  "精彩活动",
  "产品信息",
  "定向推广",
  "分支机构"
];
const rightArr = [
  require("./img/1.png"),
  require("./img/2.png"),
  require("./img/3.png"),
  require("./img/4.png"),
  require("./img/5.png"),
  require("./img/6.png"),
  require("./img/7.png"),
  require("./img/8.png"),
  require("./img/9.png"),
  require("./img/10.png")
];
export default {
  data() {
    return {
      leftArr,
      rightArr,
      active: 0,
      isWeixin: 0,
      company: "",
      logo: "",
      docmHeight:
        document.documentElement.clientHeight || document.body.clientHeight,
      showHeight:
        document.documentElement.clientHeight || document.body.clientHeight,
      hideshow: true //显示或者隐藏footer
    };
  },
  components: {
    authDialog
  },
  created() {
    const {
      $route: {
        query: { isWeixin },
        params: { companyUrl }
      },
      getInfo
    } = this;
    this.isWeixin = Number(isWeixin);
    this.companyUrl = companyUrl;
    getInfo();
  },
  mounted() {
    // 监听滚动事件
    window.addEventListener("scroll", this.onScroll);
  },
  destroy() {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    async getInfo() {
      try {
        const res = await apis.iCanFlay({ companyUrl: this.companyUrl });
        const { code, data, msg } = res;
        if (code === 200) {
          this.company = data.companyName;
          this.logo = data.logoUrl;
        } else {
          throw new Error(msg);
        }
      } catch (error) {
        console.log(error);
      }
    },
    scrollTo(index) {
      // this.active = index;
      // 获取目标的 offsetTop
      // css选择器是从 1 开始计数，我们是从 0 开始，所以要 +1
      const targetOffsetTop =
        document.querySelector(`.right img:nth-child(${index + 1})`).offsetTop -
        250;
      // 获取当前 offsetTop
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
      const STEP = 50;
      // 判断是往下滑还是往上滑
      if (scrollTop > targetOffsetTop) {
        // 往上滑
        smoothUp();
      } else {
        // 往下滑
        smoothDown();
      }
      // 定义往下滑函数
      function smoothDown() {
        // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
        if (scrollTop < targetOffsetTop) {
          // 如果和目标相差距离大于等于 STEP 就跳 STEP
          // 否则直接跳到目标点，目标是为了防止跳过了。
          if (targetOffsetTop - scrollTop >= STEP) {
            scrollTop += STEP;
          } else {
            scrollTop = targetOffsetTop;
          }
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          // 屏幕在绘制下一帧时会回调传给 requestAnimationFrame 的函数
          // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
          requestAnimationFrame(smoothDown);
        }
      }
      // 定义往上滑函数
      function smoothUp() {
        if (scrollTop > targetOffsetTop) {
          if (scrollTop - targetOffsetTop >= STEP) {
            scrollTop -= STEP;
          } else {
            scrollTop = targetOffsetTop;
          }
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          requestAnimationFrame(smoothUp);
        }
      }
    },
    onScroll() {
      // 获取所有锚点元素
      const navContents = document.querySelectorAll(".right img");
      // 所有锚点元素的 offsetTop
      const offsetTopArr = [];
      navContents.forEach(item => {
        offsetTopArr.push(item.offsetTop - 250);
      });
      // 获取当前文档流的 scrollTop
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let navIndex = 0;
      for (let n = 0; n < offsetTopArr.length; n++) {
        // 如果 scrollTop 大于等于第 n 个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
        // 那么此时导航索引就应该是 n 了
        if (scrollTop >= offsetTopArr[n]) {
          navIndex = n;
        }
      }
      this.active = navIndex;
    },
    auth() {
      this.$refs.authDialog.show();
    },
    invite() {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isiOS) {
        try {
          window.webkit.messageHandlers.invite.postMessage(null);
        } catch (error) {
          console.log("OC");
        }
      } else if (isAndroid) {
        try {
          // eslint-disable-next-line no-undef
          test.hello();
        } catch (error) {
          console.log("OC");
        }
      }
    }
  },

  watch: {
    //监听显示高度
    showHeight: function() {
      if (this.docmHeight > this.showHeight) {
        //隐藏
        this.hideshow = false;
      } else {
        //显示
        this.hideshow = true;
      }
    }
  }
};
</script>

<style lang="stylus" scoped src="./index.styl"></style>
