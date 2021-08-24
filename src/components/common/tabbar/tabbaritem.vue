<template>
  <div class="tabbaritem" @click="btnClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "tabbaritem",
  props: {
    link: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.link) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    btnClick() {
      this.$router.replace(this.link).catch((err) => err);
    },
  },
};
</script>

<style scoped>
.tabbaritem {
  flex: 1;
}
/* .tabbaritem img {
  height: 24px;
  width: 24px;
  margin: 5px 0 -2px;
} */
/* .active {
  color: red;
} */
</style>
