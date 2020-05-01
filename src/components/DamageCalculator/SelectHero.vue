<template lang='pug'>
multiselect(
  placeholder='Pick hero',
  v-model='hero',
  label='name',
  selectLabel='',
  deselectLabel='',
  :value='hero',
  :options='$store.state.calculator.heroes',
  :searchable='true',
  :allow-empty='false',
  :clear-on-select='false',
  :maxHeight='480'
)
  //- Show portrait when hero selected
  template(v-if='hero.id' slot='singleLabel', slot-scope='props')
    img(:src='$store.state.calculator.images.heroes[hero.id - 1].src')

    //- Second array element from json - english name
    span(class='multiselect__selected ml-1' v-if='$store.state.user.locale === "en"')
      | {{ props.option.name[1] }}

    //- First array element from json - russian name
    span(class='multiselect__selected ml-1' v-if='$store.state.user.locale === "ru"')
      | {{ props.option.name[0] }}

  //- Show portraits in heroes list
  template(slot='option', slot-scope='props')
    img(:src='$store.state.calculator.images.heroes[props.option.id - 1].src')

    //- Second array element from json - english name
    span(class='ml-1' v-if='$store.state.user.locale === "en"')
      | {{ props.option.name[1] }}

    //- First array element from json - russian name
    span(class='ml-1' v-if='$store.state.user.locale === "ru"')
      | {{ props.option.name[0] }}
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    side: String
  },
  computed: {
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

<style lang='scss' scoped>
.multiselect {
  font-size: 1.125rem;
  .multiselect__selected {
    font-size: 1.125rem;
  }
}
</style>
