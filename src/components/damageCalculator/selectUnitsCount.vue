<template lang='pug'>
b-form-input(
  class='input-units-count'
  v-model='count'
  type='number'
  size='sm'
  min=0
  max=9999
)
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'selectUnitsCount',
  props: {
    side: String
  },
  computed: {
    count: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.unit.count
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.unit.count
        } else {
          return null
        }
      },
      set (value) {
        if (value > 9999 || value < 0) {
          value = 0
        }
        this.setUnitsCount({
          side: this.side,
          count: value
        })
      }
    }
  },
  methods: {
    ...mapActions({
      setUnitsCount: 'calculator/setUnitsCount'
    })
  }
}
</script>

<style lang="scss" scoped>
.input-units-count {
  width: 65px;
}
</style>
