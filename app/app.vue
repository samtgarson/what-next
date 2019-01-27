<template>
  <Page class="page" statusBarStyle="light" actionBarHidden="true">
    <FlexboxLayout class="pageLayout">
      <slot />
    </FlexboxLayout>
  </Page>
</template>

<script>
import * as firebase from 'nativescript-plugin-firebase'
import ErrorPage from './pages/error'

export default {
  errorCaptured (err) {
    console.error(err)
    this.handleError(err)
    return false
  },
  methods: {
    async handleError (err) {
      await firebase.crashlytics.sendCrashLog(err)
      await this.$showModal(ErrorPage, { fullscreen: true })
    }
  }
}
</script>

<style lang="scss">
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>

<style lang="scss" scoped>
.page {
  background: linear-gradient(to bottom, #12c2e9, #c471ed, #f64f59);
}

.pageLayout {
  padding: 20;
  flex-direction: column;
  justify-content: center;
}
</style>
