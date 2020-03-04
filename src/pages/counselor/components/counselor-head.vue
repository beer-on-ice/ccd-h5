<template>
  <div class="counselor">
    <div class="counselor-headbox">
      <div class="counselor-bg">
        <img
          class="counselor-shadow"
          :src="require('./../img/shadow.png')"
          alt="shadow"
        />
        <img v-if="info.backgroundUrl" :src="info.backgroundUrl" alt="BG" />
        <img v-else :src="defaultBgUrl" alt="BG" />
      </div>
      <div class="counselor-head">
        <div class="head-img">
          <img v-if="info.headUrl" :src="info.headUrl" alt="avatar" />
          <img v-else :src="defaultHeadUrl" alt="avatar" />
        </div>
        <div class="head-textbox">
          <div style="display:flex;align-items:center;">
            <span>
              {{ info.adviserName }}
            </span>
            <img
              src="../../../assets/images/v@2x.png"
              alt="认证"
              v-if="+info.adviserIdentification"
            />
          </div>
          <div>{{ info.currentPosition }} · {{ info.jobRange }}</div>
          <div>{{ info.belongToCompany }}</div>
        </div>
      </div>
    </div>
    <div class="head-phone" @click="showPhoneList"></div>
  </div>
</template>

<script>
export default {
  props: ["info"],
  data() {
    return {
      defaultBgUrl: require("./../img/defaultBg.png"),
      defaultHeadUrl: require("./../img/defaultHead.png")
    };
  },
  methods: {
    showPhoneList() {
      this.$emit("showPhoneList");
    }
  }
};
</script>

<style lang="stylus" scoped>
.counselor
	.head-phone
		width 26px;
		height 26px;
		border-radius 50%;
		background url('../../../assets/images/phone@2x.png') no-repeat;
		background-size contain;
		position absolute;
		right 20px;
		top 220px;
	&-headbox
		position relative;
	&-bg
		position relative;
		height 225px;
		img
			width 100%;
			height 225px;
			position relative;
			z-index -2;
		.counselor-shadow
			position absolute;
			top 136px;
			left 0;
			width 100%;
			height 100%;
			z-index -1;
	&-head
		height 100px;
		width 100%;
		background #fff;
		position absolute;
		border-bottom 1px solid #EEEEEE;
		.head-img
			width 84px;
			height 84px;
			border 2px solid #fff;
			border-radius 50%;
			position absolute;
			left 30px;
			top -60px;
			> img
				width 100%;
				height 100%;
				border-radius 50%;
		.head-textbox
			margin-left 130px;
			> div:first-child
				font-size 20px;
				font-weight bold;
				display flex;
				align-items center;
				> span
					display inline-block;
					overflow hidden;
					text-overflow ellipsis;
					white-space nowrap;
				> img
					width 20px;
					vertical-align middle;
					margin-left 5px;
			> div:nth-child(2), >div:last-child
				font-size 13px;
				color #999999;
				margin-top 5px;
	&-head::before
		content '';
		position absolute;
		width 0;
		height 0;
		border-bottom 180px solid #fff;
		border-left 650px solid transparent;
		top -179px;
</style>
