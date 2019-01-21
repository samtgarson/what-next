<template>
  <FlexboxLayout columns="*, *, *" rows="*, *">
    <Tappable
      v-for="category in categories"
      class="category"
      :key="category"
      @tap="setCategory(category)"
    >
      <Image :src="`~/assets/${category}.png`" />
    </Tappable>
  </FlexboxLayout>
</template>

<script>
import { mapMutations } from 'vuex'
import Tappable from '../utils/tappable'

const categories = [
  'food',
  'drinks',
  'coffee',
  'shops',
  'arts',
  'outdoors'
]

export default {
  components: { Tappable },
  data () {
    return { categories }
  },
  mounted () {
    this.$emit('height', 200)
  },
  methods: {
    ...mapMutations(['setCategory'])
  }
}
</script>

<style lang="scss" scoped>
.category {
  width: 33%;

  Image {
    width: 55;
  }
}
</style>
