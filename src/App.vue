<template lang='pug'>
#app
  DamageCalculator
  PageFooter
</template>

<script>
import { mapActions } from 'vuex'

import DamageCalculator from '@/components/DamageCalculator.vue'

import PageFooter from '@/components/PageFooter.vue'

export default {
  name: 'app',
  components: {
    DamageCalculator,
    PageFooter
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

<style lang='scss'>
@import '@/css/main.scss';

</style>
