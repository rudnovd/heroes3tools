<template lang='pug'>
b-container(): b-row.mt-3.mb-3(): b-col.calculator(cols='12')

  b-row
    //- Attacker col
    b-col.attacker.border-top.border-right(cols='12' sm='12' md='6' lg='6' xl='6')

      //- Text
      b-row.mt-3.mb-3
        b-col(cols='12')
          h4 Attacker

      //- Pick ATTACKER unit image and units count
      b-row

        //- Pick ATTACKER unit image
        b-col(cols='3' sm='3' md='4' lg='3' xl='3')
          b-row
            b-col(cols='12')
              b-button.mb-1(variant='link' size='sm' @click='pickAttackerModalShow()')
                img.border.border-dark(v-if='attacker.unit.id' :src='unitsImages[attacker.unit.id].src')
                font-awesome-icon.fa-4x(v-else icon='question-circle' style='color: #00CB31')

          //- Attacker units count
          b-row(v-if='data.attacker.unit')
            b-col.ml-2(cols='auto' sm='8' md='9' lg='9' xl='8')
              b-form-input(
                v-model='data.attacker.unitsCount'
                type='number'
                :disabled='!data.attacker.unit'
                size='sm'
                min=1
                max=999
                @input='calculate()'
              )

        //- Pick ATTACKER unit button
        b-col(cols='9' sm='9' md='8' lg='9' xl='9')
          b-button.green-btn(size='sm' block @click='pickAttackerModalShow()')
            template(v-if='data.attacker.unit')
              strong
                | {{ data.attacker.unit.name }}
            template(v-else)
              | Pick

          //- Choose ATTACKER hero
          b-row.mt-3
            b-col(cols='12')
              select-hero(side='attacker')

      select-hero-stats.mt-2(side='attacker')

      select-hero-skills.mt-3(side='attacker')

      //- Spells select
      b-row.mt-2(v-if='data.attacker.hero.hero')
        //- Attacker attack buffs checkboxes
        b-col(cols='4' sm='4' md='4' lg='3' xl='3')
          b-form-group
            b-form-checkbox(
              v-for='(value, index) in data.spells.attackBuffs'
              :key='value'
              :checked='data.attacker.effects.includes(value)'
              @change='pushAttackerSpells(value)'
            ) {{ value }}

        //- Attacker defense buffs checkboxes
        b-col(cols='4' sm='4' md='4' lg='3' xl='3')
          b-form-group
            b-form-checkbox(
              v-for='(value, index) in data.spells.defenseBuffs'
              :key='value'
              :checked='data.attacker.effects.includes(value)'
              @change='pushAttackerSpells(value)'
            ) {{ value }}

        //- Attacker attack debuffs checkboxes
        b-col(cols='4' sm='4' md='4' lg='3' xl='3')
          b-form-group
            b-form-checkbox(
              v-for='(value, index) in data.spells.attackDebuffs'
              :key='value'
              :checked='data.attacker.effects.includes(value)'
              @change='pushAttackerSpells(value)'
            ) {{ value }}

      //- Show ATTACKER unit effects
      b-row(v-if='data.attacker.hero.hero')
        b-col.mt-3.mt-sm-3.mt-md-2.mt-lg-2.mt-xl-2(cols='7' sm='7' md='8' lg='6' xl='12')
          small(v-if='data.attacker.effects.length > 0') Effects: {{ data.attacker.effects }}
          small.invisible(v-else) Effects:

      //- Calculate ATTACKER damage
      b-row.mt-3(v-if='data.attacker.unit && data.defender.unit')
        //- Text
        b-col.text-right
          strong Damage:
        //- Damage value
        p.text-left.mr-3
          strong(v-if='data.attacker.minDamage !== data.attacker.maxDamage')
            | {{ data.attacker.minDamage }} — {{data.attacker.maxDamage}} (~ {{ data.attacker.averageDamage }})
          strong(v-else)
            | {{ data.attacker.minDamage }}
        //- If unit hits > 0
        p.text-left.mr-3(v-if='data.attacker.unit.hits > 1')
          strong
            | x{{ data.attacker.unit.hits }}

      //- Calculate ATTACKER kills
      b-row.mt-2(v-if='data.attacker.unit && data.defender.unit')
        //- Text
        b-col.text-right
          strong Kills:
        //- Kills value
        p.text-left.mr-3
          strong(v-if='data.attacker.minKills !== data.attacker.maxKills')
            | {{ data.attacker.minKills }} — {{ data.attacker.maxKills }} (~ {{ data.attacker.averageKills }})
          strong(v-else)
            | {{ data.attacker.minKills }}
        //- If unit hits > 0
        p.text-left.mr-3(v-if='data.attacker.unit.hits > 1')
          strong
            | x{{ data.attacker.unit.hits }}

    //- Defender col
    b-col.defender.border-top(cols='12' sm='12' md='6' lg='6' xl='6')
      //- Text
      b-row.mt-3.mb-3
        b-col(cols='12')
          h4.text-right Defender

      //- Pick DEFENDER unit image and units count
      b-row

        //- Pick DEFENDER unit button
        b-col(cols='9' sm='9' md='8' lg='9' xl='9')
          b-button(size='sm' variant='danger' block @click='pickDefenderModalShow()')
            template(v-if='data.defender.unit')
              strong
                | {{ data.defender.unit.name }}
            template(v-else)
              | Pick

          //- Choose DEFENDER hero
          b-row.mt-3
            b-col(cols='12')
              select-hero(side='defender')

        //- Pick DEFENDER unit image
        b-col.text-right(cols='3' sm='3' md='4' lg='3' xl='3')
          b-row
            b-col(cols='12')
              b-button.mb-1(variant='link' size='sm' @click='pickDefenderModalShow()')
                img.border.border-dark(v-if='defender.unit.id' :src='unitsImages[defender.unit.id].src')
                font-awesome-icon.fa-4x(v-else icon='question-circle' style='color: #DC3545')

          //- Defender units count
          b-row.float-right(v-if='data.defender.unit')
            b-col(cols='auto' sm='11' md='11' lg='11' xl='11')
              b-form-input(
                v-model='data.defender.unitsCount'
                type='number'
                :disabled='!data.defender.unit'
                size='sm'
                min=1
                max=999
                @input='calculate()'
              )

      select-hero-stats.mt-2(side='defender')

      select-hero-skills.mt-3(side='defender')

      //- Select skills
      template(v-if='data.defender.hero.hero')

      //- Spells select
      b-row.mt-2(v-if='data.defender.hero.hero')
        //- DEFENDER attack buffs checkboxes
        b-col(cols='4' sm='4' md='4' lg='3' xl='3')
          b-form-group
            b-form-checkbox(
              v-for='(value, index) in data.spells.attackBuffs'
              :key='value'
              :checked='data.defender.effects.includes(value)'
              @change='pushDefenderSpells(value)'
            ) {{ value }}

        //- DEFENDER defense buffs checkboxes
        b-col(cols='4' sm='4' md='4' lg='3' xl='3')
          b-form-group
            b-form-checkbox(
              v-for='(value, index) in data.spells.defenseBuffs'
              :key='value'
              :checked='data.defender.effects.includes(value)'
              @change='pushDefenderSpells(value)'
            ) {{ value }}

        //- DEFENDER attack debuffs checkboxes
        b-col(cols='4' sm='4' md='4' lg='3' xl='3')
          b-form-group
            b-form-checkbox(
              v-for='(value, index) in data.spells.attackDebuffs'
              :key='value'
              :checked='data.defender.effects.includes(value)'
              @change='pushDefenderSpells(value)'
            ) {{ value }}

      //- Show DEFENDER unit effects
      b-row(v-if='data.defender.hero.hero')
        b-col.mt-3.mt-sm-3.mt-md-2.mt-lg-2.mt-xl-2(cols='7' sm='7' md='8' lg='6' xl='12')
          small(v-if='data.defender.effects.length > 0') Effects: {{ data.defender.effects }}
          small.invisible(v-else) Effects:

      //- Calculate DEFENDER damage
      b-row.mt-3(v-if='data.defender.unit && data.attacker.unit')
        //- Text
        b-col.text-right
          strong Damage:
        //- Damage value
        p.text-left.mr-3
          strong(v-if='data.defender.minDamage !== data.defender.maxDamage')
            | {{ data.defender.minDamage }} — {{data.defender.maxDamage}} (~ {{ data.defender.averageDamage }})
          strong(v-else)
            | {{ data.defender.minDamage }}
        //- If unit hits > 0
        p.text-left.mr-3(v-if='data.defender.unit.hits > 1')
          strong
            | x{{ data.defender.unit.hits }}

      //- Calculate DEFENDER kills
      b-row.mt-2(v-if='data.defender.unit && data.attacker.unit')
        //- Text
        b-col.text-right
          strong Kills:
        //- Kills value
        p.text-left.mr-3
          strong(v-if='data.defender.minKills !== data.defender.maxKills')
            | {{ data.defender.minKills }} — {{data.defender.maxKills}} (~ {{ data.defender.averageKills }})
          strong(v-else)
            | {{ data.defender.minKills }}
        //- If unit hits > 0
        p.text-left.mr-3(v-if='data.defender.unit.hits > 1')
          strong
            | x{{ data.defender.unit.hits }}

  //- Bottom panel
  b-row.p-2.border-top

    //- Swap button
    b-col.text-left.ml-auto.mr-auto.mr-md-3.mr-lg-3.mr-xl-3(cols='auto' sm='2' md='1' lg='1' xl='1')
      b-button(v-if='this.data.attacker.unit && this.data.defender.unit' variant='link' size='sm' @click='swapSides()')
        font-awesome-icon.fa-2x(icon='sync' style='color: #DC3545')

    //- Terrain text
    b-col(cols='auto' sm='2' md='2' lg='1' xl='1' offset='0' offset-sm='4' offset-md='0' offset-lg='2' offset-xl='2').text-right
      label.mt-1 Terrain:

    //- Terrain select
    b-col(cols='auto' sm='4' md='3' lg='2' xl='2')
      b-form-select(
        v-model='data.terrain'
        :options='data.terrainOptions'
        value-field='id'
        text-field='name'
        size='sm'
        @input='calculate()'
      )
        template(slot='first')
          option(:value='null') Don't care

  //- Pick ATTACKER unit modal
  pick-unit-modal(side='attacker' refString='attackerModal' @sendUnit='selectUnit("attacker", $event)')

  //- Pick DEFENDER unit modal
  pick-unit-modal(side='defender' refString='defenderModal' @sendUnit='selectUnit("defender", $event)')
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import selectHero from '@/components/damageCalculator/selectHero.vue'

