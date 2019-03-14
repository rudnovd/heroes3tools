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
      b-form-input(v-model='data.search.text' type='text' placeholder='Angel' @input='searchUnit()')
    //- Clear unit
    b-col.mr-2.mr-sm-4.mr-md-4.mr-lg-5.mr-xl-5(cols='3' sm='2' md='2' lg='1' xl='1')
      b-btn(variant='danger' @click='hideModal(); clearSearch();')
        | Clear

    //- Show if not search
    b-col(v-if='!data.search.text' cols='12' v-for='(castle, index) in Object.keys(data.units.list)' :key='castle.id')
      b-btn(variant='link' size='sm' v-for='(unit, number) in data.units.list[castle]' :key='unit.id')
        img(:src='unitsImages[unit.id].src' @click='selectUnit(unit)')

    //- Show if search
    b-col(v-else)
      b-btn(variant='link' size='sm' v-for='(unit, index) in data.search.foundUnits' :key='unit.id')
        img(:src='unitsImages[unit.id].src' @click='selectUnit(unit)')

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
      data: {
        units: {
          list: {
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
          }
        },

        images: [],

        search: {
          text: null,
          foundUnits: []
        }
      }
    }
  },
  methods: {
    ...mapActions({
      setAttackerUnit: 'calculator/setAttackerUnit',
      setDefenderUnit: 'calculator/setDefenderUnit'
    }),
    selectUnit (unit) {
      if (this.side === 'attacker') this.setAttackerUnit(unit)
      else if (this.side === 'defender') this.setDefenderUnit(unit)
      this.hideModal(this.refString)

      this.clearSearch()
    },

    showModal (refString) {
      this.$refs[refString].show()
    },
    hideModal (refString) {
      this.$refs[refString].hide()
    },

    // Search units
    searchUnit () {
      this.data.search.foundUnits = []
      for (let i = 0; i < unitsJson.length; i++) {
        if (unitsJson[i].name.indexOf(this.data.search.text) !== -1 || unitsJson[i].name.toLowerCase().indexOf(this.data.search.text) !== -1) {
          this.data.search.foundUnits.push(unitsJson[i])
        }
      }
    },
    clearSearch () {
      this.data.search.text = null
      this.data.search.foundUnits = []
    },
    jsonToData () {
      // Castle
      for (let i = 0; i < 14; i++) {
        this.data.units.list.castle.push(unitsJson[i])
      }

      // Rampart
      for (let i = 14; i < 28; i++) {
        this.data.units.list.rampart.push(unitsJson[i])
      }

      // Tower
      for (let i = 28; i < 42; i++) {
        this.data.units.list.tower.push(unitsJson[i])
      }

      // Necropolis
      for (let i = 42; i < 56; i++) {
        this.data.units.list.necropolis.push(unitsJson[i])
      }

      // Dungeon
      for (let i = 56; i < 70; i++) {
        this.data.units.list.dungeon.push(unitsJson[i])
      }

      // Inferno
      for (let i = 70; i < 84; i++) {
        this.data.units.list.inferno.push(unitsJson[i])
      }

      // Stronghold
      for (let i = 84; i < 98; i++) {
        this.data.units.list.stronghold.push(unitsJson[i])
      }

      // Fortress
      for (let i = 98; i < 112; i++) {
        this.data.units.list.fortress.push(unitsJson[i])
      }

      // Conflux
      for (let i = 112; i < 126; i++) {
        this.data.units.list.conflux.push(unitsJson[i])
      }

      // Cove
      for (let i = 141; i < 156; i++) {
        this.data.units.list.cove.push(unitsJson[i])
      }

      // Neutral
      for (let i = 126; i < 141; i++) {
        this.data.units.list.neutral.push(unitsJson[i])
      }

      // Neutral
      for (let i = 156; i < 161; i++) {
        this.data.units.list.neutral.push(unitsJson[i])
      }
    }
  }
}

</script>
