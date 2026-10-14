<template>
  <div :id="creature.name.replaceAll(' ', '')" class="creature-card">
    <div class="creature-image">
      <img :src="`/images/creatures/models/${creature.id}.webp`" :alt="creature.name" draggable="false">
    </div>
    <div class="creature-info">
      <div class="creature-name">
        {{ creature.name }}
      </div>
      <div v-for="parameter of parameters" :key="parameter" class="parameter">
        <span>{{ $t(`data.${parameter}`) }}:</span>
        <span>{{ creature[parameter] }}</span>
      </div>
      <div class="parameter">
        <span>{{ $t('data.damage') }}:</span>
        <span v-if="creature.minDamage !== creature.maxDamage">
          {{ creature.minDamage }} — {{ creature.maxDamage }}
        </span>
        <span v-else>{{ creature.maxDamage }}</span>
      </div>
      <div class="parameter">
        <span>{{ $t('data.aiValue') }}:</span>
        <span>{{ creature.aiValue }}</span>
      </div>
      <div class="parameter">
        <span>{{ $t('data.cost') }}:</span>
        <div class="paramater-with-resources">
          <div v-for="(value, key) in creature.cost" :key="key">
            <img height="18px" :src="`/images/resources/${key}.webp`" :alt="key">
            <span>{{ value }}</span>
          </div>
        </div>
      </div>
      <div class="parameter">
        <span>{{ $t('data.growth') }}:</span>
        <span>{{ creature.growth }}</span>
      </div>
      <div v-if="creature.description" class="creature-description">
        {{ creature.description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Creature } from '@/models/Creature'

defineProps<{ creature: Creature }>()

type CreatureParameter = 'attack' | 'defense' | 'health' | 'speed'
const parameters: Array<CreatureParameter> = ['attack', 'defense', 'health', 'speed']
</script>

<style>
.creature-card {
  display: grid;
  grid-template-columns: 105px 1fr;
  gap: 4px;
  background: var(--color-bg-deep);
  border: 1px solid var(--color-text);
  @media screen and (width >= 768px) {
    grid-template-columns: 150px 1fr;
  }
  .creature-image {
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('/images/pages/home/links-background.webp');
  }
  .creature-name {
    grid-column: 1 / -1;
    text-align: center;
    border-bottom: 1px solid var(--color-border);
    transition: border-bottom 0.2s linear;
  }
  .creature-info {
    display: grid;
    grid-template-rows: repeat(5, minmax(30px, auto)) 1fr;
    grid-template-columns: 100%;
    @media screen and (width >= 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .parameter {
    display: grid;
    grid-template-columns: minmax(120px, 2fr) 4fr;
    align-items: center;
    border-bottom: 1px solid var(--color-border);
    transition:
      border-bottom 0.2s linear,
      border-right 0.2s linear;
    &:last-child {
      border-bottom: none;
    }
    span:first-child {
      text-transform: capitalize;
    }
    @media screen and (width >= 576px) {
      grid-template-columns: 2fr 4fr;
      &:nth-last-child(-n + 2) {
        border-bottom: 1px solid var(--color-border);
      }
    }
    @media screen and (width >= 768px) {
      grid-template-columns: 125px 1fr;
      &:nth-child(even) {
        border-right: 1px solid var(--color-border);
      }
    }
  }
  .creature-description {
    grid-column: 1 / -1;
    padding-left: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .paramater-with-resources {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    div {
      display: flex;
      gap: 4px;
      align-items: center;
    }
    picture {
      display: flex;
    }
  }
}
</style>
