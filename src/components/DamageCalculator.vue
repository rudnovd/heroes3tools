<template lang='pug'>
b-container(): b-row.mb-3(): b-col.calculator(cols='12')

  b-row
    //- Attacker col
    b-col(class='attacker border-top border-right' cols='12' sm='12' md='6' lg='6' xl='6')

      //- Text
      b-row.mt-3.mb-3
        b-col(cols='12')
          h4 {{ $t('attacker') }}

      //- Pick ATTACKER unit image and units count
      b-row

        //- Pick ATTACKER unit image
        b-col(cols='3' sm='3' md='4' lg='3' xl='3')
          b-row
            b-col(cols='12')
              b-button(class='mb-1' variant='link' size='sm' @click='pickAttackerModalShow()')
                img(
                  class='border border-dark'
                  v-if='attackerUnitSelected'
                  :src='$store.state.calculator.images.units[$store.state.calculator.attacker.unit.id].src'
                )
                font-awesome-icon(class='fa-4x' v-if='!attackerUnitSelected' icon='question-circle' style='color: #00CB31')

          //- Attacker units count
          b-row
            b-col(class='ml-2' cols='auto' sm='8' md='9' lg='9' xl='8')
              select-units-count(side="attacker")

        //- Pick ATTACKER unit button
        b-col(cols='9' sm='9' md='8' lg='9' xl='9')
          b-button.green-btn(size='sm' block @click='pickAttackerModalShow()')
            template(v-if='attackerUnitSelected')
              strong(v-if='$store.state.user.locale === "en"')
                | {{ $store.state.calculator.attacker.unit.name_en }}
              strong(v-if='$store.state.user.locale === "ru"')
                | {{ $store.state.calculator.attacker.unit.name_ru }}
            template(v-if='!attackerUnitSelected')
              | {{ $t('pick') }}

          //- Choose ATTACKER hero
          b-row.mt-3
            b-col(cols='12')
              select-hero(side='attacker')

      template(v-if='attackerHeroSelected')
        select-hero-stats.mt-2(side='attacker')

        select-hero-skills.mt-3(side='attacker')

        select-unit-effects.mt-3(side='attacker')

      template(v-if='attackerUnitSelected && defenderUnitSelected')
        calculated-damage.mt-3(side='attacker')

    //- Defender col
    b-col.defender.border-top(cols='12' sm='12' md='6' lg='6' xl='6')
      //- Text
      b-row.mt-3.mb-3
        b-col(cols='12')
          h4.text-right {{ $t('defender') }}

      //- Pick DEFENDER unit image and units count
      b-row

        //- Pick DEFENDER unit button
        b-col(cols='9' sm='9' md='8' lg='9' xl='9')
          b-button(size='sm' variant='danger' block @click='pickDefenderModalShow()')
            template(v-if='defenderUnitSelected')
              strong(v-if='$store.state.user.locale === "en"')
                | {{ $store.state.calculator.defender.unit.name_en }}
              strong(v-if='$store.state.user.locale === "ru"')
                | {{ $store.state.calculator.defender.unit.name_ru }}
            template(v-if='!defenderUnitSelected')
              | {{ $t('pick') }}

          //- Choose DEFENDER hero
          b-row.mt-3
            b-col(cols='12')
              select-hero(side="defender")

        //- Pick DEFENDER unit image
        b-col(class='text-right' cols='3' sm='3' md='4' lg='3' xl='3')
          b-row
            b-col(cols='12')
              b-button(class='mb-1' variant='link' size='sm' @click='pickDefenderModalShow()')
                img(
                  class='border border-dark'
                  v-if='defenderUnitSelected'
                  :src='$store.state.calculator.images.units[$store.state.calculator.defender.unit.id].src')
                font-awesome-icon(class='fa-4x' v-if='!defenderUnitSelected' icon='question-circle' style='color: #DC3545')

          //- Defender units count
          b-row(class='float-right' v-if='defenderUnitSelected')
            b-col(cols='auto' sm='11' md='11' lg='11' xl='11')
              select-units-count(side='defender')

      template(v-if='defenderHeroSelected')
        select-hero-stats.mt-2(side='defender')

        select-hero-skills.mt-3(side='defender')

        select-unit-effects.mt-3(side='defender')

      template(v-if='attackerUnitSelected && defenderUnitSelected')
        calculated-damage.mt-3(side='defender')

  bottom-panel

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

