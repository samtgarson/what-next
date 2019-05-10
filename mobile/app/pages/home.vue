<template>
  <Layout>
    <FlexboxLayout alignItems="center">
      <Label flexGrow="1" id="title">What next?</Label>
      <refresh-button @tap="searchAgain" :show="showRefresh" />
    </FlexboxLayout>
    <Box :height="height">
      <Chooser @height="h => height = h" />
    </Box>
    <back-button :show="showBack" @tap="reset" />
  </Layout>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Chooser from '../components/chooser'
import RefreshButton from '../components/refresh-button'
import BackButton from '../components/back-button'
import stages from '../constants/stages'

export default {
  components: { Chooser, RefreshButton, BackButton },
  data () {
    const height = 100
    return { height }
  },
  computed: mapState({
    showRefresh: state => !!state.result,
    showBack: state => state.stage !== stages.CATEGORY
  }),
  methods: {
    ...mapMutations(['searchAgain', 'reset'])
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
