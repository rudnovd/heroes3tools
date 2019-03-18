<template lang='pug'>
b-row
  b-col(cols='4' sm='4' md='4' lg='3' xl='3')
    b-form-group
      template(v-if='$i18n.locale === "en"')
        b-form-checkbox-group(v-model='effects' :options='attackBuffs_en')
      template(v-if='$i18n.locale === "ru"')
        b-form-checkbox-group(v-model='effects' :options='attackBuffs_ru')

  b-col(cols='4' sm='4' md='4' lg='3' xl='3')
    b-form-group
      template(v-if='$i18n.locale === "en"')
        b-form-checkbox-group(v-model='effects' :options='defenseBuffs_en')
      template(v-if='$i18n.locale === "ru"')
        b-form-checkbox-group(v-model='effects' :options='defenseBuffs_ru')

  b-col(cols='4' sm='4' md='4' lg='3' xl='3')
    b-form-group
      template(v-if='$i18n.locale === "en"')
        b-form-checkbox-group(v-model='effects' :options='attackDebuffs_en')
      template(v-if='$i18n.locale === "ru"')
        b-form-checkbox-group(v-model='effects' :options='attackDebuffs_ru')
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'selectUnitEffects',
  props: {
    side: String
  },
  computed: {
    effects: {
      get () {
        if (this.side === 'attacker') {
          return this.$store.state.calculator.attacker.unit.effects
        } else if (this.side === 'defender') {
          return this.$store.state.calculator.defender.unit.effects
        } else {
          return null
        }
      },
      set (value) {
        if (this.$store.state.calculator[this.side].unit.effects !== value) {
          this.setUnitEffect({
            side: this.side,
            effects: value
          })
        }
      }
    }
  },
  data () {
    return {
      attackBuffs_en: ['Bless', 'Bloodlust', 'Frenzy', 'Prayer', 'Precision', 'Slayer'],
      defenseBuffs_en: ['Shield', 'Stone Skin', 'Air Shield'],
      attackDebuffs_en: ['Curse', 'Weakness', 'Disrupting Ray'],

      attackBuffs_ru: ['Благословение', 'Жажда крови', 'Бешенство', 'Молитва', 'Точность', 'Палач'],
      defenseBuffs_ru: ['Щит', 'Каменная кожа', 'Воздушный щит'],
      attackDebuffs_ru: ['Проклятье', 'Слабость', 'Разрушающий луч']
    }
  },
  methods: {
    ...mapActions({
      setUnitEffect: 'calculator/setUnitEffect'
    })
  }
}
</script>
