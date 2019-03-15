<template lang='pug'>
b-modal(
  :title='`Pick ${side} unit`'
  :ref='refString'
  size='xl'
  no-close-on-backdrop=true
  ok-disabled=true
  cancel-disabled=true
  hide-footer=true
  @hidden='clearSearch()'
)
  //- Modal content
  b-row(align-v='center')

    //- Search unit
    b-col.ml-2.mr-auto.mb-3(cols='5' sm='5' md='5' lg='4' xl='3')
      b-form-input(v-model='search.text' type='text' placeholder='Angel' @input='searchUnit()')
    //- Clear unit
    b-col.mr-2.mr-sm-4.mr-md-4.mr-lg-5.mr-xl-5(cols='3' sm='2' md='2' lg='1' xl='1')
      b-btn(variant='danger' @click='hideModal(); clearSearch();')
        | Clear

    //- Show if not search
    b-col(v-if='!search.text' cols='12' v-for='(castle, index) in Object.keys(units)' :key='castle.id')
      b-btn(variant='link' size='sm' v-for='(unit, number) in units[castle]' :key='unit.id')
        img(:src='unitsImages[unit.id].src' @click='setUnit({ side, unit }); hideModal();')

    //- Show if search
    b-col(v-else)
      b-btn(variant='link' size='sm' v-for='(unit, index) in search.foundUnits' :key='unit.id')
        img(:src='unitsImages[unit.id].src' @click='setUnit({ side, unit}); hideModal();')

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import unitsJson from '@/assets/json/units.json'

export default {
  name: 'pickUnitModal',
  props: {
    side: String,
    refString: String
  },
  mounted () {
    const vm = this

    this.$root.$on(this.refString, function () {
      vm.showModal(vm.refString)
    })

    this.jsonToData()
  },
  computed: {
    ...mapGetters({
      unitsImages: 'calculator/getUnitsImages'
    })
  },
  data () {
    return {
      units: {
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
    },

    // Search units
    searchUnit () {
      this.search.foundUnits = []
      for (let i = 0; i < unitsJson.length; i++) {
        if (!unitsJson[i].name.includes(this.search.text) || !unitsJson[i].name.toLowerCase().includes(this.search.text)) {
          this.search.foundUnits.push(unitsJson[i])
        }
      }
    },
    clearSearch () {
      this.search.text = null
      this.search.foundUnits = []
    },
    jsonToData () {
      // Castle
      for (let i = 0; i < 14; i++) {
        this.units.castle.push(unitsJson[i])
      }

      // Rampart
      for (let i = 14; i < 28; i++) {
        this.units.rampart.push(unitsJson[i])
      }

      // Tower
      for (let i = 28; i < 42; i++) {
        this.units.tower.push(unitsJson[i])
      }

      // Necropolis
      for (let i = 42; i < 56; i++) {
        this.units.necropolis.push(unitsJson[i])
      }

      // Dungeon
      for (let i = 56; i < 70; i++) {
        this.units.dungeon.push(unitsJson[i])
      }

      // Inferno
      for (let i = 70; i < 84; i++) {
        this.units.inferno.push(unitsJson[i])
      }

      // Stronghold
      for (let i = 84; i < 98; i++) {
        this.units.stronghold.push(unitsJson[i])
      }

      // Fortress
      for (let i = 98; i < 112; i++) {
        this.units.fortress.push(unitsJson[i])
      }

      // Conflux
      for (let i = 112; i < 126; i++) {
        this.units.conflux.push(unitsJson[i])
      }

      // Cove
      for (let i = 141; i < 156; i++) {
        this.units.cove.push(unitsJson[i])
      }

      // Neutral
      for (let i = 126; i < 141; i++) {
        this.units.neutral.push(unitsJson[i])
      }

      // Neutral
      for (let i = 156; i < 161; i++) {
        this.units.neutral.push(unitsJson[i])
      }
    }
  }
}

</script>
