<template>
  <StackLayout class="box" :height="initialHeight">
    <slot />
  </StackLayout>
</template>

<script>
import Tweener from '../services/tweener'

export default {
  data () {
    return { previousHeight: this.height, initialHeight: this.height }
  },
  props: {
    height: {
      type: Number,
      default: 0
    }
  },
  watch: {
    height (h) {
      new Tweener(this.$el.nativeView, {
        from: { height: this.previousHeight },
        to: { height: h },
        ease: Tweener.easing.Quadratic.Out
      }).run()
      this.previousHeight = h
    }
  }
}
</script>

<style lang="scss" scoped>
  .box {
    background-color: white;
    border-radius: 10;
    padding: 14 14;
    margin: 20 -6;
  }
</style>
