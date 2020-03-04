<template>
	<div class="analyze">
		<div class="type-box" v-if="currentType === '3'">
			<ul>
				<li :class="{ 'active-type': activeType === 1 }"
					@click="changeType(1)">
					<div class="icon icon-si"></div>
					<div class="title">私募产品</div>
				</li>
				<li :class="{ 'active-type': activeType === 2 }"
					@click="changeType(2)">
					<div class="icon icon-xing"></div>
					<div class="title">信托产品</div>
				</li>
			</ul>
		</div>
		<div v-if="currentType === '3'">
			<ul>
				<transition-group appear enter-active-class="animated slideInRight" leave-active-class="animated slideOutLeft">
					<li v-if="activeType === 1" key="1">
						<public-chart :title="'私募产品发行时间'" :data="publicData.fund" :type="'fund'"></public-chart>
					</li>
					<li v-else key="2">
						<public-chart :title="'信托产品发行时间'" :data="publicData.trust" :type="'trust'"></public-chart>
					</li>
				</transition-group>
			</ul>
		</div>
    <div v-else-if="currentType === '1'">
			<public-chart :title="'私募产品发行时间'" :data="publicData.fund" :type="'fund'"></public-chart>
		</div>
		<div v-else-if="currentType === '2'">
			<public-chart :title="'信托产品发行时间'" :data="publicData.trust" :type="'trust'"></public-chart>
		</div>
	</div>
</template>

<script>
import publicChart from './public-chart';
import apis from '../../../api/common';

export default {
  components: {
		publicChart
  },
	data() {
		return {
			activeType: 1, // 混合模式时选中的type
			publicData: {}
		}
	},
	computed: {
		currentType() {
			return this.$route.query.type || '3';
    },
		administratorId() {
      return this.$route.params.administratorId;
    },
	},
	created() {
		this.fetchInfoByYear();
	},
	methods: {
		changeType(type) {
			this.activeType = type;
			this.fetchInfoByYear()
		},

		async fetchInfoByYear() {
			try {
				let params = { administratorId: this.administratorId };
				const res = await apis.getInfoByYear(params);
				this.publicData = res.data;
			} catch(err) {
				console.error(err);
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
.analyze
	.type-box
		ul
			display flex
			width 100%
			height 50px
			border-top 1px solid #eee
			> li
				width 50%
				height 50px
				line-height 50px
				text-align center
				display flex
				align-items center
				justify-content center
				.icon
					width 16px
					height 16px
				.icon-si
					background url('..\..\..\assets\images\icon-si.png') no-repeat
					background-size contain
				.icon-xing
					background url('..\..\..\assets\images\icon-xing.png') no-repeat
					background-size contain
				.title
					margin-left 5px
			.active-type
				background linear-gradient(360deg, rgba(254, 254, 254, 1) 0%, rgba(243, 243, 243, 1) 100%)
				border-bottom 1px solid #007BFF
				.icon-si
					background-image url('..\..\..\assets\images\icon-si-active.png')
				.icon-xing
					background-image url('..\..\..\assets\images\icon-xing-active.png')
</style>
