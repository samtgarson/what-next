<template>
  <Layout>
    <FlexboxLayout alignItems="center">
      <Label flexGrow="1" id="title">Where now?</Label>
      <Tappable ref="refresh" @tap="searchAgain" v-if="showRefresh">
        <Image width="22" height="18" src="~/assets/refresh.png" />
      </Tappable>
    </FlexboxLayout>
    <Box :height="initialHeight" ref="box">
      <Chooser @height="updateHeight" />
    </Box>
    <transition name="fade">
      <StackLayout width="50%" class="back" @tap="back" v-if="showBack" orientation="horizontal">
        <Image src="~/assets/chevron.png" />
        <Label>Never mind</Label>
      </StackLayout>
    </transition>
  </Layout>
</template>

<script>
import { mapState } from 'vuex'
import Chooser from '../components/chooser'
import Tappable from '../components/tappable'
import Tweener from '../services/tweener'

export default {
  components: { Chooser, Tappable },
  data () {
    const height = 100
    return { height, initialHeight: height }
  },
  computed: mapState({
    showRefresh: state => !!state.result,
    showBack: state => !!state.params.category
  }),
  methods: {
    searchAgain () {
      this.$store.commit('searchAgain')
      this.$refs.refresh.nativeView.animate({
        rotate: 360,
        duration: 300
      })
    },
    back () {
      this.$store.commit('reset')
    },
    updateHeight (h) {
      new Tweener(this.$refs.box.nativeView, {
        from: { height: this.height },
        to: { height: h },
        ease: Tweener.easing.Quadratic.Out
      }).run()
      this.height = h
    }
  }
}
</script>

<style lang="scss" scoped>
#title {
   font-weight: 600;
   font-size: 40; 
   color: #FFFFFF;
}

.back {
  height: 20;
  margin-bottom: -20;

  Image {
    height: 12.25;
    width: 7;
  }

  Label {
    margin-left: 5;
    color: white;
    font-weight: 600;
  }
}
</style>
