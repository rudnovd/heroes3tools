<template lang='pug'>
  b-container(): b-row.mt-3.mb-3(): b-col.calculator(cols='12')

    b-row.mb-3()

      //- Attacker col
      b-col.border-right.border-top(cols='12' sm='12' md='6' lg='6' xl='6')

        //- Text
        b-row.mt-3.mb-3()
          b-col(cols='12')
            h4 Attacker

        //- Pick attacker unit image and units count
        b-row
          //- Pick attacker unit image
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
                  @input='calculateAttackerDamage()'
                )

          //- Pick attacker unit button
          b-col(cols='9' sm='9' md='9' lg='9' xl='9')
            b-button.green-btn(size='sm' block @click='selectAttackerModalShow()')
              template(v-if='data.attacker.unit')
                strong
                  | {{ data.attacker.unit.name }}
              template(v-else)
                | Pick

            //- Choose attacker hero
            b-row.mt-3()
              b-col(cols='12')
                v-select(
                  v-model='data.attacker.hero.hero'
                  :options='data.heroes'
                  label='name'
                  placeholder='Hero'
                )

        //- Inputs attacker level and stats
        b-row.mt-2()

          //- Input attacker level
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
                @input='calculateAttackerDamage(); calculateDefenderDamage();'
              )

          //- Input attacker attack
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
                @input='calculateAttackerDamage()'
              )

          //- Input attacker defense
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
                @input='calculateAttackerDamage(); calculateDefenderDamage();'
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
                @input='calculateAttackerDamage();'
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
                @input='calculateAttackerDamage();'
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
                @input='calculateAttackerDamage(); calculateDefenderDamage();'
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
                @input='calculateAttackerDamage(); calculateDefenderDamage();'
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
                @input='calculateAttackerDamage();'
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
                @input='calculateAttackerDamage(); calculateDefenderDamage()'
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
                @input='calculateAttackerDamage();'
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
                @input='calculateAttackerDamage(); calculateDefenderDamage();'
              )

        //- Spells select
        b-row.mt-2(v-if='data.attacker.hero.hero')
          //- Attacker attack buffs checkboxes
          b-col(cols='6' sm='6' md='4' lg='3' xl='3')
            b-form-checkbox-group(
              stacked
              v-model='data.attacker.attackBuffs'
              :options='data.spells.attackBuffs'
              @input='calculateAttackerDamage(); calculateDefenderDamage();'
            )

          //- Attacker defense buffs checkboxes
          b-col(cols='6' sm='5' md='4' lg='3' xl='3' offset='0' offset-sm='1' offset-md='0' offset-lg='0' offset-xl='0')
            b-form-checkbox-group(
              stacked
              v-model='data.attacker.defenseBuffs'
              :options='data.spells.defenseBuffs'
              @input='calculateAttackerDamage(); calculateDefenderDamage();'
            )

          //- Attacker attack debuffs checkboxes
          b-col.mt-3.mt-sm-3.mt-md-0.mt-lg-0.mt-xl-0(cols='6' sm='6' md='4' lg='3' xl='3')
            b-form-checkbox-group(
              stacked
              v-model='data.attacker.attackDebuffs'
              :options='data.spells.attackDebuffs'
              @input='calculateAttackerDamage(); calculateDefenderDamage();'
            )

        //- Calculate attacker damage
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

        //- Calculate attacker kills
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

        //- Pick defender unit image and units count
        b-row.mr-0.mr-sm-0.mr-md-2.mr-lg-0.mr-xl-0

          //- Pick defender unit button
          b-col(cols='9' sm='9' md='9' lg='9' xl='9')
            b-button(size='sm' variant='danger' block @click='selectDefenderModalShow()')
              template(v-if='data.defender.unit')
                strong
                  | {{ data.defender.unit.name }}
              template(v-else)
                | Pick

            //- Choose defender hero
            b-row.mt-3()
              b-col(cols='12')
                v-select(
                  v-model='data.defender.hero.hero'
                  :options='data.heroes'
                  label='name'
                  placeholder='Hero'
                )

          //- Pick defender unit image
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
                  @input='calculateDefenderDamage(); calculateAttackerDamage();'
                )

        //- Inputs defender level and stats
        b-row.mt-2()

          //- Input defender level
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
                @input='calculateDefenderDamage(); calculateAttackerDamage();'
              )

          //- Input defender attack
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
                @input='calculateDefenderDamage(); calculateAttackerDamage();'
              )

          //- Input defender defense
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
                @input='calculateDefenderDamage(); calculateAttackerDamage();'
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
                @input='calculateDefenderDamage();'
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
                @input='calculateDefenderDamage(); calculateAttackerDamage();'
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
                @input='calculateDefenderDamage(); calculateAttackerDamage();'
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
                @input='calculateDefenderDamage(); calculateAttackerDamage();'
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
                @input='calculateDefenderDamage(); calculateAttackerDamage();'
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
                @input='calculateDefenderDamage(); calculateAttackerDamage();'
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
                @input='calculateDefenderDamage(); calculateAttackerDamage();'
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
                @input='calculateDefenderDamage(); calculateAttackerDamage();'
              )

        //- Spells select
        b-row.mt-2(v-if='data.defender.hero.hero')
          //- Defender attack buffs checkboxes
          b-col(cols='6' sm='6' md='4' lg='3' xl='3')
            b-form-checkbox-group(
              stacked
              v-model='data.defender.attackBuffs'
              :options='data.spells.attackBuffs'
              @input='calculateDefenderDamage(); calculateAttackerDamage();'
            )

          //- Defender defense buffs checkboxes
          b-col(cols='6' sm='5' md='4' lg='3' xl='3' offset='0' offset-sm='1' offset-md='0' offset-lg='0' offset-xl='0')
            b-form-checkbox-group(
              stacked
              v-model='data.defender.defenseBuffs'
              :options='data.spells.defenseBuffs'
              @input='calculateDefenderDamage(); calculateAttackerDamage();'
            )

          //- Defender attack debuffs checkboxes
          b-col.mt-3.mt-sm-3.mt-md-0.mt-lg-0.mt-xl-0(cols='6' sm='6' md='4' lg='3' xl='3')
            b-form-checkbox-group(
              stacked
              v-model='data.defender.attackDebuffs'
              :options='data.spells.attackDebuffs'
              @input='calculateDefenderDamage(); calculateAttackerDamage();'
            )

        //- Calculate defender damage
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

        //- Calculate defender kills
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

    //- Pick attacker unit modal
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

    //- Pick defender unit modal
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

