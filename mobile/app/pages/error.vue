<template>
  <Page class="page" statusBarStyle="light">
    <FlexboxLayout class="layout">
      <Image :src="`~/assets/icon/icon-40`" />
      <label class="title">This is embarrassing.</label>
      <label class="subtitle">Something unexpected happened.</label>
      <yellow-button @tap="$modal.close">Try again</yellow-button>
    </FlexboxLayout>
  </Page>
</template>

<script>
import YellowButton from '../components/button'

export default {
  components: { YellowButton },
  mounted () {
    this.$store.commit('reset')
  }
}
</script>

<style lang="scss" scoped>
.page {
  background-color: white;
  height: 100%;
  width: 100%;
}

.layout {
  flex-direction: column;
  justify-content: center;
  padding: 20;
  text-align: center;
}

Image {
  height: 40;
  margin-bottom: 100;
}

.title {
  font-size: 30;
  margin-bottom: 15;
}

.subtitle {
  margin-bottom: 30
}
</style>
