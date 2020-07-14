<template>
  <div class="rate" :class="{ disabled: disabled }">
    <span v-if="showText" class="text">{{ curScore || score }}分</span>
    <div class="star-wrap">
      <i
        v-for="(i, index) in 5"
        :key="index"
        @mouseenter="disabled ? '' : (curScore = i)"
        @mouseleave="disabled ? '' : (curScore = '')"
        @click="disabled ? '' : setScore(i)"
        :class="getClass(i)"
      >
        <span
          :class="{ full: isFull }"
          v-if="disabled && i == Math.floor(score) + 1 && !isFull"
        >
          <i class="icon-star"></i>
        </span>
      </i>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyRate",
  props: {
    // 分数，默认0，保留一位小数
    score: {
      type: Number,
      default: 0
    },
    // 是否只读，默认false，鼠标点击可以打分
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否显示分数，默认false
    showText: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      curScore: "",
      isFull: true
    };
  },
  created: function() {
    this.getDecimal();
  },
  methods: {
    getClass(i) {
      if (this.curScore === "") {
        return i <= this.score ? "icon-star" : "icon-star-o";
      } else {
        return i <= this.curScore ? "icon-star" : "icon-star-o";
      }
    },
    getDecimal() {
      let reg = /^\d+$/;
      this.isFull = reg.test(this.score);
    },
    setScore(i) {
      this.$emit("update:score", i);
    }
  }
};
</script>
<style lang="stylus" scoped src="./index.styl"></style>
