<template lang='pug'>
b-row

  //- Offense
  b-col(class='mt-2 text-truncate pr-0' cols='4' sm='2' md='2' lg='3' xl='2')
    label.mt-1 {{ $t('offense') }}
  b-col(class='mt-2 pl-0' cols='8' sm='3' md='3' lg='3' xl='3')
    b-form-select(v-if='$store.state.user.locale === "en"' v-model='offense' :options='options_en' size='sm' cypress-tag='skill-offense')
    b-form-select(v-if='$store.state.user.locale === "ru"' v-model='offense' :options='options_ru' size='sm' cypress-tag='skill-offense')

  //- Air
  b-col(class='mt-2 text-sm-right text-md-right text-lg-right text-xl-right' cols='4' sm='2' md='2' lg='2' xl='2' offset='0' offset-sm='2' offset-md='2' offset-lg='1' offset-xl='2')
    label.mt-1 {{ $t('air') }}
  b-col(class='mt-2 pl-0' cols='8' sm='3' md='3' lg='3' xl='3')
    b-form-select(v-if='$store.state.user.locale === "en"' v-model='air' :options='options_en' size='sm' cypress-tag='skill-air')
    b-form-select(v-if='$store.state.user.locale === "ru"' v-model='air' :options='options_ru' size='sm' cypress-tag='skill-air')

  //- Armorer
  b-col(class='mt-2' cols='4' sm='2' md='2' lg='3' xl='2')
    label.mt-1 {{ $t('armorer') }}
  b-col(class='mt-2 pl-0' cols='8' sm='3' md='3' lg='3' xl='3')
    b-form-select(v-if='$store.state.user.locale === "en"' v-model='armorer' :options='options_en' size='sm' cypress-tag='skill-armorer')
    b-form-select(v-if='$store.state.user.locale === "ru"' v-model='armorer' :options='options_ru' size='sm' cypress-tag='skill-armorer')

  //- Fire
  b-col(class='mt-2 text-sm-right text-md-right text-lg-right text-xl-right' cols='4' sm='2' md='2' lg='2' xl='2' offset='0' offset-sm='2' offset-md='2' offset-lg='1' offset-xl='2')
    label.mt-1 {{ $t('fire') }}
  b-col(class='mt-2 pl-0' cols='8' sm='3' md='3' lg='3' xl='3')
    b-form-select(v-if='$store.state.user.locale === "en"' v-model='fire' :options='options_en' size='sm' cypress-tag='skill-fire')
    b-form-select(v-if='$store.state.user.locale === "ru"' v-model='fire' :options='options_ru' size='sm' cypress-tag='skill-fire')

  //- Archery
  b-col(class='mt-2' cols='4' sm='2' md='2' lg='3' xl='2')
    label.mt-1 {{ $t('archery') }}
  b-col(class='mt-2 pl-0' cols='8' sm='3' md='3' lg='3' xl='3')
    b-form-select(v-if='$store.state.user.locale === "en"' v-model='archery' :options='options_en' size='sm' cypress-tag='skill-archery')
    b-form-select(v-if='$store.state.user.locale === "ru"' v-model='archery' :options='options_ru' size='sm' cypress-tag='skill-archery')

  //- Earth
  b-col(class='mt-2 text-sm-right text-md-right text-lg-right text-xl-right' cols='4' sm='2' md='2' lg='2' xl='2' offset='0' offset-sm='2' offset-md='2' offset-lg='1' offset-xl='2')
    label.mt-1 {{ $t('earth') }}
  b-col(class='mt-2 pl-0' cols='8' sm='3' md='3' lg='3' xl='3')
    b-form-select(v-if='$store.state.user.locale === "en"' v-model='earth' :options='options_en' size='sm' cypress-tag='skill-earth')
    b-form-select(v-if='$store.state.user.locale === "ru"' v-model='earth' :options='options_ru' size='sm' cypress-tag='skill-earth')

  //- Artillery
  b-col(class='mt-2 text-truncate pr-0' cols='4' sm='2' md='2' lg='3' xl='2')
    label.mt-1 {{ $t('artillery') }}
  b-col(class='mt-2 pl-0' cols='8' sm='3' md='3' lg='3' xl='3')
    b-form-select(v-if='$store.state.user.locale === "en"' v-model='artillery' :options='options_en' size='sm' cypress-tag='skill-artillery')
    b-form-select(v-if='$store.state.user.locale === "ru"' v-model='artillery' :options='options_ru' size='sm' cypress-tag='skill-artillery')

  //- Water
  b-col(class='mt-2 text-sm-right text-md-right text-lg-right text-xl-right' cols='4' sm='2' md='2' lg='2' xl='2' offset='0' offset-sm='2' offset-md='2' offset-lg='1' offset-xl='2')
    label.mt-1 {{ $t('water') }}
  b-col(class='mt-2 pl-0' cols='8' sm='3' md='3' lg='3' xl='3')
    b-form-select(v-if='$store.state.user.locale === "en"' v-model='water' :options='options_en' size='sm' cypress-tag='skill-water')
    b-form-select(v-if='$store.state.user.locale === "ru"' v-model='water' :options='options_ru' size='sm' cypress-tag='skill-water')
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'selectHeroSkills',
  props: {
    side: String
  },
  data () {
    return {
      options_en: [
        { text: 'None', value: 0 },
        { text: 'Basic', value: 1 },
        { text: 'Advanced', value: 2 },
        { text: 'Expert', value: 3 }
      ],
      options_ru: [
        { text: 'Нет', value: 0 },
        { text: 'Базовый', value: 1 },
        { text: 'Продвинутый', value: 2 },
        { text: 'Эксперт', value: 3 }
      ]
    }
  },
  computed: {
    offense: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.hero.offense
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.hero.offense
        } else {
          return null
        }
      },
      set (value) {
        this.setHeroSkill({
          side: this.side,
          skill: 'offense',
          level: value
        })
      }
    },
    armorer: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.hero.armorer
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.hero.armorer
        } else {
          return null
        }
      },
      set (value) {
        this.setHeroSkill({
          side: this.side,
          skill: 'armorer',
          level: value
        })
      }
    },
    archery: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.hero.archery
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.hero.archery
        } else {
          return null
        }
      },
      set (value) {
        this.setHeroSkill({
          side: this.side,
          skill: 'archery',
          level: value
        })
      }
    },
    artillery: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.hero.artillery
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.hero.artillery
        } else {
          return null
        }
      },
      set (value) {
        this.setHeroSkill({
          side: this.side,
          skill: 'artillery',
          level: value
        })
      }
    },
    air: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.hero.air
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.hero.air
        } else {
          return null
        }
      },
      set (value) {
        this.setHeroSkill({
          side: this.side,
          skill: 'air',
          level: value
        })
      }
    },
    fire: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.hero.fire
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.hero.fire
        } else {
          return null
        }
      },
      set (value) {
        this.setHeroSkill({
          side: this.side,
          skill: 'fire',
          level: value
        })
      }
    },
    earth: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.hero.earth
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.hero.earth
        } else {
          return null
        }
      },
      set (value) {
        this.setHeroSkill({
          side: this.side,
          skill: 'earth',
          level: value
        })
      }
    },
    water: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.hero.water
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.hero.water
        } else {
          return null
        }
      },
      set (value) {
        this.setHeroSkill({
          side: this.side,
          skill: 'water',
          level: value
        })
      }
    }
  },
  methods: {
    ...mapActions({
      setHeroSkill: 'calculator/setHeroSkill'
    })
  }
}
</script>

<i18n>
{
  "en": {
    "offense": "Offense",
    "air": "Air",
    "armorer": "Armorer",
    "fire": "Fire",
    "archery": "Archery",
    "earth": "Earth",
    "artillery": "Artillery",
    "water": "Water"
  },
  "ru": {
    "offense": "Нападение",
    "air": "Воздух",
    "armorer": "Доспехи",
    "fire": "Огонь",
    "archery": "Стрельба",
    "earth": "Земля",
    "artillery": "Артиллерия",
    "water": "Вода"
  }
}
</i18n>
