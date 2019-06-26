<template lang='pug'>
b-row

  //- Input level
  b-col(cols='4' sm='3' md='3' lg='3' xl='3')
    b-form-group(:label='$t("level")')
      b-form-input(
        class='input-unit-stat'
        v-model='level'
        type='number'
        size='sm'
        number=true
        min=0
        max=99
        cypress-tag='hero-stats-level'
      )

  //- Input attack
  b-col(class='pr-0 pr-sm-0 pr-md-3 pr-lg-3 pr-xl-3' cols='4' sm='3' md='3' lg='3' xl='3' offset='0' offset-sm='3' offset-md='4' offset-lg='3' offset-xl='4')
    b-form-group(class='float-right' :label='$t("attack")')
      b-form-input(
        class='input-unit-stat float-right'
        v-model='attack'
        type='number'
        size='sm'
        number=true
        min=0
        max=99
        cypress-tag='hero-stats-attack'
      )

  //- Input defense
  b-col(cols='4' sm='3' md='2' lg='3' xl='2')
    b-form-group(class='float-right' :label='$t("defense")')
      b-form-input(
        class='input-unit-stat float-right'
        v-model='defense'
        type='number'
        size='sm'
        number=true
        min=0
        max=99
        cypress-tag='hero-stats-defense'
      )
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    side: String
  },
  computed: {
    attack: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.hero.attack
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.hero.attack
        } else {
          return null
        }
      },
      set (value) {
        if (value > 99 || value < 0) {
          value = 0
        }
        this.setHeroAttack({
          side: this.side,
          attack: value
        })
      }
    },
    defense: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.hero.defense
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.hero.defense
        } else {
          return null
        }
      },
      set (value) {
        if (value > 99 || value < 0) {
          value = 0
        }
        this.setHeroDefense({
          side: this.side,
          defense: value
        })
      }
    },
    level: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.hero.level
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.hero.level
        } else {
          return null
        }
      },
      set (value) {
        if (value > 99 || value < 0) {
          value = 1
        }
        this.setHeroLevel({
          side: this.side,
          level: value
        })
      }
    }
  },
  methods: {
    ...mapActions({
      setHeroLevel: 'calculator/setHeroLevel',
      setHeroAttack: 'calculator/setHeroAttack',
      setHeroDefense: 'calculator/setHeroDefense'
    })
  }
}
</script>

<style lang='scss' scoped>
.input-unit-stat {
  width: 60px;
}
</style>

<i18n>
{
  "en": {
    "level": "Level",
    "attack": "Attack",
    "defense": "Defense"
  },
  "ru": {
    "level": "Уровень",
    "attack": "Атака",
    "defense": "Защита"
  }
}
</i18n>
