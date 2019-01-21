<template>
  <Fadeable
    width="50%" v-on="$listeners" class="back"
    orientation="horizontal" :show="show"
  >
    <Image src="~/assets/chevron.png" />
    <Label>Never mind</Label>
  </Fadeable>
</template>

<script>
import Fadeable from './utils/fadeable'

export default {
  components: { Fadeable },
  props: {
    show: Boolean
  }
}
</script>

<style scoped lang="scss">
.back {
  height: 20;
  margin-bottom: -20;
  opacity: 0;
}

image {
  height: 12.25;
  width: 7;
}

label {
  margin-left: 5;
  color: white;
  font-weight: 600;
}
</style>
