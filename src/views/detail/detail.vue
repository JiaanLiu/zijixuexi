<template>
  <div id="detail">
    <detail-nav-bar class="detailhead" @titleClick="titleClick" ref="nav" />
    <div class="wrapper">
      <scroll ref="scroll" :probe-type="3" @scroll="contentScroll">
        <detail-swiper :top-images="topImages" />
        <detail-base-info :goods="goods" />
        <detail-shop-info :shop="shop" />
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
        <detail-param-info ref="param" :param-info="paramInfo" />
        <detail-comment-info ref="comment" :comment-info="commentInfo" />
        <goods-list ref="recommeds" :goods="recommends" />
      </scroll>
    </div>
    <detail-bottom-bar @addCard="addToCard" />
    <back-top @click="backClick" v-show="isShow" />
    <toast :message="message" :show="show" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "@/network/detail";
import Scroll from "@/components/common/scroll/scroll.vue";
import GoodsList from "@/components/content/goods/GoodsList";

import { backTopMixin } from "@/common/mixin";
import { mapActions } from "vuex";
import Toast from "@/components/content/toast/toast.vue";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      message: "",
      show: false,
    };
  },
  mixins: [backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    Toast,
  },
  created() {
    this.iid = this.$route.params.iid;
    //请求详情数据
    getDetail(this.iid).then((res) => {
      const date = res.result;
      //顶部轮播图数据
      this.topImages = date.itemInfo.topImages;
      // console.log(res);
      //基本信息
      this.goods = new Goods(
        date.itemInfo,
        date.columns,
        date.shopInfo.services
      );
      //商品信息
      this.shop = new Shop(date.shopInfo);
      // console.log(this.shop.name);
      //商品图片信息
      this.detailInfo = date.detailInfo;
      //商品参数信息
      this.paramInfo = new GoodsParam(
        date.itemParams.info,
        date.itemParams.rule
      );
      //评论信息
      if (date.rate.list) {
        this.commentInfo = date.rate.list[0];
      }
    });
    //请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
      // console.log(res);
    });
  },
  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommeds.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.themeTopYs.length;

      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
          // console.log(this.themeTopYs);
        }
      }
      //隐藏返回按钮
      this.isShow = position.y < -1000;
    },
    addToCard() {
      // console.log("detailgouwu");
      const produce = {};
      produce.image = this.topImages[0];
      produce.title = this.goods.title;
      produce.desc = this.goods.desc;
      produce.price = this.goods.realPrice;
      produce.iid = this.iid;

      this.addCart(produce).then((res) => {
        this.show = true;
        this.message = res;
        // console.log(this.show);
        setTimeout(() => {
          this.show = false;
          this.message = "";
          // console.log(this.show);
        }, 1500);

        // this.$toast.show(res);
      });
    },
  },

  // mounted() {
  //   setTimeout(() => {
  //     console.log(this.shop);
  //     console.log(this.detailInfo);
  //   }, 300);
  // },
};
</script>

<style scoped>
#detail {
  height: 100vh;
}
.detailhead {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.wrapper {
  height: calc(100% - 49px);
}
</style>

