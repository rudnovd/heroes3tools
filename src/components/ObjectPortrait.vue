<template>
  <picture @click="$emit('click-picture')">
    <source :srcset="`${folder}/${file.name}.webp`" type="image/webp" />
    <source :srcset="`${folder}/${file.name}.gif`" type="image/gif" />
    <img
      :alt="file.alt || file.name.toString()"
      :title="file.alt"
      :loading="lazyLoading ? 'lazy' : 'eager'"
      :sizes="sizes"
      @click="$emit('click', file.name)"
    />
  </picture>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ObjectPortrait',
  props: {
    file: {
      type: Object as PropType<{ name: string | number; alt?: string }>,
      required: true,
    },
    folder: {
      type: String,
      required: true,
    },
    width: {
      type: [Number, String],
      default: 'auto',
    },
    height: {
      type: [Number, String],
      default: 'auto',
    },
    lazyLoading: {
      type: Boolean,
      default: true,
    },
    sizes: {
      type: String,
      default: null,
    },
  },
  emits: ['click', 'click-picture'],
})
</script>

<style lang="scss" scoped>
picture {
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  width: v-bind(width);
  height: v-bind(height);
}
</style>
