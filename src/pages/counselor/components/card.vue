<template>
  <div class="card-list">
    <ul>
      <li v-for="item in listData" :key="item.winPath">
        <div class="card-img">
          <img alt="风采" :src="item.winPath" v-gallery:group2 />
        </div>
        <!-- <div class="card-text">
          <div>顾问编辑后的简短标题文案展示</div>
          <div>2018.09.26</div>
        </div> -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    listData: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="stylus" scoped>
.card-list
	margin-top 10px;
	ul
		> li
			border-bottom 1px solid #EEEEEE;
			padding 10px 0;
			.card-img
				width 100%;
				height 100%;
				img
					width 100%;
					max-height 100%;
	.card-text
		display flex;
		justify-content space-between;
		font-size 14px;
		color #999999;
		margin-top 10px;
</style>
