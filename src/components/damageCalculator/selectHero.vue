<template lang='pug'>
v-select(
  v-model='data.hero'
  :options='data.heroes'
  label='name'
  placeholder='Hero'
  @input='sendHero(data.hero)'
)
</template>

<script>
import heroesJson from '@/assets/json/heroes.json'

export default {
  name: 'selectHero',
  data () {
    return {
      data: {
        heroes: heroesJson,
        hero: null
      }
    }
  },
  methods: {
    sendHero (hero) {
      this.$emit('sendHero', hero)
    }
  }
}

</script>
