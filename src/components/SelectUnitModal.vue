<template>
  <BaseDialog
    v-model="model"
    class="select-unit-modal"
    size="medium"
    :title="$t('components.selectUnitModal.selectCreature')"
    @close="onClose"
  >
    <div class="units-modal-content">
      <input
        ref="searchInput"
        v-model="search"
        type="text"
        class="search-input"
        name="search-creatures"
        :placeholder="$t('components.selectUnitModal.searchCreature')"
        @keyup.enter="selectFirstFounded"
      >
      <div v-if="!debouncedSearch" class="units">
        <div v-for="town in towns" :key="town.name" class="town">
          <button
            v-for="creature in creaturesByTowns[town.id]"
            :key="creature.id"
            class="creature-button"
            :data-umami-event="`pick ${creature.name} creature`"
            @click="selectUnit(creature)"
          >
            <img
              :src="`/images/creatures/portraits/big/${creature.id}.webp`"
              :alt="creature.name"
              :title="creature.name"
              width="58px"
              height="64px"
            >
          </button>
        </div>
        <div class="town">
          <button
            v-for="neutralCreature in creaturesByTowns[0]"
            :key="neutralCreature.id"
            class="creature-button"
            :data-umami-event="`pick neutral ${neutralCreature.name} creature`"
            @click="selectUnit(neutralCreature)"
          >
            <img
              :src="`/images/creatures/portraits/big/${neutralCreature.id}.webp`"
              :alt="neutralCreature.name"
              :title="neutralCreature.name"
              width="58px"
              height="64px"
            >
          </button>
        </div>
      </div>
      <div v-else class="search-units">
        <template v-if="searchCreatures.length">
          <button
            v-for="creature in searchCreatures"
            :key="creature.id"
            class="creature-button"
            :data-umami-event="`pick ${creature.name} creature (from search)`"
            @click="selectUnit(creature)"
          >
            <img
              :src="`/images/creatures/portraits/big/${creature.id}.webp`"
              :alt="creature.name"
              :title="creature.name"
              width="58px"
              height="64px"
            >
          </button>
        </template>
        <div v-else>
          {{ $t('components.selectUnitModal.creatureNotFound') }}
        </div>
      </div>
    </div>
  </BaseDialog>
</template>

<script setup lang="ts">
import type { Creature } from '@/models/Creature'
import { refDebounced } from '@vueuse/core'
import { computed, nextTick, ref, watch } from 'vue'
import BaseDialog from '@/components/base/BaseDialog.vue'
import { useStore } from '@/store'

const emit = defineEmits<{ close: [], select: [creature: Creature] }>()
const model = defineModel<boolean>({ required: true })

const store = useStore()
const creatures = computed(() => store.creatures)
const towns = computed(() => store.towns)

const search = ref('')
const debouncedSearch = refDebounced(search, 200)
const searchInput = ref()

watch(
  () => model,
  (isActive) => {
    if (isActive) nextTick(() => searchInput.value.focus())
  },
)

const searchCreatures = computed(() => {
  const searchText = debouncedSearch.value.toLowerCase()
  return creatures.value.filter(({ name }: Creature) => {
    return name.toLowerCase().includes(searchText)
  })
})

const creaturesByTowns = computed(() => {
  const map: {
    [key: number]: Array<Creature>
  } = {
    0: [],
  }
  for (const town of towns.value) {
    map[town.id] = []
  }
  for (const creature of creatures.value) {
    if (creature.townId) {
      map[creature.townId].push(creature)
    }
    else {
      map[0].push(creature)
    }
  }

  return map
})
function selectUnit(value: Creature) {
  search.value = ''
  emit('select', value)
  emit('close')
}
function selectFirstFounded() {
  emit('select', searchCreatures.value[0])
  emit('close')
  search.value = ''
}
function onClose() {
  search.value = ''
  emit('close')
}
</script>

<style>
.select-unit-modal {
  .base-dialog__content {
    min-height: 100vh;
  }
  .units-modal-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    height: 100%;
    user-select: none;
  }
  .search-input {
    max-width: 300px;
    padding: 0.25rem 0.5rem;
    font-family: inherit;
    font-size: inherit;
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--color-text);
    background-color: var(--color-bg-deep);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    transition:
      color 0.2s linear,
      background-color 0.2s linear,
      border 0.2s linear;
  }
  .units {
    display: flex;
    flex-flow: column wrap;
    gap: 4px;
  }
  .search-units {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .town {
    display: flex;
    flex-flow: row wrap;
    gap: 8px;
  }
  .creature-button {
    border-radius: 4px;
    transition:
      box-shadow 0.25s,
      transform 0.25s;
    &:hover {
      box-shadow: 0 0 4px 2px var(--color-text);
      transform: translateY(-2px);
    }
  }
}
</style>
