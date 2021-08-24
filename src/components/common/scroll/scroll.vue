<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // console.log(this.$refs.wrapper);
    setTimeout(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        movable: true,
        zoom: true,
        mouseWheel: true,
        observeDOM: true,
        observeImage: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true,
      });
      if (this.probeType >= 2) {
        this.scroll.on("scroll", (position) => {
          // console.log(position);
          this.$emit("scroll", position);
        });
      }
      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          // console.log("上拉加载");
          this.$emit("pullingUp");
          setTimeout(() => {
            this.scroll.finishPullUp();
          }, 2000);
        });
      }
      // console.log(this.scroll.refresh());
    }, 200);
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  },
  watch: {
    data() {
      setTimeout(this.refresh, 20);
    },
  },
};
</script>

<style scoped>
</style>