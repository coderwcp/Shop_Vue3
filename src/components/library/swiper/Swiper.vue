<template>
  <div id="my-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <!-- 默认插槽 -->
      <slot/>
    </div>
    <slot name="indicator" />
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <div class="indi-item"
             v-for="(item, index) in slideCount"
             :key="index"
             :class="{active: index === (currentIndex - 1)}"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Swiper',
  props: {
    // 间隔 3000ms 切换下一张
    interval: {
      type: Number,
      default: 3000
    },
    // 动画执行 300ms 时长
    animDuration: {
      type: Number,
      default: 300
    },
    // 当左右滑动 1/4 时切换
    moveRatio: {
      type: Number,
      default: 0.25
    },
    // 指示器的显示
    showIndicator: {
      type: Boolean,
      default: true
    }
  },

  setup (props, { emit }) {
    // 当页面挂载完成
    onMounted(() => {
      // console.log(1)
      window.setTimeout(() => {
        // 操作DOM，前后分别添加后前的slide
        // console.log(2)
        handleDom()
        // 开启定时器才能滚动
        startTimer()
      }, 500)
    })

    // 定义所需要的数据
    const slideCount = ref(0) // 轮播图与指示器的个数
    const totalWidth = ref(0) // 整个轮播图的宽度
    let swiperStyle = {} // swiper 的样式
    const currentIndex = ref(1) // 当前显示的索引
    const scrolling = ref(false) // 是否在滚动，在滚动则清除定时器

    let timer // 定时器
    // 开启定时器
    function startTimer () {
      timer = window.setInterval(() => {
        currentIndex.value++
        scrollContent(-currentIndex.value * totalWidth.value)
      }, props.interval)
    }

    // 停止定时器
    function stopTimer () {
      window.clearInterval(timer)
    }

    // 滚动到正确的位置
    // currentPosition 根据 索引计算出的正确位置
    function scrollContent (currentPosition) {
      // 1.当函数调用时 将滚动设置为 true
      scrolling.value = true

      // 2.开始滚动动画 利用 css3 中的过渡
      swiperStyle.transition = 'transform ' + props.animDuration + 'ms'
      setTransform(currentPosition)
      // 3.判断滚动到的位置
      checkPosition()

      // 4.滚动完成
      scrolling.value = false
    }

    // 位置校验
    function checkPosition () {
      window.setTimeout(() => {
        // 1.校验正确的位置
        swiperStyle.transition = '0ms'
        // 判断左右边界情况
        if (currentIndex.value >= slideCount.value + 1) {
          currentIndex.value = 1
          setTransform(-currentIndex.value * totalWidth.value)
        } else if (currentIndex.value <= 0) {
          currentIndex.value = slideCount.value
          setTransform(-currentIndex.value * totalWidth.value)
        }

        //  2.结束移动后的回调，移动结束后执行 index - 1 显示下一张
        emit('transitionEnd', currentIndex.value - 1)
      }, props.animDuration)
    }

    // 设置滚动的位置
    function setTransform (position) {
      // 根据传入的 距离 水平X轴移动
      swiperStyle.transform = `translate3d(${position}px, 0, 0)`
    }

    // 操作 DOM，在 DOM 前后添加 slide
    function handleDom () {
      // 1.获取要操作的元素，绑定 swiper 核心容器
      const swiperEL = document.querySelector('.swiper')
      // 获取所有的轮播图
      const slidesEls = swiperEL.getElementsByClassName('slide')
      // 2.保存个数
      slideCount.value = slidesEls.length

      // 3.如果图片张数大于1，在前后分别添加一个slide，实现无缝滚动
      if (slideCount.value > 1) {
        // 克隆第一涨图片
        const cloneFrist = slidesEls[0].cloneNode(true)
        // 克隆第二张图片
        const cloneLast = slidesEls[slideCount.value - 1].cloneNode(true)

        // 在前面添加克隆好的最后一张图
        swiperEL.insertBefore(cloneLast, slidesEls[0])
        // 在后面添加克隆好的第一张图
        swiperEL.appendChild(cloneFrist)

        // 重新计算轮播图的总宽度
        totalWidth.value = swiperEL.offsetWidth
        // 重新获取当前主容器的样式
        swiperStyle = swiperEL.style
      }

      // 4.让主容器显示第一个（目前是显示前面添加的最后一个元素）
      setTransform(-totalWidth.value)
    }

    // 拖动事件的处理
    let startX
    function touchStart (e) {
      // 1.如果正在滚动，则不易拖动
      if (scrolling.value) return

      // 2.不在滚动，按下时停止定时器
      stopTimer()

      // 3.保存第一个手指按下的位置
      startX = e.touches[0].pageX
    }

    let distance
    let currentX
    function touchMove (e) {
      // 当移动的时候，获取用户第一个手指拖动的位置
      currentX = e.touches[0].pageX
      // 计算手指在屏幕上移动的距离
      distance = currentX - startX

      // 根据当前索引计算正确位置
      const currentPosition = -currentIndex.value * totalWidth.value

      // 计算主容器整体的位置
      const moveDistance = distance + currentPosition

      //  设置当前移动的位置，即图片跟随手指移动
      setTransform(moveDistance)
    }
    function touchEnd (e) {
    //  获取移动的距离，取正值，判断是回弹还是移动下一张
      const currentMove = Math.abs(distance)

      //  判断距离
      if (distance === 0) {
      //  没有移动，则不执行任何操作

      } else if (distance > 0 && currentMove > totalWidth.value * props.moveRatio) {
      //  当移动的距离大于 0（证明用户手指是向右移动，应该显示前一张），且 大于屏幕的 1/4
        currentIndex.value--
      } else if (distance < 0 && currentMove > totalWidth.value * props.moveRatio) {
      //  当移动的距离小于 0（证明用户手指是向左移动，应该显示后一张），且 大于屏幕的 1/4
        currentIndex.value++
      }

      //  移动到最新 currentIndex 对应的位置
      scrollContent(-currentIndex.value * totalWidth.value)

      //  移动完成后重新开启定时器
      startTimer()
    }

    return {
      touchStart,
      touchMove,
      touchEnd,
      slideCount,
      currentIndex
    }
  }
}
</script>

<style scoped lang="less">
#my-swiper{
  overflow: hidden;
  position: relative;
  .swiper{
    display: flex;
  }
  .indicator{
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
    .indi-item{
      box-sizing: border-box;
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background-color: #fff;
      line-height: 8px;
      text-align: center;
      font-size: 12px;
      margin: 0 5px;
    }
    .active {
      background-color: #D43E2EFF !important;
    }
  }
}
</style>
