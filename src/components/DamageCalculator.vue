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
          b-row(v-if='attacker.unit')
            b-col.ml-2(cols='auto' sm='8' md='9' lg='9' xl='8')
              b-form-input(
                v-model='localAttacker.unit.count'
                type='number'
                :disabled='!attacker.unit'
                size='sm'
                min=1
                max=999
                @input='setUnitsCount({ side: "attacker", count: localAttacker.unit.count })'
              )

        //- Pick ATTACKER unit button
        b-col(cols='9' sm='9' md='8' lg='9' xl='9')
          b-button.green-btn(size='sm' block @click='pickAttackerModalShow()')
            template(v-if='attacker.unit.name')
              strong
                | {{ attacker.unit.name }}
            template(v-else)
              | Pick

          //- Choose ATTACKER hero
          b-row.mt-3
            b-col(cols='12')
              select-hero(side='attacker')

      select-hero-stats.mt-2(side='attacker')

      select-hero-skills.mt-3(side='attacker')

      select-unit-effects.mt-3(side='attacker')

      calculated-damage.mt-3(side='attacker')

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
            template(v-if='defender.unit.name')
              strong
                | {{ defender.unit.name }}
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
          b-row.float-right(v-if='defender.unit')
            b-col(cols='auto' sm='11' md='11' lg='11' xl='11')
              b-form-input(
                v-model='localDefender.unit.count'
                type='number'
                :disabled='!defender.unit'
                size='sm'
                min=1
                max=999
                @input='setUnitsCount({ side: "defender", count: localDefender.unit.count })'
              )

      select-hero-stats.mt-2(side='defender')

      select-hero-skills.mt-3(side='defender')

      select-unit-effects.mt-3(side='defender')

      calculated-damage.mt-3(side='defender')

  //- Bottom panel
  b-row.p-2.border-top

    //- Swap button
    b-col.text-left.ml-auto.mr-auto.mr-md-3.mr-lg-3.mr-xl-3(cols='auto' sm='2' md='1' lg='1' xl='1')
      b-button(v-if='attacker.unit && defender.unit' variant='link' size='sm' @click='swapSides()')
        font-awesome-icon.fa-2x(icon='sync' style='color: #DC3545')

    //- Terrain text
    b-col(cols='auto' sm='2' md='2' lg='1' xl='1' offset='0' offset-sm='4' offset-md='0' offset-lg='2' offset-xl='2').text-right
      label.mt-1 Terrain:

    //- Terrain select
    b-col(cols='auto' sm='4' md='3' lg='2' xl='2')
      b-form-select(
        v-model='terrain'
        :options='terrainOptions'
        value-field='id'
        text-field='name'
        size='sm'
        @input='startCalculate()'
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

import selectUnitEffects from '@/components/damageCalculator/selectUnitEffects.vue'

import calculatedDamage from '@/components/damageCalculator/calculatedDamage.vue'

import terrainsJson from '@/assets/json/terrains.json'

import unitsHatesJson from '@/assets/json/unitsHates.json'

export default {
  name: 'DamageCalculator',
  components: {
    'select-hero': selectHero,
    'select-hero-stats': selectHeroStats,
    'pick-unit-modal': pickUnitModal,
    'select-hero-skills': selectHeroSkills,
    'select-unit-effects': selectUnitEffects,
    'calculated-damage': calculatedDamage
  },
  beforeCreate () {
    document.title = 'Damage calculator'
  },
  computed: {
    ...mapGetters({
      attacker: 'calculator/getAttacker',
      defender: 'calculator/getDefender',
      unitsImages: 'calculator/getUnitsImages',
      calculate: 'calculator/getCalculationStatus'
    })
  },
  data () {
    return {
      terrain: null,
      terrainOptions: terrainsJson,

      unitsHates: unitsHatesJson,

      localAttacker: {
        unit: {
          count: 1
        }
      },
      localDefender: {
        unit: {
          count: 1
        }
      }
    }
  },
  mounted () {
    this.getUnitsImages()
    this.getHeroes()
    this.getHeroesImages()
  },
  watch: {
    calculate () {
      if (this.attacker.unit.id && this.defender.unit.id && this.calculate) {
        let attackerAttack = this.attacker.unit.stats.attack
        let attackerDefense = this.attacker.unit.stats.defense

        let defenderAttack = this.defender.unit.stats.attack
        let defenderDefense = this.defender.unit.stats.defense

        let attackerTotalMinDamage = 0
        let attackerTotalMaxDamage = 0
        let attackerTotalAverageDamage = 0

        let defenderTotalMinDamage = 0
        let defenderTotalMaxDamage = 0
        let defenderTotalAverageDamage = 0

        // Modificate units stats
        const modifedStats = this.calculateStatsModification(attackerAttack, attackerDefense, defenderAttack, defenderDefense)
        attackerAttack = modifedStats.attackerAttack
        attackerDefense = modifedStats.attackerDefense
        defenderAttack = modifedStats.defenderAttack
        defenderDefense = modifedStats.defenderDefense

        // Modificate units min/max damages
        const modifedDamages = this.calculateDamagesModification(attackerTotalMinDamage, attackerTotalMaxDamage, defenderTotalMinDamage, defenderTotalMaxDamage)
        attackerTotalMinDamage = modifedDamages.attackerMinDamage
        attackerTotalMaxDamage = modifedDamages.attackerMaxDamage
        defenderTotalMinDamage = modifedDamages.defenderMinDamage
        defenderTotalMaxDamage = modifedDamages.defenderMaxDamage

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
          let cap = 0.05 * (attackerAttack - defenderDefense)

          if (cap > 3) cap = 3

          attackerTotalMinDamage = this.attacker.unit.count * this.attacker.unit.stats.minDamage * (1 + cap)
          attackerTotalMaxDamage = this.attacker.unit.count * this.attacker.unit.stats.maxDamage * (1 + cap)
        } else if (attackerAttack < defenderDefense) {
          // Max attack cap = 0.7
          let cap = 0.025 * (defenderDefense - attackerAttack)

          if (cap > 0.7) cap = 0.7

          attackerTotalMinDamage = this.attacker.unit.count * this.attacker.unit.stats.minDamage * (1 - cap)
          attackerTotalMaxDamage = this.attacker.unit.count * this.attacker.unit.stats.maxDamage * (1 - cap)
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
          let cap = 0.05 * (defenderAttack - attackerDefense)

          if (cap > 3) cap = 3

          defenderTotalMinDamage = this.defender.unit.count * this.defender.unit.stats.minDamage * (1 + cap)
          defenderTotalMaxDamage = this.defender.unit.count * this.defender.unit.stats.maxDamage * (1 + cap)
        } else if (defenderAttack < attackerDefense) {
          // Max attack cap = 0.7
          let cap = 0.025 * (attackerDefense - defenderAttack)

          if (cap > 0.7) cap = 0.7

          defenderTotalMinDamage = this.defender.unit.count * this.defender.unit.stats.minDamage * (1 - cap)
          defenderTotalMaxDamage = this.defender.unit.count * this.defender.unit.stats.maxDamage * (1 - cap)
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
        attackerTotalMinDamage = Math.floor(attackerTotalMinDamage)
        attackerTotalMaxDamage = Math.floor(attackerTotalMaxDamage)
        attackerTotalAverageDamage = Math.floor((attackerTotalMinDamage + attackerTotalMaxDamage) / 2)

        let attackerTotalMinKills = Math.floor(attackerTotalMinDamage / this.defender.unit.stats.health)
        let attackerTotalMaxKills = Math.floor(attackerTotalMaxDamage / this.defender.unit.stats.health)
        let attackerTotalAverageKills = Math.floor(attackerTotalAverageDamage / this.defender.unit.stats.health)

        defenderTotalMinDamage = Math.floor(defenderTotalMinDamage)
        defenderTotalMaxDamage = Math.floor(defenderTotalMaxDamage)
        defenderTotalAverageDamage = Math.floor((defenderTotalMinDamage + defenderTotalMinDamage) / 2)

        let defenderTotalMinKills = Math.floor(defenderTotalMinDamage / this.attacker.unit.stats.health)
        let defenderTotalMaxKills = Math.floor(defenderTotalMaxDamage / this.attacker.unit.stats.health)
        let defenderTotalAverageKills = Math.floor(defenderTotalAverageDamage / this.attacker.unit.stats.health)

        this.setResultDamage({
          side: 'attacker',
          unit: {
            totalMinDamage: attackerTotalMinDamage,
            totalMaxDamage: attackerTotalMaxDamage,
            totalAverageDamage: attackerTotalAverageDamage,
            totalMinKills: attackerTotalMinKills,
            totalMaxKills: attackerTotalMaxKills,
            totalAverageKills: attackerTotalAverageKills
          }
        })

        this.setResultDamage({
          side: 'defender',
          unit: {
            totalMinDamage: defenderTotalMinDamage,
            totalMaxDamage: defenderTotalMaxDamage,
            totalAverageDamage: defenderTotalAverageDamage,
            totalMinKills: defenderTotalMinKills,
            totalMaxKills: defenderTotalMaxKills,
            totalAverageKills: defenderTotalAverageKills
          }
        })
      }
      if (this.calculate === true) { return this.endCalculate() } else {}
    }
  },
  methods: {
    ...mapActions({
      swapHeroes: 'calculator/swapHeroes',
      getUnitsImages: 'calculator/getUnitsImages',
      getHeroesImages: 'calculator/getHeroesImages',
      getHeroes: 'calculator/getHeroes',
      startCalculate: 'calculator/startCalculate',
      endCalculate: 'calculator/endCalculate',
      setResultDamage: 'calculator/setResultDamage',
      setUnitsCount: 'calculator/setUnitsCount',
      swapSides: 'calculator/swapSides'
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

    calculateStatsModification (attackerAttack, attackerDefense, defenderAttack, defenderDefense) {
      attackerAttack += parseInt(this.attacker.hero.attack)
      attackerDefense += parseInt(this.attacker.hero.defense)

      defenderAttack += parseInt(this.defender.hero.attack)
      defenderDefense += parseInt(this.defender.hero.defense)

      // if (this.terrain) {
      //   if (this.attacker.unit.nativeTerrainId === this.terrain) {
      //     attackerAttack++
      //     attackerDefense++
      //   }
      //   if (this.defender.unit.nativeTerrainId === this.terrain) {
      //     defenderAttack++
      //     this.defender.unit.stats.defense++
      //   }
      // }

      // ATTACKER hero unit specialty bonus1
      if (this.attacker.hero.specialtyUnit) {
        if (this.attacker.hero.specialtyUnit.includes(this.attacker.unit.id)) {
          attackerAttack *= 1 + this.attacker.hero.level / this.attacker.unit.level * 0.05
          attackerDefense *= 1 + this.attacker.hero.level / this.attacker.unit.level * 0.05

          attackerAttack = Math.ceil(attackerAttack)
          attackerDefense = Math.ceil(attackerDefense)
        }
      }

      if (this.attacker.unit.effects.length > 0) {
        // ATTACKER stats buffs

        // Bloodlust spell
        if (this.attacker.unit.effects.includes('Bloodlust')) {
          // Bloodlust spell hero specialty bonus
          if (this.attacker.hero.specialtySpell === 'bloodlust') {
            if (this.attacker.hero.level <= 2) attackerAttack += 3
            else if (this.attacker.unit.level <= 4) attackerAttack += 2
            else if (this.attacker.unit.level <= 6) attackerAttack += 1
          }

          if (this.attacker.hero.fire < 2) attackerAttack += 3
          else if (this.attacker.hero.fire > 1) attackerAttack += 6
        }

        // Frenzy spell
        if (this.attacker.unit.effects.includes('Frenzy')) {
          if (this.attacker.hero.fire < 2) attackerAttack += attackerDefense
          else if (this.attacker.hero.fire === 2) attackerAttack += attackerDefense * 1.5
          else if (this.attacker.hero.fire === 3) attackerAttack += attackerDefense * 2
          attackerDefense = 0
        }

        // Slayer spell
        if (this.attacker.unit.effects.includes('Slayer')) {
          let units = [26, 27, 54, 55, 68, 69, 96, 97, 110, 111, 137, 138, 139, 140]
          if (this.attacker.hero.fire === 2) units.push(12, 13, 82, 83)
          else if (this.attacker.hero.fire === 3) units.push(40, 41, 124, 125, 154, 155)

          // If DEFENDER unit in slayer units list
          if (units.includes(this.defender.unit.id)) attackerAttack += 8
        }

        // Prayer spell
        if (this.attacker.unit.effects.includes('Prayer')) {
          // Prayer spell hero specialty bonus
          if (this.attacker.hero.specialtySpell === 'prayer') {
            if (this.attacker.unit.level <= 2) {
              attackerAttack += 3
              attackerDefense += 3
            } else if (this.attacker.unit.level <= 4) {
              attackerAttack += 2
              attackerDefense += 2
            } else if (this.attacker.unit.level <= 6) {
              attackerAttack += 1
              attackerDefense += 1
            }
          }

          if (this.attacker.hero.water < 2) {
            attackerAttack += 2
            attackerDefense += 2
          } else if (this.attacker.hero.water > 1) {
            attackerAttack += 4
            attackerDefense += 4
          }
        }

        // Precision spell
        if (this.attacker.unit.effects.includes('Precision') && this.attacker.unit.ranged) {
          // Precision hero specialty bonus
          if (this.attacker.hero.specialtySpell === 'precision') {
            if (this.attacker.unit.level <= 2) attackerAttack += 3
            else if (this.attacker.unit.level <= 4) attackerAttack += 2
            else if (this.attacker.unit.level <= 6) attackerAttack += 1
          }

          if (this.attacker.hero.air < 2) attackerAttack += 3
          else if (this.attacker.hero.air > 1) attackerAttack += 6
        }

        // Stone skin spell
        if (this.attacker.unit.effects.includes('Stone Skin')) {
          // Stone skin hero specialty bonus
          if (this.attacker.hero.specialtySpell === 'stone skin') {
            if (this.attacker.unit.level <= 2) attackerDefense += 3
            else if (this.attacker.unit.level <= 4) attackerDefense += 2
            else if (this.attacker.unit.level <= 6) attackerDefense += 1
          }

          if (this.attacker.hero.earth < 2) attackerDefense += 3
          else if (this.attacker.hero.earth > 1) attackerDefense += 6
        }

        // ATTACKER stats debuffs

        // Weakness spell
        if (this.attacker.unit.effects.includes('Weakness')) {
          // Weakness hero specialty bonus
          if (this.defender.hero.specialtySpell === 'weakness') {
            if (this.attacker.unit.level <= 2) attackerAttack -= 3
            else if (this.attacker.unit.level <= 4) attackerAttack -= 2
            else if (this.attacker.unit.level <= 6) attackerAttack -= 1
          }

          if (this.defender.hero.water < 2) attackerAttack -= 3
          else if (this.defender.hero.water > 1) attackerAttack -= 6
        }

        // Disrupting Ray spell
        if (this.attacker.unit.effects.includes('Disrupting Ray')) {
          // Disrupting Ray hero specialty bonus
          if (this.defender.hero.specialtySpell === 'disrupting ray') attackerDefense -= 2

          if (this.defender.hero.air < 2) attackerDefense -= 3
          else if (this.defender.hero.air === 2) attackerDefense -= 4
          else if (this.defender.hero.air === 3) attackerDefense -= 5
        }
      }

      // DEFENDER stats buffs

      // DEFENDER hero unit specialty bonus
      if (this.defender.hero.specialtyUnit) {
        if (this.defender.hero.specialtyUnit.includes(this.defender.unit.id)) {
          defenderAttack *= 1 + this.defender.hero.level / this.defender.unit.level * 0.05
          this.defender.unit.stats.defense *= 1 + this.defender.hero.level / this.defender.unit.level * 0.05

          defenderAttack = Math.ceil(defenderAttack)
          this.defender.unit.stats.defense = Math.ceil(this.defender.unit.stats.defense)
        }
      }

      if (this.defender.unit.effects.length > 0) {
        // Bloodlust spell
        if (this.defender.unit.effects.includes('Bloodlust')) {
          if (this.defender.hero.specialtySpell === 'bloodlust') {
            if (this.defender.unit.level <= 2) defenderAttack += 3
            else if (this.defender.unit.level <= 4) defenderAttack += 2
            else if (this.defender.unit.level <= 6) defenderAttack += 1
          }

          if (this.defender.hero.fire < 2) defenderAttack += 3
          else if (this.defender.hero.fire > 1) defenderAttack += 6
        }

        // Frenzy spell
        if (this.defender.unit.effects.includes('Frenzy')) {
          if (this.defender.hero.fire < 2) defenderAttack += this.defender.unit.stats.defense
          else if (this.defender.hero.fire === 2) defenderAttack += this.defender.unit.stats.defense * 1.5
          else if (this.defender.hero.fire === 3) defenderAttack += this.defender.unit.stats.defense * 2
          this.defender.unit.stats.defense = 0
        }

        // Slayer spell
        if (this.defender.unit.effects.includes('Slayer')) {
          let units = [26, 27, 54, 55, 68, 69, 96, 97, 110, 111, 137, 138, 139, 140]
          if (this.defender.hero.fire === 2) units.push(12, 13, 82, 83)
          else if (this.defender.hero.fire === 3) units.push(40, 41, 124, 125, 154, 155)

          // If ATTACKER unit in slayer units list
          if (units.includes(this.attacker.unit.id)) defenderAttack += 8
        }

        // Prayer spell
        if (this.defender.unit.effects.includes('Prayer')) {
          // Prayer spell hero specialty bonus
          if (this.defender.hero.specialtySpell === 'prayer') {
            if (this.defender.unit.level <= 2) {
              defenderAttack += 3
              this.defender.unit.stats.defense += 3
            } else if (this.defender.unit.level <= 4) {
              defenderAttack += 2
              this.defender.unit.stats.defense += 2
            } else if (this.defender.unit.level <= 6) {
              defenderAttack += 1
              this.defender.unit.stats.defense += 1
            }
          }

          if (this.defender.hero.water < 2) {
            defenderAttack += 2
            this.defender.unit.stats.defense += 2
          } else if (this.defender.hero.water > 1) {
            defenderAttack += 4
            this.defender.unit.stats.defense += 4
          }
        }

        // Precision spell
        if (this.defender.unit.effects.includes('Precision') && this.defender.unit.ranged) {
          if (this.defender.hero.specialtySpell === 'precision') {
            if (this.defender.unit.level <= 2) defenderAttack += 3
            else if (this.defender.unit.level <= 4) defenderAttack += 2
            else if (this.defender.unit.level <= 6) defenderAttack += 1
          }

          if (this.defender.hero.air < 2) defenderAttack += 3
          else if (this.defender.hero.air > 1) defenderAttack += 6
        }

        // Stone skin spell
        if (this.defender.unit.effects.includes('Stone Skin')) {
          // Stone skin hero specialty bonus
          if (this.defender.hero.specialtySpell === 'stone skin') {
            if (this.defender.unit.level <= 2) this.defender.unit.stats.defense += 3
            else if (this.defender.unit.level <= 4) this.defender.unit.stats.defense += 2
            else if (this.defender.unit.level <= 6) this.defender.unit.stats.defense += 1
          }

          if (this.defender.hero.earth < 2) this.defender.unit.stats.defense += 3
          else if (this.defender.hero.earth > 1) this.defender.unit.stats.defense += 6
        }

        // ATTACKER stats debuffs

        // Weakness spell
        if (this.defender.unit.effects.includes('Weakness')) {
          // Weakness hero specialty bonus
          if (this.defender.hero.specialtySpell === 'weakness') {
            if (this.defender.unit.level <= 2) defenderAttack -= 3
            else if (this.defender.unit.level <= 4) defenderAttack -= 2
            else if (this.defender.unit.level <= 6) defenderAttack -= 1
          }

          if (this.attacker.hero.water < 2) defenderAttack -= 3
          else if (this.attacker.hero.water > 1) defenderAttack -= 6
        }

        // Disrupting Ray spell
        if (this.defender.unit.effects.includes('Disrupting Ray')) {
          // Disrupting Ray hero specialty bonus
          if (this.defender.hero.specialtySpell === 'disrupting ray') this.defender.unit.stats.defense -= 2

          if (this.attacker.hero.air < 2) this.defender.unit.stats.defense -= 3
          else if (this.attacker.hero.air === 2) this.defender.unit.stats.defense -= 4
          else if (this.attacker.hero.air === 3) this.defender.unit.stats.defense -= 5
        }

        // Curse spell
        if (this.defender.unit.effects.includes('Curse')) {
          if (this.attacker.hero.fire < 2) this.defender.unit.stats.maxDamage = this.defender.unit.stats.minDamage
          else if (this.attacker.hero.fire > 1) {
            this.defender.unit.stats.minDamage = this.defender.unit.stats.minDamage * 0.8 - 1
            this.defender.unit.stats.maxDamage = this.defender.unit.stats.minDamage
          }
        }
      }
      return { attackerAttack, attackerDefense, defenderAttack, defenderDefense }
    },
    calculateDamagesModification (attackerMinDamage, attackerMaxDamage, defenderMinDamage, defenderMaxDamage) {
      const attackerHero = this.attacker.hero.hero
      // const attackerAir = this.attacker.hero.skills.airLevel
      const attackerFire = this.attacker.hero.fire
      // const attackerEarth = this.attacker.hero.earth
      const attackerWater = this.attacker.hero.water

      // const defenderAir = this.defender.hero.skills.airLevel
      const defenderFire = this.defender.hero.fire
      // const defenderEarth = this.defender.hero.earth
      const defenderWater = this.defender.hero.water

      // For ATTACKER
      if (this.attacker.unit.effects.length > 0) {
        const effects = this.attacker.unit.effects

        // Bless spell
        if (effects.includes('Bless')) {
          if (attackerHero.specialtySpell === 'bless') {
          } else {
            if (attackerWater < 2) attackerMinDamage = attackerMaxDamage
            else if (attackerWater > 1) attackerMinDamage = attackerMaxDamage + 1
          }
        }

        // Curse spell
        if (this.attacker.unit.effects.includes('Curse')) {
          if (defenderFire < 2) attackerMaxDamage = attackerMinDamage
          else if (defenderFire > 1) {
            attackerMinDamage = attackerMinDamage * 0.8 - 1
            attackerMaxDamage = attackerMinDamage
          }
        }
      }

      // For DEFENDER
      if (this.defender.unit.effects.length > 0) {
        const effects = this.defender.unit.effects

        // Bless spell
        if (effects.includes('Bless')) {
          if (defenderWater < 2) defenderMinDamage = defenderMaxDamage
          else if (defenderWater > 1) defenderMinDamage = defenderMaxDamage + 1
        }

        // Curse spell
        if (this.attacker.unit.effects.includes('Curse')) {
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

      const attackerHero = this.attacker.hero
      const defenderHero = this.defender.hero

      let attackerSkillBonus = 0
      let defenderSkillBonus = 0

      if (attackerHero) {
        attackerSkillBonus = 1 + 0.05 * attackerHero.level
      }
      if (defenderHero) {
        defenderSkillBonus = 1 + 0.05 * defenderHero.level
      }

      // Offense ATTACKER skill bonus
      if (this.attacker.hero.offense > 0 && !this.attacker.unit.ranged) {
        let bonus = 0.1 * this.attacker.hero.offense
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
      if (this.attacker.hero.armorer > 0) {
        let bonus = 0.05 * this.attacker.hero.armorer
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
      if (this.attacker.hero.archery > 0 && this.attacker.unit.ranged) {
        let bonus = 0
        if (this.attacker.hero.archery === 1) bonus = 0.1
        else if (this.attacker.hero.archery === 2) bonus = 0.25
        else if (this.attacker.hero.archery === 3) bonus = 0.5

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
      if (this.attacker.hero.artillery > 0 && (this.attacker.unit.id === 158 || this.attacker.unit.id === 159)) {
        if (this.attacker.hero.artillery === 3) {
          attackerTotalMinDamage *= 2
          attackerTotalMaxDamage *= 2
        }
      }

      // ATTACKER shield spell
      if (this.attacker.unit.effects.includes('Shield')) {
        if (this.attacker.hero.earth < 2) {
          defenderTotalMinDamage -= defenderTotalMinDamage * 0.15
          defenderTotalMaxDamage -= defenderTotalMaxDamage * 0.15
        } else if (this.attacker.hero.earth > 1) {
          defenderTotalMinDamage -= defenderTotalMinDamage * 0.3
          defenderTotalMaxDamage -= defenderTotalMaxDamage * 0.3
        }
      }

      // For DEFENDER

      // Offense DEFENDER skill bonus
      if (this.defender.hero.offense > 0 && !this.defender.unit.ranged) {
        let bonus = 0.1 * this.defender.hero.offense
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
      if (this.defender.hero.armorer > 0) {
        let bonus = 0.05 * this.defender.hero.armorer
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
      if (this.defender.hero.archery > 0 && this.attacker.unit.ranged) {
        let bonus = 0
        if (this.defender.hero.archery === 1) bonus = 0.1
        else if (this.defender.hero.archery === 2) bonus = 0.25
        else if (this.defender.hero.archery === 3) bonus = 0.5

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
      if (this.defender.hero.artillery > 0 && (this.defender.unit.id === 158 || this.defender.unit.id === 159)) {
        if (this.defender.hero.artillery === 3) {
          defenderTotalMinDamage *= 2
          defenderTotalMaxDamage *= 2
        }
      }

      // DEFENDER shield spell
      if (this.defender.unit.effects.includes('Shield')) {
        if (this.defender.hero.earth < 2) {
          attackerTotalMinDamage -= attackerTotalMinDamage * 0.15
          attackerTotalMaxDamage -= attackerTotalMaxDamage * 0.15
        } else if (this.defender.hero.earth > 1) {
          attackerTotalMinDamage -= attackerTotalMinDamage * 0.3
          attackerTotalMaxDamage -= attackerTotalMaxDamage * 0.3
        }
      }

      return { attackerTotalMinDamage, attackerTotalMaxDamage, defenderTotalMinDamage, defenderTotalMaxDamage }
    },
    calculateWithHates (attackerTotalMinDamage, attackerTotalMaxDamage, defenderTotalMinDamage, defenderTotalMaxDamage) {
      const attackerUnit = this.attacker.unit
      const defenderUnit = this.defender.unit

      let hates = false

      for (let i = 0; i < this.unitsHates.length; i++) {
        if (this.unitsHates[i].id === attackerUnit.id && this.unitsHates[i].hate.includes(defenderUnit.id)) {
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
