<template>
  <div class="img-box">
    <img
      v-for="item in listData"
      :key="item"
      :src="item"
      v-gallery:group1
    />
  </div>
</template>

<script>
export default {
  props: ["listData"]
};
</script>

<style lang="stylus" scoped>
.img-box
	width 100%;
	padding 0 4%;
	margin-top 20px;
	display flex;
	flex-wrap wrap;
	justify-content space-between;
	> img
		width 48%;
		height:120px;
		margin-top 15px;
</style>
