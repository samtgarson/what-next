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
