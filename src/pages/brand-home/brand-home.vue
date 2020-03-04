<template>
  <!-- 企业品牌 -->
  <div class="brand-home">
    <section class="head">
      <div class="head-box">
        <img v-if="info.officeUrl" :src="info.officeUrl" alt="办公环境" />
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
  </div>
</template>

<script>
import discribeCard from "components/discribe-card";
import hugeEvent from "components/huge-event";
import imgShow from "components/img-show";
import apis from "../../api/common";

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
      currentTab: 1 // 1大事记 2环境
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
  methods: {
    async fetchBrandShow() {
      const {
        id,
        type,
        handleLogoUrl,
        handleOfficeUrl,
        handleEnvironmentUrl,
        handleEventListTime
      } = this;
      try {
        let res;
        if (type === "app") {
          res = await apis.getInsBrandShow({ id });
        } else {
          res = await apis.getPreviewContent({ id });
        }
        const { code, data, msg } = res;
        if (code === 200) {
          this.info = data;
          handleLogoUrl(this.info);
          handleOfficeUrl(this.info);
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
    handleOfficeUrl({ officeUrl }) {
      if (officeUrl !== "") {
        this.info.officeUrl = officeUrl.split(";")[0];
      }
    },
    handleEnvironmentUrl({ environmentUrl }) {
      if (environmentUrl !== "") {
        let arr = environmentUrl.split(",");
        this.info.environmentUrlList = [];
        arr.forEach(item => {
          let url = item.split(";")[0];
          if (url !== "") {
            this.info.environmentUrlList.push(url);
          }
        });
      }
    },
    handleEventListTime({ eventList }) {
      if (eventList.length) {
        eventList.map(item => {
          item.year = item.eventTime.split("-")[0];
        });
        this.info.descList = eventList;
      } else {
        this.currentTab = 2;
      }
    }
  }
};
</script>

<style lang="stylus" scoped src="./brand-home.styl"></style>
