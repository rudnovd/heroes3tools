<template lang='pug'>
div(v-if='attacker.unit.id && defender.unit.id')
  //- Text
  b-row
    b-col.text-right
      strong Damage:
    //- Damage value
    p.text-left.mr-3
      strong(v-if='this[side].totalMinDamage !== this[side].totalMaxDamage')
        | {{ this[side].totalMinDamage }} — {{ this[side].totalMaxDamage }} (~ {{ this[side].totalAverageDamage }})
      strong(v-else)
        | {{ this[side].totalMinDamage }}
    //- If unit hits > 0
    p.text-left.mr-3(v-if='this[side].unit.hits > 1')
      strong
        | x{{ this[side].unit.hits }}

  b-row
    //- Text
    b-col.text-right
      strong Kills:
    //- Kills value
    p.text-left.mr-3
      strong(v-if='this[side].totalMinKills !== this[side].totalMaxKills')
        | {{ this[side].totalMinKills }} — {{ this[side].totalMaxKills }} (~ {{ this[side].totalAverageKills }})
      strong(v-else)
        | {{ this[side].totalMinKills }}
    //- If unit hits > 0
    p.text-left.mr-3(v-if='defender.unit.hits > 1')
      strong
        | x{{ this[side].unit.hits }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'calculatedDamage',
  props: {
    side: String
  },
  computed: {
    ...mapGetters({
      attacker: 'calculator/getAttacker',
      defender: 'calculator/getDefender'
    })
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>
