<template>
  <BaseModal :show="show" size="large" @close="onClose">
    <template #header>
      <input
        v-model="search"
        type="text"
        class="search-input"
        :placeholder="t('damageCalculator.components.selectUnitModal.searchCreature')"
        autofocus
        @keyup.enter="selectFirstFounded"
      />
    </template>

    <template #content>
      <div class="units-modal-content">
        <div v-if="!search" class="units">
          <div v-for="town in towns" :key="town.name" class="town">
            <CreaturePortrait
              v-for="creature in creatures.filter((_creature) => _creature.townId === town.id)"
              :key="creature.id"
              class="creature-img"
              folder="/images/creatures/portraits/big"
              :creature="creature"
              :width="58"
              :height="64"
              @click="selectUnit(creature)"
            />
          </div>

          <div class="town">
            <CreaturePortrait
              v-for="neutralCreature in creatures.filter((_creature) => !_creature.townId)"
              :key="neutralCreature.id"
              class="creature-img"
              folder="/images/creatures/portraits/big"
              :creature="neutralCreature"
              :width="58"
              :height="64"
              @click="selectUnit(neutralCreature)"
            />
          </div>
        </div>

        <div v-else class="search-units">
          <CreaturePortrait
            v-for="creature in filterCreaturesByName"
            :key="creature.id"
            class="creature-img"
            folder="/images/creatures/portraits/big"
            :creature="creature"
            :width="58"
            :height="64"
            @click="selectUnit(creature)"
          />
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, ref } from 'vue'
import BaseModal from '@/components/base/BaseModal.vue'
import type { Creature } from '@/models/Creature'
import type { Town } from '@/models/Town'
import { useI18n } from 'vue-i18n'
import { getDatabaseStore } from '@/database'

export default defineComponent({
  name: 'SelectUnitModal',
  components: {
    BaseModal,
    CreaturePortrait: defineAsyncComponent(() => import('@/components/damageCalculator/CreaturePortrait.vue')),
  },
  mixins: [BaseModal],
  emits: ['close', 'select'],
  setup(props, context) {
    const { t } = useI18n()
    const search = ref('')
    const towns = ref([] as Town[])
    const creatures = ref([] as Array<Creature>)

    getDatabaseStore('creatures').then((result) => (creatures.value = result))
    getDatabaseStore('towns').then((result) => (towns.value = result))

    const filterCreaturesByName = computed((): Creature[] => {
      return creatures.value.filter((creature: Creature) => {
        const searchText = search.value.toLowerCase()
        const creatureName = creature.name.toLowerCase()
        return creatureName.indexOf(searchText) > -1
      })
    })

    const selectUnit = (value: Creature) => {
      search.value = ''
      context.emit('select', value)
      context.emit('close')
    }

    const selectFirstFounded = () => {
      context.emit('select', filterCreaturesByName.value[0])
      context.emit('close')
      search.value = ''
    }

    const onClose = () => {
      search.value = ''
      context.emit('close')
    }

    return {
      t,
      creatures,
      selectUnit,
      selectFirstFounded,
      filterCreaturesByName,
      onClose,
      towns,
      search,
    }
  },
})
</script>

<style lang="scss" scoped>
.modal-units {
  width: 90%;
  min-width: 200px;
  margin: auto;
  margin-top: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 0.3rem;
  outline: 0;
  min-height: 100%;

  @include media-medium {
    width: 100%;
  }

  @include media-large {
    width: 95%;
  }

  @include media-large {
    width: 85%;
  }
}

.units-modal-content {
  flex-direction: column;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  background-clip: padding-box;
  user-select: none;

  .header {
    display: flex;
    margin-bottom: 10px;

    input {
      flex: 0 0 33.3%;
      min-width: 150px;
      max-width: 300px;
      padding: 0.25rem 0.5rem;
      font-size: 1rem;
      line-height: 1.5;
    }

    .close-button {
      margin-left: auto;
    }
  }
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
