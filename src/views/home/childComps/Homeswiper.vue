<template>
  <swiper id="hy-swiper">
    <swiper-item v-for="item in banners" :key="item" class="slide">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageload" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper";

export default {
  name: "Homeswiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: false,
    };
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imageload() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style scoped>
#hy-swiper {
  overflow: hidden;
  position: relative;
  padding-top: 44px;
}
.slide {
  width: 100%;
  flex-shrink: 0;
}

.slide img {
  width: 100%;
}
</style>