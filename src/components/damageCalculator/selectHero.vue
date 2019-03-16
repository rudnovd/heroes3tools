<template lang='pug'>
multiselect(
  placeholder='Pick hero',
  v-model='hero',
  label='name',
  selectLabel='',
  deselectLabel='',
  :value='hero',
  :options='heroes',
  :searchable='true',
  :allow-empty='false',
  :clear-on-select='false',
  :maxHeight='480'
)
  template(v-if='hero.id' slot='singleLabel', slot-scope='props')
    img(:src='heroesImages[hero.id].src')
    span(class='multiselect__selected ml-1')
      | {{ props.option.name[0] }}
  template(slot='option', slot-scope='props')
    img(:src='heroesImages[props.option.id].src')
    span(class='ml-1')
      | {{ props.option.name[0] }}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'selectHero',
  props: {
    side: String
  },
  computed: {
    ...mapGetters({
      heroes: 'calculator/getHeroes',
      heroesImages: 'calculator/getHeroesImages'
    }),
    hero: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.hero
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.hero
        } else {
          return null
        }
      },
      set (value) {
        this.setHero({
          side: this.side,
          hero: value
        })
      }
    }
  },
  methods: {
    ...mapActions({
      setHero: 'calculator/setHero'
    })
  }
}
</script>

<style lang="scss" scoped>
.multiselect {
  font-size: 1.125rem;
  .multiselect__selected {
    font-size: 1.125rem;
  }
}
</style>
