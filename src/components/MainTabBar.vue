<template>
  <tab-bar class="main-tab-bar">
    <tab-bar-item v-for="(item,index) in tabInfo" :key="index" :path="item.path">
      <template #active-icon>
        <i class="iconfont" :class="item.active"></i>
      </template>
      <template #icon>
        <i class="iconfont" :class="item.icon"></i>
      </template>
      <template #text>
        <div>{{ item.text }}</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import { reactive } from '@vue/reactivity'
export default {
  name: 'MainTabBar',
  setup () {
    const tabInfo = reactive([
      {
        path: '/home',
        icon: 'icon-home',
        active: 'icon-home-fill',
        text: '首页'
      },
      {
        path: '/cate',
        icon: 'icon-shop',
        active: 'icon-shop-fill',
        text: '分类'
      },
      {
        path: '/cart',
        icon: 'icon-cart',
        active: 'icon-cart-fill',
        text: '购物车'
      },
      {
        path: '/profile',
        icon: 'icon-people',
        active: 'icon-people-fill',
        text: '我的'
      }
    ])
    return {
      tabInfo
    }
  }

}
</script>

<style scoped>
.main-tab-bar {
  background-color: #fff;
}
</style>
