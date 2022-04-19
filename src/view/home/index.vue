<template>
  <div class="page-home">
    <nav-bar>
      <template #center> 购物街 </template>
    </nav-bar>
    <tab-control
      ref="copyTabControl"
      v-show="showCopyTabControl"
      :title="['流行', '新款', '精选']"
      @tabClick="tabClickHandle"
      class="tab-control"
    />

    <scroll
      class="content"
      :probe-type="2"
      :pull-up-load="true"
      @pullingUp="pullingUpHandle"
      ref="scroll"
      @scroll="scrollHandle"
    >
      <home-swiper :banners="banners" @swiperLoaded="swiperLoaded" />
      <home-recommend :recommend="recommend" />
      <home-feature />
      <tab-control
        ref="mianTabControl"
        :title="['流行', '新款', '精选']"
        @tabClick="tabClickHandle"
      />
      <goods-list class="goods-list" :goods-list="showGoods" />
      <div class="end" v-show="isEnd">亲，没有更多了</div>
    </scroll>
    <back-top @click="backTopHandle" v-show="showBackTop" />
  </div>
</template>

<script>
import { reactive, ref, computed } from 'vue'
import { getMutidata, getGoods } from '@/api/home'
import eventBus from '@/utils/eventBus'
import HomeSwiper from './components/HomeSwiper'
import HomeFeature from './components/HomeFeature'
import HomeRecommend from './components/HomeRecommend'

export default {
  name: 'PageHome',
  components: { HomeSwiper, HomeRecommend, HomeFeature },
  setup () {
    const banners = ref([])
    const recommend = ref([])
    const copyTabControl = ref(null)
    const mianTabControl = ref(null)
    const currentType = ref('pop')
    const scroll = ref(null)
    const showCopyTabControl = ref(false)
    const showBackTop = ref(false)
    const goods = reactive({
      pop: { list: [], page: 0 },
      new: { list: [], page: 0 },
      sell: { list: [], page: 0 }
    })
    const isEnd = ref(false)
    const showGoods = computed(() => {
      return goods[currentType.value].list
    })
    getMutidata().then(({ data }) => {
      banners.value = data.banner.list
      recommend.value = data.recommend.list
    })
    getGoodsHandle('pop')
    getGoodsHandle('new')
    getGoodsHandle('sell')
    function getGoodsHandle (type) {
      const page = goods[type].page + 1
      getGoods(type, page).then(({ data }) => {
        if (!data.list.length) {
          isEnd.value = data.isEnd
        }
        goods[type].list.push(...data.list)
        goods[type].page += 1
        scroll.value && scroll.value.finishPullUp()
      })
    }

    eventBus.$on('imageLoaded', () => {
      scroll.value && scroll.value.refresh()
    })

    function tabClickHandle (index) {
      switch (index) {
        case 0:
          currentType.value = 'pop'
          break
        case 1:
          currentType.value = 'new'
          break
        case 2:
          currentType.value = 'sell'
          break
      }
      copyTabControl.value.currentIndex = copyTabControl.value.currentIndex = index
    }

    function pullingUpHandle () {
      getGoodsHandle(currentType.value)
      console.log('上拉加载更多')
    }

    let mianTabControlOffsetTop
    function scrollHandle (position) {
      const { y } = position
      showCopyTabControl.value = mianTabControlOffsetTop < -y
      showBackTop.value = -y > 1000
    }
    function swiperLoaded () {
      mianTabControlOffsetTop = mianTabControl.value.$el.offsetTop
    }
    function backTopHandle () {
      scroll.value.scrollTo(0, 0)
    }

    return {
      banners,
      recommend,
      copyTabControl,
      mianTabControl,
      scroll,
      showCopyTabControl,
      showBackTop,
      currentType,
      isEnd,
      showGoods,
      tabClickHandle,
      pullingUpHandle,
      scrollHandle,
      swiperLoaded,
      backTopHandle
    }
  }
}
</script>

<style lang="less" scoped>
.tab-control {
  position: absolute;
  top: 43px;
  right: 0;
  left: 0;
  z-index: 2;
  background-color: #fff;
}
.content {
  overflow: hidden;
  height: calc(100vh - 94px);
  position: absolute;
  top: 43px;
  background-color: #fff;
}
.end {
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.goods-list{
  min-height: 1000px;
  background-color: pink;
}
</style>
