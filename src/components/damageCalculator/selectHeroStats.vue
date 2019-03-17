<template lang='pug'>
b-row

  //- Need other layout for attacker
  template(v-if='side === "attacker"')
    //- Input level
    b-col(cols='3' sm='2' md='3' lg='2' xl='2' offset='3' offset-sm='3' offset-md='3' offset-lg='3' offset-xl='3')
      b-form-group(label='Level')
        b-form-input(
          v-model='level'
          type='number'
          size='sm'
          number=true
          min=1
          max=99
        )

    //- Input attack
    b-col(cols='3' sm='2' md='3' lg='2' xl='2' offset='0' offset-sm='3' offset-md='0' offset-lg='3' offset-xl='3')
      b-form-group(label='Attack')
        b-form-input(
          v-model='attack'
          type='number'
          size='sm'
          number=true
          min=0
          max=99
        )

    //- Input defense
    b-col(cols='3' sm='2' md='3' lg='2' xl='2')
      b-form-group(label='Defense')
        b-form-input(
          v-model='defense'
          type='number'
          size='sm'
          number=true
          min=0
          max=99
        )

  //- Need other layout for defender
  template(v-else)
    //- Input level
    b-col(cols='3' sm='2' md='3' lg='2' xl='2')
      b-form-group(label='Level')
        b-form-input(
          v-model='level'
          type='number'
          size='sm'
          number=true
          min=1
          max=99
        )

    //- Input attack
    b-col(cols='3' sm='2' md='3' lg='2' xl='2' offset='0' offset-sm='3' offset-md='0' offset-lg='3' offset-xl='3')
      b-form-group(label='Attack')
        b-form-input(
          v-model='attack'
          type='number'
          size='sm'
          number=true
          min=0
          max=99
        )

    //- Input defense
    b-col(cols='3' sm='2' md='3' lg='2' xl='2')
      b-form-group(label='Defense')
        b-form-input(
          v-model='defense'
          type='number'
          size='sm'
          number=true
          min=0
          max=99
        )
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'selectHeroStats',
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
