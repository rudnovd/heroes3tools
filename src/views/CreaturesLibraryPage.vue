<template>
  <section class="creatures-library-page">
    <section class="library-header">
      <div class="towns-anchors">
        <ObjectPortrait
          v-for="town in towns.slice(0, 10)"
          :key="town.id"
          :file="{ name: town.id, alt: town.name }"
          folder="/images/towns/portraits/large"
          width="80px"
          height="70px"
          @click="router.replace(`#${town.name}`)"
        />
        <ObjectPortrait
          :file="{ name: 0, alt: 'Neutral' }"
          folder="/images/towns/portraits/large"
          width="80px"
          height="70px"
          @click="router.replace(`#Neutral`)"
        />
      </div>

      <div class="search-creature">
        <input
          ref="searchInput"
          v-model="search"
          :placeholder="t('components.selectUnitModal.searchCreature')"
          @input="searchUnit"
        />
      </div>
    </section>

    <div v-for="town in towns.slice(0, 10)" :key="town.name" class="town">
      <h2 :id="town.name" class="town-name">{{ town.name }}</h2>
      <CreatureCard
        v-for="creature in creatures.filter((creature) => creature.townId === town.id)"
        :key="creature.id"
        :creature="creature"
        :class="{ selected: selectedCreature && creature.id === selectedCreature.id }"
        @click="onSelectCreature"
      />
    </div>
    <div class="town">
      <h2 id="Neutral" class="town-name">Neutral</h2>
      <CreatureCard
        v-for="creature in creatures.filter((creature) => creature.townId === 0)"
        :key="creature.id"
        :creature="creature"
        :class="{ selected: selectedCreature && creature.id === selectedCreature.id }"
        @click="onSelectCreature"
      />
    </div>
  </section>

  <PageFooter :about="{ hide: true }" />
</template>

<script lang="ts">
import CreatureCard from '@/components/creaturesLibrary/CreatureCard.vue'
import ObjectPortrait from '@/components/ObjectPortrait.vue'
import { selectedLanguage } from '@/i18n'
import type { Creature } from '@/models/Creature'
import { useStore } from '@/store'
import { computed, defineAsyncComponent, defineComponent, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

let searchTimeout = 0

export default defineComponent({
  name: 'CreaturesLibraryPage',
  components: {
    CreatureCard,
    ObjectPortrait,
    PageFooter: defineAsyncComponent(() => import('@/components/PageFooter.vue')),
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const { t } = useI18n()

    const towns = computed(() => store.towns)
    const creatures = computed(() => store.creatures)

    const selectedCreature = ref<Creature | null>(null)
    const search = ref('')
    const searchInput = ref()

    if (!store.isDataLoaded) store.loadData(selectedLanguage.value)

    const keyboardSearch = (value: KeyboardEvent) => {
      if (value.key === 'Enter') {
        if (search.value.length > 0) {
          searchUnit()
          search.value = ''
        } else if (route.hash.length > 0) {
          router.replace({ hash: '' })
        }
      } else {
        searchUnit()
      }
    }

    document.addEventListener('keyup', keyboardSearch)
    onUnmounted(() => {
      document.removeEventListener('keyup', keyboardSearch)
    })

    const searchUnit = () => {
      if (!search.value.length) {
        return
      }

      if (searchTimeout) {
        clearTimeout(searchTimeout)
        searchTimeout = 0
      }

      if (search.value.length) {
        const foundCreature = creatures.value.find((creature: Creature) => {
          return creature.name.toLowerCase().indexOf(search.value.trim().toLowerCase()) > -1
        })

        if (foundCreature) {
          router.replace({ hash: `#${foundCreature.name}` })
        }
      }
    }

    const onSelectCreature = (creature: Creature) => {
      if (selectedCreature.value && selectedCreature.value.id === creature.id) {
        selectedCreature.value = null
      } else {
        selectedCreature.value = creature
      }
    }

    return {
      router,
      t,

      towns,
      creatures,

      search,
      selectedCreature,
      searchInput,

      searchUnit,
      onSelectCreature,
    }
  },
})
</script>

<style lang="scss">
.creatures-library-page {
  min-width: 320px;
  max-width: 1920px;
  padding: 0 8px 16px;
  margin: 0 auto;

  @include media-medium {
    padding: 0 24px 16px;
  }
}

.library-header {
  display: flex;
  flex-direction: row;
}

.search-creature {
  position: fixed;
  right: 16px;

  input {
    min-width: 150px;
    height: 32px;
    opacity: 0.5;
    transition: opacity 0.25s;

    &:hover {
      opacity: 1;
    }
  }
}

.towns-anchors {
  display: grid;
  grid-template-columns: repeat(4, 80px);
  grid-gap: 5px;

  img {
    cursor: pointer;

    &:hover {
      filter: contrast(110%);
    }
  }
}

.town {
  display: grid;
  grid-template-columns: 100%;
  margin-bottom: 3rem;

  &:last-child {
    margin-bottom: 0;
  }

  @include media-medium {
    grid-template-columns: 1fr 1fr;
  }
}

.town-name {
  grid-column: 1 / -1;
  margin-bottom: 1rem;
  text-align: center;
}

.creature-card {
  &:nth-child(2),
  &:nth-child(3) {
    border-top: 1px solid black;
  }
}
</style>
