<template>
  <div ignore>
    <tab-bar>
      <tab-bar-item link="/home" activeColor="pink">
        <template v-slot:item-icon
          ><img src="@/assets/img/tabbar/home.svg" alt=""
        /></template>
        <template v-slot:item-icon-active>
          <img src="@/assets/img/tabbar/home_active.svg" alt=""
        /></template>
        <template v-slot:item-text> <div>首页</div></template>
      </tab-bar-item>
      <tab-bar-item link="/category">
        <template v-slot:item-icon>
          <img src="@/assets/img/tabbar/category.svg"
        /></template>
        <template v-slot:item-icon-active>
          <img src="@/assets/img/tabbar/category_active.svg"
        /></template>
        <template v-slot:item-text> <div>分类</div></template>
      </tab-bar-item>
      <tab-bar-item link="/shopcart">
        <template v-slot:item-icon>
          <img src="@/assets/img/tabbar/shopcart.svg"
        /></template>
        <template v-slot:item-icon-active>
          <img src="@/assets/img/tabbar/shopcart_active.svg"
        /></template>
        <template v-slot:item-text> <div>购物车</div></template>
      </tab-bar-item>
      <tab-bar-item link="/profile">
        <template v-slot:item-icon>
          <img src="@/assets/img/tabbar/profile.svg" alt=""
        /></template>
        <template v-slot:item-icon-active>
          <img src="@/assets/img/tabbar/profile_active.svg"
        /></template>
        <template v-slot:item-text> <div>我的</div></template>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "@/components/common/tabbar/tabbar";
import TabBarItem from "@/components/common/tabbar/tabbaritem";
export default {
  name: "MainTabBarItem",

  components: {
    TabBar,
    TabBarItem,
  },
};
</script>
<style scoped>
.tabbaritem img {
  height: 24px;
  width: 24px;
  margin: 5px 0 -2px;
}
</style>