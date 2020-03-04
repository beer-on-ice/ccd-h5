<template>
  <div id="q-app" class="app">
    <transition
      appear
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutLeft"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {},
  methods: {}
};
</script>

<style>
html {
  width: 100%;
  height: 100%;
  background: #fff;
  overflow-x: hidden;
}
body {
  min-height: unset;
}
</style>
