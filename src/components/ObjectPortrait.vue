<template>
  <picture>
    <source :srcset="`${folder}/${object.id}.webp`" type="image/webp" />
    <source :srcset="`${folder}/${object.id}.gif`" type="image/gif" />
    <img
      class="object-portrait"
      :alt="object.name"
      :title="object.name"
      loading="lazy"
      @click="$emit('click', object.id)"
    />
  </picture>
</template>

<script lang="ts">
import type { Creature, CreatureInstance } from '@/models/Creature'
import type { Hero } from '@/models/Hero'
import type { Town } from '@/models/Town'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ObjectPortrait',
  props: {
    object: {
      type: Object as () => Creature | Hero | Town | CreatureInstance | { id: number | string; name?: string },
      required: true,
    },
    folder: {
      type: String,
      required: true,
    },
    // eslint-disable-next-line vue/no-unused-properties
    width: {
      type: [Number, String],
      default: 'auto',
    },
    // eslint-disable-next-line vue/no-unused-properties
    height: {
      type: [Number, String],
      default: 'auto',
    },
  },
  emits: ['click'],
})
</script>

<style lang="scss" scoped>
.object-portrait {
  width: v-bind(width);
  height: v-bind(height);
}
</style>
