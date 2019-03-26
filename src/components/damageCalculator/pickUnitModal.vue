<template lang='pug'>
b-modal(
  :title='`${$t("pick")} ${$t(side)} ${$t("unit")}`'
  :ref='refString'
  size='xl'
  ok-disabled=true
  cancel-disabled=true
  hide-footer=true
  @shown='$refs.searchUnitInput.focus()'
  @hidden='clearSearch()'
)
  //- Modal content
  b-row(align-v='center')

    //- Search unit
    b-col(class='ml-2 mr-auto mb-3' cols='5' sm='5' md='5' lg='4' xl='3')
      b-form-input(
        ref='searchUnitInput'
        v-model='search.text'
        type='text'
        :placeholder='$t("search-unit")'
        @input='searchUnit()'
        @keyup.enter='selectFirstFounded()'
      )
    //- //- Clear unit
    //- b-col(class='mr-2 mr-sm-4 mr-md-4 mr-lg-5 mr-xl-5' cols='3' sm='2' md='2' lg='1' xl='1')
    //-   b-btn(variant='danger' @click='clearUnit()')
    //-     | Clear

    //- Show if not search
    b-col(v-if='!search.text' cols='12' v-for='(town, index) in unitsList' :key='index')
      b-btn(
        v-if='$store.state.user.locale === "en"'
        v-for='unit in town'
        variant='link'
        size='sm'
        :key='unit.id'
      )
        img(
          :src='$store.state.calculator.images.units[unit.id].src'
          @click='setUnit({ side, unit }); hideModal();'
          v-b-tooltip.hover
          :title='unit.name_en'
        )

      b-btn(
        v-if='$store.state.user.locale === "ru"'
        variant='link'
        size='sm'
        v-for='unit in town'
        :key='unit.id'
      )
        img(
          :src='$store.state.calculator.images.units[unit.id].src'
          @click='setUnit({ side, unit }); hideModal();'
          v-b-tooltip.hover
          :title='unit.name_ru'
        )

    //- Show if search
    b-col(v-if='search.text' cols='12')
      b-btn(
        v-if='$store.state.user.locale === "en"'
        variant='link'
        size='sm'
        v-for='(unit, index) in search.foundUnits'
        :key='unit.id'
      )
        img(
          :src='$store.state.calculator.images.units[unit.id].src'
          @click='setUnit({ side, unit}); hideModal();'
          v-b-tooltip.hover
          :title='unit.name_en'
        )

      b-btn(
        v-if='$store.state.user.locale === "ru"'
        variant='link'
        size='sm'
        v-for='(unit, index) in search.foundUnits'
        :key='unit.id'
      )
        img(
          :src='$store.state.calculator.images.units[unit.id].src'
          @click='setUnit({ side, unit}); hideModal();'
          v-b-tooltip.hover
          :title='unit.name_ru'
        )
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'pickUnitModal',
  props: {
    side: String,
    refString: String
  },
  mounted () {
    this.$root.$on(this.refString, () => {
      this.showModal(this.refString)
    })

    this.$nextTick(() => {
      this.unitsList = this.$store.getters['calculator/getUnitsList']
    })
  },
  data () {
    return {
      unitsList: [],
      search: {
        text: null,
        foundUnits: []
      }
    }
  },
  methods: {
    ...mapActions({
      setUnit: 'calculator/setUnit'
    }),

    showModal () {
      let refs = this.refString
      this.$refs[refs].show()
    },
    hideModal () {
      let refs = this.refString
      this.$refs[refs].hide()

      this.clearSearch()
    },

    // Search units
    searchUnit () {
      this.search.foundUnits = []
      for (let i = 0; i < this.$store.state.calculator.units.length; i++) {
        if (this.$store.state.calculator.units[i].name_en.includes(this.search.text) || this.$store.state.calculator.units[i].name_en.toLowerCase().includes(this.search.text)) {
          this.search.foundUnits.push(this.$store.state.calculator.units[i])
        }
        if (this.$store.state.calculator.units[i].name_ru.includes(this.search.text) || this.$store.state.calculator.units[i].name_ru.toLowerCase().includes(this.search.text)) {
          this.search.foundUnits.push(this.$store.state.calculator.units[i])
        }
      }
    },
    selectFirstFounded () {
      if (this.search.foundUnits.length > 0) {
        this.setUnit({
          side: this.side,
          unit: this.search.foundUnits[0]
        })
        this.hideModal()
      }
    },
    clearSearch () {
      this.search.text = null
      this.search.foundUnits = []
    }
  }
}
</script>

<i18n>
{
  "en": {
    "pick": "Pick",
    "unit": "unit",
    "attacker": "attacker",
    "defender": "defender",
    "search-unit": "Search unit"
  },
  "ru": {
    "pick": "Выбор",
    "unit": "юнита",
    "attacker": "атакующего",
    "defender": "защищающегося",
    "search-unit": "Поиск юнита"
  }
}
</i18n>
