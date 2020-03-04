<template>
  <div class="product-chart">
    <div class="content">
      <v-chart class="pie-chart" :options="productOptions"></v-chart>
      <div class="message">
        <div class="max-box">
          <div>0</div><div>{{data.total}}</div>
        </div>
        <div class="message-num" :style="`color: ${themeData.color}`">
          <span>{{data.fundScale}}</span><span>亿</span>
        </div>
        <div class="message-text">{{ themeData.text }}</div>
        <div class="message-btn" :style="`background: ${themeData.color}`">{{ themeData.btnStr }}</div>
      </div>
      <div class="bottom">
        <div class="bottom-list1">
          <div>{{ data.orderNum }}</div>
          <div>排名</div>
        </div>
        <div class="bottom-list2">
          <div>{{ data.total }}</div>
          <div>{{ themeData.totalStr }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vChart from 'vue-echarts';
import { calcPieChart } from '../../../config/echarts-config';
export default {
  components: {
    vChart
  },
  data() {
    return {
      themeList: [
        {
          name: 'blue',
          color: '#007BFF',
          linear: ['#00FFF6', '#30A6F6'],
          text: '私募资产管理规模',
          totalStr: '私募公司总数',
          btnStr: '规模',
          key: 'fundOrder'
        },
        {
          name: 'orange',
          color: '#FF801A',
          linear: ['#F9D423', '#F79D16'],
          text: '私募产品发行数量',
          totalStr: '私募公司总数',
          btnStr: '数量',
          key: 'fundOrder'
        },
        {
          name: 'green',
          color: '#44CEA4',
          linear: ['#F9F586', '#CCEF8C'],
          text: '信托产品发行数量',
          totalStr: '信托公司总数',
          btnStr: '数量',
          key: 'trustOrder'
        }
      ]
    }
  },
  props: {
    theme: {
      default: () => 'blue',
      type: String
    },
    data: {
      default: () => {},
      type: Object
    }
  },
  computed: {
    productOptions() {
      return calcPieChart(this.themeData.linear, this.data);
    },
    themeData() {
      return this.themeList.filter(item => item.name === this.theme)[0];
    }
  }
}
</script>

<style lang="stylus" scoped>
.product-chart
  padding 20px 4% 0 4%
  .content
    width 100%
    height 360px
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 40px rgba(153,153,153,0.1);
    border-radius 20px
    position relative
    .pie-chart
      width 100%
      height 100px
    .message
      width 100%
      position relative
      .max-box
        width 60%
        display flex
        justify-content space-between
        font-size 14px
        color #D8D8D8
        position absolute
        left 20%
        top  -15px
      &-num
        font-size 12px
        text-align center
        line-height 40px
        > span:first-child
          font-size 44px
          font-weight bold
      &-text
        font-size 14px
        color #999999
        text-align center
      &-btn
        width 53px
        height 28px
        text-align center
        line-height 28px
        margin 0 auto
        margin-top 10px
        font-size 12px
        color #fff
    .bottom
      position absolute
      bottom 0 
      left 0
      width 100%
      height 100px
      padding 20px 20px
      border-top 1px solid #EEEEEE
      display flex
      justify-content space-between
      &-list2
        text-align right
      &-list2, &-list1
        > div:first-child
          font-size 20px
          color #525F6D
          font-weight bold
        > div:last-child
          font-size 12px
          color #A2A9AF
          margin-top 5px
</style>