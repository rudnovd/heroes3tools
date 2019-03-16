<template lang='pug'>
b-row(v-if='this[side].id')
  //- Offense
  b-col(cols='2' sm='2' md='2' lg='2' xl='2')
    label.mt-1 Offense
  b-col(cols='4' sm='3' md='4' lg='3' xl='3')
    b-form-select(v-model='offense' :options='options' size='sm')

  //- Air
  b-col.text-truncate(cols='2' sm='2' md='2' lg='2' xl='2' offset='0' offset-sm='2' offset-md='0' offset-lg='2' offset-xl='2')
    label.mt-1 Air
  b-col(cols='4' sm='3' md='4' lg='3' xl='3')
    b-form-select(v-model='air' :options='options' size='sm')

  //- Armorer
  b-col(class='mt-2 text-truncate' cols='2' sm='2' md='2' lg='2' xl='2')
    label.mt-1 Armorer
  b-col(class='mt-2' cols='4' sm='3' md='4' lg='3' xl='3')
    b-form-select(v-model='armorer' :options='options' size='sm')

  //- Fire
  b-col(class='mt-2 text-truncate' cols='2' sm='2' md='2' lg='2' xl='2' offset='0' offset-sm='2' offset-md='0' offset-lg='2' offset-xl='2')
    label.mt-1 Fire
  b-col(class='mt-2' cols='4' sm='3' md='4' lg='3' xl='3')
    b-form-select(v-model='fire' :options='options' size='sm')

  //- Archery
  b-col(class='mt-2 text-truncate' cols='2' sm='2' md='2' lg='2' xl='2')
    label.mt-1 Archery
  b-col(class='mt-2' cols='4' sm='3' md='4' lg='3' xl='3')
    b-form-select(v-model='archery' :options='options' size='sm')

  //- Earth
  b-col(class='mt-2 text-truncate' cols='2' sm='2' md='2' lg='2' xl='2' offset='0' offset-sm='2' offset-md='0' offset-lg='2' offset-xl='2')
    label.mt-1 Earth
  b-col(class='mt-2' cols='4' sm='3' md='4' lg='3' xl='3')
    b-form-select(v-model='earth' :options='options' size='sm')

  //- Artillery
  b-col(class='mt-2 text-truncate' cols='2' sm='2' md='2' lg='2' xl='2')
    label.mt-1 Artillery
  b-col(class='mt-2' cols='4' sm='3' md='4' lg='3' xl='3')
    b-form-select(v-model='artillery' :options='options' size='sm')

  //- Water
  b-col(class='mt-2 text-truncate' cols='2' sm='2' md='2' lg='2' xl='2' offset='0' offset-sm='2' offset-md='0' offset-lg='2' offset-xl='2')
    label.mt-1 Water
  b-col(class='mt-2' cols='4' sm='3' md='4' lg='3' xl='3')
    b-form-select(v-model='water' :options='options' size='sm')
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
      ]
    }
  },
  computed: {
    ...mapGetters({
      attacker: 'calculator/getAttackerHero',
      defender: 'calculator/getDefenderHero'
    }),
    offense: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.hero.offense
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.hero.offense
        } else {
          return null
        }
      },
      set (value) {
        this.setHeroSkill({
          side: this.side,
          skill: 'offense',
          level: value
        })
      }
    },
    armorer: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.hero.armorer
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.hero.armorer
        } else {
          return null
        }
      },
      set (value) {
        this.setHeroSkill({
          side: this.side,
          skill: 'armorer',
          level: value
        })
      }
    },
    archery: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.hero.archery
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.hero.archery
        } else {
          return null
        }
      },
      set (value) {
        this.setHeroSkill({
          side: this.side,
          skill: 'archery',
          level: value
        })
      }
    },
    artillery: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.hero.artillery
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.hero.artillery
        } else {
          return null
        }
      },
      set (value) {
        this.setHeroSkill({
          side: this.side,
          skill: 'artillery',
          level: value
        })
      }
    },
    air: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.hero.air
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.hero.air
        } else {
          return null
        }
      },
      set (value) {
        this.setHeroSkill({
          side: this.side,
          skill: 'air',
          level: value
        })
      }
    },
    fire: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.hero.fire
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.hero.fire
        } else {
          return null
        }
      },
      set (value) {
        this.setHeroSkill({
          side: this.side,
          skill: 'fire',
          level: value
        })
      }
    },
    earth: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.hero.earth
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.hero.earth
        } else {
          return null
        }
      },
      set (value) {
        this.setHeroSkill({
          side: this.side,
          skill: 'earth',
          level: value
        })
      }
    },
    water: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.hero.water
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.hero.water
        } else {
          return null
        }
      },
      set (value) {
        this.setHeroSkill({
          side: this.side,
          skill: 'water',
          level: value
        })
      }
    }
  },
  methods: {
    ...mapActions({
      setHeroSkill: 'calculator/setHeroSkill'
    })
  }
}
</script>
