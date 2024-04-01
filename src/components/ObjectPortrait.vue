<template>
  <picture @click="$emit('clickPicture')">
    <source :srcset="`${folder}/${file.name}.webp`" type="image/webp" />
    <img
      :alt="file.alt || file.name.toString()"
      :title="file.alt"
      :loading="lazyLoading ? 'lazy' : 'eager'"
      :sizes="sizes"
      @click="$emit('click', file.name)"
    />
  </picture>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    file: { name: string | number; alt?: string }
    folder: string
    width?: string | number
    height?: string | number
    lazyLoading?: boolean
    sizes?: string
  }>(),
  {
    lazyLoading: true,
    width: 'auto',
    height: 'auto',
    sizes: undefined,
  },
)
defineEmits<{
  click: [name: string | number]
  clickPicture: []
}>()
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
