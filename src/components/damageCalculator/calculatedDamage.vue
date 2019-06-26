<template lang='pug'>
div

  //- Unit damage value row
  b-row

    //- Damage text
    b-col(class='text-right')
      strong
        | {{ $t('damage') }}:

    //- Damage values
    p(class='text-left mr-3')
      //- If min damage and max damage has different values - show two numbers
      strong(v-if='$store.state.calculator[side].totalMinDamage !== $store.state.calculator[side].totalMaxDamage')
        | {{ $store.state.calculator[side].totalMinDamage }} — {{ $store.state.calculator[side].totalMaxDamage }} (~ {{ $store.state.calculator[side].totalAverageDamage }})

      //- If min damage and max damage has equal values - show one number
      strong(v-if='$store.state.calculator[side].totalMinDamage === $store.state.calculator[side].totalMaxDamage')
        | {{ $store.state.calculator[side].totalMinDamage }}

    //- If unit hits > 0
    p(class='text-left mr-3' v-if='$store.state.calculator[side].unit.hits > 1')
      strong
        | x{{ $store.state.calculator[side].unit.hits }}

  //- Unit kills value row
  b-row

    //- Kills text
    b-col(class='text-right')
      strong
        | {{ $t('kills') }}:

    //- Kills values
    p(class='text-left mr-3')
      //- If min kills and max kills has different values - show two numbers
      strong(v-if='$store.state.calculator[side].totalMinKills !== $store.state.calculator[side].totalMaxKills')
        | {{ $store.state.calculator[side].totalMinKills }} — {{ $store.state.calculator[side].totalMaxKills }} (~ {{ $store.state.calculator[side].totalAverageKills }})

      //- If min kills and max kills has equal values - show one number
      strong(v-if='$store.state.calculator[side].totalMinKills === $store.state.calculator[side].totalMaxKills')
        | {{ $store.state.calculator[side].totalMinKills }}

    //- If unit hits > 0
    p(class='text-left mr-3' v-if='$store.state.calculator[side].unit.hits > 1')
      strong
        | x{{ $store.state.calculator[side].unit.hits }}
</template>

<script>
export default {
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
