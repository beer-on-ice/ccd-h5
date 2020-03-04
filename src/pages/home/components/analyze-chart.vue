<template>
  <div class="analyze-box">
    <div class="analyze-chart">
      <v-chart class="chart" :options="analyzeOptions"></v-chart>
      <div class="analyze-title">{{ title }}</div>
    </div>
    <div class="analyze-list">
      <ul>
        <li v-for="(item, index) in data" :key="index">
          <div
            :style="`background-color: ${colorList[index]};border-radius:2px;`"
          ></div>
          <div>{{ type === "fund" ? item.type : item.codeDesc }}</div>
          <div>{{ item.count }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import vChart from "vue-echarts";
import { calcAnalyzeChart } from "../../../config/echarts-config";

export default {
  props: {
    title: {
      default: () => "",
      type: String
    },
    data: {
      default: () => [],
      type: Array
    },
    type: {
      type: String
    }
  },
  components: {
    vChart
  },
  data() {
    return {
      colorList: [
        "#9A83FE",
        "#F78289",
        "#60C7BC",
        "#FEA86E",
        "#8CECF6",
        "#D3ACF8",
        "#F9DC9A",
        "#A5C6FF",
        "#ABE3C5",
        "#F7B4FF"
      ]
    };
  },
  computed: {
    analyzeOptions() {
      return calcAnalyzeChart(this.data, this.colorList, this.type);
    }
  }
};
</script>

<style lang="stylus" scoped>
.analyze-box
	width 100%;
	.chart
		width 100%;
		height 300px;
	.analyze-title
		font-size 14px;
		color #999999;
		text-align center;
.analyze-list
	margin-top 40px;
	ul
		display flex;
		flex-wrap wrap;
		> li
			width 50%;
			padding-left 30px;
			display flex;
			align-items center;
			> div:first-child
				width 11px;
				height 11px;
			> div:nth-child(2)
				width 72px;
				font-size 14px;
				color #666666;
				margin 0 10px;
				overflow hidden;
				text-overflow ellipsis;
				white-space nowrap;
			> div:last-child
				font-size 19px;
				color #444444;
</style>
