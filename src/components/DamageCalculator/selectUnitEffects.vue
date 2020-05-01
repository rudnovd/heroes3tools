<template lang='pug'>
b-row

  //- Attack buffs
  b-col(cols='6' sm='6' md='4' lg='4' xl='4')
    b-form-group
      template(v-if='$i18n.locale === "en"')
        b-form-checkbox-group(stacked v-model='effects' :options='attackBuffs_en' cypress-tag='unit-buffs-attack')
      template(v-if='$i18n.locale === "ru"')
        b-form-checkbox-group(stacked v-model='effects' :options='attackBuffs_ru' cypress-tag='unit-buffs-attack')

  //- Defense buffs
  b-col(cols='6' sm='6' md='4' lg='4' xl='4')
    b-form-group
      template(v-if='$i18n.locale === "en"')
        b-form-checkbox-group(stacked v-model='effects' :options='defenseBuffs_en' cypress-tag='unit-buffs-defense')
      template(v-if='$i18n.locale === "ru"')
        b-form-checkbox-group(stacked v-model='effects' :options='defenseBuffs_ru' cypress-tag='unit-buffs-defense')

  //- Attack debuffs
  b-col(class='mt-2 mt-sm-2 mt-md-0 mt-lg-0 mt-xl-0' cols='6' sm='6' md='4' lg='4' xl='4')
    b-form-group
      template(v-if='$i18n.locale === "en"')
        b-form-checkbox-group(stacked v-model='effects' :options='attackDebuffs_en' cypress-tag='unit-debuffs-attack')
      template(v-if='$i18n.locale === "ru"')
        b-form-checkbox-group(stacked v-model='effects' :options='attackDebuffs_ru' cypress-tag='unit-debuffs-attack')
</template>

<script>
import { mapActions } from 'vuex'

export default {
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
      attackBuffs_en: [
        { text: 'Bless', value: 'Bless' },
        { text: 'Bloodlust', value: 'Bloodlust' },
        { text: 'Frenzy', value: 'Frenzy' },
        { text: 'Prayer', value: 'Prayer' },
        { text: 'Precision', value: 'Precision' },
        { text: 'Slayer', value: 'Slayer' }
      ],
      defenseBuffs_en: [
        { text: 'Shield', value: 'Shield' },
        { text: 'Stone Skin', value: 'Stone Skin' },
        { text: 'Air Shield', value: 'Air Shield' }
      ],
      attackDebuffs_en: [
        { text: 'Curse', value: 'Curse' },
        { text: 'Weakness', value: 'Weakness' },
        { text: 'Disrupting Ray', value: 'Disrupting Ray' }
      ],

      attackBuffs_ru: [
        { text: 'Благословение', value: 'Bless' },
        { text: 'Жажда крови', value: 'Bloodlust' },
        { text: 'Бешенство', value: 'Frenzy' },
        { text: 'Молитва', value: 'Prayer' },
        { text: 'Точность', value: 'Precision' },
        { text: 'Палач', value: 'Slayer' }
      ],
      defenseBuffs_ru: [
        { text: 'Щит', value: 'Shield' },
        { text: 'Каменная кожа', value: 'Stone Skin' },
        { text: 'Воздушный щит', value: 'Air Shield' }
      ],
      attackDebuffs_ru: [
        { text: 'Проклятье', value: 'Curse' },
        { text: 'Слабость', value: 'Weakness' },
        { text: 'Разрушающий луч', value: 'Disrupting Ray' }
      ]
    }
  },
  methods: {
    ...mapActions({
      setUnitEffect: 'calculator/setUnitEffect'
    })
  }
}
</script>
