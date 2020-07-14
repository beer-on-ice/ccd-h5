<template>
  <!-- 项目品牌 -->
  <li class="brand-pay">
    <section class="head">
      <div class="head-box">
        <img
          v-if="info.workAddressUrl"
          :src="info.workAddressUrl"
          alt="工作地点"
        />
        <img v-else src="./img/bg.png" alt="BG" />
      </div>
      <div class="head-content">
        <div class="head-logo">
          <div class="logo">
            <img v-if="info.logoUrl" :src="info.logoUrl" alt="LOGO" />
            <img v-else src="./img/defaultLogo.png" alt="LOGO" />
          </div>
          <div class="logo-title">
            <span>{{ info.brandName }}</span>
            <span>品牌</span>
          </div>
        </div>
      </div>
      <div class="discribe">
        <discribe-card :title="info.description"></discribe-card>
      </div>
    </section>
    <section class="relate">
      <h2>关联方</h2>
      <ul :class="['relate-tab', hasArrLen > 1 ? 'hasMore' : '']">
        <li
          v-for="(item, index) in relateMenu"
          :hidden="!item.arr.length"
          :key="item.id"
          :class="{ 'li-active': typeCurrent === index + 1 }"
          @click="switchRelate(index)"
        >
          {{ item.name }}
        </li>
      </ul>
      <ul class="relate-tab-content">
        <li
          v-for="item in relateMenu[typeCurrent - 1].arr"
          :key="item.companyUrl"
          @click="goRelatePage(item)"
        >
          {{ item.companyName }}
          <!-- <i class="iconfont iconright1"></i> -->
        </li>
      </ul>
    </section>
    <section class="brand-tab">
      <ul>
        <li
          v-if="info.descList && info.descList.length"
          :class="{ 'li-active': currentTab === 1 }"
          @click="switchImg(1)"
        >
          大事记
        </li>

        <li
          v-if="info.environmentUrlList && info.environmentUrlList.length"
          :class="{ 'li-active': currentTab === 2 }"
          @click="switchImg(2)"
        >
          环境
        </li>
      </ul>
      <div class="tab-content" v-show="currentTab === 1">
        <huge-event :listData="info.descList"></huge-event>
      </div>
      <div v-show="currentTab === 2">
        <img-show :listData="info.environmentUrlList"></img-show>
      </div>
    </section>
    <!-- <div class="adBanner" v-show="isShare">
      <div class="left">
        <img src="./img/logo.png" alt="logo" />
      </div>
      <div class="right" @click="show()">
        下载APP
      </div>
    </div> -->
    <oDialog ref="orderDialog"></oDialog>
    <div class="mask" v-if="showMask" @click="showMask = false">
      <!-- <div>
        <p>点击右下角打开财查到APP</p>
        <p>查看更多内容</p>
      </div> -->

      <img src="./img/down.png" alt="" />
    </div>
  </li>
</template>

<script>
import oDialog from "./components/o-dialog";
import discribeCard from "components/discribe-card";
import hugeEvent from "components/huge-event";
import imgShow from "components/img-show";
import apis from "../../api/common";
import jumpInfoMixin from "../../mixins/jumpInfoMixin"; // 引入mixin文件

export default {
  mixins: [jumpInfoMixin],
  components: {
    oDialog,
    discribeCard,
    hugeEvent,
    imgShow
  },
  data() {
    return {
      id: "",
      type: "",
      isShare: false,
      info: {},
      currentTab: 1, // 1大事记 2环境
      typeCurrent: 1,
      showMask: false,
      hasArrLen: 0,
      relateMenu: [
        {
          id: 1,
          name: "私募管理人",
          arr: []
        },
        {
          id: 2,
          name: "信托",
          arr: []
        },
        {
          id: 3,
          name: "银行",
          arr: []
        },
        {
          id: 4,
          name: "保险",
          arr: []
        },
        {
          id: 5,
          name: "证券",
          arr: []
        }
      ]
    };
  },
  created() {
    const {
      $route: {
        params: { id },
        query: { type, share }
      }
    } = this;
    this.id = id;
    this.type = type;
    this.isShare = Number(share);
  },
  mounted() {
    this.fetchBrandShow();
    if (this.isShare) this.generateShare();
  },
  methods: {
    async fetchBrandShow() {
      const {
        id,
        type,
        handleLogoUrl,
        handleWorkAddressUrl,
        handleEnvironmentUrl,
        handleEventListTime,
        handleCompanyArr
      } = this;
      try {
        let res;
        if (type === "app") {
          res = await apis.getBrandShow({ id });
        } else {
          res = await apis.getPreviewContent({ id });
        }
        const { code, data, msg } = res;
        if (code === 200) {
          this.info = data;
          document.title = `${data.brandName}品牌详情`;
          handleLogoUrl(this.info);
          handleWorkAddressUrl(this.info);
          handleEnvironmentUrl(this.info);
          handleEventListTime(this.info);
          handleCompanyArr(this.info);
        } else {
          throw new Error(msg);
        }
      } catch ({ message }) {
        console.error(message);
      }
    },
    handleCompanyArr({ companyList }) {
      let arr = [...companyList];
      arr.forEach(item => {
        if (+item.type === 1 || +item.type === null) {
          this.relateMenu[0].arr.push(item);
        } else if (+item.type === 2 || +item.type === 3) {
          this.relateMenu[1].arr.push(item);
        } else if (+item.type === 4 || +item.type === 6) {
          this.relateMenu[2].arr.push(item);
        } else if (+item.type === 5 || +item.type === 7) {
          this.relateMenu[3].arr.push(item);
        } else if (+item.type === 8 || +item.type === 9) {
          this.relateMenu[4].arr.push(item);
        }
      });
      this.relateMenu.map((item, index) => {
        if (item.arr.length) {
          ++this.hasArrLen;
          return (this.typeCurrent = index + 1);
        }
      });
    },
    handleLogoUrl({ logoUrl }) {
      if (logoUrl !== "") {
        this.info.logoUrl = logoUrl.split(";")[0];
      }
    },
    handleWorkAddressUrl({ workAddressUrl }) {
      if (workAddressUrl !== "") {
        this.info.workAddressUrl = workAddressUrl.split(";")[0];
      }
    },
    handleEnvironmentUrl({ environment }) {
      if (environment !== "") {
        let arr = environment.split(",");
        this.info.environmentUrlList = [];
        arr.forEach(item => {
          let url = item.split(";")[0];
          if (url !== "") {
            this.info.environmentUrlList.push(url);
          }
        });
      }
    },
    handleEventListTime({ eventList: { descList } }) {
      if (descList.length) {
        descList.map(item => {
          item.year = item.eventTime.split("-")[0];
        });
        this.info.descList = descList;
      } else {
        this.currentTab = 2;
      }
    },
    show() {
      this.$refs.orderDialog.show();
    },
    switchImg(tab) {
      this.currentTab = tab;
    },
    switchRelate(index) {
      // if (this.isShare) {
      //   this.showMask = true;
      //   return;
      // }
      this.typeCurrent = index + 1;
    },
    goRelatePage({ companyUrl, type, administratorId }) {
      if (this.isShare) this.showMask = true;
      this.gengerateJumpInfo(companyUrl, type, administratorId);
    }
  }
};
</script>

<style lang="stylus" scoped src="./brand-pay.styl"></style>
