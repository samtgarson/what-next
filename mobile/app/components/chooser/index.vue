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
import { mapState } from 'vuex'
import Categories from './categories'
import Price from './price'
import Loading from './loading'
import Result from './result'
import stages from '../../constants/stages'

const duration = 300
const curve = AnimationCurve.easeInOut
const components = {
  [stages.CATEGORY]: Categories,
  [stages.PRICE]: Price,
  [stages.LOADING]: Loading,
  [stages.RESULT]: Result
}

export default {
  name: 'Chooser',
  computed: {
    ...mapState(['stage']),
    currentComp () {
      return components[this.stage]
    }
  },
  watch: {
    stage: {
      handler (screenName) {
        return this.$analyticsEvent('change_stage', {
          stage: screenName
        })
      },
      immediate: true
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
