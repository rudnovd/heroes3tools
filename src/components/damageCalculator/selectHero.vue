<template lang='pug'>
multiselect(
  placeholder='Pick hero',
  v-model='hero',
  :value='hero',
  :options='heroes',
  :searchable='true',
  :allow-empty='false',
  label='name',
)
  template(slot="singleLabel", slot-scope="props" v-if='hero.id')
    img.option__image(:src='heroesImages[hero.id].src')
    span.option__desc
      span.option__title.ml-3 {{ props.option.name[0] }}
  template(slot="option", slot-scope="props")
    img.option__image(:src='heroesImages[props.option.id].src')
    span.option__desc
      span.option__title  {{ props.option.name[0] }}
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
        this.setHero({ side: this.side, hero: value })
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
