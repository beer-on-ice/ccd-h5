<template>
  <div id="mindmap-wrapper">
    <mindmap
      ref="mindmap"
      :nodes="info.nodes"
      :connections="info.connections"
      :editable="true"
    />
  </div>
</template>

<script>
import apis from "../../api/common";
// import map from "./map";

export default {
  name: "mind-map",
  data() {
    return {
      id: "",
      info: {
        // ...map
      }
    };
  },
  created() {
    const {
      $route: {
        params: { id }
      }
    } = this;
    this.id = id;
    this.getMapData();
  },
  updated() {
    this.$refs.mindmap.renderMap();
  },
  methods: {
    async getMapData() {
      const { id } = this;
      try {
        const res = await apis.getEnterpriseAtlas({ companyId: id });
        const { code, data, msg } = res;
        if (code === 200) {
          this.info = { ...data };
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

<style lang="stylus"></style>
