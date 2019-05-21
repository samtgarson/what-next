<template>
  <Frame>
    <Page>
      <StackLayout>
        <custom-browser v-if="url" :url="url" height="100%">
          <StackLayout slot-scope="s" slot="header" class="header">
            <Label>{{ s.url | urlify }}</Label>
          </StackLayout>
          <FlexboxLayout
            justifyContent="space-between"
            class="footer"
            slot-scope="s"
            slot="footer"
            alignItems="center"
          >
            <btn @tap="close" :small="true" class="done">Done</btn>
            <StackLayout orientation="horizontal" class="nav">
              <Tappable @tap="s.stop" v-if="s.loading">
                <Image src="~/assets/browser/stop.png" />
              </Tappable>
              <Tappable @tap="s.reload" v-else>
                <Image src="~/assets/browser/refresh.png" />
              </Tappable>
              <Tappable @tap="s.goBack">
                <Image :class="{ disabled: !s.canGoBack }" src="~/assets/browser/back.png" />
              </Tappable>
              <Tappable @tap="s.goForward">
                <Image :class="{ disabled: !s.canGoForward }" src="~/assets/browser/forward.png" />
              </Tappable>
            </StackLayout>
          </FlexboxLayout>
        </custom-browser>
      </StackLayout>
    </Page>
  </Frame>
</template>

<script>
import URL from 'url'
import CustomBrowser from './custom-browser'
import Tappable from '../utils/tappable'
import Btn from '../button'

export default {
  components: { CustomBrowser, Btn, Tappable },
  props: {
    url: {
      type: String,
      required: true
    }
  },
  filters: {
    urlify (txt) {
      if (!txt) return ''

      const { host } = URL.parse(txt)
      return host
    }
  },
  methods: {
    close () {
      this.$modal.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.footer,
.header {
  padding: 8;
}

.header {
  border-bottom-width: 1;
  border-bottom-color: rgba(black, 0.2);

  Label {
    width: 100%;
    text-align: center;
    font-size: 12;
    font-weight: bold;
  }
}

.footer {
  border-top-width: 1;
  border-top-color: rgba(black, 0.2);
}

Button {
  width: 50;
}

.done {
  width: 80;
}

.nav {
  Image {
    height: 24;
    width: 24;
    margin: 5 6;

    &.disabled {
      opacity: 0.2;
    }
  }
}
</style>
