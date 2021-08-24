<template>
  <div id="category">
    <nav-bar class="nav-bar">
      <template v-slot:center><div>分类</div></template>
    </nav-bar>
    <div class="content">
      <tab-menu
        :categories="categories"
        @selectItem="selectItem"
        class="menu"
      />
      <div class="wrappe">
        <scroll
          id="tab-content"
          :probe-type="3"
          @scroll="contentScroll"
          ref="scroll"
        >
          <div>
            <tab-content-category :subcategories="showSubcategory" />
            <tab-control
              :titles="['综合', '新品', '销量']"
              @tabClick="tabClick"
            />
            <goods-list :goods="showCategoryDetail" />
          </div>
        </scroll>
      </div>
      <back-top @click="backClick" v-show="isShow" />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/navbar.vue";

import TabMenu from "./childComps/TabMenu.vue";
import TabContentCategory from "./childComps/TabContentCategory.vue";

import Scroll from "@/components/common/scroll/scroll";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "@/network/category";
import { POP, SELL, NEW } from "@/common/const";
import { tabControlMixin, backTopMixin } from "@/common/mixin";

export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    TabContentCategory,
    Scroll,
    TabControl,
    GoodsList,
  },
  mixins: [tabControlMixin, backTopMixin],
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
    };
  },
  created() {
    // 1.请求分类数据
    this._getCategory();

    // 2.监听图片加载完成
    // this.$bus.$on("imgLoad", () => {
    //   this.$refs.scroll.refresh();
    // });
  },
  methods: {
    _getCategory() {
      getCategory().then((res) => {
        // 1.获取分类数据
        this.categories = res.data.category.list;
        // console.log(res);
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0);
      });
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then((res) => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail(POP);
        this._getCategoryDetail(SELL);
        this._getCategoryDetail(NEW);
      });
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then((res) => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
    /**
     * 事件响应相关的方法
     */
    selectItem(index) {
      this._getSubcategories(index);
    },
    contentScroll(position) {
      this.isShow = position.y < -1000;
    },
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
};
</script>

<style scoped>
#category {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
  z-index: 999;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
}

.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  display: flex;
}

.wrappe {
  /* height: calc(100% - 49px); */
  height: 100%;
}
#tab-content {
  flex: 1;
  height: 100%;
}
</style>