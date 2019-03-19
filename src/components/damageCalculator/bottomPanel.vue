<template lang='pug'>
b-row.p-2.border-top

  //- Swap button
  b-col(class='text-left ml-auto mr-auto mr-md-3 mr-lg-3 mr-xl-3' cols='2' sm='2' md='1' lg='1' xl='1')
    b-button(
      v-if='attackerUnitSelected && defenderUnitSelected'
      variant='link' size='sm'
      v-b-tooltip.hover
      :title="$t('swap-sides')"
      @click='swapSides()'
    )
      font-awesome-icon(class='fa-2x' icon='sync' style='color: #DC3545')

  //- Terrain text
  b-col(class='text-right' cols='4' sm='3' md='2' lg='2' xl='2' offset='0' offset-sm='3' offset-md='0' offset-lg='1' offset-xl='1')
    label.mt-1
      | {{ $t('terrain') }}:
  //- Terrain select
  b-col(cols='auto' sm='4' md='3' lg='2' xl='2')
    template(v-if='$store.state.user.locale === "en"')
      b-form-select(
        v-model='terrain'
        :options='terrains'
        value-field='id'
        text-field='name_en'
        size='sm'
      )
        template(slot='first')
          option(:value='null') Don't care

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
