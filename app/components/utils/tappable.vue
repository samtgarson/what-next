<template>
  <StackLayout v-on="$listeners" @touch="onTouch">
    <slot />
  </StackLayout>
</template>

<script>
import * as enums from 'ui/enums'

export default {
  methods: {
    onTouch ({ action }) {
      if (!['up', 'down'].includes(action)) return

      const { nativeView: view } = this.$el
      const scale = action === 'up' ? 1 : 1.15
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
