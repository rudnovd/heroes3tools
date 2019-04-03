<template lang='pug'>
b-row.p-2.border-top

  //- Swap button
  b-col(cols='12' sm='8' md='6' lg='6' xl='6' offset='0' offset-sm='4' offset-md='6' offset-lg='6' offset-xl='6')
    b-row
      b-col(class='pl-0' cols='2')
        b-button(
          v-if='attackerUnitSelected && defenderUnitSelected'
          variant='link' size='sm'
          v-b-tooltip.hover
          :title="$t('swap-sides')"
          @click='swapSides()'
        )
          font-awesome-icon(class='fa-2x' icon='sync' style='color: #DC3545')

      //- Terrain text
      b-col(class='text-right' cols='4' sm='4' md='4' lg='3' xl='3' offset='0' offset-sm='0' offset-md='1' offset-lg='3' offset-xl='4')
        label.mt-1
          | {{ $t('terrain') }}
      //- Terrain select
      b-col(class='pl-0' cols='6' sm='6' md='5' lg='4' xl='3')
        template(v-if='$store.state.user.locale === "en"')
          b-form-select(
            v-model='terrain'
            :options='terrains'
            value-field='id'
            text-field='name_en'
            size='sm'
          )
            template(slot='first')
              option(:value='null') None

        template(v-if='$store.state.user.locale === "ru"')
          b-form-select(
            v-model='terrain'
            :options='terrains'
            value-field='id'
            text-field='name_ru'
            size='sm'
          )
            template(slot='first')
              option(:value='null') Нет
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
      attackerUnitSelected: 'calculator/attackerUnitSelected',
      defenderUnitSelected: 'calculator/defenderUnitSelected'
    }),
    terrain: {
      get () {
        return this.$store.state.calculator.terrain
      },
      set (value) {
        this.setTerrain(value)
      }
    },
    terrains: {
      get () {
        return this.$store.state.calculator.terrains
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

<style lang="scss" scoped>
.select-terrain {
  max-width: 150px;
}
</style>

<i18n>
{
  "en": {
    "terrain": "Terrain",
    "swap-sides": "Swap sides"
  },
  "ru": {
    "terrain": "Территория",
    "swap-sides": "Поменять стороны"
  }
}
</i18n>
