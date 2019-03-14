<template lang='pug'>
multiselect(
  v-model='hero'
  :options='heroes'
  :searchable='true',
  label='name',
  placeholder='Pick hero'
  @input='setHero({ side, hero })'
)
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'selectHero',
  props: {
    side: String
  },
  data () {
    return {
      hero: null
    }
  },
  computed: {
    ...mapGetters({
      heroes: 'calculator/getHeroes'
    })
  },
  methods: {
    ...mapActions({
      setHero: 'calculator/setHero'
    })
  }
}
</script>
