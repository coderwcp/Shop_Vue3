<template>
  <div class="home-recommend">
    <div v-for="item in recommend" :key="item.acm">
      <a href="javascript:;">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommend: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
.home-recommend{
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  text-align: center;
  font-size: 12px;
  border-bottom: 8px solid #eee;
  a{
    img{
      width: 75px;
      height: 75px;
      margin-bottom: 5px;
    }
  }
}
</style>
