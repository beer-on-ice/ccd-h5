import Vue from "vue";
import gallery from "img-vuer";

Vue.use(gallery, {
  swipeThreshold: 150, // default 100
  isIndexShow: false, // show image index, default true
  useCloseButton: true, // trigger gallery close with close button, default true
  preload: true // preload images in the same group, default true
});
