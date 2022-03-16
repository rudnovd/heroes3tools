<template>
  <div class="select-skill-buttons">
    <span class="skill-name">{{ name }}</span>
    <div class="skill-buttons" :class="`color-${color}`">
      <button
        v-for="level in levels"
        :key="level.id"
        class="skill-button"
        :class="{ active: selectedLevel === level.value }"
        @click="onClick(level.value)"
      >
        {{ level.name }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { BattleSide } from '@/models/Battle'
import type { Level } from '@/models/Level'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'SelectSkillButtons',
  props: {
    color: {
      type: String as PropType<BattleSide>,
      required: true,
    },
    name: {
      type: String,
      default: '',
      required: true,
    },
    levels: {
      type: Array as PropType<Array<Level>>,
      required: true,
    },
  },
  emits: ['click'],
  setup(props, context) {
    const selectedLevel = ref(0)

    const onClick = (level: number) => {
      if (level === selectedLevel.value) {
        selectedLevel.value = 0
      } else {
        selectedLevel.value = level
      }
      context.emit('click', selectedLevel.value)
    }

    return {
      selectedLevel,
      onClick,
    }
  },
})
</script>

<style lang="scss" scoped>
.select-skill-buttons {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 0.25rem;
  align-items: center;
}

.skill-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  font-size: 0.8rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
}

@each $color, $color-value in $calculator-colors {
  .skill-buttons.color-#{$color} {
    color: map.get($calculator-colors-text, $color);
    border-top: 1px solid $color-value;
    border-bottom: 1px solid $color-value;

    .skill-button:hover,
    .skill-button.active {
      background-color: $color-value;
    }

    .skill-button:nth-child(1) {
      border-left: 1px solid $color-value;
    }

    .skill-button:nth-last-child(1) {
      border-right: 1px solid $color-value;
    }
  }
}
</style>
