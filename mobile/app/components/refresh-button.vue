<template>
  <Fadeable :show="show">
    <Tappable ref="refresh" @tap="onTap">
      <Image width="22" height="18" src="~/assets/refresh.png" />
    </Tappable>
  </Fadeable>
</template>

<script>
import Tappable from './utils/tappable'
import Fadeable from './utils/fadeable'

export default {
  components: { Tappable, Fadeable },
  props: {
    show: Boolean
  },
  methods: {
    onTap () {
      this.$el.nativeView.rotate = 0
      this.$el.nativeView.animate({
        rotate: 360,
        duration: 300
      })

      this.$emit('tap')
    }
  }
}
</script>

<style>

</style>
