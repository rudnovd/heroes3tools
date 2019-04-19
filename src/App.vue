<template lang="pug">
#app
  damage-calculator
  page-footer
</template>

<script>
import { mapActions } from 'vuex'

import changeLocale from '@/components/changeLocale'

import damageCalculator from '@/components/damageCalculator'

import pageFooter from '@/components/pageFooter'

export default {
  name: 'app',
  components: {
    'damage-calculator': damageCalculator,
    'page-footer': pageFooter,
    'change-locale': changeLocale
  },
  beforeMount () {
    const version = '0.1.0'

    let localStorageVersion = localStorage.version
    if (!localStorageVersion || localStorageVersion !== version) {
      localStorage.clear()
      localStorage.version = version
    }

    let localStorageUser = localStorage.user
    if (localStorageUser) {
      let user = JSON.parse(localStorage.user)

      this.setLocale(user.locale)
      this.$i18n.locale = user.locale
    }
  },
  mounted () {
    this.getUnits()
    this.getHeroes()
    this.getUnitsImages()
    this.getHeroesImages()
    this.getTerrains()
    this.getUnitsHates()
  },
  methods: {
    ...mapActions({
      setLocale: 'user/setLocale',
      getUnits: 'calculator/getUnits',
      getHeroes: 'calculator/getHeroes',
      getUnitsImages: 'calculator/getUnitsImages',
      getHeroesImages: 'calculator/getHeroesImages',
      getUnitsHates: 'calculator/getUnitsHates',
      getTerrains: 'calculator/getTerrains'
    })
  }
}
</script>

<style lang="scss">
@import '@/css/main.scss';

</style>
