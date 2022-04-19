<template>
  <swiper class="home-swiper">
    <swiper-item v-for="item in banners" :key="item.acm">
      <a href="javascript:;">
        <img :src="item.image" alt="" @load="swiperLoaded" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Array,
      default: () => [{}]
    }
  },
  setup (props, { emit }) {
    const isLoad = ref(true)
    function swiperLoaded () {
      if (isLoad.value) {
        isLoad.value = false
        emit('swiperLoaded')
      }
    }
    return {
      swiperLoaded
    }
  }
}
</script>

<style lang="less" scoped>
.home-swiper {
  img {
    width: 100%;
  }
}
</style>
