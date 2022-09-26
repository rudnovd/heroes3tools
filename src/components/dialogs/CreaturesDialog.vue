<template>
  <BaseDialog :show="show" @close="onClose">
    <template #header>
      <input
        ref="searchInput"
        :value="search"
        type="text"
        class="search-input"
        :placeholder="t('components.selectUnitModal.searchCreature')"
        @keyup.enter="onSelectFirst"
        @input="searchCreature"
      />
    </template>

    <template #content>
      <section class="units-modal-content">
        <template v-if="!search">
          <section v-for="(townCreatures, town) in creaturesByTowns" :key="town" class="town">
            <img
              v-for="creature in townCreatures"
              :key="creature.key"
              :src="`/creatures/portraits/${creature.key}.webp`"
              :alt="creature.name"
              :title="creature.name"
              width="58"
              height="64"
              @click="onSelect(creature)"
            />
          </section>
        </template>

        <section v-if="search" class="town">
          <img
            v-for="creature in searchedCreatures"
            :key="creature.key"
            :src="`/creatures/portraits/${creature.key}.webp`"
            :alt="creature.name"
            :title="creature.name"
            width="58"
            height="64"
            @click="onSelect(creature)"
          />
        </section>
      </section>
    </template>
  </BaseDialog>
</template>

<script setup lang="ts">
import BaseDialog from '@/components/base/BaseDialog.vue'
import { useStore } from '@/store'
import type { Creature } from '@/types'
import { computed, nextTick, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  show: boolean
}>()
const emit = defineEmits(['close', 'select'])

const { t } = useI18n()
const store = useStore()

const creatures = computed(() => store.creatures)

const search = ref('')
const searchInput = ref<HTMLElement>()

const creaturesByTowns = computed(() => {
  const map: { [key: string]: Array<Creature> } = {
    Castle: [],
    Rampart: [],
    Tower: [],
    Inferno: [],
    Necropolis: [],
    Dungeon: [],
    Stronghold: [],
    Fortress: [],
    Conflux: [],
    Cove: [],
    Factory: [],
    Neutral: [],
  }

  creatures.value.forEach((creature) => {
    if (!creature.town) {
      map.Neutral.push(creature)
    } else {
      map[creature.town] = [...map[creature.town], creature]
    }
  })

  return map
})

const searchedCreatures = computed(() => {
  return creatures.value.filter((creature: Creature) => {
    const searchText = search.value.toLowerCase()
    const creatureName = creature.name.toLowerCase()
    return creatureName.indexOf(searchText) > -1
  })
})

watch(
  () => props.show,
  (show) => {
    if (show) nextTick(() => searchInput.value?.focus())
  }
)

const searchCreature = (event: Event) => {
  const target = event.currentTarget as HTMLInputElement
  search.value = target.value
}

const onClose = () => {
  search.value = ''
  emit('close')
}

const onSelect = (value: Creature) => {
  emit('select', value)
  onClose()
}

const onSelectFirst = () => {
  if (!search.value.length) return
  emit('select', searchedCreatures.value[0])
  onClose()
}
</script>

<style lang="scss" scoped>
.units-modal-content {
  display: grid;
  gap: 0.5rem;
  align-items: start;
  min-height: 90vh;
  user-select: none;

  img {
    cursor: pointer;
    border-radius: 5px;
    transition: box-shadow 0.25s, transform 0.25s;

    &:hover {
      box-shadow: 0 0 10px 3px var(--color-text);
      transform: translateY(-2px);
    }
  }
}

.search-input {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 0.2rem;
  transition: color 0.2s linear, background-color 0.2s linear, border 0.2s linear;
}

.town {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
</style>
