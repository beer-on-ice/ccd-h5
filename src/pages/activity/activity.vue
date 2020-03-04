<template>
  <div class="activity">
    <section class="head">
      <div class="head-box">
        <img :src="info.titlePic" />
      </div>
      <div class="head-name">{{ info.activityName }}</div>
      <div class="head-text">
        <span>规模：{{ info.numberOfParticipants }}人</span
        ><span>已有{{ info.effectiveNum }}人报名</span>
      </div>
      <div class="head-list">
        <img :src="timeUrl" />
        <span v-if="info.activityTime !== info.activityClosingTime"
          >{{ info.activityTime }} 至 {{ info.activityClosingTime }}</span
        >
        <span v-else>{{ info.activityTime }}</span>
      </div>
      <div class="head-list">
        <img :src="locUrl" />
        <span @click="goActivityMap(info)"
          >{{ info.activityArea }}{{ info.activityAddress }}</span
        >
      </div>
    </section>
    <section class="discribe">
      <div class="title">活动简介</div>
      <div v-html="info.activityIntroduce"></div>
    </section>
    <section class="discribe">
      <div class="title">其他</div>
      <p class="offical">{{ info.officialStatement }}</p>
    </section>
    <div class="order-btn" @click="order">立即预约</div>
    <order-dialog ref="orderDialog"></order-dialog>
  </div>
</template>

<script>
import orderDialog from "./components/order-dialog";
import apis from "../../api/common";

export default {
  data() {
    return {
      timeUrl: require("./../../assets/images/icon-time.png"),
      locUrl: require("./../../assets/images/icon-location.png"),
      info: {},
      id: ""
    };
  },
  components: {
    orderDialog
  },
  created() {
    const {
      $route: {
        params: { id }
      }
    } = this;
    this.id = id;
    this.appShowAppActivityInformation();
  },
  methods: {
    async appShowAppActivityInformation() {
      const { id } = this;
      try {
        const res = await apis.appShowAppActivityInformation({ id: id });
        const { code, data, msg } = res;
        if (code === 200) {
          this.info = data;
          this.info.titlePic = data.titlePic ? data.titlePic.split(";")[0] : "";
        } else {
          throw new Error(msg);
        }
      } catch ({ message }) {
        console.error(message);
      }
    },
    order() {
      this.$refs.orderDialog.show();
    },
    goActivityMap({ lng, lat }) {
      this.$router.push({
        path: `/activityLoc/${this.id}`,
        query: {
          lng,
          lat
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped src="./activity.styl"></style>
