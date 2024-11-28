<template>
  <BaseDialog :show="show" size="large" @close="onClose">
    <template #header>
      <input
        ref="searchInput"
        v-model="search"
        type="text"
        class="search-input"
        name="search-creatures"
        :placeholder="t('components.selectUnitModal.searchCreature')"
        @keyup.enter="selectFirstFounded"
      >
    </template>

    <template #content>
      <div class="units-modal-content">
        <div v-if="!debouncedSearch" class="units">
          <div v-for="town in towns" :key="town.name" class="town">
            <button
              v-for="creature in creaturesByTowns[town.id]"
              :key="creature.id"
              :data-umami-event="`pick ${creature.name} creature`"
              @click="selectUnit(creature)"
            >
              <ObjectPortrait
                class="creature-img"
                folder="/images/creatures/portraits/big"
                :file="{ name: creature.id, alt: creature.name }"
                :width="58"
                :height="64"
              />
            </button>
          </div>

          <div class="town">
            <button
              v-for="neutralCreature in creaturesByTowns[0]"
              :key="neutralCreature.id"
              :data-umami-event="`pick ${neutralCreature.name} creature`"
              @click="selectUnit(neutralCreature)"
            >
              <ObjectPortrait
                class="creature-img"
                folder="/images/creatures/portraits/big"
                :file="{ name: neutralCreature.id, alt: neutralCreature.name }"
                :width="58"
                :height="64"
              />
            </button>
          </div>
        </div>

        <div v-else class="search-units">
          <button
            v-for="creature in searchCreatures"
            :key="creature.id"
            :data-umami-event="`pick ${creature.name} creature (from search)`"
            @click="selectUnit(creature)"
          >
            <ObjectPortrait
              class="creature-img"
              folder="/images/creatures/portraits/big"
              :file="{ name: creature.id, alt: creature.name }"
              :width="58"
              :height="64"
            />
          </button>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>

<script setup lang="ts">
import type { Creature } from '@/models/Creature'
import BaseDialog from '@/components/base/BaseDialog.vue'
import { useStore } from '@/store'
import { refDebounced } from '@vueuse/core'
import { computed, defineAsyncComponent, nextTick, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{ show: boolean }>()

const emit = defineEmits<{ close: [], select: [creature: Creature] }>()

const ObjectPortrait = defineAsyncComponent(() => import('@/components/ObjectPortrait.vue'))

const { t } = useI18n()
const store = useStore()

const creatures = computed(() => store.creatures)
const towns = computed(() => store.towns)

const search = ref('')
const debouncedSearch = refDebounced(search, 200)
const searchInput = ref()

watch(
  () => props.show,
  (newShowState) => {
    if (newShowState)
      nextTick(() => searchInput.value.focus())
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

  towns.value.forEach(town => (map[town.id] = []))
  creatures.value.forEach((creature) => {
    if (creature.townId) {
      map[creature.townId].push(creature)
    }
    else {
      map[0].push(creature)
    }
  })

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

<style lang="scss" scoped>
@use '@/styles/mixins';

.units-modal-content {
  flex-direction: column;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  user-select: none;
  background-clip: padding-box;
}

.search-input {
  padding: 0.25rem 0.5rem;
  font-family: inherit;
  font-size: inherit;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 0.2rem;
  transition:
    color 0.2s linear,
    background-color 0.2s linear,
    border 0.2s linear;
}

.units {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  background-color: var(--color-bg-deep);
}

.search-units {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.town {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.creature-img:deep(img) {
  width: 50px;
  height: auto;
  cursor: pointer;
  border-radius: 5px;
  transition:
    box-shadow 0.25s,
    transform 0.25s;

  @include mixins.media-medium {
    width: 58px;
  }

  &:hover {
    box-shadow: 0 0 10px 3px black;
    transform: translateY(-2px);
  }
}
</style>
