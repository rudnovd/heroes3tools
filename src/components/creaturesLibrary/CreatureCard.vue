<template>
  <div :id="creature.name" class="creature-card" @click="$emit('click', creature)">
    <div class="creature-image">
      <ObjectPortrait :file="{ name: creature.id, alt: creature.name }" folder="/images/creatures/models" />
    </div>

    <div class="creature-info">
      <div class="creature-name">{{ creature.name }}</div>

      <div v-for="parameter in ['attack', 'defense', 'health', 'speed']" :key="parameter" class="parameter">
        <span>{{ t(`data.${parameter}`) }}:</span>
        <span>{{ creature[parameter] }}</span>
      </div>

      <div class="parameter">
        <span>{{ t('data.damage') }}:</span>
        <span v-if="creature.minDamage !== creature.maxDamage">
          {{ creature.minDamage }} — {{ creature.maxDamage }}
        </span>
        <span v-else>{{ creature.maxDamage }}</span>
      </div>

      <div class="parameter">
        <span>{{ t('data.aiValue') }}:</span>
        <span>{{ creature.aiValue }}</span>
      </div>

      <div class="parameter">
        <span>{{ t('data.cost') }}:</span>
        <div class="paramater-with-resources">
          <div v-for="(value, key) in creature.cost" :key="key">
            <ObjectPortrait height="18px" :file="{ name: key, alt: key }" folder="/images/resources" />
            <span>{{ value }}</span>
          </div>
        </div>
      </div>

      <div class="parameter">
        <span>{{ t('data.growth') }}:</span>
        <span>{{ creature.growth }}</span>
      </div>

      <div v-if="creature.description" class="creature-description">
        {{ creature.description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Creature } from '@/models/Creature'
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import ObjectPortrait from '../ObjectPortrait.vue'

export default defineComponent({
  name: 'CreatureCard',
  components: { ObjectPortrait },
  props: {
    creature: {
      type: Object as PropType<Creature>,
      required: true,
    },
  },
  emits: ['click'],
  setup() {
    const { t } = useI18n()

    return {
      t,
    }
  },
})
</script>

<style lang="scss" scoped>
.creature-card {
  display: grid;
  grid-template-columns: 105px 1fr;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  transition: background 0.25s;

  @include media-medium {
    grid-template-columns: 150px 1fr;
  }

  &:hover {
    background: rgb(245, 245, 245);
  }
}

.creature-image {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background: url('/images/pages/home/links-background.webp');
    filter: brightness(110%);
  }

  picture {
    filter: drop-shadow(1px 1px 1px rgba(255, 255, 255, 0.3));
  }
}

.creature-name {
  grid-column: 1 / -1;
  text-align: center;
  border-bottom: 1px solid rgb(222, 226, 230);
}

.creature-info {
  display: grid;
  grid-template-rows: repeat(5, minmax(30px, auto)) 1fr;
  grid-template-columns: 100%;

  @include media-medium {
    grid-template-columns: 1fr 1fr;
  }
}

.parameter {
  display: grid;
  grid-template-columns: minmax(120px, 2fr) 4fr;
  align-items: center;
  padding-left: 4px;
  border-bottom: 1px solid rgb(222, 226, 230);

  &:last-child {
    border-bottom: none;
  }

  span:first-child {
    text-transform: capitalize;
  }

  @include media-small {
    grid-template-columns: 2fr 4fr;
    &:nth-last-child(-n + 2) {
      border-bottom: 1px solid rgb(222, 226, 230);
    }
  }

  @include media-medium {
    grid-template-columns: 125px 1fr;

    &:nth-child(even) {
      border-right: 1px solid rgb(222, 226, 230);
    }
  }
}

.creature-description {
  grid-column: 1 / -1;
  padding-left: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.creature-card.selected {
  box-shadow: 0 0 5px rgb(170, 170, 170);

  .creature-info {
    background: rgb(235, 235, 235);
  }
}

.paramater-with-resources {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 8px;
  align-items: center;

  div {
    display: flex;
    grid-gap: 4px;
    align-items: center;
  }

  picture {
    display: flex;
  }
}
</style>
