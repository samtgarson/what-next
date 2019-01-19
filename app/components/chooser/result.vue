<template>
  <StackLayout v-if="v.error">
    <Label class="area">No results 😞</Label>
    <Tappable>
      <FlexboxLayout class="button" @tap="reset">
        <Label>Try again</Label>
      </FlexboxLayout>
    </Tappable>
  </StackLayout>
  <StackLayout v-else>
    <Label class="area">{{ v.area }}</Label>
    <Label class="title">{{ v.name }}</Label>
    <FlexboxLayout class="photo">
      <Image :src="photoUrl" />
    </FlexboxLayout>
    <FlexboxLayout>
      <Label class="category">{{ v.category }}</Label>
      <Label class="distance">{{ v.distance }}m away</Label>
    </FlexboxLayout>
    <Tappable>
      <FlexboxLayout class="button" @tap="openWeb">
        <Label>Go there</Label>
      </FlexboxLayout>
    </Tappable>
  </StackLayout>
</template>

<script>
import { openUrl } from 'utils/utils'
import Tappable from '../tappable'

export default {
  components: { Tappable },
  methods: {
    openWeb () {
      openUrl(this.v.url)
    },
    reset () {
      this.$store.commit('reset')
    }
  },
  mounted () {
    this.$emit('height', this.v.error ? 120 : 375)
  },
  computed: {
    v () {
      return this.$store.state.result
    },
    photoUrl () {
      const { prefix, suffix } = this.v.photo
      return `${prefix}800x300${suffix}`
    }
  }
}
</script>

<style lang="scss" scoped>
Label {
  font-weight: 600;
  flex-grow: 1;

  &.area {
    width: 100%;
    font-size: 14;
    text-align: left;
    margin-bottom: 5;
  }

  &.title {
    width: 100%;
    text-align: left;
    font-size: 32;
  }

  &.category {
    font-size: 20;
    text-align: left;
  }

  &.distance {
    text-align: right;
    font-weight: 300;
    font-size: 20;
  }
}

.photo {
  height: 150;
  background-color: #F4F4F4;
  margin: 20 -14;

  Image {
    stretch: aspectFill;
    height: 100%;
    width: 100%;
  }
}

.button {
  height: 50;
  background-color: #FFDD48;
  border-radius: 5;
  margin: 20 0 0;
  justify-content: center;
  align-items: center;

  Label {
    font-size: 20;
    color: black;
    text-align: center;
    font-weight: 700;
  }
}
</style>
