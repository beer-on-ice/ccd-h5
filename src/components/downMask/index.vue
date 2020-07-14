<template>
  <div class="mask" v-if="showMask" @click="hide">
    <!-- <div>
        <p>点击右下角打开财查到APP</p>
        <p>查看更多内容</p>
      </div> -->

    <img src="./img/down1.png" alt="guide" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMask: false
    };
  },
  methods: {
    show() {
      this.showMask = true;
    },
    hide() {
      this.showMask = false;
    }
  }
};
</script>

<style lang="stylus" scoped src="./index.styl"></style>
