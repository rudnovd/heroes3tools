<template>
  <Multiselect
    v-model="selectedHero"
    class="select-hero"
    :options="heroes"
    track-by="name"
    searchable
    value-prop="id"
    label="name"
    placeholder="Select hero"
    no-results-text="Hero not found"
    :hide-selected="false"
    :classes="{
      dropdown: 'multiselect-dropdown',
    }"
  >
    <template #option="{ option }">
      <div class="option">
        <Portrait :folder="`/images/heroes/portraits/small`" :object="option" :width="46" :height="30" />
        {{ option.name }}
      </div>
    </template>

    <template #singlelabel="{ value }">
      <div class="multiselect-single-label">
        <Portrait :folder="`/images/heroes/portraits/small`" :object="value" :width="46" :height="30" />
        {{ value.name }}
      </div>
    </template>
  </Multiselect>
</template>

<script lang="ts">
import { defineComponent, ref, defineAsyncComponent, watch, computed } from 'vue'
import Multiselect from '@vueform/multiselect'
import type { Hero, HeroInstance } from '@/models/Hero'
import { useStore } from '@/store'

export default defineComponent({
  name: 'SelectHero',
  components: {
    Multiselect,
    Portrait: defineAsyncComponent(() => import('@/components/Portrait.vue')),
  },
  props: {
    value: {
      type: Object as () => Hero | HeroInstance | null,
      required: true,
    },
  },
  emits: ['selectHero'],
  setup(props, context) {
    const store = useStore()

    const selectedHero = ref(props.value?.id)
    const heroes = computed(() => store.heroes)

    watch(selectedHero, (id) =>
      context.emit(
        'selectHero',
        heroes.value.find((h) => h.id === id)
      )
    )

    return {
      selectedHero,
      heroes,
    }
  },
})
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style lang="scss">
.multiselect-dropdown {
  height: 420px;
}
</style>

<style lang="scss" scoped>
.select-hero {
  width: 100%;
  height: 48px;
}

.select {
  overflow-x: hidden;
}

.option {
  width: 100%;
  display: flex;
  align-items: center;

  & picture {
    margin-right: 0.5rem;
  }
}

.multiselect-single-label {
  & picture {
    display: flex;
    margin-right: 0.5rem;
  }
}
</style>

