<template>
  <div class="report-wrapper">
    <section class="report-top">
      <h1>{{ info.title }}</h1>
      <div>
        <span>{{ info.sourceFrom }}</span>
        <span>{{ info.releaseDate }}</span>
      </div>
    </section>
    <!-- <section class="report-middle">
			<img :src="info.covePicturePath"
				alt="占位" />
		</section> -->
    <section class="report-bottom">
      <p v-html="info.content"></p>
    </section>
  </div>
</template>

<script>
import apis from "../../api/common";
export default {
  data() {
    return {
      id: "",
      info: {}
    };
  },
  created() {
    const {
      $route: {
        params: { id }
      }
    } = this;
    this.id = id;
    this.fetchReportData();
  },
  methods: {
    async fetchReportData() {
      const { id } = this;
      try {
        const res = await apis.getReportById({ id: id });
        const { code, data, msg } = res;
        if (code === 200) {
          this.info = data;
        } else {
          throw new Error(msg);
        }
      } catch ({ message }) {
        console.error(message);
      }
    }
  }
};
</script>

<style lang="stylus" scoped src="./index.styl"></style>
