<template>
  <div class="run-box">
    <div class="run-content">
      <div class="run-head">
        <div>
          <span>产品总数</span><span>{{stateData.total}}</span>
        </div>
        <div>
          <span>正在运作</span><span>{{stateData.stateA}}</span>
        </div>
      </div>
      <div class="run-title">
        {{title}}<br><span v-show="currentRun === 2">除正在运作产品</span>
      </div>
      <div class="run-body">
        <div class="chart-box">
          <v-chart class="run-chart" :options="runChartOptions" @click="changeChart" v-if="currentRun === 1"></v-chart>
          <v-chart class="yan-chart" :options="yanChartOptions" @click="changeChart" v-else-if="currentRun === 2"></v-chart>
        </div>
        <div class="data-list">
          <ul class="run-ul" v-if="currentRun === 1">
            <li v-for="(item, index) in dataList" :key="index" 
              :style="`background: linear-gradient(270deg,rgba(255,255,255,1) 0%, rgba(${item.color},0.2) 100%);`">
              <div class="li-dian" :style="`background: rgba(${item.color},1);`"></div>
              <div>{{item.name}}</div>
              <div>{{item.value}}</div>
            </li>
          </ul>
          <ul class="yan-ul" v-else-if="currentRun === 2">
            <li v-for="(item, index) in yanList" :key="index">
              <div>{{item.name}}</div>
              <div>{{item.value}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vChart from 'vue-echarts';
import { calcRunChart, calcYanChart } from '../../../config/echarts-config';
import apis from '../../../api/common';

export default {
  components: {
    vChart
  },
  data() {
    return {
      currentRun: 1, // 1 正在运作 2，延期运算
      dataList: [
        {
          name: '正常清算',
          value: 0,
          color: "71,229,239",
          stateKey: 'stateB',
        },
        {
          name: '提前清算',
          value: 0,
          color: "81,130,255",
          stateKey: 'stateC',
        },
        {
          name: '非正常清算',
          value: 0,
          color: "134,81,255",
          stateKey: 'stateE',
        },
        {
          name: '延期清算',
          value: 0,
          color: "221,50,249",
          stateKey: 'stateD',
        },
        {
          name: '投顾协议已终止',
          value: 0,
          color: "255,127,87",
          stateKey: 'stateF',
        },
      ],
      yanList: [
        {
          name: '延期清算',
          value: 0,
          stateKey: 'stateD'
        },
        {
          name: '延期占比',
          value: 0,
          stateKey: 'rateD'
        }
      ],
      stateData: {}
    }
  },
  computed: {
    administratorId() {
      return this.$route.params.administratorId;
    },
    title() {
      if(this.currentRun === 1) {
        return '私募产品除正在运作外状态';
      } else {
        return '私募产品延期占比';
      }
    },
    runChartOptions() {
      return calcRunChart(this.dataList);
    },
    yanChartOptions() {
      return calcYanChart(this.stateData);
    }
  },
  created() {
    this.fetchFundState();
  },
  methods: {
    changeChart(data) {
      // 此处点击第一张表切换，点击第二张无效
      if(data.seriesIndex === 1) {
        return false;
      }
      this.currentRun = this.currentRun === 1 ? 2 : 1;
    },
    async fetchFundState() {
      try {
        let params = { administratorId: this.administratorId };
        const res = await apis.getFundState(params);
        this.stateData = res.data;
        this.dataList.forEach(item => {
          item.value = res.data[item.stateKey];
        });
        this.yanList.forEach(item => {
          if(item.stateKey === 'rateD') {
            item.value = (res.data[item.stateKey] * 100).toFixed(1) + '%';
          } else {
            item.value = res.data[item.stateKey];
          }
        });
      } catch(err) {
        console.error(err);
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.run-box
  padding 20px 4%
  .run-content
    width 100%
    height 475px
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 40px rgba(153,153,153,0.1);
    border-radius 20px
    .run-head
      width 100%
      height 80px
      display flex
      border-bottom 1px solid #EEEEEE
      > div
        width 50%
        text-align center
        line-height 80px
        color #333
        > span:first-child
          font-size 15px
          margin-right 5px
        > span:last-child
          font-size 28px
          font-weight bold
    .run-title
      font-size 14px
      color #999
      text-align center
      margin-top 30px
      > span 
        font-size 11px
    .run-body
      display flex
      margin-top 20px
      .chart-box
        width 50%
        height 280px
        .run-chart
          width 100%
          height 300px
        .yan-chart
          width 100%
          height 300px
      .data-list
        width 50%
        .run-ul
          > li
            width 100%
            height 48px
            border-radius 20px
            margin-bottom 10px
            color #333
            display flex
            align-items center
            font-size 13px
            .li-dian
              width 15px
              height 15px
              border-radius 50%
              margin 0 10px
            > div:last-child
              margin-left 10px
        .yan-ul
          text-align center
          > li
            width 100%
            height 140px
            background:linear-gradient(270deg,rgba(255,255,255,1) 0%,rgba(240,244,248,0.4) 100%);
            > div:first-child
              font-size 13px
              color #333333
              padding-top 30px
            > div:last-child
              font-size 30px
              color #333333
              font-weight bold
          > li:last-child
            background:linear-gradient(270deg,rgba(255,255,255,1) 0%,rgba(255,92,92,0.2) 100%);
</style>