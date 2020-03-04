<template>
  <div class="activity-loc">
    <baidu-map
      class="bm-view"
      :center="{ lng: lng, lat: lat }"
      :zoom="15"
      :scroll-wheel-zoom="true"
    >
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-marker
        :position="{ lng: lng, lat: lat }"
        :dragging="false"
        animation="BMAP_ANIMATION_BOUNCE"
      >
      </bm-marker>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lng: 116.404,
      lat: 39.915
    };
  },
  created() {
    const {
      $route: {
        query: { lng, lat }
      }
    } = this;
    this.lng = lng;
    this.lat = lat;
    console.log(lng);
  }
};
</script>

<style lang="stylus" scoped src="./activityLoc.styl"></style>
