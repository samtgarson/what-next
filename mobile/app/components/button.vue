<template>
  <Tappable :inverted="true">
    <FlexboxLayout class="button" :class="{ plain, small }" @tap="$emit('tap')">
      <Label><slot /></Label>
    </FlexboxLayout>
  </Tappable>
</template>

<script>
import Tappable from './utils/tappable'

export default {
  components: { Tappable },
  props: {
    plain: Boolean,
    small: Boolean
  }
}
</script>

<style lang="scss" scoped>
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
    width: 100%;
  }

  &.plain {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &.small {
    height: 30;
    margin: 0;

    Label {
      font-size: 16;
    }
  }
}
</style>
