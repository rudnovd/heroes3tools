<template>
  <div :id="creature.name" class="creature-card" @click="$emit('click', creature)">
    <div class="creature-image">
      <ObjectPortrait :object="creature" folder="/images/creatures/models" />
    </div>

    <div class="creature-info">
      <div class="creature-name">{{ creature.name }}</div>

      <div v-for="parameter in ['attack', 'defense', 'health', 'speed']" :key="parameter" class="parameter">
        <span>{{ parameter }}:</span>
        <span>{{ creature[parameter] }}</span>
      </div>

      <div class="parameter">
        <span>Damage:</span>
        <span v-if="creature.minDamage !== creature.maxDamage">
          {{ creature.minDamage }} — {{ creature.maxDamage }}
        </span>
        <span v-else>{{ creature.maxDamage }}</span>
      </div>

      <div class="parameter">
        <span>ai value</span>
        <span>{{ creature.aiValue }}</span>
      </div>

      <div class="parameter">
        <span>cost:</span>
        <div class="paramater-with-resources">
          <div v-for="(value, key) in creature.cost" :key="key">
            <ObjectPortrait height="18px" :object="{ id: key, name: key }" folder="/images/resources" />
            <span>{{ value }}</span>
          </div>
        </div>
      </div>

      <div class="parameter">
        <span>growth:</span>
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
import { defineComponent } from 'vue'
import ObjectPortrait from '../ObjectPortrait.vue'

export default defineComponent({
  name: 'CreatureCard',
  components: { ObjectPortrait },
  props: {
    creature: {
      type: Object as () => Creature,
      required: true,
    },
  },
  emits: ['click'],
})
</script>

<style lang="scss" scoped>
.creature-card {
  display: grid;
  grid-template-columns: 1fr 2fr;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  transition: background 0.25s;

  @include media-large {
    grid-template-columns: 1fr 3fr;
  }

  &:hover {
    background: rgb(245, 245, 245);
  }
}

.creature-image {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/images/pages/home/links-background.webp');
    filter: brightness(110%);
  }

  picture {
    filter: drop-shadow(1px 1px 1px rgba(255, 255, 255, 0.3));
  }
}

.creature-name {
  text-align: center;
  border-bottom: 1px solid rgb(222, 226, 230);
  grid-column: 1 / -1;
}

.creature-info {
  display: grid;
  grid-template-columns: 100%;

  @include media-medium {
    grid-template-columns: 1fr 1fr;
  }
}

.parameter {
  display: grid;
  padding-left: 4px;
  align-items: center;
  grid-template-columns: 2fr 4fr;
  border-bottom: 1px solid rgb(222, 226, 230);

  span:first-child {
    text-transform: capitalize;
  }

  &:nth-child(even) {
    border-right: 1px solid rgb(222, 226, 230);
  }

  &:last-child,
  &:nth-last-child(-n + 2) {
    border-bottom: none;
  }

  @include media-small {
    grid-template-columns: 1fr 4fr;
    &:nth-last-child(-n + 2) {
      border-bottom: 1px solid rgb(222, 226, 230);
    }
  }

  @include media-medium {
    grid-template-columns: max(25%, 80px) 1fr;
  }
}

.creature-description {
  padding-left: 4px;
  grid-column: 1 / -1;
}

.creature-card.selected {
  box-shadow: 0 0 5px rgb(170, 170, 170);

  .creature-info {
    background: rgb(235, 235, 235);
  }
}

.paramater-with-resources {
  display: flex;
  grid-gap: 8px;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    grid-gap: 4px;
  }

  picture {
    display: flex;
  }
}
</style>
