<template>
  <BaseDialog :show="show" size="large" @close="onClose">
    <template #header>
      <input
        ref="searchInput"
        :value="search"
        type="text"
        class="search-input"
        :placeholder="t('components.selectUnitModal.searchCreature')"
        @keyup.enter="selectFirstFounded"
        @input="searchCreature"
      />
    </template>

    <template #content>
      <div class="units-modal-content">
        <div v-if="!search" class="units">
          <div v-for="town in towns" :key="town.name" class="town">
            <ObjectPortrait
              v-for="creature in creaturesByTowns[town.id]"
              :key="creature.id"
              class="creature-img"
              folder="/images/creatures/portraits/big"
              :file="{ name: creature.id, alt: creature.name }"
              :width="58"
              :height="64"
              @click="selectUnit(creature)"
            />
          </div>

          <div class="town">
            <ObjectPortrait
              v-for="neutralCreature in creaturesByTowns[0]"
              :key="neutralCreature.id"
              class="creature-img"
              folder="/images/creatures/portraits/big"
              :file="{ name: neutralCreature.id, alt: neutralCreature.name }"
              :width="58"
              :height="64"
              @click="selectUnit(neutralCreature)"
            />
          </div>
        </div>

        <div v-else class="search-units">
          <ObjectPortrait
            v-for="creature in searchCreatures"
            :key="creature.id"
            class="creature-img"
            folder="/images/creatures/portraits/big"
            :file="{ name: creature.id, alt: creature.name }"
            :width="58"
            :height="64"
            @click="selectUnit(creature)"
          />
        </div>
      </div>
    </template>
  </BaseDialog>
</template>

<script lang="ts">
import BaseDialog from '@/components/base/BaseDialog.vue'
import type { Creature } from '@/models/Creature'
import { useStore } from '@/store'
import { computed, defineAsyncComponent, defineComponent, nextTick, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'SelectUnitModal',
  components: {
    BaseDialog,
    ObjectPortrait: defineAsyncComponent(() => import('@/components/ObjectPortrait.vue')),
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close', 'select'],
  setup(props, context) {
    const { t } = useI18n()
    const store = useStore()

    const creatures = computed(() => store.creatures)
    const towns = computed(() => store.towns)

    const search = ref('')
    const searchInput = ref()

    watch(
      () => props.show,
      (newShowState) => {
        if (newShowState) nextTick(() => searchInput.value.focus())
      }
    )

    const searchCreatures = computed(() => {
      return creatures.value.filter((creature: Creature) => {
        const searchText = search.value.toLowerCase()
        const creatureName = creature.name.toLowerCase()
        return creatureName.indexOf(searchText) > -1
      })
    })

    const creaturesByTowns = computed(() => {
      const map: {
        [key: number]: Array<Creature>
      } = {
        0: [],
      }

      towns.value.forEach((town) => (map[town.id] = []))
      creatures.value.forEach((creature) => {
        if (creature.townId) {
          map[creature.townId].push(creature)
        } else {
          map[0].push(creature)
        }
      })

      return map
    })

    const selectUnit = (value: Creature) => {
      search.value = ''
      context.emit('select', value)
      context.emit('close')
    }

    const selectFirstFounded = () => {
      context.emit('select', searchCreatures.value[0])
      context.emit('close')
      search.value = ''
    }

    const onClose = () => {
      search.value = ''
      context.emit('close')
    }

    const searchCreature = (event: Event) => {
      const target = event.currentTarget as HTMLInputElement
      search.value = target.value
    }

    return {
      t,

      towns,
      search,
      creaturesByTowns,
      searchCreatures,
      searchInput,

      selectUnit,
      selectFirstFounded,
      onClose,
      searchCreature,
    }
  },
})
</script>

<style lang="scss" scoped>
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
  transition: color 0.2s linear, background-color 0.2s linear, border 0.2s linear;
}

.units {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
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
  transition: box-shadow 0.25s, transform 0.25s;

  @include media-medium {
    width: 58px;
  }

  &:hover {
    box-shadow: 0 0 10px 3px black;
    transform: translateY(-2px);
  }
}
</style>
