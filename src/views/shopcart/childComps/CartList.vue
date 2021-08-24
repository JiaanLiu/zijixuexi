<template>
  <div class="cartlist">
    <cart-list-item
      v-for="(item, index) in cartList"
      :key="index"
      :itemInfo="item"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  components: { CartListItem },
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>

<style scoped>
/* .cartlist {
  height: 100%;
} */
</style>