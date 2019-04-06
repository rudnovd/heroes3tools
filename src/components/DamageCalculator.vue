<template lang='pug'>
b-container.mt-3: b-row.mb-3(): b-col.calculator(cols='12')

  b-row
    //- Attacker col
    b-col(class='attacker border-top border-right px-4 px-sm-4 px-md-4 px-lg-4 px-xl-4' cols='12' sm='12' md='12' lg='6' xl='6')

      //- Text
      b-row.mt-3.mb-3
        b-col(cols='12' sm='12' md='12' lg='3' xl='3' v-if='$store.state.user.locale === "en"')
          h4 {{ $t('attacker') }}
        b-col(cols='12' sm='12' md='12' lg='12' xl='12'  v-if='$store.state.user.locale === "ru"')
          h4 {{ $t('attacker') }}

        template(v-if='$store.state.user.locale === "en"')
          b-col(cols='9' sm='9' md='9' lg='9' xl='9' offset='3' offset-sm='3' offset-md='3' offset-lg='0' offset-xl='0')
            b-button(class='green-btn' size='sm' block @click='pickAttackerModalShow()')

              template(v-if='attackerUnitSelected')
                strong(v-if='$store.state.user.locale === "en"')
                  | {{ $store.state.calculator.attacker.unit.name_en }}
                strong(v-if='$store.state.user.locale === "ru"')
                  | {{ $store.state.calculator.attacker.unit.name_ru }}

              template(v-if='!attackerUnitSelected')
                | {{ $t('pick') }}

        template(v-if='$store.state.user.locale === "ru"')
          b-col(cols='9' sm='9' md='9' lg='9' xl='9' offset='3' offset-sm='3' offset-md='3' offset-lg='3' offset-xl='3')
            b-button(class='green-btn' size='sm' block @click='pickAttackerModalShow()')

              template(v-if='attackerUnitSelected')
                strong(v-if='$store.state.user.locale === "en"')
                  | {{ $store.state.calculator.attacker.unit.name_en }}
                strong(v-if='$store.state.user.locale === "ru"')
                  | {{ $store.state.calculator.attacker.unit.name_ru }}

              template(v-if='!attackerUnitSelected')
                | {{ $t('pick') }}

      //- Pick ATTACKER unit image and units count
      b-row

        //- Pick ATTACKER unit image
        b-col(cols='3' sm='3' md='3' lg='3' xl='3')

          b-img(
            rounded
            class='mb-1 selected-attacker-unit'
            v-if='attackerUnitSelected'
            :src='$store.state.calculator.images.units[$store.state.calculator.attacker.unit.id].src'
            @click='pickAttackerModalShow()'
          )
          font-awesome-icon(
            v-if='!attackerUnitSelected'
            class='fa-4x'
            icon='question-circle'
            style='color: #00CB31'
            @click='pickAttackerModalShow()'
          )

          //- Attacker units count
          select-units-count.mt-2(v-if='attackerUnitSelected' side="attacker")

        //- Choose ATTACKER hero
        b-col(cols='9')
          select-hero(side='attacker')
          select-hero-stats.mt-1(v-if='attackerHeroSelected' side='attacker')

      template(v-if='attackerHeroSelected')

        select-hero-skills.mt-3(side='attacker')

        select-unit-effects.mt-3(side='attacker')

      template(v-if='attackerUnitSelected && defenderUnitSelected')
        calculated-damage.mt-3(side='attacker')

    //- Defender col
    b-col(class='defender border-top px-4 px-sm-4 px-md-4 px-lg-4 px-xl-4' cols='12' sm='12' md='12' lg='6' xl='6')
      b-row.mt-3.mb-3
        template(v-if='$store.state.user.locale === "en"')

          //- Pick DEFENDER unit button
          b-col(class='order-2 order-sm-2 order-md-1 order-lg-1 order-xl-1' cols='9' sm='9' md='9' lg='9' xl='9')
            b-button(size='sm' variant='danger' block @click='pickDefenderModalShow()')

              template(v-if='defenderUnitSelected')
                strong(v-if='$store.state.user.locale === "en"')
                  | {{ $store.state.calculator.defender.unit.name_en }}
                strong(v-if='$store.state.user.locale === "ru"')
                  | {{ $store.state.calculator.defender.unit.name_ru }}

              template(v-if='!defenderUnitSelected')
                | {{ $t('pick') }}

          //- Text
          b-col(class='text-right pl-0 order-1 order-sm-1 order-md-2 order-lg-2 order-xl-2' cols='12' sm='12' md='3' lg='3' xl='3' v-if='$store.state.user.locale === "en"')
            h4.text-right {{ $t('defender') }}

        template(v-if='$store.state.user.locale === "ru"')
          //- Pick DEFENDER unit button
          b-col(class='text-right' class='pl-0' cols='12' v-if='$store.state.user.locale === "ru"')
            h4.text-right {{ $t('defender') }}

          b-col(cols='9' sm='9' md='9' lg='9' xl='9')
            b-button(size='sm' variant='danger' block @click='pickDefenderModalShow()')

              template(v-if='defenderUnitSelected')
                strong(v-if='$store.state.user.locale === "en"')
                  | {{ $store.state.calculator.defender.unit.name_en }}
                strong(v-if='$store.state.user.locale === "ru"')
                  | {{ $store.state.calculator.defender.unit.name_ru }}

              template(v-if='!defenderUnitSelected')
                | {{ $t('pick') }}

      //- Pick DEFENDER unit image and units count
      b-row

        //- Choose DEFENDER hero
        b-col(cols='9')
          select-hero(side="defender")
          select-hero-stats.mt-1(v-if='defenderHeroSelected' side='defender')

        //- Pick DEFENDER unit image
        b-col(class='text-right align-right' cols='3' sm='3' md='3' lg='3' xl='3')
          b-img(
            rounded
            class='selected-defender-unit'
            v-if='defenderUnitSelected'
            :src='$store.state.calculator.images.units[$store.state.calculator.defender.unit.id].src'
            @click='pickDefenderModalShow()'
          )
          font-awesome-icon(
            class='fa-4x'
            v-if='!defenderUnitSelected'
            icon='question-circle'
            style='color: #DC3545'
            @click='pickDefenderModalShow()'
          )

          //- Defender units count
          select-units-count.mt-2.ml-auto(v-if='defenderUnitSelected' side="defender")

      template(v-if='defenderHeroSelected')

        select-hero-skills.mt-3(side='defender')

        select-unit-effects.mt-3(side='defender')

      template(v-if='attackerUnitSelected && defenderUnitSelected')
        calculated-damage.mt-3(side='defender')

  bottom-panel

  //- Select ATTACKER unit modal
  pick-unit-modal(side='attacker' refString='attackerModal' @sendUnit='selectUnit("attacker", $event)')

  //- Select DEFENDER unit modal
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
  data () {
    return {
      attacker: {
        attack: 0,
        defense: 0,

        baseMinDamage: 0,
        baseMaxDamage: 0,

        damageBonus: 0,
        defenseBonus: 0,
        defenseMagicBonus: 0,

        totalMinDamage: 0,
        totalMaxDamage: 0
      },

      defender: {
        attack: 0,
        defense: 0,

        baseMinDamage: 0,
        baseMaxDamage: 0,

        damageBonus: 0,
        defenseBonus: 0,
        defenseMagicBonus: 0,

        totalMinDamage: 0,
        totalMaxDamage: 0
      }
    }
  },
  watch: {
    calculate () {
      if (this.attackerUnitSelected && this.defenderUnitSelected && this.$store.state.calculator.calculate) {
        this.attacker.attack = this.$store.state.calculator.attacker.unit.stats.attack
        this.attacker.defense = this.$store.state.calculator.attacker.unit.stats.defense
        this.attacker.baseMinDamage = this.$store.state.calculator.attacker.unit.stats.minDamage
        this.attacker.baseMaxDamage = this.$store.state.calculator.attacker.unit.stats.maxDamage
        this.attacker.totalMinDamage = 0
        this.attacker.totalMaxDamage = 0
        this.attacker.damageBonus = 0
        this.attacker.defenseBonus = 0
        this.attacker.defenseMagicBonus = 0

        this.defender.attack = this.$store.state.calculator.defender.unit.stats.attack
        this.defender.defense = this.$store.state.calculator.defender.unit.stats.defense
        this.defender.baseMinDamage = this.$store.state.calculator.defender.unit.stats.minDamage
        this.defender.baseMaxDamage = this.$store.state.calculator.defender.unit.stats.maxDamage
        this.defender.totalMinDamage = 0
        this.defender.totalMaxDamage = 0
        this.defender.damageBonus = 0
        this.defender.defenseBonus = 0
        this.defender.defenseMagicBonus = 0

        this.calculateCurseModificator()

        this.calculateBlessModificator()

        this.calculateStatsModification()

        this.calculateTotalDamagesModification()

        this.calculateWithHates()

        this.calculateArtillery()

        // Calculate damages

        // For ATTACKER

        // If ATTACKER attack > DEFENDER defense
        // Then base formula:
        // ATTACKER units count * ATTACKER unit damage * (1 + 0.05 * (ATTACKER attack - DEFENDER defense))

        // Else if ATTACKER attack < DEFENDER defense
        // Then base formula:
        // ATTACKER units count * ATTACKER unit damage * (1 - 0.025 * (DEFENDER defense - ATTACKER attack))

        // Calculate damage with stats modificators

        if (this.attacker.attack > this.defender.defense) {
          // Max attack cap = 3
          let attackDefenseDifference = Math.abs(0.05 * (this.attacker.attack - this.defender.defense))

          if (attackDefenseDifference > 3) {
            attackDefenseDifference = 3
          }

          this.attacker.totalMinDamage = Math.abs(this.attacker.baseMinDamage * ((1 + attackDefenseDifference + this.attacker.damageBonus) * (1 - this.defender.defenseBonus) * (1 - this.defender.defenseMagicBonus)))
          this.attacker.totalMaxDamage = Math.abs(this.attacker.baseMaxDamage * ((1 + attackDefenseDifference + this.attacker.damageBonus) * (1 - this.defender.defenseBonus) * (1 - this.defender.defenseMagicBonus)))
        } else if (this.attacker.attack === this.defender.defense) {
          this.attacker.totalMinDamage = Math.abs(this.attacker.baseMinDamage * ((1 + this.attacker.damageBonus) * (1 - this.defender.defenseBonus) * (1 - this.defender.defenseMagicBonus)))
          this.attacker.totalMaxDamage = Math.abs(this.attacker.baseMaxDamage * ((1 + this.attacker.damageBonus) * (1 - this.defender.defenseBonus) * (1 - this.defender.defenseMagicBonus)))
        } else if (this.attacker.attack < this.defender.defense) {
          // Max attack cap = 0.7
          let attackDefenseDifference = Math.abs((this.defender.defense - this.attacker.attack) * 0.025)

          if (attackDefenseDifference > 0.7) {
            attackDefenseDifference = 0.7
          }

          this.attacker.totalMinDamage = Math.abs(this.attacker.baseMinDamage * ((1 + this.attacker.damageBonus) * (1 - attackDefenseDifference) * (1 - this.defender.defenseBonus) * (1 - this.defender.defenseMagicBonus)))
          this.attacker.totalMaxDamage = Math.abs(this.attacker.baseMaxDamage * ((1 + this.attacker.damageBonus) * (1 - attackDefenseDifference) * (1 - this.defender.defenseBonus) * (1 - this.defender.defenseMagicBonus)))
        }

        this.attacker.totalMinDamage *= this.$store.state.calculator.attacker.unit.count
        this.attacker.totalMaxDamage *= this.$store.state.calculator.attacker.unit.count

        // For DEFENDER

        // If DEFENDER attack > ATTACKER defense
        // Then base formula:
        // DEFENDER units count * DEFENDER unit damage * (1 + 0.05 * (DEFENDER attack - ATTACKER defense))

        // Else if DEFENDER attack < ATTACKER defense
        // Then base formula:
        // DEFENDER units count * DEFENDER unit damage * (1 - 0.025 * (ATTACKER defense - DEFENDER attack))
        if (this.defender.attack > this.attacker.defense) {
          // Max attack cap = 3
          let attackDefenseDifference = 0.05 * (this.defender.attack - this.attacker.defense)

          if (attackDefenseDifference > 3) {
            attackDefenseDifference = 3
          }

          this.defender.totalMinDamage = Math.abs(this.defender.baseMinDamage * ((1 + attackDefenseDifference + this.defender.damageBonus) * (1 - this.attacker.defenseBonus) * (1 - this.attacker.defenseMagicBonus)))
          this.defender.totalMaxDamage = Math.abs(this.defender.baseMaxDamage * ((1 + attackDefenseDifference + this.defender.damageBonus) * (1 - this.attacker.defenseBonus) * (1 - this.attacker.defenseMagicBonus)))
        } else if (this.defender.attack === this.attacker.defense) {
          // if === then no cap
          this.defender.totalMinDamage = Math.abs(this.attacker.baseMinDamage * ((1 + this.defender.damageBonus) * (1 - this.attacker.defenseBonus) * (1 - this.attacker.defenseMagicBonus)))
          this.defender.totalMaxDamage = Math.abs(this.attacker.baseMaxDamage * ((1 + this.defender.damageBonus) * (1 - this.attacker.defenseBonus) * (1 - this.attacker.defenseMagicBonus)))
        } else if (this.defender.attack < this.attacker.defense) {
          // Max attack cap = 0.7
          let attackDefenseDifference = (this.attacker.defense - this.defender.attack) * 0.025

          if (attackDefenseDifference > 0.7) {
            attackDefenseDifference = 0.7
          }

          this.defender.totalMinDamage = Math.abs(this.defender.baseMinDamage * ((1 + this.defender.damageBonus) * (1 - attackDefenseDifference) * (1 - this.attacker.defenseBonus) * (1 - this.attacker.defenseMagicBonus)))
          this.defender.totalMaxDamage = Math.abs(this.defender.baseMaxDamage * ((1 + this.defender.damageBonus) * (1 - attackDefenseDifference) * (1 - this.attacker.defenseBonus) * (1 - this.attacker.defenseMagicBonus)))
        }

        this.defender.totalMinDamage *= this.$store.state.calculator.defender.unit.count
        this.defender.totalMaxDamage *= this.$store.state.calculator.defender.unit.count

        // Transform total damages
        this.attacker.totalMinDamage = Math.floor(this.attacker.totalMinDamage)
        this.attacker.totalMaxDamage = Math.floor(this.attacker.totalMaxDamage)
        this.attacker.averageDamage = Math.floor((this.attacker.totalMinDamage + this.attacker.totalMaxDamage) / 2)

        let attackerTotalMinKills = Math.floor(this.attacker.totalMinDamage / this.$store.state.calculator.defender.unit.stats.health)
        let attackerTotalMaxKills = Math.floor(this.attacker.totalMaxDamage / this.$store.state.calculator.defender.unit.stats.health)
        let attackerTotalAverageKills = Math.floor(this.attacker.averageDamage / this.$store.state.calculator.defender.unit.stats.health)

        this.defender.totalMinDamage = Math.floor(this.defender.totalMinDamage)
        this.defender.totalMaxDamage = Math.floor(this.defender.totalMaxDamage)
        this.defender.averageDamage = Math.floor((this.defender.totalMinDamage + this.defender.totalMaxDamage) / 2)

        let defenderTotalMinKills = Math.floor(this.defender.totalMinDamage / this.$store.state.calculator.attacker.unit.stats.health)
        let defenderTotalMaxKills = Math.floor(this.defender.totalMaxDamage / this.$store.state.calculator.attacker.unit.stats.health)
        let defenderTotalAverageKills = Math.floor(this.defender.averageDamage / this.$store.state.calculator.attacker.unit.stats.health)

        this.setResultDamage({
          side: 'attacker',
          unit: {
            totalMinDamage: this.attacker.totalMinDamage,
            totalMaxDamage: this.attacker.totalMaxDamage,
            totalAverageDamage: this.attacker.averageDamage,
            totalMinKills: attackerTotalMinKills,
            totalMaxKills: attackerTotalMaxKills,
            totalAverageKills: attackerTotalAverageKills
          }
        })

        this.setResultDamage({
          side: 'defender',
          unit: {
            totalMinDamage: this.defender.totalMinDamage,
            totalMaxDamage: this.defender.totalMaxDamage,
            totalAverageDamage: this.defender.averageDamage,
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
    calculateStatsModification () {
      this.attacker.attack += parseInt(this.$store.state.calculator.attacker.hero.attack)
      this.attacker.defense += parseInt(this.$store.state.calculator.attacker.hero.defense)

      this.defender.attack += parseInt(this.$store.state.calculator.defender.hero.attack)
      this.defender.defense += parseInt(this.$store.state.calculator.defender.hero.defense)

      if (this.$store.state.calculator.terrain) {
        if (this.$store.state.calculator.attacker.unit.nativeTerrain === this.$store.state.calculator.terrain) {
          this.attacker.attack++
          this.attacker.defense++
        }
        if (this.$store.state.calculator.defender.unit.nativeTerrain === this.$store.state.calculator.terrain) {
          this.defender.attack++
          this.defender.defense++
        }
      }

      // ATTACKER hero unit specialty bonus
      if (this.$store.state.calculator.attacker.hero.specialtyUnit) {
        if (this.$store.state.calculator.attacker.hero.specialtyUnit.includes(this.$store.state.calculator.attacker.unit.id)) {
          this.attacker.attack *= 1 + this.$store.state.calculator.attacker.hero.level / this.$store.state.calculator.attacker.unit.level * 0.05
          this.attacker.defense *= 1 + this.$store.state.calculator.attacker.hero.level / this.$store.state.calculator.attacker.unit.level * 0.05

          this.attacker.attack = Math.ceil(this.attacker.attack)
          this.attacker.defense = Math.ceil(this.attacker.defense)
        }
      }

      if (this.$store.state.calculator.attacker.unit.effects.length > 0) {
        // ATTACKER stats buffs

        // Bloodlust spell
        if (this.$store.state.calculator.attacker.unit.effects.includes('Bloodlust')) {
          // Bloodlust spell hero specialty bonus
          if (this.$store.state.calculator.attacker.hero.specialtySpell === 'bloodlust') {
            if (this.$store.state.calculator.attacker.hero.level <= 2) {
              this.attacker.attack += 3
            } else if (this.$store.state.calculator.attacker.unit.level <= 4) {
              this.attacker.attack += 2
            } else if (this.$store.state.calculator.attacker.unit.level <= 6) {
              this.attacker.attack += 1
            }
          }

          if (this.$store.state.calculator.attacker.hero.fire < 2) {
            this.attacker.attack += 3
          } else if (this.$store.state.calculator.attacker.hero.fire > 1) {
            this.attacker.attack += 6
          }
        }

        // Frenzy spell
        if (this.$store.state.calculator.attacker.unit.effects.includes('Frenzy')) {
          if (this.$store.state.calculator.attacker.hero.fire < 2) {
            this.attacker.attack += this.attacker.defense
          } else if (this.$store.state.calculator.attacker.hero.fire === 2) {
            this.attacker.attack += this.attacker.defense * 1.5
          } else if (this.$store.state.calculator.attacker.hero.fire === 3) {
            this.attacker.attack += this.attacker.defense * 2
          }
          this.attacker.defense = 0
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
            this.attacker.attack += 8
          }
        }

        // Prayer spell
        if (this.$store.state.calculator.attacker.unit.effects.includes('Prayer')) {
          // Prayer spell hero specialty bonus
          if (this.$store.state.calculator.attacker.hero.specialtySpell === 'prayer') {
            if (this.$store.state.calculator.attacker.unit.level <= 2) {
              this.attacker.attack += 3
              this.attacker.defense += 3
            } else if (this.$store.state.calculator.attacker.unit.level <= 4) {
              this.attacker.attack += 2
              this.attacker.defense += 2
            } else if (this.$store.state.calculator.attacker.unit.level <= 6) {
              this.attacker.attack += 1
              this.attacker.defense += 1
            }
          }

          if (this.$store.state.calculator.attacker.hero.water < 2) {
            this.attacker.attack += 2
            this.attacker.defense += 2
          } else if (this.$store.state.calculator.attacker.hero.water > 1) {
            this.attacker.attack += 4
            this.attacker.defense += 4
          }
        }

        // Precision spell
        if (this.$store.state.calculator.attacker.unit.effects.includes('Precision') && this.$store.state.calculator.attacker.unit.ranged) {
          // Precision hero specialty bonus
          if (this.$store.state.calculator.attacker.hero.specialtySpell === 'precision') {
            if (this.$store.state.calculator.attacker.unit.level <= 2) {
              this.attacker.attack += 3
            } else if (this.$store.state.calculator.attacker.unit.level <= 4) {
              this.attacker.attack += 2
            } else if (this.$store.state.calculator.attacker.unit.level <= 6) {
              this.attacker.attack += 1
            }
          }

          if (this.$store.state.calculator.attacker.hero.air < 2) {
            this.attacker.attack += 3
          } else if (this.$store.state.calculator.attacker.hero.air > 1) {
            this.attacker.attack += 6
          }
        }

        // Stone skin spell
        if (this.$store.state.calculator.attacker.unit.effects.includes('Stone Skin')) {
          // Stone skin hero specialty bonus
          if (this.$store.state.calculator.attacker.hero.specialtySpell === 'stone skin') {
            if (this.$store.state.calculator.attacker.unit.level <= 2) {
              this.attacker.defense += 3
            } else if (this.$store.state.calculator.attacker.unit.level <= 4) {
              this.attacker.defense += 2
            } else if (this.$store.state.calculator.attacker.unit.level <= 6) {
              this.attacker.defense += 1
            }
          }

          if (this.$store.state.calculator.attacker.hero.earth < 2) {
            this.attacker.defense += 3
          } else if (this.$store.state.calculator.attacker.hero.earth > 1) {
            this.attacker.defense += 6
          }
        }

        // ATTACKER stats debuffs

        // Weakness spell
        if (this.$store.state.calculator.attacker.unit.effects.includes('Weakness')) {
          // Weakness hero specialty bonus
          if (this.$store.state.calculator.defender.hero.specialtySpell === 'weakness') {
            if (this.$store.state.calculator.attacker.unit.level <= 2) {
              this.attacker.attack -= 3
            } else if (this.$store.state.calculator.attacker.unit.level <= 4) {
              this.attacker.attack -= 2
            } else if (this.$store.state.calculator.attacker.unit.level <= 6) {
              this.attacker.attack -= 1
            }
          }

          if (this.$store.state.calculator.defender.hero.water < 2) {
            this.attacker.attack -= 3
          } else if (this.$store.state.calculator.defender.hero.water > 1) {
            this.attacker.attack -= 6
          }
        }

        // Disrupting Ray spell
        if (this.$store.state.calculator.attacker.unit.effects.includes('Disrupting Ray')) {
          // Disrupting Ray hero specialty bonus
          if (this.$store.state.calculator.defender.hero.specialtySpell === 'disrupting ray') {
            this.attacker.defense -= 2
          }

          if (this.$store.state.calculator.defender.hero.air < 2) {
            this.attacker.defense -= 3
          } else if (this.$store.state.calculator.defender.hero.air === 2) {
            this.attacker.defense -= 4
          } else if (this.$store.state.calculator.defender.hero.air === 3) {
            this.attacker.defense -= 5
          }
        }
      }

      // DEFENDER stats buffs

      // DEFENDER hero unit specialty bonus
      if (this.$store.state.calculator.defender.hero.specialtyUnit) {
        if (this.$store.state.calculator.defender.hero.specialtyUnit.includes(this.$store.state.calculator.defender.unit.id)) {
          this.defender.attack *= 1 + this.$store.state.calculator.defender.hero.level / this.$store.state.calculator.defender.unit.level * 0.05
          this.defender.defense *= 1 + this.$store.state.calculator.defender.hero.level / this.$store.state.calculator.defender.unit.level * 0.05

          this.defender.attack = Math.ceil(this.defender.attack)
          this.defender.defense = Math.ceil(this.defender.defense)
        }
      }

      if (this.$store.state.calculator.defender.unit.effects.length > 0) {
        // Bloodlust spell
        if (this.$store.state.calculator.defender.unit.effects.includes('Bloodlust')) {
          if (this.$store.state.calculator.defender.hero.specialtySpell === 'bloodlust') {
            if (this.$store.state.calculator.defender.unit.level <= 2) {
              this.defender.attack += 3
            } else if (this.$store.state.calculator.defender.unit.level <= 4) {
              this.defender.attack += 2
            } else if (this.$store.state.calculator.defender.unit.level <= 6) {
              this.defender.attack += 1
            }
          }

          if (this.$store.state.calculator.defender.hero.fire < 2) {
            this.defender.attack += 3
          } else if (this.$store.state.calculator.defender.hero.fire > 1) {
            this.defender.attack += 6
          }
        }

        // Frenzy spell
        if (this.$store.state.calculator.defender.unit.effects.includes('Frenzy')) {
          if (this.$store.state.calculator.defender.hero.fire < 2) {
            this.defender.attack += this.defender.defense
          } else if (this.$store.state.calculator.defender.hero.fire === 2) {
            this.defender.attack += this.defender.defense * 1.5
          } else if (this.$store.state.calculator.defender.hero.fire === 3) {
            this.defender.attack += this.defender.defense * 2
          }
          this.defender.defense = 0
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
            this.defender.attack += 8
          }
        }

        // Prayer spell
        if (this.$store.state.calculator.defender.unit.effects.includes('Prayer')) {
          // Prayer spell hero specialty bonus
          if (this.$store.state.calculator.defender.hero.specialtySpell === 'prayer') {
            if (this.$store.state.calculator.defender.unit.level <= 2) {
              this.defender.attack += 3
              this.defender.defense += 3
            } else if (this.$store.state.calculator.defender.unit.level <= 4) {
              this.defender.attack += 2
              this.defender.defense += 2
            } else if (this.$store.state.calculator.defender.unit.level <= 6) {
              this.defender.attack += 1
              this.defender.defense += 1
            }
          }

          if (this.$store.state.calculator.defender.hero.water < 2) {
            this.defender.attack += 2
            this.defender.defense += 2
          } else if (this.$store.state.calculator.defender.hero.water > 1) {
            this.defender.attack += 4
            this.defender.defense += 4
          }
        }

        // Precision spell
        if (this.$store.state.calculator.defender.unit.effects.includes('Precision') && this.$store.state.calculator.defender.unit.ranged) {
          if (this.$store.state.calculator.defender.hero.specialtySpell === 'precision') {
            if (this.$store.state.calculator.defender.unit.level <= 2) {
              this.defender.attack += 3
            } else if (this.$store.state.calculator.defender.unit.level <= 4) {
              this.defender.attack += 2
            } else if (this.$store.state.calculator.defender.unit.level <= 6) {
              this.defender.attack += 1
            }
          }

          if (this.$store.state.calculator.defender.hero.air < 2) {
            this.defender.attack += 3
          } else if (this.$store.state.calculator.defender.hero.air > 1) {
            this.defender.attack += 6
          }
        }

        // Stone skin spell
        if (this.$store.state.calculator.defender.unit.effects.includes('Stone Skin')) {
          // Stone skin hero specialty bonus
          if (this.$store.state.calculator.defender.hero.specialtySpell === 'stone skin') {
            if (this.$store.state.calculator.defender.unit.level <= 2) {
              this.defender.defense += 3
            } else if (this.$store.state.calculator.defender.unit.level <= 4) {
              this.defender.defense += 2
            } else if (this.$store.state.calculator.defender.unit.level <= 6) {
              this.defender.defense += 1
            }
          }

          if (this.$store.state.calculator.defender.hero.earth < 2) {
            this.defender.defense += 3
          } else if (this.$store.state.calculator.defender.hero.earth > 1) {
            this.defender.defense += 6
          }
        }

        // ATTACKER stats debuffs

        // Weakness spell
        if (this.$store.state.calculator.defender.unit.effects.includes('Weakness')) {
          // Weakness hero specialty bonus
          if (this.$store.state.calculator.defender.hero.specialtySpell === 'weakness') {
            if (this.$store.state.calculator.defender.unit.level <= 2) {
              this.defender.attack -= 3
            } else if (this.$store.state.calculator.defender.unit.level <= 4) {
              this.defender.attack -= 2
            } else if (this.$store.state.calculator.defender.unit.level <= 6) {
              this.defender.attack -= 1
            }
          }

          if (this.$store.state.calculator.attacker.hero.water < 2) {
            this.defender.attack -= 3
          } else if (this.$store.state.calculator.attacker.hero.water > 1) {
            this.defender.attack -= 6
          }
        }

        // Disrupting Ray spell
        if (this.$store.state.calculator.defender.unit.effects.includes('Disrupting Ray')) {
          // Disrupting Ray hero specialty bonus
          if (this.$store.state.calculator.defender.hero.specialtySpell === 'disrupting ray') this.$store.state.calculator.defender.stats.defense -= 2

          if (this.$store.state.calculator.attacker.hero.air < 2) {
            this.defender.defense -= 3
          } else if (this.$store.state.calculator.attacker.hero.air === 2) {
            this.defender.defense -= 4
          } else if (this.$store.state.calculator.attacker.hero.air === 3) {
            this.defender.defense -= 5
          }
        }
      }
    },

    calculateBlessModificator () {
      if (this.$store.state.calculator.attacker.unit.effects.length > 0) {
        if (this.$store.state.calculator.attacker.unit.effects.includes('Bless')) {
          if (this.$store.state.calculator.attacker.hero.specialtySpell === 'bless') {
            this.attacker.damageBonus += 0.03 * this.$store.state.calculator.attacker.hero.level / this.$store.state.calculator.attacker.unit.level
          }
          if (this.$store.state.calculator.attacker.hero.water < 2) {
            this.attacker.baseMinDamage = this.attacker.baseMaxDamage
          } else if (this.$store.state.calculator.attacker.hero.water > 1) {
            this.attacker.baseMinDamage = this.attacker.baseMaxDamage + 1
            this.attacker.baseMaxDamage++
          }
        }
      }

      if (this.$store.state.calculator.defender.unit.effects.length > 0) {
        if (this.$store.state.calculator.defender.unit.effects.includes('Bless')) {
          if (this.$store.state.calculator.defender.hero.specialtySpell === 'bless') {
            this.defender.damageBonus += 0.03 * this.$store.state.calculator.defender.hero.level / this.$store.state.calculator.defender.unit.level
          }
          if (this.$store.state.calculator.defender.hero.water < 2) {
            this.defender.baseMinDamage = this.defender.baseMaxDamage
          } else if (this.$store.state.calculator.defender.hero.water > 1) {
            this.defender.baseMinDamage = this.defender.baseMaxDamage + 1
            this.defender.baseMaxDamage++
          }
        }
      }
    },
    calculateCurseModificator () {
      // For ATTACKER
      if (this.$store.state.calculator.attacker.unit.effects.length > 0) {
        if (this.$store.state.calculator.attacker.unit.effects.includes('Curse')) {
          if (this.$store.state.calculator.defender.hero.fire < 2) {
            this.attacker.baseMaxDamage = this.attacker.baseMinDamage
          } else if (this.$store.state.calculator.defender.hero.fire > 1) {
            this.attacker.baseMinDamage = this.attacker.baseMinDamage * 0.8 - 1
            this.attacker.baseMaxDamage = this.attacker.baseMinDamage
          }
        }
      }

      // For DEFENDER
      if (this.$store.state.calculator.defender.unit.effects.length > 0) {
        if (this.$store.state.calculator.defender.unit.effects.includes('Curse')) {
          if (this.$store.state.calculator.attacker.hero.fire < 2) {
            this.defender.baseMaxDamage = this.defender.baseMinDamage
          } else if (this.$store.state.calculator.attacker.hero.fire > 1) {
            this.defender.baseMinDamage = this.defender.baseMinDamage * 0.8 - 1
            this.defender.baseMaxDamage = this.defender.baseMinDamage
          }
        }
      }
    },
    calculateTotalDamagesModification () {
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
          bonus *= attackerSkillBonus
          if (bonus > 1.92) {
            bonus = 1.92
          }
        }
        this.attacker.damageBonus += bonus
      }

      // Armorer ATTACKER skill bonus
      if (this.$store.state.calculator.attacker.hero.armorer > 0) {
        let bonus = 0.05 * this.$store.state.calculator.attacker.hero.armorer
        if (this.$store.state.calculator.attacker.hero.specialtySkill === 'armorer') {
          bonus *= attackerSkillBonus
          if (bonus > 0.7) {
            bonus = 0.7
          }
        }
        this.attacker.defenseBonus += bonus
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
          bonus *= attackerSkillBonus
          if (bonus > 3.2) {
            bonus = 3.2
          }
        }
        this.attacker.damageBonus += bonus
      }

      // Artillery ATTACKER skill bonus (for ballista and cannon only)
      if (this.$store.state.calculator.attacker.hero.artillery > 0 && (this.$store.state.calculator.attacker.unit.id === 158 || this.$store.state.calculator.attacker.unit.id === 159)) {
        if (this.$store.state.calculator.attacker.hero.artillery === 3) {
          this.attacker.baseMinDamage *= 2
          this.attacker.baseMaxDamage *= 2
        }
      }

      // ATTACKER shield spell
      if (this.$store.state.calculator.attacker.unit.effects.includes('Shield')) {
        if (this.$store.state.calculator.attacker.hero.earth < 2) {
          this.attacker.defenseMagicBonus += 0.15
        } else if (this.$store.state.calculator.attacker.hero.earth > 1) {
          this.attacker.defenseMagicBonus += 0.3
        }
      }

      // DEFENDER air shield spell
      if (this.$store.state.calculator.attacker.unit.effects.includes('Air Shield') && this.$store.state.calculator.defender.unit.ranged) {
        if (this.$store.state.calculator.attacker.hero.air < 2) {
          this.attacker.defenseMagicBonus += 0.25
        } else if (this.$store.state.calculator.attacker.hero.air > 1) {
          this.attacker.defenseMagicBonus += 0.5
        }
      }

      // For DEFENDER

      // Offense DEFENDER skill bonus
      if (this.$store.state.calculator.defender.hero.offense > 0 && !this.$store.state.calculator.defender.unit.ranged) {
        let bonus = 0.1 * this.$store.state.calculator.defender.hero.offense
        if (this.$store.state.calculator.defender.hero.specialtySkill === 'offense') {
          bonus *= defenderSkillBonus
          if (bonus > 1.92) {
            bonus = 1.92
          }
        }
        this.defender.damageBonus += bonus
      }

      // Armorer DEFENDER skill bonus
      if (this.$store.state.calculator.defender.hero.armorer > 0) {
        let bonus = 0.05 * this.$store.state.calculator.defender.hero.armorer
        if (this.$store.state.calculator.defender.hero.specialtySkill === 'armorer') {
          bonus *= defenderSkillBonus
          if (bonus > 0.7) {
            bonus = 0.7
          }
        }
        this.defender.defenseBonus += bonus
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
          bonus *= defenderSkillBonus
          if (bonus > 3.2) {
            bonus = 3.2
          }
        }
        this.defender.damageBonus += bonus
      }

      // Artillery DEFENDER skill bonus (for ballista and cannon only)
      if (this.$store.state.calculator.defender.hero.artillery > 0 && (this.$store.state.calculator.defender.unit.id === 158 || this.$store.state.calculator.defender.unit.id === 159)) {
        if (this.$store.state.calculator.defender.hero.artillery === 3) {
          this.defender.baseMinDamage *= 2
          this.defender.baseMaxDamage *= 2
        }
      }

      // DEFENDER shield spell
      if (this.$store.state.calculator.defender.unit.effects.includes('Shield')) {
        if (this.$store.state.calculator.defender.hero.earth < 2) {
          this.defender.defenseMagicBonus += 0.15
        } else if (this.$store.state.calculator.defender.hero.earth > 1) {
          this.defender.defenseMagicBonus += 0.3
        }
      }

      // DEFENDER air shield spell
      if (this.$store.state.calculator.defender.unit.effects.includes('Air Shield') && this.$store.state.calculator.attacker.unit.ranged) {
        if (this.$store.state.calculator.defender.hero.air < 2) {
          this.defender.defenseMagicBonus += 0.25
        } else if (this.$store.state.calculator.defender.hero.air > 1) {
          this.defender.defenseMagicBonus += 0.5
        }
      }
    },
    calculateWithHates () {
      let hates = false

      for (let i = 0; i < this.$store.state.calculator.hates.length; i++) {
        if (this.$store.state.calculator.hates[i].id === this.$store.state.calculator.attacker.unit.id && this.$store.state.calculator.hates[i].hate.includes(this.$store.state.calculator.defender.unit.id)) {
          hates = true
        }
      }

      if (hates === true) {
        this.attacker.damageBonus += 0.5
        this.defender.damageBonus += 0.5
      }
    },
    calculateArtillery () {
      if (this.$store.state.calculator.attacker.unit.id === 158) {
        this.attacker.baseMinDamage += (this.attacker.attack - this.$store.state.calculator.attacker.unit.stats.attack) * 2
        this.attacker.baseMaxDamage += (this.attacker.attack - this.$store.state.calculator.attacker.unit.stats.attack) * 3
      } else if (this.$store.state.calculator.attacker.unit.id === 159) {
        this.attacker.baseMinDamage += (this.attacker.attack - this.$store.state.calculator.attacker.unit.stats.attack) * 4
        this.attacker.baseMaxDamage += (this.attacker.attack - this.$store.state.calculator.attacker.unit.stats.attack) * 7
      }

      if (this.$store.state.calculator.defender.unit.id === 158) {
        this.defender.baseMinDamage += (this.defender.attack - this.$store.state.calculator.defender.unit.stats.attack) * 2
        this.defender.baseMaxDamage += (this.defender.attack - this.$store.state.calculator.defender.unit.stats.attack) * 3
      } else if (this.$store.state.calculator.defender.unit.id === 159) {
        this.defender.baseMinDamage += (this.defender.attack - this.$store.state.calculator.defender.unit.stats.attack) * 4
        this.defender.baseMaxDamage += (this.defender.attack - this.$store.state.calculator.defender.unit.stats.attack) * 7
      }
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
}

.green-btn {
  background-color: $custom-light-green;
  color: black;
}

.green-btn:hover {
  background-color: $custom-green;
  color: black;
}

img.selected-attacker-unit {
  border: 2px solid black;
  margin-left: 1px;
}

img.selected-defender-unit {
  border: 2px solid black;
  margin-right: 2px;
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
