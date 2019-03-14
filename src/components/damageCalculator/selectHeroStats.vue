<template lang='pug'>
b-row(v-if='this[side].hero.id')

  //- Need other layout for attacker
  template(v-if='side === "attacker"')
    //- Input level
    b-col(cols='3' sm='2' md='3' lg='2' xl='2' offset='3' offset-sm='3' offset-md='3' offset-lg='3' offset-xl='3')
      b-form-group(label='Level')
        b-form-input(
          v-model='level'
          type='number'
          size='sm'
          min=1
          max=99
          @input='setHeroLevel({ side, level })'
        )

    //- Input attack
    b-col(cols='3' sm='2' md='3' lg='2' xl='2' offset='0' offset-sm='3' offset-md='0' offset-lg='3' offset-xl='3')
      b-form-group(label='Attack')
        b-form-input(
          v-model='attack'
          type='number'
          size='sm'
          min=0
          max=99
          @input='setHeroAttack({ side, attack })'
        )

    //- Input defense
    b-col(cols='3' sm='2' md='3' lg='2' xl='2')
      b-form-group(label='Defense')
        b-form-input(
          v-model='defense'
          type='number'
          size='sm'
          min=0
          max=99
          @input='setHeroDefense({ side, defense })'
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
          min=1
          max=99
          @input='setHeroLevel({ side, level })'
        )

    //- Input attack
    b-col(cols='3' sm='2' md='3' lg='2' xl='2' offset='0' offset-sm='3' offset-md='0' offset-lg='3' offset-xl='3')
      b-form-group(label='Attack')
        b-form-input(
          v-model='attack'
          type='number'
          size='sm'
          min=0
          max=99
          @input='setHeroAttack({ side, attack })'
        )

    //- Input defense
    b-col(cols='3' sm='2' md='3' lg='2' xl='2')
      b-form-group(label='Defense')
        b-form-input(
          v-model='defense'
          type='number'
          size='sm'
          min=0
          max=99
          @input='setHeroDefense({ side, defense })'
        )
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'selectHeroStats',
  props: {
    side: String
  },
  data () {
    return {
      level: 1,
      attack: 0,
      defense: 0
    }
  },
  computed: {
    ...mapGetters({
      attacker: 'calculator/getAttacker',
      defender: 'calculator/getDefender'
    })
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
