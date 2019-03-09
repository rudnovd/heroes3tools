<template lang='pug'>
  b-container(): b-row.mt-3.mb-3(): b-col.calculator(cols='12')

    b-row.mb-3()

      //- Attacker col
      b-col.border-right.border-top(cols='12' sm='12' md='6' lg='6' xl='6')

        //- Text
        b-row.mt-3.mb-3()
          b-col(cols='12')
            h4 Attacker

        //- Pick ATTACKER unit image and units count
        b-row
          //- Pick ATTACKER unit image
          b-col(cols='3' sm='3' md='3' lg='3' xl='3')
            b-button(variant='link' @click='selectAttackerModalShow()')
              img(v-if='data.attacker.unit' :src='require(`@/assets/images/${data.attacker.unit.id}.gif`)')
              font-awesome-icon.fa-4x(v-else icon='question-circle' style='color: #00CB31')

            //- Attacker units count
            b-row(v-if='data.attacker.unit')
              b-col.ml-2(cols='10' sm='8', md='12', lg='9', xl='8')
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
          b-col(cols='9' sm='9' md='9' lg='9' xl='9')
            b-button.green-btn(size='sm' block @click='selectAttackerModalShow()')
              template(v-if='data.attacker.unit')
                strong
                  | {{ data.attacker.unit.name }}
              template(v-else)
                | Pick

            //- Choose ATTACKER hero
            b-row.mt-3()
              b-col(cols='12')
                select-hero(@sendHero='selectHero("attacker", $event)')

        //- Inputs ATTACKER level and stats
        b-row.mt-2()

          //- Input ATTACKER level
          b-col(
            v-if='data.attacker.hero.hero'
            cols='4' sm='3' md='3' lg='3' xl='2'
            offset='0' offset-sm='3' offset-md='3' offset-lg='3' offset-xl='3'
          )
            b-form-group(label='Level')
              b-form-input(
                v-model='data.attacker.hero.level'
                type='number'
                :disabled='!data.attacker.hero.hero'
                size='sm'
                min=1
                max=99
                @input='calculate()'
              )

          //- Input ATTACKER attack
          b-col(
            v-if='data.attacker.hero.hero'
            cols='4' sm='3' md='3' lg='3' xl='2'
            offset='0' offset-sm='0' offset-md='0' offset-lg='0' offset-xl='3'
          )
            b-form-group(label='Attack')
              b-form-input(
                v-model='data.attacker.hero.attack'
                type='number'
                :disabled='!data.attacker.hero.hero'
                size='sm'
                min=0
                max=99
                @input='calculate()'
              )

          //- Input ATTACKER defense
          b-col(
            v-if='data.attacker.hero.hero'
            cols='4' sm='3', md='3', lg='3', xl='2'
          )
            b-form-group(label='Defense')
              b-form-input(
                v-model='data.attacker.hero.defense'
                type='number'
                :disabled='!data.attacker.hero.hero'
                size='sm'
                min=0
                max=99
                @input='calculate()'
              )

        //- Select skills
        template(v-if='data.attacker.hero.hero')

          //- Offense and Air select
          b-row.mt-3
            //- Text
            b-col(cols='2' sm='2' md='2' lg='2' xl='2')
              p.mt-1 Offense
            //- Select offense level
            b-col(cols='4' sm='3' md='4' lg='3' xl='3')
              b-form-select(
                v-model='data.attacker.hero.skills.offenseLevel'
                :options='data.skillsOptions'
                size='sm'
                @input='calculate();'
              )

            //- Text
            b-col(cols='2' sm='2' md='2' lg='2' xl='2' offset='0' offset-sm='2' offset-md='0' offset-lg='2' offset-xl='2')
              p.mt-1 Air
            //- Select air level
            b-col(cols='4' sm='3' md='4' lg='3' xl='3')
              b-form-select(
                v-model='data.attacker.hero.skills.airLevel'
                :options='data.skillsOptions'
                size='sm'
                @input='calculate();'
              )

          //- Armorer and Fire select
          b-row.mt-1
            //- Text
            b-col(cols='2' sm='2' md='2' lg='2' xl='2')
              p.mt-1 Armorer
            //- Select armorer level
            b-col(cols='4' sm='3' md='4' lg='3' xl='3')
              b-form-select(
                v-model='data.attacker.hero.skills.armorerLevel'
                :options='data.skillsOptions'
                size='sm'
                @input='calculate();'
              )

            //- Text
            b-col(cols='2' sm='2' md='2' lg='2' xl='2' offset='0' offset-sm='2' offset-md='0' offset-lg='2' offset-xl='2')
              p.mt-1 Fire
            //- Select fire level
            b-col(cols='4' sm='3' md='4' lg='3' xl='3')
              b-form-select(
                v-model='data.attacker.hero.skills.fireLevel'
                :options='data.skillsOptions'
                size='sm'
                @input='calculate()'
              )

          //- Archery and Earth select
          b-row.mt-1
            //- Text
            b-col(cols='2' sm='2' md='2' lg='2' xl='2')
              p.mt-1 Archery
            //- Select archery level
            b-col(cols='4' sm='3' md='4' lg='3' xl='3')
              b-form-select(
                v-model='data.attacker.hero.skills.archeryLevel'
                :options='data.skillsOptions'
                size='sm'
                @input='calculate();'
              )

            //- Text
            b-col(cols='2' sm='2' md='2' lg='2' xl='2' offset='0' offset-sm='2' offset-md='0' offset-lg='2' offset-xl='2')
              p.mt-1 Earth
            //- Select earth level
            b-col(cols='4' sm='3' md='4' lg='3' xl='3')
              b-form-select(
                v-model='data.attacker.hero.skills.earthLevel'
                :options='data.skillsOptions'
                size='sm'
                @input='calculate(); calculate()'
              )

          //- Artillery and Water select
          b-row.mt-1
            //- Text
            b-col(cols='2' sm='2' md='2' lg='2' xl='2')
              p.mt-1 Artillery
            //- Select artillery level
            b-col(cols='4' sm='3' md='4' lg='3' xl='3')
              b-form-select(
                v-model='data.attacker.hero.skills.artilleryLevel'
                :options='data.skillsOptions'
                size='sm'
                @input='calculate();'
              )

            //- Text
            b-col(cols='2' sm='2' md='2' lg='2' xl='2' offset='0' offset-sm='2' offset-md='0' offset-lg='2' offset-xl='2')
              p.mt-1 Water
            //- Select water level
            b-col(cols='4' sm='3' md='4' lg='3' xl='3')
              b-form-select(
                v-model='data.attacker.hero.skills.waterLevel'
                :options='data.skillsOptions'
                size='sm'
                @input='calculate()'
              )

        //- Spells select
        b-row.mt-2(v-if='data.attacker.hero.hero')
          //- Attacker attack buffs checkboxes
          b-col(cols='6' sm='6' md='4' lg='3' xl='3')
            b-form-group
              b-form-checkbox(
                v-for='(value, index) in data.spells.attackBuffs'
                :key='value'
                :checked='data.attacker.effects.includes(value)'
                @change='pushAttackerSpells(value)'
              ) {{ value }}

          //- Attacker defense buffs checkboxes
          b-col(cols='6' sm='5' md='4' lg='3' xl='3' offset='0' offset-sm='1' offset-md='0' offset-lg='0' offset-xl='0')
            b-form-group
              b-form-checkbox(
                v-for='(value, index) in data.spells.defenseBuffs'
                :key='value'
                :checked='data.attacker.effects.includes(value)'
                @change='pushAttackerSpells(value)'
              ) {{ value }}

          //- Attacker attack debuffs checkboxes
          b-col.mt-3.mt-sm-3.mt-md-0.mt-lg-0.mt-xl-0(cols='6' sm='6' md='4' lg='3' xl='3')
            b-form-group
              b-form-checkbox(
                v-for='(value, index) in data.spells.attackDebuffs'
                :key='value'
                :checked='data.attacker.effects.includes(value)'
                @change='pushAttackerSpells(value)'
              ) {{ value }}

        //- Show ATTACKER unit effects
        b-row
          b-col.mt-3.mt-sm-3.mt-md-2.mt-lg-2.mt-xl-2(v-if='data.attacker.effects.length > 0' cols='7' sm='7' md='8' lg='6' xl='12')
            small Effects: {{ data.attacker.effects }}

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

        //- Calculate ATTACKER kills
        b-row.mt-2(v-if='data.attacker.unit && data.defender.unit')
          //- Text
          b-col.text-right
            strong Kills:
          //- Kills value
          p.text-left.mr-3
            strong(v-if='data.attacker.minDamage !== data.attacker.maxDamage')
              | {{ data.attacker.minKills }} — {{ data.attacker.maxKills }} (~ {{ data.attacker.averageKills }})
            strong(v-else)
              | {{ data.attacker.minKills }}

      //- Defender col
      b-col.border-top.mt-5.mt-sm-5.mt-md-0.mt-lg-0.mt-xl-0(cols='12' sm='12' md='6' lg='6' xl='6')
        //- Text
        b-row.mt-3.mb-3()
          b-col(cols='12')
            h4 Defender

        //- Pick DEFENDER unit image and units count
        b-row.mr-0.mr-sm-0.mr-md-2.mr-lg-0.mr-xl-0

          //- Pick DEFENDER unit button
          b-col(cols='9' sm='9' md='9' lg='9' xl='9')
            b-button(size='sm' variant='danger' block @click='selectDefenderModalShow()')
              template(v-if='data.defender.unit')
                strong
                  | {{ data.defender.unit.name }}
              template(v-else)
                | Pick

            //- Choose DEFENDER hero
            b-row.mt-3()
              b-col(cols='12')
                select-hero(@sendHero='selectHero("defender", $event)')

          //- Pick DEFENDER unit image
          b-col(cols='3' sm='3' md='3' lg='3' xl='3')
            b-button(variant='link' @click='selectDefenderModalShow()')
              img(v-if='data.defender.unit' :src='require(`@/assets/images/${data.defender.unit.id}.gif`)')
              font-awesome-icon.fa-4x(v-else icon='question-circle' style='color: #DC3545')

            //- Defender units count
            b-row(v-if='data.defender.unit')
              b-col.ml-2(cols='10' sm='8', md='12', lg='9', xl='8')
                b-form-input(
                  v-model='data.defender.unitsCount'
                  type='number'
                  :disabled='!data.defender.unit'
                  size='sm'
                  min=1
                  max=999
                  @input='calculate()'
                )

        //- Inputs DEFENDER level and stats
        b-row.mt-2()

          //- Input DEFENDER level
          b-col(
            v-if='data.defender.hero.hero'
            cols='4' sm='3' md='3' lg='3' xl='2'
          )
            b-form-group(label='Level')
              b-form-input(
                v-model='data.defender.hero.level'
                type='number'
                :disabled='!data.defender.hero.hero'
                size='sm'
                min=1
                max=99
                @input='calculate()'
              )

          //- Input DEFENDER attack
          b-col(
            v-if='data.defender.hero.hero'
            cols='4' sm='3' md='3' lg='3' xl='2'
            offset='0' offset-sm='0' offset-md='0' offset-lg='0' offset-xl='3'
          )
            b-form-group(label='Attack')
              b-form-input(
                v-model='data.defender.hero.attack'
                type='number'
                :disabled='!data.defender.hero.hero'
                size='sm'
                min=0
                max=99
                @input='calculate()'
              )

          //- Input DEFENDER defense
          b-col(
            v-if='data.defender.hero.hero'
            cols='4' sm='3', md='3', lg='3', xl='2'
          )
            b-form-group(label='Defense')
              b-form-input(
                v-model='data.defender.hero.defense'
                type='number'
                :disabled='!data.defender.hero.hero'
                size='sm'
                min=0
                max=99
                @input='calculate()'
              )

        //- Select skills
        template(v-if='data.defender.hero.hero')

          //- Offense and Air select
          b-row.mt-3
            //- Text
            b-col(cols='2' sm='2' md='2' lg='2' xl='2')
              p.mt-1 Offense
            //- Select offense level
            b-col(cols='4' sm='3' md='4' lg='3' xl='3')
              b-form-select(
                v-model='data.defender.hero.skills.offenseLevel'
                :options='data.skillsOptions'
                size='sm'
                @input='calculate();'
              )

            //- Text
            b-col(cols='2' sm='2' md='2' lg='2' xl='2' offset='0' offset-sm='2' offset-md='0' offset-lg='2' offset-xl='2')
              p.mt-1 Air
            //- Select air level
            b-col(cols='4' sm='3' md='4' lg='3' xl='3')
              b-form-select(
                v-model='data.defender.hero.skills.airLevel'
                :options='data.skillsOptions'
                size='sm'
                @input='calculate()'
              )

          //- Armorer and Fire select
          b-row.mt-1
            //- Text
            b-col(cols='2' sm='2' md='2' lg='2' xl='2')
              p.mt-1 Armorer
            //- Select armorer level
            b-col(cols='4' sm='3' md='4' lg='3' xl='3')
              b-form-select(
                v-model='data.defender.hero.skills.armorerLevel'
                :options='data.skillsOptions'
                size='sm'
                @input='calculate()'
              )

            //- Text
            b-col(cols='2' sm='2' md='2' lg='2' xl='2' offset='0' offset-sm='2' offset-md='0' offset-lg='2' offset-xl='2')
              p.mt-1 Fire
            //- Select fire level
            b-col(cols='4' sm='3' md='4' lg='3' xl='3')
              b-form-select(
                v-model='data.defender.hero.skills.fireLevel'
                :options='data.skillsOptions'
                size='sm'
                @input='calculate()'
              )

          //- Archery and Earth select
          b-row.mt-1
            //- Text
            b-col(cols='2' sm='2' md='2' lg='2' xl='2')
              p.mt-1 Archery
            //- Select archery level
            b-col(cols='4' sm='3' md='4' lg='3' xl='3')
              b-form-select(
                v-model='data.defender.hero.skills.archeryLevel'
                :options='data.skillsOptions'
                size='sm'
                @input='calculate()'
              )

            //- Text
            b-col(cols='2' sm='2' md='2' lg='2' xl='2' offset='0' offset-sm='2' offset-md='0' offset-lg='2' offset-xl='2')
              p.mt-1 Earth
            //- Select earth level
            b-col(cols='4' sm='3' md='4' lg='3' xl='3')
              b-form-select(
                v-model='data.defender.hero.skills.earthLevel'
                :options='data.skillsOptions'
                size='sm'
                @input='calculate()'
              )

          //- Artillery and Water select
          b-row.mt-1
            //- Text
            b-col(cols='2' sm='2' md='2' lg='2' xl='2')
              p.mt-1 Artillery
            //- Select artillery level
            b-col(cols='4' sm='3' md='4' lg='3' xl='3')
              b-form-select(
                v-model='data.defender.hero.skills.artilleryLevel'
                :options='data.skillsOptions'
                size='sm'
                @input='calculate()'
              )

            //- Text
            b-col(cols='2' sm='2' md='2' lg='2' xl='2' offset='0' offset-sm='2' offset-md='0' offset-lg='2' offset-xl='2')
              p.mt-1 Water
            //- Select water level
            b-col(cols='4' sm='3' md='4' lg='3' xl='3')
              b-form-select(
                v-model='data.defender.hero.skills.waterLevel'
                :options='data.skillsOptions'
                size='sm'
                @input='calculate()'
              )

        //- Spells select
        b-row.mt-2(v-if='data.defender.hero.hero')
          //- DEFENDER attack buffs checkboxes
          b-col(cols='6' sm='6' md='4' lg='3' xl='3')
            b-form-group
              b-form-checkbox(
                v-for='(value, index) in data.spells.attackBuffs'
                :key='value'
                :checked='data.defender.effects.includes(value)'
                @change='pushDefenderSpells(value)'
              ) {{ value }}

          //- DEFENDER defense buffs checkboxes
          b-col(cols='6' sm='5' md='4' lg='3' xl='3' offset='0' offset-sm='1' offset-md='0' offset-lg='0' offset-xl='0')
            b-form-group
              b-form-checkbox(
                v-for='(value, index) in data.spells.defenseBuffs'
                :key='value'
                :checked='data.defender.effects.includes(value)'
                @change='pushDefenderSpells(value)'
              ) {{ value }}

          //- DEFENDER attack debuffs checkboxes
          b-col.mt-3.mt-sm-3.mt-md-0.mt-lg-0.mt-xl-0(cols='6' sm='6' md='4' lg='3' xl='3')
            b-form-group
              b-form-checkbox(
                v-for='(value, index) in data.spells.attackDebuffs'
                :key='value'
                :checked='data.defender.effects.includes(value)'
                @change='pushDefenderSpells(value)'
              ) {{ value }}

        //- Show DEFENDER unit effects
        b-row
          b-col.mt-3.mt-sm-3.mt-md-2.mt-lg-2.mt-xl-2(v-if='data.defender.effects.length > 0' cols='7' sm='7' md='8' lg='6' xl='12')
            small Effects: {{ data.defender.effects }}

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

        //- Calculate DEFENDER kills
        b-row.mt-2(v-if='data.defender.unit && data.attacker.unit')
          //- Text
          b-col.text-right
            strong Kills:
          //- Kills value
          p.text-left.mr-3
            strong(v-if='data.defender.minDamage !== data.defender.maxDamage')
              | {{ data.defender.minKills }} — {{data.defender.maxKills}} (~ {{ data.defender.averageKills }})
            strong(v-else)
              | {{ data.defender.minKills }}

    //- Pick ATTACKER unit modal
    b-modal(
      title='Pick attacker unit'
      ref='selectAttackerModal'
      size='xl'
      no-close-on-backdrop=true
      ok-disabled=true
      cancel-disabled=true
      hide-footer=true
    )
      //- Modal content
      b-row(align-v='center')

        //- Search unit
        b-col.ml-2.mr-auto.mb-3(cols='5' sm='5' md='5' lg='4' xl='3')
          b-form-input(
            v-model='data.attacker.search.text'
            type='text'
            placeholder='Angel'
            @input='searchAttackerUnit()'
          )
        //- Clear unit
        b-col.mr-2.mr-sm-4.mr-md-4.mr-lg-5.mr-xl-5(cols='3' sm='2' md='2' lg='1' xl='1')
          b-btn(
            variant='danger'
            @click='data.attacker.unit = null; selectAttackerModalHide()'
          ) Clear

        //- Show if search
        b-col(v-if='this.data.attacker.search.text' cols='12')
          b-btn(
            variant='link'
            size='sm'
            v-for='(unit, index) in data.attacker.search.foundUnits'
            :key='unit.id'
          )
            img(:src='require(`@/assets/images/${unit.id}.gif`)' @click='selectAttacker(unit)')

        //- Show if not search
        b-col(
          v-else
          cols='12'
          v-for='(castle, index) in Object.keys(data.units.list)'
          :key='castle.id'
        )
          b-btn(
            variant='link'
            size='sm'
            v-for='(unit, number) in data.units.list[castle]'
            :key='unit.id'
          )
            img(:src='require(`@/assets/images/${unit.id}.gif`)' @click='selectAttacker(unit)')

    //- Pick DEFENDER unit modal
    b-modal(
      title='Pick defender unit'
      ref='selectDefenderModal'
      size='xl'
      no-close-on-backdrop=true
      ok-disabled=true
      cancel-disabled=true
      hide-footer=true
    )
      //- Modal content
      b-row(align-v='center')

        //- Search unit
        b-col.ml-2.mr-auto.mb-3(cols='5' sm='5' md='5' lg='4' xl='3')
          b-form-input(
            v-model='data.defender.search.text'
            type='text'
            placeholder='Angel'
            @input='searchDefenderUnit()'
          )
        //- Clear unit
        b-col.mr-2.mr-sm-4.mr-md-4.mr-lg-5.mr-xl-5(cols='3' sm='2' md='2' lg='1' xl='1')
          b-btn(
            variant='danger'
            @click='data.defender.unit = null; selectDefenderModalHide()'
          ) Clear

        //- Show if search
        b-col(v-if='this.data.defender.search.text' cols='12')
          b-btn(
            variant='link'
            size='sm'
            v-for='(unit, index) in data.defender.search.foundUnits'
            :key='unit.id'
          )
            img(:src='require(`@/assets/images/${unit.id}.gif`)' @click='selectDefender(unit)')

        //- Show if not search
        b-col(
          v-else
          cols='12'
          v-for='(castle, index) in Object.keys(data.units.list)'
          :key='castle.id'
        )
          b-btn(
            variant='link'
            size='sm'
            v-for='(unit, number) in data.units.list[castle]'
            :key='unit.id'
          )
            img(:src='require(`@/assets/images/${unit.id}.gif`)' @click='selectDefender(unit)')
