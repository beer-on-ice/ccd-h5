<template>
  <div class="product-box">
    <div class="type-box" v-if="currentType === '3'">
      <ul>
        <li :class="{'active-type': activeType === 1}" @click="() => { this.activeType = 1 }">
          <div class="icon icon-si"></div>
          <div class="title">私募产品</div>
        </li>
        <li :class="{'active-type': activeType === 2}" @click="() => { this.activeType = 2 }">
          <div class="icon icon-xing"></div>
          <div class="title">信托产品</div>
        </li>
      </ul>
    </div>
    <div class="type-content" v-if="currentType === '3'">
      <ul>
        <transition-group appear enter-active-class="animated slideInRight" leave-active-class="animated slideOutLeft">
          <li v-if="activeType === 1" key="1">
            <product-chart-simu :theme="'blue'" :data="scaleData"></product-chart-simu>
            <product-chart :theme="'orange'" :data="rankData"></product-chart>
          </li>
          <li v-else key="2">
            <product-chart :theme="'green'" :data="rankData"></product-chart>
          </li>
        </transition-group>
      </ul>
    </div>
    <div v-else-if="currentType === '1'">
      <product-chart-simu :theme="'blue'" :data="scaleData"></product-chart-simu>
      <product-chart :theme="'orange'" :data="rankData"></product-chart>
    </div>
    <div v-else-if="currentType === '2'">
      <product-chart :theme="'green'" :data="rankData"></product-chart>
    </div>

  </div>
</template>

<script>
import productChart from './product-chart';
import productChartSimu from './product-simu-chart';
import apis from '../../../api/common';

export default {
  components: {
    productChart,
    productChartSimu
  },
  data() {
    return {
      activeType: 1, // 混合模式时选中的type
      rankData: {},
      scaleData: {},
    }
  },
  computed: {
    // 1私募产品，2信托产品， 3混合模式，默认混合
    currentType() {
      return this.$route.query.type || "3";
    },
    administratorId() {
      return this.$route.params.administratorId;
    }
  },
  created() {
    if(this.currentType === '2') {
      this.fetchRankInfo();
    } else {
      this.fetchRankInfo();
      this.fetchFundScale();
    }
    
  },
  methods: {
    async fetchRankInfo() {
      try {
        let params = { administratorId: this.administratorId };
        const res = await apis.getRankInfo(params);
        this.rankData = res.data;
      } catch(err) {
        console.error(err);
      }
    },
    async fetchFundScale() {
      try {
        let params = { administratorId: this.administratorId };
        const res = await apis.getFundScale(params);
        this.scaleData = res.data;
      } catch(err) {
        console.error(err);
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.product-box
  .type-box
    ul
      display flex
      width 100%
      height 50px
      border-top 1px solid #eee
      > li
        width 50%
        height 50px
        line-height 50px
        text-align center
        display flex
        align-items center
        justify-content center
        .icon
          width 16px
          height 16px
        .icon-si
          background url('..\..\..\assets\images\icon-si.png') no-repeat
          background-size contain
        .icon-xing
          background url('..\..\..\assets\images\icon-xing.png') no-repeat
          background-size contain
        .title
          margin-left 5px
      .active-type
        background linear-gradient(360deg,rgba(254,254,254,1) 0%,rgba(243,243,243,1) 100%);
        border-bottom 1px solid #007BFF
        .icon-si
          background-image url('..\..\..\assets\images\icon-si-active.png')
        .icon-xing
          background-image url('..\..\..\assets\images\icon-xing-active.png')
  .type-content
    width 100%
    ul
      width 100%
      > li
        width 100%
</style>