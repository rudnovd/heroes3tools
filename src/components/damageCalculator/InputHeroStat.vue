<template>
  <div class="input-stat">
    <label class="stat-name">
      {{ t(`data.${stat}`) }}
    </label>
    <BaseInputNumber :min="0" :max="99" :value="value" :debounce="50" @input="$emit('input', $event)" />
  </div>
</template>

<script lang="ts">
import BaseInputNumber from '@/components/base/BaseInputNumber.vue'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'InputHeroStat',
  components: {
    BaseInputNumber,
  },
  props: {
    stat: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  emits: ['input'],
  setup() {
    const { t } = useI18n()

    return {
      t,
    }
  },
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
