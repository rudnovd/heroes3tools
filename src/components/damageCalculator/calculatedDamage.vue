<template lang='pug'>
div
  b-row
    //- Text
    b-col.text-right
      strong {{ $t('damage') }}:

    //- Damage value
    p.text-left.mr-3
      strong(v-if='$store.state.calculator[side].totalMinDamage !== $store.state.calculator[side].totalMaxDamage')
        | {{ $store.state.calculator[side].totalMinDamage }} — {{ $store.state.calculator[side].totalMaxDamage }} (~ {{ $store.state.calculator[side].totalAverageDamage }})
      strong(v-if='$store.state.calculator[side].totalMinDamage === $store.state.calculator[side].totalMaxDamage')
        | {{ $store.state.calculator[side].totalMinDamage }}

    //- If unit hits > 0
    p.text-left(class='mr-3' v-if='$store.state.calculator[side].unit.hits > 1')
      strong
        | x{{ $store.state.calculator[side].unit.hits }}

  b-row
    //- Text
    b-col.text-right
      strong {{ $t('kills') }}:

    //- Kills value
    p.text-left(class='mr-3')
      strong(v-if='$store.state.calculator[side].totalMinKills !== $store.state.calculator[side].totalMaxKills')
        | {{ $store.state.calculator[side].totalMinKills }} — {{ $store.state.calculator[side].totalMaxKills }} (~ {{ $store.state.calculator[side].totalAverageKills }})
      strong(v-if='$store.state.calculator[side].totalMinKills === $store.state.calculator[side].totalMaxKills')
        | {{ $store.state.calculator[side].totalMinKills }}

    //- If unit hits > 0
    p.text-left(class='mr-3' v-if='$store.state.calculator[side].unit.hits > 1')
      strong
        | x{{ $store.state.calculator[side].unit.hits }}
</template>

<script>
export default {
  name: 'calculatedDamage',
  props: {
    side: String
  }
}
</script>

<i18n>
{
  "en": {
    "damage": "Damage",
    "kills": "Kills"
  },
  "ru": {
    "damage": "Урон",
    "kills": "Убийств"
  }
}
</i18n>
