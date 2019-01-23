<template>
  <FlexboxLayout>
    <Tappable
      v-for="(price, i) in prices" :key="price" @tap="setPrice(price)"
      orientation="horizontal"
    >
      <Image src="~/assets/money.png" v-for="j in i + 1" :key="j" />
    </Tappable>
  </FlexboxLayout>
</template>

<script>
import { mapMutations } from 'vuex'
import Tappable from '../utils/tappable'

const prices = [
  '1,2',
  '3',
  '4'
]

export default {
  components: { Tappable },
  data () {
    return { prices }
  },
  mounted () {
    this.$emit('height', 280)
  },
  methods: mapMutations(['setPrice'])
}
</script>

<style lang="scss" scoped>
FlexboxLayout {
  flex-direction: column;
  justify-content: space-around;
}

Image {
  width: 55;
  margin: 0 5;
}
</style>
