<template lang='pug'>
b-row.p-2.border-top

  //- Swap button
  b-col(class='text-left ml-auto mr-auto mr-md-3 mr-lg-3 mr-xl-3' cols='auto' sm='2' md='1' lg='1' xl='1')
    b-button(v-if='attacker.id && defender.id' variant='link' size='sm' @click='swapSides()')
      font-awesome-icon(class='fa-2x' icon='sync' style='color: #DC3545')

  //- Terrain text
  b-col(class='text-right' cols='auto' sm='2' md='2' lg='1' xl='1' offset='0' offset-sm='4' offset-md='0' offset-lg='2' offset-xl='2')
    label.mt-1 Terrain:
  //- Terrain select
  b-col(cols='auto' sm='4' md='3' lg='2' xl='2')
    b-form-select(
      v-model='terrain'
      :options='terrains'
      value-field='id'
      text-field='name'
      size='sm'
    )
      template(slot='first')
        option(:value='null') Don't care
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'bottomPanel',
  props: {
    side: String
  },
  computed: {
    ...mapGetters({
      attacker: 'calculator/getAttackerUnit',
      defender: 'calculator/getDefenderUnit',
      terrains: 'calculator/getTerrains'
    }),
    terrain: {
      get () {
        return this.$store.state.calculator.terrain
      },
      set (value) {
        this.setTerrain(value)
      }
    }
  },
  methods: {
    ...mapActions({
      setTerrain: 'calculator/setTerrain',
      swapSides: 'calculator/swapSides'
    })
  }
}
</script>
