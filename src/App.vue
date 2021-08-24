<template>
  <div id="nav">
    <main-tab-bar v-if="$route.meta.footShow"></main-tab-bar>

    <router-view v-slot="{ Component }">
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import MainTabBar from "@/components/content/Maintabbar";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import url(./assets/css/base.css);
</style>
