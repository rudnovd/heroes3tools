<template>
  <div class="input-stat">
    <label class="stat-name">
      {{ t(`heroes.stats.${stat}`) }}
    </label>
    <BaseInputNumber :min="0" :max="99" :value="value" @input="$emit('input', $event)" :debounce="100" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BaseInputNumber from '@/components/base/BaseInputNumber.vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'InputHeroStat',
  components: {
    BaseInputNumber,
  },
  props: {
    stat: {
      type: String,
      default: '',
      required: true,
    },
    value: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  emits: ['input'],
  setup() {
    const { t } = useI18n()

    return {
      t,
    }
  }
})
</script>

<style lang="scss" scoped>
.stat-name {
  display: block;
  margin-bottom: 10px;
}

.stat-input {
  min-width: 3.75rem;
}
</style>
