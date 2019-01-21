<template>
  <FlexboxLayout>
    <Label class="loading">🤔 Thinking...</Label>
  </FlexboxLayout>
</template>

<script>
export default {
  mounted () {
    this.$emit('height', 100)
    this.$store.dispatch('fetchResult')
  }
}
</script>

<style lang="scss" scoped>
.loading {
  width: 100%;
  font-size: 32;
  font-weight: 600;
  text-align: left;
}
</style>
