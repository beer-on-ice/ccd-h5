<template>
  <div class="list">
    <ul>
      <li v-for="item in listData" :key="item.eventName">
        <div class="list-head">{{ item.year }}</div>
        <div class="list-style"></div>
        <div class="list-content">
          <div class="list-line"></div>
          <div class="list-title">{{ item.eventName }}</div>
          <div class="list-mes">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    defaultLength: {
      type: Number,
      default: () => 100
    },
    listData: {
      type: Array,
      default: () => []
    },
    showMoreText: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      isShowMore: false
    };
  },
  computed: {
    list() {
      const { isShowMore, listData } = this;
      if (isShowMore) {
        return listData;
      } else {
        let newArr = listData.slice(0, 2);
        return newArr;
      }
    }
  },
  methods: {
    showMore() {
      this.isShowMore = true;
    }
  }
};
</script>

<style lang="stylus" scoped>
.list
	ul
		> li
			display flex;
			margin-top 15px;
			.list-head
				font-size 14px;
				color #666666;
				margin-right 10px;
			.list-style
				width 20px;
				height 20px;
				background rgba(184, 184, 184, 1);
				border 3px solid rgba(255, 255, 255, 1);
				box-shadow 0px 8px 20px rgba(0, 0, 0, 0.12);
				border-radius 50%;
				opacity 1;
			.list-content
				width 260px;
				margin-left 10px;
				position relative;
				.list-title
					font-size 14px;
					color #666666;
				.list-mes
					font-size 12px;
					color #999999;
					margin-top:16px;
				.list-line
					position absolute;
					left -21px;
					top 5px;
					width 1px;
					height 120%;
					background #cacaca;
					z-index -1;
	.show-more
		font-size 13px;
		color #999;
		text-align center;
		margin-top 10px;
		i
			margin-left 5px;
</style>
