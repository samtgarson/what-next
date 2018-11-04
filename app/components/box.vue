<template>
  <StackLayout class="box" ref="box">
    <slot />
  </StackLayout>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
  .box {
    background-color: white;
    border-radius: 10;
    padding: 14 14;
    margin: 20 -6;
  }
</style>
