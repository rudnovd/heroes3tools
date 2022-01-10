<template>
  <picture>
    <source :srcset="`${folder}/${object.id}.webp`" type="image/webp" />
    <source :srcset="`${folder}/${object.id}.gif`" type="image/gif" />
    <img
      :alt="object.name"
      :title="object.name"
      :width="width"
      :height="height"
      loading="lazy"
      @click="$emit('click', object.id)"
    />
  </picture>
</template>

<script lang="ts">
import type { Creature, CreatureInstance } from '@/models/Creature'
import type { Hero } from '@/models/Hero'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ObjectPortrait',
  props: {
    object: {
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
