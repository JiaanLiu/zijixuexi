<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "tabbar",
  data() {
    return {};
  },
};
</script>

<style scoped>
#tabbar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 14px;
  box-shadow: 0 -2px 2px rgba(0, 0, 0, 0.1);
  background-color: #f6f6f6;
  height: 49px;
  z-index: 99;
}
</style>