</template>

<script>
import unitsJson from '@/assets/json/units.json'

import selectHero from '@/components/damageCalculator/selectHero.vue'

export default {
  name: 'DamageCalculator',
  components: {
    'select-hero': selectHero
  },
  beforeCreate () {
    document.title = 'Damage calculator'
  },
  mounted () {
    this.jsonToData()
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

        skillsOptions: [
          { text: 'None', value: 0 },
          { text: 'Basic', value: 1 },
          { text: 'Advanced', value: 2 },
          { text: 'Expert', value: 3 }
        ],

        spells: {
          attackBuffs: ['Bless', 'Bloodlust', 'Frenzy', 'Prayer', 'Precision', 'Slayer'],
          defenseBuffs: ['Shield', 'Stone Skin', 'Air Shield'],
          attackDebuffs: ['Curse', 'Weakness', 'Disrupting Ray'],
          defenseDebuffs: []
        },

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
  methods: {
    selectHero (side, hero) {
      if (side === 'attacker') this.data.attacker.hero.hero = hero
      else if (side === 'defender') this.data.defender.hero.hero = hero

      this.calculate()
    },
    // Select unit
    selectAttacker (unit) {
      this.data.attacker.unit = unit

      this.data.attacker.search.text = null
      this.data.attacker.search.foundUnits = []

      this.calculate()

      this.$refs.selectAttackerModal.hide()
    },
    selectDefender (unit) {
      this.data.defender.unit = unit

      this.data.defender.search.text = null
      this.data.defender.search.foundUnits = []

      this.calculate()

      this.$refs.selectDefenderModal.hide()
    },

    // Show modal
    selectAttackerModalShow () {
      this.$refs.selectAttackerModal.show()
    },
    selectDefenderModalShow () {
      this.$refs.selectDefenderModal.show()
    },

    // Hide modals
    selectAttackerModalHide () {
      this.$refs.selectAttackerModal.hide()
    },
    selectDefenderModalHide () {
      this.$refs.selectDefenderModal.hide()
    },

    // Search units
    searchAttackerUnit () {
      this.data.attacker.search.foundUnits = []
      for (let i = 0; i < unitsJson.length; i++) {
        if (unitsJson[i].name.indexOf(this.data.attacker.search.text) !== -1 || unitsJson[i].name.toLowerCase().indexOf(this.data.attacker.search.text) !== -1) {
          this.data.attacker.search.foundUnits.push(unitsJson[i])
        }
      }
    },
    searchDefenderUnit () {
      this.data.defender.search.foundUnits = []
      for (let i = 0; i < unitsJson.length; i++) {
        if (unitsJson[i].name.indexOf(this.data.defender.search.text) !== -1 || unitsJson[i].name.toLowerCase().indexOf(this.data.defender.search.text) !== -1) {
          this.data.defender.search.foundUnits.push(unitsJson[i])
        }
      }
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

      if (this.data.defender.effects.length > 0) {
        const effects = this.data.defender.effects

        // DEFENDER stats buffs

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

<style lang='scss' scoped>
@import '@/css/colors.scss';

.calculator {
  box-shadow: 0 0 5px #AAA;
}

.green-btn {
  background-color: $custom-light-green;
  color: black;
}
</style>
