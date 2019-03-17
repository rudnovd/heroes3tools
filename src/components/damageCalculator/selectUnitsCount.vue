<template lang='pug'>
b-form-input(
  v-if='this[side]'
  v-model='count'
  type='number'
  number=true
  size='sm'
  min=1
  max=999
)
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'selectUnitsCount',
  props: {
    side: String
  },
  computed: {
    ...mapGetters({
      attacker: 'calculator/attackerUnitSelected',
      defender: 'calculator/defenderUnitSelected'
    }),
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
