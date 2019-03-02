<template lang="pug">
  #app
    damage-calculator
</template>

<script>
import DamageCalculator from '@/components/DamageCalculator.vue'

export default {
  name: 'app',
  components: {
    'damage-calculator': DamageCalculator
  }
}
</script>

<style lang="scss">
@import '@/css/main.scss';
</style>
