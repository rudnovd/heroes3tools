<template lang='pug'>
v-select(
  v-model='hero'
  :options='heroes'
  label='name'
  placeholder='Hero'
  @input='sendHero(hero)'
)
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'selectHero',
  data () {
    return {
      hero: null
    }
  },
  computed: {
    ...mapState({
      heroes: state => state.calculator.heroes
    })
  },
  methods: {
    sendHero (hero) {
      this.$emit('sendHero', hero)
    }
  }
}

</script>
