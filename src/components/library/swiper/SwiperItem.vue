<template>
  <div class="slide">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'SwiperItem'
}
</script>

<style scoped lang="less">
.slide{
  width: 100%;
  flex-shrink: 0;
}

/deep/.slide img{
  width: 100%;
}
</style>
