<template lang="pug">
  #app
    damage-calculator
    page-footer
</template>

<script>
import DamageCalculator from '@/components/DamageCalculator.vue'

import pageFooter from '@/components/pageFooter.vue'

export default {
  name: 'app',
  components: {
    'damage-calculator': DamageCalculator,
    'page-footer': pageFooter
  }
}
</script>

<style lang="scss">
@import '@/css/main.scss';
</style>
