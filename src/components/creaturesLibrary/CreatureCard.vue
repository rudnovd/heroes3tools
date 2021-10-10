<template>
  <div class="creature-card" @click="$emit('click', creatureData)">
    <div class="creature-image">
      <img :src="imagePath" :alt="creatureData.name[$i18n.locale]" />
    </div>

    <div class="creature-info">
      <div class="parameter">
        <span>Name:</span>
        <span>{{ creatureData.name[$i18n.locale] }}</span>
      </div>

      <div class="parameter">
        <span>Attack:</span>
        <span>{{ creatureData.attack }}</span>
      </div>

      <div class="parameter">
        <span>Defense:</span>
        <span>{{ creatureData.defense }}</span>
      </div>

      <div class="parameter">
        <span>Damage:</span>
        <span>{{ creatureData.minDamage }} — {{ creatureData.maxDamage }}</span>
      </div>

      <div class="parameter">
        <span>Health:</span>
        <span>{{ creatureData.health }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CreatureCard',
  props: {
    imagePath: {
      type: String,
      default: '',
      required: false,
    },
    creatureData: {
      type: Object,
      default() {
        return {}
      },
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
.creature-card {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid black;
  border-right: 1px solid black;

  &:hover {
    background: rgb(245, 245, 245);
  }

  .creature-image {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex: 0 0 20%;

    @include media-small {
      flex: 0 0 40%;
    }

    @include media-medium {
      flex: 0 0 30%;
    }

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

    img {
      position: relative;
      filter: drop-shadow(2px 4px 6px white);
    }
  }

  .creature-info {
    padding: 5px;
    display: flex;
    flex-direction: column;
    flex: 0 0 70%;
  }

  .parameter {
    display: flex;
    padding-left: 0.3rem;
    margin-bottom: 1px solid rgb(222, 226, 230);

    span:first-child {
      flex: 0 0 20%;
    }

    span:last-child {
      flex: 0 0 80%;
    }
  }
}

.creature-card.selected {
  box-shadow: 0 0 5px rgb(170, 170, 170);

  .creature-info {
    background: rgb(235, 235, 235);
  }
}
</style>
