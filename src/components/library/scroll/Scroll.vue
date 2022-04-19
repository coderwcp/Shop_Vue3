<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot/>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { onMounted, ref } from 'vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Scroll',
  props: {
    // 决定是否监听 scroll 事件
    probeType: {
      type: Number,
      default: 0 // 表示默认不监听
    // 值为 1 时，仅仅当手指按在滚动区域上，每隔 momentumLimitTime 毫秒派发一次 scroll 事件
    // 值为 2 时，仅仅当手指按在滚动区域上，一直派发 scroll 事件，
    // 值为 3 时，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
    },
    // 是否上拉加载更多
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    let scroll
    const wrapper = ref(null)
    // 当页面一加载好实例化滚动区域对象
    onMounted(() => {
      scroll = new BScroll(wrapper.value, {
        probeType: props.probeType,
        click: true,
        pullUpLoad: props.pullUpLoad
      })

      //  滚动的位置
      if (props.probeType === 2 || props.probeType === 3) {
        scroll.on('scroll', position => {
        //  将滚动参数传递给父组件
        //   console.log(position)
          emit('scroll', position)
        })
      }

      // 上拉加载更多
      if (props.pullUpLoad) {
        scroll.on('pullingUp', () => {
          // 将上拉事件传递给父组件
          emit('pullingUp')
        })
      }
    })

    // 滚动到指定位置
    function scrollTo (x, y, time = 300) {
      scroll && scroll.scrollTo(x, y, time)
    }

    // 完成上拉加载
    function finishPullUp () {
      scroll && scroll.finishPullUp()
    }

    // 页面刷新
    function refresh () {
      scroll && scroll.refresh()
    }

    // 记录离开时候浏览的位置
    function getScrollY () {
      return scroll ? scroll.y : 0
    }

    return {
      wrapper,
      scrollTo,
      finishPullUp,
      refresh,
      getScrollY
    }
  }
}
</script>

<style scoped>

</style>
