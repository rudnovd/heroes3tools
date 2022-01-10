<template>
  <Multiselect
    v-model="selectedTerrain"
    class="select-terrain"
    :options="terrains"
    searchable
    value-prop="id"
    track-by="name"
    label="name"
    placeholder="Select terrain"
    no-results-text="Not found"
    :hide-selected="false"
    :classes="{
      dropdown: 'multiselect-dropdown',
    }"
  >
    <template #option="{ option }">
      <div class="option">
        <ObjectPortrait :folder="`/images/terrains`" :object="option" :width="46" :height="30" />
        {{ option.name }}
      </div>
    </template>

    <template #singlelabel="{ value }">
      <div class="multiselect-single-label">
        <ObjectPortrait :folder="`/images/terrains`" :object="value" :width="46" :height="30" />
        {{ value.name }}
      </div>
    </template>
  </Multiselect>
</template>

<script lang="ts">
import type { Terrain } from '@/models/Terrain'
import Multiselect from '@vueform/multiselect'
import { defineAsyncComponent, defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'SelectTerrain',
  components: {
    Multiselect,
    ObjectPortrait: defineAsyncComponent(() => import('@/components/ObjectPortrait.vue')),
  },
  props: {
    terrains: {
      type: Array as () => Array<Terrain>,
      required: true,
    },
  },
  emits: ['selectTerrain'],
  setup(props, context) {
    const selectedTerrain = ref(0)

    watch(selectedTerrain, (id) =>
      context.emit(
        'selectTerrain',
        props.terrains.find((t) => t.id === id)
      )
    )

    return {
      selectedTerrain,
    }
  },
})
</script>

<style src="@vueform/multiselect/themes/default.scss" lang="scss"></style>

<style lang="scss">
.select-terrain > .multiselect-dropdown {
  top: -480px;
  overflow-x: hidden;
}
</style>

<style lang="scss" scoped>
.select-terrain {
  width: 100%;
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
