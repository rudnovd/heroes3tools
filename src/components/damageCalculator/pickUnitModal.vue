<template lang='pug'>
b-modal(
  :title='`Pick ${side} unit`'
  :ref='refString'
  size='xl'
  no-close-on-backdrop=true
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
    //- Clear unit
    b-col(class='mr-2 mr-sm-4 mr-md-4 mr-lg-5 mr-xl-5' cols='3' sm='2' md='2' lg='1' xl='1')
      b-btn(variant='danger' @click='hideModal()')
        | Clear

    template(v-if='screenResolution.width >= 1200')
      //- Show if not search
      b-col(v-if='!search.text' cols='12' v-for='(town, index) in Object.keys(unitsList)' :key='town.id')
        b-btn(variant='link' size='sm' v-for='(unit, number) in unitsList[town]' :key='unit.id')
          img(:src='unitsImages[unit.id].src' @click='setUnit({ side, unit }); hideModal();')

      //- Show if search
      b-col(v-if='search.text' cols='12')
        b-btn(variant='link' size='sm' v-for='(unit, index) in search.foundUnits' :key='unit.id')
          img(:src='unitsImages[unit.id].src' @click='setUnit({ side, unit}); hideModal();')

    template(v-if='screenResolution.width < 1200')
      //- Show if not search
      b-col(v-if='!search.text' cols='12' v-for='(town, index) in Object.keys(unitsList)' :key='town.id')
        img.p-1(
          width='54px'
          heigth='70px'
          v-for='(unit, number) in unitsList[town]'
          :key='unit.id'
          :src='unitsImages[unit.id].src'
          @click='setUnit({ side, unit }); hideModal();'
        )

      //- Show if search
      b-col(v-if='search.text' cols='12')
        img(
          width='54px'
          heigth='70px'
          v-for='(unit, index) in search.foundUnits'
          :key='unit.id'
          :src='unitsImages[unit.id].src'
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

    this.$nextTick(() => {
      this.jsonToData()
    })
  },
  computed: {
    ...mapGetters({
      screenResolution: 'user/getScreenResolution',
      units: 'calculator/getUnits',
      unitsImages: 'calculator/getUnitsImages'
    })
  },
  data () {
    return {
      unitsList: {
        castle: [],
        rampart: [],
        tower: [],
        inferno: [],
        necropolis: [],
        dungeon: [],
        stronghold: [],
        fortress: [],
        conflux: [],
        cove: [],
        neutral: []
      },

      images: [],

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
      for (let i = 0; i < this.units.length; i++) {
        if (this.units[i].name.includes(this.search.text) || this.units[i].name.toLowerCase().includes(this.search.text)) {
          this.search.foundUnits.push(this.units[i])
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
    },
    jsonToData () {
      // Castle
      for (let i = 0; i < 14; i++) {
        this.unitsList.castle.push(this.units[i])
      }

      // Rampart
      for (let i = 14; i < 28; i++) {
        this.unitsList.rampart.push(this.units[i])
      }

      // Tower
      for (let i = 28; i < 42; i++) {
        this.unitsList.tower.push(this.units[i])
      }

      // Necropolis
      for (let i = 42; i < 56; i++) {
        this.unitsList.necropolis.push(this.units[i])
      }

      // Dungeon
      for (let i = 56; i < 70; i++) {
        this.unitsList.dungeon.push(this.units[i])
      }

      // Inferno
      for (let i = 70; i < 84; i++) {
        this.unitsList.inferno.push(this.units[i])
      }

      // Stronghold
      for (let i = 84; i < 98; i++) {
        this.unitsList.stronghold.push(this.units[i])
      }

      // Fortress
      for (let i = 98; i < 112; i++) {
        this.unitsList.fortress.push(this.units[i])
      }

      // Conflux
      for (let i = 112; i < 126; i++) {
        this.unitsList.conflux.push(this.units[i])
      }

      // Cove
      for (let i = 141; i < 156; i++) {
        this.unitsList.cove.push(this.units[i])
      }

      // Neutral
      for (let i = 126; i < 141; i++) {
        this.unitsList.neutral.push(this.units[i])
      }

      // Neutral
      for (let i = 156; i < 161; i++) {
        this.unitsList.neutral.push(this.units[i])
      }
    }
  }
}

</script>
