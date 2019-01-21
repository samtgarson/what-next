<template>
  <StackLayout v-on="$listeners" v-bind="$attrs">
    <slot />
  </StackLayout>
</template>

<script>
import Tweener from '../../services/tweener'

export default {
  props: {
    show: Boolean,
    duration: {
      type: Number,
      default: 200
    }
  },
  mounted () {
    this.$el.nativeView.opacity = this.show ? 1 : 0
  },
  watch: {
    show (s) {
      this.fade(s)
    }
  },
  methods: {
    fade (fadeIn) {
      new Tweener(this.$el.nativeView, {
        from: { opacity: fadeIn ? 0 : 1 },
        to: { opacity: fadeIn ? 1 : 0 },
        ease: Tweener.easing.Quadratic.Out,
        duration: this.duration
      }).run()
    }
  }
}
</script>
