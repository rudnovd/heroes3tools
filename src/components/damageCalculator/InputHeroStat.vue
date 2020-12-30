<template>
  <div class="input-stat">
    <span class="stat-name">
      {{ $t(`heroes.stats.${stat}`) }}
    </span>
    <BaseInputNumber :min="0" :max="99" :value="value" @input="$emit('input')" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseInputNumber from '@/components/base/BaseInputNumber.vue'

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
  data() {
    return {
      previousValue: 0,
    }
  },
  methods: {
    onInput(event: any): void {
      if (event.target.value < 0 || event.target.value > 99) {
        event.target.value = this.previousValue
      } else {
        event.target.value = parseInt(event.target.value)
        this.previousValue = event.target.value
      }
      this.$emit('input', parseInt(event.target.value))
    },
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
