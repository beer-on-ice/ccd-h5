<template>
  <div class="industry">
    <div class="industry-chart">
      <div class="industry-title">信托产品主要投向行业占比</div>
      <v-chart
        class="chart"
        :options="industryOptions"
        @datazoom="dataZoom"
        ref="industryChart"
      ></v-chart>
    </div>
    <div class="industry-list">
      <div class="list-title">投向行业</div>
      <ul>
        <li v-for="(item, index) in industryData" :key="item.remark" :class="{'li-active': index === currentIndex}" @click="chooseActive(index)">
          <div class="list-index">{{prefixInteger(index + 1, 2)}}</div>
          <div class="list-text">{{item.remark}}</div>
          <div class="list-num">{{item.count}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import vChart from "vue-echarts";
import { calcIndustryChart } from "../../../config/echarts-config";
import apis from '../../../api/common';
import { prefixInteger } from '../../../common/js/utils';

export default {
  components: {
    vChart
  },
  data() {
    return {
      industryOptions: calcIndustryChart(),
      showLength: 4,
      currentIndustry: 0,
      industryData: [],
      currentIndex: 0
    };
  },
  computed: {
    administratorId() {
      return this.$route.params.administratorId;
    },
  },
  created() {
    this.init();
  },
  methods: {
    prefixInteger(num, length) {
      return prefixInteger(...arguments);
    },
    init() {
      this.fetchIndustry().then(res => {
        let startValue = 0;
        let endValue = this.showLength - 1;
        this.setDataZoom({ startValue, endValue, start: null, end: null });
        this.setSeriesAndxAxis();
      });
      
    },
    // 设置datazoom
    setDataZoom(data) {
      let options = this.industryOptions;
      Object.assign(options.dataZoom[0], data);
    },
    // 设置series 和 aAxis
    setSeriesAndxAxis() {
      let options = this.industryOptions;
      let xAxisData = this.industryData.map(item => item.remark);
      let seriesData = this.industryData.map(item => {
        return {
          value: item.count,
          rate: item.rate
        }
      });
      // 计算背景值
      let maxBackgroundData = this._calcMax(seriesData.map(item => item.value));
      options.xAxis[0].data = xAxisData;
      options.series[1].data = seriesData;
      options.series[0].data = maxBackgroundData;
    },
    chooseActive(index) {
      let endValue = index + 3;
      this.currentIndex = index;
      this.$refs.industryChart.dispatchAction({
        type: "dataZoom",
        start: null,
        end: null,
        startValue: index,
        endValue
      });
    },
    dataZoom(data) {

    },
    async fetchIndustry() {
      try {
        let params = { administratorId: this.administratorId };
        const res = await apis.getIndusty(params);
        this.industryData = res.data;
        return res.data;
      } catch(err) {
        console.log(err);
      }
    },
    _calcMax(seriesData) {
      let max = Math.max(...seriesData);
      console.log(max);
      return seriesData.map(item => max);
    }
  }
};
</script>

<style scoped>
.industry {
}
.industry-title {
  color: #999;
  font-size: 15px;
  text-align: center;
  margin: 20px 0;
}
.industry-chart {
  width: 100%;
}
.chart {
  width: 100%;
  height: 300px;
}
.industry-list {
  width: 100%;
  height: 400px;
  overflow-y: scroll;
  padding: 10px 4%;
}
.list-title {
  font-size: 17px;
  color: #222222;
  font-weight: bold;
}
.industry-list ul {
  width: 100%;
  margin-top: 20px;
}
.industry-list ul > li {
  width: 100%;
  padding: 0 10px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.li-active {
  box-shadow: 0px 0px 38px rgba(155, 155, 155, 0.12);
}
.list-index {
  font-size: 20px;
  color: #525f6d;
}
.list-text {
  width: 80%;
  font-size: 14px;
  color: #999999;
}
.list-num {
  font-size: 20px;
  color: #525f6d;
}
</style>
