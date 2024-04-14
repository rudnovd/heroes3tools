<template>
  <div class="select-skill-buttons">
    <div class="skill-name" :class="`color-${color}`">
      <span>{{ name }}</span>
    </div>
    <div class="skill-buttons" :class="`color-${color}`">
      <button
        v-for="level in levels"
        :key="level.id"
        class="skill-button"
        :data-umami-event="`damage calculator: select skill ${name}, level ${level.value}`"
        :class="{ active: selectedLevel === level.value }"
        @click="onClick(level.value)"
      >
        {{ level.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BattleSide } from '@/models/Battle'
import type { Level } from '@/models/Level'
import { ref, watch } from 'vue'

const props = defineProps<{
  color: BattleSide
  name: string
  levels: Array<Level>
  value: number
}>()
const emit = defineEmits<{ click: [level: number] }>()

const selectedLevel = ref(props.value)

watch(
  () => props.value,
  (newValue) => (selectedLevel.value = newValue),
)

const onClick = (level: number) => {
  if (level === selectedLevel.value) {
    selectedLevel.value = 0
  } else {
    selectedLevel.value = level
  }
  emit('click', selectedLevel.value)
}
</script>

<style lang="scss" scoped>
.select-skill-buttons {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
}

.skill-name {
  display: flex;
  align-items: center;
  height: 1.5rem;
  padding-left: 2px;
  font-size: 0.75rem;
  font-weight: 600;

  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.skill-buttons {
  display: grid;
  grid-template-columns: 1fr 1.25fr 1fr;
  width: 100%;
  height: 1.5rem;
}

.skill-button {
  min-width: 60px;
  height: 100%;
  overflow: hidden;
  font-size: 0.75rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: transparent;
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
}

@each $color, $color-value in $calculator-colors {
  .skill-buttons.color-#{$color} {
    color: var(--color-text);
    border-top: 1px solid $color-value;
    border-bottom: 1px solid $color-value;

    .skill-button:hover,
    .skill-button.active {
      color: map.get($calculator-colors-text, $color);
      background-color: $color-value;
    }

    .skill-button:nth-last-child(1) {
      border-right: 1px solid $color-value;
    }
  }

  .skill-name.color-#{$color} {
    color: map.get($calculator-colors-text, $color);
    background-color: $color-value;
  }
}
</style>
