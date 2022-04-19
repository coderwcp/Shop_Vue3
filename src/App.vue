<template>
  <router-view />
  <main-tab-bar />
</template>

<script>
import MainTabBar from './components/MainTabBar'
export default {
  name: 'App',
  components: { MainTabBar }
}
</script>

<style>

</style>
