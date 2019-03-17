<template lang='pug'>
b-row
  b-col(cols='4' sm='4' md='4' lg='3' xl='3')
    b-form-group
      b-form-checkbox-group(v-model='effects' :options='attackBuffs')

  b-col(cols='4' sm='4' md='4' lg='3' xl='3')
    b-form-group
      b-form-checkbox-group(v-model='effects' :options='defenseBuffs')

  b-col(cols='4' sm='4' md='4' lg='3' xl='3')
    b-form-group
      b-form-checkbox-group(v-model='effects' :options='attackDebuffs')
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'selectUnitEffects',
  props: {
    side: String
  },
  computed: {
    effects: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.unit.effects
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.unit.effects
        } else {
          return null
        }
      },
      set (value) {
        if (this.$store.state.calculator[this.side].unit.effects !== value) {
          this.setUnitEffect({
            side: this.side,
            effects: value
          })
        }
      }
    }
  },
  data () {
    return {
      attackBuffs: ['Bless', 'Bloodlust', 'Frenzy', 'Prayer', 'Precision', 'Slayer'],
      defenseBuffs: ['Shield', 'Stone Skin', 'Air Shield'],
      attackDebuffs: ['Curse', 'Weakness', 'Disrupting Ray']
    }
  },
  methods: {
    ...mapActions({
      setUnitEffect: 'calculator/setUnitEffect'
    })
  }
}
</script>
