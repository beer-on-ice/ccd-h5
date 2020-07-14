<template>
  <div class="home-box">
    <tab @change="changeTab"></tab>
    <!-- 用动态组件显示 -->
    <transition
      appear
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutLeft"
    >
      <component :is="currentComponent"></component>
    </transition>
  </div>
</template>

<script>
import tab from "./components/tab-list";
import productData from "./components/product-data";
import runState from "./components/run-state";
import industry from "./components/industry";
import typeAnalyze from "./components/type-analyze";
import publicTime from "./components/public-time";

export default {
  components: {
    tab,
    productData,
    runState,
    industry,
    typeAnalyze,
    publicTime
  },
  data() {
    return {
      currentTab: 1 // 当前tab,从路由中获取，默认1
    };
  },
  computed: {
    // 1私募产品，2信托产品， 3混合模式，默认混合
    currentType() {
      return this.$route.query.type == "9"
        ? "1"
        : this.$route.query.type || "3";
    },
    currentComponent() {
      if (this.currentTab === 1) {
        return productData;
      } else if (this.currentTab === 2) {
        return runState;
      } else if (this.currentTab === 3) {
        return industry;
      } else if (this.currentTab === 4) {
        return typeAnalyze;
      } else if (this.currentTab === 5) {
        return publicTime;
      }
      return productData;
    }
  },
  methods: {
    changeTab(tab) {
      this.currentTab = tab;
    }
  }
};
</script>

<style lang="stylus" scoped></style>
