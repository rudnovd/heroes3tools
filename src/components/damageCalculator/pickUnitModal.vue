<template lang='pug'>
b-modal(
  :title='`Pick ${side} unit`'
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
        placeholder='Search unit'
        @input='searchUnit()'
        @keyup.enter='selectFirstFounded()'
      )
    //- //- Clear unit
    //- b-col(class='mr-2 mr-sm-4 mr-md-4 mr-lg-5 mr-xl-5' cols='3' sm='2' md='2' lg='1' xl='1')
    //-   b-btn(variant='danger' @click='clearUnit()')
    //-     | Clear

    template(v-if='$store.state.user.width >= 1200')
      //- Show if not search
      b-col(v-if='!search.text' cols='12' v-for='(town, index) in Object.keys(unitsList)' :key='town.id')
        b-btn(variant='link' size='sm' v-for='(unit, number) in unitsList[town]' :key='unit.id')
          img(:src='$store.state.calculator.images.units[unit.id].src' @click='setUnit({ side, unit }); hideModal();')

      //- Show if search
      b-col(v-if='search.text' cols='12')
        b-btn(variant='link' size='sm' v-for='(unit, index) in search.foundUnits' :key='unit.id')
          img(:src='$store.state.calculator.images.units[unit.id].src' @click='setUnit({ side, unit}); hideModal();')

    template(v-if='$store.state.user.width < 1200')
      //- Show if not search
      b-col(v-if='!search.text' cols='12' v-for='(town, index) in Object.keys(unitsList)' :key='town.id' v-cloak)
        img(
          v-for='(unit, number) in unitsList[town]'
          class='p-1'
          width='54px'
          heigth='70px'
          :src='$store.state.calculator.images.units[unit.id].src'
          @click='setUnit({ side, unit }); hideModal();'
        )

      //- Show if search
      b-col(v-if='search.text' cols='12')
        img(
          width='54px'
          heigth='70px'
          v-for='(unit, index) in search.foundUnits'
          :src='$store.state.calculator.images.units[unit.id].src'
          @click='setUnit({ side, unit}); hideModal();'
        )

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
  },
  computed: {
    ...mapGetters({
      unitsList: 'calculator/getUnitsList'
    })
  },
  data () {
    return {
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
        if (this.$store.state.calculator.units[i].name.includes(this.search.text) || this.$store.state.calculator.units[i].name.toLowerCase().includes(this.search.text)) {
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
