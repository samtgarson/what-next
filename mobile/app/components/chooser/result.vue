<template>
  <StackLayout v-if="error">
    <Label class="area" :text="error" />
    <yellow-button @tap="reset">Try again</yellow-button>
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
    <yellow-button @tap="openWeb" v-if="url">Go there</yellow-button>
  </StackLayout>
</template>

<script>
import { openUrl } from 'utils/utils'
import { mapState } from 'vuex'
import YellowButton from '../button'
import errors from '../../constants/errors'

export default {
  name: 'Result',
  components: { YellowButton },
  methods: {
    openWeb () {
      openUrl(this.url)
    },
    reset () {
      this.$store.commit('reset')
    }
  },
  mounted () {
    if (this.v.error) {
      this.$emit('height', 120)
      this.$analyticsEvent('error', { error: this.v.error.message })
    } else {
      this.$emit('height', 375)
      this.$analyticsEvent('success', { ...this.params, result: this.v.foursquare })
    }
  },
  computed: {
    ...mapState(['params']),
    v () {
      return this.$store.state.result
    },
    url () {
      return this.v.url || this.v.foursquare
    },
    error () {
      if (!this.v.error) return false

      switch (this.v.error.message) {
        case errors.NO_RESULTS:
          return 'No results 🤷‍♀️'
        case errors.LOCATION_DENIED:
          return 'Access denied to Location Services 🙅‍♀️'
        default:
          return 'Something went wrong 😞'
      }
    },
    photoUrl () {
      if (!this.v.photo) return ''
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
</style>