import selectUnitsCount from '@/components/damageCalculator/selectUnitsCount.vue'

import bottomPanel from '@/components/damageCalculator/bottomPanel.vue'

export default {
  name: 'DamageCalculator',
  components: {
    'select-hero': selectHero,
    'select-hero-stats': selectHeroStats,
    'pick-unit-modal': pickUnitModal,
    'select-hero-skills': selectHeroSkills,
    'select-unit-effects': selectUnitEffects,
    'calculated-damage': calculatedDamage,
    'select-units-count': selectUnitsCount,
    'bottom-panel': bottomPanel
  },
  beforeCreate () {
    document.title = 'Damage calculator'
  },
  computed: {
    ...mapGetters({
      attackerUnitSelected: 'calculator/attackerUnitSelected',
      defenderUnitSelected: 'calculator/defenderUnitSelected',
      attackerHeroSelected: 'calculator/attackerHeroSelected',
      defenderHeroSelected: 'calculator/defenderHeroSelected',
      calculate: 'calculator/getCalculatorStatus'
    })
  },
  mounted () {

  },
  watch: {
    calculate () {
      if (this.attackerUnitSelected && this.defenderUnitSelected && this.$store.state.calculator.calculate) {
        let attackerAttack = this.$store.state.calculator.attacker.unit.stats.attack
        let attackerDefense = this.$store.state.calculator.attacker.unit.stats.defense

        let defenderAttack = this.$store.state.calculator.defender.unit.stats.attack
        let defenderDefense = this.$store.state.calculator.defender.unit.stats.defense

        let attackerMinDamage = this.$store.state.calculator.attacker.unit.stats.minDamage
        let attackerMaxDamage = this.$store.state.calculator.attacker.unit.stats.maxDamage

        let defenderMinDamage = this.$store.state.calculator.defender.unit.stats.minDamage
        let defenderMaxDamage = this.$store.state.calculator.defender.unit.stats.maxDamage

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
        const modifedCurseDamages = this.calculateCurseModificator(attackerMinDamage, attackerMaxDamage, defenderMinDamage, defenderMaxDamage)
        attackerMinDamage = modifedCurseDamages.attackerMinDamage
        attackerMaxDamage = modifedCurseDamages.attackerMaxDamage
        defenderMinDamage = modifedCurseDamages.defenderMinDamage
        defenderMaxDamage = modifedCurseDamages.defenderMaxDamage

        const modifedBlessDamages = this.calculateBlessModificator(
          attackerMinDamage,
          attackerMaxDamage,
          defenderMinDamage,
          defenderMaxDamage,
          attackerAttack,
          attackerDefense,
          defenderAttack,
          defenderDefense
        )

        attackerMinDamage = modifedBlessDamages.attackerMinDamage
        attackerMaxDamage = modifedBlessDamages.attackerMaxDamage
        defenderMinDamage = modifedBlessDamages.defenderMinDamage
        defenderMaxDamage = modifedBlessDamages.defenderMaxDamage

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

          attackerTotalMinDamage = this.$store.state.calculator.attacker.unit.count * attackerMinDamage * (1 + cap)
          attackerTotalMaxDamage = this.$store.state.calculator.attacker.unit.count * attackerMaxDamage * (1 + cap)
        } else if (attackerAttack < defenderDefense) {
          // Max attack cap = 0.7
          let cap = 0.025 * (defenderDefense - attackerAttack)

          if (cap > 0.7) cap = 0.7

          attackerTotalMinDamage = this.$store.state.calculator.attacker.unit.count * attackerMinDamage * (1 - cap)
          attackerTotalMaxDamage = this.$store.state.calculator.attacker.unit.count * attackerMaxDamage * (1 - cap)
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

          defenderTotalMinDamage = this.$store.state.calculator.defender.unit.count * defenderMinDamage * (1 + cap)
          defenderTotalMaxDamage = this.$store.state.calculator.defender.unit.count * defenderMaxDamage * (1 + cap)
        } else if (defenderAttack < attackerDefense) {
          // Max attack cap = 0.7
          let cap = 0.025 * (attackerDefense - defenderAttack)

          if (cap > 0.7) cap = 0.7

          defenderTotalMinDamage = this.$store.state.calculator.defender.unit.count * defenderMinDamage * (1 - cap)
          defenderTotalMaxDamage = this.$store.state.calculator.defender.unit.count * defenderMaxDamage * (1 - cap)
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

        let attackerTotalMinKills = Math.floor(attackerTotalMinDamage / this.$store.state.calculator.defender.unit.stats.health)
        let attackerTotalMaxKills = Math.floor(attackerTotalMaxDamage / this.$store.state.calculator.defender.unit.stats.health)
        let attackerTotalAverageKills = Math.floor(attackerTotalAverageDamage / this.$store.state.calculator.defender.unit.stats.health)

        defenderTotalMinDamage = Math.floor(defenderTotalMinDamage)
        defenderTotalMaxDamage = Math.floor(defenderTotalMaxDamage)
        defenderTotalAverageDamage = Math.floor((defenderTotalMinDamage + defenderTotalMaxDamage) / 2)

        let defenderTotalMinKills = Math.floor(defenderTotalMinDamage / this.$store.state.calculator.attacker.unit.stats.health)
        let defenderTotalMaxKills = Math.floor(defenderTotalMaxDamage / this.$store.state.calculator.attacker.unit.stats.health)
        let defenderTotalAverageKills = Math.floor(defenderTotalAverageDamage / this.$store.state.calculator.attacker.unit.stats.health)

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
      if (this.$store.state.calculator.calculate === true) {
        return this.endCalculate()
      } else {
        return 0
      }
    }
  },
  methods: {
    ...mapActions({
      startCalculate: 'calculator/startCalculate',
      endCalculate: 'calculator/endCalculate',
      setResultDamage: 'calculator/setResultDamage',
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
      attackerAttack += parseInt(this.$store.state.calculator.attacker.hero.attack)
      attackerDefense += parseInt(this.$store.state.calculator.attacker.hero.defense)

      defenderAttack += parseInt(this.$store.state.calculator.defender.hero.attack)
      defenderDefense += parseInt(this.$store.state.calculator.defender.hero.defense)

      if (this.$store.state.calculator.terrain) {
        if (this.$store.state.calculator.attacker.unit.nativeTerrain === this.$store.state.calculator.terrain) {
          attackerAttack++
          attackerDefense++
        }
        if (this.$store.state.calculator.defender.unit.nativeTerrain === this.$store.state.calculator.terrain) {
          defenderAttack++
          defenderDefense++
        }
      }

      // ATTACKER hero unit specialty bonus
      if (this.$store.state.calculator.attacker.hero.specialtyUnit) {
        if (this.$store.state.calculator.attacker.hero.specialtyUnit.includes(this.$store.state.calculator.attacker.unit.id)) {
          attackerAttack *= 1 + this.$store.state.calculator.attacker.hero.level / this.$store.state.calculator.attacker.unit.level * 0.05
          attackerDefense *= 1 + this.$store.state.calculator.attacker.hero.level / this.$store.state.calculator.attacker.unit.level * 0.05

          attackerAttack = Math.ceil(attackerAttack)
          attackerDefense = Math.ceil(attackerDefense)
        }
      }

      if (this.$store.state.calculator.attacker.unit.effects.length > 0) {
        // ATTACKER stats buffs

        // Bloodlust spell
        if (this.$store.state.calculator.attacker.unit.effects.includes('Bloodlust')) {
          // Bloodlust spell hero specialty bonus
          if (this.$store.state.calculator.attacker.hero.specialtySpell === 'bloodlust') {
            if (this.$store.state.calculator.attacker.hero.level <= 2) {
              attackerAttack += 3
            } else if (this.$store.state.calculator.attacker.unit.level <= 4) {
              attackerAttack += 2
            } else if (this.$store.state.calculator.attacker.unit.level <= 6) {
              attackerAttack += 1
            }
          }

          if (this.$store.state.calculator.attacker.hero.fire < 2) {
            attackerAttack += 3
          } else if (this.$store.state.calculator.attacker.hero.fire > 1) {
            attackerAttack += 6
          }
        }

        // Frenzy spell
        if (this.$store.state.calculator.attacker.unit.effects.includes('Frenzy')) {
          if (this.$store.state.calculator.attacker.hero.fire < 2) {
            attackerAttack += attackerDefense
          } else if (this.$store.state.calculator.attacker.hero.fire === 2) {
            attackerAttack += attackerDefense * 1.5
          } else if (this.$store.state.calculator.attacker.hero.fire === 3) {
            attackerAttack += attackerDefense * 2
          }
          attackerDefense = 0
        }

        // Slayer spell
        if (this.$store.state.calculator.attacker.unit.effects.includes('Slayer')) {
          let units = [26, 27, 54, 55, 68, 69, 96, 97, 110, 111, 137, 138, 139, 140]
          if (this.$store.state.calculator.attacker.hero.fire === 2) {
            units.push(12, 13, 82, 83)
          } else if (this.$store.state.calculator.attacker.hero.fire === 3) {
            units.push(40, 41, 124, 125, 154, 155)
          }

          // If DEFENDER unit in slayer units list
          if (units.includes(this.$store.state.calculator.defender.unit.id)) {
            attackerAttack += 8
          }
        }

        // Prayer spell
        if (this.$store.state.calculator.attacker.unit.effects.includes('Prayer')) {
          // Prayer spell hero specialty bonus
          if (this.$store.state.calculator.attacker.hero.specialtySpell === 'prayer') {
            if (this.$store.state.calculator.attacker.unit.level <= 2) {
              attackerAttack += 3
              attackerDefense += 3
            } else if (this.$store.state.calculator.attacker.unit.level <= 4) {
              attackerAttack += 2
              attackerDefense += 2
            } else if (this.$store.state.calculator.attacker.unit.level <= 6) {
              attackerAttack += 1
              attackerDefense += 1
            }
          }

          if (this.$store.state.calculator.attacker.hero.water < 2) {
            attackerAttack += 2
            attackerDefense += 2
          } else if (this.$store.state.calculator.attacker.hero.water > 1) {
            attackerAttack += 4
            attackerDefense += 4
          }
        }

        // Precision spell
        if (this.$store.state.calculator.attacker.unit.effects.includes('Precision') && this.$store.state.calculator.attacker.unit.ranged) {
          // Precision hero specialty bonus
          if (this.$store.state.calculator.attacker.hero.specialtySpell === 'precision') {
            if (this.$store.state.calculator.attacker.unit.level <= 2) {
              attackerAttack += 3
            } else if (this.$store.state.calculator.attacker.unit.level <= 4) {
              attackerAttack += 2
            } else if (this.$store.state.calculator.attacker.unit.level <= 6) {
              attackerAttack += 1
            }
          }

          if (this.$store.state.calculator.attacker.hero.air < 2) {
            attackerAttack += 3
          } else if (this.$store.state.calculator.attacker.hero.air > 1) {
            attackerAttack += 6
          }
        }

        // Stone skin spell
        if (this.$store.state.calculator.attacker.unit.effects.includes('Stone Skin')) {
          // Stone skin hero specialty bonus
          if (this.$store.state.calculator.attacker.hero.specialtySpell === 'stone skin') {
            if (this.$store.state.calculator.attacker.unit.level <= 2) {
              attackerDefense += 3
            } else if (this.$store.state.calculator.attacker.unit.level <= 4) {
              attackerDefense += 2
            } else if (this.$store.state.calculator.attacker.unit.level <= 6) {
              attackerDefense += 1
            }
          }

          if (this.$store.state.calculator.attacker.hero.earth < 2) {
            attackerDefense += 3
          } else if (this.$store.state.calculator.attacker.hero.earth > 1) {
            attackerDefense += 6
          }
        }

        // ATTACKER stats debuffs

        // Weakness spell
        if (this.$store.state.calculator.attacker.unit.effects.includes('Weakness')) {
          // Weakness hero specialty bonus
          if (this.$store.state.calculator.defender.hero.specialtySpell === 'weakness') {
            if (this.$store.state.calculator.attacker.unit.level <= 2) {
              attackerAttack -= 3
            } else if (this.$store.state.calculator.attacker.unit.level <= 4) {
              attackerAttack -= 2
            } else if (this.$store.state.calculator.attacker.unit.level <= 6) {
              attackerAttack -= 1
            }
          }

          if (this.$store.state.calculator.defender.hero.water < 2) {
            attackerAttack -= 3
          } else if (this.$store.state.calculator.defender.hero.water > 1) {
            attackerAttack -= 6
          }
        }

        // Disrupting Ray spell
        if (this.$store.state.calculator.attacker.unit.effects.includes('Disrupting Ray')) {
          // Disrupting Ray hero specialty bonus
          if (this.$store.state.calculator.defender.hero.specialtySpell === 'disrupting ray') {
            attackerDefense -= 2
          }

          if (this.$store.state.calculator.defender.hero.air < 2) {
            attackerDefense -= 3
          } else if (this.$store.state.calculator.defender.hero.air === 2) {
            attackerDefense -= 4
          } else if (this.$store.state.calculator.defender.hero.air === 3) {
            attackerDefense -= 5
          }
        }
      }

      // DEFENDER stats buffs

      // DEFENDER hero unit specialty bonus
      if (this.$store.state.calculator.defender.hero.specialtyUnit) {
        if (this.$store.state.calculator.defender.hero.specialtyUnit.includes(this.$store.state.calculator.defender.unit.id)) {
          defenderAttack *= 1 + this.$store.state.calculator.defender.hero.level / this.$store.state.calculator.defender.unit.level * 0.05
          defenderDefense *= 1 + this.$store.state.calculator.defender.hero.level / this.$store.state.calculator.defender.unit.level * 0.05

          defenderAttack = Math.ceil(defenderAttack)
          defenderDefense = Math.ceil(defenderDefense)
        }
      }

      if (this.$store.state.calculator.defender.unit.effects.length > 0) {
        // Bloodlust spell
        if (this.$store.state.calculator.defender.unit.effects.includes('Bloodlust')) {
          if (this.$store.state.calculator.defender.hero.specialtySpell === 'bloodlust') {
            if (this.$store.state.calculator.defender.unit.level <= 2) {
              defenderAttack += 3
            } else if (this.$store.state.calculator.defender.unit.level <= 4) {
              defenderAttack += 2
            } else if (this.$store.state.calculator.defender.unit.level <= 6) {
              defenderAttack += 1
            }
          }

          if (this.$store.state.calculator.defender.hero.fire < 2) {
            defenderAttack += 3
          } else if (this.$store.state.calculator.defender.hero.fire > 1) {
            defenderAttack += 6
          }
        }

        // Frenzy spell
        if (this.$store.state.calculator.defender.unit.effects.includes('Frenzy')) {
          if (this.$store.state.calculator.defender.hero.fire < 2) {
            defenderAttack += defenderDefense
          } else if (this.$store.state.calculator.defender.hero.fire === 2) {
            defenderAttack += defenderDefense * 1.5
          } else if (this.$store.state.calculator.defender.hero.fire === 3) {
            defenderAttack += defenderDefense * 2
          }
          defenderDefense = 0
        }

        // Slayer spell
        if (this.$store.state.calculator.defender.unit.effects.includes('Slayer')) {
          let units = [26, 27, 54, 55, 68, 69, 96, 97, 110, 111, 137, 138, 139, 140]
          if (this.$store.state.calculator.defender.hero.fire === 2) {
            units.push(12, 13, 82, 83)
          } else if (this.$store.state.calculator.defender.hero.fire === 3) {
            units.push(40, 41, 124, 125, 154, 155)
          }

          // If ATTACKER unit in slayer units list
          if (units.includes(this.$store.state.calculator.attacker.unit.id)) {
            defenderAttack += 8
          }
        }

        // Prayer spell
        if (this.$store.state.calculator.defender.unit.effects.includes('Prayer')) {
          // Prayer spell hero specialty bonus
          if (this.$store.state.calculator.defender.hero.specialtySpell === 'prayer') {
            if (this.$store.state.calculator.defender.unit.level <= 2) {
              defenderAttack += 3
              defenderDefense += 3
            } else if (this.$store.state.calculator.defender.unit.level <= 4) {
              defenderAttack += 2
              defenderDefense += 2
            } else if (this.$store.state.calculator.defender.unit.level <= 6) {
              defenderAttack += 1
              defenderDefense += 1
            }
          }

          if (this.$store.state.calculator.defender.hero.water < 2) {
            defenderAttack += 2
            defenderDefense += 2
          } else if (this.$store.state.calculator.defender.hero.water > 1) {
            defenderAttack += 4
            defenderDefense += 4
          }
        }

        // Precision spell
        if (this.$store.state.calculator.defender.unit.effects.includes('Precision') && this.$store.state.calculator.defender.unit.ranged) {
          if (this.$store.state.calculator.defender.hero.specialtySpell === 'precision') {
            if (this.$store.state.calculator.defender.unit.level <= 2) {
              defenderAttack += 3
            } else if (this.$store.state.calculator.defender.unit.level <= 4) {
              defenderAttack += 2
            } else if (this.$store.state.calculator.defender.unit.level <= 6) {
              defenderAttack += 1
            }
          }

          if (this.$store.state.calculator.defender.hero.air < 2) {
            defenderAttack += 3
          } else if (this.$store.state.calculator.defender.hero.air > 1) {
            defenderAttack += 6
          }
        }

        // Stone skin spell
        if (this.$store.state.calculator.defender.unit.effects.includes('Stone Skin')) {
          // Stone skin hero specialty bonus
          if (this.$store.state.calculator.defender.hero.specialtySpell === 'stone skin') {
            if (this.$store.state.calculator.defender.unit.level <= 2) {
              defenderDefense += 3
            } else if (this.$store.state.calculator.defender.unit.level <= 4) {
              defenderDefense += 2
            } else if (this.$store.state.calculator.defender.unit.level <= 6) {
              defenderDefense += 1
            }
          }

          if (this.$store.state.calculator.defender.hero.earth < 2) {
            defenderDefense += 3
          } else if (this.$store.state.calculator.defender.hero.earth > 1) {
            defenderDefense += 6
          }
        }

        // ATTACKER stats debuffs

        // Weakness spell
        if (this.$store.state.calculator.defender.unit.effects.includes('Weakness')) {
          // Weakness hero specialty bonus
          if (this.$store.state.calculator.defender.hero.specialtySpell === 'weakness') {
            if (this.$store.state.calculator.defender.unit.level <= 2) {
              defenderAttack -= 3
            } else if (this.$store.state.calculator.defender.unit.level <= 4) {
              defenderAttack -= 2
            } else if (this.$store.state.calculator.defender.unit.level <= 6) {
              defenderAttack -= 1
            }
          }

          if (this.$store.state.calculator.attacker.hero.water < 2) {
            defenderAttack -= 3
          } else if (this.$store.state.calculator.attacker.hero.water > 1) {
            defenderAttack -= 6
          }
        }

        // Disrupting Ray spell
        if (this.$store.state.calculator.defender.unit.effects.includes('Disrupting Ray')) {
          // Disrupting Ray hero specialty bonus
          if (this.$store.state.calculator.defender.hero.specialtySpell === 'disrupting ray') this.$store.state.calculator.defender.stats.defense -= 2

          if (this.$store.state.calculator.attacker.hero.air < 2) {
            defenderDefense -= 3
          } else if (this.$store.state.calculator.attacker.hero.air === 2) {
            defenderDefense -= 4
          } else if (this.$store.state.calculator.attacker.hero.air === 3) {
            defenderDefense -= 5
          }
        }
      }
      return { attackerAttack, attackerDefense, defenderAttack, defenderDefense }
    },

    calculateBlessModificator (attackerMinDamage, attackerMaxDamage, defenderMinDamage, defenderMaxDamage, attackerAttack, attackerDefense, defenderAttack, defenderDefense) {
      if (this.$store.state.calculator.attacker.unit.effects.length > 0) {
        if (this.$store.state.calculator.attacker.unit.effects.includes('Bless')) {
          if (this.$store.state.calculator.attacker.hero.specialtySpell === 'bless') {
            if (this.$store.state.calculator.attacker.hero.water < 2) {
              if (attackerAttack >= attackerDefense) {
                let d = Math.floor(this.$store.state.calculator.attacker.hero.level / this.$store.state.calculator.attacker.unit.level)
                attackerMinDamage = attackerMaxDamage * (1 + (attackerAttack - attackerDefense) * 0.05 + (d * 0.03))
                attackerMaxDamage = attackerMinDamage
              } else if (attackerAttack < attackerDefense) {
                let d = Math.floor(this.$store.state.calculator.attacker.hero.level / this.$store.state.calculator.attacker.unit.level)
                attackerMinDamage = attackerMaxDamage * (1 + (attackerAttack - attackerDefense) * 0.025) + (1 + d * 0.03)
                attackerMaxDamage = attackerMinDamage
              }
            } else if (this.$store.state.calculator.attacker.hero.water > 1) {
              if (attackerAttack >= attackerDefense) {
                let d = Math.floor(this.$store.state.calculator.attacker.hero.level / this.$store.state.calculator.attacker.unit.level)
                attackerMinDamage = (attackerMaxDamage + 1) * (1 + (attackerAttack - attackerDefense) * 0.05 + (d * 0.03))
                attackerMaxDamage = attackerMinDamage
              } else if (attackerAttack < attackerDefense) {
                let d = Math.floor(this.$store.state.calculator.attacker.hero.level / this.$store.state.calculator.attacker.unit.level)
                attackerMinDamage = (attackerMaxDamage + 1) * (1 + (attackerAttack - attackerDefense) * 0.025) + (1 + d * 0.03)
                attackerMaxDamage = attackerMinDamage
              }
            }
          } else {
            if (this.$store.state.calculator.attacker.hero.water < 2) {
              attackerMinDamage = attackerMaxDamage
            } else if (this.$store.state.calculator.attacker.hero.water > 1) {
              attackerMinDamage = (attackerMaxDamage + 1)
              attackerMaxDamage++
            }
          }
        }
      }

      if (this.$store.state.calculator.defender.unit.effects.length > 0) {
        if (this.$store.state.calculator.defender.unit.effects.includes('Bless')) {
          if (this.$store.state.calculator.defender.hero.water < 2) {
            defenderMinDamage = defenderMaxDamage
          } else if (this.$store.state.calculator.defender.hero.water > 1) {
            defenderMinDamage = (defenderMaxDamage + 1)
            defenderMaxDamage++
          }
        }
      }
      return { attackerMinDamage, attackerMaxDamage, defenderMinDamage, defenderMaxDamage }
    },
    calculateCurseModificator (attackerMinDamage, attackerMaxDamage, defenderMinDamage, defenderMaxDamage) {
      // For ATTACKER
      if (this.$store.state.calculator.attacker.unit.effects.length > 0) {
        if (this.$store.state.calculator.attacker.unit.effects.includes('Curse')) {
          if (this.$store.state.calculator.defender.hero.fire < 2) {
            attackerMaxDamage = attackerMinDamage
          } else if (this.$store.state.calculator.defender.hero.fire > 1) {
            attackerMinDamage = attackerMinDamage * 0.8 - 1
            attackerMaxDamage = attackerMinDamage
          }
        }
      }

      // For DEFENDER
      if (this.$store.state.calculator.defender.unit.effects.length > 0) {
        if (this.$store.state.calculator.defender.unit.effects.includes('Curse')) {
          if (this.$store.state.calculator.attacker.hero.fire < 2) {
            defenderMaxDamage = defenderMinDamage
          } else if (this.$store.state.calculator.attacker.hero.fire > 1) {
            defenderMinDamage = defenderMinDamage * 0.8 - 1
            defenderMaxDamage = defenderMinDamage
          }
        }
      }
      console.log(attackerMaxDamage)
      return { attackerMinDamage, attackerMaxDamage, defenderMinDamage, defenderMaxDamage }
    },
    calculateTotalDamagesModification (attackerTotalMinDamage, attackerTotalMaxDamage, defenderTotalMinDamage, defenderTotalMaxDamage) {
      // For ATTACKER
      let attackerSkillBonus = 0
      let defenderSkillBonus = 0

      if (this.$store.state.calculator.attacker.hero.id) {
        attackerSkillBonus = 1 + 0.05 * this.$store.state.calculator.attacker.hero.level
      }
      if (this.$store.state.calculator.attacker.hero.id) {
        defenderSkillBonus = 1 + 0.05 * this.$store.state.calculator.defender.hero.level
      }

      // Offense ATTACKER skill bonus
      if (this.$store.state.calculator.attacker.hero.offense > 0 && !this.$store.state.calculator.attacker.unit.ranged) {
        let bonus = 0.1 * this.$store.state.calculator.attacker.hero.offense
        if (this.$store.state.calculator.attacker.hero.specialtySkill === 'offense') {
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
      if (this.$store.state.calculator.attacker.hero.armorer > 0) {
        let bonus = 0.05 * this.$store.state.calculator.attacker.hero.armorer
        if (this.$store.state.calculator.attacker.hero.specialtySkill === 'armorer') {
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
      if (this.$store.state.calculator.attacker.hero.archery > 0 && this.$store.state.calculator.attacker.unit.ranged) {
        let bonus = 0
        if (this.$store.state.calculator.attacker.hero.archery === 1) {
          bonus = 0.1
        } else if (this.$store.state.calculator.attacker.hero.archery === 2) {
          bonus = 0.25
        } else if (this.$store.state.calculator.attacker.hero.archery === 3) {
          bonus = 0.5
        }

        if (this.$store.state.calculator.attacker.hero.specialtySkill === 'archery') {
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
      if (this.$store.state.calculator.attacker.hero.artillery > 0 && (this.$store.state.calculator.attacker.unit.id === 158 || this.$store.state.calculator.attacker.unit.id === 159)) {
        if (this.$store.state.calculator.attacker.hero.artillery === 3) {
          attackerTotalMinDamage *= 2
          attackerTotalMaxDamage *= 2
        }
      }

      // ATTACKER shield spell
      if (this.$store.state.calculator.attacker.unit.effects.includes('Shield')) {
        if (this.$store.state.calculator.attacker.hero.earth < 2) {
          defenderTotalMinDamage -= defenderTotalMinDamage * 0.15
          defenderTotalMaxDamage -= defenderTotalMaxDamage * 0.15
        } else if (this.$store.state.calculator.attacker.hero.earth > 1) {
          defenderTotalMinDamage -= defenderTotalMinDamage * 0.3
          defenderTotalMaxDamage -= defenderTotalMaxDamage * 0.3
        }
      }

      // For DEFENDER

      // Offense DEFENDER skill bonus
      if (this.$store.state.calculator.defender.hero.offense > 0 && !this.$store.state.calculator.defender.unit.ranged) {
        let bonus = 0.1 * this.$store.state.calculator.defender.hero.offense
        if (this.$store.state.calculator.defender.hero.specialtySkill === 'offense') {
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
      if (this.$store.state.calculator.defender.hero.armorer > 0) {
        let bonus = 0.05 * this.$store.state.calculator.defender.hero.armorer
        if (this.$store.state.calculator.defender.hero.specialtySkill === 'armorer') {
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
      if (this.$store.state.calculator.defender.hero.archery > 0 && this.$store.state.calculator.defender.unit.ranged) {
        let bonus = 0
        if (this.$store.state.calculator.defender.hero.archery === 1) {
          bonus = 0.1
        } else if (this.$store.state.calculator.defender.hero.archery === 2) {
          bonus = 0.25
        } else if (this.$store.state.calculator.defender.hero.archery === 3) {
          bonus = 0.5
        }

        if (this.$store.state.calculator.defender.hero.specialtySkill === 'archery') {
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
      if (this.$store.state.calculator.defender.hero.artillery > 0 && (this.$store.state.calculator.defender.unit.id === 158 || this.$store.state.calculator.defender.unit.id === 159)) {
        if (this.$store.state.calculator.defender.hero.artillery === 3) {
          defenderTotalMinDamage *= 2
          defenderTotalMaxDamage *= 2
        }
      }

      // DEFENDER shield spell
      if (this.$store.state.calculator.defender.unit.effects.includes('Shield')) {
        if (this.$store.state.calculator.defender.hero.earth < 2) {
          attackerTotalMinDamage -= attackerTotalMinDamage * 0.15
          attackerTotalMaxDamage -= attackerTotalMaxDamage * 0.15
        } else if (this.$store.state.calculator.defender.hero.earth > 1) {
          attackerTotalMinDamage -= attackerTotalMinDamage * 0.3
          attackerTotalMaxDamage -= attackerTotalMaxDamage * 0.3
        }
      }

      return { attackerTotalMinDamage, attackerTotalMaxDamage, defenderTotalMinDamage, defenderTotalMaxDamage }
    },
    calculateWithHates (attackerTotalMinDamage, attackerTotalMaxDamage, defenderTotalMinDamage, defenderTotalMaxDamage) {
      let hates = false

      for (let i = 0; i < this.$store.state.calculator.hates.length; i++) {
        if (this.$store.state.calculator.hates[i].id === this.$store.state.calculator.attacker.unit.id && this.$store.state.calculator.hates[i].hate.includes(this.$store.state.calculator.defender.unit.id)) {
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

<i18n>
{
  "en": {
    "attacker": "Attacker",
    "defender": "Defender",
    "pick": "Pick"
  },
  "ru": {
    "attacker": "Атакующий",
    "defender": "Защищающийся",
    "pick": "Выбрать"
  }
}
</i18n>
