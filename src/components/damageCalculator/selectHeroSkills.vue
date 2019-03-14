<template lang='pug'>
b-row(v-if='this[side].hero.id')
  //- Offense
  b-col(cols='2' sm='2' md='2' lg='2' xl='2')
    label.mt-1 Offense

  b-col(cols='4' sm='3' md='4' lg='3' xl='3')
    b-form-select(
      v-model='offense'
      :options='options'
      size='sm'
      @input='setHeroSkill({ side, skill: "offense", level: offense })'
    )

  //- Air
  b-col.text-truncate(cols='2' sm='2' md='2' lg='2' xl='2' offset='0' offset-sm='2' offset-md='0' offset-lg='2' offset-xl='2')
    label.mt-1 Air

  b-col(cols='4' sm='3' md='4' lg='3' xl='3')
    b-form-select(
      v-model='air'
      :options='options'
      size='sm'
      @input='setHeroSkill({ side, skill: "air", level: air })'
    )

  //- Armorer
  b-col.mt-2.text-truncate(cols='2' sm='2' md='2' lg='2' xl='2')
    label.mt-1 Armorer

  b-col.mt-2(cols='4' sm='3' md='4' lg='3' xl='3')
    b-form-select(
      v-model='armorer'
      :options='options'
      size='sm'
      @input='setHeroSkill({side, skill: "armorer", level: armorer})'
    )

  //- Fire
  b-col.mt-2.text-truncate(cols='2' sm='2' md='2' lg='2' xl='2' offset='0' offset-sm='2' offset-md='0' offset-lg='2' offset-xl='2')
    label.mt-1 Fire

  b-col.mt-2(cols='4' sm='3' md='4' lg='3' xl='3')
    b-form-select(
      v-model='fire'
      :options='options'
      size='sm'
      @input='setHeroSkill({side, skill: "fire", level: fire})'
    )

  //- Archery
  b-col.mt-2.text-truncate(cols='2' sm='2' md='2' lg='2' xl='2')
    label.mt-1 Archery

  b-col.mt-2(cols='4' sm='3' md='4' lg='3' xl='3')
    b-form-select(
      v-model='archery'
      :options='options'
      size='sm'
      @input='setHeroSkill({side, skill: "archery", level: archery})'
    )

  //- Earth
  b-col.mt-2.text-truncate(cols='2' sm='2' md='2' lg='2' xl='2' offset='0' offset-sm='2' offset-md='0' offset-lg='2' offset-xl='2')
    label.mt-1 Earth

  b-col.mt-2(cols='4' sm='3' md='4' lg='3' xl='3')
    b-form-select(
      v-model='earth'
      :options='options'
      size='sm'
      @input='setHeroSkill({side, skill: "earth", level: earth})'
    )

  //- Artillery
  b-col.mt-2.text-truncate(cols='2' sm='2' md='2' lg='2' xl='2')
    label.mt-1 Artillery

  b-col.mt-2(cols='4' sm='3' md='4' lg='3' xl='3')
    b-form-select(
      v-model='artillery'
      :options='options'
      size='sm'
      @input='setHeroSkill({side, skill: "artillery", level: artillery})'
    )

  //- Water
  b-col.mt-2.text-truncate(cols='2' sm='2' md='2' lg='2' xl='2' offset='0' offset-sm='2' offset-md='0' offset-lg='2' offset-xl='2')
    label.mt-1 Water

  b-col.mt-2(cols='4' sm='3' md='4' lg='3' xl='3')
    b-form-select(
      v-model='water'
      :options='options'
      size='sm'
      @input='setHeroSkill({side, skill: "water", level:  water})'
    )
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'selectHeroSkills',
  props: {
    side: String
  },
  data () {
    return {
      options: [
        { text: 'None', value: 0 },
        { text: 'Basic', value: 1 },
        { text: 'Advanced', value: 2 },
        { text: 'Expert', value: 3 }
      ],
      offense: 0,
      armorer: 0,
      archery: 0,
      artillery: 0,

      air: 0,
      fire: 0,
      earth: 0,
      water: 0
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
      setHeroSkill: 'calculator/setHeroSkill'
    })
  }
}
</script>
