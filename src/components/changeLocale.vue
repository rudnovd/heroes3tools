<template lang='pug'>
b-container(fluid)
  b-navbar(type="light" variant="faded")
    b-navbar-nav.ml-auto
      b-nav-item-dropdown(:text='language' right)
        b-dropdown-item(@click='changeLocale("en")') English
        b-dropdown-item(@click='changeLocale("ru")') Русский
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'changeLocale',
  data () {
    return {
      language: 'English'
    }
  },
  beforeMount () {
    if (this.$i18n.locale === 'en') {
      this.language = 'English'
    } else if (this.$i18n.locale === 'ru') {
      this.language = 'Русский'
    }
  },
  methods: {
    ...mapActions({
      setLocale: 'user/setLocale'
    }),
    changeLocale (locale) {
      this.$i18n.locale = locale

      if (locale === 'en') {
        this.language = 'English'
        this.setLocale('en')
      } else if (locale === 'ru') {
        this.language = 'Русский'
        this.setLocale('ru')
      }

      let userLocalStorage = {
        'locale': locale
      }

      userLocalStorage = JSON.stringify(userLocalStorage)

      window.localStorage.setItem('user', userLocalStorage)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  max-height: 30px;
}
</style>
