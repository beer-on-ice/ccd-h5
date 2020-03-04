<template>
  <div class="pravice-wrapper">
    <div v-html="info"></div>
  </div>
</template>

<script>
import apis from "../../api/common";
export default {
  data() {
    return {
      info: "",
      version: ""
    };
  },
  created() {
    this.version = this.$route.query.version;
    this.getProtocolAndPolicy();
  },
  methods: {
    async getProtocolAndPolicy() {
      try {
        const res = await apis.getProtocolAndPolicy({
          version: this.version
        });
        const { code, data, msg } = res;
        if (code === 200) {
          this.info = data.policy;
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
