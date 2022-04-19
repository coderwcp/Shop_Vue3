<template>
  <div class="container">
    <div class="tab-control-item" :class="{active: index === currentIndex}" @click="itemClick(index)"  v-for="(item,index) in title" :key="index">
      <span> {{ item }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TabControl',
  props: {
    title: {
      type: Array,
      required: true
    }
  },
  setup (props, { emit }) {
    const currentIndex = ref(0)
    function itemClick (index) {
      currentIndex.value = index
      // 将当前点击的索引传递给父组件
      emit('tabClick', index)
    }
    return {
      itemClick,
      currentIndex
    }
  }
}
</script>

<style scoped lang="less">
.container{
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  .tab-control-item{
    flex: 1;
    span{
      padding: 5px;
    }
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px  solid var(--color-tint);
  }
}
</style>
