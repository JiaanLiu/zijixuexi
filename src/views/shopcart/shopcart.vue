<template>
  <div class="shopcart">
    <nav-bar class="nav">
      <template v-slot:center>
        <div>购物车({{ cartLength }})</div>
      </template>
    </nav-bar>
    <div class="wrapper">
      <scroll class="content" ref="scroll">
        <cart-list />
      </scroll>
    </div>
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/navbar.vue";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar.vue";

import Scroll from "@/components/common/scroll/scroll";
import { mapGetters } from "vuex";

export default {
  name: "Shopcart",
  components: {
    NavBar,
    CartList,
    Scroll,
    CartBottomBar,
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
  activated() {
    // console.log("----");
    this.$refs.scroll.refresh();
    // console.log(this.$refs.scroll.scroll.refresh());
  },
};
</script>

<style scoped>
.shopcart {
  height: 100vh;
}
.nav {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
}
.wrapper {
  height: calc(100% - 49px - 44px);
  /* overflow: hidden; */
}
</style>