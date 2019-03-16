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
    this.updateScreenResolution({ width: document.body.clientWidth, height: document.body.clientHeight })

    window.addEventListener('resize', () => {
      this.updateScreenResolution({ width: document.body.clientWidth, height: document.body.clientHeight })
    })
  },
  methods: {
    ...mapActions({
      updateScreenResolution: 'user/updateScreenResolution'
    })
  }
}
</script>

<style lang="scss">
@import '@/css/main.scss';
</style>
