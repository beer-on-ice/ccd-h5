<template>
  <div></div>
</template>

<script>
export default {
  created() {
    let userid = this.$route.params.userid;
    if (userid) {
      window.gio("setUserId", userid);
    } else {
      window.gio("clearUserId");
    }
  }
};
</script>
