<template>
  <li class="brand-bd">
    <section class="head">
      <div class="head-box"></div>
      <div class="head-content">
        <div class="head-logo">
          <div class="logo">
            <img :src="info.logoUrl" alt="LOGO" />
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
          :class="{ 'li-active': typeCurrent === 1 }"
          @click="() => (this.typeCurrent = 1)"
        >
          私募管理人
        </li>
        <li
          :class="{ 'li-active': typeCurrent === 2 }"
          @click="() => (this.typeCurrent = 2)"
        >
          信托
        </li>
        <li
          :class="{ 'li-active': typeCurrent === 3 }"
          @click="() => (this.typeCurrent = 3)"
        >
          银行
        </li>
        <li
          :class="{ 'li-active': typeCurrent === 4 }"
          @click="() => (this.typeCurrent = 4)"
        >
          保险
        </li>
      </ul>
      <ul class="relate-tab-content" v-if="relateCompanyArr.length">
        <li
          v-for="item in relateCompanyArr"
          :key="item.companyUrl"
          @click="goRelatePage(item.companyUrl)"
        >
          {{ item.companyName }}
          <i class="iconfont iconright1"></i>
        </li>
      </ul>
      <p class="relate-no-content" v-else>暂无此类关联方</p>
    </section>
  </li>
</template>

<script>
import discribeCard from "components/discribe-card";
import apis from "../../api/common";

export default {
  components: {
    discribeCard
  },
  data() {
    return {
      id: "",
      info: {},
      typeCurrent: 1
    };
  },
  created() {
    const {
      $route: {
        params: { id }
      }
    } = this;
    this.id = id;
  },
  mounted() {
    this.fetchBrandShow();
  },
  computed: {
    relateCompanyArr() {
      if (!this.info.companyList) return [];
      let arr = [...this.info.companyList];
      arr = arr.filter(item => item.type === this.typeCurrent);
      return arr;
    }
  },
  methods: {
    async fetchBrandShow() {
      const { id, handleLogoUrl, handleWorkAddressUrl } = this;
      try {
        const { code, data, msg } = await apis.getBrandShow({ brandId: id });
        if (code === 200) {
          this.info = data;
          handleLogoUrl(this.info);
          handleWorkAddressUrl(this.info);
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
    goRelatePage(companyUrl) {
      console.log(companyUrl);
    }
  }
};
</script>

<style lang="stylus" scoped src="./brand-bd.styl"></style>
