<template>
  <div class="list">
    <ul>
      <li v-for="item in list" :key="item.id">
        <div class="list-style"></div>
        <div class="list-content">
          <div class="list-title">{{ item.companyName }}</div>
          <div class="list-mes">
            <span
              >{{ item.startTime }} -
              {{ item.upToNow ? "至今" : item.endTime }}</span
            ><span style="margin-left:10px;">{{ item.positionName }}</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="show-more" @click="showMore" v-show="listData.length > 2">
      <p v-if="!isShowMore">展开显示更多<i class="iconfont icond-down"></i></p>
      <p v-else>收起更多<i class="iconfont"></i></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultLength: {
      type: Number,
      default: () => 2
    },
    listData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isShowMore: false
    };
  },
  computed: {
    list() {
      const { isShowMore, listData, defaultLength } = this;
      if (isShowMore) {
        return listData.slice(0, defaultLength);
      } else {
        let newArr = listData.slice(0, 2);
        return newArr;
      }
    }
  },
  methods: {
    showMore() {
      this.isShowMore = !this.isShowMore;
    }
  }
};
</script>

<style lang="stylus" scoped>
.list
	ul
		> li
			display flex
			margin-top 15px
			.list-style
				width 20px
				height 20px
				background rgba(184, 184, 184, 1)
				border 3px solid rgba(255, 255, 255, 1)
				box-shadow 0px 8px 20px rgba(0, 0, 0, 0.12)
				border-radius 50%
				opacity 1
			.list-content
				margin-left 10px
				width 310px
				.list-title
					font-size 14px
					color #485B80
					word-break break-all
				.list-mes
					font-size 12px
					color #999999
					word-break break-all
	.show-more
		font-size 13px
		color #999
		text-align center
		margin-top 10px
		i
			margin-left 5px
</style>
