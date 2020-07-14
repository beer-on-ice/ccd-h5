<template>
  <div class="tab">
    <ul :style="`width: ${tabUlWidth}`">
      <li
        v-for="item in tabList"
        :key="item.type"
        :class="{ 'active-li': currentType === item.type }"
        @click="changeType(item)"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import { tabList } from "../../../config/config";
export default {
  props: {},
  data() {
    return {
      currentType: 1
    };
  },
  computed: {
    tabList() {
      let currentType =
        this.$route.query.type == "9" ? "1" : this.$route.query.type || "3";
      if (currentType === "1") {
        return tabList.filter(item => item.type !== 3);
      } else if (currentType === "2") {
        return tabList.filter(item => item.type !== 2);
      } else {
        return tabList;
      }
    },
    tabUlWidth() {
      return this.tabList.length * 85 + "px";
    }
  },
  methods: {
    changeType(item, index) {
      this.currentType = item.type;
      this.$emit("change", this.currentType);
    }
  }
};
</script>

<style lang="stylus" scoped>
.tab
	width 100%
	padding 0 4%
	overflow-x scroll
	ul
		display flex
		flex-wrap nowrap
		> li
			width 85px
			font-size 15px
			color #999999
			line-height 45px
			position relative
		.active-li
			color #222222
			font-weight bold
			position relative
			&:before
				content ''
				width 20px
				position absolute
				bottom 5px
				left 20px
				border-bottom 2px solid #007BFF
</style>
