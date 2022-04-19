<template>
  <i class="iconfont icon-top"></i>
</template>

<script>
export default {
  name: 'BackTop'
}
</script>

<style scoped>
  .icon-top{
    position: fixed;
    bottom: 75px;
    right: 25px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 25px;
    text-align: center;
    line-height: 40px;
    color: var(--color-tint);
    background-color: #fff;
    z-index: 999;
  }
</style>
