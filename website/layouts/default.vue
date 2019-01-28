<template>
  <main>
    <div class="container">
      <nuxt-link to="/"><img src="~/assets/icon.png" height="83.5px" width="83.5px" /></nuxt-link>
      <nuxt />
    </div>
    <div class="footer">
      <nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link>
    </div>
  </main>
</template>

<script>
export default {
}
</script>

<style lang="scss">
main {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  min-height: 100vh;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;

  .container {
    width: 100%;
    max-width: 700px;
    margin: 3vw auto 10vw;

    img {
      margin-bottom: 3vw;
    }
  }
}

a {
  color: black;
}

.footer {
  margin-bottom: 3vw;
}
</style>
