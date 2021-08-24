<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="item"
      class="tab-control-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  position: sticky;
  top: 44px;
  width: 100%;
  z-index: 2;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
  /* color: #ff5777; */
}
.active span {
  border-bottom: 3px solid var(--color-tint);
  padding: 5px;
}
</style>