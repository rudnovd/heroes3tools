<template>
  <label class="checkbox-label" :class="{ disabled }">
    <input
      class="checkbox-input"
      type="checkbox"
      :value="modelValue"
      :checked="modelValue"
      :disabled="disabled"
      @change="$emit('update:modelValue', !modelValue)"
    />
    <svg class="checkbox-box" viewBox="0 0 20 20">
      <defs>
        <radialGradient id="background-gradient">
          <stop offset="10%" stop-color="gold" />
          <stop offset="95%" stop-color="red" />
        </radialGradient>
      </defs>

      <rect class="checkbox-focus" x="0.5" y="0.5" width="19" height="19" rx="4" />
      <rect class="checkbox-square" x="3" y="3" width="14" height="14" rx="2" />
      <polyline class="checkbox-mark" points="5 9 9 13 15 6" />
    </svg>
    {{ label }}
  </label>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  disabled?: boolean
  modelValue: boolean
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean)
}>()
</script>

<style lang="scss" scoped>
.checkbox-label {
  display: block;
  width: fit-content;
  padding-left: 1.2em;
  margin-bottom: 0.5em;
  user-select: none;

  &.disabled {
    opacity: 0.5;
  }
}

.checkbox-input {
  position: absolute;
  appearance: none;
}

.checkbox-box {
  position: absolute;
  width: 1.4em;
  height: 1.4em;
  margin-left: -1.6em;
}

.checkbox-focus {
  fill: none;
}

.checkbox-square {
  opacity: 0.25;
  fill: url('#background-gradient');
  stroke: var(--color-text);
  stroke-width: 1px;
}

.checkbox-mark {
  fill: none;
  stroke-width: 2px;
}

.checkbox-input:disabled + * .checkbox-square {
  fill: rgb(234, 234, 234);
  stroke: rgb(155, 155, 155);
}

.checkbox-input:checked:disabled + * .checkbox-square {
  fill: url('#background-gradient');
}

.checkbox-input:checked + * .checkbox-mark {
  stroke: rgb(255, 234, 141);
}
</style>
