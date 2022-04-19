<template>
  <div id="tab-bar">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style scoped lang="less">
#tab-bar {
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  border-top: 1px solid #eee;
  box-shadow: 0 0 15px #ddd;
}
</style>
