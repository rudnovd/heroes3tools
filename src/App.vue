<template lang="pug">
#app
  change-locale
  damage-calculator
  page-footer
</template>

<script>
import { mapActions } from 'vuex'

import changeLocale from '@/components/changeLocale.vue'

import DamageCalculator from '@/components/DamageCalculator.vue'

import pageFooter from '@/components/pageFooter.vue'

export default {
  name: 'app',
  components: {
    'damage-calculator': DamageCalculator,
    'page-footer': pageFooter,
    'change-locale': changeLocale
  },
  beforeMount () {
    const version = '0.1.0'

    let localStorageVersion = JSON.parse(window.localStorage.getItem('version'))
    if (!localStorageVersion || localStorageVersion !== version) {
      window.localStorage.clear()
      window.localStorage.setItem('version', version)
    }

    let localStorageUser = JSON.parse(window.localStorage.getItem('user'))
    if (localStorageUser) {
      this.$i18n.locale = localStorageUser.locale
    }
  },
  mounted () {
    this.getUnits()
    this.getHeroes()
    this.getUnitsImages()
    this.getHeroesImages()
    this.getTerrains()
    this.getUnitsHates()

    this.updateScreenResolution({ width: document.body.clientWidth, height: document.body.clientHeight })

    window.addEventListener('resize', () => {
      this.updateScreenResolution({ width: document.body.clientWidth, height: document.body.clientHeight })
    })
  },
  methods: {
    ...mapActions({
      updateScreenResolution: 'user/updateScreenResolution',
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