import heroesJson from '@/assets/json/heroes.json'

export default {
  name: 'DamageCalculator',
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

        heroes: heroesJson,

        skillsOptions: [
          { text: 'None', value: 0 },
          { text: 'Basic', value: 1 },
          { text: 'Advanced', value: 2 },
          { text: 'Expert', value: 3 }
        ],

        spells: {
          attackBuffs: ['Bless', 'Bloodlust', 'Frenzy', 'Prayer', 'Precision', 'Slayer'],
          defenseBuffs: ['Shield', 'Stone Skin', 'Air Shield'],
          attackDebuffs: ['Curse', 'Weakness', 'Dis. ray'],
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
    // Select unit
    selectAttacker (unit) {
      this.data.attacker.unit = unit

      this.data.attacker.search.text = null
      this.data.attacker.search.foundUnits = []

      this.calculateAttackerDamage()
      this.calculateDefenderDamage()

      this.$refs.selectAttackerModal.hide()
    },
    selectDefender (unit) {
      this.data.defender.unit = unit

      this.data.defender.search.text = null
      this.data.defender.search.foundUnits = []

      this.calculateAttackerDamage()
      this.calculateDefenderDamage()

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

    // Calculation
    calculateAttackerDamage () {
      if (this.data.attacker.unit && this.data.defender.unit) {
        let minDamage = 0
        let maxDamage = 0

        let attackerAttack = this.data.attacker.unit.stats.attack + parseInt(this.data.attacker.hero.attack)
        let defenderDefense = this.data.defender.unit.stats.defense + parseInt(this.data.defender.hero.defense)

        // If ATTACKER attack > DEFENDER defense
        // Then base formula:
        // ATTACKER units count * ATTACKER unit damage * (1 + 0.05 * (ATTACKER attack - DEFENDER defense))

        // Else if ATTACKER attack < DEFENDER defense
        // Then base formula:
        // ATTACKER units count * ATTACKER unit damage * (1 - 0.025 * (DEFENDER defense - ATTACKER attack))
        if (attackerAttack > defenderDefense || attackerAttack === defenderDefense) {
          // Max attack cap = 3
          if (0.05 * (attackerAttack - defenderDefense) <= 3) {
            minDamage = this.data.attacker.unitsCount * this.data.attacker.unit.stats.minDamage * (1 + 0.05 * (attackerAttack - defenderDefense))
            maxDamage = this.data.attacker.unitsCount * this.data.attacker.unit.stats.maxDamage * (1 + 0.05 * (attackerAttack - defenderDefense))
          } else {
            minDamage = this.data.attacker.unitsCount * this.data.attacker.unit.stats.minDamage * (1 + 3)
            maxDamage = this.data.attacker.unitsCount * this.data.attacker.unit.stats.maxDamage * (1 + 3)
          }
        } else if (attackerAttack < defenderDefense) {
          // Max attack cap = 0.7
          if (0.025 * (defenderDefense - attackerAttack) <= 0.7) {
            minDamage = this.data.attacker.unitsCount * this.data.attacker.unit.stats.minDamage * (1 - 0.025 * (defenderDefense - attackerAttack))
            maxDamage = this.data.attacker.unitsCount * this.data.attacker.unit.stats.maxDamage * (1 - 0.025 * (defenderDefense - attackerAttack))
          } else {
            minDamage = this.data.attacker.unitsCount * this.data.attacker.unit.stats.minDamage * (1 - 0.7)
            maxDamage = this.data.attacker.unitsCount * this.data.attacker.unit.stats.maxDamage * (1 - 0.7)
          }
        }

        // Offense skill bonus
        if (this.data.attacker.hero.skills.offenseLevel > 0) {
          minDamage += (minDamage / 10) * this.data.attacker.hero.skills.offenseLevel
          maxDamage += (maxDamage / 10) * this.data.attacker.hero.skills.offenseLevel
        }

        // Armorer skill bonus
        if (this.data.defender.hero.skills.armorerLevel > 0) {
          minDamage -= (minDamage * 5 / 100) * this.data.defender.hero.skills.armorerLevel
          maxDamage -= (maxDamage * 5 / 100) * this.data.defender.hero.skills.armorerLevel
        }

        this.data.attacker.minDamage = Math.floor(minDamage)
        this.data.attacker.maxDamage = Math.floor(maxDamage)
        this.data.attacker.averageDamage = Math.floor((this.data.attacker.minDamage + this.data.attacker.maxDamage) / 2)

        this.data.attacker.minKills = Math.floor(this.data.attacker.minDamage / this.data.defender.unit.stats.health)
        this.data.attacker.maxKills = Math.floor(this.data.attacker.maxDamage / this.data.defender.unit.stats.health)
        this.data.attacker.averageKills = Math.floor(this.data.attacker.averageDamage / this.data.defender.unit.stats.health)
      }
    },
    calculateDefenderDamage () {
      if (this.data.attacker.unit && this.data.defender.unit) {
        let minDamage = 0
        let maxDamage = 0

        let attackerDefense = this.data.attacker.unit.stats.defense + parseInt(this.data.attacker.hero.defense)
        let defenderAttack = this.data.defender.unit.stats.attack + parseInt(this.data.defender.hero.attack)

        // If DEFENDER attack > ATTACKER defense
        // Then base formula:
        // DEFENDER units count * DEFENDER unit damage * (1 + 0.05 * (DEFENDER attack - ATTACKER defense))

        // Else if DEFENDER attack < ATTACKER defense
        // Then base formula:
        // DEFENDER units count * DEFENDER unit damage * (1 - 0.025 * (ATTACKER defense - DEFENDER attack))
        if (defenderAttack > attackerDefense || defenderAttack === attackerDefense) {
          // Max attack cap = 3
          if (0.025 * (defenderAttack - attackerDefense) <= 3) {
            minDamage = this.data.defender.unitsCount * this.data.defender.unit.stats.minDamage * (1 + 0.05 * (defenderAttack - attackerDefense))
            maxDamage = this.data.defender.unitsCount * this.data.defender.unit.stats.maxDamage * (1 + 0.05 * (defenderAttack - attackerDefense))
          } else {
            minDamage = this.data.defender.unitsCount * this.data.defender.unit.stats.minDamage * (1 + 3)
            maxDamage = this.data.defender.unitsCount * this.data.defender.unit.stats.maxDamage * (1 + 3)
          }
        } else if (defenderAttack < attackerDefense) {
          // Max attack cap = 0.7
          if (0.025 * (attackerDefense - defenderAttack) <= 0.7) {
            minDamage = this.data.defender.unitsCount * this.data.defender.unit.stats.minDamage * (1 - 0.025 * (attackerDefense - defenderAttack))
            maxDamage = this.data.defender.unitsCount * this.data.defender.unit.stats.maxDamage * (1 - 0.025 * (attackerDefense - defenderAttack))
          } else {
            minDamage = this.data.defender.unitsCount * this.data.defender.unit.stats.minDamage * (1 - 0.7)
            maxDamage = this.data.defender.unitsCount * this.data.defender.unit.stats.maxDamage * (1 - 0.7)
          }
        }

        // Offense skill bonus
        if (this.data.defender.hero.skills.offenseLevel > 0) {
          minDamage += (minDamage / 10) * this.data.defender.hero.skills.offenseLevel
          maxDamage += (maxDamage / 10) * this.data.defender.hero.skills.offenseLevel
        }

        // Armorer skill bonus
        if (this.data.attacker.hero.skills.armorerLevel > 0) {
          minDamage -= (minDamage * 5 / 100) * this.data.attacker.hero.skills.armorerLevel
          maxDamage -= (maxDamage * 5 / 100) * this.data.attacker.hero.skills.armorerLevel
        }

        this.data.defender.minDamage = Math.floor(minDamage)
        this.data.defender.maxDamage = Math.floor(maxDamage)
        this.data.defender.averageDamage = Math.floor((this.data.defender.minDamage + this.data.defender.maxDamage) / 2)

        this.data.defender.minKills = Math.floor(this.data.defender.minDamage / this.data.attacker.unit.stats.health)
        this.data.defender.maxKills = Math.floor(this.data.defender.maxDamage / this.data.attacker.unit.stats.health)
        this.data.defender.averageKills = Math.floor(this.data.defender.averageDamage / this.data.attacker.unit.stats.health)
      }
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
  background-color: $a-light-green;
  color: black;
}
</style>
