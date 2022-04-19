<template>
  <div class="tab-bar-item" @click="clickHandle" :class="{active: !isActive}">
    <div class="active-icon" v-if="!isActive"><slot name="active-icon"/></div>
    <div class="icon" v-else><slot name="icon"/></div>
    <div class="text"><slot name="text"/></div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'TabBarItem',
  props: {
    path: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const router = useRouter()
    const route = useRoute()
    const isActive = computed(() => {
      return route.path.indexOf(props.path)
    })
    function clickHandle () {
      router.push(props.path)
    }
    return {
      clickHandle,
      isActive
    }
  }
}
</script>

<style scoped lang="less">
.tab-bar-item{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 50px;
  &.active{
    color: var(--color-tint);
  }
  /deep/ .active-icon i,
   /deep/ .icon i
  {
    font-size: 25px;
  }
  .text{
    font-size: 12px;
    margin-top: -3px;
  }
}

</style>
