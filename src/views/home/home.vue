<template>
  <div id="home">
    <nav-bar class="home-nav" ignore>
      <template v-slot:center><div>购物车</div></template>
    </nav-bar>
    <tab-control
      class="tab-control1"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick1"
      ref="tabcontrol1"
      v-show="isFixed"
    />

    <div class="wrapper">
      <scroll
        class="content"
        ref="scroll"
        :probe-type="3"
        @scroll="contentScroll"
        :pull-up-load="true"
        @pullingUp="loadMore"
      >
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
        <recommend-view :recommends="recommends" />
        <feature-view />
        <tab-control
          class="tab-control"
          :titles="['流行', '新款', '精选']"
          @tabClick="tabClick1"
          ref="tabcontrol2"
        />
        <goods-list :goods="showGoods" />
      </scroll>
    </div>

    <back-top @click="backClick" v-show="isShow" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/Homeswiper";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "@/components/common/navbar/navbar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/scroll";
import BackTop from "@/components/content/backTop/backTop";

import { getHomeMultidata, getHomeGoods } from "@/network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShow: false,
      tabcontrolOffset: 0,
      isFixed: false,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  // activated() {
  //   console.log("huodong");
  // },
  created() {
    //请求多个数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    // console.log("jiazai");
    //监听图片加载完成
    // this.$bus.$on("ItemImageLoad", () => {
    //   console.log("---");
    // });
  },

  //将create的函数转写到方法里，create里只需调用就可以了 加this是避免调用引入的
  methods: {
    //事件监听相关
    //点击切换栏
    tabClick1(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabcontrol2.currentIndex = index;
      this.$refs.tabcontrol1.currentIndex = index;
    },
    //点击返回顶部
    backClick() {
      // console.log("dianji");
      this.$refs.scroll.scrollTo(0, 0);
    },
    //滚动隐藏
    contentScroll(position) {
      // console.log(position);
      this.isShow = position.y < -1000;
      this.isFixed = 44 - position.y > this.tabcontrolOffset;
    },
    //上拉加载
    loadMore() {
      // console.log("shangla");
      this.getHomeGoods(this.currentType);
    },
    //切换兰到顶部的距离
    swiperImageLoad() {
      // console.log(this.$refs.tabcontrol.$el.offsetTop);
      this.tabcontrolOffset = this.$refs.tabcontrol2.$el.offsetTop;
    },
    //网络请求相关
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
}
.tab-control {
  /* position: relative; */
  /* top: 0px; */
  z-index: 9;
  background-color: #fff;
}
.tab-control1 {
  position: fixed;
  /* float: left; */
  /* padding: 0 20px; */
  top: 44px;
  z-index: 99;
  background-color: #fff;
}
.wrapper {
  height: calc(100% - 49px);
}
</style>