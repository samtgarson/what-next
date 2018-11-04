<template>
  <Page class="page" statusBarStyle="light" actionBarHidden="true">
    <ActionBar title="My App" />
    <FlexboxLayout class="pageLayout">
      <slot />
    </FlexboxLayout>
  </Page>
</template>

<script>
export default {}
</script>

<style lang="scss">
@keyframes fadeIn {
  from { opacity: 0 }
  to { opacity: 1 }
}

@keyframes fadeOut {
  from { opacity: 1 }
  to { opacity: 0 }
}

.fade-enter-to {
  animation: fadeIn 200ms ease-in-out both;
}

.fade-leave-to {
  animation: fadeOut 200ms ease-in-out both;
}
</style>

<style lang="scss" scoped>
.page {
  background: linear-gradient(to bottom, #12C2E9, #C471ED, #F64F59);
}

.pageLayout {
  padding: 20;
  flex-direction: column;
  justify-content: center;
}
</style>
