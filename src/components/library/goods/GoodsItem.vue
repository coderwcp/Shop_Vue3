<template>
  <div class="goods-item" @click="goodsItemClick">
    <img :src="showImage" alt="" @load="imageLoaded">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">&yen; {{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import eventBus from '@/utils/eventBus'
import { useRouter } from 'vue-router'

export default {
  name: 'GoodsItem',
  props: {
    goodsItem: {
      type: Object,
      default: () => {}
    }
  },
  setup (props, { emit }) {
    const router = useRouter()
    function goodsItemClick () {
    //  点击商品跳转对应详情页面
      console.log('跳转商品详情')
      console.log(props.goodsItem)
      router.push('/detail/' + props.goodsItem.iid)
    }
    const showImage = computed(() => {
      return props.goodsItem.image || props.goodsItem.show.img
    })

    // 获取到当前实例
    function imageLoaded () {
      // 当图片一加载完成，scroll组件则局部刷新重新计算总高度
      eventBus.$emit('imageLoaded')
    }

    return {
      showImage,
      goodsItemClick,
      imageLoaded
    }
  }
}
</script>

<style scoped lang="less">
.goods-item {
  padding-bottom: 45px;
  position: relative;
}

.goods-item img {
  width: 100%;
  border-radius: 10px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "\e64c";
  font-family: "iconfont" !important;
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
}
</style>