import selectHeroStats from '@/components/damageCalculator/selectHeroStats.vue'

import pickUnitModal from '@/components/damageCalculator/pickUnitModal.vue'

import selectHeroSkills from '@/components/damageCalculator/selectHeroSkills.vue'

import terrainsJson from '@/assets/json/terrains.json'

import unitsHatesJson from '@/assets/json/unitsHates.json'

export default {
  name: 'DamageCalculator',
  components: {
    'select-hero': selectHero,
    'select-hero-stats': selectHeroStats,
    'pick-unit-modal': pickUnitModal,
    'select-hero-skills': selectHeroSkills
  },
  beforeCreate () {
    document.title = 'Damage calculator'
  },
  computed: {
    ...mapGetters({
      attacker: 'calculator/getAttacker',
      defender: 'calculator/getDefender',
      unitsImages: 'calculator/getUnitsImages'
    })
  },
  data () {
    return {
      data: {

        spells: {
          attackBuffs: ['Bless', 'Bloodlust', 'Frenzy', 'Prayer', 'Precision', 'Slayer'],
          defenseBuffs: ['Shield', 'Stone Skin', 'Air Shield'],
          attackDebuffs: ['Curse', 'Weakness', 'Disrupting Ray'],
          defenseDebuffs: []
        },

        terrain: null,
        terrainOptions: terrainsJson,

        unitsHates: unitsHatesJson,

        attacker: {
          unit: null,
          unitsCount: 1,

          hero: {
            hero: null,
            level: 1,
            attack: 0,
            defense: 0,

            skills: {
              offenseLevel: 0,
              archeryLevel: 0,
              artilleryLevel: 0,
              armorerLevel: 0,

              airLevel: 0,
              fireLevel: 0,
              earthLevel: 0,
              waterLevel: 0
            }
          },
          minDamage: 0,
          maxDamage: 0,
          averageDamage: 0,

          minKills: 0,
          maxKills: 0,
          averageKills: 0,

          // Maximum effects - 3
          effects: [],

          attackBuffs: [],
          defenseBuffs: [],
          attackDebuffs: [],
          defenseDebuffs: [],

          search: {
            text: null,
            foundUnits: []
          }
        },

        defender: {
          unit: null,
          unitsCount: 1,

          hero: {
            hero: null,
            level: 1,
            attack: 0,
            defense: 0,

            skills: {
              offenseLevel: 0,
              archeryLevel: 0,
              artilleryLevel: 0,
              armorerLevel: 0,

              airLevel: 0,
              fireLevel: 0,
              earthLevel: 0,
              waterLevel: 0
            }
          },
          minDamage: 0,
          maxDamage: 0,
          averageDamage: 0,

          minKills: 0,
          maxKills: 0,
          averageKills: 0,

          // Maximum effects - 3
          effects: [],

          attackBuffs: [],
          defenseBuffs: [],
          attackDebuffs: [],
          defenseDebuffs: [],

          search: {
            text: null,
            foundUnits: []
          }
        }

      }
    }
  },
  mounted () {
    this.getUnitsImages()
    this.getHeroes()
  },
  methods: {
    ...mapActions({
      swapHeroes: 'calculator/swapHeroes',
      getUnitsImages: 'calculator/getUnitsImages',
      getHeroes: 'calculator/getHeroes'
    }),
    // Show modal
    pickAttackerModalShow () {
      this.$root.$emit('attackerModal')
    },
    pickDefenderModalShow () {
      this.$root.$emit('defenderModal')
    },

    // Hide modals
    selectAttackerModalHide () {
      this.$refs.selectAttackerModal.hide()
    },
    selectDefenderModalHide () {
      this.$refs.selectDefenderModal.hide()
    },

    pushAttackerSpells (spell) {
      if (this.data.attacker.effects.includes(spell)) {
        this.data.attacker.effects.splice(this.data.attacker.effects.indexOf(spell), 1) // Remove effect from array for checkbox
      } else {
        // Maximum effects on unit = 3
        if (this.data.attacker.effects.length === 3) {
          this.data.attacker.effects.shift()
        }
        this.data.attacker.effects.push(spell)
      }

      this.calculate()
    },
    pushDefenderSpells (spell) {
      if (this.data.defender.effects.includes(spell)) {
        this.data.defender.effects.splice(this.data.defender.effects.indexOf(spell), 1) // Remove effect from array for checkbox
      } else {
        // Maximum effects on unit = 3
        if (this.data.defender.effects.length === 3) {
          this.data.defender.effects.shift()
        }
        this.data.defender.effects.push(spell)
      }

      this.calculate()
    },

    // Calculation
    calculate () {
      if (this.data.attacker.unit && this.data.defender.unit) {
        // Init units stats, damages and total damages
        let attackerAttack = this.data.attacker.unit.stats.attack
        let attackerDefense = this.data.attacker.unit.stats.defense
        let attackerMinDamage = this.data.attacker.unit.stats.minDamage
        let attackerMaxDamage = this.data.attacker.unit.stats.maxDamage

        let attackerTotalMinDamage = 0
        let attackerTotalMaxDamage = 0

        let defenderAttack = this.data.defender.unit.stats.attack
        let defenderDefense = this.data.defender.unit.stats.defense
        let defenderMinDamage = this.data.defender.unit.stats.minDamage
        let defenderMaxDamage = this.data.defender.unit.stats.maxDamage

        let defenderTotalMinDamage = 0
        let defenderTotalMaxDamage = 0

        // Modificate units stats
        const modifedStats = this.calculateStatsModification(attackerAttack, attackerDefense, defenderAttack, defenderDefense)
        attackerAttack = modifedStats.attackerAttack
        attackerDefense = modifedStats.attackerDefense
        defenderAttack = modifedStats.defenderAttack
        defenderDefense = modifedStats.defenderDefense

        // Modificate units min/max damages
        const modifedDamages = this.calculateDamagesModification(attackerMinDamage, attackerMaxDamage, defenderMinDamage, defenderMaxDamage)
        attackerMinDamage = modifedDamages.attackerMinDamage
        attackerMaxDamage = modifedDamages.attackerMaxDamage
        defenderMinDamage = modifedDamages.defenderMinDamage
        defenderMaxDamage = modifedDamages.defenderMaxDamage

        // Calculate damages

        // For ATTACKER

        // If ATTACKER attack > DEFENDER defense
        // Then base formula:
        // ATTACKER units count * ATTACKER unit damage * (1 + 0.05 * (ATTACKER attack - DEFENDER defense))

        // Else if ATTACKER attack < DEFENDER defense
        // Then base formula:
        // ATTACKER units count * ATTACKER unit damage * (1 - 0.025 * (DEFENDER defense - ATTACKER attack))

        // Calculate damage with stats modificators
        if (attackerAttack > defenderDefense || attackerAttack === defenderDefense) {
          // Max attack cap = 3
          const cap = 0.05 * (attackerAttack - defenderDefense)

          if (cap <= 3) {
            attackerTotalMinDamage = this.data.attacker.unitsCount * attackerMinDamage * (1 + cap)
            attackerTotalMaxDamage = this.data.attacker.unitsCount * attackerMaxDamage * (1 + cap)
          } else {
            attackerTotalMinDamage = this.data.attacker.unitsCount * attackerMinDamage * (1 + 3)
            attackerTotalMaxDamage = this.data.attacker.unitsCount * attackerMaxDamage * (1 + 3)
          }
        } else if (attackerAttack < defenderDefense) {
          // Max attack cap = 0.7
          const cap = 0.025 * (defenderDefense - attackerAttack)

          if (cap <= 0.7) {
            attackerTotalMinDamage = this.data.attacker.unitsCount * attackerMinDamage * (1 - cap)
            attackerTotalMaxDamage = this.data.attacker.unitsCount * attackerMaxDamage * (1 - cap)
          } else {
            attackerTotalMinDamage = this.data.attacker.unitsCount * attackerMinDamage * (1 - 0.7)
            attackerTotalMaxDamage = this.data.attacker.unitsCount * attackerMaxDamage * (1 - 0.7)
          }
        }

        // For DEFENDER

        // If DEFENDER attack > ATTACKER defense
        // Then base formula:
        // DEFENDER units count * DEFENDER unit damage * (1 + 0.05 * (DEFENDER attack - ATTACKER defense))

        // Else if DEFENDER attack < ATTACKER defense
        // Then base formula:
        // DEFENDER units count * DEFENDER unit damage * (1 - 0.025 * (ATTACKER defense - DEFENDER attack))
        if (defenderAttack > attackerDefense || defenderAttack === attackerDefense) {
          // Max attack cap = 3
          if (0.025 * (defenderAttack - attackerDefense) <= 3) {
            defenderTotalMinDamage = this.data.defender.unitsCount * defenderMinDamage * (1 + 0.05 * (defenderAttack - attackerDefense))
            defenderTotalMaxDamage = this.data.defender.unitsCount * defenderMaxDamage * (1 + 0.05 * (defenderAttack - attackerDefense))
          } else {
            defenderTotalMinDamage = this.data.defender.unitsCount * defenderMinDamage * (1 + 3)
            defenderTotalMaxDamage = this.data.defender.unitsCount * defenderMaxDamage * (1 + 3)
          }
        } else if (defenderAttack < attackerDefense) {
          // Max attack cap = 0.7
          if (0.025 * (attackerDefense - defenderAttack) <= 0.7) {
            defenderTotalMinDamage = this.data.defender.unitsCount * defenderMinDamage * (1 - 0.025 * (attackerDefense - defenderAttack))
            defenderTotalMaxDamage = this.data.defender.unitsCount * defenderMaxDamage * (1 - 0.025 * (attackerDefense - defenderAttack))
          } else {
            defenderTotalMinDamage = this.data.defender.unitsCount * defenderMinDamage * (1 - 0.7)
            defenderTotalMaxDamage = this.data.defender.unitsCount * defenderMaxDamage * (1 - 0.7)
          }
        }

        // Modificate total damages
        const modifedTotalDamages = this.calculateTotalDamagesModification(attackerTotalMinDamage, attackerTotalMaxDamage, defenderTotalMinDamage, defenderTotalMaxDamage)
        attackerTotalMinDamage = modifedTotalDamages.attackerTotalMinDamage
        attackerTotalMaxDamage = modifedTotalDamages.attackerTotalMaxDamage
        defenderTotalMinDamage = modifedTotalDamages.defenderTotalMinDamage
        defenderTotalMaxDamage = modifedTotalDamages.defenderTotalMaxDamage

        // Units hates damage modificators
        const unitsHatesTotalDamages = this.calculateWithHates(attackerTotalMinDamage, attackerTotalMaxDamage, defenderTotalMinDamage, defenderTotalMaxDamage)
        attackerTotalMinDamage = unitsHatesTotalDamages.attackerTotalMinDamage
        attackerTotalMaxDamage = unitsHatesTotalDamages.attackerTotalMaxDamage
        defenderTotalMinDamage = unitsHatesTotalDamages.defenderTotalMinDamage
        defenderTotalMaxDamage = unitsHatesTotalDamages.defenderTotalMaxDamage

        // Transform total damages
        this.data.attacker.minDamage = Math.floor(attackerTotalMinDamage)
        this.data.attacker.maxDamage = Math.floor(attackerTotalMaxDamage)
        this.data.attacker.averageDamage = Math.floor((this.data.attacker.minDamage + this.data.attacker.maxDamage) / 2)
        this.data.attacker.minKills = Math.floor(this.data.attacker.minDamage / this.data.defender.unit.stats.health)
        this.data.attacker.maxKills = Math.floor(this.data.attacker.maxDamage / this.data.defender.unit.stats.health)
        this.data.attacker.averageKills = Math.floor(this.data.attacker.averageDamage / this.data.defender.unit.stats.health)

        this.data.defender.minDamage = Math.floor(defenderTotalMinDamage)
        this.data.defender.maxDamage = Math.floor(defenderTotalMaxDamage)
        this.data.defender.averageDamage = Math.floor((this.data.defender.minDamage + this.data.defender.maxDamage) / 2)

        this.data.defender.minKills = Math.floor(this.data.defender.minDamage / this.data.attacker.unit.stats.health)
        this.data.defender.maxKills = Math.floor(this.data.defender.maxDamage / this.data.attacker.unit.stats.health)
        this.data.defender.averageKills = Math.floor(this.data.defender.averageDamage / this.data.attacker.unit.stats.health)
      }
    },
    calculateStatsModification (attackerAttack, attackerDefense, defenderAttack, defenderDefense) {
      attackerAttack += parseInt(this.data.attacker.hero.attack)
      attackerDefense += parseInt(this.data.attacker.hero.defense)

      defenderAttack += parseInt(this.data.defender.hero.attack)
      defenderDefense += parseInt(this.data.defender.hero.defense)

      if (this.data.terrain) {
        if (this.data.attacker.unit.nativeTerrainId === this.data.terrain) {
          attackerAttack++
          attackerDefense++
        }
        if (this.data.defender.unit.nativeTerrainId === this.data.terrain) {
          defenderAttack++
          defenderDefense++
        }
      }

      const attackerHero = this.data.attacker.hero.hero
      const defenderHero = this.data.defender.hero.hero

      const attackerAir = this.data.attacker.hero.skills.airLevel
      const attackerFire = this.data.attacker.hero.skills.fireLevel
      const attackerEarth = this.data.attacker.hero.skills.earthLevel
      const attackerWater = this.data.attacker.hero.skills.waterLevel

      const defenderAir = this.data.defender.hero.skills.airLevel
      const defenderFire = this.data.defender.hero.skills.fireLevel
      const defenderEarth = this.data.defender.hero.skills.earthLevel
      const defenderWater = this.data.defender.hero.skills.waterLevel

      // ATTACKER hero unit specialty bonus1
      if (attackerHero) {
        if (attackerHero.specialtyUnit !== undefined) {
          if (attackerHero.specialtyUnit.includes(this.data.attacker.unit.id)) {
            attackerAttack *= 1 + this.data.attacker.hero.level / this.data.attacker.unit.level * 0.05
            attackerDefense *= 1 + this.data.attacker.hero.level / this.data.attacker.unit.level * 0.05

            attackerAttack = Math.ceil(attackerAttack)
            attackerDefense = Math.ceil(attackerDefense)
          }
        }
      }

      if (this.data.attacker.effects.length > 0) {
        const effects = this.data.attacker.effects

        // ATTACKER stats buffs

        // Bloodlust spell
        if (effects.includes('Bloodlust')) {
          // Bloodlust spell hero specialty bonus
          if (attackerHero.specialtySpell === 'bloodlust') {
            if (this.data.attacker.unit.level <= 2) attackerAttack += 3
            else if (this.data.attacker.unit.level <= 4) attackerAttack += 2
            else if (this.data.attacker.unit.level <= 6) attackerAttack += 1
          }

          if (attackerFire < 2) attackerAttack += 3
          else if (attackerFire > 1) attackerAttack += 6
        }

        // Frenzy spell
        if (effects.includes('Frenzy')) {
          if (attackerFire < 2) attackerAttack += attackerDefense
          else if (attackerFire === 2) attackerAttack += attackerDefense * 1.5
          else if (attackerFire === 3) attackerAttack += attackerDefense * 2
          attackerDefense = 0
        }

        // Slayer spell
        if (effects.includes('Slayer')) {
          let units = [26, 27, 54, 55, 68, 69, 96, 97, 110, 111, 137, 138, 139, 140]
          if (attackerFire === 2) units.push(12, 13, 82, 83)
          else if (attackerFire === 3) units.push(40, 41, 124, 125, 154, 155)

          // If DEFENDER unit in slayer units list
          if (units.includes(this.data.defender.unit.id)) attackerAttack += 8
        }

        // Prayer spell
        if (effects.includes('Prayer')) {
          // Prayer spell hero specialty bonus
          if (attackerHero.specialtySpell === 'prayer') {
            if (this.data.attacker.unit.level <= 2) {
              attackerAttack += 3
              attackerDefense += 3
            } else if (this.data.attacker.unit.level <= 4) {
              attackerAttack += 2
              attackerDefense += 2
            } else if (this.data.attacker.unit.level <= 6) {
              attackerAttack += 1
              attackerDefense += 1
            }
          }

          if (attackerWater < 2) {
            attackerAttack += 2
            attackerDefense += 2
          } else if (attackerWater > 1) {
            attackerAttack += 4
            attackerDefense += 4
          }
        }

        // Precision spell
        if (effects.includes('Precision') && this.data.attacker.unit.ranged) {
          // Precision hero specialty bonus
          if (attackerHero.specialtySpell === 'precision') {
            if (this.data.attacker.unit.level <= 2) attackerAttack += 3
            else if (this.data.attacker.unit.level <= 4) attackerAttack += 2
            else if (this.data.attacker.unit.level <= 6) attackerAttack += 1
          }

          if (attackerAir < 2) attackerAttack += 3
          else if (attackerAir > 1) attackerAttack += 6
        }

        // Stone skin spell
        if (effects.includes('Stone Skin')) {
          // Stone skin hero specialty bonus
          if (attackerHero.specialtySpell === 'stone skin') {
            if (this.data.attacker.unit.level <= 2) attackerDefense += 3
            else if (this.data.attacker.unit.level <= 4) attackerDefense += 2
            else if (this.data.attacker.unit.level <= 6) attackerDefense += 1
          }

          if (attackerEarth < 2) attackerDefense += 3
          else if (attackerEarth > 1) attackerDefense += 6
        }

        // ATTACKER stats debuffs

        // Weakness spell
        if (effects.includes('Weakness')) {
          // Weakness hero specialty bonus
          if (defenderHero.specialtySpell === 'weakness') {
            if (this.data.attacker.unit.level <= 2) attackerAttack -= 3
            else if (this.data.attacker.unit.level <= 4) attackerAttack -= 2
            else if (this.data.attacker.unit.level <= 6) attackerAttack -= 1
          }

          if (defenderWater < 2) attackerAttack -= 3
          else if (defenderWater > 1) attackerAttack -= 6
        }

        // Disrupting Ray spell
        if (effects.includes('Disrupting Ray')) {
          // Disrupting Ray hero specialty bonus
          if (defenderHero.specialtySpell === 'disrupting ray') attackerDefense -= 2

          if (defenderAir < 2) attackerDefense -= 3
          else if (defenderAir === 2) attackerDefense -= 4
          else if (defenderAir === 3) attackerDefense -= 5
        }
      }

      // DEFENDER stats buffs

      // DEFENDER hero unit specialty bonus
      if (defenderHero) {
        if (defenderHero.specialtyUnit !== undefined) {
          if (defenderHero.specialtyUnit.includes(this.data.defender.unit.id)) {
            defenderAttack *= 1 + this.data.defender.hero.level / this.data.defender.unit.level * 0.05
            defenderDefense *= 1 + this.data.defender.hero.level / this.data.defender.unit.level * 0.05

            defenderAttack = Math.ceil(defenderAttack)
            defenderDefense = Math.ceil(defenderDefense)
          }
        }
      }

      if (this.data.defender.effects.length > 0) {
        const effects = this.data.defender.effects

        // Bloodlust spell
        if (effects.includes('Bloodlust')) {
          if (defenderHero.specialtySpell === 'bloodlust') {
            if (this.data.defender.unit.level <= 2) defenderAttack += 3
            else if (this.data.defender.unit.level <= 4) defenderAttack += 2
            else if (this.data.defender.unit.level <= 6) defenderAttack += 1
          }

          if (defenderFire < 2) defenderAttack += 3
          else if (defenderFire > 1) defenderAttack += 6
        }

        // Frenzy spell
        if (effects.includes('Frenzy')) {
          if (defenderFire < 2) defenderAttack += defenderDefense
          else if (defenderFire === 2) defenderAttack += defenderDefense * 1.5
          else if (defenderFire === 3) defenderAttack += defenderDefense * 2
          defenderDefense = 0
        }

        // Slayer spell
        if (effects.includes('Slayer')) {
          let units = [26, 27, 54, 55, 68, 69, 96, 97, 110, 111, 137, 138, 139, 140]
          if (attackerFire === 2) units.push(12, 13, 82, 83)
          else if (attackerFire === 3) units.push(40, 41, 124, 125, 154, 155)

          // If ATTACKER unit in slayer units list
          if (units.includes(this.data.attacker.unit.id)) defenderAttack += 8
        }

        // Prayer spell
        if (effects.includes('Prayer')) {
          // Prayer spell hero specialty bonus
          if (defenderHero.specialtySpell === 'prayer') {
            if (this.data.defender.unit.level <= 2) {
              defenderAttack += 3
              defenderDefense += 3
            } else if (this.data.defender.unit.level <= 4) {
              defenderAttack += 2
              defenderDefense += 2
            } else if (this.data.defender.unit.level <= 6) {
              defenderAttack += 1
              defenderDefense += 1
            }
          }

          if (defenderWater < 2) {
            defenderAttack += 2
            defenderDefense += 2
          } else if (defenderWater > 1) {
            defenderAttack += 4
            defenderDefense += 4
          }
        }

        // Precision spell
        if (effects.includes('Precision') && this.data.defender.unit.ranged) {
          if (defenderHero.specialtySpell === 'precision') {
            if (this.data.defender.unit.level <= 2) defenderAttack += 3
            else if (this.data.defender.unit.level <= 4) defenderAttack += 2
            else if (this.data.defender.unit.level <= 6) defenderAttack += 1
          }

          if (defenderAir < 2) defenderAttack += 3
          else if (defenderAir > 1) defenderAttack += 6
        }

        // Stone skin spell
        if (effects.includes('Stone Skin')) {
          // Stone skin hero specialty bonus
          if (defenderHero.specialtySpell === 'stone skin') {
            if (this.data.defender.unit.level <= 2) defenderDefense += 3
            else if (this.data.defender.unit.level <= 4) defenderDefense += 2
            else if (this.data.defender.unit.level <= 6) defenderDefense += 1
          }

          if (defenderEarth < 2) defenderDefense += 3
          else if (defenderEarth > 1) defenderDefense += 6
        }

        // ATTACKER stats debuffs

        // Weakness spell
        if (effects.includes('Weakness')) {
          // Weakness hero specialty bonus
          if (attackerHero.specialtySpell === 'weakness') {
            if (this.data.defender.unit.level <= 2) defenderAttack -= 3
            else if (this.data.defender.unit.level <= 4) defenderAttack -= 2
            else if (this.data.defender.unit.level <= 6) defenderAttack -= 1
          }

          if (attackerWater < 2) defenderAttack -= 3
          else if (attackerWater > 1) defenderAttack -= 6
        }

        // Disrupting Ray spell
        if (effects.includes('Disrupting Ray')) {
          // Disrupting Ray hero specialty bonus
          if (attackerHero.specialtySpell === 'disrupting ray') defenderDefense -= 2

          if (attackerAir < 2) defenderDefense -= 3
          else if (attackerAir === 2) defenderDefense -= 4
          else if (attackerAir === 3) defenderDefense -= 5
        }

        // Curse spell
        if (effects.includes('Curse')) {
          if (attackerFire < 2) this.data.defender.unit.stats.maxDamage = this.data.defender.unit.stats.minDamage
          else if (attackerFire > 1) {
            this.data.defender.unit.stats.minDamage = this.data.defender.unit.stats.minDamage * 0.8 - 1
            this.data.defender.unit.stats.maxDamage = this.data.defender.unit.stats.minDamage
          }
        }
      }
      return { attackerAttack, attackerDefense, defenderAttack, defenderDefense }
    },
    calculateDamagesModification (attackerMinDamage, attackerMaxDamage, defenderMinDamage, defenderMaxDamage) {
      const attackerHero = this.data.attacker.hero.hero
      // const attackerAir = this.data.attacker.hero.skills.airLevel
      const attackerFire = this.data.attacker.hero.skills.fireLevel
      // const attackerEarth = this.data.attacker.hero.skills.earthLevel
      const attackerWater = this.data.attacker.hero.skills.waterLevel

      // const defenderAir = this.data.defender.hero.skills.airLevel
      const defenderFire = this.data.defender.hero.skills.fireLevel
      // const defenderEarth = this.data.defender.hero.skills.earthLevel
      const defenderWater = this.data.defender.hero.skills.waterLevel

      // For ATTACKER
      if (this.data.attacker.effects.length > 0) {
        const effects = this.data.attacker.effects

        // Bless spell
        if (effects.includes('Bless')) {
          if (attackerHero.specialtySpell === 'bless') {
          } else {
            if (attackerWater < 2) attackerMinDamage = attackerMaxDamage
            else if (attackerWater > 1) attackerMinDamage = attackerMaxDamage + 1
          }
        }

        // Curse spell
        if (this.data.attacker.effects.includes('Curse')) {
          if (defenderFire < 2) attackerMaxDamage = attackerMinDamage
          else if (defenderFire > 1) {
            attackerMinDamage = attackerMinDamage * 0.8 - 1
            attackerMaxDamage = attackerMinDamage
          }
        }
      }

      // For DEFENDER
      if (this.data.defender.effects.length > 0) {
        const effects = this.data.defender.effects

        // Bless spell
        if (effects.includes('Bless')) {
          if (defenderWater < 2) defenderMinDamage = defenderMaxDamage
          else if (defenderWater > 1) defenderMinDamage = defenderMaxDamage + 1
        }

        // Curse spell
        if (this.data.attacker.effects.includes('Curse')) {
          if (attackerFire < 2) defenderMaxDamage = defenderMinDamage
          else if (attackerFire > 1) {
            defenderMinDamage = defenderMinDamage * 0.8 - 1
            defenderMaxDamage = defenderMinDamage
          }
        }
      }
      return { attackerMinDamage, attackerMaxDamage, defenderMinDamage, defenderMaxDamage }
    },
    calculateTotalDamagesModification (attackerTotalMinDamage, attackerTotalMaxDamage, defenderTotalMinDamage, defenderTotalMaxDamage) {
      // For ATTACKER

      const attackerHero = this.data.attacker.hero.hero
      const defenderHero = this.data.defender.hero.hero

      let attackerSkillBonus = 0
      let defenderSkillBonus = 0

      if (attackerHero) {
        attackerSkillBonus = 1 + 0.05 * attackerHero.level
      }
      if (defenderHero) {
        defenderSkillBonus = 1 + 0.05 * defenderHero.level
      }

      // Offense ATTACKER skill bonus
      if (this.data.attacker.hero.skills.offenseLevel > 0 && !this.data.attacker.unit.ranged) {
        let bonus = 0.1 * this.data.attacker.hero.skills.offenseLevel
        if (attackerHero.specialtySkill === 'offense') {
          bonus += attackerSkillBonus
          if (bonus <= 1.92) {
            attackerTotalMinDamage += attackerTotalMinDamage * bonus
            attackerTotalMaxDamage += attackerTotalMaxDamage * bonus
          } else if (bonus > 1.92) {
            attackerTotalMinDamage += attackerTotalMinDamage * 1.92
            attackerTotalMaxDamage += attackerTotalMaxDamage * 1.92
          }
        } else {
          attackerTotalMinDamage += attackerTotalMinDamage * bonus
          attackerTotalMaxDamage += attackerTotalMaxDamage * bonus
        }
      }

      // Armorer ATTACKER skill bonus
      if (this.data.attacker.hero.skills.armorerLevel > 0) {
        let bonus = 0.05 * this.data.attacker.hero.skills.armorerLevel
        if (attackerHero.specialtySkill === 'armorer') {
          bonus += attackerSkillBonus
          if (bonus <= 0.7) {
            defenderTotalMinDamage -= defenderTotalMinDamage * bonus
            defenderTotalMaxDamage -= defenderTotalMaxDamage * bonus
          } else if (bonus > 0.7) {
            defenderTotalMinDamage -= defenderTotalMinDamage * 0.7
            defenderTotalMaxDamage -= defenderTotalMaxDamage * 0.7
          }
        } else {
          defenderTotalMinDamage -= defenderTotalMinDamage * bonus
          defenderTotalMaxDamage -= defenderTotalMaxDamage * bonus
        }
      }

      // Archery ATTACKER skill bonus
      if (this.data.attacker.hero.skills.archeryLevel > 0 && this.data.attacker.unit.ranged) {
        let bonus = 0
        if (this.data.attacker.hero.skills.archeryLevel === 1) bonus = 0.1
        else if (this.data.attacker.hero.skills.archeryLevel === 2) bonus = 0.25
        else if (this.data.attacker.hero.skills.archeryLevel === 3) bonus = 0.5

        if (attackerHero.specialtySkill === 'archery') {
          bonus += attackerSkillBonus
          if (bonus <= 3.2) {
            attackerTotalMinDamage += attackerTotalMinDamage * bonus
            attackerTotalMaxDamage += attackerTotalMaxDamage * bonus
          } else if (bonus > 3.2) {
            attackerTotalMinDamage += attackerTotalMinDamage * 3.2
            attackerTotalMaxDamage += attackerTotalMaxDamage * 3.2
          }
        } else {
          attackerTotalMinDamage += attackerTotalMinDamage * bonus
          attackerTotalMaxDamage += attackerTotalMaxDamage * bonus
        }
      }

      // Artillery ATTACKER skill bonus (for ballista and cannon only)
      if (this.data.attacker.hero.skills.artilleryLevel > 0 && (this.data.attacker.unit.id === 158 || this.data.attacker.unit.id === 159)) {
        if (this.data.attacker.hero.skills.artilleryLevel === 3) {
          attackerTotalMinDamage *= 2
          attackerTotalMaxDamage *= 2
        }
      }

      // ATTACKER shield spell
      if (this.data.attacker.effects.includes('Shield')) {
        if (this.data.attacker.hero.skills.earthLevel < 2) {
          defenderTotalMinDamage -= defenderTotalMinDamage * 0.15
          defenderTotalMaxDamage -= defenderTotalMaxDamage * 0.15
        } else if (this.data.attacker.hero.skills.earthLevel > 1) {
          defenderTotalMinDamage -= defenderTotalMinDamage * 0.3
          defenderTotalMaxDamage -= defenderTotalMaxDamage * 0.3
        }
      }

      // For DEFENDER

      // Offense DEFENDER skill bonus
      if (this.data.defender.hero.skills.offenseLevel > 0 && !this.data.defender.unit.ranged) {
        let bonus = 0.1 * this.data.defender.hero.skills.offenseLevel
        if (defenderHero.specialtySkill === 'offense') {
          bonus += defenderSkillBonus
          if (bonus <= 1.92) {
            defenderTotalMinDamage += defenderTotalMinDamage * bonus
            defenderTotalMaxDamage += defenderTotalMaxDamage * bonus
          } else if (bonus > 1.92) {
            defenderTotalMinDamage += defenderTotalMinDamage * 1.92
            defenderTotalMaxDamage += defenderTotalMaxDamage * 1.92
          }
        } else {
          defenderTotalMinDamage += defenderTotalMinDamage * bonus
          defenderTotalMaxDamage += defenderTotalMaxDamage * bonus
        }
      }

      // Armorer DEFENDER skill bonus
      if (this.data.defender.hero.skills.armorerLevel > 0) {
        let bonus = 0.05 * this.data.defender.hero.skills.armorerLevel
        if (defenderHero.specialtySkill === 'armorer') {
          bonus += defenderSkillBonus
          if (bonus <= 0.7) {
            attackerTotalMinDamage -= attackerTotalMinDamage * bonus
            attackerTotalMaxDamage -= attackerTotalMaxDamage * bonus
          } else if (bonus > 0.7) {
            attackerTotalMinDamage -= attackerTotalMinDamage * 0.7
            attackerTotalMaxDamage -= attackerTotalMaxDamage * 0.7
          }
        } else {
          attackerTotalMinDamage -= attackerTotalMinDamage * bonus
          attackerTotalMaxDamage -= attackerTotalMaxDamage * bonus
        }
      }

      // Archery DEFENDER skill bonus
      if (this.data.defender.hero.skills.archeryLevel > 0 && this.data.attacker.unit.ranged) {
        let bonus = 0
        if (this.data.defender.hero.skills.archeryLevel === 1) bonus = 0.1
        else if (this.data.defender.hero.skills.archeryLevel === 2) bonus = 0.25
        else if (this.data.defender.hero.skills.archeryLevel === 3) bonus = 0.5

        if (defenderHero.specialtySkill === 'archery') {
          bonus += defenderSkillBonus
          if (bonus <= 3.2) {
            defenderTotalMinDamage += defenderTotalMinDamage * bonus
            defenderTotalMaxDamage += defenderTotalMaxDamage * bonus
          } else if (bonus > 3.2) {
            defenderTotalMinDamage += defenderTotalMinDamage * 3.2
            defenderTotalMaxDamage += defenderTotalMaxDamage * 3.2
          }
        } else {
          defenderTotalMinDamage += defenderTotalMinDamage * bonus
          defenderTotalMaxDamage += defenderTotalMaxDamage * bonus
        }
      }

      // Artillery DEFENDER skill bonus (for ballista and cannon only)
      if (this.data.defender.hero.skills.artilleryLevel > 0 && (this.data.defender.unit.id === 158 || this.data.defender.unit.id === 159)) {
        if (this.data.defender.hero.skills.artilleryLevel === 3) {
          defenderTotalMinDamage *= 2
          defenderTotalMaxDamage *= 2
        }
      }

      // DEFENDER shield spell
      if (this.data.defender.effects.includes('Shield')) {
        if (this.data.defender.hero.skills.earthLevel < 2) {
          attackerTotalMinDamage -= attackerTotalMinDamage * 0.15
          attackerTotalMaxDamage -= attackerTotalMaxDamage * 0.15
        } else if (this.data.defender.hero.skills.earthLevel > 1) {
          attackerTotalMinDamage -= attackerTotalMinDamage * 0.3
          attackerTotalMaxDamage -= attackerTotalMaxDamage * 0.3
        }
      }

      return { attackerTotalMinDamage, attackerTotalMaxDamage, defenderTotalMinDamage, defenderTotalMaxDamage }
    },
    calculateWithHates (attackerTotalMinDamage, attackerTotalMaxDamage, defenderTotalMinDamage, defenderTotalMaxDamage) {
      const attackerUnit = this.data.attacker.unit
      const defenderUnit = this.data.defender.unit

      let hates = false

      for (let i = 0; i < this.data.unitsHates.length; i++) {
        if (this.data.unitsHates[i].id === attackerUnit.id && this.data.unitsHates[i].hate.includes(defenderUnit.id)) {
          hates = true
        }
      }

      if (hates === true) {
        attackerTotalMinDamage *= 1.5
        attackerTotalMaxDamage *= 1.5
        defenderTotalMinDamage *= 1.5
        defenderTotalMaxDamage *= 1.5
      }

      return { attackerTotalMinDamage, attackerTotalMaxDamage, defenderTotalMinDamage, defenderTotalMaxDamage }
    },
    swapSides () {
      let tmp = this.data.attacker
      this.data.attacker = this.data.defender
      this.data.defender = tmp
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/css/colors.scss';

.calculator {
  min-height: 80vh;
  box-shadow: 0 0 5px #AAA;
  .attacker{
    min-height: 80vh;
  }
  .defender {
    min-height: 80vh;
  }
  .longheight {
    min-height: 80vh;
  }
}

.green-btn {
  background-color: $custom-light-green;
  color: black;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
