<template>
  <div class="public-box">
    <div class="public-head">
      <div :style="`color: ${color};`">{{ currentSelect.count }}</div>
      <div>{{title}}</div>
      <div>{{ currentSelect.time }}</div>
    </div>
    <div class="analyze-chart">
      <v-chart class="chart" :options="publicOptions"  @click="chartClick"></v-chart>
    </div>
  </div>
</template>

<script>
import vChart from 'vue-echarts';
import { calcPublicChart } from '../../../config/echarts-config';
import {deepCopy} from '../../../common/js/utils';

export default {
  props: {
    title: {
      default: () => '',
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
      currentSelect: {}
    }
  },
  watch: {
    data(nVal) {
      this.currentSelect = deepCopy(nVal[nVal.length - 1]);
    }
  },
  computed: {
    color() {
      if(this.type === 'fund') {
        return '#007BFF';
      } else if(this.type === 'trust') {
        return '#FF801A';
      }
    },
    publicOptions() {
			return calcPublicChart(this.data, this.color);
		}
  },
  methods: {
    chartClick(params) {
      this.currentSelect.count = params.value;
      this.currentSelect.time = params.name;
		},
  }
};
</script>

<style lang="stylus" scoped>
.public-box
  width 100%
  .chart
    width 100%
    height 200px
  .public-head
    width 100%
    padding 0 4%
    height 100px
    display flex
    justify-content space-between
    align-items center
    border-bottom 1px solid #EEEEEE
    > div:first-child
      font-size 28px
      color #007BFF
      font-weight bold
    > div:nth-child(2)
      font-size 14px
      color #999999
    > div:last-child
      font-size 16px
      color #999999
      font-weight bold
</style>