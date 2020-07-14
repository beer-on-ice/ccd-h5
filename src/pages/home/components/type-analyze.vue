<template>
  <div class="analyze">
    <div class="type-box" v-if="currentType === '3'">
      <ul>
        <li
          :class="{ 'active-type': activeType === 1 }"
          @click="
            () => {
              this.activeType = 1;
            }
          "
        >
          <div class="icon icon-si"></div>
          <div class="title">私募产品</div>
        </li>
        <li
          :class="{ 'active-type': activeType === 2 }"
          @click="
            () => {
              this.activeType = 2;
            }
          "
        >
          <div class="icon icon-xing"></div>
          <div class="title">信托产品</div>
        </li>
      </ul>
    </div>
    <div v-if="currentType === '3'">
      <ul>
        <transition-group
          appear
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutLeft"
        >
          <li v-if="activeType === 1" key="1">
            <analyze-chart
              :title="'私募产品类型分析'"
              :type="'fund'"
              :data="analyzeData.fund"
            ></analyze-chart>
          </li>
          <li v-else key="2">
            <analyze-chart
              :title="'信托产品类型分析'"
              :type="'trust'"
              :data="analyzeData.trust"
            ></analyze-chart>
          </li>
        </transition-group>
      </ul>
    </div>
    <div v-else-if="currentType === '1'">
      <analyze-chart
        :title="'私募产品类型分析'"
        :type="'fund'"
        :data="analyzeData.fund"
      ></analyze-chart>
    </div>
    <div v-else-if="currentType === '2'">
      <analyze-chart
        :title="'信托产品类型分析'"
        :type="'trust'"
        :data="analyzeData.trust"
      ></analyze-chart>
    </div>
  </div>
</template>

<script>
import analyzeChart from "./analyze-chart";
import apis from "../../../api/common";

export default {
  components: {
    analyzeChart
  },
  data() {
    return {
      activeType: 1, // 混合模式时选中的type
      analyzeData: {}
    };
  },
  computed: {
    currentType() {
      return this.$route.query.type == "9"
        ? "1"
        : this.$route.query.type || "3";
    },
    administratorId() {
      return this.$route.params.administratorId;
    }
  },
  created() {
    this.fetchAnalysis();
  },
  methods: {
    async fetchAnalysis() {
      try {
        let params = { administratorId: this.administratorId };
        const res = await apis.getAnalysis(params);
        this.analyzeData = res.data;
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.analyze
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
				background linear-gradient(360deg, rgba(254, 254, 254, 1) 0%, rgba(243, 243, 243, 1) 100%)
				border-bottom 1px solid #007BFF
				.icon-si
					background-image url('..\..\..\assets\images\icon-si-active.png')
				.icon-xing
					background-image url('..\..\..\assets\images\icon-xing-active.png')
</style>
