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
        <img v-else :src="defaultBgUrl" alt="BG" />
      </div>
      <div class="head-content">
        <div class="head-logo">
          <div class="logo">
            <img v-if="info.logoUrl" :src="info.logoUrl" alt="LOGO" />
            <img v-else :src="defaultLogoUrl" alt="LOGO" />
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
      <ul class="relate-tab">
        <li
          v-for="(item, index) in relateMenu"
          :key="item"
          :class="{ 'li-active': typeCurrent === index + 1 }"
          @click="() => (typeCurrent = index + 1)"
        >
          {{ item }}
        </li>
      </ul>
      <ul class="relate-tab-content" v-if="relateCompanyArr.length">
        <li v-for="item in relateCompanyArr" :key="item.companyUrl">
          {{ item.companyName }}
          <!-- <i class="iconfont iconright1"></i> -->
        </li>
      </ul>
      <p class="relate-no-content" v-else>暂无此类关联方</p>
    </section>
    <section class="brand-tab">
      <ul>
        <li
          v-if="info.descList && info.descList.length"
          :class="{ 'li-active': currentTab === 1 }"
          @click="() => (this.currentTab = 1)"
        >
          大事记
        </li>

        <li
          v-if="info.environmentUrlList && info.environmentUrlList.length"
          :class="{ 'li-active': currentTab === 2 }"
          @click="() => (this.currentTab = 2)"
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
  </li>
</template>

<script>
import discribeCard from "components/discribe-card";
import hugeEvent from "components/huge-event";
import imgShow from "components/img-show";
import apis from "../../api/common";

const relateMenu = ["私募管理人", "信托", "银行", "保险"];
export default {
  components: {
    discribeCard,
    hugeEvent,
    imgShow
  },
  data() {
    return {
      id: "",
      type: "",
      info: {},
      defaultLogoUrl: require("./img/defaultLogo.png"),
      defaultBgUrl: require("./img/bg.png"),
      currentTab: 1, // 1大事记 2环境
      typeCurrent: 1,
      relateMenu
    };
  },
  created() {
    const {
      $route: {
        params: { id },
        query: { type }
      }
    } = this;
    this.id = id;
    this.type = type;
  },
  mounted() {
    this.fetchBrandShow();
  },
  computed: {
    relateCompanyArr() {
      if (!this.info.companyList) return [];
      let arr = [...this.info.companyList];
      arr = arr.filter(item => {
        switch (this.typeCurrent) {
          case 1:
            return +item.type === 1 || +item.type === null;
          case 2:
            return +item.type === 2 || +item.type === 3;
          case 3:
            return +item.type === 4 || +item.type === 6;
          case 4:
            return +item.type === 5 || +item.type === 7;
          default:
            return +item.type === 1;
        }
      });
      return arr;
    }
  },
  methods: {
    async fetchBrandShow() {
      const {
        id,
        type,
        handleLogoUrl,
        handleWorkAddressUrl,
        handleEnvironmentUrl,
        handleEventListTime
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
          handleLogoUrl(this.info);
          handleWorkAddressUrl(this.info);
          handleEnvironmentUrl(this.info);
          handleEventListTime(this.info);
        } else {
          throw new Error(msg);
        }
      } catch ({ message }) {
        console.error(message);
      }
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
    goRelatePage(companyUrl) {
      console.log(companyUrl);
    }
  }
};
</script>

<style lang="stylus" scoped src="./brand-pay.styl"></style>
