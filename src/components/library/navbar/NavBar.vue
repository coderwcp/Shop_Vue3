<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"/></div>
    <div class="center"><slot name="center"/></div>
    <div class="right"><slot name="right"/></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped lang="less">
.nav-bar{
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  border-bottom: 1px solid #eee;
  box-shadow: 0 0 15px #ddd;
  background-color: var(--color-tint);
  .left,.right{
    width: 50px;
    height: 100%;
  }
  .center{
    flex: 1;
    height: 100%;
    text-align: center;
    line-height: 44px;
    font-size: 17px;
    color: #fff;
  }
}
</style>
