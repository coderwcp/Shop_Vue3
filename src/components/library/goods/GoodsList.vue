<template>
  <div class="goods-list">
    <goods-item
      v-for="item1 in goodsList"
      :key="item1.acm"
      :goods-item="item1"
      class="goods-item"
    />
  </div>
</template>

<script>
export default {
  name: 'GoodsList',
  props: {
    goodsList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: space-around;
  .goods-item {
    //display: flex;
    width: 48%;
  }
}
</style>
