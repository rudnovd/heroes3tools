<template lang="pug">
  #app
    damage-calculator
    page-footer
</template>

<script>
import { mapActions } from 'vuex'

import DamageCalculator from '@/components/DamageCalculator.vue'

import pageFooter from '@/components/pageFooter.vue'

export default {
  name: 'app',
  components: {
    'damage-calculator': DamageCalculator,
    'page-footer': pageFooter
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
