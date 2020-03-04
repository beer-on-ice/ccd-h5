<template>
  <div class="discrib">
    <div class="discrib-content" ref="content">
      {{ title }}
    </div>
    <div class="discrib-more" v-show="moreVisible" @click="showAll">
      更多
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => ""
    }
  },
  data() {
    return {
      moreVisible: false
    };
  },
  methods: {
    showAll() {
      this.moreVisible = false;
      this.$refs.content.style.webkitLineClamp = "unset";
    }
  },
  watch: {
    title(oldVal) {
      if (oldVal.length > 80) {
        this.moreVisible = true;
      } else {
        this.moreVisible = false;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.discrib
	overflow hidden;
	&-title
		font-size 18px;
		margin-bottom 5px;
	&-content
		font-size 13px;
		color #999;
		display -webkit-box;
		-webkit-box-orient vertical;
		-webkit-line-clamp 3;
		overflow hidden;
		word-break:break-all;
	&-more
		font-size 13px;
		color #D8B068;
		text-align right;
		margin-top 5px;
		float right;
</style>
