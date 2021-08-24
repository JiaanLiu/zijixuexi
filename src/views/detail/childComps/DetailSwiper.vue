<template>
  <swiper id="hy-swiper">
    <swiper-item v-for="item in topImages" :key="item" class="slide">
      <img :src="item" alt="" />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style scoped>
#hy-swiper {
  overflow: hidden;
  position: relative;
  height: 300px;
  /* padding-top: 44px; */
}
.slide {
  width: 100%;
  flex-shrink: 0;
}

.slide img {
  width: 100%;
  margin-top: -50px;
}
</style>