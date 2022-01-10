<template>
  <BaseDialog :show="show" size="large" @close="onClose">
    <template #header>
      <input
        v-model="search"
        type="text"
        class="search-input"
        :placeholder="t('damageCalculator.components.selectUnitModal.searchCreature')"
        @keyup.enter="selectFirstFounded"
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
              :object="creature"
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
              :object="neutralCreature"
              :width="58"
              :height="64"
              @click="selectUnit(neutralCreature)"
            />
          </div>
        </div>

        <div v-else class="search-units">
          <Portrait
            v-for="creature in searchCreatures"
            :key="creature.id"
            class="creature-img"
            folder="/images/creatures/portraits/big"
            :object="creature"
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
import { computed, defineAsyncComponent, defineComponent, ref } from 'vue'
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
    const search = ref('')
    const store = useStore()

    const creatures = computed(() => store.creatures)
    const towns = computed(() => store.towns)

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

    return {
      towns,
      search,
      creaturesByTowns,
      searchCreatures,

      t,
      selectUnit,
      selectFirstFounded,
      onClose,
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
  background-clip: padding-box;
  user-select: none;
}

.search-input {
  border: 1px solid rgb(206, 212, 218);
  border-radius: 0.2rem;
  font-size: inherit;
  font-family: inherit;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
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
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 8px;
  gap: 8px;
}

.creature-img:deep(img) {
  border-radius: 5px;
  cursor: pointer;
  height: auto;
  width: 50px;
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
