<template>
  <transition
    @enter="enter" @leave="leave" @beforeEnter="beforeEnter"
    mode="out-in" :css="false"
  >
    <component v-on="$listeners" class="chooser" :is="currentComp" />
  </transition>
</template>

<script>
import { AnimationCurve } from 'ui/enums'
import Categories from './categories'
import Price from './price'
import Loading from './loading'
import Result from './result'

const duration = 300
const curve = AnimationCurve.easeInOut

export default {
  computed: {
    currentComp () {
      return [Categories, Price, Loading, Result][this.index]
    },
    index () {
      return this.$store.state.stage
    }
  },
  methods: {
    beforeEnter (el) {
      el.nativeView.translateX = 20
      el.nativeView.opacity = 0
    },
    async enter (el, done) {
      await el.nativeView
        .animate({
          opacity: 1,
          translate: { x: 0, y: 0 },
          duration,
          curve
        })
      done()
    },
    async leave (el, done) {
      await el.nativeView
        .animate({
          opacity: 0,
          translate: { x: -20, y: 0 },
          duration,
          curve
        })
      done()
    }
  }
}
</script>

<style lang="scss">
  .chooser Label {
    font-size: 55;
    width: percentage(1/3);
    text-align: center;
  }

  .chooser {
    flex-wrap: wrap;
    align-items: center;
    height: 100%;
    width: 100%;
  }
</style>
