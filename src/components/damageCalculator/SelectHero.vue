<template>
  <div @mouseover.once="isOptionsLoaded = true">
    <Multiselect
      v-model="selectedHero"
      select-label=""
      deselect-label=""
      :placeholder="$t('damageCalculator.components.selectHero.selectHero')"
      :value="selectedHero"
      :options="heroes"
      :searchable="true"
      :hide-selected="true"
      :allow-empty="false"
      :clear-on-select="false"
      :max-height="480"
      @select="onSelect"
    >
      <template #singleLabel="{ option }">
        <div v-if="Object.entries(selectedHero).length === 0">
          {{ $t('damageCalculator.components.selectHero.selectHero') }}
        </div>

        <div v-else class="selected">
          <CreaturePortrait :creature="selectedHero" folder="/images/heroes/portraits/small" :width="46" :height="30" />
          <span>{{ option.name }}</span>
        </div>
      </template>

      <template v-if="isOptionsLoaded" #option="{ option }">
        <div class="option">
          <CreaturePortrait :creature="option" folder="/images/heroes/portraits/small" :width="46" :height="30" />
          <span>{{ option.name }}</span>
        </div>
      </template>
    </Multiselect>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import Multiselect from 'vue-multiselect'

import { Hero } from '@/models/Hero'

export default defineComponent({
  name: 'SelectHero',
  components: {
    Multiselect,
    CreaturePortrait: defineAsyncComponent(() => import('@/components/damageCalculator/CreaturePortrait.vue')),
  },
  props: {
    heroes: {
      type: Array as () => Array<Hero>,
      default() {
        return []
      },
      required: false,
    },
  },
  data() {
    return {
      selectedHero: {} as Hero,
      isOptionsLoaded: false,
    }
  },
  methods: {
    onSelect(value: Hero) {
      // const selectedHero = this.$props.heroes.find((hero: Hero) => hero.id === value.id)
      // this.selectedHero = selectedHero!
      // this.$emit('select', this.selectedHero)
    },
  },
})
</script>

<style lang="scss">
@import '~@/styles/multiselect';
</style>

<style lang="scss" scoped>
.selected,
.option {
  display: flex;
  align-items: center;
}

.multiselect img {
  cursor: pointer;
  margin-right: 10px;
}
</style>
