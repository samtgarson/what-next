<template>
  <FlexboxLayout flexDirection="column">
    <slot name="header" v-bind="scope" />
    <WebView
      v-if="url"
      :src="url"
      ref="web"
      flexGrow="1"
      @loadStarted="onStartedNavigating"
      @loadFinished="onFinishedNavigating"
    />
    <slot name="footer" v-bind="scope" />
  </FlexboxLayout>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data () {
    return { loaded: false, scope: {} }
  },
  methods: {
    load () {
      this.scope = {
        goBack: this.goBack.bind(this),
        goForward: this.goForward.bind(this),
        reload: this.reload.bind(this),
        stop: this.stop.bind(this),
        loading: false
      }
      this.loaded = true
    },
    onStartedNavigating ({ url }) {
      if (!this.loaded) this.load()
      this.scope.url = url
      this.scope.canGoBack = this.$refs.web.nativeView.canGoBack
      this.scope.canGoForward = this.$refs.web.nativeView.canGoForward
      this.scope.loading = true
    },
    onFinishedNavigating () {
      this.scope.loading = false
    },
    goBack () {
      this.$refs.web.nativeView.goBack()
    },
    goForward () {
      this.$refs.web.nativeView.goForward()
    },
    reload () {
      this.$refs.web.nativeView.reload()
    },
    stop () {
      this.$refs.web.nativeView.stopLoading()
    }
  }
}
</script>

<style>

</style>
