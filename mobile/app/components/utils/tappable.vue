<template>
  <StackLayout v-on="$listeners" @touch="onTouch">
    <slot />
  </StackLayout>
</template>

<script>
import * as enums from 'ui/enums'

export default {
  props: {
    inverted: Boolean
  },
  methods: {
    onTouch ({ action }) {
      if (!['up', 'down'].includes(action)) return

      const modifier = this.inverted ? 0.9 : 1.1
      const { nativeView: view } = this.$el
      const scale = action === 'up' ? 1 : modifier
      view.animate({
        scale: { x: scale, y: scale },
        curve: enums.AnimationCurve.easeOut,
        duration: 100
      })
    }
  }
}
</script>

<style>
</style>
