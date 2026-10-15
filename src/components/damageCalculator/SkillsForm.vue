<template>
  <fieldset class="skills-form" :class="`color-${color}`">
    <legend class="skill-name">
      <span>{{ name }}</span>
    </legend>
    <ul class="skills-form__list">
      <li v-for="level in levels" :key="level.id" class="skills-form__list-item" :class="{ active: level.value === model }">
        <input
          :id="`${id}-${name}-${level.id}`"
          type="checkbox"
          :name="`${id}-${name}`"
          :value="level.value"
          @change="changeLevel"
        >
        <label :for="`${id}-${name}-${level.id}`">{{ level.name }}</label>
      </li>
    </ul>
  </fieldset>
</template>

<script setup lang="ts">
import type { BattleSide } from '@/models/Battle'
import type { Level } from '@/models/Level'
import type { SkillLevel } from '@/models/Skill'
import { useId } from 'vue'

defineProps<{
  color: BattleSide
  name: string
  levels: Array<Level>
}>()
const model = defineModel<number>()
if (!model.value) {
  model.value = 0
}
const id = useId()

function changeLevel(event: Event) {
  const target = event.target as HTMLInputElement
  const level = Number(target.value) as SkillLevel
  if (level === model.value) {
    model.value = 0
  }
  else {
    model.value = level
  }
}
</script>

<style>
.skills-form {
  .skill-name {
    padding-inline: 0.25rem;
  }
  .skills-form__list {
    display: grid;
    grid-template-columns: 1fr 1.25fr 1fr;
    .skills-form__list-item {
      display: flex;
      text-align: center;
      input {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -0.0625rem;
        overflow: hidden;
        white-space: nowrap;
        border: 0;
        clip-path: inset(50%);
      }
      label {
        width: 100%;
        cursor: pointer;
      }
    }
  }
  &.color-attacker {
    .skill-name {
      background: var(--color-attacker);
    }
    .skills-form__list {
      border: 1px solid var(--color-attacker);
      .skills-form__list-item {
        &:has(input:focus-visible),
        &:hover,
        &.active {
          color: var(--color-attacker-text);
          background-color: var(--color-attacker-hover);
          border-color: var(--color-attacker-hover);
        }
        &.active {
          background-color: var(--color-attacker);
        }
        &:nth-child(2n) {
          border-right: 1px solid var(--color-attacker);
          border-left: 1px solid var(--color-attacker);
        }
      }
    }
  }
  &.color-defender {
    .skill-name {
      background: var(--color-defender);
    }
    .skills-form__list {
      border: 1px solid var(--color-defender);
      .skills-form__list-item {
        &:has(input:focus-visible),
        &:hover,
        &.active {
          color: var(--color-defender-text);
          background-color: var(--color-defender-hover);
          border-color: var(--color-defender-hover);
        }
        &.active {
          background-color: var(--color-defender);
        }
        &:nth-child(2n) {
          border-right: 1px solid var(--color-defender);
          border-left: 1px solid var(--color-defender);
        }
      }
    }
  }
}
</style>
