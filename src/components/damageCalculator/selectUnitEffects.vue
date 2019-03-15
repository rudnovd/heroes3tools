<template lang='pug'>
b-row(v-if='this[side].id')
  //- Attacker attack buffs checkboxes
  b-col(cols='4' sm='4' md='4' lg='3' xl='3')
    b-form-group
      b-form-checkbox(
        v-for='effect in spells.attackBuffs'
        :key='effect'
        :checked='effects.includes(effect)'
        @input='pushSpell(side, effect)'
      ) {{ effect }}

  //- Attacker defense buffs checkboxes
  b-col(cols='4' sm='4' md='4' lg='3' xl='3')
    b-form-group
      b-form-checkbox(
        v-for='effect in spells.defenseBuffs'
        :key='effect'
        :checked='effects.includes(effect)'
        @input='pushSpell(side, effect)'
      ) {{ effect }}

  //- Attacker attack debuffs checkboxes
  b-col(cols='4' sm='4' md='4' lg='3' xl='3')
    b-form-group
      b-form-checkbox(
        v-for='effect in spells.attackDebuffs'
        :key='effect'
        :checked='effects.includes(effect)'
        @input='pushSpell(side, effect)'
      ) {{ effect }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'selectUnitEffects',
  props: {
    side: String
  },
  computed: {
    ...mapGetters({
      attacker: 'calculator/getAttackerHero',
      defender: 'calculator/getDefenderHero'
    })
  },
  data () {
    return {
      spells: {
        attackBuffs: ['Bless', 'Bloodlust', 'Frenzy', 'Prayer', 'Precision', 'Slayer'],
        defenseBuffs: ['Shield', 'Stone Skin', 'Air Shield'],
        attackDebuffs: ['Curse', 'Weakness', 'Disrupting Ray'],
        defenseDebuffs: []
      },
      effects: []
    }
  },
  methods: {
    ...mapActions({
      setUnitEffect: 'calculator/setUnitEffect',
      removeUnitEffect: 'calculator/removeUnitEffect'
    }),
    pushSpell (side, effect) {
      if (this.effects.includes(effect)) {
        this.effects.splice(this.effects.indexOf(effect), 1)
        this.removeUnitEffect({ side, effect })
      } else {
        this.effects.push(effect)
        this.setUnitEffect({ side, effect })
      }
    }
  }
}
</script>
