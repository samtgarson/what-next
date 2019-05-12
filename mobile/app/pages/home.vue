<template>
  <Layout>
    <Label id="title">What next?</Label>
    <Box :height="height">
      <Chooser @height="h => height = h" />
    </Box>
    <back-button :show="showBack" @tap="reset" />
  </Layout>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Chooser from '../components/chooser'
import BackButton from '../components/back-button'
import stages from '../constants/stages'

export default {
  components: { Chooser, BackButton },
  data () {
    const height = 100
    return { height }
  },
  computed: mapState({
    showRefresh: state => !!state.result,
    showBack: state => state.stage !== stages.CATEGORY
  }),
  methods: {
    ...mapMutations(['reset'])
  }
}
</script>

<style lang="scss" scoped>
#title {
  font-weight: 600;
  font-size: 40;
  color: #ffffff;
}
</style>
