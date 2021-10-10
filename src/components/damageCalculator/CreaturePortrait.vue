<template>
  <picture>
    <source :srcset="`${folder}/${creature.id}.webp`" type="image/webp" />
    <source :srcset="`${folder}/${creature.id}.gif`" type="image/gif" />
    <img
      :alt="creature.name"
      :title="creature.name"
      :width="width"
      :height="height"
      loading="lazy"
      @click="$emit('click', creature.id)"
    />
  </picture>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Creature, CreatureInstance } from '@/models/Creature'
import type { Hero } from '@/models/Hero'

export default defineComponent({
  name: 'CreaturePortrait',
  props: {
    // TODO: refactor prop name
    creature: {
      type: Object as () => Creature | Hero | CreatureInstance,
      required: true,
    },
    folder: {
      type: String,
      default: '',
      required: true,
    },
    width: {
      type: Number,
      default: 0,
      required: false,
    },
    height: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  emits: ['click'],
})
</script>
